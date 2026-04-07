import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
export const authOptions: AuthOptions = {

	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 3 * 24 * 60 * 60,
	},

	callbacks: {
	},
	secret: process.env.NEXTAUTH_SECRET,

	pages: {
		signIn: "../../(Auth)/Login/",
	},
};

