"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import toast from "react-hot-toast";
import Image from "next/image";

import { IoMdPersonAdd } from "react-icons/io";

const DEPARTMENTS = [
  "Computer Engineering",
  "Electronic Engineering",
  "Electrical Engineering",
  "Software Engineering",
  "Telecommunication Engineering",
  "Computer Science",
  "Information Technology",
  "Chemistry",
  "Maths",
  "Physics",
  "Civil Engineering",
  "Petroleum and gas Engineering",
  "Mechanical Engineering",
  "Textile Engineering",
  "Chemical Engineering",
  "Mining Engineering",
  "Geological Engineering",
  "Architecture",
  "Biotechnology",
  "Environmental Science",
  "Microbiology",
  "Management Sciences",
  "Economic",
  "Public Administration",
  "Department of Law",
  "Education",
  "English",
  "Fine Arts",
  "International Relations",
  "Mass Communication",
  "Psychology",
  "Sociology",
];

const PROGRAMS = ["BS", "BE", "MS", "ME", "MBA", "PhD", "BBA", "BArch"];

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rollNo: "",
    department: "",
    batch: "",
    program: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (form.password.length < 4) {
      return toast.error("Password must be at least 4 characters");
    }
    setLoading(true);
    const { confirmPassword, ...payload } = form;
    const result = await signup(payload);
    setLoading(false);
    if (result.success) {
      toast.success("Account created! Welcome to BUITEMS Portal");
      router.push("/portal");
    } else {
      toast.error(result.error || "Signup failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-blue-100">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden w-full max-w-4xl mx-auto shadow-[0_10px_25px_rgba(0,0,0,0.32)] animate-[fading_1s_ease]">
        {/* Left side - Image/Branding - On top for mobile, left for desktop */}
        <div className="w-full md:flex-1 bg-gradient-to-br from-[#1546c2] to-[#005eff38] p-8 flex flex-col justify-center items-center text-white text-center">
          <Image
            src="/images/buitems-logo.png"
            alt="BUITEMS Logo"
            height={200}
            width={200}
            className="w-32 md:w-40 lg:w-48"
          />
          <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
          <p className="text-[16px] opacity-90">
            Enter your details and make your portal
          </p>
        </div>

        {/* Right side - Signup Form - At bottom for mobile, right for desktop */}
        <div className="w-full md:flex-1 p-8">
          <h2 className="text-3xl mb-4 flex items-center gap-2 font-bold text-[#1546c2] justify-center">
            Sign Up <IoMdPersonAdd />
          </h2>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="relative w-full my-1">
              <input
                type="text"
                name="name"
                placeholder=" "
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 border-b-2 border-gray-200 outline-none transition-colors duration-300 focus:border-b-[#2157e0] hover:border-b-[#2157e0] bg-transparent text-base peer"
              />
              <span className="absolute left-0 -top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#2157e0]">
                Full Name <span className="text-red-500">*</span>
              </span>
            </div>

            <div className="relative w-full my-1">
              <input
                type="email"
                name="email"
                placeholder=" "
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 border-b-2 border-gray-200 outline-none transition-colors duration-300 focus:border-b-[#2157e0] hover:border-b-[#2157e0] bg-transparent text-base peer"
              />
              <span className="absolute left-0 -top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#2157e0]">
                Email<span className="text-red-500">*</span>
              </span>
            </div>

            <div className="relative w-full">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder=" "
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-3 border-b-2 border-gray-200 outline-none transition-colors duration-300 focus:border-b-[#2157e0] hover:border-b-[#2157e0] bg-transparent text-base peer"
              />
              <span className="absolute left-0 -top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#2157e0]">
                Password <span className="text-red-500">*</span>
              </span>
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#3169f4] font-medium hover:text-[#2157e0] bg-transparent border-none cursor-pointer px-2 py-1 rounded transition-all duration-300 hover:bg-[rgba(49,105,244,0.1)]"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>

            <div className="relative w-full">
              <input
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                placeholder=" "
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-3 border-b-2 border-gray-200 outline-none transition-colors duration-300 focus:border-b-[#2157e0] hover:border-b-[#2157e0] bg-transparent text-base peer"
              />
              <span className="absolute left-0 -top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#2157e0]">
                Confirm Password <span className="text-red-500">*</span>
              </span>
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#3169f4] font-medium hover:text-[#2157e0] bg-transparent border-none cursor-pointer px-2 py-1 rounded transition-all duration-300 hover:bg-[rgba(49,105,244,0.1)]"
              >
                {showConfirmPass ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type="text"
              name="rollNo"
              placeholder="CMS"
              value={form.rollNo}
              onChange={handleChange}
              className="w-full p-3 my-1 border-b-2 border-gray-200 outline-none transition-colors duration-300 focus:border-b-[#2157e0] hover:border-b-[#2157e0] bg-transparent text-base placeholder:text-gray-400"
            />

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full p-3 my-1 border-b-2 border-gray-200 outline-none transition-colors duration-300 focus:border-b-[#2157e0] hover:border-b-[#2157e0] bg-transparent text-base text-gray-700 cursor-pointer"
            >
              <option value="" className="text-gray-400">
                Select Department
              </option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d} className="text-gray-700">
                  {d}
                </option>
              ))}
            </select>

            <select
              name="program"
              value={form.program}
              onChange={handleChange}
              className="w-full p-3 my-1 border-b-2 border-gray-200 outline-none transition-colors duration-300 focus:border-b-[#2157e0] hover:border-b-[#2157e0] bg-transparent text-base text-gray-700 cursor-pointer"
            >
              <option value="" className="text-gray-400">
                Select Program
              </option>
              {PROGRAMS.map((p) => (
                <option key={p} value={p} className="text-gray-700">
                  {p}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="batch"
              placeholder="Batch / Year (e.g., 2021-2025)"
              value={form.batch}
              onChange={handleChange}
              className="w-full p-3 my-1 border-b-2 border-gray-200 outline-none transition-colors duration-300 focus:border-b-[#2157e0] hover:border-b-[#2157e0] bg-transparent text-base placeholder:text-gray-400"
            />

            {loading && (
              <div className="text-center my-2">
                <div className="flex justify-center">
                  <div className="w-10 h-10 border-4 border-blue-200 border-t-[#3169f4] rounded-full animate-spin"></div>
                </div>
                <h6 className="mt-1 text-gray-600 text-sm">
                  Creating your account...
                </h6>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 mt-4 bg-[#3169f4] text-white border-none rounded-full font-bold text-base cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#2157e0] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <hr className="my-4 border-t border-gray-200" />

          <p className="text-xs text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#3169f4] font-medium hover:text-[#2157e0] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
