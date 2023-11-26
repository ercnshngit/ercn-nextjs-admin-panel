import { TableColumn, TableRelation } from "@/lib/database/table.model";
import { config } from "dotenv";

config();

export class SqlConstants {
    static SELECT = " SELECT ";
    static FROM = " FROM ";
    static WHERE = " WHERE ";
    static AND = " AND ";
    static OR = " OR ";
    static ORDER_BY = " ORDER BY ";
    static LIMIT = " LIMIT ";
    static OFFSET = " OFFSET ";
    static INSERT_INTO = " INSERT INTO ";
    static VALUES = " VALUES ";
    static UPDATE = " UPDATE ";
    static SET = " SET ";
    static DELETE_FROM = " DELETE FROM ";
    static COUNT = " COUNT ";
    static JOIN = " JOIN ";
    static ON = " ON ";
    static ASC = " ASC ";
    static DESC = " DESC ";
    static AS = " AS ";
    static INNER = " INNER ";
    static LEFT = " LEFT ";
    static RIGHT = " RIGHT ";
    static FULL = " FULL ";
    static OUTER = " OUTER ";
    static CROSS = " CROSS ";
    static NATURAL = " NATURAL ";
    static USING = " USING ";
    static GROUP_BY = " GROUP BY ";
    static HAVING = " HAVING ";
    static IN = " IN ";
    static NOT_IN = " NOT IN ";
    static BETWEEN = " BETWEEN ";
    static NOT_BETWEEN = " NOT BETWEEN ";
    static LIKE = " LIKE ";
    static NOT_LIKE = " NOT LIKE ";
    static ILIKE = " ILIKE ";
    static NOT_ILIKE = " NOT ILIKE ";
    static SIMILAR_TO = " SIMILAR TO ";
    static NOT_SIMILAR_TO = " NOT SIMILAR TO ";
    static IS_NULL = " IS NULL ";
    static IS_NOT_NULL = " IS NOT NULL ";
    static IS_TRUE = " IS TRUE ";
    static IS_NOT_TRUE = " IS NOT TRUE ";
    static IS_FALSE = " IS FALSE ";
    static IS_NOT_FALSE = " IS NOT FALSE ";
    static IS_UNKNOWN = " IS UNKNOWN ";
    static IS_NOT_UNKNOWN = " IS NOT UNKNOWN ";
    static ANY = " ANY ";
    static ALL = " ALL ";
    static SOME = " SOME ";
    static UNION = " UNION ";
    static UNION_ALL = " UNION ALL ";
    static SELECT_ALL = " * ";
    static SELECT_COUNT = " COUNT(*) ";
    static SELECT_DISTINCT = " DISTINCT ";
    static SELECT_DISTINCT_ON = " DISTINCT ON ";
    static CASCADE = "CASCADE";
    static RESTRICT = "RESTRICT";
    static NO_ACTION = "NO ACTION";
    static SHOW = " SHOW ";
    static COLUMNS = " COLUMNS ";
    static TABLES = " TABLES ";
    static TABLE_NAME = " TABLE_NAME ";
    static COLUMN_NAME = " COLUMN_NAME ";
    static CONSTRAINT_NAME = " CONSTRAINT_NAME ";
    static REFERENCED_TABLE_NAME = " REFERENCED_TABLE_NAME ";
    static REFERENCED_COLUMN_NAME = " REFERENCED_COLUMN_NAME ";
    static UPDATE_RULE = " UPDATE_RULE ";
    static DELETE_RULE = " DELETE_RULE ";
    static INFORMATION_SCHEMA_TABLES = " information_schema.TABLES ";
    static INFORMATION_SCHEMA_KEY_COLUMN_USAGE = " information_schema.KEY_COLUMN_USAGE ";
    static INFORMATION_SCHEMA_REFERENTIAL_CONSTRAINTS = " information_schema.REFERENTIAL_CONSTRAINTS ";
    static CONSTRAINT_SCHEMA = " CONSTRAINT_SCHEMA ";


