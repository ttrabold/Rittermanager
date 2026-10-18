// Ritter Manager – Geschichte: der Rivale Sir Gregor, Boss-Vorgeschichten und der Epilog

// Rivalenduelle: Stufe, Dialog davor, nach Sieg, nach Niederlage
const RIVAL=[
 {lv:5,pre:"„So, so – ein neuer Knappe, der sich Ritter nennt? Ich bin Sir Gregor. Merk dir den Namen, denn du wirst ihn noch oft im Staub hören!“",win:"„Glück! Pures Glück! Das nächste Mal …“ Gregor stapft wütend davon.",lose:"„Ha! Wie ich dachte. Komm wieder, wenn du ein Schwert halten kannst.“"},
 {lv:10,pre:"„Man erzählt sich Geschichten über dich im Königreich. Lächerlich! Ich werde allen zeigen, wer der wahre Held ist.“",win:"„Das … das ist unmöglich! Ich habe Tag und Nacht trainiert!“",lose:"„Siehst du? Die Geschichten waren erfunden.“"},
 {lv:15,pre:"„Ich habe mir ein verzaubertes Schwert besorgt. Diesmal gibt es keine Ausreden – für keinen von uns.“",win:"Gregor lässt das Schwert sinken. „Du kämpfst … mit Ehre. Das ärgert mich am meisten.“",lose:"„Endlich! Endlich erkennt jeder, wer der Bessere ist!“"},
 {lv:20,pre:"„Der König hat dich zum Turnierchampion ernannt. Mich hat er nicht einmal angesehen. Zieh dein Schwert!“",win:"„Vielleicht … vielleicht habe ich das falsche Ziel verfolgt.“ Gregor wirkt nachdenklich.",lose:"„Das war für jeden Tag, an dem man mich übersehen hat!“"},
 {lv:25,pre:"„Ich habe gegen die Eiskönigin gekämpft – und verloren. Du hast sie besiegt. Zeig mir, wie viel Abstand zwischen uns liegt.“",win:"„Ein großer Abstand.“ Zum ersten Mal lächelt Gregor. „Aber ich hole auf.“",lose:"„Heute nicht so weit, wie du dachtest, was?“"},
 {lv:32,pre:"„Die Dunkelheit wächst. Bevor wir beide in den letzten Kampf ziehen, will ich es ein letztes Mal wissen – als Rivalen.“",win:"„Ich war ein Narr, dich zu beneiden. Das Königreich braucht dich.“",lose:"„Ein letzter Sieg für den alten Gregor. Danke dir dafür.“"},
 {lv:40,pre:"„Kein Neid mehr, kein Groll. Nur ein letztes Duell unter Freunden. Gib alles!“",win:"Gregor reicht dir sein Schwert. „Die <b>Neidklinge</b> – nimm sie. Sie hat einen würdigeren Träger verdient. Es war mir eine Ehre, dein Rivale zu sein.“",lose:"„Noch nicht ganz, mein Freund. Ich warte auf dich!“"}];
const RIVT={n:"Sir Gregor der Neider",hp:1.9,atk:1.15,def:1.1,tint:"#4a148c",mv:[["Neidhieb",1.1,92,"",4],["Rachestoß",1.4,85,"stun",2],["Hochmut",0,100,"guard",1],["Verzweiflungsschlag",1.9,75,"",2]]};
EI.push({id:"nk",n:"Neidklinge",s:"w",b:45,c:"#7e57c2",fx:{crit:.15,life:.1,stun:.1},d:"+15 % Krit, 10 % Lebensraub, 10 % Lähmung"});
VIS.nk={b:"jagged",f:"#5e35b1",e:"#d1c4e9",g:"#7e57c2",fx:()=>SMOKE("#7e57c2")+SPARK};
const rivalNext=()=>RIVAL[S.rv||0];
const rivalReady=()=>has("rival")&&!!rivalNext()&&lvl()>=rivalNext().lv;
function startRival(){if(!rivalReady()||S.en<3)return;S.en-=3;const R=rivalNext(),e=mk(Math.max(3,R.lv+1),RIVT,true);e.rival=true;e.bi=-1;e.intro=`⚔️ <i>${R.pre}</i><br>`;
 e.look={wt:Math.min(4,1+(S.rv||0)),at:Math.min(4,1+(S.rv||0)),sh:Math.min(3,(S.rv||0)),fem:false,wi:(S.rv||0)>=2?"ss":null,ai:(S.rv||0)>=4?"sp":null,wc:(S.rv||0)>=2?"#6c3fa0":null,ac:(S.rv||0)>=4?"#3b2f4a":null};setup(e)}
