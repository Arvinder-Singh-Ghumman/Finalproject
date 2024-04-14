window.addEventListener('load', function() {

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      document.querySelector("nav").classList.add("navScrolled");
    } else {
      document.querySelector("nav").classList.remove("navScrolled");
    }
  });
  if(this.sessionStorage.getItem("user")!==null){
    document.getElementById("navAccount").href="loggedInProfile.html";
    document.getElementById("navHome").href="loggedInHome.html";
  }else{
    document.getElementById("navHome").href="index.html";
    document.getElementById("navAccount").href="logIn.html";
  }
});