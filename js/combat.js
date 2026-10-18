// Ritter Manager – Kampf: Abenteuer, Turnier, Bosse, Turm, Züge, Sieg und Niederlage
function giveE(id,l){const it=EI.find(x=>x.id===id);if(S.own.includes(id)){S.gold+=100;l.push(`Du besitzt ${it.n} schon: +100 Gold.`);return}S.own.push(id);const k=it.s==="w"?"ew":"ea",cur=it.s==="w"?wBon():aBon(),auto=it.b>cur;if(auto)S[k]=id;l.push(`✨ <b>Verzauberte Beute: ${it.n}</b> (${it.d})${auto?" – angelegt!":" – in der Schmiede anlegbar."}`)}
function tourLoot(l){const p=["fl","fz","sb","mo","wp","wm"].filter(id=>!S.own.includes(id));if(p.length)giveE(p[rnd(0,p.length-1)],l);else{S.gold+=150;l.push("Alle Turnierschätze besitzt du schon: +150 Gold!")}}
function towerLoot(l){const p=["t1","t2","t3","t4"].filter(id=>!S.own.includes(id));if(p.length)giveE(p[rnd(0,p.length-1)],l);else{S.gold+=300;l.push("Alle Turmschätze besitzt du schon: +300 Gold!")}}
function equipE(id){const it=EI.find(x=>x.id===id),k=it.s==="w"?"ew":"ea";S[k]=S[k]===id?null:id;save();sfx("buff");inv()}
function encHit(d,l){const f=F,r=Math.random(),b=fxv("burn");
 if(r<b){f.eb.burn=2;l.push("Der Gegner geht in Flammen auf! 🔥")}
 else if(r<b+fxv("poison")){f.eb.ps=f.eb.poison>0?Math.min(2,f.eb.ps+1):1;f.eb.poison=3;l.push("Der Gegner ist vergiftet! ☠️")}
 if(Math.random()<fxv("stun")){f.eb.stun=1;l.push("Der Gegner erstarrt! ❄️")}
 const h=Math.round(d*fxv("life"));if(h>0){const o=f.php;f.php=Math.min(f.pmax,f.php+h);if(f.php>o)l.push(`Die Klinge saugt ${f.php-o} LP auf. 💚`)}}
