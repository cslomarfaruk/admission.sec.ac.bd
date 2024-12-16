"use client";
import React from "react";

export default function AdminIssues() {
  const issues = [
    { id: 1, title: "Payment Error", status: "Open" },
    { id: 2, title: "Login Issue", status: "Resolved" },
    { id: 3, title: "Form Submission Bug", status: "Pending" },
  ];

  return (
    <div className="p-6 flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-primary mb-6">Reported Issues</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-primary text-white">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Issue</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id} className="border-b text-gray-700">
                <td className="py-2 px-4 text-center">{issue.id}</td>
                <td className="py-2 px-4 text-center">{issue.title}</td>
                <td
                  className={`py-2 px-4 text-center ${
                    issue.status === "Resolved"
                      ? "text-green-600"
                      : issue.status === "Pending"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {issue.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
