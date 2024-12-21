"use client";
import Link from "next/link";
import React from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/applicants", label: "Applicants" },
    { href: "/admin/issues", label: "Issues" },
    { href: "/admin/notice", label: "Notice" },
    { href: "/admin/exam-date", label: "Exam Date" },
  ];

  const studentLinks = [
    { href: "/applicant-copy", label: "Applicant Copy" },
    { href: "/payment", label: "Payment" },
    { href: "/recovery", label: "Recovery" },
    { href: "/calculator-list", label: "Calculator List" },
    { href: "/help", label: "Help" },
  ];

  const handleAuth = () => {
    if (user) {
      localStorage.removeItem("user");
    }
    router.push("/login");
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50 backdrop-blur-xl w-full ">
      {/* Top Section */}
      <div className="flex flex-col justify-center items-center p-3">
        <div className="flex justify-center items-center w-full px-4">
          <Link href="/" className="h-16 w-16">
            <Image
              src={Logo}
              alt="SEC"
              className="w-auto h-auto cursor-pointer"
            />
          </Link>
          <div className="ml-4">
            <Link
              href="/"
              className="text-primary font-itim text-xl sm:text-2xl md:text-3xl lg:text-5xl"
            >
              SYLHET ENGINEERING COLLEGE
            </Link>
            <div className="flex justify-between text-gray-700">
              <Link href="/" className="text-sm sm:text-md lg:text-lg">
                Tilagor, Sylhet
              </Link>
              <button
                onClick={handleAuth}
                className="ml-4 text-primary border px-3 py-1 rounded-lg hover:bg-primary hover:text-white"
              >
                {user ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full border-[#AFD8EF] opacity-30" />

      {/* Navigation Section */}
      <nav className="flex flex-wrap justify-center lg:justify-evenly gap-2 text-gray-700 text-md lg:text-lg">
        {studentLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:bg-primary hover:text-white px-3 py-1 rounded-md"
          >
            {link.label}
          </Link>
        ))}
        {user?.role === "admin" &&
          adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:bg-primary hover:text-white px-3 py-1 rounded-md"
            >
              {link.label}
            </Link>
          ))}
      </nav>

      {/* Horizontal Line */}
      <hr className="w-full border-[#AFD8EF] opacity-30" />
    </div>
  );
}
