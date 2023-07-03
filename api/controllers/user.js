const bcrypt = require('bcrypt');
const User = require('../models/User');
const Token = require('../models/Token');

async function register(req, res) {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        data.password = await bcrypt.hash(data.password, salt);
        const result = await User.create(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({"error": err.message})
    }
}

async function login(req, res) {
    try {
        const data = req.body;
        const user = await User.getOneByUsername(data.username)
        const authenticated = await bcrypt.compare(data.password, user.password);
        console.log(authenticated, "AUTHENTICATED" );
        if (!authenticated) {
            throw new Error("Incorrect credentials.");
        } else {
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
        const data = req.body;
        const user = await User.getOneByUsername(data.username);
        res.status(200).json(user);
        
    } catch (error) {
        res.status(404).json({"error": err.message})
    }
}
    

module.exports = {register, login, logout, getUserByUsername};
