import { db } from "./firebase-config.js";


import {

collection,

getDocs,

doc,

updateDoc

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";





const adminPassword = "9080";





window.login=function(){



let pass =
document.getElementById("password").value;



if(pass === adminPassword){



document.getElementById("login")
.style.display="none";



document.getElementById("panel")
.classList.remove("hide");



loadUsers();



}

else{


alert("رمز اشتباه است");


}



}









async function loadUsers(){



let box =
document.getElementById("list");



box.innerHTML="";



const querySnapshot =
await getDocs(
collection(db,"users")
);





querySnapshot.forEach((item)=>{



let user =
item.data();



box.innerHTML += `


<div class="member">


<h3>
👤 ${user.name}
</h3>


<p>
📝 ${user.bio || "بدون بیو"}
</p>



<p>
⭐ امتیاز:
<span id="score-${item.id}">
${user.score || 0}
</span>
</p>



<input 
id="new-${item.id}"
placeholder="امتیاز جدید">



<button onclick="changeScore('${item.id}')">

تغییر امتیاز

</button>



</div>


`;



});



}









window.changeScore=async function(id){



let value =

Number(

document.getElementById(
"new-"+id
).value

);




if(!value){

alert("عدد وارد کن");

return;

}




await updateDoc(

doc(db,"users",id),

{

score:value

}

);



alert("امتیاز تغییر کرد");


loadUsers();



}
