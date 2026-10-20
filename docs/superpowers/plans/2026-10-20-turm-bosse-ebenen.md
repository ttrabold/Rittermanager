# Turm-Bosse und Turm-Ebenen bis 100 – Umsetzungsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 20 eigene Turm-Bosse mit Kampftricks und 20 Turm-Ebenen (12 neu) bis Etage 100, danach Schatten-Durchläufe.

**Architecture:** Bosse sind Daten (`TBOSS` in `data.js`, Texte `tboss` in den Sprachdateien). Die Trick-Logik steckt in einer neuen Datei `js/towerboss.js` mit wenigen Einhängepunkten in `combat.js`. Grafiken für neue Bosse und Ebenen kommen in die neue Datei `js/towerart.js` (nach `art.js`), damit `art.js` nicht doppelt so lang wird.

**Tech Stack:** Klassisches JS ohne Module/Build, SVG-Strings, WebAudio. Tests im Browser (`tests/index.html`), Steuerung per Chrome-DevTools-MCP.

**Spec:** `docs/superpowers/specs/2026-10-20-turm-bosse-ebenen-design.md`

## Global Constraints

- Keine ES-Module, kein npm. Neue Dateien in **gleicher Reihenfolge** in `index.html` (mit `?v=`) und `tests/index.html` eintragen: `towerart.js` direkt nach `art.js`, `towerboss.js` direkt nach `combat.js`.
- Keine Spieltexte im Code: jeder neue Text in `js/lang/de.js` **und** `js/lang/en.js`. Interne Kennungen bleiben deutsch.
- Kompakter Einzeiler-Stil wie im Umfeld, keine fremden Zeilen umformatieren. Kein `findLastIndex` o. ä.
- Alte Spielstände dürfen nicht brechen: `S.tcur`/`S.tbest` bleiben gültig. Neue `S`-Felder nur mit `fresh()` und `migrate()`. Der Plan braucht keine.
- Die 12 Bosskampf-Bosse (`BOSS`, `LORE`, `S.boss`, Söldner) bleiben unverändert.
- Version am Ende 0.1.0 → **0.2.0** (`index.html` alle `?v=`, `sw.js` `CACHE`).
- Branch `turm-bosse`. Nicht pushen, ohne dass der Nutzer es verlangt.

## Prüfen (gilt für jede Aufgabe)

1. `node scripts/i18n-check.js` → keine Fehler.
2. Chrome-DevTools: `new_page` `file:///Users/d066068_1/git/_private/Rittermanager/tests/index.html`, dann `evaluate_script` `()=>{const o=document.getElementById("out").textContent;return {fail:(o.match(/❌.*/g)||[]),n:(o.match(/✅/g)||[]).length}}` → `fail` leer. Dasselbe mit `?lang=en`.
3. Erst danach committen. Commit-Nachrichten deutsch.

## Review Focus

- **Alter Spielstand mitten im Turm** (`S.tcur` z. B. 37, 64, 140): Der Turm startet auf der richtigen Etage mit Boss bzw. Ebene aus der neuen Tabelle → Test in Task 1 (`S.tcur=140`).
- **Gesiegelte Fähigkeit per Tastenkürzel** (Taste 1–9) darf nicht auslösen → Test in Task 2.
- **Kampf endet nicht** (Diener + Wiedergeburt + `win()`-Helfer oder Sim-KI): `win()` setzt nur `F.ehp=0`. Revive und Diener dürfen den Kampf nicht endlos machen → Test in Task 3 (`win()` beendet Turmherr-Kampf).
- **Phasenwechsel ändert das Bestiarium-Konto nicht** (Name ändert sich, Schlüssel muss `tb<i>` bleiben) → Test in Task 3.
- **Englische Texte mit Funktionen** (Ankündigungen mit Namen) liefern kein `undefined` im Kampflog → Test in Task 3 prüft `!F.log.includes("undefined")` für alle 20 Bosse mit Tricks.

