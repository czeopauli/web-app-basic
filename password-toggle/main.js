"use strict";

const passwordField = document.querySelector("#password");
const btnTogglePw = document.querySelector("#btn-toggle-password");

btnTogglePw.addEventListener("click", function (event) {
  event.preventDefault(); // Das Browser-Standard-Verhalten wird gestoppt

  if (passwordField.type === "text") {
    passwordField.type = "password";
    btnTogglePw.textContent = "Show Password";
  } else {
    // Unser Input-Feld soll uns unser Password zeigen
    passwordField.type = "text";

    // Button-Text muss zu "Hide Password" geändert werden
    btnTogglePw.textContent = "Hide Password";
  }
});
