import { SqlDataType } from "@/constants/sql";

export class DatabaseTable {

    static TABLE = "database_table";
    static ALIAS = "dbt";

    static ID = "id";
    static NAME = {
        title: "name",
        type: SqlDataType.VARCHAR,
        nullable: false,
        default: null,
    }
    static ICON = {
        title: "icon",
        type: SqlDataType.VARCHAR,
        nullable: true,
        default: null,
    }
    static IS_HIDDEN = {
        title: "is_hidden",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: null,
    }
    static CAN_CREATE = {
        title: "can_create",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: null,
    }
    static CAN_UPDATE = {
        title: "can_create",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: null,
    }
}

export class Type {

    static TABLE = "type";
    static ALIAS = "t";

    static ID = "id";
    static NAME = {
        title: "name",
        type: SqlDataType.VARCHAR,
        nullable: false,
        default: null,
    }
    static TYPE_CATEGORY_ID = {
        title: "type_category_id",
        type: SqlDataType.INT,
        nullable: false,
        default: null,
    }

    static CATEGORY_INPUT_TYPE = 0;
    static CATEGORY_COLUMN_RELATION_TYPE = 1;
    static CATEGORY_DATABASE_TABLE_COLUMN_TYPE = 2;

}

export class DatabaseTableColumn {

    static TABLE = "database_table_column";
    static ALIAS = "dbtc";

    static ID = "id";
    static NAME = {
        title: "name",
        type: SqlDataType.VARCHAR,
        nullable: false,
        default: null,
    }
    static TABLE_ID = {
        title: "table_id",
        type: SqlDataType.INT,
        nullable: false,
        default: null,
    }
    static TYPE_ID = {
        title: "type_id",
        type: SqlDataType.INT,
        nullable: false,
        default: null,
    }
    static IS_PRIMARY = {
        title: "is_primary",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: false,
    }
    static IS_REQUIRED = {
        title: "is_required",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: false,
    }
    static IS_UNIQUE = {
        title: "is_unique",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: false,
    }
    static IS_HIDDEN = {
        title: "is_hidden",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: false,
    }
    static IS_FILTERABLE = {
        title: "is_filterable",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: false,
    }
    static IS_SEARCHABLE = {
        title: "is_searchable",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: false,
    }
    static IS_SORTABLE = {
        title: "is_sortable",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: false,
    }
    static INPUT_TYPE_ID = {
        title: "input_type_id",
        type: SqlDataType.INT,
        nullable: true,
        default: null,
    }
    static CREATE_CRUD_OPTION_ID = {
        title: "create_crud_option_id",
        type: SqlDataType.INT,
        nullable: true,
        default: null,
    }
    static UPDATE_CRUD_OPTION_ID = {
        title: "update_crud_option_id",
        type: SqlDataType.INT,
        nullable: true,
        default: null,
    }
    static READ_CRUD_OPTION_ID = {
        title: "read_crud_option_id",
        type: SqlDataType.INT,
        nullable: true,
        default: null,
    }

    static RELATIONS = [
        {
            table: DatabaseTable.TABLE,
            column: this.TABLE_ID.title,
            referenced_column: DatabaseTable.ID,
            foreign_key_name: "fk_" + this.ALIAS + "_" + this.TABLE_ID.title,
            on_update: "CASCADE",
            on_delete: "CASCADE",
        },
        {
            table: Type.TABLE,
            column: this.TYPE_ID.title,
            referenced_column: Type.ID,
            foreign_key_name: "fk_" + this.ALIAS + "_" + this.TYPE_ID.title,
            on_update: "CASCADE",
            on_delete: "CASCADE",
        },
        {
            table: Type.TABLE,
            column: this.INPUT_TYPE_ID.title,
            referenced_column: Type.ID,
            foreign_key_name: "fk_" + this.ALIAS + "_" + this.INPUT_TYPE_ID.title,
            on_update: "CASCADE",
            on_delete: "CASCADE",
        }
    ]
}

export class ColumnRelation {

    static TABLE = "column_relation";
    static ALIAS = "cr";

    static ID = "id";
    static TABLE_ID = {
        title: "table_id",
        type: SqlDataType.INT,
        nullable: false,
        default: null,
    }
    static REFERENCED_TABLE_ID = {
        title: "referenced_table_id",
        type: SqlDataType.INT,
        nullable: false,
        default: null,
    }
    static PIVOT_TABLE_ID = {
        title: "pivot_table_id",
        type: SqlDataType.INT,
        nullable: true,
        default: null,
    }
    static COLUMN_ID = {
        title: "column_id",
        type: SqlDataType.INT,
        nullable: false,
        default: null,
    }
    static REFERENCED_COLUMN_ID = {
        title: "referenced_column_id",
        type: SqlDataType.INT,
        nullable: false,
        default: null,
    }
    static RELATION_TYPE_ID = {
        title: "relation_type_id",
        type: SqlDataType.INT,
        nullable: false,
        default: null,
    }
    static FOREIGN_KEY_NAME = {
        title: "foreign_key_name",
        type: SqlDataType.VARCHAR,
        nullable: true,
        default: null,
    }

