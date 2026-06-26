/* ==========================================================================
   GlobalRate Service Worker - Offline Cache & PWA Support
   ========================================================================== */

const CACHE_NAME = 'globalrate-v3';

// Static app shell assets to cache on install
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './icon-512.png',
  './icon-192.png'
];

// CDN resources cached separately (best-effort, non-blocking)
const CDN_RESOURCES = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js',
  'https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js'
];

// Offline fallback HTML (inline, no external dependencies)
const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GlobalRate - 离线</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
background:#0b0f19;color:#e2e8f0;display:flex;align-items:center;
justify-content:center;min-height:100vh;min-height:100dvh;padding:20px;text-align:center}
.offline-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
border-radius:20px;padding:40px 30px;max-width:360px;width:100%}
.icon{font-size:48px;margin-bottom:16px}
h1{font-size:20px;font-weight:600;margin-bottom:8px}
p{font-size:14px;color:#94a3b8;line-height:1.6;margin-bottom:24px}
.retry-btn{background:#6366f1;color:#fff;border:none;border-radius:12px;
padding:12px 32px;font-size:15px;font-weight:600;cursor:pointer;
transition:background .2s}
.retry-btn:active{background:#4f46e5}
.hint{font-size:12px;color:#64748b;margin-top:16px}
</style>
</head>
<body>
<div class="offline-card">
<div class="icon">📡</div>
<h1>无法连接网络</h1>
<p>GlobalRate 需要网络连接来获取最新汇率数据。<br>请检查您的网络设置后重试。</p>
<button class="retry-btn" onclick="location.reload()">重新加载</button>
<p class="hint">提示：首次加载成功后，部分功能可在离线状态下使用。</p>
</div>
</body>
</html>`;

// Install: Pre-cache app shell + offline page
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache core app shell (must succeed)
      const corePromise = Promise.allSettled(
        APP_SHELL.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Failed to cache core:', url, err))
        )
      );
      // Cache offline fallback page
      const offlinePromise = cache.put(
        new Request('./offline.html'),
        new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html;charset=utf-8' } })
      );
      // Cache CDN resources (best-effort)
      const cdnPromise = Promise.allSettled(
        CDN_RESOURCES.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Failed to cache CDN:', url, err))
        )
      );
      return Promise.all([corePromise, offlinePromise, cdnPromise]);
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

// Helper: put response in cache
function putInCache(request, response) {
  if (response.ok) {
    const clone = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
  }
  return response;
}

// Helper: handle redirected responses (iOS Safari workaround)
function handleResponse(request, response) {
  if (response.redirected) {
    return fetch(response.url).then(cleanResponse => {
      return putInCache(request, cleanResponse);
    }).catch(() => response);
  }
  return putInCache(request, response);
}

// Fetch handler
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Don't intercept non-GET requests or chrome-extension requests
  if (event.request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

  // Network-first for API calls (fresh rates are important)
  if (url.hostname.includes('frankfurter') || url.hostname.includes('exchangerate')) {
    event.respondWith(
      fetch(event.request)
        .then(response => handleResponse(event.request, response))
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Network-first for HTML navigations (ensures fresh content after iOS cache rebuild)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => putInCache(event.request, response))
        .catch(() =>
          caches.match(event.request)
            .then(cached => cached || caches.match('./offline.html'))
        )
    );
    return;
  }

  // Cache-first for static assets (CSS, JS, images, fonts)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(response => handleResponse(event.request, response))
        .catch(() => {
          // If it's a font/CSS request, return empty response instead of failing
          if (event.request.destination === 'style' || event.request.destination === 'font') {
            return new Response('', { headers: { 'Content-Type': event.request.destination === 'style' ? 'text/css' : 'font/woff2' } });
          }
          return Response.error();
        });
    })
  );
});
