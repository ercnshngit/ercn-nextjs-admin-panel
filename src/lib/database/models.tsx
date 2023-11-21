export class DatabaseTable {

    static TABLE = "database_table";
    static ALIAS = "dbt";

    static ID = "id";
    static NAME = "name";
    static ICON = "icon";
    static IS_HIDDEN = "is_hidden";
    static CAN_CREATE = "can_create";
    static CAN_UPDATE = "can_update";

}

export class DatabaseTableColumn {

    static TABLE = "database_table_column";
    static ALIAS = "dbtc";

    static ID = "id";
    static NAME = "name";
    static TABLE_ID = "table_id"; // TABLE_ID --> DATABASE_TABLE (id)
    static TYPE_ID = "type_id"; // TYPE_ID --> TYPE (id)
    static IS_PRIMARY = "is_primary";
    static IS_REQUIRED = "is_required";
    static IS_UNIQUE = "is_unique";
    static IS_HIDDEN = "is_hidden";
    static IS_FILTERABLE = "is_filterable";
    static IS_SEARCHABLE = "is_searchable";
    static IS_SORTABLE = "is_sortable";
    static INPUT_TYPE_ID = "input_type_id"; // INPUT_TYPE_ID --> TYPE (id)
    static CREATE_CRUD_OPTION_ID = "create_crud_option_id"; // CREATE_CRUD_OPTION_ID --> CRUD_OPTION (id)
    static UPDATE_CRUD_OPTION_ID = "update_crud_option_id"; // UPDATE_CRUD_OPTION_ID --> CRUD_OPTION (id)
    static READ_CRUD_OPTION_ID = "read_crud_option_id"; // READ_CRUD_OPTION_ID --> CRUD_OPTION (id)

}

export class ColumnRelation {

    static TABLE = "column_relation";
    static ALIAS = "cr";

    static ID = "id";
    static TABLE_ID = "table_id"; // TABLE_ID --> DATABASE_TABLE (id)
    static REFERENCED_TABLE_ID = "referenced_table_id"; // REFERENCED_TABLE_ID --> DATABASE_TABLE (id)
    static PIVOT_TABLE_ID = "pivot_table_id"; // PIVOT_TABLE_ID --> DATABASE_TABLE (id) nullable
    static COLUMN_ID = "column_id"; // COLUMN_ID --> DATABASE_TABLE_COLUMN (id)
    static REFERENCED_COLUMN_ID = "referenced_column_id"; // REFERENCED_COLUMN_ID --> DATABASE_TABLE_COLUMN (id)
    static RELATION_TYPE_ID = "relation_type_id"; // RELATION_TYPE_ID --> TYPE (id)
    static FOREIGN_KEY_NAME = "foreign_key_name";

}

export class CrudOption {

    static TABLE = "crud_option";
    static ALIAS = "co";

    static ID = "id";
    static IS_HIDDEN = "is_hidden";
    static IS_REQUIRED = "is_required";
    static IS_READONLY = "is_readonly";
    static INPUT_TYPE_ID = "input_type_id"; // INPUT_TYPE_ID --> TYPE (id)

}

export class Type {

    static TABLE = "type";
    static ALIAS = "t";

    static ID = "id";
    static NAME = "name";
    static TYPE_CATEGORY_ID = "type_category_id";


    static CATEGORY_INPUT_TYPE = 0;
    static CATEGORY_COLUMN_RELATION_TYPE = 1;
    static CATEGORY_DATABASE_TABLE_COLUMN_TYPE = 2;

}

export class Option {

    static TABLE = "option";
    static ALIAS = "o";

    static ID = "id";
    static LABEL = "label";
    static VALUE = "value";
    static ICON = "icon";
    static COLUMN_ID = "column_id"; // COLUMN_ID --> DATABASE_TABLE_COLUMN (id)

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