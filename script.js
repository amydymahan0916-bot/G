const multipliers = [1.27, 1.61, 2, 2.5, 3.2, 4.1, 5.2, 6.7];

let level = 0;
let currentMoney = 0;
let baseMoney = 0;
let bombIndex = 0;
let gameActive = false;
let selected = false;

// 💳 کیف پول (ذخیره دائمی)
let balance = Number(localStorage.getItem("balance")) || 0;


// -------------------- UI --------------------

function updateUI(){

    document.getElementById("level").innerText =
    Math.min(level + 1, 8);

    document.getElementById("multi").innerText =
    multipliers[level] || 6.7;

}


// -------------------- شارژ حساب --------------------

function goCharge(){

    window.open("https://rubika.ir/YOUR_ID", "_blank");

}


// -------------------- شروع بازی --------------------

function startGame(){

    let input = Number(document.getElementById("amount").value);

    if(input < 10 || isNaN(input)){
        alert("حداقل مبلغ ۱۰ تومان است");
        return;
    }

    if(balance < input){
        alert("❌ موجودی شما کافی نیست\n👉 لطفا به بخش شارژ حساب مراجعه کنید");
        return;
    }

    balance -= input;
    saveBalance();

    baseMoney = input;
    currentMoney = input;
    level = 0;
    gameActive = true;

    document.getElementById("message").innerText = "";

    createCards();
    updateUI();
}


// -------------------- ساخت کارت‌ها --------------------

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

                    document.getElementById("message").innerText =
                    "💣 باختی! همه پول رفت";

                    currentMoney = 0;
                    gameActive = false;

                } else {

                    card.classList.add("flip","win");

                    let multi = multipliers[level];

                    currentMoney *= multi;

                    document.getElementById("message").innerText =
                    "💰 بردی! ضریب " + multi + "x";

                    level++;

                    updateUI();

                    if(level >= 8){

                        document.getElementById("message").innerText =
                        "🏆 تموم کردی!";

                        gameActive = false;
                    }

                }

            },300);

        };

    });

}


// -------------------- برداشت --------------------

function cashOut(){

    if(currentMoney <= 0){
        alert("❌ پولی برای برداشت نیست");
        return;
    }

    balance += Math.floor(currentMoney);
    saveBalance();

    alert("💰 واریز به کیف پول: " + Math.floor(currentMoney));

    gameActive = false;

}


// -------------------- ریست --------------------

function restart(){

    level = 0;
    currentMoney = 0;
    gameActive = false;

    document.getElementById("message").innerText = "";
    updateUI();

}


// -------------------- ذخیره کیف پول --------------------

function saveBalance(){
    localStorage.setItem("balance", balance);
                              }
