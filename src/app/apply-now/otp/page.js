"use client";
import { useState, useEffect } from "react";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [timer, setTimer] = useState(120); // 2-minute timer
  const [canResend, setCanResend] = useState(false);

  // Timer countdown logic
  useEffect(() => {
    let countdown;
    if (isOTPSent && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [isOTPSent, timer]);

  const handleSendOTP = async () => {
    const response = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      alert("OTP sent to your email!");
      setIsOTPSent(true);
      setTimer(120);
      setCanResend(false);
    } else {
      alert("Failed to send OTP!");
    }
  };

  const handleSubmit = () => {
    console.log("Entered OTP:", otp);
    alert("OTP Submitted!");
  };

  return (
    <div className="flex justify-center items-center content-center min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-center text-xl font-semibold mb-4">
          {isOTPSent
            ? "Enter the OTP sent to your email:"
            : "Enter your email to receive an OTP"}
        </h2>

        {!isOTPSent ? (
          <div className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSendOTP}
              className="ml-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1">OTP:-</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter OTP"
              required
            />
            <div className="flex justify-between items-center">
              <button
                onClick={handleSendOTP}
                disabled={!canResend}
                className={`border px-4 py-2 rounded-md ${
                  canResend
                    ? "border-primary text-primary hover:bg-gray-100"
                    : "border-gray-300 text-gray-400 cursor-not-allowed"
                }`}
              >
                {canResend
                  ? "Resend OTP"
                  : `Resend OTP (${Math.floor(timer / 60)}:${
                      timer % 60 < 10 ? "0" : ""
                    }${timer % 60})`}
              </button>
              <button
                onClick={handleSubmit}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90"
              >
                Submit
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Disclaimer: OTP is valid for 5 minutes. Please do not share your
              OTP with anyone.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
