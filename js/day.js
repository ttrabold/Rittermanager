// Ritter Manager – Tag und Nacht: Burgausbau, Tagesaufträge, Kalender, Vollmond-Jagd, Schlafanimation

// ---- Kalender ----
const WD=t("cal.wd");
const MOONS=["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"];
const wday=d=>WD[(d-1)%7];
const isMarket=d=>(d-1)%7===5;
const isTourDay=d=>(d-1)%7===6;
const moonIx=d=>(d-1)%8;
const isFull=d=>moonIx(d)===4;
const untilDay=(d,test)=>{for(let k=0;k<14;k++)if(test(d+k))return k;return 99};
const mp=p=>isMarket(S.day)&&has("cal")?Math.round(p*.7):p;   // Händlerpreis (Markttag −30 %)
const ip=p=>isMarket(S.day)&&has("cal")?Math.round(p*.75):p;  // Trankpreis (Markttag −25 %)
const tourFee=()=>isTourDay(S.day)&&has("cal")?0:20;
function dayTags(d){const o=[];if(isMarket(d))o.push("🛒 "+t("cal.market"));if(isTourDay(d))o.push("🏟️ "+t("cal.tour"));if(isFull(d))o.push("🌕 "+t("cal.full"));return o}
function calLine(){const d=S.day,tg=dayTags(d),nx=[];
 if(!isMarket(d))nx.push("🛒 "+t("cal.inD",untilDay(d,isMarket)));if(!isTourDay(d))nx.push("🏟️ "+t("cal.inD",untilDay(d,isTourDay)));if(!isFull(d))nx.push("🌕 "+t("cal.inD",untilDay(d,isFull)));
 return `<div class="mut" style="margin:-2px 0 8px">📅 ${wday(d)}, ${t("cal.day")} ${d} · ${MOONS[moonIx(d)]}${tg.length?"<br>"+tg.join("<br>"):""}<br><span style="font-size:12px">${t("cal.soon")}: ${nx.join(" · ")}</span></div>`}

// ---- Burgausbau ----
const BLD=[
 {id:"kaserne",e:"⛺",max:2,g:300,y:lv=>({en:lv})},
 {id:"garten",e:"🌿",max:5,g:60,y:lv=>({hk:2*lv,gp:Math.max(0,lv-2)})},
 {id:"mine",e:"⛏️",max:5,g:80,y:lv=>({ez:2*lv,mi:Math.max(0,lv-2)})},
 {id:"arkan",e:"🔮",max:5,g:120,y:lv=>({ak:lv,fb:Math.max(0,lv-3)})},
 {id:"schatz",e:"💰",max:5,g:100,y:lv=>({g:30*lv})}];
loc("bld",BLD);
const bCost=(b,n)=>{const m=b.id==="kaserne"?{ez:6*n,le:6*n,mi:2*n}:{ez:3*n,le:2*n};if(b.id!=="kaserne"&&n>=3)m.mi=n-2;if(b.id!=="kaserne"&&n>=5)m.ds=1;return {m,g:b.g*n*n}};
const enMax=()=>6+((S.bld||{}).kaserne||0)+(S.cmp==="ross"?1:0);
const yTxt=y=>Object.entries(y).filter(([k,v])=>v>0).map(([k,v])=>k==="g"?`<i class=coin></i>${v}`:k==="en"?`⚡+${v}`:`${MT(k).e}${v}`).join(" ")||"–";
function build(id){const b=BLD.find(x=>x.id===id),lv=S.bld[id];if(lv>=b.max)return;const c=bCost(b,lv+1);if(!hasM(c.m)||S.gold<c.g)return;
 const k0=cStage();S.gold-=c.g;for(const k in c.m)S.mat[k]-=c.m[k];S.bld[id]++;sfx("level");cNote=t("cs.built",b.e,b.n,S.bld[id])+(cStage()>k0?`<br>🏰 <b>${t("cs.grow",CSTAGE[cStage()][1])}</b>`:"");msg=cNote;save();castleScr()}
