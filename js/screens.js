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
function inv(){musicSet("home");
 const p=v=>Math.round(v*100)+" %",eff=[],R=k=>fxv(k);
 if(R("burn"))eff.push("🔥 "+p(R("burn"))+" Brand");if(R("poison"))eff.push("☠️ "+p(R("poison"))+" Gift");if(R("stun"))eff.push("❄️ "+p(R("stun"))+" Lähmung");
 if(R("life"))eff.push("💚 "+p(R("life"))+" Lebensraub");if(R("regen"))eff.push("🌙 "+R("regen")+" LP pro Runde");if(R("noburn"))eff.push("🧯 Brandimmun");
 const fx=k=>{const e=eq(k),r=(S.ru[ikey(k)]||[]).map(id=>RU.find(x=>x.id===id)).filter(Boolean);return [e?e.d:"",...r.map(x=>"✦ "+x.n+" ("+x.d+")")].filter(Boolean).join(" · ")||"keine besonderen Kräfte"};
 const slot=(ic,lbl,name,val,d)=>`<div class="row"><span>${ic} <b>${lbl}</b><br>${name}<br><span class="mut">${d}</span></span><b style="white-space:nowrap">${val}</b></div>`;
 const list=sd=>S.own.map(id=>EI.find(x=>x.id===id)).filter(it=>it&&it.s===sd).map(it=>{const on=S[sd==="w"?"ew":"ea"]===it.id,u=S.up[it.id]||0,r=(S.ru[it.id]||[]).length;
  return `<div class="row"><span>${it.cr?"⚒️":"✨"} ${it.n}${u?" +"+u:""}${r?" "+"✦".repeat(r):""} <span class="mut">+${it.b+(sd==="w"?u*2:u)}</span><br><span class="mut">${it.d}</span></span><button ${on?'class="p"':""} onclick="equipE('${it.id}')">${on?"Ablegen":"Anlegen"}</button></div>`}).join("")||`<div class="mut">Noch keine.</div>`;
 app.innerHTML=`<div class="top"><b>🎒 Inventar</b><span><i class=coin></i> ${S.gold}</span></div>
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
 ${has("cal")?calLine():""}
 <div class="scene">${BG}${bldSvg()}${castleSvg()}${pk()}</div>
 <div class="card"><div class="stats">
 <div>💪 Stärke <b>${S.st}</b></div>
 <div>❤️ Ausdauer <b>${S.au}</b></div>
 <div>🎯 Geschick <b>${S.ge}</b></div>
 <div>⚡ Energie <b>${S.en}/${enMax()}</b>${bar(S.en,enMax(),"#e0a800")}</div>
 <div><i class=coin></i> Gold <b>${S.gold}</b></div><div>🏆 Ruhm <b>${S.ruhm}</b></div><div style="grid-column:1/-1">🎖️ ${ttn()?"<b>"+ttn()+"</b>":'<span class="mut">kein Titel</span>'}${S.tt.length?` · <a href="#" onclick="titles();return false" style="color:var(--acc)">Titel (${S.tt.length}/${TT.length})</a>`:""} · <a href="#" onclick="guide();return false" style="color:var(--acc)">📖 Anleitung</a></div>
 <div style="grid-column:1/-1">⭐ Stufe <b>${lvl()}</b> <span class="mut">(${S.exp} EP)</span>${bar(S.exp-expFor(lvl()),expFor(lvl()+1)-expFor(lvl()),"#8e44ad")}</div></div>
 <div class="mut" style="margin-top:6px">Waffe: ${iname("w")} · Rüstung: ${iname("a")} · ${SH[S.s][0]}<br>Siege ${S.wins} · Niederlagen ${S.losses}${has("tour")?" · Pokale "+S.troph:""}${has("boss")?` · Bosse ${S.boss}/${BOSS.length}`:""}${has("tower")?" · Turm-Rekord "+S.tbest:""}</div></div>
 <div class="msg">${msg}</div>
 ${has("quests")?questCard():""}
 ${homeGrid()}
 ${has("skills")?"":"<!--"}<div class="card"><h3>📜 Fähigkeiten <span class="mut">(${(S.sk||[]).filter(knowSk).length}/${SK_MAX} angelegt)</span></h3><div class="mut">${eqSk().map(id=>SKD(id).n).join(" · ")}</div>${SK.some(x=>x.id!=="hieb"&&knowSk(x.id)&&!(S.sk||[]).includes(x.id))&&(S.sk||[]).length<SK_MAX?'<div style="margin-top:4px">⚠️ Du hast freie Plätze!</div>':""}<div class="grid"><button style="grid-column:1/-1" onclick="seen('skills');skillsScr()">📜 Fähigkeiten verwalten${newTag("skills")}<small>${SK.filter(x=>knowSk(x.id)).length}/${SK.length} gelernt</small></button></div><div class="mut" style="margin-top:6px">Tränke: ${IT.map(t=>t.e+" "+S.it[t.k]).join("  ")}</div></div>${has("skills")?"":"-->"}
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
 <div class="card">${sec("Waffen",W,"w","🗡️")}${sec("Rüstungen",A,"a","🛡️")}${sec("Schilde",SH,"s","🔰")}<div class="row"><span class="mut">✨ Verzauberte und geschmiedete Ausrüstung legst du im Inventar an.</span><button onclick="inv()">🎒 Inventar</button></div><h3>🧪 Tränke${isMarket(S.day)?' <span class="mut">· 🛒 Markttag −25 %</span>':""}</h3>${IT.map(t=>`<div class="row"><span>${t.e} ${t.n} ×${S.it[t.k]} <span class="mut">${t.d}</span></span><button ${S.gold>=ip(t.p)?"":"disabled"} onclick="buyIt('${t.k}')">${ip(t.p)} <i class=coin></i></button></div>`).join("")}</div>
 <div class="grid"><button style="grid-column:1/-1" onclick="home()">← Zurück zur Burg</button></div>`;
}
function buy(k,i){const L={w:W,a:A,s:SH}[k];if(S.gold<L[i][1])return;S.gold-=L[i][1];S[k]=i;sfx("coin");msg=`Gekauft: <b>${L[i][0]}</b>!`;save();shop();}

