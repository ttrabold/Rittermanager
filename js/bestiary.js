// Ritter Manager – Bestiarium: füllt sich mit jedem Gegner, dem du begegnest

const BST=[
 ...ET.map((t,i)=>({k:"et"+i,n:t.t,cat:"Gegner",mv:t.mv,svg:()=>knight(2,2,1,true,t.tint),d:{Ritter:"Ausgeglichene Kämpfer, die gern in Deckung gehen.",Räuber:"Flink und leicht gerüstet – Vorsicht vor dem Giftdolch.",Feuerritter:"Ihre Klingen glühen und setzen dich in Brand.",Panzerritter:"Viel LP, dicke Rüstung, betäubende Hammerschläge.",Bogenschütze:"Wenig LP, aber der Pfeilhagel schmerzt."}[t.t]})),
 {k:"mimik",n:"Mimik",cat:"Sondergegner",mv:MIMIC.mv,svg:()=>mimicSvg(),d:"Sieht aus wie eine Schatztruhe – bis sie zubeißt."},
 {k:"wolf",n:"Vollmond-Werwolf",cat:"Sondergegner",mv:WOLF.mv,svg:()=>wolfSvg(),d:"Jagt nur in Vollmondnächten. Sein Biss vergiftet."},
 {k:"rival",n:"Sir Gregor der Neider",cat:"Sondergegner",mv:RIVT.mv,svg:()=>knight(3,3,2,true,"#4a148c","#6c3fa0",null,"ss",null),d:"Dein ewiger Rivale. Er wird mit dir stärker."},
 ...BOSS.map((b,i)=>({k:"b"+i,n:b.n,cat:"Bosse",mv:b.mv,svg:()=>bossSvg(i),d:LORE[i][0]}))];
const bKey=f=>f.mimic?"mimik":f.moon?"wolf":f.rival?"rival":f.boss&&f.bi>=0?"b"+f.bi:"et"+Math.max(0,ET.findIndex(t=>t.t===f.et));
function bSeen(f){const k=bKey(f);S.bst=S.bst||{};(S.bst[k]=S.bst[k]||{s:0,w:0}).s++}
function bWin(f){const k=bKey(f);S.bst=S.bst||{};(S.bst[k]=S.bst[k]||{s:1,w:0}).w++}
const EFX={poison:"vergiftet",burn:"verbrennt",stun:"betäubt"};
function bestScr(){musicSet("hall");const B=S.bst||{},known=BST.filter(x=>B[x.k]).length;
 const cats=[...new Set(BST.map(x=>x.cat))];
 app.innerHTML=`<div class="top"><b>📖 Bestiarium</b><span>${known}/${BST.length} entdeckt</span></div>
 ${hintBox("best")}
 ${cats.map(c=>`<div class="card"><h3>${c}</h3><div class="bgrid">${BST.filter(x=>x.cat===c).map(x=>{const r=B[x.k];return r?`<div class="bcard"><div class="bimg">${x.svg().replace('class="k"','class="k" style="height:96px"')}</div><b>${x.n}</b><div class="mut" style="font-size:12px">${x.d}</div><div class="mut" style="font-size:12px;margin-top:3px">⚔️ ${x.mv.map(m=>m[0]+(EFX[m[3]]?` (${EFX[m[3]]})`:"")).join(", ")}</div><div style="font-size:12px;margin-top:3px">👁️ ${r.s}× begegnet · 🏆 ${r.w}× besiegt</div></div>`:`<div class="bcard unk"><div class="bimg" style="filter:brightness(0) opacity(.35)">${x.svg().replace('class="k"','class="k" style="height:96px"')}</div><b>???</b><div class="mut" style="font-size:12px">Noch nicht begegnet</div></div>`}).join("")}</div></div>`).join("")}
 <div class="grid"><button onclick="inv()">🎒 Inventar</button><button onclick="home()">← Zurück zur Burg</button></div>`;window.scrollTo(0,0)}
