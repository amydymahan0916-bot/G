import { db } from "./firebase-config.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";



window.registerUser = async function () {

    const name =
        document.getElementById("username").value.trim();

    if (name.length < 2) {
        alert("لطفاً اسم خود را وارد کنید");
        return;
    }

    try {

        await addDoc(
            collection(db, "users"),
            {
                name: name,
                bio: "عضو جدید",
                score: 0,
                date: new Date()
            }
        );

        localStorage.setItem("kairenUser", name);

        alert("خوش آمدید " + name);

        window.location.href = "games.html";

    } catch (err) {

        console.error(err);
        alert("خطا: " + err.message);

    }

};



window.openAdmin = function () {

    const pass = prompt("رمز ادمین را وارد کنید");

    if (pass === "1234") {

        window.location.href = "admin.html";

    } else {

        alert("رمز اشتباه است");

    }

};
