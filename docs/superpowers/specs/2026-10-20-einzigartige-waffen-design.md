# Einzigartige Waffen – Konzept

## Warum

Die Beute im Spiel besteht aus gewürfelten Fundstücken. Sie haben nur Standardeffekte (Brand, Gift, Lähmung, Krit, Lebensraub, LP, Regeneration, Ausweichen). Es fehlt der **„Wow“-Fund**: eine Waffe, auf die man hinarbeitet, die sich im Kampf anders anfühlt und die man schon beim Fallenlassen feiert.

Ziel: **21 einzigartige Waffen**, drei je Waffenart. Jede hat ein eigenes, imposantes Aussehen, einen besonderen Kampfeffekt mit eigener deutlich sichtbarer Animation und eine Enthüllungs-Animation beim Fund.

## Ziele

- Liste von **21 Waffen** (siehe Tabelle), je Waffenart (Schwert, Axt, Keule, Hellebarde, Bogen, Stab, Dolch) drei.
- Jede Waffe hat einen **einzigartigen Effekt** aus 13 neuen Effekten. Die stärksten Waffen haben zwei. **Keine** Standardeffekte (Brand, Gift, Lähmung, Krit, Lebensraub, LP, Regeneration, Ausweichen, Brandimmun) auf diesen Waffen.
- **Mehrfachfunde sind möglich.** Eine einzigartige Waffe kann man mehrmals besitzen. Sie **skaliert mit der Stufe**: Grundschaden und Stärke des Effekts hängen an der Gegenstandsstufe (`il`) beim Fund, wie bei den gewürfelten Fundstücken.
- **Drops** (jeweils anstelle der normalen Beute dieser Quelle, wenn der Wurf gelingt):
  - Turm-Boss (jede 5. Etage): 8 %
  - Boss im Bosskampf: 8 % (je besiegtem Boss ein Wurf)
  - Turniersieg (Pokal nach Runde 3): 4 %
  - Mimik: 10 %
  - Vollmond-Werwolf: 10 %
- **Enthüllungs-Animation** beim Fund (Entwurf B „Truhe und Blitz“ in aufwendiger Form, siehe unten).
- **Kampfanimationen**: Jeder Effekt hat eine eigene, klar sichtbare Animation im Kampfbild.
- **Eigenes Aussehen** je Waffe: ein großes Bild (Enthüllung, Beutel) und eine kleine, erkennbare Version am Ritter (`pk()`).
- Es bleibt bei einer **Patch-Version: 0.2.3**.

## Nicht-Ziele

- Keine Änderung an den normalen Fundstücken, den festen verzauberten Waffen (`EI`), Rüstungen und Schilden.
- Keine einzigartigen Rüstungen oder Schilde.
- Kein Herstellen oder Schmieden einzigartiger Waffen und keine neuen Berufe-Rezepte.
- Keine Sammlung oder Bestiarium-Seite für die Waffen (Ideen dafür kommen später als Issue).
- Kein Drop aus normalen Abenteuern, Rivalen-Duellen, Ereignissen und Truhen.

## Darf nicht passieren

- Alte Spielstände brechen. **Test-Vorschau und Live-Seite teilen denselben Speicher**, und eine ältere Version (0.2.2) prüft beim Laden alle Funde in `gearClean()`. Ein Fund ohne gültigen Standardeffekt in `fx` wird dort **gelöscht**. Ein einzigartiges Stück muss deshalb so gespeichert werden, dass die alte Version es behält (z. B. mit einem unauffälligen Platzhalter-Eintrag in `fx`, den die neue Version ignoriert). Die neue Version darf diesen Platzhalter nicht als Krit o. ä. werten.
- Einzigartige Waffen machen Kämpfe unschaffbar oder trivial. Die Stärke soll etwa **eine Stufe über Legendär** liegen und durch die Simulation geprüft werden.
- Ein Effekt kann den Kampf endlos machen (Zeitriss, Phoenixherz, Wiederkehr) oder tödliche Schleifen bauen (Blutdurst darf nie töten).
- Die Enthüllung blockiert Tests, Schnellkampf oder die Simulation (sie darf nur bei sichtbarem Bildschirm erscheinen und muss sich schließen lassen).
- Die Kampfanimationen verdecken Schadenszahlen oder Knöpfe.

## Die Waffen (Vorschlag, Namen und Zuordnung sind meine Wahl)

