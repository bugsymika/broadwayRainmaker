var webLeadsList= document.querySelectorAll('#webLeadsList a');
var webLeads=[]
webLeadsList.forEach(function(element) {
  webLeads.push(element.href);;
});
