import users from "./users.json";

var userName,userPhone,userEmail,userRole;
const users = JSON.parse(users);


//function to sign up
function signUp(){
  var new_userName,new_userPhone,new_userEmail,new_userRole;

  //get name, phone, email, coworker and store in varirables
  console.log(users.find(obj=>obj.name=="Jane Smith"));



}