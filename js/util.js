// Ritter Manager – Kleine Hilfsfunktionen
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const backBtn=()=>`<button style="grid-column:1/-1" onclick="home()">${t("c.back")}</button>`;
const bar=(v,m,c)=>`<div class="bar"><i style="width:${Math.max(0,Math.min(100,v/m*100))}%;background:${c}"></i></div>`;

