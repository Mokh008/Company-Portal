const API_URL = "https://script.google.com/macros/s/AKfycbxjCIb55qiykf7T78Lb-qTxHYATDlxiFt72ZApTUuTPh1StsQUAOYGZ0NiN4Ib89bEU/exec";

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
