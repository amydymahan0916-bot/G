import { db } from "./firebase-config.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


document.getElementById("loginBtn").onclick = async function(){

alert("دکمه ورود کلیک شد");


try{


await addDoc(
collection(db,"users"),
{
name:"کاربر جدید",
score:0,
createdAt:new Date()
}
);



alert("کاربر ثبت شد");


window.location.href="games.html";



}

catch(error){


alert(error.message);

console.log(error);


}


};




document.getElementById("adminBtn").onclick=function(){

window.location.href="admin.html";

};
