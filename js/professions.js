// Ritter Manager – Berufe: Materialien, Händler und Werkstatt (Schmied, Alchemie, Verzauberer)
// ---- Berufe: Materialien, Händler, Werkstatt ----
const MT=k=>MAT.find(m=>m.k===k);
function pick(t){let r=Math.random()*Object.values(t).reduce((a,b)=>a+b,0);for(const k in t){if(r<t[k])return k;r-=t[k]}return Object.keys(t)[0]}
function dropMat(f,l){const got={},add=(k,n)=>{S.mat[k]+=n;got[k]=(got[k]||0)+n};
 if(f.boss){if(f.tower?f.tower%10===0:(f.moon||f.rival)?Math.random()<.3:true)add("ds",f.tower||f.moon||f.rival?1:rnd(1,2));add("ak",2);add("mi",rnd(1,2));add(pick({hk:1,fb:1,gp:1}),2)}
 else{const t=DROP[f.et]||DROP.Ritter;add(pick(t),1);if(Math.random()<.5)add(pick(t),1);if(f.lvl>=8&&Math.random()<.15)add("mi",1)}
 if(S.cmp==="hund"){add(pick(DROP[f.et]||DROP.Ritter),1);if(Math.random()<.3){const g=5+lvl()*2;S.gold+=g;l.push("🐕 "+t("cp.dig",g))}}
 if(has("craft"))l.push(t("inv.mat")+": "+Object.entries(got).map(([k,n])=>`${MT(k).e} ${MT(k).n} ×${n}`).join(", "))}
const prNeed=lv=>lv*6;
const upCost=(sd,n)=>{if(n>5)return {mi:n,ds:n-4};const m=sd==="w"?{ez:2*n}:{le:2*n,ez:n};if(n>=3)m.mi=n-2;if(n>=5)m.ds=1;return m};
const upGold=n=>n>5?400*(n-5)**2:10*n;
const UPMAX=10;
const maxUp=()=>S.pr.sm.lv>=10?UPMAX:Math.min(5,Math.ceil(S.pr.sm.lv/2));
const slots=()=>S.pr.ve.lv>=6?2:1;
const hasM=m=>Object.entries(m).every(([k,n])=>S.mat[k]>=n);
const costH=(m,g)=>Object.entries(m).map(([k,n])=>`<span style="color:${S.mat[k]>=n?"inherit":"var(--acc)"}">${MT(k).e}${n}</span>`).join(" ")+(g?` <span style="color:${S.gold>=g?"inherit":"var(--acc)"}"><i class=coin></i>${g}</span>`:"");
let wsTab="sm",wsMsg="",wsSel=null;
function prXP(p,x,l){const P=S.pr[p];if(P.lv>=10)return;P.xp+=x;while(P.lv<10&&P.xp>=prNeed(P.lv)){P.xp-=prNeed(P.lv);P.lv++;sfx("level");l.push(`<b>${t("ws.lvup",PR[p].e+" "+PR[p].n,P.lv)}</b>`)}}
function work1(p,lv,m,g,act){if(S.en<1||S.pr[p].lv<lv||!hasM(m)||S.gold<(g||0))return;S.en--;S.gold-=g||0;for(const k in m)S.mat[k]-=m[k];const l=[act()];prXP(p,3+lv,l);qProg("craft",1,l);wsMsg=l.join("<br>");sfx("buff");save();workshop()}
function brew(id){const r=ALC.find(x=>x.id===id),it=IT.find(x=>x.k===id),n=S.pr.al.lv>=r.lv+3?2:1;work1("al",r.lv,r.m,0,()=>{S.it[id]+=n;return t("ws.brewed",n,`${it.e} <b>${it.n}</b>`)})}
function forge(id){const r=SMI.find(x=>x.id===id);if(S.own.includes(id))return;work1("sm",r.lv,r.m,r.g,()=>{const l=[];giveE(id,l);return t("ws.forged")+" "+l.join(" ")})}
function upgrade(key){const n=(S.up[key]||0)+1;if(n>maxUp())return;work1("sm",1,upCost(kinfo(key).s,n),upGold(n),()=>{S.up[key]=n;return t("ws.upgraded",knm(key))})}
function rune(id,key){const r=RU.find(x=>x.id===id),cur=S.ru[key]||[];if(r.s!==(kinfo(key).s==="sh"?"a":kinfo(key).s)||cur.length>=slots()||cur.includes(id))return;work1("ve",r.lv,r.m,0,()=>{S.ru[key]=[...cur,id];return t("ws.runed",r.n,kinfo(key).n)})}
function unrune(key,i){const cur=S.ru[key]||[],r=RU.find(x=>x.id===cur[i]);cur.splice(i,1);S.ru[key]=cur;wsMsg=t("ws.unrune",r?r.n:t("ws.rune"));save();workshop()}
function trade(k,n){const m=MT(k);if(n>0){const p=mp(m.p);if(S.gold<p)return;S.gold-=p;S.mat[k]++;sfx("coin");qProg("buy")}else{if(S.mat[k]<1)return;S.mat[k]--;S.gold+=Math.floor(m.p*.4);sfx("coin")}save();trader()}
const matRow=()=>`<div class="mut" style="display:flex;flex-wrap:wrap;gap:4px 12px">${MAT.map(m=>`<span title="${m.n}">${m.e} ${S.mat[m.k]}</span>`).join("")}</div>`;
function trader(){musicSet("home");app.innerHTML=`<div class="top"><b>🛒 ${t("tr.t")}</b><span><i class=coin></i> ${S.gold}</span></div>${hintBox("trader")}
 <div class="msg">${isMarket(S.day)?"🛒 "+t("tr.mday"):t("tr.hello")}${QN.length?"<br>"+QN.splice(0).join("<br>"):""}</div>
 <div class="card">${MAT.map(m=>`<div class="row"><span>${m.e} ${m.n} <b>×${S.mat[m.k]}</b></span><span style="display:flex;gap:6px"><button ${S.mat[m.k]<1?"disabled":""} onclick="trade('${m.k}',-1)">${t("tr.sell")}<small>+${Math.floor(m.p*.4)} <i class=coin></i></small></button><button ${S.gold<mp(m.p)?"disabled":""} onclick="trade('${m.k}',1)">${t("tr.buy")}<small>${mp(m.p)} <i class=coin></i></small></button></span></div>`).join("")}</div>
 <div class="grid">${backBtn()}</div>`}
