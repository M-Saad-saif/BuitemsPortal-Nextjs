"use client";
import ToolHeader from "@/components/layout/ToolHeader";
import { useState, useCallback } from "react";

const GRADE_POINTS = {
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  D: 1.0,
  F: 0.0,
};

const GRADE_COLORS = {
  A: "grade-a",
  "A-": "grade-a",
  "B+": "grade-b",
  B: "grade-b",
  "B-": "grade-b",
  "C+": "grade-c",
  C: "grade-c",
  "C-": "grade-c",
  D: "grade-d",
  F: "grade-f",
};

const emptySubject = () => ({ name: "", creditHours: "3", grade: "A" });

export default function GPACalculatorPage() {
  const [subjects, setSubjects] = useState([emptySubject(), emptySubject()]);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("gpa");

  // Marks calculator state
  const [sessional, setSessional] = useState("");
  const [mid, setMid] = useState("");
  const [final, setFinal] = useState("");
  const [marksResult, setMarksResult] = useState(null);

  const addSubject = () => setSubjects((prev) => [...prev, emptySubject()]);

  const removeSubject = (i) =>
    setSubjects((prev) => prev.filter((_, idx) => idx !== i));

  const updateSubject = (i, field, value) =>
    setSubjects((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)),
    );

  const calculate = useCallback(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    const details = [];

    for (const sub of subjects) {
      const credits = parseFloat(sub.creditHours);
      const gp = GRADE_POINTS[sub.grade] ?? 0;
      if (!isNaN(credits) && credits > 0) {
        totalPoints += gp * credits;
        totalCredits += credits;
        details.push({
          name: sub.name || "Subject",
          credits,
          grade: sub.grade,
          gp,
          points: gp * credits,
        });
      }
    }

    const gpa =
      totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    setResult({
      gpa,
      totalCredits,
      totalPoints: totalPoints.toFixed(2),
      details,
    });
  }, [subjects]);

  const reset = () => {
    setSubjects([emptySubject(), emptySubject(), emptySubject()]);
    setResult(null);
  };

  const calculateMarks = useCallback(() => {
    const s = parseFloat(sessional);
    const m = parseFloat(mid);
    const f = parseFloat(final);

    const sVal = isNaN(s) ? 0 : Math.min(Math.max(s, 0), 25);
    const mVal = isNaN(m) ? 0 : Math.min(Math.max(m, 0), 25);
    const fVal = isNaN(f) ? 0 : Math.min(Math.max(f, 0), 50);

    const total = sVal + mVal + fVal;
    const grade = getGradeFromPercentage(total);
    const gp = GRADE_POINTS[grade] ?? 0;

    setMarksResult({
      sessional: sVal,
      mid: mVal,
      final: fVal,
      total: total.toFixed(2),
      grade,
      gp,
    });
  }, [sessional, mid, final]);

  const resetMarks = () => {
    setSessional("");
    setMid("");
    setFinal("");
    setMarksResult(null);
  };

  const getGPAColor = (gpa) => {
    const g = parseFloat(gpa);
    if (g >= 3.5) return "text-emerald-500";
    if (g >= 3.0) return "text-blue-500";
    if (g >= 2.5) return "text-amber-500";
    if (g >= 2.0) return "text-orange-500";
    return "text-red-500";
  };

  const getGPABg = (gpa) => {
    const g = parseFloat(gpa);
    if (g >= 3.5) return "bg-emerald-50 border-emerald-200";
    if (g >= 3.0) return "bg-blue-50 border-blue-200";
    if (g >= 2.5) return "bg-amber-50 border-amber-200";
    if (g >= 2.0) return "bg-orange-50 border-orange-200";
    return "bg-red-50 border-red-200";
  };

  const getGPALabel = (gpa) => {
    const g = parseFloat(gpa);
    if (g >= 3.7) return "Excellent";
    if (g >= 3.3) return "Very Good";
    if (g >= 3.0) return "Good";
    if (g >= 2.5) return "Satisfactory";
    if (g >= 2.0) return "Pass";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen  pb-16 bg-[#e6f1ff]">
      <ToolHeader
        heading="GPA Calculator & Marks calculator"
        desc="Calculate your Semester GPA, explore your grade breakdown and see how
          close you are to that legendary GPA mark"
      />
      <main className="max-w-3xl mx-auto px-4 -mt-32 space-y-6">
        <section className="bg-white rounded-2xl shadow-2xl shadow-blue-900/10 p-6 sm:p-8 relative">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">
                Subjects
              </span>
              <span className="px-3.5 py-1 rounded-full bg-blue-500 text-white text-xs font-bold shadow-sm">
                {subjects.length}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex border-b border-gray-100">
            {[
              { id: "gpa", label: "Semester GPA" },
              { id: "marks", label: "Marks Calculator" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 pb-3 text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                  activeTab === t.id
                    ? "text-blue-600 border-b-2 border-blue-500 -mb-px"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === "gpa" && (
            <div className="animate-fadeIn">
              <div className="mt-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-gray-300">
                <span className="flex-1">Subject</span>
                <span className="w-20 text-center">Credits</span>
                <span className="w-20 text-center">Grade</span>
                <span className="w-6"></span>
              </div>

              <div className="mt-1 divide-y divide-gray-50">
                {subjects.map((sub, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 group">
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => updateSubject(i, "name", e.target.value)}
                      placeholder={`Subject ${i + 1}`}
                      className="flex-1 min-w-0 bg-transparent text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                    />
                    <select
                      value={sub.creditHours}
                      onChange={(e) =>
                        updateSubject(i, "creditHours", e.target.value)
                      }
                      className="w-20 px-1 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-600 text-center focus:outline-none focus:border-blue-400 cursor-pointer transition-colors duration-200"
                    >
                      {[1, 2, 3, 4, 5].map((c) => (
                        <option key={c} value={c}>
                          {c} Cr
                        </option>
                      ))}
                    </select>
                    <select
                      value={sub.grade}
                      onChange={(e) =>
                        updateSubject(i, "grade", e.target.value)
                      }
                      className="w-20 px-1 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-bold text-gray-700 text-center focus:outline-none focus:border-blue-400 cursor-pointer transition-colors duration-200"
                    >
                      {Object.keys(GRADE_POINTS).map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeSubject(i)}
                      disabled={subjects.length <= 1}
                      className="w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-gray-300 transition-all duration-200"
                      title="Remove subject"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addSubject}
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 border border-blue-200 rounded-full px-3.5 py-1.5 hover:bg-[#d1e2f9] transition-colors duration-200 w-[86%] justify-center bg-[#b8d4f9]"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Subject
              </button>

              {/* Actions */}
              <div className="mt-5 flex gap-3">
                <button
                  onClick={calculate}
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Calculate GPA
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  Reset
                </button>
              </div>

              {/* Footer: playful text + big GPA */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center gap-3 ">
                <div className="flex items-baseline gap-1.5 text-center">
                  <span
                    className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
                      result ? getGPAColor(result.gpa) : "text-gray-300"
                    }`}
                  >
                    {result ? result.gpa : "0.00"}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    / 4.0
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ---------- TAB: MARKS CALCULATOR ---------- */}
          {activeTab === "marks" && (
            <div className="mt-6 animate-fadeIn">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Sessional (25%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="25"
                      value={sessional}
                      onChange={(e) => setSessional(e.target.value)}
                      placeholder="e.g. 20"
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-200"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                      /25
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Mid Term (25%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="25"
                      value={mid}
                      onChange={(e) => setMid(e.target.value)}
                      placeholder="e.g. 22"
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-200"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                      /25
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Final Term (50%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={final}
                      onChange={(e) => setFinal(e.target.value)}
                      placeholder="e.g. 42"
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-200"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                      /50
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={calculateMarks}
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Calculate
                </button>
                <button
                  onClick={resetMarks}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>

              {marksResult && (
                <div className="mt-6 pt-5 border-t border-gray-100 animate-fadeIn">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="grid grid-cols-3 gap-2 flex-1 min-w-[220px]">
                      <div className="bg-blue-50 rounded-lg p-2.5 text-center border border-blue-100">
                        <p className="text-[10px] font-semibold text-blue-600 mb-0.5">
                          Sessional
                        </p>
                        <p className="text-base font-bold text-blue-900">
                          {marksResult.sessional}
                          <span className="text-xs text-blue-400">/25</span>
                        </p>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-2.5 text-center border border-indigo-100">
                        <p className="text-[10px] font-semibold text-indigo-600 mb-0.5">
                          Mid
                        </p>
                        <p className="text-base font-bold text-indigo-900">
                          {marksResult.mid}
                          <span className="text-xs text-indigo-400">/25</span>
                        </p>
                      </div>
                      <div className="bg-cyan-50 rounded-lg p-2.5 text-center border border-cyan-100">
                        <p className="text-[10px] font-semibold text-cyan-600 mb-0.5">
                          Final
                        </p>
                        <p className="text-base font-bold text-cyan-900">
                          {marksResult.final}
                          <span className="text-xs text-cyan-400">/50</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-black text-white">
                            {marksResult.total}
                          </p>
                          <p className="text-[10px] font-semibold text-blue-100">
                            /100
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p
                          className={`text-3xl font-black ${GRADE_COLORS[marksResult.grade]}`}
                        >
                          {marksResult.grade}
                        </p>
                        <p className="text-xs font-semibold text-gray-400 mt-0.5">
                          {marksResult.gp.toFixed(1)} GPA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ===== GPA RESULT BREAKDOWN ===== */}
        {result && activeTab === "gpa" && (
          <section
            className={`rounded-2xl border-2 p-6 sm:p-8 ${getGPABg(result.gpa)} animate-fadeIn`}
          >
            <div className="text-center mb-6">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">
                Your Semester GPA
              </p>
              <p className="text-xl font-bold text-gray-800">
                {getGPALabel(result.gpa)}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mt-2">
                <span>{result.totalCredits} Credits</span>
                <span className="text-gray-300">|</span>
                <span>{result.totalPoints} Points</span>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-inner">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 text-xs font-semibold uppercase">
                    <th className="text-left px-4 py-3">Subject</th>
                    <th className="text-center px-4 py-3">Credits</th>
                    <th className="text-center px-4 py-3">Grade</th>
                    <th className="text-center px-4 py-3">Points</th>
                    <th className="text-center px-4 py-3">Quality Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {result.details.map((d, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50/50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {d.name}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">
                        {d.credits}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-sm font-bold ${GRADE_COLORS[d.grade]}`}
                        >
                          {d.grade}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600">
                        {d.gp.toFixed(1)}
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-800">
                        {d.points.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold">
                    <td className="px-4 py-3">Total</td>
                    <td className="px-4 py-3 text-center">
                      {result.totalCredits}
                    </td>
                    <td colSpan={2}></td>
                    <td className="px-4 py-3 text-center">
                      {result.totalPoints}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        )}

        {/* ===== GRADING SCALE REFERENCE ===== */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 uppercase tracking-wider">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            BUITEMS Grading Scale
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {Object.entries(GRADE_POINTS).map(([g, p]) => (
              <div
                key={g}
                className="flex flex-col items-center justify-center bg-gray-50 hover:bg-white px-3 py-2.5 rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-md hover:scale-[1.03] cursor-default"
              >
                <span
                  className={`text-base font-black ${GRADE_COLORS[g] || "text-gray-600"}`}
                >
                  {g}
                </span>
                <span className="text-[10px] font-semibold text-gray-400 mt-0.5">
                  {p.toFixed(1)} GPA
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .grade-a {
          color: #10b981;
        }
        .grade-b {
          color: #3b82f6;
        }
        .grade-c {
          color: #f59e0b;
        }
        .grade-d {
          color: #f97316;
        }
        .grade-f {
          color: #ef4444;
        }
      `}</style>
    </div>
  );
}
