# Einzigartige Waffen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 21 einzigartige Waffen mit 13 neuen Kampfeffekten, eigenem Aussehen, Kampfanimationen, Drops aus 5 Quellen und einer Enthüllungs-Animation, als Version 0.2.3.

**Architecture:** Die Waffen sind Fundstücke in `S.gear` mit Feld `u` (Kennung in `UNIQ`) und Platzhalter-`fx` für alte Versionen. Logik und Daten stehen in der neuen Datei `js/unique.js` (nach `loot.js`), Grafik, Kampfanimationen (`VX`) und Enthüllung in `js/uniqueart.js` (nach `towerart.js`). `combat.js` bekommt wenige Einhängepunkte.

**Tech Stack:** Klassisches JS ohne Module, SVG-Strings, CSS-Animationen. Tests im Browser (`tests/index.html`), headless per `scripts/test-browser.sh`.

**Spec:** `docs/superpowers/specs/2026-10-20-einzigartige-waffen-design.md`

## Global Constraints

- Keine ES-Module, kein npm. Neue Dateien in **gleicher Reihenfolge** in `index.html` (Lader-Liste) und `tests/index.html`: `js/unique.js` direkt nach `js/loot.js`, `js/uniqueart.js` direkt nach `js/towerart.js`.
- Alle Spieltexte in `js/lang/de.js` **und** `en.js`; Kennungen intern deutsch/kurz. `node scripts/i18n-check.js` muss grün sein.
- Kompakter Einzeiler-Stil wie im Umfeld, keine fremden Zeilen umformatieren. Kein `findLastIndex`, kein `?.`/`??` in neuem Code (iOS-Safari).
- Alte Spielstände dürfen nicht brechen. **Eine ältere Version (0.2.2) darf Fundstücke mit `u` nicht löschen** (`gearClean()` verwirft Stücke ohne gültigen `fx`): Platzhalter `fx:{crit:.01}`, den die neue Version bei `u` ignoriert.
- Keine Standardeffekte auf diesen Waffen. Effekte wirken nur bei angelegter Waffe, die Grundwirkung der Waffenart bleibt.
- Nur Patch-Version: `var V="0.2.3"` in `index.html`. Nicht pushen, ohne dass der Nutzer es verlangt.
- Chancen/Werte `t = min(1, il/50)`: Wert = Start + (Ende − Start)·t; bei Waffen mit zwei Effekten ×0,75.

## Review Focus

- **Alte Version löscht das Stück** (Platzhalter fehlt) → Test in Task 1 bildet die alte `gearClean`-Prüfung nach.
- **Endlose Kämpfe** (Zeitriss + Phoenixherz + Wiederkehr; `win()` setzt nur `ehp=0`) → Test in Task 3.
- **Blutdurst tötet den Spieler** → Test in Task 3 (nie unter 1 LP).
- **Enthüllung im Schnellkampf/Simulation/Test** hängt oder bleibt hängen → Test in Task 7.
- **Wiedergeburt/Zerlegen/Aufwerten verlieren `u`** → Test in Task 1.
- **Doppelter/zufälliger Wurf bei Bossen** (2 Beutewürfe heute) liefert zwei einzigartige Funde → Test in Task 4.

---

### Task 1: Daten, Fund, Anzeige, Testskript

**Files:**
- Create: `js/unique.js`, `scripts/test-browser.sh` (headless Chrome, `file://…/tests/index.html` de und `?lang=en`, gibt ❌-Zeilen aus, Exit≠0 bei Fehler; macOS-Pfad von Google Chrome, dazu `node scripts/i18n-check.js`)
- Modify: `index.html`, `tests/index.html` (Datei eintragen), `js/lang/de.js`, `en.js` (`uniq`: Name/Beschreibung/Effektname je Waffe, `ue`: Effekttexte, `ux`: Anzeigetexte), `js/loot.js` (`gearClean`, `genText`, `bagHtml`, `cmpHtml`, `salvage`), `js/state.js` (`fxv`)
- Test: `tests/index.html`