let cNote="";
function castleScr(){musicSet("home");
 app.innerHTML=`<div class="top"><b>🏗️ ${t("cs.t")}</b><span><i class=coin></i> ${S.gold}</span></div>
 <div class="scene">${BG}${bldSvg()}${decoSvg()}${castleSvg()}${pk()}</div>
 ${hintBox("burg")}
 <div class="msg" data-quiet>🏰 ${t("cs.stage",CSTAGE[cStage()][1],cStage())}${cStage()<5?t("cs.next",CSTAGE[cStage()+1][1],CSTAGE[cStage()+1][0],bldSum()):t("cs.max")}<br>${t("cs.info")}</div>
 <div class="card"><div style="margin-bottom:6px">${matRow()}</div>${BLD.map(b=>{const lv=S.bld[b.id],c=lv<b.max?bCost(b,lv+1):null;
  return `<div class="row"><span style="display:flex;gap:10px;align-items:center">${bThumb(b.id,lv)}<span>${b.e} <b>${b.n}</b> <span class="mut">${t("st.lvl")} ${lv}/${b.max}</span><br><span class="mut">${b.d} · ${t("cs.now")}: ${lv?yTxt(b.y(lv)):"–"}${c?` → ${yTxt(b.y(lv+1))}<br>${t("c.cost")}: ${costH(c.m,c.g)}`:" · "+t("cs.full")}</span></span></span>${c?`<button ${hasM(c.m)&&S.gold>=c.g?"":"disabled"} onclick="build('${b.id}')">${lv?t("cs.up"):t("cs.build")}</button>`:'<span class="mut">✔</span>'}</div>`}).join("")}</div>
 <div class="card"><h3>✨ ${t("cs.deco")}</h3><div class="mut">${t("cs.decoD")}</div>${DECO.map(d=>`<div class="row"><span>${d.e} <b>${d.n}</b> <span class="mut">+${d.r} ${t("st.ruhm")}</span><br><span class="mut">${d.d}${d.ok&&!d.ok()?" · 🔒 "+d.lk:""}</span></span>${hasDeco(d.id)?'<span class="mut">✔</span>':d.ok&&!d.ok()?"":`<button ${S.gold<d.g?"disabled":""} onclick="decoBuy('${d.id}')">${d.g} <i class=coin></i></button>`}</div>`).join("")}</div>
 ${cNote?`<div class="msg">${cNote}</div>`:""}
 <div class="grid"><button onclick="trader()">🛒 ${t("tr.t")}</button><button onclick="home()">${t("c.back")}</button></div>`;cNote=""}
