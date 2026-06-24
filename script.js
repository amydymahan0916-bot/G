import { db } from "./firebase-config.js";


import {

collection,

addDoc

} from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";





const loginBtn =
document.getElementById("loginBtn");



loginBtn.onclick = async function(){



let name =
document.getElementById("username").value.trim();



if(name.length < 2){

alert("اسم را وارد کن");

return;

}



try{


await addDoc(

collection(db,"users"),

{

name:name,

score:0,

bio:"عضو جدید",

created:new Date()

}

);



localStorage.setItem(
"user",
name
);



alert("ورود موفق");


window.location.href="games.html";



}

catch(error){


console.log(error);


alert(
"خطای Firebase: "+error.message
);


}



};






document.getElementById("adminBtn").onclick=function(){


window.location.href="admin.html";


};
