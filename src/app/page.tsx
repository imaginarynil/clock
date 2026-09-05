"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Stopwatch from "./Stopwatch";
import Timer from "./Timer";
import AlarmApp from "@/app/Alarm/AlarmApp";

export default function Home() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div>
      {/* <p>
        {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
      </p> */}
      {/* <Stopwatch /> */}
      {/* <Timer /> */}
      <AlarmApp />
    </div>
  );
}
