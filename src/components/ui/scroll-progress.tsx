import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — Slim Fixed Scroll-Depth Progress Bar
 *
 * Sits pinned along the very top edge of the viewport (z-[100])
 * and tracks the user's scroll depth across the entire portfolio.
 */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth spring physics to prevent stutter while keeping it snappy
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] sm:h-[3px] pointer-events-none select-none bg-black/40 backdrop-blur-[2px]"
    >
      <motion.div
        style={{ scaleX }}
        className="relative w-full h-full origin-left bg-gradient-to-r from-[#8c1424] via-[#eb1b38] to-[#ff3b56] shadow-[0_0_12px_rgba(235,27,56,0.95),0_0_24px_rgba(255,42,75,0.6)]"
      >
        {/* Leading Tip Flare for cinematic glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#ff5a75] blur-[2px] opacity-90 -mr-1" />
      </motion.div>
    </div>
  );
};

export default ScrollProgress;