    static RELATIONS = [
        {
            table: DatabaseTable.TABLE,
            column: this.TABLE_ID.title,
            referenced_column: DatabaseTable.ID,
            foreign_key_name: "fk_" + this.ALIAS + "_" + this.TABLE_ID.title,
            on_update: "CASCADE",
            on_delete: "CASCADE",
        },
        {
            table: DatabaseTable.TABLE,
            column: this.REFERENCED_TABLE_ID.title,
            referenced_column: DatabaseTable.ID,
            foreign_key_name: "fk_" + this.ALIAS + "_" + this.REFERENCED_TABLE_ID.title,
            on_update: "CASCADE",
            on_delete: "CASCADE",
        },
        {
            table: DatabaseTable.TABLE,
            column: this.PIVOT_TABLE_ID.title,
            referenced_column: DatabaseTable.ID,
            foreign_key_name: "fk_" + this.ALIAS + "_" + this.PIVOT_TABLE_ID.title,
            on_update: "CASCADE",
            on_delete: "CASCADE",
        },
        {
            table: DatabaseTableColumn.TABLE,
            column: this.COLUMN_ID.title,
            referenced_column: DatabaseTableColumn.ID,
            foreign_key_name: "fk_" + this.ALIAS + "_" + this.COLUMN_ID.title,
            on_update: "CASCADE",
            on_delete: "CASCADE",
        },
        {
            table: DatabaseTableColumn.TABLE,
            column: this.REFERENCED_COLUMN_ID.title,
            referenced_column: DatabaseTableColumn.ID,
            foreign_key_name: "fk_" + this.ALIAS + "_" + this.REFERENCED_COLUMN_ID.title,
            on_update: "CASCADE",
            on_delete: "CASCADE",
        }
    ]
}

export class CrudOption {

    static TABLE = "crud_option";
    static ALIAS = "co";

    static ID = "id";
    static IS_HIDDEN = {
        title: "is_hidden",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: false,
    }
    static IS_REQUIRED = {
        title: "is_required",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: false,
    }
    static IS_READONLY = {
        title: "is_readonly",
        type: SqlDataType.BOOLEAN,
        nullable: true,
        default: false,
    }
    static INPUT_TYPE_ID = {
        title: "input_type_id",
        type: SqlDataType.INT,
        nullable: true,
        default: null,
    }

    static RELATIONS = [
        {
            table: Type.TABLE,
            column: this.INPUT_TYPE_ID.title,
            referenced_column: Type.ID,
            foreign_key_name: "fk_" + this.ALIAS + "_" + this.INPUT_TYPE_ID.title,
            on_update: "CASCADE",
            on_delete: "CASCADE",
        }
    ]
}



export class Option {

    static TABLE = "option";
    static ALIAS = "o";

    static ID = "id";
    static LABEL = {
        title: "label",
        type: SqlDataType.VARCHAR,
        nullable: false,
        default: null,
    }
    static VALUE = {
        title: "value",
        type: SqlDataType.VARCHAR,
        nullable: false,
        default: null,
    }
    static ICON = {
        title: "icon",
        type: SqlDataType.VARCHAR,
        nullable: true,
        default: null,
    }
    static COLUMN_ID = {
        title: "column_id",
        type: SqlDataType.INT,
        nullable: true,
        default: null,
    }

    static RELATIONS = [
        {
            table: DatabaseTableColumn.TABLE,
            column: this.COLUMN_ID.title,
            referenced_column: DatabaseTableColumn.ID,
            foreign_key_name: "fk_" + this.ALIAS + "_" + this.COLUMN_ID.title,
            on_update: "CASCADE",
            on_delete: "CASCADE",
        }
    ]
}

export class Page {

    static TABLE = "page";
    static ALIAS = "p";

    static ID = "id";
    static TITLE = "title";
    static DESC = "description";
    static IMAGE = "image";
    static SLUG = "slug";
    static CONFIG_ID = "config_id";
    static LANGUAGE_CODE = "language_code";
    static BACKGROUND_IMG = "background_image";

}

export class PageComponent {

    static TABLE = "page_component";
    static ALIAS = "pc";

    static ID = "id";
    static PAGE_ID = "page_id";
    static COMPONENT_ID = "component_id";
    static VALUE = "value";
    static INDEX = "index";
    static CSS = "css";
}

export class PageConfig {

    static TABLE = "page_config";
    static ALIAS = "pc";

    static ID = "id";
    static TITLE = "title";
    static CSS = "css";

}