import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vpmmxlzjrpcpbjpsgapb.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },

      {
        protocol: "https",
        hostname: "apec-learning-web.vercel.app",
        pathname: "/image/**",
      },
    ],
  },
};

export default nextConfig;
