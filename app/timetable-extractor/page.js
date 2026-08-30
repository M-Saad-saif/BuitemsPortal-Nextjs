"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ToolHeader from "@/components/layout/ToolHeader";
import Spinner from "@/components/UI/Spinner";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  FileUp,
  GraduationCap,
  Info,
  MapPin,
  Printer,
  RotateCcw,
  Search,
  Table2,
  TriangleAlert,
  Upload,
  User,
  X,
  Building2,
} from "lucide-react";
import { toast } from "react-hot-toast";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const LOADING_STEPS = [
  "Scanning your PDF document...",
  "Searching for your class schedule...",
  "Building your personalized timetable...",
];

const SAMPLE_CLASSES = ["CS5B", "EE5", "IT7", "SE4", "IR4A"];

function normalizeClassName(input) {
  return input.trim().toUpperCase().replace(/\s+/g, "").replace(/-/g, "");
}

function formatTimeSlot(slot) {
  if (!slot || slot === "TBA") return "TBA";
  return slot.replace(/\s+/g, " ").trim();
}

function getTimeSlotColor(slot) {
  const hour = parseInt(slot.split(":")[0]);
  if (hour < 10) return "bg-blue-50 border-blue-200";
  if (hour < 13) return "bg-emerald-50 border-emerald-200";
  if (hour < 16) return "bg-amber-50 border-amber-200";
  return "bg-purple-50 border-purple-200";
}

