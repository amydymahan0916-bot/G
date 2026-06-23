window.registerUser = function(){

    let name = document.getElementById("username").value.trim();

    if(name.length < 2){
        alert("اسم را وارد کنید");
        return;
    }

    localStorage.setItem("kairenUser", name);

    alert("خوش آمدید " + name);

    window.location.href = "games.html";
};


window.openAdmin = function(){

    let pass = prompt("رمز ادمین:");

    if(pass === "1234"){
        window.location.href = "admin.html";
    }else{
        alert("اشتباه است");
    }

};
