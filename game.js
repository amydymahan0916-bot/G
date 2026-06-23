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







window.startGame = function(){



let amount =

Number(document.getElementById("amount").value);



if(amount < 10){

alert("حداقل مبلغ ۱۰ تومان است");

return;

}



startAmount = amount;

currentMoney = amount;

level = 0;

gameActive = true;



updateUI();

createCards();

};









function createCards(){



selected = false;



let cards = document.querySelectorAll(".card");



bombIndex = Math.floor(Math.random()*4);





cards.forEach((card,index)=>{



card.innerHTML = "🎴";

card.className = "card";



card.onclick = function(){



if(!gameActive || selected) return;



selected = true;





if(index === bombIndex){



card.innerHTML = "💣";

card.style.background = "#900";



currentMoney = 0;



gameActive = false;



document.getElementById("message")
.innerText = "💥 باختی!";



updateUI();



}else{



let multi = multipliers[level];



currentMoney = Math.floor(currentMoney * multi);



card.innerHTML = "💰";

card.style.background = "#0a0";



level++;



document.getElementById("message")
.innerText = "بردی ×" + multi;



updateUI();



}



};



});



}









function updateUI(){



document.getElementById("balance").innerText = currentMoney;



document.getElementById("level").innerText = Math.min(level+1,8);



document.getElementById("multi").innerText = multipliers[level] || 6.7;



document.getElementById("message").style.color = "#ffd700";



}









window.cashOut = function(){



if(currentMoney <= 0){

alert("هیچی برای برداشت نیست");

return;

}



alert("برداشت: " + currentMoney);



gameActive = false;



currentMoney = 0;



updateUI();



};









window.restart = function(){



level = 0;

currentMoney = 0;

gameActive = false;



document.getElementById("message").innerText = "";



updateUI();



};
