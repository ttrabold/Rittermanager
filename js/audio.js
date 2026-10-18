// Ritter Manager – Sound und Musik: Effekte, Synth-Engine, Stücke je Situation, Turm-Klangkulissen
const AU={ctx:null,mus:true,sfx:true,mode:null,want:null,timer:null,step:0,unlocked:false};
try{const a=JSON.parse(localStorage.getItem("ritter_au")||"{}");if(a.m===false)AU.mus=false;if(a.s===false)AU.sfx=false}catch(e){}
const auSave=()=>{try{localStorage.setItem("ritter_au",JSON.stringify({m:AU.mus,s:AU.sfx}))}catch(e){}};
function ac(){if(!AU.ctx){try{AU.ctx=new(window.AudioContext||window.webkitAudioContext)();musGraph()}catch(e){return null}}if(AU.ctx.state==="suspended")AU.ctx.resume();return AU.ctx}
function tone(f,t0,d,type,vol,dest,f2){const c=AU.ctx,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+d);g.gain.setValueAtTime(vol,t0);g.gain.exponentialRampToValueAtTime(.001,t0+d);o.connect(g);g.connect(dest||c.destination);o.start(t0);o.stop(t0+d+.02)}
function noise(t0,d,vol){const c=AU.ctx,n=Math.floor(c.sampleRate*d),b=c.createBuffer(1,n,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);const s=c.createBufferSource(),g=c.createGain();g.gain.value=vol;s.buffer=b;s.connect(g);g.connect(c.destination);s.start(t0)}
function sfx(n){if(!AU.sfx)return;const c=ac();if(!c)return;const t=c.currentTime,D=c.destination,arp=(a,g,ty)=>a.forEach((f,i)=>tone(f,t+i*g,g*1.6,ty||"triangle",.12));
 switch(n){
 case"click":tone(660,t,.05,"square",.05);break;
 case"hit":noise(t,.18,.25);tone(220,t,.15,"sawtooth",.15,D,70);break;
 case"crit":noise(t,.25,.3);tone(330,t,.2,"sawtooth",.18,D,60);tone(990,t+.05,.2,"square",.08);break;
 case"miss":tone(500,t,.2,"sine",.1,D,200);break;
 case"hurt":noise(t,.2,.2);tone(160,t,.3,"sawtooth",.18,D,50);break;
 case"heal":arp([523,659,784],.09);break;
 case"buff":tone(300,t,.35,"triangle",.14,D,900);break;
 case"coin":tone(988,t,.07,"square",.07);tone(1319,t+.07,.2,"square",.07);break;
 case"poison":tone(220,t,.4,"sine",.15,D,110);tone(233,t,.4,"sine",.1,D,120);break;
 case"win":arp([523,659,784,1047],.13);break;
 case"lose":arp([392,330,262,196],.2,"sawtooth");break;
 case"level":arp([523,659,784,1047,1319],.09);break;
 case"fall":noise(t,.35,.3);tone(110,t,.4,"sine",.35,D,40);break;
 case"night":[784,659,523,392].forEach((f,i)=>tone(f,t+i*.28,.9,"sine",.07));break;
 case"morning":tone(620,t,.18,"triangle",.08,D,980);tone(980,t+.18,.25,"triangle",.07,D,760);arp([523,659,784,1047],.14);break;
 case"dice":for(let k=0;k<6;k++)noise(t+k*.045+Math.random()*.02,.03,.18);tone(1400,t+.3,.05,"square",.03);break;
 case"gong":tone(98,t,3,"sine",.28);tone(147,t,2.5,"sine",.12);tone(196,t,2,"triangle",.06);tone(49,t,3.5,"sine",.2);noise(t,.5,.06);break;
 case"boom":noise(t,.8,.35);tone(80,t,.9,"sawtooth",.2,D,30);tone(660,t+.05,.6,"triangle",.08,D,1320);break;}}
