import { SqlDataType } from "../../../constants/sql";
import { BaseModel } from "../../base/base.model";
import { Column, Model } from "../../decarators/decorators";

@Model({ name: "prop", alias: "prop" })
export class Prop extends BaseModel {
    static TABLE = "prop";
    static ALIAS = "prop";

    constructor(connection?: any | undefined) {
        super(Prop, connection);
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
        title: "key",
        data_type: SqlDataType.VARCHAR,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    key?: string;

}