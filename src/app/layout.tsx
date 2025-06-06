// src/app/layout.tsx
"use client"; // Required because we're using useState and useEffect

import React, { useState, useEffect } from "react";
// import { Geist, Geist_Mono } from "next/font/google"; // Assuming Geist is not used or defined elsewhere
import "../../styles/globals.css"; // Ensure this path is correct
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import LoadingScreen from "../components/loading";
import { AnimatePresence } from "framer-motion";

// If you are using Geist fonts, ensure they are correctly configured and imported.
// For example:
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust duration as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, []); // Empty dependency array so it runs only once on mount

  return (
    <html lang="en">
      <head>
        <title>Anil Kumar - Portfolio</title>
        <meta name="description" content="DevOps Engineer and Full Stack Developer Portfolio of Anil Kumar" />
        {/* *** ADDED VIEWPORT META TAG FOR RESPONSIVENESS *** */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/loading_logo.png" /> {/* Ensure path is correct (public folder) */}
      </head>
      {/* Apply font variables to body if Geist (or other fonts) are used */}
      {/* <body className={`${geistSans.variable} ${geistMono.variable} main-body-container`}> */}
      <body className="main-body-container"> {/* Removed font variables if not defined/used */}
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen key="loadingScreen" />}
        </AnimatePresence>

        <div className={`app-content ${isLoading ? 'hidden-during-load' : 'visible-after-load'}`}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
