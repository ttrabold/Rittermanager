// Ritter Manager – Spieldaten: Ausrüstung, Gegenstände, Fähigkeiten, Gegner, Bosse, Titel, Rezepte
const AC=["#6b4a2b","#8b6b43","#9aa3ab","#c3ccd4","#7fd6e0"],WC=["#a67c52","#b8bec4","#dfe6ec","#f1f5f9","#ff8a45"],SC=["none","#8b5a2b","#8f98a0","#c0392b"];
const W=[["Holzschwert",0,0],["Eisenschwert",40,3],["Stahlschwert",120,6],["Langschwert",300,10],["Drachenklinge",700,16]];
const A=[["Lumpen",0,0],["Lederwams",40,2],["Kettenhemd",120,4],["Plattenpanzer",300,7],["Mithril-Rüstung",700,11]];
const SH=[["Kein Schild",0,0],["Holzschild",30,1],["Eisenschild",100,2],["Turmschild",280,4]];
const RANKF={"Knappe":"Knappin","Ritter":"Ritterin","Edelritter":"Edelritterin","Baron":"Baronin","Graf":"Gräfin","Herzog":"Herzogin","Held des Königreichs":"Heldin des Königreichs","Halbgott":"Halbgöttin"};
const RANKS=[[0,"Knappe"],[50,"Ritter"],[150,"Edelritter"],[400,"Baron"],[900,"Graf"],[2000,"Herzog"],[5000,"Held des Königreichs"],[10000,"Unsterbliche Legende"],[25000,"Halbgott"]];
const EI=[
{id:"fl",n:"Flammenklinge",s:"w",b:10,c:"#ff6a2b",fx:{burn:.25},d:"25 % Brandchance"},
{id:"fz",n:"Frostzahn",s:"w",b:9,c:"#7fd6ff",fx:{stun:.2},d:"20 % Chance, den Gegner zu lähmen"},
{id:"sb",n:"Sturmbringer",s:"w",b:11,c:"#f5e663",fx:{crit:.12},d:"+12 % Krit-Chance"},
{id:"mo",n:"Mondsilber-Kettenhemd",s:"a",b:7,c:"#cfd8ff",fx:{regen:3},d:"Heilt 3 LP pro Runde"},
{id:"wp",n:"Wächterpanzer",s:"a",b:8,c:"#6bbf6b",fx:{hp:20},d:"+20 maximale LP"},
{id:"wm",n:"Windmantel",s:"a",b:5,c:"#9de0c4",fx:{dodge:10},d:"+10 % Ausweichen"},
{id:"gz",n:"Giftzahn-Säbel",s:"w",b:8,c:"#7ed957",fx:{poison:.3},d:"30 % Giftchance"},
{id:"rm",n:"Räubermantel",s:"a",b:5,c:"#8b6b43",fx:{dodge:5},d:"+5 % Ausweichen"},
{id:"ss",n:"Schattenklinge",s:"w",b:13,c:"#6c3fa0",fx:{crit:.15},d:"+15 % Krit-Chance"},
{id:"sp",n:"Schattenpanzer",s:"a",b:9,c:"#3b2f4a",fx:{dodge:8},d:"+8 % Ausweichen"},
{id:"dz",n:"Drachenzahn",s:"w",b:18,c:"#ff3b1f",fx:{burn:.3,life:.1},d:"30 % Brand, 10 % Lebensraub"},
{id:"ds",n:"Drachenschuppen",s:"a",b:13,c:"#d35400",fx:{noburn:1,hp:30},d:"Brandimmun, +30 maximale LP"},
{id:"fk",n:"Frostbrand",s:"w",b:24,c:"#aee8ff",fx:{stun:.25,crit:.1},d:"25 % Lähmung, +10 % Krit"},
{id:"fr",n:"Eisharnisch",s:"a",b:17,c:"#7fd6ff",fx:{hp:40,dodge:5},d:"+40 max. LP, +5 % Ausweichen"},
{id:"ls",n:"Seelenschnitter",s:"w",b:30,c:"#9b59b6",fx:{life:.15,crit:.1},d:"15 % Lebensraub, +10 % Krit"},
{id:"lm",n:"Lichgewand",s:"a",b:21,c:"#5b2c6f",fx:{regen:5,hp:30},d:"Heilt 5 LP pro Runde, +30 max. LP"},
{id:"az",n:"Höllenschwert",s:"w",b:38,c:"#c0392b",fx:{burn:.35,life:.12,crit:.1},d:"35 % Brand, 12 % Lebensraub"},
{id:"ar",n:"Dämonenpanzer",s:"a",b:26,c:"#4a0f0f",fx:{hp:60,dodge:8,noburn:1},d:"+60 max. LP, brandimmun"},
{id:"t1",n:"Sternenklinge",s:"w",b:22,c:"#fff27a",fx:{crit:.18,burn:.15},d:"+18 % Krit, 15 % Brand"},
{id:"t2",n:"Titanenpanzer",s:"a",b:16,c:"#b0b8c0",fx:{hp:50},d:"+50 max. LP"},
{id:"t3",n:"Chronosdolch",s:"w",b:20,c:"#e056fd",fx:{stun:.3},d:"30 % Lähmung"},
{id:"t4",n:"Aegisharnisch",s:"a",b:19,c:"#f1c40f",fx:{dodge:12,regen:4},d:"+12 % Ausweichen, heilt 4 LP/Runde"},
{id:"b7w",n:"Donnerhammer",s:"w",b:44,c:"#9fc5ff",fx:{stun:.2,crit:.1},d:"20 % Lähmung, +10 % Krit"},
{id:"b7a",n:"Sturmplatte",s:"a",b:30,c:"#5d7fa3",fx:{hp:70,dodge:6},d:"+70 max. LP, +6 % Ausweichen"},
{id:"b8w",n:"Hexendorn",s:"w",b:50,c:"#ab47bc",fx:{poison:.35,life:.1},d:"35 % Gift, 10 % Lebensraub"},
{id:"b8a",n:"Hexenschleier",s:"a",b:33,c:"#6a1b9a",fx:{regen:7,dodge:10},d:"Heilt 7 LP/Runde, +10 % Ausweichen"},
{id:"b9w",n:"Tiefseedreizack",s:"w",b:56,c:"#26c6a6",fx:{stun:.2,poison:.2},d:"20 % Lähmung, 20 % Gift"},
{id:"b9a",n:"Korallenpanzer",s:"a",b:37,c:"#0e6655",fx:{hp:90,regen:5},d:"+90 max. LP, heilt 5 LP/Runde"},
{id:"b10w",n:"Phönixklinge",s:"w",b:62,c:"#ffb300",fx:{burn:.4,life:.12,crit:.1},d:"40 % Brand, 12 % Lebensraub, +10 % Krit"},
{id:"b10a",n:"Phönixmantel",s:"a",b:41,c:"#ff8f00",fx:{noburn:1,regen:8,hp:60},d:"Brandimmun, heilt 8 LP/Runde, +60 max. LP"},
{id:"b11w",n:"Nachtschneide",s:"w",b:70,c:"#3d3d6b",fx:{crit:.22,life:.12},d:"+22 % Krit, 12 % Lebensraub"},
{id:"b11a",n:"Leere-Rüstung",s:"a",b:46,c:"#1a1a2e",fx:{dodge:15,hp:80},d:"+15 % Ausweichen, +80 max. LP"},
{id:"b12w",n:"Weltenklinge",s:"w",b:80,c:"#ce93d8",fx:{burn:.25,stun:.15,crit:.15,life:.1},d:"25 % Brand, 15 % Lähmung, +15 % Krit, 10 % Lebensraub"},
{id:"b12a",n:"Ewige Aegis",s:"a",b:52,c:"#e1bee7",fx:{hp:120,regen:8,noburn:1,dodge:8},d:"+120 max. LP, heilt 8 LP/Runde, brandimmun, +8 % Ausweichen"},
{id:"c1",n:"Hammerklinge",s:"w",b:7,c:"#9aa3ab",fx:{stun:.1},d:"10 % Lähmung",cr:1},
{id:"c2",n:"Beschlagener Lederpanzer",s:"a",b:5,c:"#8b5a2b",fx:{dodge:4},d:"+4 % Ausweichen",cr:1},
{id:"c3",n:"Meisterklinge",s:"w",b:14,c:"#dfe6ec",fx:{crit:.08},d:"+8 % Krit-Chance",cr:1},
{id:"c4",n:"Meisterharnisch",s:"a",b:10,c:"#c3ccd4",fx:{hp:25},d:"+25 max. LP",cr:1},
{id:"c5",n:"Drachenstahl-Schwert",s:"w",b:26,c:"#e0603a",fx:{burn:.2,crit:.08},d:"20 % Brand, +8 % Krit",cr:1},
{id:"c6",n:"Drachenstahl-Panzer",s:"a",b:20,c:"#b5462a",fx:{hp:45,noburn:1},d:"+45 max. LP, brandimmun",cr:1}];
const MAT=[{k:"ez",n:"Eisenerz",e:"⛏️",p:8},{k:"le",n:"Leder",e:"🟫",p:8},{k:"hk",n:"Heilkraut",e:"🌿",p:6},{k:"gp",n:"Giftpilz",e:"🍄",p:8},{k:"fb",n:"Feuerblüte",e:"🌺",p:15},{k:"ak",n:"Arkankristall",e:"💎",p:20},{k:"mi",n:"Mithrilerz",e:"🪨",p:35},{k:"ds",n:"Drachenschuppe",e:"🐉",p:150}];
const BREW=[["gz","rm"],["ss","sp"],["dz","ds"],["fk","fr"],["ls","lm"],["az","ar"],["b7w","b7a"],["b8w","b8a"],["b9w","b9a"],["b10w","b10a"],["b11w","b11a"],["b12w","b12a"]];
const TT=[
{id:"w5",n:"der Tapfere",d:"5 Kämpfe gewinnen",t:()=>S.wins>=5,p:()=>`${Math.min(S.wins,5)}/5`},
{id:"w25",n:"der Unerschrockene",d:"25 Kämpfe gewinnen",t:()=>S.wins>=25,p:()=>`${Math.min(S.wins,25)}/25`},
{id:"w100",n:"der Unbezwingbare",d:"100 Kämpfe gewinnen",t:()=>S.wins>=100,p:()=>`${Math.min(S.wins,100)}/100`},
{id:"cr",n:"der Scharfschneider",d:"50 kritische Treffer landen",t:()=>S.crits>=50,p:()=>`${Math.min(S.crits,50)}/50`},
{id:"fl",n:"der Makellose",d:"3 Kämpfe ohne einen Kratzer gewinnen",t:()=>S.flawless>=3,p:()=>`${Math.min(S.flawless,3)}/3`},
{id:"cl",n:"der Zähe",d:"Einen Kampf mit höchstens 5 LP gewinnen",t:()=>S.close>=1,p:()=>`${Math.min(S.close,1)}/1`},
{id:"tc",n:"der Turnierchampion",d:"Ein Turnier gewinnen",t:()=>S.troph>=1,p:()=>`${Math.min(S.troph,1)}/1`},
{id:"tk",n:"der Turnierkönig",d:"5 Turniere gewinnen",t:()=>S.troph>=5,p:()=>`${Math.min(S.troph,5)}/5`},
{id:"b0",n:"der Räuberschreck",d:"Räuberhauptmann Graukopf besiegen",t:()=>S.bk.includes(0),p:()=>""},
{id:"b1",n:"der Schattenbezwinger",d:"Den Schwarzen Ritter besiegen",t:()=>S.bk.includes(1),p:()=>""},
{id:"b2",n:"der Drachentöter",d:"Drachenlord Vulkanus besiegen",t:()=>S.bk.includes(2),p:()=>""},
{id:"b3",n:"der Frostbrecher",d:"Eiskönigin Frostara besiegen",t:()=>S.bk.includes(3),p:()=>""},
{id:"b4",n:"der Lichjäger",d:"Lich Mortrax besiegen",t:()=>S.bk.includes(4),p:()=>""},
{id:"b5",n:"der Dämonenbezwinger",d:"Dämonenfürst Azgaroth besiegen",t:()=>S.bk.includes(5),p:()=>""},
{id:"tw10",n:"der Turmwächter",d:"Etage 10 des Turms erreichen",t:()=>S.tbest>=10,p:()=>`${Math.min(S.tbest,10)}/10`},
{id:"tw25",n:"der Turmbezwinger",d:"Etage 25 des Turms erreichen",t:()=>S.tbest>=25,p:()=>`${Math.min(S.tbest,25)}/25`},
{id:"st",n:"der Wiedergeborene",d:"Eine Wiedergeburt abschließen",t:()=>S.star>=1,p:()=>""},
{id:"b6",n:"der Sturmbezwinger",d:"Sturmriese Donnerfaust besiegen",t:()=>S.bk.includes(6),p:()=>""},
{id:"b7",n:"der Hexenjäger",d:"Hexenkönigin Morgana besiegen",t:()=>S.bk.includes(7),p:()=>""},
{id:"b8",n:"der Tiefenbezwinger",d:"Krakenfürst Abyssor besiegen",t:()=>S.bk.includes(8),p:()=>""},
{id:"b9",n:"der Phönixbändiger",d:"Phönixkaiser Ignarion besiegen",t:()=>S.bk.includes(9),p:()=>""},
{id:"b10",n:"der Nachtbrecher",d:"Schattenkaiser Nyx besiegen",t:()=>S.bk.includes(10),p:()=>""},
{id:"b11",n:"der Weltenretter",d:"Den Weltenfresser besiegen",t:()=>S.bk.includes(11),p:()=>""},
{id:"au",n:"der Auserwählte",d:"Die ersten sechs Bosse besiegen",t:()=>[0,1,2,3,4,5].every(i=>S.bk.includes(i)),p:()=>`${[0,1,2,3,4,5].filter(i=>S.bk.includes(i)).length}/6`},
{id:"lg",n:"der Legendäre",d:"Alle zwölf Bosse besiegen",t:()=>S.bk.length>=12,p:()=>`${S.bk.length}/12`}];
const SK=[
{n:"Schwerthieb",lv:1,pp:99,pw:1,acc:95,d:"Solider Standardangriff"},
{n:"Schildstoß",lv:2,pp:8,pw:.8,acc:95,fx:"stun",d:"40 % Betäubung"},
{n:"Kräftiger Schlag",lv:3,pp:6,pw:1.6,acc:80,d:"Mächtig, aber ungenau"},
{n:"Kriegsruf",lv:4,pp:4,pw:0,acc:100,fx:"buff",d:"Schaden +50 % (3 Runden)"},
{n:"Blutiger Schnitt",lv:5,pp:5,pw:.7,acc:95,fx:"bleed",d:"Blutung für 3 Runden"},
{n:"Eiserne Haltung",lv:6,pp:4,pw:0,acc:100,fx:"guard",d:"Schaden −50 % (3 Runden)"},
{n:"Wirbelsturm",lv:8,pp:3,pw:2.2,acc:85,d:"Sehr stark"},
{n:"Drachenschlag",lv:10,pp:2,pw:3.2,acc:90,d:"Legendärer Hieb"},
{n:"Sternenhieb",lv:12,pp:3,pw:3.8,acc:90,d:"Himmlischer Treffer"},
{n:"Heiliges Licht",lv:14,pp:3,pw:0,acc:100,fx:"heal",d:"Heilt 35 % der max. LP"},
{n:"Weltenspalter",lv:18,pp:2,pw:5,acc:85,d:"Zerschmettert alles"}];
const IT=[{k:"h",n:"Heiltrank",p:15,d:"+40 LP",e:"🧪"},{k:"H",n:"Großer Heiltrank",p:40,d:"+100 LP",e:"⚗️"},{k:"x",n:"Elixier des Lebens",p:90,d:"+200 LP",e:"🍶"},{k:"k",n:"Kraft-Elixier",p:25,d:"Schaden +50 % (3 Runden)",e:"💥"},{k:"g",n:"Gegengift",p:20,d:"Heilt Gift und Brand",e:"💊"},{k:"e",n:"Eisenhaut-Trank",p:25,d:"Schaden −50 % (3 Runden)",e:"🛡️"},{k:"a",n:"Äthertrank",p:35,d:"+3 Einsätze für alle Fähigkeiten",e:"🔷"},{k:"A",n:"Großer Äthertrank",p:90,d:"Füllt alle Fähigkeiten ganz auf",e:"💠"}];
// ---- Turm-Kulissen: alle 5 Etagen (nach jedem Turm-Boss) eine neue, bedrohlichere Ebene ----
const TIER=[["Eingangshalle","Fackeln flackern an den alten Mauern."],["Verliese","Ketten klirren in der feuchten Dunkelheit."],["Kristallhöhle","Eisige Kristalle glühen in unheimlichem Licht."],["Lavahallen","Glühende Lava brodelt unter deinen Füßen."],["Geisterhallen","Gespenstische Flammen tanzen zwischen zerbrochenen Säulen."],["Sturmspitze","Blitze zucken um die Turmspitze, der Sturm heult."],["Schattenreich","Aus der Finsternis starren dich unzählige Augen an."],["Weltenriss","Die Wirklichkeit selbst zerbricht um dich herum."]];
const DROP={Ritter:{ez:4,le:2,hk:2,ak:1},Räuber:{le:4,gp:4,hk:2},Feuerritter:{fb:4,ez:2,ak:1},Panzerritter:{ez:5,mi:2,le:1},Bogenschütze:{le:3,hk:4,gp:2}};
const PR={sm:{n:"Schmied",e:"🔨"},al:{n:"Alchemie",e:"⚗️"},ve:{n:"Verzauberer",e:"🔮"}};
const ALC=[{id:"h",lv:1,m:{hk:2}},{id:"g",lv:2,m:{gp:1,hk:1}},{id:"k",lv:3,m:{fb:1,hk:1}},{id:"e",lv:4,m:{ez:1,hk:2}},{id:"H",lv:5,m:{hk:4,fb:1}},{id:"x",lv:8,m:{hk:4,ak:1,ds:1}},{id:"a",lv:3,m:{ak:1,hk:2}},{id:"A",lv:6,m:{ak:2,fb:1,hk:2}}];
const SMI=[{id:"c1",lv:2,m:{ez:6,le:2},g:20},{id:"c2",lv:3,m:{le:6,ez:3},g:20},{id:"c3",lv:5,m:{ez:8,mi:3},g:60},{id:"c4",lv:6,m:{ez:8,mi:3,le:4},g:60},{id:"c5",lv:8,m:{mi:6,ds:2,fb:3},g:150},{id:"c6",lv:9,m:{mi:6,ds:3,le:6},g:150}];
const RU=[{id:"r1",n:"Glutrune",s:"w",lv:1,m:{fb:2,ak:1},fx:{burn:.1},d:"+10 % Brandchance"},{id:"r2",n:"Giftrune",s:"w",lv:2,m:{gp:3,ak:1},fx:{poison:.12},d:"+12 % Giftchance"},
 {id:"r3",n:"Schärferune",s:"w",lv:3,m:{ez:2,ak:2},fx:{crit:.06},d:"+6 % Krit-Chance"},{id:"r4",n:"Frostrune",s:"w",lv:5,m:{ak:3,mi:1},fx:{stun:.08},d:"+8 % Lähmung"},{id:"r5",n:"Blutrune",s:"w",lv:7,m:{ak:3,ds:1},fx:{life:.08},d:"+8 % Lebensraub"},
 {id:"r6",n:"Lebensrune",s:"a",lv:1,m:{hk:2,ak:1},fx:{hp:15},d:"+15 max. LP"},{id:"r7",n:"Windrune",s:"a",lv:3,m:{le:2,ak:2},fx:{dodge:4},d:"+4 % Ausweichen"},{id:"r8",n:"Mondrune",s:"a",lv:4,m:{hk:3,ak:2},fx:{regen:2},d:"Heilt 2 LP pro Runde"},{id:"r9",n:"Feuerschutzrune",s:"a",lv:6,m:{fb:3,ak:2},fx:{noburn:1},d:"Brandimmun"}];
