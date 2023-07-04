const db =  require('../database/connect');

class Bin {
    constructor ({bin_type_id, bin_type_name}) {
        this.id = bin_type_id;
        this.bin = bin_type_name;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM bin_types");
        return response.rows.map(a => new Bin(a));
    }

    static async getOneByName(name) {
        const response = await db.query("SELECT * FROM bin_types WHERE bin_type_name = $1", [name]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate bin.");
        }
        return new Bin(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM bin_types WHERE bin_type_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate bin.");
        }
        return new Bin(response.rows[0]);
    }
}
module.exports = Bin;
