const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/main.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.mode === 'navigate') {
        event.respondWith(
            caches.match('/index.html')
                .then((response) => {
                    return response || fetch(request);
                })
        );
    } else {
        event.respondWith(
            caches.match(request)
                .then((response) => {
                    return response || fetch(request);
                })
        );
    }
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_LOCALSTORAGE') {
        const localStorageData = event.data.data;
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.put('/localStorage', new Response(localStorageData));
            });
    } else if (event.data.type === 'RETRIEVE_LOCALSTORAGE') {
        caches.match('/localStorage')
            .then((response) => {
                if (response) {
                    return response.text();
                }
                return null;
            })
            .then((data) => {
                if (data) {
                    self.clients.matchAll().then((clients) => {
                        clients.forEach((client) => {
                            client.postMessage({
                                type: 'RETRIEVE_LOCALSTORAGE',
                                data: data
                            });
                        });
                    });
                }
            });
    }
    else if (event.data.type === 'CACHE_INDEXEDDB') {
        const indexedDBData = event.data.data;
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.put('/indexedDB', new Response(indexedDBData));
            });
    } else if (event.data.type === 'RETRIEVE_INDEXEDDB') {
        caches.match('/indexedDB')
            .then((response) => {
                if (response) {
                    return response.text();
                }
                return null;
            })
            .then((data) => {
                if (data) {
                    self.clients.matchAll().then((clients) => {
                        clients.forEach((client) => {
                            client.postMessage({
                                type: 'RETRIEVE_INDEXEDDB',
                                data: data
                            });
                        });
                    });
                }
            });
    }
});