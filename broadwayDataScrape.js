let name=[]
let number=[]
let optInDate=[]

const Http = new XMLHttpRequest();
const url='https://addmembers.com/rainmaker/contact.aspx?ID=6232914';
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






