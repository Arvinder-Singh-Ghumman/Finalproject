var myListCounter = 9;
var user;

async function getUsers() {
  var resStatus;
  let token = localStorage.getItem("token");

  if (token) {
    loggedIn = true;
    try {
      let resStatus;
      const token = localStorage.getItem("token");

      if (token !== null) {
        const response = await fetch(`${url}/user/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        resStatus = response.status;
        const data = await response.json();

        if (resStatus !== 200 && resStatus !== 201) {
          if (resStatus === 404) {
            throw new Error("The token has expired. Sign in again");
          }
          localStorage.removeItem("token");
          throw new Error(data.message);
        }

        user = data;
      }
    } catch (error) {
      alert(error);
      loggedIn = false;
      localStorage.removeItem("token");
      window.location.href = "login.html";
    }
  }
}

//fetch listings
async function getListings() {
  var resultLists = [];
  //checking owner or coworker
  if (user.role === "owner") {
    //getting listings of this id
    let id = user._id;

    try {
      const response = await fetch(`${url}/listing/mylistings/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 404) {
          resultLists = [];
        }
        throw new Error(data.message);
      }

      resultLists = data;
    } catch (error) {
      console.error("Error occurred: ", error.message);
    }
  } else {
    document.getElementById("listingsTitle").innerText = "All listings";

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
      resultLists = data;
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  }

  //see more button
  if (resultLists.length <= myListCounter)
    document.querySelector("#myListingsMore").style.display = "none";

  if (document.querySelector("#sortOptions").value !== "None") {
    resultLists = sortListings(
      resultLists.slice(0, myListCounter),
      document.querySelector("#sortOptions").value
    );
  }

  if (resultLists.length == 0) {
    document.getElementById("listingsTitle").innerText = "No listings found";
  }
  addListing(resultLists.slice(0, myListCounter));
}

function sortListings(unsorted, sortBy) {
  let sortedList = unsorted;
  switch (sortBy) {
    case "price":
      sortedList = unsorted.sort((a, b) => a.price - b.price);
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
  document.getElementById("listings").innerHTML = "";
  list.forEach((listing) => {
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
    //getting avgRating
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

    //if(user.role==="owner"){
    //adding update/delete
    var cardManipulate = document.createElement("div");
    cardManipulate.classList.add("ownerControls");

    var updateButton = document.createElement("button");
    updateButton.classList.add("updateListingButton");
    updateButton.textContent = "UPDATE";
    cardManipulate.appendChild(updateButton);

    // Create a delete button with an image
    if (user.role === "owner") {
      var deleteButton = document.createElement("button");
      deleteButton.className = "deleteListingButton";
      deleteButton.classList.add(listing._id);
      var deleteImage = document.createElement("img");
      deleteImage.src = "./assets/bin.png";
      deleteButton.appendChild(deleteImage);
      cardManipulate.appendChild(deleteButton);
      card.appendChild(cardManipulate);
    }

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

function deleteListing(event, id) {
  event.stopPropagation();
  let resStatus;
  //deleting listing
  fetch(`${url}/listing/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      resStatus = response.status;
      return response.json();
    })
    .then((data) => {
      if (resStatus !== 200 && resStatus !== 201) {
        throw new Error(data.message);
      }

      //updating listings
      getListings();
      document
        .querySelectorAll(".deleteListingButton")
        .forEach((el) =>
          el.addEventListener("click", (e) => deleteListing(e, el.classList[1]))
        );
    })
    .catch((error) => {
      console.error("Error ooccured: ", error);
    });
}

window.onload = async () => {
  await getUsers();
  if (user === undefined) window.location.href = "index.html";

  if (user.role !== "owner") {
    document
      .querySelectorAll(".deleteListingButton")
      .forEach((el) => (el.style.display = "none"));
    document
      .querySelectorAll(".updateListingButton")
      .forEach((el) => (el.style.display = "none"));
    document.getElementById("addListing").style.display = "none";
  } else {
    document.getElementById("listingsTitle").innerText = "My listings";
    document
      .getElementById("addListing")
      .addEventListener(
        "click",
        () => (window.location.href = "addListing.html")
      );
  }
  await getListings();

  //for nav
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      document.querySelector("nav").classList.add("navScrolled");
    } else {
      document.querySelector("nav").classList.remove("navScrolled");
    }
  });

  document.querySelectorAll(".card").forEach((el) => {
    el.addEventListener(
      "click",
      (e) => (window.location.href = "listinginfo.html?id=" + el.id)
    );
  });

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
      el.addEventListener("click", (event) =>
        deleteListing(event, event.currentTarget.classList[1])
      )
    );
  document
    .querySelectorAll(".updateListingButton")
    .forEach((el) =>
      el.addEventListener("click", (e) => (window.location.href = "edit.html"))
    );
};
