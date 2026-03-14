import Link from "next/link";
import React from "react";
import Button from "../UI/button";

import { FaCalculator, FaSchool } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { ImCalculator } from "react-icons/im";
import { IoIosPaper } from "react-icons/io";
import { CiLink } from "react-icons/ci";
import { PiStudentBold } from "react-icons/pi";

const features = [
  {
    href: "gpa-calculator",
    icon: FaCalculator,
    title: "GPA Calculator",
    desc: "Calculate your semester GPA instantly. Enter your subjects, credit hours, and grades.",
    color: "from-blue-500 to-blue-600",
  },
  {
    href: "cgpa-calculator",
    icon: FaCalculator,
    title: "CGPA Calculator",
    desc: "Track your cumulative GPA across all semesters for accurate academic performance.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    href: "aggregate-calculator",
    icon: ImCalculator,
    title: "Aggregate Calculator",
    desc: "Calculate your admission aggregate based on Matric, FSc, and entry test scores.",
    color: "from-violet-500 to-violet-600",
  },
  {
    href: "front-pages",
    icon: IoIosPaper,
    title: "Assignment Front Pages",
    desc: "Generate professional assignment front pages instantly. Multiple templates available.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    href: "timetable",
    icon: FaTableCells,
    title: "Timetable",
    desc: "View and manage your class timetable for the semester.",
    color: "from-amber-500 to-amber-600",
  },
  {
    href: "fac-and-dept",
    icon: FaSchool,
    title: "Faculties & Departments",
    desc: "Explore all faculties and departments offered at BUITEMS.",
    color: "from-rose-500 to-rose-600",
  },
  {
    href: "portal",
    icon: PiStudentBold,
    title: "Student Portal",
    desc: "Your personal academic portal — store records, track CGPA, manage your profile.",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    href: "about",
    icon: CiLink,
    title: "About",
    desc: "Learn more about the BUITEMS Portal and the developer behind it.",
    color: "from-slate-500 to-slate-600",
  },
];

const ToolsCard = () => {
  return (
      <section className="py-8 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Our Features
            </h2>
            <div className="w-20 h-1 bg-[#1546c2] mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-3">
              Everything you need in one place
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ href, icon: Icon, title, desc, color }) => (
              <Link
                key={href}
                href={href}
                className="group relative bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 overflow-hidden justify-items-center"
              >
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1546c2]/0 to-[#1546c2]/0 group-hover:from-[#1546c2]/5 group-hover:to-[#005eff]/5 transition-all duration-300"></div>

                {/* Decorative Line */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-[#1546c2] to-[#005eff] group-hover:w-full transition-all duration-300"></div>

                {/* Icon Container */}
                <div className="relative mb-5">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
                  >
                    <Icon className="text-white" size={28} />
                  </div>
                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-br ${color} rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300`}
                  ></div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#1546c2] transition-colors text-center">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 text-justify">
                  {desc}
                </p>
                <Button href={href}/>
                
              </Link>
            ))}
          </div>
        </div>
      </section>
  );
};

export default ToolsCard;
