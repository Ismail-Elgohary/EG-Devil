"use client";
import { IoSearch } from "react-icons/io5";
import {  useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
   const [searchtxt, setSearchtxt] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${searchtxt}`);
	router.push(`/Search/SearcResult?query=${searchtxt}`);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative text-gray-600 focus-within:text-gray-800"
      >
        <input
          type="text"
          value={searchtxt}
          onChange={(e) => setSearchtxt(e.target.value)}
          placeholder="Search..."
          className="py-2 pl-10 pr-20 text-sm text-gray-900 bg-gray-100 rounded-full
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all w-64"
        />
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <IoSearch className="w-5 h-5 text-gray-400" />
        </span>
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700
                text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm shadow-indigo-200 transition-all"
        >
          Submit
        </button>
      </form>
    </>
  );
}
