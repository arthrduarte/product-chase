import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from '@clerk/nextjs'
import { FilterProvider } from "@/context/FilterContext";
import { Toaster } from "@/components/ui/toaster";

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
            <Toaster />
          </FilterProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
