"use client";
import RevealOnScroll from "@/components/shared/revealOnScroll/RevealOnScroll";
import { ExternalLink } from "lucide-react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { GITHUB_URL } from "@/components/lib/constants";

const GitHubActivityGraph = () => {
  return (
    <RevealOnScroll>
    <section
      aria-label="GitHub contribution activity for Towfiqul Islam"
      className="mt-8 sm:mt-14 relative overflow-hidden rounded-3xl border border-emerald-500/10 bg-[#040705]/95 p-5 sm:p-8 backdrop-blur-md shadow-2xl shadow-emerald-950/20"
      style={{ animation: "borderGlow 4s ease-in-out infinite" }}
    >
      {/* Keyframes for the border glow, scanline, and pulse effects below */}
      <style>{`
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(16, 185, 129, 0.1); box-shadow: 0 0 0px rgba(0,0,0,0); }
          50% { border-color: rgba(52, 211, 153, 0.3); box-shadow: 0 0 20px rgba(4, 120, 87, 0.1); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.5); }
        }
        @keyframes subtleFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: subtleFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Top accent gradient line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
        style={{ background: "linear-gradient(90deg, transparent, #10b981, #06b6d4, transparent)" }}
      />

      {/* Animated scanline overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div
          className="absolute inset-x-0 h-32 w-full opacity-20"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.05), transparent)",
            animation: "scanline 6s linear infinite",
          }}
        />
      </div>

      {/* Header Section */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 animate-fade-up">
        <div className="flex items-center gap-3">
          {/* Live Status Pulse Indicator */}
          <div className="relative flex h-2.5 w-2.5">
            <span 
              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              style={{ animation: "pulseDot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </div>

          <div className="flex items-center gap-2">
            <FaGithub size={16} className="text-emerald-500/80 hidden sm:block" />
            <h3 className="text-zinc-100 font-semibold text-base sm:text-lg tracking-tight">
              GitHub Contributions
            </h3>
          </div>

          <span className="inline-flex items-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider scale-90 sm:scale-100">
            Live
          </span>
        </div>

        {/* View Profile Button */}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 text-zinc-400 hover:text-emerald-400 text-xs font-medium border border-zinc-800 hover:border-emerald-500/30 bg-zinc-900/40 hover:bg-emerald-950/10 px-3.5 py-2 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-sm"
        >
          <span>View Profile</span>
          <ExternalLink size={12} className="opacity-70" />
        </a>
      </div>

      {/* Graph area — horizontally scrollable on small screens, scrollbar hidden */}
      <div className="relative bg-[#070b07] border border-zinc-900 rounded-2xl p-4 overflow-x-auto no-scrollbar animate-fade-up [animation-delay:150ms]">
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.03), transparent)" }}
        />
        
        {/* API Chart Wrapper */}
        <div className="min-w-[620px] w-full">
          <img
            src="https://ghchart.rshah.org/10b981/towfiq-dev" 
            alt="Towfiqul Islam GitHub contribution chart"
            loading="lazy"
            decoding="async"
            className="w-full rounded-lg block transition-all duration-300 hover:opacity-100 opacity-85 select-none filter brightness-95 contrast-105"
          />
        </div>
      </div>

      {/* Footer / Legend Section */}
      <div className="relative flex flex-col sm:flex-row gap-3 sm:items-center justify-between mt-4 text-[11px] text-zinc-500 animate-fade-up [animation-delay:300ms]">
        {/* Colors Legend */}
        <div className="flex items-center gap-2 bg-zinc-900/30 px-2.5 py-1.5 rounded-lg border border-zinc-900/50 w-fit">
          <span>Less</span>
          <div className="flex gap-1.0 mx-0.5">
            {["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"].map((bg) => (
              <div key={bg} className="w-2.5 h-2.5 rounded-[3px] shadow-sm" style={{ background: bg }} />
            ))}
          </div>
          <span>More</span>
        </div>
        
        <p className="text-zinc-600 tracking-wide font-mono text-center sm:text-right">
          Updated daily · {GITHUB_URL.replace("https://", "")}
        </p>
      </div>
    </section>
    </RevealOnScroll>
  );
};

export default GitHubActivityGraph;