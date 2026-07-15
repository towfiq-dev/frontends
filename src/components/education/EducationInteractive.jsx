"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EducationDetails from "./EducationDetails";

export default function EducationInteractive({ edu }) {
  const [selectedEdu, setSelectedEdu] = useState(null);

  return (
    <>
      <button
        onClick={() => setSelectedEdu(edu)}
        className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.15em] border ${edu.borderColor} bg-white/[0.03] hover:bg-white/[0.07] text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer`}
      >
        <span>View Details</span>
        <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <AnimatePresence>
        {selectedEdu && (
          <EducationDetails edu={selectedEdu} onClose={() => setSelectedEdu(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
