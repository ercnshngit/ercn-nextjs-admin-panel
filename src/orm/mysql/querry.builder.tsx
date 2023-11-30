import { RowDataPacket } from "mysql2";
import { SqlConstants, SqlDataType } from "../../constants/sql";
import { db, sortTables } from "./connection";
import { getColumnMetadata, getRelationMetadata, getTableMetadata } from "../decarators/decorators";
import { Table, TableColumn, TableModel, TableRelation } from "../base/table.model";
import { config } from "dotenv";

config();
export default class QuerryBuilder {
    static async createTablesQuerry(): Promise<string | undefined | any> {
        let allTableDatas: any[] = [];
        let allTableQuerries: any[] = [];
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
            allTableQuerries.push(useDbQuery);
            allTableDatas.forEach((table: TableModel) => {
                if (!table.columns) {
                    table.columns = [];
                }
                const tableName = "`" + table.table_info?.name + "`";
                let createTableQuery = `CREATE TABLE IF NOT EXISTS ${table.table_info?.name} (`;
                for (const column_name in table.columns) {
                    if (table.columns.hasOwnProperty(column_name)) {
                        const column = table.columns[column_name];
                        if (column.title && column.data_type) {
                            const columnName = "`" + column.title + "`";
                            let columnDefinition = `${columnName} ${column.data_type}`;

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
                        const relationColumn = "`" + relation.column + "`";
                        let relationDefinition = '';
                        let fk_name = relation.foreign_key_name == undefined ? "fk_" + table.table_info?.name + "_" + relation.column : relation.foreign_key_name
                        relationDefinition += `CONSTRAINT ${fk_name} FOREIGN KEY (${relationColumn}) REFERENCES ${relation.table_name}(${relation.referenced_column})`;
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
                allTableQuerries.push(createTableQuery);
            });
            const conn = await db.connection();
            let new_result: any[] = [];
            allTableQuerries.forEach(async element => {
                const result = await conn.query({ sql: element });
                new_result.push(result?.[0]);
            });
            console.log(allTableQuerries);
            return;
        } catch (error) {
            console.log(error);
            return;
        }


    }
    static async genMigration(tables: any[]) {
        let allQueries: any[] = [];
        tables.forEach(async element => {
            const tableInfo = getTableMetadata(element);
            const columns = getColumnMetadata(element);
            const relations = getRelationMetadata(element);
            if (tableInfo == undefined || columns == undefined) {   // Table bilgisi yoksa çık.
                return;
            }
            if ((await this.checkTableExistence(tableInfo)) == 0) {   // Table yoksa oluştur.
                const createTableQuerry = this.createTableQuerry(tableInfo, columns, relations);
                if (createTableQuerry != '') {
                    allQueries.push(createTableQuerry);
                }
                allQueries.push(createTableQuerry);
                //console.log({ table_name: tableInfo.name, create_table_querry: createTableQuerry });
                return;
            }
            const differenceOfColumns = await this.compareColumns(tableInfo, columns);
            const differenceOfColumnsQuerry = this.createColumnDifferenceQuerry(tableInfo, differenceOfColumns);
            if (differenceOfColumnsQuerry != '') {
                allQueries.push(differenceOfColumnsQuerry);
            }

            if (relations != undefined) {                             // Relation var ise gir ve kontrol et.
                const differenceOfRelations = await this.compareRelations(tableInfo, relations);
                const differenceOfRelationsQuerry = this.createRelationDifferenceQuerry(tableInfo, differenceOfRelations);
                if (differenceOfRelationsQuerry != '') {
                    allQueries.push(differenceOfRelationsQuerry);
                }
                //console.log({ table_name: tableInfo.name, relations_difference: differenceOfRelations, relations_difference_querry: differenceOfRelationsQuerry });
            }
            //console.log({ table_name: tableInfo.name, columns_difference_querry: differenceOfColumnsQuerry });
        });
        const querriesArray = Object.values(allQueries);
        querriesArray.forEach((element: any) => {
            console.log(element);
        });
    }

    static async checkTableExistence(tableInfo: Table) {
        const querry = SqlConstants.IS_TABLE_EXISTS_QUERRY(tableInfo.name);
        const conn = await db.connection()
        const result = await conn?.query({ sql: querry });
        console.log("querry result: ", querry);
        const table = result?.[0] as RowDataPacket[];
        return table[0].STATUS;
    }

    static async checkDataExistence(tableName: string, where: string): Promise<boolean> {
        const querry = SqlConstants.SELECT_COUNT_QUERRY_WITH_WHERE(tableName, where);
        const conn = await db.connection()
        const result = await conn?.query({ sql: querry });
        const data = result?.[0] as RowDataPacket[];
        return data[0].STATUS == 0 ? false : true;
    }

    static async checkColumns(tableInfo: Table) {
        const querry = SqlConstants.SHOW_TABLE_COLUMNS_QUERRY(tableInfo.name);
        const conn = await db.connection()
        const result = await conn?.query({ sql: querry });
        const columns = result?.[0] as RowDataPacket[];
        if (!columns) return;
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

    static createTableQuerry(tableInfo: Table, columns: any[], relations: any[] | undefined) {
        const querry = SqlConstants.CREATE_TABLE_QUERRY(tableInfo.name, columns, relations);
        return querry;
    }

    static async checkRelations(tableInfo: Table) {
        const querry = SqlConstants.SHOW_TABLE_RELATIONS_QUERRY(tableInfo.name);
        const conn = await db.connection()
        const result = await conn?.query({ sql: querry });
        const relations = result?.[0] as RowDataPacket[];

        if (!relations) return;
        return relations.map((column: RowDataPacket) => {
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
        if (!existingColumns) return;
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
        return {
            addedColumns,
            modifiedColumns,
            removedColumns,
        };
    }

    static async compareRelations(tableInfo: Table, relations: any[]) {
        const existingRelations = await this.checkRelations(tableInfo);
        const modifiedRelations: TableRelation[] = [];
        const removedRelations: TableRelation[] = [];
        const addedRelations: TableRelation[] = [];

        const relationsArray = Object.values(relations);
        if (!existingRelations) return;
        for (const existingRelation of existingRelations) {

            const modelRelation = relationsArray.find((col) => col.column === existingRelation.column);

            if (!modelRelation) {
                removedRelations.push(existingRelation);
            } else {
                // Compare relation properties
                if (
                    existingRelation.table_name !== modelRelation.table_name ||
                    existingRelation.referenced_column !== modelRelation.referenced_column ||
                    existingRelation.foreign_key_name !== modelRelation.foreign_key_name ||
                    existingRelation.on_update !== modelRelation.on_update ||
                    existingRelation.on_delete !== modelRelation.on_delete
                ) {
                    modifiedRelations.push(modelRelation);
                }
            }
        }

        // Model columns that are not in the existing columns
        for (const modelRelation of relationsArray) {
            const existingRelation = existingRelations.find((col) => col.column === modelRelation.column);
            if (!existingRelation) {
                addedRelations.push(modelRelation);
            }
        }
        return {
            addedRelations,
            modifiedRelations,
            removedRelations,
        };
    }

    static createColumnDifferenceQuerry(tableInfo: Table, columns: any) {
        const { addedColumns, modifiedColumns, removedColumns } = columns;
        let querry = '';
        if (addedColumns.length > 0) {
            addedColumns.forEach((column: TableColumn) => {
                querry += SqlConstants.ADD_COLUMN_QUERRY(tableInfo.name, column);
            });
        }
        if (modifiedColumns.length > 0) {
            modifiedColumns.forEach((column: TableColumn) => {
                querry += SqlConstants.MODIFY_COLUMN_QUERRY(tableInfo.name, column);
            });
        }
        if (removedColumns.length > 0) {
            removedColumns.forEach((column: TableColumn) => {
                querry += SqlConstants.REMOVE_COLUMN_QUERRY(tableInfo.name, column);
            });
        }
        return querry;
    }

    static createRelationDifferenceQuerry(tableInfo: Table, relations: any) {
        const { addedRelations, modifiedRelations, removedRelations } = relations;
        let querry = '';
        if (addedRelations.length > 0) {
            addedRelations.forEach((relation: TableRelation) => {
                querry += SqlConstants.ADD_RELATION_QUERRY(tableInfo.name, relation);
            });
        }
        if (modifiedRelations.length > 0) {
            modifiedRelations.forEach((relation: TableRelation) => {
                querry += SqlConstants.MODIFY_RELATION_QUERRY(tableInfo.name, relation);
            });
        }
        if (removedRelations.length > 0) {
            removedRelations.forEach((relation: TableRelation) => {
                querry += SqlConstants.REMOVE_RELATION_QUERRY(tableInfo.name, relation);
            });
        }
        return querry;
    }
}

