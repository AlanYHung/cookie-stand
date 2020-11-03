'use strict';

var storeArray = [];
var allStoreHourHeader = [];
var newStore;

function addStore (addStoreLocation, addOpenHour, addCloseHour, addMinCust, addMaxCust, addAvgSales){
    this.storeLocation = addStoreLocation;
    this.minCust = addMinCust;
    this.maxCust = addMaxCust;
    this.avgSales = addAvgSales;
    this.openHour = addOpenHour;
    this.closeHour = addCloseHour;
    this.salesPerHour = [];
    
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

        hpStoreHourBr.push(`${dispHour} ${strAMPM}`);
        currHour++;
    }

    return hpStoreHourBr
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


//This function requires Opening and Closing to be put in 24 hour system (Military Time)
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

// for(var i = 0; i < storeArray.length; i++){
//     storeArray[i].render();
// }
// console.log(cookiesSoldPerHour(storeArray,6,20));
