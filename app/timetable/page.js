"use client";

import { useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TIME_SLOTS = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 01:00",
  "01:00 - 02:00",
  "02:00 - 03:00",
  "03:00 - 04:00",
  "04:00 - 05:00",
];

// Sample BUITEMS-style timetable data (placeholder — students fill their own)
const SAMPLE_DATA = {
  "Monday-08:00 - 09:00": {
    subject: "Data Structures",
    room: "CS-101",
    teacher: "Dr. Ahmed",
  },
  "Monday-10:00 - 11:00": {
    subject: "Calculus II",
    room: "Math-02",
    teacher: "Dr. Khan",
  },
  "Monday-12:00 - 01:00": {
    subject: "Friday Prayer Break",
    room: "",
    teacher: "",
  },
  "Tuesday-09:00 - 10:00": {
    subject: "OOP (Lab)",
    room: "Lab-3",
    teacher: "Sir Raza",
  },
  "Tuesday-11:00 - 12:00": {
    subject: "English Communication",
    room: "Eng-05",
    teacher: "Ms. Sara",
  },
  "Wednesday-08:00 - 09:00": {
    subject: "Data Structures",
    room: "CS-101",
    teacher: "Dr. Ahmed",
  },
  "Wednesday-10:00 - 11:00": {
    subject: "Digital Logic Design",
    room: "EE-02",
    teacher: "Dr. Baig",
  },
  "Thursday-09:00 - 10:00": {
    subject: "OOP",
    room: "CS-203",
    teacher: "Sir Raza",
  },
  "Thursday-02:00 - 03:00": {
    subject: "Calculus II (Tutorial)",
    room: "Math-02",
    teacher: "Dr. Khan",
  },
  "Friday-10:00 - 11:00": {
    subject: "Digital Logic Design (Lab)",
    room: "Lab-1",
    teacher: "Dr. Baig",
  },
};

const SLOT_COLORS = [
  "bg-blue-50 border-blue-200 text-blue-800",
  "bg-emerald-50 border-emerald-200 text-emerald-800",
  "bg-violet-50 border-violet-200 text-violet-800",
  "bg-amber-50 border-amber-200 text-amber-800",
  "bg-rose-50 border-rose-200 text-rose-800",
  "bg-cyan-50 border-cyan-200 text-cyan-800",
];

// Give each unique subject a consistent color
const subjectColorMap = {};
let colorIdx = 0;
function getSubjectColor(subject) {
  if (!subject) return "";
  if (!subjectColorMap[subject]) {
    subjectColorMap[subject] = SLOT_COLORS[colorIdx % SLOT_COLORS.length];
    colorIdx++;
  }
  return subjectColorMap[subject];
}

