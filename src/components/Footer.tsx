import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-12 md:h-24 p-4 lg:px-20 xl:pg-40 text-green-600 border-y-2 border-y-green-600 flex items-center justify-between">
      <Link href="/" className="font-bold text-xl uppercase">
        RESTORAN MAMAK TOH
      </Link>
      <p>© ALL MAMAK RIGHTS RESERVED.</p>
    </div>
  );
};

export default Footer;
