# Eigene Turm-Bosse und neue Turm-Ebenen bis Etage 100 – Konzept

## Warum

Im Endlosen Turm wiederholt sich zu viel:

- Alle 5 Etagen kommt ein Boss, aber das sind der Reihe nach die 12 Bosse aus dem Bosskampf (`BOSS[(n/5-1)%12]` in `towerFloor()`). Man kennt sie alle schon, und ab Etage 65 fangen sie wieder von vorn an.
- Die Kulisse wechselt alle 5 Etagen (`ttier()`), aber nach 8 Ebenen ist Schluss. Ab Etage 36 sieht und hört man für immer den Weltenriss.
- Bosse unterscheiden sich im Kampf nur durch Werte, Farbe und Angriffsliste. Es gibt keine Tricks, auf die man sich einstellen muss.

Ziel: **Bis Etage 100 ist jeder Turm-Boss neu, und alle 5 Etagen kommt eine neue Ebene.** Jeder Boss soll überraschen, durch sein Aussehen und durch etwas, das er im Kampf tut.

## Ziele

- **20 eigene Turm-Bosse** (Etagen 5, 10, … 100). Sie kommen nur im Turm vor. Die 12 Bosse aus dem Bosskampf erscheinen im Turm nicht mehr.
- Jeder Turm-Boss hat einen eigenen Namen, eigene Angriffsnamen, eine eigene SVG-Figur im Stil von `BOSSV` und eine kurze Beschreibung (zweisprachig).
- Jeder Turm-Boss hat **mindestens einen Kampftrick** (siehe unten). Weiter oben werden die Tricks schwerer und kombiniert: zwei Tricks ab etwa Boss 9, drei beim letzten Boss.
- **12 neue Ebenen** (Etagen 41–100). Damit gibt es 20 Ebenen, alle 5 Etagen eine neue, jede mit eigenem SVG-Hintergrund, Namen und Satz in der Sprachdatei (`tier`) und eigenen Umgebungsgeräuschen (`amb()`).
- **Nach Etage 100** beginnt es von vorn, als „Schatten“-Durchlauf: dieselben 20 Bosse und Ebenen, stärker, mit dunklerem Aussehen und Namenszusatz. Bei 200 kommt der zweite Schattendurchlauf usw.
- Turm-Bosse stehen im Bestiarium in einer eigenen Gruppe „Turm-Bosse“.

## Nicht-Ziele

- Keine Änderung an den 12 Bossen des Bosskampfs, ihren Werten, ihrer Reihenfolge oder ihrer Lore.
- Keine neue Beute und keine neuen Belohnungen. Turm-Beute bleibt wie heute (`lootGive("tower"/"tower10")`, Äther, Drachenschuppen jede 10. Etage).
- Keine Änderung an normalen Turm-Etagen (Gegner aus `ET`) außer der Kulisse.
- Keine neue Turm-Musik pro Ebene. Die neuen Ebenen nutzen eine der 8 vorhandenen Turm-Melodien (passend zum Thema) mit eigenem Tempo. Eigene Geräusche gibt es über `amb()`.

## Darf nicht passieren

- Etagen 5–60 werden deutlich schwerer oder leichter als heute. Die neuen Bosse ersetzen die alten an derselben Stelle mit ähnlicher Stärke.
- Ein Trick ist unfair, also nicht erkennbar oder nicht konterbar. Jeder Trick wird im Kampftext angekündigt und hat eine Gegenmaßnahme.
- Alte Spielstände brechen, oder ein Spieler steht nach dem Update auf einer Etage, die es nicht gibt.
- Der Schnellkampf oder die Balance-Simulation hängt wegen eines Tricks in einer Endlosschleife.

## Kampftricks

Die Tricks sind datengetrieben: ein Turm-Boss trägt `tr:{…}` mit den Tricks und ihren Werten, `combat.js` wertet sie allgemein aus. Jeder Trick braucht eine Zeile im Kampftext (Sprachdatei) und, wo sinnvoll, ein Symbol im Gegnerkasten.