// Gebäude in der Burgszene – jedes entwickelt sich mit seiner Stufe
const BV={
 arkan:l=>{const x=76,h=l>=2?18+l*12:0,top=192-h,o=[];
  if(l>=5)o.push(`<rect class="pl" x="${x-3}" y="0" width="6" height="${top-14}" fill="#e1bee7"/>`);
  if(l===1)o.push(`<path d="M68 192v-8h16v8z" fill="#7d7a8c" stroke="#0004"/><polygon points="72,184 76,168 80,184" fill="#b388ff" stroke="#e1bee7"/><circle class="pl" cx="76" cy="176" r="10" fill="#b388ff"/>`);
  else{o.push(`<path d="M${x-9} 192v-6h18v6z" fill="#6b6680"/><rect x="${x-6}" y="${top}" width="12" height="${h-6}" fill="#5e548e" stroke="#0004"/>`);
   if(l>=3)o.push([.3,.6].map((f,k)=>`<path class="pl" style="animation-delay:${k*.5}s" d="M${x-6} ${top+h*f}h12" stroke="#e040fb" stroke-width="2"/>`).join("")+`<path d="M${x-9} ${top}L${x} ${top-16}L${x+9} ${top}Z" fill="#3c2f73" stroke="#0004"/>`);
   const oy=top-(l>=3?24:8);o.push(`<circle class="pl" cx="${x}" cy="${oy}" r="${8+l*2}" fill="#b388ff"/><circle cx="${x}" cy="${oy}" r="${2+l*.6}" fill="#f3e5f5"/>`);
   if(l>=4)o.push(`<g class="rot" style="transform-box:view-box;transform-origin:${x}px ${oy}px"><ellipse cx="${x}" cy="${oy}" rx="13" ry="4" fill="none" stroke="#ce93d8" stroke-width="1.5" stroke-dasharray="4 3"/></g>`);
   if(l>=5)o.push(`<polygon points="${x-4},${oy} ${x},${oy-12} ${x+4},${oy} ${x},${oy+12}" fill="#e1bee7" opacity=".9"/>`);
   o.push(ST(x+12,oy+8,"#e1bee7",.3)+ST(x-12,oy+16,"#fff",.9))}
  return o.join("")},
 kaserne:l=>{const o=[`<path d="M88 192L106 160L124 192Z" fill="#c0392b" stroke="#0005"/><path d="M97 192L106 160L115 192Z" fill="#f2e6d0"/><path d="M102 192L106 180L110 192Z" fill="#5b2a1c"/><path d="M106 160v-12" stroke="#5b3a1c" stroke-width="1.5"/><path class="wv" d="M106 148h10l-3 3 3 3h-10z" fill="#d4a017"/>`];
  if(l===1)o.push(`<path d="M128 192v-18M140 192v-18M126 180h16" stroke="#6d4c41" stroke-width="2"/><path d="M131 192v-24M135 192v-26M139 192v-23" stroke="#9e9e9e" stroke-width="1.2"/><path d="M129.5 168l1.5-4 1.5 4M133.5 166l1.5-4 1.5 4M137.5 169l1.5-4 1.5 4" fill="#cfd8dc"/>`);
  if(l>=2)o.push(`<rect x="124" y="168" width="26" height="24" fill="#e6d3ad" stroke="#4e342e"/><path d="M124 168l26 24M150 168l-26 24M137 168v24M124 180h26" stroke="#5d4037" stroke-width="1.6"/><path d="M120 168L137 152L154 168Z" fill="#6d3b1e" stroke="#0005"/><rect x="133" y="182" width="8" height="10" fill="#4e342e"/><rect class="wv" x="127" y="171" width="5" height="9" fill="#8b1e1e"/>${fm(116,192,.5,"#ff6d00",0)}`);
  return o.join("")},
 garten:l=>{const o=[],beds=Math.min(l,3);
  if(l>=4)o.push(`<path d="M152 192V172Q178 152 204 172V192Z" fill="#bfe9ff" opacity=".28" stroke="#e0f7fa" stroke-width="1.2"/><path d="M165 192V162M178 192V158M191 192V162M152 178Q178 162 204 178" stroke="#e0f7fa" stroke-width=".8" fill="none" opacity=".8"/>`);
  for(let b=0;b<beds;b++){const x=156+b*16;o.push(`<rect x="${x}" y="186" width="13" height="6" rx="1" fill="#6d4423"/>`);for(let k=0;k<3;k++)o.push(`<circle class="${l>=5?"pl":""}" cx="${x+2+k*4.5}" cy="${184-(k%2)*2}" r="${2.4+l*.2}" fill="${l>=5?"#69f0ae":k%2?"#4caf50":"#7cb342"}"/>`);
   if(l>=3&&b===1)o.push(`<circle cx="${x+4}" cy="180" r="1.6" fill="#e53935"/><circle cx="${x+9}" cy="179" r="1.6" fill="#fdd835"/>`);
   if(l>=3&&b===2)o.push(`<path d="M${x+3} 186v-3M${x+9} 186v-3" stroke="#f5f5dc" stroke-width="1.5"/><ellipse cx="${x+3}" cy="183" rx="3" ry="2" fill="#c62828"/><ellipse cx="${x+9}" cy="183" rx="3" ry="2" fill="#c62828"/>`)}
  if(l>=2&&l<4)o.push(`<path d="M152 192v-9M204 192v-9M152 185h52" stroke="#a1887f" stroke-width="1.5"/>`+[160,168,176,184,192,200].map(x=>`<path d="M${x} 192v-8" stroke="#a1887f"/>`).join(""));
  if(l>=3)o.push(`<path d="M208 192v-24M201 176h14" stroke="#6d4c41" stroke-width="2"/><circle cx="208" cy="165" r="4" fill="#d7b98a"/><path d="M202 162h12l-6-6z" fill="#5d4037"/><path d="M203 177l-3 5M213 177l3 5" stroke="#d7b98a" stroke-width="2"/>`);
  if(l>=5)o.push(ST(166,166,"#b9f6ca",0)+ST(192,164,"#fff",.6));
  return o.join("")},
 mine:l=>{const x=232,hM=20+l*6,o=[`<path d="M210 194Q218 ${194-hM} ${x} ${192-hM}Q${x+16} ${194-hM} ${x+26} 194Z" fill="#6d6560" stroke="#0004"/><path d="M${x-12} ${194-hM*.5}l6-4M${x+10} ${194-hM*.6}l5 3" stroke="#0003" stroke-width="1.5"/>`];
  if(l>=5)o.push(`<path class="pl" d="M${x-10} ${196-hM*.7}l5 4 4-3 5 5M${x+6} ${196-hM*.8}l4 5 5-2" stroke="#4fc3f7" stroke-width="2" fill="none"/>`);
  if(l>=4)o.push(`<path d="M${x-8} ${192-hM}L${x} ${172-hM}L${x+8} ${192-hM}M${x-5} ${184-hM}h10" stroke="#6d4c41" stroke-width="2" fill="none"/><circle cx="${x}" cy="${172-hM}" r="4" fill="none" stroke="#8d6e63" stroke-width="1.5"/><path d="M${x} ${176-hM}V184" stroke="#bdbdbd" stroke-width=".8"/>`);
  o.push(`<rect x="${x-7}" y="178" width="14" height="16" fill="#111"/><path d="M${x-9} 194v-18M${x+9} 194v-18M${x-11} 176h22" stroke="#6d4c41" stroke-width="3"/>`);
  if(l>=2)o.push(`<path d="M${x} 194h30" stroke="#5d4037" stroke-width="1.5"/><rect x="${x+12}" y="185" width="13" height="7" rx="1" fill="#5d4037" stroke="#0005"/><circle cx="${x+15}" cy="193" r="2" fill="#333"/><circle cx="${x+22}" cy="193" r="2" fill="#333"/><path d="M${x+13} 185l3-4 3 3 3-4 2 5" fill="${l>=3?"#4fc3f7":"#9aa3ab"}"/>`);
  if(l>=3)o.push(`<path d="M${x-12} 176v-6" stroke="#333"/><circle class="pl" cx="${x-12}" cy="168" r="7" fill="#ffd54f"/><rect x="${x-14}" y="166" width="4" height="5" fill="#ffca28"/><path d="M${x-26} 194l4-8 5 3 4-6 4 11z" fill="#78909c"/>`+ST(x-20,184,"#81d4fa",.4));
  return o.join("")},
 schatz:l=>{const x=395,o=[];
  if(l===1)o.push(`<rect x="386" y="182" width="18" height="10" fill="#8d5a2b" stroke="#3e2716"/><path d="M386 182q9-8 18 0" fill="#a0692f" stroke="#3e2716"/><path d="M395 176v16" stroke="#d4a017" stroke-width="2"/>`);
  if(l===2)o.push(`<rect x="380" y="172" width="30" height="20" fill="#8d8473" stroke="#0004"/><path d="M376 172L395 158L414 172Z" fill="#7a3b1c"/><rect x="390" y="180" width="10" height="12" fill="#d4a017"/>`);
  if(l>=3){const w=l>=5?46:40,lx=x-w/2;o.push(`<rect x="${lx}" y="166" width="${w}" height="26" fill="${l>=4?"#d8d0c0":"#a39a88"}" stroke="#0004"/><path d="M${lx} 166a${w/2} ${l>=5?20:16} 0 0 1 ${w} 0Z" fill="${l>=5?"#ffd54a":"#b8860b"}" stroke="#7a5a00"/><rect x="${x-6}" y="176" width="12" height="16" rx="6" fill="#d4a017" stroke="#7a5a00"/>`);
   if(l>=4)o.push(`<rect x="${lx+3}" y="168" width="4" height="24" fill="#fff8e1" stroke="#0003"/><rect x="${lx+w-7}" y="168" width="4" height="24" fill="#fff8e1" stroke="#0003"/><path class="wv" d="M${lx-4} 170h6v12l-3-2-3 2z" fill="#d4a017"/><path class="wv" d="M${lx+w-2} 170h6v12l-3-2-3 2z" fill="#d4a017"/>`);
   if(l>=5)o.push(`<path d="M${x} ${166-20}v-10" stroke="#d4a017" stroke-width="2"/><circle cx="${x}" cy="${166-31}" r="2.5" fill="#fff59d"/>`+ST(x-14,150,"#fff59d",0)+ST(x+16,156,"#fff",.5))}
  const pile=n=>{let r="";for(let k=0;k<n;k++)r+=`<circle cx="${370-(k%4)*4}" cy="${190-Math.floor(k/4)*3-(k%2)}" r="2.6" fill="#ffd54f" stroke="#b8860b"/>`;return r};
  o.push(pile(Math.min(12,l*3)));if(l>=5)o.push(pile(8).replace(/cx="(\d+)"/g,(m,v)=>`cx="${+v+56}"`));
  return o.join("")}};
