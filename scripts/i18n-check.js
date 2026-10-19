// Ritter Manager – Prüft die Übersetzungen ohne Browser: node scripts/i18n-check.js
// 1. Jede Sprache hat dieselben Schlüssel wie Deutsch (und umgekehrt).
// 2. Jeder im Code benutzte t("…")-Schlüssel existiert.
// 3. Jedes App-Manifest stimmt mit meta der Sprachdatei überein (name, short_name, description, lang).
const fs=require("fs"),path=require("path"),vm=require("vm");
const R=path.join(__dirname,"..");
const ctx={console,localStorage:{getItem:()=>null,setItem(){}},location:{search:""},navigator:{language:"de"},document:{documentElement:{},querySelector:()=>null},URLSearchParams};
vm.createContext(ctx);
const langFiles=fs.readdirSync(path.join(R,"js/lang")).filter(f=>f.endsWith(".js"));
for(const f of["js/i18n.js",...langFiles.map(f=>"js/lang/"+f)])vm.runInContext(fs.readFileSync(path.join(R,f),"utf8")+"\n;this.I18N=I18N;this.LANGS=LANGS;this.tGet=tGet;",ctx);
const {I18N,LANGS,tGet}=ctx,err=[];
for(const l of Object.keys(LANGS))if(!I18N[l])err.push(`Sprachdatei fehlt: js/lang/${l}.js`);

// 1. Gleiche Schlüssel
const walk=(a,b,p,what)=>{if(typeof a!=="object"||a===null||a instanceof RegExp)return;for(const k in a){if(!(k in b))err.push(`${what}: ${p}${k}`);else walk(a[k],b[k],p+k+".",what)}};
for(const l of Object.keys(I18N))if(l!=="de"){walk(I18N.de,I18N[l],"",`fehlt in ${l}`);walk(I18N[l],I18N.de,"",`nur in ${l}, nicht in de`)}

// 2. Benutzte Schlüssel (feste Schlüssel; zusammengesetzte wie t("ev."+id) prüfen die Browser-Tests)
const code=fs.readdirSync(path.join(R,"js")).filter(f=>f.endsWith(".js")).map(f=>fs.readFileSync(path.join(R,"js",f),"utf8")).join("\n");
const used=new Set([...code.matchAll(/\btr?\("([a-zA-Z][a-zA-Z0-9_.]*)"/g)].map(m=>m[1]).filter(k=>!k.endsWith(".")));
for(const k of used)for(const l of Object.keys(I18N))if(tGet(I18N[l],k)===undefined&&!(l!=="de"&&tGet(I18N.de,k)!==undefined))err.push(`Schlüssel fehlt (${l}): ${k}`);

// 3. Manifeste
for(const l of Object.keys(I18N)){const m=I18N[l].meta||{},f=path.join(R,m.manifest||"");
 if(!m.manifest||!fs.existsSync(f)){err.push(`Manifest fehlt (${l}): ${m.manifest}`);continue}
 const j=JSON.parse(fs.readFileSync(f,"utf8"));
 for(const[a,b]of[["name","title"],["short_name","short"],["description","desc"]])if(j[a]!==m[b])err.push(`${m.manifest}: ${a} ist „${j[a]}“, Sprachdatei meta.${b} sagt „${m[b]}“`);
 if(j.lang!==l)err.push(`${m.manifest}: lang ist „${j.lang}“, erwartet „${l}“`)}

if(err.length){console.log(err.join("\n"));console.log(`\n${err.length} Probleme`);process.exit(1)}
console.log(`i18n ok: ${Object.keys(I18N).join(", ")} · ${used.size} Schlüssel im Code · Manifeste passen`);
