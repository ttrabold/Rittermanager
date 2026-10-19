// Ritter Manager – Begleiter: ein aktiver Begleiter steht neben dem Ritter und hilft passiv

const COMP=[
 {id:"knappe",e:"🧒",price:250,ok:()=>true},
 {id:"hund",e:"🐕",price:400,ok:()=>true},
 {id:"falke",e:"🦅",price:900,ok:()=>(S.bk||[]).length>=2},
 {id:"ross",e:"🐎",price:2000,ok:()=>(S.bk||[]).length>=4}];
loc("comp",COMP);
const compV=k=>S.cmp==="falke"&&k==="crit"?.05:0;
const COMPV={
 knappe:`<ellipse cx="30" cy="58" rx="11" ry="2.5" fill="#0003"/><rect x="24" y="40" width="5" height="16" fill="#5b4636"/><rect x="31" y="40" width="5" height="16" fill="#5b4636"/><path d="M21 26h18l2 16H19z" fill="#2e7d32" stroke="#0004"/><circle cx="30" cy="19" r="8" fill="#e0b48a" stroke="#0004"/><path d="M22 17q8-10 16 0z" fill="#8a4b22"/><path d="M21 15h18l-3-4H24z" fill="#c0392b"/><circle cx="27" cy="19" r="1.2"/><circle cx="33" cy="19" r="1.2"/><path d="M39 30l6 6" stroke="#2e7d32" stroke-width="4" stroke-linecap="round"/><rect x="43" y="33" width="6" height="9" rx="2" fill="#e53935" stroke="#0005"/><rect x="44.5" y="31" width="3" height="3" fill="#8d6e63"/>`,
 hund:`<ellipse cx="30" cy="58" rx="16" ry="2.5" fill="#0003"/><path class="sway" d="M14 38q-8-6-6-14" stroke="#8d6e63" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="28" cy="40" rx="15" ry="9" fill="#a1887f" stroke="#0004"/><rect x="16" y="44" width="5" height="13" rx="2" fill="#8d6e63"/><rect x="33" y="44" width="5" height="13" rx="2" fill="#8d6e63"/><circle cx="44" cy="30" r="8" fill="#a1887f" stroke="#0004"/><path d="M49 31l7 2-6 3z" fill="#a1887f"/><circle cx="55" cy="33" r="1.6"/><path d="M38 24q-2 10 4 12z" fill="#6d4c41"/><circle cx="46" cy="28" r="1.3"/><path d="M40 37l4 1" stroke="#c0392b" stroke-width="2"/>`,
 falke:`<ellipse cx="30" cy="58" rx="8" ry="2" fill="#0002"/><g class="hov"><path class="flap" d="M28 30Q10 18 4 26Q14 28 26 36Z" fill="#6d4c41" stroke="#0004"/><path class="flap r" d="M32 30Q50 18 56 26Q46 28 34 36Z" fill="#6d4c41" stroke="#0004"/><ellipse cx="30" cy="34" rx="7" ry="10" fill="#8d6e63" stroke="#0004"/><path d="M26 32q4 8 8 0" fill="#efebe9"/><circle cx="30" cy="22" r="6" fill="#795548" stroke="#0004"/><path d="M33 22l5 2-5 2z" fill="#ffc107"/><circle cx="31.5" cy="21" r="1.4" fill="#ffd54f"/><circle cx="31.5" cy="21" r=".6"/><path d="M27 44l-2 6M33 44l2 6" stroke="#ffc107" stroke-width="1.5"/></g>`,
 ross:`<ellipse cx="30" cy="58" rx="20" ry="3" fill="#0003"/><path class="sway" d="M10 30q-6 8-4 18" stroke="#3e2723" stroke-width="4" fill="none"/><ellipse cx="27" cy="36" rx="17" ry="9" fill="#5d4037" stroke="#0004"/><rect x="13" y="40" width="4" height="17" fill="#4e342e"/><rect x="20" y="41" width="4" height="16" fill="#4e342e"/><rect x="33" y="41" width="4" height="16" fill="#4e342e"/><rect x="39" y="40" width="4" height="17" fill="#4e342e"/><path d="M38 32L46 14q4-3 8 2L52 26L44 36Z" fill="#5d4037" stroke="#0004"/><path d="M44 15q-6 4-8 14" stroke="#3e2723" stroke-width="3" fill="none"/><circle cx="50" cy="18" r="1.3"/><path d="M47 13l1-5 3 5" fill="#5d4037"/><rect x="20" y="28" width="14" height="6" rx="2" fill="#8b1e1e"/><path d="M22 28h10" stroke="#d4a017"/>`};
const compSvg=(id,h)=>id&&COMPV[id]?`<svg class="cmp" viewBox="0 0 60 60" style="height:${h||52}px" aria-hidden="true">${COMPV[id]}</svg>`:"";
function compBuy(id){const c=COMP.find(x=>x.id===id);S.comp=S.comp||[];if(S.comp.includes(id)||!c.ok()||S.gold<c.price)return;S.gold-=c.price;S.comp.push(id);S.cmp=id;sfx("level");save();compScr()}
function compSet(id){S.cmp=S.cmp===id?null:id;sfx("buff");save();compScr()}
function compScr(){musicSet("home");const own=S.comp||[];
 app.innerHTML=`<div class="top"><b>🐾 ${t("cp.t")}</b><span><i class=coin></i> ${S.gold}</span></div>
 <div class="scene" style="height:170px">${BG}<div style="display:flex;align-items:flex-end;gap:4px;position:relative;z-index:2">${compSvg(S.cmp,70)}${pk()}</div></div>
 ${hintBox("comp")}
 <div class="msg" data-quiet>${t("cp.intro")}</div>
 <div class="card">${COMP.map(c=>{const has=own.includes(c.id),act=S.cmp===c.id;return `<div class="row"><span style="display:flex;gap:10px;align-items:center"><span class="bthumb" style="display:flex;align-items:flex-end;justify-content:center">${compSvg(c.id,60)}</span><span><b>${c.e} ${c.n}</b>${act?` <span class="mut">(${t("cp.with")})</span>`:""}<br><span class="mut">${c.d}${!has&&!c.ok()?" · 🔒 "+c.lk:""}</span></span></span>${has?`<button ${act?'class="p"':""} onclick="compSet('${c.id}')">${act?t("cp.withB"):t("cp.take")}</button>`:c.ok()?`<button ${S.gold<c.price?"disabled":""} onclick="compBuy('${c.id}')">${c.price} <i class=coin></i></button>`:""}</div>`}).join("")}</div>
 <div class="grid">${backBtn()}</div>`}
// Kampfhilfen der Begleiter
function compTurn(f,l){if(S.cmp==="falke"&&Math.random()<.25&&f.ehp>0){const d=5+lvl()*2;f.ehp-=d;l.push("🦅 "+t("cp.falcon",d))}}
function compRescue(f,l){if(S.cmp==="knappe"&&!f.knUsed&&f.php>0&&f.php<f.pmax*.3){f.knUsed=1;const o=f.php;f.php=Math.min(f.pmax,f.php+Math.round(f.pmax*.25));l.push("🧒 "+t("cp.squire",f.php-o))}}
