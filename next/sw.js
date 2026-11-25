// Network-first app-shell caching — deliberately NOT cache-first.
// A cache-first service worker is exactly what caused "I pushed a fix
// but the old broken version kept showing" earlier in this same
// project's history. Network-first means: online, you always get the
// current deploy; offline, you fall back to whatever was last cached.
const CACHE_NAME = 'med100-rhythm-v1';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/med100.css',
  './js/core/rhythm.js',
  './js/app.js',
  './js/router.js',
  './js/state.js',
  './js/core/firebase.js',
  './js/core/auth.js',
  './js/core/sync.js',
  './js/core/storage.js',
  './js/core/dom.js',
  './js/core/streaks.js',
  './js/features/dashboard.js',
  './js/features/challenge.js',
  './js/features/topics.js',
  './js/features/mastery.js',
  './js/features/teaching.js',
  './js/features/reviews.js',
  './js/features/notes.js',
  './js/features/analytics.js',
  './js/features/profile.js',
  './js/data/curriculum.js',
  './js/data/questions.js',
  './js/data/demo-data.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)).catch((err) => {
      console.error('[sw] precache failed:', err);
    }),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n.startsWith('med100-rhythm') && n !== CACHE_NAME).map((n) => caches.delete(n))),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Never intercept cross-origin requests (Firebase/gstatic/fonts) —
  // only the app's own same-origin shell files are cached here.
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});
