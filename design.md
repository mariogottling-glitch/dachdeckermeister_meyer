# Designsystem – Dachdeckermeister Meyer

Stand: 21. Juli 2026  
Status: Verbindliche Gestaltungsquelle für Homepage, Leistungsseiten, Karriere und zukünftige Erweiterungen

## 1. Zweck dieses Dokuments

Diese Datei ist die zentrale Designquelle des Projekts. Neue Seiten, Komponenten und Änderungen müssen sich an diesen Regeln orientieren. Bestehende Gestaltung darf nur bewusst und nachvollziehbar abweichen.

Das Ziel ist keine typische Handwerker-Website, sondern der digitale Auftritt eines modernen Architektur- und Ingenieurbüros für die Gebäudehülle.

Die Marke vermittelt:

- Vertrauen und Verlässlichkeit
- technische Präzision
- langfristigen Werterhalt
- persönliche, aber teamgestützte Beratung
- modernes Meisterhandwerk
- Planungskompetenz für die gesamte Gebäudehülle

## 2. Leitidee

**Dächer mit System.**

Meyer betrachtet Dach, Dämmung, Fenster, Fassade, Entwässerung und Wartung nicht als Einzelleistungen, sondern als zusammenhängendes System. Gestaltung und Nutzerführung müssen dieses Prinzip sichtbar und verständlich machen.

Jede Sektion beantwortet nach Möglichkeit drei Fragen:

1. Was ist das Problem oder der Bedarf?
2. Warum ist das für das Gebäude wichtig?
3. Wie löst Meyer die Aufgabe?

## 3. Visuelle Haltung

Die Website wirkt:

- minimalistisch
- hochwertig
- architektonisch
- ruhig und souverän
- technisch präzise
- großzügig, aber nicht leer

Referenzgefühl: moderne Architekturbüros, Apple-Produktseiten, Linear, Porsche und hochwertige Editorial-Websites.

### Vermeiden

- typische deutsche Handwerker-Optik
- verspielte Dach- oder Werkzeug-Icons
- Holz-, Gold-, Rot-, Orange- oder Blau-Akzente
- laute Farbflächen und starke Verläufe
- unnötige Animationen
- überladene Kachelraster
- zu kleine oder extrem dünne Texte
- fünf- oder mehrzeilige Überschriften
- austauschbare Stockfotos mit lächelnden Handwerkern

## 4. Farbpalette

Die Oberfläche besteht zu etwa 85–90 % aus neutralen Farben und zu 10–15 % aus Türkis.

| Rolle | Wert | Verwendung |
| --- | --- | --- |
| Meyer-Türkis | `#00B0BB` | einzige Akzentfarbe, Links, Auswahlzustände, Linien, Buttons, Fokus |
| Weiß | `#FFFFFF` | Hauptflächen, Text auf dunklen Flächen |
| Lichtgrau | `#F2F2F2` | alternative Sektionen, Karten, Formulare |
| Anthrazit | `#2A2A2A` | dunkle Sektionen, technische Bereiche, Footer |
| Graphit | `#3A3A3A` | Überschriften und Fließtext auf hellen Flächen |
| Mittelgrau | `#626262` | sekundärer Text mit ausreichender Lesbarkeit |
| Liniengrau | `#D8D8D8` | Trennlinien und ruhige Konturen |

### Farbregeln

- Türkis ist die einzige Akzentfarbe.
- Türkis nicht großflächig als Hintergrund einsetzen, sondern gezielt führen.
- Auf dunklen Bildern immer einen kontrollierten Kontrastverlauf oder eine Textfläche verwenden.
- Grauer Text darf nicht so hell beziehungsweise dunkel werden, dass er nur dekorativ wirkt.
- Zustände dürfen sich nicht ausschließlich durch Farbe unterscheiden.

## 5. Typografie

### Display-Schrift

**Montserrat Meyer** aus `assets/fonts/montserrat-variable.ttf`.

Verwendung:

- H1 und große H2
- prägnante Kartenüberschriften
- wichtige CTAs und ausgewählte technische Bezeichnungen

Stil:

- Großbuchstaben bei Hero- und Kampagnenüberschriften
- Gewicht in der Regel `750–900`
- klar, kompakt und kraftvoll
- leicht geöffnetes Letterspacing statt gequetschter Buchstaben
- ausreichend Zeilenabstand für Ä, Ö und Ü

### Leseschrift

`"Helvetica Neue", Helvetica, Arial, sans-serif`

Verwendung:

