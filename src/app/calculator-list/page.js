"use client";
import React from "react";

export default function CalculatorList() {
  // Sample list of accepted calculators
  const calculators = [
    { id: 1, brand: "Casio", model: "FX-991EX" },
    { id: 2, brand: "Casio", model: "FX-82MS" },
    { id: 3, brand: "Sharp", model: "EL-506X" },
    { id: 4, brand: "Texas Instruments", model: "TI-30X IIS" },
    { id: 5, brand: "Casio", model: "FX-570ES Plus" },
    { id: 6, brand: "Sharp", model: "EL-520X" },
  ];

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          Accepted Calculator List
        </h1>
        <p className="text-gray-700 mb-4 text-center">
          The following calculators are approved for use during the admission
          test exam. Only these models are allowed inside the exam hall.
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-primary text-white">
                <th className="px-4 py-2 text-left">SL No.</th>
                <th className="px-4 py-2 text-left">Brand</th>
                <th className="px-4 py-2 text-left">Model</th>
              </tr>
            </thead>
            <tbody>
              {calculators.map((calc, index) => (
                <tr
                  key={calc.id}
                  className="hover:bg-gray-100 border-b border-gray-300"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{calc.brand}</td>
                  <td className="px-4 py-2">{calc.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Notes */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Important Notes:
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Calculators that are not on this list are strictly prohibited.</li>
            <li>Programmable calculators are not allowed in the exam hall.</li>
            <li>Please ensure your calculator is in good working condition.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