**Interfaces:**
- Produces: `UNIQ=[{id,cat,ef:[…]}]` mit den 21 Waffen der Spec-Tabelle (Kennungen: `donnerzahn,chronos,gnade,blutdurst,schaedel,zwilling,phoenix,weltenbrecher,erschuetterer,sturmherold,seelenfaenger,spiegelspeer,wiederkehr,sternenfall,jaeger,sonnenlaser,seelenspinner,wandelstab,zwillingsfang,schattenstich,trugspiegel`), Effektkürzel `dbl,time,chain,soul,blood,mirror,mercy,pierce,ret,phoenix,storm,morph,laser`; nach `loc("uniq",UNIQ,o=>o.id)` hat jeder Eintrag `.n`, `.d`.
- Produces: `uVal(k:string,it:item):number` (skalierter Wert nach Tabelle `UVAL`), `genUnique(id:string,il:number):item` (`{id:"g…",s:"w",cat,b,il,r:3,gen:1,u,fx:{crit:.01},c}`; `b` = Grundschaden eines Legendären gleicher `il` · 1,1), `uEq():item|null` (angelegte einzigartige Waffe), `uHas(k):boolean`, `isU(it):boolean`.
- Produces: `uniqueRoll(src:"towerboss"|"boss"|"tour"|"mimic"|"moon", il:number, l:string[]):item|null` (Wurf nach Chancen 8/8/4/10/10 %, bei Erfolg Stück gewählt mit `Math.random()` gleichverteilt, in `S.gear` gelegt, Auto-Anlegen wie `lootGive`, Zeile in `l`, setzt `F.reveal=it` falls `F`).
- Konstanten: `UVAL={dbl:[.15,.35],time:[.10,.22],chain:[.6,1],soul:[.25,.45],blood:[.04,.06],mirror:[.15,.35],mercy:[.2,.4],ret:[.3,.5],phoenix:[.3,.6],morph:[.35,.5],laser:[.2,.35],storm:[.5,.5]}`, `UCH={towerboss:.08,boss:.08,tour:.04,mimic:.1,moon:.1}`.

- [ ] **Step 1: Test schreiben** (in `tests/index.html`):
```js
test("Einzigartige: Daten und Fund",()=>{hero(40);ok(UNIQ.length===21,"21");for(const c of Object.keys(WCAT))ok(UNIQ.filter(u=>u.cat===c).length===3,"3 je Art: "+c);for(const u of UNIQ){const it=genUnique(u.id,40);ok(it.u===u.id&&it.r===3&&it.fx.crit===.01&&it.b>0&&it.n&&it.d&&!it.n.includes("undefined"),u.id)}ok(uVal("dbl",genUnique("zwilling",1))===.15&&Math.abs(uVal("dbl",genUnique("zwilling",50))-.35)<1e-9,"Skalierung");ok(uVal("dbl",genUnique("jaeger",50))<.35,"zwei Effekte ×0,75")});
test("Einzigartige: alte Version behält das Stück",()=>{hero(40);const it=genUnique("donnerzahn",30);S.gear.push(it);const old=g=>!!g&&/^g\d+$/.test(g.id)&&["w","a","sh"].includes(g.s)&&[0,1,2,3].includes(g.r)&&(g.s!=="w"||g.cat in WCAT)&&Object.keys(g.fx||{}).some(k=>LFX[k]&&LFX[k].s==="w"&&+g.fx[k]>0);ok(old(JSON.parse(JSON.stringify(it))),"alte Prüfung verwirft");gearClean();ok(itm(it.id)&&itm(it.id).u==="donnerzahn","gearClean verliert u");S.ew=it.id;ok(fxv("crit")===0,"Platzhalter zählt als Krit")});
test("Einzigartige: Aufwerten, Zerlegen, Wiedergeburt",()=>{hero(50);const it=genUnique("blutdurst",40);S.gear.push(it);S.ew=it.id;S.boss=BOSS.length;doRebirth("gold");ok(itm(it.id)&&itm(it.id).u==="blutdurst","Wiedergeburt verliert u");const a=genUnique("zwilling",20);S.gear.push(a);const mk0=S.mat.ak;ok(salvage(a.id)&&S.mat.ak>mk0,"Zerlegen ohne Kristall");bagHtml();inv(true)});
test("Einzigartige: Anzeige und Vergleich",()=>{hero(30);const it=genUnique("sonnenlaser",30);S.gear.push(it);ok(bagHtml().includes(t("ux.tag")),"Kennzeichen fehlt");ok(typeof cmpHtml(it)==="string","Vergleich")});
```
- [ ] **Step 2: `scripts/test-browser.sh` anlegen** (aus dem Muster: Chrome headless `--dump-dom`, Zeilen `✅/❌` aus `#out` zählen) und laufen lassen → die neuen Tests sind ❌.
- [ ] **Step 3: Implementieren** gemäß Interfaces. `gearClean`: bei `g.u` in `UNIQ` Stück mit `u` übernehmen (fx-Prüfung auslassen, `fx` auf Platzhalter setzen, `b`,`il`,`cat` prüfen). `genText`: bei `it.u` Name = `UNIQ`-Name (nicht gespeichert), `d` = Effekttext aus `ue.<k>` mit eingesetzten Prozenten. `fxv`: Stücke mit `u` überspringen. `bagHtml`/Beuteberichte: Name in Gold (`#ffb300`), Kennzeichen `t("ux.tag")` („✦ Einzigartig“). `cmpHtml`: bei `u` den Effekttext statt der Standardeffekte. `salvage`: bei `u` wie Legendär (`it.r===3`) plus 1 Arkankristall (`ak`).
- [ ] **Step 4: Tests laufen lassen** → grün (de und en), `i18n-check` grün.
- [ ] **Step 5: Commit** `"Einzigartige Waffen: Daten, Fund, Anzeige"`

