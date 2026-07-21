# Design-QA – Flachdach-Landingpage

Stand: 21. Juli 2026

## Vergleichsziel

- Source Visual Truth: `qa/flachdach-page-qa/source-client-reference.png`
- Implementierung: `http://127.0.0.1:4173/leistungen/flachdach.html`
- Desktop-Evidenz: `qa/flachdach-page-qa/implementation-desktop-1440x900.png`, `qa/flachdach-page-qa/implementation-desktop-uses-top.png`, `qa/flachdach-page-qa/implementation-desktop-uses-bottom.png`
- Tablet-Evidenz: `qa/flachdach-page-qa/implementation-tablet-hero.png`, `qa/flachdach-page-qa/implementation-tablet-768x1024.png`
- Mobile-Evidenz: `qa/flachdach-page-qa/implementation-mobile-390x844.png`, `qa/flachdach-page-qa/implementation-mobile-options.png`, `qa/flachdach-page-qa/implementation-mobile-menu.png`
- Direkter Vergleich: `qa/flachdach-page-qa/comparison-uses.png`
- Viewports: 1440 × 900, 2048 × 1100, 768 × 1024 und 390 × 844
- Zustand: Flachdachseite geladen; Nutzungsoption „Photovoltaik“ ausgewählt; Mobilnavigation geöffnet und wieder geschlossen

## Findings

Keine offenen P0-, P1- oder P2-Abweichungen.

- Typografie: Die Montserrat-Meyer-Hierarchie und die Leseschrift entsprechen dem bestehenden Designsystem. Kerntexte in Vergleichskarten sind am Desktop 18 px und mobil 17 px groß; Buttons bleiben 58 px hoch. Die Desktop-H1 belegt zwei Zeilen, mobil drei kurze Zeilen.
- Layout und Rhythmus: Hero ist auf allen geprüften Geräten mindestens eine volle sichtbare Höhe. Die drei Nutzungen stehen am Desktop in einer Reihe, am Tablet als großzügige Bild-Text-Einheiten und mobil vollständig gestapelt. Keine Inhalte überlagern sich.
- Farben und Tokens: Anthrazit, Weiß und Meyer-Türkis entsprechen den verbindlichen Tokens. Auswahlzustände werden zusätzlich über Rahmen, Fläche und `aria-pressed` vermittelt.
- Bildqualität: Hero und Dachterrasse verwenden vorhandene Meyer-Architekturaufnahmen. Gründach und Flachdach-Photovoltaik wurden als eigenständige, scharfe Projektassets mit passender Perspektive erzeugt. Keine Platzhalter oder Code-Grafiken.
- Copy und Fachlichkeit: Die Informationsarchitektur der Kundenvorlage wurde übernommen, aber pauschale Nutzenbalken, feste Dämmstärken, Paket-U-Werte und Förderampeln wurden bewusst durch Voraussetzungen, Planungsziele und technisch belastbare Aufbauprinzipien ersetzt. GEG und BAFA sind als offizielle Quellen verlinkt.
- Interaktionen: Die drei Nutzungen sind per Button auswählbar. Auswahltext, `aria-pressed` und vorausgefüllter Anfrage-Link werden synchron aktualisiert. Die mobile Navigation öffnet und schließt korrekt.
- Browserkonsole: Keine Fehler oder Warnungen in der finalen Desktop-Prüfung.

## Vergleichshistorie

1. Erster Mobiltest: P2 – lange Überschriften („Klare Voraussetzungen“ und „Photovoltaik“) erzeugten bei 390 px horizontalen Seitenüberlauf.
   - Fix: Kürzere Überschrift „Klar geplant“, mobil angepasste Displaygrößen und kontrolliertes `overflow-wrap` für lange technische Begriffe.
   - Post-Fix-Evidenz: `implementation-mobile-options.png`; `scrollWidth` und `clientWidth` sind beide 375 px, keine überlaufenden Elemente.
2. Post-Fix-Desktoptest: keine neuen P0/P1/P2-Findings. Drei Karten bleiben in einer gemeinsamen Reihe und alle Kernaussagen sind ohne Überlagerung lesbar.

## Full-view comparison evidence

`qa/flachdach-page-qa/comparison-uses.png` stellt die Kundenvorlage und die Meyer-Umsetzung gemeinsam dar. Übernommen wurden die starke dunkle Bühne, drei gleichwertige Nutzungsvarianten, die bildgestützte Orientierung und die klare Abschlussaktion. Die ruhigere Typografie, geraden Konturen und größere Lesetexte entsprechen bewusst dem Meyer-Designsystem.

## Focused region comparison evidence

Der direkte Vergleich fokussiert den entscheidenden Nutzungsbereich, weil dort Bildwahl, Kartenhierarchie, Typografie und fachliche Aussagen beurteilt werden müssen. Hero, Tablet und Mobil wurden zusätzlich separat browsergerendert geprüft.

## Implementation Checklist

- [x] Vollflächiger, responsiver Flachdach-Hero
- [x] Drei bildgestützte Nutzungsvarianten mit klaren Voraussetzungen
- [x] Technisch korrekte Konstruktions- und Sanierungsprinzipien statt Preis-/Qualitätspaketen
- [x] Vorausgefüllte Übergabe an den zentralen Online-Assistenten
- [x] Desktop-, Tablet- und Mobilprüfung ohne horizontalen Überlauf
- [x] Tastatur- und ARIA-Zustände der Auswahl sowie Mobilnavigation geprüft
- [x] Browserkonsole ohne Fehler oder Warnungen

## Follow-up Polish

Keine verbleibenden P3-Punkte für diese Ausbaustufe.

final result: passed
