import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Sparkles } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import ProjectsSourceCodeModals from './ProjectsSourceCodeModals';
import useModalLenis from '../../shared/smoothScrollProvider/useModalLenis';

const Modals = ({ selectedProject, setSelectedProject }) => {
  const [showSourceOptions, setShowSourceOptions] = useState(false);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useModalLenis(!!selectedProject, wrapperRef, contentRef);

  const handleClose = () => {
    setSelectedProject(null);
    setShowSourceOptions(false);
  };

  return (
    <div>
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Ambient glow */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-blue-600/20 blur-[110px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-violet-600/20 blur-[110px] pointer-events-none" />

            <motion.div
              layoutId={`card-${selectedProject.id}`}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 bg-[#13151a]/95 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl"
              style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 0 90px rgba(59,130,246,0.15), 0 30px 80px rgba(0,0,0,0.7)' }}
              data-lenis-prevent
              ref={wrapperRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
            >
            <div ref={contentRef}>
              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute cursor-pointer top-3 right-3 sm:top-4 sm:right-4 z-20 bg-black/50 backdrop-blur-sm p-2 sm:p-2.5 rounded-full border border-white/10 hover:bg-red-500 hover:border-red-500 active:scale-90 transition-all duration-300 text-white"
              >
                <X size={18} />
              </button>

              {/* Image with gradient overlay */}
              <div className="relative h-48 xs:h-56 sm:h-72 md:h-80 w-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13151a] via-[#13151a]/10 to-transparent" />
              </div>

              <div className="px-4 sm:px-7 md:px-8 pb-6 sm:pb-8 pt-5 sm:pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-400/10 px-3 py-1 rounded-full border border-blue-500/20">
                    <Sparkles size={11} />
                    {selectedProject.category}
                  </span>
                  <h3 id="project-modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold mt-4 mb-3 text-white leading-tight break-words">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-7">
                    {selectedProject.description}
                  </p>
                </motion.div>

                {selectedProject.features && (
                  <motion.div
                    className="mb-6 sm:mb-7"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                      <span className="w-1 h-3.5 rounded-full bg-blue-500" />
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-3">
                      {selectedProject.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + index * 0.04, duration: 0.3 }}
                          className="flex items-start gap-2 text-gray-300 text-sm rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2"
                        >
                          <span className="text-blue-500 mt-0.5 flex-shrink-0">✔</span>
                          <span className="break-words">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                <motion.div
                  className="mb-6 sm:mb-7"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                    <span className="w-1 h-3.5 rounded-full bg-violet-500" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.03, duration: 0.25 }}
                        className="bg-white/5 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-200"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7 sm:mt-8"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                >
                  {/* Live Project */}
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group flex-1 flex items-center justify-center gap-3
                      rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600
                      px-6 py-3.5 sm:py-4 font-semibold text-white text-sm sm:text-base
                      shadow-lg shadow-blue-500/20 transition-all duration-300
                      hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/40
                      active:scale-95
                    "
                  >
                    <ExternalLink size={20} className="transition-transform duration-300 group-hover:rotate-12" />
                    <span>View Live Project</span>
                  </a>

                  {/* GitHub - conditional */}
                  <ProjectsSourceCodeModals
                    selectedProject={selectedProject}
                    showSourceOptions={showSourceOptions}
                    setShowSourceOptions={setShowSourceOptions}
                  />
                </motion.div>
              </div>
            </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modals;