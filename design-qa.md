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

## Steildach-Landingpage nach Kundenvorlage – 21.07.2026

**Source visual truth**

- `qa/steildach-page-qa/source-reference.png`

**Implementation evidence**

- `qa/steildach-page-qa/implementation-desktop-hero.png`
- `qa/steildach-page-qa/implementation-desktop-cards.png`
- `qa/steildach-page-qa/implementation-mobile-hero.png`
- Gemeinsamer Vollvergleich: `qa/steildach-page-qa/comparison-source-final.png`

**Viewport und Zustand**

- Desktop: 1440 × 900 px, Hero im Ausgangszustand und Sanierungswege nach Sprunglink
- Mobil: 390 × 844 px, Hero im Ausgangszustand
- Vorher-/Nachher-Regler bei 54 %, erste Orientierungskarte ausgewählt

**Findings**

- Keine offenen P0/P1/P2-Befunde.
- Die Referenz kombiniert Hero und Karten in einem kürzeren Bildschirm. Die Umsetzung nutzt bewusst den für Meyer festgelegten vollhohen Hero und zeigt die drei Wege direkt darunter; Vergleichslogik, Dreiteilung, dunkle Materialität und türkise Auswahlführung bleiben erhalten.
- Die in der Referenz gezeigten pauschalen U-Werte, Förderampeln und Qualitätsstufen wurden nicht übernommen. Sie wären ohne konkrete Konstruktion, Bestandsprüfung und Förderplanung missverständlich.

**Fidelity-Oberflächen**

- Typografie: Montserrat Meyer für prägnante Überschriften, gut lesbare Fließtexte und keine abgeschnittenen Wörter auf 390 px.
- Abstände: Vollhoher Hero, klare Trennung zur Orientierung, bündige Dreierspalte am Desktop und einspaltige Karten mobil.
- Farben: bestehendes Anthrazit, Weiß und Meyer-Türkis ohne neue Fremdfarben.
- Bilder: zwei pixelgleich ausgerichtete, scharfe Dachansichten desselben Hauses; glaubwürdiger Bestand und sanierter Zustand.
- Copy: sachliche Sanierungswege, keine pauschalen Preis-, Förder- oder Haltbarkeitsversprechen; offizielle GEG- und BAFA-Quellen verlinkt.

**Primäre Interaktionen**

- Range-Regler aktualisiert den Bildvergleich und besitzt eine zugängliche Beschriftung.
- Alle drei Orientierungskarten setzen Auswahlzustand, `aria-pressed`, Zusammenfassung und Anfrage-Link korrekt.
- Mobile Navigation, Sprunglink, externe Fachquellen und Anfrage-CTA geprüft.
- Browserkonsole: keine Fehler oder Warnungen.
- Horizontaler Überlauf: 0 px bei 1440 px und 390 px.

**Vergleichsverlauf**

- Pass 1: Visueller Aufbau übertragen; Bestandsbild erzeugt und drei fachlich belastbare Sanierungswege formuliert.
- Pass 2: Falsch positionierte Bestandsbeschriftung korrigiert, Orientierungstitel verdichtet und mobilen Menütext visuell verborgen.
- Pass 3: Mobilen Überlauf in der Faktensektion entfernt; Desktop- und Mobilansichten sowie Interaktionen erneut geprüft.

**Follow-up Polish**

- P3: Sobald reale Vorher-/Nachher-Fotos eines ausgeführten Meyer-Projekts vorliegen, sollten die derzeit eigens erzeugten, aber glaubwürdigen Vergleichsbilder ersetzt werden.

final result: passed

## Einheitliche Kopfzeile – 21.07.2026

- **P1 – Seitenwechsel ohne Navigationssprung:** Karriere, Team, alle sieben Leistungsseiten sowie Impressum und Datenschutz verwenden nun dieselben Header-Abmessungen, Menüpunkte und dieselbe Kontaktaktion wie die Startseite.
- **Desktop bestanden:** Bei 1440 px wurden auf Startseite, Karriere, Team, Photovoltaik, Steildach und Impressum jeweils `82 px` Headerhöhe, `90 px` Logobreite und `15 px` Navigation gemessen; horizontaler Überlauf: `0 px`.
- **Tablet/Mobil bestanden:** Bei 768 px und 390 px beträgt die Kopfzeile `70 px`, das Logo `74 px`. Das Menü öffnet und schließt korrekt, setzt `aria-expanded`, reagiert auf Escape und erzeugt keinen horizontalen Seitenüberlauf.
- **Scrollverhalten bestanden:** Die Kopfzeile blendet beim Herunterscrollen aus und beim Hochscrollen wieder ein – jetzt auch auf Unterseiten.
- **Konsole bestanden:** Keine Fehler oder Warnungen auf den geprüften Karriere-, Leistungs- und Rechtstextseiten.

