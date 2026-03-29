"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Please enter your email");
      return;
    }
    toast.success("Reset link sent to your email!");
    console.log({ email });
    router.replace("/Login");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-slate-700">Forgot Password?</h2>
          <p className="text-sm text-slate-400 mt-1">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

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

        <button
          type="submit"
          className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95
            text-white font-bold py-3 rounded-xl
            shadow-lg shadow-indigo-300/50
            transition-all duration-200"
        >
          Send Reset Link
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <p className="text-center text-sm text-slate-500">
          Remember your password?{" "}
          <a href="/Login" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
            Login
          </a>
        </p>

      </form>
    </>
  );
}
