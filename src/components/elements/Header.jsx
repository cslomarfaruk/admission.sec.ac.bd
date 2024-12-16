"use client";
import Link from "next/link";
import React from "react";

import Logo from "@/assets/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const AdminHeader = () => {
  return (
    <>
      <ul className="hover:bg-primary hover:text-white rounded-md px-2">
        <Link href="/admin/dashboard">Dashboard</Link>
      </ul>
      <ul className="hover:bg-primary hover:text-white rounded-md px-2">
        <Link href="/admin/applicants">Applicants</Link>
      </ul>
      <ul className="hover:bg-primary hover:text-white rounded-md px-2">
        <Link href="/admin/issues">Issues</Link>
      </ul>
      <ul className="hover:bg-primary hover:text-white rounded-md px-2">
        <Link href="/admin/notice">Notice</Link>
      </ul>
      <ul className="hover:bg-primary hover:text-white rounded-md px-2">
        <Link href="/admin/exam-date">Exam Date</Link>
      </ul>
    </>
  );
};

export default function Header() {
  let adminPage = null;
  const router = useRouter();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user?.role == "admin") {
    adminPage = AdminHeader();
  }
  return (
    <div className="sticky top-0 left-0 right-0 backdrop-blur-xl w-full overflow-hidden z-50">
      <div className="flex flex-col justify-center items-center p-3">
        <div className="flex justify-center items-center">
          <Link
            href="/"
            className="w-20 h-20 p-1 mx-2 rounded-full flex justify-center items-center text-green-700 text-lg font-bold"
          >
            <Image src={Logo} alt="SEC" className="cursor-pointer" />
          </Link>
          <div className="">
            <Link
              href="/"
              className="text-primary font-itim 2xl:text-7xl xl:text-5xl lg:text-4xl md:text-3xl text-2xl"
            >
              SYLHET ENGINEERING COLLEGE
            </Link>
            <div className="flex justify-between">
              <Link
                href="/"
                className="lg:text-3xl text-lg font-itim text-gray-700"
              >
                Tilagor,Sylhet
              </Link>
              <button
                className={`text-primary rounded-lg border px-3  ${user ? "hover:bg-rose-700": "hover:bg-primary"} hover:text-white`}
                onClick={() => {
                  if (!user) {
                    router.push("/login");
                  } else {
                    localStorage.removeItem("loggedInUser");
                    router.push("/login");
                  }
                }}
              >
                {user ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full border-[#AFD8EF] opacity-30" />
      <div className=" flex justify-evenly lg:text-lg xl:text-xl 2xl: text-md text-gray-700 ">
        <ul className="hover:bg-primary hover:text-white rounded-md px-2">
          <Link href="/applicant-copy">Applicant copy</Link>
        </ul>
        <ul className="hover:bg-primary hover:text-white rounded-md px-2">
          <Link href="/payment">Payment</Link>
        </ul>
        <ul className="hover:bg-primary hover:text-white rounded-md px-2">
          <Link href="/recovery">Recovery</Link>
        </ul>
        <ul className="hover:bg-primary hover:text-white rounded-md px-2">
          <Link href="/calculator-list">Calculator List</Link>
        </ul>
        <ul className="hover:bg-primary hover:text-white rounded-md px-2">
          <Link href="/help">Help</Link>
        </ul>
        {adminPage}
      </div>
      <hr className="w-full border-[#AFD8EF] opacity-30" />
    </div>
  );
}
