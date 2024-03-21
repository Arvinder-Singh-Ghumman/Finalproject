//function to add listings to the doc
function addListing(listing, cardsId){

  // creating card and its elements
  var card = document.createElement("div");
  card.classList.add("card");

  var cardTitle = document.createElement("h3");
  cardTitle.classList.add("cardTitle")
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