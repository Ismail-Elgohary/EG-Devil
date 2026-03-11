"use client";

import { useState } from "react";
import { toast }  from "react-toastify";
export default function LoginForm() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const  handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();

	if(email === "" || password === ""){
		toast.error("Please Fill All Fields");
		return;
	}
   console.log({email, password});
};


return(
<>
        {/* Form */}
        <form onSubmit={handelSubmit} className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
			  value={email}
			  onChange={(e) => setEmail(e.target.value)}
			  className="border border-indigo-100 rounded-xl px-4 py-3 w-full bg-indigo-50/50
			  focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent
			  text-slate-700 placeholder:text-slate-300 transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                Password
              </label>
              <a href="#" className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			  className="border border-indigo-100 rounded-xl px-4 py-3 w-full bg-indigo-50/50
			  focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent
			  text-slate-700 placeholder:text-slate-300 transition-all duration-200"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95
              text-white font-bold py-3 rounded-xl
              shadow-lg shadow-indigo-300/50
              transition-all duration-200"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <a href="/Register" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              Sign Up
            </a>
          </p>

</form>
</>
);
}
