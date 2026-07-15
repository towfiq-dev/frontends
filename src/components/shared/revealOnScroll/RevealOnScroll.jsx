"use client";

import { motion } from "framer-motion";

/**
 * RevealOnScroll
 * ----------------
 * Wraps any content (including server-rendered content passed as `children`)
 * and fades/slides/scales it into view the first time it enters the
 * viewport while scrolling.
 *
 * Usage:
 *   <RevealOnScroll>
 *     <h2>Some heading</h2>
 *   </RevealOnScroll>
 *
 *   // staggering a list of cards — one after another:
 *   {items.map((item, index) => (
 *     <RevealOnScroll key={item.id} delay={index * 0.15}>
 *       <Card {...item} />
 *     </RevealOnScroll>
 *   ))}
 */
const RevealOnScroll = ({
  children,
  delay = 0,
  duration = 0.9,
  y = 60,
  scale = 0.96,
  once = true,
  amount = 0.2,
  className = "",
  as = "div", // set to "li" when the direct parent is a <ul>/<ol>
}) => {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 1, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default RevealOnScroll;