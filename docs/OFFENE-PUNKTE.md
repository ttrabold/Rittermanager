# Offene Punkte

Stand: 18.10.2026, nach dem Update „Spätes Spiel + Zufallsbeute“ (live mit Version v14, Commit `cd82053`).

## Zufallsbeute – Feinschliff

Aus der unabhängigen Prüfung, bewusst aufgeschoben:

- [ ] **Namenszusatz und Leuchtfarbe** richten sich nach dem ersten gewürfelten Effekt statt nach dem stärksten (`js/loot.js`, `genItem`).
- [ ] **Basisnamen unter Stufe 10** passen nicht zum Wert, zum Beispiel „Holzschwert +16“. Ein „Holzschild +5“ ist besser als das Turmschild (+4).
- [ ] **Ritter-Darstellung:**
  - Zufallsschwerter leuchten nicht, die anderen Waffenarten schon (`js/art.js`, Schwert-Pfad ohne Glow).
  - Das Waffenmodell nimmt die Stufe der Marktwaffe statt der des Fundes.
  - Jeder verzauberte Schild wird als Turmschild gezeichnet.
- [ ] **Vergleich (▲/▼):**
  - Bei Ausweichen fehlt das „%“.
  - Die Grundwirkung der Waffenart, etwa Bogen +12 % Krit gegen Axt mit Blutung, wird nicht verglichen.
  - Runen auf dem angelegten Teil werden ignoriert, Aufwertungen dagegen mitgerechnet.
- [ ] **Ganzzahl-Effekte** (LP, Heilung, Ausweichen) wachsen über Gegenstandsstufe 50 weiter, Prozent-Effekte nicht.
- [ ] **Keine Warnung**, wenn ein Fund den Beutel überfüllt. Man merkt es erst an den gesperrten Knöpfen auf der Burg.
- [ ] **Veraltete Texte:**
  - In `js/unlock.js` steht „mit Pokal und Turnierschatz“.
  - In der Anleitung liest sich die Tabelle so, als gäbe die 10. Turm-Etage zwei Funde. Es ist einer, dafür eine Seltenheit besser.
- [ ] **Test „Alle Bosse besiegbar (Ablauf)“** hängt davon ab, dass der Beutel nicht überläuft. Besser den Beutel in der Schleife leeren.
- [ ] **`findLastIndex`** in `rarRoll` braucht Safari 15.4 oder neuer. Zur Sicherheit durch eine einfache Schleife ersetzen.

## Übersetzungen (i18n, Version v15)

- [ ] **Englische Texte beim echten Spielen gegenlesen**, vor allem Kampflog, Ereignisse und Anleitung. Ton und Begriffe (HP, XP, Fame) einmal durchgehen.
- [ ] **`manifest.webmanifest` und `<meta name="description">`** sind nur deutsch. Bei installierter App bleibt der Name „Ritter Manager“ ohnehin gleich.
- [ ] **Englische Anleitung** wird online erst gefunden, wenn `ANLEITUNG.en.md` auf `main` liegt (Rückfall-Adresse auf GitHub).
- [ ] **Veralteter Text** „mit Pokal und Turnierschatz“ (Freischaltung Turnier) steht jetzt in beiden Sprachdateien (`feat.tour`).

## Balance

- [ ] **`simRun` hängt ab etwa Tag 60–90** (Browser reagiert nicht mehr). Gilt auch für den Stand vor i18n (v14), bis Tag 60 läuft alles in ~150 ms. Vermutlich räumt die Simulation den vollen Beutel nicht auf, und Turm/Turnier/Boss bleiben gesperrt. In `tests/sim.js` den Beutel leeren (`salvageAll`) oder die Schleife absichern.

- [ ] **Beim echten Spielen prüfen, ob das Spiel mit Zufallsbeute zu leicht geworden ist.** Die Simulation verliert nur noch 2–8 Bosskämpfe, vorher waren es 8–27. Stellschrauben in `genItem`: Grundwert-Faktoren, Seltenheitsbonus und Turm-Bonus (`lvl()+Etage/10` in `js/combat.js`).
- [ ] **Vulkanus (Boss 3)** ist in manchen Simulationsläufen eine starke Hürde, mit bis zu ~50 Niederlagen in einem Ausreißer. Das gab es schon vor den Änderungen.
- [ ] **Schilde** sind ein dritter verzauberter Platz mit zusätzlicher Stärke. Beobachten, ob das zu viel ist.
- [ ] **Kriegskasse** (100 Gold pro Stufe für 15 Ruhm pro Stufe): Die Simulation wartet zusätzlich auf eine Mindeststufe für Bosse, deshalb zeigt sie die Wirkung nicht. Beim echten Spielen prüfen, ob sie das Warten auf Ruhm spürbar verkürzt.

## Ideen für später

- Eine Anzeige der Spielstatistik
- Ein Erfolgssystem
- Ein fester Wochen-Turm mit Bestenliste

## Hinweise zum Arbeiten

- Größere Änderungen erst ins Test-Repo: `git push test <branch>:main`, Vorschau unter https://ttrabold.github.io/Rittermanager-test/.
- Tests: `tests/index.html` im Browser öffnen. Balance: `tests/sim.js` auf der Testseite laden und `simRun(400)` aufrufen.
- Nach Änderungen `?v=` in `index.html` und `CACHE` in `sw.js` erhöhen.
