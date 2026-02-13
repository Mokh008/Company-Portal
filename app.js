const API_URL = "https://script.google.com/macros/s/AKfycbyl1P_4MqzZCKcEHzIvE1edB94lLcctBI9XHoCOgscKPXtF2l7_T8HIkP_y0qPoPsYl/exec";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      email: email,
      password: password
    })
  });

  const result = await response.json();

  if (result.success) {
    localStorage.setItem("user", JSON.stringify(result.user));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}
