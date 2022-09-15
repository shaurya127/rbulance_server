// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const getFirebaseToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BAdNenHId0mejx4XR7B-puDXIOiG-c5l5SP9-Ewbzo-KjDAfoPhIfSqAQia3g8de5hJe_WKciCtt0Ut5ulxl45U",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        localStorage.setItem("firebaseToken",currentToken)
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
