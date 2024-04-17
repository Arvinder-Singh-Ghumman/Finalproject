const url = "http://localhost:5678";
const urlParams = new URLSearchParams(window.location.search);
var otherUser;
var user;
var userId;

async function fillValues() {
  //getting details of other user
  userId = urlParams.get("id");
  console.log(userId);
  if (userId === null) {
    userId = user._id;
  } else {
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

  // let userIndex = users.findIndex((el) => el.id === userId);
  if (otherUser !== undefined) {
    document.getElementById("name").value = otherUser.name;
    document.getElementById("email").value = otherUser.email;
    document.getElementById("phone").value = otherUser.phone;
  } else if (loggedIn) {
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
  } else {
    alert("failed to get details of the user.");
  }
}

async function updateUserDatabase() {
  //validating input and storing
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var phoneInput = document.getElementById("phone");

  if (nameInput && nameInput.value.trim() !== "") {
    user.name = nameInput.value.trim();
  }

  if (
    emailInput &&
    emailInput.value.trim() !== "" &&
    /\S+@\S+\.\S+/.test(emailInput.value.trim())
  ) {
    user.email = emailInput.value.trim();
  } else if (emailInput) {
    alert("email format is wrong");
  }

  if (
    phoneInput &&
    phoneInput.value.trim() !== "" &&
    !isNaN(phoneInput.value.trim())
  ) {
    user.phone = phoneInput.value.trim();
  } else if (phoneInput) {
    alert("phone format is wrong");
  }

  //changing in database
  let token = localStorage.getItem("token");
  try {
    let userData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    const response = await fetch(`${url}/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    localStorage.removeItem("token");
    alert("Deleted succesffully");
  } catch (error) {
    console.error("Error occurred: ", error);
  }
}

async function getUsers() {
  var resStatus;
  let token = localStorage.getItem("token");

  if (token !== null) {
    loggedIn = true;
    try {
      const response = await fetch(`${url}/user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      resStatus = response.status;

      if (resStatus !== 200 && resStatus !== 201) {
        if (resStatus === 404) {
          throw new Error("The token has expired. Sign in again");
        }
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      alert(error);
      loggedIn = false;
      localStorage.setItem("token", null);
      window.location.href = "login.html";
    }
  }
}

async function addRating() {
  let rate = document.getElementById("ratingSlider").value;
  let rateText = document.getElementById("message").value;
  if (otherUser && otherUser.role === "owner" && user.role !== "owner") {
    alert("Only owners can rate coworkers");
    return;
  }
  //adding rating
  try {
    // let formData = new FormData();
    let reviews = [];
    if (otherUser.reviews) reviews = otherUser.reviews;
    reviews.push({ rating: rate, ratingText: rateText, by: user._id });

    // Append values to FormData object
    // formData.append("reviews", JSON.stringify(reviews));
    console.log(reviews)
    //updating
    const response = await fetch(`${url}/user/addreview/${otherUser._id}`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviews),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    alert("Review added");
    otherUser = data.updatedUser;
    fillValues();
  } catch (error) {
    alert("failed to update the listing");
    console.error("Error occurred: ", error.message);
  }
}

window.onload = async () => {
  try {
    user = await getUsers();
    await fillValues();
  } catch (error) {
    console.error("Error fetching user:", error);
  }
  //containers
  var container1 = document.querySelector(".container");
  var container2 = document.querySelector(".container2");
  var container3 = document.querySelector(".container3");
  var changePasswordContainer = document.querySelector(
    "#changePasswordContainer"
  );
  // var updateContainer = document.querySelector("#container")
  container1.style.display = "none";
  container2.style.display = "none";
  container3.style.display = "block";
  changePasswordContainer.style.display = "none";

  //icons
  var profileIcon = document.querySelectorAll(".profileIcon");
  var edit = document.querySelectorAll(".editInfo");
  var settingsIcon = document.querySelectorAll(".settingsIcon");

  //show or hide edit button
  if (loggedIn && userId === user._id) {
    edit.forEach((el) => (el.style.display = "block"));
    settingsIcon.forEach((el) => (el.style.display = "block"));
  } else {
    edit.forEach((el) => (el.style.display = "none"));
    settingsIcon.forEach((el) => (el.style.display = "none"));
  }

  //to change divs
  for (var i = 0; i < profileIcon.length; i++) {
    profileIcon[i].addEventListener("click", () => {
      container1.style.display = "none";
      container2.style.display = "none";
      container3.style.display = "block";
      changePasswordContainer.style.display = "none";
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
      changePasswordContainer.style.display = "none";
    });
  }

  document.getElementById("logOut").addEventListener("click", logOut);
  document.getElementById("delete").addEventListener("click", deleteAccount);

  //rating
  console.log(otherUser)
  if (loggedIn && user.role === "owner" && otherUser.role !== "owner") {
    document.getElementById("ratingSlider").addEventListener("change", (el) => {
      document.getElementById("sliderValue").textContent =
        document.getElementById("ratingSlider").value;
    });
    document.getElementById("addRating").addEventListener("click", addRating);
  } else {
    document.getElementById("rate").style.display = "none";
  }

  var changePasswordOption = document.querySelector("#changePassword");

  changePasswordOption.addEventListener("click", function () {
    changePasswordContainer.style.display = "flex";
    container1.style.display = "none";
    container2.style.display = "none";
    container3.style.display = "none";
  });

  //reviews
  if (otherUser) {
    console.log(otherUser.reviews)
    if (otherUser.reviews.length > 0) {
      reviews = otherUser.reviews;
    } else {
      reviews = false;
    }
  } else if (user) {
    if (user.reviews && user.reviews.length > 0) {
      reviews = user.reviews;
    } else {
      reviews = false;
    }
  }

  showNextReview();
  setInterval(showNextReview, 3000); // Change review every 3 seconds
};


//reviews

var reviews = otherUser?.reviews;
const slideshowContainer = document.getElementById("review-slideshow");

function addReviewSlide(review) {
  const slide = document.createElement("div");
  if (review === false) {
    slide.innerHTML = "No reviews YET !";
    slide.style.textAlign = "center";
  } else {
    slide.innerHTML = `
        <p>by: ${review.name}</p>
        <p>Rating: ${review.rating}</p>
        <p>${review.ratingText}</p>
    `;
  }
  slide.classList.add("review-slide");
  slideshowContainer.appendChild(slide);
  setTimeout(() => {
    slide.classList.add("active");
    setTimeout(() => {
      slide.classList.remove("active");
      setTimeout(() => {
        slideshowContainer.removeChild(slide);
      }, 1000);
    }, 2000);
  }, 1000);
}

function showNextReview() {
  console.log(reviews)
  if (!reviews) {
    addReviewSlide(false);
    return;
  }
  const review = reviews.shift();
  addReviewSlide(review);
  reviews.push(review);
}

// Start the slideshow
