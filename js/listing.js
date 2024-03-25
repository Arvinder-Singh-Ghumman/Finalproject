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
    console.log(workspaces)
    listing = workspaces.find((el) => el.id == id);
  }
  if (listing == null) alert("This listing does not exist :(");
  console.log(listing);

  fillingIn()
}

function fillingIn(){
  //getting avgRating
  let rating = listing.rating;
  let totalRating=0;
  let avgRating;
  rating.forEach(el => {
    totalRating += el.rate;
  });
  rating.length===0?avgRating=0:
  avgRating =totalRating/rating.length;
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
  document.getElementById("rating").innerText = avgRating;
  document.getElementById("reviews").innerText = listing.reviews;
}

function addRating(){
  let rate = document.getElementById("ratingSlider").value;
  let rateText = document.getElementById("message").value;
  let index = listings.findIndex((el)=>el.id=id);
  listings[index].rating.push({"rate":rate,"rateText":rateText});
  localStorage.setItem("workspaces",JSON.stringify(listings));
  getListing();
}

window.onload = () => {
  getListing();

  document.getElementById("addRating").addEventListener("click", addRating);

  //for nav
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      document.querySelector("nav").classList.add("navScrolled");
    } else {
      document.querySelector("nav").classList.remove("navScrolled");
    }
  });
};
