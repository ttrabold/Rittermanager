# Zufallsbeute Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Feste Beutestücke durch gewürfelte Waffen, Rüstungen und Schilde mit Seltenheiten ersetzen, mit Beutel, Zerlegen und Vergleich.

**Architecture:** Neue Datei `js/loot.js` erzeugt Gegenstände im selben Format wie `EI`-Einträge (`{id,n,s,b,c,fx,d,cat}` plus `r`, `il`, `gen:1`) und speichert sie in `S.gear`. Eine Nachschlagefunktion `itm(id)` (zuerst `EI`, dann `S.gear`) ersetzt alle `EI.find(x=>x.id===…)` für Spielerausrüstung, so funktionieren Aufwerten, Runen, Kampfwerte und Darstellung ohne Sonderwege. Schilde bekommen einen eigenen Slot `S.es` und den Wert `sBon()`.

**Tech Stack:** Klassische Browser-Skripte (keine Module, Reihenfolge in `index.html` wichtig), Tests in `tests/index.html`, Balance-Simulation in `tests/sim.js`.

**Spec:** `docs/superpowers/specs/2026-10-18-zufallsbeute-design.md`

## Global Constraints

- Seltenheiten: 🟢 Selten 1 Wert, 🔵 Rar 2, 🟣 Episch 3, 🟠 Legendär 4
- Slot-Gewichte: 50 % Waffe, 30 % Rüstung, 20 % Schild
- Beutel: 20 Plätze für nicht angelegte Zufallsbeute; übervoll sperrt Turm, Turnier und Bosskampf
- Zerlegen: 🟢 2–3 Eisenerz oder Leder · 🔵 1–2 Arkankristall · 🟣 2 Mithril + 2 Arkankristall · 🟠 1 Drachenschuppe + 2 Mithril; dazu die Hälfte (abgerundet) der Aufwertungs-Materialien; Runen gehen verloren
- Automatisch anlegen nur, wenn im Slot nichts Verzaubertes getragen wird und der Grundwert höher ist
- Bestehende Spielstände behalten alle `S.own`-Gegenstände, Aufwertungen und Runen; Geschmiedetes und Neidklinge bleiben fest; Gegner nutzen weiter `EI`
- Effekte nur aus vorhandenen Schlüsseln: Waffe `burn, poison, stun, crit, life`; Rüstung/Schild `hp, regen, dodge, noburn`
- Nach Änderungen `?v=` in `index.html` und `CACHE` in `sw.js` erhöhen (v14)
- Texte auf Deutsch im bestehenden Stil der Anleitung

## Review Focus

- Alter Spielstand ohne `gear`/`es` lädt und zeigt das Inventar ohne `undefined`/`NaN` → Test in Task 2
- Zerlegen eines angelegten Teils wird verweigert → Test in Task 3
- Wiedergeburt behält `S.gear` und `S.es`, setzt Markt-Schild-Aufwertungen (`s0`–`s3`) zurück → Test in Task 2
- Niedrige Stufe (Turnier auf Stufe 8) erzeugt sinnvolle Werte (b ≥ 1, keine 0-Effekte, kein NaN) → Test in Task 1
- Export/Import übernimmt `S.gear` → Test in Task 3

## Verifikation (für alle Tasks)

Run: `tests/index.html` per `file://` in Chrome öffnen, 3 s warten, `#out` lesen.
Expected: Zeile `N/N bestanden`, keine Zeile mit `❌`. Zusätzlich `node --check` für jede geänderte `.js`-Datei.

---

### Task 1: Generator `js/loot.js`

**Files:**
- Create: `js/loot.js` (in `index.html` und `tests/index.html` direkt nach `weapons.js` laden)
- Test: `tests/index.html`

**Interfaces:**
- Produces:
  - `RAR` – Array von 4 `{n,e,c}`: `["Selten","🟢","#43a047"]`, `["Rar","🔵","#1e88e5"]`, `["Episch","🟣","#8e24aa"]`, `["Legendär","🟠","#fb8c00"]`
  - `itm(id) → item|undefined` – sucht in `EI`, dann `S.gear`
  - `fxDesc(fx) → string` – z. B. „25 % Brand, +12 % Krit, +40 max. LP“
  - `genItem(il:number, r:0..3, s?:"w"|"a"|"sh", cat?:string) → item` (noch nicht gespeichert), `id` = `"g"+(S.gid=(S.gid||0)+1)`
  - `rarRoll(weights:number[4]) → 0..3`
