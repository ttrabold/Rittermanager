// Ritter Manager – Sprachen: Auswahl, Textabruf t(…) und Texte für Datentabellen. Die Texte stehen in js/lang/<sprache>.js
const I18N={},LANGS={de:"Deutsch",en:"English"};
// Spielversion (Semantic Versioning, z. B. 0.1.0) = ?v= an der Skript-URL in index.html; ohne ?v= (Tests, lokal) „dev“
const VERSION=((document.currentScript&&/[?&]v=(\d+\.\d+\.\d+)/.exec(document.currentScript.src))||[])[1]||"dev";
// Gewählte Sprache (für alle Spielstände), sonst Browser-Sprache; ?lang=en in der Adresse geht vor (für Tests)
let LANG=(()=>{let l=null;try{l=localStorage.getItem("ritter_lang")}catch(e){}
 try{const q=new URLSearchParams(location.search).get("lang");if(q)l=q}catch(e){}
 if(!l)l=/^de\b/i.test(navigator.language||"")?"de":"en";return l in LANGS?l:"de"})();
const tGet=(o,k)=>{for(const p of k.split(".")){if(o==null)return undefined;o=o[p]}return o};
// t("bereich.schlüssel", …): Text der aktiven Sprache, sonst Deutsch; Funktionen bekommen die übrigen Argumente
function t(k,...a){let v=tGet(I18N[LANG],k);if(v===undefined)v=tGet(I18N.de,k);if(v===undefined){console.warn("i18n: fehlt",k);return k}return typeof v==="function"?v(...a):v}
// Texte an Datenobjekte hängen: Abschnitt sec, Schlüssel je Objekt (Standard: id). mv = Namen der Angriffe, vorn eingefügt
function loc(sec,arr,key){const kf=key||(o=>o.id);arr.forEach((o,i)=>{const k=kf(o,i),p=k===""?sec:sec+"."+k,x=Object.assign({},tGet(I18N.de,p),tGet(I18N[LANG],p));
 for(const f in x){if(f==="mv")o.mv=o.mv.map((m,j)=>[x.mv[j],...m]);else o[f]=x[f]}});return arr}
const tr=t;  // für Stellen, an denen „t“ ein lokaler Name ist
const loc1=(sec,o)=>(loc(sec,[o],()=>"")[0]);
// Sprache wechseln: speichern und neu laden (ohne ?lang=, das sonst Vorrang hätte)
function setLang(l){if(!(l in LANGS)||l===LANG)return;try{localStorage.setItem("ritter_lang",l)}catch(e){}if(typeof save==="function")save();
 const u=new URL(location.href);if(u.searchParams.has("lang")){u.searchParams.delete("lang");location.replace(u.href)}else location.reload()}
document.documentElement.lang=LANG;
// Seitentitel, Beschreibung, App-Titel und Manifest in der aktiven Sprache (läuft beim Start, nachdem die Sprachdateien geladen sind)
function i18nHead(){const m=t("meta"),q=s=>document.querySelector(s),set=(s,v)=>{const e=q(s);if(e)e.setAttribute("content",v)};
 document.title=m.title;set('meta[name="description"]',m.desc);set('meta[name="apple-mobile-web-app-title"]',m.short);const l=q('link[rel="manifest"]');if(l)l.setAttribute("href",m.manifest)}
