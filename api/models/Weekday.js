const db =  require('../database/connect');

class Weekday {
    constructor ({weekday, weekday_id}) {
        this.id = weekday_id;
        this.weekday = weekday;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM weekdays");
        return response.rows.map(a => new Weekday(a));
    }

    static async getOneByName(name) {
        const response = await db.query("SELECT * FROM weekdays WHERE weekday = $1", [name]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate weekday.");
        }
        return new Weekday(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM weekdays WHERE weekday_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate weekday.");
        }
        return new Weekday(response.rows[0]);
    }

    static async create(data) {
        const {weekday} = data;
        let response = await db.query("INSERT INTO weekdays (weekday) VALUES ($1) RETURNING *;", [weekday]);
        return new Weekday(response.rows[0]);
    }

    async destroy() {
        // await db.query("DELETE FROM collect_days WHERE weekday_id = $1 RETURNING *;", [this.id]);
        // await db.query("UPDATE recycling_object SET weekday_id = $1 RETURNING *;", [8]);
        const response = await db.query("DELETE FROM weekdays WHERE weekday_id = $1 RETURNING *;", [this.id]);
        return new Weekday(response.rows[0]);
    }

    async update(data) {        
        const {weekday} = data;        
        const response = await db.query("UPDATE weekdays SET weekday = $1 WHERE weekday_id = $2 RETURNING *;", [weekday, this.id]);
        return new Weekday(response.rows[0]);
    }
}
module.exports = Weekday;