---

### Task 1: Turm-Boss-Tabelle, Auswahl, Bestiarium (ohne Tricks)

**Files:**
- Modify: `js/data.js` (nach `BOSS`/`loc("boss",…)`): `TBOSS` mit 20 Einträgen, `loc("tboss",TBOSS,(o,i)=>i)`
- Create: `js/towerboss.js` (`tbossAt`, später die Tricks)
- Modify: `js/combat.js` `mk()`, `towerFloor()`, `fight()` (Bildauswahl)
- Modify: `js/bestiary.js` (`BST`, `bKey`), `js/lang/de.js`/`en.js` (`tboss`, `best.cTBoss`, `tw.shadow`)
- Modify: `js/art.js` `tbossSvg` als Rückfall (in Task 1 noch `knight(4,4,3,true,TBOSS[i].tint)`)
- Modify: `index.html`, `tests/index.html` (neue Datei eintragen)
- Test: `tests/index.html`

**Interfaces:**
- Produces: `TBOSS[i] = {L,hp,atk,def,tint,mv,tr,fx?,mv2?}`. Nach `loc` gilt: `.n`, `.d`, `.n2?`, Angriffsnamen in `mv[k][0]`. `mv2` bekommt seine Namen aus `tboss[i].mv2` (in `loc` oder per Hand zuweisen wie bei `mv`).
- Produces: `tbossAt(n) → {i, c}` mit `i=(n/5-1)%20`, `c=Math.floor((n-1)/100)`. Nur für `n%5===0` aufrufen.
- Produces: Gegnerobjekt aus `mk()` für Turm-Bosse hat `tbi` (0–19, sonst `-1`), `cyc` (Schatten-Durchlauf), `bi=-1`, `tr` (Kopie von `t.tr` oder `{}`).
- Produces: `tbossSvg(i, ph)` (ph = Phase 0/1), definiert in `art.js` als Rückfall, in `towerart.js` später überschrieben bzw. mit `TBOSSV` gefüllt.
- Produces: Bestiarium-Schlüssel `"tb"+i`, Kategorie `t("best.cTBoss")` („Turm-Bosse“ / „Tower bosses“).

Startwerte für `TBOSS` (Bauender darf in Task 7 nachstellen). Boss 1–12 übernehmen `L/hp/atk/def` von `BOSS[0..11]`, `hp` ×0,9 bei Bossen mit Trick. Boss 13–20: `L` 54, 58, 62, 66, 70, 74, 78, 82; `hp` 7,0 → 9,0 linear; `atk` 1,63 → 1,84; `def` 1,72 → 1,9. Namen, Tricks und Ebenen-Zuordnung genau wie in der Spec-Tabelle, Angriffslisten (4–5 Angriffe) passend zum Thema. `tr`-Parameter siehe Task 2/3.

- [ ] **Step 1: Branch anlegen** `git checkout -b turm-bosse`
- [ ] **Step 2: Failing tests schreiben**

```js
test("Turm-Bosse: 20 eigene, keiner aus BOSS",()=>{hero(60);const seen=new Set();for(let n=5;n<=100;n+=5){S.tcur=n;S.en=9;F=null;startTower();ok(F.boss&&F.tbi>=0&&F.bi===-1,"Etage "+n);ok(!BOSS.some(b=>b.n===F.name),"alter Boss auf "+n);seen.add(F.tbi)}ok(seen.size===20,"nur "+seen.size)});
test("Turm-Bosse: Schatten ab 105",()=>{hero(60);S.tcur=105;startTower();ok(F.tbi===0&&F.cyc===1&&F.name.includes(t("tw.shadow")),F.name);const a=F.lvl;F=null;S.tcur=5;startTower();ok(a>=F.lvl+10,"Schatten nicht stärker")});
test("Turm: alter Stand auf Etage 140",()=>{hero(60);S.tcur=140;startTower();ok(F.tower===140&&F.tbi===7&&F.cyc===1,"Etage 140")});
test("Turm-Bosse: Bestiarium",()=>{ok(BST.filter(b=>b.k.startsWith("tb")).length===20,"Einträge");hero(60);S.tcur=10;startTower();win();ok(S.bst.tb1&&S.bst.tb1.w===1,"tb1 nicht gezählt");bestScr()});
test("Turm-Bosse: Angriffe benannt",()=>{for(const b of TBOSS)for(const m of[...b.mv,...(b.mv2||[])])ok(typeof m[0]==="string"&&m[0]&&m.length===5,"Angriff ohne Namen: "+b.n)});
```

