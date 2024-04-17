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
  var avgRating;
  if(listing.reviews){
    let reviews = listing.reviews;
    let totalRating = 0;
    reviews.forEach((el) => {
      totalRating += parseInt(el.rating);
    });
    rating?.length === 0
      ? (avgRating = 0)
      : (avgRating = (totalRating / reviews.length));

  }
  document.getElementById("title").innerText = listing.title;
  document.getElementById("owner").innerText = listing.owner.name;
  document.getElementById("owner").addEventListener("click",()=>window.location.href=`loggedInProfile.html?id=${listing.owner._id}`)
  
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
  // Description
  if (listing && listing.description) {
    document.getElementById("description").innerText = listing.description;
  } else {
    document.getElementById("description").style.display = "none";
  }

  // Location
  if (listing && listing.location) {
    document.getElementById("location").innerText = listing.location;
  } else {
    document.getElementById("location").style.display = "none";
  }

  // Contact
  if (listing && listing.owner && listing.owner.email) {
    document.getElementById("contact").innerText = listing.owner.email;
  } else {
    document.getElementById("contact").style.display = "none";
  }

  // Smoking
  if (listing && listing.isSmokingAllowed !== undefined) {
    document.getElementById("smoking").innerText = listing.isSmokingAllowed
      ? "Smoking is allowed"
      : "Smoking NOT ALLOWED";
  } else {
    document.getElementById("smoking").style.display = "none";
  }

  // Term
  if (listing && listing.term) {
    document.getElementById("term").innerText = listing.term;
  } else {
    document.getElementById("term").style.display = "none";
  }

  // Availability
  if (listing && listing.availability) {
    document.getElementById("availability").innerText = listing.availability;
  } else {
    document.getElementById("availability").style.display = "none";
  }

  // Category
  if (listing && listing.category) {
    document.getElementById("category").innerText = listing.category;
  } else {
    document.getElementById("category").style.display = "none";
  }

  // Seating
  if (listing && listing.seating) {
    document.getElementById("seating").innerText = listing.seating;
  } else {
    document.getElementById("seating").style.display = "none";
  }

  // Rating
  if (avgRating !== undefined) {
    document.getElementById("rating").innerText = avgRating;
  } else {
    document.getElementById("rating").style.display = "none";
  }

  // Reviews
  if (listing && listing.reviews) {
    document.getElementById("reviews").innerText = listing.reviews.length;
  } else {
    document.getElementById("reviews").style.display = "none";
  }

  // Neighborhood
  if (listing && listing.neighborhood) {
    document.getElementById("neighborhood").textContent = listing.neighborhood;
  } else {
    document.getElementById("neighborhood").style.display = "none";
  }

  // Area
  if (listing && listing.squareFeet) {
    document.getElementById("area").innerText =
      listing.squareFeet + "(in sq ft)";
  } else {
    document.getElementById("area").style.display = "none";
  }

  // Parking
  if (listing && listing.hasParking !== undefined) {
    document.getElementById("parking").textContent = listing.hasParking?"Has parking":"No parking";
  } else {
    document.getElementById("parking").style.display = "none";
  }

  // Public Transportation
  if (listing && listing.hasPublicTransportation !== undefined) {
    
    console.log(document.getElementById("publicTransportation"))
    document.getElementById("publicTransportation").textContent =
      listing.hasPublicTransportation
        ? "Has public transportaion"
        : "No public transport";
  } else {
    document.getElementById("publicTransportation").style.display = "none";
  }

  document.getElementById("contactOwner").href = listing.owner.email;
}


async function addRating() {
  let rate = document.getElementById("ratingSlider").value;
  let rateText = document.getElementById("message").value;
  if(user &&user.role==="owner"){
    alert("Owners cannot rate listings")
    return;
  }
  //adding rating
  try {
    let formData = new FormData();
    let reviews = [];
    if(listing.reviews) reviews = listing.reviews;
    reviews.push({rating: rate,ratingText: rateText,by:user._id})
 
    // Append values to FormData object
      formData.append("reviews", JSON.stringify(reviews));

    //updating
    const response = await fetch(`${url}/listing/update/${listing._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    alert("Review added");
    listing = data.updatedListing;
    fillingIn();
  } catch (error) {
    alert("failed to update the listing");
    console.error("Error occurred: ", error.message);
  }
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
  let neighborhoodInput = document.getElementById("neighborhoodInput").value;
  let areaInput = document.getElementById("areaInput").value;
  let parkingAvailabilityInput = document.getElementById(
    "parkingAvailabilityInput"
  ).checked;
  let publicTransportationAvailabilityInput = document.getElementById(
    "publicTransportationAvailabilityInput"
  ).checked;

  // Create FormData object
  try {
    let formData = new FormData();

    // Append values to FormData object
    if (titleInput.trim() !== "") {
      formData.append("title", titleInput.trim());
    }

    if (priceInput.trim() !== "") {
      formData.append("price", priceInput.trim());
    }

    if (imageInput) {
      formData.append("image", imageInput); // Append the file
    }

    if (descriptionInput.trim() !== "") {
      formData.append("description", descriptionInput.trim());
    }

    if (locationInput.trim() !== "") {
      formData.append("location", locationInput.trim());
    }

    if (contactInput.trim() !== "") {
      formData.append("contact", contactInput.trim());
    }

    formData.append("smoking", smokingInput);

    if (termInput.trim() !== "") {
      formData.append("term", termInput.trim());
    }

    if (availabilityInput.trim() !== "") {
      formData.append("availability", availabilityInput.trim());
    }

    if (categoryInput.trim() !== "") {
      formData.append("category", categoryInput.trim());
    }

    if (seatingCapacityInput.trim() !== "") {
      formData.append("seatingCapacity", seatingCapacityInput.trim());
    }

    if (areaInput.trim() !== "") {
      formData.append("squareFeet", areaInput.trim());
    }

    if (neighborhoodInput.trim() !== "") {
      formData.append("neighborhood", neighborhoodInput.trim());
    }

    formData.append("hasParking", parkingAvailabilityInput);

    formData.append(
      "hasPublicTransportation",
      publicTransportationAvailabilityInput
    );

    //updating
    const response = await fetch(`${url}/listing/update/${listing._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    alert("Edit successful");
    document.getElementById("containerInput").style.display = "none";
    document.getElementById("container").style.display = "block";
    getListings();
  } catch (error) {
    alert("failed to update the listing");
    console.error("Error occurred: ", error.message);
  }
}

function displayEdit() {
  document.getElementById("containerInput").style.display = "flex";
  document.getElementById("container").style.display = "none";
}

window.onload = async () => {
  document.getElementById("containerInput").style.display = "none";

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

  //rating
  document.getElementById("ratingSlider").addEventListener("change", (el)=>{
    document.getElementById("sliderValue").textContent = document.getElementById("ratingSlider").value;
  });
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
