const cacheName = location.hostname

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(resources);
};

self.addEventListener('activate', () => {
  return self.clients.claim();
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    addResourcesToCache([
      '/',
      '/index.html',
      '/error.html'
    ])
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.open(cacheName).then((cache) => {
    return cache.match(event.request.url).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((fetchedResponse) => {
        cache.put(event.request.url, fetchedResponse.clone());
        return fetchedResponse
      })
    })
  }))
});