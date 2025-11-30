/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // 🔥 TURBOPACK KAPALI
  },
  webpack: true, // 🔥 WEBPACK AÇIK
  reactCompiler: true,
};

module.exports = nextConfig;
module.exports = {
  serverActions: {
    bodySizeLimit: '200mb', // ister 20mb de yapabilirsin
  },
};
