// Ritter Manager – Waffenarten: jede Art mit eigener Wirkung, eigenen Modellen und 5 Stufen im Markt

const WCAT={
 schwert:{n:"Schwert",e:"🗡️",dmg:1,acc:3,crit:.05,d:"Ausgewogen: +3 Treffsicherheit, +5 % Krit"},
 axt:{n:"Axt",e:"🪓",dmg:1,acc:-5,bleed:.15,d:"15 % Blutung, aber −5 Treffsicherheit"},
 keule:{n:"Keule",e:"🔨",dmg:.95,armor:.3,stun:.1,d:"Ignoriert 30 % Rüstung, 10 % Betäubung, aber −5 % Schaden"},
 helle:{n:"Hellebarde",e:"🔱",dmg:1,reach:.25,d:"+25 % Schaden, solange der Gegner über 70 % LP hat"},
 bogen:{n:"Bogen",e:"🏹",dmg:1,acc:8,crit:.12,d:"+8 Treffsicherheit, +12 % Krit"},
 stab:{n:"Zauberstab",e:"🪄",dmg:.9,magic:1,armor:.5,d:"Zauberkraft aus Stärke und Geschick, ignoriert 50 % Rüstung"},
 dolch:{n:"Dolch",e:"🔪",dmg:.95,crit:.15,dbl:.3,d:"−5 % Schaden, +15 % Krit, 30 % Doppelstich"}};
const WNAMES={schwert:W.map(x=>x[0]),axt:["Holzfälleraxt","Eisenaxt","Streitaxt","Doppelaxt","Drachenaxt"],keule:["Knüppel","Eisenkeule","Morgenstern","Kriegshammer","Drachenhammer"],
 helle:["Speer","Eisenspeer","Hellebarde","Glefe","Drachenhellebarde"],bogen:["Kurzbogen","Jagdbogen","Langbogen","Kompositbogen","Drachenbogen"],
 stab:["Holzstab","Eichenstab","Kristallstab","Runenstab","Drachenstab"],dolch:["Messer","Eisendolch","Stahldolch","Parierdolch","Drachenkralle"]};
const wPrice=(cat,i)=>i===0&&cat!=="schwert"?15:W[i][1];
const wKey=()=>!S.wc||S.wc==="schwert"?"w"+S.w:`w:${S.wc}:${S.w}`;
const eqCat=()=>{const e=eq("w");return e?(e.cat||"schwert"):(S.wc||"schwert")};
const wcat=()=>WCAT[eqCat()]||WCAT.schwert;
function buyW(cat,i){const p=wPrice(cat,i);if(S.gold<p||(S.wc||"schwert")===cat&&S.w===i)return;S.gold-=p;S.wc=cat;S.w=i;sfx("coin");msg=`Gekauft: <b>${WNAMES[cat][i]}</b>!`;save();shop()}
// Neue verzauberte Waffen der anderen Arten (in der Werkstatt schmiedbar)
EI.push(
 {id:"x1",n:"Runenaxt",s:"w",cat:"axt",b:12,c:"#90caf9",fx:{crit:.06,stun:.08},d:"+6 % Krit, 8 % Lähmung",cr:1},
 {id:"x2",n:"Donnerkeule",s:"w",cat:"keule",b:15,c:"#fff176",fx:{stun:.15},d:"15 % Lähmung",cr:1},
 {id:"x3",n:"Sturmhellebarde",s:"w",cat:"helle",b:17,c:"#80deea",fx:{crit:.1},d:"+10 % Krit",cr:1},
 {id:"x4",n:"Elfenbogen",s:"w",cat:"bogen",b:16,c:"#a5d6a7",fx:{crit:.12,poison:.15},d:"+12 % Krit, 15 % Gift",cr:1},
 {id:"x5",n:"Erzmagierstab",s:"w",cat:"stab",b:20,c:"#ce93d8",fx:{burn:.2,life:.06},d:"20 % Brand, 6 % Lebensraub",cr:1},
 {id:"x6",n:"Schattendolch",s:"w",cat:"dolch",b:15,c:"#7e57c2",fx:{crit:.12,poison:.2},d:"+12 % Krit, 20 % Gift",cr:1});
