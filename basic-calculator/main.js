"use strict";

const numbrOneElemt = document.querySelector("#input-a");
const numbrTwoElement = document.querySelector("#input-b");
const btnCalc = document.querySelector("#btn-calc");
const btnReset = document.querySelector("#btn-reset");
const resultElement = document.querySelector("#result");

let result = 0;

btnCalc.addEventListener("click", function () {
  result = Number(numbrOneElemt.value) + Number(numbrTwoElement.value);
  resultElement.innerText = result;
});

btnReset.addEventListener("click", function () {
  numbrOneElemt.value = "";
  numbrTwoElement.value = "";
  resultElement.innerText = "";
});