import { SqlDataType } from "../../../../constants/sql";
import { BaseModel } from "../../base/base.model";
import { Column, Model, Relation } from "../../decarators/decorators";

@Model({ name: "block", alias: "b", references: ["types"] })
export class Block extends BaseModel {
    static TABLE = "block";
    static ALIAS = "b";

    constructor() {
        super(Block);
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
        title: "title",
        data_type: SqlDataType.VARCHAR,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    title?: string;

    @Column({
        title: "type_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    @Relation({
        table_name: "types",
        column: "type_id",
        referenced_column: "id",
        foreign_key_name: "fk_block_type_id",
        on_update: "CASCADE",
        on_delete: "CASCADE",
    })
    type_id?: number;
}