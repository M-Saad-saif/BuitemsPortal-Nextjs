import Link from "next/link";

import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoCodeSlashSharp } from "react-icons/io5";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="navbar-bg text-blue-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">
              BUITEMS Portal
            </h3>
            <p className="text-sm text-blue-200 leading-relaxed">
              A student-focused web platform providing essential academic tools
              — GPA calculator, CGPA tracker, assignment front pages, and a
              secure student portal.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/gpa-calculator", label: "GPA Calculator" },
                { href: "/cgpa-calculator", label: "CGPA Calculator" },
                {
                  href: "/aggregate-calculator",
                  label: "Aggregate Calculator",
                },
                { href: "/front-pages", label: "Assignment Front Pages" },
                { href: "/fac-and-dept", label: "Faculties & Departments" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h4 className="text-white font-semibold mb-3">Developer</h4>
            <p className="text-sm text-blue-200 mb-2">
              Built by{" "}
              <span className="text-white font-medium">Muhammad Saad Saif</span>
            </p>
            <p className="text-sm text-blue-200">
              Computer Science Student | MERN Stack , Next.js
            </p>
            <ul className="mt-4 flex flex-wrap gap-4 text-sm">
              {[
              {
                icon: FaGithub,
                href: "https://github.com/M-Saad-saif",
                label: "GitHub Profile",
              },
              {
                icon: IoCodeSlashSharp,
                href: "https://saadsaif.vercel.app",
                label: "Portfolio",
              },
              {
                icon: FaInstagram,
                href: "https://www.instagram.com/saadsaifsheikh/",
                label: "Instagram",
              },
              {
                icon: FaLinkedin,
                href: "https://www.linkedin.com/in/muhammad-saad-saif-10b38a360/",
                label: "Linkedin",
              },
              ].map(({ icon: Icon, href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex flex-col items-center gap-2 text-yellow-400 hover:text-yellow-200 transition-colors"
                  >
                    <Icon aria-hidden="true" focusable="false" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-blue-300">
          © {year} BUITEMS Portal
        </div>
      </div>
    </footer>
  );
}
