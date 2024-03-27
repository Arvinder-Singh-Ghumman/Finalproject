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

  //updating workspaces as per search param
  let searchParam = document.querySelector("#searchBar").value;
  if (search !== "") var results = search(searchParam);

  results !== null ? filterListings(results) : filterListings(workspaces);
}

function search(searchParam) {
  //in name
  let res = workspaces.filter((el) => {
    if (el.title.includes(searchParam)) return true;
  });
  let categories = ["workspace", "meeting Room", "desk", "private Office"];
  categories.forEach((el) => {
    if (searchParam.toLowerCase().includes(el.toLowerCase()))
      document.querySelector("#" + el.replace(" ", "")).checked = true;
  });

  return res;
}

function filterListings(results) {
  let sortedList = results;
  //variables
  let maxPrice, minPrice, name, seats, category, city, rate;

  //fetching values
  maxPrice = document.querySelector("#maxPrice").value;
  minPrice = document.querySelector("#minPrice").value;
  seats = document.querySelector("#seatingCapacity").value;
  city = document.querySelector("#citySelection").value;
  rate =
    document.querySelector('input[name="rating"]:checked') == null
      ? null
      : document.querySelector('input[name="rating"]:checked').value;
  category =
    document.querySelector('input[name="category"]:checked') == null
      ? null
      : document.querySelector('input[name="category"]:checked').value;

  //calling appropriate filtering functions
  if (minPrice !== "" || maxPrice !== "")
    sortedList = filterByPrice(minPrice, maxPrice, sortedList);
  if (rate !== null) sortedList = filterByRate(rate, sortedList);
  if (seats !== "") sortedList = filterBySeats(seats, sortedList);
  if (category !== null) sortedList = filterByCategory(category, sortedList);
  if (city !== "") sortedList = filterByCity(city, sortedList);

  //updating the cards in html
  console.log(sortedList);
  document.querySelector("#SearchResults").innerHTML = "";
  sortedList.forEach((el) => addListing(el, "SearchResults"));
}
const filterByPrice = (min, max, sortedList) => {
  //filter by price
  let res = sortedList.filter((el) => {
    if (max !== "" && min !== "") {
      return el.price < max && el.price > min ? ture : false;
    } else if (max === "" && min !== "") {
      return el.price > min ? true : false;
    } else if (max !== "" && min === "") {
      return el.price < max ? true : false;
    }
  });
  return res;
};
const filterByRate = (rate, sortedList) => {
  //filter by rate
  let res = sortedList.filter((el) => Math.floor(el.rating) == rate);
  return res;
};
const filterBySeats = (seats, sortedList) => {
  //filter by seats
  let res = sortedList.filter((el) => el.seating >= seats);
  return res;
};
const filterByCategory = (category, sortedList) => {
  //filter by seats
  let res = sortedList.filter((el) => el.category == category);
  return res;
};
const filterByCity = (city, sortedList) => {
  //filter by city
  let res = sortedList.filter((el) => el.location.includes(city));
  return res;
};

function sortListings(unsorted, sortBy) {
  let sortedList;
  switch (sortBy) {
    case "price":
      sortedList = unsorted.sort((a, b) => a.price > b.price);
      break;
    case "name":
      sortedList = unsorted.sort((a, b) => a.localeCompare(b));
      break;
    case "rating":
      sortedList = unsorted.sort((a, b) => a.rating > b.rating);
      break;
  }
  if (document.getElementById("sortByOrder").value === "1")
    sortedList = sortedList.reverse();
  return sortedList;
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

window.onload = () => {
  getListings();

  //adding event listenr
  try {
    document.querySelectorAll(".card").forEach((el)=>{
      el.addEventListener("click", (e)=> window.location.href=("listinginfo.html?id="+el.id))
    })
    document.querySelector("#filtered").addEventListener("click", getListings);
    document
      .querySelector("#searchBar")
      .addEventListener("change", getListings);
  } catch {}
};
