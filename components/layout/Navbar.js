"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import Image from "next/image";

import { FaCalculator, FaSchool } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { ImCalculator } from "react-icons/im";
import { IoIosPaper } from "react-icons/io";
import { CiLink } from "react-icons/ci";
import { PiStudentBold } from "react-icons/pi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toolsRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  const toolLinks = [
    { href: "/gpa-calculator", label: "GPA Calculator", icon: FaCalculator },
    { href: "/cgpa-calculator", label: "CGPA Calculator", icon: FaCalculator },
    {
      href: "/aggregate-calculator",
      label: "Aggregate Calculator",
      icon: ImCalculator,
    },
    { href: "/front-pages", label: "Front Pages", icon: IoIosPaper },
    { href: "/timetable", label: "Timetable", icon: FaTableCells },
    { href: "/fac-and-dept", label: "Faculties & Departments", icon: FaSchool },
  ];

  const isActive = (href) => pathname === href;

  function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a2a4a] shadow-2xl backdrop-blur-sm bg-opacity-95"
            : "bg-[#0f3b66]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-16">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#ffd700] to-amber-500 rounded-lg flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105">
                <span className="text-[#0a2a4a] font-bold text-xl lg:text-2xl">
                  <Image
                    src="/images/buitems-logo.png"
                    alt="B"
                    width={100}
                    height={100}
                  />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#ffd700] font-bold text-lg lg:text-xl tracking-tight">
                  BUITEMS
                </span>
                <span className="text-blue-200 text-xs hidden sm:block">
                  Student Portal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive(href)
                      ? "text-[#ffd700]"
                      : "text-blue-100 hover:text-[#ffd700]"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {label}
                  </span>
                  {isActive(href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffd700] rounded-full" />
                  )}
                  <span className="absolute inset-0 bg-white/0 rounded-lg transition-all duration-200 group-hover:bg-white/10" />
                </Link>
              ))}

              {/* Tools Dropdown */}
              <div className="relative" ref={toolsRef}>
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 group ${
                    toolLinks.some((link) => isActive(link.href))
                      ? "text-[#ffd700]"
                      : "text-blue-100 hover:text-[#ffd700]"
                  }`}
                >
                  <span>Tools</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      toolsOpen ? "rotate-180" : ""
                    }`}
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
                  <span className="absolute inset-0 bg-white/0 rounded-lg transition-all duration-200 group-hover:bg-white/10" />
                </button>

                {toolsOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200 animate-fadeIn">
                    <div className="py-2">
                      {toolLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setToolsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-150 ${
                            isActive(href)
                              ? "bg-[#ffd700]/10 border-l-4 border-[#ffd700]"
                              : "text-gray-700 hover:bg-[#0f3b66] hover:text-[#ffd700]"
                          }`}
                          role="menuitem"
                        >
                          <span className="text-lg">{<Icon />}</span>
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/portal"
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive("/portal")
                        ? "bg-[#ffd700]/20 text-[#ffd700]"
                        : "bg-white/10 text-blue-100 hover:bg-white/20 hover:text-[#ffd700]"
                    }`}
                  >
                    {user.profilePic ? (
                      <Image
                        src={user.profilePic}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#ffd700]/50"
                        height={32}
                        width={32}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffd700] to-amber-500 flex items-center justify-center">
                        <span className="text-[#0a2a4a] font-bold text-sm">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="font-semibold">
                      {capitalizeFirst(user.name?.split(" ")[0])}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/80 hover:bg-red-500 text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-[#ffd700] transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#ffd700] to-amber-500 hover:from-amber-500 hover:to-[#ffd700] text-gray-900   transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center justify-center group"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute h-0.5 w-5 bg-current text-blue-100 transform transition-all duration-300 ${
                    menuOpen ? "rotate-45 top-2" : "top-1"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 bg-current text-blue-100 top-2 transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 bg-current text-blue-100 transform transition-all duration-300 ${
                    menuOpen ? "-rotate-45 top-2" : "top-3"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer to push content below fixed navbar */}
      <div className="h-16 lg:h-16"></div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            className="fixed top-16 left-0 right-0 bottom-0 bg-gradient-to-b from-[#0f3b66] to-[#0a2a4a] z-40 lg:hidden overflow-y-auto animate-slideDown"
          >
            <div className="px-4 py-6 space-y-4">
              {user && (
                <Link href="/portal" onClick={() => setMenuOpen(false)}>
                  <div className="bg-white/10 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      {user.profilePic ? (
                        <Image
                          src={user.profilePic}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-[#ffd700]"
                          height={48}
                          width={48}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffd700] to-amber-500 flex items-center justify-center">
                          <span className="text-[#0a2a4a] font-bold text-lg">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-white font-semibold">
                          {capitalizeFirst(user.name)}
                        </p>
                        <p className="text-blue-200 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Navigation Links */}
              <div className="space-y-1">
                {navLinks.map(({ href, label, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive(href)
                        ? "bg-[#ffd700]/20 text-[#ffd700]"
                        : "text-blue-100 hover:bg-white/10 hover:text-[#ffd700]"
                    }`}
                  >
                    <span className="text-xl">{icon}</span>
                    {label}
                  </Link>
                ))}
              </div>

              {/* Tools Section */}
              <div className="pt-2">
                <div className="px-4 py-2 text-sm font-medium text-blue-200 flex items-center gap-2">
                  <span className="text-lg">🛠️</span>
                  Academic Tools
                </div>
                <div className="space-y-1">
                  {toolLinks.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 pl-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive(href)
                          ? "bg-[#ffd700]/20 text-[#ffd700]"
                          : "text-blue-100 hover:bg-white/10 hover:text-[#ffd700]"
                      }`}
                    >
                      <span className="text-lg">{<Icon />}</span>
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Auth Section */}
              <div className="pt-4 border-t border-white/20 space-y-2">
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/20 transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-100 hover:bg-white/10 transition-all duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#ffd700] to-amber-500 text-gray-900 transition-all duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
