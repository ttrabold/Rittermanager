// Ritter Manager – Spieldaten: Ausrüstung, Gegenstände, Fähigkeiten, Gegner, Bosse, Titel, Rezepte
const AC=["#6b4a2b","#8b6b43","#9aa3ab","#c3ccd4","#7fd6e0"],WC=["#a67c52","#b8bec4","#dfe6ec","#f1f5f9","#ff8a45"],SC=["none","#8b5a2b","#8f98a0","#c0392b"];
const W=[[0,0],[40,3],[120,6],[300,10],[700,16]].map((x,i)=>[t("w")[i],...x]);
const A=[[0,0],[40,2],[120,4],[300,7],[700,11]].map((x,i)=>[t("a")[i],...x]);
const SH=[[0,0],[30,1],[100,2],[280,4]].map((x,i)=>[t("sh")[i],...x]);
// Ränge: [Ruhm, Name, weiblicher Name]
const RANKS=[0,50,150,400,900,2000,5000,10000,25000].map((r,i)=>[r,...t("ranks")[i]]);
const EI=[
{id:"fl",s:"w",b:10,c:"#ff6a2b",fx:{burn:.25}},
{id:"fz",s:"w",b:9,c:"#7fd6ff",fx:{stun:.2}},
{id:"sb",s:"w",b:11,c:"#f5e663",fx:{crit:.12}},
{id:"mo",s:"a",b:7,c:"#cfd8ff",fx:{regen:3}},
{id:"wp",s:"a",b:8,c:"#6bbf6b",fx:{hp:20}},
{id:"wm",s:"a",b:5,c:"#9de0c4",fx:{dodge:10}},
{id:"gz",s:"w",b:8,c:"#7ed957",fx:{poison:.3}},
{id:"rm",s:"a",b:5,c:"#8b6b43",fx:{dodge:5}},
{id:"ss",s:"w",b:13,c:"#6c3fa0",fx:{crit:.15}},
{id:"sp",s:"a",b:9,c:"#3b2f4a",fx:{dodge:8}},
{id:"dz",s:"w",b:18,c:"#ff3b1f",fx:{burn:.3,life:.1}},
{id:"ds",s:"a",b:13,c:"#d35400",fx:{noburn:1,hp:30}},
{id:"fk",s:"w",b:24,c:"#aee8ff",fx:{stun:.25,crit:.1}},
{id:"fr",s:"a",b:17,c:"#7fd6ff",fx:{hp:40,dodge:5}},
{id:"ls",s:"w",b:30,c:"#9b59b6",fx:{life:.15,crit:.1}},
{id:"lm",s:"a",b:21,c:"#5b2c6f",fx:{regen:5,hp:30}},
{id:"az",s:"w",b:38,c:"#c0392b",fx:{burn:.35,life:.12,crit:.1}},
{id:"ar",s:"a",b:26,c:"#4a0f0f",fx:{hp:60,dodge:8,noburn:1}},
{id:"t1",s:"w",b:22,c:"#fff27a",fx:{crit:.18,burn:.15}},
{id:"t2",s:"a",b:16,c:"#b0b8c0",fx:{hp:50}},
{id:"t3",s:"w",b:20,c:"#e056fd",fx:{stun:.3}},
{id:"t4",s:"a",b:19,c:"#f1c40f",fx:{dodge:12,regen:4}},
{id:"b7w",s:"w",b:44,c:"#9fc5ff",fx:{stun:.2,crit:.1}},
{id:"b7a",s:"a",b:30,c:"#5d7fa3",fx:{hp:70,dodge:6}},
{id:"b8w",s:"w",b:50,c:"#ab47bc",fx:{poison:.35,life:.1}},
{id:"b8a",s:"a",b:33,c:"#6a1b9a",fx:{regen:7,dodge:10}},
{id:"b9w",s:"w",b:56,c:"#26c6a6",fx:{stun:.2,poison:.2}},
{id:"b9a",s:"a",b:37,c:"#0e6655",fx:{hp:90,regen:5}},
{id:"b10w",s:"w",b:62,c:"#ffb300",fx:{burn:.4,life:.12,crit:.1}},
{id:"b10a",s:"a",b:41,c:"#ff8f00",fx:{noburn:1,regen:8,hp:60}},
{id:"b11w",s:"w",b:70,c:"#3d3d6b",fx:{crit:.22,life:.12}},
{id:"b11a",s:"a",b:46,c:"#1a1a2e",fx:{dodge:15,hp:80}},
{id:"b12w",s:"w",b:80,c:"#ce93d8",fx:{burn:.25,stun:.15,crit:.15,life:.1}},
{id:"b12a",s:"a",b:52,c:"#e1bee7",fx:{hp:120,regen:8,noburn:1,dodge:8}},
{id:"c1",s:"w",b:7,c:"#9aa3ab",fx:{stun:.1},cr:1},
{id:"c2",s:"a",b:5,c:"#8b5a2b",fx:{dodge:4},cr:1},
{id:"c3",s:"w",b:14,c:"#dfe6ec",fx:{crit:.08},cr:1},
{id:"c4",s:"a",b:10,c:"#c3ccd4",fx:{hp:25},cr:1},
{id:"c5",s:"w",b:26,c:"#e0603a",fx:{burn:.2,crit:.08},cr:1},
{id:"c6",s:"a",b:20,c:"#b5462a",fx:{hp:45,noburn:1},cr:1}];
loc("ei",EI);
const MAT=[{k:"ez",e:"⛏️",p:8},{k:"le",e:"🟫",p:8},{k:"hk",e:"🌿",p:6},{k:"gp",e:"🍄",p:8},{k:"fb",e:"🌺",p:15},{k:"ak",e:"💎",p:20},{k:"mi",e:"🪨",p:35},{k:"ds",e:"🐉",p:150}];loc("mat",MAT,o=>o.k);
const BREW=[["gz","rm"],["ss","sp"],["dz","ds"],["fk","fr"],["ls","lm"],["az","ar"],["b7w","b7a"],["b8w","b8a"],["b9w","b9a"],["b10w","b10a"],["b11w","b11a"],["b12w","b12a"]];
const TT=[
{id:"w5",t:()=>S.wins>=5,p:()=>`${Math.min(S.wins,5)}/5`},
{id:"w25",t:()=>S.wins>=25,p:()=>`${Math.min(S.wins,25)}/25`},
{id:"w100",t:()=>S.wins>=100,p:()=>`${Math.min(S.wins,100)}/100`},
{id:"cr",t:()=>S.crits>=50,p:()=>`${Math.min(S.crits,50)}/50`},
{id:"fl",t:()=>S.flawless>=3,p:()=>`${Math.min(S.flawless,3)}/3`},
{id:"cl",t:()=>S.close>=1,p:()=>`${Math.min(S.close,1)}/1`},
{id:"tc",t:()=>S.troph>=1,p:()=>`${Math.min(S.troph,1)}/1`},
{id:"tk",t:()=>S.troph>=5,p:()=>`${Math.min(S.troph,5)}/5`},
{id:"b0",t:()=>S.bk.includes(0),p:()=>""},
{id:"b1",t:()=>S.bk.includes(1),p:()=>""},
{id:"b2",t:()=>S.bk.includes(2),p:()=>""},
{id:"b3",t:()=>S.bk.includes(3),p:()=>""},
{id:"b4",t:()=>S.bk.includes(4),p:()=>""},
{id:"b5",t:()=>S.bk.includes(5),p:()=>""},
{id:"tw10",t:()=>S.tbest>=10,p:()=>`${Math.min(S.tbest,10)}/10`},
{id:"tw25",t:()=>S.tbest>=25,p:()=>`${Math.min(S.tbest,25)}/25`},
{id:"st",t:()=>S.star>=1,p:()=>""},
{id:"b6",t:()=>S.bk.includes(6),p:()=>""},
{id:"b7",t:()=>S.bk.includes(7),p:()=>""},
{id:"b8",t:()=>S.bk.includes(8),p:()=>""},
{id:"b9",t:()=>S.bk.includes(9),p:()=>""},
{id:"b10",t:()=>S.bk.includes(10),p:()=>""},
{id:"b11",t:()=>S.bk.includes(11),p:()=>""},
{id:"au",t:()=>[0,1,2,3,4,5].every(i=>S.bk.includes(i)),p:()=>`${[0,1,2,3,4,5].filter(i=>S.bk.includes(i)).length}/6`},
{id:"gl",t:()=>(S.tavW||0)>=10,p:()=>`${Math.min(S.tavW||0,10)}/10`},
{id:"mk",t:()=>typeof BST!=="undefined"&&BST.every(x=>((S.bst||{})[x.k]||{}).w>0),p:()=>typeof BST!=="undefined"?`${BST.filter(x=>((S.bst||{})[x.k]||{}).w>0).length}/${BST.length}`:""},
{id:"rv",t:()=>(S.rv||0)>=7,p:()=>`${S.rv||0}/7`},
{id:"lg",t:()=>S.bk.length>=12,p:()=>`${S.bk.length}/12`}];
loc("tt",TT);
// Fähigkeiten: id, Name, Stufe, Einsätze (99 = unbegrenzt), Stärke, Treffsicherheit, Effekt, Animation (vx), self = Animation beim Spieler
const SK=[
{id:"hieb",lv:1,pp:99,pw:1,acc:95,vx:"slash"},
{id:"stoss",lv:2,pp:8,pw:.8,acc:95,fx:"stun",ch:.4,vx:"bash"},
{id:"kraft",lv:3,pp:6,pw:1.6,acc:80,vx:"heavy"},
{id:"ruf",lv:4,pp:4,pw:0,acc:100,fx:"buff",vx:"roar",self:1},
{id:"blut",lv:5,pp:5,pw:.7,acc:95,fx:"bleed",vx:"bleed"},
{id:"halt",lv:6,pp:4,pw:0,acc:100,fx:"guard",vx:"guard",self:1},
{id:"doppel",lv:7,pp:5,pw:.75,acc:92,hits:2,vx:"heavy"},
{id:"wirbel",lv:8,pp:3,pw:2.2,acc:85,vx:"whirl"},
{id:"gift",lv:9,pp:5,pw:.8,acc:95,fx:"poison",vx:"poison"},
{id:"drache",lv:10,pp:2,pw:3.2,acc:90,vx:"dragon"},
{id:"feuer",lv:11,pp:4,pw:1.2,acc:92,fx:"burn",vx:"fire"},
{id:"stern",lv:12,pp:3,pw:3.8,acc:90,vx:"star"},
{id:"vampir",lv:13,pp:4,pw:1.4,acc:92,life:.5,vx:"bleed"},
{id:"licht",lv:14,pp:3,pw:0,acc:100,fx:"heal",vx:"heal",self:1},
{id:"furcht",lv:15,pp:3,pw:0,acc:100,fx:"weak",vx:"roar"},
{id:"bohr",lv:16,pp:4,pw:1.8,acc:95,fx:"pierce",vx:"slash"},
{id:"laeut",lv:17,pp:3,pw:0,acc:100,fx:"cleanse",vx:"heal",self:1},
{id:"welten",lv:18,pp:2,pw:5,acc:85,vx:"world"},
{id:"hagel",lv:20,pp:3,pw:.6,acc:90,hits:4,vx:"bleed"},
{id:"richt",lv:22,pp:2,pw:2,acc:90,fx:"exec",vx:"world"},
{id:"atem",lv:24,pp:2,pw:0,acc:100,fx:"regen",vx:"heal",self:1},
{id:"donner",lv:26,pp:3,pw:2.4,acc:90,fx:"stun",ch:.5,vx:"star"},
{id:"phoenix",lv:28,pp:2,pw:3,acc:90,fx:"burn",life:.25,vx:"fire"},
{id:"zorn",lv:30,pp:1,pw:7,acc:90,crit:1,vx:"world"}];
loc("sk",SK);
const skMax=()=>6+((S.bl||{}).slot||0);
// Zeitlich begrenzte Segen (z. B. vom Schrein): {k:"dmg"|"crit"|"gold",v,n:Kämpfe,name}
const buffV=k=>(S.buffs||[]).filter(b=>b.k===k&&b.n>0).reduce((a,b)=>a+b.v,0);
function buffTick(){if(!S.buffs)return;S.buffs.forEach(b=>b.n--);S.buffs=S.buffs.filter(b=>b.n>0)}
const blessV=k=>((S.bl||{})[k]||0);
const SKD=id=>SK.find(s=>s.id===id);
const knowSk=id=>{const s=SKD(id);return !!s&&s.lv<=lvl()};
const eqSk=()=>["hieb",...(S.sk||[]).filter(knowSk)];
const IT=[{k:"h",p:15,e:"🧪"},{k:"H",p:40,e:"⚗️"},{k:"x",p:90,e:"🍶"},{k:"k",p:25,e:"💥"},{k:"g",p:20,e:"💊"},{k:"e",p:25,e:"🛡️"},{k:"a",p:35,e:"🔷"},{k:"A",p:90,e:"💠"}];loc("it",IT,o=>o.k);
// ---- Turm-Kulissen: alle 5 Etagen (nach jedem Turm-Boss) eine neue, bedrohlichere Ebene ----
const TIER=t("tier");
const DROP={Magier:{ak:4,fb:2,hk:2},Ritter:{ez:4,le:2,hk:2,ak:1},Räuber:{le:4,gp:4,hk:2},Feuerritter:{fb:4,ez:2,ak:1},Panzerritter:{ez:5,mi:2,le:1},Bogenschütze:{le:3,hk:4,gp:2}};
const PR={sm:{n:t("pr.sm"),e:"🔨"},al:{n:t("pr.al"),e:"⚗️"},ve:{n:t("pr.ve"),e:"🔮"}};
const ALC=[{id:"h",lv:1,m:{hk:2}},{id:"g",lv:2,m:{gp:1,hk:1}},{id:"k",lv:3,m:{fb:1,hk:1}},{id:"e",lv:4,m:{ez:1,hk:2}},{id:"H",lv:5,m:{hk:4,fb:1}},{id:"x",lv:8,m:{hk:4,ak:1,ds:1}},{id:"a",lv:3,m:{ak:1,hk:2}},{id:"A",lv:6,m:{ak:2,fb:1,hk:2}}];
const SMI=[{id:"c1",lv:2,m:{ez:6,le:2},g:20},{id:"c2",lv:3,m:{le:6,ez:3},g:20},{id:"c3",lv:5,m:{ez:8,mi:3},g:60},{id:"c4",lv:6,m:{ez:8,mi:3,le:4},g:60},{id:"c5",lv:8,m:{mi:6,ds:2,fb:3},g:150},{id:"c6",lv:9,m:{mi:6,ds:3,le:6},g:150}];
const RU=[{id:"r1",s:"w",lv:1,m:{fb:2,ak:1},fx:{burn:.1}},{id:"r2",s:"w",lv:2,m:{gp:3,ak:1},fx:{poison:.12}},
 {id:"r3",s:"w",lv:3,m:{ez:2,ak:2},fx:{crit:.06}},{id:"r4",s:"w",lv:5,m:{ak:3,mi:1},fx:{stun:.08}},{id:"r5",s:"w",lv:7,m:{ak:3,ds:1},fx:{life:.08}},
 {id:"r6",s:"a",lv:1,m:{hk:2,ak:1},fx:{hp:15}},{id:"r7",s:"a",lv:3,m:{le:2,ak:2},fx:{dodge:4}},{id:"r8",s:"a",lv:4,m:{hk:3,ak:2},fx:{regen:2}},{id:"r9",s:"a",lv:6,m:{fb:3,ak:2},fx:{noburn:1}}];
