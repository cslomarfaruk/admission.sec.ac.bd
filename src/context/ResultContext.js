"use client";
import { createContext, useContext, useState } from "react";
const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [resultData,setResultData] = useState({
    totalApplicants: 150,
    paidApplicants: 120,
    unpaidApplicants: 30,
    totalAmountPaid: 120000,
  });

  return (
    <ResultContext.Provider value={{ resultData, setResultData }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error("useResult must be used within a ResultProvider");
  }
  return context;
};