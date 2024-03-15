var userName, userPhone, userEmail, userRole;
var users = URL("./users.js");

async function getUsers() {
  try {
    const response = await fetch('users.json');
    const data = await response.json();

    //storing the data in users 
    users = data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

//function to sign up
function signUp() {
  
  //get name, phone, email, coworker and store in varirables
  var new_userName, new_userPhone, new_userEmail, new_userPassword, new_userRole;
  new_userName = document.querySelector('#_name_').value();
  new_userPhone = document.querySelector('#_phone_').value();
  new_userEmail = document.querySelector('#_email_').value();
  new_userPassword = document.querySelector('#_password_').value();
  new_userRole = document.querySelector('#_role_').value();

  getUsers().then((val) => {

    //change the colour of input box, display a message alerting that username already exists
    if (users.find(obj => obj.name == new_userName))
      alert("username already exists");
    else if (users.find(obj => obj.email == new_userEmail))
      alert("email is already registered");
    else {
      users.push({
        "name": new_userName,
        "password": new_userPassword,
        "phone": new_userPhone,
        "email": new_userEmail,
        "role": new_userRole
      })

      fs.writeFileSync("./users.json", JSON.stringify(users), 'utf8');
    
    }
  })
}

// checkValidInputs(name, phone, email, password, role){
//   if()
// }
function displayLogIn(){
  let loginPage = document.querySelector("#loginDiv");
  let signUpPage = document.querySelector("#signUpDiv");

  loginPage.style.display = "block";
  signUpPage.style.display = "none";
}

function displaySignUp(){
  let loginPage = document.querySelector("#loginDiv");
  let signUpPage = document.querySelector("#signUpDiv");

  signUpPage.style.display = "block";
  loginPage.style.display = "none";
}