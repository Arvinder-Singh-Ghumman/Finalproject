(setTimeout(function() {
    document.getElementById('loginPopUp').style.display = 'block';
  }, 10000))(); // 10000 milliseconds = 10 seconds

  function closeLoginPopUp() {
    document.getElementById('loginPopUp').style.display = 'none';
  }