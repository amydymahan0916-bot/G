import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD80aHdpmI2OZckgzd-V8RN-25fp8SE-N4",
    authDomain: "kairen-5e8b6.firebaseapp.com",
    projectId: "kairen-5e8b6",
    storageBucket: "kairen-5e8b6.appspot.com",
    messagingSenderId: "1086037404316",
    appId: "1:1086037404316:web:b709f5401da0e69d161b59"
};

const app = initializeApp(firebaseConfig);
window.db = getFirestore(app);
