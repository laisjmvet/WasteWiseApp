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

module.exports = {showAll, showOneByName, showOneById}; 
