import { db } from "./firebase-config.js";


import {

collection,

getDocs,

updateDoc,

doc

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";





const adminPassword = "1234";






window.loginAdmin = async function(){



let pass = 
document.getElementById("password").value;



if(pass !== adminPassword){


alert("رمز اشتباه است");

return;


}





document.getElementById("panel")
.style.display="block";



loadUsers();



};









async function loadUsers(){



let box = 
document.getElementById("users");



box.innerHTML="";



let users = await getDocs(
collection(db,"users")
);





users.forEach((user)=>{


let data = user.data();



box.innerHTML += `

<div class="user">


<h3>
👤 ${data.name}
</h3>


<p>
📝 ${data.bio || "بدون بیو"}
</p>


<p>
⭐ امتیاز:
${data.score || 0}
</p>



<input 
id="score-${user.id}"
type="number"
placeholder="امتیاز جدید">



<button onclick="changeScore('${user.id}')">

تغییر امتیاز

</button>


</div>

`;



});



}









window.changeScore = async function(id){



let value = Number(

document.getElementById(
"score-"+id
).value

);





await updateDoc(

doc(db,"users",id),

{

score:value

}

);




alert("امتیاز تغییر کرد");



loadUsers();



};








window.backHome=function(){


location.href="index.html";


};