- [ ] **Step 3: Test laufen lassen** → die neuen Tests sind ❌ (`TBOSS is not defined` o. ä.).
- [ ] **Step 4: Implementieren.** `towerFloor(n)`: bei `n%5===0` `const {i,c}=tbossAt(n),b=TBOSS[i]; e=mk(b.L+Math.floor(n/3)+10*c,b,true)`, danach `e.cyc=c`, bei `c>0` Name mit Präfix `t("tw.shadow")` (de „Schatten-“, en „Shadow “). In `mk()`: `tbi:boss?TBOSS.indexOf(t):-1`. `fight()`: bei `f.tbi>=0` `tbossSvg(f.tbi,f.ts&&f.ts.ph)`, bei `f.cyc` in ein `<div style="filter:brightness(.55) saturate(1.4)">` gehüllt. `bKey()`: `f.tbi>=0?"tb"+f.tbi:…` vor dem `bi`-Zweig.
- [ ] **Step 5: Prüfen** (siehe oben) → alles ✅, auch die alten Turm-Tests (Beute Etage 10, Drachenschuppen).
- [ ] **Step 6: Commit** `git commit -m "Turm: 20 eigene Turm-Bosse statt der Bosskampf-Bosse"`

### Task 2: Tricks Aufladen, Spiegeln, Versiegeln

**Files:**
- Modify: `js/towerboss.js`, `js/combat.js` (`setup`, `useSkill`, `useItem`, `enemyTurn`, `enemyAct`, `fight`), Sprachdateien (`tb.*`)
- Test: `tests/index.html`

**Interfaces:**
- Consumes: `F.tr`, `F.tbi` aus Task 1.
- Produces: Kampfzustand `F.ts={ch:0,arm:0,rf:0,sl:{},ph:0,rv:0,mi:[],mt:{}}`, angelegt in `setup()` für alle Kämpfe (leer = keine Wirkung).
- Produces: `tbAct(f,l) → bool` (in `enemyTurn` statt direkt `enemyAct(l)`. Bei `true` hat der Trick den Zug verbraucht). `tbHits(f,hits,l) → bossDamage` (in `useSkill` statt `f.ehp-=tot`. `hits` ist das Array der Einzeltreffer). `tbSealed(id) → bool`. `tbTick(f)` am Ende von `enemyTurn` (Siegel und Spiegel-Runden runterzählen).
- Produces: `enemyAct(l,m)`: optional erzwungener Angriff `m`. Ein Zug mit `m[3]==="charge"` trifft sicher, Deckung halbiert zusätzlich (zusammen ×0,25).

Parameter (Startwerte): `charge:{n:3,pw:3}` (alle 3 Gegnerzüge wird angekündigt, das verbraucht den Zug, im nächsten Zug Schlag mit Wucht 3). Ist der Boss beim Schlag betäubt, bricht das Aufladen ab (Log `tb.chBreak`). `reflect:{n:4,r:2,p:.5}` (alle 4 Züge 2 Runden Spiegel, 50 % des Boss-Schadens gehen zurück, Schaden über Zeit nicht). `seal:{p:.35,r:2}` (nach einem Treffer des Bosses wird mit 35 % eine zufällige angelegte Fähigkeit außer `hieb` für 2 Runden gesiegelt). Reinigungstrank `g` und Fähigkeit `cleanse` heben alle Siegel auf. Symbole im Gegnerkasten: ⚡ (aufgeladen), 🪞 (Spiegel). Gesiegelte Fähigkeiten im Menü `disabled` mit 🔒.

