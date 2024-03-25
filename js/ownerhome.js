import { listings } from "../database/listingsDatabse.js";
var workspaces;
var user = JSON.parse(sessionStorage.getItem("user"));
user == null ? (window.location = "index.html") : "";
var myListCounter = 3;

//fetch listings
function getListings() {
  let resultLists;
  //storing all the listings in local database as we are not implementing a backend in phase 1
  if (localStorage.getItem("workspaces") == null) {
    workspaces = listings;
    localStorage.setItem("workspaces", JSON.stringify(workspaces));
  } else {
    workspaces = JSON.parse(localStorage.getItem("workspaces"));
  }
  document.querySelector("#listings").innerHTML = "";

  //checking owner or coworker
  if (user.role === "owner")
    resultLists = workspaces.filter((el) => el.owner === user.name);
  else {
    resultLists = workspaces;
    document.getElementById("listingsTitle").innerText = "All listings";
  }

  //see more button
  if (resultLists.length <= myListCounter)
    document.querySelector("#myListingsMore").style.display = "none";

  if (document.querySelector("#sortOptions").value !== "none")
    resultLists = sortListings(
      resultLists,
      document.querySelector("#sortOptions").value
    );

  addListing(resultLists.slice(0, myListCounter));
}

function sortListings(unsorted, sortBy) {
  let sortedList = unsorted;
  switch (sortBy) {
    case "price":
      sortedList = unsorted.sort((a, b) => a.price - b.price);
      alert("yea");
      break;
    case "price dec":
      sortedList = unsorted.sort((a, b) => b.price - a.price);
      break;
    case "name":
      sortedList = unsorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "rating":
      sortedList = unsorted.sort((a, b) => a.rating - b.rating);
      break;
    case "rating dec":
      sortedList = unsorted.sort((a, b) => b.rating - a.rating);
      break;
  }
  return sortedList;
}

function addListing(list) {
  list.forEach((listing) => {
    var card = document.createElement("div");
    card.classList.add("card");
    card.id=listing.id;

    var cardTitle = document.createElement("h3");
    cardTitle.classList.add("cardTitle");
    cardTitle.innerText = listing.title;

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

    //if(user.role==="owner"){
    //adding update/delete
    var cardManipulate = document.createElement("div");
    cardManipulate.classList.add("ownerControls");

    var updateButton = document.createElement("button");
    updateButton.classList.add("updateListingButton");
    updateButton.textContent = "UPDATE";
    cardManipulate.appendChild(updateButton);

    // Create a delete button with an image
    var deleteButton = document.createElement("button");
    deleteButton.className = "deleteListingButton";
    deleteButton.classList.add(listing.id);
    var deleteImage = document.createElement("img");
    deleteImage.src = "./assets/bin.png";
    deleteButton.appendChild(deleteImage);
    cardManipulate.appendChild(deleteButton);
    card.appendChild(cardManipulate);
    // }

    card.appendChild(cardImg);
    card.appendChild(cardDescr);
    card.appendChild(cardPrice);
    card.appendChild(cardRating);

    //adding card to the given div
    var cards = document.getElementById("listings");
    cards.append(card);
  });
  // creating card and its elements
}

function deleteListing(id) {
  workspaces = workspaces.filter((el) => el.id != id);
  localStorage.setItem("workspaces", JSON.stringify(workspaces));
  getListings();
  document
    .querySelectorAll(".deleteListingButton")
    .forEach((el) =>
      el.addEventListener("click", (e) =>
        deleteListing(e.currentTarget.classList[1])
      )
    );
}

window.onload = () => {
  var currentDate = new Date();
  var currentDateElement = document.getElementById("date");
  currentDateElement.innerHTML += currentDate.toLocaleDateString();

  getListings();
  //for nav
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      document.querySelector("nav").classList.add("navScrolled");
    } else {
      document.querySelector("nav").classList.remove("navScrolled");
    }
  });
  
  document.querySelectorAll(".card").forEach((el)=>{
    el.addEventListener("click", (e)=> window.location.href=("listinginfo.html?id="+el.id))
  })

  //displaying name
  document.querySelector("#ownerInfo").innerText = `Hey, ${user.name}!`;

  //event listeners
  document
    .querySelector("#sortOptions")
    .addEventListener("change", getListings);
  document.querySelector("#myListingsMore").addEventListener("click", () => {
    myListCounter += 6;
    getListings();
  });
  document
    .querySelectorAll(".deleteListingButton")
    .forEach((el) =>
      el.addEventListener("click", (e) =>
        deleteListing(e.currentTarget.classList[1])
      )
    );
  document
    .querySelectorAll(".updateListingButton")
    .forEach((el) =>
      el.addEventListener("click", (e) => (window.location.href = "edit.html"))
    );
};