### Task 2: Treffer-Effekte (dbl, chain, soul, blood, pierce, ret, mercy, laser)

**Files:** Modify `js/combat.js` (`useSkill`, `setup`, Zustand `F.uq`), `js/unique.js` (Effekt-Funktionen), `js/lang/de.js`/`en.js` (`ue` Kampftexte), Test `tests/index.html`

**Interfaces:**
- Consumes: Task 1 (`uHas`, `uVal`, `uEq`).
- Produces: `uOnHit(f,tot,crit,l):void` (wird nach dem Treffer in `useSkill` aufgerufen, berechnet Zusatzschaden und hängt ihn an `f.ehp`; verwendet `f.php`/`f.pp` für Seelenraub), `uDmgMul(f):number` (Blutdurst-Faktor im Schadensterm), `uPierce():boolean`. `F.uq={bl:0,hit:0,res:0,ph:0}` (Blutdurst-Stapel, `res`= Wiederkehr/Doppel-/Laserschutz gegen Verkettung). Kampflog-Zeilen über `t("ue.log.<k>",…)`. Effekt-Animation über `f.vfx.push(["u_<k>","vE",0])` (Namen: `u_dbl,u_chain,u_soul,u_pierce,u_ret,u_mercy,u_laser`).
- Regeln: Zusatztreffer (dbl, ret, laser, chain) lösen **keine** weiteren Effekte aus (Flag `f.uq.res`). `mercy` bei `f.boss`: Schaden `0.2·emax` statt Tod.

- [ ] **Step 1: Tests** (`Math.random` je Test überschreiben, Waffe per `S.ew=genUnique(...).id` anlegen, `setup(mk(40,ET[0]))`, `F.ehp=F.emax=1e6`):
  - `dbl`: bei `Math.random=()=>0` zwei Treffer, Gesamtschaden ≈ 1,7× Einzelschaden (Toleranz ±2), Log enthält `t("ue.log.dbl")`.
  - `chain`: nur bei Krit; Zusatzschaden = `uVal("chain")·Treffer` (ignoriert `f.def`).
  - `soul`: Fähigkeit mit `pp<99` bekommt +1 (bis Maximum).
  - `blood`: Faktor wächst je Treffer, max. +40 %, Stapel in `F.uq.bl`.
  - `pierce`: Schaden unabhängig von `f.def` und `f.eb.guard`.
  - `ret`: zweiter Hieb 60 %.
  - `mercy`: Gegner <25 % LP stirbt bei Zufall 0; Boss (`mk(…,BOSS[0],true)`) verliert stattdessen 20 % emax und lebt.
  - `laser`: Zusatzschaden 80 %, ignoriert `f.def`.
  - Kein Effekt löst einen weiteren aus (Zusatzschaden 1× pro Skill).
