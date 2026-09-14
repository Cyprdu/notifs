self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : { title: "Alerte", message: "Notification" };
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      icon: "https://via.placeholder.com/192"
    })
  );
});
