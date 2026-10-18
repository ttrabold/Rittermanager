// Ritter Manager – Bildschirme: Burg, Markt, Inventar, Titel, Anleitung
function checkTitles(l){TT.forEach(x=>{if(!S.tt.includes(x.id)&&x.t()){S.tt.push(x.id);if(!S.title)S.title=x.id;l.push(`🎖️ <b>Neuer Titel: ${gn(x.n)}</b>`)}})}
const GUIDE_SRC=["ANLEITUNG.md","https://raw.githubusercontent.com/ttrabold/Rittermanager/main/ANLEITUNG.md"],GUIDE_WEB="https://github.com/ttrabold/Rittermanager/blob/main/ANLEITUNG.md";
let guideHtml=null;
const slug=t=>t.toLowerCase().replace(/<[^>]+>/g,"").replace(/[^\p{L}\p{N} -]/gu,"").trim().replace(/ /g,"-");
function mdInline(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\*(.+?)\*/g,"<i>$1</i>").replace(/\[([^\]]+)\]\(([^)]+)\)/g,(m,a,h)=>h[0]==="#"?`<a href="${h}" onclick="document.getElementById('${h.slice(1)}')?.scrollIntoView({behavior:'smooth'});return false">${a}</a>`:`<a href="${h}" target="_blank" rel="noopener">${a}</a>`)}
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
function inv(){musicSet("home");
 const p=v=>Math.round(v*100)+" %",eff=[],R=k=>fxv(k);
 if(R("burn"))eff.push("🔥 "+p(R("burn"))+" Brand");if(R("poison"))eff.push("☠️ "+p(R("poison"))+" Gift");if(R("stun"))eff.push("❄️ "+p(R("stun"))+" Lähmung");
 if(R("life"))eff.push("💚 "+p(R("life"))+" Lebensraub");if(R("regen"))eff.push("🌙 "+R("regen")+" LP pro Runde");if(R("noburn"))eff.push("🧯 Brandimmun");
 const fx=k=>{const e=eq(k),r=(S.ru[ikey(k)]||[]).map(id=>RU.find(x=>x.id===id)).filter(Boolean);return [e?e.d:"",...r.map(x=>"✦ "+x.n+" ("+x.d+")")].filter(Boolean).join(" · ")||"keine besonderen Kräfte"};
 const slot=(ic,lbl,name,val,d)=>`<div class="row"><span>${ic} <b>${lbl}</b><br>${name}<br><span class="mut">${d}</span></span><b style="white-space:nowrap">${val}</b></div>`;
 const list=sd=>S.own.map(id=>EI.find(x=>x.id===id)).filter(it=>it&&it.s===sd).map(it=>{const on=S[sd==="w"?"ew":"ea"]===it.id,u=S.up[it.id]||0,r=(S.ru[it.id]||[]).length;
  return `<div class="row"><span>${it.cr?"⚒️":"✨"} ${it.n}${u?" +"+u:""}${r?" "+"✦".repeat(r):""} <span class="mut">+${it.b+(sd==="w"?u*2:u)}</span><br><span class="mut">${it.d}</span></span><button ${on?'class="p"':""} onclick="equipE('${it.id}')">${on?"Ablegen":"Anlegen"}</button></div>`}).join("")||`<div class="mut">Noch keine.</div>`;
 app.innerHTML=`<div class="top"><b>🎒 Inventar</b><span>🪙 ${S.gold}</span></div>
 <div class="scene" style="height:170px">${BG}${pk()}</div>
 <div class="card"><h3>🛡️ Ausgerüstet</h3>
 ${slot("🗡️","Waffe",iname("w"),"+"+wBon()+" ⚔️",fx("w"))}
 ${slot("🛡️","Rüstung",iname("a"),"+"+aBon()+" 🛡️",fx("a"))}
 ${slot("🔰","Schild",SH[S.s][0],"+"+SH[S.s][2]+" 🛡️",S.s?"Fängt Schaden ab":"Auf dem Markt erhältlich")}</div>
 <div class="card"><h3>📊 Kampfwerte</h3><div class="stats">
 <div>⚔️ Schaden <b>${5+Math.floor(S.st*1.3)+wBon()}</b></div><div>🛡️ Schutz <b>${aBon()+SH[S.s][2]}</b></div>
 <div>❤️ Max. LP <b>${maxhp()}</b></div><div>💥 Krit <b>${p(Math.min(.6,S.ge*.03+R("crit")))}</b></div>
 <div>💨 Ausweichen <b>+${S.ge+R("dodge")} %</b></div>${S.star?`<div>🌟 Bonus <b>+${S.star*10} %</b></div>`:""}</div>
 ${eff.length?`<div class="mut" style="margin-top:6px">${eff.join(" · ")}</div>`:""}</div>
 <div class="card"><h3>🗡️ Besondere Waffen</h3>${list("w")}<h3>🛡️ Besondere Rüstungen</h3>${list("a")}</div>
 <div class="card"><h3>🧪 Tränke</h3>${IT.map(t=>`<div class="row"><span>${t.e} ${t.n} <span class="mut">${t.d}</span></span><b>×${S.it[t.k]}</b></div>`).join("")}<div class="mut" style="margin-top:6px">Tränke setzt du im Kampf über 🎒 Tränke ein.</div></div>
 <div class="card"><h3>📦 Materialien</h3>${MAT.map(m=>`<div class="row"><span>${m.e} ${m.n}</span><b>×${S.mat[m.k]}</b></div>`).join("")}</div>
 <div class="card"><h3>🏆 Trophäen</h3><div class="stats"><div>🏆 Pokale <b>${S.troph}</b></div><div>👑 Bosse <b>${S.bk.length}/${BOSS.length}</b></div><div>🎖️ Titel <b>${S.tt.length}/${TT.length}</b></div><div>🗼 Turm-Rekord <b>${S.tbest}</b></div></div></div>
 <div class="grid"><button onclick="shop()">🏪 Markt</button><button onclick="workshop()">🧰 Werkstatt</button><button style="grid-column:1/-1" onclick="home()">← Zurück zur Burg</button></div>`;window.scrollTo(0,0)}
