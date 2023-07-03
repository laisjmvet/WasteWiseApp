const bcrypt = require('bcrypt');
const User = require('../models/User');
const Token = require('../models/Token');
const Address =  require("../models/Address");

async function register(req, res) {
    try {
        const data = req.body;          
        console.log(data, "<<<<<<<<<<<<>>>>>>>>>>>>")      
        const validAddress = await Address.getOneByUserInput(data);
        console.log(validAddress, "aaaaaaaaaaaaa")
        
        if(validAddress) {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        data.password = await bcrypt.hash(data.password, salt);
        const result = await User.create(data, validAddress.id);
        res.status(201).json(result);
        
        }else {
            console.log("ERROR!!!!!!!!!")
        }
        
    } catch (error) {
        res.status(400).json({"error": error.message})
    }
}

async function login(req, res) {
    try {
        const data = req.body;
        const user = await User.getOneByUsername(data.username);
        const authenticated = await bcrypt.compare(data.password, user.password);        
        if (!authenticated) {
            throw new Error("Incorrect credentials.");
        } else {
            console.log("AUTHORIZED" );
            const token = await Token.create(user.id);
            res.status(200).json({ authenticated: true, token: token.token });
        }
    } catch (error) {
        res.status(403).json({"error": error.message})
    }}

async function logout(req, res) {
    try {
        const userToken = req.headers.authorization;
        const token = userToken
        if (!userToken) {
            throw new Error('User not authenticated??');
        } else {
            const getToken = await Token.getOneByToken(token);
            console.log(getToken)
            await getToken.deleteByToken();
            res.status(200).json({ message: 'Logged out!!!' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getUserByUsername(req, res) {
    try {
        const data = req.params;
        console.log(data)
        const user = await User.getOneByUsername(data.username);
        res.status(200).json(user);
        
    } catch (error) {
        res.status(404).json({"error": err.message})
    }
}
    

module.exports = {register, login, logout, getUserByUsername};
