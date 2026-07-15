"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useLenis } from "./SmoothScrollProvider";

/**
 * Adds Lenis smooth-scrolling INSIDE a modal.
 *
 * Why this is needed: the page already has one Lenis instance controlling
 * window scroll. Modals use `data-lenis-prevent` so that instance leaves
 * their internal content alone, but that just falls back to the browser's
 * raw/native scroll - which feels instant/too fast next to the smooth page
 * scroll. This hook creates a second, separate Lenis instance scoped only
 * to the modal's own scroll container, and stops the page's Lenis while
 * the modal is open so the two never compete for the same wheel/touch events.
 *
 * @param {boolean} isOpen - whether the modal is currently open/mounted
 * @param {React.RefObject<HTMLElement>} wrapperRef - the modal's scrollable element (overflow-y-auto, data-lenis-prevent)
 * @param {React.RefObject<HTMLElement>} contentRef - the single element inside wrapperRef that wraps all of the modal's content
 * @param {React.RefObject<Lenis>} [instanceRef] - optional ref that gets populated with the live modal Lenis instance, useful if you need to call `.scrollTo(...)` programmatically (e.g. auto-scrolling to a newly revealed form)
 */
export default function useModalLenis(isOpen, wrapperRef, contentRef, instanceRef) {
  const mainLenis = useLenis();

  useEffect(() => {
    if (!isOpen) return;
    if (!wrapperRef.current || !contentRef.current) return;

    // Pause the main page scroll so it can't fight with the modal's scroll
    mainLenis?.stop();

    const modalLenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    if (instanceRef) instanceRef.current = modalLenis;

    let rafId;
    const raf = (time) => {
      modalLenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      modalLenis.destroy();
      if (instanceRef) instanceRef.current = null;
      mainLenis?.start();
    };
  }, [isOpen, wrapperRef, contentRef, instanceRef, mainLenis]);
}
