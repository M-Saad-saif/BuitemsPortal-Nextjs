"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { GRADE_POINTS } from "@/lib/constants/grades";

export default function AddSemesterDialog({
  onClose,
  onSave,
  initialSemester = null,
}) {
  const isEditing = Boolean(initialSemester?._id);
  const [name, setName] = useState(initialSemester?.semesterName || "");
  const [subs, setSubs] = useState(
    initialSemester?.subjects?.length
      ? initialSemester.subjects.map((subject) => ({
          name: subject.name || "",
          creditHours: String(subject.creditHours || 3),
          grade: subject.grade || "A",
        }))
      : [{ name: "", creditHours: "3", grade: "A" }],
  );
  const [saving, setSaving] = useState(false);

  const addRow = () =>
    setSubs((previous) => [
      ...previous,
      { name: "", creditHours: "3", grade: "A" },
    ]);

  const remRow = (index) =>
    setSubs((previous) => previous.filter((_, rowIndex) => rowIndex !== index));

  const upd = (index, field, value) =>
    setSubs((previous) =>
      previous.map((subject, rowIndex) =>
        rowIndex === index ? { ...subject, [field]: value } : subject,
      ),
    );

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Please enter a semester name");

    const validSubs = subs
      .filter((subject) => subject.name.trim())
      .map((subject) => ({
        name: subject.name.trim(),
        creditHours: Number(subject.creditHours),
        grade: subject.grade,
      }));

    if (validSubs.length === 0) return toast.error("Add at least one subject");

    setSaving(true);
    try {
      const token = localStorage.getItem("auth-token");
      const endpoint = isEditing
        ? "/api/auth/update-semester"
        : "/api/auth/add-semester";

      const res = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          ...(isEditing && { semesterId: initialSemester._id }),
          semesterName: name.trim(),
          subjects: validSubs,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(isEditing ? "Semester updated!" : "Semester added!");
        onSave(data.user);
      } else {
        toast.error(
          data.error || `Failed to ${isEditing ? "update" : "add"} semester`,
        );
      }
    } catch (error) {
      console.error("semester save error:", error);
      toast.error("Unable to save semester. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-5">
          <h4 className="text-lg font-semibold text-gray-800">
            {isEditing ? "Update Semester" : "Add Semester"}
          </h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <label className="block text-xs font-medium text-gray-600 mb-2">
          Semester Name
        </label>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Semester 3"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="grid grid-cols-12 gap-2 mt-5 mb-2 text-xs font-medium text-gray-500">
          <span className="col-span-6">Subject</span>
          <span className="col-span-2">Credits</span>
          <span className="col-span-3">Grade</span>
        </div>

        <div className="space-y-2">
          {subs.map((subject, index) => (
            <div key={index} className="grid grid-cols-12 gap-2">
              <input
                className="col-span-6 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                value={subject.name}
                onChange={(event) => upd(index, "name", event.target.value)}
                placeholder={`Subject ${index + 1}`}
              />
              <select
                className="col-span-2 px-2 py-2 border border-gray-200 rounded-lg text-sm"
                value={subject.creditHours}
                onChange={(event) =>
                  upd(index, "creditHours", event.target.value)
                }
              >
                {[1, 2, 3, 4, 5].map((credit) => (
                  <option key={credit} value={credit}>
                    {credit}
                  </option>
                ))}
              </select>
              <select
                className="col-span-3 px-2 py-2 border border-gray-200 rounded-lg text-sm"
                value={subject.grade}
                onChange={(event) => upd(index, "grade", event.target.value)}
              >
                {Object.keys(GRADE_POINTS).map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => remRow(index)}
                disabled={subs.length <= 1}
                className="col-span-1 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors"
                aria-label={`Remove subject ${index + 1}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addRow}
          className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          + Add Subject
        </button>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {saving
              ? "Saving…"
              : isEditing
                ? "Update Semester"
                : "Save Semester"}
          </button>
        </div>
      </div>
    </div>
  );
}
