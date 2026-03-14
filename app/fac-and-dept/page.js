"use client";
// app/fac-and-dept/page.js — Converted from src/components/FacAndDept.js
// Full BUITEMS faculties and departments listing

import { useState } from "react";

const FACULTIES = [
  {
    id: "fit",
    name: "Faculty of Information Technology",
    shortName: "FIT",
    dean: "Prof. Dr. Nasser Azeemi",
    color: "from-blue-500 to-blue-600",
    icon: "💻",
    departments: [
      {
        name: "Computer Science",
        code: "CS",
        programs: [
          { name: "BS Computer Science", duration: "4 Years", type: "BS" },
          { name: "MS Computer Science", duration: "2 Years", type: "MS" },
          { name: "PhD Computer Science", duration: "3+ Years", type: "PhD" },
        ],
        description: "Covers algorithms, AI, software engineering, databases, and networking.",
      },
      {
        name: "Software Engineering",
        code: "SE",
        programs: [
          { name: "BS Software Engineering", duration: "4 Years", type: "BS" },
          { name: "MS Software Engineering", duration: "2 Years", type: "MS" },
        ],
        description: "Focuses on software development lifecycle, project management, and quality assurance.",
      },
      {
        name: "Information Technology",
        code: "IT",
        programs: [
          { name: "BS Information Technology", duration: "4 Years", type: "BS" },
        ],
        description: "Emphasizes IT infrastructure, systems administration, and digital transformation.",
      },
      {
        name: "Cyber Security",
        code: "CYS",
        programs: [
          { name: "BS Cyber Security", duration: "4 Years", type: "BS" },
          { name: "MS Cyber Security", duration: "2 Years", type: "MS" },
        ],
        description: "Covers network security, ethical hacking, cryptography, and digital forensics.",
      },
    ],
  },
  {
    id: "fee",
    name: "Faculty of Electrical Engineering",
    shortName: "FEE",
    dean: "Prof. Dr. Muhammad Azeem",
    color: "from-yellow-500 to-orange-500",
    icon: "⚡",
    departments: [
      {
        name: "Electrical Engineering",
        code: "EE",
        programs: [
          { name: "BE Electrical Engineering", duration: "4 Years", type: "BE" },
          { name: "MS Electrical Engineering", duration: "2 Years", type: "MS" },
          { name: "PhD Electrical Engineering", duration: "3+ Years", type: "PhD" },
        ],
        description: "Covers power systems, electronics, control systems, and telecommunications.",
      },
      {
        name: "Telecommunications",
        code: "TC",
        programs: [
          { name: "BE Telecommunications", duration: "4 Years", type: "BE" },
          { name: "MS Telecommunications", duration: "2 Years", type: "MS" },
        ],
        description: "Focuses on wireless communication, signal processing, and network infrastructure.",
      },
    ],
  },
  {
    id: "fme",
    name: "Faculty of Mechanical Engineering",
    shortName: "FME",
    dean: "Prof. Dr. Bashir Ahmed",
    color: "from-red-500 to-red-600",
    icon: "⚙️",
    departments: [
      {
        name: "Mechanical Engineering",
        code: "ME",
        programs: [
          { name: "BE Mechanical Engineering", duration: "4 Years", type: "BE" },
          { name: "MS Mechanical Engineering", duration: "2 Years", type: "MS" },
        ],
        description: "Covers thermodynamics, fluid mechanics, manufacturing, and machine design.",
      },
      {
        name: "Industrial Engineering",
        code: "IE",
        programs: [
          { name: "BE Industrial Engineering", duration: "4 Years", type: "BE" },
        ],
        description: "Focuses on process optimization, supply chain, and production management.",
      },
      {
        name: "Petroleum & Gas Engineering",
        code: "PGE",
        programs: [
          { name: "BE Petroleum & Gas Engineering", duration: "4 Years", type: "BE" },
          { name: "MS Petroleum Engineering", duration: "2 Years", type: "MS" },
        ],
        description: "Covers drilling, reservoir engineering, production, and natural gas processing.",
      },
    ],
  },
  {
    id: "fce",
    name: "Faculty of Civil Engineering",
    shortName: "FCE",
    dean: "Prof. Dr. Muhammad Hussain",
    color: "from-emerald-500 to-emerald-600",
    icon: "🏗️",
    departments: [
      {
        name: "Civil Engineering",
        code: "CE",
        programs: [
          { name: "BE Civil Engineering", duration: "4 Years", type: "BE" },
          { name: "MS Civil Engineering", duration: "2 Years", type: "MS" },
        ],
        description: "Covers structural design, geotechnical, transportation, and environmental engineering.",
      },
      {
        name: "Architecture",
        code: "ARCH",
        programs: [
          { name: "B.Arch Architecture", duration: "5 Years", type: "BArch" },
          { name: "MS Architecture", duration: "2 Years", type: "MS" },
        ],
        description: "Focuses on architectural design, urban planning, and sustainable construction.",
      },
    ],
  },
  {
    id: "fms",
    name: "Faculty of Management Sciences",
    shortName: "FMS",
    dean: "Prof. Dr. Rehman Gul",
    color: "from-indigo-500 to-indigo-600",
    icon: "📈",
    departments: [
      {
        name: "Business Administration",
        code: "BBA",
        programs: [
          { name: "BBA (Hons)", duration: "4 Years", type: "BBA" },
          { name: "MBA", duration: "2 Years", type: "MBA" },
          { name: "MS Management Sciences", duration: "2 Years", type: "MS" },
          { name: "PhD Management Sciences", duration: "3+ Years", type: "PhD" },
        ],
        description: "Covers marketing, finance, HRM, strategic management, and entrepreneurship.",
      },
      {
        name: "Commerce",
        code: "COM",
        programs: [
          { name: "B.Com", duration: "2 Years", type: "BCom" },
          { name: "M.Com", duration: "2 Years", type: "MCom" },
        ],
        description: "Covers accounting, business law, taxation, and financial reporting.",
      },
    ],
  },
  {
    id: "fas",
    name: "Faculty of Applied Sciences",
    shortName: "FAS",
    dean: "Prof. Dr. Rashid Hameed",
    color: "from-violet-500 to-violet-600",
    icon: "🔬",
    departments: [
      {
        name: "Chemistry",
        code: "CHEM",
        programs: [
          { name: "BS Chemistry", duration: "4 Years", type: "BS" },
          { name: "MS Chemistry", duration: "2 Years", type: "MS" },
        ],
        description: "Covers organic, inorganic, physical chemistry, and biochemistry.",
      },
      {
        name: "Physics",
        code: "PHY",
        programs: [
          { name: "BS Physics", duration: "4 Years", type: "BS" },
          { name: "MS Physics", duration: "2 Years", type: "MS" },
        ],
        description: "Focuses on classical mechanics, quantum physics, optics, and applied physics.",
      },
      {
        name: "Mathematics",
        code: "MATH",
        programs: [
          { name: "BS Mathematics", duration: "4 Years", type: "BS" },
          { name: "MS Mathematics", duration: "2 Years", type: "MS" },
        ],
        description: "Covers pure and applied mathematics, statistics, and computational methods.",
      },
      {
        name: "Pharmacy",
        code: "PHARM",
        programs: [
          { name: "Pharm-D", duration: "5 Years", type: "PharmD" },
          { name: "MS Pharmacy", duration: "2 Years", type: "MS" },
        ],
        description: "Covers pharmaceutical sciences, pharmacology, and clinical pharmacy.",
      },
    ],
  },
  {
    id: "flss",
    name: "Faculty of Language & Social Sciences",
    shortName: "FLSS",
    dean: "Prof. Dr. Fatima Tul Zahra",
    color: "from-rose-500 to-pink-500",
    icon: "📚",
    departments: [
      {
        name: "English",
        code: "ENG",
        programs: [
          { name: "BS English", duration: "4 Years", type: "BS" },
          { name: "MS English", duration: "2 Years", type: "MS" },
        ],
        description: "Covers linguistics, literature, communication skills, and English language teaching.",
      },
      {
        name: "Geology",
        code: "GEO",
        programs: [
          { name: "BS Geology", duration: "4 Years", type: "BS" },
          { name: "MS Geology", duration: "2 Years", type: "MS" },
        ],
        description: "Focuses on earth sciences, mineralogy, sedimentology, and geo-hazards.",
      },
    ],
  },
];

