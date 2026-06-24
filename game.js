let level = 0;

let money = 0;

let playing = false;

let clicked = false;



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



const chances = [

75,

65,

50,

45,

40,

35,

25,

18

];







function startGame(){


let amount =

Number(
document.getElementById("amount").value
);



if(amount < 10){

alert("حداقل مبلغ ۱۰ تومان است");

return;

}



money = amount;

level = 0;

playing = true;



resetCards();


update();



}








function resetCards(){


clicked=false;


document.querySelectorAll(".card")
.forEach(card=>{


card.innerHTML="🎴";

card.className="card";


card.onclick=()=>chooseCard(card);


});


}








function chooseCard(card){



if(!playing || clicked)
return;


clicked=true;



let chance = chances[level];

let random = Math.floor(Math.random()*100)+1;





if(random <= chance){



card.innerHTML="💰";

card.classList.add("win");



money = Math.floor(

money * multipliers[level]

);



level++;



document.getElementById("message")
.innerText =
"بردی ×"+multipliers[level-1];



if(level < 8){

setTimeout(resetCards,800);

}



}else{



card.innerHTML="💣";

card.classList.add("lose");


money=0;

playing=false;



document.getElementById("message")
.innerText="💥 بمب خورد!";



}



update();


}








function update(){


document.getElementById("level")
.innerText =
Math.min(level+1,8);



document.getElementById("multi")
.innerText =
multipliers[level] || 6.7;



}








function cashOut(){


if(money<=0){

alert("مبلغی وجود ندارد");

return;

}



alert(
"مبلغ برداشت: "+money
);



playing=false;


  }
