// Ritter Manager – Freischaltungen: Funktionen öffnen sich nach und nach, damit der Spielstart übersichtlich bleibt

const FEAT=[
 {id:"skills",e:"📜",ok:()=>lvl()>=2},
 {id:"inv",e:"🎒",ok:()=>lvl()>=3},
 {id:"boss",e:"👑",ok:()=>lvl()>=4},
 {id:"rival",e:"⚔️",ok:()=>lvl()>=5},
 {id:"quests",e:"📜",ok:()=>lvl()>=6},
 {id:"tour",e:"🏟️",ok:()=>lvl()>=8},
 {id:"comp",e:"🐾",ok:()=>lvl()>=9},
 {id:"tavern",e:"🍺",ok:()=>lvl()>=10},
 {id:"craft",e:"🧰",ok:()=>lvl()>=12},
 {id:"cal",e:"📅",ok:()=>lvl()>=15},
 {id:"burg",e:"🏗️",ok:()=>lvl()>=18},
 {id:"kasse",e:"👑",ok:()=>S.boss>=6},
 {id:"tower",e:"🗼",ok:()=>!!S.tunl},
 {id:"rebirth",e:"🌟",ok:()=>S.boss>=BOSS.length||S.star>0}];
loc("feat",FEAT);
const has=id=>(S.unl||[]).includes(id);
function seen(id){if((S.newF||[]).includes(id)){S.newF=S.newF.filter(x=>x!==id);save()}}
const newTag=id=>(S.newF||[]).includes(id)?` <span class="newtag">${t("c.new")}</span>`:"";
// Prüft neue Freischaltungen; ohne bisherige Liste (alter Spielstand) wird still übernommen, was schon erreicht ist
function unlCheck(l){if(!Array.isArray(S.unl)){S.unl=FEAT.filter(f=>f.ok()).map(f=>f.id);S.newF=[];return}
 for(const f of FEAT)if(!S.unl.includes(f.id)&&f.ok()){S.unl.push(f.id);(S.newF=S.newF||[]).push(f.id);if(f.id==="quests")qGen();
  (l||QN).push(`🔓 <b>${t("unl",f.e+" "+f.n)}</b> – ${f.d}`)}}
