const API_URL = "https://script.google.com/macros/s/AKfycbyA76aRI5v3LpSE3DVbUHlctltSCAPK5TFLEKFYMNlisy0uhTQ3LZfsAXgUrHN3F2DK/exec";

const loader = document.getElementById("loader");
const loginBtn = document.getElementById("loginBtn");

/* ============================= */
/* ===== Session Hardening ===== */
/* ============================= */
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

/* ============================= */
/* ===== Enter Key Support ===== */
/* ============================= */
document.addEventListener("keydown", function(e){
  if(e.key === "Enter"){
    login();
  }
});

/* ============================= */
/* ===== LOGIN FUNCTION ======== */
/* ============================= */
async function login(){

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if(!email || !password){
    alert("Please enter email and password");
    return;
  }

  if(loginBtn) loginBtn.disabled = true;
  if(loader) loader.style.display = "flex";

  try{

    const response = await fetch(API_URL,{
      method:"POST",
      body:JSON.stringify({
        action:"login",
        email:email,
        password:password
      })
    });

    if(!response.ok){
      throw new Error("Server error");
    }

    const result = await response.json();

    if(loader) loader.style.display = "none";
    if(loginBtn) loginBtn.disabled = false;

    if(result.success && result.user){

      /* ===== Data Validation ===== */

      if(!result.user.role){
        alert("User role not defined. Contact admin.");
        return;
      }

      if(!result.user.sector){
        result.user.sector = "";
      }

      if(!result.user.department){
        result.user.department = "";
      }

      localStorage.setItem("user", JSON.stringify(result.user));

      window.location.href = "dashboard.html";

    }else{
      alert("Invalid credentials");
    }

  }catch(error){

    if(loader) loader.style.display = "none";
    if(loginBtn) loginBtn.disabled = false;

    alert("Connection error. Please try again.");

  }
}
