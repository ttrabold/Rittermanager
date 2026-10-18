// Ritter Manager – Tag und Nacht: Burgausbau, Tagesaufträge, Kalender, Vollmond-Jagd, Schlafanimation

// ---- Kalender ----
const WD=["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"];
const MOONS=["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"];
const wday=d=>WD[(d-1)%7];
const isMarket=d=>(d-1)%7===5;
const isTourDay=d=>(d-1)%7===6;
const moonIx=d=>(d-1)%8;
const isFull=d=>moonIx(d)===4;
const untilDay=(d,test)=>{for(let k=0;k<14;k++)if(test(d+k))return k;return 99};
const mp=p=>isMarket(S.day)?Math.round(p*.7):p;   // Händlerpreis (Markttag −30 %)
const ip=p=>isMarket(S.day)?Math.round(p*.75):p;  // Trankpreis (Markttag −25 %)
const tourFee=()=>isTourDay(S.day)?0:20;
function dayTags(d){const t=[];if(isMarket(d))t.push("🛒 <b>Markttag</b>: Händler −30 %, Tränke −25 %");if(isTourDay(d))t.push("🏟️ <b>Turniertag</b>: keine Gebühr, doppelte Siegprämie");if(isFull(d))t.push("🌕 <b>Vollmond</b>: Der Werwolf jagt heute Nacht!");return t}
function calLine(){const d=S.day,t=dayTags(d),nx=[];
 if(!isMarket(d))nx.push(`🛒 in ${untilDay(d,isMarket)} T.`);if(!isTourDay(d))nx.push(`🏟️ in ${untilDay(d,isTourDay)} T.`);if(!isFull(d))nx.push(`🌕 in ${untilDay(d,isFull)} T.`);
 return `<div class="mut" style="margin:-2px 0 8px">📅 ${wday(d)}, Tag ${d} · ${MOONS[moonIx(d)]}${t.length?"<br>"+t.join("<br>"):""}<br><span style="font-size:12px">Demnächst: ${nx.join(" · ")}</span></div>`}

// ---- Burgausbau ----
const BLD=[
 {id:"kaserne",n:"Kaserne",e:"⛺",max:2,g:300,d:"Mehr Energie am Morgen",y:lv=>({en:lv})},
 {id:"garten",n:"Kräutergarten",e:"🌿",max:5,g:60,d:"Heilkraut, später Giftpilze",y:lv=>({hk:2*lv,gp:Math.max(0,lv-2)})},
 {id:"mine",n:"Mine",e:"⛏️",max:5,g:80,d:"Eisenerz, später Mithril",y:lv=>({ez:2*lv,mi:Math.max(0,lv-2)})},
 {id:"arkan",n:"Arkanturm",e:"🔮",max:5,g:120,d:"Arkankristalle, später Feuerblüten",y:lv=>({ak:lv,fb:Math.max(0,lv-3)})},
 {id:"schatz",n:"Schatzkammer",e:"💰",max:5,g:100,d:"Gold",y:lv=>({g:30*lv})}];
const bCost=(b,n)=>{const m=b.id==="kaserne"?{ez:6*n,le:6*n,mi:2*n}:{ez:3*n,le:2*n};if(b.id!=="kaserne"&&n>=3)m.mi=n-2;if(b.id!=="kaserne"&&n>=5)m.ds=1;return {m,g:b.g*n*n}};
const enMax=()=>6+((S.bld||{}).kaserne||0);
const yTxt=y=>Object.entries(y).filter(([k,v])=>v>0).map(([k,v])=>k==="g"?`🪙${v}`:k==="en"?`⚡+${v}`:`${MT(k).e}${v}`).join(" ")||"–";
function build(id){const b=BLD.find(x=>x.id===id),lv=S.bld[id];if(lv>=b.max)return;const c=bCost(b,lv+1);if(!hasM(c.m)||S.gold<c.g)return;
 S.gold-=c.g;for(const k in c.m)S.mat[k]-=c.m[k];S.bld[id]++;sfx("level");msg=`${b.e} <b>${b.n}</b> ist jetzt auf Stufe ${S.bld[id]}!`;save();castleScr()}
