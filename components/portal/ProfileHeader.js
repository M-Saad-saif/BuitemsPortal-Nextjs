"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { gpaColor } from "@/lib/constants/grades";

export default function ProfileHeader({ user, onEditClick, onPicChange }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("profilePic", file);
    const token = localStorage.getItem("auth-token");
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "auth-token": token },
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Profile photo updated!");
        onPicChange(data.profilePic);
      } else toast.error(data.error || "Upload failed");
    } catch {
      toast.error("Upload failed");
    }
    setUploading(false);
  };

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="card mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-100 bg-gray-100">
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold navbar-bg text-white">
              {capitalizeFirstLetter(user.name)}
            </div>
          )}
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-xs hover:bg-blue-50 transition-colors shadow-sm"
          title="Change photo"
        >
          {uploading ? "⏳" : "📷"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-xl font-bold text-gray-800">
          {capitalizeFirstLetter(user.name)}
        </h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
          {user.rollNo && (
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              {user.rollNo}
            </span>
          )}
          {user.department && (
            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
              {user.department}
            </span>
          )}
          {user.program && (
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
              {user.program}
            </span>
          )}
          {user.batch && (
            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
              {user.batch}
            </span>
          )}
        </div>
      </div>

      {/* CGPA + edit */}
      <div className="flex flex-col items-center gap-3 shrink-0">
        <div className="text-center px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-xs text-gray-500 uppercase tracking-wider">CGPA</p>
          <p className={`text-3xl font-bold ${gpaColor(user.cgpa || 0)}`}>
            {(user.cgpa || 0).toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {user.totalCreditHours || 0} credits
          </p>
        </div>
        <button
          onClick={onEditClick}
          className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors w-full"
        >
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
}
