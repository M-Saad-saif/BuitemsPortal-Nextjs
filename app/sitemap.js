export default function sitemap() {
  const baseURL = "https://buitems-portal.vercel.app";
  const lastModified = new Date("2026-03-30");

  return [
    {
      url: `${baseURL}/`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseURL}/about`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseURL}/gpa-calculator`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseURL}/cgpa-calculator`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseURL}/aggregate-calculator`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseURL}/front-pages`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseURL}/timetable`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseURL}/fac-and-dept`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseURL}/portal`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
