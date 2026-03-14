import Link from "next/link";
import React from "react";

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

const ToolsCard = () => {
  return (
    <div>
      <section className="py-1  px-4">
        <div className="max-w-6xl mx-auto">
     

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-9 text-center justify-items-center">
            {features.map(({ href, icon, title, desc, color }) => (
              <Link
                key={href}
                href={href}
                className="card hover:shadow-md hover:-translate-y-1 transition-all duration-200 group justify-items-center"
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
    </div>
  );
};

export default ToolsCard;
