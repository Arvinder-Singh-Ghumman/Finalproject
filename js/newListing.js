var user;
async function getUser() {
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
        return data;
      }
    } catch (error) {
      alert(error.message);
      loggedIn = false;
      localStorage.removeItem("token");
      window.location.href = "login.html";
    }
  } else {
    alert("Log in to add a new lsiting");
    window.location.href = "login.html";
  }
}

async function addListing() {
  let title = document.getElementById("title").value;
  let location = document.getElementById("location").value;
  let seating = document.getElementById("seatingInput").value;
  let description = document.getElementById("descriptionInput").value;
  let price = document.getElementById("price").value;
  let isSmokingAllowed = document.getElementById("isSmokingAllowed").checked;
  let category = document.getElementById("category").value;
  let availabilityStart = document.getElementById("addFromAvailability").value;
  let availabilityEnd = document.getElementById("addToAvailability").value;

  // Create an object with all the values
  let listingData = {
    title,
    location,
    seating,
    description,
    price,
    isSmokingAllowed,
    category,
    availabilityStart,
    availabilityEnd,
    owner: user._id
  };

  // Create a FormData object
  let formData = new FormData();

  Object.keys(listingData).forEach(key => {
    formData.append(key, listingData[key]);
});

  // ADDING IMAGES
  let imageFileInput = document.getElementById("imageInput");
  let imageFiles = imageFileInput.files;
  for (let i = 0; i < imageFiles.length; i++) {
    formData.append(`image`, imageFiles[i]);
  }
  // formData.append(`image`, true);
  
  try {
    let resStatus;

    const response = await fetch(`${url}/listing/new`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    resStatus = response.status;
    const data = await response.json();
    console.log(data)
    if(response.ok)
    alert("added successfully");
  } catch (error) {
    console.error("Error occurred: ", error.message);
  }
}

//function to add new listing
async function newListing(event) {
  event.preventDefault();
  addListing();
}

window.onload = async () => {
  user = await getUser();
  document
    .getElementById("newListing")
    .addEventListener("submit", (event) => newListing(event));
};
