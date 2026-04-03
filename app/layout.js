import "@/styles/globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://buitems-portal.vercel.app"),
  icons: {
    icon: "/images/buitemIcon.ico",
  },
  title: {
    default:
      "BUITEMS Student Portal · Academic Tools, Student Portal & AI Assistant",
    template: "%s · BUITEMS Portal",
  },
  description:
    "Student portal for BUITEMS student.Also access to GPA calculator, CGPA calculator, aggregate calculator, interactive timetable, assignment front page generator, and AI study assistant. Built with Next.js 14.",
  keywords: [
    "Buitems portal",
    "Buitems",
    "Buitems student portal",
    "Buitems GPA calculator",
    "Buitems CGPA calculator",
    "aggregate calculator Buitems",
    "university timetable",
    "assignment front page generator",
    "Buitems faculties",
    "Buitems departments",
    "student academic tools",
    "Next.js student portal",
    "MongoDB university portal",
    "AI study assistant",
    "education technology",
    "university management system",
    "Buitems developer",
  ],
  authors: [{ name: "Saad Saif", url: "https://saadsaif.vercel.app/" }],
  creator: "M. Saad Saif",
  publisher: "M.Saad Saif",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buitems-portal.vercel.app",
    title: "BUITEMS Student Portal · Academic Tools, AI Assistant",
    description:
      "Complete academic toolkit: GPA/CGPA calculators, interactive timetable, front page generator, AI Integrated, and profile management.",
    siteName: "BUITEMS Student Portal",
    images: [
      {
        url: "https://buitems-portal.vercel.app/images/buitems-logo.png",
        width: 1200,
        height: 630,
        alt: "BUITEMS Student Portal - Academic Tools Dashboard",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  category: "education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-50">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
        </AuthProvider>
      </body>
    </html>
  );
}
