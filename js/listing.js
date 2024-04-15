const params = new URLSearchParams(window.location.search);
const id = params.get("id");
var huff;
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
    listing = data[0];
  } catch (error) {
    console.error("Error occurred: ", error.message);
    throw error;
  }
  fillingIn();
}

function fillingIn() {
  console.log(listing);
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
  document.getElementById("owner").innerText = listing.owner.name;
  document.getElementById("price").innerText = listing.price;
  var cardImg = document.getElementById("image");
  if (
    !listing.picturePath ||
    listing.picturePath === "" ||
    listing.picturePath.length === 0
  )
    cardImg.src = `https://source.unsplash.com/random/?${
      "office " + Math.random()
    }`;
  else cardImg.src = listing.picturePath;
  document.getElementById("description").innerText = listing.description;
  document.getElementById("location").innerText = listing.location;
  document.getElementById("contact").innerText = listing.owner.email;
  document.getElementById("smoking").innerText = listing.isSmokingAllowed
    ? "Smoking is allowed"
    : "Smoking NOT ALLOWED";
  document.getElementById("term").innerText = listing.term;
  document.getElementById("availability").innerText = listing.availability;
  document.getElementById("category").innerText = listing.category;
  document.getElementById("seating").innerText = listing.seating;
  document.getElementById("rating").innerText = avgRating;
  document.getElementById("reviews").innerText = listing.reviews;
  document.getElementById("contactOwner").href = listing.owner.email;
}

function addRating() {
  let rate = document.getElementById("ratingSlider").value;
  let rateText = document.getElementById("message").value;
  let index = listings.findIndex((el) => (el.id = id));
  listings[index].rating.push({ rate: rate, rateText: rateText });
  localStorage.setItem("workspaces", JSON.stringify(listings));
  getListing();
}

async function editListing(event) {
  event.preventDefault();

  // Retrieve all input elements
  let titleInput = document.getElementById("titleInput").value;
  let priceInput = document.getElementById("priceInput").value;
  let imageInput = document.getElementById("imageInput").files[0]; // Retrieve the file from input
  let descriptionInput = document.getElementById("descriptionInput").value;
  let locationInput = document.getElementById("locationInput").value;
  let contactInput = document.getElementById("contactInput").value;
  let smokingInput = document.getElementById("smokingInput").checked; // Checkbox value
  let termInput = document.getElementById("termInput").value;
  let availabilityInput = document.getElementById("availabilityInput").value;
  let categoryInput = document.getElementById("categoryInput").value;
  let seatingCapacityInput = document.getElementById("seatingInput").value;
  
  // Create FormData object
  try {
    let formData = new FormData();

    // Append values to FormData object
    formData.append("title", titleInput);
    formData.append("price", priceInput);
    formData.append("image", imageInput); // Append the file
    formData.append("description", descriptionInput);
    formData.append("location", locationInput);
    formData.append("contact", contactInput);
    formData.append("smoking", smokingInput);
    formData.append("term", termInput);
    formData.append("availability", availabilityInput);
    formData.append("category", categoryInput);
    formData.append("seatingCapacity", seatingCapacityInput);

    //updating
    const response = await fetch(`${url}/listing/update/${listing._id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });
    const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Edit successful")
      document.getElementById("containerInput").style.display = "none";
      document.getElementById("container").style.display = "block";
      getListings();
  } catch (error) {
    alert("failed to update the listing")
    console.error("Error occurred: ", error.message);
  }
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
  //complete this similarly for alll other inputs
}

window.onload = async () => {
  await getListings();
  await getUsers();

  if (loggedIn && user.role === "owner") {
    document.getElementById("rate").display = "flex";
  }

  if (loggedIn && user._id === listing.owner._id) {
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
  document
    .getElementById("submitEdit")
    .addEventListener("click", (event) => editListing(event));
};