const ppFull=()=>hasSk().every(i=>SK[i].pp>=99||F.pp[i]>=SK[i].pp);
const hasSk=()=>SK.map((s,i)=>i).filter(i=>SK[i].lv<=lvl());
function mk(L,t,boss){
 const sc=1+.08*S.star,hp=Math.round((40+L*12)*t.hp*sc);
 return {lvl:L,name:boss?t.n:`${t.t} ${ENS[rnd(0,ENS.length-1)]}`,ehp:hp,emax:hp,atk:(3+L*2)*t.atk*sc,def:Math.floor(L*.8*t.def),tier:Math.min(4,Math.floor(L/2)),tint:t.tint||"#6b2d8f",mv:t.mv,boss:!!boss,enr:false,et:t.t||"Boss",bi:boss?BOSS.indexOf(t):-1};
}
function setup(e,tour,keep){
 F=Object.assign({php:keep?keep.php:maxhp(),pmax:maxhp(),menu:"main",anim:"",dmg:"",hE:0,hP:0,lP:0,lE:0,vfx:[],over:false,next:false,tour:tour||0,pp:keep?keep.pp:null,pb:{buff:0,guard:0,poison:0,burn:0,stun:0},eb:{bleed:0,burn:0,poison:0,ps:0,stun:0,guard:0},log:(e.tower?towerIntro(e.tower):"")+(e.moon?"🌕 <i>Ein Heulen zerreißt die Nacht …</i><br>":"")+(ttn()?`<b>${S.name} ${ttn()}</b> tritt an!<br>`:"")+(e.boss?`${e.name} versperrt dir den Weg! Das wird ein harter Kampf.`:"Ein fremder Gegner fordert dich heraus! Was tust du?")},e);
 if(!F.pp){F.pp={};SK.forEach((s,i)=>F.pp[i]=s.pp)}
 save();fight();
}
function startFight(){if(S.en<2)return;S.en-=2;setup(mk(Math.max(1,lvl()+rnd(-1,1)),ET[rnd(0,4)]))}
function startTour(){const fee=tourFee();if(S.en<4||S.gold<fee)return;S.en-=4;S.gold-=fee;setup(mk(Math.max(1,lvl()),ET[rnd(0,4)]),1)}
function startTower(){if(!S.tunl||S.en<4)return;S.en-=4;towerFloor(S.tcur||1)}
function towerFloor(n,keep){if(n>1&&(n-1)%5===0)setTimeout(()=>sfx("gong"),300);const b=n%5===0,bs=BOSS[(n/5-1)%BOSS.length],e=b?mk(bs.L+Math.floor(n/3),bs,true):mk(lvl()+Math.floor(n/2),ET[rnd(0,4)]);e.tower=n;setup(e,0,keep)}
function rebirth(){if(S.boss<BOSS.length)return;if(!confirm("Wiedergeburt: Stufe, Gold, Ruhm, Ausrüstung und Bossfortschritt werden zurückgesetzt. Du behältst verzauberte und geschmiedete Gegenstände, Tränke, Materialien, Berufsstufen, Pokale und Turmrekord und erhältst +10 % Schaden, Gold und EP – die Gegner werden aber 8 % stärker. Fortfahren?"))return;S.star++;S.tcur=1;for(const o of[S.up,S.ru])for(const k of Object.keys(o))if(/^[wa]\d$/.test(k))delete o[k];Object.assign(S,{exp:0,ruhm:0,gold:50,st:3,au:3,ge:3,w:0,a:0,s:0,boss:0});msg=`Du wirst wiedergeboren! Wiedergeburt ${S.star} 🌟`;sfx("level");save();home()}
function nextTour(){if(F.tower)return towerFloor(F.tower+1,{php:Math.min(F.pmax,F.php+Math.round(F.pmax*.2)),pp:F.pp});const k={php:Math.min(F.pmax,F.php+Math.round(F.pmax*.3)),pp:F.pp},r=F.tour+1;setup(mk(Math.max(1,lvl()+r-1),ET[rnd(0,4)]),r,k)}
function startBoss(){const b=BOSS[S.boss];if(!b||S.en<3||S.ruhm<b.req)return;S.en-=3;setup(mk(b.L,b,true))}
function leaveTower(){F.over=true;msg=`Du verlässt den Turm. Beim nächsten Besuch geht es auf <b>Etage ${S.tcur}</b> weiter. Rekord: Etage ${S.tbest}.`;save();home()}
function fmenu(m){F.menu=m;Object.assign(F,{anim:"",dmg:"",hE:0,hP:0,lP:0,lE:0,vfx:[]});fight()}
function fight(){
 const f=F;if(!f.over)musicSet(f.boss?"boss":f.tour?"tour":f.tower?"tower":"battle");const ic=(o,m)=>Object.keys(m).filter(k=>o[k]>0).map(k=>m[k]).join("");
 let ui;
 if(f.over)ui=f.next?`<button class="p" style="grid-column:1/-1" onclick="nextTour()">Nächster Gegner ⚔️</button>${f.tower?'<button style="grid-column:1/-1" onclick="leaveTower()">🏰 Turm verlassen</button>':""}`:`<button class="p" style="grid-column:1/-1" onclick="home()">Zurück zur Burg</button>`;
 else if(f.menu==="skills")ui=hasSk().map(i=>{const s=SK[i],pp=f.pp[i];return `<button ${pp<1?"disabled":""} onclick="useSkill(${i})">${s.n}<small>${s.pp<99?pp+"/"+s.pp+"× · ":""}${s.d}</small></button>`}).join("")+`<button onclick="fmenu('main')">← Zurück</button>`;
 else if(f.menu==="items")ui=IT.map(t=>`<button ${S.it[t.k]<1||((t.k==="a"||t.k==="A")&&ppFull())?"disabled":""} onclick="useItem('${t.k}')">${t.e} ${t.n} ×${S.it[t.k]}<small>${t.d}</small></button>`).join("")+`<button onclick="fmenu('main')">← Zurück</button>`;
 else ui=`<button class="p" onclick="fmenu('skills')">⚔️ Kämpfen</button><button onclick="fmenu('items')">🎒 Tränke</button>${f.tower?'<button onclick="leaveTower()" style="grid-column:1/-1">🏳️ Turm verlassen</button>':f.boss||f.tour?"":'<button onclick="flee()" style="grid-column:1/-1">🏃 Fliehen</button>'}`;
 const dm=(w)=>{const v=w==="e"?f.hE:f.hP;return v?`<span class="dmg ${w==="p"?"late":""}" style="left:30px">-${v}</span>`:""};
 app.innerHTML=`<div class="scene fs">${f.tower?TBG(ttier(f.tower)):BG}
 <div class="box eb"><b>${f.name}</b> <span class="mut">Lv${f.lvl}${f.tour?" · Turnier "+f.tour+"/3":""}${f.tower?" · Etage "+f.tower:""}${f.boss?" · BOSS":""}</span> ${ic(f.eb,{bleed:"🩸",burn:"🔥",poison:"☠️",stun:"💫",guard:"🛡️"})}${bar(f.ehp,f.emax,"#c0392b")}<span class="mut">${Math.max(0,f.ehp)}/${f.emax}</span></div>
 <div class="es ${f.boss?"big":""} ${f.hE?"hit":""}">${dm("e")}<div class="lg ${f.lE?"lungeE":""}"><div class="kw ${f.ko==="e"?(f.boss?"koB":"koE"):f.ko==="p"?"cheerE":""}">${f.moon?wolfSvg():f.boss&&f.bi>=0?bossSvg(f.bi):knight(f.tier,f.tier,Math.min(3,Math.floor(f.lvl/3)),true,f.tint)}</div></div></div>
 <div class="ps ${f.hP?"hit late":""}">${dm("p")}<div class="lg ${f.lP?"lungeP":""}"><div class="kw ${f.ko==="p"?"koP":f.ko==="e"?"cheer":""}">${pk()}</div></div></div>
 <div class="box pb"><b>${S.name}</b> <span class="mut">Lv${lvl()}</span>${tl()} ${ic(f.pb,{buff:"💥",guard:"🛡️",poison:"☠️",burn:"🔥",stun:"💫"})}${bar(f.php,f.pmax,"#2e8b57")}<span class="mut">${Math.max(0,f.php)}/${f.pmax}</span></div>${VXH(f)}</div>
 <div class="msg">${f.log}</div><div class="grid">${ui}</div>`;
}
function fin(l){F.log=l.join("<br>");F.menu="main";fight()}
function useSkill(i){
 const f=F,s=SK[i],l=[`${S.name} setzt <b>${s.n}</b> ein!`];
 if(s.pp<99){if(f.pp[i]<1)return;f.pp[i]--;qProg("skill",1,l)}
 f.anim="";f.dmg="";f.hE=0;f.hP=0;f.lP=s.pw>0?1:0;f.lE=0;f.vfx=[];
 if(Math.random()*100>=s.acc){l.push("Der Angriff geht daneben!");sfx("miss");f.vfx.push(["miss","vE",0])}
 else{f.vfx.push([SKFX[i],[3,5,9].includes(i)?"vP":"vE",0]);
  if(s.pw>0){
   let d=5+Math.floor(S.st*1.3)+wBon();d=d*s.pw*(f.pb.buff>0?1.5:1)*(1+.1*S.star)+rnd(0,3);
   const crit=Math.random()<Math.min(.6,S.ge*.03+fxv("crit"));if(crit){d*=1.5;S.crits++;qProg("crit",1,l)}if(f.eb.guard)d*=.5;
   d=Math.max(1,Math.round(d-f.def));f.ehp-=d;f.anim="e";f.dmg=d;f.hE=d;sfx(crit?"crit":"hit");l.push((crit?"<b>Kritischer Treffer!</b> ":"")+`${d} Schaden.`);encHit(d,l);
  }
  if(s.fx==="stun"&&Math.random()<.4){f.eb.stun=1;l.push("Der Gegner ist betäubt! 💫")}
  if(s.fx==="bleed"){f.eb.bleed=3;l.push("Der Gegner blutet! 🩸")}
  if(s.fx==="heal"){const o=f.php;f.php=Math.min(f.pmax,f.php+Math.round(f.pmax*.35));l.push(`Du heilst ${f.php-o} LP. 💚`);sfx("heal")}
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
 if(k==="a"||k==="A"){let n=0;hasSk().forEach(i=>{const mx=SK[i].pp;if(mx>=99)return;const o=f.pp[i];f.pp[i]=k==="A"?mx:Math.min(mx,o+3);n+=f.pp[i]-o});l.push(`Deine Fähigkeiten laden sich auf: +${n} Einsätze. 🔷`)}
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
  let d=(f.atk+rnd(0,3))*m[1]-aBon()-SH[S.s][2];if(f.pb.guard>0)d*=.5;d=Math.max(1,Math.round(d));f.took=1;f.php-=d;f.anim="p";f.dmg=d;f.hP=d;sfx("hurt");f.vfx.push(["slash","vP",1]);if(m[1]>=1.5)f.vfx.push(["flash","vP",1]);l.push(`Du erleidest ${d} Schaden.`);
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
 if(f.boss&&!f.enr&&f.ehp<f.emax/2){f.enr=true;f.atk*=1.3;l.push(`<b>${f.name} gerät in Rage!</b> 😡`)}
 enemyAct(l);
 const rg=fxv("regen");if(rg&&f.php<f.pmax){f.php=Math.min(f.pmax,f.php+rg);l.push(`Deine Rüstung heilt dich um ${rg} LP. 🌙`)}
 if(f.pb.poison>0){const d=2+Math.floor(f.lvl/2);f.took=1;f.php-=d;f.pb.poison--;l.push(`Gift: ${d} Schaden. ☠️`)}
 if(f.pb.burn>0){const d=4+f.lvl;f.took=1;f.php-=d;f.pb.burn--;l.push(`Verbrennung: ${d} Schaden. 🔥`)}
 if(f.pb.buff>0)f.pb.buff--;if(f.pb.guard>0)f.pb.guard--;
 if(f.php<=0)return endFight(false,l);
 if(f.pb.stun){f.pb.stun=0;l.push("Du bist betäubt und verlierst deinen Zug!");enemyAct(l);if(f.php<=0)return endFight(false,l)}
 fin(l);
}
function endFight(win,l){
 const f=F;f.over=true;const old=lvl();AU.want=null;musicStop();f.ko=win?"e":"p";f.vfx.push(win?[f.boss?"bko":"ko","vE",0]:["ko","vP",1]);
 setTimeout(()=>sfx(win&&f.boss?"boom":"fall"),win?850:1850);setTimeout(()=>sfx(win?"win":"lose"),win?(f.boss?2100:1500):2600);
 if(win){
  const m=f.boss?3:1,sm=1+.1*S.star,r=(10+f.lvl*6)*m,g=Math.round((15+f.lvl*8)*m*sm),x=Math.round((15+f.lvl*10)*m*sm);
  S.ruhm+=r;S.gold+=g;S.exp+=x;S.wins++;if(f.php<=5)S.close++;if(!f.took)S.flawless++;l.push(`<b>🏆 Sieg!</b> +${r} Ruhm, +${g} Gold, +${x} EP.`);
  if(f.moon){moonLoot(l);msg="Du hast den Vollmond-Werwolf erlegt!"}
  else if(f.boss&&!f.tower){S.boss++;if(!S.bk.includes(S.boss-1))S.bk.push(S.boss-1);if(S.boss>=3)S.tunl=1;(BREW[S.boss-1]||[]).forEach(id=>giveE(id,l));S.it.H++;S.it.g++;l.push("Beute: Großer Heiltrank ⚗️ und Gegengift 💊!");msg=`Boss ${f.name} besiegt!`}
  else{if(Math.random()<.3){S.it.h++;l.push("Du findest einen Heiltrank! 🧪")}msg=`Du hast ${f.name} besiegt!`}
  dropMat(f,l);qProg("win",1,l);if(f.tower)qProg("tower",1,l);if(f.tour)qProg("tour",1,l);
  if(f.tower){S.tbest=Math.max(S.tbest,f.tower);S.tcur=f.tower+1;f.next=true;l.push(`Etage ${f.tower} geschafft! Du verschnaufst kurz (+20 % LP).`);if(Math.random()<.25){S.it.a++;l.push("Du findest einen Äthertrank! 🔷")}if(f.tower%10===0){towerLoot(l);S.it.A++;l.push("Dazu ein Großer Äthertrank! 💠")}}
  if(f.tour){if(f.tour<3){f.next=true;l.push(`Turnierrunde ${f.tour}/3 geschafft – du verschnaufst kurz.`)}else{S.troph++;tourLoot(l);S.gold+=100;S.exp+=50;S.ruhm+=30;l.push("<b>🏟️ Turniersieger!</b> Pokal, +100 Gold, +30 Ruhm, +50 EP.");if(isTourDay(S.day)){S.gold+=100;S.exp+=50;S.ruhm+=30;tourLoot(l);l.push("🏟️ <b>Turniertag:</b> doppelte Siegprämie!")}msg="Du hast das Turnier gewonnen!"}}
 }else{const x=Math.floor(S.gold*.1);S.gold-=x;S.ruhm=Math.max(0,S.ruhm-5);S.exp+=5;S.losses++;if(f.tower)S.tcur=1;l.push(`<b>💀 Niederlage.</b> −${x} Gold, −5 Ruhm, +5 EP.`);msg=f.tower?`Der Turm hat dich bezwungen – du musst wieder auf Etage 1 beginnen. Rekord: Etage ${S.tbest}.`:f.tour?"Du bist im Turnier ausgeschieden.":"Du wurdest besiegt – trainiere und kehre stärker zurück!"}
 const nl=lvl();if(nl>old){setTimeout(()=>sfx("level"),1500);l.push(`<b>⭐ Stufe ${nl} erreicht!</b>`);const n=nl-old;S.st+=n;S.au+=n;S.ge+=n;l.push(`Stärke, Ausdauer und Geschick steigen um je ${n}! 💪`);SK.filter(s=>s.lv>old&&s.lv<=nl).forEach(s=>l.push(`Neue Fähigkeit: <b>${s.n}</b>!`))}
 checkTitles(l);save();fin(l);
}
