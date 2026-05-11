import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
 const { pathname } = req.nextUrl;

 const publicPages = ["/Login", "/Register", "/ForgotPassword"];
 const userPages = ["/Profile", "/addProduct"];
 const adminPages = ["/dashboard"];

 if (publicPages.some(page => pathname.startsWith(page))) {
  return NextResponse.next();
 }

 const token = await getToken({
  req,
  secret: process.env.NEXTAUTH_SECRET,
 });

 if (
  (userPages.some(p => pathname.startsWith(p)) ||
   adminPages.some(p => pathname.startsWith(p))) &&
  !token
 ) {
  return NextResponse.redirect(new URL("/Login", req.url));
 }

 if (
  adminPages.some(p => pathname.startsWith(p)) &&
  token?.role !== "admin"
 ) {
  return NextResponse.redirect(new URL("/", req.url));
 }

 return NextResponse.next();
}

export const config = {
 matcher: [
  "/Profile/:path*",
  "/addProduct/:path*",
  "/dashboard/:path*",
 ],
};