SMI.push({id:"x1",lv:4,m:{ez:8,le:2},g:40},{id:"x2",lv:5,m:{ez:10,mi:2},g:60},{id:"x6",lv:6,m:{ez:5,gp:4,ak:1},g:60},{id:"x3",lv:7,m:{ez:8,mi:4,ak:1},g:90},{id:"x4",lv:7,m:{le:8,gp:3,hk:3},g:90},{id:"x5",lv:8,m:{ak:6,fb:4,mi:2},g:120});
SMI.sort((a,b)=>a.lv-b.lv);
// Waffenmodelle (Hand des Ritters bei 107.5/105.5). col = Metall/Farbe, g = Leuchtfarbe verzauberter Waffen
const WOOD=["#a1887f","#8d6e63","#6d4c41","#5d4037","#4e342e"];
function catSvg(cat,t,col,g){const glow=g?`style="filter:drop-shadow(0 0 4px ${g})"`:"",w=WOOD[t]||WOOD[2],c=col||WC[t];
 switch(cat){
 case"axt":return `<g ${glow}><rect x="105.5" y="38" width="4" height="78" rx="1.5" fill="${w}" stroke="#0005"/><path d="M109 40Q128 34 130 54Q128 74 109 68Z" fill="${c}" stroke="#0006"/><path d="M112 44q12 0 14 10" stroke="#fff8" fill="none"/>${t>=3?`<path d="M106 42Q88 36 86 54Q88 72 106 66Z" fill="${c}" stroke="#0006"/>`:`<path d="M105.5 48l-7 4 7 4z" fill="${c}" stroke="#0005"/>`}${t>=4?'<circle cx="107.5" cy="54" r="3" fill="#ff5722"/>':""}</g>`;
 case"keule":return t===0?`<g ${glow}><path d="M105 116L104 64Q100 36 108 28Q116 36 112 64L110 116Z" fill="${w}" stroke="#0006"/><path d="M106 44l3 2M108 56l3-2" stroke="#0004"/></g>`:`<g ${glow}><rect x="105.5" y="52" width="4" height="64" rx="1.5" fill="${w}" stroke="#0005"/>${t>=3?`<rect x="94" y="30" width="27" height="20" rx="3" fill="${c}" stroke="#0006"/><path d="M96 34h23" stroke="#fff8"/>`:`<circle cx="107.5" cy="42" r="${9+t}" fill="${c}" stroke="#0006"/><circle cx="104" cy="38" r="3" fill="#fff7"/>`}${t===2?[0,60,120,180,240,300].map(a=>{const r=a*Math.PI/180;return `<path d="M${107.5+Math.cos(r)*10} ${42+Math.sin(r)*10}l${Math.cos(r)*6} ${Math.sin(r)*6}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`}).join(""):""}${t>=4?'<circle cx="107.5" cy="40" r="3" fill="#ff5722"/>':""}</g>`;
 case"helle":return `<g ${glow}><rect x="106" y="2" width="3" height="116" rx="1.5" fill="${w}" stroke="#0005"/><polygon points="104.5,10 107.5,-6 110.5,10" fill="${c}" stroke="#0006"/>${t>=2?`<path d="M109 12Q126 12 126 26Q120 34 109 32Z" fill="${c}" stroke="#0006"/><path d="M106 16l-8 -4 2 8z" fill="${c}" stroke="#0006"/>`:""}${t>=4?'<circle cx="107.5" cy="22" r="2.6" fill="#ff5722"/>':""}</g>`;
 case"bogen":return `<g ${glow}><path d="M108 66Q130 105 108 144" stroke="${t>=4?"#8b1e1e":w}" stroke-width="${3.5+t*.3}" fill="none" stroke-linecap="round"/><path d="M108 66V144" stroke="#eee" stroke-width=".9"/>${t>=2?`<path d="M110 70l4-2M110 140l4 2" stroke="${c}" stroke-width="2"/>`:""}</g>`;
 case"stab":{const gem=t>=4?"#ff5722":["#80cbc4","#81d4fa","#b388ff","#ce93d8","#ff5722"][t];return `<g ${glow}><rect x="105.8" y="16" width="3.4" height="104" rx="1.5" fill="${w}" stroke="#0005"/><path d="M103 20q4.5-8 9 0" stroke="${w}" stroke-width="2.5" fill="none"/><circle class="pl" cx="107.5" cy="12" r="10" fill="${g||gem}"/><circle cx="107.5" cy="12" r="${4+t*.6}" fill="${g?c:gem}" stroke="#fff8"/>${t>=3?ST(116,6,"#fff",.3)+ST(99,18,"#fff",.8):""}</g>`}
 case"dolch":return `<g ${glow}><path d="M104.5 98V64L107.5 50L110.5 64V98Z" fill="${c}" stroke="#0005"/><path d="M107.5 56V96" stroke="#fff7"/><path d="M100 96h15v4h-15z" fill="#7a4a1c" stroke="#0004"/>${t>=4?'<circle cx="107.5" cy="98" r="2" fill="#ff5722"/>':""}</g>`;
 default:return ""}}
