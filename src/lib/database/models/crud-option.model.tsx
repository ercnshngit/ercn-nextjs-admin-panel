import { SqlDataType, SqlConstants } from "../../../constants/sql";
import { Column, Model, Relation } from "../decorators";

@Model({ name: "crud_option", alias: "co", references: ["data_type"] })
export class CrudOption {

    static TABLE = "crud_option";
    static ALIAS = "co";

    @Column({
        title: "id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: true
    })
    id?: number;

    @Column({
        title: "is_hidden",
        data_type: SqlDataType.BOOLEAN,
        nullable: true,
        default_value: false,
    })
    is_hidden?: boolean;

    @Column({
        title: "is_required",
        data_type: SqlDataType.BOOLEAN,
        nullable: true,
        default_value: false,
    })
    is_required?: boolean;

    @Column({
        title: "is_readonly",
        data_type: SqlDataType.BOOLEAN,
        nullable: true,
        default_value: false,
    })
    is_readonly?: boolean;

    @Column({
        title: "input_type_id",
        data_type: SqlDataType.INT,
        nullable: true,
        default_value: null,
    })
    @Relation({
        table_name: "data_type",
        column: "input_type_id",
        referenced_column: "id",
        foreign_key_name: "fk_co_input_type_id",
        on_update: SqlConstants.CASCADE,
        on_delete: SqlConstants.CASCADE,
    })
    input_type_id?: number;
}