'use client'
import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api/post");
        const response = await data.json();
        console.log(response);
      } catch (error) {
        console.log(error.message)
      }
    };
    fetchData();
  }, []);
  return <div>testing data fetch....</div>;
}
