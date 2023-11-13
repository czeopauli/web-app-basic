"use strict";

let dark = false;
let button = document.querySelector(".toggleButton");
button.addEventListener("click", (e) => {
  button.classList.add("toggleButton");

  dark = !dark;

  if (dark) {
    document.body.classList.add("body-dark");
    button.classList.add("button-dark");
    document.title = "Good Night";
  } else {
    document.body.classList.remove("body-dark");
    button.classList.remove("button-dark");
    document.title = "Good Morning";
  }
});
