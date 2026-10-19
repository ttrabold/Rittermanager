// Ritter Manager – Geschichte: der Rivale Sir Gregor, Boss-Vorgeschichten und der Epilog

// Rivalenduelle: Stufe, Dialog davor, nach Sieg, nach Niederlage
const RIVAL=loc("rival",[{lv:5},{lv:10},{lv:15},{lv:20},{lv:25},{lv:32},{lv:40}],(o,i)=>i);
const RIVT=loc1("rivt",{hp:1.9,atk:1.15,def:1.1,tint:"#4a148c",mv:[[1.1,92,"",4],[1.4,85,"stun",2],[0,100,"guard",1],[1.9,75,"",2]]});
EI.push(...loc("ei",[{id:"nk",s:"w",b:45,c:"#7e57c2",fx:{crit:.15,life:.1,stun:.1}}]));
VIS.nk={b:"jagged",f:"#5e35b1",e:"#d1c4e9",g:"#7e57c2",fx:()=>SMOKE("#7e57c2")+SPARK};
const rivalNext=()=>RIVAL[S.rv||0];
const rivalReady=()=>has("rival")&&!!rivalNext()&&lvl()>=rivalNext().lv;
function startRival(){if(!rivalReady()||S.en<3)return;S.en-=3;const R=rivalNext(),e=mk(Math.max(3,R.lv+1),RIVT,true);e.rival=true;e.bi=-1;e.intro=`⚔️ <i>${R.pre}</i><br>`;
 e.look={wt:Math.min(4,1+(S.rv||0)),at:Math.min(4,1+(S.rv||0)),sh:Math.min(3,(S.rv||0)),fem:false,wi:(S.rv||0)>=2?"ss":null,ai:(S.rv||0)>=4?"sp":null,wc:(S.rv||0)>=2?"#6c3fa0":null,ac:(S.rv||0)>=4?"#3b2f4a":null};setup(e)}
function rivalEnd(f,win,l){const R=rivalNext();if(!R)return;l.push(`<i>${win?R.win:R.lose}</i>`);
 if(win){S.rv=(S.rv||0)+1;const g=60+R.lv*15;S.gold+=g;S.ruhm+=20+R.lv*3;l.push(t("rv.win",g,20+R.lv*3));if(!RIVAL[S.rv])giveE("nk",l);msg=t("rv.winM",S.rv,RIVAL.length)}
 else msg=t("rv.loseM")}
// Boss-Vorgeschichten (vor dem Kampf) und Nachsätze (nach dem Sieg)
const LORE=t("lore");
function epilogScr(){S.epi=1;save();musicSet("hall");app.innerHTML=`<div class="top"><b>🏆 ${t("epi.t")}</b><span></span></div><div class="scene">${BG}${castleSvg()}${pk()}</div><div class="card doc">${t("epi.txt",S.name)}</div><div class="grid"><button class="p" style="grid-column:1/-1" onclick="home()">${t("c.backH")}</button></div>`}
