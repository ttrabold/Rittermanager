// Ritter Manager – Turm-Bosse: Auswahl je Etage und Kampftricks (Aufladen, Helfer, Spiegeln, Phase, Wiedergeburt, Versiegeln)
// Boss auf Etage n (n durch 5 teilbar): Index i in TBOSS, c = Schatten-Durchlauf (0 bis Etage 100, danach 1, 2, …)
const tbossAt=n=>({i:(n/5-1)%TBOSS.length,c:Math.floor((n-1)/100)});
// Kampfzustand der Tricks (in jedem Kampf angelegt, leer = ohne Wirkung): ch Zähler Aufladen, arm aufgeladen, rf/rc Spiegel-Runden/-Zähler, sl Siegel {Fähigkeit:Runden}, ph Phase, rv wiederbelebt, mi Diener-LP, mt ausgelöste Diener-Schwellen
const tbState=()=>({ch:0,arm:0,rf:0,rc:0,sl:{},ph:0,rv:0,mi:[],mt:{}});
const tbSealed=id=>!!(F&&F.ts&&F.ts.sl[id]>0);
function tbUnseal(f,l){if(f.ts&&Object.keys(f.ts.sl).length){f.ts.sl={};l.push(t("tb.unseal"))}}
// Zu Beginn des Gegnerzugs: Siegel und Spiegel laufen ab (so wirken sie genau r Spielerzüge)
function tbTick(f){const s=f.ts;if(s.rf>0)s.rf--;for(const k in s.sl)if(--s.sl[k]<=0)delete s.sl[k]}
// Aufladen (Ankündigung, im nächsten Zug der Riesenschlag) und Spiegelschild; true = der Trick hat den Gegnerzug verbraucht
function tbAct(f,l){const T=f.tr||{},s=f.ts;
 if(T.charge){const c=T.charge;
  if(s.arm){s.arm=0;if(f.eb.stun){f.eb.stun=0;l.push(t("tb.chBreak",f.name));return true}const m=f.mv.reduce((a,x)=>x[1]>a[1]?x:a);enemyAct(l,[m[0],c.pw,999,"charge",0]);return true}
  if(!f.eb.stun&&++s.ch%c.n===0){s.arm=1;l.push(t("tb.chArm",f.name))}}
 if(T.reflect&&!s.rf&&!f.eb.stun&&++s.rc%T.reflect.n===0){s.rf=T.reflect.r;l.push(t("tb.rfUp",f.name))}
 return false}
// Direkte Treffer des Spielers (Array der Einzeltreffer) → Schaden am Boss; Spiegel wirft einen Teil zurück
// Diener fangen jeden Einzeltreffer ab, Überschuss verfällt
function tbHits(f,hs,l){const tot=hs.reduce((a,b)=>a+b,0),T=f.tr||{},s=f.ts;let boss=0;
 if(s.rf>0&&T.reflect){const d=Math.round(tot*T.reflect.p);if(d>0){f.php-=d;f.took=1;l.push(t("tb.rfHit",d))}}
 for(const h of hs){const j=s.mi.findIndex(x=>x>0);if(j<0){boss+=h;continue}s.mi[j]-=h;if(s.mi[j]<=0)l.push(t("tb.miDown"))}
 return boss}
const tbMi=f=>f.ts.mi.filter(h=>h>0).length;
// Diener rufen, sobald eine LP-Schwelle aus at erreicht ist (1 = Kampfbeginn), je Schwelle einmal
function tbCall(f,l){const c=f.tr.minion,s=f.ts;c.at.forEach((a,j)=>{if(s.mt[j]||f.ehp>f.emax*a)return;s.mt[j]=1;s.mi=s.mi.filter(h=>h>0);for(let k=0;k<c.k;k++)s.mi.push(Math.round(f.emax*c.hp));l.push(t("tb.miCall",f.name,c.k))})}
// Beim Kampfbeginn (aus setup)
function tbStart(f){if(f.tr&&f.tr.minion){const l=[];tbCall(f,l);if(l.length)f.log+="<br>"+l.join("<br>")}}
// Gegnerzug vor dem Angriff: Phase, Diener rufen, Dienerangriffe
function tbPre(f,l){const T=f.tr||{},s=f.ts;
 if(T.phase&&!s.ph&&f.ehp<f.emax*T.phase.at){const b=TBOSS[f.tbi],o=f.name;s.ph=1;s.arm=0;s.rf=0;f.name=(f.cyc?t("tw.shadow"):"")+b.n2;f.mv=b.mv2;f.atk*=T.phase.atk;f.ehp=Math.min(f.emax,f.ehp+Math.round(f.emax*T.phase.heal));f.vfx.push(["roar","vE",0]);sfx("boom");l.push(t("tb.phase",o,f.name))}
 if(T.minion)tbCall(f,l);
 const k=tbMi(f);if(k){const d=Math.max(1,Math.round(k*Math.max(1,f.atk*T.minion.atk-(aBon()+sBon())/2)*(f.pb.guard>0?.5:1)));f.took=1;f.php-=d;l.push(t("tb.miHit",k,d))}}
// Einmal pro Kampf wieder aufstehen; true = Boss lebt wieder
function tbRevive(f,l){const T=f.tr||{},s=f.ts;if(!T.revive||s.rv)return false;s.rv=1;s.arm=0;f.ehp=Math.round(f.emax*T.revive.hp);Object.assign(f.eb,{bleed:0,burn:0,poison:0,ps:0,stun:0});f.vfx.push(["heal","vE",0]);l.push(t("tb.revive",f.name));return true}
// Fluch nach einem Treffer des Bosses: versiegelt eine angelegte Fähigkeit (nie den Grundangriff)
function tbSeal(f,l){const c=f.tr.seal,s=f.ts;if(Math.random()>=c.p)return;const ids=eqSk().filter(id=>id!=="hieb"&&!s.sl[id]);if(!ids.length)return;const id=ids[rnd(0,ids.length-1)];s.sl[id]=c.r;l.push(t("tb.seal",f.name,SKD(id).n))}
