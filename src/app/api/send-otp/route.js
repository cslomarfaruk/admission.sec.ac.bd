import nodemailer from "nodemailer";

export async function POST(req) {
  const { email } = await req.json();
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cslomarfaruk@gmail.com", // Your Gmail
      pass: "blim gvgv tyzx woow", // Replace with App Password
    },
  });

  const mailOptions = {
    from: "cslomarfaruk@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ success: true, message: "OTP sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send OTP!" }),
      { status: 500 }
    );
  }
}
