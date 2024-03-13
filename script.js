var userName,userPhone,userEmail,userRole;
var users = URL("./users.js");

async function getUsers() {
  try {
    const response = await fetch('users.json');
    const data = await response.json();

    //storing the data in users 
    users = data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

//function to sign up
function signUp(){
  //get name, phone, email, coworker and store in varirables
  var new_userName,new_userPhone,new_userEmail,new_userRole,new_userPassword;

  getUsers().then((val)=>{
    //change the colour of input box, display a message alerting that username already exists
    if(users.find(obj=>obj.name==new_userName))
      alert("username already exists");
    else if(users.find(obj=>obj.email==new_userEmail))
      alert("email already registered");
    else{
      users.push({"name":new_userName,"password":new_userPassword,"phone":new_userPhone,"email":new_userEmail,"role":new_userRole})
      fs.writeFileSync("./users.json", JSON.stringify(users), 'utf8');

    }

  })

  



}