function home(){musicSet("home");if(QN.length){msg+="<br>"+QN.join("<br>");QN=[]}
 app.innerHTML=`<div class="top">${editName?`<span style="display:flex;gap:6px;flex:1;margin-right:8px"><input id="nm" maxlength="20" value="${S.name}" onkeydown="if(event.key==='Enter')saveName()" style="flex:1;min-width:0;font:inherit;padding:6px 8px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--ink)"><button onclick="saveName()" style="min-height:36px;padding:4px 12px">✔</button></span>`:`<b>${S.name} <a href="#" onclick="editName=true;home();document.getElementById('nm').focus();return false" aria-label="Ritter umbenennen" style="text-decoration:none">✏️</a> <a href="#" onclick="toggleSex();return false" aria-label="Zwischen Ritter und Ritterin wechseln" title="Ritter/Ritterin wechseln" style="text-decoration:none">${S.sex==="f"?"♀️":"♂️"}</a></b>`}<span>${rank()}${S.star?" · 🌟×"+S.star:""}</span></div>
 ${calLine()}
 <div class="scene">${BG}${bldSvg()}${castle}${pk()}</div>
 <div class="card"><div class="stats">
 <div>💪 Stärke <b>${S.st}</b></div>
 <div>❤️ Ausdauer <b>${S.au}</b></div>
 <div>🎯 Geschick <b>${S.ge}</b></div>
 <div>⚡ Energie <b>${S.en}/${enMax()}</b>${bar(S.en,enMax(),"#e0a800")}</div>
 <div>🪙 Gold <b>${S.gold}</b></div><div>🏆 Ruhm <b>${S.ruhm}</b></div><div style="grid-column:1/-1">🎖️ ${ttn()?"<b>"+ttn()+"</b>":'<span class="mut">kein Titel</span>'} · <a href="#" onclick="titles();return false" style="color:var(--acc)">Titel (${S.tt.length}/${TT.length})</a> · <a href="#" onclick="guide();return false" style="color:var(--acc)">📖 Anleitung</a></div>
 <div style="grid-column:1/-1">⭐ Stufe <b>${lvl()}</b> <span class="mut">(${S.exp} EP)</span>${bar(S.exp-expFor(lvl()),expFor(lvl()+1)-expFor(lvl()),"#8e44ad")}</div></div>
 <div class="mut" style="margin-top:6px">Waffe: ${iname("w")} · Rüstung: ${iname("a")} · ${SH[S.s][0]}<br>Siege ${S.wins} · Niederlagen ${S.losses} · Pokale ${S.troph} · Bosse ${S.boss}/${BOSS.length} · Turm-Rekord ${S.tbest}</div></div>
 <div class="msg">${msg}</div>
 ${questCard()}
 <div class="grid">
 <button onclick="work()" ${S.en<1?"disabled":""}>⚒️ Arbeiten<small>1 Energie · Gold</small></button>
 <button class="p" onclick="startFight()" ${S.en<2?"disabled":""}>⚔️ Abenteuer<small>2 Energie</small></button>
 <button onclick="shop()">🏪 Markt<small>Ausrüstung & Tränke</small></button>
 <button onclick="trader()">🛒 Händler<small>Materialien</small></button>
 <button onclick="workshop()">🧰 Werkstatt<small>Berufe · 1 Energie</small></button>
 <button onclick="inv()">🎒 Inventar<small>Ausrüstung & Beutel</small></button>
 <button onclick="startTour()" ${S.en<4||S.gold<tourFee()?"disabled":""}>🏟️ Turnier<small>4 Energie · ${tourFee()?tourFee()+" 🪙":"heute gratis!"} · 3 Kämpfe</small></button>
 <button onclick="startTower()" ${!S.tunl||S.en<4?"disabled":""}>🗼 Endloser Turm<small>${!S.tunl?"ab Boss 3":"4 Energie · "+(S.tcur>1?"weiter ab Etage "+S.tcur:"Rekord "+S.tbest)}</small></button>
 ${BOSS[S.boss]?`<button class="p" style="grid-column:1/-1" onclick="startBoss()" ${S.en<3||S.ruhm<BOSS[S.boss].req?"disabled":""}>👑 Bosskampf<small>${S.ruhm<BOSS[S.boss].req?"ab "+BOSS[S.boss].req+" Ruhm":BOSS[S.boss].n}</small></button>`:`<button disabled style="grid-column:1/-1">👑 Alle Bosse besiegt</button>`}
 ${isFull(S.day)&&S.moonDone!==S.day?`<button class="p" style="grid-column:1/-1;background:#3949ab;border-color:#3949ab" onclick="startMoon()" ${S.en<3?"disabled":""}>🌕 Vollmond-Jagd<small>3 Energie · nur heute Nacht · ein Versuch</small></button>`:""}
 <button onclick="castleScr()">🏗️ Burgausbau<small>Gebäude & Erträge</small></button>
 <button onclick="rebirth()" ${S.boss<BOSS.length?"disabled":""}>🌟 Wiedergeburt<small>${S.boss<BOSS.length?"nach allen Bossen":"Neustart mit Bonus"}</small></button>
 <button onclick="newDay()" style="grid-column:1/-1">🌙 Schlafen<small>Erträge einsammeln · neuer Tag</small></button></div>
 <div class="card"><h3>📜 Fähigkeiten</h3>${SK.map(s=>`<div class="row"><span>${s.lv<=lvl()?"":"🔒 "}${s.n}</span><span class="mut">${s.lv<=lvl()?s.d:"ab Stufe "+s.lv}</span></div>`).join("")}<div class="mut" style="margin-top:6px">Tränke: ${IT.map(t=>t.e+" "+S.it[t.k]).join("  ")}</div></div>
 <p class="mut" style="text-align:center"><a href="#" onclick="if(confirm('Spiel wirklich zurücksetzen?')){S=fresh();save();msg='Ein neues Abenteuer beginnt!';home()}return false" style="color:var(--mut)">Neu starten</a></p>`;
}
function work(){
 if(S.en<1)return;S.en--;const g=rnd(8,14)+lvl()*2;S.gold+=g;sfx("coin");
 const t=["Du hilfst dem Schmied","Du bewachst die Stadttore","Du hackst Holz für den Burgvogt","Du eskortierst einen Händler"];
 msg=`${t[rnd(0,3)]} und verdienst <b>${g} Gold</b>.`;qProg("work");save();home();
}
function shop(){musicSet("home");
 const sec=(t,L,k,ic)=>`<h3>${ic} ${t}</h3>`+L.map((x,i)=>{
  const own=S[k]===i,can=i>S[k]&&S.gold>=x[1],lower=i<S[k];
  return `<div class="row"><span>${x[0]} <span class="mut">+${x[2]}</span></span>${own?'<b>✔ angelegt</b>':lower?'<span class="mut">besser vorhanden</span>':`<button ${can?"":"disabled"} onclick="buy('${k}',${i})">${x[1]} 🪙</button>`}</div>`}).join("");
 app.innerHTML=`<div class="top"><b>🏪 Markt</b><span>🪙 ${S.gold}</span></div>
 <div class="scene" style="height:170px">${BG}${pk()}</div>
 <div class="card">${sec("Waffen",W,"w","🗡️")}${sec("Rüstungen",A,"a","🛡️")}${sec("Schilde",SH,"s","🔰")}<div class="row"><span class="mut">✨ Verzauberte und geschmiedete Ausrüstung legst du im Inventar an.</span><button onclick="inv()">🎒 Inventar</button></div><h3>🧪 Tränke${isMarket(S.day)?' <span class="mut">· 🛒 Markttag −25 %</span>':""}</h3>${IT.map(t=>`<div class="row"><span>${t.e} ${t.n} ×${S.it[t.k]} <span class="mut">${t.d}</span></span><button ${S.gold>=ip(t.p)?"":"disabled"} onclick="buyIt('${t.k}')">${ip(t.p)} 🪙</button></div>`).join("")}</div>
 <div class="grid"><button style="grid-column:1/-1" onclick="home()">← Zurück zur Burg</button></div>`;
}
function buy(k,i){const L={w:W,a:A,s:SH}[k];if(S.gold<L[i][1])return;S.gold-=L[i][1];S[k]=i;sfx("coin");msg=`Gekauft: <b>${L[i][0]}</b>!`;save();shop();}

function buyIt(k){const t=IT.find(x=>x.k===k),p=ip(t.p);if(S.gold<p)return;S.gold-=p;S.it[k]++;sfx("coin");save();shop()}