- Fließtexte
- Navigation
- Formulare
- Erklärungen
- technische Beschriftungen

Die Leseschrift darf filigran wirken, muss aber groß genug bleiben.

### Größen und Hierarchie

- Hero-H1 Desktop: etwa `68–136 px`, maximal zwei Zeilen
- Hero-H1 Mobil: etwa `44–58 px`, maximal drei kurze Zeilen, bevorzugt zwei
- große H2 Desktop: etwa `48–94 px`
- große H2 Mobil: etwa `38–52 px`
- H3: etwa `24–36 px`
- Fließtext: mindestens `16 px`, bevorzugt `17–19 px`
- Navigation und Buttons: mindestens `14 px`
- Labels und technische Metadaten: mindestens `13–14 px`, bevorzugt `15 px`

### Harte Lesbarkeitsregeln

- Kein inhaltlich relevanter Text unter `14 px`.
- Fließtexte niemals unter `16 px`.
- Fließtext-Zeilenhöhe: `1.55–1.75`.
- Display-Zeilenhöhe: `0.9–1.05`, bei Umlauten immer visuell prüfen.
- Fließtextbreite: ungefähr 45–72 Zeichen pro Zeile.
- Überschriften grundsätzlich auf zwei aussagekräftige Zeilen optimieren.
- Feine Schrift wird durch Größe und Kontrast ausgeglichen, nicht durch extrem dünne Gewichte.

## 6. Layout und Abstände

Das Layout arbeitet mit großen ruhigen Flächen, klaren Achsen und präzisen Trennlinien.

### Grundraster

- globaler Seitenabstand: `clamp(24px, 5.5vw, 88px)`
- große Sektionsabstände Desktop: ungefähr `105–175 px`
- große Sektionsabstände Mobil: ungefähr `72–110 px`
- Inhaltsbreite nicht künstlich auf schmale Standardcontainer reduzieren
- Text und Bild dürfen asymmetrisch angeordnet werden, müssen aber gemeinsame Achsen besitzen

### Form

- Ecken überwiegend gerade
- Rundungen nur funktional, etwa bei Statuspunkten oder Avataren
- Schatten weich und zurückhaltend
- dünne Linien statt schwerer Rahmen
- technische Raster nur in dunklen System- oder Blueprint-Bereichen

## 7. Bildsprache

### Architekturaufnahmen

- moderne hochwertige Wohnarchitektur in Deutschland
- natürliche Tageslichtstimmung oder dezente Golden-Hour-Wärme
- realistische Materialien: Dachziegel, Zink, Putz, anthrazitfarbene Fenster
- keine Menschen, Autos oder ablenkenden Requisiten
- ruhige Landschaftsgestaltung
- genügend freie Fläche für Texte und Marker
- Gebäude niemals unkontrolliert so stark vergrößern, dass das Bild sichtbar unscharf wird

### Scroll-Tour

- Alle Szenen zeigen dasselbe Gebäude beziehungsweise glaubwürdig dieselbe Architektur.
- Für Nahaufnahmen werden eigene scharfe Bilder verwendet; keine extremen digitalen Zooms.
- Bildanschlüsse müssen weich wirken und dürfen kein drittes Bild aufblitzen lassen.
- Marker müssen exakt auf dem jeweiligen Bauteil sitzen.
- Helle Bildbereiche benötigen dunkle Label-Flächen oder ausreichend starke Kontrastunterstützung.

### Grafiken

- technische Schnittgrafiken sind abstrahiert, aber konstruktiv verständlich
- Aufbau immer in der tatsächlichen Reihenfolge zeigen
- ausgewählte Ebenen klar hervorheben, ohne Leuchteffekt
- Linien, Schraffuren und Materialwechsel sparsam verwenden
- Grafiken müssen auch ohne Animation verständlich bleiben

## 8. Komponenten

### Kopfzeile

- transparente beziehungsweise dunkle Kopfzeile im Hero
- Meyer-Logo gut sichtbar, nicht mikroskopisch klein
- Navigation kurz und eindeutig
- wichtigste Direktaktion darf Türkis verwenden
- Mobilnavigation mit großen berührbaren Zielen

### Buttons und Links

- Mindesthöhe: `48 px`, bevorzugt `50 px`
- klare Verben: „Schaden melden“, „Fenster erfassen“, „Leistung entdecken“
- Primärbutton: Türkis mit dunkler Schrift
- Sekundärbutton: ruhiger Rahmen, kontrastreiche Schrift
- Pfeile und Linien dienen der Richtung, nicht der Dekoration
- sichtbare Hover-, Fokus- und Aktivzustände