export default function TimetablePage() {
  const [view, setView] = useState("grid"); // grid | list
  const [timetable, setTimetable] = useState(SAMPLE_DATA);
  const [editing, setEditing] = useState(null); // { day, slot }
  const [editForm, setEditForm] = useState({
    subject: "",
    room: "",
    teacher: "",
  });

  const getCell = (day, slot) => timetable[`${day}-${slot}`];

  const openEdit = (day, slot) => {
    const cell = getCell(day, slot);
    setEditForm(cell ? { ...cell } : { subject: "", room: "", teacher: "" });
    setEditing({ day, slot });
  };

  const saveCell = () => {
    if (!editing) return;
    const key = `${editing.day}-${editing.slot}`;
    if (editForm.subject.trim()) {
      setTimetable((prev) => ({ ...prev, [key]: { ...editForm } }));
    } else {
      const updated = { ...timetable };
      delete updated[key];
      setTimetable(updated);
    }
    setEditing(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Timetable</h1>
          <p className="text-gray-500 mt-1">
            Your weekly class schedule — click any cell to edit
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "grid" ? "navbar-bg text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            Grid View
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "list" ? "navbar-bg text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            List View
          </button>
          <button
            onClick={() => setTimetable(SAMPLE_DATA)}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Reset Sample
          </button>
        </div>
      </div>

      {/* ── Grid View ─────────────────────────────────────────────────────── */}
      {view === "grid" && (
        <div className="card p-0 overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="navbar-bg text-white">
                <th className="px-4 py-3 text-left w-32 font-semibold text-xs uppercase tracking-wide">
                  Time
                </th>
                {DAYS.map((d) => (
                  <th
                    key={d}
                    className="px-3 py-3 text-center font-semibold text-xs uppercase tracking-wide"
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map((slot, si) => (
                <tr
                  key={slot}
                  className={si % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                >
                  <td className="px-4 py-2 text-xs font-mono text-gray-500 border-r border-gray-100 whitespace-nowrap">
                    {slot}
                  </td>
                  {DAYS.map((day) => {
                    const cell = getCell(day, slot);
                    return (
                      <td
                        key={day}
                        className="px-2 py-2 border-l border-gray-100"
                      >
                        <button
                          onClick={() => openEdit(day, slot)}
                          className={`w-full min-h-[48px] px-2 py-1.5 rounded-lg text-left transition-all hover:shadow-sm hover:scale-[1.02] ${
                            cell?.subject
                              ? `border ${getSubjectColor(cell.subject)}`
                              : "border border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/30"
                          }`}
                        >
                          {cell?.subject ? (
                            <>
                              <div className="font-semibold text-xs leading-tight">
                                {cell.subject}
                              </div>
                              {cell.room && (
                                <div className="text-xs opacity-70 mt-0.5">
                                  📍 {cell.room}
                                </div>
                              )}
                              {cell.teacher && (
                                <div className="text-xs opacity-70">
                                  👤 {cell.teacher}
                                </div>
                              )}
                            </>
                          ) : (
                            <span className="text-xs text-gray-300">+ add</span>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── List View ─────────────────────────────────────────────────────── */}
      {view === "list" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DAYS.map((day) => {
            const dayCells = TIME_SLOTS.filter(
              (s) => getCell(day, s)?.subject,
            ).map((s) => ({ slot: s, ...getCell(day, s) }));

            return (
              <div key={day} className="card">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                  {day}
                  <span className="text-xs font-normal text-gray-400 ml-auto">
                    {dayCells.length} classes
                  </span>
                </h3>
                {dayCells.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">
                    No classes scheduled
                  </p>
                ) : (
                  <div className="space-y-2">
                    {dayCells.map((c) => (
                      <div
                        key={c.slot}
                        className={`p-2.5 rounded-lg border text-xs ${getSubjectColor(c.subject)}`}
                      >
                        <div className="font-semibold">{c.subject}</div>
                        <div className="mt-1 opacity-75">🕐 {c.slot}</div>
                        {c.room && (
                          <div className="opacity-75">📍 {c.room}</div>
                        )}
                        {c.teacher && (
                          <div className="opacity-75">👤 {c.teacher}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Edit Modal ────────────────────────────────────────────────────── */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-bold text-gray-800 mb-1">{editing.day}</h3>
            <p className="text-sm text-gray-500 mb-5">⏰ {editing.slot}</p>

            <div className="space-y-3">
              {[
                {
                  label: "Subject Name",
                  field: "subject",
                  placeholder: "e.g. Data Structures",
                },
                {
                  label: "Room / Venue",
                  field: "room",
                  placeholder: "e.g. CS-101",
                },
                {
                  label: "Teacher",
                  field: "teacher",
                  placeholder: "e.g. Dr. Ahmed",
                },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={editForm[field]}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={saveCell}
                className="flex-1 py-2.5 navbar-bg text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(null)}
                className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>

            {editForm.subject && (
              <button
                onClick={() => {
                  const key = `${editing.day}-${editing.slot}`;
                  const u = { ...timetable };
                  delete u[key];
                  setTimetable(u);
                  setEditing(null);
                }}
                className="w-full mt-2 py-2 text-red-500 text-sm hover:bg-red-50 rounded-lg transition-colors"
              >
                Remove Class
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