// ---- Musik-Engine: Synth mit Hall, Instrumenten und Stücken je Situation ----
function musGraph(){const c=AU.ctx;AU.mg=c.createGain();AU.mg.gain.value=0;AU.lp=c.createBiquadFilter();AU.lp.type="lowpass";AU.lp.frequency.value=18000;
 const cp=c.createDynamicsCompressor();cp.threshold.value=-18;cp.ratio.value=4;AU.mg.connect(AU.lp);AU.lp.connect(cp);cp.connect(c.destination);
 const len=Math.floor(c.sampleRate*2.6),ir=c.createBuffer(2,len,c.sampleRate);for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3)}
 const cv=c.createConvolver();cv.buffer=ir;AU.rv=c.createGain();AU.rv.gain.value=.5;AU.rv.connect(cv);cv.connect(AU.mg);
 const nl=c.sampleRate;AU.nb=c.createBuffer(1,nl,c.sampleRate);const nd=AU.nb.getChannelData(0);for(let i=0;i<nl;i++)nd[i]=Math.random()*2-1}
const mtof=m=>440*Math.pow(2,(m-69)/12);
function nt(t,m,d,o){const c=AU.ctx,g=c.createGain(),f=mtof(m),v=o.v||.08,a=o.a||.01,r=o.r||.3,n=o.n||1;let into=g;
 if(o.f){const fl=c.createBiquadFilter();fl.type=o.bp?"bandpass":"lowpass";fl.frequency.value=o.f;fl.Q.value=o.q||.8;fl.connect(g);into=fl}
 for(let k=0;k<n;k++){const os=c.createOscillator();os.type=o.w||"triangle";os.frequency.value=f;os.detune.value=(k-(n-1)/2)*(o.dt||0);
  if(o.vb){const l=c.createOscillator(),lg=c.createGain();l.frequency.value=5;lg.gain.value=f*.006;l.connect(lg);lg.connect(os.frequency);l.start(t);l.stop(t+d+r+.1)}
  os.connect(into);os.start(t);os.stop(t+d+r+.1)}
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.setValueAtTime(v,t+Math.max(a,d));g.gain.exponentialRampToValueAtTime(.0001,t+Math.max(a,d)+r);
 g.connect(AU.mg);if(o.s){const sg=c.createGain();sg.gain.value=o.s;g.connect(sg);sg.connect(AU.rv)}}
function nz(t,d,v,f,hp,s){const c=AU.ctx,src=c.createBufferSource(),fl=c.createBiquadFilter(),g=c.createGain();src.buffer=AU.nb;fl.type=hp?"highpass":"bandpass";fl.frequency.value=f;fl.Q.value=hp?.7:1.2;
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);src.connect(fl);fl.connect(g);g.connect(AU.mg);if(s){const sg=c.createGain();sg.gain.value=s;g.connect(sg);sg.connect(AU.rv)}src.start(t,Math.random()*.5);src.stop(t+d+.05)}
function drum(t,v,f0,f1,d){const c=AU.ctx,o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d*.8);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(AU.mg);const sg=c.createGain();sg.gain.value=.25;g.connect(sg);sg.connect(AU.rv);o.start(t);o.stop(t+d+.05);nz(t,.04,v*.4,1200)}
function anvil(t,v){[[1760,1],[2637,.6],[3960,.35]].forEach(p=>{const c=AU.ctx,o=c.createOscillator(),g=c.createGain();o.type="sine";o.frequency.value=p[0];g.gain.setValueAtTime(v*p[1],t);g.gain.exponentialRampToValueAtTime(.0001,t+.9);o.connect(g);g.connect(AU.mg);const sg=c.createGain();sg.gain.value=.5;g.connect(sg);sg.connect(AU.rv);o.start(t);o.stop(t+1)});nz(t,.05,v*1.5,3000)}
const PAD={w:"sawtooth",n:3,dt:14,f:850,a:.9,r:1.6,v:.03,s:.6},LUTE={w:"triangle",a:.004,r:.55,v:.075,f:2600,s:.35},FLUTE={w:"sine",a:.07,r:.35,v:.065,vb:1,s:.55},
 BASS={w:"triangle",a:.01,r:.25,v:.11,f:700,s:.05},BRASS={w:"sawtooth",n:2,dt:9,a:.05,r:.25,v:.045,f:1700,s:.3},STR={w:"sawtooth",n:2,dt:11,a:.008,r:.12,v:.03,f:1900,s:.25},
 CHOIR={w:"sawtooth",n:3,dt:16,f:750,bp:1,q:2,a:1.2,r:2.2,v:.06,s:.8},BELL={w:"sine",a:.002,r:2,v:.05,s:.7};
