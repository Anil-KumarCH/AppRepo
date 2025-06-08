// src/app/layout.tsx
import type { Metadata } from "next";
// Using a standard font like Inter is a good practice.
// Ensure you have `next/font` installed.
import { Inter } from "next/font/google"; 

import "../../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { PageWrapper } from "./page-wrapper"; // Import the new client wrapper component

// Initialize the font
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', // Optional: if you want to use it as a CSS variable
});

// Use the recommended Metadata API for Server Components
export const metadata: Metadata = {
  title: "Anil Kumar - Portfolio",
  description: "DevOps Engineer of Anil Kumar",
  // The viewport meta tag is now included by default in Next.js 13+
  // but this is how you would customize it if needed.
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: "/assets/loading_logo.png", // Path to your favicon in the public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* The font class is applied to the body for consistent typography */}
      <body className={`${inter.variable} main-body-container`}>
        {/* PageWrapper handles the client-side loading screen and animations */}
        <PageWrapper>
          <Navbar />
          {children}
          <Footer />
        </PageWrapper>
      </body>
    </html>
  );
}
