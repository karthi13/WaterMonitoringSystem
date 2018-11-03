console.log("Service Worker Loaded...Hoooorrraaaayyy");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "You Are Wasting Water!", //or get the body from data.body from server
    icon: "../public/images/notificationIcon.png"
  });
});