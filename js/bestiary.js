// Ritter Manager – Bestiarium: füllt sich mit jedem Gegner, dem du begegnest

const BST=[
 ...ET.map((t,i)=>({k:"et"+i,n:t.n,cat:tr("best.cFoe"),mv:t.mv,svg:()=>t.t==="Magier"?knight(2,0,0,true,t.tint,null,null,null,null,false,"#311b92","stab"):knight(2,2,t.t==="Bogenschütze"?0:1,true,t.tint,null,null,null,null,false,null,{Bogenschütze:"bogen",Panzerritter:"keule",Räuber:"dolch"}[t.t]),d:t.d})),
 {k:"mimik",n:MIMIC.n,cat:t("best.cSpec"),mv:MIMIC.mv,svg:()=>mimicSvg(),d:MIMIC.d},
 {k:"wolf",n:WOLF.n,cat:t("best.cSpec"),mv:WOLF.mv,svg:()=>wolfSvg(),d:WOLF.d},
 {k:"rival",n:RIVT.n,cat:t("best.cSpec"),mv:RIVT.mv,svg:()=>knight(3,3,2,true,"#4a148c","#6c3fa0",null,"ss",null),d:RIVT.d},
 ...BOSS.map((b,i)=>({k:"b"+i,n:b.n,cat:t("best.cBoss"),mv:b.mv,svg:()=>bossSvg(i),d:LORE[i][0]}))];
const bKey=f=>f.mimic?"mimik":f.moon?"wolf":f.rival?"rival":f.boss&&f.bi>=0?"b"+f.bi:"et"+Math.max(0,ET.findIndex(t=>t.t===f.et));
function bSeen(f){const k=bKey(f);S.bst=S.bst||{};(S.bst[k]=S.bst[k]||{s:0,w:0}).s++}
function bWin(f){const k=bKey(f);S.bst=S.bst||{};(S.bst[k]=S.bst[k]||{s:1,w:0}).w++}
const EFX=t("best.efx");
function bestScr(){musicSet("hall");const B=S.bst||{},known=BST.filter(x=>B[x.k]).length;
 const cats=[...new Set(BST.map(x=>x.cat))];
 app.innerHTML=`<div class="top"><b>📖 ${t("best.t")}</b><span>${t("best.found",known,BST.length)}</span></div>
 ${hintBox("best")}
 ${cats.map(c=>`<div class="card"><h3>${c}</h3><div class="bgrid">${BST.filter(x=>x.cat===c).map(x=>{const r=B[x.k];return r?`<div class="bcard"><div class="bimg">${x.svg().replace('class="k"','class="k" style="height:96px"')}</div><b>${x.n}</b><div class="mut" style="font-size:12px">${x.d}</div><div class="mut" style="font-size:12px;margin-top:3px">⚔️ ${x.mv.map(m=>m[0]+(EFX[m[3]]?` (${EFX[m[3]]})`:"")).join(", ")}</div><div style="font-size:12px;margin-top:3px">👁️ ${t("best.seen",r.s)} · 🏆 ${t("best.beat",r.w)}</div></div>`:`<div class="bcard unk"><div class="bimg" style="filter:brightness(0) opacity(.35)">${x.svg().replace('class="k"','class="k" style="height:96px"')}</div><b>???</b><div class="mut" style="font-size:12px">${t("best.unseen")}</div></div>`}).join("")}</div></div>`).join("")}
 <div class="grid"><button onclick="inv()">🎒 ${t("inv.t")}</button><button onclick="home()">${t("c.back")}</button></div>`;window.scrollTo(0,0)}
