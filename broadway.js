let prospects = [];
const populateProspects = function() {
  let i;
  for (i = 0; i < prospectList.length; i++) {
    let prospect = {
      name: prospectList[i][0],
      number: prospectList[i][1],
      date: prospectList[i][2].replace("/", "")
    };
    if (prospect.number === "N/A") {
      i = i;
    } else {
      prospects.push(prospect);
    }
  }
};
//this function turns the array of unsorted prospect information into an array of objects with each prospect's information
//and also turns the date column into a MMDDYYYY format so it can be sorted by value
populateProspects();

const displayProspects = function(x) {
  let root = document.querySelector(".root");
  let newDiv = document.createElement("div");
  let prospectNumber = prospects[x].number;
  let prospectName = prospects[x].name;
  prospectNumber =
    prospectNumber.slice(0, 3) +
    "-" +
    prospectNumber.slice(3, 6) +
    "-" +
    prospectNumber.slice(6);
  let text = document.createTextNode(prospectName + " " + prospectNumber);
  newDiv.appendChild(text);
  newDiv.setAttribute("Id", "prospect" + x);
  newDiv.setAttribute("date", prospects[x].date);
  root.appendChild(newDiv);
};

const fillBody = function() {
  let i;
  for (i = 0; i < prospects.length; i++) {
    displayProspects(i);
  }
};
fillBody();
const addRemoveButtons = function() {
  let i;
  for (i = 0; i < prospects.length; i++) {
    const buttonMake = document.createElement("button");
    let prospects = document.getElementById("prospect" + [i]);
    buttonMake.className = "removeButton";
    buttonMake.id = "removeButton" + i;
    buttonMake.innerText = "X";
    prospects.appendChild(buttonMake);
  }
};
addRemoveButtons();
const addRemoval = function() {
  let i;
  for (i = 0; i < prospects.length; i++) {
    removeButton = document.getElementById("removeButton" + i);
    removeButton.addEventListener("click", function() {
      this.parentElement.classList.add("hidden");
      this.parentElement.style.display = "none";
    });
  }
};
addRemoval();
