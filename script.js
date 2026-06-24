import { db } from "./firebase-config.js";

import {

collection,

addDoc

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";




// ورود کاربر

document
.getElementById("loginBtn")
.addEventListener("click", async ()=>{


let name =
document.getElementById("username").value.trim();



if(name.length < 2){

alert("اسم را وارد کنید");

return;

}



try{


await addDoc(
collection(db,"users"),
{

name:name,

bio:"عضو جدید",

score:0,

createdAt:new Date()

}

);



localStorage.setItem(
"kairenUser",
name
);



window.location.href="games.html";



}

catch(error){

console.log(error);

alert("خطا در اتصال به سرور");

}



});








// رفتن به پنل ادمین

document
.getElementById("adminBtn")
.addEventListener("click", ()=>{


window.location.href="admin.html";


});
