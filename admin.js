const adminPassword = "1234";



function login(){


let pass =
document.getElementById("password").value;



if(pass === adminPassword){


document.getElementById("login")
.style.display="none";


document.getElementById("panel")
.classList.remove("hide");


loadMembers();


}

else{


alert("رمز اشتباه است");


}


}




function loadMembers(){


let box =
document.getElementById("list");


box.innerHTML="";



members.forEach(user=>{


box.innerHTML += `

<div class="member">


<h3>${user.name}</h3>


<p>
📱 ${user.phone}
</p>


<p>
📝 ${user.bio}
</p>


<p>
⭐ امتیاز:
${user.score}
</p>



<input 
id="score${user.id}"
placeholder="امتیاز جدید">



<button onclick="changeScore(${user.id})">

تغییر امتیاز

</button>


</div>

`;


});


}




function changeScore(id){


let value =
Number(
document.getElementById("score"+id).value
);



let user =
members.find(
x=>x.id===id
);



if(value){


user.score=value;


saveMembers();


alert("امتیاز تغییر کرد");


loadMembers();


}


}
