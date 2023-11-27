import { SqlConstants } from "@/constants/sql";
import { db } from "@/lib/database/connection";
import { DatabaseTableColumn } from "@/lib/database/models/database-table-column.model";
import { DatabaseTable } from "@/lib/database/models/database-table.model";

export async function GET(
    request: Request,
    { params }: { params: { table_name: string } }
  ) {
    const table_name = params.table_name
    try {
        const conn = await db.connection();
        /*
        const joinQuerry = SqlConstants.JOIN_QUERRY_BUILDER([
          {
            join_type : SqlConstants.LEFT_JOIN , 
            join_table_name: DatabaseTableColumn.TABLE,
            join_table_alias: DatabaseTableColumn.ALIAS,
            join_table_column_name: "table_id",
            table_name: DatabaseTable.TABLE,
            table_alias: DatabaseTable.ALIAS,
            table_column_name: "id",
          }
        ]);      

        const mainQuerry = SqlConstants.SELECT_WITH_MULTIPLE_JOIN_QUERRY(DatabaseTable.TABLE,DatabaseTable.ALIAS,joinQuerry, DatabaseTable.ALIAS + "." + DatabaseTable.NAME +" = '" + table_name + "'")
        console.log(mainQuerry);
        const result = await conn?.query({ sql : mainQuerry });*/
        const dataBase = new DatabaseTable();
        const result = await dataBase.findAll()
        console.log(result);
        return new Response(JSON.stringify(result?.[0]));
    } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));        
    }
  }