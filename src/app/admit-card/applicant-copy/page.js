"use client";
import Image from "next/image";
import { useResult } from "@/context/ResultContext"; // Use your context
import Logo from "@/assets/logo.png"; // Placeholder for your logo image

export default function ApplicantCard() {
  const { resultData } = useResult();

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      {/* Card Container */}
      <div className="w-full max-w-md md:max-w-xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="text-center bg-primary text-white py-4">
          <h1 className="text-lg font-semibold">Sylhet Engineering College</h1>
          <p className="text-sm">Admission test 2023-2024</p>
        </div>

        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <Image
              src={Logo}
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <button className="bg-red-500 text-white px-4 py-1 rounded-md text-sm">
            Not Allowed
          </button>
        </div>

        {/* Applicant Information */}
        <div className="px-6">
          <div className="grid grid-cols-2 gap-4 border border-gray-300 rounded-md p-4">
            <p><span className="font-semibold">Name:</span> {resultData?.name}</p>
            <p><span className="font-semibold">Father's Name:</span> {resultData?.fatherName}</p>
            <p><span className="font-semibold">Mother's Name:</span> {resultData?.motherName}</p>
            <p><span className="font-semibold">Date of Birth:</span> {resultData?.dob}</p>
            <p><span className="font-semibold">Phone No:</span> 01234567890</p>
            <p><span className="font-semibold">Mail:</span> abc@xyz.com</p>
          </div>
        </div>

        {/* Result Section */}
        <div className="px-6 mt-4">
          <h2 className="text-center font-semibold mb-2">Result Information</h2>
          <table className="w-full text-sm border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-primary text-white">
                <th className="border px-2 py-1">Exam Name</th>
                <th className="border px-2 py-1">Board</th>
                <th className="border px-2 py-1">Group</th>
                <th className="border px-2 py-1">Year</th>
                <th className="border px-2 py-1">Roll</th>
                <th className="border px-2 py-1">Result</th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamically Populate Rows */}
              <tr>
                <td className="border px-2 py-1">HSC</td>
                <td className="border px-2 py-1">{resultData?.hscDetails?.institute}</td>
                <td className="border px-2 py-1">{resultData?.hscDetails?.group}</td>
                <td className="border px-2 py-1">{resultData?.hscDetails?.year}</td>
                <td className="border px-2 py-1">210343</td>
                <td className="border px-2 py-1">{resultData?.hscDetails?.gpa}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">SSC</td>
                <td className="border px-2 py-1">{resultData?.sscDetails?.institute}</td>
                <td className="border px-2 py-1">{resultData?.sscDetails?.group}</td>
                <td className="border px-2 py-1">{resultData?.sscDetails?.year}</td>
                <td className="border px-2 py-1">203354</td>
                <td className="border px-2 py-1">{resultData?.sscDetails?.gpa}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signature */}
        <div className="text-center mt-4">
          <h3 className="font-semibold">Signature</h3>
          <div className="border border-primary h-12 w-40 mx-auto mt-2"></div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-4 mb-6">
          <button className="bg-primary text-white px-6 py-2 rounded-md mr-4">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
