// src/app/page-wrapper.tsx
"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "../components/loading";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the loading screen after a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // The empty dependency array ensures this runs only once on mount

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loadingScreen" />}
      </AnimatePresence>

      {/* This div wraps your main content and fades it in after the loading screen disappears */}
      <div className={`app-content ${isLoading ? 'hidden-during-load' : 'visible-after-load'}`}>
        {children}
      </div>
    </>
  );
}
