import { insertData } from "@/lib/queries";

export async function POST(req) {
  try {
    const { table, data } = await req.json();

    // Validate input
    if (!table || !data || Object.keys(data).length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Table name and data are required.",
        }),
        { status: 400 }
      );
    }

    const result = await insertData(table, data);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Data inserted successfully.",
        result,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting data:", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error.",
      }),
      { status: 500 }
    );
  }
}
