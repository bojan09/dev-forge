/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for best practices
  reactStrictMode: true,

  // Image optimization config
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  // Experimental features for App Router
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
