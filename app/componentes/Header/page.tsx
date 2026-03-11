"use client";

import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import Search from "../Search/page";
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0   bg-white/95  w-full backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="text-2xl font-bold text-yellow-500">EG-Devil</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                className="text-gray-700 hover:text-blue-600 transition-colors capitalize"
                href={"/contact"}
              >
                Contact
              </Link>

              <Link
                className="text-gray-700 hover:text-blue-600 transition-colors capitalize"
                href={"/products"}
              >
                products
               </Link>

              <Search  />


            </nav>

            <button
              className="md:hidden"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                <MdClose className="w-6 h-6" />
              ) : (
                <IoMenu className="w-6 h-6" />
              )}
            </button>

            <div className="hidden md:flex  items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md">
                <Link href="/Login">Login</Link>
              </button>

              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md">
                <Link href="/Register">Register</Link>
              </button>
            </div>
          </div>

          {open && (
            <nav className="md:hidden flex items-center flex-col space-y-3 mt-4 pb-4">
              <Link
                className="text-gray-700 hover:text-blue-600 transition-colors capitalize"
                href={"/about"}
              >
                About
              </Link>

              <Link
                className="text-gray-700 hover:text-blue-600 transition-colors capitalize"
                href={"/products"}
              >
                products
              </Link>


            </nav>
          )}
        </div>
      </header>
    </>
  );
}
