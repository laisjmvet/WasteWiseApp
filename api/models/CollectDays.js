const db =  require('../database/connect');

class CollectDays {
    constructor ({collect_days_id, zone_id, bin_type_id}) {
        this.id = collect_days_id;
        this.zone_id = zone_id
        this.bin_type_id = bin_type_id;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM collect_days");
        return response.rows.map(o => new CollectDays(o));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM collect_days WHERE collect_days_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate collect_day.");
        }
        return new CollectDays(response.rows[0]);
    }

    static async create(data) {
        const { zone_id, bin_type_id } = data;
        let response = await db.query("INSERT INTO collect_days (zone_id, bin_type_id) VALUES ($1, $2) RETURNING *;", [zone_id, bin_type_id]);
        return new CollectDays(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM collect_days WHERE collect_days_id = $1 RETURNING *;", [this.id]);
        return new CollectDays(response.rows[0]);
    }

    async update(data) {        
        const {zone_id, bin_type_id} = data;        
        const response = await db.query("UPDATE collect_days SET zone_id = $1, bin_type_id =$2 RETURNING *;", [zone_id, bin_type_id]);
        return new CollectDays(response.rows[0]);
    }
}



module.exports = CollectDays;