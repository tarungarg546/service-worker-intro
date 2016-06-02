var log=console.log.bind(console);//bind our console to a variable
var version="0.0.1";
var cacheName="sw-demo";
var cache=cacheName+"-"+version;
var filesToCache=[
					'scripts/bootstrap.min.js',
					'styles/bootstrap.min.css',
					'index.html',
					"/",//Note that this is different from below 
					"/?app=true"//This is different from above in request object's terminology
				]
//Add event listener for install
self.addEventListener("install",function(event) {
	log('[ServiceWorker] Installing....');
	event.waitUntil(caches
      					.open(cache)//open this cache from caches and it will return a Promise
      					.then(function(cache) { //catch that promise
      						log('[ServiceWorker] Caching files');
        					cache.addAll(filesToCache);//add all required files to cache it also returns a Promise
      					})
    				); 
});
//Add event listener for fetch
self.addEventListener("fetch",function(event) {
	//note that event.request.url gives url of the request so you could also intercept request and send response based on your url
	//e.g. you make want to send gif if anything in jpeg form is requested.
	event.respondWith(//it either takes a Response object as a parameter or a promise that resolves to a Response object
					    caches.match(event.request)//If there is match in cache of this request object
					    	.then(function(response) {
						    	if(response){
						    		log("Fulfilling "+event.request.url+" from cache.");
						    		//returning response object
						    		return response;
						    	} else {
						    		log(event.request.url+" not found in cache fetching from network.");
						    		//return promise that resolves to Response object
						    		return fetch(event.request);
						    	}
					    	})
  					);
});