| Trick | Was passiert | Gegenmaßnahme |
|---|---|---|
| **Aufladen** (`charge`) | Alle N Runden kündigt der Boss einen Riesenangriff an („… holt zum Rammstoß aus!“, Symbol ⚡). In der nächsten Runde trifft er sicher mit sehr hoher Wucht. | Deckung (Fähigkeit oder Eisenhaut-Trank) verringert den Treffer stark, Betäubung bricht das Aufladen ab. |
| **Helfer** (`minion`) | Der Boss ruft Diener (Anzahl, LP je Diener, Schaden je Diener). Solange Diener leben, gehen deine direkten Treffer zuerst auf die Diener, und jeder Diener greift pro Runde schwach an. Gift, Brand und Blutung treffen den Boss. Wird beim Kampfbeginn oder bei einer LP-Schwelle ausgelöst. | Mehrfachtreffer und starke Schläge räumen die Diener schnell ab. Schaden über Zeit geht direkt auf den Boss. |
| **Spiegeln** (`reflect`) | Angekündigt hebt der Boss für 1–2 Runden einen Spiegelschild (Symbol 🪞). Ein Teil deines direkten Schadens geht auf dich zurück. | Abwarten: heilen, Deckung, Stärkungen. Schaden über Zeit wird nicht gespiegelt. |
| **Phase** (`phase`) | Bei einer LP-Schwelle (meist 50 %) verwandelt sich der Boss: neuer Name oder Zusatz, neue Angriffsliste, anderes Aussehen (SVG-Variante), optional etwas Heilung. Bei diesen Bossen ersetzt die Phase die heutige Raserei (`enr`). | Kraft sparen (Fähigkeits-Punkte) für die zweite Phase. |
| **Wiedergeburt** (`revive`) | Einmal pro Kampf steht der Boss bei 0 LP mit einem Teil seiner LP wieder auf (Ankündigung, Animation). | Tränke und Punkte nicht zu früh verbrauchen. |
| **Versiegeln** (`seal`) | Ein Angriff mit Fluch sperrt eine deiner Fähigkeiten (nicht den Grundangriff „Hieb“) für 2 Runden. Die gesperrte Fähigkeit ist im Kampfmenü deaktiviert und markiert. | Andere Fähigkeiten nutzen. Ein Reinigungstrank oder „Reinigen“ hebt das Siegel auf (*meine Wahl*). |

### Trick-Regeln im Detail (meine Entscheidungen)

- **Helfer:** Jeder einzelne Treffer (auch jeder Treffer einer Mehrfach-Fähigkeit) geht auf den ersten lebenden Diener. Schaden, der über seine LP hinausgeht, verfällt. Effekte von Fähigkeiten und Verzauberungen (Gift, Brand, Blutung, Betäubung, Lebensraub) wirken auf den Boss. Diener werden je Auslöser einmal gerufen (Kampfbeginn und/oder LP-Schwellen aus `at`) und nicht nachgerufen, wenn alle tot sind.
- **Reihenfolge bei mehreren Tricks** im Gegnerzug: erst Wiedergeburt (beim Tod), dann Phase, dann Helfer rufen, dann Aufladen/Spiegeln, dann der Angriff. Ein Phasenwechsel bricht ein laufendes Aufladen und einen Spiegelschild ab, Diener und Siegel bleiben. Die Phase passiert höchstens einmal. Die Wiedergeburt setzt die LP zurück, löst aber keine schon durchlaufene Phase erneut aus. Steht der Boss mit LP unter der Phasenschwelle wieder auf und hatte die Phase noch nicht, kommt sie im nächsten Gegnerzug.
- **Schatten-Durchläufe** werden ohne Obergrenze stärker (+10 Stufen je Durchlauf), wie die normalen Etagen auch. Der Turm ist endlos, irgendwann ist Schluss.
- **Balance-Abnahme:** Referenzheld ist `hero(L)` von der Testseite mit `L = 10 + floor(Etage/2)`, ohne Sterne, mit der besten Laden-Ausrüstung, dazu je 3 Heil-, 2 Große-Heil- und 1 Reinigungstrank. Kampf-KI wie in `tests/sim.js`, 200 Kämpfe je Boss. Abnahme: Für 5–60 liegt die Siegquote des neuen Bosses höchstens 15 Prozentpunkte unter und höchstens 10 über der des alten Bosses an derselben Etage. Für 65–100 fällt sie von 10 zu 10 Etagen (Schwankung bis 5 Punkte erlaubt) und liegt auf Etage 100 noch über 0.

Zusätzlich dürfen Bosse die schon vorhandenen Eigenschaften nutzen: Lebensraub, Brand-/Giftimmunität, hohe Ausweichchance (`fx` wie bei verzauberten Gegnern).

## Die 20 Turm-Bosse (Vorschlag)

Namen, Themen und Trick-Zuordnung sind **mein Vorschlag**. Sie dürfen beim Bauen noch angepasst werden, Ebene und Boss sollen aber thematisch zusammenpassen. Der Boss auf Etage 5·k steht am Ende von Ebene k (Etagen 5k−4 … 5k).

