let members = [

{
    id:1,
    name:"ماهان",
    phone:"Android",
    bio:"مدیر اصلی",
    score:10000
},


{
    id:2,
    name:"علی",
    phone:"iPhone",
    bio:"عضو فعال",
    score:5000
},


{
    id:3,
    name:"رضا",
    phone:"Samsung",
    bio:"عضو جدید",
    score:2500
}


];


// ذخیره اعضا

if(localStorage.getItem("members")){

    members =
    JSON.parse(localStorage.getItem("members"));

}


function saveMembers(){

    localStorage.setItem(
    "members",
    JSON.stringify(members)
    );

}
