"use client";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import Icons from "./icons";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(false);
  const [mobilelist, setMobileList] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

   const listLinks = [
    { name: "Products", href: "/products" },
    { name: "Add Product", href: "/products/add" },
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


		{/* Dropdown Menu */}
          <div
            className="relative group h-full py-2"
            onMouseEnter={() => setList(true)}
            onMouseLeave={() => setList(false)}
          >
            <button className="text-white hover:text-indigo-400 text-lg font-bold flex items-center gap-1 transition-all">
              Products
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${list ? "rotate-180" : ""}`} />
            </button>

            {list && (
              <div className="absolute left-0 top-full w-48 pt-2">
                <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-1">
                  {listLinks.map((subLink) => (
                    <Link
                      key={subLink.name}
                      href={subLink.href}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

		{/* Right Menu */}
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
        <div className="md:hidden border-gray-800 px-6 py-6 flex flex-col gap-4 bg-[#1A1A1A] text-white">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-extrabold hover:text-indigo-400 border-gray-800 pb-2"
            >
              {link.name}
            </Link>
          ))}


			{/* Product btn in mobile menu */}
      <button
      onClick={() => setMobileList(!mobilelist)}
      className="flex items-center justify-between text-lg
        font-extrabold text-white hover:text-indigo-400"
         >
      Products
    <ChevronDown
    className={`w-5 h-5 transition-transform duration-300 ${
      mobilelist ? "rotate-180" : ""
    }`}
  />
</button>

{mobilelist && (
  <div className="flex flex-col gap-2 pl-4">
    {listLinks.map((subLink) => (
      <Link
        key={subLink.name}
        href={subLink.href}
        onClick={() => {
          setOpen(false);
          setMobileList(false);
        }}
        className="px-1 py-1 text-lg font-extrabold text-indigo-400 hover:text-indigo-400 transition-colors"
      >
        {subLink.name}
      </Link>
    ))}
  </div>
)}
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
