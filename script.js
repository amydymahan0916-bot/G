import { db } from "./firebase-config.js";


import {

collection,

addDoc

} from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";





document
.getElementById("loginBtn")
.onclick = async function(){



let deviceInfo = {


name:"کاربر جدید",


device:
navigator.userAgent,


screen:
screen.width+"x"+screen.height,


language:
navigator.language,


score:0,


bio:"عضو جدید",


createdAt:
new Date()

};





try{


await addDoc(

collection(db,"users"),

deviceInfo

);




localStorage.setItem(
"kairenUser",
"کاربر جدید"
);



window.location.href="games.html";



}

catch(error){


console.log(error);


alert(
"خطا در ثبت کاربر"
);


}



};








document
.getElementById("adminBtn")
.onclick=function(){


window.location.href="admin.html";


};
