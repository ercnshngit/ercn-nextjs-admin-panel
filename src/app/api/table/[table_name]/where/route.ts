import { SqlConstants } from "@/constants/sql";
import { db } from "@/orm/mysql/connection";

export async function POST(
    request: Request,
    { params }: { params: { table_name: string } }
    ) {
    const table_name = params.table_name
    try {
        const conn = await db.connection();
        const res = await request.json()
        let where : string = "";
        res.body.forEach((element: { key: string; value: string; }) => {
            where += element.key + " = '" + element.value + "' AND ";
        });
        where = where.substring(0, where.length - 4);
        const result = await conn?.query({ sql : SqlConstants.SELECT_ALL_WITH_WHERE_QUERRY(table_name,where) });
        return new Response(JSON.stringify(result?.[0]));
    } catch (error) {
        return new Response(JSON.stringify({status : "error" , message : error}));
    }
  }