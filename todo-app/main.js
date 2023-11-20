"use strict";

const todos = document.querySelector("#btn-add");
const input = document.querySelector("#newTodo");
const toDoList = document.querySelector("#to-do-list");
const remove = document.querySelector("#btn-remove");

let newArray = [];

if (localStorage.getItem("newArray")) {
  newArray = JSON.parse(localStorage.getItem("newArray")); //Überprüfung ob es bereits gespeicherte ToDos im localStorage gibt

  showNewArray();
}

todos.addEventListener("click", buttonClick);

function buttonClick() {
  const inputtext = input.value;
  input.value = "";

  newArray.push({ checkbox: false, description: inputtext });
  showNewArray();

  localStorage.setItem("newArray", JSON.stringify(newArray));
}

function showNewArray() {
  toDoList.innerHTML = "";
  for (const objects of newArray) {
    const toDoElement = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const description = document.createElement("label");
    description.textContent = objects.description;

    description.appendChild(checkbox);
    toDoElement.appendChild(description);
    toDoList.appendChild(toDoElement);
  }
}

remove.addEventListener("click", function () {
  const checkedIndexes = [];

  newArray.forEach((obj, index) => {
    const checkbox = document.querySelectorAll("input[type='checkbox']")[index];
    if (checkbox.checked) {
      checkedIndexes.push(index);
    }
  });

  checkedIndexes.sort((a, b) => b - a); // sortiert den Index absteigend

  checkedIndexes.forEach((index) => {
    newArray.splice(index, 1);
    const toDoElement = document.querySelectorAll("li")[index];
    if (toDoElement) {
      toDoElement.remove();
    }
  });

  localStorage.setItem("newArray", JSON.stringify(newArray)); // aktualisiert den localStorage
});
