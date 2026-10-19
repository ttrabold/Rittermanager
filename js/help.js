// Ritter Manager – Hinweiskarten: beim ersten Öffnen einer Funktion eine kurze Erklärung

const HINTS=t("hints");
const hintBox=id=>HINTS[id]&&!(S.hints||{})[id]?`<div class="card hint"><b>💡 ${t("hint.t")}</b><div style="margin:4px 0 2px">${HINTS[id]}</div><div class="grid" style="margin-top:6px"><button style="grid-column:1/-1" onclick="hintOk('${id}',this)">${t("hint.ok")}</button></div></div>`:"";
function hintOk(id,el){(S.hints=S.hints||{})[id]=1;save();const c=el&&el.closest(".hint");if(c)c.remove()}
