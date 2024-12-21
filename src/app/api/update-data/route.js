import { updateData } from "@/lib/queries";

export async function POST(req) {
  try {
    const { table, updates, conditions } = await req.json();

    if (!table || !updates || Object.keys(updates).length === 0 || !conditions) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Table name, updates, and conditions are required.",
        }),
        { status: 400 }
      );
    }

    const result = await updateData(table, updates, conditions);

    if (result.affectedRows > 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Data updated successfully.",
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No data matched the conditions.",
        }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating data:", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error.",
      }),
      { status: 500 }
    );
  }
}
