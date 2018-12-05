let prospects = [];
let time = [];
const dateFormula = function(y) {
  let month = y.slice(0, 2);
  let day = Number(y.slice(2, 4));
  let year = y.slice(5, 9);
  month = month - 1;

  date = new Date(year, month, day, 0, 0, 0);
  return date;
};

const populateProspects = function() {
  let i;
  for (i = 0; i < prospectList.length; i++) {
    let prospect = {
      name: prospectList[i][0],
      number: prospectList[i][1],
      date: prospectList[i][2].replace("/", ""),
      time: dateFormula(prospectList[i][2]).getTime()
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

const prospectsCompare = function(a, b) {
  if (a.time < b.time) return 1;
  if (a.time > b.time) return -1;

  return 0;
};

prospects.sort(prospectsCompare);
const displayProspects = function(x) {
  let root = document.querySelector(".root");
  let newDiv = document.createElement("div");
  let prospectNumber = prospects[x].number;
  let prospectName = prospects[x].name;
  let date = prospects.date;
  prospectNumber =
    prospectNumber.slice(0, 3) +
    "-" +
    prospectNumber.slice(3, 6) +
    "-" +
    prospectNumber.slice(6);
  let text = document.createTextNode(prospectName + " " + prospectNumber);
  newDiv.appendChild(text);
  newDiv.setAttribute("Id", "prospect" + x);
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
    });
  }
};
addRemoval();

const dateFilter = function() {
  let filterBy = document.getElementById("sortMenu").value;
  let todaysDate = new Date();
  todaysDate = todaysDate.getTime();
  todaysDate = todaysDate / 1000;
  let i;
  for (i = 0; i < prospects.length; i++) {
    if (
      (filterBy =
        "Last Week (Default)" && prospects[i].time / 1000 < todaysDate - 604800)
    ) {
      // document.getElementById("prospect" + [i]).style.display = "none";
      console.log(
        prospects[i].time / 1000 < todaysDate - 604800,
        prospects[i].name
      );
    } else if (
      (filterBy =
        "Last 2 Weeks" && prospects[i].time / 1000 < todaysDate - 604800 * 2)
    ) {
      // document.getElementById("prospect" + [i]).style.display = "none";
      console.log(
        prospects[i].time / 1000 < todaysDate - 604800,
        prospects[i].name
      );
    } else if (
      (filterBy =
        "Last Month" && prospects[i].time / 1000 < todaysDate - 604800 * 4)
    ) {
      // document.getElementById("prospect" + [i]).style.display = "none";
      console.log(
        prospects[i].time / 1000 < todaysDate - 604800,
        prospects[i].name
      );
    } else {
      i = i;
    }
  } //loop
}; //function
