const db = window.db;

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.registerUser = async function () {

    let name = document.getElementById("username").value.trim();

    if (name.length < 2) {
        alert("اسم را وارد کنید");
        return;
    }

    await addDoc(collection(db, "users"), {
        name: name,
        bio: "عضو جدید",
        score: 0,
        date: new Date()
    });

    localStorage.setItem("kairenUser", name);

    alert("خوش آمدید " + name);

    window.location.href = "games.html";
};

window.openAdmin = function () {
    window.location.href = "admin.html";
};
