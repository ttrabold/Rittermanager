# Ritter Manager – Hinweise für Agenten

Mittelalterliches Browser-Rollenspiel (Manager/Idle-RPG) auf Deutsch und Englisch. Reines HTML, CSS und JavaScript ohne Build-Schritt und ohne Abhängigkeiten. Läuft als PWA auf GitHub Pages und lokal per `file://`.

- Live: https://ttrabold.github.io/Rittermanager/ (Remote `origin`, Branch `main`)
- Test-Vorschau: https://ttrabold.github.io/Rittermanager-test/ (Remote `test`)

## Sprache

Code-Kommentare, Commit-Nachrichten und Docs sind Deutsch. Das Spiel selbst ist zweisprachig (Deutsch und Englisch), siehe „Übersetzungen (i18n)“. Neue Spieltexte im Stil der vorhandenen schreiben (Du-Form, mittelalterlicher Ton; Englisch: „you“, gleicher Ton).

## Übersetzungen (i18n)

- **Keine Spieltexte im Code.** Alle sichtbaren Texte stehen in `js/lang/de.js` und `js/lang/en.js` (`I18N.de = {…}` / `I18N.en = {…}`). Beide Dateien haben dieselben Schlüssel. Neuer Text: in **beiden** Dateien eintragen.
- `js/i18n.js` lädt vor allen anderen Skripten (danach `lang/de.js`, `lang/en.js`) und stellt bereit:
  - `t("bereich.schlüssel", …args)`: Text der aktiven Sprache, fehlt er, der deutsche. Ist der Eintrag eine Funktion, wird sie mit `args` aufgerufen (Zahlen, Namen, Ritter/Ritterin, Mehrzahl). Arrays und Objekte kommen unverändert zurück.
  - `loc("bereich", array, key?)` hängt Texte an Datentabellen (Standard-Schlüssel `id`, sonst Funktion `(o,i)=>…`). Ein Eintrag `mv:[…]` setzt die Angriffsnamen vorn in die `mv`-Tupel. `loc1("bereich", obj)` für einzelne Objekte.
  - `LANG` (`"de"`/`"en"`), `LANGS`, `setLang(l)` (speichert `ritter_lang` und lädt neu).
- Sprachwahl: `localStorage` `ritter_lang` (gilt für alle Spielstände), sonst Browser-Sprache. `?lang=en` in der Adresse überschreibt das (Tests). Umschalter auf der Burg unter „Spielstände“.
- **Gespeicherte Texte nie anzeigen.** Aufträge, Segen und Zufallsbeute werden über Kennungen angezeigt (`qTxt(q)`, `bname(b)`, `genText(it)` in `gearClean()`), damit ein Sprachwechsel auch alte Stände umstellt. Die Felder `txt`/`name`/`n`/`d` werden trotzdem mitgespeichert, weil Test-Vorschau und Live-Seite denselben Speicher nutzen und eine ältere Version sie noch liest.
- Interne Kennungen bleiben deutsch und dürfen nicht übersetzt werden (z. B. Gegnertyp `ET[].t` wie `"Räuber"`, Waffenart `"schwert"`). Angezeigt wird immer der Text aus der Sprachdatei.
- Sprachausgabe (`speech.js`) wählt die Stimme nach `LANG`, Ersetzungen fürs Vorlesen stehen unter `tts` in der Sprachdatei.
- Anleitung: `ANLEITUNG.md` (de) und `ANLEITUNG.en.md` (en). Regeländerungen in beiden nachziehen.
- **Seitenkopf und App-Manifest:** Titel, Beschreibung, App-Titel und Manifest stehen unter `meta` in der Sprachdatei; `i18nHead()` (Aufruf in `main.js`) setzt sie beim Start. Das Manifest ist statisches JSON, deshalb gibt es eine Datei je Sprache (`manifest.webmanifest` = de, `manifest.en.webmanifest`); `meta.manifest` nennt sie. `name`, `short_name`, `description` und `lang` müssen zu `meta` passen.
- **Neue Sprache:** `js/lang/<l>.js` anlegen, in `LANGS` (`js/i18n.js`), `index.html` und `tests/index.html` eintragen, `manifest.<l>.webmanifest` und `ANLEITUNG.<l>.md` anlegen.
- **Prüfen ohne Browser:** `node scripts/i18n-check.js` (gleiche Schlüssel in allen Sprachen, alle benutzten Schlüssel vorhanden, Manifeste passend). Läuft auch in `scripts/itch-zip.sh`; schlägt sie fehl, gibt es kein ZIP.
- Tests: `tests/index.html` läuft deutsch, `tests/index.html?lang=en` englisch. Beide prüfen, dass keine Schlüssel fehlen.

## Aufbau

```
index.html          lädt alle Skripte in fester Reihenfolge, ?v=X.Y.Z an jeder URL
sw.js               Service-Worker, Konstante CACHE = "ritter-vX.Y.Z"
css/style.css
js/*.js             Spiellogik, klassische Skripte (keine ES-Module)
js/i18n.js          Sprachwahl, t(), loc() – lädt als erstes
js/lang/de.js, en.js  alle Spieltexte je Sprache
tests/index.html    Testseite (Browser), enthält alle Tests
tests/sim.js        Balance-Simulation: simRun(maxDay)
ANLEITUNG.md        Spielanleitung für Spieler (ANLEITUNG.en.md: Englisch)
docs/OFFENE-PUNKTE.md   Übergabeliste für die nächste Runde
docs/superpowers/   Specs und Pläne zu größeren Features
```

