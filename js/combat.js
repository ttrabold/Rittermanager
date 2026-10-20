// Ritter Manager – Kampf: Abenteuer, Turnier, Bosse, Turm, Züge, Sieg und Niederlage
function giveE(id,l){const it=EI.find(x=>x.id===id);if(S.own.includes(id)){S.gold+=100;l.push(t("cb.dupe",it.n));return}S.own.push(id);const k=it.s==="w"?"ew":"ea",cur=it.s==="w"?wBon():aBon(),auto=it.b>cur;if(auto)S[k]=id;l.push(`✨ <b>${t("cb.ench",it.n)}</b> (${it.d})${auto?t("cb.autoEq"):t("cb.eqLater")}`)}
function tourLoot(l){if(!uniqueRoll("tour",lvl(),l))lootGive("tour",lvl(),l)}
function equipE(id){const it=itm(id);if(!it)return;const k=it.s==="w"?"ew":it.s==="a"?"ea":"es";S[k]=S[k]===id?null:id;save();sfx("buff");inv(true)}
function encHit(d,l){const f=F,r=Math.random(),b=fxv("burn");
 if(r<b&&!(f.fx&&f.fx.noburn)){f.eb.burn=2;l.push(t("cb.eBurn"))}
 else if(r<b+fxv("poison")&&!(f.fx&&f.fx.nopois)){f.eb.ps=f.eb.poison>0?Math.min(2,f.eb.ps+1):1;f.eb.poison=3;l.push(t("cb.ePois",false))}
 if(Math.random()<fxv("stun")){f.eb.stun=1;l.push(t("cb.eFrz"))}
 const h=Math.round(d*fxv("life"));if(h>0){const o=f.php;f.php=Math.min(f.pmax,f.php+h);if(f.php>o)l.push(t("cb.bladeLife",f.php-o))}}
