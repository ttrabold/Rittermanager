// Ritter Manager – Start
// Alte Spielstände (frühere Stufenkurve): EP so umrechnen, dass die Stufe gleich bleibt
if(!S.xpv){const oL=1+Math.floor(Math.sqrt(S.exp/20)),oB=(oL-1)**2*20,oN=oL**2*20,fr=oN>oB?(S.exp-oB)/(oN-oB):0;S.exp=Math.round(expFor(oL)+fr*(expFor(oL+1)-expFor(oL)));S.xpv=2;_lvC=[-1,1]}
unlCheck();
if(!S.lvl0)S.lvl0=lvl();
if(!Array.isArray(S.sk))S.sk=SK.filter(s=>s.id!=="hieb"&&s.lv<=lvl()).slice(-skMax()).map(s=>s.id);
if(!S.q||S.q.day!==S.day)qGen();
home();
// Als App installierbar und offline spielbar (nur über http/https, nicht per Doppelklick)
if("serviceWorker" in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register("sw.js").catch(()=>{});
