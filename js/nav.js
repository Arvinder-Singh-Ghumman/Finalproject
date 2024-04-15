window.addEventListener('load', async function() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      document.querySelector("nav").classList.add("navScrolled");
    } else {
      document.querySelector("nav").classList.remove("navScrolled");
    }
  });
  if(loggedIn){
    document.getElementById("navAccount").href="loggedInProfile.html";
    document.getElementById("navHome").href="loggedInHome.html";
  }else{
    document.getElementById("navHome").href="index.html";
    document.getElementById("navAccount").href="login.html";
  }
});