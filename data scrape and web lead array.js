var webLeadsList= document.querySelectorAll('#webLeadsList a');
var webLeads=[];
webLeadsList.forEach(function(element) {
  webLeads.push(element.href);;
});

var linksArray = [];

var i='0';
while (i < webLeads.length){
	const Http = new XMLHttpRequest();
	let url= "webLeads"+"[i]"
	Http.open("GET", url);
	Http.send();
	Http.onreadystatechange= function(){
	if (this.readyState == 4 && this.status==200){
	linksArray[i]=Http.responseText
	i++;
}}};

// webLeads.foreach(function (element){
// const Http = new XMLHttpRequest();
// let url= (element);
// Http.open("GET", url);
// Http.send();
// Http.onreadystatechange= function(){
// if (this.readyState == 4 && this.status==200){
// prospectsArray.push(Http.responseText);
// }}});