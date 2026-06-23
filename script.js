// ضریب های 8 مرحله
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


let level = 0;
let currentMoney = 0;
let bombIndex = 0;

let gameActive = false;
let selected = false;


// کیف پول
let balance = Number(localStorage.getItem("balance")) || 0;


// نمایش موجودی
updateBalance();



function updateBalance(){

    let box = document.getElementById("balance");

    if(box){

        box.innerText = balance;

    }

}



// رفتن به بازی

function openGame(){

    document.getElementById("home").classList.add("hide");

    document.getElementById("gamePage").classList.remove("hide");

}




// شارژ حساب روبیکا

function goCharge(){

    window.open(
    "https://rubika.ir/Kairen_Management",
    "_blank"
    );

}



// رفتن به پنل ادمین

function openAdmin(){

    window.open(
    "admin.html",
    "_blank"
    );

}



// شروع بازی

function startGame(){


    let amount =
    Number(document.getElementById("amount").value);



    if(amount < 10 || isNaN(amount)){

        alert("حداقل مبلغ ورود ۱۰ تومان است");

        return;

    }



    if(balance < amount){

        alert(
        "❌ موجودی شما کافی نیست\n\nلطفا به قسمت شارژ حساب مراجعه کنید"
        );

        return;

    }



    balance -= amount;

    saveBalance();



    currentMoney = amount;

    level = 0;

    gameActive = true;



    document.getElementById("message").innerText =
    "";



    createCards();

    updateInfo();


}





// ساخت کارت ها

function createCards(){


    selected = false;


    let cards =
    document.querySelectorAll(".card");



    bombIndex =
    Math.floor(Math.random()*4);



    cards.forEach((card,index)=>{


        card.className="card";



        card.onclick=function(){



            if(!gameActive || selected){

                return;

            }



            selected=true;



            if(index === bombIndex){



                card.classList.add("lose");


                card.innerHTML="💣";



                document.getElementById("message").innerText=
                "💥 بمب خورد! بازی تمام شد";



                currentMoney=0;

                gameActive=false;



            }


            else{


                let multi =
                multipliers[level];



                currentMoney =
                Math.floor(currentMoney * multi);



                card.classList.add("win");


                card.innerHTML="💰";



                document.getElementById("message").innerText=
                "🎉 بردی! ضریب "+multi+"x";



                level++;



                updateInfo();



                if(level >= 8){


                    document.getElementById("message").innerText=
                    "🏆 همه مراحل رد شد";


                    gameActive=false;


                }

            }


        };


    });



}





// برداشت

function cashOut(){


    if(currentMoney <= 0){

        alert("مبلغی برای برداشت وجود ندارد");

        return;

    }



    balance += currentMoney;


    saveBalance();



    updateBalance();



    alert(
    "💰 برداشت شد: "+
    currentMoney+
    " تومان"
    );



    gameActive=false;


}




// ریست

function restart(){

    level=0;

    currentMoney=0;

    gameActive=false;


    document.getElementById("message").innerText="";


    updateInfo();


}




// ذخیره کیف پول

function saveBalance(){

    localStorage.setItem(
    "balance",
    balance
    );

}




// آپدیت اطلاعات

function updateInfo(){


    let l =
    document.getElementById("level");


    let m =
    document.getElementById("multi");



    if(l){

        l.innerText =
        Math.min(level+1,8);

    }



    if(m){

        m.innerText =
        multipliers[level] || 6.7;

    }


}
