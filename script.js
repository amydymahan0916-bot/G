window.registerUser = async function(){

    let name =
    document.getElementById("username").value.trim();

    if(name.length < 2){
        alert("لطفاً اسم را وارد کنید");
        return;
    }

    try{

        await addDoc(
            collection(db,"users"),
            {
                name:name,
                bio:"عضو جدید",
                score:0,
                date:new Date()
            }
        );

        localStorage.setItem("kairenUser",name);

        alert("خوش آمدید " + name);

        window.location.href="games.html";

    }catch(err){

        alert(err.message);
        console.log(err);

    }
}
