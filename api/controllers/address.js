const Address = require('../models/Address');

async function showAll (req, res) {
    try {
        const addressess = await Address.getAll();
        res.json(addressess);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await Address.create(data);
        console.log(result);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
};

async function showOne (req, res) {
    try {
        const id = parseInt(req.params.id);
        const address = await Address.getOneById(id);
        res.json(address);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const address = await Address.getOneById(id);
        const result = await address.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const address = await Address.getOneById(id);  
        const result = await address.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

module.exports = {showAll, create, showOne, destroy, update}