loc("ru",RU);
const EVT=[
 [3,()=>t("evt.cock")],
 [3,()=>t("evt.sun")],
 [2,()=>{const g=rnd(5,15);S.gold+=g;return t("evt.gold",g)}],
 [2,()=>{S.it.h++;return t("evt.potion")}],
 [2,()=>{const x=10+lvl()*5;S.exp+=x;return t("evt.vet",x)}],
 [2,()=>{S.ruhm+=5+lvl();return t("evt.fame",5+lvl())}],
 [1,()=>{S.en=Math.max(1,S.en-1);return t("evt.sleep",S.en)}],
 [1,()=>{const x=Math.min(S.gold,Math.max(1,Math.floor(S.gold*.1)),50+lvl()*15);S.gold-=x;return x?t("evt.thief",x):t("evt.nothief")}]];
const ENS=t("ens");
const ET=[
{t:"Ritter",hp:1,atk:1,def:1,mv:[[1,92,"",5],[1.6,75,"",3],[0,100,"guard",2]]},
{t:"Räuber",hp:.8,atk:.9,def:.6,tint:"#2f7d32",mv:[[1,95,"",4],[.7,92,"poison",4],[0,100,"guard",1]]},
{t:"Feuerritter",hp:1,atk:1.1,def:.9,tint:"#e67e22",mv:[[1,90,"",3],[.9,88,"burn",4],[1.6,75,"",2]]},
{t:"Panzerritter",hp:1.4,atk:.8,def:1.5,tint:"#5d6d7e",mv:[[1.2,80,"stun",3],[1,92,"",3],[0,100,"guard",3]]},
{t:"Bogenschütze",hp:.7,atk:1.2,def:.4,tint:"#8e5a2b",mv:[[1,96,"",4],[1.8,70,"",3]]},
{t:"Magier",hp:.75,atk:1.25,def:.5,tint:"#5e35b1",mv:[[1,94,"",4],[1.1,88,"burn",3],[.9,90,"stun",2],[0,100,"guard",1]]}];
loc("et",ET,o=>o.t);
const BOSS=[
{L:3,req:40,hp:2.4,atk:1,def:1,tint:"#2f7d32",mv:[[1,92,"",4],[.8,92,"poison",3],[1.7,75,"",2]]},
{L:6,req:150,hp:2.5,atk:1.1,def:1.2,tint:"#222",mv:[[1.1,92,"",4],[1.3,80,"stun",3],[1.8,78,"",3],[0,100,"guard",1]]},
{L:10,req:500,hp:3,atk:1.2,def:1.3,tint:"#d35400",mv:[[1,92,"",3],[1,90,"burn",4],[1.5,80,"stun",2],[2.2,72,"burn",2]]},
{L:14,req:1000,hp:3.2,atk:1.2,def:1.3,tint:"#7fd6ff",mv:[[1,92,"",4],[1.2,85,"stun",3],[2,75,"",3],[0,100,"guard",1]]},
{L:18,req:2000,hp:3.5,atk:1.3,def:1.4,tint:"#7d3c98",mv:[[1,92,"",4],[.9,90,"poison",3],[2.2,75,"",3],[0,100,"guard",1]]},
{L:24,req:4000,hp:4,atk:1.4,def:1.5,tint:"#8b0000",mv:[[1.1,92,"",4],[1.2,88,"burn",3],[1.8,78,"stun",3],[2.6,70,"",2]]},
{L:28,req:6000,hp:4.5,atk:1.45,def:1.55,tint:"#5d7fa3",mv:[[1.1,92,"",4],[1.3,85,"stun",3],[2,78,"",3],[0,100,"guard",1]]},
{L:32,req:8500,hp:4.8,atk:1.48,def:1.55,tint:"#6a1b9a",mv:[[1,92,"",3],[1,90,"poison",4],[1.4,85,"burn",3],[2.4,72,"",2]]},
{L:36,req:12000,hp:5.3,atk:1.51,def:1.6,tint:"#0e6655",mv:[[1.1,92,"",4],[1.2,85,"stun",3],[1,90,"poison",3],[2.2,75,"",2]]},
{L:40,req:16000,hp:5.6,atk:1.54,def:1.6,tint:"#ff8f00",mv:[[1.1,92,"",4],[1.5,85,"burn",3],[1.8,80,"",3],[0,100,"guard",1]]},
{L:45,req:21000,hp:6,atk:1.57,def:1.65,tint:"#1a1a2e",mv:[[1.2,92,"",4],[1.2,85,"stun",3],[2,80,"",3],[2.8,68,"",2]]},
{L:50,req:28000,hp:6.6,atk:1.6,def:1.7,tint:"#4a148c",mv:[[1.2,92,"",3],[1.3,88,"burn",3],[1.1,90,"poison",2],[1.4,85,"stun",2],[3,68,"",2]]}];
loc("boss",BOSS,(o,i)=>i);
// ---- Turm-Bosse: eigene Bosse je 5 Etagen (Etage 5…100), mit Kampftricks tr (siehe towerboss.js); mv2 = Angriffe der 2. Phase ----
const TBOSS=[
{L:3,hp:2.2,atk:1,def:1.2,tint:"#8d6e63",mv:[[1,92,"",4],[1.4,80,"",3],[0,100,"guard",2]],tr:{charge:{n:3,pw:3}}},
{L:6,hp:2.3,atk:1.1,def:1.2,tint:"#424242",mv:[[1.1,92,"",4],[1.2,85,"stun",3],[1.6,78,"",2]],tr:{minion:{k:2,hp:.12,atk:.25,at:[1]}}},
{L:10,hp:2.7,atk:1.1,def:1.5,tint:"#4dd0e1",fx:{nopois:1},mv:[[1,92,"",4],[1.3,85,"stun",3],[2,72,"",2],[0,100,"guard",1]],tr:{reflect:{n:4,r:2,p:.5}}},
{L:14,hp:2.9,atk:1.2,def:1.3,tint:"#e64a19",fx:{noburn:1},mv:[[1,92,"",4],[1,90,"burn",3],[1.8,76,"",2]],mv2:[[1.2,90,"burn",4],[2,74,"burn",3],[1.4,85,"",2]],tr:{phase:{at:.5,heal:.15,atk:1.2}}},
{L:18,hp:3.2,atk:1.3,def:1.3,tint:"#9e9e9e",fx:{life:.15},mv:[[1,92,"",4],[.9,90,"poison",3],[1.8,76,"",2]],tr:{seal:{p:.35,r:2}}},
{L:24,hp:3.6,atk:1.4,def:1.4,tint:"#5c6bc0",fx:{dodge:12},mv:[[1.1,94,"",4],[1.2,85,"stun",3],[1.8,76,"",2]],tr:{charge:{n:3,pw:3}}},
{L:28,hp:4.1,atk:1.45,def:1.55,tint:"#212121",mv:[[1.1,92,"",4],[1.6,80,"",3],[0,100,"guard",1]],tr:{reflect:{n:4,r:2,p:.5}}},
{L:32,hp:4.3,atk:1.48,def:1.55,tint:"#7c4dff",mv:[[1,92,"",4],[1.3,85,"burn",3],[2.2,72,"",2]],tr:{minion:{k:3,hp:.1,atk:.2,at:[1,.5]}}},
{L:36,hp:4.8,atk:1.51,def:1.7,tint:"#b8860b",mv:[[1.1,92,"",4],[1.2,85,"stun",3],[0,100,"guard",1]],tr:{charge:{n:4,pw:3},reflect:{n:5,r:2,p:.4}}},
{L:40,hp:5,atk:1.54,def:1.6,tint:"#6d4c41",mv:[[1,92,"",4],[1.2,88,"burn",3],[1.1,88,"stun",2]],tr:{seal:{p:.35,r:2},minion:{k:3,hp:.08,atk:.2,at:[1]}}},
{L:45,hp:5.4,atk:1.57,def:1.65,tint:"#8bc34a",mv:[[1,92,"",4],[1,92,"poison",4],[1.8,76,"",2]],tr:{minion:{k:3,hp:.1,atk:.22,at:[1,.5]}}},
{L:50,hp:5.9,atk:1.6,def:1.7,tint:"#81d4fa",mv:[[1.1,92,"",4],[1.2,85,"stun",3],[1.8,78,"",2]],mv2:[[1.3,90,"stun",3],[2,76,"",3],[1.2,90,"",3]],tr:{phase:{at:.5,heal:.1,atk:1.15},charge:{n:3,pw:3}}},
{L:54,hp:6.3,atk:1.63,def:1.72,tint:"#c2185b",fx:{life:.2},mv:[[1.1,92,"",4],[1,90,"poison",3],[2,76,"",2]],tr:{reflect:{n:4,r:2,p:.5}}},
{L:58,hp:6.4,atk:1.66,def:1.75,tint:"#e0e0e0",mv:[[1.1,92,"",4],[1.3,85,"stun",3],[2,76,"",2],[0,100,"guard",1]],tr:{revive:{hp:.4},minion:{k:3,hp:.08,atk:.2,at:[1]}}},
{L:62,hp:6.8,atk:1.69,def:1.85,tint:"#ff6f00",fx:{noburn:1},mv:[[1.2,90,"",4],[1.2,88,"burn",3],[0,100,"guard",1]],mv2:[[1.4,90,"burn",4],[2.2,76,"",3],[1.3,85,"stun",2]],tr:{charge:{n:3,pw:3.2},phase:{at:.5,heal:.1,atk:1.2}}},
{L:66,hp:7,atk:1.72,def:1.78,tint:"#b0bec5",fx:{dodge:8},mv:[[1.1,94,"",4],[1.3,86,"stun",2],[2,76,"",2]],tr:{reflect:{n:3,r:2,p:.5},seal:{p:.3,r:2}}},
{L:70,hp:7.4,atk:1.75,def:1.8,tint:"#4a148c",mv:[[1.1,92,"",4],[1,90,"poison",3],[1.2,86,"stun",2]],mv2:[[1.3,90,"poison",3],[1.4,85,"stun",3],[2.4,72,"",2]],tr:{seal:{p:.35,r:2},phase:{at:.5,heal:.15,atk:1.2}}},
{L:74,hp:7.8,atk:1.78,def:1.82,tint:"#283593",mv:[[1.1,92,"",4],[1.3,86,"burn",3],[2,76,"",2]],tr:{charge:{n:3,pw:3.2},minion:{k:3,hp:.08,atk:.22,at:[1]}}},
{L:78,hp:8.4,atk:1.81,def:1.86,tint:"#ffd600",fx:{noburn:1},mv:[[1.2,92,"",4],[1.3,88,"burn",3],[2.2,74,"",2]],mv2:[[1.4,90,"burn",4],[2.6,72,"",2],[1.5,85,"stun",2]],tr:{phase:{at:.5,heal:.15,atk:1.2},charge:{n:3,pw:3.4}}},
{L:82,hp:9,atk:1.84,def:1.9,tint:"#311b92",mv:[[1.2,92,"",4],[1.4,86,"stun",3],[1.3,88,"burn",2],[2.6,72,"",2]],mv2:[[1.4,90,"burn",3],[1.4,88,"poison",3],[3,70,"",2]],tr:{minion:{k:3,hp:.08,atk:.2,at:[1]},phase:{at:.5,heal:.1,atk:1.2},revive:{hp:.35}}}];
loc("tboss",TBOSS,(o,i)=>i);TBOSS.forEach(b=>{if(b.mv2)b.mv2=b.mv2.map((m,j)=>[b.m2[j],...m])});
