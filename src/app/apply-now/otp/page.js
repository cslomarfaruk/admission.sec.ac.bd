"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OTPVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(true);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/delete-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: "otps",
          conditions: { email: email },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Data deleted successfully!");
      } else {
        alert(result.message || "Failed to delete data.");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("An error occurred while deleting data.");
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(errorData.error || "Failed to send OTP");
        return;
      }

      const data = await response.json();
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending OTP.");
    }
  };
  const handleInsert = async (table,data) => {
  
    const response = await fetch("/api/insert-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, data }),  
    });
  
    const result = await response.json();
    console.log(result);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/validate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
  
      const result = await response.json();

      if (response.ok) {
        alert("OTP validated successfully!");
        const data = JSON.parse(localStorage.getItem("user"));
        const {sscDetails,hscDetails,registration} = data;

        await handleInsert("results",{sscDetails,hscDetails,registration});
        await handleDelete();
        router.replace("/congratulation");
      } else {
        alert(result.message || "Failed to validate OTP.");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      alert("An error occurred while validating OTP.");
    }
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
