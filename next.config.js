/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
    ],
  },
  // Allow API routes to use larger body sizes for file uploads
  api: {
    bodyParser: false,
  },
};

module.exports = nextConfig;