function rivalEnd(f,win,l){const R=rivalNext();if(!R)return;l.push(`<i>${win?R.win:R.lose}</i>`);
 if(win){S.rv=(S.rv||0)+1;const g=60+R.lv*15;S.gold+=g;S.ruhm+=20+R.lv*3;l.push(`Rivalensieg: +${g} <i class=coin></i>, +${20+R.lv*3} Ruhm.`);if(!RIVAL[S.rv])giveE("nk",l);msg=`Du hast Sir Gregor besiegt (${S.rv}/${RIVAL.length})!`}
 else msg="Sir Gregor hat dich besiegt – fordere ihn erneut heraus, wenn du bereit bist."}
// Boss-Vorgeschichten (vor dem Kampf) und Nachsätze (nach dem Sieg)
const LORE=[
 ["Graukopf war einst Hauptmann der Stadtwache – bis er die Steuern des Königs stahl und in die Wälder floh.","„Nimm mein Gold … es hat mir ohnehin nur Unglück gebracht.“"],
 ["Niemand hat je das Gesicht des Schwarzen Ritters gesehen. Man sagt, unter dem Helm sei nur Schatten.","Der Helm fällt – und darunter ist … nichts. Nur ein kalter Hauch, der verweht."],
 ["Vulkanus erwachte, als die Minen zu tief gegraben wurden. Seitdem brennen die Dörfer am Feuerberg.","Der Drache sinkt nieder. Die Glut in seinen Augen erlischt, und der Berg wird still."],
 ["Frostara herrschte einst gütig über den Norden – bis ein Fluch ihr Herz zu Eis erstarren ließ.","„Danke …“, haucht sie, als das Eis um ihr Herz bricht. Dann zerfällt sie zu Schneeflocken."],
 ["Mortrax war der Hofmagier des alten Königs. Für die Unsterblichkeit opferte er alles – auch seine Seele.","Der Lich zerfällt zu Staub. Seine Krone rollt klirrend über den Boden."],
 ["Azgaroth wurde durch die Gier der Menschen aus der Unterwelt gerufen. Mit jedem Krieg wird er stärker.","Mit einem letzten Brüllen wird der Dämon in die Tiefe zurückgezogen. Die Erde schließt sich."],
 ["Donnerfaust schlief tausend Jahre in den Wolken. Azgaroths Sturz hat ihn geweckt – und er ist zornig.","Der Riese lacht donnernd. „Endlich ein würdiger Gegner!“ Dann löst er sich in Regen auf."],
 ["Morgana stahl Frostaras Fluch und machte ihn zu ihrer Waffe. Sie will die Herrschaft über alle Königreiche.","Morganas Hut fällt zu Boden. Ihre Flüche verlieren ihre Macht, und die Wälder atmen auf."],
 ["Abyssor erhob sich aus der Tiefsee, als Morgana fiel. Seine Tentakel reißen ganze Schiffe in die Tiefe.","Der Krake versinkt in den Wellen. Am Strand finden Fischer seine goldene Krone."],
 ["Ignarion ist so alt wie die Sonne. Er verbrennt die Welt, damit sie aus der Asche neu entstehen kann.","Der Phönix zerfällt zu Asche – und aus ihr steigt ein kleines, friedliches Flämmchen auf."],
 ["Nyx ist die Herrin der ewigen Nacht. Wo sie wandelt, erlöschen die Sterne.","Mit Nyx' Sturz kehren die Sterne an den Himmel zurück, einer nach dem anderen."],
 ["Der Weltenfresser ist der Ursprung aller Bosheit. Alle, die du besiegt hast, waren nur seine Schatten.","Das Auge schließt sich für immer. Die Welt ist gerettet."]];
const EPILOG=`<h3>📜 Epilog</h3><p>Der Weltenfresser ist besiegt. Zum ersten Mal seit Jahrhunderten liegt Frieden über dem Königreich.</p><p>In den Tavernen singt man Lieder von <b>NAME</b>. Kinder spielen mit Holzschwertern Ritter und Weltenfresser – und immer gewinnt der Ritter.</p><p>Sir Gregor sagt, er habe es schon immer gewusst.</p><p>Doch Helden ruhen nie lange. Wer will, kann den Weg der <b>Wiedergeburt</b> wählen – und alles noch einmal erleben, stärker als zuvor.</p>`;
function epilogScr(){S.epi=1;save();musicSet("hall");app.innerHTML=`<div class="top"><b>🏆 Das Königreich ist gerettet!</b><span></span></div><div class="scene">${BG}${castleSvg()}${pk()}</div><div class="card doc">${EPILOG.replace("NAME",S.name)}</div><div class="grid"><button class="p" style="grid-column:1/-1" onclick="home()">Zurück zur Burg</button></div>`}
