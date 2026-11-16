import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Instagram, Mail } from "lucide-react";
import GlimmerVale from "./ui/glimmer-vale";
import SlingButton from "./ui/SlingButton";

const NpmIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
  </svg>
);

interface FooterProps {
  onOpenResume?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-black text-[#f5ece3] select-none flex flex-col justify-between">
      {/* Background WebGL Shader: GlimmerVale (Crimson & Obsidian Night Meadow) */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        <GlimmerVale
          speed={35}
          sparkle={55}
          density={60}
          scale={95}
          background="#050204"
          skyTop="#140308"
          skyHorizon="#3d0c18"
        />
      </div>

      {/* Atmospheric Contrast Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/85" />

      {/* Foreground Content with Exact Placement from Reference */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-10 lg:px-12 pt-8 sm:pt-10 pb-6 sm:pb-8 flex flex-col justify-between">
        {/* Top Navigation & Links Row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mb-6 lg:mb-8 items-start"
        >
          {/* Spacer: leaves little space on the left side */}
          <div className="hidden md:block md:col-span-2 lg:col-span-3" />

          {/* Explore Navigation */}
          <div className="flex flex-col gap-3 md:col-span-3 lg:col-span-2">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#a89589]">
              Explore
            </span>
            <nav className="flex flex-col gap-2 text-sm text-[#f5ece3]/90 font-['Inter',sans-serif]">
              <a href="#about" className="hover:text-white transition-colors w-fit">
                About
              </a>
              <a href="#skills" className="hover:text-white transition-colors w-fit">
                Skills
              </a>
              <a href="#education" className="hover:text-white transition-colors w-fit">
                Education
              </a>
              <a href="#projects" className="hover:text-white transition-colors w-fit">
                Projects
              </a>
              <a href="#contact" className="hover:text-white transition-colors w-fit">
                Contact
              </a>
            </nav>
          </div>

          {/* Follow me (Pill Badges) */}
          <div className="flex flex-col gap-3 md:col-span-4 lg:col-span-4">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#a89589]">
              Follow me
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 max-w-full">
              <a
                href="https://github.com/roshangowdas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[11px] sm:text-xs font-mono text-[#f5ece3] transition-all duration-200"
              >
                <Github className="w-3.5 h-3.5 text-[#f5ece3]" />
                <span>@roshangowdas</span>
              </a>
              <a
                href="https://www.linkedin.com/in/roshan-gowda-s-378343283/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[11px] sm:text-xs font-mono text-[#f5ece3] transition-all duration-200"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                <span>@roshan-gowda-s</span>
              </a>
              <a
                href="https://www.npmjs.com/~roshan__gowda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[11px] sm:text-xs font-mono text-[#f5ece3] transition-all duration-200"
              >
                <NpmIcon className="w-3.5 h-3.5 text-[#eb1b38]" />
                <span>~roshan__gowda</span>
              </a>
              <a
                href="https://www.instagram.com/roshan__gowda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[11px] sm:text-xs font-mono text-[#f5ece3] transition-all duration-200"
              >
                <Instagram className="w-3.5 h-3.5 text-[#e4405f]" />
                <span>@roshan__gowda</span>
              </a>
              <a
                href="mailto:0243roshan@gmail.com"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[11px] sm:text-xs font-mono text-[#f5ece3] transition-all duration-200"
              >
                <Mail className="w-3.5 h-3.5 text-[#eb1b38]" />
                <span>0243roshan@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col gap-5 md:col-span-3 lg:col-span-3 md:justify-self-end">
            {/* Action 1: Call Roshan */}
            <a
              href="tel:+916366309511"
              className="group flex flex-col items-start"
            >
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#eb1b38] group-hover:text-[#ff3855] transition-colors">
                  Call Roshan
                </span>
                <div className="w-5 h-5 rounded-full bg-[#eb1b38] group-hover:bg-[#ff3855] text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_12px_rgba(235,27,56,0.6)]">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
              <span className="text-xs text-[#a89589] mt-0.5 group-hover:text-[#f5ece3] transition-colors">
                Let&apos;s work together
              </span>
            </a>

            {/* Action 2: Resume & Works */}
            {onOpenResume ? (
              <button
                type="button"
                onClick={onOpenResume}
                className="group flex flex-col items-start text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#f5ece3] group-hover:text-white transition-colors">
                    Resume &amp; CV
                  </span>
                  <div className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
                <span className="text-xs text-[#a89589] mt-0.5 group-hover:text-[#f5ece3] transition-colors">
                  Interactive preview &amp; PDF
                </span>
              </button>
            ) : (
              <a
                href="#projects"
                className="group flex flex-col items-start"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#f5ece3] group-hover:text-white transition-colors">
                    Projects &amp; CV
                  </span>
                  <div className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
                <span className="text-xs text-[#a89589] mt-0.5 group-hover:text-[#f5ece3] transition-colors">
                  Full-stack &amp; open source
                </span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Centerpiece: Giant Typography ("roshan") matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -30px 0px" }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full overflow-hidden select-none my-2 sm:my-6 flex items-center justify-center sm:justify-start"
        >
          <span className="text-[17vw] sm:text-[18.5vw] font-black tracking-tighter leading-[0.8] text-[#f5ece3] font-['Inter',sans-serif] lowercase opacity-95 hover:opacity-100 transition-opacity truncate max-w-full">
            roshan
          </span>
        </motion.div>

        {/* Bottom Colophon Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-mono text-[#a89589] border-t border-[#eb1b38]/15 pt-5 sm:pt-6 text-center sm:text-left"
        >
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ROSHAN GOWDA S. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span>BENGALURU, INDIA (IST)</span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={scrollToTop}
                className="group flex items-center text-[#f5ece3] hover:text-[#eb1b38] transition-colors cursor-pointer text-xs font-mono font-bold tracking-wider uppercase"
                title="Click or pull the slingshot to launch to top"
              >
                <span>RETURN TO TOP</span>
              </button>
              <div className="flex items-center" title="Pull down and release to slingshot to top">
                <SlingButton
                  onSend={scrollToTop}
                  size={34}
                  padColor="#181014"
                  iconColor="#eb1b38"
                  accentColor="#eb1b38"
                  wellColor="#0a0507"
                  bandColor="#42161f"
                  strokeWidth={2}
                  armAt={28}
                  maxPull={85}
                  launchSpeed={2600}
                  recoil={0.25}
                  flight={100}
                  particles={14}
                  spread={55}
                  axis="vertical"
                  tapSends={true}
                  ariaLabel="Slingshot return to top"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
