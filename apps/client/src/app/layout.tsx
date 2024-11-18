import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from '@clerk/nextjs'
import { FilterProvider } from "@/context/FilterContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: 'Product Chase',
  description: 'Discover and share amazing products',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏹</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
};

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
