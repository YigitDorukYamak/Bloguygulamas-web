'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "4cae25d43240005ad30f7305d2f50037",
"assets/assets/images/12olimposlu1.webp": "1be0b9ed2c7660af87f504efdda671a8",
"assets/assets/images/12olimposlu2.webp": "065c8f2e8a22cc88315789a4402fb62f",
"assets/assets/images/12olimposlu3.webp": "64891ba6ab1edc496e44df332b5efc50",
"assets/assets/images/12olimposlu4.webp": "cc1f192ec487601fca6a8b3a5e0b25bd",
"assets/assets/images/12olimposlu5.webp": "771a8ddce125a789b04df173b8ab74b4",
"assets/assets/images/deney1.webp": "688d04a63ad304f3e47e12f5f9f7e41f",
"assets/assets/images/deney2.webp": "22854534933e383c20cf3d96e3e386b4",
"assets/assets/images/deney3.webp": "bfc568d7e05648dd5b08c184003ecffe",
"assets/assets/images/ikiyuzluadam1.webp": "d5731b8f66c66ee5e76dad64f84b8dc2",
"assets/assets/images/ikiyuzluadam2.jpg": "ffe0397c45605c16ddc67e721934b9e5",
"assets/assets/images/resim0.jpeg": "6254ca601829516f77b781eab69e9af3",
"assets/assets/images/resim1.webp": "d6b149143b7099043340da2fcdef9bf3",
"assets/assets/images/resim2.webp": "6f17fa677fc94b491825658eeb71cd51",
"assets/assets/images/resim3.webp": "57829d107e5ea0f76bc2997d5765be4f",
"assets/assets/images/resim4.jpeg": "2e11fe152f8fdb6e484017cd5816d684",
"assets/assets/images/resim5.webp": "da8dce6af542be922c37c3c369a02a06",
"assets/assets/images/resim6.jpg": "c6bfbbc2cb039de8ca92cb1cfe5097c9",
"assets/assets/images/resim7.jpg": "46ad05acf94d8ca59e95c26f36ae1123",
"assets/assets/images/resim8.jpg": "b65b2661d4e27bd96ecd1f8255f7b794",
"assets/assets/images/simonleviev1.jpg": "f9a77b5f1160faa58a8d5dedfdc7dc86",
"assets/assets/images/simonleviev2.jpg": "dff74337796c40c28b0e859a889ecd21",
"assets/assets/images/simonleviev3.png": "68c2caba0938f3100e89c9f04142fef5",
"assets/assets/images/simonleviev4.jpg": "f919ae266fb36c7f420cb4236b8b389a",
"assets/assets/images/uyuyanguzel1.jpg": "4355ce25c704ae1fa37c0f9c8a819345",
"assets/assets/images/uyuyanguzel2.webp": "d5731b8f66c66ee5e76dad64f84b8dc2",
"assets/assets/images/vangogh1.webp": "7403164ed5d2318c8e32ca3cca080936",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/NOTICES": "0fe5da67999b2219e23c896e7e8aa598",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "8ad680deefa3d54174d12534c72da74d",
"/": "8ad680deefa3d54174d12534c72da74d",
"main.dart.js": "3ef1942f421c360cc11336b6396d27cb",
"manifest.json": "bf24c84c3bf99672a631c4f84464e793",
"version.json": "15235b5108d6a877ef74fe3317a96bf7"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
