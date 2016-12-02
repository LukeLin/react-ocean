var config = {
    db: 'sw_gamPportal_201612011014'
};

var urlsToCache = [
    
];

var addToCache = function (req) {
    return fetch(req.clone()).then(function (resp) {
        var cacheResp = resp.clone();
        if (resp.status !== 200 || (resp.type !== 'basic' && resp.type !== 'cors')) {
            return resp;
        }
        caches.open(config.db).then(function (cache) {
            cache.put(req.clone(), cacheResp);
        });
        return resp;
    });
};


// self.addEventListener('install', function (e) {
//     // See https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-global-scope-skipwaiting
//     if (typeof self.skipWaiting === 'function') {
//         e.waitUntil(self.skipWaiting());
//     }

// });

self.addEventListener('activate', function (event) {
    // event.waitUntil(Promise.all([
    //     caches.keys().then(function (cacheNames) {
    //         return Promise.all(cacheNames.map(function (cacheName) {
    //             if (cacheName !== config.db) {
    //                 return caches.delete(cacheName);
    //             }
    //         }));
    //     }),
    //     typeof self.clients.claim === 'function' && self.clients.claim()
    // ]));

    // 内核的cache.delete有bug，这里先注释
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
            if (cacheName !== config.db) {
                return caches.delete(cacheName);
            }
        }));
    }));
});

self.addEventListener('fetch', function (event) {
    var requestUrl = event.request.url;

    var match = false;
    for (var i = 0; i < urlsToCache.length; ++i) {
        var url = urlsToCache[i];
        if (url instanceof RegExp) {
            match = url.test(requestUrl);
        } else if (requestUrl.indexOf(url) >= 0) {
            match = true;
            break;
        }
    }

    if (!match) {
        // event.respondWith(fetch(event.request.clone()));
        return;
    }

    var promise, req, url = event.request.url;

    if (url.indexOf('/ajax/') !== -1 || url.indexOf('bypass=1') !== -1 || url.indexOf('http:') === 0) {
        event.respondWith(fetch(event.request.clone()));
        return;
    }

    // if (url.indexOf('cors=1') !== -1) {
        req = new Request(url, {
            mode: 'cors'
        });
    // } else {
        // req = event.request.clone();
    // }

    promise = caches.open(config.db).then(function (cache) {
        return cache.match(req);
    }).then(function (response) {
        if (response) {
            return response;
        } else {
            return addToCache(req);
        }
    });

    event.respondWith(promise);

});