- Werte (Umsetzer darf nach Simulation feinjustieren, ±20 %):
  - Grundwert: Waffe `il*1.6`, Rüstung `il*1.05`, Schild `4+il*0.3`, jeweils × Zufall 0,85–1,15 × (1+0,05·r), gerundet, mindestens 1
  - Effekt-Maximum bei `t=min(1,il/50)`: burn/poison `.10+.25t`, stun `.06+.19t`, crit `.05+.17t`, life `.04+.10t`, hp `15+2.2·il`, regen `2+.13·il`, dodge `3+.24·il`, noburn `1`; gewürfelt × 0,7–1,0; Prozentwerte auf 0,01 gerundet, ganze Zahlen gerundet, mindestens 0,01 bzw. 1
  - Waffenart zufällig aus `Object.keys(WCAT)`; Name `WNAMES[cat][tier]` bzw. `A[tier][0]`/`SH[max(1,tier)][0]` mit `tier=min(4,floor(il/10))`, plus Zusatz nach erstem Effekt (z. B. burn „der Glut“, poison „des Gifts“, stun „des Frosts“, crit „der Präzision“, life „des Blutes“, hp „des Wächters“, regen „des Mondes“, dodge „des Windes“, noburn „der Feuerwehr“ – Zusätze frei wählbar); Leuchtfarbe nach erstem Effekt

- [ ] **Step 1: Failing test** `t("Zufallsbeute: Generator", …)`: für `r` 0..3 und je 30 Würfe mit `il=8` und `il=50`: `Object.keys(it.fx).length===r+1`; `["w","a","sh"].includes(it.s)`; Waffen haben `it.cat in WCAT`, Effekte ⊆ Waffen-Schlüssel, sonst ⊆ Rüstungs-Schlüssel; `it.b>=1`; alle Effektwerte `>0` und nicht `NaN`; `it.d===fxDesc(it.fx)`; `genItem(30,3,"w","axt").cat==="axt"`; `itm("fl").n==="Flammenklinge"`.
- [ ] **Step 2:** Tests ausführen → ❌ `genItem is not defined`.
- [ ] **Step 3:** `js/loot.js` mit den obigen Funktionen anlegen; Skript-Tags ergänzen.
- [ ] **Step 4:** Tests ausführen → alle ✅.
- [ ] **Step 5:** Commit `Zufallsbeute: Generator mit Seltenheiten`.

### Task 2: Ausrüstung über `itm()`, Schild-Slot

**Files:**
- Modify: `js/state.js` (`eq`, `ikey`, `fxv`, `kinfo`, `invItems`, `isEq`, `fresh`, Migration), `js/combat.js:2,5,116` (`giveE`, `equipE`, Schadensabzug), `js/art.js:2,111` (`pk`, Glow-Lookup), `js/screens.js:45,47,69` (Schildanzeige), `js/professions.js` (Rune-Filter, `upCost`), `js/endgame.js:44` (Wiedergeburt)
- Test: `tests/index.html`

**Interfaces:**
- Consumes: `itm`, `genItem` (Task 1)
- Produces:
  - `eq(k)` mit `k` ∈ `"w"|"a"|"sh"` (Slot-Felder `ew`, `ea`, `es`)
  - `ikey("sh") → S.es || "s"+S.s`; `kinfo("s"+i) → {s:"sh",n:SH[i][0],b:SH[i][2]}`; `kinfo` für Zufallsbeute: `n` mit Seltenheits-Emoji statt ✨
  - `sBon() → (eq("sh")?eq("sh").b:SH[S.s][2]) + upl("sh")`
  - `fxv` summiert `ew, ea, es` und Runen auf `w, a, sh`
  - `invItems()` enthält `"s"+S.s` (falls `S.s>0`) und alle `S.gear`-IDs
  - `equipE(id)` wählt den Slot nach `itm(id).s`
  - `upCost("sh",n)` wie Rüstung; Schild-Aufwertung +1 Schutz je Stufe; Runen mit `s:"a"` passen auf Schilde
  - `fresh()` hat `gear:[]`, `es:null`; Migration `S.gear=S.gear||[]; S.es=S.es||null`
  - Wiedergeburt löscht zusätzlich Aufwertungen/Runen für `/^s\d$/`, behält `S.gear`, `S.es`
  - `pk()` zeigt bei angelegtem Zufallsschild das Turmschild-Modell (`s=3`)

