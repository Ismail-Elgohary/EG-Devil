import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

interface UserType {
 id: string;
 email: string;
 name?: string;
 image?: string;
 role: "admin" | "user";
}

async function checkUser(
 email: string,
 password: string
): Promise<UserType | null> {
 if (
  email === process.env.mEmail &&
  password === process.env.mPassword
 ) {
  return {
   id: "1",
   email,
   role: "admin",
  };
 }

 if (
  email === process.env.userEmail &&
  password === process.env.userPassword
 ) {
  return {
   id: "2",
   email,
   role: "user",
  };
 }

 return null;
}

export const authOptions: NextAuthOptions = {
 providers: [
  GitHubProvider({
   clientId: process.env.GITHUB_CLIENT_ID as string,
   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  }),

  CredentialsProvider({
   name: "Credentials",
   credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
   },

   async authorize(credentials) {
    if (!credentials) return null;

    return await checkUser(
     credentials.email,
     credentials.password
    );
   },
  }),
 ],

 session: {
  strategy: "jwt",
  maxAge: 3 * 24 * 60 * 60,
 },

 callbacks: {
  async jwt({ token, user, account }) {
   if (user) {
    token.id = user.id;
    token.email = user.email;
    token.role = user.role ?? "user";
   }

   if (account?.provider === "github") {
    token.role =
     token.email === process.env.mEmail
      ? "admin"
      : "user";
   }

   return token;
  },

  async session({ session, token }) {
   session.user = {
    ...session.user,
    id: token.id as string,
    email: token.email as string,
    role: token.role as "admin" | "user",
   };

   return session;
  },

  async redirect({ baseUrl, token }) {
   if (token?.role === "admin") {
    return baseUrl + "/dashboard";
   }

   return baseUrl + "/";
  },
 },

 pages: {
  signIn: "/Login",
 },

 secret: process.env.NEXTAUTH_SECRET,
};