function castleScr(){musicSet("home");
 app.innerHTML=`<div class="top"><b>🏗️ Burgausbau</b><span>🪙 ${S.gold}</span></div>
 <div class="scene">${BG}${bldSvg()}${castle}${pk()}</div>
 <div class="msg">Gebäude liefern <b>jede Nacht</b> Erträge. Volle Erträge gibt es, wenn du am Tag mindestens <b>4 Energie</b> genutzt hast, halbe ab 2. Wer nur faulenzt, bekommt nichts.</div>
 <div class="card"><div style="margin-bottom:6px">${matRow()}</div>${BLD.map(b=>{const lv=S.bld[b.id],c=lv<b.max?bCost(b,lv+1):null;
  return `<div class="row"><span>${b.e} <b>${b.n}</b> <span class="mut">Stufe ${lv}/${b.max}</span><br><span class="mut">${b.d} · jetzt: ${lv?yTxt(b.y(lv)):"–"}${c?` → ${yTxt(b.y(lv+1))}<br>Kosten: ${costH(c.m,c.g)}`:" · voll ausgebaut"}</span></span>${c?`<button ${hasM(c.m)&&S.gold>=c.g?"":"disabled"} onclick="build('${b.id}')">${lv?"Ausbauen":"Bauen"}</button>`:'<span class="mut">✔</span>'}</div>`}).join("")}</div>
 <div class="grid"><button onclick="trader()">🛒 Händler</button><button onclick="home()">← Zurück zur Burg</button></div>`}
function bldSvg(){const B=S.bld||{},o=[];
 if(B.kaserne)for(let i=0;i<B.kaserne;i++){const x=98+i*30;o.push(`<path d="M${x-14} 192L${x} 166L${x+14} 192Z" fill="#c0392b" stroke="#0005"/><path d="M${x-7} 192L${x} 166L${x+7} 192Z" fill="#f2e6d0"/><path d="M${x} 166v-12" stroke="#5b3a1c" stroke-width="1.5"/><path class="wv" d="M${x} 154h9l-3 3 3 3h-9z" fill="#d4a017"/>`)}
 if(B.garten){o.push(`<path d="M146 192h${20+B.garten*8}" stroke="#7a5230" stroke-width="5"/>`);for(let i=0;i<B.garten*2;i++){const x=150+i*4.5;o.push(`<circle cx="${x}" cy="${186-(i%2)*3}" r="3" fill="${i%3?"#4caf50":"#8bc34a"}"/>`)}o.push(`<path d="M144 194v-10M${168+B.garten*8} 194v-10M144 186h${24+B.garten*8}" stroke="#a1887f" stroke-width="1.5"/>`)}
 if(B.mine){o.push(`<path d="M196 194Q204 ${166-B.mine*2} 222 ${164-B.mine*2}Q240 ${166-B.mine*2} 248 194Z" fill="#6d6560" stroke="#0004"/><path d="M212 194v-14q10-10 20 0v14z" fill="#1b1b1b"/><path d="M212 180q10-10 20 0" stroke="#5b3a1c" stroke-width="3" fill="none"/>`);if(B.mine>=2)o.push(`<rect x="234" y="185" width="14" height="7" rx="1" fill="#5d4037"/><circle cx="237" cy="193" r="2" fill="#333"/><circle cx="245" cy="193" r="2" fill="#333"/><path d="M236 185l3-4 3 3 3-4 2 5" fill="#9aa3ab"/>`);if(B.mine>=3)o.push(`<circle class="pl" cx="210" cy="176" r="6" fill="#ffd54f"/>`)}
 if(B.schatz){const h=10+B.schatz*3;o.push(`<rect x="376" y="${192-h}" width="30" height="${h}" fill="#8d8473" stroke="#0004"/><path d="M372 ${192-h}L391 ${178-h}L410 ${192-h}Z" fill="#7a3b1c"/><rect x="386" y="${180}" width="10" height="12" fill="#d4a017"/>`);for(let i=0;i<Math.min(5,B.schatz);i++)o.push(`<circle cx="${370-i*4}" cy="${190-(i%2)*3}" r="2.6" fill="#ffd54f" stroke="#b8860b"/>`)}
 if(B.arkan){const h=24+B.arkan*9;o.push(`<rect x="424" y="${192-h}" width="12" height="${h}" fill="#5e548e" stroke="#0004"/><path d="M420 ${192-h}L430 ${178-h}L440 ${192-h}Z" fill="#3c2f73"/><circle class="pl" cx="430" cy="${170-h}" r="12" fill="#b388ff"/><circle cx="430" cy="${170-h}" r="4" fill="#e1bee7"/>`+ST(442,180-h,"#e1bee7",.3)+ST(418,190-h,"#fff",.9))}
 return o.length?`<svg class="bg" viewBox="0 0 600 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true" style="z-index:1">${o.join("")}</svg>`:""}