- [ ] **Step 1: Failing tests**

```js
const tbF=(i,L)=>{hero(L||50);S.tcur=(i+1)*5;startTower();F.ehp=F.emax=1e6;return F};
test("Trick Aufladen: Deckung und Betäubung",()=>{const f=tbF(0);f.ts.arm=1;f.pb.guard=0;const a=f.php;f.php=f.pmax=1e6;enemyTurn([]);const full=1e6-f.php;f.ts.arm=1;f.pb.guard=3;f.php=1e6;enemyTurn([]);ok(1e6-f.php<full*.4,"Deckung wirkt nicht");f.ts.arm=1;f.eb.stun=1;f.php=1e6;enemyTurn([]);ok(f.php===1e6&&!f.ts.arm,"Betäubung bricht nicht ab")});
test("Trick Spiegeln",()=>{const f=tbF(2);f.ts.rf=2;const p=f.php;useSkill("hieb");ok(f.php<p||f.log.includes(t("cb.miss")),"kein Rückschaden")});
test("Trick Versiegeln",()=>{const f=tbF(4);const id=S.sk[0];f.ts.sl[id]=2;const pp=f.pp[id];useSkill(id);ok(f.pp[id]===pp,"gesiegelt nutzbar");document.dispatchEvent(new KeyboardEvent("keydown",{key:"2"}));ok(f.pp[id]===pp,"Taste umgeht Siegel");for(let k=0;k<200;k++){f.ts.sl={};f.php=f.pmax;enemyTurn([]);ok(!f.ts.sl.hieb,"hieb gesiegelt")}S.it.g=1;f.ts.sl[id]=2;useItem("g");ok(!f.ts.sl[id],"Trank hebt Siegel nicht auf")});
```

(`S.sk[0]` liegt bei `hero` auf Taste 2, weil Taste 1 `hieb` ist. Die Tests nutzen Bosse mit dem jeweiligen Trick: 0 = Torwächter, 2 = Kristallgolem, 4 = Graue Witwe.)

- [ ] **Step 2: Test laufen lassen** → ❌.
- [ ] **Step 3: Implementieren** gemäß Interfaces. Ankündigungstexte als Funktionen `(n)=>…` unter `tb` in beiden Sprachen (`chArm`, `chHit`, `chBreak`, `rfUp`, `rfHit`, `seal`, `unseal`).
- [ ] **Step 4: Prüfen** → ✅ (auch „Alle Fähigkeiten einsetzbar“, „Tastenkürzel“, „Schnellkampf“).
- [ ] **Step 5: Commit** `"Turm-Bosse: Tricks Aufladen, Spiegeln, Versiegeln"`

### Task 3: Tricks Helfer, Phase, Wiedergeburt

**Files:** wie Task 2, außerdem `tests/sim.js` (`fightAI` beachtet Siegel)

**Interfaces:**
- Consumes: `F.ts`, `tbAct`, `tbHits` aus Task 2.
- Produces: `tbRevive(f,l) → bool`. Alle `if(f.ehp<=0)return endFight(true,l)` in `enemyTurn` werden zu `if(f.ehp<=0&&!tbRevive(f,l))return endFight(true,l)`. Dieselbe Prüfung gilt in `useSkill`-Folge über `enemyTurn`.
- Parameter: `minion:{k:2,hp:.12,atk:.25,at:[1]}` (`k` Diener mit `hp`×`emax` LP, jeder macht pro Gegnerzug `atk`×`f.atk` Schaden, Deckung halbiert. `at` sind die LP-Anteile, bei denen gerufen wird, `1` = Kampfbeginn). `phase:{at:.5,heal:.15,atk:1.2}` (ersetzt bei diesem Boss die Raserei `enr`: `n2`, `mv2`, Heilung, Angriff ×`atk`, `F.ts.ph=1`). `revive:{hp:.4}`. Reihenfolge und Abbruchregeln genau wie im Spec-Abschnitt „Trick-Regeln im Detail“.
- Anzeige: im Gegnerkasten `🐾×k` und die LP der Diener in kleiner Schrift. Bestiarium-Schlüssel bleibt `tb<i>` auch nach Phasenwechsel.

