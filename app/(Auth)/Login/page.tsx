import LoginForm from "./LoginForm";
export default function Login() {
	return (
		<section
			className="min-h-screen flex items-center justify-center mt-10"
			style={{
				background:
					"linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #f5f3ff 100%)",
			}}
		>
			<div className="fixed top-0 left-0 w-72 h-72 bg-indigo-300/30 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
			<div className="fixed bottom-0 right-0 w-96 h-96 bg-violet-300/30 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

			<div className="relative z-10 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-indigo-100 p-10 w-full max-w-md mx-4">
				<div className="mb-8">
					<span className="text-indigo-500 text-xs font-bold tracking-[0.2em] uppercase bg-indigo-100 px-3 py-1 rounded-full">
						Welcome Back
					</span>
					<h1 className="text-3xl font-extrabold text-slate-800 mt-4">Login</h1>
					<p className="text-slate-400 text-sm mt-1">
						Sign in to your account to continue
					</p>
				</div>
				<LoginForm />
			</div>
		</section>
	);
}