Wichtige Module: `data.js` (Tabellen: Waffen, Rüstung, Gegner, Bosse, Materialien), `state.js` (Spielstand `S`, `fresh()`, `migrate()`, `save()`, abgeleitete Werte), `combat.js` (Kampf `F`), `loot.js` (Zufallsbeute, `genItem`), `day.js` (Tagesablauf, Aktivitäten), `screens.js` (Hauptbildschirme), `unlock.js` (Freischaltungen), `art.js` (SVG-Ritter), `main.js` (Start).

## Konventionen

- **Keine ES-Module, kein Bundler, kein npm.** Alles sind globale `const`/`function` in klassischen Skripten, damit `file://` funktioniert. Die Ladereihenfolge in `index.html` und in `tests/index.html` ist wichtig und muss identisch bleiben. Neue Datei: in beiden eintragen.
- **Globale Zustände:** `S` (Spielstand), `F` (laufender Kampf), `EVN` (Ereignis). Ändere `S` nur über die vorhandenen Funktionen und rufe danach `save()` auf.
- **Stil:** sehr kompakter Code, Einzeiler, kurze Namen, Arrow-Functions. Neuen Code an die Umgebung anpassen, nicht umformatieren und keine fremden Zeilen "aufräumen".
- **Browser-Kompatibilität:** auch ältere Safari-Versionen (iOS) sollen laufen. Neuere APIs wie `findLastIndex` vermeiden.
- **Spielstand-Kompatibilität:** neue Felder in `fresh()` anlegen **und** in `migrate()` mit Standardwert nachziehen. Bestehende Speicherstände (localStorage-Schlüssel `ritter1`, `ritter1_2`, `ritter1_3`) dürfen nie brechen.
- **HTML-Ausgabe:** Texte kommen per `innerHTML`. Nutzereingaben (z. B. der Name) vorher bereinigen, wie in `migrate()`.

## Prüfen

Es gibt keinen Test-Runner im Terminal. Die Tests laufen im Browser:

1. `tests/index.html` öffnen (per `file://` oder lokalem Server). Die Seite ersetzt `localStorage` durch einen Speicher im Arbeitsspeicher, echte Spielstände bleiben unberührt. Erwartet: keine ❌-Zeilen.
2. Neuer Test: in `tests/index.html` mit `t("Name",()=>{ … ok(Bedingung,"Meldung") })` ergänzen.
3. Balance: auf der Testseite `tests/sim.js` laden und `simRun(400)` aufrufen. Nach Eingriffen in Werte, Beute oder Kampf immer vergleichen.

Behaupte nie, etwas funktioniere, ohne die Testseite wirklich geladen zu haben. Wenn du keinen Browser steuern kannst, sag das offen.

## Veröffentlichen

- **Version erhöhen** bei jeder Änderung an ausgelieferten Dateien, nach Semantic Versioning (`MAJOR.MINOR.PATCH`): `?v=X.Y.Z` an allen Einträgen in `index.html` und `CACHE = "ritter-vX.Y.Z"` in `sw.js`, beide gleich. Solange das Spiel ein Prototyp ist, bleibt MAJOR bei 0: neue Funktionen oder Balance-Änderungen → MINOR (0.2.0), reine Fehlerbehebungen → PATCH (0.1.1). 1.0.0 erst, wenn Spielstände dauerhaft stabil bleiben sollen. Sonst sehen Spieler alte Dateien. Die im Spiel angezeigte Version (`VERSION`, Spielstand-Bildschirm „Über das Spiel“) und der Release-Tag (`vX.Y.Z`) werden aus diesem `?v=` gelesen, es gibt keine weitere Stelle zum Hochzählen.
- **Release für itch.io:** GitHub → Actions → „Release (itch.io-Artefakt)“. Pro Version gibt es genau ein Release; existiert der Tag schon, bricht der Workflow ab, dann zuerst die Version erhöhen. Der Workflow prüft auch, dass `index.html` und `sw.js` dieselbe Version haben.
- **itch.io-Seite:** Prototyp-Hinweis und Kurzbeschreibung stehen in `docs/itch-seite.md` und werden von Hand auf itch.io übernommen.
- **GitHub Pages** veröffentlicht über `.github/workflows/pages.yml` (Pages-Quelle: „GitHub Actions“, in beiden Repos). Ausgeliefert werden nur Laufzeitdateien; Änderungen nur an `docs/`, `tests/`, `scripts/`, AGENTS.md oder CLAUDE.md lösen keine Veröffentlichung aus. Veröffentlichungen laufen nacheinander (Concurrency-Gruppe `pages`).
- Größere Änderungen zuerst ins Test-Repo: `git push test <branch>:main`, dann in der Vorschau prüfen. Erst nach Bestätigung per Fast-Forward nach `main` und `git push origin main`.
- Test-Vorschau und Live-Seite teilen sich denselben Origin und damit denselben `localStorage`. Dort nie Speicherstände löschen oder überschreiben. Zerstörende Tests nur per `file://` oder `localhost`.
- Nicht pushen, ohne dass der Nutzer es verlangt.

## Dokumentation pflegen

- Spielregeln, Werte oder Bedienung geändert: `ANLEITUNG.md` und `ANLEITUNG.en.md` anpassen.
- Aufgeschobene Punkte oder Ideen: in `docs/OFFENE-PUNKTE.md` eintragen, erledigte abhaken oder entfernen.
