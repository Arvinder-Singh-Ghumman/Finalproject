const url = "http://localhost:5678";

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
  var errorMessage = document.querySelector("#errorMessage");

  var userData = {
    name: new_userName,
    email: new_userEmail,
    password: new_userPassword,
    role: new_userRole,
    phone: new_userPhone
  }

  //validation
  if (new_userName.length < 3) {
    errorMessage.innerText = "Name must be of at least 3 letters.";
    alert("Name too small");
  }
  var resStatus;
  //signup
  fetch(`${url}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      resStatus = response.status
      return response.json();
    })
    .then(data => {
      if (resStatus !== 200 && resStatus !== 201) {
        console.log(resStatus);
        throw new Error(data.message);
      }
      localStorage.setItem("token", data.token);
      alert("Signup successful");
      openPage("loggedInHome.html");
    })
    .catch(error => {
      console.warn('Error during signup:', error);
    });
}

function logIn(event) {
  event.preventDefault();
  var givenEmail = document.querySelector("#_email").value,
    given_password = document.querySelector("#_password").value;
  var resStatus;
  fetch(`${url}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: givenEmail,
        password: given_password
      })
    })
    .then(response => {
      resStatus = response.status;
      return response.json();
    })
    .then(data => {
      if (resStatus !== 200 && resStatus !== 201) {
        console.log(resStatus);
        throw new Error(data.message);
      }
      localStorage.setItem("token", data.token);
      alert("LogIn successful");
      openPage("loggedInHome.html");
    })
    .catch(error => {
      console.log(error)
      alert('Error during Log In: ' + error.message);
    });
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

function openPage(pageName) {
  window.location.href = pageName;
}

window.onload = () => {
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
};