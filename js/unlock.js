// Ritter Manager – Freischaltungen: Funktionen öffnen sich nach und nach, damit der Spielstart übersichtlich bleibt

const FEAT=[
 {id:"skills",e:"📜",n:"Fähigkeiten",ok:()=>lvl()>=2,d:"Lege bis zu 6 Fähigkeiten für den Kampf an."},
 {id:"inv",e:"🎒",n:"Inventar",ok:()=>lvl()>=3,d:"Hier siehst du Ausrüstung, Kampfwerte und deine Beute."},
 {id:"boss",e:"👑",n:"Bosskampf",ok:()=>lvl()>=4,d:"Mit genug Ruhm forderst du mächtige Bosse heraus."},
 {id:"rival",e:"⚔️",n:"Rivale",ok:()=>lvl()>=5,d:"Sir Gregor der Neider fordert dich heraus – immer wieder."},
 {id:"quests",e:"📜",n:"Tagesaufträge",ok:()=>lvl()>=6,d:"Jeden Morgen warten drei Aufträge mit Belohnung."},
 {id:"tour",e:"🏟️",n:"Turnier",ok:()=>lvl()>=8,d:"Drei Kämpfe in Folge – mit Pokal und Turnierschatz."},
 {id:"comp",e:"🐾",n:"Begleiter",ok:()=>lvl()>=9,d:"Knappe, Jagdhund, Falke oder Schlachtross stehen dir zur Seite."},
 {id:"tavern",e:"🍺",n:"Taverne",ok:()=>lvl()>=10,d:"Würfelpoker um Gold und Gerüchte vom Wirt."},
 {id:"craft",e:"🧰",n:"Werkstatt & Händler",ok:()=>lvl()>=12,d:"Sammle Materialien, werde Schmied, Alchemist und Verzauberer."},
 {id:"cal",e:"📅",n:"Kalender & Vollmond",ok:()=>lvl()>=15,d:"Markttag, Turniertag – und bei Vollmond jagt der Werwolf."},
 {id:"burg",e:"🏗️",n:"Burgausbau",ok:()=>lvl()>=18,d:"Baue Gebäude, die dir jede Nacht Erträge bringen."},
 {id:"kasse",e:"👑",n:"Kriegskasse des Königs",ok:()=>S.boss>=6,d:"Einmal am Tag tauschst du viel Gold gegen Ruhm."},
 {id:"tower",e:"🗼",n:"Endloser Turm",ok:()=>!!S.tunl,d:"Kämpfe dich Etage für Etage nach oben."},
 {id:"rebirth",e:"🌟",n:"Wiedergeburt",ok:()=>S.boss>=BOSS.length||S.star>0,d:"Beginne neu – stärker als zuvor."}];
const has=id=>(S.unl||[]).includes(id);
function seen(id){if((S.newF||[]).includes(id)){S.newF=S.newF.filter(x=>x!==id);save()}}
const newTag=id=>(S.newF||[]).includes(id)?' <span class="newtag">NEU</span>':"";
// Prüft neue Freischaltungen; ohne bisherige Liste (alter Spielstand) wird still übernommen, was schon erreicht ist
function unlCheck(l){if(!Array.isArray(S.unl)){S.unl=FEAT.filter(f=>f.ok()).map(f=>f.id);S.newF=[];return}
 for(const f of FEAT)if(!S.unl.includes(f.id)&&f.ok()){S.unl.push(f.id);(S.newF=S.newF||[]).push(f.id);if(f.id==="quests")qGen();
  (l||QN).push(`🔓 <b>Neu freigeschaltet: ${f.e} ${f.n}</b> – ${f.d}`)}}
