// Ritter Manager – Ereignisse auf Abenteuern: Begegnungen mit Entscheidungen statt immer nur Kampf

const EV_CHANCE=.25;
const mimicSvg=()=>BSV(`<g class="br"><path d="M28 150h76l-4-48H32z" fill="#8d5a2b" stroke="#3e2716" stroke-width="2"/><path d="M28 120h76M28 136h76" stroke="#3e2716" stroke-width="3"/><path d="M60 102v48M72 102v48" stroke="#d4a017" stroke-width="3"/>
 <path d="M32 102Q66 30 100 102Z" fill="#a0692f" stroke="#3e2716" stroke-width="2"/><path d="M34 100Q66 46 98 100" fill="none" stroke="#d4a017" stroke-width="3"/>
 <path d="M36 102l5 10 5-10 5 10 5-10 5 10 5-10 5 10 5-10 5 10 5-10 5 10 4-10" fill="#f5f5dc" stroke="#0005"/><path d="M40 100l5-9 5 9 5-9 5 9 5-9 5 9 5-9 5 9 5-9 5 9 4-9" fill="#f5f5dc" stroke="#0005"/>
 <path class="sway" d="M60 106q4 20 18 26q-10-12-6-26z" fill="#e57373"/><ellipse class="glow" cx="54" cy="80" rx="5" ry="4" fill="#ffd600"/><ellipse class="glow" cx="80" cy="80" rx="5" ry="4" fill="#ffd600"/><circle cx="54" cy="80" r="1.6"/><circle cx="80" cy="80" r="1.6"/></g>`,40);
