<?php

declare(strict_types=1);

date_default_timezone_set('Europe/Berlin');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const MAX_PHOTO_COUNT = 5;
const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
const MAX_PHOTO_TOTAL = 15 * 1024 * 1024;
const MAX_REQUEST_SIZE = 18 * 1024 * 1024;

function respond(int $status, bool $ok, string $message): void
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function field(string $name, int $maxLength = 5000): string
{
    $value = $_POST[$name] ?? '';
    if (!is_string($value)) {
        return '';
    }
    $value = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '');
    return function_exists('mb_substr') ? mb_substr($value, 0, $maxLength, 'UTF-8') : substr($value, 0, $maxLength);
}

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function encodedHeader(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function smtpRead($stream): array
{
    $response = '';
    do {
        $line = fgets($stream, 1024);
        if ($line === false) {
            throw new RuntimeException('Keine Antwort vom Mailserver.');
        }
        $response .= $line;
    } while (isset($line[3]) && $line[3] === '-');
    return [(int) substr($response, 0, 3), trim($response)];
}

function smtpExpect($stream, array $expected, ?string $command = null): void
{
    if ($command !== null && fwrite($stream, $command . "\r\n") === false) {
        throw new RuntimeException('Mailserver-Verbindung wurde unterbrochen.');
    }
    [$code, $response] = smtpRead($stream);
    if (!in_array($code, $expected, true)) {
        throw new RuntimeException('Mailserver-Fehler: ' . $response);
    }
}

function smtpSend(array $config, string $to, string $message): void
{
    $host = (string) $config['smtp_host'];
    $port = (int) $config['smtp_port'];
    $encryption = strtolower((string) ($config['smtp_encryption'] ?? 'tls'));
    $target = ($encryption === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    $stream = @stream_socket_client($target, $errno, $error, 15, STREAM_CLIENT_CONNECT);
    if ($stream === false) {
        throw new RuntimeException('Mailserver nicht erreichbar: ' . $error);
    }
    stream_set_timeout($stream, 15);

    try {
        smtpExpect($stream, [220]);
        smtpExpect($stream, [250], 'EHLO dachdeckermeister-meyer.de');
        if ($encryption === 'tls') {
            smtpExpect($stream, [220], 'STARTTLS');
            if (!stream_socket_enable_crypto($stream, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('Verschlüsselte Mailverbindung fehlgeschlagen.');
            }
            smtpExpect($stream, [250], 'EHLO dachdeckermeister-meyer.de');
        }
        smtpExpect($stream, [334], 'AUTH LOGIN');
        smtpExpect($stream, [334], base64_encode((string) $config['smtp_user']));
        smtpExpect($stream, [235], base64_encode((string) $config['smtp_password']));
        smtpExpect($stream, [250], 'MAIL FROM:<' . $config['smtp_user'] . '>');
        smtpExpect($stream, [250, 251], 'RCPT TO:<' . $to . '>');
        smtpExpect($stream, [354], 'DATA');
        $message = preg_replace('/(?<=\r\n)\./', '..', $message) ?? $message;
        smtpExpect($stream, [250], rtrim($message, "\r\n") . "\r\n.");
        fwrite($stream, "QUIT\r\n");
    } finally {
        fclose($stream);
    }
}

function buildMessage(array $config, string $to, string $subject, string $body, string $replyTo, array $attachments = []): string
{
    $from = (string) $config['smtp_user'];
    $domain = str_contains($from, '@') ? substr(strrchr($from, '@'), 1) : 'dachdeckermeister-meyer.de';
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . encodedHeader((string) $config['from_name']) . ' <' . $from . '>',
        'To: <' . $to . '>',
        'Reply-To: <' . $replyTo . '>',
        'Subject: ' . encodedHeader($subject),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $domain . '>',
        'MIME-Version: 1.0',
    ];

    if ($attachments === []) {
        $headers[] = 'Content-Type: text/plain; charset=UTF-8';
        $headers[] = 'Content-Transfer-Encoding: base64';
        return implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($body), 76, "\r\n");
    }

    $boundary = 'meyer-' . bin2hex(random_bytes(16));
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
    $parts = [
        '--' . $boundary,
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        rtrim(chunk_split(base64_encode($body), 76, "\r\n")),
    ];
    foreach ($attachments as $attachment) {
        $parts[] = '--' . $boundary;
        $parts[] = 'Content-Type: ' . $attachment['mime'] . '; name="' . $attachment['name'] . '"';
        $parts[] = 'Content-Transfer-Encoding: base64';
        $parts[] = 'Content-Disposition: attachment; filename="' . $attachment['name'] . '"';
        $parts[] = '';
        $parts[] = rtrim(chunk_split(base64_encode($attachment['data']), 76, "\r\n"));
    }
    $parts[] = '--' . $boundary . '--';
    return implode("\r\n", $headers) . "\r\n\r\n" . implode("\r\n", $parts) . "\r\n";
}

function normalizedUploads(string $name): array
{
    $files = $_FILES[$name] ?? null;
    if (!is_array($files) || !isset($files['name'])) {
        return [];
    }
    if (!is_array($files['name'])) {
        return [$files];
    }
    $normalized = [];
    foreach (array_keys($files['name']) as $index) {
        $normalized[] = [
            'name' => $files['name'][$index] ?? '',
            'type' => $files['type'][$index] ?? '',
            'tmp_name' => $files['tmp_name'][$index] ?? '',
            'error' => $files['error'][$index] ?? UPLOAD_ERR_NO_FILE,
            'size' => $files['size'][$index] ?? 0,
        ];
    }
    return $normalized;
}

function rateLimit(): void
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $key = hash('sha256', $ip . '|' . __FILE__);
    $file = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'meyer-form-' . $key . '.json';
    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        return;
    }
    try {
        if (!flock($handle, LOCK_EX)) {
            return;
        }
        $contents = stream_get_contents($handle);
        $attempts = is_string($contents) ? json_decode($contents, true) : [];
        $attempts = is_array($attempts) ? array_values(array_filter($attempts, fn($time) => is_int($time) && $time > time() - 900)) : [];
        if (count($attempts) >= 5) {
            respond(429, false, 'Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut.');
        }
        $attempts[] = time();
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, json_encode($attempts));
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, false, 'Diese Adresse akzeptiert ausschließlich Formularanfragen.');
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_REQUEST_SIZE) {
    respond(413, false, 'Die Anfrage ist zu groß. Bitte wählen Sie weniger oder kleinere Fotos aus.');
}

