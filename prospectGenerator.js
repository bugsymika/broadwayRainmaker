let prospectName = [];
let prospectNumber = [];
let prospectDate = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateProspects = function(prospectTotal) {
  let i;
  for (i = 0; i < prospectTotal; i++) {
    let name;
    let number;
    let date;
    let day;
    let month;
    let year;
    let firstName = getRandomInt(1, 2738);
    let lastName = getRandomInt(1, 2738);
    name = names[firstName] + " " + names[lastName];
    number =
      "" +
      getRandomInt(0, 9) +
      getRandomInt(0, 9) +
      getRandomInt(0, 9) +
      getRandomInt(0, 9) +
      getRandomInt(0, 9) +
      getRandomInt(0, 9) +
      getRandomInt(0, 9) +
      getRandomInt(0, 9) +
      getRandomInt(0, 9) +
      getRandomInt(0, 9);
    let x = new Date();
    year = x.getFullYear().toString();
    month = getRandomInt(1, 13);
    if (month < 10) {
      month = "0" + month;
    }
    day = getRandomInt(1, 28).toString();
    if (day < 10) {
      day = "0" + day;
    }
    date = month + day + "/" + year;
    prospectName.push(name);
    prospectNumber.push(number);
    prospectDate.push(date);
  }
};

const consolidate = function() {
  let i;
  let prospectList = [];
  for (i = 0; i < prospectName.length; i++) {
    let prospect;
    prospect = [prospectName[i], prospectNumber[i], prospectDate[i]];
    prospectList.push(prospect);
  }
  return prospectList;
};