const MIMIC={n:"Mimik",hp:1.6,atk:1.2,def:1.2,tint:"#8d5a2b",mv:[["Zuschnappen",1.2,90,"",4],["Zungenpeitsche",.9,92,"stun",2],["Verschlingen",1.8,72,"",2]]};
let EVN=null;
const gainTxt=o=>Object.entries(o).filter(([,v])=>v).map(([k,v])=>k==="g"?`+${v} <i class=coin></i>`:k==="r"?`+${v} Ruhm`:k==="x"?`+${v} EP`:k in S.it?`${IT.find(t=>t.k===k).e} +${v}`:`${MT(k).e} +${v}`).join(", ");
function evGive(o){for(const[k,v]of Object.entries(o)){if(k==="g")S.gold+=v;else if(k==="r")S.ruhm+=v;else if(k==="x")S.exp+=v;else if(k in S.it)S.it[k]+=v;else S.mat[k]+=v}}
const EVTS=[
 {id:"wand",e:"🧙",t:"Ein verwundeter Wanderer",txt:()=>"Am Wegesrand liegt ein verletzter Wanderer. „Bitte, edler Ritter … habt Ihr etwas, das meine Wunden heilt?“",
  ch:[{l:"🧪 Heiltrank geben",ok:()=>S.it.h>0,f:()=>{S.it.h--;const r={r:10+lvl()*2,x:10+lvl()*3};if(Math.random()<.5)r.g=20+lvl()*6;evGive(r);return `Der Wanderer kommt wieder zu Kräften. „Ich werde Euch nie vergessen!“ Er erzählt allen von deiner Güte. ${gainTxt(r)}`}},
      {l:"<i class=coin></i> 10 Gold geben",ok:()=>S.gold>=10,f:()=>{S.gold-=10;const r={r:5+lvl()};evGive(r);return `Er kann sich davon im nächsten Dorf versorgen lassen und dankt dir. ${gainTxt(r)}`}},
      {l:"Weiterreiten",f:()=>"Du lässt ihn zurück. Ein Ritter sollte das nicht tun …"}]},
 {id:"schrein",e:"⛩️",t:"Schrein der Kriegsgöttin",txt:()=>"Ein alter Schrein, geschmückt mit Schwertern. Eine Inschrift verspricht Segen für ein Opfer.",
  ch:[{l:()=>`<i class=coin></i> ${20+lvl()*5} Gold opfern`,ok:()=>S.gold>=20+lvl()*5,f:()=>{S.gold-=20+lvl()*5;(S.buffs=S.buffs||[]).push({k:"dmg",v:.2,n:3,name:"Segen der Kriegsgöttin"});return "Ein warmes Licht umhüllt dich. <b>Segen der Kriegsgöttin:</b> +20 % Schaden in den nächsten 3 Kämpfen! ✨"}},
      {l:"🙏 Nur beten",f:()=>{if(Math.random()<.35){(S.buffs=S.buffs||[]).push({k:"crit",v:.1,n:2,name:"Göttliche Gunst"});return "Die Göttin erhört dich: <b>+10 % Krit-Chance</b> in den nächsten 2 Kämpfen."}return "Stille. Die Göttin scheint heute andere Sorgen zu haben."}},
      {l:"Weiterreiten",f:()=>"Du verneigst dich kurz und reitest weiter."}]},
 {id:"falle",e:"🕳️",t:"Eine Fallgrube",txt:()=>"Plötzlich gibt der Boden nach! Unter dir öffnet sich eine Grube – darin glitzert etwas.",
  ch:[{l:"🤸 Hineinspringen und Schatz holen",f:()=>{const p=Math.min(.9,.45+S.ge*.015);if(Math.random()<p){const r={g:30+lvl()*8};if(Math.random()<.4)r.h=1;evGive(r);return `Geschickt landest du und kletterst mit dem Schatz wieder heraus! ${gainTxt(r)}`}const x=Math.min(S.gold,10+lvl()*3);S.gold-=x;return `Du stürzt unglücklich und verlierst beim Herausklettern ${x} <i class=coin></i> aus deinem Beutel.`}},
      {l:"Vorsichtig umgehen",f:()=>"Sicher ist sicher. Du umgehst die Grube."}]},
 {id:"haendler",e:"🧳",t:"Ein fahrender Händler",ok:()=>has("craft"),txt:()=>"„Seltene Ware, nur für Euch!“ Ein Händler öffnet seine Truhe voller Kostbarkeiten.",
  ch:[{l:()=>`🐉 Drachenschuppe für ${110+lvl()*2} Gold`,ok:()=>S.gold>=110+lvl()*2,f:()=>{S.gold-=110+lvl()*2;S.mat.ds++;return "Du kaufst eine schimmernde Drachenschuppe. 🐉"}},
      {l:()=>`🧪 3 Heiltränke für ${30} Gold`,ok:()=>S.gold>=30,f:()=>{S.gold-=30;S.it.h+=3;return "Ein gutes Geschäft: 3 Heiltränke! 🧪"}},
      {l:"Ablehnen",f:()=>"„Euer Verlust!“, ruft er dir hinterher."}]},
 {id:"truhe",e:"🧰",t:"Eine einsame Truhe",txt:()=>"Mitten auf einer Lichtung steht eine verschlossene Truhe. Merkwürdig …",
  ch:[{l:"🔓 Öffnen",f:()=>{if(Math.random()<.3)return {fight:()=>{const e=mk(Math.max(2,lvl()+1),MIMIC,true);e.mimic=true;e.bi=-1;e.evGold=40+lvl()*10;e.intro="😱 Die Truhe hat Zähne! Es ist ein <b>Mimik</b>!<br>";return e}};const r={g:25+lvl()*7},k=["ez","le","hk","ak"][rnd(0,3)];r[k]=rnd(1,3);if(!has("craft"))delete r[k];evGive(r);return `Die Truhe ist voller Schätze! ${gainTxt(r)}`}},
      {l:"Liegen lassen",f:()=>"Wer weiß, was darin lauert. Du lässt sie stehen."}]},
 {id:"raeuber",e:"🦹",t:"Hinterhalt!",txt:()=>`Räuber versperren den Weg. „Wegzoll oder Blut, Ritter! ${15+lvl()*4} Gold!“`,
  ch:[{l:"⚔️ Kämpfen",f:()=>({fight:()=>{const e=mk(Math.max(1,lvl()),ET[1]);e.evGold=20+lvl()*6;e.intro="Die Räuber greifen an – sie haben fette Beute bei sich!<br>";return e}})},
      {l:()=>`<i class=coin></i> ${15+lvl()*4} Gold zahlen`,ok:()=>S.gold>=15+lvl()*4,f:()=>{S.gold-=15+lvl()*4;return "Zähneknirschend zahlst du. Die Räuber verschwinden lachend im Wald."}}]},
 {id:"ruine",e:"🏚️",t:"Eine alte Ruine",txt:()=>"Zwischen Efeu und eingestürzten Mauern führt eine Treppe in die Dunkelheit.",
  ch:[{l:"🔦 Erkunden",f:()=>{if(Math.random()<.45)return {fight:()=>{const e=mk(Math.max(1,lvl()+1),ET[0]);e.evGold=15+lvl()*5;e.intro="Ein vergessener Wächter erhebt sich aus dem Staub!<br>";return e}};const r={x:15+lvl()*4};if(Math.random()<.5)r.a=1;else r.g=20+lvl()*5;evGive(r);return `Du findest ein altes Versteck. ${gainTxt(r)}`}},
      {l:"Weiterreiten",f:()=>"Manche Türen bleiben besser geschlossen."}]},
 {id:"wahrsager",e:"🔮",t:"Die Wahrsagerin",txt:()=>"Eine alte Frau winkt dich in ihr Zelt. „Für 15 Gold lese ich Euch die Zukunft …“",
  ch:[{l:"<i class=coin></i> 15 Gold zahlen",ok:()=>S.gold>=15,f:()=>{S.gold-=15;(S.buffs=S.buffs||[]).push({k:"gold",v:.25,n:3,name:"Glücksstern"});return `„${RUMORS[rnd(0,RUMORS.length-1)].replace(/[„“]/g,"")}“ Dann flüstert sie: „Gold folgt Euch!“ <b>Glücksstern:</b> +25 % Gold in den nächsten 3 Kämpfen. 🌟`}},
      {l:"Ablehnen",f:()=>"„Die Sterne lügen nie …“, murmelt sie, als du gehst."}]},
 {id:"duell",e:"🤺",t:"Ein Ehrenduell",txt:()=>"Ein fremder Ritter salutiert. „Ich fordere Euch zum Ehrenduell! Der Sieger erntet Ruhm.“",
  ch:[{l:"⚔️ Annehmen",f:()=>({fight:()=>{const e=mk(Math.max(1,lvl()+1),ET[0]);e.honor=true;e.intro="Ein ehrenvolles Duell – der Sieger erhält doppelten Ruhm!<br>";return e}})},
      {l:"Höflich ablehnen",f:()=>"Ihr verneigt euch beide und reitet weiter."}]},
 {id:"hirte",e:"🐑",t:"Ein verzweifelter Hirte",txt:()=>"„Wölfe haben meine Herde zerstreut! Könnt Ihr mir helfen, die Schafe zusammenzutreiben?“",
  ch:[{l:"🐑 Helfen",f:()=>{const r={r:8+lvl()*2};if(Math.random()<.5)r.g=10+lvl()*3;evGive(r);return `Gemeinsam treibt ihr die Herde zusammen. Der Hirte ist überglücklich. ${gainTxt(r)}`}},
      {l:"Keine Zeit",f:()=>"Du reitest weiter. Irgendwo blökt ein Schaf."}]},
 {id:"wiese",e:"🌿",t:"Eine Kräuterwiese",ok:()=>has("craft"),txt:()=>"Eine Wiese voller Heilkräuter und Blüten leuchtet in der Sonne.",
  ch:[{l:"🌿 Kräuter sammeln",f:()=>{const r={hk:rnd(2,4)};if(Math.random()<.4)r.fb=1;if(Math.random()<.3)r.gp=rnd(1,2);evGive(r);return `Du füllst deine Taschen. ${gainTxt(r)}`}},
      {l:"Weiterreiten",f:()=>"Die Blumen nicken dir im Wind zu."}]}];
