"use client";
import React, { useState } from "react";

export default function Recovery() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isRecovered, setIsRecovered] = useState(false);

  const handleSendOtp = () => {
    if (email) {
      // Simulate OTP being sent
      setIsOtpSent(true);
      alert("A verification OTP has been sent to your email!");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      setIsRecovered(true);
    } else {
      alert("Incorrect OTP. Try again!");
    }
  };

  return (
    <div className="p-6 flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold text-primary mb-6">Account Recovery</h1>

      <div className="bg-white shadow-md p-6 rounded-md">
        {/* Email Input */}
        <label className="block mb-4">
          Enter your registered email:
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded-md mt-2"
          />
        </label>
        <button
          onClick={handleSendOtp}
          className="bg-[#09816B] text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Send OTP
        </button>

        {/* OTP Input */}
        {isOtpSent && (
          <div className="mt-4">
            <label className="block mb-4">
              Enter OTP:
              <input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 w-full rounded-md mt-2"
              />
            </label>
            <button
              onClick={handleVerifyOtp}
              className="bg-[#09816B] text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Success Message */}
        {isRecovered && (
          <div className="mt-6 text-primary">
            Your account details have been recovered successfully. 🎉
            <p>
              User ID: <strong>897676</strong>
            </p>
            <p>
              Password: <strong>******</strong> (Check your email for details)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
