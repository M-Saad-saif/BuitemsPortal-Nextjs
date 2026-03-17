"use client";

import ToolHeader from "@/components/layout/ToolHeader";
import { useState, useRef } from "react";

import { AiOutlineFieldTime } from "react-icons/ai";
import { MdPerson } from "react-icons/md";
import { IoMdClock } from "react-icons/io";
import { FaLocationDot, FaBook } from "react-icons/fa6";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const SAMPLE_SLOTS = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 01:00",
  "02:00 - 03:00",
  "03:00 - 04:00",
];

const SLOT_COLORS = [
  "bg-blue-50 border-blue-200 text-blue-800",
  "bg-emerald-50 border-emerald-200 text-emerald-800",
  "bg-violet-50 border-violet-200 text-violet-800",
  "bg-amber-50 border-amber-200 text-amber-800",
  "bg-rose-50 border-rose-200 text-rose-800",
  "bg-cyan-50 border-cyan-200 text-cyan-800",
];

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
  const [view, setView] = useState("grid");
  const [timeSlots, setTimeSlots] = useState([]);
  const [timetable, setTimetable] = useState({});
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    subject: "",
    room: "",
    teacher: "",
  });
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [newSlotFrom, setNewSlotFrom] = useState("");
  const [newSlotTo, setNewSlotTo] = useState("");
  const [slotError, setSlotError] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);

  const tableRef = useRef(null);

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

  const handleAddSlot = () => {
    setSlotError("");
    if (!newSlotFrom || !newSlotTo) {
      setSlotError("Please enter both start and end times.");
      return;
    }
    const label = `${newSlotFrom} - ${newSlotTo}`;
    if (timeSlots.includes(label)) {
      setSlotError("This time slot already exists.");
      return;
    }
    setTimeSlots((prev) => [...prev, label]);
    setNewSlotFrom("");
    setNewSlotTo("");
    setShowAddSlot(false);
  };

  const handleRemoveSlot = (slot) => {
    setTimeSlots((prev) => prev.filter((s) => s !== slot));
    setTimetable((prev) => {
      const updated = { ...prev };
      DAYS.forEach((day) => {
        delete updated[`${day}-${slot}`];
      });
      return updated;
    });
  };

  const handleSavePDF = async () => {
    if (!tableRef.current || timeSlots.length === 0) return;
    setPdfLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(tableRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const imgW = canvas.width;
      const imgH = canvas.height;

      const isLandscape = imgW > imgH;
      const pdf = new jsPDF({
        orientation: isLandscape ? "landscape" : "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 10;

      const maxW = pageW - margin * 2;
      const maxH = pageH - margin * 2;

      const ratio = Math.min(maxW / (imgW / 2), maxH / (imgH / 2));
      const finalW = (imgW / 2) * ratio;
      const finalH = (imgH / 2) * ratio;
      const offsetX = margin + (maxW - finalW) / 2;
      const offsetY = margin + (maxH - finalH) / 2;

      pdf.addImage(imgData, "JPEG", offsetX, offsetY, finalW, finalH);
      pdf.save("BUITEMS_Timetable.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <section className="bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className=" flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <ToolHeader
            heading="Timetable"
            desc="Your weekly class schedule — click any cell to edit"
          />

          <div className="flex flex-wrap gap-2 justify-self-center">
            <button
              onClick={() => setView("grid")}
              className={`px-4 py-2 rounded-lg text-sm font-medium bg-blue-200 transition-colors ${view === "grid" ? "text-black bg-blue-300" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              Grid View
            </button>

            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-lg text-sm font-medium bg-blue-200 transition-colors ${view === "list" ? " text-black" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              List View
            </button>

            <button
              onClick={() => {
                setShowAddSlot(true);
                setSlotError("");
              }}
              className= " navbar-bg px-4 py-2 rounded-lg text-sm font-medium border border-blue-300 text-white transition-colors"
            >
              + Add Time Slot
            </button>

            {timeSlots.length > 0 && (
              <button
                onClick={handleSavePDF}
                disabled={pdfLoading}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white transition-colors flex items-center gap-2"
              >
                {pdfLoading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                        className="opacity-75"
                      />
                    </svg>
                    Generating…
                  </>
                ) : (
                  <>📥 Save as PDF</>
                )}
              </button>
            )}
          </div>
        </div>

        {timeSlots.length === 0 && (
          <div className="card text-center py-16">
            <div className="text-4xl mb-3 justify-self-center">
              <AiOutlineFieldTime size={50} />
            </div>
            <h3 className="font-semibold text-gray-700 mb-2">
              No Time Slots Yet
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              Add your class time slots to get started building your timetable.
            </p>
            <button
              onClick={() => setShowAddSlot(true)}
              className="px-6 py-2.5 navbar-bg text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              + Add First Time Slot
            </button>
          </div>
        )}

        {view === "grid" && timeSlots.length > 0 && (
          <div ref={tableRef} className="card p-0 overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="navbar-bg text-white">
                  <th className="px-4 py-3 text-left w-36 font-semibold text-xs uppercase tracking-wide">
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
                  <th className="px-2 py-3 w-8 no-pdf" />
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, si) => (
                  <tr
                    key={slot}
                    className={si % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  >
                    <td className="px-4 py-2 border-r border-gray-100">
                      <span className="text-xs font-mono text-gray-500 whitespace-nowrap">
                        {slot}
                      </span>
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
                                <div className="font-semibold text-xs leading-tight flex items-center gap-2">
                                  <FaBook size={15} /> {cell.subject}
                                </div>
                                {cell.room && (
                                  <div className="text-xs opacity-70 mt-0.5 flex items-center gap-2 ">
                                    <FaLocationDot size={15} color="#a50000" />{" "}
                                    {cell.room}
                                  </div>
                                )}
                                {cell.teacher && (
                                  <div className="text-xs opacity-70 flex items-center gap-2">
                                    <MdPerson size={20} /> {cell.teacher}
                                  </div>
                                )}
                              </>
                            ) : (
                              <span className="text-xs text-gray-300">
                                + add
                              </span>
                            )}
                          </button>
                        </td>
                      );
                    })}
                    <td className="px-2 py-2 text-center">
                      <button
                        onClick={() => handleRemoveSlot(slot)}
                        title="Remove this time slot"
                        className="w-6 h-6 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-400 transition-colors mx-auto text-xs"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === "list" && timeSlots.length > 0 && (
          <div
            ref={tableRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {DAYS.map((day) => {
              const dayCells = timeSlots
                .filter((s) => getCell(day, s)?.subject)
                .map((s) => ({ slot: s, ...getCell(day, s) }));
              return (
                <div key={day} className="card">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
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
                          <div className="font-semibold flex items-center gap-2">
                            <FaBook size={15} /> {c.subject}
                          </div>

                          <div className="mt-1 opacity-75 flex items-center gap-2"><IoMdClock  size={20} color="black"/> {c.slot}</div>
                          {c.room && (
                            <div className="opacity-75 flex items-center gap-2">
                              <FaLocationDot size={15} color="#a50000" />{" "}
                              {c.room}
                            </div>
                          )}

                          {c.teacher && (
                            <div className="opacity-75 flex items-center gap-2">
                              <MdPerson size={20} /> {c.teacher}
                            </div>
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

        {/* ====================== Add Time Slot Modal ===========================*/}
        {showAddSlot && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <h3 className="font-bold text-gray-800 mb-1">Add Time Slot</h3>
              <p className="text-sm text-gray-500 mb-5">
                Enter the start and end time for this slot.
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={newSlotFrom}
                    onChange={(e) => setNewSlotFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newSlotTo}
                    onChange={(e) => setNewSlotTo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>

                {newSlotFrom && newSlotTo && (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-sm text-blue-700 font-mono text-center">
                    {newSlotFrom} - {newSlotTo}
                  </div>
                )}

                {slotError && (
                  <p className="text-xs text-red-500">{slotError}</p>
                )}

              </div>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleAddSlot}
                  className="flex-1 py-2.5 navbar-bg text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  Add Slot
                </button>
                <button
                  onClick={() => {
                    setShowAddSlot(false);
                    setSlotError("");
                  }}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================ Edit Cell Modal ================  */}
        {editing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <h3 className="font-bold text-gray-800 mb-1">{editing.day}</h3>
              <p className="text-sm text-gray-500 mb-5 flex items-center gap-2"><IoMdClock size={18} color="black"/> {editing.slot}</p>
              <div className="space-y-3">
                {[
                  {
                    label: "Subject Name",
                    field: "subject",
                    placeholder: "e.g. Data Structures",
                  },
                  {
                    label: "Room ",
                    field: "room",
                    placeholder: "e.g. Ssg-15",
                  },
                  {
                    label: "Teacher",
                    field: "teacher",
                    placeholder: "Teacher mnae",
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
    </section>
  );
}
