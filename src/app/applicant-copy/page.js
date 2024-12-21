"use client";
import Image from "next/image";
import { useResult } from "@/context/ResultContext"; // Context hook
import Logo from "@/assets/logo.png"; // Placeholder for your logo
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ApplicantCard() {
  const { resultData } = useResult();
  
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-auto w-full">
      <div className="w-full max-w-xl bg-white rounded-md p-6 shadow-lg mx-2 my-4">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-bold text-primary">
            Sylhet Engineering College
          </h1>
          <p className="text-sm text-primary">Admission test 2023-2024</p>
          <div className="flex justify-center mt-2">
            {/* Logo */}
            <div className="w-12 h-12 bg-primary rounded-full">
              <Image src={Logo} alt="SEC" className="h-auto w-auto" />
            </div>
          </div>
        </div>

        {/* Applicant Details */}
        <div className="border border-primary rounded-md p-4">
          <table className="w-full text-primary">
            <tbody>
              <tr>
                <td className="font-semibold py-1">Name:</td>
                <td className="py-1">{resultData?.name || "admin"}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Father's Name:</td>
                <td className="py-1">{resultData?.fatherName || "abcd"}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Mother's Name:</td>
                <td className="py-1">
                  {resultData?.motherName || "example name"}
                </td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Date of Birth:</td>
                <td className="py-1">{resultData?.dob || "2001-02-05"}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Phone No:</td>
                <td className="py-1">{resultData?.phone || "01234567890"}</td>
              </tr>
              <tr>
                <td className="font-semibold py-1">Mail:</td>
                <td className="py-1">{resultData?.email || "abc@xyz.com"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Result Information */}
        <div className="mt-4 overflow-x-auto">
          <h2 className="text-center text-primary font-semibold mb-2">
            Result Information
          </h2>
          <table className="w-full border-collapse border text-primary">
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
              <tr>
                <td className="border px-2 py-1">HSC</td>
                <td className="border px-2 py-1">
                  {resultData?.hscDetails?.institute || "N/A"}
                </td>
                <td className="border px-2 py-1">
                  {resultData?.hscDetails?.group || "N/A"}
                </td>
                <td className="border px-2 py-1">
                  {resultData?.hscDetails?.year || "N/A"}
                </td>
                <td className="border px-2 py-1">
                  {resultData?.hscDetails?.roll || "N/A"}
                </td>
                <td className="border px-2 py-1">
                  {resultData?.hscDetails?.gpa || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border px-2 py-1">SSC</td>
                <td className="border px-2 py-1">
                  {resultData?.sscDetails?.institute || "N/A"}
                </td>
                <td className="border px-2 py-1">
                  {resultData?.sscDetails?.group || "N/A"}
                </td>
                <td className="border px-2 py-1">
                  {resultData?.sscDetails?.year || "N/A"}
                </td>
                <td className="border px-2 py-1">
                  {resultData?.sscDetails?.roll || "N/A"}
                </td>
                <td className="border px-2 py-1">
                  {resultData?.sscDetails?.gpa || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signature */}
        <div className="text-center mt-4">
          <h3 className="text-primary font-semibold">Signature</h3>
          <div className="border border-primary h-12 w-40 mx-auto mt-2"></div>
        </div>

        {/* Buttons */}
        <div className="flex justify-around mt-4">
          <button className="bg-primary text-white px-4 py-2 rounded-md">
            Payment
          </button>
          <button className="border border-primary text-primary px-4 py-2 rounded-md">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
