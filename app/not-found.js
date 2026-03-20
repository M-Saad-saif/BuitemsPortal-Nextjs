"use client";

import Link from "next/link";
import {
  FaUserSlash,
  FaArrowLeft,
  FaHome,
  FaSearch,
  FaQuestionCircle,
  FaRegSadTear,
} from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

export default function UserNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="relative">
          <div className="absolute top-20 left-0 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="relative h-40 bg-gradient-to-r from-red-500 via-red-600 to-red-700">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <svg
                className="absolute bottom-0 left-0 w-full"
                viewBox="0 0 1440 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,106.7C1248,107,1344,85,1392,74.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                  fill="white"
                ></path>
              </svg>
              {/* Icon */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div className="bg-white rounded-full p-5 shadow-2xl">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
                    <div className="relative bg-red-500 rounded-full p-4">
                      <FaRegSadTear className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-20 pb-10 px-8 text-center">
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                  Error 404
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-800 mb-3">
                Page Not Found
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                Oops! We couldn't locate this page.
              </p>
              <p className="text-gray-500 mb-8">
                The page may have been deleted, moved, or the URL might be
                incorrect.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 rounded-xl p-4 text-left">
                  <FaSearch className="text-blue-500 text-xl mb-2" />
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Check Your Link
                  </h3>
                  <p className="text-sm text-gray-600">
                    Verify the URL contains the correct page URL.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-left">
                  <FaQuestionCircle className="text-purple-500 text-xl mb-2" />
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Need Assistance?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Contact support if you believe this is an error.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 px-6 py-3 navbar-bg text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-105"
                >
                  <FaHome />
                  Return to Home
                </Link>
              </div>
            </div>
          </div>

      
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
