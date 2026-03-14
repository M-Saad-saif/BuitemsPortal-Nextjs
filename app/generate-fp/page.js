"use client";

import { useState, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const FIELDS_T1 = [
  {
    key: "assignmentNo",
    label: "",
    top: 40.5,
    left: 59,
    width: 24,
  },
  { key: "name", label: "Name", top: 37.2, left: 32, width: 52 },
  { key: "cms", label: "CMS", top: 40.5, left: 32, width: 52 },
  { key: "course", label: "Course", top: 43.8, left: 32, width: 52 },
  { key: "topic", label: "Topic", top: 47.1, left: 32, width: 52 },
  { key: "department", label: "Department", top: 50.4, left: 32, width: 52 },
  { key: "semester", label: "Semester", top: 53.7, left: 32, width: 52 },
  { key: "submitTo", label: "Submit To", top: 57.0, left: 32, width: 52 },
  { key: "date", label: "Date", top: 60.3, left: 32, width: 52 },
];

// Template 2 — Navy Border with Swooshes
// Fields same as T1
const FIELDS_T2 = [
  {
    key: "assignmentNo",
    label: "Assignment #",
    top: 30.2,
    left: 44,
    width: 24,
  },
  { key: "name", label: "Name", top: 39.5, left: 28, width: 57 },
  { key: "cms", label: "CMS", top: 43.2, left: 28, width: 57 },
  { key: "course", label: "Course", top: 46.9, left: 28, width: 57 },
  { key: "topic", label: "Topic", top: 50.5, left: 28, width: 57 },
  { key: "department", label: "Department", top: 54.2, left: 28, width: 57 },
  { key: "semester", label: "Semester", top: 57.8, left: 28, width: 57 },
  { key: "submitTo", label: "Submit To", top: 61.4, left: 28, width: 57 },
  { key: "date", label: "Date", top: 65.0, left: 28, width: 57 },
];

// Template 3 — Teal Wave
// Fields: Name, CMS, Course, Instructor, Topic, Department, Semester, Date
// Assignment No is top-right beside heading
const FIELDS_T3 = [
  {
    key: "assignmentNo",
    label: "Assignment NO",
    top: 14.5,
    left: 52,
    width: 22,
  },
  { key: "name", label: "Name", top: 38.5, left: 30, width: 46 },
  { key: "cms", label: "CMS", top: 43.0, left: 30, width: 46 },
  { key: "course", label: "Course", top: 47.4, left: 30, width: 46 },
  { key: "instructor", label: "Instructor", top: 51.8, left: 30, width: 46 },
  { key: "topic", label: "Topic", top: 56.2, left: 30, width: 46 },
  { key: "department", label: "Department", top: 60.6, left: 30, width: 46 },
  { key: "semester", label: "Semester", top: 65.0, left: 30, width: 46 },
  { key: "date", label: "Date", top: 69.4, left: 30, width: 46 },
];

// Template 4 — Blue Wave Lines
// Fields: Name, CMS, Course, Instructor, Topic, Department, Semester, Date
// Assignment # top-left beside logo
const FIELDS_T4 = [
  {
    key: "assignmentNo",
    label: "Assignment #",
    top: 14.8,
    left: 41,
    width: 20,
  },
  { key: "name", label: "Name", top: 34.0, left: 22, width: 47 },
  { key: "cms", label: "CMS", top: 38.5, left: 22, width: 47 },
  { key: "course", label: "Course", top: 43.0, left: 22, width: 47 },
  { key: "instructor", label: "Instructor", top: 47.5, left: 22, width: 47 },
  { key: "topic", label: "Topic", top: 52.0, left: 22, width: 47 },
  { key: "department", label: "Department", top: 56.5, left: 22, width: 47 },
  { key: "semester", label: "Semester", top: 61.0, left: 22, width: 47 },
  { key: "date", label: "Date", top: 65.5, left: 22, width: 47 },
];

const FIELD_MAP = {
  1: FIELDS_T1,
  2: FIELDS_T2,
  3: FIELDS_T3,
  4: FIELDS_T4,
};

const IMAGE_MAP = {
  1: "/images/ass-pg-1.png",
  2: "/images/ass-pg-2.png",
  3: "/images/ass-pg-3.png",
  4: "/images/ass-pg-4.png",
};

const TEMPLATE_NAMES = {
  1: "Classic Orange & Navy",
  2: "Navy Border & Swooshes",
  3: "Teal Wave",
  4: "Blue Wave Lines",
};

// Default form values
const defaultForm = () => ({
  name: "",
  cms: "",
  course: "",
  instructor: "",
  topic: "",
  department: "",
  semester: "",
  submitTo: "",
  date: new Date().toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }),
  assignmentNo: "",
});

