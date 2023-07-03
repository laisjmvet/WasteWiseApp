const db =  require('../database/connect');

class User {
    constructor({user_id, username, password, isAdmin, address_id}){
    this.id = user_id;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
    this.address_id = address_id;
}


    static async getOneById(id) {
        try {
            const response = await db.query('SELECT * from user_account WHERE user_id = $1', [id]); 
            return new User(response.rows[0]);      
        } catch (error) {
            console.log(error);
        } 
    }

    static async getOneByUsername(username) {
        try {
            const response = await db.query('SELECT * from user_account WHERE username = $1', [username]); 
            return new User(response.rows[0]);      
        } catch (error) {
            console.log(error);
        } 
    }

    static async create(data, address_id) {    
        try {
            const {username, password, isAdmin = false} = data;
            const response = await db.query('INSERT INTO user_account (username, password, isAdmin, address_id) VALUES ($1, $2, $3, $4) RETURNING user_id', [username, password, isAdmin, address_id]); 
            return new User(response.rows[0]);      
        } catch (error) {
            console.log(error);
        } 
    }
}

module.exports = User;
