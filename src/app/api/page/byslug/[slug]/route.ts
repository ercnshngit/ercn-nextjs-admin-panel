import { SqlConstants } from "@/constants/sql";
import { db } from "@/lib/database/connection";
import { Page } from "@/lib/database/models";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const conn = await db.connection();
    const where = "slug = '" + params.slug + "'";
    const result = await conn?.query({ sql: SqlConstants.SELECT_ALL_WITH_WHERE_QUERRY(Page.TABLE, where) });
    let page: any[] = []
    Object.assign(page, result?.[0])
    if (page.length > 0) {
        return new Response(JSON.stringify(page))
    }
    else return new Response(JSON.stringify({ message: 'Sayfa bulunamadı.' }));
}