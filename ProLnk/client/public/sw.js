// sw.js — KILL SWITCH.
// The previous service worker repeatedly served stale/broken JS chunks and
// mishandled redirects ("Failed to convert value to 'Response'"). It is now
// permanently disabled. Any browser that fetches this file will unregister the
// SW, wipe all caches, and reload with fresh assets straight from the network.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (e) {}
    try { await self.registration.unregister(); } catch (e) {}
    try {
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((c) => { try { c.navigate(c.url); } catch (e) {} });
    } catch (e) {}
  })());
});
// No fetch handler — all requests go straight to the network.
