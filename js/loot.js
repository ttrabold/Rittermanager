// Ritter Manager – Zufallsbeute: gewürfelte Waffen, Rüstungen und Schilde mit Seltenheiten

const RAR=[{n:"Selten",e:"🟢",c:"#43a047"},{n:"Rar",e:"🔵",c:"#1e88e5"},{n:"Episch",e:"🟣",c:"#8e24aa"},{n:"Legendär",e:"🟠",c:"#fb8c00"}];
// Effekte je Slot: Höchstwert bei Gegenstandsstufe il (t = Anteil bis Stufe 50), Text, Namenszusatz, Leuchtfarbe
const LFX={
 burn:{nm:"Brand",s:"w",max:(il,t)=>.10+.25*t,d:v=>`${Math.round(v*100)} % Brand`,suf:"der Glut",c:"#ff6a2b"},
 poison:{nm:"Gift",s:"w",max:(il,t)=>.10+.25*t,d:v=>`${Math.round(v*100)} % Gift`,suf:"des Gifts",c:"#7ed957"},
 stun:{nm:"Lähmung",s:"w",max:(il,t)=>.06+.19*t,d:v=>`${Math.round(v*100)} % Lähmung`,suf:"des Frosts",c:"#7fd6ff"},
 crit:{nm:"Krit",s:"w",max:(il,t)=>.05+.17*t,d:v=>`+${Math.round(v*100)} % Krit`,suf:"der Präzision",c:"#f5e663"},
 life:{nm:"Lebensraub",s:"w",max:(il,t)=>.04+.10*t,d:v=>`${Math.round(v*100)} % Lebensraub`,suf:"des Blutes",c:"#c0392b"},
 hp:{nm:"max. LP",s:"a",int:1,max:il=>15+2.2*il,d:v=>`+${v} max. LP`,suf:"des Wächters",c:"#6bbf6b"},
 regen:{nm:"Regeneration",s:"a",int:1,max:il=>2+.13*il,d:v=>`heilt ${v} LP pro Runde`,suf:"des Mondes",c:"#cfd8ff"},
 dodge:{nm:"Ausweichen",s:"a",int:1,max:il=>3+.24*il,d:v=>`+${v} % Ausweichen`,suf:"des Windes",c:"#9de0c4"},
 noburn:{nm:"Brandimmun",s:"a",fix:1,max:()=>1,d:()=>"brandimmun",suf:"des Drachen",c:"#d35400"}};
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

// ---- Beutequellen: Seltenheitsgewichte je Quelle, Gegenstand speichern, ggf. anlegen ----
const LOOTW={tour:()=>[60,30,9,1],boss:()=>[0,60,32,8],moon:()=>[0,75,22,3],
 tower:n=>{const q=Math.min(1,n/50);return [60-50*q,30,9+35*q,n>=30?1+14*q:0]}};
const SLOTK={w:"ew",a:"ea",sh:"es"};
const slotBase=s=>s==="w"?wBon():s==="a"?aBon():sBon();
function lootGive(kind,il,l,n){const w=(LOOTW[kind==="tower10"?"tower":kind]||LOOTW.tour)(n||0);let r=rarRoll(w);if(kind==="tower10")r=Math.min(3,r+1);
 const it=genItem(il,r);(S.gear=S.gear||[]).push(it);const k=SLOTK[it.s],cmp=cmpHtml(it),auto=!S[k]&&it.b>slotBase(it.s);if(auto)S[k]=it.id;
 l.push(`${RAR[r].e} <b style="color:${RAR[r].c}">${RAR[r].n}e Beute: ${it.n}</b> (+${it.b} ${it.s==="w"?"⚔️":"🛡️"}, ${it.d})${cmp?"<br>"+cmp:""}${auto?" – angelegt!":" – liegt im Beutel."}`);return it}

// ---- Vergleich mit dem angelegten Teil derselben Art ----
function cmpHtml(it){const cur=eq(it.s),cf=(cur&&cur.fx)||{},o=[],d=it.b-slotBase(it.s),pc=k=>!LFX[k]||LFX[k].int||LFX[k].fix?"":" %",sc=k=>LFX[k]&&!LFX[k].int&&!LFX[k].fix?100:1;
 if(d)o.push(`${it.s==="w"?"⚔️":"🛡️"} ${d>0?"▲ +":"▼ −"}${Math.abs(d)}`);
 for(const k of new Set([...Object.keys(it.fx),...Object.keys(cf)])){const v=Math.round(((it.fx[k]||0)-(cf[k]||0))*sc(k));if(!v)continue;const nm=LFX[k]?LFX[k].nm:k;o.push(`${nm} ${v>0?"▲ +":"▼ −"}${k==="noburn"?"":Math.abs(v)+pc(k)}`)}
 return o.length?`<span class="mut">${o.join(" · ")}</span>`:""}

// ---- Beutel und Zerlegen ----
const BAG=20;
const isWorn=id=>S.ew===id||S.ea===id||S.es===id;
const bagItems=()=>(S.gear||[]).filter(x=>!isWorn(x.id));
const bagFull=()=>bagItems().length>BAG;
let salvMsg="";
function salvage(id){const it=(S.gear||[]).find(x=>x.id===id);if(!it||isWorn(id))return false;const got={},add=(k,n)=>{S.mat[k]+=n;got[k]=(got[k]||0)+n};
 [()=>add(Math.random()<.5?"ez":"le",rnd(2,3)),()=>add("ak",rnd(1,2)),()=>{add("mi",2);add("ak",2)},()=>{add("ds",1);add("mi",2)}][it.r]();
 const ref={};for(let u=1;u<=(S.up[id]||0);u++)for(const[k,v]of Object.entries(upCost(it.s,u)))ref[k]=(ref[k]||0)+v;for(const k in ref)if(Math.floor(ref[k]/2))add(k,Math.floor(ref[k]/2));
 delete S.up[id];delete S.ru[id];S.gear=S.gear.filter(x=>x.id!==id);
 salvMsg=`🔨 ${it.n} zerlegt: `+Object.entries(got).map(([k,n])=>`${MT(k).e} ${MT(k).n} ×${n}`).join(", ");return true}
function salvageAll(r){let n=0;for(const it of bagItems().filter(x=>x.r===r))if(salvage(it.id))n++;if(n)salvMsg=`🔨 ${n} ${RAR[r].e} ${RAR[r].n}e Gegenstände zerlegt.`;return n}
