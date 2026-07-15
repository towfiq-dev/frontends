"use client";
import { useEffect, useState, useRef } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function BackToTop() {
  // Tracks whether the user has scrolled down enough to switch the button
  // from "go to bottom" into "back to top" mode
  const [scrolled, setScrolled] = useState(false);
  // Button only shows while the mouse is moving, then auto-hides after 1s idle
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouseMove = () => {
      setVisible(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), 1000);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(timerRef.current);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <button
      onClick={scrolled ? scrollToTop : scrollToBottom}
      aria-label={scrolled ? "Back to top" : "Go to bottom"}
      className="fixed bottom-8 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/30 hover:scale-110 hover:shadow-blue-500/50 active:scale-95 cursor-pointer transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      {scrolled ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
    </button>
  );
}