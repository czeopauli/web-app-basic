"use strict";
const main = document.querySelector("main");
const counterWrapper = document.querySelector("#counter");

const btnReset = document.querySelector("#btn-reset");

let counter = 0;

main.addEventListener("click", changeCounter);
btnReset.addEventListener("click", resetCounter);

function changeCounter() {
  counter++;

  renderCounter();
  changeBackground();
}

function renderCounter() {
  counterWrapper.innerText = counter;
}

function changeBackground() {
  main.style.setProperty("--width", counter + "%");
}

function resetCounter() {
  counter = 0;

  renderCounter();
  changeBackground();
}
