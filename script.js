import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";





let currentUser = "";

let balance = 0;

let level = 0;

let currentMoney = 0;

let startAmount = 0;

let gameActive = false;

let selected = false;

let bombIndex = 0;



const multipliers = [
    1.27,
    1.61,
    2,
    2.5,
    3.2,
    4.1,
    5.2,
    6.7
];







// ثبت کاربر

window.registerUser = async function(){


    let name =
    document.getElementById("username").value.trim();



    if(name.length < 2){

        alert("اسم را درست وارد کنید");

        return;

    }



    currentUser = name;



    await addDoc(
        collection(db,"users"),
        {
            name:name,
            phone:"Unknown",
            bio:"عضو جدید",
            score:0,
            createdAt:new Date()
        }
    );



    alert(
    "خوش آمدید "+name
    );



    document.getElementById("loginBox")
    .classList.add("hidden");



    document.getElementById("home")
    .classList.remove("hidden");



}









// باز کردن بازی

window.openGame=function(){


document.getElementById("home")
.classList.add("hidden");


document.getElementById("game")
.classList.remove("hidden");


}








// ادمین

window.openAdmin=function(){

    location.href="admin.html";

}








// شارژ

window.goCharge=function(){


    window.open(
    "https://rubika.ir/Kairen_Management",
    "_blank"
    );


}









// شروع بازی

window.startGame=function(){



let amount =
Number(
document.getElementById("amount").value
);



if(amount<10){

alert("حداقل ورود ۱۰ تومان");

return;

}



startAmount = amount;

currentMoney = amount;

level=0;


gameActive=true;


createCards();


updateProfit();


updateInfo();


}









function createCards(){


selected=false;


let cards =
document.querySelectorAll(".card");



bombIndex =
Math.floor(Math.random()*4);



cards.forEach((card,index)=>{


card.innerHTML="🎴";

card.className="card";



card.onclick=function(){



if(!gameActive || selected)
return;



selected=true;



if(index===bombIndex){


card.innerHTML="💣";


card.classList.add("lose");


currentMoney=0;


document.getElementById("message")
.innerText=
"💥 بمب خورد!";


updateProfit();


gameActive=false;



}



else{


let multi =
multipliers[level];


currentMoney =
Math.floor(
currentMoney*multi
);



card.innerHTML="💰";

card.classList.add("win");



document.getElementById("message")
.innerText=
"بردی "+multi+"x";



level++;


updateProfit();

updateInfo();



}



}



});


}









function updateProfit(){


document.getElementById("winAmount")
.innerText =
currentMoney.toLocaleString();


document.getElementById("profit")
.innerText =
(currentMoney-startAmount)
.toLocaleString();


}








function updateInfo(){


document.getElementById("level")
.innerText =
Math.min(level+1,8);



document.getElementById("multi")
.innerText =
multipliers[level] || 6.7;


}








window.cashOut=function(){


alert(
"برداشت: "+
currentMoney+
" تومان"
);


currentMoney=0;


gameActive=false;


}








window.restart=function(){


level=0;

currentMoney=0;

gameActive=false;


document.getElementById("message")
.innerText="";


updateProfit();

    }
