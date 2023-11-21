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
    static TABLE_ID = "table_id";
    static TYPE_ID = "type_id";
    static IS_PRIMARY = "is_primary";
    static IS_REQUIRED = "is_required";
    static IS_UNIQUE = "is_unique";
    static IS_HIDDEN = "is_hidden";
    static IS_FILTERABLE = "is_filterable";
    static IS_SEARCHABLE = "is_searchable";
    static IS_SORTABLE = "is_sortable";
    static INPUT_TYPE_ID = "input_type_id";
    static CREATE_CRUD_OPTION_ID = "create_crud_option_id";
    static UPDATE_CRUD_OPTION_ID = "update_crud_option_id";
    static READ_CRUD_OPTION_ID = "read_crud_option_id";

}

export class ColumnRelation {

    static TABLE = "column_relation";
    static ALIAS = "cr";

    static ID = "id";
    static TABLE_ID = "table_id";
    static REFERENCED_TABLE_ID = "referenced_table_id";
    static PIVOT_TABLE_ID = "pivot_table_id";
    static COLUMN_ID = "column_id";
    static REFERENCED_COLUMN_ID = "referenced_column_id";
    static RELATION_TYPE_ID = "relation_type_id";
    static FOREIGN_KEY_NAME = "foreign_key_name";

}

export class CrudOption {

    static TABLE = "crud_option";
    static ALIAS = "co";

    static ID = "id";
    static IS_HIDDEN = "is_hidden";
    static IS_REQUIRED = "is_required";
    static IS_READONLY = "is_readonly";
    static INPUT_TYPE_ID = "input_type_id";

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
    static COLUMN_ID = "column_id";

}