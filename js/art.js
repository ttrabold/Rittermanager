// Ritter Manager – Grafik: Ritter- und Boss-Modelle, Waffen-/Rüstungseffekte, Hintergründe, Kampfeffekte
const pk=()=>knight(S.w,S.a,S.s,false,null,eq("w")?eq("w").c:null,eq("a")?eq("a").c:null,S.ew,S.ea,S.sex==="f");
const SKFX=["slash","bash","heavy","roar","bleed","guard","whirl","dragon","star","heal","world"];
const VX={
slash:c=>`<svg class="${c}" viewBox="0 0 120 120"><path class="sl" d="M14 14L106 106"/></svg>`,
bash:c=>`<span class="fly">🛡️</span><span class="ring ${c}"></span>`,
heavy:c=>`<svg class="${c}" viewBox="0 0 120 120"><path class="sl r" d="M10 8L110 112"/><path class="sl r b" d="M34 4L118 92"/></svg><span class="flash"></span>`,
roar:c=>`<span class="ring red ${c}"></span><span class="ring red r2 ${c}"></span><span class="aura ${c}">💥</span>`,
bleed:c=>`<svg class="${c}" viewBox="0 0 120 120"><path class="sl r" d="M20 10L48 112"/><path class="sl r b" d="M52 6L80 110"/><path class="sl r c" d="M84 10L112 108"/></svg><span class="drops ${c}">🩸🩸🩸</span>`,
guard:c=>`<span class="bubble ${c}"></span>`,
whirl:c=>`<span class="whirl ${c}">🌪️</span><svg class="${c}" viewBox="0 0 120 120"><circle class="sl sp" cx="60" cy="60" r="44"/></svg>`,
dragon:c=>`<span class="dragon">🐉</span><span class="blast ${c}">🔥</span><span class="flash fire"></span>`,
heal:c=>`<span class="rise ${c}">✨💚✨</span>`,
fire:c=>`<span class="blast ${c}">🔥</span>`,
poison:c=>`<span class="cloud ${c}">☠️</span>`,
stun:c=>`<span class="spin ${c}">💫</span>`,
flash:c=>`<span class="flash"></span>`,
star:c=>`<svg class="${c}" viewBox="0 0 120 120"><path class="sl" d="M60 4L60 116"/><path class="sl b" d="M4 60L116 60"/></svg><span class="blast ${c}">🌟</span><span class="flash"></span>`,
world:c=>`<svg class="${c}" viewBox="0 0 120 120"><path class="sl r" d="M10 10L110 110"/><path class="sl r b" d="M110 10L10 110"/><path class="sl r c" d="M60 4L60 116"/></svg><span class="flash fire"></span><span class="blast ${c}">💥</span>`,
miss:c=>`<span class="mt ${c}">Daneben!</span>`,
dodge:c=>`<span class="mt ${c}">Ausgewichen!</span>`,
ko:c=>`<span class="soul ${c}">${c==="vP"?"💫":"👻"}</span><span class="kot ${c}">K.O.</span>`,
bko:c=>`<span class="flash" style="animation-delay:1.2s"></span><span class="ring ${c}" style="animation-delay:1.3s"></span><span class="ring red r2 ${c}" style="animation-delay:1.55s"></span><span class="blast ${c}" style="animation-delay:1.4s">✨</span><span class="kot ${c}" style="animation-delay:2.1s;font-size:19px">BESIEGT!</span>`};
const VXH=f=>(f.vfx||[]).map(v=>`<div class="vfx" style="--d:${v[2]?1.1:0}s">${VX[v[0]](v[1])}</div>`).join("");
const fm=(x,y,s,c,d)=>`<path class="fk" style="animation-delay:${d}s" d="M${x} ${y}q${-5*s} ${-12*s} 0 ${-26*s}q${9*s} ${11*s} 0 ${26*s}z" fill="${c}"/>`;
const ST=(x,y,c,d)=>`<path class="tw" style="animation-delay:${d}s" d="M${x} ${y-5}l1.6 3.4 3.4 1.6-3.4 1.6-1.6 3.4-1.6-3.4-3.4-1.6 3.4-1.6z" fill="${c}"/>`;
const FIRE=(a,b)=>[[103,92,1],[112,80,1],[103,66,1.1],[112,52,1.1],[103,38,1],[112,26,1],[107.5,14,1.3]].map((p,i)=>fm(p[0],p[1],p[2],i%2?a:b,i*.07)+fm(p[0],p[1],p[2]*.55,"#fff3a0",i*.07+.05)).join("")+`<circle class="fl2" cx="108" cy="20" r="2" fill="${b}"/><circle class="fl2" style="animation-delay:.7s" cx="102" cy="40" r="1.6" fill="${a}"/><circle class="fl2" style="animation-delay:1.3s" cx="114" cy="30" r="1.8" fill="${b}"/>`;
const ICE=[[113,76,124,66,114,86],[113,50,123,42,114,62],[102,64,92,56,102,76],[102,38,93,30,102,50]].map(p=>`<polygon points="${p[0]},${p[1]} ${p[2]},${p[3]} ${p[4]},${p[5]}" fill="#e8fbff" stroke="#7fd6ff"/>`).join("")+ST(120,30,"#fff",0)+ST(92,70,"#fff",.4)+ST(118,90,"#bfefff",.8);
const BOLT=[0,1].map(i=>`<path class="tw" style="animation-delay:${i*.35}s" d="M${99+i*16} 92l7-12-6-2 9-14-6-2 8-16" stroke="#fff27a" fill="none" stroke-width="2.4" stroke-linejoin="round"/>`).join("")+ST(96,40,"#fff",.2)+ST(120,60,"#fff27a",.5);
const DRIP=[[106,40,0],[111,64,.5],[103,82,1]].map(p=>`<path class="dr" style="animation-delay:${p[2]}s" d="M${p[0]} ${p[1]}q-3 5 0 7q3-2 0-7z" fill="#7ed957"/>`).join("")+`<circle class="tw" cx="108" cy="30" r="2" fill="#d6ffb8"/>`;
const SMOKE=c=>[[100,60,0],[115,40,.6],[104,24,1.2],[114,80,.9]].map(p=>`<ellipse class="fl2" style="animation-delay:${p[2]}s" cx="${p[0]}" cy="${p[1]}" rx="5" ry="7" fill="${c}" opacity=".55"/>`).join("");
const SPARK=ST(98,30,"#ffd54a",0)+ST(118,48,"#fff",.3)+ST(97,70,"#fff27a",.6)+ST(119,84,"#ffd54a",.9)+ST(108,8,"#fff",.5);
const LAVA=`<path d="M107 92l3-14-3-10 4-12-2-10" stroke="#ff7a00" stroke-width="2" fill="none" class="tw"/>`;
const CLOCK=`<g class="rot"><circle cx="107.5" cy="56" r="15" fill="none" stroke="#e056fd" stroke-width="2" stroke-dasharray="3 4"/></g><path d="M107.5 56V47M107.5 56l6 3" stroke="#fff" stroke-width="2"/>`;
const BL={wide:"M101 96V28L107.5 4L114 28V96Z",straight:"M104 96V22L107.5 6L111 22V96Z",curved:"M104 96V30Q104 14 113 5Q113 30 111 96Z",fang:"M103 96V30Q104 14 110 4Q115 20 112 40L111 96Z",dagger:"M104 96V52L107.5 36L111 52V96Z",jagged:"M104 96V24L106 18L105 12L108 7L109 15L111 22V96Z"};
const VIS={
fl:{b:"wide",f:"#ff8a2b",e:"#ffe08a",g:"#ff6a00",fx:()=>FIRE("#ff5a00","#ffb300")},
fz:{b:"straight",f:"#bfefff",e:"#fff",g:"#7fd6ff",fx:()=>ICE},
sb:{b:"wide",f:"#fff27a",e:"#fff",g:"#fff27a",fx:()=>BOLT},
gz:{b:"curved",f:"#7ed957",e:"#2e7d32",g:"#7ed957",fx:()=>DRIP},
ss:{b:"jagged",f:"#4b2a7a",e:"#b57bff",g:"#8e44ad",fx:()=>SMOKE("#6c3fa0")},
dz:{b:"fang",f:"#d32f2f",e:"#ffd54a",g:"#ff3b1f",fx:()=>FIRE("#ff3b1f","#ffd000")+`<circle cx="107.5" cy="92" r="3" fill="#ffd000"/>`},
fk:{b:"wide",f:"#aee8ff",e:"#fff",g:"#4fc3ff",fx:()=>FIRE("#2ea8ff","#b3ecff")},
ls:{b:"curved",f:"#7d3c98",e:"#b9ffd0",g:"#7dffb0",fx:()=>SMOKE("#7dffb0")},
az:{b:"jagged",f:"#2b0a0a",e:"#ff3b00",g:"#ff3b00",fx:()=>FIRE("#b71c1c","#ff6d00")+LAVA},
b7w:{b:"wide",f:"#c9dcff",e:"#fff",g:"#7fb2ff",fx:()=>BOLT+SPARK},
b8w:{b:"curved",f:"#6a1b9a",e:"#e1bee7",g:"#ab47bc",fx:()=>SMOKE("#ab47bc")+DRIP},
b9w:{b:"fang",f:"#1abc9c",e:"#d1fff5",g:"#26c6a6",fx:()=>SMOKE("#5ee6c9")+ICE},
b10w:{b:"wide",f:"#ffcc33",e:"#fff6d5",g:"#ff8f00",fx:()=>FIRE("#ff6f00","#ffd54f")},
b11w:{b:"jagged",f:"#23233f",e:"#9fa8ff",g:"#5c6bc0",fx:()=>SMOKE("#3d3d6b")+SPARK},
b12w:{b:"wide",f:"#f3e5f5",e:"#fff",g:"#ce93d8",fx:()=>FIRE("#8e24aa","#e1bee7")+SPARK},
t1:{b:"wide",f:"#fff27a",e:"#fff",g:"#ffd54a",fx:()=>SPARK},
t3:{b:"dagger",f:"#f3a6ff",e:"#fff",g:"#e056fd",fx:()=>CLOCK}};
const weaponSvg=id=>{const v=VIS[id];return `<g style="filter:drop-shadow(0 0 5px ${v.g})"><path d="${BL[v.b]}" fill="${v.f}" stroke="${v.e}" stroke-width="1.5"/><path d="M107.5 10V92" stroke="${v.e}" stroke-width="1" opacity=".6"/>${v.fx()}</g><circle cx="107.5" cy="97" r="3" fill="${v.g}" stroke="#0006"/>`};
const AV={
mo:b=>b?`<circle class="pl" cx="61" cy="88" r="64" fill="#cfd8ff"/>`:`<path d="M60 68a12 12 0 1 0 9 20a9 9 0 1 1-9-20z" fill="#eef"/>`+ST(82,66,"#fff",0)+ST(40,100,"#fff",.6),
wp:b=>b?"":`<ellipse cx="34" cy="64" rx="13" ry="9" fill="#6bbf6b" stroke="#0004"/><ellipse cx="88" cy="64" rx="13" ry="9" fill="#6bbf6b" stroke="#0004"/><polygon points="26,60 34,46 40,60" fill="#8fe08f"/><polygon points="82,60 88,46 96,60" fill="#8fe08f"/>`,
wm:b=>b?`<path class="wv" d="M40 62Q10 90 18 140L48 118Z" fill="#9de0c4" opacity=".9"/>`:`<path class="tw" d="M4 70h22M0 90h26M6 110h20" stroke="#d6fff0" stroke-width="2" stroke-linecap="round"/>`,
rm:b=>b?`<path class="wv" d="M40 62Q12 92 20 138L48 118Z" fill="#6b4a2b"/>`:`<path d="M44 58Q61 44 78 58L72 68H50Z" fill="#6b4a2b"/>`,
sp:b=>b?`<circle class="pl" cx="61" cy="88" r="60" fill="#6c3fa0"/>`:SMOKE("#6c3fa0").replace(/cx="(\d+)" cy="(\d+)"/g,(m,x,y)=>`cx="${x-60}" cy="${+y+60}"`),
ds:b=>b?`<path d="M38 66L0 34L12 68L2 88L38 92Z" fill="#8a2a00"/><path d="M84 66L116 40L108 70L116 88L84 92Z" fill="#8a2a00"/>`:[0,1,2].map(r=>[0,1,2,3].map(c=>`<path d="M${42+c*11+(r%2)*5} ${68+r*12}q5 8 10 0" fill="none" stroke="#ffb74d" stroke-width="2"/>`).join("")).join("")+fm(34,64,.8,"#ff6d00",0)+fm(88,64,.8,"#ff6d00",.2),
fr:b=>b?`<circle class="pl" cx="61" cy="88" r="60" fill="#7fd6ff"/>`:`<polygon points="22,66 30,44 42,64" fill="#e8fbff" stroke="#7fd6ff"/><polygon points="80,64 92,44 100,66" fill="#e8fbff" stroke="#7fd6ff"/>`+ST(20,40,"#fff",0)+ST(100,38,"#fff",.5),
lm:b=>b?`<path d="M38 100L28 144L94 144L84 100Z" fill="#5b2c6f" opacity=".95"/>`:[[34,116,0],[88,116,.5],[61,128,1]].map(p=>`<ellipse class="fl2" style="animation-delay:${p[2]}s" cx="${p[0]}" cy="${p[1]}" rx="5" ry="8" fill="#7dffb0" opacity=".7"/>`).join(""),
ar:(b,fe)=>b?`<circle class="pl" cx="61" cy="88" r="62" fill="#ff1a00"/>`:`<path d="M46 30Q36 14 40 4Q50 16 52 28Z" fill="#2b0a0a" stroke="#ff3b00"/><path d="M76 30Q86 14 82 4Q72 16 70 28Z" fill="#2b0a0a" stroke="#ff3b00"/>${fe?`<circle cx="57" cy="43" r="2" fill="#ff2a00"/><circle cx="65" cy="43" r="2" fill="#ff2a00"/>`:`<rect x="52" y="39" width="20" height="5" rx="2" fill="#ff2a00"/>`}<ellipse cx="34" cy="64" rx="12" ry="9" fill="#2b0a0a" stroke="#ff3b00"/><ellipse cx="88" cy="64" rx="12" ry="9" fill="#2b0a0a" stroke="#ff3b00"/>`,
t2:b=>b?"":`<ellipse cx="32" cy="64" rx="16" ry="11" fill="#b0b8c0" stroke="#0004"/><ellipse cx="90" cy="64" rx="16" ry="11" fill="#b0b8c0" stroke="#0004"/><rect x="46" y="68" width="30" height="34" fill="#dfe5ea" opacity=".5"/>`,
b7a:b=>b?`<circle class="pl" cx="61" cy="88" r="60" fill="#7fb2ff"/>`:`<ellipse cx="33" cy="64" rx="15" ry="10" fill="#5d7fa3" stroke="#0004"/><ellipse cx="89" cy="64" rx="15" ry="10" fill="#5d7fa3" stroke="#0004"/>`+BOLT.replace(/M(\d+) 92/g,(m,x)=>`M${x-70} 70`),
b8a:b=>b?`<path class="wv" d="M40 62Q8 96 16 146L50 118Z" fill="#6a1b9a" opacity=".9"/><circle class="pl" cx="61" cy="88" r="58" fill="#ab47bc"/>`:SMOKE("#ab47bc").replace(/cx="(\d+)" cy="(\d+)"/g,(m,x,y)=>`cx="${x-60}" cy="${+y+50}"`),
b9a:b=>b?`<circle class="pl" cx="61" cy="88" r="60" fill="#1abc9c"/>`:`<path d="M24 60q6-14 14-4q-2-12 8-8" stroke="#ff8a80" stroke-width="3" fill="none"/><path d="M98 60q-6-14-14-4q2-12-8-8" stroke="#ff8a80" stroke-width="3" fill="none"/>`,
b10a:b=>b?`<path class="wv" d="M40 62Q6 92 14 146L50 118Z" fill="#ff8f00"/>${fm(24,140,1.1,"#ff6f00",0)}${fm(36,146,.9,"#ffd54f",.2)}`:fm(34,62,.9,"#ffb300",0)+fm(88,62,.9,"#ffb300",.15),
b11a:b=>b?`<circle class="pl" cx="61" cy="88" r="64" fill="#1a1a2e"/>`:ST(30,60,"#9fa8ff",0)+ST(92,60,"#9fa8ff",.4)+ST(61,100,"#fff",.8),
b12a:b=>b?`<circle class="pl" cx="61" cy="88" r="64" fill="#e1bee7"/>`:`<ellipse class="pl" cx="61" cy="18" rx="19" ry="5" fill="none" stroke="#fff" stroke-width="3"/><path d="M61 64l9 12-9 20-9-20z" fill="#ce93d8" stroke="#fff"/>`+ST(28,60,"#fff",0)+ST(94,60,"#fff",.5),
t4:b=>b?`<circle class="pl" cx="61" cy="88" r="60" fill="#ffd54a"/>`:`<ellipse class="pl" cx="61" cy="20" rx="17" ry="5" fill="none" stroke="#ffd54a" stroke-width="3"/><path d="M61 66l8 10-8 18-8-18z" fill="#ffd54a" stroke="#fff"/>`};
function knight(w,a,s,flip,plume,ow,oa,wi,ai,fem,robe){
 const arm=a>0||!!oa,wc=ow||WC[w],ac=oa||robe||AC[a],sk="#e0b48a",pl=plume||(a>=3||oa?"#c0221f":null),ln="#0005",
  tab=plume||"#7a1d1d",lc=arm?ac:"#5b4636",bt=arm?"#3d3833":"#3a2a1c",hc=fem?"#8a4b22":"#5a3a1e",
  sq=fem?`<g transform="translate(61 0) scale(.8 1) translate(-61 0)">`:"<g>",av=b=>ai&&AV[ai]?sq+AV[ai](b,fem)+"</g>":"",
  lw=fem?11:13,belt=fem?84:92;
 const leg=x=>`<path d="M${x} 104h${lw}l-1.5 38h${2-lw+1}z" fill="${lc}" stroke="${ln}"/>${arm?`<circle cx="${x+lw/2}" cy="122" r="${fem?4.2:5}" fill="${ac}" stroke="${ln}"/><path d="M${x+lw/2-3} 121h6" stroke="#fff5"/>`:""}${fem?`<path d="M${x-1} 141h${lw+2}l5 9h-${lw+6}z" fill="${bt}" stroke="#0004"/>`:`<path d="M${x-2} 141h16l7 9h-23z" fill="${bt}" stroke="#0004"/>`}`;
 const limb=(d,c)=>`<path d="${d}" stroke="#0005" stroke-width="${fem?10:12}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${c}" stroke-width="${fem?7.5:9}" fill="none" stroke-linecap="round"/>`;
 const body=fem
  ?(arm?`<path d="M45 86h32l11 32h-54z" fill="${ac}" stroke="${ln}"/><path d="M42 97h38M39 107h44" stroke="#0003"/><path d="M55 87h12l-1 40h-10z" fill="${tab}" stroke="#0004"/><path d="M56 92h10" stroke="#d4a017" stroke-width="1.5"/>
    <path d="M40 60Q61 54 82 60Q81 75 77 87Q61 91 45 87Q41 75 40 60Z" fill="${ac}" stroke="${ln}"/><path d="M46 70q7.5 8 15 0q7.5 8 15 0" stroke="#0003" fill="none" stroke-width="1.5"/><path d="M46 63Q51 60 56 60L54 69Q49 69 47 67Z" fill="#fff4"/>`
   :`<path d="M40 60Q61 54 82 60Q80 74 77 86Q90 110 92 126H30Q32 110 45 86Q42 74 40 60Z" fill="${ac}" stroke="#0004"/><path d="M53 59q8 8 16 0" stroke="#0003" fill="none" stroke-width="2"/><path d="M50 92l-6 32M61 90v36M72 92l6 32" stroke="#0002" stroke-width="1.5"/>`)
  :(arm?`<path d="M39 95h44l4 16h-52z" fill="${ac}" stroke="${ln}"/><path d="M37 103h48" stroke="#0003"/><path d="M51 96h20l-3 28h-14z" fill="${tab}" stroke="#0004"/><path d="M53 100h16" stroke="#d4a017" stroke-width="1.5"/>
    <path d="M38 60Q61 52 84 60L81 99Q61 106 41 99Z" fill="${ac}" stroke="${ln}"/><path d="M61 57V101" stroke="#0002" stroke-width="2"/><path d="M45 64Q50 60 56 60L54 92Q48 90 46 86Z" fill="#fff3"/>`
   :`<path d="M38 60Q61 54 84 60L87 114H35Z" fill="${ac}" stroke="#0004"/><path d="M54 60l7 10 7-10" stroke="#0003" fill="none" stroke-width="2"/>`);
 const shoulders=!arm?"":fem
  ?[41,81].map(x=>`<ellipse cx="${x}" cy="62" rx="8" ry="6" fill="${ac}" stroke="${ln}"/><path d="M${x-7} 64q7 4 14 0" stroke="#0003" fill="none"/><path d="M${x-4} 59q4-2 8 0" stroke="#fff6" fill="none"/>`).join("")
  :[37,85].map(x=>`<ellipse cx="${x}" cy="63" rx="12" ry="9" fill="${ac}" stroke="${ln}"/><path d="M${x-11} 66q11 6 22 0M${x-10} 69q10 5 20 0" stroke="#0003" fill="none"/><path d="M${x-6} 58q6-3 12 0" stroke="#fff5" fill="none"/>`).join("");
 const head=arm
  ?(fem?`<rect x="54" y="53" width="14" height="7" rx="3" fill="${ac}" stroke="${ln}"/><ellipse cx="61" cy="45" rx="10" ry="12" fill="${sk}"/>
    <path d="M52 37q4 4 9 1q5 3 9-1v3H52z" fill="${hc}"/><circle cx="57" cy="43" r="1.7" fill="#222"/><circle cx="65" cy="43" r="1.7" fill="#222"/><path d="M55.4 42.4l-2.2-1M66.6 42.4l2.2-1" stroke="#222" stroke-width="1.1" stroke-linecap="round"/><path d="M58.5 51q2.5 2 5 0" stroke="#c0392b" stroke-width="1.6" fill="none"/>
    <path fill-rule="evenodd" d="M44 52Q43 24 61 24Q79 24 78 52L75 59H47Z M52 37H70V51Q61 59 52 51Z" fill="${ac}" stroke="${ln}"/><rect x="60" y="33" width="2" height="10" rx="1" fill="${ac}" stroke="#0004"/><path d="M48 40Q48 30 56 27" stroke="#fff6" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
   :`<rect x="51" y="53" width="20" height="8" rx="3" fill="${ac}" stroke="${ln}"/>
    <path d="M44 48Q43 24 61 24Q79 24 78 48L77 55Q61 61 45 55Z" fill="${ac}" stroke="${ln}"/><path d="M61 25V38" stroke="#0003" stroke-width="2"/><path d="M48 42Q48 30 56 27" stroke="#fff6" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="50" y="39" width="22" height="5" rx="2" fill="#1b1b1b"/><path d="M66 48h6M66 51h5" stroke="#1b1b1b" stroke-width="1.2"/>`)
  :`<rect x="56" y="54" width="10" height="7" fill="${sk}"/>${fem?`<path d="M44 38Q37 64 43 80Q50 76 52 58Z" fill="${hc}" stroke="#0003"/><path d="M78 38Q85 64 79 80Q72 76 70 58Z" fill="${hc}" stroke="#0003"/>`:""}<circle cx="61" cy="42" r="17" fill="${sk}" stroke="#0004"/>
   <path d="M44 42Q42 22 61 24Q80 22 78 42Q72 30 61 30Q50 30 44 42z" fill="${hc}"/><circle cx="55" cy="40" r="2" fill="#222"/><circle cx="67" cy="40" r="2" fill="#222"/>
   ${fem?`<path d="M53 39.5l-2.5-1.5M53.3 41l-2.7-.4M69 39.5l2.5-1.5M68.7 41l2.7-.4" stroke="#222" stroke-width="1.1" stroke-linecap="round"/><path d="M52 35.5q3-1.5 6 0M64 35.5q3-1.5 6 0" stroke="${hc}" stroke-width="1.4" fill="none"/><path d="M57 49q4 3 8 0" stroke="#c0392b" stroke-width="2" fill="none"/>`
   :`<path d="M45 44Q46 58 61 60Q76 58 77 44Q72 52 61 52Q50 52 45 44Z" fill="${hc}"/><path d="M54.5 49q3.2-2.4 6.5-.6q3.3-1.8 6.5.6" stroke="${hc}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M58 51.5q3 1.6 6 0" stroke="#7a4a2a" stroke-width="1.3" fill="none"/>`}`;
 const plm=!pl?"":fem?`<path d="M60 26Q52 8 36 14Q48 16 50 32Z" fill="${pl}" stroke="#0003"/>`:`<path d="M61 25q-4-14 12-12q-8 4-4 12z" fill="${pl}"/>`;
 return `<svg class="k" viewBox="0 0 130 160" ${flip?'style="transform:scaleX(-1)"':''}>
 <ellipse cx="62" cy="152" rx="${fem?30:34}" ry="5" fill="#0003"/>${av(1)}
 ${leg(fem?46:44)}${leg(65)}<g class="br">
 ${limb(fem?"M41 64Q33 82 35 101":"M38 64Q29 82 33 101",ac)}<circle cx="${fem?35:33}" cy="103" r="${fem?4.8:5.5}" fill="${arm?ac:sk}" stroke="${ln}"/>
 ${body}
 <rect x="${fem?45:39}" y="${belt}" width="${fem?32:44}" height="${fem?5:6}" rx="2" fill="#5b3a1c"/><rect x="58" y="${belt-.5}" width="7" height="${fem?6:7}" rx="1.5" fill="#d4a017" stroke="#0004"/>
 ${shoulders}
 ${fem&&arm?`<path d="M47 32Q18 40 26 80Q30 92 40 84Q34 62 50 54Z" fill="${hc}" stroke="#0004"/>`:""}
 ${head}${plm}
 ${av(0)}
 ${limb(fem?"M82 66Q97 80 105 101":"M85 66Q98 80 105 101",ac)}${arm?`<circle cx="96" cy="82" r="${fem?3.8:4.5}" fill="${ac}" stroke="${ln}"/>`:""}
 ${wi&&VIS[wi]?weaponSvg(wi):`<path d="M104 96V20L107.5 8L111 20V96Z" fill="${wc}" stroke="#0005"/><path d="M107.5 14V94" stroke="#fff7"/>`}
 <path d="M96 94h23q2 3 0 6h-23q-2-3 0-6z" fill="#7a4a1c" stroke="#0004"/><rect x="105" y="100" width="5" height="12" fill="#5b3a1c"/><circle cx="107.5" cy="114" r="3" fill="#d4a017" stroke="#0005"/>
 <circle cx="107.5" cy="105.5" r="${fem?5.2:6}" fill="${arm?ac:sk}" stroke="#0006"/><path d="M102.5 103.5h10M102.5 107h10" stroke="#0003"/>
 ${s>0?`<path d="M12 64h32v24q0 19-16 28q-16-9-16-28z" fill="${SC[s]}" stroke="#0006" stroke-width="2"/><path d="M16 68h24v20q0 15-12 22q-12-7-12-22z" fill="none" stroke="#fff4" stroke-width="1.5"/><path d="M28 70v40M16 84h24" stroke="#fff6" stroke-width="3"/><circle cx="28" cy="84" r="3.5" fill="#d4a017" stroke="#0004"/>`:""}
 </g></svg>`}
// ---- Boss-Modelle ----
const KX=(k,back,front)=>k.replace('fill="#0003"/>','fill="#0003"/>'+back).replace(/<\/g><\/svg>$/,front+"</g></svg>");
const BSV=(inner,sh)=>`<svg class="k" viewBox="0 0 130 160" style="transform:scaleX(-1)"><ellipse cx="62" cy="152" rx="${sh||40}" ry="6" fill="#0003"/>${inner}</svg>`;
const limbB=(d,c,w)=>`<path d="${d}" stroke="#0005" stroke-width="${w+3}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
const BOSSV=[
// 1 Räuberhauptmann Graukopf
()=>BSV(`<path class="wv" d="M40 60Q18 100 24 148L52 128Z" fill="#2f5d32" stroke="#0004"/>
 <rect x="45" y="104" width="14" height="30" rx="3" fill="#5b4636"/><rect x="64" y="104" width="14" height="30" rx="3" fill="#5b4636"/>
 <path d="M43 130h18v20h-22zM62 130h18l5 20h-23z" fill="#1f1a17" stroke="#0005"/>
 <g class="br">${limbB("M40 64Q30 84 34 102","#6b4a2b",9)}<circle cx="34" cy="104" r="5.5" fill="#e0b48a" stroke="#0005"/>
 <path d="M38 60Q61 52 84 60L82 106H40Z" fill="#6b4a2b" stroke="#0005"/><path d="M53 59l8 16 8-16" fill="#e8dcc0"/><path d="M40 64L82 100" stroke="#3a2a1c" stroke-width="5"/>
 <circle cx="50" cy="73" r="1.6" fill="#d4a017"/><circle cx="58" cy="80" r="1.6" fill="#d4a017"/><circle cx="66" cy="87" r="1.6" fill="#d4a017"/>
 <rect x="39" y="94" width="44" height="6" rx="2" fill="#3a2a1c"/><circle cx="61" cy="97" r="4" fill="#e8e2d0" stroke="#0005"/><circle cx="59.5" cy="96" r=".9"/><circle cx="62.5" cy="96" r=".9"/>
 <rect x="56" y="54" width="10" height="7" fill="#e0b48a"/><circle cx="61" cy="42" r="16" fill="#e0b48a" stroke="#0004"/>
 <path d="M46 44Q46 66 61 68Q76 66 76 44Q70 54 61 54Q52 54 46 44Z" fill="#9e9e9e" stroke="#0003"/><path d="M54 50q7-4 14 0" stroke="#bdbdbd" stroke-width="3" fill="none" stroke-linecap="round"/>
 <path d="M44 38Q46 22 61 22Q78 22 78 38Z" fill="#b71c1c" stroke="#0004"/><path d="M45 33l-12 5 9 4zM45 35l-10 10 9-2z" fill="#b71c1c" stroke="#0004"/>
 <path d="M44 38L78 44" stroke="#111" stroke-width="1.5"/><rect x="52" y="37" width="9" height="7" rx="2" fill="#111"/><circle cx="68" cy="41" r="2" fill="#222"/><path d="M64 36l7-2" stroke="#555" stroke-width="1.6"/>
 ${limbB("M84 64Q98 80 105 101","#6b4a2b",9)}
 <path d="M104 98Q94 62 116 22Q112 62 112 98Z" fill="#cfd8dc" stroke="#0006"/><path d="M106 92Q100 62 113 30" stroke="#fff8" fill="none"/>
 <path d="M97 95h21v5h-21z" fill="#d4a017" stroke="#0004"/><circle cx="107.5" cy="105" r="6" fill="#e0b48a" stroke="#0006"/></g>`),
// 2 Der Schwarze Ritter
()=>KX(knight(4,4,3,true,"#8b0000","#4a4a4a","#1c1c1c"),
 `<path class="wv" d="M40 60Q14 100 20 150l6-8 6 8 6-8 6 8 6-10L52 122Z" fill="#2b0000" stroke="#0006"/>`,
 `<path d="M24 60l6-14 6 12zM86 58l6-12 6 14z" fill="#2a2a2a" stroke="#000"/><rect class="glow" x="50" y="39" width="22" height="5" rx="2" fill="#ff1a1a" style="filter:drop-shadow(0 0 3px #f00)"/>`),
// 3 Drachenlord Vulkanus
()=>BSV(`<path class="flap" d="M58 62Q36 20 14 6Q20 22 10 30Q22 34 6 50Q24 50 14 70Q34 62 50 76Z" fill="#7a1f0a" stroke="#3b0d03" stroke-width="1.5"/><path d="M56 64L14 6M54 68L8 30M52 72L6 50" stroke="#3b0d03" stroke-width="1.5" fill="none"/>
 <path class="sway" d="M44 116Q16 128 10 108Q8 94 20 96Q16 108 28 112Q40 114 48 104Z" fill="#b23c17" stroke="#0004"/><path d="M10 108l-8-6 10 0z" fill="#7a1f0a"/>
 <g class="br"><path d="M44 106Q32 124 38 146h18l2-26Z" fill="#a8371a" stroke="#0005"/><path d="M72 110Q86 128 80 146H64l-2-26Z" fill="#a8371a" stroke="#0005"/>
 <path d="M36 146l3 6 4-6 4 6 4-6M62 146l3 6 4-6 4 6 4-6" stroke="#f5f5dc" stroke-width="2" fill="none"/>
 <path d="M44 66Q60 52 80 66Q92 92 80 118Q62 128 46 118Q34 92 44 66Z" fill="#c0451c" stroke="#0005"/>
 <path d="M52 70Q62 64 72 70L70 114Q62 118 54 114Z" fill="#f2b36b"/><path d="M53 80h18M53 90h18M54 100h16M55 110h14" stroke="#c97a3a"/>
 <path d="M48 64l-4-8 8 4zM42 76l-8-4 8-2z" fill="#7a1f0a"/>
 <path d="M70 70Q76 50 84 36" stroke="#c0451c" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M74 66Q78 50 86 38" stroke="#f2b36b" stroke-width="5" fill="none"/>
 <path d="M76 24Q96 14 116 26Q120 32 114 36L98 40Q84 46 76 36Z" fill="#c0451c" stroke="#0005"/><path d="M98 38l2 4 3-4 3 4 3-4" stroke="#fff" stroke-width="1.5" fill="none"/>
 <path d="M80 24L72 4L86 18ZM88 21L92 2L96 18Z" fill="#3b0d03"/><ellipse class="glow" cx="94" cy="27" rx="3.5" ry="2.5" fill="#ffd600"/><path d="M94 25v4" stroke="#000" stroke-width="1.2"/>
 <circle cx="112" cy="29" r="1.3" fill="#3b0d03"/>${fm(118,34,.7,"#ff6d00",0)}${fm(122,30,.5,"#ffd000",.2)}
 <circle class="fl2" cx="120" cy="24" r="2" fill="#ff9100"/><circle class="fl2" style="animation-delay:.8s" cx="124" cy="30" r="1.5" fill="#ffd000"/>
 ${limbB("M72 78Q86 86 90 98","#c0451c",8)}<path d="M88 98l2 6 3-6 3 5" stroke="#f5f5dc" stroke-width="2" fill="none"/></g>`,44),
// 4 Eiskönigin Frostara
()=>KX(knight(4,4,0,true,"transparent","#e8fbff","#bfe9ff","fz","fr",true),
 `<path class="wv" d="M42 60Q12 100 18 152L58 132Z" fill="#bfe9ff" opacity=".85" stroke="#7fd6ff"/>${ST(16,120,"#fff",0)}${ST(30,140,"#fff",.6)}`,
 `<path d="M48 27l3-15 4 10 6-17 6 17 4-10 3 15z" fill="#e8fbff" stroke="#7fd6ff" stroke-width="1.5"/><circle class="glow" cx="61" cy="16" r="2.2" fill="#7fd6ff"/>${ST(40,30,"#fff",.3)}${ST(84,28,"#fff",.9)}`),
// 5 Lich Mortrax
()=>BSV(`<g class="hov"><circle class="pl" cx="61" cy="80" r="56" fill="#7dffb0"/>
 <path d="M40 58Q61 50 82 58L92 142L84 134L76 144L68 134L60 144L52 134L44 144L36 134Z" fill="#3c1f52" stroke="#0006"/><path d="M61 60V140" stroke="#0003" stroke-width="2"/><path d="M48 70h26" stroke="#d4a017" stroke-width="2"/>
 ${limbB("M42 64Q30 82 34 100","#3c1f52",9)}<path d="M34 100l-3 7M34 100l0 8M34 100l3 7" stroke="#e8e2d0" stroke-width="1.8"/>
 <path d="M42 54Q40 16 61 16Q82 16 80 54L74 60H48Z" fill="#2a1438" stroke="#0006"/>
 <path d="M50 34Q50 22 61 22Q72 22 72 34Q72 42 68 46V51H54V46Q50 42 50 34Z" fill="#e8e2d0" stroke="#0005"/>
 <ellipse cx="56" cy="35" rx="3.4" ry="4" fill="#111"/><ellipse cx="66" cy="35" rx="3.4" ry="4" fill="#111"/><circle class="glow" cx="56" cy="35.5" r="1.7" fill="#7dffb0"/><circle class="glow" cx="66" cy="35.5" r="1.7" fill="#7dffb0"/>
 <path d="M61 39l-2 4h4z" fill="#111"/><path d="M55 47h12M58 45v4M61 45v4M64 45v4" stroke="#111" stroke-width="1"/>
 <path d="M48 22l4-9 4 6 5-10 5 10 4-6 4 9z" fill="#d4a017" stroke="#0005"/>
 ${limbB("M80 64Q96 78 104 96","#3c1f52",9)}<path d="M108 150V20" stroke="#4e342e" stroke-width="4"/><path d="M101 94h14" stroke="#e8e2d0" stroke-width="3"/>
 <circle class="pl" cx="108" cy="14" r="14" fill="#7dffb0"/><circle cx="108" cy="14" r="6" fill="#b9ffd0" stroke="#2e7d32"/>
 <path d="M101 16q7-12 14 0" stroke="#e8e2d0" stroke-width="2" fill="none"/>
 ${[[30,60,0],[92,110,.7],[40,120,1.3]].map(p=>`<ellipse class="fl2" style="animation-delay:${p[2]}s" cx="${p[0]}" cy="${p[1]}" rx="4" ry="7" fill="#7dffb0" opacity=".6"/>`).join("")}</g>`,28),
// 6 Dämonenfürst Azgaroth
()=>KX(knight(4,4,0,true,"#ff3b00","#2b0a0a","#4a0f0f","az","ar"),
 `<path class="flap" d="M46 64Q12 30 4 6Q18 22 20 40Q6 40 2 58Q20 52 26 64Q12 70 12 86Q30 72 46 76Z" fill="#3b0a0a" stroke="#ff3b00" stroke-width="1.2"/>
 <path class="flap r" d="M78 64Q112 30 122 6Q108 22 106 40Q120 40 126 58Q106 52 100 64Q114 70 114 86Q96 72 78 76Z" fill="#3b0a0a" stroke="#ff3b00" stroke-width="1.2"/>
 <path class="sway" d="M54 118Q36 140 14 136Q24 142 12 150" stroke="#4a0f0f" stroke-width="4" fill="none"/>${fm(40,152,.9,"#ff3b00",0)}${fm(84,152,.9,"#ff6d00",.2)}${fm(62,154,.7,"#ffb300",.1)}`,
 `<circle class="glow" cx="57" cy="41.5" r="1.8" fill="#ffea00"/><circle class="glow" cx="65" cy="41.5" r="1.8" fill="#ffea00"/>`),
// 7 Sturmriese Donnerfaust
()=>BSV(`<g opacity=".9"><ellipse cx="34" cy="14" rx="20" ry="9" fill="#78909c"/><ellipse cx="52" cy="10" rx="16" ry="9" fill="#90a4ae"/><ellipse cx="20" cy="18" rx="12" ry="7" fill="#607d8b"/></g>
 <path class="tw" d="M36 20l-6 12h6l-5 12" stroke="#fff27a" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
 <rect x="40" y="108" width="18" height="34" rx="5" fill="#7b93b4" stroke="#0005"/><rect x="66" y="108" width="18" height="34" rx="5" fill="#7b93b4" stroke="#0005"/>
 <path d="M36 136h26l3 14H34zM62 136h26l4 14H60z" fill="#6d4c41" stroke="#0005"/>
 <g class="br">${limbB("M34 62Q20 84 26 104","#8fa8c8",14)}<circle cx="26" cy="106" r="8" fill="#8fa8c8" stroke="#0005"/><path class="tw" d="M18 112l-4 8 5-1-3 8" stroke="#fff27a" stroke-width="2" fill="none"/>
 <path d="M30 58Q61 44 92 58L88 110H34Z" fill="#8fa8c8" stroke="#0005"/><path d="M61 60V100M48 76q6 3 12 0M62 76q6 3 12 0M50 88q5 2 10 0M62 88q5 2 10 0" stroke="#6a83a5" stroke-width="2" fill="none"/>
 <path d="M26 58Q34 46 48 52L44 70Q32 70 26 58Z" fill="#6d4c41" stroke="#0005"/><path d="M28 60l4-4M34 58l3-5M40 58l2-5" stroke="#4e342e"/>
 <path d="M34 104h54l-6 18H40z" fill="#6d4c41" stroke="#0005"/><rect x="33" y="100" width="56" height="7" rx="2" fill="#3e2723"/><circle cx="61" cy="103.5" r="4.5" fill="#d4a017" stroke="#0005"/>
 <circle cx="61" cy="36" r="14" fill="#8fa8c8" stroke="#0004"/>
 <path d="M46 38Q44 68 61 72Q78 68 76 38Q70 50 61 50Q52 50 46 38Z" fill="#eceff1" stroke="#0003"/><path d="M47 30L42 16l9 8 3-12 6 10 4-12 4 12 6-10 2 12 8-8-4 14z" fill="#eceff1" stroke="#0003"/>
 <path d="M52 33l6 2M70 33l-6 2" stroke="#37474f" stroke-width="2"/><circle class="glow" cx="56" cy="37" r="2" fill="#fff27a"/><circle class="glow" cx="66" cy="37" r="2" fill="#fff27a"/>
 ${limbB("M88 62Q100 80 106 100","#8fa8c8",14)}
 <rect x="104" y="22" width="7" height="92" rx="2" fill="#5d4037" stroke="#0005"/><rect x="90" y="10" width="34" height="22" rx="3" fill="#78909c" stroke="#0006"/><path d="M92 14h30M92 28h30" stroke="#b0bec5"/>
 <path class="tw" d="M104 14l-4 8h5l-4 8" stroke="#fff27a" stroke-width="2.2" fill="none"/><circle cx="107.5" cy="103" r="8" fill="#8fa8c8" stroke="#0006"/></g>`,46),
// 8 Hexenkönigin Morgana
()=>KX(knight(0,0,0,true,null,"#ab47bc",null,"b8w","b8a",true,"#4a148c"),"",
 `<path d="M36 31Q61 22 86 31L88 35Q61 28 34 35Z" fill="#1a0a2e" stroke="#0006"/><path d="M47 31Q56 18 62 2Q66 12 64 14Q74 20 76 31Z" fill="#1a0a2e" stroke="#0006"/><path d="M47 29Q61 25 76 29" stroke="#76ff03" stroke-width="2.5" fill="none"/>
 <circle class="glow" cx="55" cy="40" r="2.3" fill="#76ff03"/><circle class="glow" cx="67" cy="40" r="2.3" fill="#76ff03"/>`),
// 9 Krakenfürst Abyssor
()=>BSV(`${[[30,"M36 96Q20 120 26 140Q30 150 22 156"],[46,"M46 100Q38 126 46 144Q50 152 44 158"],[60,"M60 102Q60 128 54 146Q52 154 58 158"],[74,"M74 100Q82 126 76 144Q74 152 82 156"],[88,"M86 96Q104 118 98 138Q96 148 104 152"]].map((t,i)=>`<path class="sway" style="animation-delay:${i*.3}s" d="${t[1]}" stroke="#0e6655" stroke-width="11" fill="none" stroke-linecap="round"/>`).join("")}
 <g class="br"><path d="M28 72Q24 14 62 10Q100 14 96 72Q92 100 62 102Q32 100 28 72Z" fill="#117a65" stroke="#0005"/>
 ${[[42,30,5],[78,26,4],[50,18,3],[86,48,4],[36,54,3]].map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="#1abc9c" opacity=".7"/>`).join("")}
 <path d="M44 14l-4-10 8 6 2-10 5 9 4-9 3 10 6-8-1 12z" fill="#ff8a80" stroke="#c62828"/>
 <ellipse cx="52" cy="62" rx="9" ry="10" fill="#ffeb3b" stroke="#0005"/><ellipse cx="78" cy="62" rx="9" ry="10" fill="#ffeb3b" stroke="#0005"/><rect x="51" y="54" width="3" height="16" rx="1.5"/><rect x="77" y="54" width="3" height="16" rx="1.5"/>
 <path d="M44 52l14 4M86 52l-14 4" stroke="#0b5345" stroke-width="3"/><path d="M56 84q8 6 16 0" stroke="#0b5345" stroke-width="3" fill="none"/>
 <path d="M96 76Q108 86 106 100" stroke="#0e6655" stroke-width="10" fill="none" stroke-linecap="round"/>
 <path d="M106 152V22" stroke="#d4a017" stroke-width="4"/><path d="M96 34V14M106 26V6M116 34V14M96 30h20" stroke="#d4a017" stroke-width="3.5" fill="none"/><path d="M93 16l3-6 3 6M103 8l3-6 3 6M113 16l3-6 3 6" fill="#d4a017"/></g>
 ${[[20,40,0],[100,60,.7],[16,90,1.4]].map(b=>`<circle class="fl2" style="animation-delay:${b[2]}s" cx="${b[0]}" cy="${b[1]}" r="3" fill="none" stroke="#b2ebf2"/>`).join("")}`,46),
// 10 Phönixkaiser Ignarion
()=>BSV(`<g class="hov"><circle class="pl" cx="62" cy="76" r="58" fill="#ffb300"/>
 <path class="flap" d="M54 72Q22 50 4 14Q24 28 30 22Q30 40 46 44Q36 52 56 60Z" fill="#ff6f00" stroke="#e65100"/>${fm(10,24,.8,"#ffd54f",0)}${fm(22,34,.8,"#ff9100",.15)}${fm(34,44,.7,"#ffd54f",.3)}
 <path class="flap r" d="M70 72Q102 50 122 14Q102 28 96 22Q96 40 80 44Q90 52 70 60Z" fill="#ff6f00" stroke="#e65100"/>${fm(116,24,.8,"#ffd54f",.1)}${fm(104,34,.8,"#ff9100",.25)}${fm(92,44,.7,"#ffd54f",.4)}
 <path class="wv" d="M54 110Q38 136 26 150Q46 142 58 122Q56 140 50 154Q64 140 64 122Q70 142 78 152Q74 132 70 112Z" fill="#ff6f00" stroke="#e65100"/>
 <path d="M48 72Q60 40 76 72Q82 100 62 118Q42 100 48 72Z" fill="#ff8f00" stroke="#e65100"/><path d="M56 78Q62 60 70 78Q72 98 62 108Q52 98 56 78Z" fill="#ffd54f"/>
 <path d="M56 116l-3 10M56 126l-4 3M56 126l1 4M68 116l3 10M71 126l4 3M71 126l-1 4" stroke="#5d4037" stroke-width="2"/>
 <circle cx="66" cy="44" r="11" fill="#ffb300" stroke="#e65100"/><path d="M76 41l14 4-14 5z" fill="#ffe082" stroke="#e65100"/><circle cx="70" cy="42" r="2" fill="#3e2723"/><circle cx="70.6" cy="41.4" r=".6" fill="#fff"/>
 ${fm(58,36,.9,"#ff6f00",0)}${fm(64,33,1.1,"#ffd54f",.1)}${fm(70,35,.9,"#ff9100",.2)}
 <path d="M54 22l3-7 4 5 5-8 5 8 4-5 3 7z" fill="#ffd700" stroke="#b8860b"/>
 ${[[40,30,0],[90,90,.6],[30,100,1.2],[96,30,.9]].map(e=>`<circle class="fl2" style="animation-delay:${e[2]}s" cx="${e[0]}" cy="${e[1]}" r="2" fill="#ffd54f"/>`).join("")}</g>`,30),
// 11 Schattenkaiser Nyx
()=>KX(knight(4,4,3,true,"#5c6bc0","#3d3d6b","#1a1a2e","b11w","b11a"),
 `${[[22,70,0],[100,60,.5],[18,120,1],[104,124,1.5]].map(p=>`<ellipse class="fl2" style="animation-delay:${p[2]}s" cx="${p[0]}" cy="${p[1]}" rx="8" ry="12" fill="#3d3d6b" opacity=".6"/>`).join("")}<path class="wv" d="M40 60Q14 100 20 152L56 132Z" fill="#0d0d1a" stroke="#5c6bc0"/>`,
 `<path d="M46 27l3-13 5 8 7-13 7 13 5-8 3 13z" fill="#9fa8ff" stroke="#3949ab"/><circle class="glow" cx="61" cy="17" r="2" fill="#e8eaf6"/><rect class="glow" x="50" y="39" width="22" height="5" rx="2" fill="#b388ff" style="filter:drop-shadow(0 0 3px #b388ff)"/>`),
// 12 Der Weltenfresser
()=>BSV(`<circle class="pl" cx="64" cy="80" r="64" fill="#7c4dff"/>
 <g class="rot"><circle cx="64" cy="78" r="62" fill="none" stroke="#ce93d8" stroke-width="1.5" stroke-dasharray="4 8"/></g>
 <path class="sway" d="M18 110Q0 90 8 64" stroke="#2a0a4a" stroke-width="9" fill="none" stroke-linecap="round"/><path class="sway" style="animation-delay:.8s" d="M110 110Q128 90 120 64" stroke="#2a0a4a" stroke-width="9" fill="none" stroke-linecap="round"/>
 <g class="br"><path d="M14 152Q6 84 30 48Q62 14 98 42Q124 72 116 152Z" fill="#2a0a4a" stroke="#ce93d8" stroke-width="1.5"/>
 <path d="M32 50Q22 30 30 10Q34 30 42 40ZM96 42Q108 24 104 4Q96 24 88 34ZM62 28Q60 10 66 0Q70 14 70 28Z" fill="#4a148c" stroke="#ce93d8"/>
 ${[[30,80],[96,90],[40,130],[88,130],[24,110],[104,118],[70,140]].map((p,i)=>ST(p[0],p[1],i%2?"#fff":"#e1bee7",i*.3)).join("")}
 <ellipse cx="66" cy="62" rx="20" ry="13" fill="#fff" stroke="#000"/><circle class="glow" cx="68" cy="62" r="9" fill="#e040fb"/><ellipse cx="68" cy="62" rx="2.5" ry="8" fill="#000"/>
 <path d="M46 58Q66 40 86 58" stroke="#000" stroke-width="3" fill="none"/>
 <path d="M32 92Q67 140 102 92Q67 108 32 92Z" fill="#4a0010" stroke="#000"/>
 ${[.14,.24,.34,.44,.56,.66,.76,.86].map(t=>{const x=32+70*t,yt=92+32*t*(1-t),yb=92+96*t*(1-t);return `<path d="M${x-3} ${yt}L${x} ${yt+6}L${x+3} ${yt}Z" fill="#f5f5dc"/><path d="M${x-3} ${yb}L${x} ${yb-5}L${x+3} ${yb}Z" fill="#f5f5dc"/>`}).join("")}</g>`,52)];
const bossSvg=i=>BOSSV[i]?BOSSV[i]():knight(4,4,3,true,BOSS[i].tint);
const ttier=n=>Math.min(TIER.length-1,Math.floor((n-1)/5));
const towerIntro=n=>{const t=ttier(n),T=TIER[t];return `🗼 <b>Etage ${n} – ${T[0]}</b><br>`+((n-1)%5===0&&n>1?`<i>Die Luft wird schwerer … ${T[1]}</i><br>`:"")};
const SV=(defs,body)=>`<svg class="bg" viewBox="0 0 600 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs>${defs}</defs>${body}</svg>`;
const LG=(id,a,b)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const RG=(id,c)=>`<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity=".7"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
const bricks=(c,top)=>{let o="";for(let y=top||0,r=0;y<190;y+=18,r++)o+=`<path d="M0 ${y}H600" stroke="${c}"/>`+Array.from({length:14},(_,i)=>`<path d="M${i*46+(r%2)*23} ${y}v18" stroke="${c}"/>`).join("");return `<g stroke-width="1.2">${o}</g>`};
const torch=(x,y,g,a,b)=>`<circle class="pl" cx="${x}" cy="${y-10}" r="60" fill="url(#${g})"/><path d="M${x-6} ${y}h12l-3 14h-6z" fill="#3a2a1c"/><rect x="${x-8}" y="${y-3}" width="16" height="5" rx="2" fill="#5b3a1c"/>${fm(x,y-2,1,a,0)}${fm(x,y-2,.6,b,.1)}`;
const floor=(c,line)=>`<path d="M0 188H600V220H0Z" fill="${c}"/><path d="M0 188H600" stroke="#0006" stroke-width="2"/><g stroke="${line}" stroke-width="1.2">${[60,150,250,340,430,520].map((x,i)=>`<path d="M${x} 188l${i%2?-12:12} 32"/>`).join("")}<path d="M0 203H600"/></g>`;
const TBGS=[
// 0 Eingangshalle
()=>SV(LG("t0","#1e1612","#4a3a30")+RG("t0g","#ffb74d"),`<rect width="600" height="220" fill="url(#t0)"/>${bricks("#00000030",8)}
 ${[200,400].map(x=>`<path d="M${x-26} 120V70Q${x} 38 ${x+26} 70V120Z" fill="#22344f" stroke="#2a1f19" stroke-width="5"/><path d="M${x} 46V120M${x-26} 90H${x+26}" stroke="#2a1f19" stroke-width="3"/>${ST(x-10,64,"#fff",0)}`).join("")}
 ${[110,300,490].map((x,i)=>`<path class="wv" style="animation-delay:${i*.4}s" d="M${x-18} 22h36v70l-18-12-18 12z" fill="#8b1e1e" stroke="#0005"/><circle cx="${x}" cy="48" r="8" fill="#d4a017"/><path d="M${x-22} 22h44" stroke="#5b3a1c" stroke-width="4"/>`).join("")}
 ${torch(40,120,"t0g","#ff6d00","#ffd54f")}${torch(300,128,"t0g","#ff6d00","#ffd54f")}${torch(560,120,"t0g","#ff6d00","#ffd54f")}
 ${floor("#5a4636","#0003")}`),
// 1 Verliese
()=>SV(LG("t1","#0e1012","#2b2f33")+RG("t1g","#ffa726"),`<rect width="600" height="220" fill="url(#t1)"/>${bricks("#00000040",4)}
 ${[[70,40],[230,150],[420,60],[540,140],[150,90]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="18" ry="7" fill="#33691e" opacity=".5"/>`).join("")}
 <path d="M282 30h36v28h-36z" fill="#3a5a80"/><path d="M291 30v28M300 30v28M309 30v28" stroke="#111" stroke-width="3"/><path d="M282 58L230 188H372L318 58Z" fill="#9fc3ff" opacity=".09"/>
 ${[120,470].map((x,i)=>`<g class="sway" style="animation-delay:${i*.6}s"><path d="M${x} 0v96" stroke="#555" stroke-width="3" stroke-dasharray="6 3"/><circle cx="${x}" cy="102" r="7" fill="none" stroke="#666" stroke-width="3"/></g>`).join("")}
 ${[[180,0],[360,.6],[520,1.1]].map(d=>`<path class="dr" style="animation-delay:${d[1]}s" d="M${d[0]} 6q-3 5 0 7q3-2 0-7z" fill="#7fb2d6"/>`).join("")}
 ${torch(560,118,"t1g","#e65100","#ffb74d")}
 ${floor("#2e3135","#0004")}<ellipse cx="200" cy="200" rx="40" ry="4" fill="#4a6a8a" opacity=".5"/>
 <g fill="#d7ccc8"><circle cx="440" cy="194" r="6"/><circle cx="437" cy="193" r="1.5" fill="#222"/><circle cx="443" cy="193" r="1.5" fill="#222"/><path d="M420 200l16-4M424 196l14 6" stroke="#d7ccc8" stroke-width="3"/></g>`),
// 2 Kristallhöhle
()=>SV(LG("t2","#05101c","#1b3a4b")+RG("t2g","#4dd0e1"),`<rect width="600" height="220" fill="url(#t2)"/>
 <path d="M0 0H600V30L570 70L550 34L520 60L490 26L450 80L420 30L380 54L340 22L300 66L260 28L220 58L180 24L140 72L100 30L60 56L30 26L0 50Z" fill="#081521"/>
 <path d="M0 220V120L40 140L70 100L110 150L0 190ZM600 220V110L560 140L530 96L490 150L600 190Z" fill="#0b1d2c"/>
 ${[[60,186,"#4dd0e1"],[150,190,"#b388ff"],[460,188,"#4dd0e1"],[540,186,"#80deea"],[300,40,"#b388ff"]].map((c,i)=>`<circle class="pl" style="animation-delay:${i*.3}s" cx="${c[0]}" cy="${c[1]-20}" r="50" fill="url(#t2g)"/><g fill="${c[2]}" stroke="#e0f7fa" stroke-width="1" opacity=".9"><polygon points="${c[0]-14},${c[1]} ${c[0]-8},${c[1]-38} ${c[0]-2},${c[1]}"/><polygon points="${c[0]-4},${c[1]} ${c[0]+4},${c[1]-54} ${c[0]+12},${c[1]}"/><polygon points="${c[0]+8},${c[1]} ${c[0]+16},${c[1]-30} ${c[0]+22},${c[1]}"/></g>`).join("")}
 ${[[100,60],[220,90],[380,70],[500,50],[260,130],[420,140]].map((p,i)=>ST(p[0],p[1],"#e0f7fa",i*.35)).join("")}
 ${floor("#1e3a4a","#4dd0e133")}`),
// 3 Lavahallen
()=>SV(LG("t3","#1a0402","#5a1a0a")+RG("t3g","#ff6d00"),`<rect width="600" height="220" fill="url(#t3)"/>
 <circle class="pl" cx="300" cy="220" r="260" fill="url(#t3g)"/>
 ${[50,190,410,550].map(x=>`<path d="M${x-22} 188V20h44V188Z" fill="#1c0f0d" stroke="#000"/><path d="M${x-26} 20h52v-10h-52z" fill="#2a1512"/><path class="tw" d="M${x-6} 60l6 20-4 18 8 24" stroke="#ff6d00" stroke-width="2" fill="none"/>`).join("")}
 ${[[120,0],[300,.5],[470,1],[260,1.6],[360,2.2]].map(e=>`<circle class="fl2" style="animation-delay:${e[1]}s" cx="${e[0]}" cy="180" r="2.5" fill="#ffab40"/>`).join("")}
 <path d="M0 188H600V220H0Z" fill="#140806"/><path d="M0 188H600" stroke="#000" stroke-width="2"/>
 <path class="tw" d="M30 200l40 4 30-8 50 10 40-6M330 196l40 8 50-6 40 8 60-4 40 6M210 214l30-6 40 4" stroke="#ff6d00" stroke-width="3" fill="none" style="filter:drop-shadow(0 0 4px #ff3d00)"/>
 ${fm(110,190,.9,"#ff3d00",0)}${fm(500,190,.9,"#ff6d00",.3)}`),
// 4 Geisterhallen
()=>SV(LG("t4","#0c0614","#2e1a3a")+RG("t4g","#69f0ae"),`<rect width="600" height="220" fill="url(#t4)"/>${bricks("#ffffff08",10)}
 ${[[80,120],[240,70],[380,100],[520,60]].map(p=>`<path d="M${p[0]-18} 188V${p[1]}l8-10 6 8 10-12 12 14V188Z" fill="#3b2f4a" stroke="#0006"/><path d="M${p[0]-14} 150h28" stroke="#0004"/>`).join("")}
 ${[[160,150],[460,150]].map((b,i)=>`<circle class="pl" cx="${b[0]}" cy="${b[1]-14}" r="50" fill="url(#t4g)"/><path d="M${b[0]-14} ${b[1]}h28l-6 14h-16z" fill="#4a4a5a"/>${fm(b[0],b[1],1,"#69f0ae",i*.2)}${fm(b[0],b[1],.6,"#e0ffe8",i*.2+.1)}`).join("")}
 ${[[60,80,0],[300,60,.8],[440,110,1.5],[560,90,2.1]].map(g=>`<g class="fl2" style="animation-delay:${g[2]}s;animation-duration:4s"><path d="M${g[0]-8} ${g[1]+12}q0-22 8-22t8 22l-4-3-4 3-4-3z" fill="#e8eaf6" opacity=".55"/><circle cx="${g[0]-3}" cy="${g[1]}" r="1.4" fill="#111"/><circle cx="${g[0]+3}" cy="${g[1]}" r="1.4" fill="#111"/></g>`).join("")}
 <rect class="pl" y="150" width="600" height="40" fill="#b39ddb" opacity=".25"/>
 ${floor("#241a2e","#ffffff10")}<path d="M200 188l14 14-6 10M420 188l-10 16 8 12" stroke="#000" stroke-width="2" fill="none"/>`),
// 5 Sturmspitze
()=>SV(LG("t5","#0d121a","#3a4656"),`<rect width="600" height="220" fill="url(#t5)"/>
 <path class="flick" d="M150 0l-20 50h18l-26 60" stroke="#e3f2fd" stroke-width="3" fill="none" style="filter:drop-shadow(0 0 6px #90caf9)"/>
 <path class="flick" style="animation-delay:2.2s" d="M450 0l16 40h-14l22 70" stroke="#e3f2fd" stroke-width="3" fill="none" style="filter:drop-shadow(0 0 6px #90caf9)"/>
 <rect class="flick" width="600" height="220" fill="#cfe8ff" opacity=".12"/>
 ${[[20,-10],[60,-40],[40,-70],[30,-25]].map((c,i)=>`<g class="cl" style="animation-delay:${c[1]}s;animation-duration:${30+i*8}s"><g fill="#252d38" opacity=".9"><ellipse cx="0" cy="${c[0]}" rx="60" ry="16"/><ellipse cx="-24" cy="${c[0]-10}" rx="30" ry="14"/><ellipse cx="22" cy="${c[0]-12}" rx="34" ry="16"/></g></g>`).join("")}
 <path d="M0 170L80 150L160 166L260 140L360 162L460 146L600 160V188H0Z" fill="#1a2028" opacity=".8"/>
 <g class="rain" stroke="#9fb6cc" stroke-width="1.2" opacity=".5">${Array.from({length:40},(_,i)=>`<path d="M${(i*37)%600} ${(i*53)%200-20}l-6 16"/>`).join("")}</g>
 <path d="M0 188H600V220H0Z" fill="#4a4f57"/><path d="M0 188H600" stroke="#0006" stroke-width="2"/>
 <path d="M0 176h30v-14h20v14h30v-14h20v14h20V200H0ZM600 176h-30v-14h-20v14h-30v-14h-20v14h-20V200H600Z" fill="#5d636b" stroke="#0005"/>`),
// 6 Schattenreich
()=>SV(LG("t6","#040308","#1a0f2a")+RG("t6g","#7c4dff"),`<rect width="600" height="220" fill="url(#t6)"/>
 ${[[60,40],[150,90],[420,30],[520,100],[280,60],[340,130],[90,140],[470,160]].map((e,i)=>`<g class="blink" style="animation-delay:${i*.5}s"><ellipse cx="${e[0]-5}" cy="${e[1]}" rx="3.5" ry="2" fill="#ff1744"/><ellipse cx="${e[0]+5}" cy="${e[1]}" rx="3.5" ry="2" fill="#ff1744"/></g>`).join("")}
 ${[[130,60,30],[460,70,24],[300,26,18]].map((r,i)=>`<g class="hov" style="animation-delay:${i*.7}s"><path d="M${r[0]-r[2]} ${r[1]}l${r[2]*.6} -12h${r[2]*.9}l${r[2]*.5} 12l-${r[2]*.8} ${r[2]*.9}z" fill="#1a1028" stroke="#7c4dff" stroke-width="1"/></g>`).join("")}
 <path class="sway" d="M0 120Q30 150 10 188" stroke="#0d0618" stroke-width="16" fill="none"/><path class="sway" style="animation-delay:1s" d="M600 110Q570 150 590 188" stroke="#0d0618" stroke-width="16" fill="none"/>
 <ellipse class="pl" cx="300" cy="196" rx="320" ry="30" fill="url(#t6g)"/>
 <path d="M0 188H600V220H0Z" fill="#0d0816"/><path d="M0 188H600" stroke="#7c4dff" stroke-width="2" style="filter:drop-shadow(0 0 4px #7c4dff)"/>`),
// 7 Weltenriss
()=>SV(LG("t7","#05000c","#2a0a4a")+RG("t7g","#e040fb"),`<rect width="600" height="220" fill="url(#t7)"/>
 ${Array.from({length:22},(_,i)=>`<circle class="tw" style="animation-delay:${(i*.29)%2}s" cx="${(i*83)%600}" cy="${(i*47)%170}" r="${i%4?1:1.8}" fill="#fff"/>`).join("")}
 <circle class="pl" cx="300" cy="80" r="120" fill="url(#t7g)"/>
 <g class="rot" style="transform-box:view-box;transform-origin:300px 80px">${[20,38,56,74].map((r,i)=>`<path d="M${300+r} 80A${r} ${r*.55} 0 1 1 ${300-r} 80" fill="none" stroke="${i%2?"#e040fb":"#7c4dff"}" stroke-width="${3-i*.5}" opacity="${.9-i*.15}"/>`).join("")}</g>
 <circle cx="300" cy="80" r="10" fill="#000" stroke="#fff" stroke-width="1.5"/>
 <path class="tw" d="M60 0l20 40-14 20 24 40M540 10l-18 36 16 24-20 44M200 0l10 24-8 16" stroke="#f3e5f5" stroke-width="2" fill="none" style="filter:drop-shadow(0 0 5px #e040fb)"/>
 ${[[110,120,10],[480,130,8],[400,40,6],[170,50,7]].map((d,i)=>`<g class="hov" style="animation-delay:${i*.5}s"><path d="M${d[0]} ${d[1]}l${d[2]} -${d[2]*.6}l${d[2]*.8} ${d[2]}l-${d[2]} ${d[2]*.7}z" fill="#2a0a4a" stroke="#ce93d8"/></g>`).join("")}
 <path d="M0 188H600V220H0Z" fill="#120420"/><path d="M0 188H600" stroke="#e040fb" stroke-width="2" style="filter:drop-shadow(0 0 5px #e040fb)"/>
 <path class="tw" d="M80 220l30-20 20 8 30-16M380 220l20-14 30 6 26-20 40 12" stroke="#e040fb" stroke-width="2" fill="none"/>`)];
const TBG=t=>TBGS[t]();
// Burgmodell wächst mit dem Burgausbau (Summe aller Gebäudestufen)
const CSTAGE=[[0,"Wehrhof"],[2,"Burg"],[5,"Feste"],[9,"Festung"],[14,"Zitadelle"],[19,"Königsburg"]];
const bldSum=()=>Object.values(S.bld||{}).reduce((a,b)=>a+b,0);
const cStage=()=>{const t=bldSum();let k=0;CSTAGE.forEach((c,i)=>{if(t>=c[0])k=i});return k};
function castleSvg(){const k=cStage(),st=k>=4?"#a39a88":"#8d8473",rf=k>=5?"#1f3c88":"#7a1d1d",gd="#d4a017",lit=`style="opacity:${k>=3?"calc(.45 + var(--star)*.55)":"var(--star)"}"`,o=[];
 const cren=(x,y,w)=>{let p=`M${x} ${y}`;for(let c=0;c<w;c+=8)p+=`h4v-4h4v4`;return `<path d="${p}V${y+2}H${x}Z" fill="${st}" stroke="#0003"/>`};
 const tower=(x,top,w)=>`<rect x="${x}" y="${top}" width="${w}" height="${120-top}" fill="${st}" stroke="#0003"/>`+(k>=4?`<path d="M${x-3} ${top}L${x+w/2} ${top-22}L${x+w+3} ${top}Z" fill="${rf}" stroke="#0004"/>${k>=5?`<circle cx="${x+w/2}" cy="${top-23}" r="2.2" fill="${gd}"/>`:""}`:cren(x,top,w));
 const flag=(x,y,c)=>`<path d="M${x} ${y}v-14" stroke="#5b3a1c" stroke-width="1.5"/><path class="wv" d="M${x} ${y-14}h11l-3 3.5 3 3.5h-11z" fill="${c}"/>`;
 if(k>=3)o.push(tower(55,k>=5?30:38,30)+`<rect x="66" y="${k>=5?48:56}" width="8" height="10" rx="4" fill="#ffcf6b" ${lit}/>`+(k>=4?"":flag(70,38,"#c0221f")));
 if(k>=2)o.push(`<path d="M0 120V96h22v24ZM118 120V96h22v24Z" fill="${st}" stroke="#0003"/>`+cren(0,96,22)+cren(118,96,22));
 const tt=k>=4?42:k>=2?52:60;
 o.push(tower(18,tt,24),tower(98,tt,24));
 o.push(`<rect x="38" y="${k>=2?66:72}" width="64" height="${k>=2?54:48}" fill="${st}" stroke="#0003"/>`+cren(38,k>=2?66:72,64));
 o.push(`<path d="M58 120v-22q12-16 24 0v22z" fill="#4a3a28"/>`+(k>=1?`<path d="M62 120v-20M66 120v-24M70 120v-25M74 120v-24M78 120v-20M58 106h24M58 113h24" stroke="#2a1f14" stroke-width="1.2"/>`:"")+(k>=4?`<path d="M58 120v-22q12-16 24 0v22" fill="none" stroke="${gd}" stroke-width="1.5"/>`:""));
 o.push(`<g fill="#ffcf6b" ${lit}><rect x="27" y="${tt+12}" width="6" height="9" rx="3"/><rect x="107" y="${tt+12}" width="6" height="9" rx="3"/>${k>=1?`<rect x="27" y="${tt+30}" width="6" height="9" rx="3"/><rect x="107" y="${tt+30}" width="6" height="9" rx="3"/>`:""}${k>=2?`<rect x="46" y="80" width="5" height="8" rx="2.5"/><rect x="89" y="80" width="5" height="8" rx="2.5"/>`:""}</g>`);
 if(k>=1)o.push([44,90].map(x=>`<path class="wv" d="M${x} ${k>=2?70:76}h8v18l-4-3-4 3z" fill="#8b1e1e" stroke="#0004"/><circle cx="${x+4}" cy="${k>=2?78:84}" r="2" fill="${gd}"/>`).join(""));
 o.push(k>=4?flag(30,tt-22,"#c0221f")+flag(110,tt-22,"#c0221f")+flag(70,(k>=5?30:38)-22,gd):k>=3?flag(30,tt,"#c0221f")+flag(110,tt,"#c0221f"):flag(70,k>=2?66:72,"#c0221f"));
 return `<svg class="castle" viewBox="0 -14 140 134" style="height:${84+k*9}px" aria-label="Burg: ${CSTAGE[k][1]}">${o.join("")}</svg>`}
const TREE=(x,y,k)=>`<path d="M${x} ${y-20*k}l${7*k} ${11*k}h${-3*k}l${6*k} ${9*k}h${-20*k}l${6*k} ${-9*k}h${-3*k}z" style="fill:var(--tree)"/>`;
const BG=`<svg class="bg" viewBox="0 0 600 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
<defs><radialGradient id="bgl"><stop offset="0" style="stop-color:var(--glow);stop-opacity:.75"/><stop offset="1" style="stop-color:var(--glow);stop-opacity:0"/></radialGradient>
<linearGradient id="bfg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".3"/></linearGradient></defs>
<g style="opacity:var(--star)" fill="#fff">${[[40,20],[95,48],[150,14],[205,38],[260,18],[318,44],[372,12],[420,36],[530,22],[575,50],[20,70],[240,64],[345,72],[560,90]].map((p,i)=>`<circle class="tw" style="animation-delay:${(i*.37)%2}s" cx="${p[0]}" cy="${p[1]}" r="${i%3?1:1.6}"/>`).join("")}</g>
<circle cx="470" cy="62" r="70" fill="url(#bgl)"/><circle cx="470" cy="62" r="17" style="fill:var(--sun)"/>
<g style="opacity:var(--star)" fill="#0002"><circle cx="465" cy="57" r="3.5"/><circle cx="476" cy="68" r="2.5"/><circle cx="474" cy="55" r="1.5"/></g>
${[[30,-10],[75,-45],[50,-75]].map((c,i)=>`<g class="cl" style="animation-delay:${c[1]}s;animation-duration:${80+i*25}s;opacity:var(--cop)"><g style="fill:var(--cloud)"><ellipse cx="0" cy="${c[0]}" rx="34" ry="9"/><ellipse cx="-12" cy="${c[0]-6}" rx="15" ry="9"/><ellipse cx="10" cy="${c[0]-8}" rx="18" ry="11"/></g></g>`).join("")}
<g class="cl" style="animation-duration:55s;animation-delay:-30s;opacity:calc(1 - var(--star))" stroke="#3b3b3b" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M0 70q5-5 10 0q5-5 10 0"/><path d="M26 60q4-4 8 0q4-4 8 0"/></g>
<path d="M0 150L40 120L80 134L130 96L175 128L220 110L270 138L320 100L360 122L410 90L455 124L500 106L550 130L600 112V220H0Z" style="fill:var(--mt1)"/>
<g style="fill:var(--snow)" opacity=".85"><path d="M130 96l-10 11 6-2 4 4 4-4 6 2z"/><path d="M320 100l-9 10 5-2 4 4 4-4 5 2z"/><path d="M410 90l-11 12 6-2 5 4 5-4 6 2z"/></g>
<path d="M0 172L60 142L110 160L170 130L230 162L290 138L350 164L420 132L480 160L540 142L600 158V220H0Z" style="fill:var(--mt2)"/>
<rect y="140" width="600" height="48" fill="url(#bfg)"/>
<path d="M0 188Q80 162 170 180T340 176T510 172T600 178V220H0Z" style="fill:var(--hill)"/>
${[[24,184,1],[38,182,.8],[205,184,.9],[220,186,1.1],[372,180,1],[388,182,.8],[548,178,1.1],[564,180,.85]].map(t=>TREE(...t)).join("")}
<path d="M0 194Q150 186 300 192T600 190V220H0Z" style="fill:var(--grass)"/>
<path d="M0 194Q150 186 300 192T600 190" fill="none" stroke="#0002" stroke-width="2"/>
<g stroke="#0003" stroke-width="1.2" stroke-linecap="round">${[60,140,250,330,445,520].map(x=>`<path d="M${x} 205l-2-6M${x+3} 205l1-7M${x+6} 205l3-5"/>`).join("")}</g>
<g style="opacity:var(--star)" fill="#ffe680">${[[90,170],[180,182],[300,176],[420,184],[510,168]].map((p,i)=>`<circle class="ffy" style="animation-delay:${i*.7}s" cx="${p[0]}" cy="${p[1]}" r="1.8"/>`).join("")}</g>
</svg>`;
