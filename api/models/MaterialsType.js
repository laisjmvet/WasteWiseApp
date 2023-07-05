const db =  require('../database/connect');

class MaterialsType {
    constructor ({material_type_id, name}) {
        this.id = material_type_id;
        this.name = name;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM materials_type");
        return response.rows.map(a => new MaterialsType(a));
    }

    static async getOneByName(name) {
        const response = await db.query("SELECT * FROM materials_type WHERE name = $1", [name]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate material.");
        }
        return new MaterialsType(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM materials_type WHERE material_type_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate material.");
        }
        return new MaterialsType(response.rows[0]);
    }

    static async create(data) {
        const {name } = data;
        let response = await db.query("INSERT INTO materials_type (name) VALUES ($1) RETURNING *;", [name]);
        return new MaterialsType(response.rows[0]);
    }

    async destroy() {
        await db.query("UPDATE recycling_object SET material_type_id = $1 WHERE material_type_id = $2 RETURNING *;", [1, this.id])
        const response = await db.query("DELETE FROM materials_type WHERE material_type_id = $1 RETURNING *;", [this.id]);
        return new MaterialsType(response.rows[0]);
    }

    async update(data) {        
        const {name} = data;        
        const response = await db.query("UPDATE materials_type SET name = $1 WHERE material_type_id = $2 RETURNING *;", [name, this.id]);
        return new MaterialsType(response.rows[0]);
    }
}
module.exports = MaterialsType;
