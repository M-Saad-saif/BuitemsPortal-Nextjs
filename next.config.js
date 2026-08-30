/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
    ],
  },

  experimental: {
    serverComponentsExternalPackages: ["pdfjs-dist"],
  },
};

module.exports = nextConfig;
