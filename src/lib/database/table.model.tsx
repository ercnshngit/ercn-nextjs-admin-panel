export class TableModel {
    constructor(table_info: Table, columns?: TableColumn[] | undefined, relations?: TableRelation[] | undefined) {

        this.table_info = table_info;
        this.references = relations;
        this.columns = columns;
        columns === undefined ? this.columns = [] : this.columns = columns;
        relations === undefined ? this.references = [] : this.references = relations;
    }

    jsonConverter(): string {
        return JSON.stringify(this);
    }

    table_info: Table;
    columns: TableColumn[] | undefined;
    references: TableRelation[] | undefined;
}

export interface Table {
    name: string;
    alias?: string;
    references?: string[];
}

export interface TableColumn {
    title?: string;
    data_type?: string;
    nullable?: boolean;
    default_value?: any | undefined | null;
    class?: any;
    is_primary_key?: boolean;
}

export interface TableRelation {
    table_name?: string,
    column: string,
    referenced_column?: string,
    foreign_key_name?: string | undefined,
    on_update?: string | "NO ACTION",
    on_delete?: string | "NO ACTION"
}