const BVB={arkan:"44 68 64 128",kaserne:"82 140 76 56",garten:"146 148 70 48",mine:"198 116 76 82",schatz:"356 134 72 62"};
const bThumb=(id,lv)=>{const vb=BVB[id].split(" ").map(Number);return `<svg class="bthumb" viewBox="${BVB[id]}" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><rect x="${vb[0]}" y="192" width="${vb[2]}" height="${vb[1]+vb[3]-192}" style="fill:var(--grass)"/><g ${lv?"":'opacity=".35" style="filter:grayscale(1)"'}>${BV[id](lv||1)}</g></svg>`};
function bldSvg(){const B=S.bld||{},o=["arkan","kaserne","garten","mine","schatz"].filter(id=>B[id]).map(id=>BV[id](B[id]));
 return o.length?`<svg class="bg" viewBox="0 0 600 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true" style="z-index:1">${o.join("")}</svg>`:""}

// ---- Tagesaufträge ----
let QN=[];
const QT=[
 {id:"win",n:x=>t("q.win",x),g:()=>rnd(2,3),e:x=>2*x,f:1},
 {id:"work",n:x=>t("q.work",x),g:()=>2,e:x=>x},
 {id:"craft",ok:()=>has("craft"),n:x=>t("q.craft",x),g:()=>rnd(1,2),e:x=>x},
 {id:"crit",n:x=>t("q.crit",x),g:()=>3,e:()=>0,f:1},
 {id:"skill",n:x=>t("q.skill",x),g:()=>rnd(3,4),e:()=>0,f:1,ok:()=>has("skills")},
 {id:"potion",n:x=>t("q.potion",x),g:()=>1,e:()=>0,f:1},
 {id:"buy",ok:()=>has("craft"),n:x=>t("q.buy",x),g:()=>2,e:()=>0},
 {id:"tower",n:x=>t("q.tower",x),g:()=>rnd(2,3),e:()=>4,f:1,ok:()=>has("tower")},
 {id:"tour",ok:()=>has("tour"),n:x=>t("q.tour",x),g:()=>2,e:()=>4,f:1},
 {id:"dice",ok:()=>has("tavern"),n:x=>t("q.dice",x),g:()=>1,e:()=>0}];