function evMaybe(){if(lvl()<2||Math.random()>=EV_CHANCE)return false;const pool=EVTS.filter(e=>!e.ok||e.ok());EVN={ev:pool[rnd(0,pool.length-1)],res:null};evScr();return true}
function evPick(i){const c=EVN.ev.ch[i];if(EVN.res||(c.ok&&!c.ok()))return;const r=c.f();if(r&&r.fight){EVN=null;save();return setup(r.fight())}EVN.res=r;sfx("coin");levelCheck(QN);unlCheck(QN);save();evScr()}
function evScr(){musicSet("home");const v=EVN.ev,lab=c=>typeof c.l==="function"?c.l():c.l;
 app.innerHTML=`<div class="top"><b>${v.e} ${v.t}</b><span><i class=coin></i> ${S.gold}</span></div>
 <div class="scene">${BG}<div style="position:relative;z-index:2;display:flex;align-items:flex-end;gap:8px">${compSvg(S.cmp)}${pk()}<span style="font-size:64px;margin-bottom:14px">${v.e}</span></div></div>
 <div class="msg">${EVN.res||v.txt()}</div>
 <div class="grid">${EVN.res?`<button class="p" style="grid-column:1/-1" onclick="EVN=null;home()">Weiter</button>`:v.ch.map((c,i)=>`<button ${c.ok&&!c.ok()?"disabled":""} style="grid-column:1/-1" onclick="evPick(${i})">${lab(c)}</button>`).join("")}</div>`}
