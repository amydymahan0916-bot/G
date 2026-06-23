import { db } from "./firebase-config.js";

import {
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";



let currentUser = "";

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

        alert("اسم را وارد کنید");

        return;

    }



    currentUser = name;



    await addDoc(
        collection(db,"users"),
        {

            name:name,

            bio:"عضو جدید",

            score:0,

            date:new Date()

        }
    );



    document.getElementById("loginBox")
    .classList.add("hide");



    document.getElementById("home")
    .classList.remove("hide");



    alert(
    "خوش آمدید "+name
    );

};








// ورود به بازی

window.openGame=function(){


    document.getElementById("home")
    .classList.add("hide");


    document.getElementById("game")
    .classList.remove("hide");


};








// ادمین

window.openAdmin=function(){

    location.href="admin.html";

};









// شارژ

window.goCharge=function(){


    window.open(
    "https://rubika.ir/Kairen_Management",
    "_blank"
    );


};









// شروع بازی

window.startGame=function(){



    let amount =
    Number(
    document.getElementById("amount").value
    );



    if(amount < 10){

        alert("حداقل مبلغ ۱۰ تومان است");

        return;

    }



    startAmount = amount;

    currentMoney = amount;

    level = 0;

    gameActive = true;


    updateProfit();

    updateInfo();

    createCards();



};









function createCards(){


    selected=false;


    let cards =
    document.querySelectorAll(".card");



    bombIndex =
    Math.floor(Math.random()*4);



    cards.forEach((card,index)=>{


        card.className="card";

        card.innerHTML="🎴";



        card.onclick=function(){



            if(!gameActive || selected)
            return;



            selected=true;




            if(index===bombIndex){


                card.innerHTML="💣";

                card.classList.add("lose");


                currentMoney=0;


                updateProfit();



                document.getElementById("message")
                .innerText=
                "💥 بمب خورد!";


                gameActive=false;



            }


            else{


                let multi =
                multipliers[level];



                currentMoney =
                Math.floor(
                currentMoney * multi
                );



                card.innerHTML="💰";

                card.classList.add("win");



                document.getElementById("message")
                .innerText =
                "🎉 بردی | ضریب "+multi+"x";



                level++;



                updateProfit();

                updateInfo();



            }



        };



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


    if(currentMoney<=0){

        alert("مبلغی برای برداشت نیست");

        return;

    }



    alert(
    "💰 مبلغ برداشت: "+
    currentMoney.toLocaleString()
    +" تومان"
    );


    currentMoney=0;


    gameActive=false;


};









window.restart=function(){


    level=0;

    currentMoney=0;

    startAmount=0;


    gameActive=false;



    updateProfit();



    document.getElementById("message")
    .innerText="";


};
