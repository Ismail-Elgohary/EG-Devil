import Footer from "@/app/componentes/Footer/page";
import Header from "@/app/componentes/Header/page";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import CartProvider from "./(base)/context/Cartshop";
import HeartProvider from "./(base)/context/FavoritesContext";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "EG-Devil",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>   <Providers>
					<HeartProvider>
						<CartProvider>
							<Header />
							<ToastContainer />
							<main className="mt-16">{children}</main>
							<Footer />
						</CartProvider>
					</HeartProvider>
				</Providers>
			</body>
		</html>
	);
}
