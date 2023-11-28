import { SqlDataType } from "../../../../constants/sql";
import { Column, Model } from "../../decorators";

@Model({ name: "prop", alias: "prop" })
export class Prop {
    static TABLE = "prop";
    static ALIAS = "prop";

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