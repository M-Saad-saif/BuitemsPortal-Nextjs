"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  const toolLinks = [
    { href: "/gpa-calculator", label: "GPA Calculator" },
    { href: "/cgpa-calculator", label: "CGPA Calculator" },
    { href: "/aggregate-calculator", label: "Aggregate" },
    { href: "/front-pages", label: "Front Pages" },
    { href: "/timetable", label: "Timetable" },
    { href: "/fac-and-dept", label: "Faculties" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="navbar-bg shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-3 text-[#ffd700] font-bold text-xl hover:opacity-90 transition-opacity"
          >
            <span className="hidden sm:block text-2xl">BUITEMS </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-white/20 text-[#ffd700] "
                    : "text-blue-100 hover:bg-white/10 hover:text-[#ffd700]"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  toolLinks.some((link) => isActive(link.href))
                    ? "bg-white/20 text-[#ffd700]"
                    : "text-blue-100 hover:bg-white/10 hover:text-[#ffd700"
                }`}
              >
                Tools
                <svg
                  className={`w-4 h-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {toolsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setToolsOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40">
                    <div className="py-5 " role="menu">
                      {toolLinks.map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setToolsOpen(false)}
                          className={`block px-4 py-2 text-sm  ${
                            isActive(href)
                              ? "bg-gray-100 text-gray-900 "
                              : "text-gray-700  hover:text-[#ffd700] hover:bg-[#1a3c6e] "
                          }`}
                          role="menuitem"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <Link
                  href="/portal"
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
                    isActive("/portal")
                      ? "bg-white/20 text-white"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {user.profilePic && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <Image
                      src={user.profilePic}
                      alt=""
                      className="w-6 h-6 rounded-full object-cover"
                      height={50}
                      width={50}
                    />
                  )}
                  {user.name?.split(" ")[0]}
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-amber-400 hover:bg-amber-500 text-gray-900 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md text-blue-100 hover:bg-white/10 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#1a3c6e]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-white/20 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Mobile Tools Section */}
            <div className="pt-2">
              <div className="px-3 py-2 text-sm font-medium text-blue-100 opacity-75">
                Tools
              </div>
              {toolLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2 pl-6 rounded-md text-sm font-medium transition-colors ${
                    isActive(href)
                      ? "bg-white/20 text-white"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-1">
              {user ? (
                <>
                  <Link
                    href="/portal"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-white/10"
                  >
                    My Portal ({user.name?.split(" ")[0]})
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="text-left px-3 py-2 rounded-md text-sm font-medium text-red-300 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-blue-100 hover:bg-white/10"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm font-medium bg-amber-400 text-gray-900 text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
