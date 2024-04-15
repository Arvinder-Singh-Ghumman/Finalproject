const url = "https://coworker-server.onrender.com/";
var loggedIn = false;
var user;

var resStatus;
let token = localStorage.getItem("token");

if (token) {
  loggedIn = true;
  fetch(`${url}/user/`, {
    method: "GET",
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
        if (resStatus === 404) {
          throw new Error("The token has expired. Sign in again");
        }
        localStorage.removeItem("token");
        throw new Error(data.message);
      }
      user = data;
    })
    .catch((error) => {
      alert(error);
      loggedIn = false;
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
}
