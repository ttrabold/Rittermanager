// Ritter Manager – Grafik der einzigartigen Waffen: große Bilder (Enthüllung, Beutel) und kleine Fassung für die Hand des Ritters
// UNIQV[id](ph,big) liefert das SVG-Innere im Koordinatensystem 300×600 (ph 1 = zweites Aussehen); UG[id]=[gx,gy,s]: Griffpunkt und Maßstab für die kleine Fassung (Hand bei 107.5/105.5)
const UNIQV={},UG={};
const uK=(c,x,y,r,d)=>`<circle class="uup" style="animation-delay:${d}s" cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const uSparks=(a,b,c)=>uK(a,70,580,3,0)+uK(b,240,580,3,1)+uK(c,150,580,2.5,1.9);
const uHalo=(x,y,r,c)=>`<circle class="upl" cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const uBigRing=(x,y,r,c,d)=>`<g class="urotr" style="animation-duration:${d||11}s"><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="1.5" stroke-dasharray="4 10"/></g>`;
// 1 Donnerzahn (Schwert)
UG.donnerzahn=[150,516,.15];
UNIQV.donnerzahn=(ph,big)=>`<defs><linearGradient id="udz-bl" x1="0" x2="1"><stop offset="0" stop-color="#1f5a9a"/><stop offset=".45" stop-color="#f4fbff"/><stop offset="1" stop-color="#1f5a9a"/></linearGradient></defs>
 ${big?uHalo(150,210,170,"#4aa8ff")+uBigRing(150,210,132,"#7fd0ff")+`<g class="ufl2"><path d="M26 150l14-36l14 36l-14 14z" fill="#7fd0ff"/><path d="M262 110l12-30l12 30l-12 12z" fill="#bfe6ff"/><path d="M40 300l10-24l10 24l-10 9z" fill="#bfe6ff"/><path d="M250 270l12-28l12 28l-12 10z" fill="#7fd0ff"/></g>`:""}
 <g class="ufl">
 <path d="M92 428L66 128L100 40L126 104L150 6L174 104L200 40L234 128L208 428Z" fill="url(#udz-bl)" stroke="#d8f2ff" stroke-width="3.5"/>
 <path d="M150 10V420" stroke="#1a4a80" stroke-width="4"/><path d="M106 410L86 140M194 410L214 140" stroke="#7fd0ff" stroke-width="2.5" opacity=".8"/>
 <g fill="#eaf7ff" stroke="#1a4a80" stroke-width="1.5"><path d="M92 420l-16-8l12-14z"/><path d="M89 372l-16-8l12-14z"/><path d="M86 324l-16-8l12-14z"/><path d="M83 276l-16-8l12-14z"/><path d="M80 228l-16-8l12-14z"/><path d="M208 420l16-8l-12-14z"/><path d="M211 372l16-8l-12-14z"/><path d="M214 324l16-8l-12-14z"/><path d="M217 276l16-8l-12-14z"/><path d="M220 228l16-8l-12-14z"/></g>
 <g class="uzz2" stroke="#7fd0ff" stroke-width="3" fill="none" stroke-linecap="round" style="filter:drop-shadow(0 0 6px #7fd0ff)"><path d="M132 70l14 10l-14 10l14 10"/><path d="M168 110l-14 10l14 10l-14 10"/><path d="M132 150l14 10l-14 10l14 10"/><path d="M168 190l-14 10l14 10l-14 10"/><path d="M132 230l14 10l-14 10l14 10"/><path d="M168 270l-14 10l14 10l-14 10"/><path d="M132 310l14 10l-14 10l14 10"/><path d="M168 350l-14 10l14 10l-14 10"/></g>
 <g class="uzz"><path d="M102 46L150 190L126 196L164 320L140 326L172 420" stroke="#fff" stroke-width="6" fill="none" style="filter:drop-shadow(0 0 12px #7fd0ff)"/></g>
 <g class="uzz2"><path d="M98 38Q150 100 202 38" stroke="#fff27a" stroke-width="6" fill="none" style="filter:drop-shadow(0 0 14px #ffe066)"/><path d="M70 126Q150 180 230 126" stroke="#9fe0ff" stroke-width="3" fill="none"/></g>
 <path d="M44 438Q150 404 256 438L242 468Q150 442 58 468Z" fill="#c9971a" stroke="#5d4a2c" stroke-width="3.5"/>
 <path d="M48 440L10 396L22 442L10 462L52 458ZM252 440L290 396L278 442L290 462L248 458Z" fill="#ffd54f" stroke="#5d4a2c" stroke-width="2.5"/>
 <circle cx="96" cy="448" r="9" fill="#4aa8ff" stroke="#ffd54f" stroke-width="3"/><circle cx="204" cy="448" r="9" fill="#4aa8ff" stroke="#ffd54f" stroke-width="3"/>
 <circle cx="150" cy="450" r="20" fill="#1a4a80" stroke="#ffd54f" stroke-width="5"/><path d="M150 432l14 18l-14 18l-14 -18z" fill="#7fd0ff" stroke="#fff" stroke-width="2"/><circle class="upu" cx="150" cy="450" r="5" fill="#fff"/>
 <rect x="136" y="470" width="28" height="92" rx="7" fill="#3a2a1c" stroke="#150f08" stroke-width="2.5"/><path d="M136 486l28-8M136 504l28-8M136 522l28-8M136 540l28-8" stroke="#a07a30" stroke-width="3.5"/>
 <path d="M122 566Q150 548 178 566L172 592Q150 604 128 592Z" fill="#c9971a" stroke="#5d4a2c" stroke-width="3"/><path d="M130 568l-10-14l18 6ZM170 568l10-14l-18 6Z" fill="#ffd54f" stroke="#5d4a2c"/><circle cx="138" cy="580" r="4" fill="#7fd0ff"/><circle cx="162" cy="580" r="4" fill="#7fd0ff"/>
 </g>${big?uSparks("#bfe6ff","#fff","#7fd0ff"):""}`;
// 2 Sonnenlaser (Stab)
UG.sonnenlaser=[150,470,.16];
UNIQV.sonnenlaser=(ph,big)=>`${big?uHalo(150,160,180,"#ff2fb4")+`<g class="urotr"><ellipse cx="150" cy="160" rx="146" ry="38" fill="none" stroke="#ff7ad9" stroke-width="2" stroke-dasharray="8 8"/></g>`:""}
 <g class="ufl">
 <rect x="140" y="250" width="20" height="330" rx="8" fill="#3a1840" stroke="#150418" stroke-width="2.5"/>
 <path d="M140 270q20 12 20 24q-20 12 -20 24q20 12 20 24q-20 12 -20 24q20 12 20 24q-20 12 -20 24q20 12 20 24" stroke="#ff2fb4" stroke-width="3" fill="none"/>
 <circle cx="150" cy="420" r="8" fill="#c9971a" stroke="#5d4a2c" stroke-width="2"/><circle class="upu" cx="150" cy="420" r="3" fill="#ff7ad9"/><path d="M130 585q20 24 40 0z" fill="#c9971a" stroke="#5d4a2c" stroke-width="2"/>
 <g class="uwing uwl"><path d="M120 214Q60 200 8 120Q40 150 64 140Q50 168 86 176Q76 196 118 198Z" fill="#c9971a" stroke="#5d4a2c" stroke-width="3"/><path d="M110 206Q70 196 34 150M108 196Q80 186 56 160" stroke="#ffd54f" stroke-width="2" fill="none"/></g>
 <g class="uwing uwr"><path d="M180 214Q240 200 292 120Q260 150 236 140Q250 168 214 176Q224 196 182 198Z" fill="#c9971a" stroke="#5d4a2c" stroke-width="3"/><path d="M190 206Q230 196 266 150M192 196Q220 186 244 160" stroke="#ffd54f" stroke-width="2" fill="none"/></g>
 <path d="M104 224Q150 280 196 224L180 200Q150 240 120 200Z" fill="#c9971a" stroke="#5d4a2c" stroke-width="3.5"/><circle cx="150" cy="236" r="9" fill="#ff2fb4" stroke="#ffd54f" stroke-width="3"/>
 <g class="urot"><ellipse cx="150" cy="160" rx="112" ry="30" fill="none" stroke="#ffd54f" stroke-width="6" style="filter:drop-shadow(0 0 8px #ffd54f)"/></g>
 <g class="urotr" style="animation-duration:8s"><circle cx="150" cy="160" r="90" fill="none" stroke="#ff2fb4" stroke-width="4" stroke-dasharray="16 10"/></g>
 <circle cx="150" cy="160" r="64" fill="#2a0f30" stroke="#ffd54f" stroke-width="6"/><circle cx="150" cy="160" r="56" fill="none" stroke="#ff2fb4" stroke-width="2" stroke-dasharray="3 5"/>
 <circle class="upu" cx="150" cy="160" r="48" fill="#ff2fb4" style="filter:drop-shadow(0 0 26px #ff2fb4)"/><circle class="upu" cx="150" cy="160" r="28" fill="#fff"/>
 <g class="urot" style="animation-duration:3.4s"><circle cx="150" cy="22" r="10" fill="#ffd54f" style="filter:drop-shadow(0 0 12px #ffd54f)"/></g>
 <g class="urotr" style="animation-duration:5s"><circle cx="150" cy="298" r="8" fill="#ff7ad9" style="filter:drop-shadow(0 0 10px #ff2fb4)"/></g>
 ${big?`<circle class="ucharge" cx="210" cy="160" r="30" fill="#fff" style="filter:drop-shadow(0 0 16px #ff2fb4)"/><path class="ubeam" d="M214 150H440V170H214Z" fill="#fff" style="filter:drop-shadow(0 0 20px #ff2fb4) drop-shadow(0 0 44px #b01a8a)"/>`:""}
 </g>${big?uSparks("#ff9be6","#ffd54f","#fff"):""}`;