// ---- Tagesaufträge ----
let QN=[];
const QT=[
 {id:"win",n:x=>`Gewinne ${x} Kämpfe`,g:()=>rnd(2,3),e:x=>2*x,f:1},
 {id:"work",n:x=>`Arbeite ${x}-mal`,g:()=>2,e:x=>x},
 {id:"craft",n:x=>x>1?`Stelle ${x} Dinge in der Werkstatt her`:"Stelle etwas in der Werkstatt her",g:()=>rnd(1,2),e:x=>x},
 {id:"crit",n:x=>`Lande ${x} kritische Treffer`,g:()=>3,e:()=>0,f:1},
 {id:"skill",n:x=>`Setze ${x}-mal eine Spezialfähigkeit ein`,g:()=>rnd(3,4),e:()=>0,f:1,ok:()=>lvl()>=2},
 {id:"potion",n:()=>"Trinke im Kampf einen Trank",g:()=>1,e:()=>0,f:1},
 {id:"buy",n:x=>`Kaufe ${x} Materialien beim Händler`,g:()=>2,e:()=>0},
 {id:"tower",n:x=>`Schaffe ${x} Turm-Etagen`,g:()=>rnd(2,3),e:()=>4,f:1,ok:()=>S.tunl},
 {id:"tour",n:x=>`Gewinne ${x} Turnierrunden`,g:()=>2,e:()=>4,f:1},
 {id:"dice",n:()=>"Gewinne eine Würfelpartie in der Taverne",g:()=>1,e:()=>0}];
function qRew(){const r=Math.random(),L=lvl();
 if(r<.4)return {g:25+L*6};
 if(r<.75){const k=["ez","le","hk","gp","fb","ak"][rnd(0,5)],n=k==="ak"||k==="fb"?rnd(1,2):rnd(2,3),m={[k]:n};if(L>=8&&Math.random()<.3)m.mi=1;return {m}}
 return {it:[{h:2},{a:1},{k:1},{e:1},{g:1}][rnd(0,4)]}}
const rTxt=r=>r.g?`🪙${r.g}`:r.m?yTxt(r.m):Object.entries(r.it).map(([k,n])=>`${IT.find(x=>x.k===k).e}${n}`).join(" ");
function rGive(r){if(r.g)S.gold+=r.g;if(r.m)for(const k in r.m)S.mat[k]+=r.m[k];if(r.it)for(const k in r.it)S.it[k]+=r.it[k]}
function qGen(){let list;
 for(let t=0;t<40;t++){const pool=QT.filter(q=>!q.ok||q.ok()).sort(()=>Math.random()-.5).slice(0,3);
  list=pool.map(q=>{const goal=q.g();return {id:q.id,goal,p:0,done:false,r:qRew(),txt:q.n(goal),e:q.e(goal),f:q.f}});
  const fight=list.filter(q=>q.f),need=list.reduce((a,q)=>a+q.e,0)+(fight.length&&!fight.some(q=>q.e)?2:0);
  if(need<=enMax())break}
 S.q={day:S.day,list:list.map(({e,f,...q})=>q),bonus:false}}
function qProg(id,n,l){if(!S.q||S.q.day!==S.day)return;const out=l||QN;
 for(const q of S.q.list)if(q.id===id&&!q.done){q.p=Math.min(q.goal,q.p+(n||1));if(q.p>=q.goal){q.done=true;rGive(q.r);sfx("coin");out.push(`📜 <b>Auftrag erfüllt:</b> ${q.txt} → ${rTxt(q.r)}`)}}
 if(!S.q.bonus&&S.q.list.every(q=>q.done)){S.q.bonus=true;const L=lvl(),r={g:60+L*10,it:{a:1},m:{}};
  for(let i=0;i<2;i++){const k=["ez","le","hk","gp","fb","ak"][rnd(0,5)];r.m[k]=(r.m[k]||0)+2}if(L>=15&&Math.random()<.3)r.m.ds=1;
  rGive(r);sfx("level");out.push(`🎁 <b>Alle Tagesaufträge erledigt!</b> Bonus-Truhe: ${rTxt({g:r.g})} ${rTxt({it:r.it})} ${yTxt(r.m)}`)}}