// Melodien: 8 Takte zu je 8 Achteln, 0 = Pause (Ton klingt bis zur nächsten Note)
const mel=str=>str.trim().split(/\s+/).map(x=>x==="."?0:+x);
const melLen=(M,i)=>{let k=1;while(i+k<M.length&&!M[i+k]&&k<8)k++;return k};
const C={Fm:[41,44,48],Db:[49,53,56],Ebm:[51,54,58],Cm:[48,51,55],Ab:[44,48,51],Gb:[42,46,49],B:[47,51,54],Dm:[50,53,57],C:[48,52,55],Bb:[46,50,53],F:[41,45,48],A:[45,49,52],Am:[45,48,52],G:[43,47,50],E:[40,44,47],Gm:[43,46,50],D:[50,54,57],Bm:[47,50,54],Em:[40,43,47],Dm2:[38,41,45],Fmaj:[41,45,48,52],Am7:[45,48,52,55],Bbm:[46,50,53,57],Cs:[48,52,55,59]};
const M_HOME=mel(`74 . . 72 74 . 77 . 76 . 74 . 72 . . . 74 . 72 . 70 . 69 . 67 . . . 72 . . . 69 . 74 . 77 . 76 74 72 . . . 77 . 79 . 76 . 74 . 72 . 71 . 69 . . . . . . .`);
const M_BAT=mel(`62 . 65 . 69 . 67 65 64 . 62 . 57 . . . 62 . 65 . 70 . 69 67 69 . . . 67 . 64 . 62 . 65 . 69 . 74 . 72 . 69 . 65 . . . 67 . 70 . 74 . 72 70 69 . 67 . 64 . 61 .`);
const M_TOUR=mel(`62 . 62 66 69 . . . 71 . 69 . 67 . . . 69 . 66 . 64 . 66 . 62 . . . . . . . 69 . 69 74 . 73 71 . 69 . 66 . 71 . . . 67 . 69 . 71 . 73 . 74 . . . 73 . . .`);
const M_BOSS=mel(`52 . . . 53 . . . 52 . . . 48 . . . 47 . . . 48 . 52 . 50 . . . . . . . 52 . 55 . 53 . 52 . 53 . 57 . 55 . 53 . 55 . 59 . 57 . 55 . 53 . . . 52 . . .`);
const M_TAV=mel(`67 71 74 71 67 71 74 79 76 74 72 71 72 76 79 76 74 72 71 69 66 69 74 72 71 69 67 71 67 . . . 64 67 71 67 64 67 71 76 72 76 79 76 72 76 79 76 74 78 81 78 74 72 71 69 67 71 74 79 67 . . .`);
const lead=(M,st,t,e,o,tr)=>{const i=st%64,m=M[i];if(m)nt(t,m+(tr||0),e*melLen(M,i)*.92,o)};
const TR={
 home:{bpm:76,ch:["Dm","C","Bb","C","Dm","F","C","A"],p(st,t,e){const i=st%8,ch=C[this.ch[(st>>3)%8]];
  if(!i){ch.forEach(m=>nt(t,m,e*7.5,PAD));nt(t,ch[0]-12,e*3.5,BASS)}if(i===4)nt(t,ch[0]-12,e*3.5,BASS);
  const ar=[0,1,2,3,2,1,2,1][i],m=ar===3?ch[0]+24:ch[ar]+12;if(i%2===0||Math.random()<.6)nt(t,m,e*1.5,{...LUTE,v:i%4?.05:.075});
  if((st>>6)%2)lead(M_HOME,st,t,e,FLUTE);else if(i===6&&Math.random()<.5)nt(t,ch[2]+24,e,BELL)}},
 forge:{bpm:92,ch:["Am","G","F","E"],p(st,t,e){const i=st%8,ch=C[this.ch[(st>>3)%4]];
  if(!i)ch.forEach(m=>nt(t,m-12,e*7.5,{...PAD,v:.022,f:600}));if(i===0||i===4)nt(t,ch[0]-12,e*2,BASS);
  if(i===0||i===3)anvil(t,i?.05:.08);if(i===6)drum(t,.12,140,70,.2);
  nt(t,ch[[0,2,1,2,0,2,1,2][i]]+12,e*1.2,{...LUTE,v:.05});if(i===2||i===6)nz(t,.35,.012,600,0,.4)}},
 hall:{bpm:60,ch:["Fmaj","Am7","Bbm","Cs"],p(st,t,e){const i=st%8,ch=C[this.ch[(st>>3)%4]];
  if(!i){ch.forEach(m=>nt(t,m,e*7.8,{...PAD,v:.026,f:700}));nt(t,ch[0]-12,e*7,{...BASS,v:.07,r:1})}
  if([0,3,5].includes(i)&&Math.random()<.7)nt(t,ch[rnd(0,ch.length-1)]+24,e*2,BELL)}},
 battle:{bpm:138,ch:["Dm","Dm","Bb","C","Dm","Dm","Gm","A"],p(st,t,e){const i=st%8,ch=C[this.ch[(st>>3)%8]];
  if(i===0||i===3||i===6)drum(t,.32,120,50,.3);if(i===4)drum(t,.2,220,110,.18);nz(t,.04,i%2?.012:.022,8000,1);
  nt(t,ch[0]-12+[0,0,12,0,0,0,12,0][i],e*.8,{...BASS,v:.09,w:"sawtooth",f:500});
  if(i===0||i===3||i===6)ch.forEach(m=>nt(t,m+12,e*.6,STR));if(!i)ch.forEach(m=>nt(t,m,e*7.5,{...PAD,v:.018}));
  lead(M_BAT,st,t,e,BRASS,12)}},
 tour:{bpm:116,ch:["D","G","A","D","D","Bm","G","A"],p(st,t,e){const i=st%8,ch=C[this.ch[(st>>3)%8]];
  if(i===0||i===4)drum(t,.28,110,55,.3);if([2,6].includes(i)||(i===7&&st%16===15))nz(t,.12,.06,1800,0,.3);if(i===5)nz(t,.06,.035,1800);
  if(i===0||i===4)nt(t,ch[0]-12,e*3,BASS);if(i===2||i===6)ch.forEach(m=>nt(t,m+12,e*.7,{...STR,v:.025}));
  if(!i)ch.forEach(m=>nt(t,m,e*7.5,{...PAD,v:.02}));lead(M_TOUR,st,t,e,{...BRASS,v:.055},12)}},
tavern:{bpm:132,ch:["G","C","D","G","Em","C","D","G"],p(st,t,e){const i=st%8,ch=C[this.ch[(st>>3)%8]];
  if(i===0||i===4){nt(t,ch[0]-12,e*1.5,{...BASS,v:.1});drum(t,.14,120,60,.15)}
  if(i===2||i===6){ch.forEach(m=>nt(t,m+12,e*.8,{...LUTE,v:.04}));nz(t,.08,.04,6000,1)}
  if(i%2)nz(t,.03,.012,7000,1);
  lead(M_TAV,st,t,e,{...FLUTE,v:.05});
  if(!i)nzp(t,e*11,.02,500,"bandpass",1,.4);if(Math.random()<.04)nt(t,rnd(96,100),.05,{w:"sine",a:.002,r:.4,v:.02,s:.6})}},
 tower:{get bpm(){return [104,88,100,112,84,132,76,120][twTier()]},p(st,t,e){const i=st%8,bar=st>>3,tr=twTier(),CH=(...n)=>C[n[bar%n.length]];let ch;
  switch(tr){
  case 1:ch=CH("Dm","Bb","Gm","A");if(!i){ch.forEach(m=>nt(t,m-12,e*7.8,{...PAD,f:450,v:.028}));nt(t,ch[0]-24,e*7.8,{w:"sine",a:.5,r:1,v:.09})}
   if(!i)drum(t,.16,70,40,.5);if(i===3||(i===6&&Math.random()<.6))nt(t,ch[rnd(0,2)]+12,e*2,{...BELL,v:.03,r:1.4});break;
  case 2:ch=CH("Em","C","Am","B");if(!i)ch.forEach(m=>nt(t,m+12,e*7.8,{w:"sine",a:1,r:1.8,v:.025,s:.8}));
   nt(t,ch[[0,1,2,1][i%4]]+24+(i>=4?12:0),e*.8,{...BELL,v:.03,r:1.2});if(i===0||i===4)nt(t,ch[0]-12,e*3,{...BASS,v:.06});break;
  case 3:ch=CH("Em","F","Em","Dm2");if(i===0||i===3||i===6)drum(t,.36,75,35,.45);if(i===4)drum(t,.22,140,60,.25);
   nt(t,ch[0]-12+[0,0,1,0,0,0,3,1][i],e*.8,{...BASS,w:"sawtooth",f:380,v:.09});if(!i)ch.forEach(m=>nt(t,m,e*7.6,{...PAD,f:600,v:.025}));
   if(i===2||i===6)ch.forEach(m=>nt(t,m+12,e*.5,{...STR,f:1100,v:.03}));break;
  case 4:ch=CH("Cm","Ab","Fm","G");if(!i){ch.forEach(m=>nt(t,m+12,e*7.8,CHOIR));nt(t,ch[0]-12,e*7.8,{...BASS,v:.06,r:1})}
   if(i===2&&Math.random()<.7)nt(t,ch[rnd(0,2)]+24,e*4,{...FLUTE,v:.04,a:.4});if(i===4)drum(t,.12,90,50,.5);break;
  case 5:ch=CH("Dm","C","Bb","A");if(i===0||i===2||i===5)drum(t,.3,110,48,.3);if(i===4||i===6)drum(t,.2,200,100,.18);nz(t,.03,.015,9000,1);
   nt(t,ch[0]-12+(i%2?12:0),e*.6,{...BASS,w:"sawtooth",f:600,v:.07});if(i===0||i===3||i===6)ch.forEach(m=>nt(t,m+12,e*.5,STR));if(!i)ch.forEach(m=>nt(t,m,e*7.5,{...PAD,v:.02}));break;
  case 6:ch=CH("Cm","Gb");if(!i){ch.forEach(m=>nt(t,m-12,e*7.9,{...PAD,f:380,v:.035}));nt(t,ch[0]-24,e*7.9,{w:"sine",a:1,r:1.5,v:.1})}
   if(i===0)drum(t,.3,62,38,.2);if(i===1)drum(t,.2,58,36,.2);if(i===5&&Math.random()<.5){nt(t,ch[0]+24,e*3,{...BELL,v:.025});nt(t,ch[0]+25,e*3,{...BELL,v:.02})}break;
  case 7:ch=CH("Fm","Db","Ebm","C");if(!i)ch.forEach(m=>nt(t,m,e*7.8,{...PAD,dt:32,f:1200,v:.026}));nt(t,ch[0]-12,e*.5,{...BASS,v:.07,w:"square",f:400});
   nt(t,ch[[0,1,2,1,0,2,1,2][i]]+24,e*.7,{w:"sine",a:.005,r:.4,v:.03,s:.7});if(Math.random()<.15)nz(t,.05,.03,7000,1);if(i===0||i===4)drum(t,.22,100,45,.3);break;
  default:ch=CH("Am","F","Dm2","E");if(!i){ch.forEach(m=>nt(t,m,e*7.6,{...PAD,f:600,v:.03}));nt(t,ch[0]-12,e*7,{...BASS,v:.08,r:.8})}
   if(i===0||i===4)drum(t,.18,90,45,.4);nz(t,.03,.008,9000,1);
   const up=[0,1,2,3,4,3,2,1][i],m=up<3?ch[up]+12:up===3?ch[0]+24:ch[1]+24;nt(t,m,e*.9,{...BELL,v:.035,r:.9});if(i===6&&bar%4===3)nt(t,ch[0]+24,e*2,FLUTE)}}},
 boss:{bpm:96,ch:["Em","F","Em","Dm2","Em","F","G","F"],p(st,t,e,rage){const i=st%8,ch=C[this.ch[(st>>3)%8]];
  if(!i){nt(t,ch[0]-24,e*7.8,{w:"sawtooth",f:300,a:.3,r:1,v:.07,s:.2});ch.forEach(m=>nt(t,m+12,e*7.8,CHOIR))}
  if(i===0||i===3||i===6)drum(t,.42,80,38,.5);if(i===4)drum(t,.3,150,70,.3);if(rage){nz(t,.05,.03,6000,1);nt(t,ch[0]+[0,12,7,12,0,12,7,12][i],e*.5,STR)}
  if(i===2||i===6)ch.forEach(m=>nt(t,m,e*.5,{...STR,v:.035,f:1200}));lead(M_BOSS,st,t,e,{...BRASS,f:900,v:.07},12)}}};
