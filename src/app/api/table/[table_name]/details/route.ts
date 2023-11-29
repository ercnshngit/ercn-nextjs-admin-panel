import { SqlConstants } from "@/constants/sql";
import { db } from "@/lib/database/connection";
import { CrudOption } from "@/lib/database/models/crud-option.model";
import { DatabaseTableColumn } from "@/lib/database/models/database-table-column.model";
import { DatabaseTable } from "@/lib/database/models/database-table.model";
import { DataType } from "@/lib/database/models/type.model";

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
        const result = await dataBase.find({
          select: "",
          relation:{
            basic_relation: [{ 
              class : DatabaseTableColumn , join_type: SqlConstants.LEFT_JOIN
            }],
            detailed_relation: [
            {
              join_type: SqlConstants.LEFT_JOIN, join_table_name: CrudOption.TABLE,
              join_table_alias: CrudOption.ALIAS+"1", join_table_column_name: "id",
              table_name: DatabaseTableColumn.TABLE,
              table_alias: DatabaseTableColumn.ALIAS,
              table_column_name: "create_crud_option_id",
            },
            {
              join_type: SqlConstants.LEFT_JOIN, join_table_name: CrudOption.TABLE,
              join_table_alias: CrudOption.ALIAS+"2", join_table_column_name: "id",
              table_name: DatabaseTableColumn.TABLE,
              table_alias: DatabaseTableColumn.ALIAS,
              table_column_name: "update_crud_option_id",
            },
            {
              join_type: SqlConstants.LEFT_JOIN, join_table_name: CrudOption.TABLE,
              join_table_alias: CrudOption.ALIAS+"3", join_table_column_name: "id",
              table_name: DatabaseTableColumn.TABLE,
              table_alias: DatabaseTableColumn.ALIAS,
              table_column_name: "read_crud_option_id",
            },
            {
              join_type: SqlConstants.LEFT_JOIN, join_table_name: DataType.TABLE,
              join_table_alias: DataType.ALIAS+"1", join_table_column_name: "id",
              table_name: DatabaseTableColumn.TABLE,
              table_alias: DatabaseTableColumn.ALIAS,
              table_column_name: "input_type_id",
            },
            {
              join_type: SqlConstants.LEFT_JOIN, join_table_name: DataType.TABLE,
              join_table_alias: DataType.ALIAS+"2", join_table_column_name: "id",
              table_name: DatabaseTableColumn.TABLE,
              table_alias: DatabaseTableColumn.ALIAS,
              table_column_name: "type_id",
            }
          ],
          }
        });
        console.log(result);
        return new Response(JSON.stringify(result));
    } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));        
    }
  }