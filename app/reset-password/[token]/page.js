"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/components/UI/Spinner";
import toast from "react-hot-toast";

import { RiLockPasswordLine } from "react-icons/ri";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (form.password.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: form.password }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Password reset successfully. Please login.");
        router.push("/login");
      } else {
        setError(data.error || "Something went wrong");
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
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
          <h2 className="text-2xl font-bold mb-2">Almost There!</h2>
          <p className="text-sm opacity-90">Choose a new password below</p>
        </div>

        <div className="w-full md:flex-1 p-8">
          <h2 className="text-3xl mb-6 flex items-center gap-2 justify-center font-bold text-[#1546c2]">
            New Password <RiLockPasswordLine />
          </h2>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="relative w-full my-1">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder=" "
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border-b-2 border-gray-200 outline-none transition-colors duration-300 focus:border-b-[#2157e0] hover:border-b-[#2157e0] bg-transparent text-base peer"
              />
              <span className="absolute left-0 -top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#2157e0]">
                New Password <span className="text-red-500">*</span>
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

            {/* Confirm Password */}
            <div className="relative w-full my-1">
              <input
                type={showPass ? "text" : "password"}
                name="confirmPassword"
                placeholder=" "
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border-b-2 border-gray-200 outline-none transition-colors duration-300 focus:border-b-[#2157e0] hover:border-b-[#2157e0] bg-transparent text-base peer"
              />
              <span className="absolute left-0 -top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#2157e0]">
                Confirm Password <span className="text-red-500">*</span>
              </span>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm my-4 text-center">
                {error}
              </div>
            )}

            {loading && (
              <div className="text-center justify-self-center ">
                <Spinner width="160" className="mb-[-15px] " />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 mt-6 bg-[#3169f4] text-white border-none rounded-full font-bold text-base cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#2157e0] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <hr className="my-6 border-t border-gray-200" />

          <p className="text-xs text-center -mb-4">
            Remembered your password?{" "}
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