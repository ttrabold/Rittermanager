// Ritter Manager – Spätes Spiel: Verzierungen, Söldner, Tavernenrunde, Wiedergeburts-Segen, Ruhmeshalle

// ---- Burgverzierungen: kosten Gold, bringen einmalig Ruhm und schmücken die Burgszene ----
const DECO=[
 {id:"banner",e:"🚩",g:600,r:60},
 {id:"laterne",e:"🏮",g:900,r:90},
 {id:"brunnen",e:"⛲",g:1500,r:150},
 {id:"statue",e:"🗿",g:3000,r:300},
 {id:"schaedel",e:"💀",g:5000,r:500,ok:()=>(S.bk||[]).includes(2)}];
loc("deco",DECO);
const hasDeco=id=>((S.deco||[]).includes(id));
function decoBuy(id){const d=DECO.find(x=>x.id===id);if(hasDeco(id)||S.gold<d.g||(d.ok&&!d.ok()))return;S.gold-=d.g;S.ruhm+=d.r;(S.deco=S.deco||[]).push(id);sfx("level");cNote=t("cs.decoDone",d.e,d.n,d.r);save();castleScr()}
function decoSvg(){const o=[];
 if(hasDeco("laterne"))[300,330,360].forEach((x,i)=>o.push(`<path d="M${x} 200v-16" stroke="#3e2723" stroke-width="2"/><rect x="${x-4}" y="178" width="8" height="8" rx="2" fill="#ffca28" stroke="#5d4037"/><circle class="pl" style="animation-delay:${i*.4}s" cx="${x}" cy="182" r="10" fill="#ffd54f"/>`));
 if(hasDeco("brunnen"))o.push(`<ellipse cx="270" cy="204" rx="20" ry="5" fill="#90a4ae" stroke="#546e7a"/><rect x="250" y="196" width="40" height="8" fill="#b0bec5" stroke="#546e7a"/><rect x="267" y="182" width="6" height="16" fill="#cfd8dc"/><path class="fl2" d="M270 182q-8 2-10 12M270 182q8 2 10 12" stroke="#81d4fa" stroke-width="2" fill="none"/>`);
 if(hasDeco("statue"))o.push(`<rect x="336" y="186" width="18" height="12" fill="#9e9e9e" stroke="#616161"/><g transform="translate(330 140) scale(.3)">${knight(4,4,3,false,null,"#ffd54a","#e0b000",null,null,S.sex==="f").replace(/<svg[^>]*>|<\/svg>/g,"")}</g>`);
 return o.length?`<svg class="bg" viewBox="0 0 600 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true" style="z-index:1">${o.join("")}</svg>`:""}

// ---- Söldner: für den nächsten Bosskampf anheuern ----
const mercCost=()=>40+lvl()*25;
function mercHire(){if(S.merc||S.gold<mercCost())return;S.gold-=mercCost();S.merc=1;sfx("coin");msg="🗡️ "+t("merc.hired");save();home()}
function mercTurn(f,l){if(!f.merc||f.ehp<=0)return;const d=10+lvl()*3;f.ehp-=d;l.push("🗡️ "+t("merc.hit",d))}

// ---- Kriegskasse des Königs: im späten Spiel einmal pro Tag viel Gold gegen Ruhm ----
const kasseCost=()=>100*lvl(),kasseRuhm=()=>15*lvl();
function kasseGive(){if(!has("kasse")||S.kasse===S.day||S.gold<kasseCost())return;S.gold-=kasseCost();S.kasse=S.day;const r=kasseRuhm();S.ruhm+=r;sfx("level");msg="👑 "+t("kasse.done",r);save();home()}

// ---- Tavernenrunde: einmal pro Tag Ruhm für Gold ----
const roundCost=()=>50+lvl()*10;
function tavRound(){if(S.round===S.day||S.gold<roundCost())return;S.gold-=roundCost();S.round=S.day;const r=lvl()*3+10;S.ruhm+=r;TV.rum+=1;sfx("win");TV.res=null;TV.note="🍻 "+t("tav.roundDoneM",r);save();tavern()}

// ---- Wiedergeburt mit wählbarem Segen ----
const BLESS=[
 {id:"gold",e:"💰"},
 {id:"dmg",e:"⚔️"},
 {id:"hp",e:"❤️"},
 {id:"slot",e:"📜",ok:()=>!blessV("slot")},
 {id:"start",e:"🎒"}];
loc("bless",BLESS);
function rebirth(){if(S.boss<BOSS.length)return;musicSet("hall");
 app.innerHTML=`<div class="top"><b>🌟 ${t("rb.t")}</b><span>🌟×${S.star}</span></div>
 <div class="msg">${t("rb.info")}<br><b>${t("rb.pick")}</b></div>
 <div class="card">${BLESS.map(b=>`<div class="row"><span>${b.e} <b>${b.n}</b>${blessV(b.id)?` <span class="mut">(×${blessV(b.id)})</span>`:""}<br><span class="mut">${b.d}</span></span><button class="p" ${b.ok&&!b.ok()?"disabled":""} onclick="doRebirth('${b.id}')">${t("c.choose")}</button></div>`).join("")}</div>
 <div class="grid"><button style="grid-column:1/-1" onclick="home()">${t("c.cancel")}</button></div>`}
function doRebirth(bid){if(S.boss<BOSS.length)return;S.bl=S.bl||{};S.bl[bid]=(S.bl[bid]||0)+1;
 S.star++;S.tcur=1;S.sk=[];S.lvl0=1;for(const o of[S.up,S.ru])for(const k of Object.keys(o))if(/^[was]\d$|^w:/.test(k))delete o[k];S.wc="schwert";
 Object.assign(S,{exp:0,ruhm:0,gold:50+500*blessV("start"),st:3,au:3,ge:3,w:0,a:0,s:0,boss:0,rv:0});if(blessV("start")){S.it.h+=3*blessV("start");S.it.H+=blessV("start")}
 const b=BLESS.find(x=>x.id===bid);msg=t("rb.done",S.star,`${b.e} <b>${b.n}</b>`);sfx("level");checkTitles(QN);save();home()}

// ---- Ruhmeshalle: die besten Turmläufe ----
function hallAdd(fl){if(fl<1)return;S.hall=S.hall||[];S.hall.push({f:fl,d:S.day,t:Date.now(),st:S.star});S.hall.sort((a,b)=>b.f-a.f);S.hall=S.hall.slice(0,5)}
const hallHtml=()=>`<h3>🗼 ${t("tw.hall")}</h3>${(S.hall||[]).length?(S.hall.map((h,i)=>`<div class="row"><span>${["🥇","🥈","🥉","4.","5."][i]} ${t("tw.floor")} <b>${h.f}</b></span><span class="mut">${t("cal.day")} ${h.d}${h.st?" · 🌟×"+h.st:""} · ${new Date(h.t).toLocaleDateString(t("locale"))}</span></div>`).join("")):`<div class="mut">${t("tw.hallNone")}</div>`}`;
