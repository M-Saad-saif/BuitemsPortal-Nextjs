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

  const getGPAColor = (gpa) => {
    const g = parseFloat(gpa);
    if (g >= 3.5) return "text-green-600";
    if (g >= 3.0) return "text-blue-600";
    if (g >= 2.5) return "text-yellow-600";
    if (g >= 2.0) return "text-orange-600";
    return "text-red-600";
  };

  const getGPALabel = (gpa) => {
    const g = parseFloat(gpa);
    if (g >= 3.7) return "Excellent 🏆 ";
    if (g >= 3.3) return "Very Good 🌟";
    if (g >= 3.0) return "Good ✅";
    if (g >= 2.5) return "Satisfactory";
    if (g >= 2.0) return "Pass";
    return "Needs Improvement";
  };

  return (
    <section className="bg-blue-100">
    <div className=" mx-auto px-4 py-10 max-w-3xl">
      <div className=" justify-self-center">
        <ToolHeader
          heading="GPA-Calculator"
          desc="Calculate your semester GPA using the 4.0 grading scale"
        />

        {/* Subjects Table */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Enter Your Subjects</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
              {subjects.length} subject{subjects.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Header row */}
          <div className="grid grid-cols-12 gap-2 mb-2 text-xs font-medium text-black uppercase  px-1">
            <div className="col-span-5">Subject Name</div>
            <div className="col-span-3">Credit Hours</div>
            <div className="col-span-3">Grade</div>
            <div className="col-span-1"></div>
          </div>

          <div className="space-y-2">
            {subjects.map((sub, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-5">
                  <input
                    type="text"
                    value={sub.name}
                    onChange={(e) => updateSubject(i, "name", e.target.value)}
                    placeholder={`Subject ${i + 1}`}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>

                <div className="col-span-3">
                  <select
                    value={sub.creditHours}
                    onChange={(e) =>
                      updateSubject(i, "creditHours", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  >
                    {[1, 2, 3, 4, 5].map((c) => (
                      <option key={c} value={c}>
                        {c} CR
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-3">
                  <select
                    value={sub.grade}
                    onChange={(e) => updateSubject(i, "grade", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  >
                    {Object.keys(GRADE_POINTS).map((g) => (
                      <option key={g} value={g}>
                        {g} ({GRADE_POINTS[g].toFixed(1)})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => removeSubject(i)}
                    disabled={subjects.length <= 1}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-30 transition-colors"
                    title="Remove subject"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Subject */}
          <button
            onClick={addSubject}
            className="mt-4 w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
          >
            + Add Subject
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={calculate}
            className="flex-1 py-3 navbar-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md"
          >
            Calculate GPA
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 border border-gray-300 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="card fade-in">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">
                Your Semester GPA
              </p>
              <p className={`text-6xl font-bold ${getGPAColor(result.gpa)}`}>
                {result.gpa}
              </p>
              <p className="text-lg font-medium text-gray-600 mt-2">
                {getGPALabel(result.gpa)}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Total Credits: {result.totalCredits} &nbsp;|&nbsp; Quality
                Points: {result.totalPoints}
              </p>
            </div>

            {/* Breakdown table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <th className="text-left px-3 py-2 rounded-l">Subject</th>
                    <th className="text-center px-3 py-2">Credits</th>
                    <th className="text-center px-3 py-2">Grade</th>
                    <th className="text-center px-3 py-2">Points</th>
                    <th className="text-center px-3 py-2 rounded-r">
                      Quality Pts
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {result.details.map((d, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-700">
                        {d.name}
                      </td>
                      <td className="px-3 py-2 text-center text-gray-600">
                        {d.credits}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span
                          className={GRADE_COLORS[d.grade] || "text-gray-600"}
                        >
                          {d.grade}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center text-gray-600">
                        {d.gp.toFixed(1)}
                      </td>
                      <td className="px-3 py-2 text-center font-medium text-gray-700">
                        {d.points.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50 font-semibold">
                    <td className="px-3 py-2 text-gray-700">Total</td>
                    <td className="px-3 py-2 text-center text-gray-700">
                      {result.totalCredits}
                    </td>
                    <td colSpan={2}></td>
                    <td className="px-3 py-2 text-center text-gray-700">
                      {result.totalPoints}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Grading Scale Reference */}
        <div className="card mt-6">
          <h3 className="font-semibold text-gray-700 mb-3">
            BUITEMS Grading Scale
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-sm">
            {Object.entries(GRADE_POINTS).map(([g, p]) => (
              <div
                key={g}
                className="flex justify-between items-center bg-gray-50 px-3 py-1.5 rounded-lg"
              >
                <span
                  className={`font-bold ${GRADE_COLORS[g] || "text-gray-600"}`}
                >
                  {g}
                </span>
                <span className="text-gray-500">{p.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
