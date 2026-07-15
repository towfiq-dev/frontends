import RevealOnScroll from '@/components/shared/revealOnScroll/RevealOnScroll';
import { Code2, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { IoGitCommit } from 'react-icons/io5';
import { MdBiotech } from 'react-icons/md';
import { getProjectCount, getTechStackCount } from '@/components/lib/getPortfolioData';
import { GITHUB_CONTRIBUTIONS, GITHUB_URL } from '@/components/lib/constants';

const StatsCoreStack = async () => {
  const [projectCount, techStackCount] = await Promise.all([
    getProjectCount(),
    getTechStackCount(),
  ]);
  const stats = [
    { icon: <Code2 size={24} />, value: `${projectCount}+`, label: "Projects Completed", color: "bg-blue-600", path: "/navLinks/projects" },
    { icon: <MdBiotech size={24} />, value: `${techStackCount}+`, label: "Tech Stack", color: "bg-purple-600", path: "/navLinks/skills" },
    { icon: <GraduationCap size={24} />, value: "2+", label: "Certifications", color: "bg-orange-600", path: "/navLinks/training" },
    { icon: <IoGitCommit size={24} />, value: `${GITHUB_CONTRIBUTIONS}+`, label: "Github Contribution", color: "bg-emerald-600", path: GITHUB_URL },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Stats Section */}
      <RevealOnScroll>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <Link 
              href={stat.path} 
              key={i}
              target={stat.path.startsWith('http') ? '_blank' : '_self'}
              rel={stat.path.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative block overflow-hidden bg-[#0a0a0a] border border-gray-900 hover:border-cyan-500/50 rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center justify-center ${stat.color} rounded-xl p-3 w-12 h-12 text-white transition-transform duration-300 group-hover:scale-110`}>
                    {stat.icon}
                  </div>
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wider group-hover:text-cyan-400 transition-colors duration-300">
                  {stat.label}
                </p>
                
                {/* Visual Accent - Background Gradient effect */}
                <div className={`absolute inset-0 ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                
                {/* Decorative Elements - subtle lines */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.015] rounded-full -mr-10 -mt-10 group-hover:bg-white/[0.03] transition-colors duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </RevealOnScroll>

      {/* Core Stack Section */}
      <RevealOnScroll>
        <div className="mt-8 md:mt-12 p-5 sm:p-6 md:p-8 bg-gradient-to-br from-gray-950 to-black border border-gray-900 hover:border-cyan-500/30 rounded-3xl transition-all duration-300">
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed flex flex-col md:flex-row md:items-center">
            <span className="flex items-center text-cyan-400 font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-3 md:mb-0 md:mr-6 whitespace-nowrap">
              Core Stack
              <span className="ml-3 inline-block h-px w-6 bg-cyan-400 opacity-50 md:hidden"></span>
            </span>
            <span className="italic font-medium text-gray-200">
              React, Next.js, Express.js, MongoDB, Tailwind CSS, BatterAuth, Docker, & Vercel.
            </span>
          </p>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default StatsCoreStack;