const API_URL = "https://script.google.com/macros/s/AKfycbwP4t3O8eWDgaN4mNXK87P2jZmg0wVkDiFjrps-ho_wXhM2kGYZ9_gW8Mc4CRh7gbsV/exec";

const loader = document.getElementById("loader");
const loginBtn = document.getElementById("loginBtn");

(function(){
  try{
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if(existingUser && !existingUser.role){
      localStorage.removeItem("user");
    }
  }catch(e){
    localStorage.removeItem("user");
  }
})();

document.addEventListener("keydown", function(e){
  if(e.key === "Enter"){
    login();
  }
});

async function login(){

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if(!email || !password){
    alert("Please enter email and password");
    return;
  }

  loginBtn.disabled = true;
  loader.style.display = "flex";

  try{

    const response = await fetch(API_URL,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        action:"login",
        email:email,
        password:password
      })
    });

    const result = await response.json();

    loader.style.display = "none";
    loginBtn.disabled = false;

    if(result.success && result.user){

      if(!result.user.role){
        alert("User role not defined.");
        return;
      }

      if(!result.user.sector) result.user.sector="";
      if(!result.user.department) result.user.department="";

      localStorage.setItem("user", JSON.stringify(result.user));
      window.location.href = "dashboard.html";

    }else{
      alert("Invalid credentials");
    }

  }catch(error){
    loader.style.display = "none";
    loginBtn.disabled = false;
    alert("Connection error. Please try again.");
  }
}
