/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
    ],
  },

  async redirects() {
    return [
      {
        source: "https://buitems-portal-nextjs.vercel.app",       // replace with your previous link
        destination: "https://buitems-portal.vercel.app",  // replace with your new link
        permanent: true,           // 301 redirect
      },
    ];
  },
};

module.exports = nextConfig;