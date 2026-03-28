import type { Metadata } from "next";
import { Mulish, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "../styles/tokens.css";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NT Green Market",
  description: "Charity fundraising platform for NashTech employees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", mulish.variable, inter.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
