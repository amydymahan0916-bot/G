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
let baseMoney = 0;
let bombIndex = 0;
let gameActive = false;
let selected = false;



function openGame(){
    document.getElementById("home").classList.add("hide");
    document.getElementById("gamePage").classList.remove("hide");
    startGame();
}



function startGame(){

    baseMoney = Number(prompt("مبلغ ورود (حداقل 10):"));

    if(baseMoney < 10 || isNaN(baseMoney)){
        alert("مبلغ نامعتبر!");
        return;
    }

    level = 0;
    currentMoney = baseMoney;
    gameActive = true;

    updateUI();
    createCards();
}



function createCards(){

    selected = false;

    let cards = document.querySelectorAll(".card");

    bombIndex = Math.floor(Math.random() * 4);

    cards.forEach((card, i)=>{

        card.classList.remove("flip","win","lose");

        card.onclick = function(){

            if(!gameActive || selected) return;

            selected = true;

            setTimeout(()=>{

                if(i === bombIndex){

                    card.classList.add("flip","lose");

                    document.getElementById("message").innerHTML =
                    "💣 باختی! همه پول از بین رفت";

                    currentMoney = 0;
                    gameActive = false;

                } else {

                    card.classList.add("flip","win");

                    let multi = multipliers[level];

                    currentMoney *= multi;

                    document.getElementById("message").innerHTML =
                    "💰 بردی! ضریب " + multi + "x";

                    level++;

                    updateUI();

                    if(level >= 8){

                        document.getElementById("message").innerHTML =
                        "🏆 تموم کردی!";

                        gameActive = false;

                    }

                }

            },300);

        };

    });

}



function nextLevel(){

    if(!gameActive){
        alert("بازی تمام شده");
        return;
    }

    if(level >= 8) return;

    createCards();

}



function cashOut(){

    if(currentMoney <= 0){
        alert("پولی برای برداشت نیست");
        return;
    }

    alert("💰 برداشت شد: " + Math.floor(currentMoney) + " تومان");

    gameActive = false;
}



function updateUI(){

    document.getElementById("level").innerText =
    Math.min(level + 1, 8);

    document.getElementById("multi").innerText =
    multipliers[level] || 6.7;

              }
