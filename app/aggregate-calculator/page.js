"use client";

import ToolHeader from "@/components/layout/ToolHeader";
import { useState } from "react";

const FORMULAE = [
  {
    id: "buitems_eng",
    label: "Formula for aggregate",
    weights: { matric: 0.1, inter: 0.4, entry: 0.5 },
    entryTest: "NTS",
    maxTotal: 1100,
    interTotal: 1100,
    matricTotal: 1100,
  },
];

export default function AggregateCalculatorPage() {
  const [formula, setFormula] = useState(FORMULAE[0]);
  const [values, setValues] = useState({
    matricObtained: "",
    matricTotal: "1100",
    interObtained: "",
    interTotal: "1100",
    entryObtained: "",
    entryTotal: "100",
  });
  const [result, setResult] = useState(null);
  const [error, setErrors] = useState({});

  const update = (field, val) =>
    setValues((prev) => ({ ...prev, [field]: val }));

  const validate = () => {
    const mo = parseFloat(values.matricObtained);
    const mt = parseFloat(values.matricTotal) || 1100;
    const io = parseFloat(values.interObtained);
    const it = parseFloat(values.interTotal) || 1100;
    const eo = parseFloat(values.entryObtained);
    const et = parseFloat(values.entryTotal) || 100;
    const nextErrors = {};

    if (!isNaN(mo) && mo > mt) {
      nextErrors.matricObtained = `Matric obtained marks cannot be greater than ${mt}.`;
    }
    if (!isNaN(io) && io > it) {
      nextErrors.interObtained = `FSc obtained marks cannot be greater than ${it}.`;
    }
    if (!isNaN(eo) && eo > et) {
      nextErrors.entryObtained = `${formula.entryTest} obtained score cannot be greater than ${et}.`;
    }

    setErrors(nextErrors);
    return {
      mo,
      mt,
      io,
      it,
      eo,
      et,
      isValid: Object.keys(nextErrors).length === 0,
    };
  };

  const calculate = () => {
    const { mo, mt, io, it, eo, et, isValid } = validate();

    if ([mo, mt, io, it, eo, et].some(isNaN)) {
      return;
    }

    if (!isValid) {
      return;
    }

    const matricPct = (mo / mt) * 100;
    const interPct = (io / it) * 100;
    const entryPct = (eo / et) * 100;

    const { weights } = formula;
    const aggregate = (
      matricPct * weights.matric +
      interPct * weights.inter +
      entryPct * weights.entry
    ).toFixed(2);

    setResult({
      aggregate,
      matricPct: matricPct.toFixed(2),
      interPct: interPct.toFixed(2),
      entryPct: entryPct.toFixed(2),
      matricWeighted: (matricPct * weights.matric).toFixed(2),
      interWeighted: (interPct * weights.inter).toFixed(2),
      entryWeighted: (entryPct * weights.entry).toFixed(2),
    });
  };

  const reset = () => {
    setValues({
      matricObtained: "",
      matricTotal: "1100",
      interObtained: "",
      interTotal: "1100",
      entryObtained: "",
      entryTotal: "100",
    });
    setResult(null);
    setErrors({});
  };

  const getColor = (agg) => {
    const a = parseFloat(agg);
    if (a >= 80) return "text-green-600";
    if (a >= 70) return "text-blue-600";
    if (a >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getLabel = (agg) => {
    const number = parseFloat(agg);
    if (number >= 80) return "Brilliant";
    if (number >= 60) return "Good";
    return "Give another try";
  };

  return (
    <section className="bg-blue-100">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <ToolHeader
          heading="Aggregate Calculator"
          desc="Calculate your BUITEMS admission aggregate"
        />

        {/* Formula Selector */}
        <div className="card mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Program Formula
          </label>
          <div className="grid grid-cols-1 gap-2">
            {FORMULAE.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormula(f)}
                className={`text-left px-4 py-3 rounded-lg border-2 text-sm transition-colors ${
                  formula.id === f.id
                    ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <span className="font-medium">{f.label}</span>
                <span className="ml-2 text-xs opacity-70">
                  (Matric {f.weights.matric * 100}% + FSc{" "}
                  {f.weights.inter * 100}% + {f.entryTest}{" "}
                  {f.weights.entry * 100}%)
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="card mb-6 space-y-5">
          {/* Matric */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Matric Marks ({formula.weights.matric * 100}% weightage)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Obtained Marks
                </label>
                <input
                  type="number"
                  value={values.matricObtained}
                  onChange={(e) => update("matricObtained", e.target.value)}
                  placeholder="e.g. 980"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Total Marks
                </label>
                <input
                  type="number"
                  value={values.matricTotal}
                  onChange={(e) => update("matricTotal", e.target.value)}
                  placeholder="1100"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {error.matricObtained && (
                <p className="mt-1 text-xs text-red-600">
                  {error.matricObtained}
                </p>
              )}
            </div>
          </div>

          {/* FSc / Intermediate */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              FSc / Intermediate Marks ({formula.weights.inter * 100}%
              weightage)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Obtained Marks
                </label>
                <input
                  type="number"
                  value={values.interObtained}
                  onChange={(e) => update("interObtained", e.target.value)}
                  placeholder="e.g. 940"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Total Marks
                </label>
                <input
                  type="number"
                  value={values.interTotal}
                  onChange={(e) => update("interTotal", e.target.value)}
                  placeholder="1100"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {error.interObtained && (
                <p className="mt-1 text-xs text-red-600">
                  {error.interObtained}
                </p>
              )}
            </div>
          </div>

          {/* Entry Test */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {formula.entryTest} Score ({formula.weights.entry * 100}%
              weightage)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Obtained Score
                </label>
                <input
                  type="number"
                  value={values.entryObtained}
                  onChange={(e) => update("entryObtained", e.target.value)}
                  placeholder="e.g. 72"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Total Score
                </label>
                <input
                  type="number"
                  value={values.entryTotal}
                  onChange={(e) => update("entryTotal", e.target.value)}
                  placeholder="100"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {error.entryObtained && (
                <p className="mt-1 text-xs text-red-600">
                  {error.entryObtained}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={calculate}
            className="flex-1 py-3 navbar-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md"
          >
            Calculate Aggregate
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 border border-gray-300 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="card fade-in">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">
                Your Aggregate
              </p>
              <p className={`text-6xl font-bold ${getColor(result.aggregate)}`}>
                {result.aggregate}%
              </p>
              <p>{getLabel(result.aggregate)}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                {
                  label: "Matric",
                  pct: result.matricPct,
                  weighted: result.matricWeighted,
                  w: formula.weights.matric * 100,
                },
                {
                  label: "FSc",
                  pct: result.interPct,
                  weighted: result.interWeighted,
                  w: formula.weights.inter * 100,
                },
                {
                  label: formula.entryTest,
                  pct: result.entryPct,
                  weighted: result.entryWeighted,
                  w: formula.weights.entry * 100,
                },
              ].map((row) => (
                <div key={row.label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">
                    {row.label} ({row.w}%)
                  </p>
                  <p className="font-bold text-gray-800">{row.pct}%</p>
                  <p className="text-xs text-blue-600">→ {row.weighted}%</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
