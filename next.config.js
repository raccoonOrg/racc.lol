/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["api.capy.lol"],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;