| Art | Waffe | Effekt(e) |
|---|---|---|
| Schwert | **Donnerzahn** (Zinken, Blitzrunen) | Blitzkette |
| Schwert | Chronosklinge | Zeitriss |
| Schwert | Gnadenbringer | Gnadenstoß |
| Axt | **Blutdurst** (Doppelaxt mit Totenkopf) | Blutdurst |
| Axt | Schädelspalter | Rüstungsbrecher |
| Axt | Zwillingsbeil | Doppelschlag |
| Keule | Phoenixhammer | Phoenixherz |
| Keule | Weltenbrecher | Rüstungsbrecher + Gnadenstoß |
| Keule | Erschütterer | Sturmruf |
| Hellebarde | Sturmherold | Sturmruf |
| Hellebarde | Seelenfänger | Seelenraub |
| Hellebarde | Spiegelspeer | Spiegelklinge |
| Bogen | **Wiederkehr** (Mondsichel, Geisterpfeil) | Wiederkehr |
| Bogen | Sternenfall | Laserstrahl |
| Bogen | Jägers Ende | Doppelschlag + Gnadenstoß |
| Stab | **Sonnenlaser** (Sonne mit Ringen) | Laserstrahl |
| Stab | Seelenspinner | Seelenraub |
| Stab | Wandelstab | Verwandlung |
| Dolch | Zwillingsfang | Doppelschlag |
| Dolch | Schattenstich | Zeitriss |
| Dolch | Trugspiegel | Spiegelklinge |

Die vier fett gedruckten Waffen sind als Konzeptbild fertig gezeichnet und vom Nutzer abgenommen (siehe unten). Die übrigen 17 gestaltet der Bauende im selben Stil und auf demselben Niveau.

## Die 13 Effekte (Vorschlag der Mechanik, Zahlen sind Richtwerte)

Alle Chancen und Stärken wachsen mit der Gegenstandsstufe `il` (Anteil `t = min(1, il/50)`, Startwert bei `il` 1, Endwert bei `il` ≥ 50). Sie wirken nur auf direkte Treffer mit Angriffs-Fähigkeiten (`pw > 0`), außer es steht anders da.

| Effekt | Wirkung |
|---|---|
| **Doppelschlag** | Chance 15 %→35 %: der Treffer kommt ein zweites Mal mit 70 % Schaden. Anzeige „×2“. |
| **Zeitriss** | Chance 10 %→22 % je Zug: Der Gegner setzt seinen nächsten Zug aus (wie Betäubung, aber mit eigener Animation). |
| **Blitzkette** | Bei einem kritischen Treffer: ein Blitz springt zusätzlich auf den Gegner (60 %→100 % des Schadens, ignoriert Rüstung). |
| **Seelenraub** | Chance 25 %→45 % je Treffer: eine Fähigkeit, die Punkte verbraucht, bekommt 1 Punkt zurück. |
| **Blutdurst** | Jeder Treffer im Kampf erhöht den Schaden um 4 %→6 % (bis +40 %, bleibt bis Kampfende). Du verlierst dafür 2 % max. LP je Zug (nie unter 1 LP). |
| **Spiegelklinge** | 15 %→35 % des erlittenen Schadens gehen auf den Gegner zurück. |
| **Gnadenstoß** | Bei einem Treffer auf einen Gegner unter 25 % LP: Chance 20 %→40 % auf sofortigen Tod. Bosse und Turm-Bosse sterben nicht, sie erleiden stattdessen 20 % ihrer max. LP als Schaden. |
| **Rüstungsbrecher** | Ignoriert Rüstung und Deckung des Gegners vollständig (wie „Durchbohren“). |
| **Wiederkehr** | Nach einem Treffer, Chance 30 %→50 %: ein zweiter Hieb kehrt mit 60 % Schaden zurück. |
| **Phoenixherz** | Einmal pro Kampf: bei 0 LP stehst du mit 30 %→60 % deiner max. LP wieder auf. |
| **Sturmruf** | Zu Beginn jedes Kampfes ein Segen: +50 % Schaden für 3 Runden. |
| **Verwandlung** | Unter 50 % LP verwandelt sich die Waffe (anderes Bild): +35 %→+50 % Schaden und +15 % Krit bis Kampfende. |
| **Laserstrahl** | Chance 20 %→35 % je Angriff: ein Energiestrahl trifft zusätzlich (80 % Schaden, ignoriert Rüstung) mit Strahl-Animation. |

Bei Waffen mit zwei Effekten sind beide Chancen und Werte um etwa ein Viertel kleiner. Alle Zahlen stellt der Bauende mit der Simulation so ein, dass die Waffe etwa eine Stufe über Legendär liegt.