$originHost = strtolower((string) parse_url((string) ($_SERVER['HTTP_ORIGIN'] ?? ''), PHP_URL_HOST));
$requestHost = strtolower(preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? '')) ?? '');
if ($originHost !== '' && $requestHost !== '' && $originHost !== $requestHost) {
    respond(403, false, 'Die Anfrage konnte nicht geprüft werden.');
}

if (field('website', 200) !== '') {
    respond(200, true, 'Vielen Dank. Ihre Anfrage ist bei uns eingegangen.');
}
$started = filter_var($_POST['form_started'] ?? null, FILTER_VALIDATE_INT);
if ($started === false || $started > time() - 3 || $started < time() - 7200) {
    respond(400, false, 'Bitte laden Sie das Formular neu und versuchen Sie es noch einmal.');
}
$allowedTypes = ['Steildach', 'Flachdach', 'Dachfenster', 'Fassade', 'Terrasse oder Balkon', 'Reparatur oder Wartung'];
$type = field('type', 80);
$name = field('name', 120);
$phone = field('phone', 40);
$email = field('email', 254);
$address = field('address', 250);
$timing = field('timing', 200);
$message = field('message', 5000);
if (!in_array($type, $allowedTypes, true) || textLength($name) < 2 || textLength($phone) < 5 || !filter_var($email, FILTER_VALIDATE_EMAIL) || textLength($address) < 3) {
    respond(422, false, 'Bitte prüfen Sie die Pflichtfelder und Ihre E-Mail-Adresse.');
}

$dynamicLabels = [
    'roof_type' => 'Dachtyp', 'construction_year' => 'Baujahr', 'area' => 'Geschätzte Fläche',
    'insulation' => 'Dämmung vorhanden', 'leak' => 'Undichtigkeit / Feuchtigkeit', 'material' => 'Aktuelles Material',
    'standing_water' => 'Stehendes Wasser', 'use' => 'Nutzung der Fläche', 'window_project' => 'Fenster-Vorhaben',
    'quantity' => 'Anzahl', 'manufacturer' => 'Hersteller', 'electric' => 'Elektrische Bedienung',
    'sun_protection' => 'Sonnenschutz', 'damage_type' => 'Art des Schadens', 'urgency' => 'Dringlichkeit',
    'insurance' => 'Versicherungsschaden', 'facade_project' => 'Fassaden-Vorhaben', 'facade_material' => 'Fassadenmaterial',
    'damage' => 'Sichtbare Schäden', 'terrace_type' => 'Flächentyp', 'surface' => 'Aktueller Belag',
];
$details = [];
foreach ($dynamicLabels as $key => $label) {
    $value = field($key, 300);
    if ($value !== '') {
        $details[] = $label . ': ' . $value;
    }
}
$requiredByType = [
    'Steildach' => ['roof_type'], 'Dachfenster' => ['window_project'],
    'Fassade' => ['facade_project'], 'Terrasse oder Balkon' => ['terrace_type'],
    'Reparatur oder Wartung' => ['damage_type', 'urgency'],
];
foreach ($requiredByType[$type] ?? [] as $requiredField) {
    if (field($requiredField, 300) === '') {
        respond(422, false, 'Bitte ergänzen Sie die erforderlichen Projektdaten.');
    }
}

