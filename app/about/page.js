import ToolHeader from "@/components/layout/ToolHeader";
import Image from "next/image";
import Link from "next/link";
import AboutTechCard from "@/components/UI/AboutTechCard";
import Button from "@/components/UI/button";

import { LuCodeXml } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { GiStarFormation } from "react-icons/gi";

export const metadata = {
  title: "About | BUITEMS Portal",
  description:
    "About the BUITEMS Portal — built by Saad Saif, a CS student at BUITEMS.",
};

const TECH_STACK = [
  {
    name: "Next.js",
    desc: "React framework with SSR & App Router",
    color: "bg-gray-900 text-white",
  },
  {
    name: "React",
    desc: "UI component library",
    color: "bg-cyan-500 text-white",
  },
  {
    name: "Node.js",
    desc: "JavaScript runtime for backend",
    color: "bg-green-600 text-white",
  },
  {
    name: "MongoDB",
    desc: "NoSQL database for user data",
    color: "bg-green-500 text-white",
  },
  {
    name: "JWT",
    desc: "Token-based authentication",
    color: "bg-purple-600 text-white",
  },
  {
    name: "Cloudinary",
    desc: "Image storage & CDN",
    color: "bg-blue-500 text-white",
  },
  {
    name: "Tailwind CSS",
    desc: "Utility-first CSS framework",
    color: "bg-teal-500 text-white",
  },
  {
    name: "Vercel",
    desc: "Deployment & hosting platform",
    color: "bg-black text-white",
  },
];

export default function AboutPage() {
  return (
    <section className="bg-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-12 ">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-2xl navbar-bg flex items-center justify-center text-4xl mx-auto mb-5 shadow-xl">
            <Image
              src="/images/buitems-logo.png"
              alt="logo"
              width={100}
              height={100}
            />
          </div>
          <ToolHeader
            heading="About BUITEMS Portal"
            desc="  A student-focused platform providing essential academic tools — built
          by a BUITEMS student, for BUITEMS students."
            className="text-[35px]"
          />
        </div>

        {/* Mission */}
        <div className="card mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <h2 className="font-bold text-xl text-gray-800 mb-3 flex items-center gap-2">
            GOAL
          </h2>
          <p className="text-gray-600 leading-relaxed">
            To simplify the academic life of students by providing free, fast,
            and reliable tools in one place — eliminating the need to use
            multiple websites or apps for common tasks like calculating GPA,
            generating assignment cover pages, or tracking semester records.
          </p>
        </div>

        <AboutTechCard />

        {/* Tech Stack */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TECH_STACK.map(({ name, desc, color }) => (
              <div
                key={name}
                className="card p-3 text-center hover:shadow-md transition-shadow"
              >
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${color}`}
                >
                  {name}
                </span>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2 ">
            <LuCodeXml size={30} /> About the Developer
          </h2>
          <div className="flex items-start gap-5">
            <div className=" rounded-2xl navbar-bg flex items-center justify-center text-2xl font-bold text-white shrink-0">
              <Image
                src="/images/myImage.png"
                alt="SS"
                width={100}
                height={100}
                className="rounded-2xl"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Muhammad Saad Saif
              </h3>
              <p className="text-blue-600 font-medium text-sm mb-3">
                Computer Science Student | BUITEMS · Full Stack Developer
              </p>
              <p className="text-gray-600 leading-relaxed text-sm mb-4">
                Built this platform to solve real problems faced by students.
                This project covers the full stack: authentication, REST APIs,
                database design, cloud storage, and a feature-rich frontend.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/M-Saad-saif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 navbar-bg text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <FaGithub />
                  GitHub Profile
                </a>
                <a
                  href="https://saadsaif.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 navbar-bg text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <LuCodeXml size={25} /> Portfolio
                </a>

                <a
                  href="https://github.com/M-Saad-saif/BuitemsPortal-Nextjs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View Source Code
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contribute */}
        <div className="card bg-amber-50 border border-amber-200 text-center">
          <h2 className="font-bold text-gray-800 mb-2 flex items-center gap-2 justify-center">
            <GiStarFormation size={25} color="#fbbf24" /> Open Source
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            This project is open source. Found a bug or have a feature idea?
            Contributions are welcome on GitHub!
          </p>
          <Link href="/portal">
            <Button
              href="Get Started — It's Free"
              className="justify-self-center"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
