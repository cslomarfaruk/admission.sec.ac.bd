"use client";
import React from "react";

export default function AdminApplicants() {
  const applicants = [
    { id: 1, name: "MD. Mehedi Hasan", roll: "210343", status: "Paid" },
    { id: 2, name: "Ashraful Alam", roll: "210344", status: "Unpaid" },
    { id: 3, name: "Mahmuda Akter", roll: "210345", status: "Paid" },
  ];

  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-primary mb-6">Applicants</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-primary text-white">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Roll</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id} className="border-b text-gray-700">
                <td className="py-2 px-4 text-center">{applicant.id}</td>
                <td className="py-2 px-4">{applicant.name}</td>
                <td className="py-2 px-4">{applicant.roll}</td>
                <td
                  className={`py-2 px-4 text-center ${
                    applicant.status === "Paid"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {applicant.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