- [ ] **Step 2: Tests laufen** → ❌.
- [ ] **Step 3: Implementieren.** In `useSkill` im Schadenszweig: `uDmgMul` in den Schadensterm, nach `f.ehp-=…` `uOnHit(...)`. `pierce` setzt wie `Durchbohren` `pierce=true`.
- [ ] **Step 4: Tests** grün, `simRun`-Stichprobe darf nicht hängen (`haenger` leer).
- [ ] **Step 5: Commit** `"Einzigartige Waffen: Treffer-Effekte"`

### Task 3: Zug-Effekte (time, mirror, phoenix, storm, morph, Blutdurst-Kosten)

**Files:** Modify `js/combat.js` (`enemyTurn`, `enemyAct`, `setup`, `endFight`-Zweig bei 0 LP des Spielers), `js/unique.js`, Sprachdateien, Test

**Interfaces:**
- Consumes: Task 1/2 (`uHas`, `uVal`, `F.uq`).
- Produces: `uTurnStart(f,l)` (Sturmruf bei Kampfbeginn über `setup`, Blutdurst-Kosten `2 % pmax`, nie unter 1 LP), `uTime(f,l):boolean` (Zeitriss: `true` = Gegner setzt aus, wie `f.eb.stun`), `uMirror(f,dmg,l)` (Rückschaden an den Gegner nach `enemyAct`), `uPhoenix(f,l):boolean` (einmal pro Kampf; `true` = Spieler lebt; wird vor `endFight(false)` geprüft), `uMorph(f):boolean` (`php<pmax/2`; Schaden ×(1+Wert), +15 % Krit, `F.uq.mo=1` für das Aussehen). Animationen: `u_time,u_mirror,u_phoenix,u_storm,u_morph,u_blood`.

- [ ] **Step 1: Tests:** `storm`: `f.pb.buff===3` direkt nach `setup`; `time`: Zufall 0 → `enemyAct` wird übersprungen; `mirror`: Gegner verliert `uVal·erlittener Schaden`; `phoenix`: bei `php<=0` steht der Spieler mit `uVal·pmax` auf, zweites Mal endet der Kampf; `blood`: nach 200 Zügen mit `php=pmax=50` nie `php<1`; `morph`: unter 50 % mehr Schaden, `F.uq.mo`; **Kampf endet**: Waffe mit `time`+`phoenix`+`ret`, `win()` beendet (`F.over`).
- [ ] **Step 2: Tests** ❌, **Step 3: implementieren**, **Step 4:** grün (de/en) und `simRun(400)` ohne `haenger`, **Step 5: Commit** `"Einzigartige Waffen: Zug-Effekte"`

### Task 4: Beutequellen

**Files:** Modify `js/combat.js` (`endFight`: Turm-Boss, Boss, Turnier), `js/day.js` (`moonLoot`), `js/events.js` (Mimik-Sieg: `endFight`-Zweig `f.mimic`), Test

**Interfaces:** Consumes `uniqueRoll(src,il,l)`. Der Wurf **ersetzt** bei Erfolg die normale `lootGive`-Beute dieser Quelle: Bosskampf-Boss: ein Wurf, bei Erfolg nur **eine** normale Beute (statt zwei); Turm-Boss (`f.tower%5===0`): bei Erfolg statt `lootGive`; Turniersieg (`f.tour===3`, `tourLoot`): bei Erfolg statt Pokalbeute; Mimik/Werwolf: Mimik bekommt den Wurf zusätzlich zu den bisherigen Preisen (hat bisher keine Beute), `moonLoot` ersetzt `lootGive("moon")`.

- [ ] **Step 1: Tests** mit `Math.random=()=>0`: je Quelle genau ein einzigartiges Stück (`S.gear.filter(isU).length===1`), kein normales Stück zusätzlich bei Turm/Turnier/Werwolf; Bosskampf-Boss: ein einzigartiges + ein normales; mit `Math.random=()=>.99`: kein einzigartiges, normale Beute wie bisher (Anzahl wie vor der Änderung). Chancen: Verteilung über 2000 Würfe je Quelle innerhalb ±2 Prozentpunkte der Tabelle. `il` je Quelle wie bei der normalen Beute.
- [ ] **Step 2–4:** ❌ → implementieren → grün. **Step 5: Commit** `"Einzigartige Waffen: Beutequellen"`

