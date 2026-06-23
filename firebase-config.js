import { db } from "./firebase-config.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.registerUser = async function () {

    let name = document.getElementById("username").value.trim();

    if (name.length < 2) {
        alert("لطفاً اسم خود را وارد کنید");
        return;
    }

    try {

        // 🔥 ذخیره در Firebase
        await addDoc(collection(db, "users"), {
            name: name,
            bio: "عضو جدید",
            score: 0,
            createdAt: new Date()
        });

        localStorage.setItem("kairenUser", name);

        alert("خوش آمدید " + name);

        window.location.href = "games.html";

    } catch (error) {

        console.log("Firebase Error:", error);
        alert("خطا در اتصال به دیتابیس ❌");

    }
};

window.openAdmin = function () {

    let pass = prompt("رمز ادمین:");

    if (pass === "1234") {
        window.location.href = "admin.html";
    } else {
        alert("رمز اشتباه است");
    }

};
