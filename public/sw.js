const CACHE_NAME = 'motion-graph-sketchpad-__BUILD_ID__';
const FIXED_ASSETS = [
  '/', '/demo', '/privacy', '/terms', '/manifest.webmanifest', '/favicon.svg',
  '/assets/hero-night-bay-768.webp', '/assets/hero-night-bay-1280.webp',
  '/assets/hero-night-bay-768.avif', '/assets/hero-night-bay-1280.avif',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch('/');
    const html = await response.clone().text();
    await cache.put('/', response);
    const builtAssets = [...html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)].map((match) => match[1]);
    await Promise.allSettled([...new Set([...FIXED_ASSETS, ...builtAssets])].map((url) => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response.ok) await cache.put(event.request, response.clone());
      return response;
    } catch {
      if (event.request.mode === 'navigate') return (await cache.match('/')) || Response.error();
      return Response.error();
    }
  })());
});
