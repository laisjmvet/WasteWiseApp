const db =  require('../database/connect');

class Appointment {
    constructor ({appointment_id, user_id, object_name, weekday_id, weight_kg}) {
        this.id = appointment_id;
        this.user_id = user_id;
        this.object_name = object_name;
        this.weight_kg = weight_kg;
        this.weekday_id = weekday_id;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM appointments");
        return response.rows.map(a => new Appointment(a));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM appointments WHERE appointment_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate appointment_id.");
        }
        return new Appointment(response.rows[0]);
    }

    static async create(data) {
        const { user_id, object_name, weekday_id, weight_kg } = data;
        let response = await db.query("INSERT INTO appointments (user_id, object_name, weekday_id, weight_kg) VALUES ($1, $2, $3, $4) RETURNING *;", [user_id, object_name, weekday_id, weight_kg]);
        return new Appointment(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM appointments WHERE appointment_id = $1 RETURNING *;", [this.id]);
        return new Appointment(response.rows[0]);
    }

    async update(data) {        
        const {user_id, object_name, weekday_id, weight_kg} = data;        
        const response = await db.query("UPDATE appointments SET weight_kg = $1, user_id = $2, object_name = $3, weekday_id = $4 WHERE appointment_id = $5 RETURNING *;", [weight_kg, user_id, object_name, weekday_id, this.id]);
        return new Appointment(response.rows[0]);
    }
}
module.exports = Appointment;
