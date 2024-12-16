"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Payment() {
  const [transactionId, setTransactionId] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const router = useRouter();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!user) {
        router.push("/login");
      }
    }, [router]);
  const handleConfirmPayment = () => {
    if (transactionId) {
      // Simulating payment confirmation
      setIsConfirmed(true);
    }
  };

  return (
    <div className="p-6 flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold text-primary mb-6">Payment</h1>
      <div className="bg-white shadow-md p-6 rounded-md">
        <label className="block mb-4">
          Enter Transaction ID:
          <input
            type="text"
            placeholder="Transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="border p-2 w-full rounded-md mt-2"
          />
        </label>
        <button
          onClick={handleConfirmPayment}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Confirm Payment
        </button>

        {isConfirmed && (
          <p className="text-primary mt-4">
            Payment confirmed successfully! 🎉
          </p>
        )}
      </div>
    </div>
  );
}
