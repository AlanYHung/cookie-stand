'use strict';

var storeArray = [];
var allStoreHourHeader = [];
var i = 0;
var j = 0;
var salmonCookieTableID = 'scTableID' // sc stands for Salmon Cookie
var salmonCookieTableBodyID = 'scTableBody'
var sctRowID = [];
var allStoreTotalSalesPerHour = [];
var allStoreTotalSales = 0;
var salesFormElement = document.getElementById('Sales-Page-Add-Store-Form')

// Takes in Time of Day in Hours on a 24 hour system and converts it to a 12 hour system and returns an Array that contains all the hours between Starting Hour and Ending Hour inclusive.
function hourParse (hpStartHour, hpEndHour){ //hp stands for Funtion name (hourParse) to denote variable is local to this function
  var currHour = hpStartHour; // curr = current
  var strAMPM = 'AM'; // str = string
  var hpStoreHourBr = []; // Br = breakdown
  var dispHour = 0; // disp = display

  // Takes in a 24 hour system hour and converts into 12 hour system and stores a standard Format into Array.  Example: 19 is converted into 7:00 PM
  while(currHour !== hpEndHour){
    if(currHour === 12){
      dispHour = currHour;
      strAMPM = 'PM';
    }else if(currHour === 24){
      dispHour = currHour - 12;
      strAMPM = 'AM';
      currHour = 0;
    }else if(currHour > 12){
      dispHour = currHour - 12;
    }else{
      dispHour = currHour;
    }

    hpStoreHourBr.push(`${dispHour}:00 ${strAMPM}`);
    currHour++;
  }

  return hpStoreHourBr
}

// Function to create new elements and add them to DOM
// js = JavaScript
function jsElementCreater(parentElementID, elementToBeCreated, idOfNewElement='', elementTextContent='', elementPaddingAmount='', elementBorderStyle='', elementBorderWidth=''){
  var elementParent = document.getElementById(parentElementID); // Picks up the parent element from the DOM
  var newElement = document.createElement(elementToBeCreated); // Create an element

  // All following element manipulations are optional
  if(idOfNewElement){
    newElement.setAttribute('id',idOfNewElement);
  }

  if(elementTextContent){
    newElement.textContent = elementTextContent;
  }

  if(elementPaddingAmount){
    newElement.style.padding = elementPaddingAmount;
  }

  if(elementBorderStyle){
    newElement.style.borderStyle = elementBorderStyle;
  }

  if(elementBorderWidth){
    newElement.style.borderWidth = elementBorderWidth;
  }

  // Adds the newly created element to the DOM
  elementParent.appendChild(newElement);
}

// Store Object Constructor
function AddStore (addStoreLocation, addOpenHour, addCloseHour, addMinCust, addMaxCust, addAvgSales){
  this.storeLocation = addStoreLocation;
  this.minCust = addMinCust;
  this.maxCust = addMaxCust;
  this.avgSales = addAvgSales;
  this.openHour = addOpenHour;
  this.closeHour = addCloseHour;
  this.salesPerHour = [];
  this.totalSales = 0;

  // Adds new Store Object Instance to the Global Store Array
  storeArray.push(this);
}

AddStore.prototype.randCustPerHour = function(){
    // Random Number Generator Code Taken from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
}

// This function requires Opening and Closing to be put in 24 hour system
// Populates the cookies sold each hour and stores it in the Object Array parameter.  Also keeps track of cookies sold across all stores for each hour.
AddStore.prototype.cookiesSoldPerHour = function(){
  // csph denotes function name cookiesSoldPerHour to denote that these variables belong to this function
  var csphStoreOpenHours = hourParse(this.openHour,this.closeHour)
  var csphIndex = 0;
  this.salesPerHour = [];
  this.totalSales = 0;

  for(csphIndex = 0; csphIndex < csphStoreOpenHours.length; csphIndex++){
    this.salesPerHour.push(Math.round(this.randCustPerHour() * this.avgSales));
    this.totalSales += this.salesPerHour[csphIndex];

    if(isNaN(allStoreTotalSalesPerHour[csphIndex])){
      allStoreTotalSalesPerHour.push(0);
    }
    console.log(allStoreTotalSalesPerHour);
    //console.log('Index',csphIndex);
    //console.log('Sales',this.salesPerHour[csphIndex]);
    allStoreTotalSalesPerHour[csphIndex] += this.salesPerHour[csphIndex];
  }
}

