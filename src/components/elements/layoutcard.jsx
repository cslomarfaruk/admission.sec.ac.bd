"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CardLayout({ Icon, Content, Footer }) {
  const handleClick = () => {};

  const formatHref = (text) => {
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <Card className="m-8 shadow-lg flex flex-col justify-center items-center">
      <CardHeader className="flex justify-center items-center">
        {Icon && <Icon className="text-primary w-12 h-12" />}
      </CardHeader>
      <CardContent className="text-center">{Content && Content}</CardContent>
      <CardFooter className="flex justify-center">
        {Footer && (
          <button className="bg-primary rounded-md px-2 py-1 text-white hover:bg-rose-700">
            <Link href={`/${formatHref(Footer)}`}>{Footer}</Link>
          </button>
        )}
      </CardFooter>
    </Card>
  );
}
