interface DatabaseTableSchema {
    name: string;
    icon: string;
    is_hidden: boolean;
    can_create: boolean;
    can_update: boolean;
    columns: TableColumnInfo[];
}

interface TableColumnInfo {
    name: string;
    type: {
        name: string;
        type_category_id: number;
    };
    is_primary: boolean;
    is_required: boolean;
    is_unique: boolean;
    is_hidden: boolean;
    is_filterable: boolean;
    is_searchable: boolean;
    is_sortable: boolean;
    input_type: {
        name: string;
        type_category_id: number;
    };
    create_crud_option_id: {
        is_hidden: boolean;
        is_required: boolean;
        is_readonly: boolean;
        input_type: {
            name: string;
            type_category_id: number;
        };
    };
    update_crud_option_id: {
        is_hidden: boolean;
        is_required: boolean;
        is_readonly: boolean;
        input_type: {
            name: string;
            type_category_id: number;
        };
    };
    read_crud_option_id: {
        is_hidden: boolean;
        is_required: boolean;
        is_readonly: boolean;
        input_type: {
            name: string;
            type_category_id: number;
        };
    };
}