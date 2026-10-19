// Ritter Manager – Taverne „Zum Goldenen Humpen“: Würfelpoker um Gold

const TAV_LIMIT=5;
const TAVO=[
 {id:"gustl",e:"🍺",bets:[10,25],ai:0,col:"#8d6e63",ok:()=>true},
 {id:"rosa",e:"🎲",bets:[25,50,100],ai:1,col:"#ad1457",ok:()=>lvl()>=3},
 {id:"brakk",e:"🗡️",bets:[50,100,250],ai:2,col:"#455a64",ok:()=>lvl()>=6},
 {id:"graf",e:"🎩",bets:[100,250,500],ai:3,col:"#4a148c",ok:()=>S.ruhm>=400}];
loc("tav.opp",TAVO);
const HANDS=t("tav.hands");
const RUMORS=t("tav.rumors");
let TV={o:"gustl",bet:10,ph:"bet",p:[],e:[],sel:[],res:null,rum:0};
const d6=()=>rnd(1,6);
function hand(d){const c=[0,0,0,0,0,0,0];d.forEach(x=>c[x]++);const g=[1,2,3,4,5,6].filter(f=>c[f]).sort((a,b)=>c[b]-c[a]||b-a),n=g.map(f=>c[f]),s=[...d].sort().join("");
 let r=n[0]===5?8:n[0]===4?7:n[0]===3&&n[1]===2?6:s==="23456"?5:s==="12345"?4:n[0]===3?3:n[0]===2&&n[1]===2?2:n[0]===2?1:0;
 return [r,...g.flatMap(f=>Array(c[f]).fill(f))]}
const cmpH=(a,b)=>{for(let i=0;i<a.length;i++)if(a[i]!==b[i])return a[i]-b[i];return 0};
const reroll=(d,keep)=>d.map((x,i)=>keep[i]?x:d6());
// Gegner-Strategien: welche Würfel behalten?
function keepSolid(d,greedy){const h=hand(d),c=[0,0,0,0,0,0,0];d.forEach(x=>c[x]++);
 if(h[0]>=4&&!(greedy&&h[0]<6))return d.map(()=>true);
 const top=Math.max(...c);
 if(top>=2){if(greedy){const f=[6,5,4,3,2,1].find(v=>c[v]===top);return d.map(x=>x===f)}return d.map(x=>c[x]>=2)}
 for(const run of["2345","3456","1234"]){const need=[...run].map(Number);if(need.every(v=>c[v])){const used=new Set();return d.map(x=>need.includes(x)&&!used.has(x)&&used.add(x))}}
 const mx=Math.max(...d);return d.map(x=>x===mx)}
function keepBest(d,target){let best=null,bv=-1;
 for(let m=0;m<32;m++){const keep=d.map((_,i)=>!!(m>>i&1));let w=0;for(let k=0;k<60;k++){const c=cmpH(hand(reroll(d,keep)),target);w+=c>0?1:c===0?.5:0}if(w>bv){bv=w;best=keep}}return best}
