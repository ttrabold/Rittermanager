// Ritter Manager – Balance-Simulation: ein simulierter Spieler spielt das ganze Spiel durch (läuft auf tests/index.html)
function simRun(maxDay,seedLog){
 const of=fight;fight=()=>{};const oNS=nightShow;nightShow=()=>{};const T={unl:{},boss:{},lvl:{},rival:{},log:[]};let deaths=0,bossTries=0,bossFails=0;
 S=fresh();unlCheck();S.lvl0=1;S.sk=[];qGen();F=null;EVN=null;
 const potionsBuy=()=>{const want={h:3,H:lvl()>=8?2:0,x:lvl()>=20?1:0,g:1,a:S.tunl?2:0};for(const k in want){const t=IT.find(x=>x.k===k);while(S.it[k]<want[k]&&S.gold>=ip(t.p)+30){S.gold-=ip(t.p);S.it[k]++}}};
 const gearBuy=()=>{for(const [k,L] of[["w",W],["a",A],["s",SH]])for(let i=L.length-1;i>S[k];i--)if(S.gold>=L[i][1]+20){S.gold-=L[i][1];S[k]=i;break}};
 const fightAI=()=>{let t=0;while(F&&!F.over&&t++<120){const f=F;
   if(f.php<f.pmax*.35){const k=["x","H","h"].find(k=>S.it[k]>0);if(k){useItem(k);continue}}
   if((f.pb.burn||f.pb.poison)&&S.it.g&&f.php<f.pmax*.55){useItem("g");continue}
   const av=eqSk().filter(id=>f.pp[id]>0);
   if(f.boss&&f.pb.buff===0&&av.includes("ruf")){useSkill("ruf");continue}
   if(f.boss&&!f.eb.weak&&av.includes("furcht")){useSkill("furcht");continue}
   if(f.php<f.pmax*.5&&av.includes("licht")){useSkill("licht");continue}
   let b="hieb",bv=0;for(const id of av){const s=SKD(id);if(!s.pw)continue;let v=s.pw*(s.hits||1)*s.acc*(s.crit?1.5:1);if(s.fx==="exec"&&f.ehp<f.emax*.35)v*=2.5;if(!f.boss&&s.pp<99&&f.emax<400)v*=.3;if(v>bv){bv=v;b=id}}useSkill(b)}
  if(F&&F.over&&F.ko==="p")deaths++};
 const evAI=()=>{if(!EVN)return;const ch=EVN.ev.ch;let i=ch.findIndex(c=>!c.ok||c.ok());evPick(i<0?ch.length-1:i);if(F&&!F.over)fightAI();EVN=null};
 for(let day=1;day<=maxDay&&S.boss<BOSS.length;day++){
  const before=new Set(S.unl);
  if(has("craft"))for(const key of invItems().filter(isEq)){const u=(S.up[key]||0)+1;if(u<=maxUp()){const c=upCost(kinfo(key).s,u);if(hasM(c)&&S.gold>=upGold(u)+100&&S.en>2)upgrade(key)}}
  while(S.en>0){
   const b=BOSS[S.boss];
   if(has("boss")&&b&&S.ruhm>=b.req&&S.en>=3&&lvl()>=b.L-1){if(S.gold>mercCost()*3&&!S.merc)mercHire();bossTries++;startBoss();fightAI();if(F.ko==="p"){bossFails++;T.bf=T.bf||{};T.bf[S.boss+1]=(T.bf[S.boss+1]||0)+1}else T.boss[S.boss]=day;continue}
   if(rivalReady()&&S.en>=3){startRival();fightAI();if(F.ko==="e")T.rival[S.rv]=day;continue}
   if(has("cal")&&isFull(S.day)&&S.moonDone!==S.day&&S.en>=3){startMoon();fightAI();continue}
   if(has("tour")&&S.en>=4&&S.gold>=tourFee()&&(isTourDay(S.day)||day%3===0)){startTour();fightAI();while(F.over&&F.next&&F.ko!=="p"){nextTour();fightAI()}continue}
   if(has("tower")&&S.en>=4&&day%2===0){startTower();fightAI();let fl=0;while(F.next&&F.php>F.pmax*.45&&fl++<4){nextTour();fightAI()}if(F.next)leaveTower();continue}
   if(S.en>=2){startFight();if(EVN)evAI();else fightAI();continue}
   if(has("craft")&&S.mat.hk>=2){brew("h");continue}
   work()}
  if(has("burg")){for(const bd of BLD){const lv=S.bld[bd.id];if(lv<bd.max){const c=bCost(bd,lv+1);if(S.gold>=c.g+400&&has("craft"))for(const k in c.m)while(S.mat[k]<c.m[k]&&S.gold>=MT(k).p+c.g+200){S.gold-=MT(k).p;S.mat[k]++}if(hasM(c.m)&&S.gold>=c.g+200)build(bd.id)}}for(const d of DECO)if(!hasDeco(d.id)&&(!d.ok||d.ok())&&S.gold>d.g*3)decoBuy(d.id)}
  if(has("kasse")&&S.gold>=kasseCost()*2)kasseGive();
  if(has("comp")){for(const c of COMP)if(!(S.comp||[]).includes(c.id)&&c.ok()&&S.gold>c.price*2){compBuy(c.id)}S.cmp=(S.comp||[]).includes("knappe")?"knappe":S.cmp}
  for(const it of bagItems().sort((a,b)=>b.b-a.b)){const c=eq(it.s),cb=c?c.b:it.s==="w"?W[S.w][2]:it.s==="a"?A[S.a][2]:SH[S.s][2];if(it.b>cb)equipE(it.id)}for(let r=0;r<4;r++)salvageAll(r);
  gearBuy();potionsBuy();
  for(const f of S.unl)if(!before.has(f))T.unl[f]=day;
  T.lvl[day]=lvl();
  S.en=Math.min(S.en,0);newDay();
 }
 fight=of;nightShow=oNS;
 const L=T.lvl,dayOfLvl=n=>{for(const d in L)if(L[d]>=n)return +d;return null};
 return {tage:Object.keys(L).length,stufe:lvl(),bosse:S.boss,tode:deaths,bossVersuche:bossTries,bossNiederlagen:bossFails,
  freischaltung:T.unl,bossTag:T.boss,rivaleTag:T.rival,stufeTag:Object.fromEntries([2,4,6,8,10,12,15,18,20,25,30,40,50].map(n=>[n,dayOfLvl(n)])),gold:S.gold,ruhm:S.ruhm,gebaeude:bldSum(),ds:S.mat.ds,leder:S.mat.le,bossFehl:T.bf||{},beute:{w:(eq("w")||{}).b,a:(eq("a")||{}).b,sh:(eq("sh")||{}).b,r:[S.ew,S.ea,S.es].map(id=>(itm(id)||{}).r)}}}
