"use client";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import RevealOnScroll from "@/components/shared/revealOnScroll/RevealOnScroll";
import ProjectSourceCodeModal from "./ProjectSourceCodeModal";

const FeaturedProjects = ({ projects = [] }) => {
  const [sourceModal, setSourceModal] = useState(null);

  return (
    <section
      className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      aria-label="Featured Projects by Towfiqul Islam"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <RevealOnScroll>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            A selection of my recent work — built with modern tools and best practices.
          </p>
        </div>
        </RevealOnScroll>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.slice(0, 3).map((project) => (
            <RevealOnScroll 
            key={project.id}>
            <article
              className="bg-[#0f1115] border border-gray-800 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-gray-700 group hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 w-full bg-gray-900 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} — project by Towfiqul Islam`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <span className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-lg w-fit mb-3">
                  {project.category}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2 h-10 overflow-hidden">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-gray-800 text-blue-300 px-2 py-1 rounded border border-blue-500/10"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-1 rounded">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 sm:justify-between">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo of ${project.title}`}
                    className="flex items-center justify-center gap-2 whitespace-nowrap text-cyan-400 border border-cyan-400/20 w-full sm:w-fit px-4 py-2 rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 text-sm font-medium"
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>

                  {/* Projects with separate client/server repos open a modal
                      to pick one; single-repo projects link out directly */}
                  {project.clientSourceCode || project.serverSourceCode ? (
                    <button
                      onClick={() => setSourceModal(project)}
                      aria-label={`View source code of ${project.title}`}
                      className="flex items-center justify-center gap-2 whitespace-nowrap text-cyan-400 border border-cyan-400/20 w-full sm:w-fit px-4 py-2 rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 text-sm font-medium cursor-pointer"
                    >
                      <FaGithub size={15} />
                      Source Code
                    </button>
                  ) : (
                    <a
                      href={project.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code of ${project.title}`}
                      className="flex items-center justify-center gap-2 whitespace-nowrap text-cyan-400 border border-cyan-400/20 w-full sm:w-fit px-4 py-2 rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 text-sm font-medium"
                    >
                      <FaGithub size={15} />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </article>
            </RevealOnScroll>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/navLinks/projects"
            className="
              group relative inline-flex items-center gap-2
              px-8 py-3 rounded-full font-semibold text-white
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              shadow-lg shadow-purple-500/30
              transition-all duration-300
              hover:shadow-purple-500/50
              hover:scale-105 active:scale-95
              overflow-hidden
            "
          >
            <span className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              View All Projects
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>

      {/* Source Code Mini Modal */}
      <ProjectSourceCodeModal sourceModal={sourceModal} setSourceModal={setSourceModal}/>
    </section>
  );
};

export default FeaturedProjects;