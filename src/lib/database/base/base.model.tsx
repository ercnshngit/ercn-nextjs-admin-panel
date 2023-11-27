import { db } from "../connection";

export class BaseModel{

    constructor(modelClass : any){
        this.modelClass = modelClass;
    }

    modelClass : any;

    async findAll(){
        const connection = await db.connection();
        const [rows, fields] = await connection.execute(`SELECT * FROM ${this.modelClass.TABLE}`);
        return rows;
    }

    async findWithId(id : number){
        const connection = await db.connection();
        const [rows, fields] = await connection.execute(`SELECT * FROM ${this.modelClass.TABLE} WHERE id = ?`,[id]);
        return rows;
    }

    async insert(data : any){
        const connection = await db.connection();
        const [rows, fields] = await connection.execute(`INSERT INTO ${this.modelClass.TABLE} SET ?`,[data]);
        return rows;
    }

    async update(data : any,id : number){
        const connection = await db.connection();
        const [rows, fields] = await connection.execute(`UPDATE ${this.modelClass.TABLE} SET ? WHERE id = ?`,[data,id]);
        return rows;
    }

    async delete(id : number){
        const connection = await db.connection();
        const [rows, fields] = await connection.execute(`DELETE FROM ${this.modelClass.TABLE} WHERE id = ?`,[id]);
        return rows;
    }

}

interface ColumnRelationOptions {
    table_name: string;
    column: string;
    referenced_column: string;
    foreign_key_name: string;
    on_update: string;
    on_delete: string;
}