- [ ] **Step 1: Failing tests**

```js
test("Trick Helfer",()=>{const f=tbF(1);ok(f.ts.mi.length>=2,"keine Diener");const e=f.ehp,m=f.ts.mi[0];S.sk=[];useSkill("hieb");ok(f.ehp===e||f.log.includes(t("cb.miss")),"Treffer ging am Diener vorbei");ok(f.ts.mi[0]<m||f.log.includes(t("cb.miss")),"Diener nicht getroffen");f.eb.poison=3;const e2=f.ehp;f.php=f.pmax;enemyTurn([]);ok(f.ehp<e2,"Gift trifft Boss nicht")});
test("Trick Phase",()=>{const f=tbF(3);f.ehp=f.emax*.4;f.php=f.pmax;enemyTurn([]);ok(f.ts.ph===1&&f.name===TBOSS[3].n2&&f.mv===TBOSS[3].mv2,"keine Phase");ok(!f.enr,"Raserei trotz Phase");ok(bKey(f)==="tb3","Bestiarium-Schlüssel")});
test("Trick Wiedergeburt genau einmal",()=>{const f=tbF(13);f.ehp=0;f.php=f.pmax;enemyTurn([]);ok(!f.over&&f.ehp>0,"keine Wiedergeburt");f.ehp=0;enemyTurn([]);ok(f.over&&f.ko==="e","zweite Wiedergeburt")});
test("Turmherr: alle Tricks, Kampf endet",()=>{hero(70);S.tcur=100;startTower();win();ok(F.over&&F.ko==="e")});
test("Turm-Bosse: kein undefined im Log",()=>{for(let i=0;i<20;i++){const f=tbF(i,70);f.php=f.pmax=1e6;for(let k=0;k<12;k++){f.ehp=k===6?f.emax*.3:f.ehp;useSkill("hieb");if(f.over)break}ok(!f.log.includes("undefined"),"Boss "+i+": "+f.log)}});
```

(1 = Kerkermeister: Helfer. 3 = Magmawurm: Phase. 13 = Knochenkönig: Wiedergeburt.)

- [ ] **Step 2: Test laufen lassen** → ❌.
- [ ] **Step 3: Implementieren.** In `tests/sim.js` `fightAI`: `av` filtert zusätzlich `!tbSealed(id)`.
- [ ] **Step 4: Prüfen** → ✅. Zusätzlich auf der Testseite `simRun(400)` per Skript laden (`evaluate_script`: Script-Tag `tests/sim.js` anhängen, dann `simRun(400)`): Es darf kein `haenger` auftreten, und `deaths` darf gegenüber `main` nicht auffällig steigen (vorher auf `main` messen und notieren).
- [ ] **Step 5: Commit** `"Turm-Bosse: Tricks Helfer, Phase, Wiedergeburt"`

### Task 4: Figuren der Turm-Bosse 1–8

**Files:** Create `js/towerart.js` (eintragen in `index.html` und `tests/index.html` nach `art.js`). Darin `TBOSSV` (Array von `ph=>BSV(...)`) und `tbossSvg=(i,ph)=>TBOSSV[i]?TBOSSV[i](ph):knight(4,4,3,true,TBOSS[i].tint)`. Die Rückfall-Definition in `art.js` entfällt. Boss 7 (Schattenzwilling) verwendet `knight(...)` mit der Ausrüstung des Spielers wie `pk()`, aber dunkel getönt (`S.sex`, angelegte Waffe/Rüstung).

