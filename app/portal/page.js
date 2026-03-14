"use client";
// app/portal/page.js — Full conversion of src/components/PortalOFuser.js
// Includes: ProfileHeader, ProfileTab, SemesterRecordsTab, GPACalculatorTab, GPAAnalysisTab,
//           AddSemesterDialog, EditProfileDialog, AI Chat

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import toast from "react-hot-toast";
import Link from "next/link";

// ─── Grade helpers ────────────────────────────────────────────────────────────
const GRADE_POINTS = { "A":4.0,"A-":3.7,"B+":3.3,"B":3.0,"B-":2.7,"C+":2.3,"C":2.0,"C-":1.7,"D+":1.3,"D":1.0,"F":0.0 };
const GRADE_COLOR  = { "A":"text-green-600","A-":"text-green-500","B+":"text-blue-600","B":"text-blue-500","B-":"text-blue-400","C+":"text-yellow-600","C":"text-yellow-500","C-":"text-yellow-400","D+":"text-orange-500","D":"text-orange-600","F":"text-red-600" };

function gpaColor(gpa) {
  const g = parseFloat(gpa);
  if (g >= 3.5) return "text-green-600";
  if (g >= 3.0) return "text-blue-600";
  if (g >= 2.5) return "text-yellow-600";
  return "text-red-500";
}