function oppKeep(ai,d,target){if(ai===0)return d.map(()=>Math.random()<.5);if(ai===3)return keepBest(d,target);return keepSolid(d,ai===2)}
const DIE_P={1:[[50,50]],2:[[28,28],[72,72]],3:[[28,28],[50,50],[72,72]],4:[[28,28],[72,28],[28,72],[72,72]],5:[[28,28],[72,28],[50,50],[28,72],[72,72]],6:[[28,26],[72,26],[28,50],[72,50],[28,74],[72,74]]};
const dieSvg=(v,opp,sel,i,roll)=>`<svg class="die${sel?" sel":""}${roll?" roll":""}" style="animation-delay:${i*.06}s" viewBox="0 0 100 100" ${opp?"":`onclick="tvSel(${i})" role="button" aria-label="${t("tav.dieA",v,sel)}"`}><rect x="6" y="6" width="88" height="88" rx="18" fill="${opp?"#e8d5b5":"#fffaf0"}" stroke="${sel?"#c0221f":"#0006"}" stroke-width="${sel?7:3}"/>${DIE_P[v].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="9" fill="${v===1?"#c0221f":"#2d2417"}"/>`).join("")}</svg>`;
const tavLeft=()=>TAV_LIMIT-((S.tav&&S.tav.day===S.day)?S.tav.n:0);
const TAVBG=`<svg class="bg" viewBox="0 0 600 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs><linearGradient id="tvw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1a10"/><stop offset="1" stop-color="#5a3a22"/></linearGradient><radialGradient id="tvf"><stop offset="0" stop-color="#ffb74d" stop-opacity=".7"/><stop offset="1" stop-color="#ffb74d" stop-opacity="0"/></radialGradient></defs>
 <rect width="600" height="220" fill="url(#tvw)"/>${Array.from({length:13},(_,i)=>`<path d="M${i*48} 0V188" stroke="#0004" stroke-width="2"/>`).join("")}
 <path d="M0 40H600" stroke="#3a2414" stroke-width="10"/><g fill="#7a4a24" stroke="#0005">${[60,120,480,540].map(x=>`<path d="M${x-10} 40v-8h20v8"/>`).join("")}</g>
 <circle class="pl" cx="300" cy="140" r="110" fill="url(#tvf)"/><path d="M262 188V120h76v68Z" fill="#3a2a22" stroke="#1b1410" stroke-width="4"/><path d="M270 188v-40h60v40z" fill="#1b1410"/>${fm(288,186,1,"#ff6d00",0)}${fm(300,186,1.2,"#ffb300",.15)}${fm(312,186,1,"#ff6d00",.3)}
 ${[[70,150],[530,150]].map(b=>`<ellipse cx="${b[0]}" cy="${b[1]+30}" rx="22" ry="6" fill="#0004"/><rect x="${b[0]-20}" y="${b[1]-10}" width="40" height="44" rx="10" fill="#8d5a2b" stroke="#3a2414" stroke-width="2"/><path d="M${b[0]-20} ${b[1]}h40M${b[0]-20} ${b[1]+22}h40" stroke="#3a2414" stroke-width="3"/>`).join("")}
 <g><rect x="150" y="60" width="44" height="30" rx="3" fill="#4e342e"/><text x="172" y="81" font-size="14" text-anchor="middle" fill="#ffd54f" font-family="serif">🍺</text></g>
 <path d="M0 188H600V220H0Z" fill="#3e2716"/><path d="M0 188H600" stroke="#0006" stroke-width="2"/>
 <path d="M200 176h200v8H200zM216 184v20M384 184v20" fill="#6d4423" stroke="#3a2414" stroke-width="3"/><path d="M262 176v-10h10v10M330 176v-12h9v12" fill="#d7b98a" stroke="#5b3a1c"/></svg>`;
function tavern(){musicSet("tavern");const o=TAVO.find(x=>x.id===TV.o),left=tavLeft(),opp=knight(2,0,0,true,null,null,null,null,null,o.id==="rosa",o.col);
 let body="";
 if(TV.ph==="bet"){if(!o.bets.includes(TV.bet))TV.bet=o.bets[0];
  body=`<h3>🎲 ${t("tav.poker")}</h3><div class="mut">${t("tav.rules")}</div>
  <h3>${t("tav.opps")}</h3>${TAVO.map(x=>`<div class="row"><span>${x.e} <b>${x.n}</b> <span class="mut">${x.bets.join("/")} <i class=coin></i></span><br><span class="mut">${x.ok()?x.d:"🔒 "+x.lk}</span></span>${x.ok()?`<button ${x.id===TV.o?'class="p"':""} onclick="TV.o='${x.id}';tavern()">${x.id===TV.o?t("tav.chosen"):t("c.choose")}</button>`:""}</div>`).join("")}
  <h3>${t("tav.betVs",o.n)}</h3><div style="display:flex;gap:6px;flex-wrap:wrap">${o.bets.map(b=>`<button ${b===TV.bet?'class="p"':""} ${S.gold<b?"disabled":""} onclick="TV.bet=${b};tavern()">${b} <i class=coin></i></button>`).join("")}</div>
  <div class="grid"><button class="p" style="grid-column:1/-1" ${left<1||S.gold<TV.bet?"disabled":""} onclick="tvStart()">🎲 ${t("tav.roll")}<small>${left<1?t("tav.enough"):t("tav.betS",TV.bet,left)}</small></button></div>`}
 else{const hp=hand(TV.p),he=hand(TV.e),done=TV.ph==="done";
  body=`<h3>${o.e} ${o.n} <span class="mut">${HANDS[he[0]]}</span></h3><div class="dice">${TV.e.map((v,i)=>dieSvg(v,1,0,i,TV.rollE)).join("")}</div>
  <h3>${t("tav.you")} <span class="mut">${HANDS[hp[0]]}</span></h3><div class="dice">${TV.p.map((v,i)=>dieSvg(v,0,TV.sel[i],i,TV.rollP)).join("")}</div>
  ${done?`<div class="msg" style="font-size:16px">${TV.res}</div><div class="grid"><button class="p" ${tavLeft()<1||S.gold<TV.bet?"disabled":""} onclick="tvStart()">🎲 ${t("tav.again")}<small>${t("tav.againS",TV.bet,tavLeft())}</small></button><button onclick="TV.ph='bet';tavern()">${t("tav.oppBet")}</button></div>`
  :`<div class="mut" style="margin-top:4px">${t("tav.tap")}</div><div class="grid"><button class="p" onclick="tvRoll()">${TV.sel.some(Boolean)?"🎲 "+t("tav.reroll",TV.sel.filter(Boolean).length):"✋ "+t("tav.keep")}</button><button onclick="TV.sel=TV.sel.map(()=>false);tavern()">${t("tav.clear")}</button></div>`}`}
 app.innerHTML=`<div class="top"><b>🍺 ${t("tav.name")}</b><span><i class=coin></i> ${S.gold}</span></div>
 <div class="scene tav">${TAVBG}<div class="tvk">${pk()}</div><div class="tvk">${opp}</div></div>
 ${hintBox("tavern")}
 <div class="msg">🧔 ${t("tav.host")}: <i>${RUMORS[TV.rum%RUMORS.length]}</i>${TV.note?`<br>${TV.note}<br><i>${RUMORS[(TV.rum+1)%RUMORS.length]}</i>`:""}</div>
 <div class="card">${body}</div>
 <div class="mut" style="text-align:center;margin-top:6px">${t("tav.wins")}: ${S.tavW||0} · ${t("tav.net")}: ${(S.tavG||0)>=0?"+":""}${S.tavG||0} <i class=coin></i></div>
 <div class="grid"><button ${S.round===S.day||S.gold<roundCost()?"disabled":""} style="grid-column:1/-1" onclick="tavRound()">🍻 ${t("tav.round")}<small>${S.round===S.day?t("tav.roundDone"):t("tav.roundS",roundCost())}</small></button><button style="grid-column:1/-1" onclick="TV.ph='bet';TV.note='';home()">${t("c.back")}</button></div>`;TV.rollP=TV.rollE=false}
function tvStart(){const o=TAVO.find(x=>x.id===TV.o);if(!o.ok()||tavLeft()<1||S.gold<TV.bet)return;
 S.gold-=TV.bet;S.tav=S.tav&&S.tav.day===S.day?S.tav:{day:S.day,n:0};S.tav.n++;save();
 TV.p=Array.from({length:5},d6);TV.e=Array.from({length:5},d6);TV.sel=[0,0,0,0,0].map(()=>false);TV.ph="pick";TV.rollP=TV.rollE=true;sfx("dice");tavern()}
function tvSel(i){if(TV.ph!=="pick")return;TV.sel[i]=!TV.sel[i];sfx("click");tavern()}
function tvRoll(){if(TV.ph!=="pick")return;const o=TAVO.find(x=>x.id===TV.o);
 if(TV.sel.some(Boolean)){TV.p=reroll(TV.p,TV.sel.map(s=>!s));TV.rollP=true;sfx("dice")}
 const keep=oppKeep(o.ai,TV.e,hand(TV.p));if(keep.some(k=>!k)){TV.e=reroll(TV.e,keep);TV.rollE=true;setTimeout(()=>sfx("dice"),350)}
 const hp=hand(TV.p),he=hand(TV.e),c=cmpH(hp,he),l=[];TV.ph="done";TV.sel=[];TV.rum++;
 if(c>0){const m=hp[0]===8?3:hp[0]===7?1.5:1,w=Math.round(TV.bet*m);S.gold+=TV.bet+w;S.tavW=(S.tavW||0)+1;S.tavG=(S.tavG||0)+w;
  TV.res=t("tav.won",HANDS[hp[0]],HANDS[he[0]],w,m);setTimeout(()=>sfx("win"),500);qProg("dice",1,l);checkTitles(l)}
 else if(c===0){S.gold+=TV.bet;TV.res=t("tav.draw",HANDS[hp[0]])}
 else{S.tavG=(S.tavG||0)-TV.bet;TV.res=t("tav.lost",HANDS[he[0]],HANDS[hp[0]],TV.bet);setTimeout(()=>sfx("lose"),500)}
 if(l.length)TV.res+="<br>"+l.join("<br>");save();tavern()}
