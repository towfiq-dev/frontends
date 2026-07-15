"use client";
import { useState } from "react";
import ResumeModal from "./ResumeModal";

/**
 * Reusable "Resume" trigger.
 *
 * Drop this in anywhere a Resume/Download-CV button or link currently lives
 * (Navbar, Hero, MobileMenu, About page, etc). It keeps the exact visual you
 * pass via `className`/`children`, but instead of linking straight to a file
 * it opens the role-selection modal so visitors get the resume that matches
 * the position they have in mind.
 *
 * By default it behaves as a "view resume" trigger (opens the picked resume
 * in a new tab). Pass `positions={DOWNLOAD_CV_POSITIONS}` and
 * `mode="download"` to reuse it for a "Download CV" button instead — picking
 * an option will then save the file straight to the visitor's device.
 */
export default function ResumeButton({
  className,
  children,
  positions,
  mode,
  title,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className} {...rest}>
        {children}
      </button>

      <ResumeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        positions={positions}
        mode={mode}
        title={title}
      />
    </>
  );
}
