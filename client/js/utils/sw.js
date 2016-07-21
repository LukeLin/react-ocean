'use strict';

/**
 * http://www.html5rocks.com/en/tutorials/service-worker/introduction/
 */

let CACHE_NAME = 'react-ocean-v1';
let urlsToCache = [
    '/static/css/main-min.css',
    '/static/js/libs-min.js',
    '/static/js/min/index.js'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    let match = false;
    for(let url of urlsToCache){
        if(event.request.url.indexOf(url) >= 0){
            match = true;
            break;
        }
    }

    if(!match) {
        event.respondWith(fetch(event.request));
        return;
    }

    console.log(`service worker fetching ${ event.request.url }`);

    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                console.log('response: ' + response);
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. Since we are consuming this
                // once by cache and once by the browser for fetch, we need
                // to clone the response
                let fetchRequest = event.request.clone();

                return fetch(fetchRequest, {
                    mode: 'cors',
                    credentials: 'omit'
                }).then(
                    function(response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')) {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have 2 stream.
                        let responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

self.addEventListener('activate', function(event) {
    let cacheWhitelist = ['pages-cache-v1'];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
