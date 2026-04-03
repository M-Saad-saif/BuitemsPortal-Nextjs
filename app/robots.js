export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/portal/"],
      },
    ],
    sitemap: "https://buitems-portal.vercel.app/sitemap.xml",
  };
}
