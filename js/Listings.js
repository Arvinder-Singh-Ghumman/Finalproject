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
  console.log(listings);
}

//filter listings
function filterListings() {
  let sortedList;
  //update these values from document
  let maxPrice = undefined,
    minPrice = undefined,
    name = undefined,
    seats = undefined,
    rate = undefined;

  // maxPrice = document.querySelector("#maxPrice").value;
  // minPrice = document.querySelector("#minPrice").value;
  // seats = document.querySelector(".seatingCapacity").value;
  // rate = document.querySelector('input[name="rating"]:checked').value;

  //on the basis of name
  sortedList === null
    ? sortedList.includes(name)
    : (sortedList = workspaces.includes(name));
  workspaces
    .filter((el) => {
      if (name !== undefined) {
        el.name.toLowerCase() === name.toLowerCase();
      }
    })
    .forEach((element) => {
      sortedList.contains(element) ? "" : sortedList.append(element);
    });

  //on the basis of rate
  // sortedList == null
  //   ? (sortedList = workspaces.filter((el) => el.rate == rate))
  //   : (sortedList = sortedList.filter((el) => el.rate == rate));

  // //on the basis of seating
  // sortedList == null
  //   ? (sortedList = workspaces.filter((el) => el.seats == seats))
  //   : (sortedList = sortedList.filter((el) => el.seats == seats));

  //on the basis of price
  sortedList = workspaces.filter((el) => {
    if (maxPrice !== undefined && minPrice !== undefined)
      el.price < maxPrice && el.price > minPrice;
    else if (maxPrice === undefined && minPrice !== undefined)
      el.price < maxPrice;
    else if (maxPrice !== undefined && minPrice === undefined)
      el.price > minPrice;
  });


  console.log(workspaces);

  workspaces.forEach((el)=>addListing(workspaces, "SearchResults"))
}

//function to add listings to the doc
function addListing(listing, cardsId) {
  // creating card and its elements
  var card = document.createElement("div");
  card.classList.add("card");

  var cardTitle = document.createElement("h3");
  cardTitle.classList.add("cardTitle");
  cardTitle.innerText = listing.title;

  var cardImg = document.createElement("img");
  cardImg.src = listing.img;

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

window.onload = () => {
  getListings();
  filterListings();
  document
    .querySelector("#filtered")
    .addEventListener("click", filterListings());
};
