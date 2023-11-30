import { Prop } from "../../../../orm/models/block_models/prop.model";
import { db } from "@/orm/mysql/connection";

export async function POST(
    request: Request
) {
    try {
        const conn = await db.connection();
        const prop = new Prop();
        const body = await request.json();
        for (let i = 0; i < body.length; i++) {
            if (body[i].props.length < 1) {
                continue;
            }
            else {
                for (let j = 0; j < body[i].props.length; j++) {
                    console.log(`body[${i}].props[${j}]: `, body[i].props)
                    const checkPropExist = await prop.find({ where: Prop.ALIAS + ".key = '" + body[i].props[j].key + "'" });
                    if (checkPropExist.length < 1) { throw new Error("Prop not found") }
                }
            };
            console.log()
        }
        /*const bcomp_insert = conn?.query({
            sql: SqlConstants.INSERT_QUERRY(BlockComponent.TABLE, res.body),
        });*/

        return new Response(JSON.stringify({ status: "success" }));
    } catch (error) {
        return new Response(JSON.stringify({ status: "error", message: error }));
    }
}
