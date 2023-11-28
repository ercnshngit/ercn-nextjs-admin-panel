import { DatabaseTable } from "./models/database-table.model";

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
    alias: string;
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
    table_name: string,
    column: string,
    referenced_column: string,
    foreign_key_name: string | undefined,
    on_update?: string | "NO ACTION",
    on_delete?: string | "NO ACTION"
}



export interface DetatiledRelation {
    join_type: string,
    join_table_name: string,
    join_table_column_name: string,
    join_table_alias: string,
    table_name: string,
    table_column_name: string,
    table_alias: string
}

export interface BasicRelation {
    class: any,
    join_type: string,
}

export interface FindOptions {
    where?: string,
    order_by?: string,
    group_by?: string,
    limit?: number,
    relation?: {
        detailed_relation?: DetatiledRelation[],
        basic_relation?: BasicRelation[]
    },
}

export interface TableConfig extends DatabaseTable { }
