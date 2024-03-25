import { listings } from "../database/listingsDatabse.js";
var workspaces;

//fetch listings
function getListings() {
  //storing all the listings in local database as we are not implementing a backend in phase 1
  if (localStorage.getItem("workspaces") == null) {
    workspaces = listings;
    localStorage.setItem("workspaces", JSON.stringify(workspaces));
  } else {
    workspaces = JSON.parse(localStorage.getItem("workspaces"));
  }

  if (workspaces !== null) {
    document.querySelector("#listings").innerHTML = "";

    workspaces.slice(0, 6).forEach((el) => addListing(el, "listings"));
  } else {
    document.querySelector("#listings").innerText = "none found";
  }
}

//function to add listings to the doc
function addListing(listing, cardsId) {
  // creating card and its elements
  var card = document.createElement("div");
  card.classList.add("card");
  card.id=listing.id;

  var cardTitle = document.createElement("h3");
  cardTitle.classList.add("cardTitle");
  cardTitle.innerText = listing.owner;

  var cardImg = document.createElement("img");
  cardImg.src = listing.image;

  var cardDescr = document.createElement("p");
  cardDescr.classList.add("cardDescr");
  cardDescr.innerText = listing.description;

  var cardPrice = document.createElement("p");
  cardPrice.classList.add("cardPrice");
  cardPrice.innerText = listing.price;

  var cardRating = document.createElement("p");
  cardRating.classList.add("cardRating");
  cardRating.innerText = listing.rating;

  //adding elements of card to card
  card.appendChild(cardTitle);
  card.appendChild(cardTitle);
  card.appendChild(cardImg);
  card.appendChild(cardDescr);
  card.appendChild(cardPrice);
  card.appendChild(cardRating);

  //adding card to the given cardsId
  var cards = document.getElementById(cardsId);
  cards.append(card);
}

function closeLoginPopUp() {
  document.getElementById("loginPopUp").style.display = "none";
}

window.onload = () => {
  if (sessionStorage.getItem("user") != null)
    window.location.href = "loggedInHome.html";

  getListings();

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      document.querySelector("nav").classList.add("navScrolled");
    } else {
      document.querySelector("nav").classList.remove("navScrolled");
    }
  });

  document.getElementById("loginPopUpClose").addEventListener("click", closeLoginPopUp)

  setTimeout(()=> {
    document.getElementById("loginPopUp").style.display = "block";
  }, 10000); // 10000 milliseconds = 10 seconds

};