Stil: wie `BOSSV` (viewBox 130×160, Klassen `br`/`wv`/`pl`/`glow` für Animation, Schatten-Ellipse über `BSV`). Phasen-Bosse (4, 12, 15, 17, 19, 20) bekommen für `ph=1` sichtbar andere Details (Farbe, Glühen, Form).

- [ ] **Step 1: Test** `test("Turm-Boss-Figuren",()=>{for(let i=0;i<20;i++)for(const ph of[0,1]){const s=tbossSvg(i,ph);ok(s.startsWith("<svg")&&!s.includes("undefined"),"Figur "+i)}ok(TBOSSV.length>=8,"zu wenige Figuren")})` → ❌.
- [ ] **Step 2: Figuren 1–8 zeichnen.**
- [ ] **Step 3: Sichtprüfung:** in `tests/index.html` per `evaluate_script` nacheinander `S.tcur=5k;startTower()` und Screenshot, für jede Figur einmal (bei Phasen-Bossen beide Phasen). Prüfen, dass Figur und Rahmen nicht abgeschnitten sind und die Figur im Hellen und Dunklen erkennbar ist.
- [ ] **Step 4: Prüfen** → ✅. **Commit** `"Turm-Bosse: Figuren 1–8"`

### Task 5: 12 neue Ebenen (Bild, Text, Klang)

**Files:** `js/towerart.js` (`TBGS.push(...)` mit 12 Hintergründen, Stil wie `TBGS` in `art.js`: `SV`, `LG`, `RG`, `bricks`, `torch`, `floor`), `js/art.js` `ttier`, Sprachdateien `tier` (+12 Einträge `[Name, Satz]`, Namen wie Spec-Tabelle, en: Clockwork Chambers, Sunken Library, Mushroom Grotto, Frozen Crypt, Blood Rose Garden, Bone Crypt, Sky Forge, Hall of Mirrors, Dreamlands, Observatory, Golden Hoard, Tower Crown), `js/audio.js` (`tower.bpm` 20 Werte, `tower.p` bildet `tr>=8` per Tabelle auf Melodien 0–7 ab, `amb()` 12 neue Fälle).

**Interfaces:** `ttier(n) = Math.floor((n-1)/5)%20` (`TIER.length` muss 20 sein). `twTier()` unverändert.

- [ ] **Step 1: Tests**

```js
test("Turm-Ebenen 1–100",()=>{ok(TIER.length===20&&TBGS.length===20,"Anzahl");for(let n=1;n<=100;n++)ok(ttier(n)===Math.floor((n-1)/5),"ttier "+n);ok(ttier(101)===0&&ttier(140)===7,"Wiederholung");for(let i=0;i<20;i++){ok(TBG(i).includes("<svg")&&!TBG(i).includes("undefined"),"Bild "+i);ok(TIER[i][0]&&TIER[i][1],"Text "+i)}});
test("Turm-Ebenen: Klang ohne Fehler",()=>{const o=AU.ctx;if(!o)return;for(let i=0;i<20;i++){F={tower:i*5+1,over:false};TR.tower.p(0,o.currentTime,.2);amb(i,0,o.currentTime,.2)}F=null});
```

(Der Klangtest läuft nur, wenn ein AudioContext existiert. Sonst wenigstens per Hand im Spiel anhören, siehe Step 3.)

- [ ] **Step 2: Implementieren.**
- [ ] **Step 3: Sichtprüfung:** Screenshot je neuer Ebene im Kampf (`S.tcur=41,46,…,96`). Im echten Spiel (`index.html` per `file://`, Testkopie, nicht Live-Seite) Musik für 2 Ebenen kurz anhören, falls der Browser es zulässt. Sonst ehrlich melden, dass nur getestet ist, dass kein Fehler auftritt.
- [ ] **Step 4: Prüfen** → ✅. **Commit** `"Turm: 12 neue Ebenen bis Etage 100"`

