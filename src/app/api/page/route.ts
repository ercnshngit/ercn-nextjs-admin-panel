import { db } from "@/lib/database/connection";
import { Page } from "@/lib/database/models";

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
  const pages = await conn?.query({ sql: `SELECT * FROM ${Page.TABLE}` });
  if (pages && pages.length > 0) {
    return new Response(JSON.stringify(pages));
  } else return new Response(JSON.stringify({ message: "Sayfa bulunamadı." }));
}
