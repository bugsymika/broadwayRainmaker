let name = [];
let number = [];
let optInDate = [];
let prospectInfo = [];
let webLeads = [];
// creates blank arrays to later be filled with prospect data
const dataScrape = function() {
  let webLeadsList = document.querySelectorAll("#webLeadsList a");
  webLeadsList.forEach(function(element) {
    webLeads.push(element.href);
  });

  // this script rips the html links from the rainmaker page and pushes them into an array

  webLeads.forEach(function(element) {
    const Http = new XMLHttpRequest();
    const url = element;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const siteData = Http.responseText;
        const nameStringStart = siteData.indexOf("lblName");
        const nameStringEnd = nameStringStart + 100;
        const nameString = siteData.slice(nameStringStart, nameStringEnd);
        const nameStart = nameString.indexOf(">") + 1;
        const nameEnd = nameString.indexOf("<");
        name.push(nameString.slice(nameStart, nameEnd));

        const numberStringStart = siteData.indexOf("lblCellPhone");
        const numberStringEnd = numberStringStart + 100;
        const numberString = siteData.slice(numberStringStart, numberStringEnd);
        const numberStart = numberString.indexOf(">") + 1;
        const numberEnd = numberString.indexOf(" (");
        let cellNumber = numberString.slice(numberStart, numberEnd);
        cellNumber = cellNumber.replace(/[- )(]/g, "");
        if (cellNumber.length < 10) {
          const numberStringStart = siteData.indexOf('"lblHomePhone"');
          const numberStringEnd = numberStringStart + 100;
          const numberString = siteData.slice(
            numberStringStart,
            numberStringEnd
          );
          const numberStart = numberString.indexOf(">") + 1;
          const numberEnd = numberString.indexOf("(home)");
          let cellNumber = numberString.slice(numberStart, numberEnd);
          cellNumber = cellNumber.replace(/[- )(]/g, "");
          if (cellNumber.length < 10 || cellNumber.includes("span") === true) {
            cellNumber = "N/A";
            number.push(cellNumber);
          } else {
            number.push(cellNumber);
          }
        } else {
          number.push(cellNumber);
        }
        const optInStringStart = siteData.indexOf("lblDate");
        const optInStringEnd = optInStringStart + 100;
        const optInString = siteData.slice(optInStringStart, optInStringEnd);
        const optInStart = optInString.indexOf(">") + 1;
        const optInEnd = optInString.indexOf("<");
        optInDate.push(optInString.slice(optInStart, optInEnd));

        if (number.length === webLeads.length) {
          let prospects = name.map(function(x, i) {
            prospect = [x, number[i], optInDate[i]];
            prospectInfo.push(prospect);
          });
        }
      }
    };
  });
};
// this script rips the names, numbers and opt in dates of all the prospects on the rainmaker home page and pushes them into
// the blank arrays previously created. Once all the links have been parsed, the 3 arrays are merged.
