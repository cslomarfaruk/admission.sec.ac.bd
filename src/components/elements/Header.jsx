import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="sticky top-0 left-0 right-0 backdrop-blur-xl w-full overflow-hidden z-50">
      <div className="flex flex-col justify-center items-center p-3">
        <div className="flex justify-center items-center">
          <Link href="/" className="w-14 h-14 m-1 rounded-full bg-green-800/20 flex justify-center items-center text-green-700 text-lg font-bold">
            SEC
          </Link>
          <div className="">
            <Link href="/" className="text-[#09816B] font-itim 2xl:text-7xl xl:text-5xl lg:text-4xl md:text-3xl text-2xl">
              SYLHET ENGINEERING COLLEGE
            </Link>
            <div className="flex justify-between">
              <Link href="/" className="lg:text-3xl text-lg font-itim text-gray-700">
                Tilagor,Sylhet
              </Link>
              <button className="text-[#09816B] rounded-lg border px-3 hover:bg-[#09816B] hover:text-white">
                <Link href="/Apply Now">Login</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full border-[#AFD8EF] opacity-30" />
      <div className=" flex justify-evenly lg:text-lg xl:text-xl 2xl: text-md text-gray-700 ">
        <button className="hover:bg-[#09816B] hover:text-white rounded-md px-2">
          <Link href="/Applicant-copy">Applicant copy</Link>
        </button>
        <button className="hover:bg-[#09816B] hover:text-white rounded-md px-2">
          <Link href="/Payment">Payment</Link>
        </button>
        <button className="hover:bg-[#09816B] hover:text-white rounded-md px-2">
          <Link href="/Recovery">Recovery</Link>
        </button>
        <button className="hover:bg-[#09816B] hover:text-white rounded-md px-2">
          <Link href="/Calculator-List">Calculator List</Link>
        </button>
        <button className="hover:bg-[#09816B] hover:text-white rounded-md px-2">
          <Link href="/Help">Help</Link>
        </button>
      </div>
      <hr className="w-full border-[#AFD8EF] opacity-30" />
    </div>
  );
}
