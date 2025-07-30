const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/css',
  '/js',
  '/fonts',
  '/icons'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Принудительно активирует новый SW
  event.waitUntil(
    caches.delete('my-pwa-cache-v1') // Удаляет старый кэш
      .then(() => caches.open('my-pwa-cache-v2')) // Создает новый
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});