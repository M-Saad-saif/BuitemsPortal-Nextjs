"use client";
// app/front-pages/page.js — Converted from src/components/FrontPages.js
// Shows available front page templates to select before generating

import Link from "next/link";

const TEMPLATES = [
  {
    id: "1",
    name: "Classic Blue",
    description: "Traditional BUITEMS format with blue header and official logo placement",
    preview: "/images/ass-pg-1.png",
    popular: true,
  },
  {
    id: "2",
    name: "Modern White",
    description: "Clean, minimal design with professional typography",
    preview: "/images/ass-pg-2.png",
    popular: false,
  },
  {
    id: "3",
    name: "Formal Green",
    description: "Formal academic style with green accent borders",
    preview: "/images/ass-pg-3.png",
    popular: false,
  },
  {
    id: "4",
    name: "Bold Dark",
    description: "High-contrast design with bold heading and clean layout",
    preview: "/images/ass-pg-4.png",
    popular: false,
  },
];

export default function FrontPagesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Assignment Front Pages</h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Choose a template and generate a professional assignment cover page
          instantly. Fill in your details and download as PDF.
        </p>
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {TEMPLATES.map((t) => (
          <div key={t.id} className="card p-0 overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            {/* Preview image */}
            <div className="relative h-48 bg-gray-100 border-b overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                {/* Placeholder when image missing */}
                <div className="text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <span className="text-xs text-gray-400">Template {t.id}</span>
                </div>
              </div>
              {/* Real image if available */}
              <img
                src={t.preview}
                alt={t.name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              {t.popular && (
                <span className="absolute top-2 right-2 bg-amber-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{t.name}</h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{t.description}</p>
              <Link
                href={`/generate-fp?template=${t.id}`}
                className="block w-full text-center py-2 navbar-bg text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Use Template
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="card">
        <h2 className="font-semibold text-gray-800 mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { step: "1", icon: "🖱️", title: "Choose Template", desc: "Pick one of the 4 available front page designs" },
            { step: "2", icon: "✏️", title: "Fill Your Details", desc: "Enter your name, roll no., subject, and other info" },
            { step: "3", icon: "⬇️", title: "Download PDF", desc: "Generate and download your front page instantly" },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full navbar-bg text-white flex items-center justify-center text-xl font-bold shadow-md">
                {step}
              </div>
              <div className="text-2xl">{icon}</div>
              <h3 className="font-medium text-gray-700">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
