"use strict";

const todos = document.querySelector("#btn-add");
const input = document.querySelector("#newTodo");
const toDoList = document.querySelector("#to-do-list");
const allFilter = document.querySelector("#all");
const openFilter = document.querySelector("#open");
const doneFilter = document.querySelector("#done");
const removeDoneButton = document.querySelector("#btn-remove");

let newArray = [];

if (localStorage.getItem("newArray")) {
  newArray = JSON.parse(localStorage.getItem("newArray"));
  showNewArray();
}

function isDuplicate(description) {
  return newArray.some(
    //.find als alternative
    (todo) => todo.description.toLowerCase() === description.toLowerCase()
  );
}

function buttonClick() {
  const inputtext = input.value.trim();

  if (inputtext && !isDuplicate(inputtext)) {
    newArray.push({
      checkbox: false,
      description: inputtext,
      done: false,
    });

    input.value = "";
    updateLocalStorage();
    showNewArray();
  }
}

function showNewArray() {
  toDoList.innerHTML = "";
  const filteredArray = filterTodos(newArray);
  for (const objects of filteredArray) {
    if (objects.description.trim() !== "") {
      const toDoElement = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = objects.done;
      checkbox.addEventListener("change", function () {
        objects.done = checkbox.checked;
        updateLocalStorage();
        showNewArray();
      });

      const description = document.createElement("label");
      description.textContent = objects.description;
      description.appendChild(checkbox);

      if (objects.done) {
        description.classList.add("done");
      }

      toDoElement.appendChild(description);
      toDoList.appendChild(toDoElement);
    }
  }
}

function filterTodos(todos) {
  if (openFilter.checked) {
    return todos.filter((todo) => !todo.done);
  } else if (doneFilter.checked) {
    return todos.filter((todo) => todo.done);
  } else {
    return todos;
  }
}

function removeDoneTodos() {
  const filteredArray = filterTodos(newArray);
  newArray = filteredArray.filter((todo) => !todo.done);
  updateLocalStorage();
  showNewArray();
}

function updateLocalStorage() {
  localStorage.setItem("newArray", JSON.stringify(newArray));
}

todos.addEventListener("click", buttonClick);
allFilter.addEventListener("change", showNewArray);
openFilter.addEventListener("change", showNewArray);
doneFilter.addEventListener("change", showNewArray);
removeDoneButton.addEventListener("click", removeDoneTodos);
