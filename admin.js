import { db } from "./firebase-config.js";


import {

collection,

getDocs

} from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";




const password="1234";





window.loginAdmin=function(){



let pass=
document.getElementById("password").value;



if(pass==password){


document.getElementById("panel")
.style.display="block";


loadUsers();



}else{


alert("رمز اشتباه است");


}


};






async function loadUsers(){



let box =
document.getElementById("users");


box.innerHTML="";



let data =
await getDocs(
collection(db,"users")
);



data.forEach(user=>{



let u=user.data();




box.innerHTML += `


<div class="user">


<h3>
👤 ${u.name}
</h3>


<p>
📱 دستگاه:
${u.device}
</p>


<p>
📐 صفحه:
${u.screen}
</p>


<p>
🌐 زبان:
${u.language}
</p>


<p>
⭐ امتیاز:
${u.score}
</p>


</div>


`;



});


  }