// This Function Renders the Rows of the table that are stored within the Object Instances
AddStore.prototype.render = function(orParentElementID){ // or stands for Object Render to denote all the variables belong to this function
  var orIndex = 0;
  var orPadding = '10px';
  var orBorderType = 'solid';
  var orBorderWidth = '1px';

  // Takes the Store Location and Creates the Left Side Headers of the Table
  jsElementCreater(orParentElementID,'th',false,this.storeLocation,orPadding,orBorderType,orBorderWidth);

  // Generates the Data for the Table  
  for(orIndex=0; orIndex < this.salesPerHour.length; orIndex++){
    jsElementCreater(orParentElementID,'td',false,this.salesPerHour[orIndex],orPadding,orBorderType,orBorderWidth)
  }

  // Adds in the Total Sales for the Store
  jsElementCreater(orParentElementID,'th',false,this.totalSales,orPadding,orBorderType,orBorderWidth);
}

// Generates the Hour Headers that will be used in the Web Page's Sales Table
function tableHourHeaders (thhStoreArray){ // thh = tableHourHeaders to denote that these variables belong to this function
  var earliestOpen = 6;
  var latestClose = 20;
  var thhIndex;

  for(thhIndex = 0; thhIndex < thhStoreArray.length; thhIndex++){
    if(earliestOpen > thhStoreArray[thhIndex].openHour){
      earliestOpen = thhStoreArray[thhIndex].openHour;
    }

    if(latestClose < thhStoreArray[thhIndex].closeHour){
      latestClose = thhStoreArray[thhIndex].closeHour;
    }
  }

  return hourParse(earliestOpen, latestClose);
}

function main(){
  allStoreTotalSalesPerHour = [];
  allStoreTotalSales = 0;
  // Generates the Table Hour Header
  allStoreHourHeader = tableHourHeaders(storeArray);
  allStoreHourHeader.push('Total');

  // Generates the Sales Data
  for(i = 0; i < storeArray.length; i++){
    storeArray[i].cookiesSoldPerHour();
    allStoreTotalSales += storeArray[i].totalSales
  }

  // All the Following Code is for Rendering the Table
  jsElementCreater('Salmon-Cookies-Sold','table',salmonCookieTableID);
  jsElementCreater(salmonCookieTableID,'tbody',salmonCookieTableBodyID);

  for(i=0; i <= storeArray.length + 1; i++){
    sctRowID[i] = `sctRow${i+1}`
    jsElementCreater(salmonCookieTableID,'tr',sctRowID[i]);

    if(i === 0){
      jsElementCreater(sctRowID[i],'th',false,false,'10px');
      
      for(j = 0; j < allStoreHourHeader.length; j++){
        jsElementCreater(sctRowID[i],'th',false,allStoreHourHeader[j],'10px');
      }
    }else if (i === storeArray.length + 1){
      jsElementCreater(sctRowID[i],'th',false,'Total','10px','solid','1px');
      
      for(j = 0; j < allStoreTotalSalesPerHour.length; j++){
        jsElementCreater(sctRowID[i],'th',false,allStoreTotalSalesPerHour[j],'10px','solid','1px');
      }
    }else{
      storeArray[i-1].render(sctRowID[i]);
    }
  }

  // Adds the Total of all hours and all stores to the table
  jsElementCreater(sctRowID[sctRowID.length-1],'th',false,allStoreTotalSales,'10px','solid','1px');
}

function formSubmitAction(event){
  event.preventDefault();
  var newStoreLocation = event.target.storeLocationInput.value;
  var newMinCust = parseInt(event.target.minCustInput.value);
  var newMaxCust = parseInt(event.target.maxCustInput.value);
  var newAvgSales = parseInt(event.target.avgSalesInput.value);
  var newOpenHour = parseInt(event.target.storeOpenInput.value);
  var newCloseHour = parseInt(event.target.storeCloseInput.value);
  var scTable = document.getElementById(salmonCookieTableID); //sc stands for Salmon Cookie

  new AddStore(newStoreLocation,newOpenHour,newCloseHour,newMinCust,newMaxCust,newAvgSales)
  scTable.innerHTML='';
  main();
}

salesFormElement.addEventListener('submit', formSubmitAction)
// Creates and adds the Store Objects and stores them in StoreArray
new AddStore('Seattle',6,20,23,65,6.3);
new AddStore('Tokyo',6,20,3,24,1.2);
new AddStore('Dubai',6,20,11,38,3.7);
new AddStore('Paris',6,20,20,38,2.3);
new AddStore('Lima',6,20,2,16,4.6);
main();