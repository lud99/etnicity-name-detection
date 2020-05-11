const express = require("express");

const detectEthnicity = require("../tensorflow/test-model")

const app = express();

var model;

app.get("/:name", async (req, res) => {
    const name = req.params.name;

    const prediction = await detectEthnicity.predict(model, [name]);

    res.send(prediction);
})

detectEthnicity.load().then(_model => {
    model = _model;

    app.listen(3000, () => console.log("Server running on port 3000"));
});