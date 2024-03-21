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

function openPage(pageURL) {
  window.location.href = pageURL;
}