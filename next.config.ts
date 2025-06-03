import type { NextConfig } from "next";
import type { Configuration as WebpackConfiguration } from "webpack"; // Import Webpack type for better typing

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Add domains for any external images you use with next/image
    // e.g., if your Dev.to cover images are from 'res.cloudinary.com'
    domains: ['example.com', 'res.cloudinary.com', 'media.dev.to'], // Added common Dev.to domain
  },
  webpack: (
    config: WebpackConfiguration, // Use imported WebpackConfiguration type
    { isServer }: { isServer: boolean }
  ) => {
    // This is a common fix for some packages that try to use 'fs' module on the client-side
    if (!isServer) {
      if (!config.resolve) {
        config.resolve = {}; // Ensure resolve object exists
      }
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}), // Spread existing fallbacks
        fs: false,
      };
    }
    return config;
  },

  // --- IMPORTANT: Errors are no longer ignored during builds ---
  // This will help you identify underlying issues in your code.
  // The default behavior is to not ignore these errors.
  eslint: {
    ignoreDuringBuilds: false, // Changed from true
  },
  typescript: {
    ignoreBuildErrors: false, // Changed from true
  },
  // --- End of important change ---

  // This ensures Next.js outputs a standalone build for Docker
  output: 'standalone',

  // Add any other Next.js configurations you need here
};

export default nextConfig;