## Festlegungen aus der Selbstprüfung (meine Entscheidungen)

- Die Effekte wirken nur, solange die Waffe **angelegt** ist. Die Grundwirkung der Waffenart (`WCAT`, z. B. Bogen +12 % Krit) bleibt zusätzlich bestehen.
- Beim **Bosskampf-Boss** (2 Beutewürfe heute) gibt es **einen** Wurf je besiegtem Boss. Gelingt er, ersetzt er einen der beiden Würfe.
- **Turm-Boss**: ein Wurf je besiegtem Turm-Boss (jede 5. Etage), auch bei Schatten-Durchläufen.
- Die **Enthüllung** wird durch ein Merkmal im Kampfzustand (z. B. `F.reveal`) ausgelöst und beim Zeichnen des Kampfbildschirms einmal gezeigt. Im Schnellkampf (`QUICK`), in der Simulation und ohne sichtbaren Bildschirm wird sie übersprungen, der Fund steht trotzdem im Kampflog.
- Der **Platzhalter** für die alte Version ist `fx:{crit:.01}`. Die neue Version ignoriert `fx` bei Stücken mit `u` in `fxv()`, in der Anzeige und im Vergleich.
- **Verwandlung** wirkt nur bis Kampfende. Das Aussehen wird aus dem aktuellen LP-Stand gezeichnet.
- Zeitriss, Phoenixherz, Doppelschlag, Wiederkehr und Laserstrahl lösen keine weiteren Effekte aus (keine Ketten, damit nichts endlos wird). Blitzkette und Laserstrahl dürfen sich auch nicht gegenseitig auslösen.
- Die Waffen erscheinen in der Auswahl der Beute **gleich wahrscheinlich** (jede der 21 mit 1/21).

## Grundwerte und Skalierung

- Grundschaden `b` wie bei einem Legendären der gleichen Gegenstandsstufe, etwa 10 % höher.
- Gegenstandsstufe `il` wie bei den gewürfelten Fundstücken je Quelle (Turm: `lvl()+Etage/10`, Boss: Stufe des Bosses, Turnier und Sondergegner: `lvl()`).
- Aufwerten und Runen wirken wie bei allen Fundstücken. Zerlegen gibt wie ein Legendäres, dazu zusätzlich 1 Arkankristall.

## Enthüllung beim Fund

- Beim Fund einer einzigartigen Waffe erscheint nach dem Kampf ein **Vollbild** (Entwurf B, aufwendiger als der Probeentwurf): Ein Blitz schlägt in eine Truhe, der Bildschirm wackelt, der Deckel springt auf, ein Lichtstrahl fährt nach oben, die Waffe dreht sich heraus und schwebt, Name und Effekt schlagen ein.
- Keine ausbreitenden Kreise am Boden (die Entwürfe zeigen dafür bewusst keine).
- Das Vollbild lässt sich per Knopf und Taste schließen. Der Fund steht danach wie jede Beute im Kampflog und im Beutel.
- Das Vollbild erscheint nur, wenn die Benutzeroberfläche sichtbar ist. Nicht im Schnellkampf, nicht in der Simulation und nicht in Tests ohne Anzeige.

## Aussehen

- Das Aussehen der vier Konzepte (Donnerzahn, Sonnenlaser, Wiederkehr, Blutdurst) ist abgenommen. Entwurfsdateien (Entwurf der Zeichnungen: `unique-konzepte-3.html`) liegen im Arbeitsverzeichnis der Sitzung und werden vom Bauenden nach `docs/itch/` oder `docs/superpowers/` kopiert, damit sie als Vorlage erhalten bleiben.
- Merkmale des Stils: viel Zierde (Runen, Zacken, Flügel, Edelsteine), schwebende Teile, animierte Energie (pulsierend, kreisend, flackernd), ein weicher Lichthof.
- Jede Waffe hat zwei Fassungen: ein **großes Bild** (Enthüllung und Beutel) und eine **kleine Fassung** für die Hand des Ritters (`knight()` in `art.js`, Griff bei 107.5/105.5), die in den Umrissen und Hauptfarben erkennbar bleibt. Der Bauende wählt, ob die kleine Fassung eine vereinfachte Ableitung (gleiche Zeichnung, Details ausgeblendet) oder eine eigene Zeichnung ist.
- Die Waffe ändert sich bei „Verwandlung“ (zweites Aussehen unter 50 % LP).

## Anzeige

