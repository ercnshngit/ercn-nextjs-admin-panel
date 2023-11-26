import { RowDataPacket } from "mysql2";
import { SqlConstants, SqlDataType } from "../../../constants/sql";
import { db, sortTables } from "../connection";
import { getColumnMetadata, getRelationMetadata, getTableMetadata } from "../decorators";
import { Table, TableColumn, TableModel, TableRelation } from "../table.model";
import { config } from "dotenv";
import { X } from "lucide-react";

config();
export default class QuerryBuilder {
    static async createTablesQuerry(): Promise<string | undefined | any> {
        let allTableDatas: any[] = [];
        let allTableQuerries = '';
        try {
            const sortedTables = sortTables(db.tables)
            sortedTables.forEach(table => {
                const tableInfo = getTableMetadata(table);
                const columns = getColumnMetadata(table);
                const relations = getRelationMetadata(table);
                if (tableInfo && columns) {
                    const table_data = new TableModel(tableInfo, columns, relations);
                    allTableDatas.push(JSON.parse(JSON.stringify(table_data)));
                }
            });
            const db_name = '`' + process.env.DB_NAME + '`';
            let useDbQuery = `USE ${db_name};`;
            allTableDatas.forEach((table: TableModel) => {
                if (!table.columns) {
                    table.columns = [];
                }

                let createTableQuery = `CREATE TABLE IF NOT EXISTS ${table.table_info?.name} (`;
                for (const column_name in table.columns) {
                    if (table.columns.hasOwnProperty(column_name)) {
                        const column = table.columns[column_name];
                        if (column.title && column.data_type) {
                            let columnDefinition = `${column.title} ${column.data_type}`;

                            if (!column.nullable) {
                                columnDefinition += ' NOT NULL';
                            }

                            if (column.default_value !== null && column.default_value !== undefined) {
                                if (column.data_type === SqlDataType.VARCHAR) {
                                    columnDefinition += ` DEFAULT '${column.default_value}'`;
                                } else {
                                    columnDefinition += ` DEFAULT ${column.default_value}`;
                                }
                            }

                            if (column.is_primary_key) {
                                columnDefinition += ' PRIMARY KEY';
                            }

                            createTableQuery += `${columnDefinition},`;
                        }
                    }
                }

                if (!table.references) {
                    table.references = [];
                }

                for (const relation_name in table.references) {
                    if (table.references.hasOwnProperty(relation_name)) {
                        const relation = table.references[relation_name];
                        let relationDefinition = '';
                        let fk_name = relation.foreign_key_name == undefined ? "fk_" + table.table_info?.name + "_" + relation.column : relation.foreign_key_name
                        relationDefinition += `CONSTRAINT ${fk_name} FOREIGN KEY (${relation.column}) REFERENCES ${relation.table_name}(${relation.referenced_column})`;
                        if (relation.on_update) {
                            relationDefinition += ` ON UPDATE ${relation.on_update}`;
                        }
                        if (relation.on_delete) {
                            relationDefinition += ` ON DELETE ${relation.on_delete}`;
                        }
                        createTableQuery += `${relationDefinition},`;
                    }
                }
                // Remove the trailing comma and newline
                createTableQuery = createTableQuery.slice(0, -1);
                createTableQuery += ');';
                allTableQuerries += createTableQuery;
            });
            allTableQuerries = useDbQuery + allTableQuerries;
            const conn = await db.connection();
            let new_result: any[] = [];
            console.log(allTableQuerries);
            const result = await conn?.query({ sql: allTableQuerries });
            Object.assign(new_result, result?.[0]);
            console.log(new_result);
            return;
        } catch (error) {
            console.log(error);
            return;
        }


    }
    static async genMigration(tables: any[]) {
        tables.forEach(element => {
            const tableInfo = getTableMetadata(element);
            const columns = getColumnMetadata(element);
            const relations = getRelationMetadata(element);
            if (tableInfo == undefined || columns == undefined) {
                return;
            }
            this.checkColumns(tableInfo);
            console.log(this.checkRelations(tableInfo));
            this.compareColumns(tableInfo, columns);
        });

    }
    static async checkColumns(tableInfo: Table) {
        const querry = SqlConstants.SHOW_TABLE_COLUMNS_QUERRY(tableInfo.name);
        const conn = await db.connection()
        const result = await conn?.query({ sql: querry });

        const columns = result?.[0] as RowDataPacket[];
        return columns.map((column: RowDataPacket) => {
            const tableColumn: TableColumn = {
                title: column.Field,
                data_type: column.Type,
                nullable: column.Null === "YES",
                default_value: column.Type == SqlDataType.BOOLEAN ? false : column.Default,
                is_primary_key: column.Key === "PRI",
            };
            return tableColumn;
        });
    }

    static async checkRelations(tableInfo: Table) {
        const querry = SqlConstants.SHOW_TABLE_RELATIONS_QUERRY(tableInfo.name);
        const conn = await db.connection()
        const result = await conn?.query({ sql: querry });
        const columns = result?.[0] as RowDataPacket[];

        return columns.map((column: RowDataPacket) => {
            const tableRelation: TableRelation = {
                table_name: column.REFERENCED_TABLE_NAME,
                column: column.COLUMN_NAME,
                referenced_column: column.REFERENCED_COLUMN_NAME,
                foreign_key_name: column.CONSTRAINT_NAME,
                on_update: column.UPDATE_RULE,
                on_delete: column.DELETE_RULE,
            };
            return tableRelation;
        });

        //TEST EDILECEK
    }

    static async compareColumns(tableInfo: Table, columns: any[]) {
        const existingColumns = await this.checkColumns(tableInfo);
        const modifiedColumns: TableColumn[] = [];
        const removedColumns: TableColumn[] = [];
        const addedColumns: TableColumn[] = [];

        const columnsArray = Object.values(columns);
        for (const existingColumn of existingColumns) {
            const modelColumn = columnsArray.find((col) => col.title === existingColumn.title);
            if (!modelColumn) {
                removedColumns.push(existingColumn);
            } else {
                // Compare column properties
                if (
                    existingColumn.data_type !== modelColumn.data_type ||
                    existingColumn.nullable !== modelColumn.nullable ||
                    existingColumn.default_value !== modelColumn.default_value
                ) {
                    modifiedColumns.push(modelColumn);
                }
            }
        }

        // Model columns that are not in the existing columns
        for (const modelColumn of columnsArray) {
            const existingColumn = existingColumns.find((col) => col.title === modelColumn.title);
            if (!existingColumn) {
                addedColumns.push(modelColumn);
            }
        }
        console.log(addedColumns);
        return {
            addedColumns,
            modifiedColumns,
            removedColumns,
        };
    }
}

