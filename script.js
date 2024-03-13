var userName,userPhone,userEmail,userRole;
var users = "./users.js";
console.log(users);
var isLoggedin = JSON.parse(sessionStorage.getItem("user"))==null?true:false;;


//function to sign up
function signUp(){
  //get name, phone, email, coworker and store in varirables
  var new_userName,new_userPhone,new_userEmail,new_userRole,new_userPassword;

    //change the colour of input box, display a message alerting that username already exists
    if(new_userName.length()<3)
      alert("Name too small");
    else if(users.find(obj=>obj.email==new_userEmail))
      alert("email already registered");
    else{
      users.push({"name":new_userName,"password":new_userPassword,"phone":new_userPhone,"email":new_userEmail,"role":new_userRole})
      console.log(users);
    }  
}

function logIn(){
  console(isLoggedin);
  var given_username="John Doe",given_password="abc";
  var index = users.find(abc=>abc.name==given_username);
  if(index.password==given_password){
    sessionStorage.setItem("user",JSON.stringify(index));
  }else{
    alert("wrong password");
  }
}