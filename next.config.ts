import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image de production autoportée (Dockerfile Coolify) : .next/standalone
  output: "standalone",
};

export default nextConfig;
