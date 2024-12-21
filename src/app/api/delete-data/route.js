import { deleteData } from "@/lib/queries";

export async function POST(req) {
  try {
    const { table, conditions } = await req.json(); // Expecting table name and conditions in the request body

    // Validate request body
    if (!table || !conditions || Object.keys(conditions).length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Table name and conditions are required.",
        }),
        { status: 400 }
      );
    }

    const result = await deleteData(table, conditions);

    if (result.affectedRows > 0) {
      return new Response(
        JSON.stringify({ success: true, message: "Data deleted successfully." }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "No data found to delete." }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting data:", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error.",
      }),
      { status: 500 }
    );
  }
}
