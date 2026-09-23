const CACHE='further-mechanics-thermal-v11b';
const ASSETS=["./","./index.html","./styles.css","./further.css","./assessment-equation-v11.css","./content-v2.js","./lesson-detail-v3.js","./calculation-detail-v4.js","./textbook-mechanics-v6.js","./textbook-thermal-v6.js","./textbook-visuals-v6.js","./app-v2.js","./sim-learning-v8.js","./mastery-core-v5.js","./mastery-practice-v5.js","./mastery-data-v5.js","./mastery-teacher-v5.js","./classroom-suite-v9.js","./assessment-equation-v11.js","./assessment-equation-fix-v11.js","./manifest.webmanifest","./physics-icon.svg"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);if(u.origin!==location.origin)return;
 if(e.request.mode==='navigate'){
   e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return r}).catch(()=>caches.match('./index.html',{ignoreSearch:true})));
   return;
 }
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(cached=>{
   const fresh=fetch(e.request).then(r=>{if(r&&r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>cached);
   return cached||fresh;
 }));
});