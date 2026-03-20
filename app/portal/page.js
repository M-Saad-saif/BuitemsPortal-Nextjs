"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import toast from "react-hot-toast";

import ProfileHeader from "@/components/portal/ProfileHeader";
import ProfileTab from "@/components/portal/ProfileTab";
import SemesterRecordsTab from "@/components/portal/SemesterRecordsTab";
import GPAAnalysisTab from "@/components/portal/GPAAnalysisTab";
import AIChatTab from "@/components/portal/AIChatTab";
import AddSemesterDialog from "@/components/portal/AddSemesterDialog";
import EditProfileDialog from "@/components/portal/EditProfileDialog";
import Spinner from "@/components/UI/Spinner";

import { IoPersonSharp } from "react-icons/io5";
import { SiBookstack } from "react-icons/si";
import { LuTrendingUpDown } from "react-icons/lu";
import { FaRobot } from "react-icons/fa";

const TABS = [
  { id: "profile", label: "Profile", icon: IoPersonSharp, color: "gray" },
  {
    id: "semesters",
    label: "Semester Records",
    icon: SiBookstack,
    color: "#D61200",
  },
  {
    id: "analysis",
    label: "GPA Analysis",
    icon: LuTrendingUpDown,
    color: "#A0D94A",
  },
  { id: "ai", label: "AI Assistant", icon: FaRobot, color: "#2AC7CC" },
];

export default function PortalPage() {
  const { user, loading, refreshUser, isLoggingOut } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("profile");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  const [profilePicVersion, setProfilePicVersion] = useState(0);

  const initialised = useRef(false);

  useEffect(() => {
    if (!loading && !user && !isLoggingOut) router.push("/login");
  }, [loading, user, isLoggingOut, router]);

  useEffect(() => {
    if (user && !initialised.current) {
      setLocalUser(user);
      setProfilePicVersion(Date.now());
      initialised.current = true;
    }
  }, [user]);

  const handlePicChange = (freshUrl) => {
    setLocalUser((prev) => (prev ? { ...prev, profilePic: freshUrl } : prev));
    setProfilePicVersion(Date.now());
  };

  const handleSave = (updatedUser) => {
    setLocalUser(updatedUser);
    setShowAdd(false);
    setShowEdit(false);
    refreshUser();
  };

  const handleDeleteSemester = async (semId) => {
    if (!confirm("Delete this semester record?")) return;
    const token = localStorage.getItem("auth-token");
    const res = await fetch("/api/auth/delete-semester", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "auth-token": token },
      body: JSON.stringify({ semesterId: semId }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Semester deleted");
      setLocalUser(data.user);
      refreshUser();
    } else {
      toast.error(data.error || "Delete failed");
    }
  };

  if (loading || !localUser) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Spinner width="160" className="justify-self-center" />
          <p className="text-gray-500 mt-3">Loading your portal…</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ProfileHeader
          user={localUser}
          profilePicVersion={profilePicVersion}
          onEditClick={() => setShowEdit(true)}
          onPicChange={handlePicChange}
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-2 py-2.5 rounded-[10px] text-xs sm:text-sm font-medium transition-all w-[calc(50%-4px)] sm:w-[24%] border border-blue-600 border-dotted ${
                activeTab === tab.id
                  ? "tab-active shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon size={18} color={tab.color} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="fade-in">
          {activeTab === "profile" && <ProfileTab user={localUser} />}
          {activeTab === "semesters" && (
            <SemesterRecordsTab
              user={localUser}
              onAdd={() => setShowAdd(true)}
              onDelete={handleDeleteSemester}
            />
          )}
          {activeTab === "analysis" && <GPAAnalysisTab user={localUser} />}
          {activeTab === "ai" && <AIChatTab />}
        </div>

        {showAdd && (
          <AddSemesterDialog
            onClose={() => setShowAdd(false)}
            onSave={handleSave}
          />
        )}
        {showEdit && (
          <EditProfileDialog
            user={localUser}
            onClose={() => setShowEdit(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </section>
  );
}
