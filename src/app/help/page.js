"use client";
import React, { useState } from "react";

export default function Help() {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your question has been submitted. We'll respond soon!");
    setQuestion("");
  };

  return (
    <div className="p-6 flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold text-primary mb-6">Help & Support</h1>

      <div className="bg-white shadow-md p-6 rounded-md">
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        <ul className="list-disc ml-5 mb-6 text-gray-700">
          <li>How can I recover my User ID or Password?</li>
          <li>Where can I confirm my payment?</li>
          <li>How do I contact support?</li>
        </ul>

        {/* Contact Form */}
        <h2 className="text-2xl font-semibold mb-4">Submit Your Question</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border p-2 w-full rounded-md mb-4 focus:outline-primary"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
