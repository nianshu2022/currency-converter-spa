/* ==========================================================================
   GlobalRate Service Worker - Offline Cache & PWA Support
   ========================================================================== */

const CACHE_NAME = 'globalrate-v2';

// Static app shell assets to cache on install
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './icon-512.png',
  './icon-192.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://unpkg.com/lucide@latest'
];

// Install: Pre-cache app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache what we can, but don't fail if CDN resources aren't available
      return Promise.allSettled(
        APP_SHELL.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Failed to cache:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Helper to handle response redirects (workaround for iOS Safari "Response served by service worker has redirections" error)
function handleResponse(request, response) {
  if (response.redirected) {
    return fetch(response.url).then(cleanResponse => {
      if (cleanResponse.ok) {
        const clone = cleanResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
      }
      return cleanResponse;
    });
  }
  
  if (response.ok) {
    const clone = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
  }
  return response;
}

// Fetch: Cache-first for app shell, network-first for API calls
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Don't intercept non-GET requests or chrome-extension requests
  if (event.request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

  // Network-first for API calls (fresh rates are important)
  if (url.hostname.includes('frankfurter') || url.hostname.includes('exchangerate')) {
    event.respondWith(
      fetch(event.request)
        .then(response => handleResponse(event.request, response))
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(event.request);
        })
    );
    return;
  }

  // Cache-first for app shell & static assets
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => handleResponse(event.request, response));
    })
  );
});
