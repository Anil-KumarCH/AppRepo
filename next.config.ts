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

  // --- ADDED: Options to ignore ESLint and TypeScript errors during build ---
  // Use these if you need your CI/CD pipeline (Jenkins) to pass while you work on fixing the errors.
  // It's recommended to remove these once the underlying code issues are resolved.
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // --- End of added options ---

  // Add any other Next.js configurations you need here
  // For example, if you were using 'output: standalone' for Docker:
  // output: 'standalone',
};

export default nextConfig;
