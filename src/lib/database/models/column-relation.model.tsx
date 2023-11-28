import { SqlDataType, SqlConstants } from "../../../constants/sql";
import { Column, Model, Relation } from "../decorators";

@Model({ name: "column_relation", alias: "cr", references: ["database_table_column", "database_table", "type"] })
export class ColumnRelation {

    static TABLE = "column_relation";
    static ALIAS = "cr";

    @Column({
        title: "id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: true
    })
    id?: number;

    @Column({
        title: "table_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
    })
    @Relation({
        table_name: "database_table",
        column: "table_id",
        referenced_column: "id",
        foreign_key_name: "fk_cr_table_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    table_id?: number;

    @Column({
        title: "referenced_table_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
    })
    @Relation({
        table_name: "database_table",
        column: "referenced_table_id",
        referenced_column: "id",
        foreign_key_name: "fk_cr_referenced_table_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    referenced_table_id?: number;

    @Column({
        title: "pivot_table_id",
        data_type: SqlDataType.INT,
        nullable: true,
        default_value: null,
    })
    @Relation({
        table_name: "database_table",
        column: "pivot_table_id",
        referenced_column: "id",
        foreign_key_name: "fk_cr_pivot_table_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    pivot_table_id?: number;

    @Column({
        title: "column_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
    })
    @Relation({
        table_name: "database_table_column",
        column: "column_id",
        referenced_column: "id",
        foreign_key_name: "fk_cr_column_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    column_id?: number;

    @Column({
        title: "referenced_column_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
    })
    @Relation({
        table_name: "database_table_column",
        column: "referenced_column_id",
        referenced_column: "id",
        foreign_key_name: "fk_cr_referenced_column_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    referenced_column_id?: number;

    @Column({
        title: "relation_type_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
    })
    @Relation({
        table_name: "data_type",
        column: "relation_type_id",
        referenced_column: "id",
        foreign_key_name: "fk_cr_relation_type_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    relation_type_id?: number;

    @Column({
        title: "foreign_key_name",
        data_type: SqlDataType.VARCHAR,
        nullable: true,
        default_value: null,
    })
    foreign_key_name?: string;
}