- Im Beutel und in Beuteberichten: Name in Gold/Orange, Kennzeichen „✦ Einzigartig“, Effekttext, Vergleich wie bei Fundstücken. Der Name ist fest (kein Namenszusatz).
- Alle Texte (Name, Beschreibung, Effekte, Ankündigungen) in `js/lang/de.js` und `en.js`.

## Kampfanimationen

- Jeder Effekt hat eine eigene Animation im Kampfbild (Doppelschlag: zwei Hiebe und „×2“, Blitzkette: Blitz, Laserstrahl: breiter Strahl mit Aufladen, Wiederkehr: Geisterpfeil, Zeitriss: Uhr/Verlangsamung des Gegners, Gnadenstoß: Aufblitzen und Zerfall, Phoenixherz: Feuer und Aufstehen, Sturmruf: Sturm-Aura, Spiegelklinge: Spiegelglanz, Seelenraub: Seelenwisps, Blutdurst: roter Pulsschlag, Rüstungsbrecher: splitternder Schild, Verwandlung: Lichtblitz und neues Aussehen).
- Die Animationen müssen **klar sichtbar** sein und sich in den bestehenden Mechanismus der Kampfeffekte (`vfx` und `VX`) einfügen. Sie dürfen Knöpfe und Schadenszahlen nicht verdecken.

## Technische Eckpunkte

- Neue Tabelle der Waffen (z. B. `UNIQ` in `data.js` oder eigener Datei `js/unique.js`) mit Kennung, Art, Effekten, Zeichnungs-Funktion. Texte unter `uniq` in den Sprachdateien über `loc()`.
- Fund als `S.gear`-Eintrag: `{id:"g…", s:"w", cat, b, il, r:3, u:"<Kennung>", gen:1, …}` mit Platzhalter-`fx` (siehe „Darf nicht passieren“). `gearClean()` muss `u` erhalten und prüfen.
- Kampfeffekte hängen sich in `useSkill()` (Treffer), `enemyAct()`/`enemyTurn()` (Spiegelklinge, Phoenixherz, Blutdurst-Kosten, Zeitriss), `setup()` (Sturmruf) und `endFight()` (Beute) ein. Neue Zustände in `F` (nicht im Spielstand).
- Beute: neue Funktion (z. B. `uniqueRoll(src)`), aufgerufen an den Beutestellen (Turm-Boss, Boss, Turnier, Mimik, Werwolf). Gelingt der Wurf, ersetzt der Fund dort die normale Beute dieser Quelle.
- Spielstand-Kompatibilität: keine neuen Pflichtfelder im Spielstand `S`. Der Wiedergeburt-Pfad muss einzigartige Waffen wie andere Fundstücke behandeln.

## Tests und Prüfung

- In `tests/index.html`: jede der 21 Waffen lässt sich erzeugen, anlegen und hat Name, Text, Bild (groß und klein) ohne „undefined“. Je Effekt ein Test mit festem Zufall (Math.random überschrieben). Drop-Chancen je Quelle (mit überschriebenem Zufall). Der Platzhalter-Test: Ein Fund übersteht `gearClean()` der alten Logik (nachgebildet). Wiedergeburt behält die Waffen. Kein Effekt macht einen Kampf endlos (`win()` beendet), Blutdurst tötet nie.
- Testseite Deutsch und `?lang=en`, `node scripts/i18n-check.js`.
- Balance: `tests/sim.js` (`simRun(400)`) und eine Hilfe, die eine Waffe gegen Standard-Legendäre vergleicht (z. B. mit `bossDuel`-Prinzip) und Stärke etwa eine Stufe über Legendär prüft.
- Sichtprüfung: Screenshots von Enthüllung, großen und kleinen Waffen sowie je einer Kampfanimation je Effekt.

## Doku und Version

- `ANLEITUNG.md` und `ANLEITUNG.en.md`: neuer Abschnitt „Einzigartige Waffen“ (Liste, Effekte, Drop-Quellen und Chancen).
- Version auf 0.2.3 (`var V` in `index.html`). Devlog-Entwurf `docs/itch-devlog-0.2.3.md/.html` anbieten, falls gewünscht.

## Dem Bauenden überlassen

- Genaue Zahlen (Chancen, Werte, Grundschaden), solange die Stärke-Vorgabe gilt.
- Ob die Zeichnungen einzeln im Code oder als Daten stehen, und wie die kleine Fassung abgeleitet wird.
- Reihenfolge der Umsetzung (Vorschlag: Daten und Beute, Effekte und Animationen, Aussehen der 21 Waffen, Enthüllung, Balance, Doku).
- Namen und Texte der 17 nicht abgenommenen Waffen im Stil der vorhandenen Spieltexte.