### Karten

- keine generischen abgerundeten SaaS-Karten
- klare Nummerierung und Informationshierarchie
- dünne Rahmen oder Trennlinien
- Bild, Titel, Nutzen und Aktion als zusammenhängende Einheit
- ausgewählte Karte zusätzlich durch Rahmen, Position und Typografie kennzeichnen
- der Leistungs-Schnellzugriff zeigt ausschließlich Leistungen: Steildach, Flachdach und Terrassen, Photovoltaik, Reparaturen und Wartung sowie Dachflächenfenster
- diese fünf Leistungskarten stehen am Desktop in genau einer gemeinsamen Reihe
- mobil wird dieselbe Reihenfolge als horizontal einrastende Galerie mit sichtbarem Anschnitt der nächsten Karte angeboten

### Formulare

- Reparatur und Dachfenster sind getrennte, klar benannte Assistenten
- wenige verständliche Schritte statt eines langen Formularblocks
- Fortschritt jederzeit sichtbar
- aktive Auswahl deutlich größer und kontrastreicher
- Fehler direkt am Feld erklären
- Foto-Upload leicht auffindbar
- Datenschutzhinweis lesbar, nicht als Kleingedrucktes verstecken
- auf Mobilgeräten Auswahl und zugehörige Grafik gleichzeitig erfassbar halten

### Dämmkonzepte

- immer drei konstruktiv verständliche Varianten zeigen:
  1. Basisdämmung
  2. Premiumdämmung
  3. Exklusivdämmung
- alle Varianten folgen derselben Vergleichslogik
- eigene Schnittgrafik je Konzept
- Hersteller- und Produktnamen vermeiden
- U-Werte nur als Orientierung ausweisen
- keine Garantie- oder Förderversprechen ohne fachliche Prüfung

### Partner

- keine gleichförmige Logo-Kachelwand
- Logos als kuratierte architektonische Konstellation darstellen
- wechselnde Formate und Höhen sind erlaubt, gemeinsame Achsen bleiben erhalten
- Logos zunächst ruhig beziehungsweise reduziert, bei Interaktion originalfarbig
- zukünftige Logos müssen sich ohne komplettes Redesign ergänzen lassen

### FAQ

- Accordion mit klarer Frage als vollständigem Klickziel
- nur eine einfache Öffnungsbewegung
- Antworttexte gut lesbar und nicht zu breit
- vollständig per Tastatur bedienbar

## 9. Homepage-Informationsarchitektur

Die bevorzugte Reihenfolge lautet:

1. Hero mit lokaler H1 „Dachdecker Köln. Mit System.“; der Markenclaim „Dächer mit System.“ bleibt die inhaltliche Leitidee
2. priorisierter Direkt-Service für Reparatur und Dachfenster
3. visueller Schnellzugriff auf die fünf priorisierten Leistungen; Partner, Team und Karriere sind dort nicht enthalten
4. interaktiver Dachaufbau
5. Vergleich der drei Dämmkonzepte
6. Dach-Check beziehungsweise Bedarfseinstieg
7. transparenter Ablauf
8. Partner
9. FAQ
10. Footer und Kontaktwege

Eine separate Beratungssektion und ein eigener Navigationspunkt „Beratung“ sind nicht vorgesehen. Beratung bleibt als Haltung in Formularen, Projektablauf und Teamkommunikation sichtbar.

Die Projektsektion bleibt vorerst entfernt.

## 10. Scroll-Tour und Bewegung

Die Gebäudetour ist ein optionales Erlebnis, kein Hindernis vor den wichtigsten Inhalten.

### Regeln

- Tour nur bewusst durch „Interaktive Tour starten“ öffnen
- nach Abschluss oder Abbruch vollständig ausblenden
- Nutzer direkt zur ersten regulären Sektion weiterführen
- Navigation darf nicht jede Tour-Szene zwangsweise abspielen
- Scrollstrecken kurz genug halten, damit eine Szene ohne übermäßiges Mausrad-Drehen wechselt
- Übergänge mit ruhigem Crossfade und leichter Kamerabewegung
- keine harten Bildkanten, Sprünge, Bounce- oder Glitch-Effekte
- Text, Schatten und Kontrastfläche gleichzeitig einblenden
- Animation erklärt Konstruktion, Reihenfolge oder räumlichen Zusammenhang

### Technik

