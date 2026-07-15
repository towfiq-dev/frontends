"use client";

import { useEffect, useRef, useState } from "react";
import { CategoryColumn } from "./SkillsServer";
import RevealOnScroll from "../shared/revealOnScroll/RevealOnScroll";
import Breadcrumb from "../shared/breadcrumb/Breadcrumb";
import { SKILL_ICON_MAP } from "../lib/skillIconMap";

const SkillsClient = ({ skillsJsonLd, columns = [] }) => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // The API stores each skill's icon as a key string (e.g. "SiReact") since
  // real JSX components can't live in MongoDB — resolve it back to the
  // actual icon element here, right before rendering.
  const resolvedColumns = columns.map((group) => ({
    ...group,
    skills: group.skills.map((skill) => {
      const IconComponent = SKILL_ICON_MAP[skill.icon];
      return { ...skill, icon: IconComponent ? <IconComponent /> : null };
    }),
  }));

  // Observe when the section enters the viewport to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Split columns into two groups for the two-column layout (alternating
  // left/right so it still balances reasonably if a category is added or
  // removed from the dashboard).
  const leftGroups = resolvedColumns.filter((_, i) => i % 2 === 0);
  const rightGroups = resolvedColumns.filter((_, i) => i % 2 === 1);

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillsJsonLd) }}
      />

      <section
        ref={sectionRef}
        className="relative bg-[#080b0b] min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-10 overflow-hidden"
        aria-label="Skills and Technologies — Towfiqul Islam"
      >
        {/* Background gradient decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 10%, rgba(0,212,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 80% 80%, rgba(99,102,241,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto mt-10">
          <Breadcrumb items={[{ name: "Skills" }]} bare className="mb-20" />
          {/* Section heading */}
          <RevealOnScroll>
          <div className="mb-14 sm:mb-18">
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-cyan-500/60 mb-3">
              Technical Proficiency
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
              Skills &amp;{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #00d4ff 0%, #6366f1 100%)",
                }}
              >
                Technologies
              </span>
            </h1>
            <p className="text-gray-500 text-sm">
              Technologies I work with to bring ideas to life
            </p>
            <div
              className="mt-5 h-px w-24 rounded-full"
              style={{ background: "linear-gradient(90deg,#00d4ff,transparent)" }}
            />
          </div>
          </RevealOnScroll>

          {/* Skills grid — two columns on large screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 xl:gap-x-12 gap-y-10">
            <div className="flex flex-col gap-10">
              {leftGroups.map((group, i) => (
                <CategoryColumn
                  key={i}
                  title={group.title}
                  subtitle={group.subtitle}
                  skills={group.skills}
                  inView={inView}
                />
              ))}
            </div>
            <div className="flex flex-col gap-10">
              {rightGroups.map((group, i) => (
                <CategoryColumn
                  key={i}
                  title={group.title}
                  subtitle={group.subtitle}
                  skills={group.skills}
                  inView={inView}
                />
              ))}
            </div>
          </div>

          {/* Bottom divider */}
          <div
            aria-hidden="true"
            className="mt-20 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), rgba(99,102,241,0.2), transparent)",
            }}
          />
        </div>
      </section>
    </>
  );
};

export default SkillsClient;