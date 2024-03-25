import { listings } from "../database/listingsDatabse.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

var listing = null;

function getListing() {
  //fetch listing
  if (localStorage.getItem("workspaces") == null) {
    listing = listings.find((el) => el.id == id);
  } else {
    let workspaces = JSON.parse(localStorage.getItem("workspaces"));
    listing = workspaces.find((el) => el.id == id);
  }
  if (listing == null) alert("This listing does not exist :(");
  console.log(listing);

  fillingIn()
}

function fillingIn(){
  document.getElementById("title").innerText = listing.title;
  document.getElementById("owner").innerText = listing.owner;
  document.getElementById("price").innerText = listing.price;
  document.getElementById("image").src = listing.image;
  document.getElementById("description").innerText = listing.description;
  document.getElementById("location").innerText = listing.location;
  document.getElementById("contact").innerText = listing.contact;
  document.getElementById("smoking").innerText = listing.isSmokingAllowed?"Smoking is allowed":"Smoking NOT ALLOWED";
  document.getElementById("term").innerText = listing.term;
  document.getElementById("availability").innerText = listing.availability;
  document.getElementById("category").innerText = listing.category;
  document.getElementById("seating").innerText = listing.seating;
  document.getElementById("rating").innerText = listing.rating;
  document.getElementById("reviews").innerText = listing.reviews;
}

window.onload = () => {
  getListing();

  //for nav
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      document.querySelector("nav").classList.add("navScrolled");
    } else {
      document.querySelector("nav").classList.remove("navScrolled");
    }
  });
};
