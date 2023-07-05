const db =  require('../database/connect');

class Address {
    constructor ({address_id, street_name, house_number, postcode, zone_id}) {
        this.id = address_id;
        this.street_name = street_name;
        this.house_number = house_number;
        this.postcode = postcode;
        this.zone_id = zone_id;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM addresses_florin");
        return response.rows.map(a => new Address(a));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM addresses_florin WHERE address_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate address.");
        }
        return new Address(response.rows[0]);
    }

    static async getOneByUserInput(input) {
        const house_number = parseInt(input.house_number);
        const postcode = input.postcode;
        const response = await db.query("SELECT * FROM addresses_florin WHERE postcode = $1 AND house_number = $2", [postcode, house_number]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate address.");
        }
        return new Address(response.rows[0]);
    }

    static async create(data) {
        const { street_name, house_number, postcode, zone_id} = data;
        let response = await db.query("INSERT INTO addresses_florin (street_name, house_number, postcode, zone_id) VALUES ($1, $2, $3, $4) RETURNING *", [street_name, house_number, postcode, zone_id]);
        return new Address(response.rows[0]);        
    }

    async destroy() {
        let response = await db.query("DELETE FROM addresses_florin WHERE address_id = $1 RETURNING address_id;", [this.id]);
        return new Address(response.rows[0]);
    }

    async update(data) {        
        const {street_name, house_number, postcode} = data;      
        const response = await db.query("UPDATE addresses_florin SET street_name = $1, house_number = $2, postcode = $3 RETURNING *;", [street_name, house_number, postcode]);
        return new Address(response.rows[0]);
    }
}
module.exports = Address;
