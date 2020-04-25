// require("./sw.js");
const axios = require("axios");
// import Axios from "./node_modules/axios/lib/axios.js";

var firebaseConfig = {
  apiKey: "AIzaSyAqPiu21qXMQ8k_Yo-2QYGU2xaImKYy7SQ",
  authDomain: "rpsmultiplayer-5e045.firebaseapp.com",
  databaseURL: "https://rpsmultiplayer-5e045.firebaseio.com",
  projectId: "rpsmultiplayer-5e045",
  storageBucket: "rpsmultiplayer-5e045.appspot.com",
  messagingSenderId: "452971815810",
  appId: "1:452971815810:web:8da73797d01b2f9752a59b",
  measurementId: "G-0KZQW1P0GE",
};

firebase.initializeApp(firebaseConfig);

let database = firebase.database();

const publicVapidKey =
  "BONQDVSif7uK5J_Mqea65mp5fbk1v9aBWrI6G-R6WgW0B8-xO79_0E3tYDdtai0HqpDb3a8_CbZ7ZNUCvAZjHZ0";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const returnedKey = urlBase64ToUint8Array(publicVapidKey);

// Register SW, Register push, Send push
// const send = async () => {
//   console.log("Registering SW....");
//   const register = await navigator.serviceWorker.register("sw.js", {
//     scope: "/client/",
//   });
//   console.log("Service Worker Registered", register);
//   // Register Push
//   console.log("Registering push notification");
//   const subscription = await register.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
//   });
//   console.log("Push notification registered");
//   // Send notification
//   console.log("Sending Push Notification...");
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   let subscriptionString = JSON.stringify(subscription);

//   await axios.post("/subscribe", subscriptionString, config);
//   console.log("push sent...");
// };

// if ("serviceWorker" in navigator) {
//   send().catch((err) => console.error(err));
// }

let name = "";
let tokenReturned = "";

let connectionsRef = database.ref("/connections");
let connectedRef = database.ref(".info/connected");

// connectedRef.on("value", (snapshot) => {
//   if (snapshot.val()) {
//     let connected = connectionsRef.push(true);
//     connected.onDisconnect().remove();
//   }
// });

connectionsRef.on("value", (snapshot) => {
  console.log(snapshot.val());
  console.log("number of users connected", snapshot.numChildren());
});

// const submitUser = (name, token) => {
//   let userInput = {
//     name,
//     token,
//   };
//   let connected = connectionsRef.push(userInput);
//   connected.onDisconnect().remove();
// };

// messaging
//   .requestPermission()
//   .then(() => {
//     console.log("Permission Granted");
//     return messaging.getToken();
//   })
//   .then((token) => {
//     console.log(token);
//     if (!window.sessionStorage.name) {
//       M.toast({ html: "Please fill out your name to be paired" });
//     }
//     let nameInput = window.sessionStorage.getItem("name");
//     tokenReturned = token;
//     submitUser(nameInput, tokenReturned);
//   })
//   .catch((err) => console.error(err));

// messaging.onMessage((payload) => {
//   console.log("onMessage: ", payload);
// });

let buttons = document.getElementsByClassName("btn");
let submitNameButton = document.getElementById("nameButton");
let nameField = document.getElementById("firstName");
let nameHolder = document.getElementById("nameHolder");
let signInButton = document.getElementById("signInButton");

// submitNameButton.addEventListener("click", (e) => {
//   // Add function to add users to 'ready list' and pair with other users here
//   e.preventDefault();
//   window.sessionStorage.setItem("name", nameField.value);
//   nameHolder.textContent = nameField.value;
// });

if (window.location.pathname === "/play.html") {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
      playObject = {};
      let value = e.target.value;
      let nameRef = window.sessionStorage.getItem("name");
      playObject.value = value;
      playObject.name = nameRef;
      database.ref().child(playObject.name).set({
        playObject,
      });
      console.log(e.target.value);
    });
  }
}

// if (window.sessionStorage.name) {
//   nameHolder.classList.remove("hide");
//   signInButton.classList.add("hide");
//   playerName = window.sessionStorage.getItem("name");
//   nameHolder.textContent = playerName;
// }

let firstNameInput = document.getElementById("first_name");
let lastNameInput = document.getElementById("last_name");
let emailInput = document.getElementById("email");

let firstName = "";
let lastName = "";
let password = "";
let email = "";

document.getElementById("submitRegister").addEventListener("click", (e) => {
  e.preventDefault();
  firstName = firstNameInput.value;
  lastName = lastNameInput.value;
  email = emailInput.value;
  let newUser = {
    firstName,
    lastName,
    email,
  };
  console.log("newUser", newUser);
  window.location.pathname = "/client/play.html";
});