- GSAP und ScrollTrigger lokal verwenden
- Animationen an den Scrollfortschritt binden, aber nicht träge machen
- vorzugsweise `transform` und `opacity` animieren
- schwere Medien lazy laden beziehungsweise vor Tourstart vorbereiten
- `prefers-reduced-motion` respektieren
- mobile Tour vereinfachen, aber nicht zu einer unverständlichen statischen Fläche machen

## 11. Responsive Verhalten

Primäre Prüfpunkte:

- Mobil: etwa `390 × 844 px`
- Tablet: etwa `768–1024 px`
- Desktop: etwa `1440 × 900 px`
- großer Desktop: etwa `1920 × 1080 px`

### Mobile Regeln

- kein horizontaler Seitenüberlauf
- wichtige Elemente nicht unter `44 × 44 px`
- Überschriften bewusst umbrechen, nicht zufällig auf vier bis fünf Zeilen fallen lassen
- Formulare, aktive Auswahl und Grafik räumlich zusammenhalten
- Partner dürfen als horizontale Snap-Liste funktionieren
- Tabellen und Vergleiche als gestapelte, vollständig beschriftete Einheiten darstellen
- Sticky-Aktionen dürfen Inhalt nicht verdecken

## 12. Barrierefreiheit

- semantische Überschriftenhierarchie mit genau einer H1 je Seite
- sichtbarer „Zum Inhalt springen“-Link
- vollständige Tastaturbedienung
- sichtbare Fokusmarkierung in Türkis plus Form- oder Konturänderung
- ausreichender Textkontrast nach WCAG AA
- Alt-Texte beschreiben Inhalt und Zweck, nicht nur „Bild“
- Formfelder besitzen echte Labels und verständliche Fehlermeldungen
- Zustände nicht ausschließlich über Farbe vermitteln
- `aria-expanded`, `aria-selected`, `aria-current` und Live-Status gezielt einsetzen
- Bewegung reduzierbar machen

## 13. Sprache und Inhalt

### Tonalität

- klar
- kompetent
- ruhig
- beratend
- persönlich, ohne alles an Pierre Meyer allein zu binden
- technisch korrekt, aber für Eigentümer verständlich

### Bevorzugte Formulierungen

- „Team Meyer“
- „Fachberatung und Projektbetreuung“
- „klare Zuständigkeiten“
- „dokumentierte Übergabe“
- „ein abgestimmtes System“

### Vermeiden

- „Chefsache“
- Versprechen, dass Pierre Meyer jedes Projekt persönlich vollständig begleitet
- übertriebene Superlative
- ungesicherte Einspar-, Förder- oder U-Wert-Versprechen
- lange fachsprachliche Absätze ohne Einordnung

## 14. Technische Gestaltungsquellen

- globale Homepage: `index.html`, `styles.css`, `script.js`
- Navigation: `navigation.css`
- Leistungsseiten: `leistungen/leistungen.css`, `leistungen/leistungen.js`
- Karriere: `jobs/jobs.css`, `jobs/jobs.js`
- Rechtliches: `legal.css`
- Logo: `assets/meyer-logo-final.png`
- Display-Font: `assets/fonts/montserrat-variable.ttf`
- Scroll-Tour-Medien: `assets/hero-scenes/`
- Dämmkonzept-Grafiken: `assets/insulation-concepts/`

Wenn Code und dieses Dokument widersprechen, gilt für neue Arbeiten zunächst dieses Dokument. Eine bewusste Designänderung muss anschließend sowohl im Code als auch hier nachgeführt werden.

## 15. Abnahmecheckliste

Vor jedem Push prüfen:

- Entspricht die Änderung der Leitidee „Dächer mit System“?
- Bleibt Türkis die einzige Akzentfarbe?
- Sind alle relevanten Texte mindestens 14 px und Fließtexte mindestens 16 px groß?
- Haben Überschriften ausreichend Zeilen- und Buchstabenabstand?
- Bleiben große Überschriften möglichst bei zwei Zeilen?
- Sind Kontrast und Lesbarkeit auf echten Bildern ausreichend?
- Funktioniert die Änderung mit Tastatur und sichtbarem Fokus?
- Funktioniert sie bei 390 px ohne horizontalen Überlauf?
- Verdecken Sticky-Elemente keinen Inhalt?
- Erklärt jede Animation einen inhaltlichen Zusammenhang?
- Werden schwere Bilder in angemessener Auflösung und als WebP eingesetzt?
- Bleiben Formularzustände und Fehlermeldungen verständlich?
- Wurden Desktop und Mobil visuell im Browser geprüft?
- Gibt es keine Fehler oder Warnungen in der Browserkonsole?