- [ ] **Step 1: Failing tests:**
  - `t("Zufallsbeute: Schild-Slot", …)`: `hero(30)`, `S.s=3`, `const it=genItem(30,1,"sh"); S.gear.push(it); equipE(it.id)` → `S.es===it.id`, `sBon()===it.b`; Effektwert aus `it.fx` erscheint in `fxv(key)`; Gegnerschaden sinkt: mit `S.es=null` vs. angelegt den Ausdruck in `enemyTurn` über einen Kampf mit fester Gegnerstärke vergleichen, oder einfacher `sBon()` in `combat.js:116` per Quelltext prüfen (`enemyTurn.toString().includes("sBon()")`).
  - `t("Zufallsbeute: Aufwerten und Runen", …)`: Zufallswaffe und Zufallsschild über `upgrade(id)` auf +1 → `S.up[id]===1`, `wBon()`/`sBon()` steigen um 2/1 bei angelegtem Teil; Rune `"r6"` auf den Schild über `rune` → wirkt in `fxv("hp")`.
  - `t("Alter Spielstand ohne gear/es", …)`: `S=Object.assign(fresh(),{own:["fl"],ew:"fl"}); delete S.gear; delete S.es;` die Migrationszeile aus `state.js` als Funktion `migrate()` aufrufen (Task legt `migrate()` an und ruft sie beim Laden auf) → `inv()` rendert ohne `undefined`/`NaN`, `eq("w").id==="fl"`.
  - `t("Wiedergeburt behält Zufallsbeute", …)`: Zufallsschild angelegt, `S.up.s3=2`, `S.boss=BOSS.length; doRebirth("gold")` → `S.gear.length` unverändert, `S.es` gleich, `S.up.s3===undefined`.
- [ ] **Step 2:** Tests ausführen → ❌.
- [ ] **Step 3:** Änderungen umsetzen; jede `EI.find(x=>x.id===…)` für Spielerausrüstung durch `itm(…)` ersetzen (Gegner-Pool `combat.js:21` bleibt bei `EI`); `SH[S.s][2]` durch `sBon()`; Schildanzeige über `iname("sh")`.
- [ ] **Step 4:** Tests ausführen → alle ✅.
- [ ] **Step 5:** Commit `Zufallsbeute: Ausrüstung über itm(), verzauberte Schilde`.

### Task 3: Quellen, Beutel, Zerlegen, Vergleich

**Files:**
- Modify: `js/loot.js`, `js/combat.js` (`tourLoot`, `towerLoot`, Boss-Beute in `endFight`, Turm-Boss-Beute, `startTour`, `startTower`, `startBoss`), `js/day.js:129` (`moonLoot`), `js/screens.js` (Knöpfe mit Hinweis bei vollem Beutel)
- Test: `tests/index.html`

**Interfaces:**
- Consumes: Task 1 + 2
- Produces:
  - `LOOTW` – Seltenheitsgewichte: `tour:[60,30,9,1]`; `tower(n)`: `q=min(1,n/50)` → `[60-50q,30,9+35q,n>=30?1+14q:0]`; `boss:[0,60,32,8]`; `moon:[0,75,22,3]`
  - `lootGive(kind:"tour"|"tower"|"tower10"|"boss"|"moon", il:number, l:string[]) → item` – würfelt, speichert in `S.gear`, legt nach Regel automatisch an, schreibt Zeile mit Seltenheit, Name, `fxDesc` und `cmpHtml` in `l`; `tower10` = Turm-Gewichte, Seltenheit +1 (max 3)
  - Gegenstandsstufe: Turnier `lvl()`; Turm `lvl()+floor(n/3)`; Story-Boss `BOSS[i].L`; Mond `lvl()`
  - Aufrufe: Turniersieg 1× `tour` (am Turniertag 2×); Turm-Boss (n%5===0) 1× `tower`, auf n%10===0 stattdessen `tower10`; Story-Boss 2× `boss` statt `BREW`; Mond 1× `moon` statt Mondsichel/Wolfspelz (Äthertrank + Kristalle bleiben)
  - `BAG=20`, `bagItems() → item[]` (Zufallsbeute, nicht angelegt), `bagFull() → bagItems().length>BAG`
  - `salvage(id) → boolean` (false bei angelegt/unbekannt), `salvageAll(r) → number` (zerlegt alle nicht angelegten der Seltenheit `r`)
  - `cmpHtml(it) → string` – ▲/▼ für Grundwert und jeden Effekt gegenüber `eq(it.s)` bzw. Marktgegenstand
  - `startTour`, `startTower`, `startBoss` brechen bei `bagFull()` ab; Knöpfe disabled mit Untertitel „Beutel voll – erst aufräumen“

