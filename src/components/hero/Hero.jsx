import Image from "next/image";
import { Mail, ChevronRight } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { MdBiotech } from "react-icons/md";
import profileImageUrl from "@/assets/myImages/towfiq.jpg";
import Link from "next/link";
import TypingAnimation from "./TypingAnimation";
import ResumeButton from "../shared/resumeModal/ResumeButton";
import RevealOnScroll from "../shared/revealOnScroll/RevealOnScroll";
import HeroButton from "./HeroButton";
import { getProjectCount } from "../lib/getPortfolioData";

import SocialLinks from "../shared/socialLinks/SocialLinks";

export default async function Hero() {
  const projectCount = await getProjectCount();
  return (
    <section
      className="bg-[#050505] text-white min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20 pb-10 lg:pt-10 lg:pb-0"
      aria-label="Towfiqul Islam (তৌফিকুল ইসলাম) — Full Stack MERN Developer from Bangladesh"
    >
      <div className="max-w-7xl pt-20 mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        {/* Left: Text Content */}
        <RevealOnScroll>
          <div className="space-y-4 sm:space-y-5 order-2 lg:order-1 text-center lg:text-left">

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 bg-neutral-900 border border-neutral-700 rounded-full px-4 py-2 text-[15px] text-neutral-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="sm:hidden text-[14.5px]">Open to Full-time or Freelance project</span>
              <span className="hidden sm:inline">Open to Full-time opportunities or Freelance projects</span>
            </div>

            <p className="text-lg md:text-xl text-neutral-400">Hello, I&apos;m</p>

            {/* h1 with both English and Bengali name for bilingual SEO */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Towfiqul Islam
              <span className="sr-only"> — তৌফিকুল ইসলাম — Full Stack MERN Stack Developer from Bangladesh</span>
            </h1>

            {/* Typing Animation — client component */}
            <TypingAnimation />

            <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              I craft modern, high-performance web applications with clean architecture and intuitive user
              experiences. Turning complex problems into elegant digital solutions.
            </p>

            {/* Action Buttons */}
            <HeroButton />
            {/* Social Links */}
            <div className="flex justify-center lg:justify-start pt-2 pb-7">
              <SocialLinks gap="gap-3" />
            </div>
          </div>
        </RevealOnScroll>

        {/* Right: Profile Image */}
        <RevealOnScroll>
          <div className="relative flex justify-center items-center order-1 lg:order-2 pt-8 lg:pt-0">
            {/* Radial glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/10 rounded-full blur-3xl scale-110 pointer-events-none"></div>

            {/* Profile Circle */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-4 border-neutral-800 bg-neutral-900 overflow-hidden shadow-2xl z-10">
              <Image
                src={profileImageUrl}
                alt="Towfiqul Islam (তৌফিকুল ইসলাম) — Full Stack MERN Developer from Dhaka, Bangladesh. Portfolio profile picture."
                fill
                sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                style={{ objectFit: "cover" }}
                className="z-10"
                priority
              />
            </div>

            {/* Floating Card: Experience */}
            <div
              className="
    absolute 
    top-[6%] sm:top-[8%] 
    right-0 sm:right-[1%]
    
    max-w-[180px] sm:max-w-none
    w-auto
    
    bg-neutral-900/95 
    border border-neutral-800 
    
    px-2.5 sm:px-4 
    py-2 sm:py-2.5 
    
    rounded-xl sm:rounded-2xl 
    shadow-xl 
    z-20 
    
    flex items-center gap-2 sm:gap-3
    
    animate-float
  "
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-cyan-900/40 shrink-0">
                <MdBiotech
                  size={16}
                  className="text-cyan-400"
                />
              </div>

              <div className="leading-tight">
                <p className="text-[11px] sm:text-xs font-bold text-white whitespace-nowrap">
                  1+ Year
                </p>

                <p className="text-[10px] sm:text-xs text-neutral-400">
                  Coding Experience
                </p>
              </div>
            </div>

            {/* Floating Card: Projects */}
            <div className="absolute -bottom-4 left-2 sm:bottom-[8%] sm:left-[5%] bg-neutral-900 border border-neutral-800 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl z-20 flex gap-2 sm:gap-3 items-center animate-float [animation-delay:1.2s]">
              <div className="p-1.5 sm:p-2 rounded-lg bg-purple-900/40">
                <span className="text-base font-bold text-purple-400 leading-none">✓</span>
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-none">{projectCount}+ Projects</p>
                <p className="text-xs text-neutral-400 mt-0.5">Completed</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
