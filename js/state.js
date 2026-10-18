// Ritter Manager – Spielstand: anlegen, laden, migrieren, speichern und abgeleitete Werte
const fresh=()=>({name:"Sir Kunibert",sex:"m",tcur:1,day:1,en:6,gold:20,ruhm:0,st:3,au:3,ge:3,w:0,a:0,s:0,exp:0,it:{h:2,H:0,k:0,e:0,g:0,x:0,a:0,A:0},own:[],ew:null,ea:null,boss:0,troph:0,tt:[],title:null,crits:0,flawless:0,close:0,bk:[],star:0,tbest:0,tunl:0,wins:0,losses:0});
const eq=k=>EI.find(x=>x.id===S[k==="w"?"ew":"ea"]);
const ikey=k=>k==="w"?(S.ew||"w"+S.w):(S.ea||"a"+S.a);
const upl=k=>(S.up||{})[ikey(k)]||0;
const fxv=k=>{let v=0;for(const s of["ew","ea"]){const i=EI.find(x=>x.id===S[s]);if(i&&i.fx[k])v+=i.fx[k]}for(const q of["w","a"])for(const r of((S.ru||{})[ikey(q)]||[])){const R=RU.find(x=>x.id===r);if(R&&R.fx[k])v+=R.fx[k]}return v};
const wBon=()=>{const e=eq("w");return (e?e.b:W[S.w][2])+upl("w")*2};
const aBon=()=>{const e=eq("a");return (e?e.b:A[S.a][2])+upl("a")};
const kinfo=key=>{const e=EI.find(x=>x.id===key);if(e)return {s:e.s,n:(e.cr?"⚒️ ":"✨ ")+e.n,b:e.b};const t=key[0],L=t==="w"?W:A,x=L[+key.slice(1)]||L[0];return {s:t,n:x[0],b:x[2]}};
const knm=key=>{const u=(S.up||{})[key]||0,r=((S.ru||{})[key]||[]).length;return kinfo(key).n+(u?" +"+u:"")+(r?" "+"✦".repeat(r):"")};
const iname=k=>knm(ikey(k));
const invItems=()=>["w"+S.w,"a"+S.a,...S.own.filter(id=>EI.find(x=>x.id===id))].sort((a,b)=>(kinfo(a).s>kinfo(b).s)-(kinfo(a).s<kinfo(b).s));
const isEq=key=>ikey("w")===key||ikey("a")===key;
const gn=n=>S.sex==="f"&&n.startsWith("der ")?"die "+n.slice(4)+(/e$/.test(n)?"":"in"):n;
const ttn=()=>{const t=TT.find(y=>y.id===S.title);return t&&gn(t.n)};
const tl=()=>ttn()?`<div class="tl">🎖️ ${ttn()}</div>`:"";
const lvl=()=>1+Math.floor(Math.sqrt(S.exp/20)),expFor=l=>(l-1)*(l-1)*20;
// Spielstand-Plätze: Platz 1 = bisheriger Speicher „ritter1“, Platz 2/3 = „ritter1_2“/„ritter1_3“
const SLOTS=3,slotKey=n=>n===1?"ritter1":"ritter1_"+n;
let SLOT=1;try{SLOT=Math.min(SLOTS,Math.max(1,+localStorage.getItem("ritter_slot")||1))}catch(e){}
let S=fresh(),msg="Willkommen, edler Ritter! Verdiene Gold, bestehe Abenteuer und steige auf – dabei wirst du automatisch stärker.",F=null;
try{const x=localStorage.getItem(slotKey(SLOT));if(x)S=Object.assign(fresh(),JSON.parse(x));}catch(e){}
S.it=Object.assign({h:0,H:0,k:0,e:0,g:0,x:0,a:0,A:0},S.it);S.sex=S.sex==="f"?"f":"m";S.bld=Object.assign({kaserne:0,garten:0,mine:0,arkan:0,schatz:0},S.bld);S.enStart=S.enStart||6;S.tcur=S.tcur||1;S.mat=Object.assign(Object.fromEntries(MAT.map(m=>[m.k,0])),S.mat);S.pr=Object.assign({sm:{lv:1,xp:0},al:{lv:1,xp:0},ve:{lv:1,xp:0}},S.pr);S.up=S.up||{};S.ru=S.ru||{};S.star=S.star||0;S.tbest=S.tbest||0;S.tunl=S.tunl||((S.boss||0)>=3?1:0);S.own=S.own||[];S.ew=S.ew||null;S.ea=S.ea||null;S.boss=S.boss||0;S.troph=S.troph||0;
S.name=String(S.name).replace(/[<>&"'`]/g,"").trim().slice(0,20)||"Sir Kunibert";S.tt=S.tt||[];S.title=S.title||null;S.crits=S.crits||0;S.flawless=S.flawless||0;S.close=S.close||0;S.bk=S.bk||Array.from({length:S.boss||0},(_,i)=>i);
const save=()=>{try{S.ts=Date.now();localStorage.setItem(slotKey(SLOT),JSON.stringify(S))}catch(e){}};
const app=document.getElementById("app");
const rank=()=>{let r=RANKS[0][1];for(const x of RANKS)if(S.ruhm>=x[0])r=x[1];return S.sex==="f"?RANKF[r]||r:r};
const maxhp=()=>40+S.au*6+lvl()*4+fxv("hp");

