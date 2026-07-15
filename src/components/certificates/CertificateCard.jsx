"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import RevealOnScroll from "../shared/revealOnScroll/RevealOnScroll";

const categoryColors = {
  "Full Stack": { bg: "bg-purple-500/20", text: "text-purple-300", border: "border-purple-500/30" },
  Advanced: { bg: "bg-emerald-500/20", text: "text-emerald-300", border: "border-emerald-500/30" },
};

// Maps a course category to its badge color scheme; falls back to a neutral
// slate style for any category not explicitly listed above.
export function getCatStyle(category) {
  return categoryColors[category] || { bg: "bg-slate-500/20", text: "text-slate-300", border: "border-slate-500/30" };
}

export default function CertificateCard({ course, onClick }) {
  const catStyle = getCatStyle(course.category);

  return (
    <RevealOnScroll>
    <div
      className="group relative rounded-2xl border border-white/8 bg-[#0d1117] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
      // Glow color is dynamic per-course, so it's set via inline handlers
      // rather than a static Tailwind class
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 40px ${course.color}25, 0 4px 24px rgba(0,0,0,0.4)`;
        e.currentTarget.style.borderColor = `${course.color}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
      onClick={() => onClick(course)}
    >
      <div className={`h-0.5 w-full bg-gradient-to-r ${course.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
      
    {/* Preview Section */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden bg-gray-900">
        
        {/* Show the real certificate image if available, otherwise fall
            back to a color-tinted gradient placeholder */}
        {course.certificateImage ? (
          <>
            <Image 
            width={200} 
            height={200} 
              src={course.certificateImage.src || course.certificateImage} 
              alt={`${course.title} certificate — issued by ${course.institution}`}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60" />
          </>
        ) : (

          <div 
            className="absolute inset-0" 
            style={{ 
              background: `radial-gradient(ellipse at center, ${course.color}25 0%, transparent 70%)` 
            }} 
          />
        )}

        {/* Decorative circles — only when no image */}
        {!course.certificateImage && (
          <>
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10" style={{ background: course.color }} />
            <div className="absolute -left-4 -bottom-4 w-20 h-20 rounded-full opacity-10" style={{ background: course.color }} />
          </>
        )}

        <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl px-6 py-4 text-center group-hover:bg-white/10 transition-colors">
          <p className="text-[10px] uppercase tracking-widest text-green-400 mb-1">Certificate of Completion</p>

          <p className="text-sm font-bold text-white mb-1">Towfiqul Islam</p>
          <p className="text-[11px] text-green-400 max-w-[180px] leading-tight">{course.title}</p>
          <div
            className="mt-2 inline-block text-[9px] font-mono px-2 py-0.5 rounded"
            style={{ background: `${course.color}25`, color: course.color }}
          >
            {course.badge}
          </div>
        </div>

        <div
          className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center text-lg z-20"
          style={{ background: `${course.color}20`, border: `1px solid ${course.color}30` }}
        >
          {course.icon}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-sm font-bold text-white leading-tight mb-1">{course.title}</h3>
        <p className="text-xs text-white/40 mb-1">{course.institution}</p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-white/30">📅</span>
          <span className="text-xs text-white/30">Issued {course.issuedDate}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
              style={{ background: `${course.color}18`, color: course.color, border: `1px solid ${course.color}28` }}
            >
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/8 text-white/40 border border-white/10">
              +{course.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
            {course.category}
          </span>
          <button
  className="
    group
    flex items-center gap-2
    cursor-pointer
    text-sm font-semibold
    text-cyan-400
    transition-all duration-300
  "
>
  <span className="relative">
    View Details

    <span
      className="
        absolute
        left-0
        -bottom-1
        h-[1px]
        w-0
        bg-cyan-400
        transition-all
        duration-300
        group-hover:w-full
      "
    />
  </span>

  <ChevronRight
    size={15}
    className="
      transition-all duration-300
      group-hover:translate-x-1
    "
  />
          </button>
        </div>
      </div>
      
    </div>
    </RevealOnScroll>
  );
}