const twTier=()=>F&&F.tower?ttier(F.tower):0;
function nzp(t,d,v,f,type,q,s){const c=AU.ctx,src=c.createBufferSource(),fl=c.createBiquadFilter(),g=c.createGain();src.buffer=AU.nb;src.loop=true;fl.type=type||"lowpass";fl.frequency.value=f;fl.Q.value=q||.7;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+d*.3);g.gain.setValueAtTime(v,t+d*.7);g.gain.linearRampToValueAtTime(0,t+d);src.connect(fl);fl.connect(g);g.connect(AU.mg);if(s){const sg=c.createGain();sg.gain.value=s;g.connect(sg);sg.connect(AU.rv)}src.start(t,Math.random()*.5);src.stop(t+d+.05)}
function glide(t,m1,m2,d,v){const c=AU.ctx,o=c.createOscillator(),g=c.createGain(),sg=c.createGain();o.type="sine";o.frequency.setValueAtTime(mtof(m1),t);o.frequency.exponentialRampToValueAtTime(mtof(m2),t+d);
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+d*.4);g.gain.linearRampToValueAtTime(0,t+d);sg.gain.value=.8;o.connect(g);g.connect(AU.mg);g.connect(sg);sg.connect(AU.rv);o.start(t);o.stop(t+d+.05)}
// Umgebungsgeräusche je Turm-Ebene (laufen auch bei Turm-Bossen)
function amb(tr,st,t,e){const i=st%8,bed=e*11;
 switch(tr){
 case 0:if(!i)nzp(t,bed,.018,500);if(Math.random()<.4)nz(t,.02,.03,2500);break;
 case 1:if(Math.random()<.18)nt(t,rnd(86,96),.05,{w:"sine",a:.002,r:.5,v:.03,s:.8});if(!i&&Math.random()<.3)anvil(t+e*rnd(0,7),.012);break;
 case 2:if(!i)nzp(t,bed,.02,700,"bandpass",1.5,.5);if(Math.random()<.08)nt(t,rnd(96,103),.1,{w:"sine",a:.01,r:2,v:.015,s:.9});break;
 case 3:if(!i)nzp(t,bed,.07,150);if(Math.random()<.12)drum(t,.05,rnd(180,260),70,.12);break;
 case 4:if(!i&&Math.random()<.6)nzp(t+e*rnd(0,4),e*4,.025,rnd(1800,3200),"bandpass",8,.8);if(!i)nzp(t,bed,.012,900,"bandpass",1,.6);break;
 case 5:if(!i){nzp(t,bed,.035,5000,"highpass",.7,.3);if(Math.random()<.22){nzp(t+e*2,3,.22,160,"lowpass",.7,.5);drum(t+e*2,.25,55,28,1.5)}}break;
 case 6:if(!i&&Math.random()<.4)nzp(t,e*6,.03,400,"bandpass",4,.8);if(!i)nzp(t,bed,.03,90);break;
 case 7:if(!i)glide(t,rnd(60,72),rnd(80,92),e*6,.02);if(i===4&&Math.random()<.5)glide(t,rnd(84,92),rnd(55,64),e*4,.015);break}}
