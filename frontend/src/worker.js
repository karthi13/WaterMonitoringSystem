console.log("Service Worker Loaded...Hoooorrraaaayyy");

window.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "You Are Wasting Water!"//, or get the body from data.body from server
   // icon: "../public/images/notificationIcon.png"
  });
  //event.waitUntil(self.registration.showNotification(title, body))

});

// self.addEventListener("push", event => {
//   const data = event.data.json()
//   const { title } = data

//   const body = {
//     body: data.body,
//     icon: data.icon
//   }

//   event.waitUntil(self.registration.showNotification(title, body))
// })


const publicVapidKey =process.env.PUBLIC_VAPID_KEY;

// import axios from "axios"
// export default function subscribePush() {
//   navigator.serviceWorker.ready.then(registration => {
//     if (!registration.pushManager) {
//       alert("Push Unsupported")
//       return
//     }
    
//     registration.pushManager
//       .subscribe({
//         userVisibleOnly: true, //Always display notifications
//         applicationServerKey: convertedVapidKey
//       })
//       .then(subscription => axios.post("/api/push/register", subscription))
//       .catch(err => console.error("Push subscription error: ", err))
//   })
// }

// Check for service worker
if ('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  // const register = await navigator.serviceWorker.register("..src/worker.js", {
  //   scope: "/"
  // });
  const register =navigator.serviceWorker.ready.then(() => {
    console.log(
      'done'
    );
  });

  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,//Always display notifications
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered...");

  // Send Push Notification
  console.log("Sending Push...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push Sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}