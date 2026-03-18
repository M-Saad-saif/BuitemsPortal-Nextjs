"use client";

import { useState } from "react";
import { GRADE_POINTS, GRADE_COLOR, gpaColor } from "@/lib/constants/grades";

export default function SemesterRecordsTab({ user, onAdd, onDelete }) {
  const [expanded, setExpanded] = useState(null);

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  if (!user.semesters || user.semesters.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-4xl mb-3">📚</div>
        <h3 className="font-semibold text-gray-700 mb-2">
          No Semester Records Yet
        </h3>
        <p className="text-gray-500 text-sm mb-5">
          Add your first semester to start tracking your CGPA
        </p>
        <button
          onClick={onAdd}
          className="px-6 py-2.5 navbar-bg text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
        >
          + Add First Semester
        </button>
      </div>
    );
  }

  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Semester Records</h3>
        <button
          onClick={onAdd}
          className="px-4 py-2 navbar-bg text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          + Add Semester
        </button>
      </div>
      {user.semesters.map((sem) => (
        <div key={sem._id} className="card p-0 overflow-hidden">
          <button
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            onClick={() => setExpanded(expanded === sem._id ? null : sem._id)}
          >
            <div>
              <span className="font-semibold text-gray-800">
                {capitalizeFirstLetter(sem.semesterName)}
              </span> 
              <span className="ml-3 text-xs text-gray-400">
                {sem.creditHours} credits
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xl font-bold ${gpaColor(sem.gpa)}`}>
                {sem.gpa.toFixed(2)}
              </span>
              <span className="text-gray-400">
                {expanded === sem._id ? "▲" : "▼"}
              </span>
            </div>
          </button>
          {expanded === sem._id && sem.subjects?.length > 0 && (
            <div className="px-5 pb-4 border-t border-gray-100">
              <table className="w-full text-sm mt-3">
                <thead>
                  <tr className="text-xs uppercase text-gray-400">
                    <th className="text-left pb-2">Subject</th>
                    <th className="text-center pb-2">Credits</th>
                    <th className="text-center pb-2">Grade</th>
                    <th className="text-center pb-2">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sem.subjects.map((s, i) => (
                    <tr key={i}>
                      <td className="py-2 text-gray-700">{s.name.toUpperCase()}</td>
                      <td className="py-2 text-center text-gray-500">
                        {s.creditHours}
                      </td>
                      <td
                        className={`py-2 text-center font-bold ${GRADE_COLOR[s.grade] || "text-gray-600"}`}
                      >
                        {s.grade}
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        {((GRADE_POINTS[s.grade] || 0) * s.creditHours).toFixed(
                          2,
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => onDelete(sem._id)}
                className="mt-4 text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                🗑️ Delete this semester
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
