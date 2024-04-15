async function getListings() {
  try {
    let resStatus;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const response = await fetch(`${url}/listing?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    resStatus = response.status;
    const data = await response.json();
    console.log(data)

    if (resStatus !== 200 && resStatus !== 201) {
      if (resStatus === 404) {
        throw new Error("The token has expired. Sign in again");
      }
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error("Error occurred: ", error.message);
    throw error;
  }
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
  card.id = listing.id;

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

window.onload = async ()  => {
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
  } catch {}
};
