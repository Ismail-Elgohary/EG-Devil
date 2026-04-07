"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterForm() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [user, setUser] = useState("");
	const [confirm, setConfirm] = useState("");
	const router = useRouter();

	const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (name === "" || email === "" || password === "" || user === "" || confirm === "") {
			toast.error("Please Fill All Fields");
			return;
		}


		const isGmail = email.toLowerCase().endsWith("@gmail.com");
		if (!isGmail) {
			toast.error("Email must be a Gmail address (@gmail.com)");
			return;
		}

		console.log({ name, email, password, user, confirm });
		router.replace("/");
	};

	return (
		<>
			<form onSubmit={handelSubmit} className="flex flex-col gap-5">

				<div className="flex flex-col gap-1.5">
					<label htmlFor="email" className="text-sm font-semibold text-slate-700">
						Full Name
					</label>
					<input
						type="name"
						id="name"
						placeholder="your Full Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="border border-indigo-100 rounded-xl px-4 py-3 w-full bg-indigo-50/50
			  focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent
			  text-slate-700 placeholder:text-slate-300 transition-all duration-200"
					/>
				</div>

				<div className="flex flex-col gap-1.5">
					<label htmlFor="Type" className="text-sm font-semibold text-slate-700">
						Type
					</label>
					<select
						id="type"
						value={user}
						onChange={(e) => setUser(e.target.value)}
						className="border border-indigo-100 rounded-xl px-4 py-3 w-full bg-indigo-50/50
              focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent
              text-slate-700 transition-all duration-200">
						<option value="">User</option>
						<option value="t-shirt">Seller</option>
					</select>
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
				<div className="flex flex-col gap-1.5">
					<div className="flex items-center justify-between">
						<label htmlFor="password" className="text-sm font-semibold text-slate-700">
							Password
						</label>
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


				<div className="flex flex-col gap-1.5">
					<div className="flex items-center justify-between">
						<label htmlFor="password" className="text-sm font-semibold text-slate-700">
							confirm Password
						</label>
					</div>
					<input
						type="password"
						id="password"
						placeholder="••••••••"
						value={confirm}
						onChange={(e) => setConfirm(e.target.value)}
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
					continue
				</button>



				<button
					type="button"
					onClick={() => signIn("github", { redirect: true, callbackUrl: "/" })}

					className="w-full flex items-center justify-center gap-2
bg-gradient-to-r from-indigo-500 to-purple-600
text-black py-3 rounded-xl font-medium
shadow-lg shadow-indigo-500/20
hover:scale-[1.02] hover:shadow-xl
active:scale-95
transition-all duration-200"
				>
					<span className="text-lg"></span>
					Continue with GitHub
				</button>

				<div className="flex items-center gap-3">
					<div className="flex-1 h-px bg-slate-200" />
					<span className="text-xs text-slate-400">or</span>
					<div className="flex-1 h-px bg-slate-200" />
				</div>

				<p className="text-center text-sm text-slate-500">
					Already have an account ? {" "}
					<a href="/Login" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
						Login in
					</a>
				</p>

			</form>
		</>
	);
}
