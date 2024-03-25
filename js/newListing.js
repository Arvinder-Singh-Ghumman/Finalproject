import { listings } from "../database/listingsDatabse.js";
var workspaces;
var user = sessionStorage.getItem("user");
user === null ? (window.location = "login.html") : "";

//fetch listings
function getListings() {
  //storing all the listings in local database as we are not implementing a backend in phase 1
  if (localStorage.getItem("workspaces") == null) {
    workspaces = listings;
    localStorage.setItem("workspaces", JSON.stringify(workspaces));
  } else {
    workspaces = JSON.parse(localStorage.getItem("workspaces"));
  }
}

//function to add new listing
async function newListing(event) {
  event.preventDefault();
  let title,
    owner,
    image,
    seating,
    ownerContact,
    rating,
    reviews,
    description,
    price,
    location,
    isSmokingAllowed,
    availabilityStart,
    availabilityEnd,
    term,
    category;
  //fetching values
  title = document.getElementById("title").value;
  location = document.getElementById("location").value;
  seating = document.getElementById("seatingInput").value;
  description = document.getElementById("descriptionInput").value;
  price = document.getElementById("price").value;
  isSmokingAllowed = document.getElementById("isSmokingAllowed").checked;
  category = document.getElementById("category").value;

  availabilityStart = document.getElementById("addFromAvailability").value;
  availabilityEnd = document.getElementById("addToAvailability").value;

  image = await forImage();

  console.log(image);

  // term = document.getElementById("term").value;
  //adding to the databse;
  workspaces.push({
    id: workspaces.length+1,
    title: title,
    owner: user.name,
    image: image,
    seating: seating,
    ownerContact: user.email,
    rating: 0,
    reviews: 0,
    description: description,
    price: price,
    location: location,
    isSmokingAllowed: isSmokingAllowed,
    availability: availabilityStart + " to " + availabilityEnd,
    term: term,
    category: category,
  });
  localStorage.setItem("workspaces", JSON.stringify(workspaces));
}

function forImage() {
  return new Promise((resolve, reject) => {
    //getting image
    let input = document.getElementById("imageInput");
    let file = input.files[0];

    if (file) {
      let reader = new FileReader();
      reader.onload = function (e) {
        resolve(e.target.result); // Resolve with the image data
      };
      reader.readAsDataURL(file);
    } else {
      resolve(null); // Resolve with null if no file is selected
    }
  });
}

window.onload = () => {
  getListings();

  document
    .getElementById("newListing")
    .addEventListener("submit", (event) => newListing(event));
};
