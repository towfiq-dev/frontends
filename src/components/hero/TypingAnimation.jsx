"use client";
import { useEffect, useRef } from "react";

const TYPING_TEXTS = ["Full Stack Developer", "MERN Stack Developer", "React / Next.js Expert"];

export default function TypingAnimation() {
  const typingRef = useRef(null);

  // Manual typewriter effect: types out each phrase, pauses, deletes it,
  // then moves to the next phrase in TYPING_TEXTS (loops forever).
  // Uses direct DOM text updates + timeouts instead of state to avoid
  // re-rendering the component on every keystroke.
  useEffect(() => {
    const el = typingRef.current;
    if (!el) return;

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout;

    const type = () => {
      const current = TYPING_TEXTS[textIndex];
      if (!deleting) {
        // Typing forward, one character at a time
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          // Full phrase typed — pause before deleting
          deleting = true;
          timeout = setTimeout(type, 2000);
          return;
        }
      } else {
        // Deleting backward, one character at a time
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          // Fully deleted — advance to the next phrase
          deleting = false;
          textIndex = (textIndex + 1) % TYPING_TEXTS.length;
        }
      }
      // Delete faster than type for a more natural feel
      timeout = setTimeout(type, deleting ? 50 : 80);
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center lg:justify-start gap-1 h-9 sm:h-11">
      <span
        ref={typingRef}
        className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
      ></span>
      <span className="inline-block w-0.5 h-7 sm:h-8 bg-cyan-400 ml-0.5 animate-pulse"></span>
    </div>
  );
}
