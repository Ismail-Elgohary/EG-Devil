"use client";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import Icons from "./icons";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Products", href: "/products" },
	{ name: "About", href: "/about" } ,
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-sm font-bold bg-[#1A1A1A]">
      <div className="px-6 py-3 flex items-center gap-4">

        <Link href="/">
          <span className="text-xl font-extrabold text-indigo-400 shrink-2">
            EG-Devil
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white shrink-0 hover:text-indigo-600 text-lg font-bold relative group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 ml-auto">
          <div className="w-px h-5 bg-gray-200" />
        </div>

        <div className="md:hidden flex items-center ml-auto gap-2">
			<Icons />
          <button className="p-1" onClick={() => setOpen(!open)}>
            {open ? (
              <MdClose className="w-6 h-6 text-gray-700" />
            ) : (
              <IoMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-3 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-indigo-600 text-sm font-medium py-2 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/Register"
            className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg
            hover:bg-indigo-700 shadow-sm shadow-indigo-200 text-center transition-all duration-200"
          >
            Register
          </Link>
        </div>
      )}

    </header>
  );
}
