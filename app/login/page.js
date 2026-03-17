"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { IoMdLogIn } from "react-icons/io";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form.email, form.password);
      router.push("/portal");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-[-2rem] bg-blue-100">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden w-full max-w-2xl mx-auto shadow-[0_10px_25px_rgba(0,0,0,0.32)] animate-[fading_1s_ease]">
        <div className="w-full md:flex-1 bg-gradient-to-br from-[#1546c2] to-[#005eff38] p-8 flex flex-col justify-center items-center text-white text-center">
          <Image
            src="/images/buitems-logo.png"
            alt="BUITEMS Logo"
            width={160}
            height={160}
            className="w-32 md:w-40"
          />
          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-sm opacity-90">
            Login to access your BUITEMS Portal
          </p>
        </div>

        {/* Right side - Login Form - At bottom for mobile, right for desktop */}
        <div className="w-full md:flex-1 p-8">
          <h2 className="text-3xl mb-6 flex items-center gap-2 justify-center font-bold text-[#1546c2]">
            Login <IoMdLogIn />
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
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
                Email <span className="text-red-500">*</span>
              </span>
            </div>

            {/* Password with show/hide */}
            <div className="relative w-full my-1">
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
                tabIndex={-1}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm my-4 text-center">
                {error}
              </div>
            )}

            {/* Loading Spinner */}
            {loading && (
              <div className="text-center my-4">
                <div className="flex justify-center">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-[#3169f4] rounded-full animate-spin"></div>
                </div>
                <h6 className="mt-2 text-gray-600 text-sm">Logging in...</h6>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 mt-6 bg-[#3169f4] text-white border-none rounded-full font-bold text-base cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#2157e0] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <hr className="my-6 border-t border-gray-200" />

          {/* Sign Up Link */}
          <p className="text-xs text-center -mb-4">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#3169f4] font-medium hover:text-[#2157e0] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