// 3 Wiederkehr (Bogen)
UG.wiederkehr=[140,300,.15];
UNIQV.wiederkehr=(ph,big)=>`${big?uHalo(170,300,190,"#ffd54f")+uBigRing(170,300,150,"#ffd54f",16)+uBigRing(170,300,112,"#fff3b0")+`<g class="ufl2"><circle cx="40" cy="120" r="14" fill="#fff3b0"/><circle cx="48" cy="116" r="13" fill="#4a3a10"/><circle cx="262" cy="470" r="11" fill="#fff3b0"/><circle cx="256" cy="466" r="11" fill="#4a3a10"/></g>`:""}
 <g class="ufl">
 <path d="M210 24Q56 300 210 576Q104 300 210 24Z" fill="#f2e3b0" stroke="#fff" stroke-width="3.5"/><path d="M198 64Q92 300 198 536" stroke="#c9971a" stroke-width="6" fill="none"/><path d="M190 120Q120 300 190 480" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>
 <g stroke="#c9971a" stroke-width="3" fill="none"><path d="M168 150l-14 10l14 10"/><path d="M148 200l-14 10l14 10"/><path d="M140 260l-14 10l14 10"/><path d="M140 330l-14 10l14 10"/><path d="M148 390l-14 10l14 10"/><path d="M168 440l-14 10l14 10"/></g>
 <g class="uwing uwl"><path d="M210 24L250 -4L240 30L270 18L238 54L218 46Z" fill="#fff3b0" stroke="#c9971a" stroke-width="2.5"/></g><g class="uwing uwr"><path d="M210 576L250 604L240 570L270 582L238 546L218 554Z" fill="#fff3b0" stroke="#c9971a" stroke-width="2.5"/></g>
 <path d="M210 24Q196 300 210 576" stroke="#fff" stroke-width="3.5" fill="none" style="filter:drop-shadow(0 0 12px #ffd54f)"/>
 <rect x="96" y="262" width="32" height="76" rx="10" fill="#5b3a1c" stroke="#150f08" stroke-width="2.5"/><path d="M96 280h32M96 300h32M96 320h32" stroke="#c9971a" stroke-width="3"/><path d="M100 258Q112 246 124 258" stroke="#c9971a" stroke-width="5" fill="none"/><path d="M100 342Q112 354 124 342" stroke="#c9971a" stroke-width="5" fill="none"/>
 <circle cx="112" cy="300" r="9" fill="#ffd54f" stroke="#5d4a2c" stroke-width="2"/><circle class="upu" cx="112" cy="300" r="4" fill="#fff"/>
 <g class="ughost"><g style="filter:drop-shadow(0 0 14px #ffd54f)"><path d="M222 300H80" stroke="#fff" stroke-width="6"/><path d="M80 300l18-12v24z" fill="#fff"/><path d="M222 300l-12-14m12 14l-12 14M232 300l-12-14m12 14l-12 14" stroke="#ffd54f" stroke-width="4"/></g></g>
 <g class="ughost" style="animation-delay:.18s;opacity:.5"><path d="M222 300H80" stroke="#ffd54f" stroke-width="3"/></g>
 <circle class="upu" cx="210" cy="300" r="10" fill="#ffd54f" style="filter:drop-shadow(0 0 12px #fff)"/>
 </g>${big?uSparks("#fff3b0","#ffd54f","#fff"):""}`;
// 4 Blutdurst (Axt)
UG.blutdurst=[150,420,.12];
UNIQV.blutdurst=(ph,big)=>`${big?uHalo(150,190,180,"#ff1a1a")+uBigRing(150,190,146,"#ff3a2a",11):""}
 <g class="ufl">
 <rect x="136" y="170" width="28" height="410" rx="10" fill="#2a1410" stroke="#0a0303" stroke-width="3"/>
 <g fill="#d9cfc0" stroke="#150f08" stroke-width="2"><ellipse cx="150" cy="260" rx="20" ry="9"/><ellipse cx="150" cy="330" rx="20" ry="9"/><ellipse cx="150" cy="400" rx="20" ry="9"/><ellipse cx="150" cy="470" rx="20" ry="9"/><ellipse cx="150" cy="540" rx="20" ry="9"/></g>
 <g stroke="#9a9a9a" stroke-width="4" fill="none"><path class="ufl2" d="M164 250q36 20 30 60q-6 36 8 60"/><path class="ufl2" d="M136 300q-36 20 -30 60q6 36 -8 60"/></g>
 <g class="upu"><path d="M138 130Q58 36 4 120Q36 172 -10 238Q92 256 138 196Z" fill="#3a0808" stroke="#ff4a3a" stroke-width="4.5"/><path d="M162 130Q242 36 296 120Q264 172 310 238Q208 256 162 196Z" fill="#3a0808" stroke="#ff4a3a" stroke-width="4.5"/>
 <path d="M130 140Q70 84 26 130M130 166Q64 158 20 196M130 190Q80 210 30 222M170 140Q230 84 274 130M170 166Q236 158 280 196M170 190Q220 210 270 222" stroke="#7a0a0a" stroke-width="2.5" fill="none"/>
 <g fill="#ff4a3a" stroke="#5a0808" stroke-width="1.5"><path d="M4 120L-16 98L16 110z"/><path d="M-10 238L-26 260L8 244z"/><path d="M296 120L316 98L284 110z"/><path d="M310 238L326 260L292 244z"/></g></g>
 <path class="uvein" d="M134 146Q80 116 26 134M134 182Q72 188 18 206M162 146Q220 116 274 134M162 182Q228 188 282 206" stroke="#ff2a1a" stroke-width="5" fill="none" style="filter:drop-shadow(0 0 10px #f00)"/>
 <path d="M122 120Q100 80 116 56Q120 90 134 106ZM178 120Q200 80 184 56Q180 90 166 106Z" fill="#d9cfc0" stroke="#150f08" stroke-width="2.5"/>
 <circle cx="150" cy="150" r="40" fill="#e6dccb" stroke="#150f08" stroke-width="3.5"/><ellipse cx="136" cy="146" rx="10" ry="12" fill="#150f08"/><ellipse cx="164" cy="146" rx="10" ry="12" fill="#150f08"/>
 <circle class="uzz" cx="136" cy="148" r="4.4" fill="#ff2a1a" style="filter:drop-shadow(0 0 8px #f00)"/><circle class="uzz" cx="164" cy="148" r="4.4" fill="#ff2a1a" style="filter:drop-shadow(0 0 8px #f00)"/>
 <path d="M144 160l6-8l6 8z" fill="#150f08"/><path d="M134 174h32M139 170v10M145 170v10M151 170v10M157 170v10M163 170v10" stroke="#150f08" stroke-width="2.2"/>
 <path class="udr" d="M26 220q-7 16 0 24q7-8 0-24z" fill="#e01010"/><path class="udr" style="animation-delay:.6s" d="M274 220q-7 16 0 24q7-8 0-24z" fill="#e01010"/><path class="udr" style="animation-delay:1.2s" d="M150 196q-7 16 0 24q7-8 0-24z" fill="#e01010"/>
 <circle cx="150" cy="580" r="20" fill="#7a1a1a" stroke="#150f08" stroke-width="3"/><path d="M150 556v-12M150 604v12M126 580h-12M174 580h12M133 563l-8 -8M167 563l8 -8M133 597l-8 8M167 597l8 8" stroke="#ff4a3a" stroke-width="4" stroke-linecap="round"/><circle class="upu" cx="150" cy="580" r="7" fill="#ff2a1a"/>
 </g>${big?uSparks("#ff6a5a","#ff2a1a","#ffb0a0"):""}`;
