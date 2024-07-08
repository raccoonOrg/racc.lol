/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["api.racc.lol"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/invite',
        destination: 'https://discord.com/oauth2/authorize?client_id=1212120152338866216&permissions=2048&integration_type=0&scope=bot',
        permanent: true,
      }
    ]
  },
};

module.exports = nextConfig;
