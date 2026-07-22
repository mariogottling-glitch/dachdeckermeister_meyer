# Design-QA – Flachdach-Landingpage

Stand: 22. Juli 2026

## Vergleichsziel

- Source Visual Truth: `qa/flachdach-page-qa/source-client-build-reference.png`
- Ausgelieferte Implementierung: `https://dachdeckermeister-meyer.vercel.app/leistungen/flachdach.html`
- Desktop-Evidenz: `qa/flachdach-page-qa/implementation-builds-desktop-1440x900.png`, `qa/flachdach-page-qa/implementation-builds-selected.png`
- Tablet-Evidenz: `qa/flachdach-page-qa/implementation-builds-tablet-768x1024.png`
- Mobile-Evidenz: `qa/flachdach-page-qa/implementation-builds-mobile-390x844.png`
- Formularprüfung: Live-DOM-Prüfung der ausgelieferten Homepage mit Auswahlzustand, URL-Parametern und vorausgefüllten Feldwerten
- Direkter Vergleich: `qa/flachdach-page-qa/comparison-source-implementation-builds.png`
- Viewports: 1440 × 900, 768 × 1024 und 390 × 844
- Zustände: Projektziel „Energetisch sanieren“ und Nutzung „Photovoltaik“ ausgewählt; kombinierte Übergabe an den Online-Assistenten geprüft

## Findings

Keine offenen P0-, P1- oder P2-Abweichungen.

- Typografie: Die Vergleichstexte sind am Desktop und Tablet 18 px und mobil 17 px groß. Alle Auswahlbuttons sind mindestens 58 px hoch; Überschriften bleiben an den geprüften Breiten ohne Überlagerung lesbar.
- Layout und Rhythmus: Die drei Projektziele stehen am Desktop in einer gemeinsamen Reihe, am Tablet als großzügige Bild-Text-Einheiten und mobil vollständig gestapelt. `scrollWidth` und `clientWidth` sind in allen drei Prüfungen identisch.
- Farben und Zustände: Anthrazit, Weiß und Meyer-Türkis entsprechen dem Designsystem. Der aktive Zustand wird nicht nur farblich, sondern zusätzlich über Fläche, obere Akzentlinie und `aria-pressed` vermittelt.
- Bildqualität: Drei eigenständige, scharfe Aufbau-Grafiken zeigen Reparatur, energetischen Neuaufbau und vorbereitete Nutzung. Alle Bilder sind sichtbar als „Prinzipdarstellung“ gekennzeichnet und werden ohne Verzerrung zugeschnitten.
- Copy und Fachlichkeit: Die visuelle Logik der Kundenvorlage wurde übernommen. Unsichere Preis-/Qualitätspakete, feste Dämmstärken, pauschale U-Werte und Förderzusagen wurden durch nachvollziehbare Projektziele sowie projektbezogene Prüfhinweise ersetzt.
- Interaktionen: Nutzungs- und Projektzielauswahl aktualisieren jeweils Auswahlfläche und `aria-pressed`. Der Anfrage-Link enthält beide Parameter (`nutzung=photovoltaik&umfang=energie`). Auf der Homepage werden „Photovoltaik“ und „Energetisch sanieren“ im ausgewählten Flachdach-Assistenten vorausgefüllt.
- Browserkonsole: Keine Fehler oder Warnungen in der finalen ausgelieferten Prüfung.

## Vergleichshistorie

1. Kundenvorlage: starke visuelle Vergleichbarkeit, aber fachlich nicht belastbare Universalpakete „Günstig / Mittel / Hochwertig“ mit festen Dämmstärken, U-Werten und Förderampeln.
2. Umsetzung: dieselbe schnelle Drei-Karten-Entscheidung wurde auf die belastbaren Ziele „Abdichtung sichern“, „Energetisch sanieren“ und „Nutzung vorbereiten“ übertragen.
3. Post-Implementierungsprüfung: keine P0/P1/P2-Findings; Karten, Bilder, Texte, Buttons und Auswahlzustände bleiben auf Desktop, Tablet und Mobil vollständig nutzbar.

## Full-view comparison evidence

`qa/flachdach-page-qa/comparison-source-implementation-builds.png` zeigt Kundenvorlage und ausgelieferte Meyer-Umsetzung in einem gemeinsamen Bild. Übernommen wurden die dunkle Bühne, drei gleichwertige Aufbau-Grafiken und die schnelle Orientierung. Typografie, Konturen, Abstände und Türkis-Akzente folgen dem bestehenden Meyer-System.

## Focused region comparison evidence

Die kombinierte Vergleichsansicht fokussiert den neuen Projektziel-Bereich. Tablet und Mobil wurden separat geprüft, weil dort der Wechsel von drei Spalten zu Bild-Text-Zeilen beziehungsweise gestapelten Karten stattfindet.

## Implementation Checklist

- [x] Drei bildgestützte, fachlich sauber benannte Projektziele
- [x] Auswahlzustände mit Text, Fläche, Akzentlinie und `aria-pressed`
- [x] Kombinierte Übergabe von Nutzungswunsch und Projektziel
- [x] Sichtbare Vorbelegung im zentralen Online-Assistenten
- [x] Desktop-, Tablet- und Mobilprüfung ohne horizontalen Überlauf
- [x] Mindestschriftgrößen und 58-px-Auswahlbuttons geprüft
- [x] Browserkonsole ohne Fehler oder Warnungen

## Follow-up Polish

Keine verbleibenden P3-Punkte für diese Ausbaustufe.

final result: passed
