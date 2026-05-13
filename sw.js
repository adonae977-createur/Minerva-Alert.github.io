/* Minerva — offline shell + runtime cache (HTTPS or localhost only) */
var CACHE_NAME = 'minerva-v3';
var PRECACHE_URLS = [
  './minerva.html',
  './minerva-appels.html',
  './minerva-services.html',
  './minerva-publier.html',
  './minerva-connexion.html',
  './minerva-inscription.html',
  './minerva-apropos.html',
  './minerva-dashboard.html',
  './minerva-shared.css',
  './manifest.webmanifest',
  './pwa-register.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        PRECACHE_URLS.map(function (url) {
          return cache.add(url).catch(function () {});
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        if (response && response.status === 200 && response.type === 'basic') {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, copy);
          });
        }
        return response;
      })
      .catch(function () {
        return caches.match(event.request).then(function (hit) {
          return hit || caches.match('./minerva.html');
        });
      })
  );
});
