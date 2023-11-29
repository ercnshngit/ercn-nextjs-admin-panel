import { SqlDataType } from "../../../../constants/sql";
import { BaseModel } from "../../base/base.model";
import { Column, Model, Relation } from "../../decorators";

@Model({ name: "block_component_prop", alias: "bcomp_prop", references: ["prop", "block_component"] })
export class BlockComponentProp extends BaseModel {
    static TABLE = "block_component_prop";
    static ALIAS = "bcomp_prop";

    constructor() {
        super(BlockComponentProp);
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
        title: "block_component_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    @Relation({
        table_name: "block_component",
        column: "block_component_id",
        referenced_column: "id",
        foreign_key_name: "fk_block_component_prop_block_component_id",
        on_update: "CASCADE",
        on_delete: "CASCADE",
    })
    block_component_id?: number;

    @Column({
        title: "prop_id",
        data_type: SqlDataType.INT,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    @Relation({
        table_name: "prop",
        column: "prop_id",
        referenced_column: "id",
        foreign_key_name: "fk_block_component_prop_prop_id",
        on_update: "CASCADE",
        on_delete: "CASCADE",
    })
    prop_id?: number;

    @Column({
        title: "value",
        data_type: SqlDataType.VARCHAR,
        nullable: false,
        default_value: null,
        is_primary_key: false
    })
    value?: string;

}