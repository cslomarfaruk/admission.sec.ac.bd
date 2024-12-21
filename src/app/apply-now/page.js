"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { useResult } from "@/context/ResultContext";

export default function StudentForm() {
  const currentYear = new Date().getFullYear();
  const hscYears = [
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
  ];
  const sscYears = [
    currentYear - 3,
    currentYear - 4,
    currentYear - 5,
    currentYear - 6,
  ];

  const [formData, setFormData] = useState({
    rollHSC: "",
    reg: "",
    hscBoard: "",
    hscYear: "",
    rollSSC: "",
    sscBoard: "",
    sscYear: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setResultData } = useResult();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/fetchResult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.sscDetails && result.hscDetails) {
        setResultData(result);
        localStorage.setItem("user", JSON.stringify(result));
        router.push("/apply-now/result");
      } else {
        setError(
          result.error || !result.sscDetails || !result.hscDetails
            ? "Opps! Result not found, check your information again."
            : null
        );
      }
    } catch (err) {
      setError("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const boards = [
    "Dhaka",
    "Barisal",
    "Chittagong",
    "Comilla",
    "Dinajpur",
    "Jessore",
    "Mymensingh",
    "Rajshahi",
    "Sylhet",
    "Madrasah",
    "Technical",
    "DIBS(Dhaka)",
  ];

  const handleChange = (field, value) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  return (
    <>
      <Progress value={33} className="w-full bg-white rounded-lg px-4 m-4 " />
      <div className="p-4 flex justify-center">
        <div className="max-w-lg mx-4 my-8 w-full p-5 bg-white shadow rounded-xl z-0">
          <h2 className="text-lg font-semibold text-primary mb-6">
            Please fill up the form carefully
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <h3 className="text-base font-medium text-gray-700 mb-4">
                HSC Information
              </h3>
              <div className="space-y-6">
                <div className="relative">
                  <Input
                    required
                    id="hsc-roll"
                    value={formData.rollHSC}
                    onChange={(e) => handleChange("rollHSC", e.target.value)}
                    placeholder=" "
                    className="peer w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring "
                  />
                  <label
                    htmlFor="hsc-roll"
                    className={`absolute left-3 top-0 text-sm bg-white px-1 transition-all duration-200 ease-in-out peer-focus:-translate-y-3 peer-focus:text-primary ${
                      formData.rollHSC
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
                    value={formData.reg}
                    onChange={(e) => handleChange("reg", e.target.value)}
                    placeholder=" "
                    className="peer w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                  />
                  <label
                    htmlFor="hsc-reg"
                    className={`absolute left-3 top-0 text-sm bg-white px-1 transition-all duration-200 ease-in-out peer-focus:-translate-y-3 peer-focus:text-primary ${
                      formData.reg
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
                    value={formData.rollSSC}
                    onChange={(e) => handleChange("rollSSC", e.target.value)}
                    placeholder=" "
                    className="peer w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                  />
                  <label
                    htmlFor="ssc-roll"
                    className={`absolute left-3 top-0 text-sm bg-white px-1 transition-all duration-200 ease-in-out peer-focus:-translate-y-3 peer-focus:text-primary ${
                      formData.rollSSC
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
            {error && (
              <>
                <div className="text-lg text-rose-700 my-2 p-1 text-center">
                  {error}
                </div>
              </>
            )}
            <button
              type="submit"
              className="bg-primary w-full hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="flex justify-center items-center">
                    <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  </div>
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
