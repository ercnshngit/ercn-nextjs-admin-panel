import mysql from 'mysql2/promise';
import { getTableMetadata } from '../decarators/decorators';
import { BlockComponent } from '../models/block_models/block-component.model';
import { Block } from '../models/block_models/block.model';
import { Component } from '../models/block_models/component.model';
import { Types } from '../models/block_models/types.model';
import { ColumnOption } from '../models/database-table-models/column-option.model';
import { ColumnRelation } from '../models/database-table-models/column-relation.model';
import { CrudOption } from '../models/database-table-models/crud-option.model';
import { DatabaseTableColumn } from '../models/database-table-models/database-table-column.model';
import { DatabaseTable } from '../models/database-table-models/database-table.model';
import { DataType } from '../models/database-table-models/data-type.model';
import { Prop } from '../models/block_models/prop.model';
import { BlockComponentProp } from '../models/block_models/block-component-prop.model';
import { ComponentProp } from '../models/block_models/component_prop.model';
import { SqlConstants } from '../../constants/sql';

export const db = {
    connection: connect,
    initialized: false,
    active_connection: null as any | null,
    tables: [DatabaseTable, DatabaseTableColumn, ColumnOption, DataType, ColumnRelation, CrudOption, Block, Types, Component, BlockComponent, Prop, BlockComponentProp, ComponentProp],
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js

async function connect() {
    try {
        if (db.active_connection) {              // Aktif bağlantı varsa onu döndür.
            const result = await db.active_connection.query(SqlConstants.USE_DATABASE_QUERRY())
            return db.active_connection;
        }
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        db.initialized = true;
        db.active_connection = connection;
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

export function getTableData(table: any) { // Table ait repository döndürülüyor.
    const tableInfo = getTableMetadata(table);
    if (!tableInfo) { return null; }
    return tableInfo;
}