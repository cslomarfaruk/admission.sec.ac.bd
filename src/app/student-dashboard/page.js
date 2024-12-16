"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-primary">Student Dashboard</h1>
      <p>Welcome, Student!</p>
      <button
        onClick={() => {
          localStorage.removeItem("loggedInUser");
          router.push("/login");
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
