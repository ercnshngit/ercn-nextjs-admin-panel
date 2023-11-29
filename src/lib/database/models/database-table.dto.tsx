export interface DatabaseTableConfig {
    id: number;
    name: string;
    icon: string;
    is_hidden: boolean;
    can_create: boolean;
    can_update: boolean;
    columns: TableColumnInfo[];
}

export interface TableColumnInfo {
    id: null | number;
    name: string;
    type?: null | DataTypeDto;
    is_primary: boolean | false;
    is_required: boolean | false;
    is_unique: boolean | false;
    is_hidden: boolean | false;
    is_filterable: boolean | false;
    is_searchable: boolean | false;
    is_sortable: boolean | false;
    input_type?: null | DataTypeDto;
    create_crud_option_id?: null | CrudOptionDto;
    update_crud_option_id?: null | CrudOptionDto;
    read_crud_option_id?: null | CrudOptionDto;
}

export function formatDataFromSQLResult(data: any): DatabaseTableConfig | any {
    try {
        const isSqlResultArray = Array.isArray(data); // sql result mu yoksa body mi oldugunu ayrıstırmak ıcın
        const formattedData: DatabaseTableConfig = {
            id: isSqlResultArray ? data[0].table_id : data.id,
            name: isSqlResultArray ? data[0].table_name : data.name,
            icon: isSqlResultArray ? data[0].table_icon : data.icon,
            is_hidden: isSqlResultArray ? Boolean(data[0].table_is_hidden) : Boolean(data.is_hidden),
            can_create: isSqlResultArray ? Boolean(data[0].table_can_create) : Boolean(data.can_create),
            can_update: isSqlResultArray ? Boolean(data[0].table_can_update) : Boolean(data.can_update),
            columns: [],
        };
        // Assuming sqlResult.columns is an array of column information
        const result = Object.values(isSqlResultArray ? data : data.columns)
        formattedData.columns = result.map((column: any) => {
            const data: TableColumnInfo = {
                id: isSqlResultArray ? column.column_id : column.id,
                name: isSqlResultArray ? column.column_name : column.name,
                type: isSqlResultArray || column.type != null ? {
                    id: isSqlResultArray ? column.type_id : column.type.id,
                    name: isSqlResultArray ? column.type_name : column.type.name,
                    type_category_id: isSqlResultArray ? column.type_category_id : column.type.type_category_id,
                } : null,
                is_primary: isSqlResultArray ? Boolean(column.column_is_primary) : Boolean(column.is_primary),
                is_required: isSqlResultArray ? Boolean(column.column_is_required) : Boolean(column.is_required),
                is_unique: isSqlResultArray ? Boolean(column.column_is_unique) : Boolean(column.is_unique),
                is_hidden: isSqlResultArray ? Boolean(column.column_is_hidden) : Boolean(column.is_hidden),
                is_filterable: isSqlResultArray ? Boolean(column.column_is_filterable) : Boolean(column.is_filterable),
                is_searchable: isSqlResultArray ? Boolean(column.column_is_searchable) : Boolean(column.is_searchable),
                is_sortable: isSqlResultArray ? Boolean(column.column_is_sortable) : Boolean(column.is_sortable),
                input_type: isSqlResultArray || column.input_type != null ? {
                    id: isSqlResultArray ? column.input_type_id : column.input_type.id,
                    name: isSqlResultArray ? column.input_type_name : column.input_type.name,
                    type_category_id: isSqlResultArray ? column.input_type_category_id : column.input_type.type_category_id,
                } : null,
                create_crud_option_id: isSqlResultArray || column.create_crud_option_id != null ? {
                    id: isSqlResultArray ? column.create_crud_option_id : column.create_crud_option_id.id,
                    is_hidden: isSqlResultArray ? Boolean(column.create_option_is_hidden) : Boolean(column.create_crud_option_id.is_hidden),
                    is_required: isSqlResultArray ? Boolean(column.create_option_is_required) : Boolean(column.create_crud_option_id.is_required),
                    is_readonly: isSqlResultArray ? Boolean(column.create_option_is_readonly) : Boolean(column.create_crud_option_id.is_readonly),
                    input_type: isSqlResultArray && column.column.create_crud_input_type_id.input_type != null ? {
                        id: isSqlResultArray ? column.create_crud_input_type_id : column.create_crud_option_id.input_type.id,
                        name: isSqlResultArray ? column.create_crud_input_type_name : column.create_crud_option_id.input_type.name,
                        type_category_id: isSqlResultArray ? column.create_crud_input_type_category_id : column.create_crud_option_id.input_type.type_category_id,
                    } : null,
                } : null,
                update_crud_option_id: isSqlResultArray || column.update_crud_option_id != null ? {
                    id: isSqlResultArray ? column.update_crud_option_id : column.update_crud_option_id.id,
                    is_hidden: isSqlResultArray ? Boolean(column.update_option_is_hidden) : Boolean(column.update_crud_option_id.is_hidden),
                    is_required: isSqlResultArray ? Boolean(column.update_option_is_required) : Boolean(column.update_crud_option_id.is_required),
                    is_readonly: isSqlResultArray ? Boolean(column.update_option_is_readonly) : Boolean(column.update_crud_option_id.is_readonly),
                    input_type: isSqlResultArray || column.column.update_crud_option_id.input_type != null ? {
                        id: isSqlResultArray ? column.update_crud_input_type_id : column.update_crud_option_id.input_type.id,
                        name: isSqlResultArray ? column.update_crud_input_type_name : column.update_crud_option_id.input_type.name,
                        type_category_id: isSqlResultArray ? column.update_crud_input_type_category_id : column.update_crud_option_id.input_type.type_category_id,
                    } : null,
                } : null,
                read_crud_option_id: isSqlResultArray || column.update_crud_option_id != null ? {
                    id: isSqlResultArray ? column.read_crud_option_id : column.read_crud_option_id.id,
                    is_hidden: isSqlResultArray ? Boolean(column.read_option_is_hidden) : Boolean(column.read_crud_option_id.is_hidden),
                    is_required: isSqlResultArray ? Boolean(column.read_option_is_required) : Boolean(column.read_crud_option_id.is_required),
                    is_readonly: isSqlResultArray ? Boolean(column.read_option_is_readonly) : Boolean(column.read_crud_option_id.is_readonly),
                    input_type: isSqlResultArray || column.column.read_crud_option_id.input_type != null ? {
                        id: isSqlResultArray ? column.read_crud_input_type_id : column.read_crud_option_id.input_type.id,
                        name: isSqlResultArray ? column.read_crud_input_type_name : column.read_crud_option_id.input_type.name,
                        type_category_id: isSqlResultArray ? column.read_crud_input_type_category_id : column.read_crud_option_id.input_type.type_category_id,
                    } : null,
                } : null
            };
            if (column.input_type_id === null) {
                data.input_type = null;
            }
            if (column.type_id === null) {
                data.type = null;
            }
            if (column.create_crud_option_id === undefined) {
                data.create_crud_option_id = null;
            }
            if (data.create_crud_option_id !== undefined && data.create_crud_option_id !== null && column.create_crud_input_type_id === undefined) {
                data.create_crud_option_id.input_type = null;
            }
            if (column.update_crud_option_id === undefined) {
                data.update_crud_option_id = null;
            }
            if (data.update_crud_option_id !== undefined && data.update_crud_option_id !== null && column.update_crud_input_type_id === undefined) {
                data.update_crud_option_id.input_type = null;
            }
            if (column.read_crud_option_id === undefined) {
                data.read_crud_option_id = null;
            }
            if (data.read_crud_option_id !== undefined && data.read_crud_option_id !== null && column.read_crud_input_type_id === undefined) {
                data.read_crud_option_id.input_type = null;
            }
            return data;
        });
        return formattedData;
    } catch (error) {
        return { status: "error", message: error }
    }
}

export function formatDataFromResponseBody(responseBody: any): DatabaseTableConfig | any {
    const dataBaseTableSchema = formatDataFromSQLResult(responseBody);
    return dataBaseTableSchema;
}