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
let amount = 0;
let currentMoney = 0;
let playing = false;



function openCardsGame(){

    document.getElementById("home").classList.add("hidden");

    document.getElementById("cardsGame").classList.remove("hidden");

}




function startGame(){

    let input =
    Number(document.getElementById("amount").value);


    if(input < 10){

        alert("حداقل مبلغ ورود ۱۰ تومان است");
        return;

    }


    amount = input;
    currentMoney = input;

    level = 0;

    playing = true;


    document.getElementById("message").innerHTML="";

    createCards();

    update();

}




function createCards(){


    let box =
    document.getElementById("cards");


    box.innerHTML="";


    let bomb =
    Math.floor(Math.random()*4);



    for(let i=0;i<4;i++){


        let card =
        document.createElement("div");


        card.className="card";


        card.onclick=function(){


            if(!playing) return;



            if(i===bomb){

                card.classList.add("lose");

                document.getElementById("message").innerHTML =
                "💣 بمب! بازی تمام شد";


                currentMoney = 0;

                playing=false;


                showBomb(bomb);


            }

            else{


                let multi =
                multipliers[level];


                currentMoney =
                currentMoney * multi;



                card.classList.add("win");



                document.getElementById("message").innerHTML =
                "💰 برد! ضریب "+multi+"x";



                level++;



                update();



                if(level>=8){


                    document.getElementById("message").innerHTML =
                    "🏆 تمام مراحل کامل شد";


                    playing=false;


                    return;

                }



                setTimeout(()=>{

                    createCards();

                },1000);


            }



        };



        box.appendChild(card);


    }



}





function showBomb(index){


    let cards =
    document.querySelectorAll(".card");


    cards[index].classList.add("lose");


}





function update(){


    document.getElementById("level").innerHTML =
    Math.min(level+1,8);



    document.getElementById("multiplier").innerHTML =
    multipliers[level] || 6.7;



    let percent =
    (level/8)*100;


    document.getElementById("bar").style.width =
    percent+"%";


}




function cashOut(){


    if(currentMoney>0){


        alert(
        "💰 مبلغ دریافت شده: "+
        Math.floor(currentMoney)+
        " تومان"
        );


        playing=false;


    }

    else{


        alert("مبلغی برای برداشت نیست");


    }


}





function restart(){


    level=0;

    currentMoney=0;

    playing=false;


    document.getElementById("cards").innerHTML="";


    document.getElementById("message").innerHTML="";


    update();


        }
