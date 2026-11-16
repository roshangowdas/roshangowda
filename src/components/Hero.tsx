import React, { useState } from "react";
import { ArrowDown, Cpu, Sparkles, Terminal, Code2, Layers, ShieldCheck, ChevronRight } from "lucide-react";
import VectorWordmark, { VectorWordmarkProps } from "./VectorWordmark";
import { PORTFOLIO_DATA } from "../data/portfolioData";

interface HeroProps {
  vectorProps: VectorWordmarkProps;
  onOpenCustomizer: () => void;
  onSelectWordmark: (text: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  vectorProps,
  onOpenCustomizer,
  onSelectWordmark,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex flex-col justify-between overflow-hidden bg-[#070709] bg-grid-cad">
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: vectorProps.accent || '#00f0ff' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center relative z-10">
        
        {/* Top HUD Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 font-mono text-[11px] text-zinc-400 border-b border-white/10 pb-3">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              SYS::NODE_PRIMARY
            </span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">LATENCY: &lt;1.2ms</span>
            <span className="hidden sm:inline text-zinc-600">//</span>
            <span className="hidden sm:inline text-zinc-400">BUFFER: 4096_TEX</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-zinc-500">INTERACTIVE RIG:</span>
            <span className="text-cyan-400 font-bold tracking-wider">
              HOVER / DRAG TO REVEAL
            </span>
          </div>
        </div>

        {/* Vector Canvas Container Stage */}
        <div className="relative w-full rounded-2xl border border-white/10 bg-[#070709]/80 backdrop-blur-md overflow-hidden cad-bracket shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Subtle Grid / Ruler Top Header */}
          <div className="absolute top-0 left-0 right-0 z-20 h-7 border-b border-white/5 bg-black/40 flex items-center justify-between px-4 font-mono text-[10px] text-zinc-500 pointer-events-none">
            <div className="flex items-center space-x-4">
              <span>CANVAS_2D_ATLAS</span>
              <span>RENDERER: WEBGL2</span>
              <span>INTERACTIVE_LATTICE: 3_VERTS</span>
            </div>
            <div className="hidden sm:flex items-center space-x-3">
              <span>X_NORMALIZED_UV</span>
              <span className="text-cyan-400/80">PREMULTIPLIED_ALPHA</span>
            </div>
          </div>

          {/* Interactive Wordmark Shader Canvas */}
          <div className="w-full h-[400px] sm:h-[480px] md:h-[540px] lg:h-[580px] relative">
            <VectorWordmark
              {...vectorProps}
              style={{
                width: "100%",
                height: "100%",
                minWidth: "100%",
                minHeight: "100%",
              }}
            />
          </div>

          {/* Bottom telemetry overlay inside canvas card */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="glass-panel px-3 py-1.5 rounded-md font-mono text-[10px] text-zinc-400 flex items-center space-x-3">
              <span className="text-cyan-400">STATUS: ACTIVE</span>
              <span>POINTER TRACKING: ON</span>
              <span className="hidden sm:inline">DAMPING: {vectorProps.damping}%</span>
            </div>

            <div className="pointer-events-auto flex items-center space-x-2">
              <button
                onClick={onOpenCustomizer}
                className="glass-panel hover:glass-panel-elevated text-cyan-300 hover:text-white px-3 py-1.5 rounded-md font-mono text-[11px] flex items-center space-x-1.5 transition-all border border-cyan-500/30 hover:border-cyan-400"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>OPEN_RIG_INSPECTOR</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Bio / Tagline & Architectural Stance */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-xs text-zinc-300">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>ROLE: SENIOR FULL-STACK & SYSTEMS ARCHITECT</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">high-throughput engines</span>, distributed systems, & visceral web applications.
            </h1>

            <p className="text-base text-zinc-400 leading-relaxed max-w-2xl">
              Specialized in the convergence of low-level systems engineering (Go, Rust, distributed event streams) and cutting-edge client experiences (WebGL, React 19, custom shader pipelines). Obsessed with latency, resilience, and tactile digital craftsmanship.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,240,255,0.35)] flex items-center space-x-2 cursor-pointer"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-5 py-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 text-white font-mono text-xs font-semibold transition-all flex items-center space-x-2"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>INITIATE_CONTACT</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-2.5 rounded-lg border border-white/10 hover:border-cyan-400/40 font-mono text-xs text-zinc-300 hover:text-white transition-all bg-black/40"
              >
                {copied ? "COPIED_TO_CLIPBOARD!" : "COPY_EMAIL"}
              </button>
            </div>
          </div>

          {/* Quick Metrics / Stats Box */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {PORTFOLIO_DATA.profile.stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-zinc-400 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="w-6 h-0.5 bg-cyan-500/40 mt-3 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}

            {/* Quick Wordmark Switcher Pill Bar */}
            <div className="col-span-2 glass-panel p-3.5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 mb-2">
                <span>QUICK WORDMARK SWITCHER:</span>
                <span className="text-cyan-400">HOT_SWAP</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["ROSHAN", "ARCHITECT", "ENGINEER", "CREATIVE", "SYS_CORE"].map((str) => (
                  <button
                    key={str}
                    onClick={() => onSelectWordmark(str)}
                    className={`font-mono text-xs px-2.5 py-1 rounded border transition-all ${
                      vectorProps.text === str
                        ? "bg-cyan-400 text-black font-bold border-cyan-400"
                        : "bg-zinc-900/80 border-white/10 text-zinc-300 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {str}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <div className="text-center pt-8">
        <a
          href="#projects"
          className="inline-flex flex-col items-center font-mono text-[11px] text-zinc-500 hover:text-cyan-400 transition-colors"
        >
          <span>SCROLL_TO_WORKS</span>
          <ArrowDown className="w-4 h-4 mt-1 animate-bounce text-cyan-400" />
        </a>
      </div>
    </section>
  );
};

