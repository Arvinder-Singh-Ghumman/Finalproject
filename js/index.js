window.onload = function() {
  // Get the current date
  var currentDate = new Date();

  // Get the HTML element with the ID "currentDate"
  var currentDateElement = document.getElementById('date');

  // Update the innerHTML of the element with the current date
  currentDateElement.innerHTML += currentDate.toLocaleDateString();
}

(setTimeout(function() {
    document.getElementById('loginPopUp').style.display = 'block';
  }, 10000))(); // 10000 milliseconds = 10 seconds

  function closeLoginPopUp() {
    document.getElementById('loginPopUp').style.display = 'none';
  }
