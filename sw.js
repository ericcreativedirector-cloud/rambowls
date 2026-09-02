// Rambowls Scheduler - offline cache
// Bump CACHE when you push an update, so phones pick up the new version.
const CACHE = 'rambowls-v43';

const ASSETS = [
  './',
  './index.html',
  './data.js',
  './tracker/',
  './tracker/index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
      // Tell every open page that a new version is live. Paired with
      // skipWaiting above, this means nobody is reading a stale build
      // because their phone kept the tab open overnight.
      .then(() => self.clients.matchAll({type: 'window'}))
      .then(cs => cs.forEach(c => c.postMessage({type: 'RB_UPDATED', cache: CACHE})))
  );
});

// Network first, cache as fallback. A pushed update shows up immediately when
// there is signal, and the page still opens if the network drops.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
  );
});
