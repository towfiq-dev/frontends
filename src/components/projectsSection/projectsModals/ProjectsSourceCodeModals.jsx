import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const ProjectsSourceCodeModals = ({selectedProject, showSourceOptions, setShowSourceOptions}) => {
  return (
    <div className="flex-1 flex flex-col gap-3">

                    {/* Multi-repo projects open a picker modal; single-repo
                        projects link directly; projects with no repo show nothing */}
                    {selectedProject.clientSourceCode || selectedProject.serverSourceCode ? (
                      <>
                        {/* View Source Code Toggle Button */}
                        <button
                          onClick={() => setShowSourceOptions(true)}
                          className="
                            group flex items-center justify-center gap-3
                            rounded-2xl border border-slate-700 bg-slate-900/70
                            backdrop-blur-sm px-6 py-4 font-semibold text-white
                            transition-all duration-300 hover:-translate-y-1
                            hover:border-violet-500 hover:bg-slate-800
                            hover:shadow-lg hover:shadow-violet-500/20
                            active:scale-95 cursor-pointer w-full
                          "
                        >
                          <FaGithub size={18} />
                          <span>View Source Code</span>
                        </button>

                        {/* Source Options Mini Modal */}
                        <AnimatePresence>
                          {showSourceOptions && (
                            <>
                              {/* Backdrop */}
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowSourceOptions(false)}
                                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                              />

                              {/* Mini Modal */}
                              <motion.div
                                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="fixed inset-0 z-[70] flex items-center justify-center p-4"
                              >
                                <div
                                  className="relative bg-[#1a1d24] border border-violet-500/30 rounded-3xl shadow-2xl shadow-violet-500/20 p-8 w-full max-w-sm"
                                  role="dialog"
                                  aria-modal="true"
                                  aria-labelledby="source-modal-title-2"
                                >

                                  {/* Close Button */}
                                  <button
                                    onClick={() => setShowSourceOptions(false)}
                                    aria-label="Close"
                                    className="absolute top-4 right-4 bg-black/40 p-1.5 rounded-full hover:bg-red-500 transition-colors text-white cursor-pointer"
                                  >
                                    <X size={15} />
                                  </button>

                                  {/* GitHub Icon */}
                                  <div className="flex justify-center mb-4">
                                    <div className="bg-violet-500/10 border border-violet-500/20 p-4 rounded-2xl">
                                      <FaGithub size={32} className="text-violet-400" />
                                    </div>
                                  </div>

                                  {/* Title */}
                                  <h4 id="source-modal-title-2" className="text-center text-white font-bold text-lg mb-1">
                                    Source Code
                                  </h4>
                                  <p className="text-center text-gray-400 text-sm mb-6">
                                    Choose which part you want to explore
                                  </p>

                                  {/* Buttons */}
                                  <div className="flex flex-col gap-3">
                                    {selectedProject.clientSourceCode && (
                                      <a
                                        href={selectedProject.clientSourceCode}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                          group flex items-center justify-between gap-3
                                          rounded-2xl border border-slate-700 bg-slate-800/80
                                          px-5 py-3.5 font-semibold text-white text-sm
                                          transition-all duration-300
                                          hover:border-blue-500 hover:bg-blue-500/10
                                          hover:shadow-md hover:shadow-blue-500/20
                                          active:scale-95
                                        "
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="w-2 h-2 rounded-full bg-blue-400" />
                                          <span>Client Side</span>
                                        </div>
                                        <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                                      </a>
                                    )}
                                    {selectedProject.serverSourceCode && (
                                      <a
                                        href={selectedProject.serverSourceCode}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                          group flex items-center justify-between gap-3
                                          rounded-2xl border border-slate-700 bg-slate-800/80
                                          px-5 py-3.5 font-semibold text-white text-sm
                                          transition-all duration-300
                                          hover:border-violet-500 hover:bg-violet-500/10
                                          hover:shadow-md hover:shadow-violet-500/20
                                          active:scale-95
                                        "
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="w-2 h-2 rounded-full bg-violet-400" />
                                          <span>Server Side</span>
                                        </div>
                                        <ExternalLink size={14} className="text-gray-400 group-hover:text-violet-400 transition-colors" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </>

                    ) : selectedProject.sourceCode ? (
                      <a
                        href={selectedProject.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group flex items-center justify-center gap-3
                          rounded-2xl border border-slate-700 bg-slate-900/70
                          backdrop-blur-sm px-6 py-4 font-semibold text-white
                          transition-all duration-300 hover:-translate-y-1
                          hover:border-violet-500 hover:bg-slate-800
                          hover:shadow-lg hover:shadow-violet-500/20
                          active:scale-95
                        "
                      >
                        <FaGithub size={18} />
                        <span>View Source Code</span>
                      </a>
                    ) : null}

                  </div>
  );
};

export default ProjectsSourceCodeModals;