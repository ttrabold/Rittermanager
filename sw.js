// Ritter Manager – Service-Worker: Seiten frisch aus dem Netz (sonst Cache), Dateien aus dem Cache und im Hintergrund aktualisieren
// Version kommt von index.html über sw.js?v=… (eine Stelle, siehe V in index.html)
const CACHE="ritter-v"+(new URL(self.location.href).searchParams.get("v")||"dev");
self.addEventListener("install",e=>{self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
 if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r).then(m=>m||caches.match("./"))));return}
 e.respondWith(caches.open(CACHE).then(c=>c.match(r).then(m=>{const net=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>m);return m||net})))});