### Task 5: Grafik der vier abgenommenen Waffen und Einbindung

**Files:** Create `js/uniqueart.js`; Modify `js/art.js` (`knight`: einzigartige Waffe statt Standardwaffe zeichnen), `js/loot.js`/`bagHtml` (großes Bild), `index.html`, `tests/index.html`; Referenz: `docs/superpowers/specs/assets/unique-konzepte-3.html` (Task-Schritt 1 kopiert `unique-konzepte-3.html` aus `/private/tmp/claude-501/-Users-d066068_1-git--private-Rittermanager/…/scratchpad/` in dieses Verzeichnis)

**Interfaces:**
- Produces: `UNIQV={}` (Zeichnungen je Kennung), `uniqBig(id:string,phase?:0|1):string` (SVG-String im Stil der Konzepte, viewBox `0 0 300 600`, mit Animationsklassen), `uniqSmall(id:string,phase?:0|1):string` (SVG-Fragment für die Hand des Ritters im Koordinatensystem von `knight()`: Griff bei 107.5/105.5, Klinge nach oben; erkennbare vereinfachte Fassung), CSS-Klassen für die Animationen in `css/style.css`.
- In `knight()`: wenn `wi` eine einzigartige Waffe ist (`itm(wi).u`), wird statt `catSvg`/Schwertpfad `uniqSmall(itm(wi).u, F&&F.uq&&F.uq.mo?1:0)` gezeichnet. Im Beutel zeigt `bagHtml` `uniqBig` verkleinert.

- [ ] **Step 1: Test:** `uniqBig`/`uniqSmall` für `donnerzahn,sonnenlaser,wiederkehr,blutdurst` beginnen mit `<svg`/`<g`, enthalten kein `undefined`/`NaN`; `pk()` mit angelegtem Donnerzahn enthält dessen Kennzeichen (z. B. `data-u="donnerzahn"`); Beutelanzeige zeigt das Bild.
- [ ] **Step 2–4:** ❌ → Zeichnen nach den Konzeptbildern (kleine Fassung: Umrisse, Hauptfarbe, 2–3 Animationen) → grün. **Sichtprüfung** per Screenshot: großes Bild und Ritter mit kleiner Waffe je Waffe; Hellebarden-artige Abschnitte am Bildrand beachten (viewBox 130×160, nichts bei y<0).
- [ ] **Step 5: Commit** `"Einzigartige Waffen: Grafik der ersten vier"`

### Task 6a–6c: Grafik der übrigen 17 Waffen

