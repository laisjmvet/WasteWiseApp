const db =  require('../database/connect');

class AddressZone {
    constructor ({zone_id, zone_number}) {
        this.id = zone_id;
        this.zone_number = zone_number;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM address_zones");
        return response.rows.map(a => new AddressZone(a));
    }

    static async getOneByNumber(number) {
        const response = await db.query("SELECT * FROM address_zones WHERE zone_number = $1", [zone_number]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate zone.");
        }
        return new AddressZone(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM address_zones WHERE zone_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate zone.");
        }
        return new AddressZone(response.rows[0]);
    }

    static async create(data) {
        const {zone_number } = data;
        let response = await db.query("INSERT INTO address_zones (zone_number) VALUES ($1) RETURNING *;", [zone_number]);
        return new AddressZone(response.rows[0]);
    }

    async destroy() {
        await db.query("UPDATE addresses_florin SET zone_id = $1 WHERE zone_id = $2 RETURNING *;", [1, this.id]);
        await db.query("UPDATE collect_days SET zone_id = $1 WHERE zone_id = $2 RETURNING *;", [1, this.id]);
        const response = await db.query("DELETE FROM address_zones WHERE zone_id = $1 RETURNING *;", [this.id]);
        return new AddressZone(response.rows[0]);
    }

    async update(data) {        
        const {zone_number} = data;        
        const response = await db.query("UPDATE address_zones SET zone_number = $1 WHERE zone_id = $2 RETURNING *;", [zone_number, this.id]);
        return new AddressZone(response.rows[0]);
    }
}
module.exports = AddressZone;
