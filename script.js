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
let money = 0;
let playingMoney = 0;
let currentMultiplier = 1;
let active = false;


function openGame(){
    document.querySelector(".games").style.display="none";
    document.getElementById("game").style.display="block";
}



function startGame(){

    let input = Number(document.getElementById("money").value);

    if(input < 10){
        alert("حداقل مبلغ ورود ۱۰ تومان است");
        return;
    }


    money = input;
    playingMoney = input;
    level = 0;
    currentMultiplier = 1;
    active = true;

    document.getElementById("result").innerHTML="";
    showCards();
    updateInfo();
}



function showCards(){

    let cards = document.getElementById("cards");
    cards.innerHTML="";


    let bomb = Math.floor(Math.random()*4);


    for(let i=0;i<4;i++){

        let card=document.createElement("div");

        card.className="card";

        card.innerHTML="🎴";


        card.onclick=function(){

            if(!active) return;


            if(i===bomb){

                card.classList.add("lose");
                card.innerHTML="💣";

                document.getElementById("result").innerHTML=
                "💥 بمب خورد! پول از بین رفت";

                playingMoney=0;
                active=false;

                revealCards(bomb);

            }else{


                currentMultiplier =
                multipliers[level];


                playingMoney =
                playingMoney * currentMultiplier;


                card.classList.add("win");
                card.innerHTML="💰";


                document.getElementById("result").innerHTML=
                "🎉 بردی! ضریب "+currentMultiplier+"x";


                level++;


                if(level>=8){

                    document.getElementById("result").innerHTML=
                    "🏆 تمام مراحل را رد کردی";

                    active=false;
                }


                updateInfo();

                setTimeout(()=>{

                    if(active){
                        showCards();
                    }

                },1000);

            }

        };


        cards.appendChild(card);
    }

}



function revealCards(bomb){

    let cards=document.querySelectorAll(".card");

    cards.forEach((c,i)=>{

        if(i===bomb){
            c.innerHTML="💣";
            c.classList.add("lose");
        }

    });

}



function cashOut(){

    if(playingMoney>0){

        alert(
        "مبلغ برداشت شده: "+
        Math.floor(playingMoney)+
        " تومان"
        );

        active=false;
    }
    else{

        alert("مبلغی برای برداشت وجود ندارد");

    }

}



function updateInfo(){

    document.getElementById("level").innerHTML =
    Math.min(level+1,8);


    document.getElementById("multi").innerHTML =
    multipliers[level] || multipliers[7];

      }
