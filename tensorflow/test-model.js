const tf = require('@tensorflow/tfjs-node');
const fs = require("fs")
const use = require('@tensorflow-models/universal-sentence-encoder');

const encodeData = async (data, checkNoEthnicity = true) => {
    const sentences = 
        (checkNoEthnicity ? data.filter(name => name.ethnicity !== "") : data).map(item => item.name.toLowerCase());

    // Load the model.
    const model = (await use.load().catch(err => console.error('Fit Error:', err)));

    const trainingData = await model.embed(sentences);

    return trainingData
};

const encodeDataArray = async (data) => {
    const sentences = data.map(item => item.toLowerCase());

    // Load the model.
    const model = (await use.load().catch(err => console.error('Fit Error:', err)));

    // Return the training data
    return await model.embed(sentences);
};

const load = async () => {
    const model = await tf.loadLayersModel('file://./tensorflow/model/model.json');

    return Promise.resolve(model);
}

const test = async (model, dataArray, filename) => {
    const testing_data = await encodeDataArray(dataArray);

    const prediction = model.predict(testing_data).dataSync();

    console.log("Prediction finished");

    const data = [];

    for (let i = 0; i < prediction.length; i += 2) {
        const pair = [prediction[i], prediction[i + 1]]

        var ethnicity = "";

        if (pair[0] > pair[1]) ethnicity = "white";
        else if (pair[1] > pair[0]) ethnicity = "other";

        data.push({ name: dataArray[(i / 2) | 0], ethnicity: ethnicity, confidence: pair });
    }
    
    //fs.writeFileSync(filename, JSON.stringify(data, null, 4));

    return Promise.resolve(data);
}
/*
const testDataFilePath = process.argv[2];
const outputFilePath = process.argv[3];

load().then(async (model) => test(model, require(testDataFilePath), outputFilePath));*/

module.exports.load = load;
module.exports.predict = test;