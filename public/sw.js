
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('crucible.gg-icons').then(function(cache) {
      return cache.addAll(
        ['https://fonts.googleapis.com/icon?family=Material+Icons']
      );
    })
  );
});

self.addEventListener('fetch', function fetcher (event) {
  var request = event.request;
  // check if request 
  if (request.url.indexOf('destiny_content/icons') > -1) {
    console.log('bungie request', request.url)
    // contentful asset detected
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // return from cache, otherwise fetch from network
        return response || fetch(request).then((image) => {
          console.log(image)
          return caches.open('icons')
            .then(cache => {
              cache.add(image);
            });
        });
      })
    );
  }
  // otherwise: ignore event
});