final result: passed

---

# Design QA – Leistungs-Schnellzugriff

## Prüfgrundlage

- Visuelle Referenz: `C:\Users\Mario\AppData\Local\Temp\codex-clipboard-af3d6903-5b00-489e-a797-cf07eb4ed167.png`
- Browser-Implementierung Desktop: `qa/services-directory-qa/implementation-desktop.png`
- Browser-Implementierung Mobil: `qa/services-directory-qa/implementation-mobile.png`
- Gemeinsame Vergleichsevidenz: `qa/services-directory-qa/comparison-source-final.png`
- Viewports: 1440 × 1200 px und 390 × 844 px
- Zustand: Homepage direkt am Anker `#leistungen`; Rücksprung von einer Leistungsseite zusätzlich getestet

## Findings

- **P1 – Vermischte Zielarten behoben:** Die Referenz mischte Leistungen mit Partnerbetrieben, Team und Karriere. Die neue Fassung enthält ausschließlich fünf Leistungsziele und unterstützt damit die gewünschte schnellere Auswahl.
- **P1 – Zusätzliche Übersichtsseite aus dem Nutzerweg entfernt:** Alle Navigations-, Footer- und Breadcrumb-Links „Leistungen“ führen nun zur Homepage-Sektion `#leistungen`. Der alte Pfad `/leistungen/` leitet bestehende externe Aufrufe dorthin weiter und ist aus der Sitemap entfernt.
- **P2 – Desktop-Raster behoben:** Alle fünf Karten stehen bei Desktopbreite in einer einzigen Reihe. Gemessen wurden fünf gleich breite Spalten zu jeweils rund 252 px bei 1440 px Viewport.
- **P2 – Mobile Bedienung behoben:** Bei 390 px wird die Reihe zur horizontalen Scroll-Snap-Galerie. Die erste Karte ist 320 × 390 px groß; der Anschnitt der nächsten Karte und ein kurzer Hinweis kommunizieren die Wischrichtung.
- **Responsivität bestanden:** Die mobile Galerie besitzt 1659 px eigenen Scrollinhalt, während Dokument- und Seitenbreite beide 375 px betragen. Es entsteht kein horizontaler Seitenüberlauf.
- **Interaktion bestanden:** Alle fünf Karten bleiben vollständige Links. Der Navigationslink einer Leistungsseite führt nach dem Seitenaufbau korrekt zu `/index.html#leistungen`.
- **Konsole bestanden:** Bei Desktop-, Mobil- und seitenübergreifender Linkprüfung wurden keine Fehler oder Warnungen ausgegeben.

## Fidelity-Oberflächen

- **Typografie:** Kartentitel verwenden Montserrat Meyer mit stabiler weißer Hierarchie; mobile Titel wurden bewusst auf 23–29 px angehoben. Metadaten bleiben mindestens 13 px groß.
- **Abstände und Rhythmus:** Desktop nutzt fünf bündige, nur durch feine Linien getrennte Spalten. Mobil bleiben Kartenhöhe, Anschnitt, Wischhinweis und nachfolgende Sektion klar getrennt.
- **Farben:** Anthrazit und Weiß dominieren; Meyer-Türkis bleibt Akzent für Nummerierung, Pfeile, Fokuslinie und Scrollindikator.
- **Bild- und Assetqualität:** Die bereits vorhandenen, leistungsspezifischen Projektbilder werden ohne Platzhalter wiederverwendet und mit `object-fit: cover` passend beschnitten.
- **Copy:** Partnerbetriebe, Team und Karriere wurden entfernt. Die verbleibenden fünf Titel entsprechen den priorisierten Kundenzielen.

## Vergleichsverlauf

- Pass 1: Referenz geöffnet; gemischte Acht-Kachel-Struktur und zweireihige Desktop-Darstellung als P1/P2 erfasst.
- Pass 2: Drei nicht leistungsbezogene Karten entfernt, Raster auf fünf Spalten umgestellt und alle Übersichtslinks auf `#leistungen` geführt.
- Pass 3: Mobile Zweispaltenansicht durch eine Scroll-Snap-Galerie ersetzt; Kartentexte und Wischhinweis vergrößert.
- Pass 4: Desktop, Mobil, Seitenbreite, Kartenzahl, Linkziel von einer Unterseite, Weiterleitung des alten Übersichtspfads und Browserkonsole erneut geprüft. Keine P0/P1/P2-Befunde offen.

## Focused evidence

`qa/services-directory-qa/comparison-source-final.png` zeigt Referenz und finale Desktopumsetzung in einer gemeinsamen Vergleichsansicht. Die mobile Galerie ist separat vollständig in `qa/services-directory-qa/implementation-mobile.png` dokumentiert.

final result: passed
