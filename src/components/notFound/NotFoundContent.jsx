"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost } from "lucide-react";

export default function NotFoundContent() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] text-white mt-30 lg:mt-20 p-4 overflow-hidden relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-2xl w-full text-center space-y-8 z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Ghost size={120} className="text-blue-500 opacity-80" />
            </motion.div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-white/10 rounded-[100%] blur-sm shadow-xl" />
          </div>
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-9xl font-black tracking-tighter bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-100">Lost in Space?</h2>
          <p className="text-gray-400 max-w-md mx-auto text-lg">
            The page you are looking for doesn't exist or has been moved to another universe.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Link
            href="/"
            className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all duration-300 backdrop-blur-md active:scale-95"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
