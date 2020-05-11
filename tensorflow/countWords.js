const fs = require("fs");

const trainingData = require("./json/namesTrainingData.json");

const maleNames = {};
const femaleNames = {};

trainingData.male.forEach(item => {
    const name = item.name[0].toLowerCase();

    if (maleNames[name]) 
        maleNames[name].push(item);
    else
        maleNames[name] = [item];
});

trainingData.female.forEach(item => {
    const name = item.name[0].toLowerCase();

    if (femaleNames[name]) 
    femaleNames[name].push(item);
    else
    femaleNames[name] = [item];
});

const maleCount = [];

Object.entries(maleNames).forEach(entry => {
    maleCount.push({ letter: entry[0], count: entry[1].length })
})

const femaleCount = [];

Object.entries(femaleNames).forEach(entry => {
    femaleCount.push({ letter: entry[0], count: entry[1].length })
})

fs.writeFileSync("grouped.json", JSON.stringify(maleNames, null, 4));
fs.writeFileSync("maleStats.json", JSON.stringify(maleCount, null, 4));
fs.writeFileSync("femaleStats.json", JSON.stringify(femaleCount, null, 4));