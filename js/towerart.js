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
ph=>KX(knight(S.w,S.a,S.es?3:S.s,true,"#4a148c",eq("w")?eq("w").c:null,eq("a")?eq("a").c:null,S.ew,S.ea,S.sex==="f",undefined,eqCat()).replace('style="transform:scaleX(-1)"','style="transform:scaleX(-1);filter:brightness(.3) contrast(1.3) drop-shadow(0 0 6px #7c4dff)"'),
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