    static SELECT_ALL_QUERRY(tableName: string) {
        return this.SELECT + this.SELECT_ALL + this.FROM + tableName;
    }

    static SELECT_ALL_WITH_WHERE_QUERRY(tableName: string, where: string) {
        return this.SELECT_ALL_QUERRY(tableName) + this.WHERE + where;
    }

    static SELECT_ALL_WITH_ID_QUERRY(tableName: string, id: number) {
        return this.SELECT_ALL_WITH_WHERE_QUERRY(tableName, "id = " + id);
    }

    static UPDATE_QUERRY_WITH_ID(tableName: string, set: string, id: number) {
        return this.UPDATE + tableName + this.SET + set + this.WHERE + "id = " + id;
    }

    static DELETE_WITH_ID_QUERRY(tableName: string, id: number) {
        return this.DELETE_FROM + tableName + this.WHERE + "id = " + id;
    }

    static ALTER_TABLE_QUERRY(tableName: string) {
        return "ALTER TABLE " + tableName + " ";
    }

    static INSERT_QUERRY(tableName: string, body: any) {
        let columns = " (";
        let values = " (";
        body.forEach((element: { key: string; value: string; }) => {
            columns += element.key + ", ";
            values += "'" + element.value + "', ";
        });
        columns = columns.substring(0, columns.length - 2) + ") ";
        values = values.substring(0, values.length - 2) + ") ";
        return this.INSERT_INTO + tableName + columns + this.VALUES + values;
    }


    static SHOW_TABLE_COLUMNS_QUERRY(tableName: string) {
        return this.SHOW + this.COLUMNS + this.FROM + tableName;
    }

    static IS_TABLE_EXISTS_QUERRY(tableName: string) {
        return this.SELECT + this.SELECT_COUNT + this.AS + "STATUS" + this.FROM + this.INFORMATION_SCHEMA_TABLES + this.WHERE + this.TABLE_NAME + " = '" + tableName + "'";
    }

    static CREATE_TABLE_QUERRY(tableName: string, columns: TableColumn[], relations: TableRelation[] | undefined) {
        let querry = "CREATE TABLE " + tableName + " (";
        const columnsArray = Object.values(columns);
        columnsArray.forEach((column: TableColumn) => {
            querry += column.title + " " + (column.data_type ? column.data_type : " ") + (column.nullable ? " NULL " : " NOT NULL ") + (column.default_value ? " DEFAULT " + column.default_value : "") + (column.is_primary_key ? " PRIMARY KEY AUTO_INCREMENT , " : ", ");
        });
        if(relations){
            const relationsArray = Object.values(relations);
            relationsArray.forEach((relation: TableRelation) => {
                querry += "CONSTRAINT " + relation.foreign_key_name + " FOREIGN KEY (" + relation.column + ") REFERENCES " + relation.table_name + "(" + relation.referenced_column + ") ON DELETE " + relation.on_delete + " ON UPDATE " + relation.on_update + ", ";
            });
        }
        querry = querry.substring(0, querry.length - 2) + ");";
        return querry;
    }

