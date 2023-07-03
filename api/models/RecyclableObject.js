const db =  require('../database/connect');

class RecyclableObject {
    constructor ({object_id, name, material_type_id, bin_type_id}) {
        this.id = object_id;
        this.name = name;
        this.bin_type_id = bin_type_id
        this.material_type_id = material_type_id;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM recycling_object");
        return response.rows.map(o => new RecyclableObject(o));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM recycling_object WHERE object_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate object.");
        }
        return new RecyclableObject(response.rows[0]);
    }

    static async create(data) {
        const { name, material_type_id, bin_type_id } = data;
        let response = await db.query("INSERT INTO recycling_object (name, material_type_id, bin_type_id) VALUES ($1, $2, $3) RETURNING *;", [name, material_type_id, bin_type_id]);
        return new RecyclableObject(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM recycling_object WHERE object_id = $1 RETURNING *;", [this.id]);
        return new RecyclableObject(response.rows[0]);
    }

    async update(data) {        
        const {name, material_type_id, bin_type_id} = data;        
        const response = await db.query("UPDATE recycling_object SET name = $1, material_type_id = $2, bin_type_id =$3 RETURNING *;", [name, material_type_id, bin_type_id]);
        return new RecyclableObject(response.rows[0]);
    }
}



module.exports = RecyclableObject;