// ─── Sub-component: ProfileHeader ─────────────────────────────────────────────
function ProfileHeader({ user, onEditClick, onPicChange }) {
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
      const res  = await fetch("/api/upload", { method:"POST", headers:{"auth-token":token}, body:fd });
      const data = await res.json();
      if (data.success) { toast.success("Profile photo updated!"); onPicChange(data.profilePic); }
      else toast.error(data.error || "Upload failed");
    } catch { toast.error("Upload failed"); }
    setUploading(false);
  };

  return (
    <div className="card mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-100 bg-gray-100">
          {user.profilePic
            ? <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-blue-300 navbar-bg text-white">{user.name?.charAt(0)?.toUpperCase()}</div>
          }
        </div>
        <button onClick={() => fileRef.current?.click()} disabled={uploading}
          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-xs hover:bg-blue-50 transition-colors shadow-sm"
          title="Change photo">
          {uploading ? "⏳" : "📷"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
          {user.rollNo    && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{user.rollNo}</span>}
          {user.department && <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{user.department}</span>}
          {user.program    && <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{user.program}</span>}
          {user.batch      && <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">{user.batch}</span>}
        </div>
      </div>

      {/* CGPA + edit */}
      <div className="flex flex-col items-center gap-3 shrink-0">
        <div className="text-center px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-xs text-gray-500 uppercase tracking-wider">CGPA</p>
          <p className={`text-3xl font-bold ${gpaColor(user.cgpa || 0)}`}>
            {(user.cgpa || 0).toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{user.totalCreditHours || 0} credits</p>
        </div>
        <button onClick={onEditClick}
          className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors w-full">
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
}

// ─── Sub-component: ProfileTab ─────────────────────────────────────────────────
function ProfileTab({ user }) {
  const fields = [
    { label: "Full Name",   value: user.name },
    { label: "Email",       value: user.email },
    { label: "Roll Number", value: user.rollNo || "Not set" },
    { label: "Department",  value: user.department || "Not set" },
    { label: "Program",     value: user.program || "Not set" },
    { label: "Batch",       value: user.batch || "Not set" },
    { label: "Phone",       value: user.phone || "Not set" },
    { label: "Member Since",value: new Date(user.createdAt).toLocaleDateString("en-PK", { year:"numeric", month:"long", day:"numeric" }) },
  ];
  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 mb-4">Profile Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ label, value }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
            <p className="font-medium text-gray-800 text-sm">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sub-component: SemesterRecordsTab ────────────────────────────────────────
function SemesterRecordsTab({ user, onAdd, onDelete }) {
  const [expanded, setExpanded] = useState(null);
  if (!user.semesters || user.semesters.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-4xl mb-3">📚</div>
        <h3 className="font-semibold text-gray-700 mb-2">No Semester Records Yet</h3>
        <p className="text-gray-500 text-sm mb-5">Add your first semester to start tracking your CGPA</p>
        <button onClick={onAdd} className="px-6 py-2.5 navbar-bg text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
          + Add First Semester
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Semester Records</h3>
        <button onClick={onAdd}
          className="px-4 py-2 navbar-bg text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
          + Add Semester
        </button>
      </div>
      {user.semesters.map((sem) => (
        <div key={sem._id} className="card p-0 overflow-hidden">
          <button
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            onClick={() => setExpanded(expanded === sem._id ? null : sem._id)}>
            <div>
              <span className="font-semibold text-gray-800">{sem.semesterName}</span>
              <span className="ml-3 text-xs text-gray-400">{sem.creditHours} credits</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xl font-bold ${gpaColor(sem.gpa)}`}>{sem.gpa.toFixed(2)}</span>
              <span className="text-gray-400">{expanded === sem._id ? "▲" : "▼"}</span>
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
                      <td className="py-2 text-gray-700">{s.name}</td>
                      <td className="py-2 text-center text-gray-500">{s.creditHours}</td>
                      <td className={`py-2 text-center font-bold ${GRADE_COLOR[s.grade] || "text-gray-600"}`}>{s.grade}</td>
                      <td className="py-2 text-center text-gray-500">{((GRADE_POINTS[s.grade] || 0) * s.creditHours).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => onDelete(sem._id)}
                className="mt-4 text-xs text-red-500 hover:text-red-700 transition-colors">
                🗑️ Delete this semester
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Sub-component: GPAAnalysisTab ────────────────────────────────────────────
function GPAAnalysisTab({ user }) {
  if (!user.semesters || user.semesters.length === 0) {
    return (
      <div className="card text-center py-12 text-gray-400">
        <div className="text-4xl mb-3">📊</div>
        <p>Add semester records to see your GPA analysis</p>
      </div>
    );
  }
  const best  = user.semesters.reduce((a, b) => a.gpa > b.gpa ? a : b);
  const worst = user.semesters.reduce((a, b) => a.gpa < b.gpa ? a : b);
  const trend = user.semesters.length >= 2
    ? (user.semesters[user.semesters.length-1].gpa > user.semesters[user.semesters.length-2].gpa
      ? "📈 Improving" : user.semesters[user.semesters.length-1].gpa < user.semesters[user.semesters.length-2].gpa
      ? "📉 Declining" : "➡️ Stable")
    : "N/A";

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label:"CGPA",      value:(user.cgpa||0).toFixed(2), color:gpaColor(user.cgpa||0) },
          { label:"Best GPA",  value:best.gpa.toFixed(2)+" ("+best.semesterName+")", color:"text-green-600" },
          { label:"Trend",     value:trend, color:"text-blue-600" },
          { label:"Total Credits", value:user.totalCreditHours||0, color:"text-purple-600" },
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
                <span className={`font-bold ${gpaColor(sem.gpa)}`}>{sem.gpa.toFixed(2)}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width:`${(sem.gpa/4)*100}%`, background:"linear-gradient(to right,#1a3c6e,#2563eb)" }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
          <span>0.0</span><span>2.0</span><span>3.0</span><span>4.0</span>
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
                <td className={`py-2 text-center font-bold ${gpaColor(sem.gpa)}`}>{sem.gpa.toFixed(2)}</td>
                <td className="py-2 text-center text-gray-500">{sem.creditHours}</td>
                <td className="py-2 text-center text-gray-500">{sem.subjects?.length || 0}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-50 font-semibold">
              <td className="py-2 px-1 text-gray-700">CGPA</td>
              <td className={`py-2 text-center text-xl ${gpaColor(user.cgpa||0)}`}>{(user.cgpa||0).toFixed(2)}</td>
              <td className="py-2 text-center text-gray-700">{user.totalCreditHours||0}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ─── Sub-component: AddSemesterDialog ─────────────────────────────────────────
function AddSemesterDialog({ onClose, onSave }) {
  const [name, setName]   = useState("");
  const [subs, setSubs]   = useState([{ name:"", creditHours:"3", grade:"A" }]);
  const [saving, setSaving] = useState(false);

  const addRow = () => setSubs(p => [...p, { name:"", creditHours:"3", grade:"A" }]);
  const remRow = (i) => setSubs(p => p.filter((_,idx)=>idx!==i));
  const upd    = (i,f,v) => setSubs(p => p.map((s,idx)=>idx===i?{...s,[f]:v}:s));

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Please enter a semester name");
    const validSubs = subs.filter(s => s.name.trim());
    if (validSubs.length === 0) return toast.error("Add at least one subject");
    setSaving(true);
    const token = localStorage.getItem("auth-token");
    const res  = await fetch("/api/auth/add-semester", {
      method:"POST",
      headers:{"Content-Type":"application/json","auth-token":token},
      body: JSON.stringify({ semesterName:name.trim(), subjects:validSubs }),
    });
    const data = await res.json();
    setSaving(false);
    if (data.success) { toast.success("Semester added!"); onSave(data.user); }
    else toast.error(data.error || "Failed to add semester");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-bold text-gray-800">Add Semester</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div className="overflow-y-auto px-6 py-5 flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Semester Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Semester 3"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase mb-1 px-1">
              <div className="col-span-5">Subject</div>
              <div className="col-span-3">Credits</div>
              <div className="col-span-3">Grade</div>
              <div className="col-span-1"></div>
            </div>
            {subs.map((s,i)=>(
              <div key={i} className="grid grid-cols-12 gap-2 mb-2">
                <input className="col-span-5 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={s.name} onChange={e=>upd(i,"name",e.target.value)} placeholder={`Subject ${i+1}`} />
                <select className="col-span-3 px-2 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={s.creditHours} onChange={e=>upd(i,"creditHours",e.target.value)}>
                  {[1,2,3,4,5].map(c=><option key={c} value={c}>{c} CR</option>)}
                </select>
                <select className="col-span-3 px-2 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={s.grade} onChange={e=>upd(i,"grade",e.target.value)}>
                  {Object.keys(GRADE_POINTS).map(g=><option key={g} value={g}>{g}</option>)}
                </select>
                <button onClick={()=>remRow(i)} disabled={subs.length<=1}
                  className="col-span-1 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors flex items-center justify-center">✕</button>
              </div>
            ))}
            <button onClick={addRow}
              className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors mt-1">
              + Add Subject
            </button>
          </div>
        </div>
        <div className="px-6 py-4 border-t flex gap-3">
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-2.5 navbar-bg text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-60 transition-opacity">
            {saving ? "Saving…" : "Save Semester"}
          </button>
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-component: EditProfileDialog ─────────────────────────────────────────
function EditProfileDialog({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    name: user.name||"", rollNo: user.rollNo||"", department: user.department||"",
    program: user.program||"", batch: user.batch||"", phone: user.phone||"",
    currentPassword:"", newPassword:"",
  });
  const [saving, setSaving] = useState(false);
  const upd = (f,v) => setForm(p=>({...p,[f]:v}));

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error("Name is required");
    setSaving(true);
    const token = localStorage.getItem("auth-token");
    const res = await fetch("/api/auth/profile",{
      method:"PUT",
      headers:{"Content-Type":"application/json","auth-token":token},
      body:JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (data.success) { toast.success("Profile updated!"); onSave(data.user); }
    else toast.error(data.error || "Update failed");
  };

  const fields = [
    {label:"Full Name*",f:"name",ph:"Muhammad Saad"},{label:"Roll No.",f:"rollNo",ph:"21-CS-01"},
    {label:"Department",f:"department",ph:"Computer Science"},{label:"Program",f:"program",ph:"BS CS"},
    {label:"Batch",f:"batch",ph:"2021-2025"},{label:"Phone",f:"phone",ph:"+92-XXX-XXXXXXX"},
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-bold text-gray-800">Edit Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div className="overflow-y-auto px-6 py-5 space-y-3 flex-1">
          {fields.map(({label,f,ph})=>(
            <div key={f}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
              <input value={form[f]} onChange={e=>upd(f,e.target.value)} placeholder={ph}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          ))}
          <div className="pt-3 border-t">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Change Password (optional)</p>
            {[{label:"Current Password",f:"currentPassword"},{label:"New Password",f:"newPassword"}].map(({label,f})=>(
              <div key={f} className="mb-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                <input type="password" value={form[f]} onChange={e=>upd(f,e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t flex gap-3">
          <button onClick={handleSave} disabled={saving}
            className="flex-1 py-2.5 navbar-bg text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-60 transition-opacity">
            {saving?"Saving…":"Save Changes"}
          </button>
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-component: AI Chat ────────────────────────────────────────────────────
function AIChatTab() {
  const [msgs, setMsgs] = useState([
    { role:"assistant", text:"Hi! I'm your AI study assistant. Ask me anything about your studies, subjects, or academic life at BUITEMS 🎓" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({ behavior:"smooth" }); },[msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs(p=>[...p,{role:"user",text:userMsg}]);
    setLoading(true);

    // Call Anthropic API through Next.js proxy to avoid exposing key
    try {
      const res = await fetch("/api/ai-chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMsgs(p=>[...p,{role:"assistant",text:data.reply||"Sorry, I couldn't process that."}]);
    } catch {
      setMsgs(p=>[...p,{role:"assistant",text:"AI service unavailable. Please try again later."}]);
    }
    setLoading(false);
  };

  return (
    <div className="card flex flex-col h-[500px]">
      <div className="flex items-center gap-2 pb-3 border-b mb-3">
        <span className="text-xl">🤖</span>
        <h3 className="font-semibold text-gray-800">AI Study Assistant</h3>
        <span className="ml-auto text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">● Online</span>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {msgs.map((m,i)=>(
          <div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              m.role==="user"
                ? "navbar-bg text-white rounded-br-none"
                : "bg-gray-100 text-gray-700 rounded-bl-none"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 px-4 py-2.5 rounded-2xl rounded-bl-none text-sm">
              <span className="animate-pulse">Thinking…</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      {/* Input */}
      <div className="flex gap-2 mt-3 pt-3 border-t">
        <input value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
          placeholder="Ask about Data Structures, calculus, exams…"
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        <button onClick={send} disabled={loading||!input.trim()}
          className="px-5 py-2.5 navbar-bg text-white font-medium rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity text-sm">
          Send
        </button>
      </div>
    </div>
  );
}

// ─── Main Portal Page ──────────────────────────────────────────────────────────
const TABS = [
  { id:"profile",   label:"Profile",         icon:"👤" },
  { id:"semesters", label:"Semester Records", icon:"📚" },
  { id:"analysis",  label:"GPA Analysis",     icon:"📊" },
  { id:"ai",        label:"AI Assistant",     icon:"🤖" },
];

export default function PortalPage() {
  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();
  const [activeTab,  setActiveTab]  = useState("profile");
  const [showAdd,    setShowAdd]    = useState(false);
  const [showEdit,   setShowEdit]   = useState(false);
  const [localUser,  setLocalUser]  = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (user) setLocalUser(user);
  }, [user, loading, router]);

  const handleSave = (updatedUser) => {
    setLocalUser(updatedUser);
    setShowAdd(false);
    setShowEdit(false);
    refreshUser();
  };

  const handleDeleteSemester = async (semId) => {
    if (!confirm("Delete this semester record?")) return;
    const token = localStorage.getItem("auth-token");
    const res = await fetch("/api/auth/delete-semester",{
      method:"DELETE",
      headers:{"Content-Type":"application/json","auth-token":token},
      body:JSON.stringify({ semesterId: semId }),
    });
    const data = await res.json();
    if (data.success) { toast.success("Semester deleted"); setLocalUser(data.user); refreshUser(); }
    else toast.error(data.error || "Delete failed");
  };

  if (loading || !localUser) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-500">Loading your portal…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ProfileHeader
        user={localUser}
        onEditClick={() => setShowEdit(true)}
        onPicChange={(url) => setLocalUser(p => ({ ...p, profilePic: url }))}
      />

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1 mb-6 pb-1">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab===tab.id ? "tab-active shadow-md" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="fade-in">
        {activeTab === "profile"   && <ProfileTab user={localUser} />}
        {activeTab === "semesters" && (
          <SemesterRecordsTab
            user={localUser}
            onAdd={() => setShowAdd(true)}
            onDelete={handleDeleteSemester}
          />
        )}
        {activeTab === "analysis"  && <GPAAnalysisTab user={localUser} />}
        {activeTab === "ai"        && <AIChatTab />}
      </div>

      {/* Dialogs */}
      {showAdd  && <AddSemesterDialog onClose={() => setShowAdd(false)} onSave={handleSave} />}
      {showEdit && <EditProfileDialog user={localUser} onClose={() => setShowEdit(false)} onSave={handleSave} />}
    </div>
  );
}
