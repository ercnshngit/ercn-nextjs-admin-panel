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
}

export class SqlDataType {

    static BOOLEAN = "BOOLEAN";
    static INT = "INT";
    static SMALLINT = "SMALLINT";
    static TINYINT = "TINYINT";
    static BIGINT = "BIGINT";
    static REAL = "REAL";
    static DOUBLE = "DOUBLE";
    static CHAR = "CHAR";
    static VARCHAR = "VARCHAR";
    static TEXT = "TEXT";
    static DATE = "DATE";
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