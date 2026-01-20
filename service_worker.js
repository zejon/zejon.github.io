
// Define a cache name with versioning. Update this version number whenever you make changes 
// to the files in urlsToCache to ensure users get the new assets.
const cacheName = 'myFilesToCache-v1';

// List of essential files and routes to cache on installation.
const filesToCache = [
    '/', // Cache the main index route
    '/static/style.css',
    '/static/translate.js',
    
    // Example common asset types
    '/static/android-chrome-192x192.png',
    '/static/android-chrome-512x512.png',

];


// INSTALL function Fired when the Service Worker is first installed.
// This is where we pre-cache all critical assets.
self.addEventListener('install', function(e) {
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();

    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
                console.log('[Service Worker} Caching app shell');
                // Add all assets defined in filesToCache to the cache
                return cache.addAll(filesToCache);
            })
            .catch(error => {
                console.error('Service Worker: Failed to pre-cache assets:', error);
            })
    );
});


// ACTIVATE function Fired when the Service Worker is activated.
// This is where update happens? to clean up old, deprecated caches.
// Removing old versions of the app.
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');

    e.waitUntil(
        caches.keys().then((cacheName) => {
            return Promise.all(
                cacheName.map((cacheName) => {
                    // Delete any old caches that do not match the current cacheName
                    if (cacheName !== cacheName) {
                        console.log('[ServiceWorker] Removing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                    return null;
                })
            );
        })
    );
    // Ensure the Service Worker controls clients as soon as it's activated
    return self.clients.claim();
});

