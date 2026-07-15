"use client";
import { useState, useEffect } from "react";

export default function NavScrollWrapper({ children }) {
  // Adds a darker, blurred background once the page is scrolled past the top
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-black/60 backdrop-blur-sm"
      }`}
    >
      {children}
    </header>
  );
}
