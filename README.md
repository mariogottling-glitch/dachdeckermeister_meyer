# Dachdeckermeister Meyer

Responsive, self-contained website concept for a premium roofing company.

## Preview

Open `index.html` directly in a browser, or serve the folder with any static file server.

## Files

- `index.html` — semantic page structure and German content
- `styles.css` — responsive visual system and motion
- `script.js` — navigation, GSAP hero timeline, roof layers, service tabs, reveals and form submission
- `send-inquiry.php` — server-side validation, protected photo uploads, SMTP delivery and customer confirmation
- `form-config.example.php` — deployment template for the private SMTP configuration
- `assets/hero-cinematic.webp` — optimized architectural master image for the scroll-driven hero
- `assets/hero-scenes/` — sharp, matching close-up views for each hero focus point
- `vendor/` — local GSAP and ScrollTrigger runtime
- `assets/meyer-logo-final.png` — vollständiges finales Meyer-Logo, transparent und verlustfrei für das Web zugeschnitten

## Inquiry form deployment

The project inquiry is connected to a PHP backend. Before publishing it for the first time:

1. Copy `form-config.example.php` to `form-config.php` on the web server.
2. Enter the password of the STRATO mailbox used in `smtp_user`.
3. Keep `form-config.php` private. It is ignored by Git and must never be committed.
4. Use PHP 8 or newer and make sure `file_uploads` is enabled. The form accepts up to five JPG, PNG or WebP files, 5 MB each and 15 MB in total.
5. Test one complete inquiry on the HTTPS production domain and check both the business mailbox and the customer's confirmation email.

The backend validates all relevant fields and file types again on the server, uses a honeypot, a minimum completion time and short-term IP-based rate limiting, and does not permanently store uploaded photos on the web server.
