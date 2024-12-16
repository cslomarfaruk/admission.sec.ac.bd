"use client";

import { useResult } from "@/context/ResultContext";

const gradeToGPA = {
  "A+": 5.0,
  A: 4.0,
  "A-": 3.5,
  "B+": 3.25,
  B: 3.0,
  C: 2.0,
  D: 1.0,
  F: 0.0,
};
export default function ResultPage() {
  const { resultData } = useResult();

  if (!resultData) {
    return <div>Loading...</div>;
  }

  const { sscDetails, hscDetails, registration } = resultData;

  const hscSubjectEligibility = hscDetails.subjectGrades.map((subject) => {
    return (
      ["176", "174", "265"].includes(subject.subjectCode) &&
      gradeToGPA[subject.subjectGPA] >= 3.0
    );
  });

  const sscGPA = parseFloat(sscDetails.gpa);
  const hscGPA = parseFloat(hscDetails.gpa);
  const totalGPA = sscGPA + hscGPA;

  const isEligible = () => {
    return (
      sscGPA >= 3.0 && hscGPA >= 3.0 && totalGPA >= 7.0 && hscSubjectEligibility
    );
  };

  const eligibility = isEligible() && sscDetails.group == "SCIENCE";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 text-primary">
      <h1
        className={`text-3xl font-bold mb-4 ${
          eligibility ? "text-primary" : "text-rose-700"
        }`}
      >
        {eligibility
          ? "Congratulations! You are Eligible to Apply"
          : "Sorry, You Are Not Eligible to Apply"}
      </h1>

      {/* Student Details */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl overflow-hidden">
        <h2 className="text-xl  font-semibold mb-4">Student Information</h2>
        <table className="w-full rounded- border-collapse border border-primary text-sm">
          <tbody>
            <tr>
              <td className="p-2 border ">Name</td>
              <td className="p-2 border ">{sscDetails.name}</td>
            </tr>
            <tr>
              <td className="p-2 border">Date of Birth</td>
              <td className="p-2 border">{sscDetails.dob}</td>
            </tr>
            <tr>
              <td className="p-2 border">Father's Name</td>
              <td className="p-2 border">{sscDetails.fatherName}</td>
            </tr>
            <tr>
              <td className="p-2 border">Mother's Name</td>
              <td className="p-2 border">{sscDetails.motherName}</td>
            </tr>
            <tr>
              <td className="p-2 border">Total GPA</td>
              <td className="p-2 border text-primary">{totalGPA}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SSC Details */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mt-6 space-y-4">
        <h2 className="text-xl  font-semibold mb-4">SSC Information</h2>
        <table className="w-full border-collapse border border-primary text-sm">
          <tbody>
            <tr>
              <td className="p-2 border">Institution</td>
              <td className="p-2 border">{sscDetails.institute}</td>
            </tr>
            <tr>
              <td className="p-2 border">Type</td>
              <td className="p-2 border">{sscDetails.type}</td>
            </tr>
            <tr>
              <td className="p-2 border">Result</td>
              <td className="p-2 border text-primary">{sscDetails.result}</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-xl  font-semibold mb-4">SSC Result</h2>
        <table className="w-full rounded-lg border-collapse border border-primary text-sm">
          <thead>
            <tr>
              <th className="p-2 border">Subject Code</th>
              <th className="p-2 border">Subject Name</th>
              <th className="p-2 border">Grade</th>
            </tr>
          </thead>
          <tbody>
            {sscDetails.subjectGrades.map((subject, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{subject.subjectCode}</td>
                <td className="p-2 border">{subject.subjectName}</td>
                <td className="p-2 border">{subject.subjectGPA}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* HSC Details */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mt-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">HSC Information</h2>

        <>
          <table className="w-full border-collapse border border-primary text-sm">
            <tbody>
              <tr>
                <td className="p-2 border ">Institution</td>
                <td className="p-2 border">{hscDetails.institute}</td>
              </tr>
              <tr>
                <td className="p-2 border ">Type</td>
                <td className="p-2 border">{hscDetails.type}</td>
              </tr>
              <tr>
                <td className="p-2 border ">Result</td>
                <td className="p-2 border text-primary">{hscDetails.result}</td>
              </tr>
            </tbody>
          </table>
        </>

        <h2 className="text-xl font-semibold mb-4">HSC Result</h2>
        <table className="w-full border-collapse border border-primary text-sm">
          <thead>
            <tr>
              <th className="p-2 border">Subject Code</th>
              <th className="p-2 border">Subject Name</th>
              <th className="p-2 border">Grade</th>
            </tr>
          </thead>
          <tbody>
            {hscDetails.subjectGrades.map((subject, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{subject.subjectCode}</td>
                <td className="p-2 border">{subject.subjectName}</td>
                <td className="p-2 border">{subject.subjectGPA}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="bg-primary text-gray-100 font-semibold py-2 w-full max-w-2xl mt-6 space-y-4 rounded-lg  hover:bg-blue-600">
        Next
      </button>
    </div>
  );
}