function questCard(){if(!S.q)return "";const L=S.q.list,d=L.filter(q=>q.done).length;
 return `<div class="card"><h3>📜 Tagesaufträge <span class="mut">(${d}/${L.length})</span></h3>${L.map(q=>`<div class="row"><span>${q.done?"✅":"▫️"} ${q.txt} <span class="mut">${q.p}/${q.goal}</span></span><span class="mut" style="white-space:nowrap">${rTxt(q.r)}</span></div>`).join("")}
 <div class="mut" style="margin-top:6px">🎁 Bonus-Truhe für alle drei: ${S.q.bonus?"✔ erhalten":"noch offen"}</div></div>`}

// ---- Vollmond-Werwolf ----
const WOLF={n:"Vollmond-Werwolf",hp:2.1,atk:1.05,def:1,tint:"#5d4037",mv:[["Klauenhieb",1.1,92,"",4],["Wundbiss",.9,90,"poison",3],["Mondgeheul",0,100,"guard",1],["Sprungangriff",1.7,78,"stun",2]]};
EI.push({id:"mw",n:"Mondsichel",s:"w",b:15,c:"#cfd8e6",fx:{crit:.12,life:.08},d:"+12 % Krit, 8 % Lebensraub"},{id:"wf",n:"Wolfspelz",s:"a",b:9,c:"#6d5a4a",fx:{dodge:8,regen:3},d:"+8 % Ausweichen, heilt 3 LP/Runde"});
VIS.mw={b:"curved",f:"#e3e9f2",e:"#fff",g:"#9fb4d8",fx:()=>SPARK};
AV.wf=b=>b?`<path class="wv" d="M40 62Q12 96 18 144L50 120Z" fill="#6d5a4a" stroke="#0004"/>`:`<path d="M42 60q5-9 9-1q5-9 10-1q5-9 10-1q5-9 9 1l-4 7H46Z" fill="#8d7b68" stroke="#0004"/>`;
function startMoon(){if(!isFull(S.day)||S.moonDone===S.day||S.en<3)return;S.en-=3;S.moonDone=S.day;const e=mk(Math.max(2,lvl()),WOLF,true);e.moon=true;setup(e)}
function moonLoot(l){const p=["mw","wf"].filter(id=>!S.own.includes(id));if(p.length)giveE(p[0],l);else{S.gold+=150;l.push("Mondbeute: +150 Gold!")}S.it.a++;S.mat.ak+=2;l.push("Dazu: 🔷 Äthertrank und 💎 Arkankristall ×2.")}
const wolfSvg=()=>BSV(`<circle class="pl" cx="62" cy="70" r="58" fill="#cfd8e6"/>
 <path class="sway" d="M44 112Q20 120 14 100" stroke="#5d4037" stroke-width="9" fill="none" stroke-linecap="round"/>
 <path d="M44 104Q36 124 42 146h14l2-26ZM74 106Q86 126 80 146H66l-2-26Z" fill="#6d4c41" stroke="#0005"/><path d="M40 146l3 6 3-6 3 6 3-6M64 146l3 6 3-6 3 6 3-6" stroke="#eee" stroke-width="2" fill="none"/>
 <g class="br"><path d="M40 112h44l-4 10H44z" fill="#455a64" stroke="#0005"/><path d="M46 122l4 6 3-6 3 6 3-6 3 6 3-6 3 6 3-6" fill="#455a64"/>
 ${limbB("M42 66Q28 86 30 104","#6d4c41",11)}<path d="M26 104l-2 7M30 106l0 8M34 104l3 7" stroke="#eee" stroke-width="2"/>
 <path d="M38 62Q61 46 86 62L82 114H42Z" fill="#6d4c41" stroke="#0005"/><path d="M50 70Q61 64 72 70L70 100Q61 106 52 100Z" fill="#a1887f"/><path d="M42 64l-6-6 8 1zM84 64l6-6-8 1z" fill="#5d4037"/>
 <path d="M48 54Q46 30 62 26Q78 28 78 44L96 46Q100 50 96 54L78 58Q70 64 58 62Z" fill="#6d4c41" stroke="#0005"/><path d="M50 30L46 12L58 26ZM64 26L70 10L74 28Z" fill="#5d4037" stroke="#0004"/>
 <path d="M80 54l3 4 2-4 3 4 2-4" stroke="#fff" stroke-width="1.5" fill="none"/><circle cx="97" cy="49" r="2.2" fill="#111"/>
 <path d="M62 38l9 1" stroke="#3e2723" stroke-width="2"/><ellipse class="glow" cx="68" cy="42" rx="3" ry="2.2" fill="#ffd600"/><circle cx="68.5" cy="42" r="1" fill="#000"/>
 ${limbB("M84 66Q98 82 104 100","#6d4c41",11)}<path d="M100 102l1 8M104 102l3 7M108 100l4 5" stroke="#eee" stroke-width="2.2"/></g>`,38);

