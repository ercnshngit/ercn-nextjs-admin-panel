import { SqlDataType, SqlConstants } from "../../../../constants/sql";
import { Column, Model, Relation } from "../../decarators/decorators";

@Model({
    name: "column_option",
    alias: "coo",
    references: ["database_table_column"]
})
export class ColumnOption {

    static TABLE = "column_option";
    static ALIAS = "coo";

    @Column({
        title: "id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: true
    })
    id?: number;

    @Column({
        title: "label",
        data_type: SqlDataType.VARCHAR,
        nullable: false,
        default_value: null,
    })
    label?: string;

    @Column({
        title: "value",
        data_type: SqlDataType.VARCHAR,
        nullable: false,
        default_value: null,
    })
    value?: string;

    @Column({
        title: "icon",
        data_type: SqlDataType.VARCHAR,
        nullable: true,
        default_value: null,
    })
    icon?: string;

    @Column({
        title: "column_id",
        data_type: SqlDataType.INT,
        nullable: true,
        default_value: null,
    })
    @Relation({
        table_name: "database_table_column",
        column: "column_id",
        referenced_column: "id",
        foreign_key_name: "fk_coo_column_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    column_id?: number;
}