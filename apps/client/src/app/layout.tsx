import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from '@clerk/nextjs'
import { FilterProvider } from "@/context/FilterContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="m-5 font-inter">
          <FilterProvider>
            <Navbar />
            {children}
          </FilterProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
