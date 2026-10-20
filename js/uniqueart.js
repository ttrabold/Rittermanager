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
// Große und kleine Fassung
const uniqBig=(id,ph)=>`<svg class="ub" viewBox="0 0 300 600" aria-hidden="true">${UNIQV[id](ph?1:0,true)}</svg>`;
const uniqSmall=(id,ph)=>{const g=UG[id];return `<g class="us" data-u="${id}" transform="translate(${(107.5-g[0]*g[2]).toFixed(1)} ${(105.5-g[1]*g[2]).toFixed(1)}) scale(${g[2]})">${UNIQV[id](ph?1:0,false)}</g>`};
