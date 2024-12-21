import { fetchData } from "@/lib/queries";

export async function POST(req) {
  try {
    const { table, conditions, limit = 10 } = await req.json();

    if (!table) {
      return new Response(
        JSON.stringify({ success: false, message: "Table name is required." }),
        { status: 400 }
      );
    }

    const rows = await fetchData(table, conditions || {}, limit);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Data fetched successfully.",
        data: rows,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error.",
      }),
      { status: 500 }
    );
  }
}