function sched(){const c=AU.ctx;if(!c||c.state!=="running"||!AU.mode)return;const T=TR[AU.mode],inF=F&&!F.over,rage=inF&&F.enr&&AU.mode==="boss",e=60/(T.bpm*(rage?1.18:1))/2;
 if(AU.next<c.currentTime)AU.next=c.currentTime+.05;
 while(AU.next<c.currentTime+.15){T.p(AU.step,AU.next,e,rage);if(inF&&F.tower)amb(twTier(),AU.step,AU.next,e);if(inF&&F.php<F.pmax*.25&&AU.step%8===0){drum(AU.next,.35,65,40,.18);drum(AU.next+.2,.25,60,38,.18)}AU.step++;AU.next+=e}
 AU.lp.frequency.setTargetAtTime(inF&&F.php<F.pmax*.25?1500:18000,c.currentTime,.4)}
function musicStop(){if(AU.timer){clearInterval(AU.timer);AU.timer=null}AU.mode=null;if(AU.mg)AU.mg.gain.setTargetAtTime(0,AU.ctx.currentTime,.25)}
function musicStart(){musicStop();const m=AU.want;if(!m||!AU.mus||!ac())return;AU.mode=m;AU.step=0;AU.next=AU.ctx.currentTime+.1;AU.mg.gain.cancelScheduledValues(AU.ctx.currentTime);AU.mg.gain.setTargetAtTime(.55,AU.ctx.currentTime,.3);AU.timer=setInterval(sched,25)}
function musicSet(m){AU.want=m;if(AU.unlocked&&AU.mus&&AU.mode!==m)musicStart()}
function toggleM(){AU.mus=!AU.mus;auSave();if(AU.mus){AU.unlocked=true;ac();musicStart()}else musicStop();updSnd()}
function toggleS(){AU.sfx=!AU.sfx;auSave();updSnd();if(AU.sfx)sfx("coin")}
function updSnd(){document.getElementById("mb").className=AU.mus?"":"off";document.getElementById("sb").className=AU.sfx?"":"off"}
const sd=document.createElement("div");sd.id="snd";sd.innerHTML=`<button id="mb" onclick="toggleM()" aria-label="Musik an oder aus">🎵 Musik</button><button id="sb" onclick="toggleS()" aria-label="Sound an oder aus">🔊 Sound</button>`;document.body.appendChild(sd);updSnd();
document.addEventListener("pointerdown",()=>{if(AU.unlocked)return;AU.unlocked=true;ac();if(AU.mus)musicStart()});
document.addEventListener("visibilitychange",()=>{if(!AU.ctx)return;if(document.hidden)AU.ctx.suspend();else if(AU.unlocked)AU.ctx.resume()});
document.addEventListener("click",e=>{const b=e.target.closest("button");if(b&&!b.closest("#snd")&&!b.disabled)sfx("click")});