export default function TimetableExtractorPage() {
  const [className, setClassName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState("");
  const [view, setView] = useState("table");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const tableRef = useRef(null);
  const weeklyRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleClassNameChange = (e) => {
    const value = e.target.value;
    setClassName(value);
    setError("");
  };

  const validatePdf = (file) => {
    if (file.type !== "application/pdf") {
      setPdfError("Please upload a PDF file only.");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setPdfError("File size exceeds 10MB limit.");
      return false;
    }
    setPdfError("");
    return true;
  };

  const handleFileSelect = (file) => {
    if (validatePdf(file)) {
      setPdfFile(file);
      toast.success(`"${file.name}" uploaded successfully!`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileSelect(file);
  };

  const removePdf = () => {
    setPdfFile(null);
    setPdfError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const simulateLoading = () => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < LOADING_STEPS.length - 1) {
        step++;
        setLoadingStep(step);
      } else {
        clearInterval(interval);
      }
    }, 1500);
    return interval;
  };

  const handleExtract = async () => {
    const normalizedClass = normalizeClassName(className);
    if (!normalizedClass) {
      setError("Please enter your class/section name.");
      toast.error("Class name is required");
      return;
    }

    if (!pdfFile) {
      setError("Please upload a timetable PDF.");
      toast.error("PDF file is required");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);
    setLoadingStep(0);

    const loadingInterval = simulateLoading();

    try {
      const formData = new FormData();
      formData.append("pdf", pdfFile);
      formData.append("className", normalizedClass);

      const response = await fetch("/api/timetable-extractor", {
        method: "POST",
        body: formData,
      });

      clearInterval(loadingInterval);
      setLoadingStep(LOADING_STEPS.length - 1);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to extract timetable");
      }

      setResults({
        className: data.className,
        entries: data.entries,
        totalEntries: data.totalEntries,
      });
      toast.success(`Found ${data.totalEntries} classes for ${data.className}`);
    } catch (err) {
      clearInterval(loadingInterval);
      setError(err.message);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setLoadingStep(0);
    }
  };

  const handleReset = () => {
    setClassName("");
    setPdfFile(null);
    setPdfError("");
    setResults(null);
    setError("");
    setView("table");
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.success("Ready for a new search!");
  };

  const handleDownloadPdf = async () => {
    if (!results || (!tableRef.current && !weeklyRef.current)) return;

    try {
      const { jsPDF } = await import("jspdf");
      const html2canvas = (await import("html2canvas")).default;

      const ref = view === "table" ? tableRef.current : weeklyRef.current;
      if (!ref) return;

      const canvas = await html2canvas(ref, {
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
      const margin = 15;
      const headerHeight = 30;
      const maxW = pageW - margin * 2;
      const maxH = pageH - margin * 2 - headerHeight;

      const ratio = Math.min(maxW / (imgW / 2), maxH / (imgH / 2));
      const finalW = (imgW / 2) * ratio;
      const finalH = (imgH / 2) * ratio;
      const offsetX = margin + (maxW - finalW) / 2;

      const addHeader = (pdfDoc) => {
        pdfDoc.setFontSize(20);
        pdfDoc.setTextColor(26, 60, 110);
        pdfDoc.text("BUITEMS Portal", pageW / 2, margin + 5, {
          align: "center",
        });

        pdfDoc.setFontSize(16);
        pdfDoc.setTextColor(0, 0, 0);
        pdfDoc.text(
          `Timetable \u2014 ${results.className}`,
          pageW / 2,
          margin + 15,
          {
            align: "center",
          },
        );

        pdfDoc.setFontSize(10);
        pdfDoc.setTextColor(100, 100, 100);
        pdfDoc.text(
          `Generated on ${new Date().toLocaleDateString()}`,
          pageW / 2,
          margin + 22,
          { align: "center" },
        );
      };

      addHeader(pdf);

      if (finalH <= maxH) {
        pdf.addImage(
          imgData,
          "JPEG",
          offsetX,
          margin + headerHeight,
          finalW,
          finalH,
        );
      } else {
        const sourceSliceHeightPx = (maxH / finalH) * imgH;
        let currentYPx = 0;
        let isFirstPage = true;

        while (currentYPx < imgH) {
          if (!isFirstPage) {
            pdf.addPage();
            addHeader(pdf);
          }

          const sliceHeight = Math.min(sourceSliceHeightPx, imgH - currentYPx);
          const sliceCanvas = document.createElement("canvas");
          sliceCanvas.width = imgW;
          sliceCanvas.height = sliceHeight;
          const ctx = sliceCanvas.getContext("2d");
          ctx.drawImage(
            canvas,
            0,
            currentYPx,
            imgW,
            sliceHeight,
            0,
            0,
            imgW,
            sliceHeight,
          );

          const sliceData = sliceCanvas.toDataURL("image/jpeg", 1.0);
          const sliceFinalH = (sliceHeight / imgH) * finalH;
          pdf.addImage(
            sliceData,
            "JPEG",
            offsetX,
            margin + headerHeight,
            finalW,
            sliceFinalH,
          );

          currentYPx += sliceHeight;
          isFirstPage = false;
        }
      }

      pdf.save(`BUITEMS_Timetable_${results.className}.pdf`);

      toast.success("Timetable downloaded successfully!");
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("Could not generate PDF. Please try again.");
    }
  };

  if (!results) {
    return (
      <div className="min-h-screen pb-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <ToolHeader
          heading="Timetable Extractor"
          desc="Upload the complete faculty timetable PDF and extract your class schedule instantly. Enter your class/section and upload the PDF to get started."
        />

        <main className="max-w-6xl mx-auto px-4 -mt-32 space-y-6 relative z-10">
          {/* Main Card */}
          <section className="bg-white rounded-3xl shadow-2xl shadow-blue-900/20 p-8 sm:p-10 border border-blue-100/50">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left - Input Area */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="text-[#1e4d8c]" size={20} />
                    <label
                      htmlFor="class-name"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Your Class / Section
                    </label>
                    <span className="text-xs text-red-500">*</span>
                  </div>
                  <div className="relative">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      id="class-name"
                      type="text"
                      value={className}
                      onChange={handleClassNameChange}
                      placeholder="e.g., CS5B, DS3A, IT7"
                      className="w-full pl-12 pr-4 py-4 border-[0.2px] border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-[#1e4d8c] focus:border-[#1e4d8c] transition-all duration-200"
                      disabled={loading}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Info size={12} /> Examples:
                    </span>
                    {SAMPLE_CLASSES.map((sample) => (
                      <button
                        key={sample}
                        onClick={() => setClassName(sample)}
                        className="text-xs px-3 py-1 bg-gray-100 hover:bg-[#1e4d8c] rounded-full transition-colors text-gray-600 hover:text-white"
                        disabled={loading}
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileUp className="text-[#1e4d8c]" size={18} />
                    <label className="block text-sm font-semibold text-gray-700">
                      Upload Faculty Timetable
                    </label>
                    <span className="text-xs text-red-500">*</span>
                  </div>
                  <div
                    className={`relative border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-teal-400 bg-teal-50/50 scale-[1.01]"
                        : pdfFile
                          ? "border-emerald-400 bg-emerald-50/50"
                          : "border-gray-300 hover:border-teal-300 hover:bg-gray-50/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      id="pdf-upload"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileInputChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={loading}
                    />
                    {pdfFile ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                          <div className="p-3 bg-red-50 rounded-xl">
                            <FileText className="text-red-500" size={32} />
                          </div>
                          <div className="text-left flex-1">
                            <p className="font-medium text-gray-800 truncate max-w-[200px]">
                              {pdfFile.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {(pdfFile.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <button
                            onClick={removePdf}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            aria-label="Remove file"
                          >
                            <X size={20} />
                          </button>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle2
                            className="text-emerald-500"
                            size={16}
                          />
                          <p className="text-sm text-emerald-600 font-medium">
                            PDF ready for extraction
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-20 h-20 mx-auto  bg-[#1e4d8c] rounded-2xl flex items-center justify-center">
                          <Upload className="text-[white]" size={36} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">
                            Drag & drop your PDF here
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            or click to browse files
                          </p>
                        </div>
                        <div className="flex justify-center gap-4 text-xs text-gray-400">
                          <span> PDF only</span>
                          <span>.</span>
                          <span> Max 10MB</span>
                          <span>.</span>
                          <span> Complete timetable</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {pdfError && (
                    <p className="text-sm text-red-500 mt-2 flex items-center gap-2">
                      <TriangleAlert size={14} /> {pdfError}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-xl flex items-start gap-3 animate-shake">
                    <TriangleAlert
                      className="text-red-500 mt-0.5 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <p className="font-semibold text-red-700">Oops!</p>
                      <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleExtract}
                  disabled={
                    loading || !normalizeClassName(className) || !pdfFile
                  }
                  className="flex-1 py-3 navbar-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md w-full flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Spinner width={28} className="text-white" />
                      <span className="animate-pulse">
                        {LOADING_STEPS[loadingStep]}
                      </span>
                    </>
                  ) : (
                    <>
                      Extract My Timetable
                      <ArrowRight size={18} className="inline-block" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-900/10 p-6 sm:p-8 text-center border border-blue-100/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-2xl">
                <div className="w-14 h-14 bg-[#1e4d8c] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#1e4d8c]/25">
                  <FileText className="text-white" size={28} />
                </div>
                <h4 className="font-semibold text-gray-800">1. Upload PDF</h4>
                <p className="text-sm text-gray-500 mt-1">
                  The complete faculty timetable
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-2xl">
                <div className="w-14 h-14 bg-[#1e4d8c] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#1e4d8c]/25">
                  <Search className="text-white" size={28} />
                </div>
                <h4 className="font-semibold text-gray-800">2. Enter Class</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Your section (e.g., CS5B)
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-2xl">
                <div className="w-14 h-14 bg-[#1e4d8c] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#1e4d8c]/25">
                  <CalendarDays className="text-white" size={28} />
                </div>
                <h4 className="font-semibold text-gray-800">3. Get Schedule</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Your personalized timetable
                </p>
              </div>
            </div>
          </section>
        </main>
        <p className="text-red-700 text-[10px] text-center mt-1 ">
          If you found anything wrong ... Contact
        </p>
      </div>
    );
  }

  const timeToMinutes = (timeStr) => {
    if (!timeStr || timeStr === "TBA") return 9999;
    const startPart = timeStr.split(/\s*[-\u2013]\s*/)[0].trim();
    const match = startPart.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return 9999;
    let [, h, m, period] = match;
    h = parseInt(h, 10);
    m = parseInt(m, 10);
    if (period.toUpperCase() === "AM") {
      if (h === 12) h = 0;
    } else {
      if (h !== 12) h += 12;
    }
    return h * 60 + m;
  };

  const groupedByDay = results.entries.reduce((acc, entry) => {
    const day = entry.day;
    if (!acc[day]) acc[day] = [];
    acc[day].push(entry);
    return acc;
  }, {});

  Object.keys(groupedByDay).forEach((day) => {
    groupedByDay[day].sort(
      (a, b) => timeToMinutes(a.time) - timeToMinutes(b.time),
    );
  });

  const timeSlots = [
    ...new Set(results.entries.map((e) => e.time).filter((t) => t !== "TBA")),
  ].sort((a, b) => timeToMinutes(a) - timeToMinutes(b));

  const totalClasses = results.totalEntries;
  const hasWeekend = Object.keys(groupedByDay).some(
    (day) => day === "Saturday" || day === "Sunday",
  );

  return (
    <div className="min-h-screen pb-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <ToolHeader
        heading="Timetable Extractor"
        desc={`${totalClasses} classes extracted • ${Object.keys(groupedByDay).length} days • ${timeSlots.length} time slots`}
      />

      <main className="max-w-6xl mx-auto px-4 -mt-32 space-y-6 relative z-10">
        {/* Results Card */}
        <section className="bg-white rounded-3xl shadow-2xl shadow-blue-900/20 p-6 sm:p-8 border border-blue-100/50">
          {/* Header with stats and actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-100 rounded-2xl">
                <CheckCircle2 className="text-teal-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Extracted Schedule</p>
                <p className="font-bold text-gray-800 text-lg">
                  {results.className}.{" "}
                  <span className="text-teal-600">{totalClasses} classes</span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setView("table")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    view === "table"
                      ? "bg-white text-teal-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Table2 className="inline mr-1" size={14} /> Table
                </button>
                <button
                  onClick={() => setView("weekly")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    view === "weekly"
                      ? "bg-white text-teal-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <CalendarDays className="inline mr-1" size={14} /> Weekly
                </button>
              </div>
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
              >
                <Download size={16} /> PDF
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-sm font-medium border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <RotateCcw size={16} /> New
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3 bg-blue-50 rounded-xl text-center">
              <p className="text-xs text-gray-500">Total Classes</p>
              <p className="font-bold text-blue-600 text-lg">{totalClasses}</p>
            </div>
            <div className="p-3 bg-teal-50 rounded-xl text-center">
              <p className="text-xs text-gray-500">Days</p>
              <p className="font-bold text-teal-600 text-lg">
                {Object.keys(groupedByDay).length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl text-center">
              <p className="text-xs text-gray-500">Time Slots</p>
              <p className="font-bold text-purple-600 text-lg">
                {timeSlots.length}
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl text-center">
              <p className="text-xs text-gray-500">Instructors</p>
              <p className="font-bold text-amber-600 text-lg">
                {
                  new Set(
                    results.entries
                      .map((e) => e.instructor)
                      .filter((i) => i !== "â€”"),
                  ).size
                }
              </p>
            </div>
          </div>

          {/* Table View */}
          {view === "table" && (
            <div
              ref={tableRef}
              className="overflow-x-auto rounded-2xl border border-gray-100"
            >
              <table className="w-full min-w-[700px] text-sm border-separate border-spacing-0">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                    <th className="px-4 py-4 text-left w-32 font-semibold text-xs uppercase tracking-wider border-b border-r border-teal-500/60 first:rounded-tl-xl">
                      Day
                    </th>
                    <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider border-b border-r border-teal-500/60">
                      <Clock3 className="inline mr-1" size={12} /> Time
                    </th>
                    <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider border-b border-r border-teal-500/60">
                      <GraduationCap className="inline mr-1" size={12} /> Course
                    </th>
                    <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider border-b border-r border-teal-500/60">
                      <User className="inline mr-1" size={12} /> Instructor
                    </th>
                    <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider border-b border-teal-500/60 last:rounded-tr-xl">
                      <Building2 className="inline mr-1" size={12} /> Room
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DAYS.map((day, dayIndex) => {
                    const dayEntries = groupedByDay[day] || [];
                    if (dayEntries.length === 0) return null;
                    return dayEntries.map((entry, idx) => (
                      <tr
                        key={`${day}-${idx}`}
                        className={`${dayIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-teal-50/50 transition-colors`}
                      >
                        <td className="px-4 py-3 border-r border-b border-gray-200 font-semibold text-gray-700 align-middle">
                          {idx === 0 && (
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                              {day}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 border-r border-b border-gray-200">
                          <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded-full text-gray-600 whitespace-nowrap">
                            {formatTimeSlot(entry.time)}
                          </span>
                        </td>
                        <td className="px-4 py-3 border-r border-b border-gray-200">
                          <span className="font-medium text-gray-800">
                            {entry.course}
                          </span>
                        </td>
                        <td className="px-4 py-3 border-r border-b border-gray-200">
                          <span className="text-gray-600">
                            {entry.instructor}
                          </span>
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200">
                          <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded-lg text-xs">
                            {entry.room}
                          </span>
                        </td>
                      </tr>
                    ));
                  })}
                  {Object.keys(groupedByDay).length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-16 text-center text-gray-400"
                      >
                        <CalendarDays className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                        No timetable entries found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Weekly View */}
          {view === "weekly" && (
            <div
              ref={weeklyRef}
              className="overflow-x-auto rounded-2xl border border-gray-100"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-sm border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                      <th className="px-3 py-4 text-left w-28 font-semibold text-xs uppercase tracking-wider border-b border-r border-teal-500/60 first:rounded-tl-xl">
                        <Clock3 className="inline mr-1" size={12} /> Time
                      </th>
                      {DAYS.map((day) => (
                        <th
                          key={day}
                          className="px-2 py-4 text-center font-semibold text-xs uppercase tracking-wider min-w-[140px] border-b border-r border-teal-500/60 last:border-r-0"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.length > 0 ? (
                      timeSlots.map((slot, slotIndex) => (
                        <tr
                          key={slot}
                          className={`${slotIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-teal-50/30 transition-colors`}
                        >
                          <td className="px-3 py-3 border-r border-b border-gray-200 font-mono text-xs text-gray-500 whitespace-nowrap">
                            <span className="bg-gray-100 px-2 py-1 rounded-full">
                              {formatTimeSlot(slot)}
                            </span>
                          </td>
                          {DAYS.map((day) => {
                            const entry = results.entries.find(
                              (e) => e.day === day && e.time === slot,
                            );
                            return (
                              <td
                                key={day}
                                className="px-2 py-2 border-l border-b border-gray-200 align-top"
                              >
                                {entry ? (
                                  <div
                                    className={`p-3 ${getTimeSlotColor(slot)} border rounded-xl min-h-[70px] transition-all hover:scale-[1.02] hover:shadow-md`}
                                  >
                                    <div className="font-semibold text-teal-800 text-xs mb-1">
                                      {entry.course}
                                    </div>
                                    {entry.instructor !== "â€”" && (
                                      <div className="text-xs text-gray-600 flex items-center gap-1">
                                        <User size={10} /> {entry.instructor}
                                      </div>
                                    )}
                                    {entry.room !== "â€”" && (
                                      <div className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                                        <MapPin size={10} /> {entry.room}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="h-[70px] border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50" />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-16 text-center text-gray-400"
                        >
                          <CalendarDays className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                          No time slots found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {view === "weekly" && timeSlots.length === 0 && (
            <div className="text-center py-12">
              <CalendarDays className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="font-semibold text-gray-700 mb-2">
                Weekly View Unavailable
              </h3>
              <p className="text-gray-500 text-sm">
                The extracted data doesn't contain structured time slots for the
                weekly calendar view. Please use the Table View instead.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span> {totalClasses} classes found</span>
            <span> Updated {new Date().toLocaleDateString()}</span>
            {hasWeekend && <span> Includes weekend classes</span>}
          </div>
        </section>
      </main>
    </div>
  );
}