const EVT=[
 [3,()=>"Ein neuer Morgen. Der Hahn kräht!"],
 [3,()=>"Die Sonne geht auf – ein guter Tag für Abenteuer."],
 [2,()=>{const g=rnd(5,15);S.gold+=g;return `Ein Bote des Königs bringt dir <b>${g} Gold</b>. 👑`}],
 [2,()=>{S.it.h++;return "Ein fahrender Händler schenkt dir einen <b>Heiltrank</b>. 🧪"}],
 [2,()=>{const x=10+lvl()*5;S.exp+=x;return `Ein alter Veteran übt mit dir Schwertkampf: <b>+${x} EP</b>. 🤺`}],
 [2,()=>{S.ruhm+=5+lvl();return "Auf dem Marktplatz feiert man dein Können: <b>+"+(5+lvl())+" Ruhm</b>. 🎉"}],
 [1,()=>{S.en=Math.max(1,S.en-1);return `Du hast schlecht geschlafen und startest mit <b>nur ${S.en} Energie</b>. 😴`}],
 [1,()=>{const x=Math.min(S.gold,Math.max(1,Math.floor(S.gold*.1)));S.gold-=x;return x?`Taschendiebe haben dir nachts <b>${x} Gold</b> gestohlen! 🦹`:"Taschendiebe schleichen durch die Gassen – aber bei dir ist nichts zu holen."}]];
