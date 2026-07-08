"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/components/UI/Spinner";
import toast from "react-hot-toast";

import { MdOutlineMarkEmailRead } from "react-icons/md";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        toast.success("Reset link sent! Check your inbox.");
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
          <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
          <p className="text-sm opacity-90">
            No worries, we'll send you reset instructions
          </p>
        </div>

        <div className="w-full md:flex-1 p-8">
          <h2 className="text-3xl mb-6 flex items-center gap-2 justify-center font-bold text-[#1546c2]">
            Reset Password <MdOutlineMarkEmailRead />
          </h2>

          {submitted ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                If an account exists for <strong>{email}</strong>, a password
                reset link has been sent. The link expires in{" "}
                <strong>10 minutes</strong>.
              </p>
              <Link
                href="/login"
                className="inline-block text-[#3169f4] font-medium hover:text-[#2157e0] hover:underline text-sm"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Email */}
                <div className="relative w-full my-1">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    value={email}
                    onChange={handleChange}
                    className="w-full p-3 border-b-2 border-gray-200 outline-none transition-colors duration-300 focus:border-b-[#2157e0] hover:border-b-[#2157e0] bg-transparent text-base peer"
                  />
                  <span className="absolute left-0 -top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#2157e0]">
                    Email <span className="text-red-500">*</span>
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
                  {loading ? "Sending..." : "Send Reset Link"}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}