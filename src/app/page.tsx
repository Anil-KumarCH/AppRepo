"use client";

import React, { useState, useEffect, useCallback } from "react";
import Hero from "../components/hero";
import AboutMe from "../components/aboutme"; // Corrected: Assuming default export based on previous context
import Projects from "../components/projects";
import Education from "../components/education";
import Skills from "@/components/skills"; // Assuming this is the correct export name for your skills component (e.g., SkillNebulaV3)
import LinkedIn from "@/components/LinkedIn";
import DevTo from "@/components/devTo"; // Corrected: Assuming default export
import Contact from "@/components/contact"; // Corrected: Assuming default export
import Feedback from "../components/feedback"; // Corrected the import path

import "../../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Removed DevToSectionProps interface as it's better defined in DevToSection.tsx itself
// interface DevToSectionProps {
//   username: string;
// }

export default function Home() {
  const devToUsername = "anil_kumar_ff4f6ad3549983";

  // State for end-of-page features
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // --- IMPORTANT: Replace with your actual links ---
  const resumeUrl = "/assets/Anil_resume_new_DevOps_TCS.pdf"; // Place your resume in public/assets/ or public/
  const googleFormUrl = "https://forms.gle/kvMwjWJs7ywPtEGQ7"; // Replace this!
  // ---

  const handleScrollEnd = useCallback(() => {
    // Check if we are near the bottom of the page
    const threshold = 200; // Pixels from the bottom to trigger
    if (
      typeof window !== "undefined" && // Ensure window is defined (client-side)
      !hasReachedEnd &&
      (window.innerHeight + window.scrollY) >= document.body.offsetHeight - threshold
    ) {
      setHasReachedEnd(true); // Trigger only once

      // 1. Trigger Resume Download
      console.log("Attempting to download resume...");
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.setAttribute("download", "Anil_Kumar_Resume.pdf"); // Or your desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log("Resume download initiated.");

      // 2. Show Feedback Modal after a short delay
      setTimeout(() => {
        setShowFeedbackModal(true);
        console.log("Feedback modal triggered.");
      }, 1500); // Delay to allow download to start and not be too abrupt
    }
  }, [hasReachedEnd, resumeUrl]); // resumeUrl added as dependency

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScrollEnd, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScrollEnd);
      };
    }
  }, [handleScrollEnd]); // Dependency on the memoized handleScrollEnd

  return (
    <> {/* Use Fragment to wrap main and modal */}
      <main className="flex flex-col items-center justify-center w-full">
        {/* Hero Section */}
        <section
          className="h-screen w-full flex items-center justify-center hero-section"
          id="Hero"
        >
          <Hero />
        </section>

        {/* About Me Section */}
        <section
          className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-black to-gray-900 p-6"
          id="AboutMe"
        >
          <AboutMe />
        </section>

        {/* Education Section */}
        <section
          className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-black to-gray-900 p-6"
          id="Education"
        >
          <Education />
        </section>

        {/* Projects Section */}
        <section
          className="min-h-screen w-full flex items-center justify-center bg-black p-6"
          id="Projects"
        >
          <Projects />
        </section>

        {/* Skills Section */}
        <section
          className="min-h-screen w-full flex items-center justify-center bg-black p-6"
          id="Skills" // Ensure this ID matches the one in your Navbar
        >
          <Skills /> {/* Ensure this is the correct component name */}
        </section>

        {/* LinkedIn Section */}
        <section
          className="min-h-screen w-full flex items-center justify-center bg-black p-6"
          id="LinkedIn"
        >
          <LinkedIn />
        </section>

        {/* Dev.to Section */}
        {/* The extra div around this section was in your provided code, keeping it */}
        <div> 
          <section
            className="min-h-screen w-full flex items-center justify-center bg-black p-6"
            id="DevTo" // Corrected ID based on previous Navbar context
          >
            <DevTo username={devToUsername} />
          </section>
        </div>

        {/* Contact Section */}
        <section
          className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-black to-gray-900 p-6"
          id="Contact" // Corrected ID based on previous Navbar context
        >
          <Contact />
        </section>
      </main>

      <Feedback
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        googleFormUrl={googleFormUrl}
      />
    </>
  );
}
