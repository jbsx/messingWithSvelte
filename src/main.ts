import "./app.css";
import App from "./App.svelte";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2uCHyHvmfpQX_YPBI1utv_Kkm4rK709g",
  authDomain: "test-85760.firebaseapp.com",
  projectId: "test-85760",
  storageBucket: "test-85760.appspot.com",
  messagingSenderId: "768617131325",
  appId: "1:768617131325:web:4fbdbf9fb31aa2efa66954",
  measurementId: "G-PBGF5YRB26",
};

const fapp = initializeApp(firebaseConfig);
const fs = getFirestore(fapp);

console.log(fapp);

const app = new App({
  target: document.getElementById("app"),
});

export default app;
