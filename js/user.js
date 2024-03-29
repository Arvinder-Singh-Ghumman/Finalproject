import {
  userDatabase
} from "../database/usersDatabase.js";
var users;
//get users if in localstorage otherwise the default user.js
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = userDatabase;
}

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
  new_userPassword = document.querySelector("#_password_").value;
  new_userRole = document.querySelector('input[name="role"]:checked').value;

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

    var index = users.find((abc) => abc.email == new_userEmail);
    delete index.password;
    sessionStorage.setItem("user", JSON.stringify(index));
    alert("Signup successful");
    openPage("loggedInHome.html");
  }
  console.log(users);

  //uploading these to localstorage as we are not doing backend yet(thats phase 2)
  localStorage.setItem("users", JSON.stringify(users));
}

function logIn(event) {
  event.preventDefault();
  var givenEmail = document.querySelector("#_email").value,
    given_password = document.querySelector("#_password").value;

  var index = users.find((abc) => abc.email == givenEmail);
  if (!index) {
    alert("email is not registered");
    return;
  } else if (index.password == given_password) {
    delete index.password;
    sessionStorage.setItem("user", JSON.stringify(index));
    alert("Login successful");
    openPage("loggedInHome.html");
  } else {
    alert("user not found");
  }
}

function displayLogIn() {
  let loginPage = document.querySelector("#loginDiv");
  let signUpPage = document.querySelector("#signUpDiv");

  console.log("login page opened");
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
  // Get the current date
  var currentDate = new Date();

  // Get the HTML element with the ID "currentDate"
  var currentDateElement = document.getElementById("date");

  // Update the innerHTML of the element with the current date
  currentDateElement.innerHTML += currentDate.toLocaleDateString();
  document
    .querySelector("#signup")
    .addEventListener("submit", (event) => signUp(event));

  document
    .querySelector("#login")
    .addEventListener("submit", (event) => logIn(event));

  document
    .getElementById("displaySignup")
    .addEventListener("click", displaySignUp);
  document
    .getElementById("Displaylogin")
    .addEventListener("click", displayLogIn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      document.querySelector("nav").classList.add("navScrolled");
    } else {
      document.querySelector("nav").classList.remove("navScrolled");
    }
  });



  var container1 = document.querySelector(".container");
  var container2 = document.querySelector(".container3");
  var container3 = document.querySelector(".container2");
  var profileIcon = document.querySelector("#profileIcon");

  profileIcon.addEventListener("click",()=>{
      container2.style.display = "none";
      container3.style.display = "none";
  })
</script>
};

function openPage(pageName) {
  window.location.href = pageName;
}