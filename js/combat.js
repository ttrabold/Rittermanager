// Ritter Manager – Kampf: Abenteuer, Turnier, Bosse, Turm, Züge, Sieg und Niederlage
function giveE(id,l){const it=EI.find(x=>x.id===id);if(S.own.includes(id)){S.gold+=100;l.push(`Du besitzt ${it.n} schon: +100 Gold.`);return}S.own.push(id);const k=it.s==="w"?"ew":"ea",cur=it.s==="w"?wBon():aBon(),auto=it.b>cur;if(auto)S[k]=id;l.push(`✨ <b>Verzauberte Beute: ${it.n}</b> (${it.d})${auto?" – angelegt!":" – in der Schmiede anlegbar."}`)}
function tourLoot(l){const p=["fl","fz","sb","mo","wp","wm"].filter(id=>!S.own.includes(id));if(p.length)giveE(p[rnd(0,p.length-1)],l);else{S.gold+=150;l.push("Alle Turnierschätze besitzt du schon: +150 Gold!")}}
function towerLoot(l){const p=["t1","t2","t3","t4"].filter(id=>!S.own.includes(id));if(p.length)giveE(p[rnd(0,p.length-1)],l);else{S.gold+=300;l.push("Alle Turmschätze besitzt du schon: +300 Gold!")}}
function equipE(id){const it=EI.find(x=>x.id===id),k=it.s==="w"?"ew":"ea";S[k]=S[k]===id?null:id;save();sfx("buff");inv()}
function encHit(d,l){const f=F,r=Math.random(),b=fxv("burn");
 if(r<b&&!(f.fx&&f.fx.noburn)){f.eb.burn=2;l.push("Der Gegner geht in Flammen auf! 🔥")}
 else if(r<b+fxv("poison")){f.eb.ps=f.eb.poison>0?Math.min(2,f.eb.ps+1):1;f.eb.poison=3;l.push("Der Gegner ist vergiftet! ☠️")}
 if(Math.random()<fxv("stun")){f.eb.stun=1;l.push("Der Gegner erstarrt! ❄️")}
 const h=Math.round(d*fxv("life"));if(h>0){const o=f.php;f.php=Math.min(f.pmax,f.php+h);if(f.php>o)l.push(`Die Klinge saugt ${f.php-o} LP auf. 💚`)}}
