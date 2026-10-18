// Ritter Manager – Bildschirme: Burg, Markt, Inventar, Titel, Anleitung
function checkTitles(l){TT.forEach(x=>{if(!S.tt.includes(x.id)&&x.t()){S.tt.push(x.id);if(!S.title)S.title=x.id;l.push(`🎖️ <b>Neuer Titel: ${gn(x.n)}</b>`)}})}
const GUIDE_SRC=["ANLEITUNG.md","https://raw.githubusercontent.com/ttrabold/Rittermanager/main/ANLEITUNG.md"],GUIDE_WEB="https://github.com/ttrabold/Rittermanager/blob/main/ANLEITUNG.md";
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
 const shell=c=>{app.innerHTML=`<div class="top"><b>📖 Anleitung</b><button onclick="home()" style="min-height:36px;padding:4px 12px">← Burg</button></div><div class="card doc">${c}</div><div class="grid"><button style="grid-column:1/-1" onclick="home()">← Zurück zur Burg</button></div>`;window.scrollTo(0,0)};
 if(!guideHtml){shell('<p class="mut">Die Anleitung wird geladen …</p>');
  for(const u of GUIDE_SRC){try{const r=await fetch(u);if(r.ok){guideHtml=md(await r.text());break}}catch(e){}}}
 shell(guideHtml||`<p>Die Anleitung konnte gerade nicht geladen werden.</p><p><a href="${GUIDE_WEB}" target="_blank" rel="noopener">Anleitung auf GitHub öffnen</a></p>`)}
function setTitle(id){S.title=id;save();sfx("buff");titles()}
function titles(){musicSet("hall");app.innerHTML=`<div class="top"><b>🎖️ Titel</b><span>${S.tt.length}/${TT.length}</span></div>
 <div class="card"><div class="row"><span>Kein Titel</span><button ${S.title?"":'class="p"'} onclick="setTitle(null)">${S.title?"Wählen":"Aktiv"}</button></div>
 ${TT.map(x=>{const own=S.tt.includes(x.id),on=S.title===x.id;return `<div class="row"><span>${own?"":"🔒 "}<b>${gn(x.n)}</b><br><span class="mut">${x.d}</span></span>${own?`<button ${on?'class="p"':""} onclick="setTitle('${x.id}')">${on?"Getragen":"Tragen"}</button>`:`<span class="mut">${x.p()}</span>`}</div>`}).join("")}</div>
 <div class="grid"><button style="grid-column:1/-1" onclick="home()">← Zurück zur Burg</button></div>`}
