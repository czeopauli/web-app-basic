"use strict";

const contacts = document.querySelector("#contacts");
const apiURL = "https://dummy-apis.netlify.app/api/contact-suggestions?count=";

const state = {
  persons: [],
};

getData();

function getData() {
  fetch(apiURL + "8")
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
      state.persons = jsonData;
      renderData();
    });
}

function getSingleContact() {
  return fetch(apiURL + 1)
    .then((response) => response.json())
    .then((jsonData) => {
      state.persons.push(jsonData[0]);
      renderData();
    });
}

function renderData() {
  const unorderedList = document.querySelector("ul");
  unorderedList.innerHTML = "";

  for (let person of state.persons) {
    let list = document.createElement("li");
    unorderedList.appendChild(list);

    let personContainer = document.createElement("div");
    personContainer.classList.add("personContainer");
    list.appendChild(personContainer);

    let contentContainer = document.createElement("div");
    contentContainer.classList.add("contentContainer");
    personContainer.appendChild(contentContainer);

    let bannerIMG = document.createElement("img");
    bannerIMG.classList.add("banner-img");
    bannerIMG.src = "https://source.unsplash.com/random/300×300";
    bannerIMG.alt = "Banner Image";
    personContainer.appendChild(bannerIMG);

    let personImg = document.createElement("img");
    personImg.classList.add("profile-img");
    contentContainer.appendChild(personImg);
    personImg.src = person.picture;

    let title = document.createElement("p");
    title.classList.add("personInfo");
    contentContainer.appendChild(title);

    let firstName = document.createElement("p");
    firstName.classList.add("personInfo");
    contentContainer.appendChild(firstName);

    let lastName = document.createElement("p");
    lastName.classList.add("personInfo");
    contentContainer.appendChild(lastName);

    firstName.innerText =
      person.name.title + " " + person.name.first + " " + person.name.last;

    let profession = document.createElement("p");
    profession.classList.add("position");
    contentContainer.appendChild(profession);
    profession.innerText = person.title;

    let mutualConnections = document.createElement("p");
    mutualConnections.classList.add("mutual-connections");
    contentContainer.appendChild(mutualConnections);
    mutualConnections.innerText = `Mutual Connections: ${person.mutualConnections}`;

    let connectButton = document.createElement("button");
    connectButton.classList.add("btnConnect");
    connectButton.innerText = "Connect";
    contentContainer.appendChild(connectButton);
    connectButton.addEventListener("click", connect);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btnClose");
    deleteBtn.innerText = "X";
    deleteBtn.person = person;
    personContainer.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", changeContact);
  }
}

let count = 0;

function connect(event) {
  const pending = document.querySelector("#pending");
  if (event.target.innerText === "Connect") {
    event.target.innerText = "Pending";
    count++;
  } else {
    event.target.innerText = "Connect";
    count--;
  }
  pending.innerText = count + " pending invitations";
}

function changeContact(event) {
  const indexToRemove = state.persons.indexOf(event.target.person);
  if (indexToRemove != -1) {
    state.persons.splice(indexToRemove, 1);
    getSingleContact();
    renderData();
  }
}
