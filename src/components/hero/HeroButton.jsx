import React from "react";
import { FaDownload } from "react-icons/fa";
import ResumeButton from "../shared/resumeModal/ResumeButton";
import { ChevronRight, Mail } from "lucide-react";
import Link from "next/link";

const HeroButton = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center lg:justify-start pt-2 pb-2">
      {/* Primary CTA */}
      <Link
        href="/navLinks/projects"
        className="
          group relative inline-flex items-center justify-center gap-1.5
          overflow-hidden rounded-full
          bg-gradient-to-r from-cyan-500 to-purple-600
          px-5 sm:px-6 py-2 sm:py-2.5
          text-sm sm:text-base font-semibold text-white
          shadow-md shadow-cyan-500/20
          transition-all duration-300
          hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5
          active:scale-95 active:translate-y-0
        "
      >
        {/* subtle shine sweep on hover */}
        <span className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative">View Projects</span>
        <ChevronRight
          size={16}
          className="relative stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

      {/* Secondary actions */}
      <div className="flex gap-2.5 sm:gap-3 justify-center">
        <Link
          href="/navLinks/contact"
          className="
            group inline-flex items-center gap-1.5 sm:gap-2
            rounded-full border border-neutral-700 bg-neutral-900/80
            px-4 sm:px-5 py-2 sm:py-2.5
            text-sm sm:text-base font-semibold text-neutral-300
            backdrop-blur-sm transition-all duration-300
            hover:border-neutral-500 hover:bg-neutral-800 hover:text-white hover:-translate-y-0.5
            active:scale-95 active:translate-y-0
          "
        >
          <Mail size={16} className="stroke-neutral-300 transition-colors duration-300 group-hover:stroke-white" />
          <span>Contact Me</span>
        </Link>

        <ResumeButton
          aria-label="Open resume — select a role"
          className="
            group inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer
            rounded-full border border-neutral-700 bg-neutral-900/80
            px-4 sm:px-5 py-2 sm:py-2.5
            text-sm sm:text-base font-semibold text-neutral-300
            backdrop-blur-sm transition-all duration-300
            hover:border-neutral-500 hover:bg-neutral-800 hover:text-white hover:-translate-y-0.5
            active:scale-95 active:translate-y-0
          "
        >
          <FaDownload
            size={14}
            className="text-neutral-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-white"
          />
          <span>Resume</span>
        </ResumeButton>
      </div>
    </div>
  );
};

export default HeroButton;