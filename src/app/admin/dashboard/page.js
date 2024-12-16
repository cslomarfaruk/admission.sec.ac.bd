"use client";
import { useContext } from "react";
import { useResult } from "@/context/ResultContext"; // Context API for dynamic data
import AdminHeader from "@/components/elements/AdminHeader";

export default function AdminDashboard() {
  const { resultData } = useResult();

  return (
    <div className="p-6">
        <AdminHeader/>
      {/* Overview Section */}
      <h1 className="text-3xl font-bold text-[#09816B] mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-gray-700 font-semibold">Total Applicants</h2>
          <p className="text-2xl font-bold text-[#09816B]">150</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-gray-700 font-semibold">Paid Applicants</h2>
          <p className="text-2xl font-bold text-[#09816B]">120</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-gray-700 font-semibold">Unpaid Applicants</h2>
          <p className="text-2xl font-bold text-[#FF5733]">30</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-gray-700 font-semibold">Total Amount Paid</h2>
          <p className="text-2xl font-bold text-[#09816B]">৳ 1,20,000</p>
        </div>
      </div>

      {/* Table Section */}
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Applicant Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-[#09816B] text-white">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Roll</th>
              <th className="py-2 px-4">Paid</th>
              <th className="py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b text-gray-700">
              <td className="py-2 px-4 text-center">1</td>
              <td className="py-2 px-4">MD. Mehedi Hasan Murad</td>
              <td className="py-2 px-4">210343</td>
              <td className="py-2 px-4 text-center">Yes</td>
              <td className="py-2 px-4">৳ 1,000</td>
            </tr>
            <tr className="border-b text-gray-700">
              <td className="py-2 px-4 text-center">2</td>
              <td className="py-2 px-4">Md. Ashraful Alam</td>
              <td className="py-2 px-4">210344</td>
              <td className="py-2 px-4 text-center">No</td>
              <td className="py-2 px-4">৳ 0</td>
            </tr>
            <tr className="border-b text-gray-700">
              <td className="py-2 px-4 text-center">3</td>
              <td className="py-2 px-4">Mst. Mahmuda</td>
              <td className="py-2 px-4">210345</td>
              <td className="py-2 px-4 text-center">Yes</td>
              <td className="py-2 px-4">৳ 1,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
