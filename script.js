<<<<<<< HEAD
var userName, userPhone, userEmail, userRole;
// var users = URL("./users.js");
var users = [
  { name: "John", email: "john@example.com", password: "password1" },
  { name: "Jane", email: "jane@example.com", password: "password2" }
];
console.log(users);
var isLoggedIn = JSON.parse(sessionStorage.getItem("user")) == null ? true : false;


//function to sign up
function signUp() {
  //get name, phone, email, coworker and store in variables
  var new_userName, new_userPhone, new_userEmail, new_userRole, new_userPassword;
  new_userName = document.querySelector('#_name_').value;
  new_userPhone = document.querySelector('#_phone_').value;
  new_userEmail = document.querySelector('#_email_').value;
  new_userPassword = document.querySelector('#_password_').value;
  new_userRole = document.querySelector('#_role_').value;

  //change the color of input box, display a message alerting that username already exists
  if (new_userName.length() < 3)
    alert("Name too small");
  else if (users.find(obj => obj.email == new_userEmail))
    alert("email already registered");
  else {
    users.push({
      "name": new_userName,
      "password": new_userPassword,
      "phone": new_userPhone,
      "email": new_userEmail,
      "role": new_userRole
    })
    console.log(users);
  }
}

function logIn() {
  console.log("isLoggedIn");
  // var given_username="John Doe",given_password="abc";
  var given_email = document.querySelector("#_email").value;
  var given_password = document.querySelector("#_password").value;

  var index = users.find(abc => abc.email === given_email);
  if (index) {
    if (index.password === given_password) {
      openPage('ownerhome.html');
      sessionStorage.setItem("user", JSON.stringify(index));
    } else {
      alert("wrong password");
    }
=======
import { userDatabase } from "./users.js";
var users;
//get users if in localstorage otherwise the default user.js
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = userDatabase;
}

var isLoggedin =
  JSON.parse(sessionStorage.getItem("user")) == null ? false : true;

function signUp(event) {
  event.preventDefault();
  var new_userName,
    new_userPhone,
    new_userEmail,
    new_userRole,
    new_userPassword;

  //storing values
  new_userName = document.querySelector("#_name_").value;
  new_userPhone = document.querySelector("#_phone_").value;
  new_userEmail = document.querySelector("#_email_").value;
  new_userPassword = document.querySelector("#_password_").value;new_userRole = document.querySelector('input[name="role"]:checked').value;

  //change the colour of input box, display a message alerting that username already exists
  if (new_userName.length < 3) alert("Name too small");
  else if (users.find((obj) => obj.email == new_userEmail))
    alert("email already registered");
  else {
    users.push({
      name: new_userName,
      password: new_userPassword,
      phone: new_userPhone,
      email: new_userEmail,
      role: new_userRole,
    });
  }
  console.log(users);

  //uploading these to localstorage as we are not doing backend yet(thats phase 2)
  localStorage.setItem("users", JSON.stringify(users));
}

function logIn(event) {
  event.preventDefault();
  var givenEmail = document.querySelector("#_email").value,
    given_password = document.querySelector("#_password").value;
    console.log(users)
  var index = users.find((abc) => abc.email == givenEmail);
  console.log(index);
  console.log(givenEmail);
  if (!index) {
    alert("email is not registered");
    return;
  } else if (index.password == given_password) {
    sessionStorage.setItem("user", JSON.stringify(index));
    alert("hogya");
>>>>>>> 2e45313496f0c58b2e7c832496e06524ed75d94e
  } else {
    alert("user not found");
  }
}

function displayLogIn() {
  let loginPage = document.querySelector("#loginDiv");
  let signUpPage = document.querySelector("#signUpDiv");

  console.log("login page opened")
  loginPage.style.display = "block";
  signUpPage.style.display = "none";
}

function displaySignUp() {
  let loginPage = document.querySelector("#loginDiv");
  let signUpPage = document.querySelector("#signUpDiv");

  signUpPage.style.display = "block";
  loginPage.style.display = "none";

}

<<<<<<< HEAD
function openPage(pageURL) {
  window.location.href = pageURL;
}
=======
window.onload = () => {
  document
    .querySelector("#signup")
    .addEventListener("submit", (event) => signUp(event));

  document
    .querySelector("#login")
    .addEventListener("submit", (event) => logIn(event));

  document.getElementById("displaySignup").addEventListener("click", displaySignUp);
  document.getElementById("Displaylogin").addEventListener("click", displayLogIn);
};
>>>>>>> 2e45313496f0c58b2e7c832496e06524ed75d94e
