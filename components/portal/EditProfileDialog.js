"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function EditProfileDialog({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    name: user.name || "",
    rollNo: user.rollNo || "",
    department: user.department || "",
    program: user.program || "",
    batch: user.batch || "",
    phone: user.phone || "",
    currentPassword: "",
    newPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const upd = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error("Name is required");
    setSaving(true);
    const token = localStorage.getItem("auth-token");
    const res = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "auth-token": token },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (data.success) {
      toast.success("Profile updated!");
      onSave(data.user);
    } else toast.error(data.error || "Update failed");
  };

  const fields = [
    { label: "Full Name*", f: "name", ph: "Muhammad Saad" },
    { label: "Roll No.", f: "rollNo", ph: "21-CS-01" },
    { label: "Department", f: "department", ph: "Computer Science" },
    { label: "Program", f: "program", ph: "BS CS" },
    { label: "Batch", f: "batch", ph: "2021-2025" },
    { label: "Phone", f: "phone", ph: "+92-XXX-XXXXXXX" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-bold text-gray-800">Edit Profile</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5 space-y-3 flex-1">
          {fields.map(({ label, f, ph }) => (
            <div key={f}>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {label}
              </label>
              <input
                value={form[f]}
                onChange={(e) => upd(f, e.target.value)}
                placeholder={ph}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
          <div className="pt-3 border-t">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Change Password (optional)
            </p>
            {[
              { label: "Current Password", f: "currentPassword" },
              { label: "New Password", f: "newPassword" },
            ].map(({ label, f }) => (
              <div key={f} className="mb-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {label}
                </label>
                <input
                  type="password"
                  value={form[f]}
                  onChange={(e) => upd(f, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 navbar-bg text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {saving ? "Saving…" : "Save Changes"}
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
