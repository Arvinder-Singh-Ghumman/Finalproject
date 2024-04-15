const params = new URLSearchParams(window.location.search);
const id = params.get("id");

var listing = null;

async function getListings() {
  try {
    let resStatus;

    const response = await fetch(`${url}/listing?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    resStatus = response.status;
    const data = await response.json();

    if (resStatus !== 200 && resStatus !== 201) {
      if (resStatus === 404) {
        throw new Error("The token has expired. Sign in again");
      }
      throw new Error(data.message);
    }
    listing = data;
    fillingIn();
    return data;
  } catch (error) {
    console.error("Error occurred: ", error.message);
    throw error;
  }
}
// async function getUsers() {
//   var resStatus;
//   let token = localStorage.getItem("token");

//   if (token !== null) {
//     loggedIn = true;
//     try {
//       const response = await fetch(`${url}/user/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       resStatus = response.status;

//       if (resStatus !== 200 && resStatus !== 201) {
//         if (resStatus === 404) {
//           throw new Error("The token has expired. Sign in again");
//         }
//         throw new Error(data.message);
//       }

//       return data;
//     } catch (error) {
//       alert(error);
//       loggedIn = false;
//       localStorage.setItem("token", null);
//       window.location.href = "login.html";
//     }
//   }
// }

function fillingIn() {
  //getting avgRating
  // rating = listing.reviews?.rate;
  let totalRating = 0;
  let avgRating;
  // rating.forEach((el) => {
  //   totalRating += el.rate;
  // });
  // rating?.length === 0
  //   ? (avgRating = 0)
  //   : (avgRating = totalRating / rating.length);
  document.getElementById("title").innerText = listing.title;
  document.getElementById("owner").innerText = listing.owner;
  document.getElementById("price").innerText = listing.price;
  if (!listing.picturePath)
    cardImg.src = `https://source.unsplash.com/random/?${
      "office " + Math.random()
    }`;
  else cardImg.src = listing.picturePath;
  document.getElementById("description").innerText = listing.description;
  document.getElementById("location").innerText = listing.location;
  document.getElementById("contact").innerText = listing.contact;
  document.getElementById("smoking").innerText = listing.isSmokingAllowed
    ? "Smoking is allowed"
    : "Smoking NOT ALLOWED";
  document.getElementById("term").innerText = listing.term;
  document.getElementById("availability").innerText = listing.availability;
  document.getElementById("category").innerText = listing.category;
  document.getElementById("seating").innerText = listing.seating;
  document.getElementById("rating").innerText = avgRating;
  document.getElementById("reviews").innerText = listing.reviews;
}

function addRating() {
  let rate = document.getElementById("ratingSlider").value;
  let rateText = document.getElementById("message").value;
  let index = listings.findIndex((el) => (el.id = id));
  listings[index].rating.push({ rate: rate, rateText: rateText });
  localStorage.setItem("workspaces", JSON.stringify(listings));
  getListing();
}

function displayEdit() {
  document.getElementById("containerInput").style.display = "flex";
  document.getElementById("container").style.display = "none";
  // Retrieve all input elements
  let titleInput = document.getElementById("titleInput");
  let ownerInput = document.getElementById("ownerInput");
  let priceInput = document.getElementById("priceInput");
  let imageSrcInput = document.getElementById("imageInput");
  let descriptionInput = document.getElementById("descriptionInput");
  let locationInput = document.getElementById("locationInput");
  let contactInput = document.getElementById("contactInput");
  let smokingInput = document.getElementById("smokingInput");
  let termInput = document.getElementById("termInput");
  let availabilityInput = document.getElementById("availabilityInput");
  let categoryInput = document.getElementById("categoryInput");
  let seatingCapacityInput = document.getElementById("seatingInput");
  let reviewsInput = document.getElementById("reviewsInput");

  // titleInput.value = listing.title;
  // ownerInput.value = listing.owner;
  // priceInput.value = listing.price;
  // imageSrcInput.value = listing.image;
  // descriptionInput.value = listing.description;
  // locationInput.value = listing.location;
  // contactInput.value = listing.contact;
  // smokingInput.value = listing.isSmokingAllowed;
  // termInput.value = listing.term;
  // availabilityInput.value = listing.availability;
  // categoryInput.value = listing.category;
  // seatingCapacityInput.value = listing.seating;
  // if(titleInput.value !==listing.title){
  //   let index = workspaces.findIndex((el)=>el.id===id)
  //   workspaces[index].title = titleInput.value;
  // }
  //complete this similarly for all other inputs
}

window.onload = async () => {
  listing = await getListings();
  // user = await getUsers();
  let user = JSON.parse(sessionStorage.getItem("user"));
  if (user.role === "owner") {
    document.getElementById("rate").display = "flex";
  }

  if (user._id === listing.owner._id) {
    document.getElementById("editListing").style.display = "block";
    document.getElementById("rate").style.display = "none";
  } else {
    document.getElementById("editListing").style.display = "none";
  }

  document.getElementById("addRating").addEventListener("click", addRating);

  //for nav
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      document.querySelector("nav").classList.add("navScrolled");
    } else {
      document.querySelector("nav").classList.remove("navScrolled");
    }
  });

  document.getElementById("editListing").addEventListener("click", displayEdit);
};
