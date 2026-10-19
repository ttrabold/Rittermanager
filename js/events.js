// Ritter Manager – Ereignisse auf Abenteuern: Begegnungen mit Entscheidungen statt immer nur Kampf

const EV_CHANCE=.25;
const mimicSvg=()=>BSV(`<g class="br"><path d="M28 150h76l-4-48H32z" fill="#8d5a2b" stroke="#3e2716" stroke-width="2"/><path d="M28 120h76M28 136h76" stroke="#3e2716" stroke-width="3"/><path d="M60 102v48M72 102v48" stroke="#d4a017" stroke-width="3"/>
 <path d="M32 102Q66 30 100 102Z" fill="#a0692f" stroke="#3e2716" stroke-width="2"/><path d="M34 100Q66 46 98 100" fill="none" stroke="#d4a017" stroke-width="3"/>
 <path d="M36 102l5 10 5-10 5 10 5-10 5 10 5-10 5 10 5-10 5 10 5-10 5 10 4-10" fill="#f5f5dc" stroke="#0005"/><path d="M40 100l5-9 5 9 5-9 5 9 5-9 5 9 5-9 5 9 5-9 5 9 4-9" fill="#f5f5dc" stroke="#0005"/>
 <path class="sway" d="M60 106q4 20 18 26q-10-12-6-26z" fill="#e57373"/><ellipse class="glow" cx="54" cy="80" rx="5" ry="4" fill="#ffd600"/><ellipse class="glow" cx="80" cy="80" rx="5" ry="4" fill="#ffd600"/><circle cx="54" cy="80" r="1.6"/><circle cx="80" cy="80" r="1.6"/></g>`,40);
