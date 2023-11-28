import { SqlDataType } from "../../../../constants/sql";
import { Column, Model } from "../../decorators";

@Model({ name: "deneme", alias: "d", references: ["database_table"] })
export class Deneme {
    static TABLE = "deneme";
    static ALIAS = "d";

    @Column({
        title: "id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: true
    })
    id?: number;
}