function buyIt(k){const t=IT.find(x=>x.k===k),p=ip(t.p);if(S.gold<p)return;S.gold-=p;S.it[k]++;sfx("coin");save();shop()}

// ---- Fähigkeiten verwalten: höchstens 6 angelegt, der Schwerthieb ist immer dabei ----
function skEq(id){const sk=S.sk=S.sk||[];if(!knowSk(id)||id==="hieb"||sk.includes(id)||sk.length>=SK_MAX)return;sk.push(id);sfx("buff");save();skillsScr()}
function skUn(id){S.sk=(S.sk||[]).filter(x=>x!==id);sfx("click");save();skillsScr()}
function skillsScr(){musicSet("hall");const sk=(S.sk||[]).filter(knowSk),pp=s=>s.pp>=99?"unbegrenzt":s.pp+"× pro Kampf";
 const row=(s,btn)=>`<div class="row"><span><b>${s.n}</b> <span class="mut">· ${pp(s)}</span><br><span class="mut">${s.d}</span></span>${btn}</div>`;
 app.innerHTML=`<div class="top"><b>📜 Fähigkeiten</b><span>${sk.length}/${SK_MAX} angelegt</span></div>
 <div class="msg" data-quiet>Du kannst bis zu <b>${SK_MAX} Fähigkeiten</b> anlegen, die du im Kampf einsetzt. Der <b>Schwerthieb</b> ist als Grundangriff immer dabei. Neue Fähigkeiten lernst du beim Stufenaufstieg.</div>
 <div class="card"><h3>⚔️ Im Kampf verfügbar</h3>${row(SKD("hieb"),'<span class="mut">immer</span>')}
 ${Array.from({length:SK_MAX},(_,k)=>{const id=sk[k];return id?row(SKD(id),`<button onclick="skUn('${id}')">Ablegen</button>`):`<div class="row"><span class="mut">— freier Platz ${k+1} —</span></div>`}).join("")}</div>
 <div class="card"><h3>📖 Alle Fähigkeiten</h3>${SK.filter(s=>s.id!=="hieb").map(s=>knowSk(s.id)?row(s,sk.includes(s.id)?'<span class="mut">✔ angelegt</span>':`<button ${sk.length>=SK_MAX?"disabled":""} onclick="skEq('${s.id}')">${sk.length>=SK_MAX?"Plätze voll":"Anlegen"}</button>`):`<div class="row"><span>🔒 <b>${s.n}</b><br><span class="mut">${s.d}</span></span><span class="mut">ab Stufe ${s.lv}</span></div>`).join("")}</div>
 <div class="grid"><button style="grid-column:1/-1" onclick="home()">← Zurück zur Burg</button></div>`;window.scrollTo(0,0)}

