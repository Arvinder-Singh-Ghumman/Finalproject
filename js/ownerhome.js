import { listings } from "../database/listingsDatabse.js";
var workspaces;
var user = JSON.parse(sessionStorage.getItem("user"));
user == null ? (window.location = "index.html") : "";
var myListCounter =3;

//fetch listings
function getListings() {
  //storing all the listings in local database as we are not implementing a backend in phase 1
  if (localStorage.getItem("workspaces") == null) {
    workspaces = listings;
    localStorage.setItem("workspaces", JSON.stringify(workspaces));
  } else {
    workspaces = JSON.parse(localStorage.getItem("workspaces"));
  }
  document.querySelector("#listings").innerHTML="";
  let resultLists = workspaces.filter((el) => el.owner === user.name);
  if(resultLists.length<=myListCounter)
    document.querySelector("#myListingsMore").style.display = "none"
  addListing(resultLists.slice(0,myListCounter));
}

function addListing(list) {
  console.log(list);
  list.forEach((listing) => {
    var card = document.createElement("div");
    card.classList.add("card");

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

window.onload = () => {
  var currentDate = new Date();
  var currentDateElement = document.getElementById("date");
  currentDateElement.innerHTML += currentDate.toLocaleDateString();

  getListings();
  
  window.addEventListener("scroll",()=>{
    if(window.scrollY>100){
      document.querySelector("nav").classList.add("navScrolled")
    }else{
      document.querySelector("nav").classList.remove("navScrolled")
    }
  })
  document.querySelector("#ownerInfo").innerText = `Hey, ${user.name}!`
  document.querySelector("#myListingsMore").addEventListener("click",()=>{myListCounter+=6;getListings()})
};
