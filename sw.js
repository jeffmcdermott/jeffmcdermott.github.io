var cacheName = 'waysecret-cache-1'; //version me on new releases

var filesToCache = [
  '/',
 "./index.html",
 "./app.js",
 "./sw.js"
];

//INSTALL
self.addEventListener('install', function(e) {
  console.log('Service Worker Installing ' + cacheName + '...');

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Service Worker ' + cacheName + ' Cache Online ...');
      return cache.addAll(filesToCache);
    })
  );

});

//ACTIVATE
self.addEventListener('activate', function(e) {
  console.log('Service Worker Activating ' + cacheName + '...');

  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('Service Worker Removing ' + key + ' Cache');
          return caches.delete(key);
        }
      }));
    })
  );

  //claim unclaimed clients now
  return self.clients.claim();
});

//FETCH
self.addEventListener('fetch', function(fetchEvent) {
  console.log('Service Worker Fetching: ', fetchEvent.request.url);

  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
