var resultLists = [];
async function getListings() {
  let body;
  var searchData={};
  var fetchUrl = `${url}/listing/search/?`;

  var search = document.getElementById("searchBar").value;
  if (search && search.trim()!=="") searchData.title = search;

  // address
  var address = document.getElementById("citySelection").value;
  if (address && address.trim()!=="") searchData.address = address.trim();
  //category
  let category =
  document.querySelector('input[name="category"]:checked') == null
  ? null
  : document.querySelector('input[name="category"]:checked').value;
  console.log(category);
  if (category) searchData.category = category;
  // minprice
  var minPrice = document.getElementById("minPrice").value;
  if (minPrice && minPrice!=="") searchData.minPrice = minPrice.trim();
  // maxPrice
  var maxPrice = document.getElementById("maxPrice").value;
  if (maxPrice && maxPrice!=="") searchData.maxPrice = maxPrice.trim();
  // seatingCapacity
  var seatingCapacity = document.getElementById("seatingCapacity").value;
  if (seatingCapacity && seatingCapacity.trim()!=="") searchData.seatingCapacity = seatingCapacity.trim();
   var rate =
    document.querySelector('input[name="rating"]:checked') == null
      ? null
      : document.querySelector('input[name="rating"]:checked').value;
  if(rate && rate!=="")searchData.rate = rate;
  
  let finalUrl  =  fetchUrl + toQuery(searchData);
  try {
    const response = await fetch(finalUrl, {
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
    resultLists = data;
  } catch (error) {
    console.error("Error occurred: ", error);
  }
  document.getElementById("SearchResults").innerHTML="";
  resultLists.forEach((el) => addListing(el));

}

// function search(searchParam) {
//   //in name
//   let res = workspaces.filter((el) => {
//     if (el.title.includes(searchParam)) return true;
//   });
//   let categories = ["workspace", "meeting Room", "desk", "private Office"];
//   categories.forEach((el) => {
//     if (searchParam.toLowerCase().includes(el.toLowerCase()))
//       document.querySelector("#" + el.replace(" ", "")).checked = true;
//   });

//   return res;
// }
function toQuery(data) {
  const queryParams = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
    }
  }
  return queryParams.join('&');
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
  document.querySelectorAll(".card").forEach((el) => {
    el.addEventListener(
      "click",
      (e) => (window.location.href = "listinginfo.html?id=" + el.id)
    );
  });
}
// All THIS IS CONVERTED TO BACKEND IN PHASE 2
// const filterByPrice = (min, max, sortedList) => {
//   //filter by price
//   let res = sortedList.filter((el) => {
//     if (max !== "" && min !== "") {
//       return el.price < max && el.price > min ? ture : false;
//     } else if (max === "" && min !== "") {
//       return el.price > min ? true : false;
//     } else if (max !== "" && min === "") {
//       return el.price < max ? true : false;
//     }
//   });
//   return res;
// };
// const filterByRate = (rate, sortedList) => {
//   //filter by rate
//   let res = sortedList.filter((el) => Math.floor(el.rating) == rate);
//   return res;
// };
// const filterBySeats = (seats, sortedList) => {
//   //filter by seats
//   let res = sortedList.filter((el) => el.seating >= seats);
//   return res;
// };
// const filterByCategory = (category, sortedList) => {
//   //filter by seats
//   let res = sortedList.filter((el) => el.category == category);
//   return res;
// };
// const filterByCity = (city, sortedList) => {
//   //filter by city
//   let res = sortedList.filter((el) => el.location.includes(city));
//   return res;
// };

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
  card.id = listing._id;

  var cardTitle = document.createElement("h3");
  cardTitle.classList.add("cardTitle");
  cardTitle.innerText = listing.title;

  var cardImg = document.createElement("img");
  if (
    !listing.picturePath ||
    listing.picturePath === "" ||
    listing.picturePath.length === 0
  )
    cardImg.src = `https://source.unsplash.com/random/?${
      "office " + Math.random()
    }`;
  else cardImg.src = listing.picturePath;

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
  var cards = document.getElementById("SearchResults");
  cards.append(card);
}

window.onload = async () => {
  await getListings();

  //adding event listenr
  try {
    document.querySelectorAll(".card").forEach((el) => {
      el.addEventListener(
        "click",
        (e) => (window.location.href = "listinginfo.html?id=" + el.id)
      );
    });
    document.querySelector("#filtered").addEventListener("click", getListings);
    document
      .querySelector("#searchBar")
      .addEventListener("change", getListings);
  } catch (err){
    console.log(err)
  }
};
