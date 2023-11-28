import { SqlConstants } from "../../../constants/sql";
import { db, getTableData } from "../connection";
import { FindOptions, Table } from "../table.model";

export class BaseModel {
    constructor(modelClass: any) {
        this.modelClass = modelClass;
        this.connect();
        this.table_data = getTableData(this.modelClass)
    }

    modelClass: any;
    table_data: Table | null;

    async connect() {
        await db.connection();
    }
    async findAll() {
        const connection = await db.connection();
        const [rows, fields] = await connection.execute(`SELECT * FROM ${this.table_data}`);
        return rows;
    }

    async find(options?: FindOptions | undefined) {
        let where = "";
        let order_by = "";
        let group_by = "";
        let limit = "";
        let relation = "";
        if (this.table_data === null) { return null; }
        if (options === undefined) {
            return await this.findAll();
        }
        if (options.where !== undefined) {
            console.log("where girdi.")
            where = SqlConstants.WHERE + `${options.where}`;
        }
        if (options.order_by !== undefined) {
            order_by = SqlConstants.ORDER_BY + `${options.order_by}`;
        }
        if (options.group_by !== undefined) {
            group_by = SqlConstants.GROUP_BY + `${options.group_by}`;
        }
        if (options.limit !== undefined) {
            limit = SqlConstants.LIMIT + `${options.limit}`;
        }
        if (options.relation !== undefined) {
            relation += SqlConstants.JOIN_QUERRY_BUILDER(this.modelClass, options.relation);
        }
        const connection = await db.connection();
        const query = SqlConstants.SELECT_ALL_WITH_ALIAS_QUERY(this.table_data?.name, this.table_data?.alias) + relation + where + order_by + group_by + limit;
        console.log("query ::", query)
        const [rows, fields] = await connection.execute(query);
        return rows;
    }

    async findWithId(id: number) {
        if (id === undefined) { return null; }
        if (this.table_data === null) { return null; }
        const connection = await db.connection();
        const [rows, fields] = await connection.execute(`SELECT * FROM ${this.table_data?.name} WHERE id = ?`, [id]);
        return rows;
    }

    async insert(data: any) {
        if (data === undefined) { return null; }
        if (this.table_data === null) { return null; }
        const connection = await db.connection();
        const [rows, fields] = await connection.execute(`INSERT INTO ${this.table_data?.name} SET ?`, [data]);
        return rows;
    }

    async update(data: any, id: number) {
        if (id === undefined) { return null; }
        if (data === undefined) { return null; }
        if (this.table_data === null) { return null; }
        const connection = await db.connection();
        const [rows, fields] = await connection.execute(`UPDATE ${this.table_data?.name} SET ? WHERE id = ?`, [data, id]);
        return rows;
    }

    async delete(id: number) {
        if (id === undefined) { return null; }
        if (this.table_data === null) { return null; }
        const connection = await db.connection();
        const [rows, fields] = await connection.execute(`DELETE FROM ${this.table_data?.name} WHERE id = ?`, [id]);
        return rows;
    }
}

