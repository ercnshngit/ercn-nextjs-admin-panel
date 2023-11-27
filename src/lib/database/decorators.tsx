import { Table, TableColumn, TableRelation } from "./table.model";
import "reflect-metadata";

export const COLUMN_METADATA_KEY = "custom:column";
export const RELATION_METADATA_KEY = "custom:relation";
export const MODEL_METADATA_KEY = "custom:model";

export function Column(columnInfo: TableColumn): any {
    return function (target: any, propertyKey: string) {
        const columns = Reflect.getMetadata(COLUMN_METADATA_KEY, target) || {};
        columns[propertyKey] = columnInfo;
        Reflect.defineMetadata(COLUMN_METADATA_KEY, columns, target);
    };
}

export function Relation(relationInfo: TableRelation): any {
    return function (target: any, propertyKey: string) {
        const relations = Reflect.getMetadata(RELATION_METADATA_KEY, target) || {};
        relations[propertyKey] = relationInfo;
        Reflect.defineMetadata(RELATION_METADATA_KEY, relations, target);
    };
}

export function Model(modelInfo: Table): any {
    return function (target: Function) {
        Reflect.defineMetadata(MODEL_METADATA_KEY, modelInfo, target.prototype);
    };
}

export function getTableMetadata(target: Function): Table | undefined {
    return Reflect.getMetadata(MODEL_METADATA_KEY, target.prototype);
}

export function getColumnMetadata(target: any): TableColumn[] | undefined {
    return Reflect.getMetadata(COLUMN_METADATA_KEY, target.prototype);
}

export function getRelationMetadata(target: any): TableRelation[] | undefined {
    return Reflect.getMetadata(RELATION_METADATA_KEY, target.prototype);
}