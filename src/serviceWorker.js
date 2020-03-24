const { LATEST_VERSION } = require('./utils/constants');

// service-worker.js
workbox.core.setCacheNameDetails({ prefix: 'd4' });

const SHOW_LOGS = false;

self.addEventListener('activate', (event) => {
    if (caches) {
        caches.keys().then((arr) => {
            arr.forEach((key) => {
                if (key.indexOf('d4-precache') < -1) {
                    caches.delete(key).then(() => {
                        if (SHOW_LOGS) {
                            console.log(`%c Cleared ${key}`);
                        }
                    });
                } else {
                    caches.open(key).then((cache) => {
                        cache.match('version').then((res) => {
                            if (!res) {
                                cache.put('version', new Response(LATEST_VERSION, {
                                    status:     200,
                                    statusText: LATEST_VERSION
                                }));
                            } else if (res.statusText !== LATEST_VERSION) {
                                caches.delete(key).then(() => {
                                    if (SHOW_LOGS) {
                                        console.log(`%c Cleared Cache ${LATEST_VERSION}`);
                                    }
                                });
                            } else {
                                if (SHOW_LOGS) {
                                    console.log(`%c Great you have the latest version ${LATEST_VERSION}`);
                                }
                            }
                        });
                    });
                }
            });
        });
    }
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
