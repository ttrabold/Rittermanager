// Ritter Manager – Grafik des Endlosen Turms: Figuren der Turm-Bosse (ph = Phase 0/1)
const TBOSSV=[
// 1 Torwächter Eisenbart: schwer gerüstet, Hellebarde, eiserner Bart
ph=>KX(knight(4,4,0,true,"#8d6e63","#78909c","#455a64",null,null,false,null,"helle"),
 `<path class="wv" d="M40 62Q16 100 22 150L54 124Z" fill="#4e342e" stroke="#0005"/>`,
 `<path d="M48 50Q48 74 61 82Q74 74 74 50Q68 58 61 58Q54 58 48 50Z" fill="#90a4ae" stroke="#37474f"/><path d="M54 60v14M61 62v18M68 60v14" stroke="#607d8b" stroke-width="1.5"/>
 <path d="M50 38h22" stroke="#ffb300" stroke-width="2.5"/><circle cx="61" cy="100" r="5" fill="#ffb300" stroke="#5d4037"/><path d="M59 100h4M61 98v4" stroke="#5d4037"/>`),
// 2 Kerkermeister Grimmbold: Henkerskapuze, Lederschürze, Kette und Schlüsselbund
ph=>BSV(`<rect x="44" y="104" width="15" height="32" rx="3" fill="#4e342e"/><rect x="64" y="104" width="15" height="32" rx="3" fill="#4e342e"/>
 <path d="M41 132h20v18h-24zM62 132h20l5 18h-25z" fill="#1b1410" stroke="#0005"/>
 <g class="br">${limbB("M38 64Q24 88 30 106","#8d6e63",11)}<circle cx="30" cy="108" r="6.5" fill="#d7a98a" stroke="#0005"/>
 <path d="M34 60Q61 48 88 60L86 110H36Z" fill="#8d6e63" stroke="#0005"/><path d="M42 66h38l-4 46H46Z" fill="#5d4037" stroke="#3e2723"/>
 <path d="M46 78h30M47 90h28" stroke="#3e2723" stroke-width="1.2" stroke-dasharray="3 3"/>
 <rect x="36" y="100" width="50" height="7" rx="2" fill="#3e2723"/>
 <g class="sway" style="animation-duration:1.6s"><circle cx="44" cy="114" r="7" fill="none" stroke="#bdbdbd" stroke-width="2"/><path d="M40 118l-3 12h3l1 4M46 120l2 11h-3" stroke="#ffd54f" stroke-width="2.2" fill="none"/></g>
 <circle cx="61" cy="40" r="18" fill="#212121" stroke="#000"/><path d="M47 28Q61 4 75 28" fill="#212121"/>
 <ellipse cx="54" cy="40" rx="4" ry="2.6" fill="#d7a98a"/><ellipse cx="68" cy="40" rx="4" ry="2.6" fill="#d7a98a"/><circle class="glow" cx="54" cy="40" r="1.4" fill="#ff5252"/><circle class="glow" cx="68" cy="40" r="1.4" fill="#ff5252"/>
 ${limbB("M86 64Q100 82 104 100","#8d6e63",11)}<circle cx="104" cy="102" r="6.5" fill="#d7a98a" stroke="#0005"/>
 <g class="sway">${[0,1,2,3,4,5,6].map(i=>`<ellipse cx="${104+(i%2)*2}" cy="${108+i*6}" rx="3" ry="4" fill="none" stroke="#9e9e9e" stroke-width="2"/>`).join("")}<circle cx="106" cy="152" r="5" fill="#616161" stroke="#212121"/></g></g>`,46),
// 3 Kristallgolem: Körper aus Kristallen, leuchtender Kern
ph=>BSV(`<circle class="pl" cx="61" cy="86" r="62" fill="#4dd0e1" opacity=".25"/>
 <polygon points="40,150 44,108 58,112 56,150" fill="#26c6da" stroke="#e0f7fa"/><polygon points="66,150 64,112 80,108 84,150" fill="#00acc1" stroke="#e0f7fa"/>
 <g class="br"><polygon points="30,104 20,74 36,56 44,90" fill="#4dd0e1" stroke="#e0f7fa"/><polygon points="20,104 28,94 40,110 26,120" fill="#80deea" stroke="#e0f7fa"/>
 <polygon points="36,58 61,46 88,58 92,96 80,116 42,116 32,96" fill="#00838f" stroke="#e0f7fa" stroke-width="1.5"/>
 <polygon points="44,64 61,56 78,64 74,90 48,90" fill="#4dd0e1" opacity=".75"/><polygon class="glow" points="61,68 70,78 61,92 52,78" fill="#e0f7fa" style="filter:drop-shadow(0 0 5px #4dd0e1)"/>
 <polygon points="46,58 52,30 62,44 70,24 76,56" fill="#26c6da" stroke="#e0f7fa"/><polygon points="50,46 72,46 68,58 54,58" fill="#006064"/>
 <circle class="glow" cx="56" cy="51" r="2.4" fill="#fff"/><circle class="glow" cx="66" cy="51" r="2.4" fill="#fff"/>
 <polygon points="88,60 108,74 106,96 92,90" fill="#4dd0e1" stroke="#e0f7fa"/><polygon points="96,94 116,92 118,112 100,116" fill="#80deea" stroke="#e0f7fa"/>
 ${ST(34,40,"#e0f7fa",0)}${ST(98,50,"#fff",.4)}${ST(80,126,"#e0f7fa",.8)}</g>`,44),
// 4 Magmawurm Glutschlund: Wurm aus dem Lavasee, in Phase 2 weißglühend
ph=>{const b=ph?"#ff8f00":"#5d1f0e",g=ph?"#fff176":"#ff6d00";return BSV(`<ellipse cx="62" cy="148" rx="52" ry="9" fill="#bf360c"/><ellipse class="pl" cx="62" cy="147" rx="44" ry="6" fill="${g}"/>
 <g class="br"><path d="M30 148Q20 110 48 96Q76 82 62 54Q54 36 72 22" stroke="#000" stroke-width="30" fill="none" stroke-linecap="round" opacity=".35"/>
 <path d="M30 148Q20 110 48 96Q76 82 62 54Q54 36 72 22" stroke="${b}" stroke-width="26" fill="none" stroke-linecap="round"/>
 <path class="tw" d="M30 140Q24 112 48 100M56 88Q70 76 62 58" stroke="${g}" stroke-width="3" fill="none" style="filter:drop-shadow(0 0 3px ${g})"/>
 ${[[34,126],[40,108],[58,90],[64,70],[60,50]].map(p=>`<path d="M${p[0]-7} ${p[1]}l7-5 7 5" stroke="#2b0d05" stroke-width="2" fill="none"/>`).join("")}
 <path d="M58 26Q66 4 92 14Q104 22 96 34L74 38Z" fill="${b}" stroke="#000"/><path d="M92 30L106 40 88 40Z" fill="#2b0d05"/>
 ${[94,99,103].map(x=>`<path d="M${x} 33l1.6 5 1.6-5" fill="#ffe0b2"/>`).join("")}
 <circle class="glow" cx="82" cy="20" r="3.5" fill="${g}" style="filter:drop-shadow(0 0 4px ${g})"/><path d="M64 14l-6-10 10 6zM72 10l-2-12 8 9z" fill="#2b0d05"/>
 ${fm(100,44,.5,g,0)}${ph?fm(28,96,.9,"#ffab40",.2)+fm(70,60,.8,"#fff176",.4)+fm(50,120,.8,"#ff6d00",.1):""}</g>`,50)},
// 5 Die Graue Witwe: schwebender Geist mit Schleier und Krallen
ph=>BSV(`<g class="hov"><path class="wv" d="M30 70Q14 120 26 150Q36 140 44 152Q52 140 61 152Q70 140 78 152Q86 140 96 150Q108 120 92 70Z" fill="#9e9e9e" opacity=".75" stroke="#eeeeee"/>
 <path d="M34 70Q61 56 88 70L84 110Q61 120 38 110Z" fill="#616161" stroke="#bdbdbd"/>
 ${limbB("M36 74Q22 92 26 108","#757575",7)}<path d="M26 108l-6 6M27 109l-2 9M29 108l4 8" stroke="#eceff1" stroke-width="1.6"/>
 ${limbB("M86 74Q104 84 108 96","#757575",7)}<path d="M108 96l8 2M108 97l6 8M107 99l1 9" stroke="#eceff1" stroke-width="1.6"/>
 <path d="M42 46Q40 18 61 16Q82 18 80 46Q86 70 92 82Q72 60 61 62Q50 60 30 82Q36 70 42 46Z" fill="#212121" opacity=".85"/>
 <ellipse cx="61" cy="46" rx="12" ry="15" fill="#cfd8dc"/><circle class="glow" cx="55" cy="44" r="3" fill="#b2ff59"/><circle class="glow" cx="67" cy="44" r="3" fill="#b2ff59"/><path d="M56 54q5 3 10 0" stroke="#455a64" fill="none"/>
 <path d="M50 16l11-10 11 10" fill="#212121"/>${SMOKE("#b2ff59")}</g>`,34),
// 6 Sturmharpyie Kreischkralle: Flügel, Krallen, Blitze
ph=>BSV(`<g class="hov"><g class="flap"><path d="M48 70Q6 40 2 90Q18 80 22 96Q30 84 36 100Q42 88 50 96Z" fill="#3949ab" stroke="#1a237e"/></g>
 <g class="flap r"><path d="M74 70Q116 40 124 88Q108 80 104 96Q96 84 90 100Q84 88 76 96Z" fill="#3949ab" stroke="#1a237e"/></g>
 <path d="M46 66Q61 58 76 66L72 108Q61 114 50 108Z" fill="#5c6bc0" stroke="#1a237e"/>${[0,1,2].map(i=>`<path d="M${50+i*4} ${76+i*10}q11 6 22 0" stroke="#9fa8da" fill="none"/>`).join("")}
 <path d="M52 108l-6 28M70 108l6 28" stroke="#ffb300" stroke-width="4"/><path d="M40 138l6-2 6 4M70 140l6-4 6 2" stroke="#ffb300" stroke-width="2.5" fill="none"/>
 <circle cx="61" cy="46" r="14" fill="#e1c4a0" stroke="#0004"/><path d="M45 44Q44 22 61 24Q80 22 78 46L86 64Q74 40 64 36Q52 40 40 64Z" fill="#283593"/>
 <path d="M54 44l5 2M64 46l5-2" stroke="#000" stroke-width="2"/><circle class="glow" cx="56" cy="48" r="1.8" fill="#fff27a"/><circle class="glow" cx="67" cy="48" r="1.8" fill="#fff27a"/><path d="M58 56l3 4 3-4z" fill="#ffb300"/></g>
 ${BOLT}`,40),
// 7 Dein Schattenzwilling: der eigene Ritter, schwarz getönt, mit glühenden Augen
ph=>KX(knight(gearTier("w"),gearTier("a"),gearTier("sh"),true,"#4a148c",eq("w")?eq("w").c:null,eq("a")?eq("a").c:null,S.ew,S.ea,S.sex==="f",undefined,eqCat()).replace('style="transform:scaleX(-1)"','style="transform:scaleX(-1);filter:brightness(.3) contrast(1.3) drop-shadow(0 0 6px #7c4dff)"'),
 `<ellipse class="pl" cx="62" cy="90" rx="46" ry="62" fill="#311b92" opacity=".4"/>`,
 `<circle class="glow" cx="56" cy="40" r="2.6" fill="#e040fb"/><circle class="glow" cx="67" cy="40" r="2.6" fill="#e040fb"/>`),
// 8 Rissbewahrer Xal'Zorr: hohe Gestalt vor einem kreisenden Riss
ph=>BSV(`<g class="rot" style="transform-box:fill-box;transform-origin:center">${[50,40,30].map((r,i)=>`<ellipse cx="62" cy="70" rx="${r}" ry="${r*1.25}" fill="none" stroke="${i%2?"#e040fb":"#7c4dff"}" stroke-width="${2.5-i*.5}" stroke-dasharray="${14+i*6} 8" opacity=".8"/>`).join("")}</g>
 <ellipse class="pl" cx="62" cy="70" rx="24" ry="34" fill="#12001f"/>
 <g class="hov"><path class="wv" d="M38 64Q28 120 34 150H90Q96 120 86 64Z" fill="#1a0f2a" stroke="#7c4dff"/>
 <path d="M44 150l6-14 6 14 6-14 6 14 6-14 6 14" fill="#12001f" stroke="#7c4dff"/>
 ${limbB("M40 70Q24 90 22 108","#1a0f2a",8)}<path d="M18 110l4 4 4-4" stroke="#b388ff" stroke-width="2" fill="none"/>
 ${limbB("M84 70Q100 84 104 100","#1a0f2a",8)}<circle class="glow" cx="106" cy="104" r="7" fill="#e040fb" style="filter:drop-shadow(0 0 6px #e040fb)"/>
 <path d="M44 66Q46 26 62 18Q78 26 80 66Q62 56 44 66Z" fill="#1a0f2a" stroke="#7c4dff"/><path d="M50 34Q62 24 74 34" stroke="#b388ff" fill="none"/>
 <path class="glow" d="M54 44l6 2M64 46l6-2" stroke="#e040fb" stroke-width="3" stroke-linecap="round"/>
 ${[[52,58],[72,58],[62,64]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="1.5" fill="#b388ff"/>`).join("")}</g>
 ${ST(20,30,"#fff",0)}${ST(106,26,"#e040fb",.5)}${ST(18,130,"#b388ff",1)}`,40)];
const tbossSvg=(i,ph)=>TBOSSV[i]?TBOSSV[i](ph?1:0):knight(4,4,3,true,TBOSS[i].tint);
// ---- Figuren der Turm-Bosse 9–20 ----
// Wurm/Drache: Körper als dicke Linie, b Körper, g Glühen, sc Schuppen
const WYRM=(b,g,sc,head)=>`<g class="br"><path d="M30 148Q20 110 48 96Q76 82 62 54Q54 36 72 22" stroke="#000" stroke-width="30" fill="none" stroke-linecap="round" opacity=".35"/>
 <path d="M30 148Q20 110 48 96Q76 82 62 54Q54 36 72 22" stroke="${b}" stroke-width="26" fill="none" stroke-linecap="round"/>
 ${[[34,126],[40,108],[58,90],[64,70],[60,50]].map(p=>`<path d="M${p[0]-7} ${p[1]}l7-5 7 5" stroke="${sc}" stroke-width="2" fill="none"/>`).join("")}
 <path d="M58 26Q66 4 92 14Q104 22 96 34L74 38Z" fill="${b}" stroke="#000"/><path d="M92 30L106 40 88 40Z" fill="#111"/>
 ${[94,99,103].map(x=>`<path d="M${x} 33l1.6 5 1.6-5" fill="#fff"/>`).join("")}<circle class="glow" cx="82" cy="20" r="3.5" fill="${g}" style="filter:drop-shadow(0 0 4px ${g})"/>${head||""}</g>`;
TBOSSV.push(
// 9 Uhrwerk-Koloss
ph=>BSV(`<rect x="42" y="110" width="16" height="36" rx="3" fill="#8d6e3a" stroke="#3e2c10"/><rect x="66" y="110" width="16" height="36" rx="3" fill="#8d6e3a" stroke="#3e2c10"/>
 <path d="M38 144h24v8h-26zM62 144h24l2 8h-26z" fill="#5d4a2c"/>
 <g class="br">${limbB("M34 66Q20 86 24 108","#a1793a",10)}<rect x="16" y="104" width="16" height="12" rx="3" fill="#5d4a2c"/>
 <rect x="32" y="56" width="60" height="58" rx="8" fill="#b8860b" stroke="#3e2c10" stroke-width="2"/>${[40,84].map(x=>[62,104].map(y=>`<circle cx="${x}" cy="${y}" r="1.8" fill="#3e2c10"/>`).join("")).join("")}
 ${gear(62,84,16,8,"#ffd54f",4)}<path d="M92 66l14-10M104 52l6 8" stroke="#8d6e3a" stroke-width="4"/>
 <rect x="44" y="20" width="36" height="34" rx="6" fill="#a1793a" stroke="#3e2c10" stroke-width="2"/><rect class="glow" x="48" y="32" width="28" height="7" rx="3" fill="#ff6d00" style="filter:drop-shadow(0 0 4px #ff6d00)"/>
 <path d="M50 46h24" stroke="#3e2c10" stroke-width="2" stroke-dasharray="3 2"/><path d="M62 20V10" stroke="#3e2c10" stroke-width="3"/><circle class="glow" cx="62" cy="9" r="3" fill="#ff6d00"/>
 ${limbB("M90 66Q104 84 104 104","#a1793a",10)}<path d="M96 104h18v14h-18z" fill="#5d4a2c" stroke="#3e2c10"/><path d="M100 118v6M110 118v6" stroke="#5d4a2c" stroke-width="3"/></g>
 <ellipse class="fl2" cx="30" cy="40" rx="6" ry="4" fill="#eee" opacity=".4"/>`,44),
// 10 Der Gesichtslose Bibliothekar
ph=>BSV(`<g class="hov"><path class="wv" d="M36 62Q24 120 30 150H94Q100 120 88 62Z" fill="#4e342e" stroke="#1b0f0a"/>
 <path d="M54 62v88M70 62v88" stroke="#3e2723"/><path d="M36 62Q62 54 88 62L84 76Q62 70 40 76Z" fill="#6d4c41"/>
 ${limbB("M40 70Q28 86 36 100","#4e342e",8)}${limbB("M84 70Q98 82 92 100","#4e342e",8)}
 <path d="M30 98l32-6 32 6v22l-32-6-32 6z" fill="#efe3c6" stroke="#5d4037"/><path d="M62 92v22" stroke="#5d4037"/>${[0,1,2].map(i=>`<path d="M${36+i*2} ${104+i*4}h20M${68+i*2} ${104+i*4}h20" stroke="#8d6e63" stroke-width=".8"/>`).join("")}
 <circle class="glow" cx="62" cy="104" r="16" fill="#ffca28" opacity=".25"/>
 <path d="M46 52Q44 18 62 16Q80 18 78 52Q70 62 62 62Q54 62 46 52Z" fill="#3e2723"/><ellipse cx="62" cy="42" rx="12" ry="15" fill="#e8e0d0"/><path d="M54 38q8 3 16 0" stroke="#d6cbb6" fill="none"/></g>
 ${[[18,40,0],[104,30,.6],[110,96,1.2],[14,110,.9]].map(b=>`<g class="hov" style="animation-delay:${b[2]}s"><path d="M${b[0]-8} ${b[1]}l8-4 8 4v10l-8-4-8 4z" fill="${["#8b1e1e","#1e5b8b","#2e7d32","#6d4c41"][Math.round(b[2]*3)%4]}" stroke="#111"/></g>`).join("")}`,38),
// 11 Sporenmutter
ph=>BSV(`<path d="M30 150q6-24 20-30M94 150q-6-24-20-30M50 150q4-16 10-24M74 150q-4-16-10-24" stroke="#6d4c41" stroke-width="5" fill="none" stroke-linecap="round"/>
 <g class="br"><path d="M44 130Q40 90 50 66H74Q84 90 80 130Z" fill="#e8e0c8" stroke="#8d8070"/>
 <path d="M48 76q-24 6-30 30M76 76q24 4 32 26" stroke="#7cb342" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="18" cy="108" r="5" fill="#aed581"/><circle cx="108" cy="104" r="5" fill="#aed581"/>
 <circle class="glow" cx="55" cy="96" r="3" fill="#ccff90"/><circle class="glow" cx="69" cy="96" r="3" fill="#ccff90"/><path d="M56 108q6 4 12 0" stroke="#5d4037" fill="none"/>
 <path d="M14 70Q20 18 62 14Q104 18 110 70Q62 58 14 70Z" fill="#8bc34a" stroke="#33691e" stroke-width="2"/>
 ${[[34,40,6],[62,28,7],[88,42,5],[50,56,4],[78,58,4]].map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="#f1f8e9" opacity=".8"/>`).join("")}
 <path d="M20 68q8 6 14 0q8 6 14 0q8 6 14 0q8 6 14 0q8 6 14 0q8 6 14 0" stroke="#558b2f" fill="none"/></g>
 ${DOTS(8,"#ccff90","fl2",150,1.4).replace(/cx="(\d+)"/g,(m,x)=>`cx="${10+x%110}"`)}`,46),
// 12 Frostwyrm Gletscherzahn (Phase 2: Panzer gesprengt)
ph=>BSV(`<ellipse cx="62" cy="150" rx="50" ry="7" fill="#b3e5fc" opacity=".6"/>${WYRM(ph?"#4fc3f7":"#90a4ae",ph?"#fff":"#4fc3f7",ph?"#e1f5fe":"#546e7a",
 `<path d="M60 18l-8-14 12 8zM70 12l0-12 8 10z" fill="#e1f5fe" stroke="#4fc3f7"/>`+(ph?`<path d="M18 80Q4 50 28 40Q24 62 40 70Z" fill="#b3e5fc" opacity=".8" stroke="#e1f5fe"/>`+ICE:`<path d="M40 100l-14-6 4 14zM56 80l-12-12 0 14zM66 60l-6-14 10 6z" fill="#cfd8dc" stroke="#546e7a"/>`))}
 ${[[100,44,0],[20,30,.5]].map(p=>`<ellipse class="fl2" style="animation-delay:${p[2]}s" cx="${p[0]}" cy="${p[1]}" rx="6" ry="4" fill="#e1f5fe" opacity=".6"/>`).join("")}`,50),
// 13 Blutrosen-Gräfin
ph=>BSV(`<path d="M30 150Q38 100 46 72H78Q86 100 94 150Z" fill="#880e4f" stroke="#3a0020"/><path d="M38 150Q46 110 54 80M86 150Q78 110 70 80" stroke="#ad1457" fill="none"/>
 ${[[40,140],[60,146],[84,140],[50,124],[74,122]].map(r=>`<circle cx="${r[0]}" cy="${r[1]}" r="4" fill="#e91e63"/><circle cx="${r[0]}" cy="${r[1]}" r="2" fill="#880e4f"/>`).join("")}
 <g class="br"><path d="M46 72Q62 64 78 72L76 90Q62 96 48 90Z" fill="#c2185b" stroke="#3a0020"/>
 ${limbB("M48 76Q34 90 30 104","#f3d6d6",5)}${limbB("M76 76Q92 82 100 92","#f3d6d6",5)}
 <path class="sway" d="M100 92Q118 110 108 132Q100 146 112 154" stroke="#33691e" stroke-width="2.5" fill="none"/>${[[106,104],[114,120],[106,140]].map(p=>`<path d="M${p[0]} ${p[1]}l4-2" stroke="#33691e" stroke-width="1.5"/>`).join("")}
 <rect x="58" y="58" width="8" height="10" fill="#f3d6d6"/><ellipse cx="62" cy="46" rx="12" ry="14" fill="#f3d6d6" stroke="#0003"/>
 <path d="M48 46Q46 20 62 20Q78 20 76 46Q80 66 84 74Q70 56 62 58Q54 56 40 74Q44 66 48 46Z" fill="#1a0008"/><ellipse cx="62" cy="46" rx="11" ry="13" fill="#f3d6d6"/>
 <path d="M56 44l3 1M65 45l3-1" stroke="#000" stroke-width="1.5"/><circle class="glow" cx="57" cy="46" r="1.3" fill="#ff1744"/><circle class="glow" cx="67" cy="46" r="1.3" fill="#ff1744"/><path d="M59 53q3 2 6 0" stroke="#b71c1c" stroke-width="2" fill="none"/>
 ${[50,58,66,74].map((x,i)=>`<circle cx="${x}" cy="${24-(i%3?2:0)}" r="4" fill="#e91e63" stroke="#880e4f"/>`).join("")}</g>
 ${Array.from({length:4},(_,i)=>`<ellipse class="dr" style="animation-delay:${i*.35}s;animation-duration:2.6s" cx="${24+i*24}" cy="${20+i*8}" rx="2.5" ry="1.6" fill="#e91e63"/>`).join("")}`,38),
// 14 Knochenkönig Ossarion
ph=>BSV(`<path class="wv" d="M42 62Q20 110 26 150L56 124Z" fill="#311b92" stroke="#0006"/>
 <path d="M48 110l-4 36M76 110l4 36" stroke="#e0e0e0" stroke-width="6" stroke-linecap="round"/><path d="M38 146h12M74 146h12" stroke="#e0e0e0" stroke-width="5" stroke-linecap="round"/>
 <g class="br"><path d="M46 60h32l-2 46H48Z" fill="none"/>${[64,72,80,88].map(y=>`<path d="M46 ${y}q16 4 32 0" stroke="#e0e0e0" stroke-width="3" fill="none"/>`).join("")}<path d="M62 58v50" stroke="#e0e0e0" stroke-width="4"/>
 <path d="M48 104q14 8 28 0" stroke="#e0e0e0" stroke-width="4" fill="none"/>
 ${limbB("M46 62Q34 84 38 102","#e0e0e0",4)}${limbB("M78 62Q94 76 98 92","#e0e0e0",4)}
 <path d="M96 94l10-40 8 2-6 40z" fill="#d7ccc8" stroke="#5d4037"/><circle cx="110" cy="50" r="9" fill="#e0e0e0" stroke="#5d4037"/><circle cx="107" cy="49" r="2" fill="#333"/><circle cx="113" cy="49" r="2" fill="#333"/>
 <path d="M48 46Q46 22 62 20Q78 22 76 46Q74 58 62 60Q50 58 48 46Z" fill="#eeeeee" stroke="#9e9e9e"/>
 <ellipse cx="55" cy="40" rx="4.5" ry="5" fill="#111"/><ellipse cx="69" cy="40" rx="4.5" ry="5" fill="#111"/><circle class="glow" cx="55" cy="41" r="1.8" fill="#69f0ae"/><circle class="glow" cx="69" cy="41" r="1.8" fill="#69f0ae"/>
 <path d="M60 48l2-4 2 4z" fill="#111"/><path d="M54 54h16M57 52v4M62 52v4M67 52v4" stroke="#555"/>
 <path d="M46 24l2-14 7 8 7-12 7 12 7-8 2 14z" fill="#ffd54f" stroke="#b8860b"/><circle cx="62" cy="14" r="2.4" fill="#e53935"/></g>`,40),
// 15 Schmiedetitan Ambossar (Phase 2: Rüstung glüht)
ph=>{const a=ph?"#ff8f00":"#5d4037",l=ph?"#fff176":"#ff6f00";return BSV(`${ph?`<circle class="pl" cx="62" cy="86" r="62" fill="#ff6d00" opacity=".3"/>`:""}<rect x="40" y="112" width="18" height="34" rx="3" fill="${a}" stroke="#1b0f0a"/><rect x="66" y="112" width="18" height="34" rx="3" fill="${a}" stroke="#1b0f0a"/>
 <path d="M36 144h24v8h-26zM64 144h24l2 8h-26z" fill="#3e2723"/>
 <g class="br">${limbB("M32 64Q18 88 24 108","#8d6e63",13)}<circle cx="24" cy="110" r="8" fill="#a1887f" stroke="#0005"/>
 <path d="M28 58Q62 44 96 58L90 116H34Z" fill="${a}" stroke="#1b0f0a" stroke-width="2"/><path class="tw" d="M44 70l10 12-6 10 12 14M80 66l-8 14 8 8" stroke="${l}" stroke-width="2.5" fill="none" style="filter:drop-shadow(0 0 3px ${l})"/>
 <rect x="32" y="104" width="60" height="8" fill="#3e2723"/><rect x="56" y="102" width="12" height="12" fill="#c9a227" stroke="#3e2723"/>
 <circle cx="62" cy="36" r="17" fill="#a1887f" stroke="#0005"/><path d="M45 38Q46 66 62 72Q78 66 79 38Q72 50 62 50Q52 50 45 38Z" fill="${l}" style="filter:drop-shadow(0 0 4px ${l})"/>${fm(55,62,.5,"#ffd54f",0)}${fm(69,62,.5,"#ffd54f",.2)}
 <path d="M50 30l7 3M74 30l-7 3" stroke="#3e2723" stroke-width="2.5"/><circle class="glow" cx="55" cy="35" r="2" fill="${l}"/><circle class="glow" cx="69" cy="35" r="2" fill="${l}"/>
 ${limbB("M92 62Q104 76 102 96","#8d6e63",13)}<path d="M98 100V30" stroke="#5d4037" stroke-width="6"/><rect x="82" y="12" width="34" height="24" rx="3" fill="#455a64" stroke="#1c262b" stroke-width="2"/><circle cx="102" cy="98" r="8" fill="#a1887f" stroke="#0005"/>
 ${ph?fm(90,14,.8,"#ff6d00",0)+fm(108,14,.8,"#ffd54f",.2):""}</g>`,46)},
// 16 Die Spiegelkönigin
ph=>BSV(`<path d="M32 150Q40 100 48 70H76Q84 100 92 150Z" fill="#b0bec5" stroke="#546e7a"/>${[[44,130],[62,112],[80,132],[54,92],[70,96]].map(p=>`<polygon points="${p[0]},${p[1]-8} ${p[0]+6},${p[1]} ${p[0]},${p[1]+8} ${p[0]-6},${p[1]}" fill="#e3f2fd" stroke="#90a4ae"/>`).join("")}
 <g class="br"><path d="M48 70Q62 62 76 70L74 88Q62 94 50 88Z" fill="#cfd8dc" stroke="#546e7a"/>${limbB("M50 74Q38 88 34 100","#eceff1",5)}${limbB("M74 74Q86 82 92 90","#eceff1",5)}
 <ellipse cx="102" cy="84" rx="16" ry="22" fill="#c9a227" stroke="#5d4a2c" stroke-width="2"/><ellipse cx="102" cy="84" rx="12" ry="18" fill="#9fa8da"/><path class="pl" d="M96 72l8-4 2 4-8 16z" fill="#fff" opacity=".8"/>
 <ellipse cx="62" cy="46" rx="12" ry="15" fill="#eceff1" stroke="#90a4ae"/><path d="M56 44h4M64 44h4" stroke="#455a64" stroke-width="1.6"/><circle class="glow" cx="58" cy="45" r="1.3" fill="#40c4ff"/><circle class="glow" cx="66" cy="45" r="1.3" fill="#40c4ff"/>
 <path d="M50 30l4-16 6 10 2-14 2 14 6-10 4 16z" fill="#e3f2fd" stroke="#90a4ae"/>${ST(62,12,"#fff",0)}${ST(30,30,"#e3f2fd",.4)}${ST(20,90,"#fff",.8)}</g>`,38),
// 17 Albtraumweber (Phase 2: Maske zerbrochen, viele Augen)
ph=>BSV(`${[[-1,0],[1,0],[-1,1],[1,1]].map(([s,k])=>`<path class="sway" style="animation-delay:${k*.4}s" d="M${62+s*14} ${96+k*8}Q${62+s*46} ${70+k*16} ${62+s*52} ${148-k*4}" stroke="#1a0f2a" stroke-width="5" fill="none" stroke-linecap="round"/>`).join("")}
 <path d="M20 20L62 70L104 20M10 70H114M30 120L62 70L94 120" stroke="#e1bee7" stroke-width=".8" fill="none" opacity=".5"/>
 <g class="br"><ellipse cx="62" cy="104" rx="26" ry="22" fill="#2a1540" stroke="#7c4dff"/><path d="M48 98q14 10 28 0" stroke="#7c4dff" fill="none"/>
 <ellipse cx="62" cy="64" rx="18" ry="20" fill="#311b4a" stroke="#7c4dff"/>
 <path d="M48 50Q62 36 76 50Q78 70 62 80Q46 70 48 50Z" fill="${ph?"#4a148c":"#f3e5f5"}" stroke="#7c4dff"/>
 ${ph?[[55,56],[69,56],[62,48],[56,66],[68,66],[62,72]].map(p=>`<circle class="glow" cx="${p[0]}" cy="${p[1]}" r="2.6" fill="#ff1744"/>`).join("")+`<path d="M62 40l-4 14 6 8-4 12" stroke="#000" stroke-width="2" fill="none"/>`:`<path d="M54 56q3-3 6 0M64 56q3-3 6 0" stroke="#311b4a" stroke-width="2" fill="none"/><path d="M56 68q6 4 12 0" stroke="#311b4a" fill="none"/>`}</g>
 ${SMOKE(ph?"#ff1744":"#b39ddb")}`,46),
// 18 Sternenseher Astralon
ph=>BSV(`<g class="rot" style="animation-duration:14s"><ellipse cx="62" cy="80" rx="56" ry="56" fill="none" stroke="#c9a227" stroke-width="1.5" stroke-dasharray="6 6" opacity=".7"/></g>
 <path class="wv" d="M38 64Q26 120 30 150H94Q98 120 86 64Z" fill="#1a237e" stroke="#0d1240"/>${[[44,90],[76,104],[56,132],[82,138],[50,116]].map((p,i)=>ST(p[0],p[1],"#fff59d",i*.3)).join("")}
 <g class="br">${limbB("M40 70Q28 88 32 104","#1a237e",8)}<circle cx="32" cy="106" r="5" fill="#e0c09a"/>
 <circle cx="62" cy="44" r="14" fill="#e0c09a" stroke="#0004"/><path d="M48 46Q50 80 62 86Q74 80 76 46Q70 56 62 56Q54 56 48 46Z" fill="#eceff1"/>
 <path d="M54 42h5M65 42h5" stroke="#555" stroke-width="2"/><path d="M40 36Q62 -10 84 36Z" fill="#283593" stroke="#0d1240"/>${ST(62,18,"#fff59d",.2)}
 ${limbB("M84 70Q96 80 98 96","#1a237e",8)}<path d="M100 150V20" stroke="#8d6e63" stroke-width="4"/><circle cx="100" cy="98" r="5" fill="#e0c09a"/>
 <circle class="glow" cx="100" cy="16" r="9" fill="#fff59d" style="filter:drop-shadow(0 0 6px #fff59d)"/>${ST(100,16,"#fff",0)}</g>`,40),
// 19 Urdrache Aurelion (Phase 2: Flügel gespreizt, Feuer)
ph=>BSV(`${ph?`<g class="flap"><path d="M40 70Q-4 20 4 90Q16 76 22 92Q30 78 40 92Z" fill="#ffb300" stroke="#8d6e00"/></g><g class="flap r"><path d="M84 70Q128 24 124 90Q112 76 106 92Q98 78 88 92Z" fill="#ffb300" stroke="#8d6e00"/></g>`:`<path d="M44 80Q20 60 18 100L40 96Z" fill="#c9a227" stroke="#8d6e00"/>`}
 <ellipse cx="62" cy="150" rx="50" ry="8" fill="#ffd54f" opacity=".5"/>${Array.from({length:8},(_,i)=>`<ellipse cx="${20+i*12}" cy="${148+(i%2)*3}" rx="5" ry="2.5" fill="#ffd54f" stroke="#8d6e00"/>`).join("")}
 ${WYRM("#d4a017","#ff1744","#8d6e00",`<path d="M60 16l-10-14 14 8zM70 10l0-12 10 10z" fill="#8d6e00"/>`+(ph?fm(110,44,.9,"#ff6d00",0)+fm(116,52,.7,"#ffd54f",.15):""))}`,50),
// 20 Der Turmherr (Phase 2: entfesselt, Krone in Flammen)
ph=>BSV(`${ph?`<circle class="pl" cx="62" cy="80" r="64" fill="#7c4dff" opacity=".35"/>`:""}<path class="wv" d="M38 60Q10 110 18 152L58 128Z" fill="#4a148c" stroke="#0006"/><path class="wv" d="M86 60Q114 110 106 152L66 128Z" fill="#4a148c" stroke="#0006" style="animation-delay:.4s"/>
 <rect x="44" y="108" width="15" height="38" rx="3" fill="#37474f"/><rect x="65" y="108" width="15" height="38" rx="3" fill="#37474f"/><path d="M40 144h22v8h-24zM62 144h22l2 8h-24z" fill="#1c262b"/>
 <g class="br">${limbB("M38 64Q24 86 30 104","#455a64",10)}<circle cx="30" cy="106" r="6" fill="#90a4ae"/>
 <path d="M34 58Q62 46 90 58L86 110H38Z" fill="#455a64" stroke="#1c262b" stroke-width="2"/><path d="M62 58v52M40 84h44" stroke="#c9a227" stroke-width="2"/><circle cx="62" cy="80" r="8" fill="#c9a227" stroke="#5d4a2c"/><circle class="glow" cx="62" cy="80" r="4" fill="${ph?"#ff1744":"#7c4dff"}"/>
 <path d="M44 40Q44 20 62 18Q80 20 80 40V54H44Z" fill="#37474f" stroke="#1c262b" stroke-width="2"/><rect class="glow" x="50" y="36" width="24" height="5" rx="2" fill="${ph?"#ff1744":"#b388ff"}" style="filter:drop-shadow(0 0 4px ${ph?"#ff1744":"#7c4dff"})"/>
 <path d="M42 22l4-16 8 10 8-14 8 14 8-10 4 16z" fill="#ffd54f" stroke="#b8860b"/>${[50,62,74].map(x=>`<circle cx="${x}" cy="16" r="2" fill="#e53935"/>`).join("")}${ph?fm(50,8,.6,"#7c4dff",0)+fm(62,4,.7,"#e040fb",.15)+fm(74,8,.6,"#7c4dff",.3):""}
 ${limbB("M86 64Q100 80 100 98","#455a64",10)}<path d="M100 150V24" stroke="#c9a227" stroke-width="4"/><circle cx="100" cy="100" r="6" fill="#90a4ae"/><circle class="glow" cx="100" cy="20" r="8" fill="${ph?"#ff1744":"#7c4dff"}" style="filter:drop-shadow(0 0 6px #e040fb)"/>${ST(100,20,"#fff",0)}</g>`,44));
// ---- Turm-Ebenen 9–20 (Etagen 41–100), Stil wie TBGS in art.js ----
const gear=(x,y,r,n,c,d,rev)=>`<g class="rot" style="animation-duration:${d}s;${rev?"animation-direction:reverse":""}"><polygon points="${Array.from({length:n*4},(_,k)=>{const a=k*Math.PI/(n*2),q=k%4<2?r:r*.82;return (x+q*Math.cos(a)).toFixed(1)+","+(y+q*Math.sin(a)).toFixed(1)}).join(" ")}" fill="${c}" stroke="#0006"/><circle cx="${x}" cy="${y}" r="${r*.55}" fill="none" stroke="#0004" stroke-width="${r*.12}"/><circle cx="${x}" cy="${y}" r="${r*.18}" fill="#1a1208"/></g>`;
const DOTS=(n,c,cls,ymax,sz)=>Array.from({length:n},(_,i)=>`<circle class="${cls}" style="animation-delay:${(i*.37)%2.4}s" cx="${(i*89+31)%600}" cy="${(i*53+17)%(ymax||180)}" r="${sz?sz*(i%3?1:1.6):i%3?1:1.8}" fill="${c}"/>`).join("");
TBGS.push(
// 8 Uhrwerkkammern
()=>SV(LG("t8","#1c130a","#4a3418")+RG("t8g","#ffca28"),`<rect width="600" height="220" fill="url(#t8)"/>
 ${gear(60,60,52,10,"#8d6e3a",14)}${gear(180,80,40,9,"#a1793a",11,1)}${gear(236,140,24,7,"#b8860b",7)}${gear(420,64,44,9,"#a1793a",12,1)}${gear(500,140,30,8,"#8d6e3a",9)}${gear(300,30,24,7,"#c9a227",6)}
 <path d="M0 150H220V160H0ZM380 100H600V110H380Z" fill="#5d4a2c" stroke="#0005"/><path d="M220 150V40H230V150ZM380 100V0H390V100Z" fill="#6d5a34"/>
 ${[[225,40],[385,100]].map((p,i)=>`<ellipse class="fl2" style="animation-delay:${i*.8}s" cx="${p[0]}" cy="${p[1]-8}" rx="8" ry="6" fill="#eee" opacity=".35"/>`).join("")}
 <g class="sway" style="animation-duration:1s"><path d="M300 54V130" stroke="#c9a227" stroke-width="3"/><circle cx="300" cy="136" r="10" fill="#c9a227" stroke="#5d4a2c"/></g>
 <circle class="pl" cx="300" cy="120" r="80" fill="url(#t8g)" opacity=".5"/>
 ${floor("#3a2c18","#c9a22733")}${[90,210,330,450,570].map(x=>`<circle cx="${x}" cy="196" r="2" fill="#c9a227"/>`).join("")}`),
// 9 Versunkene Bibliothek
()=>SV(LG("t9","#03202a","#0b4a52")+RG("t9g","#80deea"),`<rect width="600" height="220" fill="url(#t9)"/>
 ${[20,140,400,520].map(x=>`<rect x="${x}" y="30" width="80" height="158" fill="#2b1d12" stroke="#0006"/>${[0,1,2,3].map(r=>`<path d="M${x} ${66+r*36}h80" stroke="#1a1008" stroke-width="5"/>`+Array.from({length:9},(_,k)=>`<rect x="${x+4+k*8.4}" y="${40+r*36+(k*7)%6}" width="6" height="${24-(k*7)%6}" fill="${["#8b1e1e","#1e5b8b","#2e7d32","#6d4c41","#b8860b"][(k+r+x)%5]}" opacity=".85"/>`).join("")).join("")}`).join("")}
 <path d="M240 0L200 188H400L360 0Z" fill="#b2ebf2" opacity=".08"/><path d="M270 0L250 188H330L310 0Z" fill="#e0f7fa" opacity=".08"/>
 ${[[260,70,0],[330,110,.8],[300,40,1.6]].map(b=>`<g class="hov" style="animation-delay:${b[2]}s"><path d="M${b[0]} ${b[1]}l16-6 16 6v14l-16-6-16 6z" fill="#efe3c6" stroke="#5d4037"/><path d="M${b[0]+16} ${b[1]-6}v14" stroke="#5d4037"/></g>`).join("")}
 ${DOTS(16,"#b2ebf2","fl2",190,1.4)}<circle class="pl" cx="300" cy="100" r="120" fill="url(#t9g)" opacity=".3"/>
 ${floor("#123a40","#80deea22")}<path d="M0 205Q150 196 300 205T600 205" stroke="#80deea" stroke-width="1" fill="none" opacity=".4"/>`),
// 10 Pilzgrotte
()=>SV(LG("t10","#0a1408","#2a3a1a")+RG("t10g","#b2ff59"),`<rect width="600" height="220" fill="url(#t10)"/>
 <path d="M0 0H600V24L560 50L530 20L480 60L440 24L400 46L350 18L300 50L250 22L200 52L150 20L100 48L50 22L0 40Z" fill="#141f0c"/>
 ${[[60,188,40,"#7cb342"],[170,188,30,"#ab47bc"],[430,188,44,"#26a69a"],[540,188,30,"#7cb342"],[300,188,20,"#ab47bc"],[230,188,14,"#26a69a"]].map((m,i)=>`<circle class="pl" style="animation-delay:${i*.4}s" cx="${m[0]}" cy="${m[1]-m[2]*1.6}" r="${m[2]*1.6}" fill="url(#t10g)" opacity=".35"/><path d="M${m[0]-m[2]*.2} ${m[1]}q${m[2]*.1} ${-m[2]} ${m[2]*.05} ${-m[2]*1.4}h${m[2]*.3}q${-m[2]*.05} ${m[2]*.4} ${m[2]*.05} ${m[2]*1.4}z" fill="#e8e0c8"/><path d="M${m[0]-m[2]} ${m[1]-m[2]*1.3}Q${m[0]} ${m[1]-m[2]*2.6} ${m[0]+m[2]} ${m[1]-m[2]*1.3}Z" fill="${m[3]}" stroke="#0005"/>${[-.5,0,.5].map(k=>`<circle cx="${m[0]+k*m[2]}" cy="${m[1]-m[2]*1.6+Math.abs(k)*m[2]*.3}" r="${m[2]*.09}" fill="#fff" opacity=".7"/>`).join("")}`).join("")}
 ${DOTS(18,"#ccff90","fl2",170,1.2)}
 ${floor("#1e2a12","#b2ff5922")}`),
// 11 Gefrorene Gruft
()=>SV(LG("t11","#06121e","#24435c")+RG("t11g","#b3e5fc"),`<rect width="600" height="220" fill="url(#t11)"/>${bricks("#b3e5fc18",6)}
 <path d="M0 0H600V8${Array.from({length:30},(_,i)=>`L${i*20+10} ${18+(i*13)%22}L${i*20+20} 8`).join("")}V0Z" fill="#e1f5fe" opacity=".85"/>
 ${[[180,0],[420,.5]].map(s=>`<g><path d="M${s[0]-50} 188v-34l10-10h80l10 10v34z" fill="#546e7a" stroke="#263238"/><path d="M${s[0]-40} 150h80" stroke="#90a4ae"/><path d="M${s[0]-6} 146v-24h12v24M${s[0]-14} 130h28" fill="#b0bec5" stroke="#263238"/><path d="M${s[0]-52} 156q20-8 40 0t40 0t22 0" stroke="#e1f5fe" stroke-width="4" fill="none"/></g>`).join("")}
 <circle class="pl" cx="300" cy="110" r="100" fill="url(#t11g)" opacity=".35"/><path d="M276 140V90Q300 66 324 90V140Z" fill="#0a1a28" stroke="#81d4fa"/>
 ${Array.from({length:14},(_,i)=>`<path class="dr" style="animation-delay:${(i*.31)%1.4}s;animation-duration:${2.4+(i%3)*.6}s" d="M${(i*43+20)%600} ${(i*29)%60}m-3 0h6m-3-3v6" stroke="#fff" stroke-width="1.4"/>`).join("")}
 ${floor("#3a5266","#e1f5fe33")}`),
// 12 Blutrosengarten
()=>SV(LG("t12","#12030a","#4a0e24")+RG("t12g","#ff1744"),`<rect width="600" height="220" fill="url(#t12)"/>
 <circle cx="470" cy="50" r="28" fill="#ffcdd2"/><circle cx="460" cy="44" r="28" fill="#2a0612" opacity=".25"/>
 <path d="M0 188V120Q40 96 80 118Q120 90 170 116Q210 96 250 120V188ZM350 188V124Q390 98 430 120Q480 92 520 118Q560 100 600 116V188Z" fill="#1b2a14" stroke="#0a1208"/>
 <path d="M10 150q20-20 40 0t40 0t40 0t40 0M360 150q20-20 40 0t40 0t40 0t40 0t40 0" stroke="#3e2723" stroke-width="2" fill="none"/>
 ${[[40,130],[100,118],[150,140],[210,126],[380,132],[440,120],[500,140],[560,124],[70,160],[470,162]].map((r,i)=>`<g class="pl" style="animation-delay:${i*.2}s"><circle cx="${r[0]}" cy="${r[1]}" r="7" fill="#c2185b"/><circle cx="${r[0]}" cy="${r[1]}" r="4" fill="#880e4f"/><path d="M${r[0]-2} ${r[1]-1}q2-3 4 0" stroke="#f48fb1" fill="none"/></g>`).join("")}
 <path d="M280 188V130h40v58" fill="#2a1a1a"/><path d="M270 130h60l-30-26z" fill="#3e2723"/>
 ${Array.from({length:10},(_,i)=>`<ellipse class="dr" style="animation-delay:${(i*.43)%1.4}s;animation-duration:3s" cx="${(i*61+40)%600}" cy="${(i*37)%90}" rx="3" ry="2" fill="#e91e63"/>`).join("")}
 <ellipse class="pl" cx="300" cy="200" rx="320" ry="26" fill="url(#t12g)" opacity=".35"/>${floor("#2a0a14","#ff174422")}`),
// 13 Knochengruft
()=>SV(LG("t13","#0c0a08","#2e2820")+RG("t13g","#ffcc80"),`<rect width="600" height="220" fill="url(#t13)"/>${bricks("#00000040",4)}
 ${[0,1,2].map(r=>Array.from({length:12},(_,k)=>{const x=24+k*50+(r%2)*25,y=34+r*46;return `<path d="M${x-14} ${y+16}V${y}Q${x} ${y-16} ${x+14} ${y}V${y+16}Z" fill="#120e0a"/><circle cx="${x}" cy="${y+6}" r="7" fill="#d7ccc8"/><circle cx="${x-2.5}" cy="${y+5}" r="1.6" fill="#120e0a"/><circle cx="${x+2.5}" cy="${y+5}" r="1.6" fill="#120e0a"/><rect x="${x-3}" y="${y+11}" width="6" height="3" fill="#d7ccc8"/>`}).join("")).join("")}
 ${[[150,170],[300,176],[450,170]].map((c,i)=>`<circle class="pl" cx="${c[0]}" cy="${c[1]-16}" r="44" fill="url(#t13g)" opacity=".5"/><rect x="${c[0]-4}" y="${c[1]-14}" width="8" height="18" fill="#efe6d0"/>${fm(c[0],c[1]-14,.5,"#ffb74d",i*.2)}`).join("")}
 <g fill="#d7ccc8" stroke="#8d6e63"><path d="M40 188l40-10 4 4-40 10zM60 186l30 2 0 4-30-2zM520 188l40-12 3 4-40 12z"/><circle cx="96" cy="182" r="7"/><circle cx="508" cy="180" r="6"/></g>
 ${floor("#3a3026","#00000040")}`),
// 14 Himmelsschmiede
()=>SV(LG("t14","#1e3a6e","#f6b26b")+RG("t14g","#ff9100"),`<rect width="600" height="220" fill="url(#t14)"/>
 ${[[30,-20],[60,-55],[100,-80]].map((c,i)=>`<g class="cl" style="animation-delay:${c[1]}s;animation-duration:${50+i*15}s"><g fill="#fff" opacity=".85"><ellipse cx="0" cy="${c[0]+40}" rx="70" ry="16"/><ellipse cx="-26" cy="${c[0]+30}" rx="34" ry="16"/><ellipse cx="24" cy="${c[0]+28}" rx="36" ry="18"/></g></g>`).join("")}
 <path d="M0 220V170Q60 150 120 166Q200 140 300 160Q400 140 480 166Q540 150 600 170V220Z" fill="#fff" opacity=".9"/>
 <path d="M150 188l20-30h260l20 30z" fill="#6d5a34" stroke="#3e2723"/><path d="M200 158V110h40v48M360 158V100h50v58" fill="#4e342e" stroke="#2a1a10"/>
 <circle class="pl" cx="385" cy="96" r="60" fill="url(#t14g)" opacity=".6"/>${fm(385,100,1.2,"#ff6d00",0)}${fm(385,100,.7,"#ffd54f",.1)}
 <path d="M260 158h70v-8h-20v-14h30v-8h-90v8h30v14h-20z" fill="#455a64" stroke="#1c262b"/>
 ${Array.from({length:10},(_,i)=>`<circle class="fl2" style="animation-delay:${i*.23}s" cx="${280+(i*13)%60}" cy="${126-(i*7)%20}" r="1.6" fill="#ffd54f"/>`).join("")}
 <path d="M0 188H600V220H0Z" fill="#e8eef5" opacity=".7"/>`),
// 15 Spiegelsaal
()=>SV(LG("t15","#140c22","#3b2c4e")+RG("t15g","#e1bee7"),`<rect width="600" height="220" fill="url(#t15)"/>
 ${[60,180,300,420,540].map((x,i)=>`<path d="M${x-34} 180V64Q${x} 20 ${x+34} 64V180Z" fill="#c9a227" stroke="#5d4a2c"/><path d="M${x-28} 176V66Q${x} 30 ${x+28} 66V176Z" fill="#9fa8da" opacity=".55"/><path class="pl" style="animation-delay:${i*.3}s" d="M${x-18} 70l12-10 4 4-14 40zM${x+6} 120l12-14 3 3-12 20z" fill="#fff" opacity=".6"/>`).join("")}
 <g class="sway" style="animation-duration:4s"><path d="M300 0v26" stroke="#c9a227" stroke-width="2"/><path d="M270 30h60l-8 10h-44z" fill="#c9a227"/>${[276,290,310,324].map(x=>`<circle class="tw" cx="${x}" cy="44" r="2.5" fill="#fff59d"/>`).join("")}</g>
 <circle class="pl" cx="300" cy="110" r="140" fill="url(#t15g)" opacity=".25"/>
 <path d="M0 188H600V220H0Z" fill="#2a1f38"/><path d="M0 188H600" stroke="#e1bee7" stroke-width="1.5"/>
 <g opacity=".25" transform="translate(0 376) scale(1 -1)">${[60,180,300,420,540].map(x=>`<path d="M${x-28} 188V176H${x+28}V188Z" fill="#9fa8da"/>`).join("")}</g>${DOTS(8,"#fff","tw",180)}`),
// 16 Traumgefilde
()=>SV(LG("t16","#2a1b4e","#f8bbd0")+RG("t16g","#ffffff"),`<rect width="600" height="220" fill="url(#t16)"/>${DOTS(20,"#fff","tw",120)}
 <circle cx="110" cy="50" r="22" fill="#fffde7"/><circle cx="120" cy="44" r="20" fill="#3b2a5e" opacity=".9"/>
 <g class="rot" style="animation-duration:30s"><path d="M300 90m-60 0a60 60 0 1 1 120 0a48 48 0 1 1 -96 0a36 36 0 1 1 72 0a24 24 0 1 1 -48 0" stroke="#fff" stroke-width="2" fill="none" opacity=".35"/></g>
 ${[[460,90,46,0],[180,120,30,.8],[540,40,22,1.5]].map(s=>`<g class="hov" style="animation-delay:${s[3]}s"><path d="M${s[0]-s[2]} ${s[1]}h${s[2]*2}l${-s[2]*.4} ${s[2]*.7}l${-s[2]*.6} ${s[2]*.4}l${-s[2]*.6} ${-s[2]*.3}z" fill="#7e57c2" stroke="#4527a0"/><path d="M${s[0]-s[2]} ${s[1]}h${s[2]*2}" stroke="#a5d6a7" stroke-width="5"/><path d="M${s[0]} ${s[1]-2}v${-s[2]*.6}" stroke="#5d4037" stroke-width="3"/><circle cx="${s[0]}" cy="${s[1]-s[2]*.7}" r="${s[2]*.35}" fill="#f48fb1"/></g>`).join("")}
 <circle class="pl" cx="300" cy="200" r="160" fill="url(#t16g)" opacity=".2"/>
 <path d="M0 188Q100 176 200 188T400 188T600 188V220H0Z" fill="#ce93d8"/><path d="M0 200Q100 190 200 200T400 200T600 200" stroke="#fff" fill="none" opacity=".5"/>`),
// 17 Sternwarte
()=>SV(LG("t17","#02030c","#141a40")+RG("t17g","#9fa8ff"),`<rect width="600" height="220" fill="url(#t17)"/>${DOTS(40,"#fff","tw",180)}
 <path d="M80 40L130 60L170 30L220 70M380 30L420 60L470 50L500 90L460 110" stroke="#9fa8ff" stroke-width="1" fill="none" opacity=".6"/>
 <path class="tw" d="M520 20l-60 40" stroke="#fff" stroke-width="2" opacity=".7"/>
 <g class="rot" style="animation-duration:40s"><circle cx="300" cy="80" r="56" fill="none" stroke="#c9a227" stroke-width="2"/><circle cx="300" cy="80" r="40" fill="none" stroke="#c9a227" stroke-dasharray="4 6"/><path d="M244 80h112M300 24v112" stroke="#c9a227"/></g><circle class="pl" cx="300" cy="80" r="16" fill="url(#t17g)"/>
 <g><path d="M120 188l30-60h20l30 60z" fill="#37474f"/><path d="M160 130l120-70 10 16-120 70z" fill="#b8860b" stroke="#5d4a2c"/><circle cx="283" cy="66" r="10" fill="#1a237e" stroke="#b8860b" stroke-width="3"/></g>
 <path d="M440 188V140Q500 96 560 140V188Z" fill="#263238"/><path d="M492 110h16v78h-16z" fill="#02030c"/>
 <path d="M0 188H600V220H0Z" fill="#1c2033"/><path d="M0 188H600" stroke="#9fa8ff55" stroke-width="2"/>`),
// 18 Goldener Hort
()=>SV(LG("t18","#120a02","#4a3008")+RG("t18g","#ffd54f"),`<rect width="600" height="220" fill="url(#t18)"/>${bricks("#00000040",8)}
 <circle class="pl" cx="300" cy="200" r="220" fill="url(#t18g)" opacity=".35"/>
 <path d="M0 188Q60 120 140 150Q200 110 260 160Q330 100 400 150Q470 120 520 140Q570 130 600 160V188Z" fill="#d4a017" stroke="#8d6e00"/>
 ${Array.from({length:40},(_,i)=>{const x=(i*47+12)%600,y=150+(i*13)%34;return `<ellipse cx="${x}" cy="${y}" rx="6" ry="3" fill="${i%3?"#ffd54f":"#ffb300"}" stroke="#8d6e00"/>`}).join("")}
 <path d="M90 150h50v30h-50z" fill="#6d4c41" stroke="#3e2723"/><path d="M90 150q25-24 50 0" fill="#8d6e63" stroke="#3e2723"/><rect x="110" y="156" width="10" height="8" fill="#ffd54f"/>
 <path d="M440 140l14-30 14 30-14 8z" fill="#e53935" stroke="#7f0000"/><path d="M340 120l10-20 10 20-10 6z" fill="#1e88e5" stroke="#0d47a1"/><path d="M200 150v-20l12-8 12 8v20" fill="#c9a227" stroke="#5d4a2c"/>
 ${[[80,90],[240,60],[400,80],[520,50],[320,130],[160,120]].map((p,i)=>ST(p[0],p[1],"#fff8e1",i*.3)).join("")}
 <g class="blink" style="animation-duration:6s"><ellipse cx="520" cy="60" rx="14" ry="8" fill="#ffab00"/><ellipse cx="520" cy="60" rx="2.5" ry="7" fill="#000"/></g>
 <path d="M0 188H600V220H0Z" fill="#8d6e00"/><path d="M0 188H600" stroke="#ffd54f" stroke-width="2"/>`),
// 19 Turmkrone
()=>SV(LG("t19","#1a2a6c","#fdbb2d")+RG("t19g","#fff3e0"),`<rect width="600" height="220" fill="url(#t19)"/>
 <g class="rot" style="animation-duration:60s">${Array.from({length:12},(_,i)=>`<path d="M300 120L${300+400*Math.cos(i*Math.PI/6)} ${120+400*Math.sin(i*Math.PI/6)}L${300+400*Math.cos(i*Math.PI/6+.12)} ${120+400*Math.sin(i*Math.PI/6+.12)}Z" fill="#fff" opacity=".07"/>`).join("")}</g>
 <circle class="pl" cx="300" cy="130" r="70" fill="url(#t19g)"/><circle cx="300" cy="130" r="30" fill="#fff8e1"/>
 ${[[40,-30],[80,-70]].map((c,i)=>`<g class="cl" style="animation-delay:${c[1]}s;animation-duration:${70+i*20}s"><g fill="#fff" opacity=".8"><ellipse cx="0" cy="${c[0]+60}" rx="80" ry="14"/><ellipse cx="-30" cy="${c[0]+50}" rx="36" ry="14"/></g></g>`).join("")}
 <path d="M0 188V150h40v-20h30v20h40v-20h30v20h40v-20h30v20h180v-20h30v20h40v-20h30v20h40v-20h30v20h40V188Z" fill="#8d8170" stroke="#3e3a34"/>
 ${[55,125,195,405,475,545].map((x,i)=>`<path d="M${x} 130V70" stroke="#5d4037" stroke-width="3"/><path class="wv" style="animation-delay:${i*.3}s" d="M${x} 72h34l-8 10 8 10h-34z" fill="${i%2?"#c9a227":"#7b1fa2"}"/>`).join("")}
 <path d="M0 188H600V220H0Z" fill="#6d6455"/><path d="M0 188H600" stroke="#ffd54f" stroke-width="2"/>`));
