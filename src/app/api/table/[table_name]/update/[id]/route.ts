import { SqlConstants } from "@/constants/sql";
import { db } from "@/orm/mysql/connection";

export async function POST(
    request: Request,
    { params }: { params: { table_name: string , id : number } }
    ) { 
        const table_name = params.table_name
        const id = params.id 
        try {
            const conn = await db.connection();
            const res = await request.json()
            let set : string = "";
            res.body.forEach((element: { key: string; value: string; }) => {
                set += element.key + " = '" + element.value + "' , ";
            });
            set = set.substring(0, set.length - 2);
            const result = conn?.query({ sql : SqlConstants.UPDATE_QUERRY_WITH_ID(table_name,set,id) });
            return new Response(JSON.stringify({status : "success" , output : result}));
        } catch (error) {
            return new Response(JSON.stringify({status : "error" , message : error}));            
        }
    }