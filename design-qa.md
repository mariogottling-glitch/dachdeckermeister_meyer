# Design QA – Dämmkonzepte

## Prüfgrundlage

- Visuelle Referenz: `C:\Users\Mario\AppData\Local\Temp\codex-clipboard-8f7a8aff-bd64-4167-8e0e-24d6e761e066.png`
- Implementierung: `index.html#sanierungskonzepte`
- Desktop-Evidenz: `qa/daemmkonzepte-card-top.png`, `qa/daemmkonzepte-card-details.png`
- Mobile-Evidenz: `qa/daemmkonzepte-mobile.png`
- Geprüfte Viewports: 1440 × 1000 px und 390 × 844 px
- Geprüfter Zustand: Premiumdämmung vorausgewählt; Wechsel auf Exklusivdämmung getestet

## Vergleich und Befunde

1. **Informationsarchitektur – behoben (P1):** Die frühere abstrakte Auswahl „Effizienz / Komfort / Zukunft“ erklärte keine drei Bauweisen. Die neue Fassung zeigt Basis-, Premium- und Exklusivdämmung gleichzeitig als drei eindeutig benannte Konstruktionsprinzipien.
2. **Grafische Unterscheidung – behoben (P1):** Jede Variante besitzt eine eigene, projektbezogene Schnittdarstellung. Zusätzliche Dämmebenen und Aufbauhöhe nehmen von Basis zu Exklusiv sichtbar zu. Hersteller und Produktnamen werden nicht verwendet.
3. **Vergleichbarkeit – behoben (P1):** Prinzip, beispielhafte Schichtenfolge, Wärme-, Hitze- und Schallschutz sowie U-Ziel stehen in identischer Reihenfolge. Die Premiumdämmung ist als Empfehlung erkennbar, ohne die anderen Varianten zu verdecken.
4. **Lesbarkeit – behoben (P2):** Die zunächst zu kleinen Listen- und Erklärungstexte wurden nach Browserprüfung auf 14 bzw. 15 px angehoben. Überschriften, Nummerierung und Leistungsbalken bilden eine klare Hierarchie.
5. **Responsivität – bestanden:** Bei 390 px bleibt jede Karte vollständig in einer Spalte; Grafik, Auswahlzustand und Erläuterung bleiben zusammen. Gemessen wurden 375 px Dokumentbreite bei 375 px Scrollbreite, also kein horizontaler Überlauf.
6. **Interaktion und Zugänglichkeit – bestanden:** Die drei Auswahlknöpfe sind als Radiogruppe umgesetzt, besitzen sichtbare Fokuszustände und aktualisieren Auswahlrahmen, Formwert und Potenzial-Check. Die Bildbeschreibungen erläutern die jeweilige Konstruktion.
7. **Technik – bestanden:** JavaScript-Syntax, Diff-Whitespace und Browserkonsole wurden geprüft. Die drei WebP-Illustrationen werden lazy geladen und umfassen zusammen rund 293 KB.

## Vergleichsverlauf

- Pass 1: Referenz und vorhandene Ein-Grafik-Lösung verglichen; fehlende Bauweisen und geringe Verständlichkeit als P1 erkannt.
- Pass 2: Drei sichtbare Karten mit separaten Schnittbildern und einheitlichen Vergleichsfeldern umgesetzt.
- Pass 3: Desktop- und Mobile-Viewport geprüft; zu kleine Detailtexte als P2 erkannt und vergrößert.
- Pass 4: Auswahlwechsel auf Exklusivdämmung, Formularwert, U-Ziel, Überlauf und Konsole erneut geprüft.

## Ergebnis

passed
