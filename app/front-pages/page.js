"use client";

import ToolHeader from "@/components/layout/ToolHeader";
import Button from "@/components/UI/button";
import Image from "next/image";
import Link from "next/link";

import { FaMouse, FaPencilAlt, FaArrowDown } from "react-icons/fa";

const TEMPLATES = [
  {
    id: "1",
    name: "Academic Template",
    description: "A professional assignment cover page with clean design ",
    preview: "/images/ass-pg-1.png",
  },

  {
    id: "2",
    name: "Modern White",
    description:
      "Balanced professional layout with geometric borders, blue and orange accents.",
    preview: "/images/ass-pg-2.png",
  },

  {
    id: "3",
    name: "Professional Layout",
    description:
      "Clean academic template with teal geometric accents and waves.",
    preview: "/images/ass-pg-3.png",
  },

  {
    id: "4",
    name: "Wave Design",
    description:
      "Minimalist academic cover featuring blue side-wave patterns and simple borders.",
    preview: "/images/ass-pg-4.png",
  },
];

export default function FrontPagesPage() {
  return (
    <section className="bg-blue-100">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <ToolHeader
          heading="Assignment Front Pages"
          desc="Choose a template and generate a professional assignment cover page
            instantly. Fill in your details and download as PDF.s"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {TEMPLATES.map((t) => (
            <div
              key={t.id}
              className="card p-0 overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border-blue-200 border"
            >
              <div className="relative h-40 sm:h-48 w-[73%] justify-self-center bg-gray-100 border-b overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  {/* Placeholder when image missing */}
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl mb-2">📄</div>
                    <span className="text-xs text-gray-400">
                      Template {t.id}
                    </span>
                  </div>
                </div>
                <Image
                  src={t.preview}
                  alt={t.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  height={100}
                  width={100}
                />
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-center text-sm sm:text-base">
                  {t.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {t.description}
                </p>
                <Link
                  href={`/generate-fp?template=${t.id}`}
                  className="text-center mx-auto"
                >
                  <Button href="Template" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="font-semibold text-gray-800 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                step: "1",
                icon: FaMouse,
                title: "Choose Template",
                desc: "Pick one of the 4 available front page designs",
              },

              {
                step: "2",
                icon: FaPencilAlt,
                title: "Fill Your Details",
                desc: "Enter your name, roll no., subject, and other info",
              },

              {
                step: "3",
                icon: FaArrowDown,
                title: "Download PDF",
                desc: "Generate and download your front page instantly",
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full navbar-bg text-white flex items-center justify-center text-xl font-bold shadow-md">
                  {step}
                </div>

                <div className="text-2xl text-[#00479f]">
                  <Icon aria-hidden="true" focusable="false" />
                </div>
                <h3 className="font-medium text-gray-700">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