- [ ] **Step 1: Failing tests:**
  - `t("Zufallsbeute: Quellen", …)`: Story-Boss gewinnen (wie Test „Alle Bosse besiegbar“) → `S.gear.length` +2, `S.own` unverändert; `tourLoot([])` → +1; Turm-Boss Etage 10 gewinnen → +1 mit `r>=1`; `moonLoot([])` → +1, `r>=1`.
  - `t("Zufallsbeute: Auto-Anlegen", …)`: ohne `S.ew` und hohem `il` → angelegt; mit angelegter Zufallswaffe → nicht angelegt.
  - `t("Zufallsbeute: Zerlegen", …)`: 🟠-Gegenstand zerlegen → `S.mat.ds` +1, `S.mat.mi` +2; mit `S.up[id]=2` (Rüstung) kommt zusätzlich `floor((2+4)/2)=3` Leder zurück (`upCost("a",1)+upCost("a",2)` halbiert); angelegter Gegenstand → `salvage` false, bleibt; `salvageAll(0)` entfernt nur 🟢 nicht angelegte.
  - `t("Zufallsbeute: Beutel voll", …)`: 21 Gegenstände im Beutel → `startTower()` ändert `S.en` nicht, Burg-HTML enthält „Beutel voll“.
  - `t("Zufallsbeute: Export behält Beute", …)`: Export-/Import-Funktion des bestehenden Tests „Export / Import“ verwenden, danach `S.gear` gleich lang und IDs gleich.
- [ ] **Step 2:** Tests ausführen → ❌.
- [ ] **Step 3:** Umsetzen.
- [ ] **Step 4:** Tests ausführen → alle ✅ (bestehende Tests, die feste Beute erwarten, auf Zufallsbeute anpassen).
- [ ] **Step 5:** Commit `Zufallsbeute: Quellen, Beutel, Zerlegen, Vergleich`.

### Task 4: Inventar und Werkstatt

**Files:**
- Modify: `js/screens.js` (`inv`), `js/professions.js` (Werkstatt-Listen zeigen Seltenheitsfarbe), `css/style.css` (Klassen `.r0`–`.r3` für Seltenheitsfarbe)
- Test: `tests/index.html`

**Interfaces:**
- Consumes: Task 1–3
- Produces: Inventar-Abschnitt „🎒 Beutel (x/20)“ mit Liste (Name in Seltenheitsfarbe, Grundwert, `fxDesc`, `cmpHtml`, Knöpfe „Anlegen“ und „Zerlegen“), Sammelknöpfe „Alles 🟢 zerlegen“ / „Alles 🔵 zerlegen“; angelegte Zufallsbeute im Abschnitt „Ausgerüstet“ inklusive Schild; „Besondere Waffen/Rüstungen“ zeigt weiter die festen `S.own`-Gegenstände

- [ ] **Step 1: Failing test** `t("Zufallsbeute: Inventar", …)`: je ein Gegenstand jeder Seltenheit in den Beutel, `inv()` → HTML enthält „Beutel (4/20)“, „Alles 🟢 zerlegen“, „▲“ oder „▼“, kein `undefined`/`NaN`; Klick auf ersten „Zerlegen“-Knopf entfernt einen Gegenstand.
- [ ] **Step 2:** Tests ausführen → ❌.
- [ ] **Step 3:** Umsetzen.
- [ ] **Step 4:** Tests ausführen → alle ✅; Screenshot des Inventars prüfen (hell und dunkel, ~400 px breit).
- [ ] **Step 5:** Commit `Zufallsbeute: Beutel im Inventar`.

### Task 5: Simulation, Anleitung, Version

**Files:**
- Modify: `tests/sim.js`, `ANLEITUNG.md` (Abschnitte „Verzauberte Ausrüstung“, „Das Inventar“, „Bosse“ Belohnung, „Turnier“, „Der Endlose Turm“, „Vollmond-Jagd“, „Wiedergeburt“), `index.html`, `sw.js`

- [ ] **Step 1:** Simulation: nach jedem Tag Beutel-Gegenstände anlegen, wenn `b` höher als das angelegte Teil des Slots, danach `salvageAll(0..3)` für den Rest; Ergebnis um `beute:S.gear.length` ergänzen.
- [ ] **Step 2:** 6 Läufe: alle 12 Bosse vor Tag 400, verlorene Bosskämpfe nicht unter dem bisherigen Stand (8–27); bei Ausreißern Grundwert-Faktoren in `genItem` anpassen.
- [ ] **Step 3:** Anleitung anpassen (Seltenheitstabelle, Quellen, Beutel, Zerlegen-Tabelle, Vergleich; Tabellen der festen Turnier-, Boss- und Turmgegenstände und Mondbeute entfernen bzw. als „frühere Beute“ kennzeichnen); `?v=14`, `ritter-v14`.
- [ ] **Step 4:** Tests ausführen → alle ✅.
- [ ] **Step 5:** Commit `Zufallsbeute: Simulation, Anleitung, Version`.
