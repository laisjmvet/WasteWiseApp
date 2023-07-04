const Bin = require('../models/Bin');

async function showAll (req, res) {
    try {
        const bins = await Bin.getAll();
        res.status(200).json(bins);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
};

async function showOneByName (req, res) {
    try {
        const name = req.params;        
        const bin = await Bin.getOneByName(name.bin);
        console.log(bin)
        res.status(200).json(bin);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function showOneById (req, res) {
    try {
        const id = parseInt(req.params.id);        
        const bin = await Bin.getOneById(id);
        console.log(bin)
        res.status(200).json(bin);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

module.exports = {showAll, showOneByName, showOneById}; 
