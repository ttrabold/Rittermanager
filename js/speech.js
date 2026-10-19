// Ritter Manager – Sprachausgabe: liest neue Meldungen mit der eingebauten Browser-Stimme vor (Web Speech API)

const TTS={ok:"speechSynthesis" in window,on:true,last:"",recent:[],voice:null,timer:null};
try{if(localStorage.getItem("ritter_tts")==="0")TTS.on=false}catch(e){}
function ttsVoice(){const v=speechSynthesis.getVoices(),L=t("tts.lang"),de=v.filter(x=>x.lang.slice(0,2).toLowerCase()===L.slice(0,2));
 TTS.voice=de.find(x=>/natural|neural|online|google|premium|enhanced/i.test(x.name))||de.find(x=>x.lang.replace("_","-").toLowerCase()===L.toLowerCase())||de[0]||null}
// Text fürs Vorlesen aufbereiten: Emojis raus, Zeichen und Abkürzungen ausschreiben (Ersetzungen je Sprache unter tts.rep)
function ttsClean(s){let x=s
 .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\uFE0F\u200D\u2600-\u27BF]/gu,"");
 for(const[a,b]of t("tts.rep"))x=x.replace(a,b);
 return x
 .replace(/[→·|]/g,", ").replace(/[„“"«»]/g,"").replace(/\s*\n+\s*/g,". ").replace(/([!?.:;,])\s*\./g,"$1").replace(/\s{2,}/g," ").trim()}
function say(text){if(!TTS.ok||!TTS.on)return;const t=ttsClean(text||"");if(!t)return;
 speechSynthesis.cancel();setTimeout(()=>{const u=new SpeechSynthesisUtterance(t);u.lang=tr("tts.lang");if(TTS.voice)u.voice=TTS.voice;u.rate=1.05;speechSynthesis.speak(u)},60)}
function ttsScan(){const t=[...app.querySelectorAll(".msg:not([data-quiet])")].map(e=>e.innerText).join("\n").trim();if(t&&t!==TTS.last){TTS.last=t;if(TTS.recent.includes(t))return;TTS.recent=[t,...TTS.recent].slice(0,2);say(t)}}
function toggleV(){TTS.on=!TTS.on;try{localStorage.setItem("ritter_tts",TTS.on?"1":"0")}catch(e){}if(TTS.on){TTS.last="";TTS.recent=[];say(t("tts.on"))}else speechSynthesis.cancel();updV()}
function updV(){const b=document.getElementById("vb");if(b)b.className=TTS.on?"":"off"}
if(TTS.ok){ttsVoice();speechSynthesis.onvoiceschanged=ttsVoice;
 const b=document.createElement("button");b.id="vb";b.textContent="🗣️ "+t("tts.btn");b.setAttribute("aria-label",t("tts.aria"));b.onclick=toggleV;document.getElementById("snd").appendChild(b);updV();
 new MutationObserver(()=>{clearTimeout(TTS.timer);TTS.timer=setTimeout(ttsScan,80)}).observe(app,{childList:true,subtree:true});
 document.addEventListener("visibilitychange",()=>{if(document.hidden)speechSynthesis.cancel()})}
