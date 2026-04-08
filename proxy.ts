import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;

	const publicPages = ["/Login", "/Register", "/ForgotPassword"];
	const protectedPages = ["/Profile", "/addProduct"];

	if (publicPages.some(page => pathname.startsWith(page))) {
		return NextResponse.next();
	}

	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (protectedPages.some(page => pathname.startsWith(page)) && !token) {
		return NextResponse.redirect(new URL("/Login", req.url));
	}

	return NextResponse.next();
}
export const config = {
	matcher: [
		"/Profile/:path*",
		"/Login/:path*",
		"/Register/:path*",
		"/ForgotPassword/:path*",
		"/addProduct/:path*"
	],
};
