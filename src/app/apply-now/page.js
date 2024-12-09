"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function StudentForm() {
  const currentYear = new Date().getFullYear();
  const hscYears = [currentYear, currentYear - 1];
  const sscYears = [currentYear - 2, currentYear - 3];
  const boards = [
    "Dhaka",
    "Rajshahi",
    "Cumilla",
    "Barisal",
    "Chattogram",
    "Dinajpur",
    "Madrasha",
  ];

  const [formData, setFormData] = useState({
    hscRoll: "",
    hscReg: "",
    hscBoard: "",
    hscYear: "",
    sscRoll: "",
    sscBoard: "",
    sscYear: "",
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="max-w-lg mx-4 my-8 w-full p-5 bg-white shadow rounded-xl z-0">
        <h2 className="text-lg font-semibold text-primary mb-6">
          Please fill up the form carefully
        </h2>
        <form className="space-y-8">
          {/* HSC Information */}
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-4">
              HSC Information
            </h3>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  required
                  id="hsc-roll"
                  value={formData.hscRoll}
                  onChange={(e) => handleChange("hscRoll", e.target.value)}
                  placeholder=" "
                  className="peer w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring "
                />
                <label
                  htmlFor="hsc-roll"
                  className={`absolute left-3 top-0 text-sm bg-white px-1 transition-all duration-200 ease-in-out peer-focus:-translate-y-3 peer-focus:text-primary ${
                    formData.hscRoll
                      ? " -translate-y-3 scale-90 text-primary"
                      : "translate-y-2.5 scale-100 text-gray-700"
                  }`}
                >
                  HSC Roll (or equivalent ID)
                </label>
              </div>
              <div className="relative">
                <Input
                  required
                  id="hsc-reg"
                  value={formData.hscReg}
                  onChange={(e) => handleChange("hscReg", e.target.value)}
                  placeholder=" "
                  className="peer w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                />
                <label
                  htmlFor="hsc-reg"
                  className={`absolute left-3 top-0 text-sm bg-white px-1 transition-all duration-200 ease-in-out peer-focus:-translate-y-3 peer-focus:text-primary ${
                    formData.hscReg
                      ? "-translate-y-3 scale-90 text-primary"
                      : "translate-y-2.5 scale-100 text-gray-700"
                  }`}
                >
                  HSC Registration (or equivalent reg.)
                </label>
              </div>
              <div className="relative">
                <select
                  id="hsc-board"
                  value={formData.hscBoard}
                  onChange={(e) => handleChange("hscBoard", e.target.value)}
                  className="peer w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                >
                  <option value="" disabled>
                    Select HSC Board
                  </option>
                  {boards.map((board) => (
                    <option key={board} value={board}>
                      {board}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="hsc-board"
                  className={`absolute left-3 top-0 text-sm bg-white px-1 transition-all duration-200 ease-in-out peer-focus:text-primary${
                    formData.hscBoard
                      ? " -translate-y-2.5 scale-90 text-primary"
                      : " -translate-y-3 scale-100 text-gray-700"
                  }`}
                >
                  HSC Board
                </label>
              </div>
              <div className="relative">
                <select
                  id="hsc-year"
                  value={formData.hscYear}
                  onChange={(e) => handleChange("hscYear", e.target.value)}
                  className="peer w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                >
                  <option value="" disabled>
                    Select HSC Passing Year
                  </option>
                  {hscYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="hsc-year"
                  className={`absolute left-3 top-0 text-sm bg-white px-1 transition-all duration-200 ease-in-out peer-focus:text-primary${
                    formData.hscYear
                      ? " -translate-y-2.5 scale-90 text-primary"
                      : " -translate-y-3 scale-100 text-gray-700"
                  }`}
                >
                  HSC Passing Year
                </label>
              </div>
            </div>
          </div>

          {/* SSC Information */}
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-4">
              SSC Information
            </h3>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  required
                  id="ssc-roll"
                  value={formData.sscRoll}
                  onChange={(e) => handleChange("sscRoll", e.target.value)}
                  placeholder=" "
                  className="peer w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                />
                <label
                  htmlFor="ssc-roll"
                  className={`absolute left-3 top-0 text-sm bg-white px-1 transition-all duration-200 ease-in-out peer-focus:-translate-y-3 peer-focus:text-primary ${
                    formData.sscRoll
                      ? "-translate-y-3 scale-90 text-primary"
                      : "translate-y-2.5 scale-100 text-gray-700"
                  }`}
                >
                  SSC Roll
                </label>
              </div>
              <div className="relative">
                <select
                  id="ssc-board"
                  value={formData.sscBoard}
                  onChange={(e) => handleChange("sscBoard", e.target.value)}
                  className="peer w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                >
                  <option value="" disabled>
                    Select SSC Board
                  </option>
                  {boards.map((board) => (
                    <option key={board} value={board}>
                      {board}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="ssc-board"
                  className={`absolute left-3 top-0 text-sm bg-white px-1 transition-all duration-200 ease-in-out peer-focus:text-primary${
                    formData.sscBoard
                      ? " -translate-y-2.5 scale-90 text-primary"
                      : " -translate-y-3 scale-100 text-gray-700"
                  }`}
                >
                  SSC Board
                </label>
              </div>
              <div className="relative">
                <select
                  id="ssc-year"
                  value={formData.sscYear}
                  onChange={(e) => handleChange("sscYear", e.target.value)}
                  className="peer w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                >
                  <option value="" disabled>
                    Select SSC Passing Year
                  </option>
                  {sscYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="ssc-year"
                  className={`absolute left-3 top-0 text-sm bg-white px-1 transition-all duration-200 ease-in-out peer-focus:text-primary${
                    formData.sscYear
                      ? " -translate-y-2.5 scale-90 text-primary"
                      : " -translate-y-3 scale-100 text-gray-700"
                  }`}
                >
                  SSC Passing Year
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
