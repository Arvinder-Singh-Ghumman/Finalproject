
window.onload = function() {
  // Get the current date
  var currentDate = new Date();

  // Get the HTML element with the ID "currentDate"
  var currentDateElement = document.getElementById('date');

  // Update the innerHTML of the element with the current date
  currentDateElement.innerHTML += currentDate.toLocaleDateString();
}

