"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CertificateCard from "./CertificateCard";
import CourseModal from "./CourseModal";
import Link from "next/link";
import RevealOnScroll from "../shared/revealOnScroll/RevealOnScroll";

export default function CertificatesSection({ courses = [] }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <section className="min-h-screen bg-[#060810] pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <RevealOnScroll>
        <div className="text-center mb-16">
          <p className="text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-semibold tracking-[0.3em] text-cyan-500/60 uppercase mb-4">
            Achievements & Learning
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Courses &{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            A collection of verified courses and certifications that shaped my expertise across web development, AI, and modern technologies.
          </p>

          <div className="flex items-center justify-center gap-10 md:gap-20 mt-8">
            {[
              { value: courses.length, label: "Certificates", href: "/navLinks/training" },
              { value: courses.reduce((acc, c) => acc + c.tags.length, 0) + "+", label: "Skills", href: "/navLinks/skills" },
              { value: courses.reduce((acc, c) => acc + c.projects.length, 0), label: "Projects", href: "/navLinks/projects" },
            ].map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="text-center group cursor-pointer"
              >
                <p className="text-2xl md:text-5xl font-black text-white transition-colors duration-300 group-hover:text-cyan-400">
                  {stat.value}
                </p>
                <p className="text-[15px] md:text-[20px] text-white/30 transition-colors duration-300 group-hover:text-white/60">
                  {stat.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
        </RevealOnScroll>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 max-w-3xl mx-auto">
          {courses.map((course) => (
            <CertificateCard key={course.id} course={course} onClick={setSelectedCourse} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCourse && (
          <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