let editName=false;
function toggleSex(){const f=S.sex!=="f";if(S.name==="Sir Kunibert"||S.name==="Dame Kunigunde")S.name=f?"Dame Kunigunde":"Sir Kunibert";S.sex=f?"f":"m";save();sfx("buff");msg=f?"Aus dem Ritter wird eine <b>Ritterin</b>!":"Aus der Ritterin wird ein <b>Ritter</b>!";home()}
function saveName(){const v=document.getElementById("nm").value.replace(/[<>&"'`]/g,"").trim().slice(0,20);if(v)S.name=v;editName=false;save();msg=v?`Dein${S.sex==="f"?"e Ritterin":" Ritter"} heißt jetzt <b>${S.name}</b>!`:msg;home()}
// ---- Inventar ----
function inv(){musicSet("home");const hb=hintBox("inv");
 const p=v=>Math.round(v*100)+" %",eff=[],R=k=>fxv(k);
 if(R("burn"))eff.push("🔥 "+p(R("burn"))+" Brand");if(R("poison"))eff.push("☠️ "+p(R("poison"))+" Gift");if(R("stun"))eff.push("❄️ "+p(R("stun"))+" Lähmung");
 if(R("life"))eff.push("💚 "+p(R("life"))+" Lebensraub");if(R("regen"))eff.push("🌙 "+R("regen")+" LP pro Runde");if(R("noburn"))eff.push("🧯 Brandimmun");
 const fx=k=>{const e=eq(k),r=(S.ru[ikey(k)]||[]).map(id=>RU.find(x=>x.id===id)).filter(Boolean);return [e?e.d:"",...r.map(x=>"✦ "+x.n+" ("+x.d+")")].filter(Boolean).join(" · ")||"keine besonderen Kräfte"};
 const slot=(ic,lbl,name,val,d)=>`<div class="row"><span>${ic} <b>${lbl}</b><br>${name}<br><span class="mut">${d}</span></span><b style="white-space:nowrap">${val}</b></div>`;
 const list=sd=>S.own.map(id=>EI.find(x=>x.id===id)).filter(it=>it&&it.s===sd).map(it=>{const on=S[sd==="w"?"ew":"ea"]===it.id,u=S.up[it.id]||0,r=(S.ru[it.id]||[]).length;
  return `<div class="row"><span>${it.cr?"⚒️":"✨"} ${it.n}${u?" +"+u:""}${r?" "+"✦".repeat(r):""} <span class="mut">+${it.b+(sd==="w"?u*2:u)}</span><br><span class="mut">${it.d}</span></span><button ${on?'class="p"':""} onclick="equipE('${it.id}')">${on?"Ablegen":"Anlegen"}</button></div>`}).join("")||`<div class="mut">Noch keine.</div>`;
 app.innerHTML=`<div class="top"><b>🎒 Inventar</b><span><i class=coin></i> ${S.gold}</span></div>${hb}
 <div class="scene" style="height:170px">${BG}${pk()}</div>
 <div class="card"><h3>🛡️ Ausgerüstet</h3>
 ${slot(wcat().e,"Waffe · "+wcat().n,iname("w"),"+"+wBon()+" ⚔️",fx("w")+"<br>"+wcat().d)}
 ${slot("🛡️","Rüstung",iname("a"),"+"+aBon()+" 🛡️",fx("a"))}
 ${slot("🔰","Schild",iname("sh"),"+"+sBon()+" 🛡️",S.es||(S.ru[ikey("sh")]||[]).length?fx("sh"):S.s?"Fängt Schaden ab":"Auf dem Markt erhältlich")}</div>
 <div class="card"><h3>📊 Kampfwerte</h3><div class="stats">
 <div>⚔️ Schaden <b>${5+Math.floor(S.st*1.3)+wBon()}</b></div><div>🛡️ Schutz <b>${aBon()+sBon()}</b></div>
 <div>❤️ Max. LP <b>${maxhp()}</b></div><div>💥 Krit <b>${p(Math.min(.6,S.ge*.03+R("crit")))}</b></div>
 <div>💨 Ausweichen <b>+${S.ge+R("dodge")} %</b></div>${S.star?`<div>🌟 Bonus <b>+${S.star*10} %</b></div>`:""}</div>
 ${eff.length?`<div class="mut" style="margin-top:6px">${eff.join(" · ")}</div>`:""}</div>
 <div class="card">${bagHtml()}</div>
 ${S.own.length?`<div class="card"><h3>🗡️ Besondere Waffen</h3>${list("w")}<h3>🛡️ Besondere Rüstungen</h3>${list("a")}</div>`:""}
 <div class="card"><h3>🧪 Tränke</h3>${IT.map(t=>`<div class="row"><span>${t.e} ${t.n} <span class="mut">${t.d}</span></span><b>×${S.it[t.k]}</b></div>`).join("")}<div class="mut" style="margin-top:6px">Tränke setzt du im Kampf über 🎒 Tränke ein.</div></div>
 <div class="card"><h3>📦 Materialien</h3>${MAT.map(m=>`<div class="row"><span>${m.e} ${m.n}</span><b>×${S.mat[m.k]}</b></div>`).join("")}</div>
 <div class="card"><button style="width:100%" onclick="bestScr()">📖 Bestiarium<small>${BST.filter(x=>(S.bst||{})[x.k]).length}/${BST.length} Gegner entdeckt</small></button></div>
 ${has("tower")?`<div class="card">${hallHtml()}</div>`:""}
 <div class="card"><h3>🏆 Trophäen</h3><div class="stats"><div>🏆 Pokale <b>${S.troph}</b></div><div>👑 Bosse <b>${S.bk.length}/${BOSS.length}</b></div><div>🎖️ Titel <b>${S.tt.length}/${TT.length}</b></div><div>🗼 Turm-Rekord <b>${S.tbest}</b></div></div></div>
 <div class="grid"><button onclick="shop()">🏪 Markt</button><button onclick="workshop()">🧰 Werkstatt</button><button style="grid-column:1/-1" onclick="home()">← Zurück zur Burg</button></div>`;window.scrollTo(0,0)}
function home(){musicSet("home");if(QN.length){msg+="<br>"+QN.join("<br>");QN=[]}
 app.innerHTML=`<div class="top">${editName?`<span style="display:flex;gap:6px;flex:1;margin-right:8px"><input id="nm" maxlength="20" value="${S.name}" onkeydown="if(event.key==='Enter')saveName()" style="flex:1;min-width:0;font:inherit;padding:6px 8px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--ink)"><button onclick="saveName()" style="min-height:36px;padding:4px 12px">✔</button></span>`:`<b>${S.name} <a href="#" onclick="editName=true;home();document.getElementById('nm').focus();return false" aria-label="Ritter umbenennen" style="text-decoration:none">✏️</a> <a href="#" onclick="toggleSex();return false" aria-label="Zwischen Ritter und Ritterin wechseln" title="Ritter/Ritterin wechseln" style="text-decoration:none">${S.sex==="f"?"♀️":"♂️"}</a></b>`}<span>${rank()}${S.star?" · 🌟×"+S.star:""}</span></div>
 ${has("cal")?calLine():""}
 <div class="scene">${BG}${bldSvg()}${decoSvg()}${castleSvg()}<div style="position:relative;z-index:2;display:flex;align-items:flex-end">${compSvg(S.cmp)}${pk()}</div></div>
 <details class="card stc" ${statOpen()?"open":""} ontoggle="statOpen(this.open)"><summary>⭐ Stufe <b>${lvl()}</b> · ⚡ <b>${S.en}/${enMax()}</b> · <i class=coin></i> <b>${S.gold}</b> · 🏆 <b>${S.ruhm}</b>${(S.buffs||[]).length?" · ✨":""}</summary><div class="stats" style="margin-top:6px">
 <div>💪 Stärke <b>${S.st}</b></div>
 <div>❤️ Ausdauer <b>${S.au}</b></div>
 <div>🎯 Geschick <b>${S.ge}</b></div>
 <div>⚡ Energie <b>${S.en}/${enMax()}</b>${bar(S.en,enMax(),"#e0a800")}</div>
 <div><i class=coin></i> Gold <b>${S.gold}</b></div><div>🏆 Ruhm <b>${S.ruhm}</b></div><div style="grid-column:1/-1">🎖️ ${ttn()?"<b>"+ttn()+"</b>":'<span class="mut">kein Titel</span>'}${S.tt.length?` · <a href="#" onclick="titles();return false" style="color:var(--acc)">Titel (${S.tt.length}/${TT.length})</a>`:""} · <a href="#" onclick="guide();return false" style="color:var(--acc)">📖 Anleitung</a></div>
 <div style="grid-column:1/-1">⭐ Stufe <b>${lvl()}</b> <span class="mut">(${S.exp} EP)</span>${bar(S.exp-expFor(lvl()),expFor(lvl()+1)-expFor(lvl()),"#8e44ad")}</div></div>
 <div class="mut" style="margin-top:6px">Waffe: ${iname("w")} · Rüstung: ${iname("a")} · ${iname("sh")}<br>Siege ${S.wins} · Niederlagen ${S.losses}${has("tour")?" · Pokale "+S.troph:""}${has("boss")?` · Bosse ${S.boss}/${BOSS.length}`:""}${has("tower")?" · Turm-Rekord "+S.tbest:""}${(S.buffs||[]).length?"<br>✨ "+S.buffs.map(b=>b.name+" (noch "+b.n+" Kämpfe)").join(", "):""}</div></details>
 <div class="msg">${msg}</div>
 ${has("quests")?questCard():""}
 ${homeGrid()}
 ${has("skills")?"":"<!--"}<div class="card"><h3>📜 Fähigkeiten <span class="mut">(${(S.sk||[]).filter(knowSk).length}/${skMax()} angelegt)</span></h3><div class="mut">${eqSk().map(id=>SKD(id).n).join(" · ")}</div>${SK.some(x=>x.id!=="hieb"&&knowSk(x.id)&&!(S.sk||[]).includes(x.id))&&(S.sk||[]).length<skMax()?'<div style="margin-top:4px">⚠️ Du hast freie Plätze!</div>':""}<div class="grid"><button style="grid-column:1/-1" onclick="seen('skills');skillsScr()">📜 Fähigkeiten verwalten${newTag("skills")}<small>${SK.filter(x=>knowSk(x.id)).length}/${SK.length} gelernt</small></button></div><div class="mut" style="margin-top:6px">Tränke: ${IT.map(t=>t.e+" "+S.it[t.k]).join("  ")}</div></div>${has("skills")?"":"-->"}
 <p class="mut" style="text-align:center"><a href="#" onclick="saveScr();return false" style="color:var(--acc)">💾 Spielstände (Platz ${SLOT})</a></p>`;
}
function work(){
 if(S.en<1)return;S.en--;const g=rnd(8,14)+lvl()*2;S.gold+=g;sfx("coin");
 const t=["Du hilfst dem Schmied","Du bewachst die Stadttore","Du hackst Holz für den Burgvogt","Du eskortierst einen Händler"];
 msg=`${t[rnd(0,3)]} und verdienst <b>${g} Gold</b>.`;qProg("work");save();home();
}
function shop(){musicSet("home");
 const sec=(t,L,k,ic)=>`<h3>${ic} ${t}</h3>`+L.map((x,i)=>{
  const own=S[k]===i,can=i>S[k]&&S.gold>=x[1],lower=i<S[k];
  return `<div class="row"><span>${x[0]} <span class="mut">+${x[2]}</span></span>${own?'<b>✔ angelegt</b>':lower?'<span class="mut">besser vorhanden</span>':`<button ${can?"":"disabled"} onclick="buy('${k}',${i})">${x[1]} <i class=coin></i></button>`}</div>`}).join("");
 app.innerHTML=`<div class="top"><b>🏪 Markt</b><span><i class=coin></i> ${S.gold}</span></div>
 <div class="scene" style="height:170px">${BG}${pk()}</div>
 <div class="card">${wpnSec()}${sec("Rüstungen",A,"a","🛡️")}${sec("Schilde",SH,"s","🔰")}<div class="row"><span class="mut">✨ Verzauberte und geschmiedete Ausrüstung legst du im Inventar an.</span><button onclick="inv()">🎒 Inventar</button></div><h3>🧪 Tränke${isMarket(S.day)?' <span class="mut">· 🛒 Markttag −25 %</span>':""}</h3>${IT.map(t=>`<div class="row"><span>${t.e} ${t.n} ×${S.it[t.k]} <span class="mut">${t.d}</span></span><button ${S.gold>=ip(t.p)?"":"disabled"} onclick="buyIt('${t.k}')">${ip(t.p)} <i class=coin></i></button></div>`).join("")}</div>
 <div class="grid"><button style="grid-column:1/-1" onclick="home()">← Zurück zur Burg</button></div>`;
}
function buy(k,i){const L={w:W,a:A,s:SH}[k];if(S.gold<L[i][1])return;S.gold-=L[i][1];S[k]=i;sfx("coin");msg=`Gekauft: <b>${L[i][0]}</b>!`;save();shop();}

function buyIt(k){const t=IT.find(x=>x.k===k),p=ip(t.p);if(S.gold<p)return;S.gold-=p;S.it[k]++;sfx("coin");save();shop()}

// ---- Fähigkeiten verwalten: höchstens 6 angelegt, der Schwerthieb ist immer dabei ----
function skEq(id){const sk=S.sk=S.sk||[];if(!knowSk(id)||id==="hieb"||sk.includes(id)||sk.length>=skMax())return;sk.push(id);sfx("buff");save();skillsScr()}
function skUn(id){S.sk=(S.sk||[]).filter(x=>x!==id);sfx("click");save();skillsScr()}
function skillsScr(){musicSet("hall");const sk=(S.sk||[]).filter(knowSk),pp=s=>s.pp>=99?"unbegrenzt":s.pp+"× pro Kampf";
 const row=(s,btn)=>`<div class="row"><span><b>${s.n}</b> <span class="mut">· ${pp(s)}</span><br><span class="mut">${s.d}</span></span>${btn}</div>`;
 app.innerHTML=`<div class="top"><b>📜 Fähigkeiten</b><span>${sk.length}/${skMax()} angelegt</span></div>${hintBox("skills")}
 <div class="msg" data-quiet>Du kannst bis zu <b>${skMax()} Fähigkeiten</b> anlegen, die du im Kampf einsetzt. Der <b>Schwerthieb</b> ist als Grundangriff immer dabei. Neue Fähigkeiten lernst du beim Stufenaufstieg.</div>
 <div class="card"><h3>⚔️ Im Kampf verfügbar</h3>${row(SKD("hieb"),'<span class="mut">immer</span>')}
 ${Array.from({length:skMax()},(_,k)=>{const id=sk[k];return id?row(SKD(id),`<button onclick="skUn('${id}')">Ablegen</button>`):`<div class="row"><span class="mut">— freier Platz ${k+1} —</span></div>`}).join("")}</div>
 <div class="card"><h3>📖 Alle Fähigkeiten</h3>${SK.filter(s=>s.id!=="hieb").map(s=>knowSk(s.id)?row(s,sk.includes(s.id)?'<span class="mut">✔ angelegt</span>':`<button ${sk.length>=skMax()?"disabled":""} onclick="skEq('${s.id}')">${sk.length>=skMax()?"Plätze voll":"Anlegen"}</button>`):`<div class="row"><span>🔒 <b>${s.n}</b><br><span class="mut">${s.d}</span></span><span class="mut">ab Stufe ${s.lv}</span></div>`).join("")}</div>
 <div class="grid"><button style="grid-column:1/-1" onclick="home()">← Zurück zur Burg</button></div>`;window.scrollTo(0,0)}

// Burg-Knöpfe: nur freigeschaltete Funktionen, neue mit „NEU“-Markierung
function homeGrid(){const b=(id,js,lbl,sub,dis,cls)=>`<button ${cls?`class="${cls}"`:""} ${dis?"disabled":""} onclick="${id?`seen('${id}');`:""}${js}">${lbl}${id?newTag(id):""}<small>${sub}</small></button>`,half=[],full=[];
 half.push(b("","work()","⚒️ Arbeiten","1 Energie · Gold",S.en<1),b("","startFight()","⚔️ Abenteuer","2 Energie",S.en<2,"p"),b("","shop()","🏪 Markt","Ausrüstung & Tränke"));
 if(has("inv"))half.push(b("inv","inv()","🎒 Inventar","Ausrüstung & Beutel"));
 if(has("craft"))half.push(b("craft","workshop()","🧰 Werkstatt","Berufe · 1 Energie"),b("craft","trader()","🛒 Händler","Materialien"));
 if(has("tour"))half.push(b("tour","startTour()","🏟️ Turnier",(bagFull()?"🎒 Beutel voll – erst aufräumen":`4 Energie · ${tourFee()?tourFee()+" <i class=coin></i>":"heute gratis!"} · 3 Kämpfe`),bagFull()||S.en<4||S.gold<tourFee()));
 if(has("tower"))half.push(b("tower","startTower()","🗼 Endloser Turm",bagFull()?"🎒 Beutel voll – erst aufräumen":"4 Energie · "+(S.tcur>1?"weiter ab Etage "+S.tcur:"Rekord "+S.tbest),bagFull()||S.en<4));
 if(has("tavern"))half.push(b("tavern","TV.rum=rnd(0,99);tavern()","🍺 Taverne",`Würfelpoker · noch ${tavLeft()} heute`));
 if(has("burg"))half.push(b("burg","castleScr()","🏗️ Burgausbau","Gebäude & Erträge"));
 if(has("comp"))half.push(b("comp","compScr()","🐾 Begleiter",S.cmp?COMP.find(c=>c.id===S.cmp).n:"niemand dabei"));
 if(has("boss"))full.push(BOSS[S.boss]?b("boss","startBoss()","👑 Bosskampf",bagFull()?"🎒 Beutel voll – erst aufräumen":S.ruhm<BOSS[S.boss].req?"ab "+BOSS[S.boss].req+" Ruhm":BOSS[S.boss].n,bagFull()||S.en<3||S.ruhm<BOSS[S.boss].req,"p"):'<button disabled>👑 Alle Bosse besiegt</button>');
 if(rivalReady())full.push(b("rival","startRival()",`⚔️ Herausforderung: Sir Gregor`,`Duell ${(S.rv||0)+1}/${RIVAL.length} · 3 Energie`,S.en<3,"p"));
 if(has("boss")&&BOSS[S.boss]&&S.ruhm>=BOSS[S.boss].req)full.push(S.merc?'<button disabled>🗡️ Söldner angeheuert – er kämpft im nächsten Bosskampf</button>':b("","mercHire()","🗡️ Söldner anheuern",`${mercCost()} Gold · hilft im nächsten Bosskampf`,S.gold<mercCost()));
 if(has("kasse"))full.push(S.kasse===S.day?'<button disabled>👑 Kriegskasse – heute schon gespendet</button>':b("kasse","kasseGive()","👑 Kriegskasse des Königs",`${kasseCost()} <i class=coin></i> → +${kasseRuhm()} Ruhm · einmal am Tag`,S.gold<kasseCost()));
 if(has("cal")&&isFull(S.day)&&S.moonDone!==S.day)full.push(`<button class="p" style="background:#3949ab;border-color:#3949ab" ${S.en<3?"disabled":""} onclick="startMoon()">🌕 Vollmond-Jagd<small>3 Energie · nur heute Nacht · ein Versuch</small></button>`);
 const span=h=>h.replace("<button ",'<button style="grid-column:1/-1" ');
 if(half.length%2)half[half.length-1]=span(half[half.length-1]);
 const end=has("rebirth")?[b("rebirth","rebirth()","🌟 Wiedergeburt",S.boss<BOSS.length?"nach allen Bossen":"Neustart mit Bonus",S.boss<BOSS.length),b("","newDay()","🌙 Schlafen","Erträge · neuer Tag")]:[span(b("","newDay()","🌙 Schlafen",has("burg")?"Erträge · neuer Tag":"Neuer Tag"))];
 return `<div class="grid">${half.join("")}${full.map(span).join("")}${end.join("")}</div>`}

// ---- Spielstände: bis zu 3 Plätze ----
let slotDel=0;
function slotInfo(n){try{const x=localStorage.getItem(slotKey(n));if(!x)return null;const d=JSON.parse(x),L=(()=>{const e=d.exp||0;if(!d.xpv)return 1+Math.floor(Math.sqrt(e/20));let k=1;while(expFor(k+1)<=e)k++;return k})();let r=RANKS[0][1];for(const k of RANKS)if((d.ruhm||0)>=k[0])r=k[1];if(d.sex==="f")r=RANKF[r]||r;return {d,L,r}}catch(e){return null}}
const agoTxt=ts=>{if(!ts)return "";const m=Math.round((Date.now()-ts)/60000);return m<1?"gerade eben":m<60?`vor ${m} Min.`:m<1440?`vor ${Math.round(m/60)} Std.`:`vor ${Math.round(m/1440)} Tagen`};
function saveScr(){musicSet("hall");save();
 app.innerHTML=`<div class="top"><b>💾 Spielstände</b><span>Platz ${SLOT} aktiv</span></div>${hintBox("save")}
 <div class="msg" data-quiet>Du hast ${SLOTS} Plätze für verschiedene Ritter. Dein Fortschritt wird automatisch im aktiven Platz gespeichert. Musik-, Sound- und Stimmeinstellungen gelten für alle Plätze.</div>
 <div class="card">${Array.from({length:SLOTS},(_,k)=>{const n=k+1,i=slotInfo(n),act=n===SLOT;
  return `<div class="row"><span>${act?"▶️":"💾"} <b>Platz ${n}</b>${act?' <span class="mut">(aktiv)</span>':""}<br>${i?`${i.d.sex==="f"?"♀️":"♂️"} <b>${i.d.name}</b> · ${i.r} · Stufe ${i.L}${i.d.star?" · 🌟×"+i.d.star:""}<br><span class="mut">Tag ${i.d.day||1} · <i class=coin></i>${i.d.gold||0} · Bosse ${(i.d.bk||[]).length}/${BOSS.length}${i.d.ts?" · "+agoTxt(i.d.ts):""}</span>`:'<span class="mut">— leer —</span>'}</span>
  <span style="display:flex;flex-direction:column;gap:6px">${act?"":`<button class="p" onclick="slotLoad(${n})">${i?"Laden":"Neu beginnen"}</button>`}${i?(slotDel===n?`<button onclick="slotWipe(${n})" style="border-color:var(--acc);color:var(--acc)">Wirklich löschen?</button>`:`<button onclick="slotDel=${n};saveScr()">${act?"Neu beginnen":"Löschen"}</button>`):""}</span></div>`}).join("")}</div>
 <div class="card"><h3>📤 Sichern & übertragen</h3><div class="mut">Exportiere den aktiven Spielstand als Datei oder Text – zum Sichern oder um auf einem anderen Gerät weiterzuspielen.</div>
 <div class="grid"><button onclick="expFile()">💾 Als Datei speichern</button><button onclick="expText()">📋 Als Text kopieren</button></div>
 <div style="margin-top:8px"><textarea id="imp" rows="3" placeholder="Exportierten Text hier einfügen …" style="width:100%;font:13px monospace;padding:6px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--ink)">${expBuf}</textarea></div>
 <div class="grid"><button onclick="document.getElementById('impf').click()">📂 Datei laden</button><button ${impArm?'class="p"':""} onclick="impText()">${impArm?"Wirklich in Platz "+SLOT+" laden?":"📥 Text importieren"}</button></div>
 <input id="impf" type="file" accept=".txt,.json,text/plain" hidden onchange="impFile(this)">
 ${impMsg?`<div class="msg">${impMsg}</div>`:""}</div>
 <div class="grid"><button style="grid-column:1/-1" onclick="slotDel=0;impArm=0;impMsg='';expBuf='';home()">← Zurück zur Burg</button></div>`}
function slotLoad(n){save();try{localStorage.setItem("ritter_slot",String(n))}catch(e){}location.reload()}
function slotWipe(n){slotDel=0;try{localStorage.removeItem(slotKey(n))}catch(e){}if(n===SLOT){S=fresh();unlCheck();S.lvl0=1;S.sk=[];qGen();msg="Ein neues Abenteuer beginnt!";save()}saveScr()}

function statOpen(v){try{if(v===undefined)return localStorage.getItem("ritter_stat")==="1";localStorage.setItem("ritter_stat",v?"1":"0")}catch(e){return true}}

// ---- Export / Import des Spielstands ----
let expBuf="",impArm=0,impMsg="";
const expStr=()=>{save();return "RITTERMANAGER1:"+btoa(unescape(encodeURIComponent(JSON.stringify(S))))};
function expText(){expBuf=expStr();impMsg="Der Text steht im Feld unten.";try{navigator.clipboard.writeText(expBuf).then(()=>{impMsg="📋 In die Zwischenablage kopiert – und unten im Feld.";saveScr()},()=>{})}catch(e){}saveScr()}
function expFile(){try{const b=new Blob([expStr()],{type:"text/plain"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=`Rittermanager-${S.name.replace(/\s+/g,"_")}-Tag${S.day}.txt`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);impMsg="💾 Datei wird gespeichert."}catch(e){impMsg="Speichern als Datei hat nicht geklappt – nutze „Als Text kopieren“."}saveScr()}
function impParse(t){t=(t||"").trim();if(!t.startsWith("RITTERMANAGER1:"))throw 0;const d=JSON.parse(decodeURIComponent(escape(atob(t.slice(15)))));if(!d||typeof d!=="object"||!("exp" in d)||!("name" in d))throw 0;return d}
function impText(){const t=document.getElementById("imp").value;expBuf=t;let d;try{d=impParse(t)}catch(e){impArm=0;impMsg="⚠️ Das ist kein gültiger Rittermanager-Spielstand.";return saveScr()}
 if(!impArm){impArm=1;impMsg=`Gefunden: <b>${String(d.name).replace(/[<>&"'`]/g,"")}</b>, Tag ${d.day||1}. Der aktive Platz ${SLOT} wird überschrieben!`;return saveScr()}
 try{localStorage.setItem(slotKey(SLOT),JSON.stringify(d))}catch(e){}impArm=0;location.reload()}
function impFile(inp){const f=inp.files&&inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{expBuf=String(r.result||"");impArm=0;impText()};r.readAsText(f)}

// ---- Markt: Waffen nach Art ----
let shopCat=null;
function wpnSec(){const cur=S.wc||"schwert";shopCat=shopCat||cur;const c=WCAT[shopCat];
 return `<h3>⚔️ Waffen</h3><div style="display:flex;flex-wrap:wrap;gap:6px">${Object.keys(WCAT).map(k=>`<button ${k===shopCat?'class="p"':""} style="min-height:34px;padding:4px 10px;font-size:13px" onclick="shopCat='${k}';shop()">${WCAT[k].e} ${WCAT[k].n}</button>`).join("")}</div>
 <div class="mut" style="margin:6px 0">${c.e} <b>${c.n}:</b> ${c.d}${cur!==shopCat?"<br>Kaufst du hier, ersetzt die neue Waffe deine bisherige gekaufte Waffe.":""}</div>`+
 WNAMES[shopCat].map((n,i)=>{const own=cur===shopCat&&S.w===i,low=cur===shopCat&&i<S.w,p=wPrice(shopCat,i);return `<div class="row"><span>${n} <span class="mut">+${W[i][2]}</span></span>${own?'<b>✔ angelegt</b>':low?'<span class="mut">schwächer</span>':`<button ${S.gold>=p?"":"disabled"} onclick="buyW('${shopCat}',${i})">${p} <i class=coin></i></button>`}</div>`}).join("")}