Je Aufgabe gleiches Muster wie Task 5 (`UNIQV`-Einträge, Test „Figuren rendern ohne undefined", Sichtprüfung per Screenshot, Commit):
- **6a:** Schwert (`chronos,gnade`), Axt (`schaedel,zwilling`), Keule (`phoenix,weltenbrecher,erschuetterer`)
- **6b:** Hellebarde (`sturmherold,seelenfaenger,spiegelspeer`), Bogen (`sternenfall,jaeger`)
- **6c:** Stab (`seelenspinner,wandelstab`), Dolch (`zwillingsfang,schattenstich,trugspiegel`)
Stil und Niveau wie die vier abgenommenen: Runen, Zacken, Flügel, Edelsteine, schwebende Teile, animierte Energie, weicher Lichthof, **keine ausbreitenden Kreise am Boden**. `wandelstab` und `phoenix` bekommen `phase 1` (zweites Aussehen) für Verwandlung/Phoenixherz. Der abschließende Test prüft: `UNIQ.every(u=>UNIQV[u.id])` und dass `uniqBig`/`uniqSmall` für alle 21 Waffen und beide Phasen renderbar sind.

### Task 7: Kampfanimationen und Enthüllung

**Files:** Modify `js/uniqueart.js` (`VX`-Einträge `u_dbl,u_chain,u_soul,u_pierce,u_ret,u_mercy,u_laser,u_time,u_mirror,u_phoenix,u_storm,u_morph,u_blood`; `uniqueReveal(it)`), `css/style.css`, `js/combat.js` (Aufruf der Enthüllung), Test; Referenz für Optik: `unique-konzepte-3.html` und der Entwurf `unique-entwurf.html` (Kampfeffekte, Truhe) im selben Verzeichnis

**Interfaces:**
- Produces: `uniqueReveal(it:item):void` (Vollbild-Overlay `#ureveal` über `app`: Blitz schlägt in die Truhe, Bildschirm wackelt, Deckel springt auf, Lichtstrahl nach oben, Waffe (`uniqBig`) dreht sich heraus und schwebt, Name und Effekt schlagen ein; Knopf „Weiter“ und Taste Enter/Esc schließen es; **keine ausbreitenden Kreise am Boden**). Wird in `fight()` einmal aufgerufen, wenn `F.reveal` gesetzt ist (danach `F.reveal=null`), nicht bei `QUICK`, nicht ohne `document.getElementById("app")`.
- Kampfanimationen: jeder Effekt zeigt über `VX[name](c)` eine klar sichtbare Animation (Doppelschlag: zwei Hiebe + „×2“; Blitzkette: Blitz; Laserstrahl: breiter Strahl mit Aufladen; Wiederkehr: Geisterpfeil; Zeitriss: Uhr/Verlangsamung; Gnadenstoß: Aufblitzen und Zerfall; Phoenixherz: Feuer und Aufstehen; Sturmruf: Sturm-Aura; Spiegelklinge: Spiegelglanz; Seelenraub: Seelenwisps; Blutdurst: roter Pulsschlag; Rüstungsbrecher: splitternder Schild; Verwandlung: Lichtblitz). `prefers-reduced-motion` schaltet die Bewegung ab.

- [ ] **Step 1: Tests:** `VX` hat alle 13 Namen und jeder liefert HTML ohne `undefined`; `uniqueReveal(genUnique("donnerzahn",30))` legt `#ureveal` an, Enter schließt es; bei `QUICK=true` und in `quickFight()` wird nie ein Overlay angelegt; `win()` mit Funden (`Math.random=()=>0`) hängt nicht; zweiter `fight()`-Aufruf zeigt es nicht erneut.
- [ ] **Step 2–4:** ❌ → implementieren → grün. **Sichtprüfung** der Enthüllung und je einer Kampfanimation je Effekt per Screenshot und im Chrome-Fenster.
- [ ] **Step 5: Commit** `"Einzigartige Waffen: Kampfanimationen und Enthüllung"`

### Task 8: Balance

**Files:** Modify `tests/sim.js` (Hilfe `uniqDuel(id,il,runs):number` — Siegquote eines Helden mit der Waffe gegen Turm-Boss/Boss, Referenz: gleicher Held mit Legendär gleicher `il`), `js/unique.js` (`UVAL`, Grundschaden)

- [ ] **Step 1:** `uniqDuel` bauen (Vorbild `bossDuel`, `hero(L)`, `S.sk` mit Deckung), Tabelle Waffe | Legendär-Quote | Unique-Quote für `il` 20/40 ausgeben (Chrome headless, `sim.sh`-Muster).
- [ ] **Step 2:** `UVAL` und Grundschaden so einstellen, dass die Unique-Quote bei jeder Waffe **0–20 Punkte** über der Legendär-Quote liegt (etwa eine Stufe darüber) und `simRun(400)` ohne `haenger` bleibt; Ergebnistabelle in die Commit-Nachricht.
- [ ] **Step 3: Tests grün, Commit** `"Einzigartige Waffen: Balance"`

### Task 9: Doku und Version

**Files:** Modify `ANLEITUNG.md`, `ANLEITUNG.en.md` (Abschnitt „Einzigartige Waffen“: Liste, Effekte, Quellen und Chancen), `index.html` (`var V="0.2.3"`)

- [ ] **Step 1:** Doku und Version, **Step 2:** `scripts/test-browser.sh` grün, echtes `index.html` ohne Konsolenfehler laden und eine Waffe per Konsole (`S.gear.push(genUnique("donnerzahn",30))`) anlegen, ansehen. **Step 3: Commit** `"Einzigartige Waffen: Anleitung und Version 0.2.3"`. Danach dem Nutzer anbieten, `docs/itch-devlog-0.2.3.md/.html` zu schreiben.
