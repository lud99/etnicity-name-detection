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

const sort = (data) => data.sort(dynamicSort("name"));

const reformat = (data) => {
    return data.map(item => ({ name: item.name, ethnicity: item.ethnicity }));
}

const removeDuplicates = (dataArray) => {
    return dataArray.filter((thing, index) => {
        const _thing = JSON.stringify(thing);
        return index === dataArray.findIndex(obj => {
            return JSON.stringify(obj) === _thing;
        });
    });
}

const removeDuplicatesAndSort = () => {
    const formatted = { male: reformat(trainingData.male), female: reformat(trainingData.female) };
    const removedDuplicates = { male: removeDuplicates(formatted.male), female: removeDuplicates(formatted.female) };

    const sorted = { male: sort(removedDuplicates.male), female: sort(removedDuplicates.female) };

    console.log("White names male count", sorted.male.filter(name => name.ethnicity === "white").length);
    console.log("Other names male count", sorted.male.filter(name => name.ethnicity === "other").length);

    console.log("White names female count", sorted.female.filter(name => name.ethnicity === "white").length);
    console.log("Other names female count", sorted.female.filter(name => name.ethnicity === "other").length);
    
    fs.writeFileSync(trainingDataPath, JSON.stringify(sorted, null, 4));

    console.log("Formated, sorted, removed duplicates and saved file", trainingDataPath)
}

removeDuplicatesAndSort();