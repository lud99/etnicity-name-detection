const fs = require("fs");

const trainingDataPath = "./json/namesTrainingData.json";

const trainingData = require(trainingDataPath);

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

const sortTrainingData = () => trainingData.sort(dynamicSort("name"));

const removeDuplicates = (data) => {
    return data.filter((thing, index) => {
        const _thing = JSON.stringify(thing);
        return index === data.findIndex(obj => {
            return JSON.stringify(obj) === _thing;
        });
    });
}

const removeDuplicatesAndSort = () => {
    const removedDuplicates = removeDuplicates(sortTrainingData());

    console.log("White names count", removedDuplicates.filter(name => name.ethnicity === "white").length);
    console.log("Other names count", removedDuplicates.filter(name => name.ethnicity === "other").length);
    
    fs.writeFileSync(trainingDataPath, JSON.stringify(removedDuplicates, null, 4));

    console.log("Sorted, removed duplicates and saved file", trainingDataPath)
}

removeDuplicatesAndSort();