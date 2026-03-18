"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { GRADE_POINTS } from "@/lib/constants/grades";

export default function AddSemesterDialog({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [subs, setSubs] = useState([
    { name: "", creditHours: "3", grade: "A" },
  ]);
  const [saving, setSaving] = useState(false);

  const addRow = () =>
    setSubs((p) => [...p, { name: "", creditHours: "3", grade: "A" }]);
  const remRow = (i) => setSubs((p) => p.filter((_, idx) => idx !== i));
  const upd = (i, f, v) =>
    setSubs((p) => p.map((s, idx) => (idx === i ? { ...s, [f]: v } : s)));

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Please enter a semester name");
    const validSubs = subs.filter((s) => s.name.trim());
    if (validSubs.length === 0) return toast.error("Add at least one subject");
    setSaving(true);
    const token = localStorage.getItem("auth-token");
    const res = await fetch("/api/auth/add-semester", {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": token },
      body: JSON.stringify({ semesterName: name.trim(), subjects: validSubs }),
    });
    const data = await res.json();
    setSaving(false);
    if (data.success) {
      toast.success("Semester added!");
      onSave(data.user);
    } else toast.error(data.error || "Failed to add semester");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-bold text-gray-800">Add Semester</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5 flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semester Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Semester 3"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase mb-1 px-1">
              <div className="col-span-5">Subject</div>
              <div className="col-span-3">Credits</div>
              <div className="col-span-3">Grade</div>
              <div className="col-span-1"></div>
            </div>
            {subs.map((s, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 mb-2">
                <input
                  className="col-span-5 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={s.name}
                  onChange={(e) => upd(i, "name", e.target.value)}
                  placeholder={`Subject ${i + 1}`}
                />
                <select
                  className="col-span-3 px-2 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={s.creditHours}
                  onChange={(e) => upd(i, "creditHours", e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((c) => (
                    <option key={c} value={c}>
                      {c} CR
                    </option>
                  ))}
                </select>
                <select
                  className="col-span-3 px-2 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={s.grade}
                  onChange={(e) => upd(i, "grade", e.target.value)}
                >
                  {Object.keys(GRADE_POINTS).map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => remRow(i)}
                  disabled={subs.length <= 1}
                  className="col-span-1 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addRow}
              className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors mt-1"
            >
              + Add Subject
            </button>
          </div>
        </div>
        <div className="px-6 py-4 border-t flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 navbar-bg text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {saving ? "Saving…" : "Save Semester"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