    static SHOW_TABLE_RELATIONS_QUERRY(tableName: string) {
        return this.SELECT +
            "kcu." + this.REFERENCED_COLUMN_NAME + ", " +
            "kcu." + this.COLUMN_NAME + ", " +
            "rc." + this.REFERENCED_TABLE_NAME + ", " +
            "rc." + this.TABLE_NAME + ", " +
            "rc." + this.CONSTRAINT_NAME + ", " +
            "rc." + this.UPDATE_RULE + ", " +
            "rc." + this.DELETE_RULE +
            this.FROM +
            this.INFORMATION_SCHEMA_KEY_COLUMN_USAGE + " kcu " +
            this.JOIN + this.INFORMATION_SCHEMA_REFERENTIAL_CONSTRAINTS + " rc " +
            this.WHERE +
            "rc." + this.CONSTRAINT_SCHEMA + " = '" + process.env.DB_NAME + "'" + this.AND +
            "kcu." + this.CONSTRAINT_SCHEMA + " = '" + process.env.DB_NAME + "'" + this.AND +
            "rc." + this.TABLE_NAME + " = '" + tableName + "'" + this.AND +
            "kcu." + this.TABLE_NAME + " = '" + tableName + "'" + this.AND +
            "rc." + this.CONSTRAINT_NAME + " = " + "kcu." + this.CONSTRAINT_NAME + this.AND +
            "rc." + this.REFERENCED_TABLE_NAME + this.IS_NOT_NULL + this.AND +
            "kcu." + this.REFERENCED_COLUMN_NAME + this.IS_NOT_NULL +
            this.GROUP_BY + "rc." + this.CONSTRAINT_NAME;
    }
    static ADD_COLUMN_QUERRY(tableName: string, column : TableColumn) {
        return this.ALTER_TABLE_QUERRY(tableName) + "ADD COLUMN " + column.title + " " + (column.data_type ? column.data_type : " ") + (column.nullable ? " NULL " : " NOT NULL ") + (column.default_value ? " DEFAULT " + column.default_value : "");
    }
    static MODIFY_COLUMN_QUERRY(tableName: string, column : TableColumn) {
        return this.ALTER_TABLE_QUERRY(tableName) + "MODIFY COLUMN " + column.title + " " + (column.data_type ? column.data_type : " ") + (column.nullable ? " NULL " : " NOT NULL ") + (column.default_value ? " DEFAULT " + column.default_value : "");
    }
    static REMOVE_COLUMN_QUERRY(tableName: string, column : TableColumn) {
        return this.ALTER_TABLE_QUERRY(tableName) + "DROP COLUMN " + column.title;
    }
    static ADD_RELATION_QUERRY(tableName: string, relation : TableRelation) {
        return this.ALTER_TABLE_QUERRY(tableName) + "ADD CONSTRAINT " + relation.foreign_key_name + " FOREIGN KEY (" + relation.column + ") REFERENCES " + relation.table_name + "(" + relation.referenced_column + ") ON DELETE " + relation.on_delete + " ON UPDATE " + relation.on_update;
    }
    static REMOVE_RELATION_QUERRY(tableName: string, relation : TableRelation) {
        return this.ALTER_TABLE_QUERRY(tableName) + "DROP FOREIGN KEY " + relation.foreign_key_name;
    }
    static MODIFY_RELATION_QUERRY(tableName: string, relation : TableRelation) {
        return this.ALTER_TABLE_QUERRY(tableName) + "DROP FOREIGN KEY " + relation.foreign_key_name + ", ADD CONSTRAINT " + relation.foreign_key_name + " FOREIGN KEY (" + relation.column + ") REFERENCES " + relation.table_name + "(" + relation.referenced_column + ") ON DELETE " + relation.on_delete + " ON UPDATE " + relation.on_update;
    }
}

export class SqlDataType {

    static BOOLEAN = "tinyint(1)";
    static INT = "int(11)";
    static SMALLINT = "SMALLINT";
    static TINYINT = "tinyint";
    static BIGINT = "BIGINT";
    static REAL = "REAL";
    static DOUBLE = "DOUBLE";
    static CHAR = "CHAR";
    static VARCHAR = "varchar(255)";
    static TEXT = "TEXT";
    static DATE = "DATE";
    static DATETIME = "datetime(6)";
    static TIME = "TIME";
    static TIMESTAMP = "TIMESTAMP";
    static BLOB = "BLOB";
    static CLOB = "CLOB";
    static UUID = "UUID";
    static JSON = "JSON";
    static JSONB = "JSONB";
    static XML = "XML";
    static ARRAY = "ARRAY";
    static RANGE = "RANGE";
    static ENUM = "ENUM";

}