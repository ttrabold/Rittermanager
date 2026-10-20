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
// ---- Kampf: Zustand F.uq={bl Blutdurst-Stapel, ph Phoenixherz benutzt, mo Verwandlung aktiv} ----
const uqNew=()=>({bl:0,ph:0,mo:0});
const uBloodMax=.4;
// Schadensfaktor aus Blutdurst und Verwandlung
function uDmgMul(f){const e=uEq();if(!e||!f.uq)return 1;let m=1;if(uHas("blood"))m*=1+Math.min(uBloodMax,f.uq.bl*uVal("blood",e));if(f.uq.mo)m*=1+uVal("morph",e);return m}
const uCritB=f=>f.uq&&f.uq.mo?.15:0;
// Zusatzschaden nach einem Treffer; löst selbst keine weiteren Effekte aus
function uOnHit(f,tot,crit,l){const e=uEq();if(!e||!f.uq||f.ehp<=0)return;let add=0;if(uHas("pierce"))f.vfx.push(["u_pierce","vE",0]);const raw=tot+f.def,hit=(k,x)=>{x=Math.max(1,Math.round(x));add+=x;f.ehp-=x;l.push(t("ue.log."+k,x));f.vfx.push(["u_"+k,"vE",0])};
 if(uHas("dbl")&&Math.random()<uVal("dbl",e))hit("dbl",tot*.7);
 if(uHas("ret")&&Math.random()<uVal("ret",e))hit("ret",tot*.6);
 if(uHas("laser")&&Math.random()<uVal("laser",e))hit("laser",raw*.8);
 if(uHas("chain")&&crit)hit("chain",raw*uVal("chain",e));
 if(uHas("soul")&&Math.random()<uVal("soul",e)){const ids=eqSk().filter(id=>{const s=SKD(id);return s.pp<99&&f.pp[id]<s.pp});if(ids.length){const id=ids[Math.floor(Math.random()*ids.length)];f.pp[id]++;l.push(t("ue.log.soul",SKD(id).n));f.vfx.push(["u_soul","vP",0])}}
 if(uHas("blood")){f.uq.bl++;f.vfx.push(["u_blood","vP",0])}
 if(uHas("mercy")&&f.ehp>0&&f.ehp<f.emax*.25&&Math.random()<uVal("mercy",e)){if(f.boss){const x=Math.round(f.emax*.2);f.ehp-=x;add+=x;l.push(t("ue.log.mercyB",x))}else{f.ehp=0;l.push(t("ue.log.mercy"))}f.vfx.push(["u_mercy","vE",0])}
 if(add){f.hE+=add;f.dmg=f.hE}}
// Beginn des Kampfes (aus setup): Sturmruf
function uStart(f){const e=uEq();if(!e)return;if(uHas("storm")){f.pb.buff=3;f.log+="<br>"+t("ue.log.storm");f.vfx.push(["u_storm","vP",0])}}
// Verwandlung: unter halben LP, einmal je Kampf
function uMorphCheck(f,l){if(uHas("morph")&&f.uq&&!f.uq.mo&&f.php<f.pmax/2){f.uq.mo=1;l.push(t("ue.log.morph"));f.vfx.push(["u_morph","vP",0])}}
// Zugbeginn des Gegners: Blutdurst kostet LP (nie tödlich)
function uTurnStart(f,l){if(uHas("blood")&&f.uq.bl>0){const c=Math.min(Math.round(f.pmax*.02),f.php-1);if(c>0){f.php-=c;l.push(t("ue.log.blood",c))}}}
// Zeitriss: true = der Gegner setzt diesen Zug aus
function uTime(f,l){const e=uEq();if(uHas("time")&&!f.eb.stun&&Math.random()<uVal("time",e)){l.push(t("ue.log.time",f.name));f.vfx.push(["u_time","vE",0]);return true}return false}
// Spiegelklinge: Teil des erlittenen Schadens geht zurück
function uMirror(f,dmg,l){if(!uHas("mirror")||dmg<=0)return;const x=Math.max(1,Math.round(dmg*uVal("mirror",uEq())));f.ehp-=x;l.push(t("ue.log.mirror",x));f.vfx.push(["u_mirror","vE",1])}
// Phoenixherz: einmal pro Kampf; true = du lebst
function uPhoenix(f,l){if(!uHas("phoenix")||f.uq.ph)return false;f.uq.ph=1;f.php=Math.max(1,Math.round(f.pmax*uVal("phoenix",uEq())));f.pb.poison=0;f.pb.burn=0;f.pb.stun=0;l.push(t("ue.log.phoenix",f.php));f.vfx.push(["u_phoenix","vP",1]);return true}
