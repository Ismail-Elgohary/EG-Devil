import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/componentes/Header/page";
import Footer from "@/app/componentes/Footer/page";
import { ToastContainer} from 'react-toastify';
import CartProvider from "./context/Cartshop";

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
      >
		<CartProvider>
        <Header />
		<ToastContainer />
		<main className="mt-20 container mx-auto px-4 py-4">
        {children}
		</main>
		<Footer />
		</CartProvider>
      </body>
    </html>
  );
}
