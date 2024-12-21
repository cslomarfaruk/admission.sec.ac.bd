import { createConnection } from "@/lib/db.js";
import { insertData } from "@/lib/queries";
import nodemailer from "nodemailer";

let otpStorage = {};

export async function POST(req) {
  const { email } = await req.json();
  const otp = Math.floor(100000 + Math.random() * 900000);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cslomarfaruk@gmail.com",
      pass: "blim gvgv tyzx woow",
    },
  });

  const mailOptions = {
    from: "cslomarfaruk@gmail.com",
    to: email,
    subject: "Your OTP Code For SEC AT",
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);

    try {
      await insertData("otps", {
        email: email,
        otp_code: otp,
        expires_at: new Date(Date.now() + 5 * 60 * 1000),
        createdAt: new Date(),
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "OTP sent and stored successfully!",
          otpStorage,
        }),
        { status: 200 }
      );
    } catch (dbError) {
      console.error("Database Error:", dbError);
      return new Response(
        JSON.stringify({ success: false, message: "Database error!" }),
        { status: 500 }
      );
    }
  } catch (emailError) {
    console.error("Email Error:", emailError);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send OTP!" }),
      { status: 500 }
    );
  }
}
