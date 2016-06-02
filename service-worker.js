var log=console.log.bind(console);//bind our console to a variable
//Add event listener for install
self.addEventListener("install",function(event) {
	log('[ServiceWorker] Installed!');
});
//Add event listener for fetch
self.addEventListener("fetch",function(event) {
	log('[ServiceWorker] Requested url :-',event.request.url);
});