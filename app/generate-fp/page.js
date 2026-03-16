"use client";

import { useState, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { IoPrint } from "react-icons/io5";
import { FaDownload, } from "react-icons/fa";
import Link from "next/link";

const FIELDS_T1 = [
  { key: "assignmentNo", label: "", top: 41.5, left: 61, width: 9 },
  { key: "name", label: "Name", top: 51, left: 32, width: 52 },
  { key: "cms", label: "CMS", top: 53.5, left: 32, width: 52 },
  { key: "course", label: "Course", top: 56, left: 33, width: 52 },
  { key: "topic", label: "Topic", top: 58, left: 33, width: 52 },
  { key: "department", label: "Department", top: 60.8, left: 37, width: 52 },
  { key: "semester", label: "Semester", top: 63.3, left: 35, width: 52 },
  { key: "submitTo", label: "Submit To", top: 65.6, left: 35, width: 52 },
  { key: "date", label: "Date", top: 68.3, left: 30, width: 52 },
];

const FIELDS_T2 = [
  { key: "assignmentNo", label: "", top: 45.7, left: 58, width: 24 },
  { key: "name", label: "Name", top: 51.5, left: 33, width: 57 },
  { key: "cms", label: "CMS", top: 54.8, left: 31, width: 57 },
  { key: "course", label: "Course", top: 57.8, left: 34, width: 57 },
  { key: "topic", label: "Topic", top: 60.9, left: 34, width: 57 },
  { key: "department", label: "Department", top: 64, left: 41, width: 57 },
  { key: "semester", label: "Semester", top: 67, left: 36, width: 57 },
  { key: "submitTo", label: "Submit To", top: 70.3, left: 39, width: 57 },
  { key: "date", label: "Date", top: 73, left: 31, width: 57 },
];

const FIELDS_T3 = [
  { key: "assignmentNo", label: "", top: 22.5, left: 62, width: 22 },
  { key: "name", label: "Name", top: 36.0, left: 22.0, width: 46 },
  { key: "cms", label: "CMS", top: 40.0, left: 21, width: 46 },
  { key: "course", label: "Course", top: 43.5, left: 24, width: 46 },
  { key: "instructor", label: "Instructor", top: 47.8, left: 30, width: 46 },
  { key: "topic", label: "Topic", top: 51.5, left: 21, width: 46 },
  { key: "department", label: "Department", top: 55.6, left: 30, width: 46 },
  { key: "semester", label: "Semester", top: 59.5, left: 25, width: 46 },
  { key: "date", label: "Date", top: 63.4, left: 20, width: 46 },
];

const FIELDS_T4 = [
  { key: "assignmentNo", label: "", top: 28.8, left: 72, width: 20 },
  { key: "name", label: "Name", top: 46.5, left: 37, width: 47 },
  { key: "cms", label: "CMS", top: 50.5, left: 35, width: 47 },
  { key: "course", label: "Course", top: 54, left: 39, width: 47 },
  { key: "instructor", label: "Instructor", top: 57.5, left: 45, width: 47 },
  { key: "topic", label: "Topic", top: 61, left: 37, width: 47 },
  { key: "department", label: "Department", top: 65, left: 45, width: 47 },
  { key: "semester", label: "Semester", top: 68.8, left: 41, width: 47 },
  { key: "date", label: "Date", top: 72.5, left: 35, width: 47 },
];

const FIELD_MAP = { 1: FIELDS_T1, 2: FIELDS_T2, 3: FIELDS_T3, 4: FIELDS_T4 };
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

function A4Page({ templateId, form, onChange, forPrint = false }) {
  const fields = FIELD_MAP[templateId] || FIELD_MAP[1];
  const image = IMAGE_MAP[templateId] || IMAGE_MAP[1];

  // A4 at 96 dpi: 794 × 1123 px
  const W = 794;
  const H = 1123;

  return (
    <div
      style={{
        position: "relative",
        width: `${W}px`,
        height: `${H}px`,
        backgroundImage: `url(${image})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top left",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {fields.map(({ key, label, top, left, width }) => {
        const style = {
          position: "absolute",
          top: `${top}%`,
          left: `${left}%`,
          width: `${width}%`,
          fontSize: "13px",
          fontWeight: "600",
          color: "#0f172a",
          lineHeight: "1.2",
          fontFamily: "Arial, sans-serif",
          whiteSpace: "nowrap",
          overflow: "hidden",
        };

        if (forPrint) {
          // Plain span — no border, no input chrome
          return (
            <div key={key} style={style}>
              <span style={{ display: "block" }}>{form[key] || ""}</span>
            </div>
          );
        }

        // Interactive input
        return (
          <div key={key} style={style}>
            <input
              type="text"
              value={form[key] || ""}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={label}
              aria-label={label}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1.5px dashed rgba(59,130,246,0.45)",
                outline: "none",
                fontSize: "13px",
                fontWeight: "600",
                color: "#0f172a",
                fontFamily: "Arial, sans-serif",
                padding: "0 2px",
                lineHeight: "1.2",
                cursor: "text",
                boxSizing: "border-box",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function GenerateFPContent() {
  const searchParams = useSearchParams();
  const templateId = Number(searchParams.get("template") || "1");
  const printRef = useRef(null);
  const [form, setForm] = useState(defaultForm());

  const upd = useCallback(
    (field, val) => setForm((p) => ({ ...p, [field]: val })),
    [],
  );

  const handlePrint = useCallback(async () => {
    const imgPath = IMAGE_MAP[templateId] || IMAGE_MAP[1];
    let imgSrc = imgPath;
    try {
      const resp = await fetch(imgPath);
      const blob = await resp.blob();
      imgSrc = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch {
      imgSrc = window.location.origin + imgPath;
    }

    const fields = FIELD_MAP[templateId] || FIELD_MAP[1];
    const W = 794,
      H = 1123;

    const fieldDivs = fields
      .map(({ key, top, left, width }) => {
        const value = form[key] || "";
        if (!value) return "";
        return `<div style="
        position:absolute;
        top:${top}%;
        left:${left}%;
        width:${width}%;
        font-size:13px;
        font-weight:600;
        color:#0f172a;
        font-family:Arial,sans-serif;
        line-height:1.2;
        white-space:nowrap;
        overflow:hidden;
      ">${value.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>`;
      })
      .join("");

    // 3. Write the print document
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Assignment Front Page</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    @page { size:A4 portrait; margin:0; }
    html,body { width:${W}px; height:${H}px; overflow:hidden; }
    body { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  </style>
</head>
<body>
  <div style="
    position:relative;
    width:${W}px;
    height:${H}px;
    background-image:url('${imgSrc}');
    background-size:100% 100%;
    background-repeat:no-repeat;
    overflow:hidden;
    font-family:Arial,sans-serif;
  ">
    ${fieldDivs}
  </div>
</body>
</html>`);
    win.document.close();
    win.focus();

    setTimeout(() => {
      win.print();
      win.close();
    }, 900);
  }, [templateId, form]);

  const sidebarFields = () => {
    const base = [
      { key: "assignmentNo", label: "Assignment Number", ph: "1" },
      { key: "name", label: "Student Name", ph: "Name" },
      { key: "cms", label: "CMS ID", ph: "CMS-12345" },
      { key: "course", label: "Course Name", ph: "DSA" },
    ];
    if (templateId === 3 || templateId === 4) {
      base.push({
        key: "instructor",
        label: "Instructor / Teacher",
        ph: "Enter Name",
      });
    }
    base.push(
      { key: "topic", label: "Topic / Title", ph: "Enter Topic" },
      { key: "department", label: "Department", ph: "Computer Science" },
      { key: "semester", label: "Semester", ph: "Semester" },
    );
    if (templateId === 1 || templateId === 2) {
      base.push({
        key: "submitTo",
        label: "Submit To (Teacher)",
        ph: "Enter Name",
      });
    }
    base.push({ key: "date", label: "Submission Date", ph: "" });
    return base;
  };

  const inputCls =
    "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white";

  const PREVIEW_WIDTH = 560; 
  const scale = PREVIEW_WIDTH / 794;

  return (
    <section className="bg-blue-100">
    <div className="flex flex-col lg:flex-row gap-5 min-h-screen p-4 max-w-[1400px] mx-auto">
      <div className="lg:w-72 xl:w-80 shrink-0">
        <div className="card sticky top-20 max-h-[calc(100vh-5.5rem)] flex flex-col">
          <div className="flex items-start justify-between mb-2 shrink-0">
            <div>
              <h2 className="font-bold text-gray-800">Fill Details</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                T{templateId} — {TEMPLATE_NAMES[templateId]}
              </p>
            </div>
            <Link
              href="/front-pages"
              className="text-xs text-blue-500 hover:underline shrink-0 mt-0.5"
            >
              ← Templates
            </Link>
          </div>

          {/* Template switcher */}
          <div className="flex gap-1.5 mb-3 shrink-0">
            {[1, 2, 3, 4].map((id) => (
              <Link
                key={id}
                href={`/generate-fp?template=${id}`}
                className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  templateId === id
                    ? "navbar-bg text-white shadow-sm"
                    : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                T{id}
              </Link>
            ))}
          </div>

          {/* Fields */}
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

          {/* Buttons */}
          <div className="mt-4 space-y-2 pt-3 border-t border-gray-100 shrink-0">
            <button
              onClick={handlePrint}
              className="w-full py-2.5 navbar-bg text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2"
            >
             <IoPrint size={20}/> Print / Save as PDF
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

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-800">
            Live Preview
            <span className="ml-2 text-xs font-normal text-gray-800">
              Click any blank line to type directly on the page
            </span>
          </h2>
          <button
            onClick={handlePrint}
            className="px-4 py-2 navbar-bg text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <FaDownload size={20}/> Download PDF
          </button>
        </div>

        <div className="bg-gray-300 rounded-2xl p-5 flex justify-center overflow-auto">
          <div
            ref={printRef}
            style={{
              width: `${794 * scale}px`,
              height: `${1123 * scale}px`,
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.28)",
              flexShrink: 0,
            }}
          >
              <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: "794px",
                height: "1123px",
              }}
            >
              <A4Page
                templateId={templateId}
                form={form}
                onChange={upd}
                forPrint={false}
              />
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-800 mt-3">
          💡 In the print dialog → <strong>Save as PDF</strong> → Margins:{" "}
          <strong>None</strong> → Scale: <strong>100%</strong>
        </p>
      </div>
    </div>
    </section>
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
