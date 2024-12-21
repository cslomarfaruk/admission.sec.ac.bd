import { deleteData, fetchData } from "@/lib/queries";

export async function POST(req) {
  const { email, otp } = await req.json();

  try {
    const rows = await fetchData("otps", { email, otp_code: otp }, 1);
    console.log("Fetched Rows:", rows);

    if (!rows || rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid OTP." }),
        { status: 400 }
      );
    }

    const record = rows[0];
    const isExpired = new Date(record.expires_at) < new Date();

    if (isExpired) {
      await deleteData("otps", { email });
      return new Response(
        JSON.stringify({ success: false, message: "OTP expired." }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error validating OTP:", error.message);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error." }),
      { status: 500 }
    );
  }
}
