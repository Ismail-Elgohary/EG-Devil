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
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-sm font-bold bg-[#1A1A1A]">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">

        <Link href="/" className="shrink-0">
          <span className="text-xl font-extrabold text-indigo-400">
            EG-Devil
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white hover:text-indigo-400 text-lg font-bold relative group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-400 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4 ml-auto md:ml-0">
          <div className="flex items-center">
            <Icons />
          </div>

          <div className="hidden md:block w-px h-5 bg-gray-700 mx-2" />

          <button
            className="md:hidden p-1 text-white hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdClose size={28} /> : <IoMenu size={28} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-800 px-6 py-6 flex flex-col gap-4 bg-[#1A1A1A] text-white">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-semibold hover:text-indigo-400 border-b border-gray-800 pb-2"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/Register"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 text-center font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg"
          >
            Register Now
          </Link>
        </div>
      )}
    </header>
  );
}
