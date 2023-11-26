import mysql from 'mysql2/promise';
import { PageConfig } from './models';
import { ColumnOption } from './models/column-option.model';
import { ColumnRelation } from './models/column-relation.model';
import { CrudOption } from './models/crud-option.model';
import { DatabaseTableColumn } from './models/database-table-column.model';
import { DatabaseTable } from './models/database-table.model';
import { Type } from './models/type.model';
import { Table } from './table.model';
import { getTableMetadata } from './decorators';

export const db = {
    connection: connect,
    initialized: false,
    tables: [DatabaseTable, DatabaseTableColumn, ColumnOption, Type, ColumnRelation, CrudOption],
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js

async function connect() {
    try {
        if (db.initialized) { return; }
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        db.initialized = true;
        return connection;
    } catch (error) {
        console.log("Connection error :" + error);
        db.initialized = false;
        return null;
    }
}
export function sortTables(tables: any[]) {  // Relationlara gore tableları sıralayan fonksiyon.
    let sortedTables: any[] = [];

    function visit(table: any, visited: Set<string>) {
        const tableInfo = getTableMetadata(table); // Table in model bilgileri alınıyor.
        if (!tableInfo) { return; }                // Table bilgisi yoksa çık.     
        if (!visited.has(tableInfo.name)) {                                 // Burada reference edilen tabloları bulmak için recursive bir fonksiyon yazıldı.
            console.log("tableInfo : ", tableInfo.references)
            if (tableInfo.references) {
                tableInfo.references.forEach((ref) => {                         // Yani relationlara gore sınıfların konumları revize ediliyor.
                    const refTable = db.tables.find((t) => t.TABLE === ref);
                    if (refTable) {
                        visit(refTable, visited);
                    }
                });
            }
            visited.add(tableInfo.name);
            if (!sortedTables.includes(table)) {
                sortedTables.push(table);
            }
        }
    }
    db.tables.forEach((table) => {
        visit(table, new Set<string>());
    });
    return sortedTables;
}