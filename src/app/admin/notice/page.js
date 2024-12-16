"use client";
import React, { useState } from "react";

export default function AdminNotice() {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState("");

  const handleAddNotice = () => {
    if (newNotice) {
      setNotices([...notices, { id: notices.length + 1, text: newNotice }]);
      setNewNotice("");
    }
  };

  return (
    <div className="p-6 flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold text-[#09816B] mb-6">Manage Notices</h1>
      <div className="bg-primary rounded-lg p-4">
        {/* Notice Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newNotice}
            onChange={(e) => setNewNotice(e.target.value)}
            placeholder="Add a new notice"
            className="border p-2 w-full rounded-md"
          />
          <button
            onClick={handleAddNotice}
            className="bg-white text-primary hover:bg-cyan-300/80 px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>

        {/* Notices List */}
        <ul className="bg-white shadow-md p-4 rounded-md">
          {notices.map((notice) => (
            <li key={notice.id} className="border-b py-2 text-gray-700">
              {notice.text}
            </li>
          ))}
          {notices.length === 0 && (
            <p className="text-gray-500">No notices available.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
