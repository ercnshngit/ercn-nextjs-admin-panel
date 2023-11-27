import { SqlConstants } from "@/constants/sql";
import { getMedia } from "@/services/media";

// TÜm verileri döner
export async function GET(
  request: Request,
  { params }: { params: { route: string } }
) {
  const route = params.route;
  try {
    const result = await getMedia({ directory: route });
    console.log(result);
    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error }));
  }
}
