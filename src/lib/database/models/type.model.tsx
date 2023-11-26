import { SqlDataType } from "../../../constants/sql";
import { Model, Column } from "../decorators";

@Model({ name: "type", alias: "t" })
export class Type {
    static TABLE = "type";
    static ALIAS = "t";

    static CATEGORY_INPUT_TYPE = 0;
    static CATEGORY_COLUMN_RELATION_TYPE = 1;
    static CATEGORY_DATABASE_TABLE_COLUMN_TYPE = 2;

    @Column({
        title: "id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: true
    })
    id?: number;

    @Column({
        title: "name",
        data_type: SqlDataType.VARCHAR,
        nullable: false,
        default_value: null,
    })
    name?: string;

    @Column({
        title: "type_category_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null
    })
    type_category_id?: number;
}