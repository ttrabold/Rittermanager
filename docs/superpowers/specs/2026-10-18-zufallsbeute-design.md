# Zufallsbeute mit Seltenheiten – Konzept

## Warum

Im späten Spiel fehlt ein Grund, noch einmal in Turm oder Turnier zu gehen: Alle Beutestücke sind feste Einzelstücke, und wer sie hat, bekommt nur noch Gold. Außerdem ist erbeutete Beute heute immer ein Schwert, und Schilde sind nach dem Turmschild uninteressant.

Ziel ist ein Beute-Kreislauf wie in **Diablo 3**: Du gehst in immer schwerere Inhalte und findest tendenziell bessere Ausrüstung, deren Werte aber zufällig sind. Spannend macht einen Fund vor allem, **wie gut er gewürfelt ist**, nicht Name oder Beschreibung.

## Ziele

- Zufallsbeute für **Waffen (alle 7 Waffenarten), Rüstungen und Schilde**
- Seltenheitsstufen bestimmen die Zahl der verzauberten Werte:
  - 🟢 Selten: 1 Wert
  - 🔵 Rar: 2 Werte
  - 🟣 Episch: 3 Werte
  - 🟠 Legendär: 4 Werte
- Schwierigere Quellen geben stärkere Grundwerte und bessere Chancen auf hohe Seltenheiten
- Unerwünschte Funde werden **zerlegt** und ergeben Materialien
- Ein **begrenzter Beutel** mit Sammelknöpfen hält das Aufräumen bequem
- **Vergleich** mit dem angelegten Teil bei jedem Fund

## Nicht-Ziele

- Kein Verkauf gegen Gold, denn Gold gibt es im späten Spiel schon genug
- Keine neuen Effektarten. Gewürfelt wird nur aus dem, was das Kampfsystem schon kennt.
- Keine neuen Ritter-Modelle. Waffenarten und Leuchtfarben gibt es schon.
- Gegner behalten ihre heutige verzauberte Ausrüstung aus der festen Liste.

## Darf nicht passieren

- Ein bestehender Spielstand verliert Gegenstände, Aufwertungen oder Runen
- Ein Fund verschwindet, ohne dass der Spieler gefragt wurde
- Die Spielbalance kippt: Die Simulation muss weiter durchlaufen, und die Werte dürfen nicht deutlich über den bisherigen festen Bossgegenständen gleicher Stufe liegen

## Entscheidungen des Nutzers

1. **Seltenheitsskala** wie WoW/Diablo, sie bestimmt die Zahl der verzauberten Werte.
2. **Die festen Beutestücke gehen in der Zufallsbeute auf.** Bosse, Turnier, Turm und Vollmond lassen nur noch Zufallsbeute fallen.
3. **Verzauberte Schilde** kommen als dritte Beute-Art dazu.
4. **Zerlegen in Materialien** statt Verkaufen, ein **begrenzter Beutel** und Sammelknöpfe. Aufwertungen zahlen sich beim Zerlegen zur Hälfte zurück. Beim Fund gibt es einen **Vergleich**. Diesen Vorschlag hat der Nutzer angenommen.

## Die Gegenstände

Jeder Fund wird beim Erzeugen einmal gewürfelt und im Spielstand gespeichert (`S.gear`). Felder: `id`, Slot `s` (`w`/`a`/`sh`), Waffenart `cat` (nur Waffen), Gegenstandsstufe `il`, Seltenheit `r` (0–3), Grundwert `b`, Effekte `fx`, Name `n`, Leuchtfarbe `c`.

- **Grundwert** (Schaden, Schutz) skaliert mit der Gegenstandsstufe. Er orientiert sich an den bisherigen festen Gegenständen: Bosswaffen haben etwa 1,6 × Boss-Stufe, Bossrüstungen etwa 1,05 × Boss-Stufe. Gewürfelt wird mit ±15 %. Höhere Seltenheit gibt einen kleinen Bonus.
- **Schilde** haben einen Grundschutz oberhalb des Turmschilds (+4), der mäßig mit der Stufe wächst, damit Schilde nicht die Rüstung ersetzen.
- **Effekte:** Gewürfelt wird ohne Doppelte aus dem Vorrat der Slot-Art.
  - Waffe: Brand, Gift, Lähmung, Krit, Lebensraub
  - Rüstung: max. LP, Regeneration, Ausweichen, Brandimmunität
  - Schild: max. LP, Regeneration, Ausweichen, Brandimmunität

  Die Stärke jedes Effekts richtet sich nach der Gegenstandsstufe. Gewürfelt wird in einer Spanne. Die Obergrenzen liegen in der Größenordnung der heutigen Endboss-Gegenstände, zum Beispiel Krit bis ~22 % und Lähmung bis ~25 %.
