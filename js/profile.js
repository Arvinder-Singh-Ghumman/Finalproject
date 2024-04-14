var otherUser;
const urlParams = new URLSearchParams(window.location.search);
var userId = urlParams.get("userId");

async function fillValues() {
  getUsers();
  //getting details of other user
  if (userId === null) {
    userId = user._id;
  }else{
    try {
      const response = await fetch(`${url}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    otherUser = data;
  } catch (error) {
    console.error("Error occurred: ", error);
  }
}
console.log("almost")
  // let userIndex = users.findIndex((el) => el.id === userId);
  if (otherUser !== undefined) {
    console.log("phonch gya")
    document.getElementById("name").value = otherUser.name;
    document.getElementById("email").value = otherUser.email;
    document.getElementById("phone").value = otherUser.phone;
  }else if(loggedIn){
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
  }else{
    alert("failed to get details of the user.")
  }
}

async function updateUserDatabase() {
  //validating input and storing
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var phoneInput = document.getElementById("phone");

  if (nameInput && nameInput.value.trim() !== "") {
    otherUser.name = nameInput.value.trim();
  }

  if (
    emailInput &&
    emailInput.value.trim() !== "" &&
    /\S+@\S+\.\S+/.test(emailInput.value.trim())
  ) {
    otherUser.email = emailInput.value.trim();
  }else if(emailInput){
    alert("email format is wrong")
  }

  if (
    phoneInput &&
    phoneInput.value.trim() !== "" &&
    !isNaN(phoneInput.value.trim())
  ) {
    otherUser.phone = phoneInput.value.trim();
  }else if(phoneInput){
    alert("phone format is wrong");
  }

  //changing in database
  let token = localStorage.getItem("token");
  try {
    let userData = {
      name: otherUser.name,
      email: otherUser.email,
      phone: otherUser.phone,
    };
    const response = await fetch(`${url}/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    otherUser = data;
  } catch (error) {
    console.error("Error occurred: ", error);
  }
}

function logOut() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
async function deleteAccount() {
  let token = localStorage.getItem("token");
  try {
    const response = await fetch(`${url}/user/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    alert("Deleted succesffully");
  } catch (error) {
    console.error("Error occurred: ", error);
  }
}

window.onload = async ()  =>  {
  // if (isNaN(userId)) {
  //   try {
  //     userId = JSON.parse(sessionStorage.getItem("user")).id;
  //   } catch {
  //     window.location.href = "login.html";
  //   }
  // }

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
  if (loggedIn && userId === user._id) {
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

  document.getElementById("logOut").addEventListener("click", logOut);
  document.getElementById("delete").addEventListener("click", deleteAccount);
};
document.addEventListener("DOMContentLoaded", function() {
  fillValues();
})