const ppFull=()=>eqSk().every(id=>{const s=SKD(id);return s.pp>=99||F.pp[id]>=s.pp});
const FEMT={Magier:"Magierin",Ritter:"Ritterin",Räuber:"Räuberin",Feuerritter:"Feuerritterin",Panzerritter:"Panzerritterin",Bogenschütze:"Bogenschützin"};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
// Gegner: Geschlecht, Ausrüstung je Stufe und – ab Stufe 6 – verzauberte Gegenstände mit echter Wirkung
function mk(L,t,boss){
 const sc=1+.08*S.star,hp=Math.round((40+L*12)*t.hp*sc);
 const e={lvl:L,name:boss?t.n:"",ehp:hp,emax:hp,atk:(3+L*2)*t.atk*sc,def:Math.floor(L*.8*t.def),tier:Math.min(4,Math.floor(L/2)),tint:t.tint||"#6b2d8f",mv:t.mv,boss:!!boss,enr:false,et:t.t||"Boss",bi:boss?BOSS.indexOf(t):-1};
 if(!boss){const fem=Math.random()<.4,bt=e.tier,light=t.t==="Räuber"||t.t==="Bogenschütze";
  let at=clamp(bt-rnd(0,2),0,light?2:4);if(t.t==="Panzerritter")at=Math.max(at,Math.min(4,bt));
  const CATS={Ritter:["schwert","schwert","helle","axt"],Räuber:["dolch","axt","keule"],Feuerritter:["schwert","axt"],Panzerritter:["keule","helle"],Bogenschütze:["bogen"],Magier:["stab"]}[t.t]||["schwert"],wcat=CATS[rnd(0,CATS.length-1)];
  const p=L<6?0:L<12?.4:L<20?.7:1,pick=(s,f)=>{const pool=EI.filter(x=>x.s===s&&x.b<=4+L*1.5&&(!f||f(x)));return pool.length&&Math.random()<p?pool[rnd(0,pool.length-1)]:null},wi=pick("w",x=>(x.cat||"schwert")===wcat),ai=t.t==="Magier"?null:pick("a");
  e.name=`${fem?FEMT[t.t]:t.t} ${ENS[rnd(0,ENS.length-1)]}`;
  e.look={wt:clamp(bt-rnd(0,2),0,4),at:t.t==="Magier"?0:at,sh:t.t==="Magier"||["bogen","helle","stab"].includes(wcat)?0:clamp(Math.floor(L/3)-rnd(0,1),0,light?1:3),fem,wi:wi&&wi.id,ai:ai&&ai.id,wc:wi&&wi.c,ac:ai&&ai.c,wcat,robe:t.t==="Magier"?(fem?"#4a148c":"#311b92"):null};
  e.fx={};for(const it of[wi,ai])if(it)for(const k in it.fx)e.fx[k]=(e.fx[k]||0)+it.fx[k];
  if(e.fx.hp){const b=Math.round(e.fx.hp*(1+L/25));e.ehp+=b;e.emax+=b}
  if(wi||ai)e.intro=`${e.name} trägt ${[wi,ai].filter(Boolean).map(x=>"<b>"+x.n+"</b>").join(" und ")}! ✨<br>`}
 return e;
}
const enemyKn=f=>f.look?knight(f.look.wt,f.look.at,f.look.sh,true,f.tint,f.look.wc,f.look.ac,f.look.wi,f.look.ai,f.look.fem,f.look.robe,f.look.wcat):knight(f.tier,f.tier,Math.min(3,Math.floor(f.lvl/3)),true,f.tint);
function setup(e,tour,keep){
 F=Object.assign({php:keep?keep.php:maxhp(),pmax:maxhp(),menu:"main",anim:"",dmg:"",hE:0,hP:0,lP:0,lE:0,vfx:[],over:false,next:false,tour:tour||0,pp:keep?keep.pp:null,pb:{buff:0,guard:0,poison:0,burn:0,stun:0,regen:0},eb:{bleed:0,burn:0,poison:0,ps:0,stun:0,guard:0,weak:0},log:(e.tower?towerIntro(e.tower):"")+(e.boss&&e.bi>=0&&!e.tower?`📜 <i>${LORE[e.bi][0]}</i><br>`:"")+(e.intro||"")+((S.buffs||[]).length?`✨ Aktiv: ${S.buffs.map(b=>b.name+" ("+b.n+")").join(", ")}<br>`:"")+(e.moon?"🌕 <i>Ein Heulen zerreißt die Nacht …</i><br>":"")+(ttn()?`<b>${S.name} ${ttn()}</b> tritt an!<br>`:"")+(e.boss?`${e.name} versperrt dir den Weg! Das wird ein harter Kampf.`:"Ein fremder Gegner fordert dich heraus! Was tust du?")},e);
 if(!F.pp){F.pp={};SK.forEach(s=>F.pp[s.id]=s.pp)}
 if(e.boss&&e.bi>=0&&!e.tower&&S.merc){F.merc=1;S.merc=0;F.log+="<br>🗡️ Dein Söldner zieht mit dir in den Kampf!"}
 bSeen(F);save();fight();
}
function startFight(){if(S.en<2)return;S.en-=2;if(evMaybe())return;setup(mk(Math.max(1,lvl()+rnd(-1,1)),ET[rnd(0,ET.length-1)]))}
function startTour(){const fee=tourFee();if(S.en<4||S.gold<fee)return;S.en-=4;S.gold-=fee;setup(mk(Math.max(1,lvl()),ET[rnd(0,ET.length-1)]),1)}
function startTower(){if(!S.tunl||S.en<4)return;S.en-=4;towerFloor(S.tcur||1)}
function towerFloor(n,keep){if(n>1&&(n-1)%5===0)setTimeout(()=>sfx("gong"),300);const b=n%5===0,bs=BOSS[(n/5-1)%BOSS.length],e=b?mk(bs.L+Math.floor(n/3),bs,true):mk(lvl()+Math.floor(n/2),ET[rnd(0,ET.length-1)]);e.tower=n;setup(e,0,keep)}
function nextTour(){if(F.tower)return towerFloor(F.tower+1,{php:Math.min(F.pmax,F.php+Math.round(F.pmax*.2)),pp:F.pp});const k={php:Math.min(F.pmax,F.php+Math.round(F.pmax*.3)),pp:F.pp},r=F.tour+1;setup(mk(Math.max(1,lvl()+r-1),ET[rnd(0,ET.length-1)]),r,k)}
function startBoss(){const b=BOSS[S.boss];if(!b||S.en<3||S.ruhm<b.req)return;S.en-=3;setup(mk(b.L,b,true))}
function leaveTower(){F.over=true;msg=`Du verlässt den Turm. Beim nächsten Besuch geht es auf <b>Etage ${S.tcur}</b> weiter. Rekord: Etage ${S.tbest}.`;save();home()}
function fmenu(m){F.menu=m;Object.assign(F,{anim:"",dmg:"",hE:0,hP:0,lP:0,lE:0,vfx:[]});fight()}
function fight(){if(QUICK)return;
 const f=F;if(!f.over)musicSet(f.boss?"boss":f.tour?"tour":f.tower?"tower":"battle");const ic=(o,m)=>Object.keys(m).filter(k=>o[k]>0).map(k=>m[k]).join("");
 let ui;
 if(f.over)ui=f.next?`<button class="p" style="grid-column:1/-1" onclick="nextTour()">Nächster Gegner ⚔️</button>${f.tower?'<button style="grid-column:1/-1" onclick="leaveTower()">🏰 Turm verlassen</button>':""}`:f.epi?`<button class="p" style="grid-column:1/-1" onclick="epilogScr()">📜 Epilog lesen</button>`:`<button class="p" style="grid-column:1/-1" onclick="home()">Zurück zur Burg</button>`;
 else if(f.menu==="skills")ui=eqSk().map((id,ix)=>{const s=SKD(id),pp=f.pp[id];return `<button ${pp<1?"disabled":""} onclick="useSkill('${id}')"><span class="mut" style="font-size:11px">${ix+1}</span> ${s.n}<small>${s.pp<99?pp+"/"+s.pp+"× · ":""}${s.d}</small></button>`}).join("")+`<button onclick="fmenu('main')">← Zurück</button>`;
 else if(f.menu==="items")ui=IT.map(t=>`<button ${S.it[t.k]<1||((t.k==="a"||t.k==="A")&&ppFull())?"disabled":""} onclick="useItem('${t.k}')">${t.e} ${t.n} ×${S.it[t.k]}<small>${t.d}</small></button>`).join("")+`<button onclick="fmenu('main')">← Zurück</button>`;
 else ui=`<button class="p" onclick="fmenu('skills')">⚔️ Kämpfen<small>Taste K</small></button><button onclick="fmenu('items')">🎒 Tränke<small>Taste T</small></button>${canQuick()?'<button style="grid-column:1/-1" onclick="quickFight()">⚡ Schnellkampf<small>automatisch mit Grundangriff · Taste S</small></button>':""}${f.tower?'<button onclick="leaveTower()" style="grid-column:1/-1">🏳️ Turm verlassen</button>':f.boss||f.tour?"":'<button onclick="flee()" style="grid-column:1/-1">🏃 Fliehen</button>'}`;
 const dm=(w)=>{const v=w==="e"?f.hE:f.hP;return v?`<span class="dmg ${w==="p"?"late":""}" style="left:30px">-${v}</span>`:""};
 app.innerHTML=`<div class="scene fs">${f.tower?TBG(ttier(f.tower)):BG}
 <div class="box eb"><b>${f.name}</b> <span class="mut">Lv${f.lvl}${f.tour?" · Turnier "+f.tour+"/3":""}${f.tower?" · Etage "+f.tower:""}${f.boss?" · BOSS":""}</span> ${ic(f.eb,{bleed:"🩸",burn:"🔥",poison:"☠️",stun:"💫",guard:"🛡️",weak:"😨"})}${bar(f.ehp,f.emax,"#c0392b")}<span class="mut">${Math.max(0,f.ehp)}/${f.emax}</span></div>
 <div class="es ${f.boss?"big":""} ${f.hE?"hit":""}">${dm("e")}<div class="lg ${f.lE?"lungeE":""}"><div class="kw ${f.ko==="e"?(f.boss?"koB":"koE"):f.ko==="p"?"cheerE":""}">${f.moon?wolfSvg():f.mimic?mimicSvg():f.boss&&f.bi>=0?bossSvg(f.bi):enemyKn(f)}</div></div></div>
 <div class="ps ${f.hP?"hit late":""}">${dm("p")}<div class="lg ${f.lP?"lungeP":""}"><div class="kw ${f.ko==="p"?"koP":f.ko==="e"?"cheer":""}">${pk()}</div></div>${S.cmp?`<div class="fcmp">${compSvg(S.cmp,44)}</div>`:""}</div>
 <div class="box pb"><b>${S.name}</b> <span class="mut">Lv${lvl()}</span>${tl()} ${ic(f.pb,{buff:"💥",guard:"🛡️",poison:"☠️",burn:"🔥",stun:"💫",regen:"💗"})}${bar(f.php,f.pmax,"#2e8b57")}<span class="mut">${Math.max(0,f.php)}/${f.pmax}</span></div>${VXH(f)}</div>
 <div class="msg">${f.log}</div><div class="grid">${ui}</div>`;
}
// Kampftext: eine Zeile pro Aktion, Schaden rot, Heilung grün
const fmtLine=x=>x.replace(/(\d+) Schaden/g,'<b class="dn">$1</b> Schaden').replace(/(heilst|saugst|Atem: \+|heilt dich um|regeneriert) (\d+)/g,'$1 <b class="hn">$2</b>');
function fin(l){F.log=l.map(x=>`<div class="ll">${fmtLine(x)}</div>`).join("");F.menu="main";if(!QUICK)fight()}
function useSkill(id){
 const f=F,s=SKD(id);if(!s||!eqSk().includes(id))return;const l=[`${S.name} setzt <b>${s.n}</b> ein!`];
 if(s.pp<99){if(f.pp[id]<1)return;f.pp[id]--}
 if(id!=="hieb")qProg("skill",1,l);
 f.anim="";f.dmg="";f.hE=0;f.hP=0;f.lP=s.pw>0?1:0;f.lE=0;f.vfx=[];
 const wk=wcat();
 if(Math.random()*100>=s.acc+(s.pw>0?(wk.acc||0):0)){l.push("Der Angriff geht daneben!");sfx("miss");f.vfx.push(["miss","vE",0])}
 else if(s.pw>0&&f.fx&&Math.random()*100<(f.fx.dodge||0)){l.push(`${f.name} weicht geschickt aus! 💨`);sfx("miss");f.vfx.push(["dodge","vE",0])}
 else{f.vfx.push([s.vx||"slash",s.self?"vP":"vE",0]);
  if(s.pw>0){
   const hits=s.hits||1,pierce=s.fx==="pierce";let pw=s.pw,tot=0,anyCrit=false;
   if(s.fx==="exec"&&f.ehp<f.emax*.35){pw*=2.5;l.push("<b>Hinrichtung!</b> Der Gegner wankt …")}
   pw*=wk.dmg||1;if(wk.reach&&f.ehp>f.emax*.7){pw*=1+wk.reach;l.push("🔱 Die Reichweite deiner Hellebarde zahlt sich aus!")}
   const hitsN=hits+(wk.dbl&&Math.random()<wk.dbl?1:0);if(hitsN>hits)l.push("🔪 Doppelstich!");
   for(let h=0;h<hitsN;h++){let d=(5+Math.floor((wk.magic?(S.st+S.ge)*.65:S.st*1.3))+wBon())*(h>=hits?.5:1)*pw*(f.pb.buff>0?1.5:1)*(1+.1*S.star)*(1+buffV("dmg")+.1*blessV("dmg"))+rnd(0,3);
    const crit=s.crit||Math.random()<Math.min(.6,S.ge*.03+fxv("crit")+buffV("crit")+compV("crit")+(wk.crit||0));if(crit){d*=1.5;S.crits++;anyCrit=true;qProg("crit",1,l)}
    if(f.eb.guard&&!pierce)d*=.5;tot+=Math.max(1,Math.round(d-(pierce?0:f.def*(1-(wk.armor||0)))))}
   f.ehp-=tot;f.anim="e";f.dmg=tot;f.hE=tot;sfx(anyCrit?"crit":"hit");
   if(wk.bleed&&Math.random()<wk.bleed&&!f.eb.bleed){f.eb.bleed=3;l.push("🪓 Die Axt reißt eine tiefe Wunde – der Gegner blutet! 🩸")}if(wk.stun&&Math.random()<wk.stun){f.eb.stun=1;l.push("🔨 Der Keulenhieb betäubt den Gegner! 💫")}
   l.push((anyCrit?"<b>Kritischer Treffer!</b> ":"")+(hitsN>1?`${hitsN} Treffer – insgesamt ${tot} Schaden.`:`${tot} Schaden.`)+(pierce?" Die Rüstung hilft nichts!":""));encHit(tot,l);
   if(s.life){const o=f.php;f.php=Math.min(f.pmax,f.php+Math.round(tot*s.life));if(f.php>o)l.push(`Du saugst ${f.php-o} LP auf. 💚`)}
  }
  if(s.fx==="stun"&&Math.random()<(s.ch||.4)){f.eb.stun=1;l.push("Der Gegner ist betäubt! 💫")}
  if(s.fx==="bleed"){f.eb.bleed=3;l.push("Der Gegner blutet! 🩸")}
  if(s.fx==="poison"){f.eb.ps=f.eb.poison>0?Math.min(2,f.eb.ps+1):1;f.eb.poison=3;l.push(`Der Gegner ist vergiftet${f.eb.ps>1?" (doppelt)":""}! ☠️`)}
  if(s.fx==="burn"){if(f.fx&&f.fx.noburn)l.push("Der Gegner ist gegen Feuer gefeit!");else{f.eb.burn=2;l.push("Der Gegner geht in Flammen auf! 🔥")}}
  if(s.fx==="weak"){f.eb.weak=3;sfx("buff");l.push("Der Gegner ist eingeschüchtert – sein Schaden sinkt! 😨")}
  if(s.fx==="heal"){const o=f.php;f.php=Math.min(f.pmax,f.php+Math.round(f.pmax*.35));l.push(`Du heilst ${f.php-o} LP. 💚`);sfx("heal")}
  if(s.fx==="cleanse"){f.pb.poison=0;f.pb.burn=0;const o=f.php;f.php=Math.min(f.pmax,f.php+Math.round(f.pmax*.15));l.push(`Gift und Brand sind gebannt, du heilst ${f.php-o} LP. ✨`);sfx("heal")}
  if(s.fx==="regen"){f.pb.regen=4;sfx("heal");l.push("Neue Kraft durchströmt dich – du regenerierst 4 Runden lang! 💗")}
  if(s.fx==="buff"){sfx("buff");f.pb.buff=3;l.push("Dein Schaden steigt! 💥")}
  if(s.fx==="guard"){sfx("buff");f.pb.guard=3;l.push("Du gehst in Verteidigung! 🛡️")}
 }
 enemyTurn(l);
}
function useItem(k){
 const f=F;if(S.it[k]<1)return;S.it[k]--;const t=IT.find(x=>x.k===k),l=[`Du benutzt ${t.n}.`];qProg("potion",1,l);sfx(k==="k"||k==="e"?"buff":"heal");save();f.anim="";f.dmg="";f.hE=0;f.hP=0;f.lP=0;f.lE=0;f.vfx=[[k==="k"?"roar":k==="e"?"guard":"heal","vP",0]];
 if(k==="h"||k==="H"||k==="x"){const h=k==="h"?40:k==="x"?200:100,b=f.php;f.php=Math.min(f.pmax,f.php+h);l.push(`Du heilst ${f.php-b} LP. 💚`)}
 if(k==="k"){f.pb.buff=3;l.push("Dein Schaden steigt für 3 Runden! 💥")}
 if(k==="g"){f.pb.poison=0;f.pb.burn=0;l.push("Gift und Brand sind geheilt! 💊")}
 if(k==="e"){f.pb.guard=3;l.push("Deine Haut wird hart wie Eisen! 🛡️")}
 if(k==="a"||k==="A"){let n=0;eqSk().forEach(id=>{const mx=SKD(id).pp;if(mx>=99)return;const o=f.pp[id];f.pp[id]=k==="A"?mx:Math.min(mx,o+3);n+=f.pp[id]-o});l.push(`Deine Fähigkeiten laden sich auf: +${n} Einsätze. 🔷`)}
 enemyTurn(l);
}
function flee(){const l=[];Object.assign(F,{hE:0,hP:0,lP:0,lE:0,vfx:[]});if(F.boss||F.tour||F.tower){F.log="Hier gibt es kein Entkommen!";return fight()}if(Math.random()<Math.min(.9,.5+S.ge*.03)){F.over=true;l.push("Du ergreifst die Flucht! Kein Ruhm, aber auch kein Verlust.");msg="Du bist geflohen.";save();return fin(l)}l.push("Flucht gescheitert!");enemyTurn(l)}
function enemyAct(l){
 const f=F;
 if(f.eb.stun){f.eb.stun=0;l.push(`${f.name} ist betäubt und setzt aus.`);return}
 const tot=f.mv.reduce((a,m)=>a+m[4],0);let r=Math.random()*tot,m=f.mv[0];
 for(const x of f.mv){if(r<x[4]){m=x;break}r-=x[4]}
 l.push(`${f.name} setzt <b>${m[0]}</b> ein!`);if(m[3]!=="guard")f.lE=1;
 if(m[3]==="guard"){f.vfx.push(["guard","vE",1]);f.eb.guard=1;l.push("Der Gegner geht in Deckung. 🛡️")}
 else if(Math.random()*100>=Math.max(25,m[2]-S.ge-fxv("dodge"))){l.push("Du weichst aus!");sfx("miss");f.vfx.push(["dodge","vP",1])}
 else{
  let d=(f.atk+rnd(0,3))*m[1]*(f.eb.weak>0?.7:1)-aBon()-SH[S.s][2];if(f.pb.guard>0)d*=.5;d=Math.max(1,Math.round(d));const fx=f.fx||{},ec=Math.random()<(fx.crit||0);if(ec)d=Math.round(d*1.5);f.took=1;f.php-=d;f.anim="p";f.dmg=d;f.hP=d;sfx("hurt");f.vfx.push(["slash","vP",1]);if(m[1]>=1.5)f.vfx.push(["flash","vP",1]);l.push(`${ec?"<b>Kritischer Treffer!</b> ":""}Du erleidest ${d} Schaden.`);
  if(Math.random()<(fx.burn||0)&&!fxv("noburn")){f.pb.burn=3;f.vfx.push(["fire","vP",1]);l.push("Die verzauberte Waffe setzt dich in Brand! 🔥")}
  if(Math.random()<(fx.poison||0)){f.pb.poison=4;l.push("Die verzauberte Waffe vergiftet dich! ☠️")}
  if(Math.random()<(fx.stun||0)*.6){f.pb.stun=1;f.vfx.push(["stun","vP",1]);l.push("Die verzauberte Waffe lähmt dich! ❄️")}
  if(fx.life){const o=f.ehp;f.ehp=Math.min(f.emax,f.ehp+Math.round(d*fx.life));if(f.ehp>o)l.push(`${f.name} saugt ${f.ehp-o} LP auf.`)}
  if(m[3]==="poison"){f.pb.poison=4;sfx("poison");f.vfx.push(["poison","vP",1]);l.push("Du bist vergiftet! ☠️")}
  if(m[3]==="burn"&&!fxv("noburn")){f.vfx.push(["fire","vP",1]);f.pb.burn=3;l.push("Du brennst! 🔥")}
  if(m[3]==="stun"&&Math.random()<.5){f.vfx.push(["stun","vP",1]);f.pb.stun=1;l.push("Du bist betäubt! 💫")}
 }
}
function enemyTurn(l){
 const f=F;
 if(f.ehp<=0)return endFight(true,l);
 f.eb.guard=0;
 for(const[k,d,t,e]of[["bleed",4+f.lvl,"blutet","🩸"],["burn",6+f.lvl,"brennt","🔥"],["poison",(4+f.lvl)*Math.max(1,f.eb.ps),"leidet unter Gift","☠️"]])if(f.eb[k]>0){f.ehp-=d;f.eb[k]--;if(k==="poison"&&!f.eb.poison)f.eb.ps=0;l.push(`${f.name} ${t}: ${d} Schaden. ${e}`);if(f.ehp<=0)return endFight(true,l)}
 compTurn(f,l);mercTurn(f,l);if(f.ehp<=0)return endFight(true,l);
 if(f.fx&&f.fx.regen&&f.ehp<f.emax){const o=f.ehp;f.ehp=Math.min(f.emax,f.ehp+Math.round(f.fx.regen*(1+f.lvl/20)));l.push(`${f.name} regeneriert ${f.ehp-o} LP.`)}
 if(f.boss&&!f.enr&&f.ehp<f.emax/2){f.enr=true;f.atk*=1.3;l.push(`<b>${f.name} gerät in Rage!</b> 😡`)}
 enemyAct(l);
 const rg=fxv("regen");if(rg&&f.php<f.pmax){f.php=Math.min(f.pmax,f.php+rg);l.push(`Deine Rüstung heilt dich um ${rg} LP. 🌙`)}
 if(f.pb.poison>0){const d=2+Math.floor(f.lvl/2);f.took=1;f.php-=d;f.pb.poison--;l.push(`Gift: ${d} Schaden. ☠️`)}
 if(f.pb.burn>0){const d=4+f.lvl;f.took=1;f.php-=d;f.pb.burn--;l.push(`Verbrennung: ${d} Schaden. 🔥`)}
 if(f.pb.regen>0){const o=f.php;f.php=Math.min(f.pmax,f.php+Math.round(f.pmax*.08));f.pb.regen--;if(f.php>o)l.push(`Zweiter Atem: +${f.php-o} LP. 💗`)}
 compRescue(f,l);if(f.eb.weak>0)f.eb.weak--;if(f.pb.buff>0)f.pb.buff--;if(f.pb.guard>0)f.pb.guard--;
 if(f.php<=0)return endFight(false,l);
 if(f.pb.stun){f.pb.stun=0;l.push("Du bist betäubt und verlierst deinen Zug!");enemyAct(l);if(f.php<=0)return endFight(false,l)}
 fin(l);
}
function endFight(win,l){
 const f=F;f.over=true;AU.want=null;musicStop();f.ko=win?"e":"p";f.vfx.push(win?[f.boss?"bko":"ko","vE",0]:["ko","vP",1]);
 setTimeout(()=>sfx(win&&f.boss?"boom":"fall"),win?850:1850);setTimeout(()=>sfx(win?"win":"lose"),win?(f.boss?2100:1500):2600);
 if(win){
  const m=f.boss?3:1,sm=1+.1*S.star,r=(10+f.lvl*6)*m,g=Math.round((15+f.lvl*6)*m*sm*(1+.15*blessV("gold")+buffV("gold"))),x=Math.round((15+f.lvl*10)*m*sm);
  S.ruhm+=r;S.gold+=g;S.exp+=x;S.wins++;if(f.php<=5)S.close++;if(!f.took)S.flawless++;l.push(`<b>🏆 Sieg!</b> +${r} Ruhm, +${g} Gold, +${x} EP.`);
  bWin(f);if(f.evGold){S.gold+=f.evGold;l.push(`Beute der Begegnung: +${f.evGold} <i class=coin></i>`)}if(f.honor){S.ruhm+=r;l.push(`🤺 Ehrenduell gewonnen: +${r} Ruhm extra!`)}
  if(f.moon){moonLoot(l);msg="Du hast den Vollmond-Werwolf erlegt!"}
  else if(f.mimic){S.it.h+=2;S.mat.ak+=1;l.push("Im Bauch des Mimiks: 🧪 Heiltrank ×2 und 💎 Arkankristall.");msg="Du hast den Mimik besiegt!"}
  else if(f.rival){}
  else if(f.boss&&!f.tower){S.boss++;if(!S.bk.includes(S.boss-1))S.bk.push(S.boss-1);if(S.boss>=3)S.tunl=1;(BREW[S.boss-1]||[]).forEach(id=>giveE(id,l));S.it.H++;S.it.g++;l.push("Beute: Großer Heiltrank ⚗️ und Gegengift 💊!");if(LORE[S.boss-1])l.push(`📜 <i>${LORE[S.boss-1][1]}</i>`);msg=`Boss ${f.name} besiegt!`;if(S.boss>=BOSS.length&&!S.epi)f.epi=1}
  else{if(Math.random()<.3){S.it.h++;l.push("Du findest einen Heiltrank! 🧪")}msg=`Du hast ${f.name} besiegt!`}
  dropMat(f,l);qProg("win",1,l);if(f.tower)qProg("tower",1,l);if(f.tour)qProg("tour",1,l);
  if(f.tower){S.tbest=Math.max(S.tbest,f.tower);S.tcur=f.tower+1;f.next=true;l.push(`Etage ${f.tower} geschafft! Du verschnaufst kurz (+20 % LP).`);if(Math.random()<.25){S.it.a++;l.push("Du findest einen Äthertrank! 🔷")}if(f.tower%10===0){towerLoot(l);S.it.A++;l.push("Dazu ein Großer Äthertrank! 💠")}}
  if(f.tour){if(f.tour<3){f.next=true;l.push(`Turnierrunde ${f.tour}/3 geschafft – du verschnaufst kurz.`)}else{S.troph++;tourLoot(l);S.gold+=100;S.exp+=50;S.ruhm+=30;l.push("<b>🏟️ Turniersieger!</b> Pokal, +100 Gold, +30 Ruhm, +50 EP.");if(isTourDay(S.day)){S.gold+=100;S.exp+=50;S.ruhm+=30;tourLoot(l);l.push("🏟️ <b>Turniertag:</b> doppelte Siegprämie!")}msg="Du hast das Turnier gewonnen!"}}
 }else{const x=Math.floor(S.gold*.1);S.gold-=x;S.ruhm=Math.max(0,S.ruhm-5);S.exp+=5;S.losses++;if(f.tower){hallAdd(f.tower-1);S.tcur=1}l.push(`<b>💀 Niederlage.</b> −${x} Gold, −5 Ruhm, +5 EP.`);msg=f.tower?`Der Turm hat dich bezwungen – du musst wieder auf Etage 1 beginnen. Rekord: Etage ${S.tbest}.`:f.tour?"Du bist im Turnier ausgeschieden.":"Du wurdest besiegt – trainiere und kehre stärker zurück!"}
 if(f.rival)rivalEnd(f,win,l);buffTick();
 levelCheck(l);unlCheck(l);
 checkTitles(l);save();fin(l);
}

