import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS manually
import NavBar from "@/components/NavBar";
import MyFooter from "@/components/MyFooter";
import Toast from "@/components/Toast";
config.autoAddCss = false; // Prevent Font Awesome from adding CSS automatically


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keeper",
  description: "An app to keep track of your tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen max-h-[100%]  text-white`}
      >
        <Toast/>
        <NavBar/>
        {children}
        <MyFooter/>
      </body>
    </html>
  );
}
