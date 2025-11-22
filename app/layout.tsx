import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Mind-Blowing Facts",
  description: "Mind-Blowing Facts You Won’t Believe!"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} ${mono.variable}`}>{children}</body>
    </html>
  );
}
