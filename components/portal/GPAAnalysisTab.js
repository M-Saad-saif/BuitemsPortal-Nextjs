"use client";

import { gpaColor } from "@/lib/constants/grades";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";

export default function GPAAnalysisTab({ user }) {
  if (!user.semesters || user.semesters.length === 0) {
    return (
      <div className="card text-center py-12 text-gray-400">
        <div className="text-4xl mb-3">📊</div>
        <p>Add semester records to see your GPA analysis</p>
      </div>
    );
  }

  const best = user.semesters.reduce((a, b) => (a.gpa > b.gpa ? a : b));
  const worst = user.semesters.reduce((a, b) => (a.gpa < b.gpa ? a : b));
  const trend =
    user.semesters.length >= 2 ? (
      user.semesters[user.semesters.length - 1].gpa >
      user.semesters[user.semesters.length - 2].gpa ? (
        <span className="flex items-center gap-1 text-green-600  justify-self-center">
          <IoMdTrendingUp /> Improving
        </span>
      ) : user.semesters[user.semesters.length - 1].gpa <
        user.semesters[user.semesters.length - 2].gpa ? (
        <span className="flex items-center gap-1 text-red-600   justify-self-center">
          <IoMdTrendingDown /> Declining
        </span>
      ) : (
        <span>➡️ Stable</span>
      )
    ) : (
      "N/A"
    );

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "CGPA",
            value: (user.cgpa || 0).toFixed(2),
            color: gpaColor(user.cgpa || 0),
          },
          {
            label: "Best GPA",
            value: best.gpa.toFixed(2) + " (" + best.semesterName + ")",
            color: "text-green-600",
          },
          { label: "Trend", value: trend, color: "text-blue-600" },
          {
            label: "Total Credits",
            value: user.totalCreditHours || 0,
            color: "text-purple-600",
          },
        ].map(({ label, value, color }) => (
          <div key={label} className="card text-center py-3">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className={`font-bold text-lg ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Semester GPA bar chart */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 mb-4">GPA Progress</h3>
        <div className="space-y-3">
          {user.semesters.map((sem) => (
            <div key={sem._id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{sem.semesterName}</span>
                <span className={`font-bold ${gpaColor(sem.gpa)}`}>
                  {sem.gpa.toFixed(2)}
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(sem.gpa / 4) * 100}%`,
                    background: "linear-gradient(to right,#1a3c6e)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
          <span>0.0</span>
          <span>2.0</span>
          <span>3.0</span>
          <span>4.0</span>
        </div>
      </div>

      {/* CGPA trend table */}
      <div className="card overflow-x-auto">
        <h3 className="font-semibold text-gray-800 mb-3">Semester Summary</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase text-gray-400 border-b">
              <th className="text-left pb-2">Semester</th>
              <th className="text-center pb-2">GPA</th>
              <th className="text-center pb-2">Credits</th>
              <th className="text-center pb-2">Subjects</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {user.semesters.map((sem) => (
              <tr key={sem._id} className="hover:bg-gray-50">
                <td className="py-2 text-gray-700">{sem.semesterName}</td>
                <td
                  className={`py-2 text-center font-bold ${gpaColor(sem.gpa)}`}
                >
                  {sem.gpa.toFixed(2)}
                </td>
                <td className="py-2 text-center text-gray-500">
                  {sem.creditHours}
                </td>
                <td className="py-2 text-center text-gray-500">
                  {sem.subjects?.length || 0}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-50 font-semibold">
              <td className="py-2 px-1 text-gray-700">CGPA</td>
              <td
                className={`py-2 text-center text-xl ${gpaColor(user.cgpa || 0)}`}
              >
                {(user.cgpa || 0).toFixed(2)}
              </td>
              <td className="py-2 text-center text-gray-700">
                {user.totalCreditHours || 0}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
