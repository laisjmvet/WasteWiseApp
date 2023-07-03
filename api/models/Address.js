const db =  require('../database/connect');

class Address {
    constructor ({address_id, street_name, street_number, postcode}) {
        this.id = address_id;
        this.street_name = street_name;
        this.street_number = street_number;
        this.postcode = postcode;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM addresses_Abingdon");
        return response.rows.map(a => new Address(a));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM addresses_Abingdon WHERE address_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate address.")
        }
        return new Address(response.rows[0]);
    }

    static async create(data) {
        const { street_name, street_number, postcode } = data;
        let response = await db.query("INSERT INTO addresses_Abingdon (street_name, street_number, postcode) VALUES ($1, $2, $3) RETURNING *", [street_name, street_number, postcode]);
        return new Address(response.rows[0]);        
    }

    async destroy() {
        let response = await db.query("DELETE FROM addresses_Abingdon WHERE address_id = $1 RETURNING address_id;", [this.id]);
        return new Address(response.rows[0]);
    }

    async update(data) {        
        const {street_name, street_number, postcode} = data      
        const response = await db.query("UPDATE addresses_Abingdon SET street_name = $1, street_number = $2, postcode = $3 RETURNING *;", [street_name, street_number, postcode]);
        return new Address(response.rows[0]);
    }
}



module.exports = Address





// Define your Google Geocoding API key


// Function to retrieve addresses from the Geocoding API

// Call the function to retrieve addresses

