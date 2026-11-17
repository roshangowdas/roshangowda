import React from "react";
import { motion } from "framer-motion";
import { TextString } from "@/components/ui/text-string";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full bg-black text-[#f5ece3] pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 sm:px-10 lg:px-20 overflow-hidden select-none"
    >
      {/* Ambient Crimson & Deep Espresso Glows matching Landing Page */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-12"
        style={{
          background:
            "radial-gradient(circle, rgba(210, 24, 48, 0.35) 0%, rgba(92, 54, 46, 0.12) 50%, transparent 75%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full blur-[180px] pointer-events-none opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(210, 24, 48, 0.28) 0%, transparent 70%)",
        }}
      />

      {/* Subtle CAD Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(212, 190, 171, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 190, 171, 0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main Poster Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Giant Bold "ABOUT" + Interactive TextString Physics Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <h2
              data-parallax-about
              className="font-['Inter',sans-serif] font-black text-[clamp(3.1rem,15.5vw,14.5rem)] leading-[0.8] tracking-[-0.04em] text-[#eb1b38] uppercase select-none drop-shadow-[0_0_40px_rgba(235,27,56,0.25)] will-change-transform"
            >
              ABOUT
            </h2>

            {/* Interactive Physical String Animation Section */}
            <div data-parallax-intro className="mt-4 sm:mt-6 max-w-xl will-change-transform">
              <TextString
                text="I build responsive web applications, REST APIs, and developer tools using React, TypeScript, and Node.js. My work centers on clean component architectures, accessible user interfaces, and reliable state management — including publishing open-source libraries like react-status-kit on npm."
                font={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "17px",
                  fontWeight: 600,
                  lineHeight: "1.75em",
                  letterSpacing: "0.01em",
                }}
                textColor="#d6c8bc"
                highlightWords={[
                  "React",
                  "TypeScript",
                  "Node.js",
                  "react-status-kit",
                ]}
                highlightColor="#eb1b38"
                columnWidth={600}
                offset={2}
                align="left"
                physics={{
                  unravel: 6,
                  gravity: 5,
                  slack: 5,
                  bounce: 5,
                }}
                transition={{
                  type: "tween",
                  ease: [0.44, 0, 0.56, 1],
                  duration: 0.4,
                }}
                interaction={{
                  smoothing: 6,
                  reverse: true,
                  tapToBreak: true,
                }}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  minHeight: "clamp(220px, 30vw, 280px)",
                }}
              />
            </div>
          </motion.div>

          {/* Right Column: Giant Bold "ME" + Metadata Bar */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between mt-2 lg:mt-10"
          >
            <h2
              data-parallax-me
              className="font-['Inter',sans-serif] font-black text-[clamp(3.1rem,15.5vw,14.5rem)] leading-[0.8] tracking-[-0.04em] text-[#eb1b38] uppercase select-none drop-shadow-[0_0_40px_rgba(235,27,56,0.25)] will-change-transform"
            >
              ME
            </h2>

            {/* Resume Metadata Pill with Red Border Line on Right */}
            <div
              data-parallax-meta
              className="mt-4 lg:mt-8 w-full max-w-sm font-mono text-xs text-[#c2b1a3] space-y-2 border-l-2 lg:border-l-0 lg:border-r-2 border-[#eb1b38] pl-3 lg:pl-0 lg:pr-3 lg:text-right will-change-transform break-words"
            >
              <span className="block text-[#f5ece3] font-bold">ROSHAN GOWDA S // BENGALURU, INDIA</span>
              <span className="block text-[#9e8d82]">0243roshan@gmail.com</span>
              <span className="block text-[#d4beab]">SEEKING SOFTWARE DEVELOPER ROLES</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
