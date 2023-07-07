const Weekday = require('../models/Weekday');

async function showAll (req, res) {
    try {
        const weekdays = await Weekday.getAll();
        res.status(200).json(weekdays);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
};

async function showOneByName (req, res) {
    try {
        const name = req.params;        
        const weekday = await Weekday.getOneByName(name.weekday);
        console.log(weekday)
        res.status(200).json(weekday);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function showOneById (req, res) {
    try {
        const id = parseInt(req.params.id);        
        const weekday = await Weekday.getOneById(id);
        console.log(weekday)
        res.status(200).json(weekday);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await Weekday.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const weekday = await Weekday.getOneById(id);
        const result = await weekday.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const weekday = await Weekday.getOneById(id);  
        const result = await weekday.update(data);
        res.status(201).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

module.exports = {showAll, showOneByName, showOneById, create, destroy, update}; 

//these are the technologies we used for the backend and the frontend. 

//i have this picture here to represent the whole Database. the db seems easy to code but the most chalengging part is to actually plan it. So i have a small piece of code here showing from where the front end is getting the information to display the days and the bins that are going to be collected. So starting at line 109 yo can see that each collect day has the bin type, weekday and the zone.

//Another significant part of code is the login part because many thing happens here. First the data from the body to see what is the username that has been inserted and then it looks for this username on the databse. After that it compares if the password in the databse matches the passowrd inserted.  If they dont match, it will be thrown an error and if it matches, a token for this user will be generated adding one more lay of security to the app.
