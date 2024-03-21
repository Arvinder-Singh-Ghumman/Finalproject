import { userDatabase } from "./users.js";
var users;
//get users if in localstorage otherwise the default user.js
if(localStorage.getItem("users")!=null){
  users = JSON.parse(localStorage.getItem("users"))
}else{
  users = userDatabase;
}

var isLoggedin = JSON.parse(sessionStorage.getItem("user")) == null ? true : false;


function signUp(event) {
  
  var new_userName, new_userPhone, new_userEmail, new_userRole, new_userPassword;

  //storing values
  new_userName = document.querySelector('#_name_').value;
  new_userPhone = document.querySelector('#_phone_').value;
  new_userEmail = document.querySelector('#_email_').value;
  new_userPassword = document.querySelector('#_password_').value;
  new_userRole = document.querySelector('._role_').value;
  
  //change the colour of input box, display a message alerting that username already exists
  if (new_userName.length < 3)
    alert("Name too small");
  else if (users.find(obj => obj.email == new_userEmail))
    alert("email already registered");
  else {
    users.push({ "name": new_userName, "password": new_userPassword, "phone": new_userPhone, "email": new_userEmail, "role": new_userRole })
  }
  console.log(users);
  
  //uploading these to localstorage as we are not doing backend yet(thats phase 2)
  localStorage.setItem("users",JSON.stringify(users));

}

function logIn() {
  console.log(isLoggedin);
  var given_username = document.querySelector("#_email").value, given_password = document.querySelector("#_password").value;
  var i = users.find(abc => abc.name == given_username);
  console.log(i);
  console.log(given_username);
  if(!index){
    // alert("email is not registered");
    return;
  }else if (index.password == given_password) {
    sessionStorage.setItem("user", JSON.stringify(index));
  } else {
    alert("wrong password");
  }
}

function displayLogIn() {
  let loginPage = document.querySelector("#loginDiv");
  let signUpPage = document.querySelector("#signUpDiv");

  loginPage.style.display = "block";
  signUpPage.style.display = "none";
}

function displaySignUp() {
  let loginPage = document.querySelector("#loginDiv");
  let signUpPage = document.querySelector("#signUpDiv");

  signUpPage.style.display = "block";
  loginPage.style.display = "none";
}

window.onload = () => {
  document.querySelector("#signup").addEventListener("click", signUp);
  document.querySelector("#logIn").addEventListener("click", logIn);
  document.querySelector("#displayLogIn").addEventListener("click", displayLogIn);
  document.querySelector("#displaySignUp").addEventListener("click", displaySignUp);
}