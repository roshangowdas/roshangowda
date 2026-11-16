import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface FadeInSectionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

/**
 * FadeInSection — Framer Motion Scroll-Driven Entrance Wrapper
 *
 * Provides a subtle, silky-smooth fade-in and upward drift for sections
 * as they cross into the viewport during downward scroll.
 */
export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = "",
  delay = 0,
  yOffset = 24,
  duration = 0.7,
  once = true,
  amount = "some",
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -50px 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom smooth ease-out curve
      }}
      className={`w-full ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;

