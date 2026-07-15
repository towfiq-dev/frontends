'use client'
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GITHUB_CONTRIBUTIONS, GITHUB_URL } from "../lib/constants";

// Animates a number counting up from 0 to `target` using an eased easeOutCubic
// curve, only starting once `active` becomes true (e.g. when scrolled into view)
function useCountUp(target, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function StatCard({ stat, index, isVisible }) {
  const count = useCountUp(stat.raw, 1600, isVisible);
  // Preserve any non-numeric suffix from the display value (e.g. the "+" in "12+")
  const suffix = stat.value.replace(/[0-9]/g, "");

  const innerContent = (
    <>
      {/* Divider between cards */}
      {index !== 0 && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-neutral-800" />
      )}

      {/* Number */}
      <p className="text-white font-bold leading-none tracking-tight mb-3
                    text-5xl sm:text-6xl md:text-7xl
                    transition-opacity duration-300 group-hover:opacity-80">
        {isVisible ? count : 0}{suffix}
      </p>

      {/* Label */}
      <p className="text-neutral-500 text-xs sm:text-sm font-normal tracking-widest uppercase">
        {stat.label}
      </p>
    </>
  );

  const sharedClassName = "group relative flex flex-col items-center justify-center text-center py-2 cursor-pointer";
  const sharedStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(16px)",
    transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
  };

  if (stat.external) {
    return (
      <a
        href={stat.href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClassName}
        style={sharedStyle}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <Link href={stat.href} className={sharedClassName} style={sharedStyle}>
      {innerContent}
    </Link>
  );
}

export default function SimpleStats({ projectCount = 0, techStackCount = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { value: `${projectCount}+`, raw: projectCount, label: "Projects Completed", href: "/navLinks/projects" },
    { value: `${techStackCount}+`, raw: techStackCount, label: "Tech Stack", href: "/navLinks/skills" },
    { value: `${GITHUB_CONTRIBUTIONS}+`, raw: GITHUB_CONTRIBUTIONS, label: "Github Contribution", href: GITHUB_URL, external: true },
    { value: "2+", raw: 2, label: "Certifications", href: "/navLinks/training" },
  ];

  useEffect(() => {
    // Trigger the count-up animation once the section scrolls into view,
    // then stop observing (it should only animate once)
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Towfiqul Islam achievements and statistics"
      className="bg-neutral-950 border-y border-neutral-900 py-16 md:py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-0">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}