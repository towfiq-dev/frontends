"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavActiveLink from "./NavActiveLink";
import ResumeButton from "../resumeModal/ResumeButton";

export default function MobileMenu({ navLinks }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-[#080808] border-b border-white/10 absolute top-full left-0 w-full"
          >
            <nav className="px-4 py-6 space-y-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <NavActiveLink
                  key={link.name}
                  href={link.href}
                  icon={link.icon}
                  name={link.name}
                  mobile={true}
                />
              ))}

              <div className="flex gap-4 pt-4 border-t border-white/10 mt-4">
                <ResumeButton
                  aria-label="Open resume — select a role"
                  className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all text-sm font-medium"
                >
                  <Download size={14} /> Resume
                </ResumeButton>
                <Link
                  href="/navLinks/contact"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold"
                >
                  <Zap size={14} fill="white" /> Hire Me
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
