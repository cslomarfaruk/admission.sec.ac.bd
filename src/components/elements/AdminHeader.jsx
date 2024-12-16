"use client";
import Link from "next/link";
import React from "react";

import Logo from "@/assets/logo.png";
import Image from "next/image";

export default function AdminHeader() {
  return (
    <div className="sticky top-0 left-0 right-0 backdrop-blur-xl w-full overflow-hidden z-10">
     
      {/* Navigation Menu */}
      <div className="flex justify-evenly lg:text-lg xl:text-xl text-md text-gray-700">
        <button className="hover:bg-[#09816B] hover:text-white rounded-md px-2">
          <Link href="/admin/dashboard">Dashboard</Link>
        </button>
        <button className="hover:bg-[#09816B] hover:text-white rounded-md px-2">
          <Link href="/admin/applicants">Applicants</Link>
        </button>
        <button className="hover:bg-[#09816B] hover:text-white rounded-md px-2">
          <Link href="/admin/issues">Issues</Link>
        </button>
        <button className="hover:bg-[#09816B] hover:text-white rounded-md px-2">
          <Link href="/admin/notice">Notice</Link>
        </button>
        <button className="hover:bg-[#09816B] hover:text-white rounded-md px-2">
          <Link href="/admin/exam-date">Exam Date</Link>
        </button>
      </div>
      <hr className="w-full border-[#AFD8EF] opacity-30" />
    </div>
  );
}