### Task 6: Figuren der Turm-Bosse 9–20

**Files:** `js/towerart.js` (`TBOSSV` auf 20).

- [ ] **Step 1:** Im Figuren-Test aus Task 4 `TBOSSV.length>=8` auf `===20` ändern → ❌.
- [ ] **Step 2: Figuren 9–20 zeichnen** (Phasen-Varianten wie in Task 4).
- [ ] **Step 3: Sichtprüfung** wie Task 4, außerdem Etage 105 (Schatten-Torwächter auf Eingangshalle) als Screenshot, um den Schatten-Look zu prüfen. Der Hintergrund bei `cyc>0` bekommt eine dunkle Überlagerung (`<rect … fill="#000" opacity=".35"/>` o. ä. in `fight()` hinter `TBG`).
- [ ] **Step 4: Prüfen** → ✅. **Commit** `"Turm-Bosse: Figuren 9–20 und Schatten-Look"`

### Task 7: Balance-Abnahme

**Files:** `tests/sim.js` (`fightAI` aus `simRun` herausziehen als globale `simAI()`, `simRun` nutzt sie. Neue `bossDuel(n,old,runs) → Siegquote 0..1`), `js/data.js` (`TBOSS`-Werte nachstellen).

`bossDuel`: Referenzheld wie in der Spec („Balance-Abnahme“): `hero(10+Math.floor(n/2))`, `S.star=0`, `S.w=W.length-1;S.a=A.length-1;S.s=SH.length-1`, Tränke `h:3,H:2,g:1`. Kampf: bei `old` `setup(Object.assign(mk(BOSS[i].L+Math.floor(n/3),BOSS[i],true),{tower:n}))` mit `i=(n/5-1)%12`, sonst `S.tcur=n;startTower()`. Danach `simAI()`. Zählt `F.ko==="e"`. `fight` und `save` während der Läufe stummschalten wie in `simRun`.

- [ ] **Step 1:** `bossDuel` bauen, auf der Testseite für alle 20 Etagen ausführen (200 Läufe), Tabelle Etage | alt | neu ausgeben.
- [ ] **Step 2:** `TBOSS`-Werte (und Trick-Parameter) anpassen, bis die Abnahme aus der Spec erfüllt ist. Ergebnis-Tabelle in die Commit-Nachricht.
- [ ] **Step 3:** `simRun(400)` vor/nach vergleichen (Werte von `main` aus Task 3 Step 4). Ein Turm-Test, der eine bestimmte Stärke erwartet, darf nicht ❌ werden.
- [ ] **Step 4: Prüfen** → ✅. **Commit** `"Turm-Bosse: Balance an alter Kurve ausgerichtet"`

### Task 8: Anleitung, offene Punkte, Version

**Files:** `ANLEITUNG.md`, `ANLEITUNG.en.md` (Abschnitt „Der Endlose Turm“: 20 Turm-Bosse, Tabelle Trick → Gegenmaßnahme, 20 Ebenen, Schatten-Durchläufe ab 101), `docs/OFFENE-PUNKTE.md` (z. B. eigene Musik je neuer Ebene, Helfer-Figuren neben dem Boss, falls nicht gebaut), `index.html` alle `?v=0.2.0`, `sw.js` `CACHE="ritter-v0.2.0"`.

- [ ] **Step 1:** Doku und Version ändern. `grep -o 'v=[0-9.]*' index.html | sort -u` → nur `v=0.2.0` (und das leere `v=` von vorher, falls es eins gibt). `grep CACHE sw.js` → `ritter-v0.2.0`.
- [ ] **Step 2: Prüfen** → ✅ (de und en), `node scripts/i18n-check.js` grün. Spiel `index.html` per `file://` öffnen, eine Turm-Etage starten, keine Konsolenfehler (`list_console_messages`).
- [ ] **Step 3: Commit** `"Turm-Bosse: Anleitung und Version 0.2.0"`
