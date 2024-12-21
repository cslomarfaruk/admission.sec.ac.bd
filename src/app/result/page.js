"use client";
import React, { useState } from "react";
import { useResult } from "@/context/ResultContext";

export default function AdmissionResult() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [showResult, setShowResult] = useState(false);
  const { resultData } = useResult();

  const handleShowResult = (e) => {
    if (userID && password && resultData) {
      setShowResult(true);
    } else {
      alert("Invalid User ID or Password, or No Data Found");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Download Section */}
      <div className="bg-white shadow-md rounded-md p-4 w-full max-w-lg mb-6">
        <h2 className="text-lg font-semibold text-center text-primary mb-4">
          Download all results
        </h2>
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <button className="border rounded-md py-1 px-3 mb-2">
              General
            </button>
            <button className="bg-primary text-white py-1 px-4 rounded-md">
              Download
            </button>
          </div>
          <div className="flex flex-col items-center">
            <button className="border rounded-md py-1 px-3 mb-2">
              Quota & Others
            </button>
            <button className="bg-primary text-white py-1 px-4 rounded-md">
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Individual Result */}
      <div className="bg-white shadow-md rounded-md p-4 w-full max-w-lg mb-6">
        <h2 className="text-lg font-semibold text-center text-primary mb-4">
          Individual Result
        </h2>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="userID" className="font-semibold">
              User ID:
            </label>
            <input
              type="text"
              id="userID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="border rounded-md py-1 px-2 w-40"
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md py-1 px-2 w-40"
            />
          </div>
          <button
            onClick={handleShowResult}
            className="bg-primary text-white py-2 px-4 rounded-md mx-auto hover:bg-primary-dark"
          >
            Show Result
          </button>
        </div>
      </div>

      {/* Result Display */}
      {showResult && resultData && (
        <div className="bg-white shadow-md rounded-md p-4 w-full max-w-lg">
          <h2 className="text-lg font-semibold text-center text-primary mb-4">
            Passed
          </h2>
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Merit Position:</span>
            <span>{resultData.meritPosition || "19"}</span>
          </div>
          {/* Result Table */}
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
                <td className="border px-2 py-1">{resultData.hscBoard}</td>
                <td className="border px-2 py-1">{resultData.hscGroup}</td>
                <td className="border px-2 py-1">{resultData.hscYear}</td>
                <td className="border px-2 py-1">{resultData.hscRoll}</td>
                <td className="border px-2 py-1">{resultData.hscResult}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">SSC</td>
                <td className="border px-2 py-1">{resultData.sscBoard}</td>
                <td className="border px-2 py-1">{resultData.sscGroup}</td>
                <td className="border px-2 py-1">{resultData.sscYear}</td>
                <td className="border px-2 py-1">{resultData.sscRoll}</td>
                <td className="border px-2 py-1">{resultData.sscResult}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