| # | Etage | Ebene | Boss (de / en) | Tricks |
|---|---|---|---|---|
| 1 | 5 | Eingangshalle | Torwächter Eisenbart / Gatekeeper Ironbeard | Aufladen |
| 2 | 10 | Verliese | Kerkermeister Grimmbold / Jailer Grimbold | Helfer (Kettenhunde) |
| 3 | 15 | Kristallhöhle | Kristallgolem / Crystal Golem | Spiegeln, giftimmun |
| 4 | 20 | Lavahallen | Magmawurm Glutschlund / Magma Wyrm Embermaw | Phase (taucht ab, kommt glühend wieder), brandimmun |
| 5 | 25 | Geisterhallen | Die Graue Witwe / The Grey Widow | Versiegeln, Lebensraub |
| 6 | 30 | Sturmspitze | Sturmharpyie Kreischkralle / Storm Harpy Shriektalon | Aufladen (Blitzsturz), hohe Ausweichchance |
| 7 | 35 | Schattenreich | Dein Schattenzwilling / Your Shadow Twin | Spiegeln. Besonderheit: sieht aus wie dein Ritter mit deiner Ausrüstung, nur dunkel getönt (`pk()`/`knight()` mit Schattenfarbe) |
| 8 | 40 | Weltenriss | Rissbewahrer Xal'Zorr / Riftwarden Xal'Zorr | Helfer (Leerenschwärmer) |
| 9 | 45 | *neu:* Uhrwerkkammern | Uhrwerk-Koloss / Clockwork Colossus | Aufladen, Spiegeln |
| 10 | 50 | *neu:* Versunkene Bibliothek | Der Gesichtslose Bibliothekar / The Faceless Librarian | Versiegeln, Helfer (fliegende Bücher) |
| 11 | 55 | *neu:* Pilzgrotte | Sporenmutter / Spore Mother | Helfer (Sporlinge), Gift |
| 12 | 60 | *neu:* Gefrorene Gruft | Frostwyrm Gletscherzahn / Frost Wyrm Glacierfang | Phase, Aufladen (Eisatem) |
| 13 | 65 | *neu:* Blutrosengarten | Blutrosen-Gräfin / Countess of Blood Roses | Spiegeln (Dornenpanzer), Lebensraub |
| 14 | 70 | *neu:* Knochengruft | Knochenkönig Ossarion / Bone King Ossarion | Wiedergeburt, Helfer (Skelette) |
| 15 | 75 | *neu:* Himmelsschmiede | Schmiedetitan Ambossar / Forge Titan Anvilor | Aufladen, Phase (Rüstung glüht auf) |
| 16 | 80 | *neu:* Spiegelsaal | Die Spiegelkönigin / The Mirror Queen | Spiegeln, Versiegeln |
| 17 | 85 | *neu:* Traumgefilde | Albtraumweber / Nightmare Weaver | Versiegeln, Phase |
| 18 | 90 | *neu:* Sternwarte | Sternenseher Astralon / Stargazer Astralon | Aufladen (Meteor), Helfer (Sternsplitter) |
| 19 | 95 | *neu:* Goldener Hort | Urdrache Aurelion / Elder Dragon Aurelion | Phase, Aufladen, brandimmun |
| 20 | 100 | *neu:* Turmkrone | Der Turmherr / The Tower Lord | Helfer, Phase, Wiedergeburt |

## Stärke

- Etagen 5–60: Jeder neue Boss soll etwa so stark sein wie der alte Boss an derselben Stelle. Heute ist das `mk(BOSS[i].L+Math.floor(n/3), BOSS[i], true)`. Die Faktoren `hp/atk/def` und `L` der neuen Bosse orientieren sich an den alten. Tricks machen einen Boss schwerer, deshalb dürfen die reinen Werte dafür etwas sinken.
- Etagen 65–100: Die Kurve läuft gleichmäßig weiter (`L` steigt ungefähr so wie zwischen den alten Bossen 9–12).
- Schatten-Durchlauf (Etage > 100): Durchlauf `c = Math.floor((n-1)/100)`. Boss `TBOSS[((n/5)-1)%20]` mit `L` + Zuschlag je Durchlauf (Etage fließt wie heute über `Math.floor(n/3)` ein). Namenszusatz aus der Sprachdatei (z. B. „Schatten-“ / „Shadow “), SVG und Hintergrund dunkler (CSS-Filter oder Überlagerung). Normale Etagen über 100 laufen wie heute weiter.
- **Prüfen:** Neben `simRun(400)` eine kleine Hilfe auf der Testseite, die einen Helden mit typischer Stufe und Ausrüstung gegen den alten und den neuen Boss einer Etage viele Male kämpfen lässt und die Siegquote ausgibt (mit der Kampf-KI aus `tests/sim.js`). Für 5–60 sollen die Quoten ähnlich sein, und danach soll die Quote gleichmäßig fallen. Die genaue Form dieser Hilfe ist Sache des Bauenden.

## Technische Eckpunkte

