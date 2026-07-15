"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X, ChevronDown, Check, SlidersVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "@/components/shared/revealOnScroll/RevealOnScroll";

const CATEGORIES = [
  { 
    label: "All Categories", 
    value: "All", 
    icon: <SlidersVertical size={14} className="text-orange-400" /> 
  },
  { label: "Full Stack",     value: "Full Stack",   icon: "🚀" },
  { label: "Frontend",       value: "Frontend",     icon: "🎨" },
  { label: "Educational",    value: "Educational",  icon: "📚" },
];

const QUICK_TAGS = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "MongoDB"];

export default function SearchFilter({ projects, onResult }) {
  const [query,        setQuery]        = useState("");
  const [category,     setCategory]     = useState("All");
  const [activeTag,    setActiveTag]    = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [focused,      setFocused]      = useState(false);

  const dropdownRef = useRef(null);
  const inputRef    = useRef(null);

  /* ── close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── filter logic ── */
  useEffect(() => {
    const q = query.toLowerCase().trim();
    const filtered = projects.filter((p) => {
      const matchCat   = category === "All" || p.category.includes(category);
      const matchTag   =
        activeTag === "All" ||
        p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.liveLink         && p.liveLink.toLowerCase().includes(q)) ||
        (p.clientSourceCode && p.clientSourceCode.toLowerCase().includes(q)) ||
        (p.serverSourceCode && p.serverSourceCode.toLowerCase().includes(q)) ||
        (p.sourceCode       && p.sourceCode.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchTag && matchQuery;
    });
    onResult(filtered);
  }, [query, category, activeTag, projects, onResult]);

  const clearQuery     = () => { setQuery(""); inputRef.current?.focus(); };
  const handleTagClick = useCallback((tag) => setActiveTag(tag), []);
  const selectedCat    = CATEGORIES.find((c) => c.value === category);

  return (
    <RevealOnScroll>
    <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-3xl mx-auto mb-8 sm:mb-10 px-4 sm:px-0">
      
      {/* ── Label ── */}
      <p className="text-[10px] tracking-[0.14em] uppercase font-semibold text-indigo-400 opacity-75">
        Find Projects
      </p>

      {/* ── Main row: stacks on mobile, side-by-side on sm+ ── */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full">

        {/* Search box */}
        <motion.div
          animate={{
            boxShadow: focused
              ? "0 0 0 2.5px rgba(99,102,241,0.45), 0 0 32px rgba(99,102,241,0.1)"
              : "0 0 0 1.5px rgba(99,102,241,0.14)",
          }}
          transition={{ duration: 0.22 }}
          className="flex-1 flex items-center gap-2 sm:gap-3 bg-[#0b0d14] rounded-2xl sm:rounded-[18px] px-3 sm:px-4"
          style={{ height: 48, minHeight: 48 }}
        >
          {/* Icon */}
          <motion.div
            animate={{ color: focused ? "#818cf8" : "#374151" }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <Search size={16} />
          </motion.div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search title, tech, link..."
            aria-label="Search projects by title, technology, or link"
            className="flex-1 min-w-0 bg-transparent text-[#e2e8f0] text-[13px] sm:text-[13.5px] placeholder:text-[#2d3748] outline-none tracking-[0.01em]"
          />

          {/* Clear */}
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={clearQuery}
                aria-label="Clear search"
                className="w-5 h-5 sm:w-[22px] sm:h-[22px] rounded-full bg-white/[0.07] hover:bg-white/[0.14] text-gray-500 hover:text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
              >
                <X size={10} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="w-px h-6 bg-white/[0.07] flex-shrink-0" />

          {/* Search button */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            className="relative overflow-hidden px-3 sm:px-5 h-[30px] sm:h-[34px] rounded-xl text-white text-[11px] sm:text-xs font-bold tracking-[0.04em] flex-shrink-0 cursor-pointer whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
          >
            <span
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
            />
            Search
          </motion.button>
        </motion.div>

        {/* Category Dropdown */}
        <div ref={dropdownRef} className="relative w-full sm:w-auto">
          <motion.button
            onClick={() => setDropdownOpen((p) => !p)}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            aria-label={`Filter by category, currently ${selectedCat?.label}`}
            animate={{
              boxShadow: dropdownOpen
                ? "0 0 0 2.5px rgba(99,102,241,0.45), 0 0 24px rgba(99,102,241,0.1)"
                : "0 0 0 1.5px rgba(99,102,241,0.14)",
            }}
            transition={{ duration: 0.22 }}
            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 bg-[#0b0d14] rounded-2xl sm:rounded-[18px] px-4 text-[13px] font-medium text-[#e2e8f0] cursor-pointer hover:bg-[#0f1117] transition-colors"
            style={{ height: 48, minHeight: 48 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg flex items-center justify-center w-5 h-5 leading-none">
                {selectedCat?.icon}
              </span>
              <span className="whitespace-nowrap">{selectedCat?.label}</span>
            </div>
            <motion.div
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-600"
            >
              <ChevronDown size={14} />
            </motion.div>
          </motion.button>

          {/* Dropdown menu — full-width on mobile, fixed-width on sm+ */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-full mt-2 left-0 right-0 sm:left-auto sm:right-0 sm:w-52 bg-[#0f1117] border border-white/[0.08] rounded-2xl sm:rounded-[18px] shadow-2xl shadow-black/60 overflow-hidden z-50 p-1.5"
              >
                {CATEGORIES.map((cat) => {
                  const isActive = category === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => { setCategory(cat.value); setDropdownOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all cursor-pointer font-medium ${
                        isActive
                          ? "bg-indigo-500/[0.12] text-white"
                          : "text-gray-500 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span className="text-base w-5 h-5 flex items-center justify-center">
                        {cat.icon}
                      </span>
                      <span className="flex-1 text-left">{cat.label}</span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-[18px] h-[18px] rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0"
                        >
                          <Check size={10} className="text-white" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Quick filter tags — horizontally scrollable on mobile ── */}
      <div className="w-full overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
        <div className="flex items-center gap-2 sm:flex-wrap sm:justify-center w-max sm:w-full mx-auto">
          {["All", ...QUICK_TAGS].map((tag) => {
            const isActive = activeTag === tag;
            return (
              <motion.button
                key={tag}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleTagClick(tag)}
                animate={{
                  borderColor:     isActive ? "rgba(99,102,241,0.6)"  : "rgba(255,255,255,0.08)",
                  color:           isActive ? "#a5b4fc"               : "#4b5563",
                  backgroundColor: isActive ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.04)",
                }}
                transition={{ duration: 0.15 }}
                className="h-7 px-3 rounded-full border text-[11px] sm:text-[11.5px] font-medium cursor-pointer whitespace-nowrap flex items-center gap-1.5 flex-shrink-0"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: isActive ? "#818cf8" : "#374151",
                    transition: "background-color 0.15s",
                  }}
                />
                {tag}
              </motion.button>
            );
          })}
        </div>
      </div>
      
    </div>
    </RevealOnScroll>
  );
}