const ppFull=()=>eqSk().every(id=>{const s=SKD(id);return s.pp>=99||F.pp[id]>=s.pp});
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
// Gegner: Geschlecht, Ausrüstung je Stufe und – ab Stufe 6 – verzauberte Gegenstände mit echter Wirkung
function mk(L,t,boss){
 const sc=1+.08*S.star,hp=Math.round((40+L*12)*t.hp*sc);
 const e={lvl:L,name:boss?t.n:"",ehp:hp,emax:hp,atk:(3+L*2)*t.atk*sc,def:Math.floor(L*.8*t.def),tier:Math.min(4,Math.floor(L/2)),tint:t.tint||"#6b2d8f",mv:t.mv,boss:!!boss,enr:false,et:t.t||"Boss",bi:boss?BOSS.indexOf(t):-1,tbi:boss?TBOSS.indexOf(t):-1,tr:t.tr||{}};
 if(boss&&t.fx)e.fx=Object.assign({},t.fx);
 if(!boss){const fem=Math.random()<.4,bt=e.tier,light=t.t==="Räuber"||t.t==="Bogenschütze";
  let at=clamp(bt-rnd(0,2),0,light?2:4);if(t.t==="Panzerritter")at=Math.max(at,Math.min(4,bt));
  const CATS={Ritter:["schwert","schwert","helle","axt"],Räuber:["dolch","axt","keule"],Feuerritter:["schwert","axt"],Panzerritter:["keule","helle"],Bogenschütze:["bogen"],Magier:["stab"]}[t.t]||["schwert"],wcat=CATS[rnd(0,CATS.length-1)];
  const p=L<6?0:L<12?.4:L<20?.7:1,pick=(s,f)=>{const pool=EI.filter(x=>x.s===s&&x.b<=4+L*1.5&&(!f||f(x)));return pool.length&&Math.random()<p?pool[rnd(0,pool.length-1)]:null},wi=pick("w",x=>(x.cat||"schwert")===wcat),ai=t.t==="Magier"?null:pick("a");
  e.name=`${fem?t.f:t.n} ${ENS[rnd(0,ENS.length-1)]}`;
  e.look={wt:clamp(bt-rnd(0,2),0,4),at:t.t==="Magier"?0:at,sh:t.t==="Magier"||["bogen","helle","stab"].includes(wcat)?0:clamp(Math.floor(L/3)-rnd(0,1),0,light?1:3),fem,wi:wi&&wi.id,ai:ai&&ai.id,wc:wi&&wi.c,ac:ai&&ai.c,wcat,robe:t.t==="Magier"?(fem?"#4a148c":"#311b92"):null};
  e.fx={};for(const it of[wi,ai])if(it)for(const k in it.fx)e.fx[k]=(e.fx[k]||0)+it.fx[k];
  if(e.fx.hp){const b=Math.round(e.fx.hp*(1+L/25));e.ehp+=b;e.emax+=b}
  if(wi||ai)e.intro=tr("cb.wears",e.name,[wi,ai].filter(Boolean).map(x=>"<b>"+x.n+"</b>"))+"<br>"}
 return e;
}
const enemyKn=f=>f.look?knight(f.look.wt,f.look.at,f.look.sh,true,f.tint,f.look.wc,f.look.ac,f.look.wi,f.look.ai,f.look.fem,f.look.robe,f.look.wcat):knight(f.tier,f.tier,Math.min(3,Math.floor(f.lvl/3)),true,f.tint);
function setup(e,tour,keep){
 F=Object.assign({php:keep?keep.php:maxhp(),pmax:maxhp(),menu:"main",anim:"",dmg:"",hE:0,hP:0,lP:0,lE:0,vfx:[],over:false,next:false,tour:tour||0,pp:keep?keep.pp:null,ts:tbState(),uq:uqNew(),pb:{buff:0,guard:0,poison:0,burn:0,stun:0,regen:0},eb:{bleed:0,burn:0,poison:0,ps:0,stun:0,guard:0,weak:0},log:(e.tower?towerIntro(e.tower):"")+(e.boss&&e.bi>=0&&!e.tower?`📜 <i>${LORE[e.bi][0]}</i><br>`:"")+(e.intro||"")+((S.buffs||[]).length?`✨ ${t("cb.active")}: ${S.buffs.map(b=>bname(b)+" ("+b.n+")").join(", ")}<br>`:"")+(e.moon?`🌕 <i>${t("cb.howl")}</i><br>`:"")+(ttn()?t("cb.enters",S.name+" "+ttn())+"<br>":"")+(e.boss?t("cb.bossIn",e.name):t("cb.foeIn"))},e);
 if(!F.pp){F.pp={};SK.forEach(s=>F.pp[s.id]=s.pp)}
 if(e.boss&&e.bi>=0&&!e.tower&&S.merc){F.merc=1;S.merc=0;F.log+="<br>🗡️ "+t("cb.mercIn")}
 tbStart(F);uStart(F);bSeen(F);save();fight();
}
function startFight(){if(S.en<2)return;S.en-=2;if(evMaybe())return;setup(mk(Math.max(1,lvl()+rnd(-1,1)),ET[rnd(0,ET.length-1)]))}
function startTour(){const fee=tourFee();if(bagFull()||S.en<4||S.gold<fee)return;S.en-=4;S.gold-=fee;setup(mk(Math.max(1,lvl()),ET[rnd(0,ET.length-1)]),1)}
function startTower(){if(bagFull()||!S.tunl||S.en<4)return;S.en-=4;towerFloor(S.tcur||1)}
function towerFloor(n,keep){if(n>1&&(n-1)%5===0)setTimeout(()=>sfx("gong"),300);let e;if(n%5===0){const {i,c}=tbossAt(n),bs=TBOSS[i];e=mk(bs.L+Math.floor(n/3)+10*c,bs,true);e.cyc=c;if(c)e.name=t("tw.shadow",e.name)}else e=mk(lvl()+Math.floor(n/2),ET[rnd(0,ET.length-1)]);e.tower=n;setup(e,0,keep)}
function nextTour(){if(F.tower)return towerFloor(F.tower+1,{php:Math.min(F.pmax,F.php+Math.round(F.pmax*.2)),pp:F.pp});const k={php:Math.min(F.pmax,F.php+Math.round(F.pmax*.3)),pp:F.pp},r=F.tour+1;setup(mk(Math.max(1,lvl()+r-1),ET[rnd(0,ET.length-1)]),r,k)}
function startBoss(){const b=BOSS[S.boss];if(bagFull()||!b||S.en<3||S.ruhm<b.req)return;S.en-=3;setup(mk(b.L,b,true))}
function leaveTower(){F.over=true;msg=t("tw.leave",S.tcur,S.tbest);save();home()}
function fmenu(m){F.menu=m;Object.assign(F,{anim:"",dmg:"",hE:0,hP:0,lP:0,lE:0,vfx:[]});fight()}
function fight(){if(QUICK)return;
 const f=F;if(!f.over)musicSet(f.boss?"boss":f.tour?"tour":f.tower?"tower":"battle");const ic=(o,m)=>Object.keys(m).filter(k=>o[k]>0).map(k=>m[k]).join("");
 let ui;
 if(f.over)ui=f.next?`<button class="p" style="grid-column:1/-1" onclick="nextTour()">${t("cb.next")} ⚔️</button>${f.tower?`<button style="grid-column:1/-1" onclick="leaveTower()">🏰 ${t("tw.leaveB")}</button>`:""}`:f.epi?`<button class="p" style="grid-column:1/-1" onclick="epilogScr()">📜 ${t("cb.epi")}</button>`:`<button class="p" style="grid-column:1/-1" onclick="home()">${t("c.backH")}</button>`;
 else if(f.menu==="skills")ui=eqSk().map((id,ix)=>{const s=SKD(id),pp=f.pp[id],sl=tbSealed(id);return `<button ${pp<1||sl?"disabled":""} onclick="useSkill('${id}')"><span class="mut" style="font-size:11px">${ix+1}</span> ${sl?"🔒 ":""}${s.n}<small>${s.pp<99?pp+"/"+s.pp+"× · ":""}${s.d}</small></button>`}).join("")+`<button onclick="fmenu('main')">${t("c.backB")}</button>`;
 else if(f.menu==="items")ui=IT.map(x=>`<button ${S.it[x.k]<1||((x.k==="a"||x.k==="A")&&ppFull())?"disabled":""} onclick="useItem('${x.k}')">${x.e} ${x.n} ×${S.it[x.k]}<small>${x.d}</small></button>`).join("")+`<button onclick="fmenu('main')">${t("c.backB")}</button>`;
 else ui=`<button class="p" onclick="fmenu('skills')">⚔️ ${t("cb.fight")}<small>${t("cb.key","K")}</small></button><button onclick="fmenu('items')">🎒 ${t("inv.pot")}<small>${t("cb.key","T")}</small></button>${canQuick()?`<button style="grid-column:1/-1" onclick="quickFight()">⚡ ${t("cb.quick")}<small>${t("cb.quickS")}</small></button>`:""}${f.tower?`<button onclick="leaveTower()" style="grid-column:1/-1">🏳️ ${t("tw.leaveB")}</button>`:f.boss||f.tour?"":`<button onclick="flee()" style="grid-column:1/-1">🏃 ${t("cb.flee")}</button>`}`;
 const dm=(w)=>{const v=w==="e"?f.hE:f.hP;return v?`<span class="dmg ${w==="p"?"late":""}" style="left:30px">-${v}</span>`:""};
 app.innerHTML=`<div class="scene fs">${f.tower?(f.tower>100?TBG(ttier(f.tower)).replace(/<\/svg>$/,'<rect class="shade" width="600" height="220" fill="#000" opacity=".4"/></svg>'):TBG(ttier(f.tower))):BG}
 <div class="box eb"><b>${f.name}</b> <span class="mut">${t("cb.lv")}${f.lvl}${f.tour?" · "+t("hg.tour")+" "+f.tour+"/3":""}${f.tower?" · "+t("tw.floor")+" "+f.tower:""}${f.boss?" · "+t("cb.boss"):""}</span> ${ic(f.eb,{bleed:"🩸",burn:"🔥",poison:"☠️",stun:"💫",guard:"🛡️",weak:"😨"})}${f.ts.arm?"⚡":""}${f.ts.rf?"🪞":""}${tbMi(f)?` 🐾×${tbMi(f)} <small class="mut">(${f.ts.mi.filter(h=>h>0).join("/")})</small>`:""}${bar(f.ehp,f.emax,"#c0392b")}<span class="mut">${Math.max(0,f.ehp)}/${f.emax}</span></div>
 <div class="es ${f.boss?"big":""} ${f.hE?"hit":""}">${dm("e")}<div class="lg ${f.lE?"lungeE":""}"><div class="kw ${f.ko==="e"?(f.boss?"koB":"koE"):f.ko==="p"?"cheerE":""}">${f.moon?wolfSvg():f.mimic?mimicSvg():f.tbi>=0?(f.cyc?`<div style="filter:brightness(.55) saturate(1.4)">${tbossSvg(f.tbi,f.ts&&f.ts.ph)}</div>`:tbossSvg(f.tbi,f.ts&&f.ts.ph)):f.boss&&f.bi>=0?bossSvg(f.bi):enemyKn(f)}</div></div></div>
 <div class="ps ${f.hP?"hit late":""}">${dm("p")}<div class="lg ${f.lP?"lungeP":""}"><div class="kw ${f.ko==="p"?"koP":f.ko==="e"?"cheer":""}">${pk()}</div></div>${S.cmp?`<div class="fcmp">${compSvg(S.cmp,44)}</div>`:""}</div>
 <div class="box pb"><b>${S.name}</b> <span class="mut">${t("cb.lv")}${lvl()}</span>${tl()} ${ic(f.pb,{buff:"💥",guard:"🛡️",poison:"☠️",burn:"🔥",stun:"💫",regen:"💗"})}${bar(f.php,f.pmax,"#2e8b57")}<span class="mut">${Math.max(0,f.php)}/${f.pmax}</span></div>${VXH(f)}</div>
 <div class="msg">${f.log}</div><div class="grid">${ui}</div>`;
}
// Kampftext: eine Zeile pro Aktion, Schaden rot, Heilung grün
const fmtLine=x=>x.replace(t("cb.reDmg"),'<b class="dn">$1</b>$2').replace(t("cb.reHeal"),'$1 <b class="hn">$2</b>');
function fin(l){F.log=l.map(x=>`<div class="ll">${fmtLine(x)}</div>`).join("");F.menu="main";if(!QUICK)fight()}
function useSkill(id){
 const f=F,s=SKD(id);if(!s||!eqSk().includes(id)||tbSealed(id))return;const l=[t("cb.uses",S.name,s.n)];uMorphCheck(f,l);
 if(s.pp<99){if(f.pp[id]<1)return;f.pp[id]--}
 if(id!=="hieb")qProg("skill",1,l);
 f.anim="";f.dmg="";f.hE=0;f.hP=0;f.lP=s.pw>0?1:0;f.lE=0;f.vfx=[];
 const wk=wcat();
 if(Math.random()*100>=s.acc+(s.pw>0?(wk.acc||0):0)){l.push(t("cb.miss"));sfx("miss");f.vfx.push(["miss","vE",0])}
 else if(s.pw>0&&f.fx&&Math.random()*100<(f.fx.dodge||0)){l.push(t("cb.eDodge",f.name));sfx("miss");f.vfx.push(["dodge","vE",0])}
 else{f.vfx.push([s.vx||"slash",s.self?"vP":"vE",0]);
  if(s.pw>0){
   const hits=s.hits||1,pierce=s.fx==="pierce"||uHas("pierce"),hs=[];let pw=s.pw,tot=0,anyCrit=false;
   if(s.fx==="exec"&&f.ehp<f.emax*.35){pw*=2.5;l.push(t("cb.exec"))}
   pw*=wk.dmg||1;if(wk.reach&&f.ehp>f.emax*.7){pw*=1+wk.reach;l.push("🔱 "+t("cb.reach"))}
   const hitsN=hits+(wk.dbl&&Math.random()<wk.dbl?1:0);if(hitsN>hits)l.push("🔪 "+t("cb.dbl"));
   for(let h=0;h<hitsN;h++){let d=(5+Math.floor((wk.magic?(S.st+S.ge)*.65:S.st*1.3))+wBon())*(h>=hits?.5:1)*pw*(f.pb.buff>0?1.5:1)*(1+.1*S.star)*(1+buffV("dmg")+.1*blessV("dmg"))*uDmgMul(f)+rnd(0,3);
    const crit=s.crit||Math.random()<Math.min(.6,S.ge*.03+fxv("crit")+buffV("crit")+compV("crit")+(wk.crit||0)+uCritB(f));if(crit){d*=1.5;S.crits++;anyCrit=true;qProg("crit",1,l)}
    if(f.eb.guard&&!pierce)d*=.5;const hd=Math.max(1,Math.round(d-(pierce?0:f.def*(1-(wk.armor||0)))));hs.push(hd);tot+=hd}
   f.anim="e";f.dmg=tot;f.hE=tot;sfx(anyCrit?"crit":"hit");
   if(wk.bleed&&Math.random()<wk.bleed&&!f.eb.bleed){f.eb.bleed=3;l.push("🪓 "+t("cb.axe"))}if(wk.stun&&Math.random()<wk.stun){f.eb.stun=1;l.push("🔨 "+t("cb.club"))}
   l.push((anyCrit?t("cb.crit")+" ":"")+(hitsN>1?t("cb.hits",hitsN,tot):t("cb.dmg",tot))+(pierce?" "+t("cb.pierce"):""));f.ehp-=tbHits(f,hs,l);encHit(tot,l);uOnHit(f,tot,anyCrit,l);
   if(s.life){const o=f.php;f.php=Math.min(f.pmax,f.php+Math.round(tot*s.life));if(f.php>o)l.push(t("cb.life",f.php-o))}
  }
  if(s.fx==="stun"&&Math.random()<(s.ch||.4)){f.eb.stun=1;l.push(t("cb.eStun"))}
  if(s.fx==="bleed"){f.eb.bleed=3;l.push(t("cb.eBleed"))}
  if(s.fx==="poison"&&f.fx&&f.fx.nopois)l.push(t("tb.noPois",f.name));else if(s.fx==="poison"){f.eb.ps=f.eb.poison>0?Math.min(2,f.eb.ps+1):1;f.eb.poison=3;l.push(t("cb.ePois",f.eb.ps>1))}
  if(s.fx==="burn"){if(f.fx&&f.fx.noburn)l.push(t("cb.eNoBurn"));else{f.eb.burn=2;l.push(t("cb.eBurn"))}}
  if(s.fx==="weak"){f.eb.weak=3;sfx("buff");l.push(t("cb.eWeak"))}
  if(s.fx==="heal"){const o=f.php;f.php=Math.min(f.pmax,f.php+Math.round(f.pmax*.35));l.push(t("cb.heal",f.php-o));sfx("heal")}
  if(s.fx==="cleanse"){f.pb.poison=0;f.pb.burn=0;tbUnseal(f,l);const o=f.php;f.php=Math.min(f.pmax,f.php+Math.round(f.pmax*.15));l.push(t("cb.cleanse",f.php-o));sfx("heal")}
  if(s.fx==="regen"){f.pb.regen=4;sfx("heal");l.push(t("cb.regen"))}
  if(s.fx==="buff"){sfx("buff");f.pb.buff=3;l.push(t("cb.buff"))}
  if(s.fx==="guard"){sfx("buff");f.pb.guard=3;l.push(t("cb.guard"))}
 }
 enemyTurn(l);
}
function useItem(k){
 const f=F;if(S.it[k]<1)return;S.it[k]--;const it=IT.find(x=>x.k===k),l=[t("cb.useIt",it.n)];qProg("potion",1,l);sfx(k==="k"||k==="e"?"buff":"heal");save();f.anim="";f.dmg="";f.hE=0;f.hP=0;f.lP=0;f.lE=0;f.vfx=[[k==="k"?"roar":k==="e"?"guard":"heal","vP",0]];
 if(k==="h"||k==="H"||k==="x"){const h=k==="h"?40:k==="x"?200:100,b=f.php;f.php=Math.min(f.pmax,f.php+h);l.push(t("cb.heal",f.php-b))}
 if(k==="k"){f.pb.buff=3;l.push(t("cb.buff3"))}
 if(k==="g"){f.pb.poison=0;f.pb.burn=0;tbUnseal(f,l);l.push(t("cb.cure"))}
 if(k==="e"){f.pb.guard=3;l.push(t("cb.iron"))}
 if(k==="a"||k==="A"){let n=0;eqSk().forEach(id=>{const mx=SKD(id).pp;if(mx>=99)return;const o=f.pp[id];f.pp[id]=k==="A"?mx:Math.min(mx,o+3);n+=f.pp[id]-o});l.push(t("cb.ether",n))}
 enemyTurn(l);
}
function flee(){const l=[];Object.assign(F,{hE:0,hP:0,lP:0,lE:0,vfx:[]});if(F.boss||F.tour||F.tower){F.log=t("cb.noFlee");return fight()}if(Math.random()<Math.min(.9,.5+S.ge*.03)){F.over=true;l.push(t("cb.fled"));msg=t("cb.fledM");save();return fin(l)}l.push(t("cb.fleeFail"));enemyTurn(l)}
function enemyAct(l,fm){
 const f=F;
 if(f.eb.stun){f.eb.stun=0;l.push(t("cb.eSkip",f.name));return}
 const tot=f.mv.reduce((a,m)=>a+m[4],0);let r=Math.random()*tot,m=fm||f.mv[0];
 if(!fm)for(const x of f.mv){if(r<x[4]){m=x;break}r-=x[4]}
 l.push(t("cb.uses",f.name,m[0]));if(m[3]!=="guard")f.lE=1;
 if(m[3]==="guard"){f.vfx.push(["guard","vE",1]);f.eb.guard=1;l.push(t("cb.eGuard"))}
 else if(Math.random()*100>=Math.max(25,m[2]-S.ge-fxv("dodge"))){l.push(t("cb.dodge"));sfx("miss");f.vfx.push(["dodge","vP",1])}
 else{
  let d=(f.atk+rnd(0,3))*m[1]*(f.eb.weak>0?.7:1)-aBon()-sBon();if(f.pb.guard>0)d*=m[3]==="charge"?.25:.5;d=Math.max(1,Math.round(d));const fx=f.fx||{},ec=Math.random()<(fx.crit||0);if(ec)d=Math.round(d*1.5);f.took=1;f.php-=d;f.anim="p";f.dmg=d;f.hP=d;sfx("hurt");f.vfx.push(["slash","vP",1]);if(m[1]>=1.5)f.vfx.push(["flash","vP",1]);l.push((ec?t("cb.crit")+" ":"")+t("cb.took",d));
  if(Math.random()<(fx.burn||0)&&!fxv("noburn")){f.pb.burn=3;f.vfx.push(["fire","vP",1]);l.push(t("cb.wBurn"))}
  if(Math.random()<(fx.poison||0)){f.pb.poison=4;l.push(t("cb.wPois"))}
  if(Math.random()<(fx.stun||0)*.6){f.pb.stun=1;f.vfx.push(["stun","vP",1]);l.push(t("cb.wStun"))}
  if(fx.life){const o=f.ehp;f.ehp=Math.min(f.emax,f.ehp+Math.round(d*fx.life));if(f.ehp>o)l.push(t("cb.eLife",f.name,f.ehp-o))}
  if(m[3]==="poison"){f.pb.poison=4;sfx("poison");f.vfx.push(["poison","vP",1]);l.push(t("cb.pPois"))}
  if(m[3]==="burn"&&!fxv("noburn")){f.vfx.push(["fire","vP",1]);f.pb.burn=3;l.push(t("cb.pBurn"))}
  if(m[3]==="stun"&&Math.random()<.5){f.vfx.push(["stun","vP",1]);f.pb.stun=1;l.push(t("cb.pStun"))}
  if(f.tr&&f.tr.seal)tbSeal(f,l);
 }
}
function enemyTurn(l){
 const f=F;
 if(f.ehp<=0&&!tbRevive(f,l))return endFight(true,l);
 f.eb.guard=0;tbTick(f);uTurnStart(f,l);
 for(const[k,d,e]of[["bleed",4+f.lvl,"🩸"],["burn",6+f.lvl,"🔥"],["poison",(4+f.lvl)*Math.max(1,f.eb.ps),"☠️"]])if(f.eb[k]>0){f.ehp-=d;f.eb[k]--;if(k==="poison"&&!f.eb.poison)f.eb.ps=0;l.push(t("cb.dot."+k,f.name,d)+" "+e);if(f.ehp<=0&&!tbRevive(f,l))return endFight(true,l)}
 compTurn(f,l);mercTurn(f,l);if(f.ehp<=0&&!tbRevive(f,l))return endFight(true,l);
 tbPre(f,l);
 if(f.fx&&f.fx.regen&&f.ehp<f.emax){const o=f.ehp;f.ehp=Math.min(f.emax,f.ehp+Math.round(f.fx.regen*(1+f.lvl/20)));l.push(t("cb.eRegen",f.name,f.ehp-o))}
 if(f.boss&&!f.enr&&!(f.tr&&f.tr.phase)&&f.ehp<f.emax/2){f.enr=true;f.atk*=1.3;l.push(t("cb.rage",f.name))}
 const p0=f.php;if(uTime(f,l)){}else if(!tbAct(f,l))enemyAct(l);
 uMirror(f,p0-f.php,l);
 const rg=fxv("regen");if(rg&&f.php<f.pmax){f.php=Math.min(f.pmax,f.php+rg);l.push(t("cb.armRegen",rg))}
 if(f.pb.poison>0){const d=2+Math.floor(f.lvl/2);f.took=1;f.php-=d;f.pb.poison--;l.push(t("cb.pPoisT",d))}
 if(f.pb.burn>0){const d=4+f.lvl;f.took=1;f.php-=d;f.pb.burn--;l.push(t("cb.pBurnT",d))}
 if(f.pb.regen>0){const o=f.php;f.php=Math.min(f.pmax,f.php+Math.round(f.pmax*.08));f.pb.regen--;if(f.php>o)l.push(t("cb.breath",f.php-o))}
 compRescue(f,l);if(f.eb.weak>0)f.eb.weak--;if(f.pb.buff>0)f.pb.buff--;if(f.pb.guard>0)f.pb.guard--;
 if(f.php<=0&&!uPhoenix(f,l))return endFight(false,l);
 if(f.ehp<=0&&!tbRevive(f,l))return endFight(true,l);
 uMorphCheck(f,l);
 if(f.pb.stun){f.pb.stun=0;l.push(t("cb.pSkip"));enemyAct(l);if(f.php<=0&&!uPhoenix(f,l))return endFight(false,l)}
 fin(l);
}
function endFight(win,l){
 const f=F;f.over=true;AU.want=null;musicStop();f.ko=win?"e":"p";f.vfx.push(win?[f.boss?"bko":"ko","vE",0]:["ko","vP",1]);
 setTimeout(()=>sfx(win&&f.boss?"boom":"fall"),win?850:1850);setTimeout(()=>sfx(win?"win":"lose"),win?(f.boss?2100:1500):2600);
 if(win){
  const m=f.boss?3:1,sm=1+.1*S.star,r=(10+f.lvl*6)*m,g=Math.round((15+f.lvl*6)*m*sm*(1+.15*blessV("gold")+buffV("gold"))),x=Math.round((15+f.lvl*10)*m*sm);
  S.ruhm+=r;S.gold+=g;S.exp+=x;S.wins++;if(f.php<=5)S.close++;if(!f.took)S.flawless++;l.push(t("cb.win",r,g,x));
  bWin(f);if(f.evGold){S.gold+=f.evGold;l.push(t("cb.evGold",f.evGold))}if(f.honor){S.ruhm+=r;l.push("🤺 "+t("cb.honor",r))}
  if(f.moon){moonLoot(l);msg=t("cb.moonM")}
  else if(f.mimic){S.it.h+=2;S.mat.ak+=1;l.push(t("cb.mimicL"));uniqueRoll("mimic",lvl(),l);msg=t("cb.mimicM")}
  else if(f.rival){}
  else if(f.boss&&!f.tower){S.boss++;if(!S.bk.includes(S.boss-1))S.bk.push(S.boss-1);if(S.boss>=3)S.tunl=1;const uq=uniqueRoll("boss",BOSS[S.boss-1].L,l);for(let i=0;i<(uq?1:2);i++)lootGive("boss",BOSS[S.boss-1].L,l);S.it.H++;S.it.g++;l.push(t("cb.bossL"));if(LORE[S.boss-1])l.push(`📜 <i>${LORE[S.boss-1][1]}</i>`);msg=t("cb.bossM",f.name);if(S.boss>=BOSS.length&&!S.epi)f.epi=1}
  else{if(Math.random()<.3){S.it.h++;l.push(t("cb.findH"))}msg=t("cb.beat",f.name)}
  dropMat(f,l);qProg("win",1,l);if(f.tower)qProg("tower",1,l);if(f.tour)qProg("tour",1,l);
  if(f.tower){S.tbest=Math.max(S.tbest,f.tower);S.tcur=f.tower+1;f.next=true;l.push(t("tw.done",f.tower));if(Math.random()<.25){S.it.a++;l.push(t("tw.ether"))}if(f.tower%5===0&&!uniqueRoll("towerboss",lvl()+Math.floor(f.tower/10),l))lootGive(f.tower%10===0?"tower10":"tower",lvl()+Math.floor(f.tower/10),l,f.tower);if(f.tower%10===0){S.it.A++;l.push(t("tw.ether2"))}}
  if(f.tour){if(f.tour<3){f.next=true;l.push(t("to.round",f.tour))}else{S.troph++;tourLoot(l);S.gold+=100;S.exp+=50;S.ruhm+=30;l.push(t("to.win"));if(isTourDay(S.day)){S.gold+=100;S.exp+=50;S.ruhm+=30;tourLoot(l);l.push(t("to.day"))}msg=t("to.winM")}}
 }else{const x=Math.floor(S.gold*.1);S.gold-=x;S.ruhm=Math.max(0,S.ruhm-5);S.exp+=5;S.losses++;if(f.tower){hallAdd(f.tower-1);S.tcur=1}l.push(t("cb.lose",x));msg=f.tower?t("tw.lost",S.tbest):f.tour?t("to.out"):t("cb.loseM")}
 if(f.rival)rivalEnd(f,win,l);buffTick();
 levelCheck(l);unlCheck(l);
 checkTitles(l);save();fin(l);
}

