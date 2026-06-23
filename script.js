const multipliers = [1.27,1.61,2,2.5,3.2,4.1,5.2,6.7];

let level = 0;
let currentMoney = 0;
let baseMoney = 0;
let bombIndex = 0;
let gameActive = false;
let selected = false;

// 💰 کیف پول (ذخیره دائمی)
let balance = Number(localStorage.getItem("balance")) || 0;

function updateBalanceUI(){
    document.getElementById("balance").innerText = balance;
}

updateBalanceUI();

// ---------------- HOME ----------------
function openGame(){
    document.getElementById("home").classList.add("hide");
    document.getElementById("gamePage").classList.remove("hide");
}

// ---------------- CHARGE ----------------
function goCharge(){
    window.open("https://rubika.ir/Kairen_Management","_blank");
}

// ---------------- START GAME ----------------
function startGame(){

    let input = Number(document.getElementById("amount").value);

    if(input < 10 || isNaN(input)){
        alert("حداقل 10 تومان");
        return;
    }

    if(balance < input){
        alert("❌ موجودی کافی نیست\n👉 شارژ حساب");
        return;
    }

    balance -= input;
    localStorage.setItem("balance",balance);
    updateBalanceUI();

    baseMoney = input;
    currentMoney = input;
    level = 0;
    gameActive = true;

    document.getElementById("message").innerText="";

    createCards();
    updateUI();
}

// ---------------- CARDS ----------------
function createCards(){

    selected = false;
    let cards = document.querySelectorAll(".card");

    bombIndex = Math.floor(Math.random()*4);

    cards.forEach((card,i)=>{

        card.classList.remove("win","lose");

        card.onclick = function(){

            if(!gameActive || selected) return;
            selected = true;

            setTimeout(()=>{

                if(i === bombIndex){

                    card.classList.add("lose");
                    document.getElementById("message").innerText="💣 باختی";

                    currentMoney = 0;
                    gameActive = false;

                }else{

                    card.classList.add("win");

                    let m = multipliers[level];
                    currentMoney *= m;

                    document.getElementById("message").innerText =
                    "💰 بردی " + m + "x";

                    level++;

                    updateUI();

                    if(level>=8){
                        document.getElementById("message").innerText="🏆 تموم شد";
                        gameActive=false;
                    }
                }

            },200);
        };

    });
}

// ---------------- CASH OUT ----------------
function cashOut(){

    if(currentMoney<=0){
        alert("هیچی برای برداشت نیست");
        return;
    }

    balance += Math.floor(currentMoney);
    localStorage.setItem("balance",balance);
    updateBalanceUI();

    alert("💰 واریز شد: "+Math.floor(currentMoney));

    gameActive=false;
}

// ---------------- RESET ----------------
function restart(){
    level=0;
    currentMoney=0;
    gameActive=false;
    document.getElementById("message").innerText="";
    updateUI();
}

// ---------------- UI ----------------
function updateUI(){
    document.getElementById("level").innerText=Math.min(level+1,8);
    document.getElementById("multi").innerText=multipliers[level]||6.7;
}
