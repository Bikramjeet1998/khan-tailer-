import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't fail Vercel builds on lint warnings
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
