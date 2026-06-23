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

let startAmount = 0;

let balance = Number(localStorage.getItem("balance")) || 0;

let bombIndex = 0;

let gameActive = false;

let selected = false;




// نمایش موجودی

updateBalance();





function updateBalance(){

    let b = document.getElementById("balance");

    if(b){

        b.innerText =
        balance.toLocaleString();

    }

}







// ورود به بازی

function openGame(){

    document.getElementById("home")
    .classList.add("hidden");


    document.getElementById("game")
    .classList.remove("hidden");

}






// شارژ حساب

function goCharge(){

    window.open(
    "https://rubika.ir/Kairen_Management",
    "_blank"
    );

}







// پنل ادمین

function openAdmin(){

    window.location.href =
    "admin.html";

}







// شروع بازی

function startGame(){


    let amount =
    Number(document.getElementById("amount").value);



    if(amount < 10 || isNaN(amount)){


        alert(
        "حداقل مبلغ ورود ۱۰ تومان است"
        );

        return;

    }





    if(balance < amount){


        alert(
        "❌ موجودی شما کافی نیست\nلطفا به قسمت شارژ حساب مراجعه کنید"
        );


        return;

    }






    balance -= amount;


    saveBalance();


    updateBalance();





    startAmount = amount;

    currentMoney = amount;


    level = 0;


    gameActive = true;



    updateProfit();


    updateInfo();


    createCards();



}







// ساخت کارت ها

function createCards(){


    selected = false;


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





            if(index === bombIndex){


                card.classList.add("lose");

                card.innerHTML="💣";


                document.getElementById("message")
                .innerText=
                "💥 بمب خورد! باختی";



                currentMoney=0;


                updateProfit();


                gameActive=false;



            }




            else{


                card.classList.add("win");

                card.innerHTML="💰";



                let multi =
                multipliers[level];



                currentMoney =
                Math.floor(
                currentMoney * multi
                );




                document.getElementById("message")
                .innerText =
                "🎉 بردی! ضریب "+multi+"x";




                level++;




                updateProfit();

                updateInfo();





                if(level>=8){


                    document.getElementById("message")
                    .innerText=
                    "🏆 تمام مراحل کامل شد";


                    gameActive=false;


                }


            }



        };



    });


}








// نمایش سود

function updateProfit(){


    let amount =
    document.getElementById("winAmount");


    let profit =
    document.getElementById("profit");



    if(amount){

        amount.innerText =
        currentMoney.toLocaleString()
        +" تومان";

    }





    if(profit){


        let p =
        currentMoney-startAmount;



        profit.innerText =
        p.toLocaleString()
        +" تومان";


    }


}







// برداشت

function cashOut(){


    if(currentMoney<=0){


        alert(
        "مبلغی برای برداشت نیست"
        );


        return;

    }





    balance += currentMoney;



    saveBalance();



    updateBalance();





    alert(
    "💰 دریافت شد: "
    +
    currentMoney.toLocaleString()
    +
    " تومان"
    );



    currentMoney=0;

    gameActive=false;



}







// ریست

function restart(){


    level=0;

    currentMoney=0;

    startAmount=0;

    gameActive=false;



    updateProfit();

    updateInfo();



    document.getElementById("message")
    .innerText="";


}







// اطلاعات مرحله

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






function saveBalance(){

    localStorage.setItem(
    "balance",
    balance
    );

}
