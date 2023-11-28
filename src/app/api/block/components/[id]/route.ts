import { SqlConstants } from "@/constants/sql";
import { Block } from "@/lib/database/models/block_models/block.model";
import { Types } from "@/lib/database/models/block_models/types.model";

// TÜm verileri döner
export async function GET(
    request: Request,
    { params }: { params: { id: number } }
) {
    const id = params.id;
    try {
        const block = new Block()
        const data = await block.find({
            where: "id = " + id, relation: {
                basic_relation: [{ class: Types, join_type: SqlConstants.LEFT_JOIN }]
            }
        });

        return new Response(JSON.stringify(data));
    } catch (error) {
        return new Response(JSON.stringify({ status: "error", message: error }));
    }
}
