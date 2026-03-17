"use client";

import ToolHeader from "@/components/layout/ToolHeader";
import Link from "next/link";
import { useState, useCallback } from "react";

const emptySemester = (n) => ({
  name: `Semester ${n}`,
  gpa: "",
  credits: "15",
});

export default function CGPACalculatorPage() {
  const [semesters, setSemesters] = useState([
    emptySemester(1),
    emptySemester(2),
  ]);
  const [result, setResult] = useState(null);

  const addSemester = () =>
    setSemesters((prev) => [...prev, emptySemester(prev.length + 1)]);

  const removeSemester = (i) =>
    setSemesters((prev) => prev.filter((_, idx) => idx !== i));

  const update = (i, field, value) =>
    setSemesters((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)),
    );

  const calculate = useCallback(() => {
    let totalQP = 0;
    let totalCredits = 0;
    const rows = [];

    for (const s of semesters) {
      const gpa = parseFloat(s.gpa);
      const cr = parseFloat(s.credits);
      if (!isNaN(gpa) && !isNaN(cr) && cr > 0 && gpa >= 0 && gpa <= 4) {
        const qp = gpa * cr;
        totalQP += qp;
        totalCredits += cr;
        rows.push({
          name: s.name,
          gpa: gpa.toFixed(2),
          credits: cr,
          qp: qp.toFixed(2),
        });
      }
    }

    const cgpa =
      totalCredits > 0 ? (totalQP / totalCredits).toFixed(2) : "0.00";
    setResult({ cgpa, totalCredits, totalQP: totalQP.toFixed(2), rows });
  }, [semesters]);

  const reset = () => {
    setSemesters([emptySemester(1), emptySemester(2)]);
    setResult(null);
  };

  const getColor = (val) => {
    const v = parseFloat(val);
    if (v >= 3.5) return "text-green-600";
    if (v >= 3.0) return "text-blue-600";
    if (v >= 2.5) return "text-yellow-600";
    if (v >= 2.0) return "text-orange-500";
    return "text-red-600";
  };

  const getLabel = (val) => {
    const v = parseFloat(val);
    if (v >= 3.7) return "Brilliant 🏆";
    if (v >= 3.3) return "Excellent 🌟";
    if (v >= 3.0) return "Good Standing ✅";
    if (v >= 2.0) return "Work Hard";
    return " Rehny dy bhai⚠️";
  };

  return (
    <section className=" bg-blue-100">
      <div className=" mx-auto px-4 py-10 max-w-3xl">
        <ToolHeader
          heading="CGPA-Calculator"
          desc="Calculate your Cumulative GPA across all semesters"
        />  

        {/* Semester Rows */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Enter Semester GPAs</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
              {semesters.length} semester{semesters.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-12 gap-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide px-1">
            <div className="col-span-4">Semester</div>
            <div className="col-span-3">GPA (0–4.0)</div>
            <div className="col-span-3">Credit Hours</div>
            <div className="col-span-2"></div>
          </div>

          <div className="space-y-2">
            {semesters.map((sem, i) => (
              <div key={i} className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-4">
                  <input
                    type="text"
                    value={sem.name}
                    onChange={(e) => update(i, "name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    value={sem.gpa}
                    onChange={(e) => update(i, "gpa", e.target.value)}
                    placeholder="e.g. 3.5"
                    min="0"
                    max="4"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    value={sem.credits}
                    onChange={(e) => update(i, "credits", e.target.value)}
                    placeholder="15"
                    min="1"
                    max="30"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
                <div className="col-span-2 flex justify-center">
                  <button
                    onClick={() => removeSemester(i)}
                    disabled={semesters.length <= 1}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-30 transition"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addSemester}
            className="mt-4 w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
          >
            + Add Semester
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={calculate}
            className="flex-1 py-3 navbar-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md"
          >
            Calculate CGPA
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
                Your CGPA
              </p>
              <p className={`text-6xl font-bold ${getColor(result.cgpa)}`}>
                {result.cgpa}
              </p>
              <p className="text-lg font-medium text-gray-600 mt-2">
                {getLabel(result.cgpa)}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Total Credits: {result.totalCredits} &nbsp;|&nbsp; Total Quality
                Points: {result.totalQP}
              </p>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>0.0</span>
                <span>2.0</span>
                <span>3.0</span>
                <span>4.0</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(parseFloat(result.cgpa) / 4.0) * 100}%`,
                    background: "#1a3c6e",
                  }}
                />
              </div>
            </div>

            {/* Semester breakdown */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs uppercase text-gray-500">
                    <th className="text-left px-3 py-2 rounded-l">Semester</th>
                    <th className="text-center px-3 py-2">GPA</th>
                    <th className="text-center px-3 py-2">Credits</th>
                    <th className="text-center px-3 py-2 rounded-r">
                      Quality Points
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {result.rows.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-700">
                        {r.name}
                      </td>
                      <td
                        className={`px-3 py-2 text-center font-bold ${getColor(r.gpa)}`}
                      >
                        {r.gpa}
                      </td>
                      <td className="px-3 py-2 text-center text-gray-600">
                        {r.credits}
                      </td>
                      <td className="px-3 py-2 text-center text-gray-600">
                        {r.qp}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50 font-semibold">
                    <td className="px-3 py-2 text-gray-700">CGPA</td>
                    <td
                      className={`px-3 py-2 text-center font-bold text-xl ${getColor(result.cgpa)}`}
                    >
                      {result.cgpa}
                    </td>
                    <td className="px-3 py-2 text-center text-gray-700">
                      {result.totalCredits}
                    </td>
                    <td className="px-3 py-2 text-center text-gray-700">
                      {result.totalQP}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* Tip */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> Save your semester records in the{" "}
            <Link href="/portal" className="underline font-medium">
              Student Portal
            </Link>
            to automatically track your CGPA across semesters.
          </p>
        </div>
      </div>
    </section>
  );
}