function qRew(){const r=Math.random(),L=lvl();
 if(r<.4)return {g:25+L*6};
 if(r<.75){const k=["ez","le","hk","gp","fb","ak"][rnd(0,5)],n=k==="ak"||k==="fb"?rnd(1,2):rnd(2,3),m={[k]:n};if(L>=8&&Math.random()<.3)m.mi=1;return {m}}
 return {it:[{h:2},{a:1},{k:1},{e:1},{g:1}][rnd(0,4)]}}
const rTxt=r=>r.g?`<i class=coin></i>${r.g}`:r.m?yTxt(r.m):Object.entries(r.it).map(([k,n])=>`${IT.find(x=>x.k===k).e}${n}`).join(" ");
function rGive(r){if(r.g)S.gold+=r.g;if(r.m)for(const k in r.m)S.mat[k]+=r.m[k];if(r.it)for(const k in r.it)S.it[k]+=r.it[k]}
function qGen(){let list;
 for(let t=0;t<40;t++){const pool=QT.filter(q=>!q.ok||q.ok()).sort(()=>Math.random()-.5).slice(0,3);
  list=pool.map(q=>{const goal=q.g();return {id:q.id,goal,p:0,done:false,r:qRew(),e:q.e(goal),f:q.f}});
  const fight=list.filter(q=>q.f),need=list.reduce((a,q)=>a+q.e,0)+(fight.length&&!fight.some(q=>q.e)?2:0);
  if(need<=enMax())break}
 S.q={day:S.day,list:list.map(({e,f,...q})=>q),bonus:false}}