// Stufenaufstieg (auch wenn EP außerhalb von Kämpfen kommen): Werte steigen, neue Fähigkeiten werden – wenn Platz ist – angelegt
function levelCheck(l){const nl=lvl(),old=S.lvl0||nl;if(nl<=old){S.lvl0=nl;return}S.lvl0=nl;const n=nl-old;S.st+=n;S.au+=n;S.ge+=n;setTimeout(()=>sfx("level"),1500);
 l.push(t("lv.up",nl),t("lv.stats",n));
 SK.filter(s=>s.lv>old&&s.lv<=nl&&s.id!=="hieb").forEach(s=>{const sk=S.sk=S.sk||[];if(sk.length<skMax()&&!sk.includes(s.id)){sk.push(s.id);l.push(t("lv.skEq",s.n))}else l.push(t("lv.sk",s.n))})}

// ---- Schnellkampf: löst normale Kämpfe automatisch (Grundangriff, Heiltränke bei Not) ----
let QUICK=false;
const canQuick=()=>F&&!F.over&&!F.boss&&!F.rival&&!F.mimic;
function quickFight(){if(!canQuick())return;QUICK=true;let r=0,pots=0,stop="";
 try{while(!F.over&&r<200){r++;
  if(F.php<F.pmax*.3){const k=["h","H","x"].find(k=>S.it[k]>0&&(k!=="x"||F.php<F.pmax*.2));if(k){useItem(k);pots++;continue}if(F.php<F.pmax*.2){stop=t("cb.qStop");break}}
  useSkill("hieb")}}finally{QUICK=false}
 const sum=`<div class="ll">⚡ <b>${t("cb.quick")}:</b> ${t("cb.qSum",r,pots)}</div>`;
 F.log=sum+(stop?`<div class="ll">⚠️ ${stop}</div>`:"")+F.log;F.menu="main";fight()}
// Tastenkürzel im Kampf: 1–7 Fähigkeiten, T Tränke, S Schnellkampf, Esc zurück, Enter weiter
document.addEventListener("keydown",e=>{if(!F||(e.target.closest&&e.target.closest("input,textarea"))||!document.querySelector(".fs"))return;const k=e.key.toLowerCase();
 if(F.over){if(k==="enter"){const b=document.querySelector('.grid button.p');if(b)b.click()}return}
 if(/^[1-9]$/.test(k)){const id=eqSk()[+k-1];if(id&&F.pp[id]>0){e.preventDefault();useSkill(id)}}
 else if(k==="t")fmenu("items");else if(k==="f"||k==="k")fmenu("skills");else if(k==="escape")fmenu("main");else if(k==="s"&&canQuick())quickFight()});
