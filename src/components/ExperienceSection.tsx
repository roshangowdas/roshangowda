import React from "react";
import { motion } from "framer-motion";
import { Zap, Rocket, ShieldCheck, Package, TrendingUp } from "lucide-react";
import ScrollReelTestimonials, { ScrollReelTestimonial } from "./ui/scroll-reel-testimonials";

const QUANTIFIABLE_METRICS = [
  {
    value: "+35%",
    label: "Engineering Velocity Boost",
    detail: "Accelerated sprint delivery and optimization using AI-assisted engineering workflows.",
    icon: Zap,
    tag: "DEV VELOCITY",
    color: "#eb1b38",
  },
  {
    value: "5+",
    label: "Responsive Web Apps Shipped",
    detail: "Engineered full-stack applications with React.js, Node.js, Express.js, and MongoDB.",
    icon: Rocket,
    tag: "FULL-STACK MERN",
    color: "#ff3d5a",
  },
  {
    value: "-20%",
    label: "Cross-Browser Inconsistencies",
    detail: "Systematic code audits, layout optimization, and CSS grid refactoring across browsers.",
    icon: ShieldCheck,
    tag: "UI AUDITING",
    color: "#d4beab",
  },
  {
    value: "1st",
    label: "Published npm Component Kit",
    detail: "Authored and published react-status-kit to the official npm registry with zero dependencies.",
    icon: Package,
    tag: "OPEN SOURCE",
    color: "#cb3837",
  },
];

const REEL_TESTIMONIALS: ScrollReelTestimonial[] = [
  {
    quote: "Developed and deployed 5+ responsive production interfaces using HTML5, CSS3, and JavaScript, reducing cross-browser inconsistencies by 20%.",
    author: "Frontend Development Intern • Cognifyz Technologies (Dec 2025 – Jan 2026)",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    alt: "Cognifyz Technologies Frontend Internship",
  },
  {
    quote: "Architected 5 responsive full-stack MERN web applications, accelerating sprint delivery by 35% through modern AI-assisted engineering workflows.",
    author: "Full-Stack Developer Trainee • @ToriiMinds (2026)",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    alt: "@ToriiMinds Full-Stack Trainee",
  },
  {
    quote: "Authored and published react-status-kit to the official npm registry: zero-dependency, lightweight component library for async UI state visualization.",
    author: "Open-Source Author & Maintainer • react-status-kit (npm)",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    alt: "react-status-kit Open-Source npm Package",
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative w-full bg-black text-[#f5ece3] pt-6 sm:pt-10 pb-8 sm:pb-12 px-4 sm:px-10 lg:px-20 overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Ambient Crimson & Deep Red Glows */}
      <div
        className="absolute top-1/4 left-1/4 w-[550px] h-[550px] rounded-full blur-[180px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, rgba(235, 27, 56, 0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-15"
        style={{
          background:
            "radial-gradient(ellipse, rgba(235, 27, 56, 0.35) 0%, transparent 70%)",
        }}
      />

      {/* Subtle CAD Blueprint Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(212, 190, 171, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 190, 171, 0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="border-b border-[#2b171c] pb-3 sm:pb-4 mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[clamp(1.75rem,5.5vw,3rem)] font-black text-[#f5ece3] tracking-tight uppercase font-['Inter',sans-serif]">
              EXPERIENCE &amp; <span className="text-[#eb1b38]">IMPACT</span>
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider text-[#eb1b38] bg-[#eb1b38]/10 border border-[#eb1b38]/30 uppercase">
              <TrendingUp className="w-3 h-3" />
              <span>QUANTIFIABLE METRICS</span>
            </span>
          </div>
        </motion.div>

        {/* 1. Quantifiable Impact Callout Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8 sm:mb-12"
        >
          {QUANTIFIABLE_METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-[#2b171c] hover:border-[#eb1b38]/60 bg-[#120d0f]/90 backdrop-blur-xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_0_25px_rgba(235,27,56,0.22)] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider text-[#d4beab] bg-white/5 border border-white/10">
                    {metric.tag}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-[#eb1b38] group-hover:scale-110 transition-transform">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div
                    className="text-3xl sm:text-4xl font-black font-['Anton','Inter',sans-serif] tracking-tight leading-none"
                    style={{ color: metric.color }}
                  >
                    {metric.value}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold font-['Inter',sans-serif] text-white leading-tight">
                    {metric.label}
                  </h4>
                  <p className="text-[11px] font-mono text-[#a89589] leading-snug pt-1">
                    {metric.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* 2. Integrated ScrollReelTestimonials Component */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full flex justify-center"
        >
          <ScrollReelTestimonials testimonials={REEL_TESTIMONIALS} />
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