function workshop(){musicSet("forge");const P=S.pr[wsTab],btn=(ok,js,lbl)=>`<button ${ok&&S.en>=1?"":"disabled"} onclick="${js}">${lbl||t("ws.make")}<small>1 ⚡</small></button>`;let body="";
 if(wsTab==="al")body=`<h3>🧪 ${t("ws.brewT")}</h3>`+ALC.map(r=>{const it=IT.find(x=>x.k===r.id),lk=P.lv<r.lv;return `<div class="row"><span>${lk?"🔒 ":""}${it.e} ${it.n}${P.lv>=r.lv+3?" <b>×2</b>":""}<br><span class="mut">${lk?t("c.fromLv",r.lv):costH(r.m)}</span></span>${lk?"":btn(hasM(r.m),`brew('${r.id}')`,t("ws.brew"))}</div>`}).join("")+`<div class="mut" style="margin-top:6px">${t("ws.brewInfo")}</div>`;
 const tag=key=>`${kinfo(key).s==="w"?"🗡️":"🛡️"} ${knm(key)}${isEq(key)?` <span class="mut">(${t("c.worn")})</span>`:""}`;
 if(wsTab==="sm")body=`<h3>⬆️ ${t("ws.upT")}</h3><div class="mut">${t("ws.upD")}</div>`+invItems().map(key=>{const sd=kinfo(key).s,n=(S.up[key]||0)+1,mx=n>maxUp(),c=upCost(sd,n);return `<div class="row"><span>${tag(key)}<br><span class="mut">${n>UPMAX?t("ws.upMax"):mx?(n>5?t("ws.upLegLk",n):t("ws.upLk",n,n*2-1)):`→ +${n}${n>5?" ✨ "+t("ws.leg"):""} (${sd==="w"?t("ws.upW"):t("ws.upA")}): `+costH(c,upGold(n))}</span></span>${n>UPMAX||mx?"":btn(hasM(c)&&S.gold>=upGold(n),`upgrade('${key}')`,n>5?t("ws.legB"):t("ws.upB"))}</div>`}).join("")
  +`<h3>⚒️ ${t("ws.forgeT")}</h3>`+SMI.map(r=>{const it=EI.find(x=>x.id===r.id),lk=P.lv<r.lv,own=S.own.includes(r.id);return `<div class="row"><span>${lk?"🔒 ":""}${it.s==="w"?"🗡️":"🛡️"} ${it.n} <span class="mut">+${it.b}</span><br><span class="mut">${it.d}${lk?" · "+t("c.fromLv",r.lv):own?"":" · "+costH(r.m,r.g)}</span></span>${lk?"":own?`<span class="mut">${t("ws.owned")}</span>`:btn(hasM(r.m)&&S.gold>=r.g,`forge('${r.id}')`,t("ws.forge"))}</div>`}).join("");
 if(wsTab==="ve"){const items=invItems();if(!items.includes(wsSel))wsSel=ikey("w");const sd=kinfo(wsSel).s==="sh"?"a":kinfo(wsSel).s,cur=S.ru[wsSel]||[],full=cur.length>=slots();
  body=`<h3>🎯 ${t("ws.pick")}</h3><div style="display:flex;flex-wrap:wrap;gap:6px">${items.map(key=>`<button ${key===wsSel?'class="p"':""} style="min-height:36px;padding:6px 10px;font-size:13px" onclick="wsSel='${key}';wsMsg='';workshop()">${kinfo(key).s==="w"?"🗡️":"🛡️"} ${knm(key)}</button>`).join("")}</div>
  <h3>✦ ${t("ws.runesOn",knm(wsSel))} (${cur.length}/${slots()})</h3><div class="mut">${cur.length?cur.map((id,i)=>{const r=RU.find(x=>x.id===id);return `${r.n} (${r.d}) <a href="#" onclick="unrune('${wsSel}',${i});return false" style="color:var(--acc)" aria-label="${t("ws.runeDel")}">✖</a>`}).join(" · "):t("ws.noRunes")}</div>
  <h3>🔮 ${t("ws.fitRunes")}</h3>`+RU.filter(r=>r.s===sd).map(r=>{const lk=P.lv<r.lv,has=cur.includes(r.id);return `<div class="row"><span>${lk?"🔒 ":""}${r.n}<br><span class="mut">${r.d}${lk?" · "+t("c.fromLv",r.lv):" · "+costH(r.m)}</span></span>${lk?"":has?`<span class="mut">${t("ws.runeOn")}</span>`:full?`<span class="mut">${t("ws.noSlot")}</span>`:btn(hasM(r.m),`rune('${r.id}','${wsSel}')`,t("ws.insert"))}</div>`}).join("")+`<div class="mut" style="margin-top:6px">${t("ws.runeInfo")}</div>`}
 app.innerHTML=`<div class="top"><b>🧰 ${t("ws.t")}</b><span>⚡ ${S.en}/${enMax()} · <i class=coin></i> ${S.gold}</span></div>${hintBox("craft")}
 <div class="grid" style="grid-template-columns:repeat(3,1fr);margin-top:0">${Object.keys(PR).map(p=>`<button ${p===wsTab?'class="p"':""} onclick="wsTab='${p}';wsMsg='';workshop()">${PR[p].e} ${PR[p].n}<small>${t("st.lvl")} ${S.pr[p].lv}</small></button>`).join("")}</div>
 <div class="card"><b>${PR[wsTab].e} ${PR[wsTab].n} · ${t("st.lvl")} ${P.lv}</b>${P.lv<10?` <span class="mut">(${P.xp}/${prNeed(P.lv)} ${t("ws.xp")})</span>${bar(P.xp,prNeed(P.lv),"#d4a017")}`:` <span class="mut">${t("ws.master")}</span>`}<div style="margin-top:6px">${matRow()}</div></div>
 ${wsMsg?`<div class="msg">${wsMsg}</div>`:""}<div class="card">${body}</div>
 <div class="grid"><button onclick="trader()">🛒 ${t("tr.t")}</button><button onclick="wsMsg='';home()">${t("c.back")}</button></div>`}
