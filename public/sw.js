'use strict';
const CACHE_NAME_PREFIX = 'react-ocean';
const CACHE_NAME_VERSION = 1;
const CACHE_NAME = CACHE_NAME_PREFIX + CACHE_NAME_VERSION;
const CACHE_RULES = [/index\.\d{13}\.js(\?|$)/i, /\/imgs\/.+\.(png|jpg|jpeg|gif)(\?|$)/i, /\/.+\.(png|jpg|jpeg|gif)(\?|$)/i];
self.addEventListener('activate', function (event) {
    console.info('---on service worker activate---');
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
            if (0 == cacheName.indexOf(CACHE_NAME_PREFIX) && cacheName !== CACHE_NAME) {
                return caches.delete(cacheName);
            }
        }));
    }));
});
self.addEventListener('install', function (event) {
    console.info('---on service worker install---');
});
self.addEventListener('fetch', function (event) {
    var match = false;
    for (var i = 0, reg; reg = CACHE_RULES[i++];) {
        match = match || new RegExp(reg).test(event.request.url);
    }
    if (!match) {
        event.respondWith(fetch(event.request));
        return;
    }
    event.respondWith(caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(event.request).then(function (response) {
            var fetchRequest = event.request.clone();
            if (response) {
                return response;
            }
            return fetch(fetchRequest, {mode: 'cors', credentials: 'omit'}).then(function (response) {
                if (!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')) {
                    return response;
                }
                var responseToCache = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        });
    }).catch(function (error) {
        return fetch(event.request);
    }));
});
