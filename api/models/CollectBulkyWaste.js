const db =  require('../database/connect');

class CollectBulkyWaste {
    constructor ({collect_bulky_waste_id, weight_kg, price}) {
        this.id = collect_bulky_waste_id;
        this.weight_kg = weight_kg;
        this.price = price;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM collect_bulky_waste");
        return response.rows.map(o => new CollectBulkyWaste(o));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM collect_bulky_waste WHERE collect_bulky_waste_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate collect_bulky_waste_id.");
        }
        return new CollectBulkyWaste(response.rows[0]);
    }

    static async create(data) {
        const { weight_kg, price } = data;
        let response = await db.query("INSERT INTO collect_bulky_waste (weight_kg, price) VALUES ($1, $2) RETURNING *;", [weight_kg, price]);
        return new CollectBulkyWaste(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM collect_bulky_waste WHERE collect_bulky_waste_id = $1 RETURNING *;", [this.id]);
        return new CollectBulkyWaste(response.rows[0]);
    }

    async update(data) {        
        const {weight_kg, price} = data;        
        const response = await db.query("UPDATE collect_bulky_waste SET weight_kg = $1, price =$2 RETURNING *;", [weight_kg, price]);
        return new CollectBulkyWaste(response.rows[0]);
    }
}



module.exports = CollectBulkyWaste;
