import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

interface Admin {
	id: string;
	email: string;
	name?: string;
	image?: string;
}

async function checkUser(email: string, password: string): Promise<Admin | null> {
	const dummyUser = { id: "1", email: process.env.mEmail! };
	if (email === process.env.mEmail! && password === process.env.mPassword!) {
		return dummyUser;
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
				return await checkUser(credentials.email, credentials.password);
			},
		}),
	],
	session: { strategy: "jwt", maxAge: 3 * 24 * 60 * 60 },
	callbacks: {

		async jwt({ token, user }) {
			if (user) token = { ...token, ...user };
			return token;
		},

		async session({ session, token }) {
			session.user = token as any;
			return session;
		},

		async redirect({ url, baseUrl }) {
			if (url.startsWith("/")) return `${baseUrl}${url}`
			else if (new URL(url).origin === baseUrl) return url
			return baseUrl
		},
	},
	pages: { signIn: "/Login" },
	secret: process.env.NEXTAUTH_SECRET,
};
