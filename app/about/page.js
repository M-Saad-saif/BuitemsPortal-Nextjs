import ToolHeader from "@/components/layout/ToolHeader";
import Image from "next/image";
import Link from "next/link";
import './about.css'

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

const FEATURES = [
  {
    icon: "🔐",
    title: "Secure Student Portal",
    desc: "JWT authentication, profile management, and personal academic records storage.",
  },
  {
    icon: "🧮",
    title: "GPA Calculator",
    desc: "Calculate semester GPA using the 4.0 grading scale with subject-level breakdown.",
  },
  {
    icon: "📊",
    title: "CGPA Calculator",
    desc: "Track cumulative GPA across multiple semesters.",
  },
  {
    icon: "📐",
    title: "Aggregate Calculator",
    desc: "Calculate admission aggregate using Matric + FSc + Entry Test formula.",
  },
  {
    icon: "📄",
    title: "Front Page Generator",
    desc: "4 professional assignment front page templates with instant PDF export.",
  },
  {
    icon: "🗓️",
    title: "Timetable",
    desc: "Interactive weekly class schedule that you can customise.",
  },
  {
    icon: "🏛️",
    title: "Faculties & Departments",
    desc: "Complete listing of all BUITEMS faculties, departments, and programs.",
  },
  {
    icon: "🤖",
    title: "AI Study Assistant",
    desc: "Integrated AI chatbot to answer academic queries.",
  },
];

export default function AboutPage() {
  return (
    <section className="bg-blue-100">
      <div className="max-w-5xl mx-auto px-4 py-12 ">
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
            🎯 Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            To simplify the academic life of BUITEMS students by providing free,
            fast, and reliable tools in one place — eliminating the need to use
            multiple websites or apps for common tasks like calculating GPA,
            generating assignment cover pages, or tracking semester records.
          </p>
        </div>

         <div className="About-container">
        <header className="header-design">
          <div className="footer-wave"></div>
        </header>
        <div className="pset">
          <div className="container">
            <div className="row listar-feature-items">
              <div
                className="col-xs-12 col-sm-6 col-md-4 listar-feature-item-wrapper listar-feature-with-image listar-height-changed"
                data-aos="fade-zoom-in"
                data-aos-group="features"
                data-line-height="25.2px"
              >
                <div className="listar-feature-item listar-feature-has-link">
                  <div className="listar-feature-item-inner">
                    <div className="listar-feature-right-border"></div>

                    <div className="listar-feature-block-content-wrapper">
                      <div className="listar-feature-icon-wrapper">
                        <div className="listar-feature-icon-inner">
                          <div>
                            <img
                              alt="Businesses"
                              className="listar-image-icon"
                              src="https://cdn-icons-png.flaticon.com/128/2166/2166978.png"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="listar-feature-content-wrapper"
                        style={{ paddingTtop: "0px" }}
                      >
                        <div className="listar-feature-item-title listar-feature-counter-added">
                          <span>
                            <span>01</span>
                            Student Portal{" "}
                          </span>
                        </div>

                        <div className="listar-feature-item-excerpt">
                          “Secure student portal with profile management,
                          authentication send protected access.”
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listar-feature-fix-bottom-padding listar-fix-feature-arrow-button-height"></div>
              </div>

              <div
                className="col-xs-12 col-sm-6 col-md-4 listar-feature-item-wrapper listar-feature-with-image listar-height-changed"
                data-aos="fade-zoom-in"
                data-aos-group="features"
                data-line-height="25.2px"
              >
                <div className="listar-feature-item listar-feature-has-link">
                  <div className="listar-feature-item-inner">
                    <div className="listar-feature-right-border"></div>

                    <div className="listar-feature-block-content-wrapper">
                      <div className="listar-feature-icon-wrapper">
                        <div className="listar-feature-icon-inner">
                          <div>
                            <img
                              alt="Customers"
                              className="listar-image-icon"
                              src="https://cdn-icons-png.flaticon.com/512/537/537069.png"
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="listar-feature-content-wrapper"
                        style={{ paddingTtop: "0px" }}
                      >
                        <div className="listar-feature-item-title listar-feature-counter-added">
                          <span>
                            <span>02</span>
                            Tools & Resources
                          </span>
                        </div>

                        <div className="listar-feature-item-excerpt">
                          “Student GPA/CGPA calculator tool and Front page
                          generator”
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listar-feature-fix-bottom-padding listar-fix-feature-arrow-button-height"></div>
              </div>

              <div
                className="col-xs-12 col-sm-6 col-md-4 listar-feature-item-wrapper listar-feature-with-image listar-height-changed"
                data-aos="fade-zoom-in"
                data-aos-group="features"
                data-line-height="25.2px"
              >
                <div className="listar-feature-item listar-feature-has-link">
                  <div className="listar-feature-item-inner">
                    <div className="listar-feature-right-border"></div>

                    <div className="listar-feature-block-content-wrapper">
                      <div className="listar-feature-icon-wrapper">
                        <div className="listar-feature-icon-inner">
                          <div>
                            <img
                              alt="Feedback"
                              className="listar-image-icon"
                              src=''
                              style={{
                                width: "71%",
                                height: " 71%",
                                borderRadius: "50px",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="listar-feature-content-wrapper"
                        style={{ paddingTtop: "0px" }}
                      >
                        <div className="listar-feature-item-title listar-feature-counter-added">
                          <span>
                            <span>03</span>
                               Made By 
                          </span>
                        </div>

                        <div className="listar-feature-item-excerpt">
                          Muhammad Saad Saif  Undergraguate Computer Science Student 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listar-feature-fix-bottom-padding listar-fix-feature-arrow-button-height"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Features */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="card flex items-start gap-4">
                <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tech Stack</h2>
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

        {/* Developer */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            👨‍💻 About the Developer
          </h2>
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl navbar-bg flex items-center justify-center text-2xl font-bold text-white shrink-0">
              SS
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Saad Saif</h3>
              <p className="text-blue-600 font-medium text-sm mb-3">
                Computer Science Student | BUITEMS · MERN Stack Developer
              </p>
              <p className="text-gray-600 leading-relaxed text-sm mb-4">
                A passionate software developer who built this platform to solve
                real problems faced by fellow students at BUITEMS. This project
                covers the full stack: authentication, REST APIs, database
                design, cloud storage, and a feature-rich frontend.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/M-Saad-saif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 navbar-bg text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub Profile
                </a>
                <a
                  href="https://github.com/M-Saad-saif/BuitemsWeb-auth"
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
          <h2 className="font-bold text-gray-800 mb-2">🌟 Open Source</h2>
          <p className="text-gray-600 text-sm mb-4">
            This project is open source. Found a bug or have a feature idea?
            Contributions are welcome on GitHub!
          </p>
          <Link
            href="/portal"
            className="inline-block px-6 py-2.5 navbar-bg text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm"
          >
            Get Started — It&apos;s Free
          </Link>
        </div>
      </div>
    </section>
  );
}
