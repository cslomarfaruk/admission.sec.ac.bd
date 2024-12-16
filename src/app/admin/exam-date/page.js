"use client";
import React, { useState } from "react";

export default function AdminExamDate() {
  const [examDates, setExamDates] = useState([]);
  const [newExam, setNewExam] = useState({ date: "", subject: "" });

  const handleAddExamDate = () => {
    if (newExam.date && newExam.subject) {
      setExamDates([...examDates, { ...newExam, id: examDates.length + 1 }]);
      setNewExam({ date: "", subject: "" });
    }
  };

  return (
    <div className="p-6 flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold text-[#09816B] mb-6">Exam Schedule</h1>
      <div className="">
        {/* Input for Exam Date */}
        <div className="flex gap-2 mb-4">
          <input
            type="date"
            value={newExam.date}
            onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Subject Name"
            value={newExam.subject}
            onChange={(e) =>
              setNewExam({ ...newExam, subject: e.target.value })
            }
            className="border p-2 w-full rounded-md"
          />
          <button
            onClick={handleAddExamDate}
            className="bg-[#09816B] text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>

        {/* Exam Dates List */}
        <ul className="bg-white shadow-md p-4 rounded-md">
          {examDates.map((exam) => (
            <li key={exam.id} className="border-b py-2 text-gray-700">
              {exam.date} - {exam.subject}
            </li>
          ))}
          {examDates.length === 0 && (
            <p className="text-gray-500">No exam dates scheduled.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
