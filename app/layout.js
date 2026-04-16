import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "BitLinks - Premium URL Shortener",
  description: "The most straightforward and professional URL shortener in the market.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased grid-bg min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