// Burg-Knöpfe: nur freigeschaltete Funktionen, neue mit „NEU“-Markierung
function homeGrid(){const b=(id,js,lbl,sub,dis,cls)=>`<button ${cls?`class="${cls}"`:""} ${dis?"disabled":""} onclick="${id?`seen('${id}');`:""}${js}">${lbl}${id?newTag(id):""}<small>${sub}</small></button>`,half=[],full=[];
 half.push(b("","work()","⚒️ Arbeiten","1 Energie · Gold",S.en<1),b("","startFight()","⚔️ Abenteuer","2 Energie",S.en<2,"p"),b("","shop()","🏪 Markt","Ausrüstung & Tränke"));
 if(has("inv"))half.push(b("inv","inv()","🎒 Inventar","Ausrüstung & Beutel"));
 if(has("craft"))half.push(b("craft","workshop()","🧰 Werkstatt","Berufe · 1 Energie"),b("craft","trader()","🛒 Händler","Materialien"));
 if(has("tour"))half.push(b("tour","startTour()","🏟️ Turnier",`4 Energie · ${tourFee()?tourFee()+" <i class=coin></i>":"heute gratis!"} · 3 Kämpfe`,S.en<4||S.gold<tourFee()));
 if(has("tower"))half.push(b("tower","startTower()","🗼 Endloser Turm","4 Energie · "+(S.tcur>1?"weiter ab Etage "+S.tcur:"Rekord "+S.tbest),S.en<4));
 if(has("tavern"))half.push(b("tavern","TV.rum=rnd(0,99);tavern()","🍺 Taverne",`Würfelpoker · noch ${tavLeft()} heute`));
 if(has("burg"))half.push(b("burg","castleScr()","🏗️ Burgausbau","Gebäude & Erträge"));
 if(has("boss"))full.push(BOSS[S.boss]?b("boss","startBoss()","👑 Bosskampf",S.ruhm<BOSS[S.boss].req?"ab "+BOSS[S.boss].req+" Ruhm":BOSS[S.boss].n,S.en<3||S.ruhm<BOSS[S.boss].req,"p"):'<button disabled>👑 Alle Bosse besiegt</button>');
 if(has("cal")&&isFull(S.day)&&S.moonDone!==S.day)full.push(`<button class="p" style="background:#3949ab;border-color:#3949ab" ${S.en<3?"disabled":""} onclick="startMoon()">🌕 Vollmond-Jagd<small>3 Energie · nur heute Nacht · ein Versuch</small></button>`);
 const span=h=>h.replace("<button ",'<button style="grid-column:1/-1" ');
 if(half.length%2)half[half.length-1]=span(half[half.length-1]);
 const end=has("rebirth")?[b("rebirth","rebirth()","🌟 Wiedergeburt",S.boss<BOSS.length?"nach allen Bossen":"Neustart mit Bonus",S.boss<BOSS.length),b("","newDay()","🌙 Schlafen","Erträge · neuer Tag")]:[span(b("","newDay()","🌙 Schlafen",has("burg")?"Erträge · neuer Tag":"Neuer Tag"))];
 return `<div class="grid">${half.join("")}${full.map(span).join("")}${end.join("")}</div>`}

// ---- Spielstände: bis zu 3 Plätze ----
let slotDel=0;
function slotInfo(n){try{const x=localStorage.getItem(slotKey(n));if(!x)return null;const d=JSON.parse(x),L=1+Math.floor(Math.sqrt((d.exp||0)/20));let r=RANKS[0][1];for(const k of RANKS)if((d.ruhm||0)>=k[0])r=k[1];if(d.sex==="f")r=RANKF[r]||r;return {d,L,r}}catch(e){return null}}
const agoTxt=ts=>{if(!ts)return "";const m=Math.round((Date.now()-ts)/60000);return m<1?"gerade eben":m<60?`vor ${m} Min.`:m<1440?`vor ${Math.round(m/60)} Std.`:`vor ${Math.round(m/1440)} Tagen`};
function saveScr(){musicSet("hall");save();
 app.innerHTML=`<div class="top"><b>💾 Spielstände</b><span>Platz ${SLOT} aktiv</span></div>
 <div class="msg" data-quiet>Du hast ${SLOTS} Plätze für verschiedene Ritter. Dein Fortschritt wird automatisch im aktiven Platz gespeichert. Musik-, Sound- und Stimmeinstellungen gelten für alle Plätze.</div>
 <div class="card">${Array.from({length:SLOTS},(_,k)=>{const n=k+1,i=slotInfo(n),act=n===SLOT;
  return `<div class="row"><span>${act?"▶️":"💾"} <b>Platz ${n}</b>${act?' <span class="mut">(aktiv)</span>':""}<br>${i?`${i.d.sex==="f"?"♀️":"♂️"} <b>${i.d.name}</b> · ${i.r} · Stufe ${i.L}${i.d.star?" · 🌟×"+i.d.star:""}<br><span class="mut">Tag ${i.d.day||1} · <i class=coin></i>${i.d.gold||0} · Bosse ${(i.d.bk||[]).length}/${BOSS.length}${i.d.ts?" · "+agoTxt(i.d.ts):""}</span>`:'<span class="mut">— leer —</span>'}</span>
  <span style="display:flex;flex-direction:column;gap:6px">${act?"":`<button class="p" onclick="slotLoad(${n})">${i?"Laden":"Neu beginnen"}</button>`}${i?(slotDel===n?`<button onclick="slotWipe(${n})" style="border-color:var(--acc);color:var(--acc)">Wirklich löschen?</button>`:`<button onclick="slotDel=${n};saveScr()">${act?"Neu beginnen":"Löschen"}</button>`):""}</span></div>`}).join("")}</div>
 <div class="grid"><button style="grid-column:1/-1" onclick="slotDel=0;home()">← Zurück zur Burg</button></div>`}
function slotLoad(n){save();try{localStorage.setItem("ritter_slot",String(n))}catch(e){}location.reload()}
function slotWipe(n){slotDel=0;try{localStorage.removeItem(slotKey(n))}catch(e){}if(n===SLOT){S=fresh();unlCheck();S.lvl0=1;S.sk=[];qGen();msg="Ein neues Abenteuer beginnt!";save()}saveScr()}
