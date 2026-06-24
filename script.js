import { db } from "./firebase-config.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


document.getElementById("loginBtn").onclick = async ()=>{


let name =
document.getElementById("username").value.trim();


if(!name){

alert("اسم را وارد کنید");

return;

}



try{


await addDoc(collection(db,"users"),{

name:name,

score:0,

bio:"عضو جدید",

time:new Date()

});



localStorage.setItem(
"kairenUser",
name
);



location.href="games.html";


}catch(e){


console.log(e);

alert("خطا در اتصال Firebase");

}



};



document.getElementById("adminBtn").onclick=()=>{

location.href="admin.html";

};
