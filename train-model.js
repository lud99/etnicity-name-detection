const tf = require('@tensorflow/tfjs-node');
const use = require('@tensorflow-models/universal-sentence-encoder');
const firstnames = require("./json/namesTrainingData.json");

const encodeData = async (data, checkNoEthnicity = true) => {
    const sentences = 
        (checkNoEthnicity ? data.filter(name => name.ethnicity !== "") : data).map(item => item.name.toLowerCase());

    // Load the model.
    const model = (await use.load().catch(err => console.error('Fit Error:', err)));

    const trainingData = await model.embed(sentences);

    return trainingData
};

const train = async () => {
    const outputData = tf.tensor2d(firstnames.filter(name => name.ethnicity !== "").map(name => [
        name.ethnicity === 'white' ? 1 : 0,
        name.ethnicity === 'other' ? 1 : 0,
    ]));

    const model = tf.sequential();
    
    // Add layers to the model
    model.add(tf.layers.dense({
        inputShape: [512],
        activation: 'sigmoid',
        units: 2,
    }));
    
    model.add(tf.layers.dense({
        inputShape: [2],
        activation: 'sigmoid',
        units: 2,
    }));
    
    model.add(tf.layers.dense({ 
        inputShape: [2],
        activation: 'sigmoid',
        units: 2,
    }));
    
    // Compile the model
    model.compile({
        loss: 'meanSquaredError',
        optimizer: tf.train.adam(.06), // This is a standard compile config
    });
    
    data = await Promise.all([
        encodeData(firstnames)
    ]);

    const { 0: training_data } = data;

    // Train the model
    await model.fit(training_data, outputData, { epochs: 1000 });

    // Save model
    await model.save('file://./model');

    console.log("Saved model");

    return Promise.resolve(model);
}

train();