"use client";
import Link from "next/link";
import { getCatStyle } from "./CertificateCard";
import Image from "next/image";
import { useRef } from "react";
import {
  ChevronRight,
  ExternalLink,
  Building2,
  GraduationCap,
  CalendarDays,
  BadgeCheck,
  X,
} from "lucide-react";
import { DYD, PROGRAMMING_HERO } from "../lib/constants";
import { motion } from "framer-motion";
import useModalLenis from "../shared/smoothScrollProvider/useModalLenis";

export default function CourseModal({ course, onClose }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  // Keeps the page scroll (Lenis) in sync while this modal is open
  useModalLenis(!!course, wrapperRef, contentRef);

  if (!course) return null;
  const catStyle = getCatStyle(course.category);

  const META = [
    { label: "Institution", value: course.institution, icon: Building2 },
    { label: "Instructor", value: course.instructor, icon: GraduationCap },
    { label: "Issued", value: course.issuedDate, icon: CalendarDays },
    { label: "Badge ID", value: course.badge, icon: BadgeCheck },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <motion.div
        className="relative z-10 w-full max-w-md sm:max-w-xl md:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0d1117] shadow-2xl"
        data-lenis-prevent
        ref={wrapperRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-modal-title"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: `0 0 60px ${course.color}22, 0 25px 60px rgba(0,0,0,0.6)` }}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div ref={contentRef}>
        {/* Hero banner */}
        <div
          className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl px-4 sm:px-8 pt-6 sm:pt-8 pb-8 sm:pb-10"
          style={{
            background: `radial-gradient(120% 100% at 0% 0%, ${course.color}2a 0%, transparent 60%), #0a0c10`,
          }}
        >
          <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${course.gradient}`} />

          {/* decorative glow blob */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 sm:w-56 sm:h-56 rounded-full blur-3xl opacity-30"
            style={{ background: course.color }}
          />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 cursor-pointer rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white/60 hover:text-white flex-shrink-0 z-10"
          >
            <X size={16} />
          </button>

          <div className="relative flex items-start gap-3 sm:gap-4 pr-10 sm:pr-12">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${course.color}45, ${course.color}20)`,
                border: `1.5px solid ${course.color}55`,
              }}
            >
              {course.icon}
            </div>
            <div className="min-w-0">
              <span
                className={`inline-block text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full border ${catStyle.bg} ${catStyle.text} ${catStyle.border} mb-2`}
              >
                {course.category}
              </span>
              <h2 id="course-modal-title" className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight break-words">
                {course.title}
              </h2>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-8 py-6 sm:py-8">
          {/* Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            {META.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="group rounded-xl bg-white/5 border border-white/[0.08] px-4 py-3 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={12} style={{ color: course.color }} className="flex-shrink-0" />
                  <p className="text-[11px] text-white/40 uppercase tracking-wide">{label}</p>
                </div>
                <p className="text-sm sm:text-[15px] text-white font-medium truncate">{value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs sm:text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">
              About this Course
            </h3>
            <p className="text-sm text-center sm:text-justify text-white/70 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xs sm:text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">
              Skills Gained
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                  style={{
                    background: `${course.color}20`,
                    color: course.color,
                    border: `1px solid ${course.color}30`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          {course.projects.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xs sm:text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">
                Projects Completed
              </h3>
              <ul className="space-y-2">
                {course.projects.map((proj, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-white/70 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.06]"
                  >
                    <span
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: `${course.color}30` }}
                    >
                      {i + 1}
                    </span>
                    {proj.link ? (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-400 flex items-center gap-2 hover:underline transition-all duration-300 break-words"
                      >
                        {proj.name} <ExternalLink size={14} className="flex-shrink-0" />
                      </a>
                    ) : (
                      <span className="break-words">{proj.name}</span>
                    )}
                  </li>
                ))}
              </ul>

              <Link
                href={"/navLinks/projects"}
                className="group flex items-center gap-2 cursor-pointer text-sm font-semibold text-cyan-400 transition-all duration-300 mt-4"
              >
                <span className="relative">
                  See more...
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </span>
                <ChevronRight size={15} className="transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          )}

          {/* Footer */}
          <div
            className="rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            style={{ background: `${course.color}10`, border: `1px solid ${course.color}25` }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
                style={{ border: `1.5px solid ${course.color}45` }}
              >
                <Image
                  src={course.institutionLogo}
                  width={40}
                  height={40}
                  alt={course.title}
                  className="w-10 h-10 object-contain"
                  style={{ background: course.color }}
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white/40">Issued by</p>
                <a
                  href={
                    course.institution === "Programming Hero"
                      ? "https://www.programming-hero.com"
                      : "https://dyd.gov.bd"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-white hover:text-blue-400 hover:underline transition-all duration-300 flex items-center gap-1 truncate"
                >
                  <span className="truncate">{course.institution}</span>
                  <ExternalLink size={14} className="flex-shrink-0" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">Verified</span>
            </div>
          </div>
        </div>

        {/* Show Credential Button */}
        <Link
          href={course.institution === "Programming Hero" ? PROGRAMMING_HERO : DYD}
          target="_blank"
          className="flex justify-center px-4 sm:px-8 pb-6 sm:pb-8"
        >
          <button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 cursor-pointer to-purple-500 text-white px-6 py-2.5 rounded-full flex items-center justify-center gap-2 font-medium text-sm sm:text-base hover:from-blue-600 hover:to-purple-600 transition-all">
            Show Credential
            <ExternalLink size={15} />
          </button>
        </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}