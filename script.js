import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


window.registerUser = async function(){

    let name = document.getElementById("username").value.trim();

    if(name.length < 2){
        alert("اسم را وارد کنید");
        return;
    }

    try{

        await addDoc(collection(window.db,"users"),{
            name:name,
            score:0,
            bio:"عضو جدید",
            date:new Date()
        });

        localStorage.setItem("kairenUser",name);

        alert("خوش آمدید " + name);

        window.location.href="games.html";

    }catch(e){
        console.log(e);
        alert("Firebase مشکل دارد");
    }
};


window.openAdmin = function(){

    let pass = prompt("رمز ادمین:");

    if(pass === "1234"){
        window.location.href="admin.html";
    }else{
        alert("اشتباه است");
    }

};