const ENS=["Eisenhart","Grimmwald","Schwarzdorn","Bertram","Blutfels","Hagen","Donnerhelm","Wolfram"];
const ET=[
{t:"Ritter",hp:1,atk:1,def:1,mv:[["Schlag",1,92,"",5],["Wuchtschlag",1.6,75,"",3],["Deckung",0,100,"guard",2]]},
{t:"Räuber",hp:.8,atk:.9,def:.6,tint:"#2f7d32",mv:[["Dolchstoß",1,95,"",4],["Giftdolch",.7,92,"poison",4],["Deckung",0,100,"guard",1]]},
{t:"Feuerritter",hp:1,atk:1.1,def:.9,tint:"#e67e22",mv:[["Schlag",1,90,"",3],["Brandschlag",.9,88,"burn",4],["Wuchtschlag",1.6,75,"",2]]},
{t:"Panzerritter",hp:1.4,atk:.8,def:1.5,tint:"#5d6d7e",mv:[["Hammerschlag",1.2,80,"stun",3],["Schlag",1,92,"",3],["Schildwall",0,100,"guard",3]]},
{t:"Bogenschütze",hp:.7,atk:1.2,def:.4,tint:"#8e5a2b",mv:[["Pfeil",1,96,"",4],["Pfeilhagel",1.8,70,"",3]]}];
const BOSS=[
{n:"Räuberhauptmann Graukopf",L:3,req:40,hp:2.4,atk:1,def:1,tint:"#2f7d32",mv:[["Säbelhieb",1,92,"",4],["Giftdolch",.8,92,"poison",3],["Plünderschlag",1.7,75,"",2]]},
{n:"Der Schwarze Ritter",L:6,req:150,hp:2.5,atk:1.1,def:1.2,tint:"#222",mv:[["Dunkler Hieb",1.1,92,"",4],["Hammerschlag",1.3,80,"stun",3],["Schattenklinge",1.8,78,"",3],["Deckung",0,100,"guard",1]]},
{n:"Drachenlord Vulkanus",L:10,req:500,hp:3,atk:1.2,def:1.3,tint:"#d35400",mv:[["Klauenhieb",1,92,"",3],["Feueratem",1,90,"burn",4],["Schwanzschlag",1.5,80,"stun",2],["Inferno",2.2,72,"burn",2]]},
{n:"Eiskönigin Frostara",L:14,req:1000,hp:3.2,atk:1.2,def:1.3,tint:"#7fd6ff",mv:[["Eissplitter",1,92,"",4],["Frostschlag",1.2,85,"stun",3],["Blizzard",2,75,"",3],["Eispanzer",0,100,"guard",1]]},
{n:"Lich Mortrax",L:18,req:2000,hp:3.5,atk:1.3,def:1.4,tint:"#7d3c98",mv:[["Seelenraub",1,92,"",4],["Giftwolke",.9,90,"poison",3],["Todesstrahl",2.2,75,"",3],["Knochenschild",0,100,"guard",1]]},
{n:"Dämonenfürst Azgaroth",L:24,req:4000,hp:4,atk:1.4,def:1.5,tint:"#8b0000",mv:[["Höllenklinge",1.1,92,"",4],["Höllenfeuer",1.2,88,"burn",3],["Schreckensschlag",1.8,78,"stun",3],["Verderben",2.6,70,"",2]]},
{n:"Sturmriese Donnerfaust",L:28,req:6000,hp:4.2,atk:1.4,def:1.55,tint:"#5d7fa3",mv:[["Faustschlag",1.1,92,"",4],["Donnerschlag",1.3,85,"stun",3],["Kettenblitz",2,78,"",3],["Sturmwall",0,100,"guard",1]]},
{n:"Hexenkönigin Morgana",L:32,req:8500,hp:4.4,atk:1.42,def:1.55,tint:"#6a1b9a",mv:[["Dornenpeitsche",1,92,"",3],["Fluchnebel",1,90,"poison",4],["Seelenfeuer",1.4,85,"burn",3],["Verdammnis",2.4,72,"",2]]},
{n:"Krakenfürst Abyssor",L:36,req:12000,hp:4.8,atk:1.44,def:1.6,tint:"#0e6655",mv:[["Tentakelhieb",1.1,92,"",4],["Würgegriff",1.2,85,"stun",3],["Tintengift",1,90,"poison",3],["Flutwelle",2.2,75,"",2]]},
{n:"Phönixkaiser Ignarion",L:40,req:16000,hp:5,atk:1.46,def:1.6,tint:"#ff8f00",mv:[["Flammenkralle",1.1,92,"",4],["Feuersturm",1.5,85,"burn",3],["Aschenregen",1.8,80,"",3],["Wiedergeburt",0,100,"guard",1]]},
{n:"Schattenkaiser Nyx",L:45,req:21000,hp:5.3,atk:1.48,def:1.65,tint:"#1a1a2e",mv:[["Schattenhieb",1.2,92,"",4],["Albtraum",1.2,85,"stun",3],["Nachtklinge",2,80,"",3],["Leere",2.8,68,"",2]]},
{n:"Der Weltenfresser",L:50,req:28000,hp:5.8,atk:1.5,def:1.7,tint:"#4a148c",mv:[["Zermalmen",1.2,92,"",3],["Urfeuer",1.3,88,"burn",3],["Weltengift",1.1,90,"poison",2],["Zeitriss",1.4,85,"stun",2],["Weltenende",3,68,"",2]]}];
