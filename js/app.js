'use strict';

var storeArray = [];
var allStoreHourHeader = [];
var newStore;
var i = 0;
var j = 0;
var salmonCookieTableID = 'scTableID'
var sctRowID = [];
var allStoreTotalSalesPerHour = [];

function hourParse (hpStartHour, hpEndHour){
    var currHour = hpStartHour;
    var strAMPM = 'AM';
    var hpStoreHourBr = [];
    var dispHour = 0;

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

function jsElementCreater(parentElementID, elementToBeCreated, idOfNewElement, elementTextContent, elementPaddingAmount, elementBorderStyle, elementBorderWidth){
    var elementParent = document.getElementById(parentElementID);
    var newElement = document.createElement(elementToBeCreated);

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

    elementParent.appendChild(newElement);
}

function addStore (addStoreLocation, addOpenHour, addCloseHour, addMinCust, addMaxCust, addAvgSales){
    this.storeLocation = addStoreLocation;
    this.minCust = addMinCust;
    this.maxCust = addMaxCust;
    this.avgSales = addAvgSales;
    this.openHour = addOpenHour;
    this.closeHour = addCloseHour;
    this.salesPerHour = [];
    this.TotalSales = 0;
    
    // render: function(){
    //     var listParent = document.getElementById('sCookiesSold');
    //     var createList = document.createElement('ul');
    //     createList.setAttribute('id', this.storeLocation);
    //     createList.textContent = this.storeLocation;
    //     listParent.appendChild(createList);
        
    //     for(var i = 0; i < this.salesPerHour.length; i++){
    //         var listElementParent = document.getElementById(this.storeLocation);
    //         var createListElement = document.createElement('li')
    //         createListElement.textContent = this.salesPerHour[i];
    //         listElementParent.appendChild(createListElement);
    //     }
    // },

    storeArray.push(this);
    return storeArray;
}

addStore.prototype.randCustPerHour = function(){
    //Code Taken from
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var min = Math.ceil(this.minCust);
    var max = Math.floor(this.maxCust);

    return Math.floor(Math.random() * (max - min + 1) + min);
}

// This function requires Opening and Closing to be put in 24 hour system (Military Time)
addStore.prototype.cookiesSoldPerHour = function(){
    var csphStoreOpenHours = hourParse(this.openHour,this.closeHour)
    var csphIndex = 0;

    for(csphIndex = 0; csphIndex < csphStoreOpenHours.length; csphIndex++){
        this.salesPerHour.push(Math.round(this.randCustPerHour() * this.avgSales));
        this.TotalSales = this.TotalSales + this.salesPerHour[csphIndex];

        if(isNaN(allStoreTotalSalesPerHour[csphIndex])){
            allStoreTotalSalesPerHour.push(0);
        }
        allStoreTotalSalesPerHour[csphIndex] = allStoreTotalSalesPerHour[csphIndex] + this.salesPerHour[csphIndex];
    }
}

addStore.prototype.render = function(orParentElementID){
    var orIndex = 0;
    var orPadding = '10px';
    var orBorderType = 'solid';
    var orBorderWidth = '1px';
    jsElementCreater(orParentElementID,'th',false,this.storeLocation,orPadding,orBorderType,orBorderWidth);

    for(orIndex=0; orIndex < this.salesPerHour.length; orIndex++){
        jsElementCreater(orParentElementID,'td',false,this.salesPerHour[orIndex],orPadding,orBorderType,orBorderWidth)
    }
}

function tableHourHeaders (thhStoreArray){
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

// function cookiesSoldPerHour(csphStoreArray, csphOpening, csphClosing){
//     var i = 0;
//     var storeHours = [];
//     var cookiesSold = 0;
//     var cookiesSoldTotal = 0;
//     var currHour = 0;
//     var dispHour = 0;
//     var strAMPM = '';

//     // console.log(csphStoreArray);
//     // console.log(csphStoreArray[0].storeLocation);
//     // console.log(csphStoreArray.length);

//     for(i = 0; i < csphStoreArray.length; i++){
//         storeHours = [];
//         currHour = csphOpening;
//         dispHour = currHour;
//         strAMPM = 'AM';
//         cookiesSold = 0;
//         cookiesSoldTotal = 0;

//         // console.log('Entering For loop');

//         while(currHour !== csphClosing){
//             if(currHour === 12){
//                 dispHour = currHour;
//                 strAMPM = 'PM';
//             }else if(currHour === 24){
//                 dispHour = currHour - 12;
//                 strAMPM = 'AM';
//                 currHour = 0;
//             }else if(currHour > 12){
//                 dispHour = currHour - 12;
//             }else{
//                 dispHour = currHour;
//             }
            
//             cookiesSold = Math.round(csphStoreArray[i].randCustPerHour() * csphStoreArray[i].avgSales);
//             cookiesSoldTotal = cookiesSoldTotal + cookiesSold;
//             storeHours.push(dispHour + strAMPM + ': ' + cookiesSold + ' cookies');
//             currHour++;
//         }
//         storeHours.push('Total: ' + cookiesSoldTotal + ' cookies');
//         // console.log(storeHours);
//         csphStoreArray[i].salesPerHour = storeHours;
//     }
//     return csphStoreArray;
// }

newStore = new addStore('Seattle',6,20,23,65,6.3);
newStore = new addStore('Tokyo',6,20,3,24,1.2);
newStore = new addStore('Dubai',6,20,11,38,3.7);
newStore = new addStore('Paris',6,20,20,38,2.3);
newStore = new addStore('Lima',6,20,2,16,4.6);

allStoreHourHeader = tableHourHeaders(storeArray);

// cookiesSoldPerHour(storeArray, 6, 20);

for(i = 0; i < storeArray.length; i++){
    storeArray[i].cookiesSoldPerHour();
}

// console.log(cookiesSoldPerHour(storeArray,6,20));
jsElementCreater('sCookiesSold','tbody',salmonCookieTableID,false,false,false);

for(i=0; i <= storeArray.length + 1; i++){
    sctRowID[i] = `sctRow${i+1}`
    jsElementCreater(salmonCookieTableID,'tr',sctRowID[i],false,false,false,false);

    if(i === 0){
        jsElementCreater(sctRowID[i],'th',false,false,'10px',false,false);
        
        for(j = 0; j < allStoreHourHeader.length; j++){
            jsElementCreater(sctRowID[i],'th',false,allStoreHourHeader[j],'10px',false,false);
        }
    }else if (i === storeArray.length + 1){
        jsElementCreater(sctRowID[i],'th',false,'Total','10px','solid','1px');
        
        for(j = 0; j < allStoreTotalSalesPerHour.length; j++){
            jsElementCreater(sctRowID[i],'th',false,allStoreTotalSalesPerHour[j],'10px','solid','1px');
        }
    }else{
        // console.log(sctRowID[i]);
        storeArray[i-1].render(sctRowID[i]);
    }
}

// var testElement = document.getElementById(salmonCookieTableID).style.margin = '5px';