// ─── FrontPagePreview ─────────────────────────────────────────────────────────
// Renders the image + transparent overlaid inputs.
// When printed, the image + typed values appear together.
function FrontPagePreview({ templateId, form, onChange, printMode }) {
  const fields = FIELD_MAP[templateId] || FIELD_MAP["1"];
  const image = IMAGE_MAP[templateId] || IMAGE_MAP["1"];

  return (
    <div
      id="printable-page"
      style={{
        // A4 aspect ratio: 210mm × 297mm = 1:1.4142
        width: "100%",
        paddingBottom: "141.42%",
        position: "relative",
        backgroundImage: `url(${image})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top left",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {fields.map(({ key, label, top, left, width }) => (
        <div
          key={key}
          style={{
            position: "absolute",
            top: `${top}%`,
            left: `${left}%`,
            width: `${width}%`,
          }}
        >
          {printMode ? (
            // In print mode: plain text so it renders cleanly
            <span
              style={{
                display: "block",
                fontSize: "clamp(8px, 1.4vw, 13px)",
                fontWeight: "600",
                color: "#0f172a",
                lineHeight: 1.2,
                fontFamily: "Arial, sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {form[key] || ""}
            </span>
          ) : (
            // In edit mode: transparent input over the blank line
            <input
              type={key === "date" ? "text" : "text"}
              value={form[key] || ""}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={label}
              aria-label={label}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px dashed rgba(59,130,246,0.4)",
                outline: "none",
                fontSize: "clamp(8px, 1.4vw, 13px)",
                fontWeight: "600",
                color: "#0f172a",
                fontFamily: "Arial, sans-serif",
                padding: "0 2px",
                lineHeight: 1.2,
                cursor: "text",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
function GenerateFPContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "1";
  const printRef = useRef(null);
  const [form, setForm] = useState(defaultForm());
  const [isPrintMode, setIsPrintMode] = useState(false);

  const upd = useCallback(
    (field, val) => setForm((p) => ({ ...p, [field]: val })),
    [],
  );

  // ── Print handler ──────────────────────────────────────────────────────────
  const handlePrint = useCallback(() => {
    // Switch to print mode (plain text spans instead of inputs) then print
    setIsPrintMode(true);
    setTimeout(() => {
      const content = printRef.current?.innerHTML;
      if (!content) {
        setIsPrintMode(false);
        return;
      }

      const win = window.open("", "_blank");
      win.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Assignment Front Page</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { size: A4 portrait; margin: 0; }
    html, body { width: 210mm; height: 297mm; overflow: hidden; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  </style>
</head>
<body>${content}</body>
</html>`);
      win.document.close();
      win.focus();
      setTimeout(() => {
        win.print();
        win.close();
        setIsPrintMode(false);
      }, 800);
    }, 100);
  }, []);

  // Fields in sidebar depend on template
  const sidebarFields = () => {
    const base = [
      { key: "assignmentNo", label: "Assignment Number", ph: "1" },
      { key: "name", label: "Student Name", ph: "Muhammad Saad" },
      { key: "cms", label: "CMS ID", ph: "CMS-12345" },
      { key: "course", label: "Course Name", ph: "Data Structures" },
    ];
    if (templateId === "3" || templateId === "4") {
      base.push({
        key: "instructor",
        label: "Instructor / Teacher",
        ph: "Dr. Ahmed Khan",
      });
    }
    base.push(
      { key: "topic", label: "Topic / Title", ph: "Linked Lists" },
      { key: "department", label: "Department", ph: "Computer Science" },
      { key: "semester", label: "Semester", ph: "3rd Semester" },
    );
    if (templateId === "1" || templateId === "2") {
      base.push({
        key: "submitTo",
        label: "Submit To (Teacher)",
        ph: "Dr. Ahmed Khan",
      });
    }
    base.push({ key: "date", label: "Submission Date", ph: "" });
    return base;
  };

  const inputCls =
    "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white";

  return (
    <div className="flex flex-col lg:flex-row gap-5 min-h-screen p-4 max-w-[1400px] mx-auto">
      {/* ── Sidebar: form ────────────────────────────────────────────────── */}
      <div className="lg:w-72 xl:w-80 shrink-0">
        <div className="card sticky top-20 max-h-[calc(100vh-5.5rem)] flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-2 shrink-0">
            <div>
              <h2 className="font-bold text-gray-800">Fill Details</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                T{templateId} — {TEMPLATE_NAMES[templateId]}
              </p>
            </div>
            <a
              href="/front-pages"
              className="text-xs text-blue-500 hover:underline shrink-0 mt-0.5"
            >
              ← Templates
            </a>
          </div>

          {/* Template switcher */}
          <div className="flex gap-1.5 mb-3 shrink-0">
            {["1", "2", "3", "4"].map((id) => (
              <a
                key={id}
                href={`/generate-fp?template=${id}`}
                className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  templateId === id
                    ? "navbar-bg text-white shadow-sm"
                    : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                T{id}
              </a>
            ))}
          </div>

          {/* Scrollable input fields */}
          <div className="overflow-y-auto flex-1 space-y-3 pr-0.5">
            {sidebarFields().map(({ key, label, ph }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {label}
                </label>
                {key === "date" ? (
                  <input
                    type="date"
                    value={(() => {
                      try {
                        const d = new Date(form[key]);
                        return isNaN(d) ? "" : d.toISOString().split("T")[0];
                      } catch {
                        return "";
                      }
                    })()}
                    onChange={(e) => {
                      if (e.target.value) {
                        upd(
                          key,
                          new Date(e.target.value).toLocaleDateString("en-PK", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }),
                        );
                      } else {
                        upd(key, "");
                      }
                    }}
                    className={inputCls}
                  />
                ) : (
                  <input
                    type="text"
                    value={form[key] || ""}
                    onChange={(e) => upd(key, e.target.value)}
                    placeholder={ph}
                    className={inputCls}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-4 space-y-2 pt-3 border-t border-gray-100 shrink-0">
            <button
              onClick={handlePrint}
              className="w-full py-2.5 navbar-bg text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2"
            >
              🖨️ Print / Save as PDF
            </button>
            <button
              onClick={() => setForm(defaultForm())}
              className="w-full py-2 border border-gray-200 text-gray-500 rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* ── Preview panel ────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-bold text-gray-800">
              Live Preview
              <span className="ml-2 text-xs font-normal text-gray-400">
                Click any field directly on the page to edit
              </span>
            </h2>
          </div>
          <button
            onClick={handlePrint}
            className="px-4 py-2 navbar-bg text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            ⬇️ Download PDF
          </button>
        </div>

        {/* A4 container — the image fills it, inputs sit on top */}
        <div className="bg-gray-300 rounded-2xl p-4 flex justify-center">
          <div
            ref={printRef}
            style={{
              width: "min(100%, 600px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <FrontPagePreview
              templateId={templateId}
              form={form}
              onChange={upd}
              printMode={isPrintMode}
            />
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-3">
          💡 Type directly on the page above <em>or</em> use the sidebar fields.
          &nbsp; In the print dialog → <strong>Save as PDF</strong> → Margins:{" "}
          <strong>None</strong>
        </p>
      </div>
    </div>
  );
}

export default function GenerateFPPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
      }
    >
      <GenerateFPContent />
    </Suspense>
  );
}
