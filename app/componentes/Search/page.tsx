"use client";
import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useState } from "react";

export default function Search() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${query}`);
    setQuery("");
    setSearchOpen(false);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative text-gray-600 focus-within:text-gray-800"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
          Go
        </button>
      </form>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-24 z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-md p-4 shadow-lg">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full py-2 px-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm shadow-indigo-200 transition-all"
              >
                Go
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-gray-700 hover:text-indigo-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
