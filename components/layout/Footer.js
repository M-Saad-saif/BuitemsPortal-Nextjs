// components/layout/Footer.js — Converted from src/components/Footer.js

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="navbar-bg text-blue-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Branding */}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">BUITEMS Portal</h3>
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
                { href: "/aggregate-calculator", label: "Aggregate Calculator" },
                { href: "/front-pages", label: "Assignment Front Pages" },
                { href: "/fac-and-dept", label: "Faculties & Departments" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
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
              Built by <span className="text-white font-medium">Saad Saif</span>
            </p>
            <p className="text-sm text-blue-200">
              Computer Science Student | MERN Stack Developer
            </p>
            <a
              href="https://github.com/M-Saad-saif"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm text-amber-300 hover:text-amber-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub Profile
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-blue-300">
          © {year} BUITEMS Portal. Made with ❤️ by Saad Saif.
        </div>
      </div>
    </footer>
  );
}
