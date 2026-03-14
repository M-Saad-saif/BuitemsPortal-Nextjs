"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import ToolsCard from "@/components/layout/ToolsCard";
import Image from "next/image";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <>
      {/* ================= Hero section-=================*/}
      <section className="hero-bg text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src="/images/buitems-logo.png"
            alt="BUITEMS Logo"
            className=" mx-auto mb-6 rounded-xl bg-white object-contain shadow-xl"
            height={100}
            width={100}
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#ffd700]">
            Welcome to BUITEMS Portal
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
            Your all-in-one academic toolkit — GPA calculator, CGPA tracker,
            assignment front pages, and a secure student portal with AI Chat-Bot
            integration.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="buttons">
              <div className="credential-card">
                <div className="credentialBTNs">
                  <p className="text-blue-950 text-[20px] font-bold">
                    Create Account to have personal portal
                  </p>
                  <div className="buttons">
                    <Link href="/signup">
                      <button className="credentialBTN ">
                        Create Account <i className="ri-user-add-line"></i>
                      </button>
                    </Link>

                    <Link href="/login">
                      <button className="credentialBTN  mx-2">
                        Login <i className="ri-login-box-line"></i>
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="Credential-divider "></div>

                <div id="studentPortal" style={{ gap: "8px", display: "grid" }}>
                  <p className="text-blue-950 text-[20px] font-bold mb-[-15px]">
                    Student Protal
                  </p>
                  <Link href="/portal">
                    <button className="credentialBTN">
                      Portal <i className="fa-solid fa-graduation-cap"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================ tool cards ================= */}
      <div className="pt-16 ">

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Everything You Need
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Academic tools designed specifically for BUITEMS students
      </p>
      </div>
      <ToolsCard />

      {/* ========================== AI Banner ==========================*/}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-3xl">🤖</span>
          <h2 className="text-2xl font-bold mt-3 mb-3">AI Study Assistant</h2>
          <p className="text-blue-100 mb-6">
            Have questions about your studies? Use the integrated AI assistant
            to get instant answers on any academic topic.
          </p>
          <Link
            href="/portal"
            className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow"
          >
            Try AI Assistant
          </Link>
        </div>
      </section>

      {/* ======================== CTA ======================== */}
      {!user && (
        <section className="py-16 px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Ready to manage your academics smarter?
          </h2>
          <p className="text-gray-500 mb-6">
            Create a free account and access your personal portal.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-brand-secondary hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg"
          >
            Create Free Account
          </Link>
        </section>
      )}
    </>
  );
}
