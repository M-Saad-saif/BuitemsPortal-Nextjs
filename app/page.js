"use client";
// app/page.js — Converted from src/components/Home.js

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

const features = [
  {
    href: "/gpa-calculator",
    icon: "🧮",
    title: "GPA Calculator",
    desc: "Calculate your semester GPA instantly. Enter your subjects, credit hours, and grades.",
    color: "from-blue-500 to-blue-600",
  },
  {
    href: "/cgpa-calculator",
    icon: "📊",
    title: "CGPA Calculator",
    desc: "Track your cumulative GPA across all semesters for accurate academic performance.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    href: "/aggregate-calculator",
    icon: "📐",
    title: "Aggregate Calculator",
    desc: "Calculate your admission aggregate based on Matric, FSc, and entry test scores.",
    color: "from-violet-500 to-violet-600",
  },
  {
    href: "/front-pages",
    icon: "📄",
    title: "Assignment Front Pages",
    desc: "Generate professional assignment front pages instantly. Multiple templates available.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    href: "/timetable",
    icon: "🗓️",
    title: "Timetable",
    desc: "View and manage your class timetable for the semester.",
    color: "from-amber-500 to-amber-600",
  },
  {
    href: "/fac-and-dept",
    icon: "🏛️",
    title: "Faculties & Departments",
    desc: "Explore all faculties and departments offered at BUITEMS.",
    color: "from-rose-500 to-rose-600",
  },
  {
    href: "/portal",
    icon: "🔐",
    title: "Student Portal",
    desc: "Your personal academic portal — store records, track CGPA, manage your profile.",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    href: "/about",
    icon: "ℹ️",
    title: "About",
    desc: "Learn more about the BUITEMS Portal and the developer behind it.",
    color: "from-slate-500 to-slate-600",
  },
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-bg text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/buitems-logo.png"
            alt="BUITEMS Logo"
            className="h-20 w-20 mx-auto mb-6 rounded-xl bg-white p-2 object-contain shadow-xl"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to BUITEMS Portal
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Your all-in-one academic toolkit — GPA calculator, CGPA tracker,
            assignment front pages, and a secure student portal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Link
                href="/portal"
                className="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-xl transition-colors shadow-lg"
              >
                Go to My Portal
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-xl transition-colors shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-3 border-2 border-white/50 hover:border-white text-white font-semibold rounded-xl transition-colors"
                >
                  Login
                </Link>
              </>
            )}
            <Link
              href="/gpa-calculator"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/20"
            >
              Try GPA Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b py-8">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Students Helped", value: "1,000+" },
            { label: "Calculations Done", value: "50,000+" },
            { label: "Front Pages Generated", value: "10,000+" },
            { label: "Departments Listed", value: "20+" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-brand-primary">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Everything You Need
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Academic tools designed specifically for BUITEMS students
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ href, icon, title, desc, color }) => (
              <Link
                key={href}
                href={href}
                className="card hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl mb-4 shadow-md`}
                >
                  {icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Banner ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-3xl">🤖</span>
          <h2 className="text-2xl font-bold mt-3 mb-3">AI Study Assistant</h2>
          <p className="text-blue-100 mb-6">
            Have questions about your studies? Use the integrated AI assistant
            to get instant answers on any academic topic.
          </p>
          <Link
            href="/portal"
            className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow"
          >
            Try AI Assistant
          </Link>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      {!user && (
        <section className="py-16 px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Ready to manage your academics smarter?
          </h2>
          <p className="text-gray-500 mb-6">
            Create a free account and access your personal portal.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-brand-secondary hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg"
          >
            Create Free Account
          </Link>
        </section>
      )}
    </>
  );
}
