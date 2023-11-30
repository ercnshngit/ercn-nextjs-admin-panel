import { SqlConstants } from "@/constants/sql";
import { db } from "@/lib/database/connection";
import { CrudOption } from "@/lib/database/models/crud-option.model";
import { DatabaseTableColumn } from "@/lib/database/models/database-table-column.model";
import { formatDataFromResponseBody, formatDataFromSQLResult } from "@/lib/database/models/database-table.dto";
import { DatabaseTable } from "@/lib/database/models/database-table.model";
import { DataType } from "@/lib/database/models/type.model";
import QuerryBuilder from "@/lib/database/mysql/querry.builder";
import { Console } from "console";

export async function GET(
  request: Request,
) {
  try {
      const conn = await db.connection();
      const dataBase = new DatabaseTable();
      const result = await dataBase.find({
        select: 
          "dbt.id AS table_id, dbt.name AS table_name, dbt.icon AS table_icon, dbt.is_hidden AS table_is_hidden, dbt.can_create AS table_can_create, dbt.can_update AS table_can_update, \n" + 
          "dbtc.id AS column_id, dbtc.name AS column_name, dbtc.is_primary AS column_is_primary, dbtc.is_required AS column_is_required, dbtc.is_unique AS column_is_unique, dbtc.is_hidden AS column_is_hidden, dbtc.is_filterable AS column_is_filterable, dbtc.is_searchable AS column_is_searchable, dbtc.is_sortable AS column_is_sortable,\n" +
          "dt1.name AS input_type_name, dt1.id AS input_type_id, dt1.type_category_id AS input_type_category_id, \n "+
          "dt2.name AS type_name, dt2.id AS type_id , dt2.type_category_id AS type_category_id, \n" + 
          "co1.is_hidden AS create_option_is_hidden, co1.id AS create_option_id, co1.is_required AS create_option_is_required, co1.is_readonly AS create_option_is_readonly, dt3.name AS create_crud_input_type_name, dt3.id AS create_crud_input_type_id, dt3.type_category_id AS create_crud_input_type_category_id, \n" +
          "co2.is_hidden AS update_option_is_hidden, co2.id AS update_option_id, co2.is_required AS update_option_is_required, co2.is_readonly AS update_option_is_readonly, dt4.name AS update_crud_input_type_name, dt4.id AS update_crud_input_type_id, dt4.type_category_id AS update_crud_input_type_category_id, \n"+
          "co3.is_hidden AS read_option_is_hidden, co3.id AS read_option_id, co3.is_required AS read_option_is_required, co3.is_readonly AS read_option_is_readonly, dt5.name AS read_crud_input_type_name, dt5.id AS read_crud_input_type_id, dt5.type_category_id AS read_crud_input_type_category_id",
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
          },
          {
            join_type: SqlConstants.LEFT_JOIN, join_table_name: DataType.TABLE,
            join_table_alias: DataType.ALIAS+"3", join_table_column_name: "id",
            table_name: DatabaseTableColumn.TABLE,
            table_alias: DatabaseTableColumn.ALIAS,
            table_column_name: "input_type_id",
          },
          {
            join_type: SqlConstants.LEFT_JOIN, join_table_name: DataType.TABLE,
            join_table_alias: DataType.ALIAS+"4", join_table_column_name: "id",
            table_name: DatabaseTableColumn.TABLE,
            table_alias: DatabaseTableColumn.ALIAS,
            table_column_name: "input_type_id",
          },
          {
            join_type: SqlConstants.LEFT_JOIN, join_table_name: DataType.TABLE,
            join_table_alias: DataType.ALIAS+"5", join_table_column_name: "id",
            table_name: DatabaseTableColumn.TABLE,
            table_alias: DatabaseTableColumn.ALIAS,
            table_column_name: "input_type_id",
          },
        ],
        }
      });
      const formatted_result = formatDataFromSQLResult(result);
      console.log(formatted_result);
      return new Response(JSON.stringify(formatted_result));
    } catch (error) {
      return new Response(JSON.stringify({status : "error" , message : error}));        
    }
  }

  export async function POST(
    request: Request,
  ) {
    const body = await request.json();
    
    try {
      const conn = await db.connection();
      const formattedBody = formatDataFromResponseBody(body)
      const result = updateTableAndColumns(formattedBody);
      return new Response(JSON.stringify(result));
    } catch (error) {
      return new Response(JSON.stringify({ status: "error", message: error }));
    }
  }

  async function updateTableAndColumns(data : any) {
    try {
      const tableName = data.name;
      const tableId = data.id;
      const conn = await db.connection();
      // Güncellenecek tablo için sorgu
      const updateTableQuery = `${SqlConstants.UPDATE} ${DatabaseTable.TABLE} ${SqlConstants.SET} name = '${data.name}', icon = '${data.icon}', is_hidden = ${data.is_hidden}, can_create = ${data.can_create}, can_update = ${data.can_update} ${SqlConstants.WHERE} id = ${tableId};`;
      

      const result = await conn.query(updateTableQuery);
      console.log("result ::" , data);
      // Sütunları güncelle
      Object.values(data.columns);
      for (const column of data.columns) {
        const isAlreadyCreated = column.id != null ? await QuerryBuilder.checkDataExistence(DatabaseTableColumn.TABLE,`id = ${column.id}`) : false; // id bos gonderilirse yenı column
        console.log("isAlreadyCreated ::" , isAlreadyCreated);
        if(isAlreadyCreated){
          const updateColumnQuery = 
          SqlConstants.UPDATE + DatabaseTableColumn.TABLE + SqlConstants.AS + DatabaseTableColumn.ALIAS + SqlConstants.SET +
          DatabaseTableColumn.ALIAS+".name ='"+ column.name + "',\n" +
          DatabaseTableColumn.ALIAS+".is_primary =" + column.is_primary + ",\n" +
          DatabaseTableColumn.ALIAS+".is_required =" + column.is_required + ",\n" +
          DatabaseTableColumn.ALIAS+".is_unique =" + column.is_unique + ",\n" +
          DatabaseTableColumn.ALIAS+".is_hidden =" + column.is_hidden + ",\n" +
          DatabaseTableColumn.ALIAS+".is_filterable =" + column.is_filterable + ",\n" +
          DatabaseTableColumn.ALIAS+".is_searchable =" + column.is_searchable + ",\n" +
          DatabaseTableColumn.ALIAS+".type_id =" + (column.type != null ? column.type.id : null) + ",\n" +
          DatabaseTableColumn.ALIAS+".input_type_id =" +(column.input_type != null ? column.input_type.id : null) + ",\n" +
          DatabaseTableColumn.ALIAS+".create_crud_option_id =" + (column.create_crud_option_id != null ? column.create_crud_option_id.id : null) + ",\n" +
          DatabaseTableColumn.ALIAS+".update_crud_option_id = " + (column.update_crud_option_id != null ? column.update_crud_option_id.id : null) + ",\n" +
          DatabaseTableColumn.ALIAS+".read_crud_option_id =" + (column.read_crud_option_id != null ? column.read_crud_option_id.id : null) + "\n" +
          SqlConstants.WHERE + "\n" +
          DatabaseTableColumn.ALIAS+".id =" + column.id + ";";

          console.log("updateColumnQuery ::" , updateColumnQuery);
          const result = await conn.query(updateColumnQuery);
      }else{
          const createColumnQuery = `
          ${SqlConstants.INSERT_INTO} ${DatabaseTableColumn.TABLE} (
            name,
            is_primary,
            is_required,
            is_unique,
            is_hidden,
            is_filterable,
            is_searchable,
            type_id,
            input_type_id,
            create_crud_option_id,
            update_crud_option_id,
            read_crud_option_id,
            table_id
          )
          ${SqlConstants.VALUES} (
            '${column.name}',
            ${column.is_primary},
            ${column.is_required},
            ${column.is_unique},
            ${column.is_hidden},
            ${column.is_filterable},
            ${column.is_searchable},
            ${column.type != null ? column.type.id : null},
            ${column.input_type != null ? column.input_type.id : null},
            ${column.create_crud_option_id != null ? column.create_crud_option_id.id : null},
            ${column.update_crud_option_id != null ? column.update_crud_option_id.id : null},
            ${column.read_crud_option_id != null ? column.read_crud_option_id.id : null},
            ${tableId}
          );
        `;
          const result = await conn.query(createColumnQuery);
          console.log("createColumnQuery ::" , createColumnQuery);
        }
      }
  
      return { status: "success", message: "Tablo ve sütunlar başarıyla güncellendi." };
    } catch (error) {
      return { status: "error", message: error };
    }
  }