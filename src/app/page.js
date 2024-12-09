"use client";
import CardLayout from "@/components/elements/layoutcard";
import {
  TriangleAlert,
  CalendarCog,
  NotebookPen,
  PrinterCheck,
  FileText,
  AlarmClock,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <CardLayout
        Icon={TriangleAlert}
        Content={
          <h1 className="text-[#004848] font-impact text-center text-3xl">
            The admission test has been postponed.
          </h1>
        }
        Footer="Circular"
      />
      <CardLayout
        Icon={CalendarCog}
        Content={
          <div className="space-y-3 px-4">
            <div className="bg-cyan-400/20 py-3 px-4 rounded-lg">
              <div className="text-lg">Application Starts & Ends:</div>
              <div className="text-cyan-800 text-sm">
                12 jun, 2024 - 6 july, 2024
              </div>
            </div>
            <div className="bg-cyan-400/20 py-3 px-4 rounded-lg">
              <div className="text-lg">Payment Date:</div>
              <div className="text-cyan-800 text-sm">
                12 jun, 2024 - 1 july, 2024
              </div>
            </div>
            <div className="bg-cyan-400/20 py-3 px-4 rounded-lg">
              <div className="text-lg">Probable Admission Test Date:</div>
              <div className="text-cyan-800 text-sm">15 july, 2024</div>
            </div>
          </div>
        }
        Footer="Check Schedule"
      />
      <CardLayout
        Icon={NotebookPen}
        Content={
          <p className="flex justify-center items-center text-start">
            1. Academic info submit and validate <br />
            2. Apply <br />
            3. Mobile varification <br />
            4. Payment <br />
            5. Download copy <br />
          </p>
        }
        Footer="Apply Now"
      />
      <CardLayout
        Icon={PrinterCheck}
        Content={
          <button className="bg-primary rounded-md px-2 py-1 text-white hover:bg-rose-700">
            <Link href={`/See Result`}>See Result</Link>
          </button>
        }
        Footer=""
      />
      <CardLayout
        Icon={FileText}
        Content={
          <button className="bg-primary rounded-md px-2 py-1 text-white hover:bg-rose-700">
            <Link href={`/Admit card download`}>Admit card download</Link>
          </button>
        }
        Footer=""
      />
      <CardLayout
        Icon={AlarmClock}
        Content={
          <>
            <p>Time before admission test starts. </p>
            <div className="flex space-x-4 justify-center items-center mt-4">
              <div>
                <div className="rounded-lg text-white bg-primary px-4 py-2 text-xl">
                  39
                </div>
                <div className="text-primary text-xs">Days</div>
              </div>
              <div>
                <div className="rounded-lg text-white bg-primary px-4 py-2 text-xl">
                  23
                </div>
                <div className="text-primary text-xs">Hours</div>
              </div>
              <div>
                <div className="rounded-lg text-white bg-primary px-4 py-2 text-xl">
                  30
                </div>
                <div className="text-primary text-xs">Minutes</div>
              </div>
              <div>
                <div className="rounded-lg text-white bg-primary px-4 py-2 text-xl">
                  09
                </div>
                <div className="text-primary text-xs">Seconds</div>
              </div>
            </div>
          </>
        }
        Footer=""
      />
    </div>
  );
}