const PROGRAM_COLORS = {
  BS:    "bg-blue-100 text-blue-700",
  BE:    "bg-orange-100 text-orange-700",
  MS:    "bg-indigo-100 text-indigo-700",
  ME:    "bg-purple-100 text-purple-700",
  MBA:   "bg-emerald-100 text-emerald-700",
  BBA:   "bg-teal-100 text-teal-700",
  BCom:  "bg-green-100 text-green-700",
  MCom:  "bg-lime-100 text-lime-700",
  PhD:   "bg-red-100 text-red-700",
  BArch: "bg-amber-100 text-amber-700",
  PharmD:"bg-rose-100 text-rose-700",
};

export default function FacAndDeptPage() {
  const [activeFaculty, setActiveFaculty] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = FACULTIES.filter((f) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.departments.some(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.programs.some((p) => p.name.toLowerCase().includes(q))
      )
    );
  });

  const totalDepts    = FACULTIES.reduce((s, f) => s + f.departments.length, 0);
  const totalPrograms = FACULTIES.reduce((s, f) => s + f.departments.reduce((ss, d) => ss + d.programs.length, 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Faculties &amp; Departments</h1>
        <p className="text-gray-500 mt-2">
          Explore all {FACULTIES.length} faculties, {totalDepts} departments, and {totalPrograms}+ programs at BUITEMS
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Faculties", value: FACULTIES.length, color: "text-blue-600" },
          { label: "Departments", value: totalDepts, color: "text-emerald-600" },
          { label: "Programs", value: `${totalPrograms}+`, color: "text-violet-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="card text-center py-4">
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search faculty, department, or program…"
          className="w-full max-w-md px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Faculty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((faculty) => (
          <div key={faculty.id} className="card p-0 overflow-hidden hover:shadow-md transition-shadow">
            {/* Header */}
            <div className={`bg-gradient-to-r ${faculty.color} text-white p-5`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl">{faculty.icon}</span>
                  <h2 className="font-bold text-lg mt-2 leading-tight">{faculty.name}</h2>
                  <p className="text-white/70 text-xs mt-1">Dean: {faculty.dean}</p>
                </div>
                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg shrink-0">
                  {faculty.shortName}
                </span>
              </div>
              <div className="flex gap-3 mt-3 text-xs text-white/80">
                <span>{faculty.departments.length} Departments</span>
                <span>·</span>
                <span>
                  {faculty.departments.reduce((s, d) => s + d.programs.length, 0)} Programs
                </span>
              </div>
            </div>

            {/* Departments */}
            <div className="p-4 space-y-3">
              {faculty.departments
                .slice(0, activeFaculty === faculty.id ? undefined : 2)
                .map((dept) => (
                  <div key={dept.code} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{dept.name}</h3>
                      <span className="text-xs text-gray-400 font-mono">{dept.code}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2 leading-relaxed">{dept.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {dept.programs.map((prog) => (
                        <span
                          key={prog.name}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${PROGRAM_COLORS[prog.type] || "bg-gray-100 text-gray-600"}`}
                        >
                          {prog.name} · {prog.duration}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

              {faculty.departments.length > 2 && (
                <button
                  onClick={() =>
                    setActiveFaculty(activeFaculty === faculty.id ? null : faculty.id)
                  }
                  className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium py-1 transition-colors"
                >
                  {activeFaculty === faculty.id
                    ? "Show less ↑"
                    : `+ ${faculty.departments.length - 2} more department${faculty.departments.length - 2 > 1 ? "s" : ""}`}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p>No results for &ldquo;{search}&rdquo;</p>
          <button onClick={() => setSearch("")} className="mt-3 text-sm text-blue-500 hover:underline">
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
