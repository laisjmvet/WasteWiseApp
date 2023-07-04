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
}
module.exports = Weekday;