// Auftragstext immer neu aus der Sprachdatei (alte Stände hatten den Text gespeichert)
const qTxt=q=>{const d=QT.find(x=>x.id===q.id);return d?d.n(q.goal):q.txt||""};
function qProg(id,n,l){if(!has("quests")||!S.q||S.q.day!==S.day)return;const out=l||QN;
 for(const q of S.q.list)if(q.id===id&&!q.done){q.p=Math.min(q.goal,q.p+(n||1));if(q.p>=q.goal){q.done=true;rGive(q.r);sfx("coin");out.push(`📜 <b>${t("q.done")}</b> ${qTxt(q)} → ${rTxt(q.r)}`)}}
 if(!S.q.bonus&&S.q.list.every(q=>q.done)){S.q.bonus=true;const L=lvl(),r={g:60+L*10,it:{a:1},m:{}};
  for(let i=0;i<2;i++){const k=["ez","le","hk","gp","fb","ak"][rnd(0,5)];r.m[k]=(r.m[k]||0)+2}if(L>=15&&Math.random()<.3)r.m.ds=1;
  rGive(r);sfx("level");out.push(`🎁 <b>${t("q.allDone")}</b> ${t("q.chest")}: ${rTxt({g:r.g})} ${rTxt({it:r.it})} ${yTxt(r.m)}`)}}
function questCard(){if(!S.q)return "";const L=S.q.list,d=L.filter(q=>q.done).length;
 return `<div class="card"><h3>📜 ${t("q.t")} <span class="mut">(${d}/${L.length})</span></h3>${L.map(q=>`<div class="row"><span>${q.done?"✅":"▫️"} ${qTxt(q)} <span class="mut">${q.p}/${q.goal}</span></span><span class="mut" style="white-space:nowrap">${rTxt(q.r)}</span></div>`).join("")}
 <div class="mut" style="margin-top:6px">🎁 ${t("q.bonus")}: ${S.q.bonus?t("q.got"):t("q.open")}</div></div>`}

