// Ritter Manager – Bildschirme: Burg, Markt, Inventar, Titel, Anleitung
function checkTitles(l){TT.forEach(x=>{if(!S.tt.includes(x.id)&&x.t()){S.tt.push(x.id);if(!S.title)S.title=x.id;l.push(`🎖️ <b>${t("ttl.new",gn(x.n))}</b>`)}})}
const GUIDE_F=t("guide.file"),GUIDE_SRC=[GUIDE_F,"https://raw.githubusercontent.com/ttrabold/Rittermanager/main/"+GUIDE_F],GUIDE_WEB="https://github.com/ttrabold/Rittermanager/blob/main/"+GUIDE_F;
let guideHtml=null;
const slug=t=>t.toLowerCase().replace(/<[^>]+>/g,"").replace(/[^\p{L}\p{N} -]/gu,"").trim().replace(/ /g,"-");
function mdInline(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/🪙/g,"<i class=coin></i>").replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\*(.+?)\*/g,"<i>$1</i>").replace(/\[([^\]]+)\]\(([^)]+)\)/g,(m,a,h)=>h[0]==="#"?`<a href="${h}" onclick="document.getElementById('${h.slice(1)}')?.scrollIntoView({behavior:'smooth'});return false">${a}</a>`:`<a href="${h}" target="_blank" rel="noopener">${a}</a>`)}
function md(src){const L=src.replace(/\r/g,"").split("\n"),o=[];let i=0;
 const cells=r=>r.trim().replace(/^\||\|$/g,"").split("|").map(c=>mdInline(c.trim()));
 while(i<L.length){const l=L[i];
  if(!l.trim()){i++;continue}
  let m=l.match(/^(#{1,3}) (.*)/);if(m){const t=m[2].trim();o.push(`<h${m[1].length} id="${slug(t)}">${mdInline(t)}</h${m[1].length}>`);i++;continue}
  if(/^---+\s*$/.test(l)){o.push("<hr>");i++;continue}
  if(l.startsWith("|")){const rows=[];while(i<L.length&&L[i].startsWith("|"))rows.push(L[i++]);const h=cells(rows[0]),b=rows.slice(2).map(cells);o.push(`<div class="tbl"><table><tr>${h.map(c=>`<th>${c}</th>`).join("")}</tr>${b.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`);continue}
  if(l.startsWith(">")){const q=[];while(i<L.length&&L[i].startsWith(">"))q.push(L[i++].replace(/^>\s?/,""));o.push(`<blockquote>${mdInline(q.join(" "))}</blockquote>`);continue}
  if(/^(- |\d+\. )/.test(l)){const ol=/^\d/.test(l),it=[];while(i<L.length&&/^(- |\d+\. )/.test(L[i]))it.push(L[i++].replace(/^(- |\d+\. )/,""));o.push(`<${ol?"ol":"ul"}>${it.map(x=>`<li>${mdInline(x)}</li>`).join("")}</${ol?"ol":"ul"}>`);continue}
  const p=[];while(i<L.length&&L[i].trim()&&!/^(#|\||>|- |\d+\. |---)/.test(L[i]))p.push(L[i++]);o.push(`<p>${mdInline(p.join(" "))}</p>`)}
 return o.join("")}
async function guide(){musicSet("hall");
 const shell=c=>{app.innerHTML=`<div class="top"><b>📖 ${t("guide.t")}</b><button onclick="home()" style="min-height:36px;padding:4px 12px">${t("c.backS")}</button></div><div class="card doc">${c}</div><div class="grid"><button style="grid-column:1/-1" onclick="home()">${t("c.back")}</button></div>`;window.scrollTo(0,0)};
 if(!guideHtml){shell(`<p class="mut">${t("guide.load")}</p>`);
  for(const u of GUIDE_SRC){try{const r=await fetch(u);if(r.ok){guideHtml=md(await r.text());break}}catch(e){}}}
 shell(guideHtml||`<p>${t("guide.fail")}</p><p><a href="${GUIDE_WEB}" target="_blank" rel="noopener">${t("guide.web")}</a></p>`)}
function setTitle(id){S.title=id;save();sfx("buff");titles()}
function titles(){musicSet("hall");app.innerHTML=`<div class="top"><b>🎖️ ${t("ttl.t")}</b><span>${S.tt.length}/${TT.length}</span></div>
 <div class="card"><div class="row"><span>${t("ttl.none")}</span><button ${S.title?"":'class="p"'} onclick="setTitle(null)">${S.title?t("c.choose"):t("ttl.active")}</button></div>
 ${TT.map(x=>{const own=S.tt.includes(x.id),on=S.title===x.id;return `<div class="row"><span>${own?"":"🔒 "}<b>${gn(x.n)}</b><br><span class="mut">${x.d}</span></span>${own?`<button ${on?'class="p"':""} onclick="setTitle('${x.id}')">${on?t("ttl.worn"):t("ttl.wear")}</button>`:`<span class="mut">${x.p()}</span>`}</div>`}).join("")}</div>
 <div class="grid">${backBtn()}</div>`}
let editName=false;
function toggleSex(){const f=S.sex!=="f";if(Object.keys(LANGS).some(l=>[I18N[l].name.m,I18N[l].name.f].includes(S.name)))S.name=t(f?"name.f":"name.m");S.sex=f?"f":"m";save();sfx("buff");msg=t("sex.to",f);home()}
function saveName(){const v=document.getElementById("nm").value.replace(/[<>&"'`]/g,"").trim().slice(0,20);if(v)S.name=v;editName=false;save();msg=v?t("name.set",S.name,S.sex==="f"):msg;home()}
// ---- Inventar ----
function inv(keep){musicSet("home");const hb=hintBox("inv");
 const p=v=>t("pct",Math.round(v*100)),eff=[],R=k=>fxv(k);
 if(R("burn"))eff.push("🔥 "+p(R("burn"))+" "+t("fx.burn"));if(R("poison"))eff.push("☠️ "+p(R("poison"))+" "+t("fx.poison"));if(R("stun"))eff.push("❄️ "+p(R("stun"))+" "+t("fx.stun"));
 if(R("life"))eff.push("💚 "+p(R("life"))+" "+t("fx.life"));if(R("regen"))eff.push("🌙 "+t("fx.regenR",R("regen")));if(R("noburn"))eff.push("🧯 "+t("fx.noburn"));
 const fx=k=>{const e=eq(k),r=(S.ru[ikey(k)]||[]).map(id=>RU.find(x=>x.id===id)).filter(Boolean);return [e?e.d:"",...r.map(x=>"✦ "+x.n+" ("+x.d+")")].filter(Boolean).join(" · ")||t("inv.nopow")};
 const slot=(ic,lbl,name,val,d)=>`<div class="row"><span>${ic} <b>${lbl}</b><br>${name}<br><span class="mut">${d}</span></span><b style="white-space:nowrap">${val}</b></div>`;
 const list=sd=>S.own.map(id=>EI.find(x=>x.id===id)).filter(it=>it&&it.s===sd).map(it=>{const on=S[sd==="w"?"ew":"ea"]===it.id,u=S.up[it.id]||0,r=(S.ru[it.id]||[]).length;
  return `<div class="row"><span>${it.cr?"⚒️":"✨"} ${it.n}${u?" +"+u:""}${r?" "+"✦".repeat(r):""} <span class="mut">+${it.b+(sd==="w"?u*2:u)}</span><br><span class="mut">${it.d}</span></span><button ${on?'class="p"':""} onclick="equipE('${it.id}')">${on?t("c.unequip"):t("c.equip")}</button></div>`}).join("")||`<div class="mut">${t("inv.none")}</div>`;
 app.innerHTML=`<div class="top"><b>🎒 ${t("inv.t")}</b><span><i class=coin></i> ${S.gold}</span></div>${hb}
 <div class="scene" style="height:170px">${BG}${pk()}</div>
 <div class="card"><h3>🛡️ ${t("inv.eq")}</h3>
 ${slot(wcat().e,t("inv.weapon")+" · "+wcat().n,iname("w"),"+"+wBon()+" ⚔️",fx("w")+"<br>"+wcat().d)}
 ${slot("🛡️",t("inv.armor"),iname("a"),"+"+aBon()+" 🛡️",fx("a"))}
 ${slot("🔰",t("inv.shield"),iname("sh"),"+"+sBon()+" 🛡️",S.es||(S.ru[ikey("sh")]||[]).length?fx("sh"):S.s?t("inv.shBlock"):t("inv.shBuy"))}</div>
 <div class="card"><h3>📊 ${t("inv.stats")}</h3><div class="stats">
 <div>⚔️ ${t("st.dmg")} <b>${5+Math.floor(S.st*1.3)+wBon()}</b></div><div>🛡️ ${t("st.prot")} <b>${aBon()+sBon()}</b></div>
 <div>❤️ ${t("st.maxhp")} <b>${maxhp()}</b></div><div>💥 ${t("st.crit")} <b>${p(Math.min(.6,S.ge*.03+R("crit")))}</b></div>
 <div>💨 ${t("st.dodge")} <b>+${t("pct",S.ge+R("dodge"))}</b></div>${S.star?`<div>🌟 ${t("st.bonus")} <b>+${t("pct",S.star*10)}</b></div>`:""}</div>
 ${eff.length?`<div class="mut" style="margin-top:6px">${eff.join(" · ")}</div>`:""}</div>
 <div class="card">${bagHtml()}</div>
 ${S.own.length?`<div class="card"><h3>🗡️ ${t("inv.spW")}</h3>${list("w")}<h3>🛡️ ${t("inv.spA")}</h3>${list("a")}</div>`:""}
 <div class="card"><h3>🧪 ${t("inv.pot")}</h3>${IT.map(t=>`<div class="row"><span>${t.e} ${t.n} <span class="mut">${t.d}</span></span><b>×${S.it[t.k]}</b></div>`).join("")}<div class="mut" style="margin-top:6px">${t("inv.potHint")}</div></div>
 <div class="card"><h3>📦 ${t("inv.mat")}</h3>${MAT.map(m=>`<div class="row"><span>${m.e} ${m.n}</span><b>×${S.mat[m.k]}</b></div>`).join("")}</div>
 <div class="card"><button style="width:100%" onclick="bestScr()">📖 ${t("best.t")}<small>${t("inv.bestSub",BST.filter(x=>(S.bst||{})[x.k]).length,BST.length)}</small></button></div>
 ${has("tower")?`<div class="card">${hallHtml()}</div>`:""}
 <div class="card"><h3>🏆 ${t("inv.troph")}</h3><div class="stats"><div>🏆 ${t("st.cups")} <b>${S.troph}</b></div><div>👑 ${t("st.bosses")} <b>${S.bk.length}/${BOSS.length}</b></div><div>🎖️ ${t("ttl.t")} <b>${S.tt.length}/${TT.length}</b></div><div>🗼 ${t("st.tbest")} <b>${S.tbest}</b></div></div></div>
 <div class="grid"><button onclick="shop()">🏪 ${t("shop.t")}</button><button onclick="workshop()">🧰 ${t("ws.t")}</button>${backBtn()}</div>`;if(!keep)window.scrollTo(0,0)}
function home(){musicSet("home");if(QN.length){msg+="<br>"+QN.join("<br>");QN=[]}
 app.innerHTML=`<div class="top">${editName?`<span style="display:flex;gap:6px;flex:1;margin-right:8px"><input id="nm" maxlength="20" value="${S.name}" onkeydown="if(event.key==='Enter')saveName()" style="flex:1;min-width:0;font:inherit;padding:6px 8px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--ink)"><button onclick="saveName()" style="min-height:36px;padding:4px 12px">✔</button></span>`:`<b>${S.name} <a href="#" onclick="editName=true;home();document.getElementById('nm').focus();return false" aria-label="${t("home.rename")}" style="text-decoration:none">✏️</a> <a href="#" onclick="toggleSex();return false" aria-label="${t("home.sexA")}" title="${t("home.sexT")}" style="text-decoration:none">${S.sex==="f"?"♀️":"♂️"}</a></b>`}<span>${rank()}${S.star?" · 🌟×"+S.star:""}</span></div>
 ${has("cal")?calLine():""}
 <div class="scene">${BG}${bldSvg()}${decoSvg()}${castleSvg()}<div style="position:relative;z-index:2;display:flex;align-items:flex-end">${compSvg(S.cmp)}${pk()}</div></div>
 <details class="card stc" ${statOpen()?"open":""} ontoggle="statOpen(this.open)"><summary>⭐ ${t("st.lvl")} <b>${lvl()}</b> · ⚡ <b>${S.en}/${enMax()}</b> · <i class=coin></i> <b>${S.gold}</b> · 🏆 <b>${S.ruhm}</b>${(S.buffs||[]).length?" · ✨":""}</summary><div class="stats" style="margin-top:6px">
 <div>💪 ${t("st.st")} <b>${S.st}</b></div>
 <div>❤️ ${t("st.au")} <b>${S.au}</b></div>
 <div>🎯 ${t("st.ge")} <b>${S.ge}</b></div>
 <div>⚡ ${t("st.en")} <b>${S.en}/${enMax()}</b>${bar(S.en,enMax(),"#e0a800")}</div>
 <div><i class=coin></i> ${t("st.gold")} <b>${S.gold}</b></div><div>🏆 ${t("st.ruhm")} <b>${S.ruhm}</b></div><div style="grid-column:1/-1">🎖️ ${ttn()?"<b>"+ttn()+"</b>":`<span class="mut">${t("ttl.noneL")}</span>`}${S.tt.length?` · <a href="#" onclick="titles();return false" style="color:var(--acc)">${t("ttl.t")} (${S.tt.length}/${TT.length})</a>`:""} · <a href="#" onclick="guide();return false" style="color:var(--acc)">📖 ${t("guide.t")}</a></div>
 <div style="grid-column:1/-1">⭐ ${t("st.lvl")} <b>${lvl()}</b> <span class="mut">(${S.exp} ${t("st.xp")})</span>${bar(S.exp-expFor(lvl()),expFor(lvl()+1)-expFor(lvl()),"#8e44ad")}</div></div>
 <div class="mut" style="margin-top:6px">${t("inv.weapon")}: ${iname("w")} · ${t("inv.armor")}: ${iname("a")} · ${iname("sh")}<br>${t("st.wins")} ${S.wins} · ${t("st.losses")} ${S.losses}${has("tour")?" · "+t("st.cups")+" "+S.troph:""}${has("boss")?` · ${t("st.bosses")} ${S.boss}/${BOSS.length}`:""}${has("tower")?" · "+t("st.tbest")+" "+S.tbest:""}${(S.buffs||[]).length?"<br>✨ "+S.buffs.map(b=>t("buff.left",bname(b),b.n)).join(", "):""}</div></details>
 <div class="msg">${msg}</div>
 ${has("quests")?questCard():""}
 ${homeGrid()}
 ${has("skills")?"":"<!--"}<div class="card"><h3>📜 ${t("skl.t")} <span class="mut">(${t("skl.eqN",(S.sk||[]).filter(knowSk).length,skMax())})</span></h3><div class="mut">${eqSk().map(id=>SKD(id).n).join(" · ")}</div>${SK.some(x=>x.id!=="hieb"&&knowSk(x.id)&&!(S.sk||[]).includes(x.id))&&(S.sk||[]).length<skMax()?`<div style="margin-top:4px">⚠️ ${t("skl.free")}</div>`:""}<div class="grid"><button style="grid-column:1/-1" onclick="seen('skills');skillsScr()">📜 ${t("skl.manage")}${newTag("skills")}<small>${t("skl.learned",SK.filter(x=>knowSk(x.id)).length,SK.length)}</small></button></div><div class="mut" style="margin-top:6px">${t("inv.pot")}: ${IT.map(t=>t.e+" "+S.it[t.k]).join("  ")}</div></div>${has("skills")?"":"-->"}
 <p class="mut" style="text-align:center"><a href="#" onclick="saveScr();return false" style="color:var(--acc)">💾 ${t("sv.link",SLOT)}</a> · ${Object.keys(LANGS).filter(l=>l!==LANG).map(l=>`<a href="#" onclick="setLang('${l}');return false" style="color:var(--acc)">🌐 ${LANGS[l]}</a>`).join(" · ")}</p>`;
}
function work(){
 if(S.en<1)return;S.en--;const g=rnd(8,14)+lvl()*2;S.gold+=g;sfx("coin");
 const j=t("work.jobs");
 msg=t("work.msg",j[rnd(0,j.length-1)],g);qProg("work");save();home();
}
function shop(){musicSet("home");
 const sec=(hd,L,k,ic)=>`<h3>${ic} ${hd}</h3>`+L.map((x,i)=>{
  const own=S[k]===i,can=i>S[k]&&S.gold>=x[1],lower=i<S[k];
  return `<div class="row"><span>${x[0]} <span class="mut">+${x[2]}</span></span>${own?`<b>${t("c.equipped")}</b>`:lower?`<span class="mut">${t("shop.better")}</span>`:`<button ${can?"":"disabled"} onclick="buy('${k}',${i})">${x[1]} <i class=coin></i></button>`}</div>`}).join("");
 app.innerHTML=`<div class="top"><b>🏪 ${t("shop.t")}</b><span><i class=coin></i> ${S.gold}</span></div>
 <div class="scene" style="height:170px">${BG}${pk()}</div>
 <div class="card">${wpnSec()}${sec(t("shop.armor"),A,"a","🛡️")}${sec(t("shop.shields"),SH,"s","🔰")}<div class="row"><span class="mut">✨ ${t("shop.encHint")}</span><button onclick="inv()">🎒 ${t("inv.t")}</button></div><h3>🧪 ${t("inv.pot")}${isMarket(S.day)?` <span class="mut">· 🛒 ${t("shop.mday")}</span>`:""}</h3>${IT.map(x=>`<div class="row"><span>${x.e} ${x.n} ×${S.it[x.k]} <span class="mut">${x.d}</span></span><button ${S.gold>=ip(x.p)?"":"disabled"} onclick="buyIt('${x.k}')">${ip(x.p)} <i class=coin></i></button></div>`).join("")}</div>
 <div class="grid">${backBtn()}</div>`;
}
function buy(k,i){const L={w:W,a:A,s:SH}[k];if(S.gold<L[i][1])return;S.gold-=L[i][1];S[k]=i;sfx("coin");msg=t("shop.bought",L[i][0]);save();shop();}

function buyIt(k){const t=IT.find(x=>x.k===k),p=ip(t.p);if(S.gold<p)return;S.gold-=p;S.it[k]++;sfx("coin");save();shop()}

// ---- Fähigkeiten verwalten: höchstens 6 angelegt, der Schwerthieb ist immer dabei ----
function skEq(id){const sk=S.sk=S.sk||[];if(!knowSk(id)||id==="hieb"||sk.includes(id)||sk.length>=skMax())return;sk.push(id);sfx("buff");save();skillsScr()}
function skUn(id){S.sk=(S.sk||[]).filter(x=>x!==id);sfx("click");save();skillsScr()}
function skillsScr(){musicSet("hall");const sk=(S.sk||[]).filter(knowSk),pp=s=>s.pp>=99?t("skl.unl"):t("skl.perF",s.pp);
 const row=(s,btn)=>`<div class="row"><span><b>${s.n}</b> <span class="mut">· ${pp(s)}</span><br><span class="mut">${s.d}</span></span>${btn}</div>`;
 app.innerHTML=`<div class="top"><b>📜 ${t("skl.t")}</b><span>${t("skl.eqN",sk.length,skMax())}</span></div>${hintBox("skills")}
 <div class="msg" data-quiet>${t("skl.intro",skMax())}</div>
 <div class="card"><h3>⚔️ ${t("skl.avail")}</h3>${row(SKD("hieb"),`<span class="mut">${t("skl.always")}</span>`)}
 ${Array.from({length:skMax()},(_,k)=>{const id=sk[k];return id?row(SKD(id),`<button onclick="skUn('${id}')">${t("c.unequip")}</button>`):`<div class="row"><span class="mut">— ${t("skl.slot",k+1)} —</span></div>`}).join("")}</div>
 <div class="card"><h3>📖 ${t("skl.all")}</h3>${SK.filter(s=>s.id!=="hieb").map(s=>knowSk(s.id)?row(s,sk.includes(s.id)?`<span class="mut">${t("c.equipped")}</span>`:`<button ${sk.length>=skMax()?"disabled":""} onclick="skEq('${s.id}')">${sk.length>=skMax()?t("skl.full"):t("c.equip")}</button>`):`<div class="row"><span>🔒 <b>${s.n}</b><br><span class="mut">${s.d}</span></span><span class="mut">${t("c.fromLv",s.lv)}</span></div>`).join("")}</div>
 <div class="grid">${backBtn()}</div>`;window.scrollTo(0,0)}

// Burg-Knöpfe: nur freigeschaltete Funktionen, neue mit „NEU“-Markierung
function homeGrid(){const b=(id,js,lbl,sub,dis,cls)=>`<button ${cls?`class="${cls}"`:""} ${dis?"disabled":""} onclick="${id?`seen('${id}');`:""}${js}">${lbl}${id?newTag(id):""}<small>${sub}</small></button>`,half=[],full=[];
 half.push(b("","work()","⚒️ "+t("hg.work"),t("hg.workS"),S.en<1),b("","startFight()","⚔️ "+t("hg.adv"),t("hg.en",2),S.en<2,"p"),b("","shop()","🏪 "+t("shop.t"),t("hg.shopS")));
 if(has("inv"))half.push(b("inv","inv()","🎒 "+t("inv.t"),t("hg.invS")));
 if(has("craft"))half.push(b("craft","workshop()","🧰 "+t("ws.t"),t("hg.wsS")),b("craft","trader()","🛒 "+t("tr.t"),t("inv.mat")));
 if(has("tour"))half.push(b("tour","startTour()","🏟️ "+t("hg.tour"),(bagFull()?t("hg.bagFull"):t("hg.tourS",tourFee())),bagFull()||S.en<4||S.gold<tourFee()));
 if(has("tower"))half.push(b("tower","startTower()","🗼 "+t("hg.tower"),bagFull()?t("hg.bagFull"):t("hg.towerS",S.tcur,S.tbest),bagFull()||S.en<4));
 if(has("tavern"))half.push(b("tavern","TV.rum=rnd(0,99);tavern()","🍺 "+t("hg.tav"),t("hg.tavS",tavLeft())));
 if(has("burg"))half.push(b("burg","castleScr()","🏗️ "+t("cs.t"),t("hg.burgS")));
 if(has("comp"))half.push(b("comp","compScr()","🐾 "+t("cp.t"),S.cmp?COMP.find(c=>c.id===S.cmp).n:t("hg.nocomp")));
 if(has("boss"))full.push(BOSS[S.boss]?b("boss","startBoss()","👑 "+t("hg.boss"),bagFull()?t("hg.bagFull"):S.ruhm<BOSS[S.boss].req?t("hg.bossReq",BOSS[S.boss].req):BOSS[S.boss].n,bagFull()||S.en<3||S.ruhm<BOSS[S.boss].req,"p"):`<button disabled>👑 ${t("hg.allBoss")}</button>`);
 if(rivalReady())full.push(b("rival","startRival()","⚔️ "+t("hg.rival"),t("hg.rivalS",(S.rv||0)+1,RIVAL.length),S.en<3,"p"));
 if(has("boss")&&BOSS[S.boss]&&S.ruhm>=BOSS[S.boss].req)full.push(S.merc?`<button disabled>🗡️ ${t("hg.mercOn")}</button>`:b("","mercHire()","🗡️ "+t("hg.merc"),t("hg.mercS",mercCost()),S.gold<mercCost()));
 if(has("kasse"))full.push(S.kasse===S.day?`<button disabled>👑 ${t("hg.kasseOn")}</button>`:b("kasse","kasseGive()","👑 "+t("hg.kasse"),t("hg.kasseS",kasseCost(),kasseRuhm()),S.gold<kasseCost()));
 if(has("cal")&&isFull(S.day)&&S.moonDone!==S.day)full.push(`<button class="p" style="background:#3949ab;border-color:#3949ab" ${S.en<3?"disabled":""} onclick="startMoon()">🌕 ${t("hg.moon")}<small>${t("hg.moonS")}</small></button>`);
 const span=h=>h.replace("<button ",'<button style="grid-column:1/-1" ');
 if(half.length%2)half[half.length-1]=span(half[half.length-1]);
 const end=has("rebirth")?[b("rebirth","rebirth()","🌟 "+t("rb.t"),S.boss<BOSS.length?t("hg.rbLock"):t("hg.rbS"),S.boss<BOSS.length),b("","newDay()","🌙 "+t("hg.sleep"),t("hg.sleepY"))]:[span(b("","newDay()","🌙 "+t("hg.sleep"),has("burg")?t("hg.sleepY"):t("hg.sleepS")))];
 return `<div class="grid">${half.join("")}${full.map(span).join("")}${end.join("")}</div>`}

// ---- Spielstände: bis zu 3 Plätze ----
let slotDel=0;
function slotInfo(n){try{const x=localStorage.getItem(slotKey(n));if(!x)return null;const d=JSON.parse(x),L=(()=>{const e=d.exp||0;if(!d.xpv)return 1+Math.floor(Math.sqrt(e/20));let k=1;while(expFor(k+1)<=e)k++;return k})();return {d,L,r:rankOf(d.ruhm||0,d.sex)}}catch(e){return null}}
const agoTxt=ts=>{if(!ts)return "";const m=Math.round((Date.now()-ts)/60000);return m<1?t("ago.now"):m<60?t("ago.min",m):m<1440?t("ago.h",Math.round(m/60)):t("ago.d",Math.round(m/1440))};
function saveScr(){musicSet("hall");save();
 app.innerHTML=`<div class="top"><b>💾 ${t("sv.t")}</b><span>${t("sv.active",SLOT)}</span></div>${hintBox("save")}
 <div class="msg" data-quiet>${t("sv.intro",SLOTS)}</div>
 <div class="card">${Array.from({length:SLOTS},(_,k)=>{const n=k+1,i=slotInfo(n),act=n===SLOT;
  return `<div class="row"><span>${act?"▶️":"💾"} <b>${t("sv.slot",n)}</b>${act?` <span class="mut">(${t("sv.act")})</span>`:""}<br>${i?`${i.d.sex==="f"?"♀️":"♂️"} <b>${i.d.name}</b> · ${i.r} · ${t("st.lvl")} ${i.L}${i.d.star?" · 🌟×"+i.d.star:""}<br><span class="mut">${t("cal.day")} ${i.d.day||1} · <i class=coin></i>${i.d.gold||0} · ${t("st.bosses")} ${(i.d.bk||[]).length}/${BOSS.length}${i.d.ts?" · "+agoTxt(i.d.ts):""}</span>`:`<span class="mut">— ${t("sv.empty")} —</span>`}</span>
  <span style="display:flex;flex-direction:column;gap:6px">${act?"":`<button class="p" onclick="slotLoad(${n})">${i?t("sv.load"):t("sv.new")}</button>`}${i?(slotDel===n?`<button onclick="slotWipe(${n})" style="border-color:var(--acc);color:var(--acc)">${t("sv.delQ")}</button>`:`<button onclick="slotDel=${n};saveScr()">${act?t("sv.new"):t("sv.del")}</button>`):""}</span></div>`}).join("")}</div>
 <div class="card"><h3>📤 ${t("sv.exT")}</h3><div class="mut">${t("sv.exD")}</div>
 <div class="grid"><button onclick="expFile()">💾 ${t("sv.file")}</button><button onclick="expText()">📋 ${t("sv.text")}</button></div>
 <div style="margin-top:8px"><textarea id="imp" rows="3" placeholder="${t("sv.ph")}" style="width:100%;font:13px monospace;padding:6px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--ink)">${expBuf}</textarea></div>
 <div class="grid"><button onclick="document.getElementById('impf').click()">📂 ${t("sv.loadF")}</button><button ${impArm?'class="p"':""} onclick="impText()">${impArm?t("sv.impQ",SLOT):"📥 "+t("sv.imp")}</button></div>
 <input id="impf" type="file" accept=".txt,.json,text/plain" hidden onchange="impFile(this)">
 ${impMsg?`<div class="msg">${impMsg}</div>`:""}</div>
 <div class="grid"><button style="grid-column:1/-1" onclick="slotDel=0;impArm=0;impMsg='';expBuf='';home()">${t("c.back")}</button></div>`}
function slotLoad(n){save();try{localStorage.setItem("ritter_slot",String(n))}catch(e){}location.reload()}
function slotWipe(n){slotDel=0;try{localStorage.removeItem(slotKey(n))}catch(e){}if(n===SLOT){S=fresh();unlCheck();S.lvl0=1;S.sk=[];qGen();msg=t("sv.newMsg");save()}saveScr()}

function statOpen(v){try{if(v===undefined)return localStorage.getItem("ritter_stat")==="1";localStorage.setItem("ritter_stat",v?"1":"0")}catch(e){return true}}

// ---- Export / Import des Spielstands ----
let expBuf="",impArm=0,impMsg="";
const expStr=()=>{save();return "RITTERMANAGER1:"+btoa(unescape(encodeURIComponent(JSON.stringify(S))))};
function expText(){expBuf=expStr();impMsg=t("sv.inField");try{navigator.clipboard.writeText(expBuf).then(()=>{impMsg="📋 "+t("sv.copied");saveScr()},()=>{})}catch(e){}saveScr()}
function expFile(){try{const b=new Blob([expStr()],{type:"text/plain"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=`Rittermanager-${S.name.replace(/\s+/g,"_")}-${t("cal.day")}${S.day}.txt`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);impMsg="💾 "+t("sv.saving")}catch(e){impMsg=t("sv.saveFail")}saveScr()}
function impParse(t){t=(t||"").trim();if(!t.startsWith("RITTERMANAGER1:"))throw 0;const d=JSON.parse(decodeURIComponent(escape(atob(t.slice(15)))));if(!d||typeof d!=="object"||!("exp" in d)||!("name" in d))throw 0;return d}
function impText(){const tx=document.getElementById("imp").value;expBuf=tx;let d;try{d=impParse(tx)}catch(e){impArm=0;impMsg="⚠️ "+t("sv.invalid");return saveScr()}
 if(!impArm){impArm=1;impMsg=t("sv.found",String(d.name).replace(/[<>&"'`]/g,""),d.day||1,SLOT);return saveScr()}
 try{localStorage.setItem(slotKey(SLOT),JSON.stringify(d))}catch(e){}impArm=0;location.reload()}
function impFile(inp){const f=inp.files&&inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{expBuf=String(r.result||"");impArm=0;impText()};r.readAsText(f)}

// ---- Markt: Waffen nach Art ----
let shopCat=null;
function wpnSec(){const cur=S.wc||"schwert";shopCat=shopCat||cur;const c=WCAT[shopCat];
 return `<h3>⚔️ ${t("shop.weapons")}</h3><div style="display:flex;flex-wrap:wrap;gap:6px">${Object.keys(WCAT).map(k=>`<button ${k===shopCat?'class="p"':""} style="min-height:34px;padding:4px 10px;font-size:13px" onclick="shopCat='${k}';shop()">${WCAT[k].e} ${WCAT[k].n}</button>`).join("")}</div>
 <div class="mut" style="margin:6px 0">${c.e} <b>${c.n}:</b> ${c.d}${cur!==shopCat?"<br>"+t("shop.replace"):""}</div>`+
 WNAMES[shopCat].map((n,i)=>{const own=cur===shopCat&&S.w===i,low=cur===shopCat&&i<S.w,p=wPrice(shopCat,i);return `<div class="row"><span>${n} <span class="mut">+${W[i][2]}</span></span>${own?`<b>${t("c.equipped")}</b>`:low?`<span class="mut">${t("shop.weaker")}</span>`:`<button ${S.gold>=p?"":"disabled"} onclick="buyW('${shopCat}',${i})">${p} <i class=coin></i></button>`}</div>`}).join("")}
