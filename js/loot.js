// Ritter Manager – Zufallsbeute: gewürfelte Waffen, Rüstungen und Schilde mit Seltenheiten

const RAR=[{n:"Selten",e:"🟢",c:"#43a047"},{n:"Rar",e:"🔵",c:"#1e88e5"},{n:"Episch",e:"🟣",c:"#b45fd0"},{n:"Legendär",e:"🟠",c:"#fb8c00"}];
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
 for(const k of pool.slice(0,r+1)){const L=LFX[k],v=L.max(il,t)*(L.fix?1:rf(.7,1))*(s==="sh"?.6:1);fx[k]=L.fix?1:L.int?Math.max(1,Math.round(v)):Math.max(.01,Math.round(v*100)/100)}
 const base=s==="w"?4+il*1.5:s==="a"?2+il:4+il*.15,b=Math.max(1,Math.round(base*rf(.85,1.1)*(1+.03*r)));
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
function cmpHtml(it){const cur=eq(it.s),cf=(cur&&cur.fx)||{},o=[],d=it.b-slotBase(it.s),pc=k=>!LFX[k]||LFX[k].int||LFX[k].fix?"":"&nbsp;%",sc=k=>LFX[k]&&!LFX[k].int&&!LFX[k].fix?100:1;
 if(d)o.push(`${it.s==="w"?"⚔️":"🛡️"}&nbsp;${d>0?"▲&nbsp;+":"▼&nbsp;−"}${Math.abs(d)}`);
 for(const k of new Set([...Object.keys(it.fx),...Object.keys(cf)])){const v=Math.round(((it.fx[k]||0)-(cf[k]||0))*sc(k));if(!v)continue;const nm=LFX[k]?LFX[k].nm:k;o.push(k==="noburn"?`${nm}&nbsp;${v>0?"▲":"▼"}`:`${nm}&nbsp;${v>0?"▲&nbsp;+":"▼&nbsp;−"}${Math.abs(v)+pc(k)}`)}
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
const bulkable=r=>bagItems().filter(x=>x.r===r&&!S.up[x.id]&&!(S.ru[x.id]||[]).length);
function salvageAll(r){let n=0;for(const it of bulkable(r))if(salvage(it.id))n++;if(n)salvMsg=`🔨 ${n} ${RAR[r].e} ${RAR[r].n}e Gegenstände zerlegt.`;return n}

// ---- Beutel-Ansicht im Inventar ----
function invSalv(id){if(salvage(id)){sfx("coin");save()}inv(true)}
function invSalvAll(r){if(salvageAll(r)){sfx("coin");save()}inv(true)}
function bagHtml(){const row=it=>{const R=RAR[it.r],worn=isWorn(it.id),u=S.up[it.id]||0,ru=(S.ru[it.id]||[]).length,sl=it.s==="w"?`${WCAT[it.cat].e} ${WCAT[it.cat].n}`:it.s==="a"?"🛡️ Rüstung":"🔰 Schild";
  return `<div class="row"><span><b style="color:${R.c}">${R.e} ${it.n}${u?" +"+u:""}${ru?" "+"✦".repeat(ru):""}</b>${worn?' <span class="mut">(angelegt)</span>':""}<br><span class="mut">${sl} · +${it.b+(it.s==="w"?u*2:u)} ${it.s==="w"?"⚔️":"🛡️"} · ${R.n} · Stufe ${it.il}<br>${it.d}</span>${worn?"":"<br>"+cmpHtml(it)}</span>
  <span style="display:flex;flex-direction:column;gap:4px">${worn?`<button class="p" onclick="equipE('${it.id}')">Ablegen</button>`:`<button onclick="equipE('${it.id}')">Anlegen</button><button onclick="invSalv('${it.id}')">Zerlegen</button>`}</span></div>`};
 const all=(S.gear||[]).slice().sort((a,b)=>isWorn(b.id)-isWorn(a.id)||b.r-a.r||b.b-a.b),n=bagItems().length,cnt=r=>bulkable(r).length,m=salvMsg;salvMsg="";
 return `<h3>🎒 Beutel (${n}/${BAG})</h3>${bagFull()?'<div class="mut" style="color:var(--acc)">Dein Beutel ist übervoll. Turm, Turnier und Bosskampf sind gesperrt, bis du aufräumst.</div>':""}${m?`<div class="mut">${m}</div>`:""}
 ${all.map(row).join("")||'<div class="mut">Noch keine Beute. Gewinne Turniere, Turm-Bosse und Bosse.</div>'}
 <div class="grid" style="margin-top:8px"><button ${cnt(0)?"":"disabled"} onclick="invSalvAll(0)">Alles 🟢 zerlegen<small>${cnt(0)} Stück</small></button><button ${cnt(1)?"":"disabled"} onclick="invSalvAll(1)">Alles 🔵 zerlegen<small>${cnt(1)} Stück</small></button></div>
 <div class="mut" style="margin-top:6px">Zerlegen ergibt Materialien: 🟢 Eisenerz oder Leder · 🔵 Arkankristalle · 🟣 Mithrilerz und Kristalle · 🟠 eine Drachenschuppe. Aufwertungen zahlen sich zur Hälfte zurück, Runen gehen verloren. Aufgewertete Teile und Teile mit Runen zerlegst du nur einzeln.</div>`}

// ---- Spielstand-Beute prüfen (alte, importierte oder beschädigte Stände): nur gültige Teile behalten, Texte neu bilden ----
function gearClean(){const ok=[];for(const g of Array.isArray(S.gear)?S.gear:[]){
  if(!g||typeof g!=="object"||!/^g\d+$/.test(g.id)||!["w","a","sh"].includes(g.s)||![0,1,2,3].includes(g.r)||g.s==="w"&&!(g.cat in WCAT)||ok.some(x=>x.id===g.id))continue;
  const fx={};for(const[k,v]of Object.entries(g.fx||{}))if(LFX[k]&&LFX[k].s===(g.s==="w"?"w":"a")&&+v>0)fx[k]=+v;if(!Object.keys(fx).length)continue;
  const it={id:g.id,n:String(g.n||"Beute").replace(/[<>&"'`]/g,"").slice(0,40),s:g.s,b:Math.max(1,Math.round(+g.b||1)),c:/^#[0-9a-f]{3,8}$/i.test(g.c)?g.c:LFX[Object.keys(fx)[0]].c,fx,d:fxDesc(fx),r:g.r,il:Math.max(1,Math.round(+g.il||1)),gen:1};
  if(g.s==="w")it.cat=g.cat;ok.push(it)}
 S.gear=ok;for(const k of["ew","ea","es"])if(S[k]&&!itm(S[k]))S[k]=null;S.gid=Math.max(+S.gid||0,...ok.map(x=>+x.id.slice(1)))}
gearClean();
