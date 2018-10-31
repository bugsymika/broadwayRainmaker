let name=[]
let number=[]
let optInDate=[]

// creates blank arrays to later be filled with prospect data 

let webLeadsList= document.querySelectorAll('#webLeadsList a');
let webLeads=[];
webLeadsList.forEach(function(element) {
  webLeads.push(element.href);;
});

// this script rips the html links from the rainmaker page and pushes them into an array

webLeads.forEach(function(element){
	const Http = new XMLHttpRequest();
	const url=element;
	Http.open("GET", url);
	Http.send();

	Http.onreadystatechange= function(){
		if (this.readyState == 4 && this.status==200){
			const siteData = Http.responseText;
			const nameStringStart= siteData.indexOf("lblName");
			const nameStringEnd= nameStringStart+100; 
			const nameString= siteData.slice(nameStringStart, nameStringEnd);
			const nameStart= nameString.indexOf(">") +1;
			const nameEnd= nameString.indexOf("<");
			name.push(nameString.slice(nameStart,nameEnd));

			const numberStringStart= siteData.indexOf("lblCellPhone");
			const numberStringEnd= numberStringStart+100; 
			const numberString= siteData.slice(numberStringStart, numberStringEnd);
			const numberStart= numberString.indexOf(">") +1;
			const numberEnd= numberString.indexOf(" (");
			number.push(numberString.slice(numberStart,numberEnd));

			const optInStringStart= siteData.indexOf("lblDate");
			const optInStringEnd= optInStringStart+100; 
			const optInString= siteData.slice(optInStringStart, optInStringEnd);
			const optInStart= optInString.indexOf(">") +1;
			const optInEnd= optInString.indexOf("<");
			optInDate.push(optInString.slice(optInStart,optInEnd));
	}
}
})

// this script rips the names, numbers and opt in dates of all the prospects on the rainmaker home page and pushes them into 
// the blank arrays previously created.








