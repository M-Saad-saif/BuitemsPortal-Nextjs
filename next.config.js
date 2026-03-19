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
        source: "/",
        destination: "https://buitems-portal.vercel.app",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
