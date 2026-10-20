// Ritter Manager – Einzigartige Waffen: Tabelle, Fund, Skalierung und Beutewurf (Kampfeffekte: siehe uOnHit u. a. weiter unten)
// ef = Effekte (dbl Doppelschlag, time Zeitriss, chain Blitzkette, soul Seelenraub, blood Blutdurst, mirror Spiegelklinge, mercy Gnadenstoß, pierce Rüstungsbrecher, ret Wiederkehr, phoenix Phoenixherz, storm Sturmruf, morph Verwandlung, laser Laserstrahl)
const UNIQ=[
{id:"donnerzahn",cat:"schwert",ef:["chain"]},{id:"chronos",cat:"schwert",ef:["time"]},{id:"gnade",cat:"schwert",ef:["mercy"]},
{id:"blutdurst",cat:"axt",ef:["blood"]},{id:"schaedel",cat:"axt",ef:["pierce"]},{id:"zwilling",cat:"axt",ef:["dbl"]},
{id:"phoenix",cat:"keule",ef:["phoenix"]},{id:"weltenbrecher",cat:"keule",ef:["pierce","mercy"]},{id:"erschuetterer",cat:"keule",ef:["storm"]},
{id:"sturmherold",cat:"helle",ef:["storm"]},{id:"seelenfaenger",cat:"helle",ef:["soul"]},{id:"spiegelspeer",cat:"helle",ef:["mirror"]},
{id:"wiederkehr",cat:"bogen",ef:["ret"]},{id:"sternenfall",cat:"bogen",ef:["laser"]},{id:"jaeger",cat:"bogen",ef:["dbl","mercy"]},
{id:"sonnenlaser",cat:"stab",ef:["laser"]},{id:"seelenspinner",cat:"stab",ef:["soul"]},{id:"wandelstab",cat:"stab",ef:["morph"]},
{id:"zwillingsfang",cat:"dolch",ef:["dbl"]},{id:"schattenstich",cat:"dolch",ef:["time"]},{id:"trugspiegel",cat:"dolch",ef:["mirror"]}];
loc("uniq",UNIQ,o=>o.id);
// Start- und Endwert je Effekt (bei Gegenstandsstufe 1 und ab 50); Waffen mit zwei Effekten ×0,75
const UVAL={dbl:[.15,.35],time:[.10,.22],chain:[.6,1],soul:[.25,.45],blood:[.04,.06],mirror:[.15,.35],mercy:[.2,.4],pierce:[1,1],ret:[.3,.5],phoenix:[.3,.6],storm:[.5,.5],morph:[.35,.5],laser:[.2,.35]};
const UCH={towerboss:.08,boss:.08,tour:.04,mimic:.1,moon:.1};
const UCOL={dbl:"#8ad4ff",time:"#b388ff",chain:"#7fd0ff",soul:"#7dffb0",blood:"#ff2a1a",mirror:"#e1f5fe",mercy:"#e0e0e0",pierce:"#ffab40",ret:"#ffd54f",phoenix:"#ff8f00",storm:"#90caf9",morph:"#e040fb",laser:"#ff2fb4"};
const isU=it=>!!it&&!!it.u;
const uEq=()=>{const e=eq("w");return isU(e)?e:null};
const uHas=k=>{const e=uEq(),d=e&&UNIQ.find(x=>x.id===e.u);return !!d&&d.ef.includes(k)};
const uDef=it=>UNIQ.find(x=>x.id===it.u);
// Wert eines Effekts für dieses Stück (nach Gegenstandsstufe)
function uVal(k,it){const v=UVAL[k],t=Math.max(0,Math.min(1,(it.il-1)/49)),d=uDef(it);return (v[0]+(v[1]-v[0])*t)*(d&&d.ef.length>1?.75:1)}
const uPct=(k,it)=>Math.round(uVal(k,it)*100);
function uDesc(it){const d=uDef(it);return d.ef.map(k=>t("ue.nm."+k)+": "+t("ue.d."+k,uPct(k,it))).join(" · ")}
// Fund: Grundschaden etwa 10 % über einem Legendären gleicher Stufe; Platzhalter-fx, damit eine ältere Version das Stück nicht löscht
function genUnique(id,il){il=Math.max(1,Math.round(il));const d=UNIQ.find(x=>x.id===id);
 const it={id:"g"+(S.gid=(S.gid||0)+1),s:"w",cat:d.cat,b:Math.max(1,Math.round((4+il*1.5)*1.09*1.1)),c:UCOL[d.ef[0]],fx:{crit:.01},r:3,il,gen:1,u:id};return genText(it)}
// Beutewurf je Quelle: bei Erfolg ersetzt der Fund die normale Beute; true/Stück zurück
function uniqueRoll(src,il,l){if(Math.random()>=UCH[src])return null;const d=UNIQ[Math.floor(Math.random()*UNIQ.length)],it=genUnique(d.id,il);(S.gear=S.gear||[]).push(it);
 const auto=!S.ew&&it.b>slotBase("w");if(auto)S.ew=it.id;if(typeof F!=="undefined"&&F)F.reveal=it;
 l.push(`✦ <b style="color:#ffb300">${t("ux.found",it.n)}</b> (+${it.b} ⚔️, ${it.d})${auto?t("cb.autoEq"):t("gear.inBag")}`);return it}
gearClean();