- **Daten:** Neue Tabelle `TBOSS` in `data.js` (Werte, `tint`, `mv`, `tr`, ggf. `fx`, `mv2` für Phase 2), Texte unter `tboss` in `de.js`/`en.js` (Name, Angriffsnamen, Phase-2-Name/Angriffe, Beschreibung, Ankündigungstexte), angehängt per `loc()`. Kennungen bleiben intern; angezeigt wird nur der Sprachtext.
- **Kampf:** `towerFloor()` nimmt Bosse aus `TBOSS`. `mk()` kennt Turm-Bosse (eigene Kennung statt `bi`, z. B. `tbi`), `fight()` zeichnet `tbossSvg(i, phase)`. Die Tricks hängen sich in `useSkill()` (Helfer fangen Treffer ab, Spiegeln), `enemyTurn()`/`enemyAct()` (Aufladen, Helferangriffe, Phase, Siegel) und den Sieg-Zweig von `enemyTurn`/`endFight` (Wiedergeburt) ein. Die Logik für Bosskampf-Bosse (`bi`, `LORE`, Söldner, `S.boss`) bleibt unberührt.
- **Grafik:** `TBOSSV` (20 Figuren, `BSV()`-Stil, mit Animation wie bei den vorhandenen) in `art.js`, bei Phasen-Bossen eine zweite Variante. Für Helfer reicht ein kleines Symbol mit Zähler im Gegnerkasten. Kleine Helfer-Figuren neben dem Boss sind erwünscht, aber freiwillig.
- **Ebenen:** `TBGS` auf 20 Einträge erweitern, `TIER` in beiden Sprachdateien auf 20, `ttier(n)` = `Math.floor((n-1)/5)%20`. Musik: `tower.bpm`-Liste auf 20 Einträge, in `tower.p()` die Ebenen 8–19 auf vorhandene Melodien abbilden. `amb()` bekommt 12 neue Fälle.
- **Bestiarium:** Einträge `tb0`…`tb19`, Gruppe „Turm-Bosse“, `bKey()` erkennt Turm-Bosse. Schatten-Durchläufe zählen auf denselben Eintrag.
- **Spielstand:** Es gibt keine neuen Pflichtfelder. `S.tcur`/`S.tbest` bleiben gültig, der Boss wird aus der Etagennummer bestimmt. Wenn doch ein Feld nötig wird: `fresh()` und `migrate()`.
- **Schnellkampf:** Er ist bei Bossen ohnehin gesperrt. `tests/sim.js` (`fightAI`) muss mit allen Tricks fertig werden, ohne hängenzubleiben. Gesiegelte Fähigkeiten darf die KI nicht wählen.

## Tests (tests/index.html)

- Etagen 5…100 liefern 20 verschiedene Turm-Bosse, keiner davon aus `BOSS`. Etage 105 liefert Boss 1 als Schatten-Variante.
- `ttier()` ergibt für 1…100 die Werte 0…19 und wiederholt sich danach. Jede Ebene hat Hintergrund, Text und Geräusch.
- Je Trick ein Test: Aufladen trifft mit Deckung schwächer und fällt bei Betäubung aus. Helfer fangen Treffer ab und Gift trifft trotzdem den Boss. Spiegeln schadet dem Spieler. Phase schaltet bei der Schwelle um und wechselt die Angriffe. Wiedergeburt passiert genau einmal. Siegel sperrt eine Fähigkeit 2 Runden und nie „Hieb“.
- Alle `TBOSS`-Angriffe haben Namen (wie der vorhandene `mv`-Test), Bestiarium hat 20 Turm-Boss-Einträge.
- Vorhandene Turm-Tests (Beute auf Etage 10, Drachenschuppen) laufen weiter.
- Testseite deutsch und `?lang=en` ohne ❌, `node scripts/i18n-check.js` grün.

## Doku und Version

- `ANLEITUNG.md` und `ANLEITUNG.en.md`: Abschnitt „Der Endlose Turm“ um Turm-Bosse, Tricks mit Gegenmaßnahmen, Ebenen bis 100 und Schatten-Durchläufe ergänzen.
- Neue Funktion, also Version 0.1.0 → **0.2.0** (`index.html`, `sw.js`).
- Ideen, die nicht mehr hineinpassen, kommen in `docs/OFFENE-PUNKTE.md`.

## Dem Bauenden überlassen

- Genaue Werte (`L`, `hp/atk/def`, Trick-Parameter wie N Runden, Schwellen, Helferzahl), solange die Stärke-Vorgaben eingehalten werden.
- Aussehen der SVG-Figuren und Hintergründe im Rahmen der Themen. Die Qualität soll dem Stand der vorhandenen Bosse und Ebenen entsprechen.
- Welche vorhandene Turm-Melodie welche neue Ebene bekommt.
- Reihenfolge der Umsetzung, z. B. erst Tricks und 8 Bosse, dann Ebenen und Bosse 9–20.
