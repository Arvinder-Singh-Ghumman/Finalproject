var listings;
var myListCounter = 6;
//fetch listings
// function getListings() {
//   //storing all the listings in local database as we are not implementing a backend in phase 1
//   if (localStorage.getItem("workspaces") == null) {
//     workspaces = listings;
//     localStorage.setItem("workspaces", JSON.stringify(workspaces));
//   } else {
//     workspaces = JSON.parse(localStorage.getItem("workspaces"));
//   }

//   if (workspaces !== null) {
//     document.querySelector("#listings").innerHTML = "";

//     workspaces.slice(0, 6).forEach((el) => addListing(el, "listings"));
//   } else {
//     document.querySelector("#listings").innerText = "none found";
//   }
// }

//fetch listings
async function getListings() {
  
  //getting listings
    // document.getElementById("listingsTitle").innerText = "All listings";

    try {
    const response = await fetch(`${url}/listing/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message);
    }
    listings = data;
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  
  listings.slice(0, 6).forEach((el)=>addListing(el));
}


//function to add listings to the doc
function addListing(listing) {
  // creating card and its elements
  var card = document.createElement("div");
  card.classList.add("card");
  card.id=listing._id;

  var cardTitle = document.createElement("h3");
  cardTitle.classList.add("cardTitle");
  cardTitle.innerText = listing.title;

  var cardImg = document.createElement("img");
  if(!listing.image)
    cardImg.src = `https://source.unsplash.com/random/?${"office "+Math.random()}`;


  var cardDescr = document.createElement("p");
  cardDescr.classList.add("cardDescr");
  cardDescr.innerText = listing.description;

  var cardPrice = document.createElement("p");
  cardPrice.classList.add("cardPrice");
  cardPrice.innerText = listing.price;

  var cardRating = document.createElement("p");
  cardRating.classList.add("cardRating");
  var avgRating;
  if(listing.reviews){
    let reviews = listing.reviews;
    let totalRating = 0;
    reviews.forEach((el) => {
      totalRating += parseInt(el.rating);
    });
    reviews?.length === 0
      ? (avgRating = 0)
      : (avgRating = (totalRating / reviews.length));
  }
    cardRating.innerText = avgRating ? avgRating+" Reviews":"no reviews yet";


  //adding elements of card to card
  card.appendChild(cardTitle);
  card.appendChild(cardTitle);
  card.appendChild(cardImg);
  card.appendChild(cardDescr);
  card.appendChild(cardPrice);
  card.appendChild(cardRating);

  //adding card to the given cardsId
  var cards = document.getElementById("listings");
  cards.append(card);
}

function closeLoginPopUp() {
  document.getElementById("loginPopUp").style.display = "none";
}

window.onload = async () => {
  if (localStorage.getItem("token") !== null)
    window.location.href = "loggedInHome.html";

  await getListings();

  document.querySelectorAll(".card").forEach((el)=>{
    el.addEventListener("click", (e)=> window.location.href=("listinginfo.html?id="+el.id))
  })

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
