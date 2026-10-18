// Ritter Manager – Zufallsbeute: gewürfelte Waffen, Rüstungen und Schilde mit Seltenheiten

const RAR=[{n:"Selten",e:"🟢",c:"#43a047"},{n:"Rar",e:"🔵",c:"#1e88e5"},{n:"Episch",e:"🟣",c:"#8e24aa"},{n:"Legendär",e:"🟠",c:"#fb8c00"}];
// Effekte je Slot: Höchstwert bei Gegenstandsstufe il (t = Anteil bis Stufe 50), Text, Namenszusatz, Leuchtfarbe
const LFX={
 burn:{s:"w",max:(il,t)=>.10+.25*t,d:v=>`${Math.round(v*100)} % Brand`,suf:"der Glut",c:"#ff6a2b"},
 poison:{s:"w",max:(il,t)=>.10+.25*t,d:v=>`${Math.round(v*100)} % Gift`,suf:"des Gifts",c:"#7ed957"},
 stun:{s:"w",max:(il,t)=>.06+.19*t,d:v=>`${Math.round(v*100)} % Lähmung`,suf:"des Frosts",c:"#7fd6ff"},
 crit:{s:"w",max:(il,t)=>.05+.17*t,d:v=>`+${Math.round(v*100)} % Krit`,suf:"der Präzision",c:"#f5e663"},
 life:{s:"w",max:(il,t)=>.04+.10*t,d:v=>`${Math.round(v*100)} % Lebensraub`,suf:"des Blutes",c:"#c0392b"},
 hp:{s:"a",int:1,max:il=>15+2.2*il,d:v=>`+${v} max. LP`,suf:"des Wächters",c:"#6bbf6b"},
 regen:{s:"a",int:1,max:il=>2+.13*il,d:v=>`heilt ${v} LP pro Runde`,suf:"des Mondes",c:"#cfd8ff"},
 dodge:{s:"a",int:1,max:il=>3+.24*il,d:v=>`+${v} % Ausweichen`,suf:"des Windes",c:"#9de0c4"},
 noburn:{s:"a",fix:1,max:()=>1,d:()=>"brandimmun",suf:"des Drachen",c:"#d35400"}};
const itm=id=>id?EI.find(x=>x.id===id)||(S.gear||[]).find(x=>x.id===id):undefined;
const fxDesc=fx=>Object.entries(fx).map(([k,v])=>LFX[k]?LFX[k].d(v):"").filter(Boolean).join(", ");
const rf=(a,b)=>a+Math.random()*(b-a);
function rarRoll(w){const sum=w.reduce((a,b)=>a+b,0);let x=Math.random()*sum;for(let i=0;i<w.length;i++){if(w[i]>0&&(x-=w[i])<0)return i}return w.findLastIndex(v=>v>0)}
function genItem(il,r,s,cat){il=Math.max(1,Math.round(il));
 if(!s){const x=Math.random();s=x<.5?"w":x<.8?"a":"sh"}
 if(s==="w"&&!cat){const ks=Object.keys(WCAT);cat=ks[rnd(0,ks.length-1)]}
 const t=Math.min(1,il/50),pool=Object.keys(LFX).filter(k=>LFX[k].s===(s==="w"?"w":"a")).sort(()=>Math.random()-.5),fx={};
 for(const k of pool.slice(0,r+1)){const L=LFX[k],v=L.max(il,t)*(L.fix?1:rf(.7,1));fx[k]=L.fix?1:L.int?Math.max(1,Math.round(v)):Math.max(.01,Math.round(v*100)/100)}
 const base=s==="w"?il*1.6:s==="a"?il*1.05:4+il*.3,b=Math.max(1,Math.round(base*rf(.85,1.15)*(1+.05*r)));
 const tier=Math.min(4,Math.floor(il/10)),first=Object.keys(fx)[0];
 const bn=s==="w"?WNAMES[cat][tier]:s==="a"?A[Math.max(1,tier)][0]:SH[Math.min(3,1+Math.floor(tier/2))][0];
 const it={id:"g"+(S.gid=(S.gid||0)+1),n:`${bn} ${LFX[first].suf}`,s,b,c:LFX[first].c,fx,d:fxDesc(fx),r,il,gen:1};
 if(s==="w")it.cat=cat;return it}
