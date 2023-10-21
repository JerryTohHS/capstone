import Link from "next/link";
import Image from "next/image";
import Menu from "./Menu";
import React from "react";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";

const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 text-green-600 p-4 flex items-center justify-between border-y-2 border-y-green-600 uppercase md:h-24 lg:px-20 xl:pg-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="https://wa.me/651800123456789">Contact</Link>
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">RESTORAN MAMAK TOH</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 text-black px-1 rounded-md">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>1800-MAMAK-TOH</span>
        </div>
        <UserLinks />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
