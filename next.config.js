/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image izinleri
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qjmrvrlicniqcpdgqpsg.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

module.exports = nextConfig;
