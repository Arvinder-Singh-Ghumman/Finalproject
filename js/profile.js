var users = JSON.parse(localStorage.getItem("users"));
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

function fillValues() {
  let userIndex = users.findIndex((el) => el.id === userId);
  if (userIndex >= 0) {
    document.getElementById("name").value = users[userIndex].name;
    document.getElementById("email").value = users[userIndex].email;
    document.getElementById("phone").value = users[userIndex].phone;
  }
}

function updateUserDatabase() {
  let userIndex = users.findIndex((el) => el.id === userId);
  if (userIndex >= 0) {
    users[userIndex].name = document.getElementById("name");
    users[userIndex].email = document.getElementById("email");
    users[userIndex].phone = document.getElementById("phone");
    localStorage.setItem("user");
  } else {
    alert("failed");
  }
}

function logOut(){
  sessionStorage.removeItem("user");
  window.location.href = "index.html"
}
function deleteAccount(){
  let userIndex = users.findIndex((el) => el.id === userId);
  if (userIndex >= 0) {
   let res =  users.filter((el)=>el.id!==users[index].id)
   localStorage.setItem("users", JSON.stringify(res));
  } else {
    alert("failed");
  }
}

window.onload = () => {
  if(isNaN(userId)){
    try{
      userId=JSON.parse(sessionStorage.getItem("user")).id;
    }catch{
      window.location.href="login.html"
    }

  }

  fillValues();

  //containers
  var container1 = document.querySelector(".container");
  var container2 = document.querySelector(".container2");
  var container3 = document.querySelector(".container3");
  container1.style.display = "none";
  container2.style.display = "none";
  container3.style.display = "block";

  //icons
  var profileIcon = document.querySelectorAll(".profileIcon");
  var edit = document.querySelectorAll(".editInfo");
  var settingsIcon = document.querySelectorAll(".settingsIcon");

  //show or hide edit button
  if (userId === JSON.parse(sessionStorage.getItem("user")).id) {
    edit.forEach((el) => (el.style.display = "block"));
  } else {
    edit.forEach((el) => (el.style.display = "none"));
  }

  //to change divs
  for (var i = 0; i < profileIcon.length; i++) {
    profileIcon[i].addEventListener("click", () => {
      container1.style.display = "none";
      container2.style.display = "none";
      container3.style.display = "block";
    });
  }

  //edit functionality
  for (var i = 0; i < edit.length; i++) {
    edit[i].addEventListener("click", (btn) => {
      if (btn.target.innerText === "Edit") {
        document
          .querySelectorAll(".coWorker")
          .forEach((el) => (el.disabled = false));
        edit[1].innerText = "Update";
      } else {
        updateUserDatabase();
        btn.target.innerText = "Edit";
        document
          .querySelectorAll(".coWorker")
          .forEach((el) => (el.disabled = true));
      }
    });
  }
  for (var i = 0; i < settingsIcon.length; i++) {
    settingsIcon[i].addEventListener("click", () => {
      container1.style.display = "none";
      container2.style.display = "block";
      container3.style.display = "none";
    });
  }

  document.getElementById("logOut").addEventListener("click",logOut)
  document.getElementById("delete").addEventListener("click", deleteAccount)
};
