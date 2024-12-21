"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const currentPath = window.location.pathname;
      if (user.role === "admin" && currentPath !== "/admin/dashboard") {
        router.replace("/admin/dashboard");
      } else if (user.role === "student" && currentPath !== "/student-dashboard") {
        router.replace("/student-dashboard");
      }
    }
  }, []);
  
  const student = {id:"student",password:"1234"}
  const admin = {id:"admin",password:"admin"}

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId && password) {
      if (userId === student.id && password === student.password) {      
        localStorage.setItem(
          "user",
          JSON.stringify({ userId, role: "student", password })
        );
        router.push("/student-dashboard");
      } else if (userId === admin.id && password === admin.password) {
        localStorage.setItem(
          "user",
          JSON.stringify({ userId, role: "admin" })
        );
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <div className="p-6 flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-700">User ID</label>
            <input
              type="text"
              placeholder="Enter your User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-primary"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-primary"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-700 mb-2">Don't have an account yet?</p>
          <Link href="/apply-now">
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
