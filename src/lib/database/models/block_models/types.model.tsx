import { SqlDataType } from "../../../../constants/sql";
import { BaseModel } from "../../base/base.model";
import { Column, Model } from "../../decorators";

@Model({ name: "types", alias: "t" })
export class Types extends BaseModel {
    static TABLE = "types";
    static ALIAS = "t";

    constructor() {
        super(Types);
    }

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
        is_primary_key: false
    })
    name?: string;

    @Column({
        title: "table_name",
        data_type: SqlDataType.VARCHAR,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    table_name?: string;
}