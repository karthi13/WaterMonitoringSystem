// const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
// const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
///////// Public  Key ////////////////////////////////////////////////////////////////////
//PRIVATE_VAPID_KEY="4IPU7p8KvW5ZUOflDb-TNZp8GyojX4O8Btn_thFk5X8"
PUBLIC_VAPID_KEY= "BFSGOd7W_UObKJRIy0eXoqIKWkYpkM7imDBtE_Ds5aeE5f4LNw2h7yUQO9R5xQqDyfaNu_hf7kzzKhlCZrG_QZQ"
/////////////////////////////////////////////////////////////////////////////////////

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
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("..src/worker.js", {
    scope: "/"
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