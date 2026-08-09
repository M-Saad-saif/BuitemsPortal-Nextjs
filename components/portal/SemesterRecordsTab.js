"use client";

import { useState } from "react";
import { GRADE_POINTS, GRADE_COLOR, gpaColor } from "@/lib/constants/grades";

export default function SemesterRecordsTab({ user, onAdd, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(null);

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (!user.semesters || user.semesters.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="text-5xl mb-4">📚</div>
        <h4 className="text-lg font-semibold text-gray-800">
          No Semester Records Yet
        </h4>
        <p className="text-sm text-gray-500 mt-2 mb-5">
          Add your first semester to start tracking your CGPA
        </p>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Add First Semester
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h4 className="text-lg font-semibold text-gray-800">
          Semester Records
        </h4>
        <button
          onClick={onAdd}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Add Semester
        </button>
      </div>

      <div className="space-y-3">
        {user.semesters.map((sem) => (
          <div
            key={sem._id}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setExpanded(expanded === sem._id ? null : sem._id)}
              className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {capitalizeFirstLetter(sem.semesterName)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {sem.creditHours} credits
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-bold ${gpaColor(sem.gpa)}`}>
                  {Number(sem.gpa || 0).toFixed(2)}
                </span>
                <span className="text-gray-400 text-xs">
                  {expanded === sem._id ? "▲" : "▼"}
                </span>
              </div>
            </button>

            {expanded === sem._id && (
              <div className="border-t border-gray-100 p-4 bg-gray-50/60">
                {sem.subjects?.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500 border-b border-gray-200">
                          <th className="pb-2 pr-3">Subject</th>
                          <th className="pb-2 px-3">Credits</th>
                          <th className="pb-2 px-3">Grade</th>
                          <th className="pb-2 pl-3">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sem.subjects.map((s, i) => (
                          <tr
                            key={s._id || `${sem._id}-${i}`}
                            className="border-b border-gray-100 last:border-0"
                          >
                            <td className="py-3 pr-3 font-medium text-gray-700">
                              {s.name.toUpperCase()}
                            </td>
                            <td className="py-3 px-3 text-gray-600">
                              {s.creditHours}
                            </td>
                            <td
                              className={`py-3 px-3 font-semibold ${GRADE_COLOR[s.grade] || "text-gray-700"}`}
                            >
                              {s.grade}
                            </td>
                            <td className="py-3 pl-3 text-gray-600">
                              {(
                                (GRADE_POINTS[s.grade] || 0) *
                                Number(s.creditHours)
                              ).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => onEdit(sem)}
                    className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Update this semester
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(sem._id)}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    🗑️ Delete this semester
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
