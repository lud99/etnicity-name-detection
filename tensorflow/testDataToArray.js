const fs = require("fs");

const inputTilePath = process.argv[2];
const outputDataPath = process.argv[3]

const testData = require(inputTilePath); 

const reformat = (data) => data.map(item => item.name);

fs.writeFileSync(outputDataPath, JSON.stringify(reformat(testData), null, 4));