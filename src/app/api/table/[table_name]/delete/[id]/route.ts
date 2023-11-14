import { SqlConstants } from "@/constants/sql";
import { db } from "@/lib/database/connection";

export async function GET(
    request: Request,
    { params }: { params: { table_name: string , id: number } }
  ) {
    const table_name = params.table_name
    const id = params.id 
    try {
        const conn = await db.connection();
        const result = await conn?.query({ sql : SqlConstants.DELETE_WITH_ID_QUERRY(table_name,id) });
        return new Response(JSON.stringify(result?.[0]));
    } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));        
    }
  }