import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the "N" dev-tools badge. Compile and runtime errors still show in development.
  devIndicators: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    // YouTube video thumbnails on the Videos page.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;
