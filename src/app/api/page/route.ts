import { db } from "@/lib/database/connection";

export async function GET(request: Request) {
    /* async getPages(res) {
        const pages = await this.pageRepository.find({ relations: { page_config: true, page_component: true } });
        if (pages.length > 0) {
            try {                                                                                           // try catche alıyoruz ki parse ederken bir sorun yasarsa isleme devam etsın hatayoı yakalayıp.
                pages.forEach(element => {
                    if (element.content != null && element.content != undefined && element.content != '') {  // boş contentlerin kontrolu saglanıyor aksi taktide parse ederken hata patlatıyor.
                        element.content = JSON.parse(element.content);
                    }
                });
            } catch (error) {
                console.log(error.message);
            }
            return res.status(200).send(pages);
        }
        else return res.status(404).send({ message: 'Sayfa bulunamadı.' });
    }*/

    const conn = await db.connection();
    const pages = await conn?.query({ sql: `SELECT table_name as 'table_name' , JSON_ARRAYAGG(JSON_OBJECT('name',column_name , 'type' , data_type)) as 'columns' from information_schema.columns WHERE table_schema ='" + process.env.DB_NAME + "' GROUP BY table_name` });
    return new Response(JSON.stringify(pages));
}