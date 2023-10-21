//WITH A LIBRARY
"use client";
import React from "react";
import Countdown from "react-countdown";
import dynamic from "next/dynamic";

const endingDate = new Date("2023-11-09");

const CountDown = () => {
  return (
    <Countdown
      className="font-bold text-5xl text-yellow-300"
      date={endingDate}
    />
  );
};

export default dynamic(() => Promise.resolve(CountDown), { ssr: false });

// WITHOUT A LIBRARY
// "use client";
// import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";

// const CountDown = () => {
//   const calculateTimeRemaining = () => {
//     const difference = +new Date(`11/09/2023`) - +new Date();

//     return {
//       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//       minutes: Math.floor((difference / (1000 * 60)) % 60),
//       seconds: Math.floor((difference / 1000) % 60),
//     };
//   };

//   const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeRemaining(calculateTimeRemaining());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []); // Empty dependency array to run the effect only once

//   return (
//     <span className="font-bold text-5xl text-yellow-300">
//       {timeRemaining.days}:{timeRemaining.hours}:{timeRemaining.minutes}:
//       {timeRemaining.seconds}
//     </span>
//   );
// };

// export default dynamic(() => Promise.resolve(CountDown), { ssr: false });
