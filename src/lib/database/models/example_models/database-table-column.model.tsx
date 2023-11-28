import { SqlDataType, SqlConstants } from "../../../../constants/sql";
import { BaseModel } from "../../base/base.model";
import { Model, Column, Relation } from "../../decorators";

@Model({ name: "database_table_column", alias: "dbtc", references: ["type", "crud_option"] })
export class DatabaseTableColumn extends BaseModel {

    static TABLE = "database_table_column";

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
        title: "table_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null
    })
    @Relation({
        table_name: "database_table",
        column: "table_id",
        referenced_column: "id",
        foreign_key_name: "fk_dbtc_table_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    table_id?: number;

    @Column({
        title: "type_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null
    })
    @Relation({
        table_name: "type",
        column: "type_id",
        referenced_column: "id",
        foreign_key_name: "fk_dbtc_type_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    type_id?: number;

    @Column({
        title: "is_primary",
        data_type: SqlDataType.BOOLEAN,
        nullable: true,
        default_value: false
    })
    is_primary?: boolean;

    @Column({
        title: "is_required",
        data_type: SqlDataType.BOOLEAN,
        nullable: true,
        default_value: false
    })
    is_required?: boolean;

    @Column({
        title: "is_unique",
        data_type: SqlDataType.BOOLEAN,
        nullable: true,
        default_value: false
    })
    is_unique?: boolean;

    @Column({
        title: "is_hidden",
        data_type: SqlDataType.BOOLEAN,
        nullable: true,
        default_value: false
    })
    is_hidden?: boolean;

    @Column({
        title: "is_filterable",
        data_type: SqlDataType.BOOLEAN,
        nullable: true,
        default_value: false
    })
    is_filterable?: boolean;

    @Column({
        title: "is_searchable",
        data_type: SqlDataType.BOOLEAN,
        nullable: true,
        default_value: false
    })
    is_searchable?: boolean;

    @Column({
        title: "is_sortable",
        data_type: SqlDataType.BOOLEAN,
        nullable: true,
        default_value: false
    })
    is_sortable?: boolean;

    @Column({
        title: "input_type_id",
        data_type: SqlDataType.INT,
        nullable: true,
        default_value: null
    })
    @Relation({
        table_name: "type",
        column: "input_type_id",
        referenced_column: "id",
        foreign_key_name: "fk_dbtc_input_type_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    input_type_id?: number;

    @Column({
        title: "create_crud_option_id",
        data_type: SqlDataType.INT,
        nullable: true,
        default_value: null
    })
    @Relation({
        table_name: "crud_option",
        column: "create_crud_option_id",
        referenced_column: "id",
        foreign_key_name: "fk_dbtc_create_crud_option_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    create_crud_option_id?: number;

    @Column({
        title: "update_crud_option_id",
        data_type: SqlDataType.INT,
        nullable: true,
        default_value: null
    })
    @Relation({
        table_name: "crud_option",
        column: "update_crud_option_id",
        referenced_column: "id",
        foreign_key_name: "fk_dbtc_update_crud_option_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    update_crud_option_id?: number;

    @Column({
        title: "read_crud_option_id",
        data_type: SqlDataType.INT,
        nullable: true,
        default_value: null
    })
    @Relation({
        table_name: "crud_option",
        column: "read_crud_option_id",
        referenced_column: "id",
        foreign_key_name: "fk_dbtc_read_crud_option_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    read_crud_option_id?: number;
}