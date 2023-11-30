import { SqlConstants } from "@/constants/sql";
import { db } from "@/orm/mysql/connection";

// Yeni veri oluşturur.
export async function POST(
  request: Request,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  try {
    const conn = await db.connection();
    const res = await request.json();
    const result = conn?.query({
      sql: SqlConstants.INSERT_QUERRY(table_name, res.body),
    });
    return new Response(JSON.stringify({ status: "success", output: result }));
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}

// TÜm verileri döner
export async function GET(
  request: Request,
  { params }: { params: { table_name: string } }
) {
  const table_name = params.table_name;
  try {
    const conn = await db.connection();
    const result = await conn?.query({
      sql: SqlConstants.SELECT_ALL_QUERY(table_name),
    });
    console.log(result);
    return new Response(JSON.stringify(result?.[0]));
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}
