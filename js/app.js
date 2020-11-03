'use strict';

var storeArray = [];

function addStore (addStoreArray, addStoreLocation, addMinCust, addMaxCust, addAvgSales){
    var storeObject = {
        storeLocation: addStoreLocation,
        minCust: addMinCust,
        maxCust: addMaxCust,
        avgSales: addAvgSales,
        randCustPerHour: function(min, max){
            //Code Taken from
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }

    addStoreArray.push(storeObject)
    return addStoreArray;
}

//This function requires Opening and Closing to be put in 24 hour system (Military Time)
function cookiesSoldPerHour(csphStoreArray, csphOpening, csphClosing){
    var i = 0;
    var storeHours = [];
    var cookiesSold = 0;
    var cookiesSoldTotal = 0;
    var currHour = csphOpening;
    var dispHour = currHour;
    var strAMPM = 'AM';

    // console.log(csphStoreArray);
    // console.log(csphStoreArray[0].storeLocation);

    while(currHour !== csphClosing){
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
        
        cookiesSold = Math.round(csphStoreArray[0].randCustPerHour(csphStoreArray[0].minCust,csphStoreArray[0].maxCust) * csphStoreArray[0].avgSales);
        cookiesSoldTotal = cookiesSoldTotal + cookiesSold;
        storeHours.push(dispHour + strAMPM + ': ' + cookiesSold + ' cookies');
        currHour++;
    }
    // console.log(storeHours);

    return storeHours;
}

// function 

storeArray = addStore(storeArray,'Seattle',23,65,6.3);
storeArray = addStore(storeArray,'Tokyo',3,24,1.2);
storeArray = addStore(storeArray,'Dubai',11,38,3.7);
storeArray = addStore(storeArray,'Paris',20,38,2.3);
storeArray = addStore(storeArray,'Lima',2,16,4.6);

// console.log(cookiesSoldPerHour(storeArray,6,20));
