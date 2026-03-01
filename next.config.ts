import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    domains: ["ik.imagekit.io", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
