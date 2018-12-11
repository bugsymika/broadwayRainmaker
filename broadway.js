let prospects = [];
let time = [];
let prospectTotal = prompt("How Many Prospects? Enter numbers only");
generateProspects(prospectTotal);
let prospectList = consolidate();
const dateFormula = function(y) {
  let month = y.slice(0, 2);
  let day = Number(y.slice(2, 4));
  let year = y.slice(5, 9);
  month = month - 1;

  date = new Date(year, month, day, 0, 0, 0);
  date = date.getTime();
  date = date / 1000;
  return date;
};

const populateProspects = function() {
  let i;
  for (i = 0; i < prospectList.length; i++) {
    let prospect = {
      name: prospectList[i][0].replace("  ", " "),
      number: prospectList[i][1],
      date: prospectList[i][2].replace("/", ""),
      time: dateFormula(prospectList[i][2])
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
  newDiv.setAttribute("class", "prospect");
  root.appendChild(newDiv);
};

const fillBody = function() {
  let i;
  for (i = 0; i < prospects.length; i++) {
    displayProspects(i);
  }
};
fillBody();
const addButtons = function(buttonPurpose, buttonInner) {
  let i;
  for (i = 0; i < prospects.length; i++) {
    const buttonMake = document.createElement("button");
    let prospects = document.getElementById("prospect" + [i]);
    buttonMake.className = buttonPurpose;
    buttonMake.id = buttonPurpose + i;
    buttonMake.innerText = buttonInner;
    prospects.appendChild(buttonMake);
  }
};
addButtons("removeButton", "X");

const addNotesBar = function() {
  let i;
  for (i = 0; i < prospects.length; i++) {
    const noteBar = document.createElement("input");
    let prospects = document.getElementById("prospect" + [i]);
    noteBar.id = "prospectNote" + i;
    noteBar.className = "noteBar";
    prospects.appendChild(noteBar);
  }
  addButtons("noteButton", "+");
};
addNotesBar();

const addRemoval = function() {
  let i;
  for (i = 0; i < prospects.length; i++) {
    removeButton = document.getElementById("removeButton" + i);
    removeButton.addEventListener("click", function() {
      if (this.parentElement.classList.contains("hidden")) {
        this.parentElement.classList.remove("hidden");
        this.parentElement.style.display = "none";
      } else {
        this.parentElement.classList.add("hidden");
        this.parentElement.style.display = "none";
      }
    });
  }
};
addRemoval();

const dateFilter = function(days) {
  let todaysDate = new Date();
  todaysDate = todaysDate.getTime();
  todaysDate = todaysDate / 1000;
  let i;
  for (i = 0; i < prospects.length; i++) {
    if (
      prospects[i].time < todaysDate - 86400 * days ||
      document.getElementById("prospect" + i).classList.contains("hidden")
    ) {
      document.getElementById("prospect" + i).style.display = "none";
    } else {
      document.getElementById("prospect" + i).classList.add("visible");
    }
  }
};

const resetHidden = function() {
  let i;
  for (i = 0; i < prospects.length; i++) {
    if (document.getElementById("prospect" + i).classList.contains("hidden")) {
      document.getElementById("prospect" + i).style.display = "none";
    } else if (
      document.getElementById("prospect" + i).classList.contains("visible")
    ) {
      document.getElementById("prospect" + i).classList.remove("visible");
      document.getElementById("prospect" + i).style.display = "block";
    } else {
      document.getElementById("prospect" + i).style.display = "block";
    }
  }
};
const showAll = function() {
  let i;
  for (i = 0; i < prospects.length; i++) {
    document.getElementById("prospect" + i).classList.add("visible");
  }
};
window.onload = function() {
  showAll();
};
const showHidden = function() {
  let i;
  for (i = 0; i < prospects.length; i++) {
    if (document.getElementById("prospect" + i).classList.contains("hidden")) {
      document.getElementById("prospect" + i).style.display = "block";
    } else {
      document.getElementById("prospect" + i).style.display = "none";
    }
  }
};
sortMenu = function() {
  let sortBy = document.getElementById("sortMenu").value;
  resetHidden();
  if (sortBy == "Last Week") {
    dateFilter(7);
  } else if (sortBy == "Last 2 Weeks") {
    dateFilter(14);
  } else if (sortBy == "Last Month") {
    dateFilter(31);
  } else {
    showAll();
  }
};

document.getElementById("sortMenu").onchange = function() {
  let sortBy = document.getElementById("sortMenu").value;
  if (sortBy == "Hidden") {
    showHidden();
  } else {
    sortMenu();
  }
};

const prospectNameSearch = function(nameInput) {
  let i;
  for (i = 0; i < prospects.length; i++) {
    prospect = document.getElementById("prospect" + i);
    prospectName = prospects[i].name.toLowerCase();
    if (
      prospectName.includes(nameInput.toLowerCase()) &&
      prospect.classList.contains("visible")
    ) {
      prospect.style.display = "block";
    } else {
      prospect.style.display = "none";
    }
  }
};

const prospectNumberSearch = function(numInput) {
  let i;
  for (i = 0; i < prospects.length; i++) {
    prospect = document.getElementById("prospect" + i);
    prospectNumber = prospects[i].number;
    inputLength = numInput.length;
    if (
      prospectNumber.slice(0, numInput.length).includes(numInput) &&
      prospect.classList.contains("visible")
    ) {
      prospect.style.display = "block";
    } else {
      prospect.style.display = "none";
    }
  }
};

document.getElementById("searchBar").onkeyup = function() {
  x = Number(this.value);
  if (isNaN(x)) {
    // resetHidden();
    prospectNameSearch(this.value);
  } else {
    // resetHidden();
    prospectNumberSearch(this.value);
  }
};

const addNote = function() {
  let i;
  for (i = 0; i < prospects.length; i++) {
    const noteButton = document.getElementById("noteButton" + i);
    let parentNode = document.getElementById("prospectNote" + i);
    noteButton.addEventListener("click", function() {
      const buttonMake = document.createElement("button");
      let noteNode = document.createTextNode(parentNode.value);
      let noteDiv = document.createElement("div");
      noteDiv.classList.add("note");
      buttonMake.classList.add("removeNoteButton");
      buttonMake.innerText = "x";
      buttonMake.addEventListener("click", function() {
        this.parentElement.parentElement.removeChild(this.parentElement);
      });
      noteDiv.appendChild(buttonMake);
      this.parentElement.appendChild(noteDiv).appendChild(noteNode);
      parentNode.value = "";
    });
  }
};

addNote();
