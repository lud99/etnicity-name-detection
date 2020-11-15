# etnicity-name-detection
Predicts if any name is 'white' or 'other'. It's trained with the names of the swedish population

A project made just for fun to try and AI. You can enter any 'non-white' name such as a variation of Ahmed, like "Ahmed Abdulla Mohammed Jan-Björklund Walla" 
and it successfully predicts that it's 'other'. Some names that are definetly swedish aren't recognised as such sadly, but as a fun project it works surprisingly well.

Credit to ```https://github.com/bolddp/swedish-names``` and Statistikmyndigheten for the names used for the training.

## How to run
Start the express server and go to ```http://localhost:3000/your%20name%20here``` and specify a name in the url

Alternativly, go to ```http://ethnicity-detector.herokuapp.com/name%20here``` 

The trained model is in ```tensorflow/model/model.json```
