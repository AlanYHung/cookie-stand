function addStore (storeArray, fpStoreLocation, fpMinCust, fpMaxCust, fpAvgSales){
    var storeObject = {
        storeLocation: fpStoreLocation,
        minCust: fpMinCust,
        maxCust: fpMaxCust,
        avgSales: fpAvgSales,
        randCustPerHour: function(min, max){
            //Code Taken from
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }

    storeArray.push(storeObject)
    return storeArray;
}

var storeArray = [];

storeArray = addStore(storeArray,'Seattle',23,65,6.3);
storeArray = addStore(storeArray,'Tokyo',3,24,1.2);
storeArray = addStore(storeArray,'Dubai',11,38,3.7);
storeArray = addStore(storeArray,'Paris',20,38,2.3);
storeArray = addStore(storeArray,'Lima',2,16,4.6);
