import { SqlConstants } from "@/constants/sql";
import { db } from "@/lib/database/connection";

// Bir veritabanındakı tablo isimlerini , kolon isimlerini ve kolon tiplerini döndürür.
export async function GET(request: Request) {
  try {
    const conn = await db.connection();
    let new_result: any[] = [];
    const result = await conn?.query({ sql: "SELECT table_name as 'table_name' , JSON_ARRAYAGG(JSON_OBJECT('name',column_name , 'type' , data_type)) as 'columns' from information_schema.columns WHERE table_schema ='" + process.env.DB_NAME + "' GROUP BY table_name" });
    Object.assign(new_result, result?.[0]);
    new_result.forEach(element => {
      element.columns = JSON.parse(element.columns);
      element.columns.forEach((table_element: { [x: string]: string; type: string; }) => {
        const type = table_element.type;
        // Veri Kontrolü ve dönüşüm alanı
        if (["int", "bigint", "tinyint"].includes(type)) {
          table_element.type = "number";
        } else if (["varchar", "datetime"].includes(type)) {
          table_element.type = "string";
        } else if (["text", "long"].includes(type)) {
          table_element.type = "string";
          table_element["inputType"] = "textarea";
        }
        // ------------------------------
      });
    });
    return new Response(JSON.stringify(new_result));
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}

