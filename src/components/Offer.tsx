import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";
import Link from "next/link";

const Offer = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">
          FREE DELIVERY <br />
          ON ALL ORDERS
        </h1>
        <p className="text-white xl:text-xl">LIMITED TIME ONLY</p>
        <CountDown />
        <Link href={"/menu"}>
          <button className="bg-green-600 text-white py-3 px-6 rounded-md">
            Order Now
          </button>
        </Link>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full relative md:h-full">
        <Image src="/offerProduct.png" alt="" fill />
      </div>
    </div>
  );
};

export default Offer;