// Stufenaufstieg (auch wenn EP außerhalb von Kämpfen kommen): Werte steigen, neue Fähigkeiten werden – wenn Platz ist – angelegt
function levelCheck(l){const nl=lvl(),old=S.lvl0||nl;if(nl<=old){S.lvl0=nl;return}S.lvl0=nl;const n=nl-old;S.st+=n;S.au+=n;S.ge+=n;setTimeout(()=>sfx("level"),1500);
 l.push(`<b>⭐ Stufe ${nl} erreicht!</b>`,`Stärke, Ausdauer und Geschick steigen um je ${n}! 💪`);
 SK.filter(s=>s.lv>old&&s.lv<=nl&&s.id!=="hieb").forEach(s=>{const sk=S.sk=S.sk||[];if(sk.length<skMax()&&!sk.includes(s.id)){sk.push(s.id);l.push(`Neue Fähigkeit: <b>${s.n}</b> – angelegt!`)}else l.push(`Neue Fähigkeit: <b>${s.n}</b> – lege sie unter 📜 Fähigkeiten an.`)})}

// ---- Schnellkampf: löst normale Kämpfe automatisch (Grundangriff, Heiltränke bei Not) ----
let QUICK=false;
const canQuick=()=>F&&!F.over&&!F.boss&&!F.rival&&!F.mimic;
function quickFight(){if(!canQuick())return;QUICK=true;let r=0,pots=0,stop="";
 try{while(!F.over&&r<200){r++;
  if(F.php<F.pmax*.3){const k=["h","H","x"].find(k=>S.it[k]>0&&(k!=="x"||F.php<F.pmax*.2));if(k){useItem(k);pots++;continue}if(F.php<F.pmax*.2){stop="Du bist schwer angeschlagen – der Schnellkampf stoppt, entscheide selbst!";break}}
  useSkill("hieb")}}finally{QUICK=false}
 const sum=`<div class="ll">⚡ <b>Schnellkampf:</b> ${r} Runde${r>1?"n":""}${pots?`, ${pots} Trank${pots>1?"tränke":""} getrunken`:""}.</div>`;
 F.log=sum+(stop?`<div class="ll">⚠️ ${stop}</div>`:"")+F.log;F.menu="main";fight()}
// Tastenkürzel im Kampf: 1–7 Fähigkeiten, T Tränke, S Schnellkampf, Esc zurück, Enter weiter
document.addEventListener("keydown",e=>{if(!F||(e.target.closest&&e.target.closest("input,textarea"))||!document.querySelector(".fs"))return;const k=e.key.toLowerCase();
 if(F.over){if(k==="enter"){const b=document.querySelector('.grid button.p');if(b)b.click()}return}
 if(/^[1-9]$/.test(k)){const id=eqSk()[+k-1];if(id&&F.pp[id]>0){e.preventDefault();useSkill(id)}}
 else if(k==="t")fmenu("items");else if(k==="f"||k==="k")fmenu("skills");else if(k==="escape")fmenu("main");else if(k==="s"&&canQuick())quickFight()});
