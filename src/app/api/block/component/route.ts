import { db } from "@/orm/mysql/connection";

export async function POST(
    request: Request,
    { params }: { params: { id: number } }
) {
    const id = params.id;
    try {
        const conn = await db.connection();
        const res = await request.json();
        console.log('GELDİMMMMMM')
        return new Response(JSON.stringify({ status: "success" }));
    } catch (error) {
        return new Response(JSON.stringify({ status: "error", message: error }));
    }
}