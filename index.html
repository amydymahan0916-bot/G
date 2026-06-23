import { db } from "./firebase-config.js";


import {

collection,

getDocs,

doc,

updateDoc,

deleteDoc

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";





const adminPassword = "1234";







window.login = function(){



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



};









async function loadUsers(){



let list =

document.getElementById("list");



list.innerHTML="";





let users =

await getDocs(
collection(db,"users")
);





users.forEach((item)=>{



let user = item.data();




list.innerHTML += `


<div class="member">


<h3>
👤 ${user.name}
</h3>



<p>
📝 ${user.bio || "بدون بیو"}
</p>



<p>
⭐ امتیاز:

<span>
${user.score || 0}
</span>

</p>




<input

id="score-${item.id}"

type="number"

placeholder="امتیاز جدید">





<br>


<button onclick="changeScore('${item.id}')">

تغییر امتیاز

</button>




<button onclick="removeUser('${item.id}')">

حذف

</button>



</div>


`;



});



}









window.changeScore = async function(id){



let value =


Number(

document.getElementById(
"score-"+id
).value

);




if(!value){

alert("امتیاز وارد کنید");

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



};









window.removeUser = async function(id){



let ok = confirm(
"حذف شود؟"
);



if(!ok)
return;




await deleteDoc(

doc(db,"users",id)

);



alert("کاربر حذف شد");


loadUsers();



};