// ---- Vollmond-Werwolf ----
const WOLF=loc1("wolf",{hp:2.1,atk:1.05,def:1,tint:"#5d4037",mv:[[1.1,92,"",4],[.9,90,"poison",3],[0,100,"guard",1],[1.7,78,"stun",2]]});
EI.push(...loc("ei",[{id:"mw",s:"w",b:15,c:"#cfd8e6",fx:{crit:.12,life:.08}},{id:"wf",s:"a",b:9,c:"#6d5a4a",fx:{dodge:8,regen:3}}]));
VIS.mw={b:"curved",f:"#e3e9f2",e:"#fff",g:"#9fb4d8",fx:()=>SPARK};
AV.wf=b=>b?`<path class="wv" d="M40 62Q12 96 18 144L50 120Z" fill="#6d5a4a" stroke="#0004"/>`:`<path d="M42 60q5-9 9-1q5-9 10-1q5-9 10-1q5-9 9 1l-4 7H46Z" fill="#8d7b68" stroke="#0004"/>`;
function startMoon(){if(!has("cal")||!isFull(S.day)||S.moonDone===S.day||S.en<3)return;S.en-=3;S.moonDone=S.day;const e=mk(Math.max(2,lvl()),WOLF,true);e.moon=true;setup(e)}
function moonLoot(l){lootGive("moon",lvl(),l);S.it.a++;S.mat.ak+=2;l.push(t("moon.extra"))}
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
 const lvL=[];const evT=ev[1]();levelCheck(lvL);unlCheck(lvL);S.enStart=S.en;qGen();msg=evT;save();
 const facT=t(fac===1?"nt.full":fac?"nt.half":"nt.none",used);
 nightShow(`<h3>🌙 ${t("nt.t",S.day)}</h3>
  ${has("burg")?`<div class="row"><span><b>🏗️ ${t("nt.yield")}</b><br><span class="mut">${had?facT+"<br>"+(lines.join("<br>")||"–"):`${t("nt.noBld")} <a href="#" onclick="nightClose(castleScr);return false" style="color:var(--acc)">${t("nt.build")}</a>`}</span></span></div>`:""}
  <div class="row"><span><b>☀️ ${t("nt.morning")}</b><br>${evT}${lvL.length?"<br>"+lvL.join("<br>"):""}</span></div>
  ${has("cal")?`<div class="row"><span><b>📅 ${wday(S.day)} ${MOONS[moonIx(S.day)]}</b>${dayTags(S.day).map(t=>"<br>"+t).join("")}</span></div>`:""}
  ${has("quests")?`<div class="row"><span><b>📜 ${t("nt.quests")}</b><br>${S.q.list.map(q=>"▫️ "+qTxt(q)+` <span class="mut">(${rTxt(q.r)})</span>`).join("<br>")}</span></div>`:""}`)}
function nightShow(rep){const fast=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches,el=document.createElement("div");el.id="night";el.className="night"+(fast?" fast":"");
 el.innerHTML=`<div class="nsky">${Array.from({length:18},(_,i)=>`<i style="left:${(i*53)%100}%;top:${(i*29)%45}%;animation-delay:${.4+(i%5)*.1}s"></i>`).join("")}<span class="nmoon">🌙</span><span class="nzz">Z z z</span><span class="nsun">☀️</span></div>
 <div class="card nrep" hidden>${rep}<div class="grid"><button class="p" style="grid-column:1/-1" onclick="nightClose(home)">☀️ ${t("nt.go")}</button></div></div>`;
 document.body.appendChild(el);sfx("night");setTimeout(()=>sfx("morning"),fast?50:1900);setTimeout(()=>{const r=el.querySelector(".nrep");if(r){r.hidden=false;say(r.innerText.replace(t("nt.go"),""))}},fast?100:2700)}
function nightClose(go){const el=document.getElementById("night");if(el)el.remove();go()}
