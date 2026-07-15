"use client";
import { RESUME_POSITIONS } from "@/components/allAPI/resumeUrlApi/ResumeUrlApi";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Layers, Monitor, Server, Atom, FileText, ChevronRight, Download, Eye, HelpCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useModalLenis from "@/components/shared/smoothScrollProvider/useModalLenis";

// Maps the `icon` string stored per-position in constants.js to an actual
// lucide-react icon component. Add an entry here whenever a new icon key
// is introduced in RESUME_POSITIONS.
const ICONS = {
  fullStack: Code2,
  mern: Layers,
  frontend: Monitor,
  backend: Server,
  react: Atom,
};

export default function ResumeModal({
  isOpen,
  onClose,
  positions = RESUME_POSITIONS,
  mode = "view",
  title = "Which role are you hiring for?",
}) {
  const [showOthersInput, setShowOthersInput] = useState(false);
  const [othersText, setOthersText] = useState("");

  // Refs for the scrollable container (Lenis wrapper) and its content
  const scrollContainerRef = useRef(null);
  const scrollContentRef = useRef(null);
  // Lenis instance created for this modal's scroll, so we can call scrollTo() manually
  const modalLenisRef = useRef(null);

  // Runs a dedicated Lenis instance for this modal's scroll container while
  // it's open, pausing the main page's Lenis so the two don't fight over scroll
  useModalLenis(isOpen, scrollContainerRef, scrollContentRef, modalLenisRef);

  // When the "Others" form opens, scroll the container down to the submit button
  useEffect(() => {
    if (showOthersInput && scrollContainerRef.current) {
      // Wait for framer-motion's height:"auto" animation (0.25s) to finish
      // and the DOM height to settle before scrolling — hence the extra delay
      const timer = setTimeout(() => {
        if (!scrollContainerRef.current) return;

        const el = scrollContainerRef.current;
        // Compute the true bottom scroll position directly from the DOM,
        // rather than relying on Lenis's possibly-stale cached height
        const target = Math.max(0, el.scrollHeight - el.clientHeight);

        if (modalLenisRef.current) {
          // Content height grew when the form opened, so tell Lenis to
          // resize first, then scroll to the target position
          modalLenisRef.current.resize();
          modalLenisRef.current.scrollTo(target, { duration: 0.6 });
        } else {
          el.scrollTo({ top: target, behavior: "smooth" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showOthersInput]);

  const handleSelect = (position) => {
    const { resumeUrl, title: positionTitle } = position;

    if (mode === "download") {
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = `Towfiqul_Islam_${positionTitle.replace(/\s+/g, "_")}_CV.pdf`;
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
    }

    handleModalClose();
  };

  const handleOthersSubmit = (e) => {
    e.preventDefault();
    if (!othersText.trim()) return;

    const fullStackPosition = positions.find(
      (pos) => pos.id === "full-stack-developer"
    ) || positions[0];

    handleSelect(fullStackPosition);
  };

  const handleModalClose = () => {
    setShowOthersInput(false);
    setOthersText("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-start justify-center pt-16 sm:pt-20 md:pt-24 px-3 sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={handleModalClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-[260px] sm:max-w-[290px] md:max-w-[340px] rounded-2xl border border-white/10 bg-[#0d1117]/95 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
            style={{
              boxShadow: "0 0 0 1px rgba(34,211,238,0.08), 0 0 60px rgba(34,211,238,0.12), 0 25px 60px rgba(0,0,0,0.7)",
            }}
            initial={{ opacity: 0, scale: 0.94, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -12 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 flex-shrink-0" />

            {/* Header */}
            <div className="px-4 sm:px-5 pt-4 sm:pt-4.5 pb-3 sm:pb-3.5 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-cyan-500/10 border border-cyan-500/25 flex-shrink-0"
                    style={{ boxShadow: "0 2px 12px rgba(34,211,238,0.15)" }}
                  >
                    {mode === "download" ? (
                      <Download size={15} className="text-cyan-400" />
                    ) : (
                      <Eye size={15} className="text-cyan-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2
                      id="resume-modal-title"
                      className="text-[13px] sm:text-sm font-bold text-white leading-tight break-words"
                    >
                      {title}
                    </h2>
                    <p className="text-[10px] sm:text-[11px] text-white/40 mt-0.5">
                      {positions.length + 1} option{positions.length !== 0 ? "s" : ""} available
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleModalClose}
                  aria-label="Close"
                  className="w-7 h-7 cursor-pointer rounded-full hover:bg-white/10 active:bg-white/15 active:scale-90 transition-all flex items-center justify-center text-white/50 hover:text-white text-sm flex-shrink-0"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Position List (Scroll Container) */}
            <motion.div
              ref={scrollContainerRef} // Lenis wrapper
              data-lenis-prevent
              className="py-2 px-2 overflow-y-auto max-h-[calc(80vh-80px)]"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
            >
              <div ref={scrollContentRef}>
                {positions.map((position) => {
                  const Icon = ICONS[position.icon] ?? FileText;
                  const disabled = !position.resumeUrl;
                  return (
                    <motion.button
                      key={position.id}
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        show: { opacity: 1, x: 0 },
                      }}
                      onClick={() => handleSelect(position)}
                      disabled={disabled}
                      className="group w-full flex cursor-pointer items-center gap-2.5 sm:gap-3 px-3 py-2.5 sm:py-2.5 mb-1 last:mb-0 rounded-xl text-left bg-white/[0.02] hover:bg-white/[0.06] active:bg-white/[0.09] border border-transparent hover:border-white/10 transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white/[0.02] disabled:hover:border-transparent"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-cyan-500/10 border border-cyan-500/15 flex-shrink-0 group-hover:bg-cyan-500/15 group-hover:border-cyan-500/30 transition-colors duration-200">
                        <Icon size={14} className="text-cyan-400" />
                      </div>
                      <span className="flex-1 text-[13px] sm:text-sm text-white/90 truncate">
                        {position.title}
                      </span>
                      <ChevronRight
                        size={14}
                        className="text-white/20 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0"
                      />
                    </motion.button>
                  );
                })}

                {/* Others Option */}
                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    show: { opacity: 1, x: 0 },
                  }}
                  onClick={() => setShowOthersInput(!showOthersInput)}
                  className={`group w-full flex cursor-pointer items-center gap-2.5 sm:gap-3 px-3 py-2.5 sm:py-2.5 mb-1 rounded-xl text-left transition-all duration-200 border ${
                    showOthersInput
                      ? "bg-white/[0.08] border-cyan-500/30"
                      : "bg-white/[0.02] hover:bg-white/[0.06] active:bg-white/[0.09] border-transparent hover:border-white/10"
                  }`}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-cyan-500/10 border border-cyan-500/15 flex-shrink-0 group-hover:bg-cyan-500/15 group-hover:border-cyan-500/30 transition-colors duration-200">
                    <HelpCircle size={14} className="text-cyan-400" />
                  </div>
                  <span className="flex-1 text-[13px] sm:text-sm text-white/90 truncate">
                    Specific Role
                  </span>
                  <ChevronRight
                    size={14}
                    className={`text-white/20 group-hover:text-cyan-400 transition-all duration-200 flex-shrink-0 ${
                      showOthersInput ? "rotate-90 text-cyan-400" : "group-hover:translate-x-0.5"
                    }`}
                  />
                </motion.button>

                {/* Others Form Area */}
                <AnimatePresence>
                  {showOthersInput && (
                    <motion.form
                      onSubmit={handleOthersSubmit}
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden px-1 pb-2"
                    >
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Write your role or message..."
                          value={othersText}
                          onChange={(e) => setOthersText(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 focus:border-cyan-500/50 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-white/20 outline-none transition-all"
                        />
                        <button
                          type="submit"
                          disabled={!othersText.trim()}
                          className="w-full cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 disabled:from-cyan-500/40 disabled:to-blue-500/40 disabled:cursor-not-allowed hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-1.5 sm:py-2 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
                        >
                          Submit
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}