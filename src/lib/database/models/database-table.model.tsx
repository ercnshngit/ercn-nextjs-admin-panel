import { SqlDataType } from "../../../constants/sql";
import { Model, Column } from "../decorators";

@Model({ name: "database_table", alias: "t" })
export class DatabaseTable{
    static TABLE = "database_table";
    static ALIAS = "dbt";

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
        title: "icon",
        data_type: SqlDataType.VARCHAR,
        nullable: false,
        default_value: null
    })
    icon?: string;

    @Column({
        title: "is_hidden",
        data_type: SqlDataType.BOOLEAN,
        nullable: false,
        default_value: false
    })
    is_hidden?: boolean;

    @Column({
        title: "can_create",
        data_type: SqlDataType.BOOLEAN,
        nullable: false,
        default_value: false
    })
    can_create?: boolean;

    @Column({
        title: "can_update",
        data_type: SqlDataType.BOOLEAN,
        nullable: false,
        default_value: false
    })
    can_update?: boolean;

}