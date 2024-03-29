const CACHE_NAME = "pwa_46";
var urlsToCache = [
	"/",
	"/ilkom512.png",
	"/ilkom192.png",
	"/manifest.json",
	"/img/1.jpeg",
	"/img/2.jpg",
	"/img/3.jpg",
	"/img/4.jpg",
	"/img/5.jpg",
	"/img/6.jpg",
	"/img/8.jpeg",
	"/img/7.jpg",
	"/img/1slider.jpg",
	"/index.html",
	"/css/materialize.min.css",
	"/css/style.css",
	"/js/materialize.min.js",
	"/js/nav.js",
	"/js/api.js",
	"/article.html"
];

self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

// api
self.addEventListener("fetch", function (event) {
	var base_url = "https://readerapi.codepolitan.com/";

	if (event.request.url.indexOf(base_url) > -1) {
		event.respondWith(
			caches.open(CACHE_NAME).then(function (cache) {
				return fetch(event.request).then(function (response) {
					cache.put(event.request.url, response.clone());
					return response;
				})
			})
		)
	} else {
		event.respondWith(
			caches.match(event.request, {
				ignoreSearch: true
			}).then(function (response) {
				return response || fetch(event.request);
			})
		)
	}
});
// akhir api

// self.addEventListener("fetch", function (event) {
// 	event.respondWith(
// 		caches
// 		.match(event.request, {
// 			cacheName: CACHE_NAME
// 		})
// 		.then(function (response) {

// 			if (response) {
// 				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
// 				return response;
// 			}
// 			console.log(
// 				"ServiceWorker: Memuat dari server: ", event.request.url
// 			);
// 			return fetch(event.request);
// 		})
// 	);
// });

self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});