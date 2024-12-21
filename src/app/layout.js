import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/elements/Header";
import { ResultProvider } from "@/context/ResultContext";

const itim = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "admission.sec.ac.bd",
  description:
    "Created by Omar Faruk,\n Sylhet Engineering College 14 batch, CSE-14 batch",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Itim&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${itim.className}`}>
        <ResultProvider>
          <div className="flex flex-col h-full">
            <Header />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </ResultProvider>
      </body>
    </html>
  );
}
