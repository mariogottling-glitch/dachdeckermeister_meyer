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

---

# Design QA – Einstieg zum Projekt-Assistenten

## Prüfgrundlage

- Visuelle Ausgangslage: `C:\Users\Mario\AppData\Local\Temp\codex-clipboard-ffc158c8-8953-467b-883f-780e1db8ada6.png`
- Browser-Implementierung: `qa/inquiry-assistant-qa/implementation-final-desktop.png`
- Direkter Vorher-Nachher-Vergleich: `qa/inquiry-assistant-qa/comparison-before-after.png`
- Viewports: 1440 × 900 px, 768 × 1024 px und 390 × 844 px
- Zustand: Assistent geschlossen; Öffnen-Interaktion zusätzlich getestet

## Findings

- **P1 – Funktionsbezeichnung behoben:** „Online-Assistent“ war in der Ausgangslage zu klein und wirkte wie eine technische Metainformation. Die neue Bezeichnung „Digitaler Projekt-Assistent“ steht kontrastreich in einem akzentuierten Funktionslabel.
- **P1 – Handlungsaufforderung behoben:** Die schmale Rahmenfläche machte „Anfrage starten“ schwer lesbar. Die neue türkisfarbene Primäraktion „Projekt-Assistent öffnen“ erreicht 15 px Schriftgröße, mindestens 74 px Höhe und beschreibt zusätzlich den möglichen Inhalt.
- **P2 – Nutzenkommunikation behoben:** Die Ausgangslage erklärte nicht, was nach dem Klick geschieht. Ein kurzer Nutzenabsatz und die Schritte 01–03 erklären Auswahl, Angaben/Fotos und Rückmeldung vor dem Öffnen.
- **P2 – Visuelle Hierarchie behoben:** Titel, Erklärung, Ablauf und Aktion besitzen jetzt klar getrennte Ebenen. Die Gestaltung bleibt gemäß `design.md` geradlinig, architektonisch und nutzt Türkis ausschließlich als Akzent.
- **Responsivität bestanden:** Dokument- und Scrollbreite stimmen an allen drei Viewports überein. Die Karte misst 372 px Höhe auf Desktop, 380 px auf Tablet und 463 px auf Mobil; es gibt keinen horizontalen Überlauf.
- **Interaktion und Barrierefreiheit bestanden:** Öffnen setzt `aria-expanded`, zeigt den Assistenten und verschiebt den Tastaturfokus zur ersten Auswahl. Der Fokuszustand der Primäraktion ist sichtbar; bei fehlendem JavaScript bleibt das vollständige Formular verfügbar.
- **Konsole bestanden:** Bei der Browserprüfung wurden keine Fehler oder Warnungen ausgegeben.

## Fidelity-Oberflächen

- **Typografie:** Relevante Labels und Aktionen liegen bei mindestens 14 px; Funktionslabel und CTA bei 15 px. Montserrat Meyer kennzeichnet Titel und Aktion, die Leseschrift bleibt für Erläuterungen erhalten.
- **Abstände und Rhythmus:** Die frühere leere rechte Rahmenfläche wurde durch eine kompakte Aktionsfläche ersetzt. Dünne Linien, gerade Ecken und gemeinsame Achsen entsprechen dem bestehenden System.
- **Farben:** Anthrazit, Weiß, Grau und Meyer-Türkis entsprechen den bestehenden Tokens; der Primärbutton verwendet den vorgesehenen Türkis-Hintergrund mit dunkler Schrift.
- **Bild- und Assetqualität:** Die Komponente benötigt keine Bild- oder Illustrationsassets. Es wurden keine Platzhalter oder dekorativen Ersatzgrafiken ergänzt.
- **Copy:** Funktionsname, Zeitbedarf, Ablauf und Ergebnis sind vor dem Öffnen verständlich; die Aktion verwendet das eindeutige Verb „öffnen“.

## Vergleichsverlauf

- Pass 1: Ausgangslage geprüft; unscheinbare Funktionsbezeichnung und kontrastarme, hohe Rahmenaktion als P1 erfasst.
- Pass 2: Funktionslabel, Nutzenbeschreibung, Dreischritt und kontrastreiche Primäraktion umgesetzt.
- Pass 3: Auf Mobil war der Ablauf zunächst vertikal zu hoch. Die drei kurzen Schritte wurden nebeneinander angeordnet; Kartenhöhe sank von 536 px auf 463 px.
- Pass 4: Desktop, Tablet, Mobil, Öffnen/Fokus, horizontale Breite und Browserkonsole erneut geprüft. Keine P0/P1/P2-Befunde offen.

## Focused evidence

Der fokussierte Vergleich ist in `qa/inquiry-assistant-qa/comparison-before-after.png` zusammengeführt. Er zeigt links die Ausgangslage und rechts die überarbeitete Funktionshierarchie. Die vollständige Browseransicht ist in `qa/inquiry-assistant-qa/implementation-final-desktop.png` dokumentiert.

final result: passed
