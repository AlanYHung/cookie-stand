'use strict';

var storeArray = [];

function addStore (addStoreArray, addStoreLocation, addMinCust, addMaxCust, addAvgSales){
    var storeObject = {
        storeLocation: addStoreLocation,
        minCust: addMinCust,
        maxCust: addMaxCust,
        avgSales: addAvgSales,
        randCustPerHour: function(){
            //Code Taken from
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
            var min = Math.ceil(this.minCust);
            var max = Math.floor(this.maxCust);
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        salesPerHour: [],
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
    var currHour = 0;
    var dispHour = 0;
    var strAMPM = '';

    // console.log(csphStoreArray);
    // console.log(csphStoreArray[0].storeLocation);
    // console.log(csphStoreArray.length);

    for(i = 0; i < csphStoreArray.length; i++){
        storeHours = [];
        currHour = csphOpening;
        dispHour = currHour;
        strAMPM = 'AM';

        // console.log('Entering For loop');

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
            
            cookiesSold = Math.round(csphStoreArray[i].randCustPerHour() * csphStoreArray[i].avgSales);
            cookiesSoldTotal = cookiesSoldTotal + cookiesSold;
            storeHours.push(dispHour + strAMPM + ': ' + cookiesSold + ' cookies');
            currHour++;
        }
        storeHours.push('Total: ' + cookiesSoldTotal + ' cookies');
        // console.log(storeHours);
        csphStoreArray[i].salesPerHour = storeHours;
    }
    return csphStoreArray;
}

storeArray = addStore(storeArray,'Seattle',23,65,6.3);
storeArray = addStore(storeArray,'Tokyo',3,24,1.2);
storeArray = addStore(storeArray,'Dubai',11,38,3.7);
storeArray = addStore(storeArray,'Paris',20,38,2.3);
storeArray = addStore(storeArray,'Lima',2,16,4.6);

cookiesSoldPerHour(storeArray, 6, 20);

// console.log(cookiesSoldPerHour(storeArray,6,20));
