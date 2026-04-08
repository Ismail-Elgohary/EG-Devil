"use client";

import { LogIn, UserPlus, UserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ALoginPage() {
	const [userMenu, setUserMenu] = useState(false);
	const { data: session } = useSession();

	const userLinks = [
		{ name: "Login", href: "/Login", icon: LogIn },
		{ name: "Register", href: "/Register", icon: UserPlus },
		{ name: "Profile", href: "/Profile", icon: UserPlus },

	];

	return (
		<div
			className="relative"
			onMouseEnter={() => setUserMenu(true)}
			onMouseLeave={() => setUserMenu(false)}
		>
			<button className="p-2 rounded-lg hover:bg-white/5 transition">
				{session?.user?.image ? (
					<Image
						src={session.user.image}
						alt="User"
						width={32}
						height={32}
						className="rounded-full"
					/>
				) : (
					<UserRound
						size={20}
						className="text-gray-400 hover:text-indigo-400 transition"
					/>
				)}
			</button>

			{userMenu && (
				<div className="absolute right-0 top-full pt-2 w-52">
					<div className="bg-[#1A1A1A] border border-gray-800 rounded-lg shadow-xl py-2">

						{session ? (
							<>
								<div className="flex items-center gap-2 px-3 py-2">
									{session.user?.image && (
										<Image
											src={session.user.image}
											alt="User"
											width={30}
											height={30}
											className="rounded-full"
										/>
									)}
									<p className="text-sm text-gray-300">
										{session.user?.email}
									</p>
								</div>

								<button
									onClick={() => signOut()}
									className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-500/10"
								>
									Logout
								</button>

								<Link href="/Profile"
									className="w-full text-left px-3 py-2 text-blue-500 hover:bg-indigo-500/10"
								>
									Porfile
								</Link>
							</>
						) : (
							userLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className="flex items-center gap-3 px-3 py-3 hover:bg-indigo-600 transition"
								>
									<link.icon size={18} />
									<p className="text-sm text-white">{link.name}</p>
								</Link>
							))
						)}

					</div>
				</div>
			)}
		</div>
	);
}