- **Waffenart:** wird zufällig gewürfelt und bringt ihre heutige Grundwirkung mit, eine Axt zum Beispiel die Blutung.
- **Name:** setzt sich zusammen aus dem Basisnamen der Waffenart oder Rüstungsstufe und einem Zusatz nach dem stärksten Effekt, etwa „Streitaxt der Glut“ oder „Plattenpanzer des Wächters“. Die Farbe in der Oberfläche zeigt die Seltenheit.

## Quellen

| Quelle | Gegenstandsstufe | Seltenheit |
|---|---|---|
| Turniersieg (am Turniertag 2 Funde) | Spielerstufe | meist 🟢/🔵, selten 🟣 |
| Turm-Boss (jede 5. Etage) | Spielerstufe + Etagenbonus | steigt mit der Etage, ab Etage ~30 auch 🟠 möglich |
| Turm, jede 10. Etage | wie Turm-Boss, eine Seltenheit besser | |
| Story-Boss (2 Funde) | Boss-Stufe | mindestens 🔵, gute Chance auf 🟣, kleine auf 🟠 |
| Vollmond-Werwolf | Spielerstufe | mindestens 🔵 |

Die Slot-Art wird zufällig gewürfelt: etwa 50 % Waffe, 30 % Rüstung, 20 % Schild. Die genauen Gewichte legt die Umsetzung fest und prüft sie mit der Simulation.

## Beutel, Zerlegen und Vergleich

- **Beutel:** 20 Plätze für nicht angelegte Zufallsbeute. Ist er voll, landet ein neuer Fund trotzdem im Beutel und es geht nichts verloren. Solange er übervoll ist, sind Turm, Turnier und Bosskampf gesperrt, mit dem Hinweis „Beutel voll – erst aufräumen“.
- **Zerlegen**, einzeln oder per Sammelknopf „Alles 🟢 zerlegen“ / „Alles 🔵 zerlegen“, im Inventar. Angelegtes ist nie betroffen. Ertrag:
  - 🟢 Selten: 2–3 Eisenerz oder Leder
  - 🔵 Rar: 1–2 Arkankristalle
  - 🟣 Episch: 2 Mithrilerz und 2 Arkankristalle
  - 🟠 Legendär: 1 Drachenschuppe und 2 Mithrilerz

  Dazu kommt die Hälfte der Materialien, die in Aufwertungen dieses Teils stecken. Runen gehen verloren, wie beim Entfernen heute.
- **Vergleich:** Bei jedem Fund und in der Beutelliste stehen die Unterschiede zum angelegten Teil derselben Slot-Art, also Grundwert und jeder Effekt mit ▲/▼.
- **Automatisch anlegen:** nur, wenn in dem Slot gerade keine verzauberte Ausrüstung getragen wird und der Grundwert höher ist. Sonst entscheidet der Spieler.

## Einbau in Bestehendes

- **Aufwerten und Runen** funktionieren für Zufallsbeute wie für die bisherigen verzauberten Gegenstände. Schilde lassen sich ebenfalls aufwerten (+1 Schutz je Stufe) und bekommen Rüstungsrunen.
- **Kampfwerte:** Schaden, Schutz und Effekte berücksichtigen den angelegten Zufallsschild (neuer Slot `S.es`) zusätzlich zu Waffe und Rüstung.
- **Ritter-Darstellung:** Die Waffe erscheint als Modell ihrer Waffenart mit der Leuchtfarbe des Gegenstands. Das Rüstungsleuchten funktioniert wie heute.
- **Alte Spielstände:** Bereits erbeutete feste Gegenstände bleiben, wie sie sind, samt Aufwertungen und Runen, und zählen nicht zum Beutel. Es fallen nur keine neuen mehr. Geschmiedete Gegenstände (Werkstatt) und die Neidklinge von Sir Gregor bleiben feste Gegenstände.
- **Wiedergeburt:** Zufallsbeute bleibt erhalten, wie heute die verzauberten Gegenstände.

## Dem Umsetzer überlassen

- die genauen Zahlen für Grundwerte, Effektspannen und Seltenheitsgewichte, geprüft mit der Simulation gegen die bisherigen Bossgegenstände
- die Namenszusätze
- die Gestaltung der Beutel- und Vergleichsansicht im bestehenden Inventar-Stil
- die Tests und die Erweiterung der Simulation (Ausrüstungswahl, Zerlegen)
- die Aktualisierung der Anleitung