const MIMIC=loc1("mimic",{hp:1.6,atk:1.2,def:1.2,tint:"#8d5a2b",mv:[[1.2,90,"",4],[.9,92,"stun",2],[1.8,72,"",2]]});
let EVN=null;
const gainTxt=o=>Object.entries(o).filter(([,v])=>v).map(([k,v])=>k==="g"?`+${v} <i class=coin></i>`:k==="r"?`+${v} ${t("st.ruhm")}`:k==="x"?`+${v} ${t("st.xp")}`:k in S.it?`${IT.find(x=>x.k===k).e} +${v}`:`${MT(k).e} +${v}`).join(", ");
// Segen (S.buffs) speichern nur ihre Art k; der Name kommt aus der Sprachdatei
const bname=b=>t("buff."+b.k);
function evGive(o){for(const[k,v]of Object.entries(o)){if(k==="g")S.gold+=v;else if(k==="r")S.ruhm+=v;else if(k==="x")S.exp+=v;else if(k in S.it)S.it[k]+=v;else S.mat[k]+=v}}
const EVTS=[
 {id:"wand",e:"🧙",
  ch:[{l:"🧪 ",ok:()=>S.it.h>0,f:()=>{S.it.h--;const r={r:10+lvl()*2,x:10+lvl()*3};if(Math.random()<.5)r.g=20+lvl()*6;evGive(r);return t("ev.wand.r0",gainTxt(r))}},
      {l:"<i class=coin></i> ",ok:()=>S.gold>=10,f:()=>{S.gold-=10;const r={r:5+lvl()};evGive(r);return t("ev.wand.r1",gainTxt(r))}},
      {f:()=>t("ev.wand.r2")}]},
 {id:"schrein",e:"⛩️",
  ch:[{l:()=>`<i class=coin></i> ${t("ev.schrein.l0",20+lvl()*5)}`,ok:()=>S.gold>=20+lvl()*5,f:()=>{S.gold-=20+lvl()*5;(S.buffs=S.buffs||[]).push({k:"dmg",v:.2,n:3});return t("ev.schrein.r0")}},
      {l:"🙏 ",f:()=>{if(Math.random()<.35){(S.buffs=S.buffs||[]).push({k:"crit",v:.1,n:2});return t("ev.schrein.r1")}return t("ev.schrein.r1b")}},
      {f:()=>t("ev.schrein.r2")}]},
 {id:"falle",e:"🕳️",
  ch:[{l:"🤸 ",f:()=>{const p=Math.min(.9,.45+S.ge*.015);if(Math.random()<p){const r={g:30+lvl()*8};if(Math.random()<.4)r.h=1;evGive(r);return t("ev.falle.r0",gainTxt(r))}const x=Math.min(S.gold,10+lvl()*3);S.gold-=x;return t("ev.falle.r0b",x)}},
      {f:()=>t("ev.falle.r1")}]},
 {id:"haendler",e:"🧳",ok:()=>has("craft"),
  ch:[{l:()=>"🐉 "+t("ev.haendler.l0",110+lvl()*2),ok:()=>S.gold>=110+lvl()*2,f:()=>{S.gold-=110+lvl()*2;S.mat.ds++;return t("ev.haendler.r0")}},
      {l:()=>"🧪 "+t("ev.haendler.l1",30),ok:()=>S.gold>=30,f:()=>{S.gold-=30;S.it.h+=3;return t("ev.haendler.r1")}},
      {f:()=>t("ev.haendler.r2")}]},
 {id:"truhe",e:"🧰",
  ch:[{l:"🔓 ",f:()=>{if(Math.random()<.3)return {fight:()=>{const e=mk(Math.max(2,lvl()+1),MIMIC,true);e.mimic=true;e.bi=-1;e.evGold=40+lvl()*10;e.intro=t("ev.truhe.mimic")+"<br>";return e}};const r={g:25+lvl()*7},k=["ez","le","hk","ak"][rnd(0,3)];r[k]=rnd(1,3);if(!has("craft"))delete r[k];evGive(r);return t("ev.truhe.r0",gainTxt(r))}},
      {f:()=>t("ev.truhe.r1")}]},
 {id:"raeuber",e:"🦹",txtA:()=>15+lvl()*4,
  ch:[{l:"⚔️ ",f:()=>({fight:()=>{const e=mk(Math.max(1,lvl()),ET[1]);e.evGold=20+lvl()*6;e.intro=t("ev.raeuber.fight")+"<br>";return e}})},
      {l:()=>`<i class=coin></i> ${t("ev.raeuber.l1",15+lvl()*4)}`,ok:()=>S.gold>=15+lvl()*4,f:()=>{S.gold-=15+lvl()*4;return t("ev.raeuber.r1")}}]},
 {id:"ruine",e:"🏚️",
  ch:[{l:"🔦 ",f:()=>{if(Math.random()<.45)return {fight:()=>{const e=mk(Math.max(1,lvl()+1),ET[0]);e.evGold=15+lvl()*5;e.intro=t("ev.ruine.fight")+"<br>";return e}};const r={x:15+lvl()*4};if(Math.random()<.5)r.a=1;else r.g=20+lvl()*5;evGive(r);return t("ev.ruine.r0",gainTxt(r))}},
      {f:()=>t("ev.ruine.r1")}]},
 {id:"wahrsager",e:"🔮",
  ch:[{l:"<i class=coin></i> ",ok:()=>S.gold>=15,f:()=>{S.gold-=15;(S.buffs=S.buffs||[]).push({k:"gold",v:.25,n:3});return t("ev.wahrsager.r0",RUMORS[rnd(0,RUMORS.length-1)].replace(/[„“”"]/g,""))}},
      {f:()=>t("ev.wahrsager.r1")}]},
 {id:"duell",e:"🤺",
  ch:[{l:"⚔️ ",f:()=>({fight:()=>{const e=mk(Math.max(1,lvl()+1),ET[0]);e.honor=true;e.intro=t("ev.duell.fight")+"<br>";return e}})},
      {f:()=>t("ev.duell.r1")}]},
 {id:"hirte",e:"🐑",
  ch:[{l:"🐑 ",f:()=>{const r={r:8+lvl()*2};if(Math.random()<.5)r.g=10+lvl()*3;evGive(r);return t("ev.hirte.r0",gainTxt(r))}},
      {f:()=>t("ev.hirte.r1")}]},
 {id:"wiese",e:"🌿",ok:()=>has("craft"),
  ch:[{l:"🌿 ",f:()=>{const r={hk:rnd(2,4)};if(Math.random()<.4)r.fb=1;if(Math.random()<.3)r.gp=rnd(1,2);evGive(r);return t("ev.wiese.r0",gainTxt(r))}},
      {f:()=>t("ev.wiese.r1")}]}];
// Texte: Titel, Beschreibung und Knöpfe aus der Sprachdatei (ev.<id>.t / .txt / .l<i>); feste Symbole vorn bleiben
EVTS.forEach(v=>{v.t=t("ev."+v.id+".t");v.txt=()=>t("ev."+v.id+".txt",v.txtA&&v.txtA());v.ch.forEach((c,i)=>{if(typeof c.l!=="function"){const p=c.l||"";c.l=()=>p+t("ev."+v.id+".l"+i)}})});
function evMaybe(){if(lvl()<2||Math.random()>=EV_CHANCE)return false;const pool=EVTS.filter(e=>!e.ok||e.ok());EVN={ev:pool[rnd(0,pool.length-1)],res:null};evScr();return true}
function evPick(i){const c=EVN.ev.ch[i];if(EVN.res||(c.ok&&!c.ok()))return;const r=c.f();if(r&&r.fight){EVN=null;save();return setup(r.fight())}EVN.res=r;sfx("coin");levelCheck(QN);unlCheck(QN);save();evScr()}
function evScr(){musicSet("home");const v=EVN.ev,lab=c=>typeof c.l==="function"?c.l():c.l;
 app.innerHTML=`<div class="top"><b>${v.e} ${v.t}</b><span><i class=coin></i> ${S.gold}</span></div>
 <div class="scene">${BG}<div style="position:relative;z-index:2;display:flex;align-items:flex-end;gap:8px">${compSvg(S.cmp)}${pk()}<span style="font-size:64px;margin-bottom:14px">${v.e}</span></div></div>
 <div class="msg">${EVN.res||v.txt()}</div>
 <div class="grid">${EVN.res?`<button class="p" style="grid-column:1/-1" onclick="EVN=null;home()">${t("c.next")}</button>`:v.ch.map((c,i)=>`<button ${c.ok&&!c.ok()?"disabled":""} style="grid-column:1/-1" onclick="evPick(${i})">${lab(c)}</button>`).join("")}</div>`}