$uploads = array_values(array_filter(normalizedUploads('photos'), fn($file) => (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE));
if (count($uploads) > MAX_PHOTO_COUNT) {
    respond(422, false, 'Bitte laden Sie höchstens fünf Fotos hoch.');
}
$allowedMimes = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
$attachments = [];
$totalSize = 0;
$finfo = new finfo(FILEINFO_MIME_TYPE);
foreach ($uploads as $index => $upload) {
    if ((int) $upload['error'] !== UPLOAD_ERR_OK || !is_uploaded_file((string) $upload['tmp_name'])) {
        respond(422, false, 'Mindestens ein Foto konnte nicht verarbeitet werden.');
    }
    $size = (int) $upload['size'];
    $totalSize += $size;
    if ($size <= 0 || $size > MAX_PHOTO_SIZE || $totalSize > MAX_PHOTO_TOTAL) {
        respond(422, false, 'Die Fotos sind zu groß. Erlaubt sind 5 MB je Bild und 15 MB insgesamt.');
    }
    $mime = (string) $finfo->file((string) $upload['tmp_name']);
    if (!isset($allowedMimes[$mime])) {
        respond(422, false, 'Bitte laden Sie nur JPG-, PNG- oder WebP-Bilder hoch.');
    }
    $data = file_get_contents((string) $upload['tmp_name']);
    if ($data === false) {
        respond(422, false, 'Ein Foto konnte nicht gelesen werden.');
    }
    $attachments[] = ['name' => 'projektfoto-' . ($index + 1) . '.' . $allowedMimes[$mime], 'mime' => $mime, 'data' => $data];
}
rateLimit();

$configFile = __DIR__ . DIRECTORY_SEPARATOR . 'form-config.php';
if (!is_file($configFile)) {
    error_log('Meyer-Anfrageformular: form-config.php fehlt.');
    respond(503, false, 'Der Formularversand wird gerade eingerichtet. Bitte kontaktieren Sie uns telefonisch oder per E-Mail.');
}
$config = require $configFile;
if (!is_array($config) || empty($config['smtp_host']) || !filter_var($config['smtp_user'] ?? '', FILTER_VALIDATE_EMAIL) || empty($config['smtp_password']) || str_contains((string) $config['smtp_password'], 'HIER_') || !filter_var($config['recipient'] ?? '', FILTER_VALIDATE_EMAIL)) {
    error_log('Meyer-Anfrageformular: Mailkonfiguration ist unvollständig.');
    respond(503, false, 'Der Formularversand wird gerade eingerichtet. Bitte kontaktieren Sie uns telefonisch oder per E-Mail.');
}

$requestId = strtoupper(substr(bin2hex(random_bytes(6)), 0, 10));
$adminBody = "Neue Projektanfrage über die Website\n\n"
    . "Vorgangsnummer: {$requestId}\nEingang: " . date('d.m.Y H:i') . " Uhr\n\n"
    . "ANLIEGEN\nLeistungsbereich: {$type}\n" . ($details ? implode("\n", $details) . "\n" : '')
    . "Fotos: " . count($attachments) . "\n\n"
    . "KONTAKT\nName: {$name}\nTelefon: {$phone}\nE-Mail: {$email}\nProjektadresse: {$address}\n"
    . "Gewünschter Zeitraum: " . ($timing !== '' ? $timing : 'nicht angegeben') . "\n\n"
    . "HINWEISE\n" . ($message !== '' ? $message : 'keine zusätzlichen Hinweise') . "\n";

$confirmationBody = "Guten Tag {$name},\n\n"
    . "vielen Dank für Ihre Projektanfrage bei Dachdeckermeister Meyer. Wir haben Ihre Angaben zum Bereich \"{$type}\" erhalten und prüfen sie persönlich.\n\n"
    . "Vorgangsnummer: {$requestId}\nProjektadresse: {$address}\n\n"
    . "Wir melden uns zur ersten Einschätzung und Abstimmung bei Ihnen. Bei einem akuten Schaden erreichen Sie uns unter +49 176 43487351.\n\n"
    . "Freundliche Grüße\nPierre Meyer\nDachdeckermeister Meyer\n";

try {
    $recipient = (string) $config['recipient'];
    smtpSend($config, $recipient, buildMessage($config, $recipient, '[Website] ' . $type . ' – ' . $name . ' – ' . $requestId, $adminBody, $email, $attachments));
    try {
        smtpSend($config, $email, buildMessage($config, $email, 'Ihre Projektanfrage bei Dachdeckermeister Meyer', $confirmationBody, $recipient));
    } catch (Throwable $confirmationError) {
        error_log('Meyer-Anfrageformular Bestätigung ' . $requestId . ': ' . $confirmationError->getMessage());
    }
} catch (Throwable $error) {
    error_log('Meyer-Anfrageformular Versand ' . $requestId . ': ' . $error->getMessage());
    respond(502, false, 'Ihre Anfrage konnte technisch nicht übermittelt werden.');
}

respond(200, true, 'Vielen Dank, ' . explode(' ', $name)[0] . '. Ihre Anfrage ist eingegangen. Pierre Meyer meldet sich persönlich.');
