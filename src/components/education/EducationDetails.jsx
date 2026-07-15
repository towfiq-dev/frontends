"use client";
import Image from "next/image";
import { useRef } from "react";
import { ExternalLink, GraduationCap, Award, Hash, Calendar } from "lucide-react";
import { HSC, SSC } from "../lib/constants";
import { motion } from "framer-motion";
import useModalLenis from "../shared/smoothScrollProvider/useModalLenis";

export default function EducationDetails({ edu, onClose }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useModalLenis(!!edu, wrapperRef, contentRef);

  if (!edu) return null;

  const isRunning = edu.gpa === "Running";

  // Maps each degree's Tailwind gradient class to a matching solid hex color,
  // used for inline styles (glow, borders) that Tailwind classes can't do dynamically.
  const gradientColorMap = {
    "from-blue-500 to-cyan-400": "#22d3ee",
    "from-purple-500 to-pink-500": "#a855f7",
    "from-emerald-500 to-teal-400": "#10b981",
  };
  const glowColor = gradientColorMap[edu.gradient] || "#22d3ee";

  // Icon per meta field label
  const metaIcons = {
    Institution: GraduationCap,
    "Degree Level": Award,
    "Passing Year": Calendar,
    GPA: Award,
    "Roll Number": Hash,
    "Registration No.": Hash,
  };

  // Build the meta grid; roll/registration numbers are only included when present
  const metaItems = [
    { label: "Institution", value: edu.institution },
    { label: "Degree Level", value: edu.level },
    { label: "Passing Year", value: edu.passingYear },
    {
      label: "GPA",
      value: isRunning ? "Currently Running" : `${edu.gpa} / ${edu.outOf}`,
    },
    ...(edu.roll ? [{ label: "Roll Number", value: edu.roll }] : []),
    ...(edu.regNo || edu.reg
      ? [{ label: "Registration No.", value: edu.regNo || edu.reg }]
      : []),
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Ambient glow blobs */}
      <div
        className="absolute -top-32 -left-32 w-72 h-72 rounded-full blur-[100px] opacity-30 pointer-events-none"
        style={{ background: glowColor }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: glowColor }}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0b0f16]/95 shadow-2xl"
        data-lenis-prevent
        ref={wrapperRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="education-modal-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 0 0 1px ${glowColor}15, 0 0 80px ${glowColor}25, 0 30px 80px rgba(0,0,0,0.7)`,
        }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div ref={contentRef}>
        {/* Top gradient bar with shimmer */}
        <div className={`relative h-1.5 w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-r ${edu.gradient}`}>
          <motion.div
            className="absolute inset-0 bg-white/40"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            style={{ width: "40%" }}
          />
        </div>

        <div className="px-4 sm:px-8 py-6 sm:py-9">
          {/* Header */}
          <motion.div
            className="flex items-start justify-between gap-3 sm:gap-4 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${glowColor}40, ${glowColor}15)`,
                  border: `1.5px solid ${glowColor}50`,
                  boxShadow: `0 4px 20px ${glowColor}30`,
                }}
              >
                {edu.boardLogo ? (
                  <Image
                    src={edu.boardLogo}
                    width={48}
                    height={48}
                    alt={edu.institution}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain"
                  />
                ) : (
                  <span className="text-2xl">{edu.icon}</span>
                )}
              </div>
              <div className="min-w-0">
                <span
                  className={`inline-block text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border ${edu.badgeColor} mb-2`}
                >
                  {edu.status}
                </span>
                <h2 id="education-modal-title" className="text-[15px] sm:text-lg md:text-xl font-bold text-white leading-tight break-words">
                  {edu.fullTitle}
                </h2>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 cursor-pointer rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all flex items-center justify-center text-white/60 hover:text-white flex-shrink-0"
            >
              ✕
            </button>
          </motion.div>

          {/* Meta Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
            }}
          >
            {metaItems.map((item) => {
              const Icon = metaIcons[item.label] || Award;
              return (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="group rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-300"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon size={12} style={{ color: glowColor }} className="opacity-70" />
                    <p className="text-[11px] text-white/40 uppercase tracking-wide">{item.label}</p>
                  </div>
                  <p className="text-sm sm:text-[15px] text-white font-medium break-words">{item.value}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Description */}
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h3 className="text-xs sm:text-sm font-semibold text-white/50 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full" style={{ background: glowColor }} />
              About this Degree
            </h3>
            <p className="text-sm text-center sm:text-justify text-white/70 leading-relaxed">
              {edu.description}
            </p>
          </motion.div>

          {/* Academic Focus */}
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <h3 className="text-xs sm:text-sm font-semibold text-white/50 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full" style={{ background: glowColor }} />
              Academic Focus
            </h3>
            <div className="flex flex-wrap gap-2">
              <span
                className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: `${glowColor}20`,
                  color: glowColor,
                  border: `1px solid ${glowColor}35`,
                }}
              >
                {edu.highlight}
              </span>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
            style={{
              background: `${glowColor}0d`,
              border: `1px solid ${glowColor}25`,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="flex items-center gap-3">
              {edu.boardLogo ? (
                <Image
                  src={edu.boardLogo}
                  width={40}
                  height={40}
                  alt={edu.institution}
                  className="w-10 h-10 rounded-xl object-contain flex-shrink-0"
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${glowColor}30` }}
                >
                  {edu.icon}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs text-white/40">Issued by</p>
                <a
                  href={
                    edu.institution === "National University"
                      ? "https://www.nu.ac.bd"
                      : "https://dhakaeducationboard.gov.bd"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-white hover:text-blue-400 hover:underline transition-all duration-300 flex items-center gap-1 break-words"
                >
                  {edu.board}
                  <ExternalLink size={15} className="flex-shrink-0" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {isRunning ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-xs text-yellow-400 font-medium">In Progress</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-medium">Completed</span>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Show Certificate Button */}
        {edu.certificateImage && (
          <motion.div
            className="flex justify-center pb-6 sm:pb-8 px-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            <a
              href={
                edu.institution === "Seraj Nagar M.A. Pilot High School, Narsingdi"
                  ? SSC
                  : edu.institution === "Raipura Govt. College, Narsingdi"
                  ? HSC
                  : ""
              }
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2.5 rounded-full flex items-center justify-center gap-2 font-medium hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95 transition-all cursor-pointer"
            >
              Show Credential
              <ExternalLink size={16} />
            </a>
          </motion.div>
        )}
        </div>
      </motion.div>
    </motion.div>
  );
}