// ---- Nacht: Erträge, neuer Tag, Animation ----
function newDay(){if(document.getElementById("night"))return;
 const used=Math.max(0,(S.enStart||6)-S.en),fac=used>=4?1:used>=2?.5:0,got={},lines=[];
 for(const b of BLD){const lv=S.bld[b.id];if(!lv||b.id==="kaserne")continue;const y=b.y(lv),g={};
  for(const k in y){const v=fac?Math.ceil(y[k]*fac):0;if(v>0){g[k]=v;if(k==="g")S.gold+=v;else S.mat[k]+=v}}
  if(Object.keys(g).length)lines.push(`${b.e} ${b.n}: ${yTxt(g)}`)}
 const had=BLD.some(b=>b.id!=="kaserne"&&S.bld[b.id]);
 S.day++;S.en=enMax();let r=Math.random()*EVT.reduce((a,e)=>a+e[0],0),ev=EVT[0];for(const e of EVT){if(r<e[0]){ev=e;break}r-=e[0]}
 const evT=ev[1]();S.enStart=S.en;qGen();msg=evT;save();
 const facT=fac===1?`Du hast gestern ${used} Energie genutzt – <b>volle Erträge</b>.`:fac?`Du hast gestern nur ${used} Energie genutzt – <b>halbe Erträge</b>.`:`Du hast gestern kaum etwas getan (${used} Energie) – <b>keine Erträge</b>.`;
 nightShow(`<h3>🌙 Die Nacht zu Tag ${S.day}</h3>
  <div class="row"><span><b>🏗️ Erträge deiner Burg</b><br><span class="mut">${had?facT+"<br>"+(lines.join("<br>")||"–"):'Noch keine Gebäude. <a href="#" onclick="nightClose(castleScr);return false" style="color:var(--acc)">Burg ausbauen</a>'}</span></span></div>
  <div class="row"><span><b>☀️ Am Morgen</b><br>${evT}</span></div>
  <div class="row"><span><b>📅 ${wday(S.day)} ${MOONS[moonIx(S.day)]}</b>${dayTags(S.day).map(t=>"<br>"+t).join("")}</span></div>
  <div class="row"><span><b>📜 Neue Aufträge</b><br>${S.q.list.map(q=>"▫️ "+q.txt+` <span class="mut">(${rTxt(q.r)})</span>`).join("<br>")}</span></div>`)}
function nightShow(rep){const fast=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches,el=document.createElement("div");el.id="night";el.className="night"+(fast?" fast":"");
 el.innerHTML=`<div class="nsky">${Array.from({length:18},(_,i)=>`<i style="left:${(i*53)%100}%;top:${(i*29)%45}%;animation-delay:${.4+(i%5)*.1}s"></i>`).join("")}<span class="nmoon">🌙</span><span class="nzz">Z z z</span><span class="nsun">☀️</span></div>
 <div class="card nrep" hidden>${rep}<div class="grid"><button class="p" style="grid-column:1/-1" onclick="nightClose(home)">☀️ Auf in den Tag!</button></div></div>`;
 document.body.appendChild(el);sfx("night");setTimeout(()=>sfx("morning"),fast?50:1900);setTimeout(()=>{const r=el.querySelector(".nrep");if(r)r.hidden=false},fast?100:2700)}
function nightClose(go){const el=document.getElementById("night");if(el)el.remove();go()}
