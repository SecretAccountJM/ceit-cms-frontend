import "./globals.css"; // This connects your CSS to the whole site
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageViewTracker from "@/components/PageViewTracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CEIT - Home",
    template: "CEIT - %s",
  },
  description: "College of Engineering and Information Technology — Pamantasan ng Lungsod ng Valenzuela",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageViewTracker />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
