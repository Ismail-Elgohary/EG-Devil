"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<div className="h-screen flex items-center justify-center text-lg font-semibold">
				Loading...
			</div>
		);
	}

	if (!session) {
		return (
			<div className="h-screen flex items-center justify-center text-lg font-semibold text-red-500">
				Please sign in to view this page.
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
			<div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md text-center">
				<div className="flex justify-center mb-4">
					<Image
						src={session.user?.image || "/user.png"}
						alt="user"
						width={100}
						height={100}
						className="rounded-full border-4 border-indigo-200 shadow-md"
					/>
				</div>

				<h2 className="text-2xl font-bold text-gray-800">
					{session.user?.name || "No Name"}
				</h2>

				<p className="text-gray-500 mt-1">{session.user?.email}</p>

				<div className="my-6 border-t"></div>

				<div className="text-left space-y-2 text-sm text-gray-600">
					<p>
						<span className="font-semibold">User ID:</span>{" "}
						{session.user?.name || "N/A"}
					</p>
					<p>
						<span className="font-semibold">Status:</span> Logged In
					</p>
				</div>

				<button
					onClick={() => signOut({ callbackUrl: window.location.origin + "/Login" })}
					className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
				>
					Logout
				</button>
			</div>
		</div>
	);
}
