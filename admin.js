const password="1234";


function login(){

let p=document.getElementById("pass").value;


if(p===password){

document.getElementById("login").style.display="none";

document.getElementById("panel").style.display="block";


loadAdmin();


}

else{

alert("رمز اشتباه");

}

}




function loadAdmin(){

let box=document.getElementById("members");

box.innerHTML="";


members.forEach(user=>{


box.innerHTML += `

<div class="member">

<h3>${user.name}</h3>

<p>گوشی: ${user.phone}</p>

<p>بیو: ${user.bio}</p>

<p>امتیاز: ${user.score}</p>


<input id="score${user.id}" 
placeholder="امتیاز جدید">


<button onclick="editScore(${user.id})">
تغییر امتیاز
</button>


</div>

`;

});


}




function editScore(id){


let value=
Number(document.getElementById("score"+id).value);


let user =
members.find(x=>x.id===id);


user.score=value;


alert("تغییر کرد");


loadAdmin();

}