// ---- Schwerter, Äxte, Keulen ----
const uGem=(x,y,r,c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="#ffd54f" stroke-width="${r/3}"/><circle class="upu" cx="${x}" cy="${y}" r="${r/3}" fill="#fff"/>`;
const uGold="#c9971a",uGoldE="#5d4a2c";
// Chronosklinge: Klinge mit großem Uhr-Parier, kreisende Zeiger, Sandkörner
UG.chronos=[150,516,.14];
UNIQV.chronos=(ph,big)=>`<defs><linearGradient id="uch-bl" x1="0" x2="1"><stop offset="0" stop-color="#3a1a78"/><stop offset=".5" stop-color="#f3eaff"/><stop offset="1" stop-color="#3a1a78"/></linearGradient></defs>
 ${big?uHalo(150,260,180,"#b388ff")+uBigRing(150,260,140,"#d1b3ff",14):""}
 <g class="ufl"><path d="M116 420L128 70L150 8L172 70L184 420Z" fill="url(#uch-bl)" stroke="#e6d6ff" stroke-width="3.5"/><path d="M150 12V410" stroke="#3a1a78" stroke-width="4"/>
 <g stroke="#b388ff" stroke-width="3" fill="none"><path d="M136 90h28l-28 40h28z"/><path d="M136 170h28l-28 40h28z"/><path d="M136 250h28l-28 40h28z"/><path d="M136 330h28l-28 40h28z"/></g>
 <g class="uzz2"><path d="M140 60l10-30l10 30M130 200h40M130 280h40" stroke="#fff" stroke-width="3"/></g>
 <circle cx="150" cy="452" r="74" fill="#22123f" stroke="${uGold}" stroke-width="7"/><circle cx="150" cy="452" r="62" fill="none" stroke="#b388ff" stroke-width="2" stroke-dasharray="3 5"/>
 ${Array.from({length:12},(_,i)=>`<path d="M150 ${452-62}v${i%3?8:14}" stroke="#ffd54f" stroke-width="${i%3?2:4}" transform="rotate(${i*30} 150 452)"/>`).join("")}
 <g class="urot" style="animation-duration:6s"><path d="M150 452V404" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g><g class="urot" style="animation-duration:36s"><path d="M150 452L178 470" stroke="#ffd54f" stroke-width="7" stroke-linecap="round"/></g>
 ${uGem(150,452,9,"#7c4dff")}
 <path d="M60 452L20 420L34 456L20 484ZM240 452L280 420L266 456L280 484Z" fill="${uGold}" stroke="${uGoldE}" stroke-width="2.5"/>
 <rect x="136" y="520" width="28" height="48" rx="7" fill="#2a1a40" stroke="#150f08" stroke-width="2.5"/><path d="M136 534h28M136 548h28" stroke="${uGold}" stroke-width="3"/>
 <path d="M126 570h48l-24 36z" fill="${uGold}" stroke="${uGoldE}" stroke-width="3"/><path d="M134 574h32l-16 22z" fill="#b388ff"/>
 </g>${big?`<path class="udr" d="M120 200q-3 6 0 9q3-3 0-9z" fill="#ffd54f"/><path class="udr" style="animation-delay:.8s" d="M180 260q-3 6 0 9q3-3 0-9z" fill="#ffd54f"/><path class="udr" style="animation-delay:1.5s" d="M150 150q-3 6 0 9q3-3 0-9z" fill="#ffd54f"/>`+uSparks("#d1b3ff","#ffd54f","#fff"):""}`;
// Gnadenbringer: schlanke weiße Klinge, Engelsflügel als Parier, Heiligenschein
UG.gnade=[150,500,.15];
UNIQV.gnade=(ph,big)=>`${big?uHalo(150,230,175,"#fff3b0")+uBigRing(150,230,138,"#ffe9a0",16):""}
 <g class="ufl"><ellipse class="upu" cx="150" cy="6" rx="46" ry="11" fill="none" stroke="#ffe9a0" stroke-width="5" style="filter:drop-shadow(0 0 10px #ffd54f)"/>
 <path d="M130 410L136 90L150 24L164 90L170 410Z" fill="#f6f9ff" stroke="#fff" stroke-width="3"/><path d="M150 28V400" stroke="#aabbd8" stroke-width="3"/><path d="M142 150v200M158 150v200" stroke="#dbe5f6" stroke-width="2"/>
 <g class="uwing uwl"><path d="M138 440Q70 430 12 340Q50 360 66 346Q56 380 92 386Q84 410 130 414Z" fill="#fff" stroke="#c9b87a" stroke-width="3"/><path d="M130 430Q86 420 50 380M126 418Q96 410 68 392" stroke="#e6d9a8" stroke-width="2" fill="none"/></g>
 <g class="uwing uwr"><path d="M162 440Q230 430 288 340Q250 360 234 346Q244 380 208 386Q216 410 170 414Z" fill="#fff" stroke="#c9b87a" stroke-width="3"/><path d="M170 430Q214 420 250 380M174 418Q204 410 232 392" stroke="#e6d9a8" stroke-width="2" fill="none"/></g>
 <path d="M120 440Q150 460 180 440L172 424Q150 440 128 424Z" fill="${uGold}" stroke="${uGoldE}" stroke-width="3"/>${uGem(150,438,8,"#fff3b0")}
 <rect x="138" y="458" width="24" height="84" rx="7" fill="#e9e2cc" stroke="#7a6a3a" stroke-width="2.5"/><path d="M138 474h24M138 492h24M138 510h24M138 528h24" stroke="${uGold}" stroke-width="3"/>
 <circle cx="150" cy="560" r="16" fill="${uGold}" stroke="${uGoldE}" stroke-width="3"/><path d="M142 560q8-12 16 0q-8 8-16 0z" fill="#fff"/>
 </g>${big?uSparks("#fff","#ffe9a0","#fff"):""}`;
// Schädelspalter: einseitige riesige Axt, glühende Risse, Schädel am Schaft
UG.schaedel=[150,400,.13];
UNIQV.schaedel=(ph,big)=>`<defs><linearGradient id="usc-bl" x1="0" x2="1"><stop offset="0" stop-color="#5d6770"/><stop offset=".6" stop-color="#cfd8de"/><stop offset="1" stop-color="#ffab40"/></linearGradient></defs>
 ${big?uHalo(190,170,170,"#ff8f00")+uBigRing(190,170,136,"#ffab40"):""}
 <g class="ufl"><rect x="138" y="90" width="24" height="490" rx="9" fill="#2a2018" stroke="#0a0603" stroke-width="3"/><path d="M138 150h24M138 230h24M138 310h24M138 390h24M138 470h24" stroke="#7a5a2a" stroke-width="3"/>
 <path d="M158 80Q310 20 300 180Q292 290 158 270Z" fill="url(#usc-bl)" stroke="#fff" stroke-width="4"/><path d="M168 100Q272 60 280 180Q276 250 168 250" stroke="#ffab40" stroke-width="4" fill="none" style="filter:drop-shadow(0 0 8px #ff8f00)"/>
 <g class="uzz" stroke="#ff6d00" stroke-width="4" fill="none" style="filter:drop-shadow(0 0 6px #f60)"><path d="M180 130l30 22l-18 16l36 30l-12 26"/><path d="M240 100l-14 40l30 6"/></g>
 <g fill="#cfd8de" stroke="#37474f" stroke-width="2"><path d="M296 110l24-6l-14 18z"/><path d="M302 170l26 4l-24 14z"/><path d="M290 230l22 12l-26 6z"/></g>
 <path d="M142 150L40 168L142 206Z" fill="#8a949c" stroke="#fff" stroke-width="3"/><path d="M142 164L70 172L142 192Z" fill="#cfd8de"/>
 <circle cx="150" cy="300" r="30" fill="#e6dccb" stroke="#150f08" stroke-width="3"/><ellipse cx="140" cy="297" rx="7" ry="8" fill="#150f08"/><ellipse cx="160" cy="297" rx="7" ry="8" fill="#150f08"/><circle class="uzz" cx="140" cy="298" r="3" fill="#ff6d00"/><circle class="uzz" cx="160" cy="298" r="3" fill="#ff6d00"/><path d="M136 316h28M141 312v8M147 312v8M153 312v8M159 312v8" stroke="#150f08" stroke-width="2"/>
 <path d="M126 580h48l-24 28z" fill="#8a949c" stroke="#37474f" stroke-width="2"/></g>${big?uSparks("#ffab40","#fff","#ff6d00"):""}`;
// Zwillingsbeil: zwei übereinander stehende Doppelblätter mit Nachbild
UG.zwilling=[150,420,.13];
UNIQV.zwilling=(ph,big)=>`${big?uHalo(150,230,175,"#4dd0e1")+uBigRing(150,230,140,"#80deea"):""}
 <g class="ufl"><rect x="138" y="80" width="24" height="500" rx="9" fill="#14323a" stroke="#04141a" stroke-width="3"/><path d="M138 140h24M138 240h24M138 340h24M138 440h24M138 520h24" stroke="#4dd0e1" stroke-width="3"/>
 ${[[100,1],[250,.75]].map(([y,o])=>`<g opacity="${o}"><path d="M142 ${y}Q60 ${y-70} 10 ${y+10}Q40 ${y+60} 6 ${y+110}Q90 ${y+130} 142 ${y+80}Z" fill="#dff7fa" stroke="#4dd0e1" stroke-width="4"/><path d="M158 ${y}Q240 ${y-70} 290 ${y+10}Q260 ${y+60} 294 ${y+110}Q210 ${y+130} 158 ${y+80}Z" fill="#dff7fa" stroke="#4dd0e1" stroke-width="4"/><path d="M130 ${y+10}Q70 ${y-30} 28 ${y+20}M130 ${y+50}Q64 ${y+60} 24 ${y+100}M170 ${y+10}Q230 ${y-30} 272 ${y+20}M170 ${y+50}Q236 ${y+60} 276 ${y+100}" stroke="#4dd0e1" stroke-width="2.5" fill="none"/></g>`).join("")}
 <g class="uzz2" opacity=".6"><path d="M142 330Q60 260 10 340Q40 390 6 440Q90 460 142 410Z" fill="none" stroke="#fff" stroke-width="3"/><path d="M158 330Q240 260 290 340Q260 390 294 440Q210 460 158 410Z" fill="none" stroke="#fff" stroke-width="3"/></g>
 ${uGem(150,200,12,"#4dd0e1")}${uGem(150,350,10,"#4dd0e1")}
 <path d="M130 580h40l-20 30z" fill="#4dd0e1" stroke="#04141a" stroke-width="2"/></g>${big?uSparks("#80deea","#fff","#4dd0e1"):""}`;
// Phoenixhammer: Hammerkopf als Phönix, Flügel, Flammen (Phase 1: lodernd)
UG.phoenix=[150,430,.13];
UNIQV.phoenix=(ph,big)=>{const f=ph?"#fff176":"#ff8f00";return `${big?uHalo(150,150,175,ph?"#ffd54f":"#ff6d00")+uBigRing(150,150,140,"#ffab40"):""}
 <g class="ufl"><rect x="138" y="180" width="24" height="400" rx="9" fill="#3a1608" stroke="#120502" stroke-width="3"/><path d="M138 240h24M138 320h24M138 400h24M138 480h24" stroke="${uGold}" stroke-width="3"/>
 <g class="uwing uwl"><path d="M130 110Q70 60 6 100Q40 110 44 130Q20 150 50 176Q80 160 100 170Q70 190 96 210Q120 190 136 150Z" fill="#e64a19" stroke="#ffd54f" stroke-width="3"/><path d="M120 120Q70 100 30 120M112 150Q72 150 48 166" stroke="#ffd54f" stroke-width="2" fill="none"/></g>
 <g class="uwing uwr"><path d="M170 110Q230 60 294 100Q260 110 256 130Q280 150 250 176Q220 160 200 170Q230 190 204 210Q180 190 164 150Z" fill="#e64a19" stroke="#ffd54f" stroke-width="3"/><path d="M180 120Q230 100 270 120M188 150Q228 150 252 166" stroke="#ffd54f" stroke-width="2" fill="none"/></g>
 <path d="M130 176Q150 250 170 176L160 200Q150 232 140 200Z" fill="#bf360c" stroke="#ffd54f" stroke-width="2"/>
 <ellipse cx="150" cy="130" rx="40" ry="52" fill="#ff8f00" stroke="#ffd54f" stroke-width="4"/><path d="M120 110Q150 70 180 110Q150 96 120 110Z" fill="#ffd54f"/><circle cx="136" cy="122" r="6" fill="#150f08"/><circle cx="164" cy="122" r="6" fill="#150f08"/><circle class="uzz" cx="137" cy="123" r="2.5" fill="#fff"/><circle class="uzz" cx="165" cy="123" r="2.5" fill="#fff"/><path d="M142 140l8 18l8-18z" fill="#ffd54f" stroke="#7a3a08" stroke-width="2"/>
 <g class="uzz2" fill="${f}" style="filter:drop-shadow(0 0 12px #ff6d00)"><path d="M120 80Q108 40 134 14Q130 50 148 60Q150 36 166 22Q172 56 182 80Q150 66 120 80Z"/>${ph?'<path d="M90 100Q70 60 96 30Q96 62 110 76Z"/><path d="M210 100Q230 60 204 30Q204 62 190 76Z"/>':""}</g>
 ${uGem(150,190,10,"#d50000")}<circle cx="150" cy="590" r="14" fill="${uGold}" stroke="${uGoldE}" stroke-width="3"/></g>${big?uSparks("#ffab40","#ffd54f","#ff6d00"):""}`};
// Weltenbrecher: Stachelkugel mit glühenden Rissen, kreisende Splitter und Ring
UG.weltenbrecher=[150,400,.15];
UNIQV.weltenbrecher=(ph,big)=>`${big?uHalo(150,150,180,"#ffb300")+uBigRing(150,150,138,"#ffd54f"):""}
 <g class="ufl"><rect x="138" y="190" width="24" height="390" rx="9" fill="#2a2230" stroke="#0a060d" stroke-width="3"/><path d="M138 260h24M138 340h24M138 420h24M138 500h24" stroke="${uGold}" stroke-width="3"/>
 <g class="urot" style="animation-duration:10s"><ellipse cx="150" cy="150" rx="128" ry="26" fill="none" stroke="#ffd54f" stroke-width="5" style="filter:drop-shadow(0 0 8px #ffb300)"/></g>
 ${Array.from({length:14},(_,i)=>`<path d="M150 62l-9 -26l18 0z" fill="#5c5266" stroke="#150f1a" stroke-width="2" transform="rotate(${i*360/14} 150 150)"/>`).join("")}
 <circle cx="150" cy="150" r="84" fill="#40374a" stroke="#150f1a" stroke-width="5"/><circle cx="150" cy="150" r="70" fill="#4d4458"/>
 <g class="uzz" stroke="#ffb300" stroke-width="5" fill="none" style="filter:drop-shadow(0 0 10px #ff8f00)"><path d="M150 82l-14 36l24 14l-22 30l26 20l-14 34"/><path d="M82 130l36 10l8 24l40 -4l22 26"/></g>
 <g class="urotr" style="animation-duration:6s"><path d="M150 30l10 12l-10 10l-10 -10z" fill="#9a8fa8" stroke="#150f1a" stroke-width="2"/><path d="M150 270l10 -12l-10 -10l-10 10z" fill="#9a8fa8" stroke="#150f1a" stroke-width="2"/></g>
 <g class="urot" style="animation-duration:9s"><circle cx="40" cy="150" r="9" fill="#7a6f88" stroke="#150f1a" stroke-width="2"/><circle cx="260" cy="150" r="7" fill="#7a6f88" stroke="#150f1a" stroke-width="2"/></g>
 ${uGem(150,150,14,"#ff8f00")}<circle cx="150" cy="590" r="14" fill="${uGold}" stroke="${uGoldE}" stroke-width="3"/></g>${big?uSparks("#ffd54f","#ff8f00","#fff"):""}`;
// Erschütterer: massiver Steinhammer, Schockwellen, schwebende Felsen
UG.erschuetterer=[150,410,.14];
UNIQV.erschuetterer=(ph,big)=>`${big?uHalo(150,150,175,"#a1887f")+uBigRing(150,150,138,"#d7ccc8"):""}
 <g class="ufl"><rect x="138" y="190" width="24" height="390" rx="9" fill="#3a2a1c" stroke="#120a04" stroke-width="3"/><path d="M138 260h24M138 340h24M138 420h24M138 500h24" stroke="#a07a30" stroke-width="3"/>
 <path d="M64 70h172l14 20v100l-14 20H64l-14-20V90z" fill="#7a6a5c" stroke="#1c1410" stroke-width="5"/><path d="M80 84h140M80 196h140" stroke="#4a3f36" stroke-width="3"/><path d="M50 120h200M50 160h200" stroke="${uGold}" stroke-width="9"/>
 <g fill="#cdb480" stroke="#1c1410" stroke-width="2"><circle cx="62" cy="120" r="6"/><circle cx="238" cy="120" r="6"/><circle cx="62" cy="160" r="6"/><circle cx="238" cy="160" r="6"/></g>
 <g stroke="#1c1410" stroke-width="3" fill="none"><path d="M110 90l16 30l-14 12l24 22l-10 22"/><path d="M190 100l-12 26l20 14"/></g>
 <g class="upu"><path d="M30 130Q20 150 30 170M18 112Q-2 150 18 188" stroke="#ffd54f" stroke-width="5" fill="none"/><path d="M270 130Q280 150 270 170M282 112Q302 150 282 188" stroke="#ffd54f" stroke-width="5" fill="none"/></g>
 ${uGem(150,140,16,"#d84315")}
 <g class="ufl2"><path d="M30 60l16 -8l8 16l-14 8z" fill="#7a6a5c" stroke="#1c1410" stroke-width="2"/><path d="M262 40l18 4l-4 18l-16 -4z" fill="#7a6a5c" stroke="#1c1410" stroke-width="2"/><path d="M40 240l14 -6l8 14l-12 6z" fill="#7a6a5c" stroke="#1c1410" stroke-width="2"/></g>
 <circle cx="150" cy="590" r="14" fill="${uGold}" stroke="${uGoldE}" stroke-width="3"/></g>${big?uSparks("#d7ccc8","#ffd54f","#a1887f"):""}`;

// ---- Hellebarden, Bögen, Stäbe ----
// Sturmherold: Gewitterwolke um die Klinge, Blitze, Wimpel
UG.sturmherold=[150,420,.15];
UNIQV.sturmherold=(ph,big)=>`${big?uHalo(150,110,175,"#90caf9")+uBigRing(150,110,138,"#bbdefb"):""}
 <g class="ufl"><rect x="141" y="120" width="18" height="470" rx="7" fill="#2a3340" stroke="#0a0e14" stroke-width="3"/><path d="M141 220h18M141 300h18M141 380h18M141 460h18" stroke="#90caf9" stroke-width="3"/>
 <g class="ufl2" fill="#78909c" stroke="#263238" stroke-width="2"><ellipse cx="100" cy="86" rx="62" ry="26"/><ellipse cx="206" cy="80" rx="70" ry="28"/><ellipse cx="150" cy="56" rx="54" ry="24"/></g>
 <path d="M150 -6L174 90L150 130L126 90Z" fill="#e3f2fd" stroke="#fff" stroke-width="3"/><path d="M150 0V120" stroke="#42a5f5" stroke-width="3"/>
 <path d="M160 70Q270 40 268 150Q262 210 160 190Z" fill="#cfd8dc" stroke="#fff" stroke-width="4"/><path d="M172 90Q246 70 250 150Q246 184 172 176" stroke="#42a5f5" stroke-width="4" fill="none"/>
 <path d="M140 110L74 140L140 160Z" fill="#b0bec5" stroke="#fff" stroke-width="3"/>
 <g class="uzz"><path d="M96 90L124 150L106 154L134 230" stroke="#fff" stroke-width="5" fill="none" style="filter:drop-shadow(0 0 10px #42a5f5)"/><path d="M206 100L184 160L204 164L176 240" stroke="#fff27a" stroke-width="4" fill="none"/></g>
 <g class="uwing uwl"><path d="M141 250Q70 240 20 280Q60 290 70 310Q40 320 50 350Q100 330 141 300Z" fill="#1976d2" stroke="#e3f2fd" stroke-width="3"/><path d="M130 262Q70 262 36 286" stroke="#e3f2fd" stroke-width="2" fill="none"/></g>
 ${uGem(150,236,10,"#42a5f5")}<path d="M126 590h48l-24 30z" fill="#78909c" stroke="#263238" stroke-width="2"/></g>${big?uSparks("#bbdefb","#fff","#90caf9"):""}`;
// Seelenfänger: Seelenlaterne im Klingenring, Geisterflammen
UG.seelenfaenger=[150,420,.15];
UNIQV.seelenfaenger=(ph,big)=>`${big?uHalo(150,150,175,"#69f0ae")+uBigRing(150,150,138,"#b9f6ca"):""}
 <g class="ufl"><rect x="141" y="190" width="18" height="400" rx="7" fill="#1c2a24" stroke="#060e0a" stroke-width="3"/><path d="M141 270h18M141 350h18M141 430h18M141 510h18" stroke="#69f0ae" stroke-width="3"/>
 <path d="M150 -4L170 60L150 84L130 60Z" fill="#c8e6c9" stroke="#fff" stroke-width="3"/>
 <circle cx="150" cy="150" r="66" fill="none" stroke="#2e7d32" stroke-width="12"/><circle cx="150" cy="150" r="66" fill="none" stroke="#b9f6ca" stroke-width="3"/>
 <g class="urot" style="animation-duration:12s"><path d="M150 84l-8 -16l16 0zM216 150l16 -8l0 16zM150 216l8 16l-16 0zM84 150l-16 8l0 -16z" fill="#c8e6c9" stroke="#1b5e20" stroke-width="2"/></g>
 <path d="M216 150Q290 110 284 190Q270 230 210 190Z" fill="#a5d6a7" stroke="#fff" stroke-width="3"/><path d="M84 150L30 120L40 180Z" fill="#81c784" stroke="#fff" stroke-width="3"/>
 <g class="upu"><path d="M150 188Q122 160 140 130Q146 148 154 128Q176 152 150 188Z" fill="#69f0ae" style="filter:drop-shadow(0 0 14px #69f0ae)"/><circle cx="144" cy="150" r="4" fill="#150f08"/><circle cx="158" cy="150" r="4" fill="#150f08"/></g>
 <g class="ufl2" fill="#b9f6ca" opacity=".8"><path d="M96 100q-10 -18 4 -32q8 14 -4 32z"/><path d="M206 96q-10 -18 4 -32q8 14 -4 32z"/><path d="M60 200q-10 -18 4 -32q8 14 -4 32z"/></g>
 <path d="M130 196Q150 214 170 196L166 186Q150 200 134 186Z" fill="${uGold}" stroke="${uGoldE}" stroke-width="2.5"/><path d="M126 590h48l-24 30z" fill="#4caf50" stroke="#060e0a" stroke-width="2"/></g>${big?uSparks("#b9f6ca","#69f0ae","#fff"):""}`;
// Spiegelspeer: geschliffene Spiegelklinge, Prisma-Strahlen
UG.spiegelspeer=[150,420,.15];
UNIQV.spiegelspeer=(ph,big)=>`<defs><linearGradient id="usp-m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b3e5fc"/><stop offset=".35" stop-color="#fff"/><stop offset=".55" stop-color="#80deea"/><stop offset="1" stop-color="#e1f5fe"/></linearGradient></defs>
 ${big?uHalo(150,150,175,"#80deea")+uBigRing(150,150,138,"#e0f7fa"):""}
 <g class="ufl"><rect x="141" y="250" width="18" height="340" rx="7" fill="#26323a" stroke="#080e12" stroke-width="3"/><path d="M141 320h18M141 400h18M141 480h18" stroke="#80deea" stroke-width="3"/>
 <path d="M150 -10L206 120L150 270L94 120Z" fill="url(#usp-m)" stroke="#fff" stroke-width="4"/><path d="M150 -4V262M100 120h100" stroke="#4dd0e1" stroke-width="2.5" opacity=".8"/><path d="M122 58L150 120L122 190M178 58L150 120L178 190" stroke="#fff" stroke-width="2" fill="none" opacity=".9"/>
 <path d="M94 120L40 150L90 180Z" fill="url(#usp-m)" stroke="#fff" stroke-width="3"/><path d="M206 120L260 150L210 180Z" fill="url(#usp-m)" stroke="#fff" stroke-width="3"/>
 <g class="uzz"><path d="M120 60l30 60M170 40l-20 90" stroke="#fff" stroke-width="4" opacity=".9"/></g>
 ${big?`<g class="uzz2" opacity=".7"><path d="M206 120L300 60M206 120L300 120M206 120L300 180" stroke="#ff80ab" stroke-width="3"/><path d="M94 120L0 80M94 120L0 130" stroke="#80d8ff" stroke-width="3"/></g>`:""}
 <path d="M122 262Q150 290 178 262L168 244Q150 262 132 244Z" fill="${uGold}" stroke="${uGoldE}" stroke-width="3"/>${uGem(150,254,9,"#80deea")}<path d="M126 590h48l-24 30z" fill="#80deea" stroke="#080e12" stroke-width="2"/></g>${big?uSparks("#e0f7fa","#fff","#80deea"):""}`;
// Sternenfall: nachtblauer Rekurvbogen mit Sternen, Sternschnuppe als Pfeil
UG.sternenfall=[170,300,.15];
UNIQV.sternenfall=(ph,big)=>`${big?uHalo(170,300,190,"#3f51b5")+uBigRing(170,300,150,"#9fa8da",16):""}
 <g class="ufl"><path d="M236 16Q130 120 168 300Q130 480 236 584" fill="none" stroke="#0d1240" stroke-width="22" stroke-linecap="round"/><path d="M236 16Q130 120 168 300Q130 480 236 584" fill="none" stroke="#3949ab" stroke-width="14" stroke-linecap="round"/><path d="M232 24Q140 124 174 300Q140 476 232 576" fill="none" stroke="#c5cae9" stroke-width="3"/>
 <path d="M236 16L172 300L236 584" stroke="#fff" stroke-width="3" fill="none" style="filter:drop-shadow(0 0 10px #9fa8ff)"/>
 ${[[190,90],[150,170],[138,250],[138,350],[150,430],[190,510],[210,40],[210,560]].map(([x,y],i)=>`<g class="uzz${i%2?"2":""}"><path d="M${x} ${y-8}l2.4 5.6l5.6 2.4l-5.6 2.4l-2.4 5.6l-2.4-5.6l-5.6-2.4l5.6-2.4z" fill="#fff59d"/></g>`).join("")}
 <path d="M190 90L150 170L138 250L138 350L150 430L190 510" stroke="#9fa8ff" stroke-width="1.5" fill="none" stroke-dasharray="3 5" opacity=".7"/>
 <rect x="150" y="262" width="30" height="76" rx="10" fill="#1a237e" stroke="#0d1240" stroke-width="2.5"/><path d="M150 282h30M150 300h30M150 318h30" stroke="#ffd54f" stroke-width="3"/>${uGem(165,300,9,"#7986cb")}
 <g class="ughost"><g style="filter:drop-shadow(0 0 12px #9fa8ff)"><path d="M230 300H110" stroke="#fff" stroke-width="5"/><path d="M110 300L82 300L96 288L84 300L96 312z" fill="#fff59d"/><path d="M236 300l-12-12m12 12l-12 12" stroke="#c5cae9" stroke-width="4"/><path d="M230 300H300" stroke="#9fa8ff" stroke-width="3" opacity=".4"/></g></g>
 </g>${big?uSparks("#c5cae9","#fff59d","#fff"):""}`;
// Jägers Ende: dunkelgrüner Hornbogen mit Geweih, zwei Pfeile, Wolfsaugen
UG.jaeger=[150,300,.15];
UNIQV.jaeger=(ph,big)=>`${big?uHalo(170,300,190,"#2e7d32")+uBigRing(170,300,150,"#66bb6a",16):""}
 <g class="ufl"><path d="M230 40Q110 300 230 560" fill="none" stroke="#14301a" stroke-width="26" stroke-linecap="round"/><path d="M230 40Q112 300 230 560" fill="none" stroke="#2e5a2a" stroke-width="18" stroke-linecap="round"/><path d="M226 60Q128 300 226 540" stroke="#a5d6a7" stroke-width="3" fill="none"/>
 <g stroke="#d7ccc8" stroke-width="7" stroke-linecap="round" fill="none"><path d="M230 40L262 8L250 -10M262 8L290 14M230 70L262 54"/><path d="M230 560L262 592M262 592L290 586M230 530L262 546"/></g>
 <path d="M230 40L230 560" stroke="#eee" stroke-width="2.5" opacity=".9"/>
 <rect x="124" y="252" width="30" height="96" rx="10" fill="#3a2a1c" stroke="#120a04" stroke-width="2.5"/><path d="M124 270h30M124 288h30M124 306h30M124 324h30" stroke="#8a7040" stroke-width="3"/>
 <path d="M118 250Q139 230 160 250L150 266Q139 254 128 266Z" fill="#d7ccc8" stroke="#3a2a1c" stroke-width="2.5"/><circle class="uzz" cx="132" cy="252" r="3.4" fill="#ff1744"/><circle class="uzz" cx="148" cy="252" r="3.4" fill="#ff1744"/>
 <g class="ughost"><g style="filter:drop-shadow(0 0 8px #a5d6a7)"><path d="M230 288H100M230 312H100" stroke="#e8f5e9" stroke-width="4"/><path d="M100 288l14-8v16zM100 312l14-8v16z" fill="#e8f5e9"/></g></g>
 </g>${big?uSparks("#a5d6a7","#fff","#66bb6a"):""}`;
// Seelenspinner: Rippenkäfig mit Seele, Spinnennetz
UG.seelenspinner=[150,470,.16];
UNIQV.seelenspinner=(ph,big)=>`${big?uHalo(150,150,180,"#69f0ae")+uBigRing(150,150,140,"#b9f6ca"):""}
 <g class="urot" style="animation-duration:40s;opacity:.55"><circle cx="150" cy="150" r="130" fill="none" stroke="#b9f6ca" stroke-width="1.5"/><circle cx="150" cy="150" r="90" fill="none" stroke="#b9f6ca" stroke-width="1.5"/><circle cx="150" cy="150" r="50" fill="none" stroke="#b9f6ca" stroke-width="1.5"/>${Array.from({length:12},(_,i)=>`<path d="M150 20V280" stroke="#b9f6ca" stroke-width="1.5" transform="rotate(${i*15} 150 150)"/>`).join("")}</g>
 <g class="ufl"><rect x="140" y="250" width="20" height="330" rx="8" fill="#22302a" stroke="#07100b" stroke-width="2.5"/><path d="M140 270q20 12 20 24q-20 12 -20 24q20 12 20 24q-20 12 -20 24q20 12 20 24q-20 12 -20 24" stroke="#69f0ae" stroke-width="3" fill="none"/>
 <path d="M108 230Q150 270 192 230L176 206Q150 240 124 206Z" fill="#455a50" stroke="#07100b" stroke-width="3"/>
 <g fill="none" stroke="#cfd8dc" stroke-width="8" stroke-linecap="round"><path d="M150 232Q90 160 120 90Q136 60 150 52"/><path d="M150 232Q210 160 180 90Q164 60 150 52"/><path d="M150 232Q60 170 96 110"/><path d="M150 232Q240 170 204 110"/></g>
 <g class="upu"><circle cx="150" cy="152" r="40" fill="#69f0ae" style="filter:drop-shadow(0 0 24px #69f0ae)"/><circle cx="150" cy="152" r="22" fill="#fff"/><circle cx="141" cy="148" r="4" fill="#150f08"/><circle cx="159" cy="148" r="4" fill="#150f08"/><path d="M142 164q8 7 16 0" stroke="#150f08" stroke-width="2.5" fill="none"/></g>
 <g class="urot" style="animation-duration:5s"><circle cx="150" cy="60" r="8" fill="#b9f6ca" opacity=".9"/></g><g class="urotr" style="animation-duration:7s"><circle cx="150" cy="250" r="6" fill="#b9f6ca" opacity=".9"/></g>
 <circle cx="150" cy="586" r="10" fill="#455a50" stroke="#07100b" stroke-width="2"/></g>${big?uSparks("#b9f6ca","#69f0ae","#fff"):""}`;
// Wandelstab: Sonne/Mond-Kugel (Phase 1: Mond siegt), Zodiakring
UG.wandelstab=[150,470,.16];
UNIQV.wandelstab=(ph,big)=>`${big?uHalo(150,150,180,ph?"#b388ff":"#ffd54f")+uBigRing(150,150,140,ph?"#d1b3ff":"#ffe082"):""}
 <g class="ufl"><rect x="140" y="250" width="20" height="330" rx="8" fill="#2a1a40" stroke="#0e0618" stroke-width="2.5"/><path d="M140 290h20M140 350h20M140 410h20M140 470h20" stroke="#b388ff" stroke-width="3"/>
 <path d="M104 232Q150 280 196 232L180 208Q150 244 120 208Z" fill="${uGold}" stroke="${uGoldE}" stroke-width="3.5"/>
 <g class="urot" style="animation-duration:20s"><circle cx="150" cy="150" r="96" fill="none" stroke="${uGold}" stroke-width="6"/>${Array.from({length:12},(_,i)=>`<circle cx="150" cy="${150-96}" r="5" fill="#ffd54f" transform="rotate(${i*30} 150 150)"/>`).join("")}</g>
 <circle cx="150" cy="150" r="70" fill="#150f28" stroke="${uGold}" stroke-width="5"/>
 <path d="M150 80A70 70 0 0 0 150 220Z" fill="${ph?"#7c4dff":"#ffb300"}"/><path d="M150 80A70 70 0 0 1 150 220Z" fill="${ph?"#e1d4ff":"#4a2a8a"}"/>
 ${ph?`<circle cx="176" cy="140" r="9" fill="#7c4dff" opacity=".6"/><circle cx="168" cy="172" r="6" fill="#7c4dff" opacity=".6"/>`:`<g class="urot" style="animation-duration:9s"><path d="M150 84v-18M150 216v18M84 150h-18M216 150h18" stroke="#ffd54f" stroke-width="5"/></g>`}
 <g class="upu"><circle cx="150" cy="150" r="22" fill="${ph?"#fff":"#fff59d"}" style="filter:drop-shadow(0 0 18px ${ph?"#b388ff":"#ffd54f"})"/></g>
 <g class="uwing uwl"><path d="M70 180Q30 150 10 90Q40 112 56 100Q50 128 76 134Z" fill="${uGold}" stroke="${uGoldE}" stroke-width="2.5"/></g><g class="uwing uwr"><path d="M230 180Q270 150 290 90Q260 112 244 100Q250 128 224 134Z" fill="${uGold}" stroke="${uGoldE}" stroke-width="2.5"/></g>
 <circle cx="150" cy="586" r="10" fill="${uGold}" stroke="${uGoldE}" stroke-width="2"/></g>${big?uSparks("#d1b3ff","#ffd54f","#fff"):""}`;

// ---- Dolche ----
// Zwillingsfang: Klinge mit gespiegeltem Geisterzwilling, Reißzahn-Parier
UG.zwillingsfang=[150,410,.2];
UNIQV.zwillingsfang=(ph,big)=>`${big?uHalo(150,300,160,"#4dd0e1")+uBigRing(150,300,120,"#80deea",12):""}
 <g class="ufl"><g class="uzz2" opacity=".65"><path d="M168 430L172 190Q200 110 232 70Q222 150 214 220L206 430Z" fill="#80deea" stroke="#e0f7fa" stroke-width="3"/></g>
 <path d="M112 440L110 180Q96 120 70 80Q96 130 120 190L136 440Z" fill="#fff" stroke="#4dd0e1" stroke-width="3" opacity=".9"/>
 <path d="M122 440L128 130Q140 70 150 24Q168 90 176 150L182 440Z" fill="#eaf8fa" stroke="#4dd0e1" stroke-width="4"/><path d="M150 40V430" stroke="#26c6da" stroke-width="3"/><path d="M134 200l16-14l16 14M134 260l16-14l16 14M134 320l16-14l16 14" stroke="#4dd0e1" stroke-width="2.5" fill="none"/>
 <path d="M70 450Q150 420 230 450L214 478Q150 458 86 478Z" fill="${uGold}" stroke="${uGoldE}" stroke-width="3.5"/><path d="M74 454L50 500L96 474ZM226 454L250 500L204 474Z" fill="#fff" stroke="#4dd0e1" stroke-width="3"/>${uGem(150,462,9,"#4dd0e1")}
 <rect x="138" y="478" width="24" height="76" rx="7" fill="#17343a" stroke="#04141a" stroke-width="2.5"/><path d="M138 494h24M138 512h24M138 530h24" stroke="#4dd0e1" stroke-width="3"/>
 <path d="M130 556h40l-20 36z" fill="${uGold}" stroke="${uGoldE}" stroke-width="3"/></g>${big?uSparks("#80deea","#fff","#4dd0e1"):""}`;
// Schattenstich: schwarze Klinge, violette Kante, Rauch und Nachbilder
UG.schattenstich=[150,410,.2];
UNIQV.schattenstich=(ph,big)=>`${big?uHalo(150,300,160,"#7c4dff")+uBigRing(150,300,120,"#b388ff",12):""}
 <g class="ufl"><g class="uzz2" opacity=".5"><path d="M110 430L128 130Q140 70 150 24Q168 90 172 150L190 430Z" fill="#7c4dff" transform="translate(-26 8)"/></g><g class="uzz" opacity=".35"><path d="M110 430L128 130Q140 70 150 24Q168 90 172 150L190 430Z" fill="#b388ff" transform="translate(24 -6)"/></g>
 <path d="M110 430L128 130Q140 70 150 24Q168 90 172 150L190 430Z" fill="#0f0a1c" stroke="#b388ff" stroke-width="4.5" style="filter:drop-shadow(0 0 12px #7c4dff)"/><path d="M150 34V420" stroke="#4a2a9a" stroke-width="3"/><path d="M126 330Q150 300 174 330M130 250Q150 224 170 250" stroke="#b388ff" stroke-width="2.5" fill="none"/>
 <g class="ufl2" fill="#4a148c" opacity=".7"><path d="M96 200q-26-20-18-54q22 20 18 54z"/><path d="M204 280q26-20 18-54q-22 20-18 54z"/><path d="M110 380q-30-10-30-40q24 12 30 40z"/></g>
 <path d="M80 446Q150 410 220 446L206 476Q150 450 94 476Z" fill="#1c1230" stroke="#b388ff" stroke-width="3.5"/><path d="M80 446L52 420L70 456ZM220 446L248 420L230 456Z" fill="#7c4dff" stroke="#b388ff" stroke-width="2"/>
 <ellipse class="uzz" cx="150" cy="458" rx="14" ry="8" fill="#e040fb" style="filter:drop-shadow(0 0 8px #e040fb)"/><ellipse cx="150" cy="458" rx="3" ry="8" fill="#0f0a1c"/>
 <rect x="138" y="478" width="24" height="76" rx="7" fill="#1c1230" stroke="#0a0614" stroke-width="2.5"/><path d="M138 494h24M138 512h24M138 530h24" stroke="#7c4dff" stroke-width="3"/><path d="M130 556h40l-20 36z" fill="#4a148c" stroke="#b388ff" stroke-width="2.5"/></g>${big?uSparks("#b388ff","#e040fb","#fff"):""}`;
// Trugspiegel: facettierte Spiegelklinge, sechseckiger Rahmen, Reflexe
UG.trugspiegel=[150,410,.2];
UNIQV.trugspiegel=(ph,big)=>`<defs><linearGradient id="utr-m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0f7fa"/><stop offset=".3" stop-color="#fff"/><stop offset=".55" stop-color="#4dd0e1"/><stop offset="1" stop-color="#e1f5fe"/></linearGradient></defs>
 ${big?uHalo(150,300,160,"#80deea")+uBigRing(150,300,120,"#e0f7fa",12):""}
 <g class="ufl"><path d="M124 440L112 250L150 24L188 250L176 440Z" fill="url(#utr-m)" stroke="#fff" stroke-width="4"/><path d="M150 28V432M118 250H182M132 340L150 250L168 340M132 160L150 250L168 160" stroke="#4dd0e1" stroke-width="2.5" fill="none" opacity=".85"/>
 <g class="uzz"><path d="M138 120l18 70M168 220l-14 100" stroke="#fff" stroke-width="5" opacity=".9"/></g>
 <g class="uzz2" fill="#fff"><path d="M92 200l6 10l10 6l-10 6l-6 10l-6-10l-10-6l10-6z"/><path d="M208 330l5 9l9 5l-9 5l-5 9l-5-9l-9-5l9-5z"/></g>
 <path d="M150 424l50 22l0 46l-50 22l-50-22l0-46z" fill="${uGold}" stroke="${uGoldE}" stroke-width="4"/><path d="M150 440l34 16l0 34l-34 16l-34-16l0-34z" fill="#12343a" stroke="#4dd0e1" stroke-width="3"/>${uGem(150,473,12,"#80deea")}
 <path d="M100 446L70 432L88 468ZM200 446L230 432L212 468Z" fill="#fff" stroke="#4dd0e1" stroke-width="3"/>
 <rect x="138" y="516" width="24" height="52" rx="7" fill="#17343a" stroke="#04141a" stroke-width="2.5"/><path d="M138 532h24M138 548h24" stroke="#4dd0e1" stroke-width="3"/><path d="M132 570h36l-18 30z" fill="${uGold}" stroke="${uGoldE}" stroke-width="3"/></g>${big?uSparks("#e0f7fa","#fff","#80deea"):""}`;

// Große und kleine Fassung
const uniqBig=(id,ph)=>`<svg class="ub" viewBox="0 0 300 600" aria-hidden="true">${UNIQV[id](ph?1:0,true)}</svg>`;
const uniqSmall=(id,ph)=>{const g=UG[id];return `<g class="us" data-u="${id}" transform="translate(${(107.5-g[0]*g[2]).toFixed(1)} ${(105.5-g[1]*g[2]).toFixed(1)}) scale(${g[2]})">${UNIQV[id](ph?1:0,false)}</g>`};
// ---- Kampfanimationen (VX: c = "vE" Gegner / "vP" Spieler) ----
Object.assign(VX,{
u_dbl:c=>`<svg class="${c}" viewBox="0 0 120 120"><path class="sl r" d="M8 104L112 14"/><path class="sl r b" d="M12 12L108 110"/></svg><span class="udbl ${c}">×2</span>`,
u_chain:c=>`<svg class="uchain" viewBox="0 0 300 160"><path d="M40 0L120 60L96 66L176 116L152 122L230 160" stroke="#fff" stroke-width="7" fill="none"/><path d="M40 0L120 60L96 66L176 116L152 122L230 160" stroke="#7fd0ff" stroke-width="14" fill="none" opacity=".6"/></svg><span class="flash" style="background:#bfe6ff"></span>`,
u_laser:c=>`<span class="ulcharge"></span><span class="ulaser"></span><span class="flash" style="background:#ff2fb4"></span>`,
u_ret:c=>`<svg class="uret" viewBox="0 0 200 20"><path d="M10 10H170" stroke="#fff" stroke-width="5"/><path d="M10 10l16-9v18z" fill="#ffd54f"/><path d="M170 10l-12-8m12 8l-12 8" stroke="#ffd54f" stroke-width="4"/></svg>`,
u_soul:c=>`<span class="rise ${c}">👻💚✨</span>`,
u_blood:c=>`<span class="ublood ${c}"></span>`,
u_mercy:c=>`<span class="flash"></span><span class="blast ${c}">💀</span>`,
u_pierce:c=>`<svg class="${c}" viewBox="0 0 120 120"><path class="sl r" d="M60 4L60 116"/></svg><span class="blast ${c}">💥</span>`,
u_time:c=>`<span class="ring ${c}" style="border-color:#b388ff"></span><span class="spin ${c}">⏳</span>`,
u_mirror:c=>`<span class="umirror ${c}"></span><span class="blast ${c}">🪞</span>`,
u_phoenix:c=>`<span class="flash fire"></span><span class="rise ${c}">🔥🔥🔥</span><span class="blast ${c}">🔥</span>`,
u_storm:c=>`<span class="aura ${c}">🌩️</span><span class="flash" style="background:#90caf9"></span>`,
u_morph:c=>`<span class="flash" style="background:#e040fb"></span><span class="aura ${c}">🌀</span>`});
// ---- Enthüllung: Blitz schlägt in die Truhe, Deckel springt auf, die Waffe dreht sich heraus, Name und Effekt schlagen ein ----
function uniqueReveal(it){if(typeof document==="undefined"||!document.body)return;const old=document.getElementById("ureveal");if(old)old.remove();
 const d=UNIQ.find(x=>x.id===it.u),el=document.createElement("div");el.id="ureveal";
 el.innerHTML=`<div class="ur-st"><div class="ur-bgl"></div><svg class="ur-bolt" viewBox="0 0 100 300" preserveAspectRatio="none"><path d="M54 0L38 90L62 96L30 190L52 196L40 300" stroke="#fff" stroke-width="5" fill="none"/><path d="M54 0L38 90L62 96L30 190L52 196L40 300" stroke="#8ad4ff" stroke-width="12" fill="none" opacity=".6"/></svg>
  <div class="ur-beam"></div>
  <div class="ur-w">${uniqBig(it.u)}</div>
  <svg class="ur-chest" viewBox="0 0 200 150"><path d="M20 60h160v80H20z" fill="#5a3a1c" stroke="#1c1008" stroke-width="4"/><path d="M20 90h160M60 60v80M140 60v80" stroke="#8a8a8a" stroke-width="5"/><rect x="88" y="84" width="24" height="26" rx="4" fill="#c9971a" stroke="#5d4a2c" stroke-width="3"/><g class="ur-lid"><path d="M14 62Q14 12 100 12Q186 12 186 62Z" fill="#6a4624" stroke="#1c1008" stroke-width="4"/><path d="M60 14v48M140 14v48" stroke="#8a8a8a" stroke-width="5"/></g></svg>
  <div class="ur-t"><b>✦ ${t("ux.tag")}</b><span>${it.n}</span></div>
  <div class="ur-e">${d.ef.map(k=>`<div><b>${t("ue.nm."+k)}</b><br>${t("ue.d."+k,uPct(k,it))}</div>`).join("")}</div>
  <button class="p ur-b">${t("ux.reveal")}</button><div class="ur-fl"></div></div>`;
 const close=()=>{el.remove();document.removeEventListener("keydown",key,true)},key=e=>{if(e.key==="Enter"||e.key==="Escape"||e.key===" "){e.preventDefault();e.stopPropagation();close()}};
 el.querySelector("button").onclick=close;document.addEventListener("keydown",key,true);document.body.appendChild(el)}
