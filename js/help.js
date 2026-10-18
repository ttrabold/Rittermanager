// Ritter Manager – Hinweiskarten: beim ersten Öffnen einer Funktion eine kurze Erklärung

const HINTS={
 inv:"Hier siehst du alles, was du trägst, deine Kampfwerte und deinen Beutel mit Zufallsbeute. Du legst Funde an und ab, vergleichst sie und zerlegst, was du nicht brauchst, in Materialien.",
 skills:"Du hast 6 Plätze für Fähigkeiten. Der Schwerthieb ist immer dabei. Tausche Fähigkeiten je nach Gegner aus – vor dem Kampf, nicht währenddessen.",
 craft:"Drei Berufe: <b>Schmied</b> wertet Ausrüstung auf, <b>Alchemie</b> braut Tränke, <b>Verzauberer</b> setzt Runen ein. Jedes Herstellen kostet 1 Energie und Materialien.",
 trader:"Der Händler verkauft alle Materialien und kauft übrige für 40 % zurück. Am Markttag (Samstag) ist alles günstiger.",
 burg:"Gebäude bringen jede Nacht Erträge – aber nur, wenn du am Tag fleißig warst (mindestens 4 Energie für volle Erträge).",
 tavern:"Würfelpoker: Tippe die Würfel an, die du neu werfen willst. Paare und Drillinge behalten, den Rest neu werfen. Höchstens 5 Partien pro Tag.",
 comp:"Begleiter helfen dir passiv. Du kannst mehrere kaufen, aber nur einen mitnehmen – wähle passend zu deinem Ziel.",
 best:"Jeder Gegner, dem du begegnest, landet hier – mit seinen Angriffen. Kennst du die Angriffe, weißt du, welche Tränke du brauchst.",
 save:"Sichere deinen Spielstand regelmäßig mit <b>Exportieren</b> – zum Beispiel als Datei. Damit kannst du ihn auf ein anderes Gerät übertragen oder nach dem Löschen der Browserdaten wiederherstellen."};
const hintBox=id=>HINTS[id]&&!(S.hints||{})[id]?`<div class="card hint"><b>💡 Tipp</b><div style="margin:4px 0 2px">${HINTS[id]}</div><div class="grid" style="margin-top:6px"><button style="grid-column:1/-1" onclick="hintOk('${id}',this)">Verstanden</button></div></div>`:"";
function hintOk(id,el){(S.hints=S.hints||{})[id]=1;save();const c=el&&el.closest(".hint");if(c)c.remove()}
