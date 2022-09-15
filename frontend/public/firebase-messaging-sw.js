importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCFpaFbWaG3S8vQ6mzMUjRCYvcK7Hb6g6c",
  authDomain: "r-ambulance.firebaseapp.com",
  projectId: "r-ambulance",
  storageBucket: "r-ambulance.appspot.com",
  messagingSenderId: "849897150982",
  appId: "1:849897150982:web:a3c26161ba266bed19c187",
  measurementId: "G-YLCCTQF4QQ",
};

// Initialize Firebase
//   const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
