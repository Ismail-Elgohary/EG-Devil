"use client";
import { useState } from "react";
export default function Search() {
const [search, setSearch] = useState("");

const  handelSubmit = (e: React.FormEvent) => {
	e.preventDefault();
	 console.log(search);
};

return(
<>
    <form onSubmit={handelSubmit} className="flex flex-col gap-5">

<div className="flex items-center gap-2 w-full max-w-md mx-auto">
  <input
    type="search"
    placeholder="enter your search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border border-indigo-100 rounded-lg px-3 py-2 w-full bg-indigo-50/50
    focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent
    text-slate-700 placeholder:text-slate-300 transition-all duration-200 text-sm"
  />
  <button
    type="submit"
    className="bg-indigo-600 hover:bg-indigo-700 active:scale-95
      text-white font-semibold px-5 py-2 rounded-lg text-sm whitespace-nowrap
      shadow-md shadow-indigo-300/40 transition-all duration-200">
    Search
  </button>
</div>


</form>
</>
);
}
