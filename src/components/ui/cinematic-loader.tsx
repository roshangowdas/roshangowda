import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CinematicLoaderProps {
  onStartOpening?: () => void;
  onComplete?: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({
  onStartOpening,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shutterTopRef = useRef<HTMLDivElement>(null);
  const shutterBottomRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);

  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM ASSETS");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter state object
      const progressObj = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          setIsFinished(true);
          onComplete?.();
        },
      });

      // 1. Initial State
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(centerContentRef.current, { opacity: 0, y: 20 });
      gsap.set(hairlineRef.current, { scaleX: 0, transformOrigin: "center" });

      // 2. Center Content Fade-in & Hairline expansion
      tl.to(centerContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      })
      .to(hairlineRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.inOut",
      }, "-=0.3")

      // 3. Counter and Progress Bar Animation
      .to(
        progressObj,
        {
          value: 100,
          duration: 0.95,
          ease: "power2.inOut",
          onUpdate: () => {
            const val = Math.round(progressObj.value);
            if (counterRef.current) {
              counterRef.current.textContent = val < 10 ? `0${val}` : `${val}`;
            }

            // Update status text dynamically
            if (val > 80) {
              setStatusText("SYSTEM READY // ENTERING PORTFOLIO");
            } else if (val > 55) {
              setStatusText("COMPOSING TYPOGRAPHIC ARCHITECTURES...");
            } else if (val > 25) {
              setStatusText("INITIALIZING WEBGL ENGINES & 3D CANVASES...");
            }
          },
        },
        "-=0.2"
      )
      .to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: 0.95,
          ease: "power2.inOut",
        },
        "<"
      )

      // 4. Brief peak pause
      .to({}, { duration: 0.12 })

      // 5. Fade out center counter and hairline
      .to(centerContentRef.current, {
        opacity: 0,
        scale: 1.06,
        duration: 0.35,
        ease: "power3.in",
      })
      .to(hairlineRef.current, {
        opacity: 0,
        scaleX: 1.2,
        duration: 0.25,
        ease: "power2.in",
      }, "<")

      // 6. Split Shutter Curtain Opening: Top flies up, Bottom flies down
      .add(() => {
        // Run outside this GSAP context so hero entrance is completely independent and never reverted
        window.requestAnimationFrame(() => {
          onStartOpening?.();
        });
      }, "-=0.15")
      .to(
        shutterTopRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "<"
      )
      .to(
        shutterBottomRef.current,
        {
          yPercent: 100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "<"
      )

      // 7. Remove whole container cleanly from flow without unmounting ctx
      .set(containerRef.current, {
        display: "none",
        visibility: "hidden",
        pointerEvents: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  // Keep loader mounted with display: none once finished to avoid triggering ctx.revert()
  if (isFinished && containerRef.current) {
    containerRef.current.style.display = "none";
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden bg-transparent"
    >
      {/* Top Shutter Half */}
      <div
        ref={shutterTopRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#050204] border-b border-[#2b171c]/40 flex flex-col justify-between p-6 sm:p-10 z-10"
      >
        {/* Editorial Top Bar */}
        <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#a89589] tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#eb1b38] animate-pulse" />
            <span className="font-bold text-[#f5ece3]">ROSHAN GOWDA S</span>
            <span className="hidden sm:inline text-zinc-600">//</span>
            <span className="hidden sm:inline text-[#8e7e74]">FULL-STACK &amp; CREATIVE ENGINEER</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#8e7e74]">EDITION 2026</span>
            <span className="text-[#eb1b38] font-bold">SYS_BOOT</span>
          </div>
        </div>

        {/* CAD Grid lines overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(212, 190, 171, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 190, 171, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Bottom Shutter Half */}
      <div
        ref={shutterBottomRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050204] border-t border-[#2b171c]/40 flex flex-col justify-end p-6 sm:p-10 z-10"
      >
        {/* CAD Grid lines overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(212, 190, 171, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 190, 171, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Editorial Bottom Bar */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#8e7e74] tracking-widest uppercase relative z-20">
          <div className="flex items-center gap-4">
            <span>BENGALURU, INDIA</span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <span className="hidden sm:inline font-mono">13.0827° N, 77.5877° E</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span className="text-zinc-400 font-bold">LIVE PRODUCTION RUNNER</span>
          </div>
        </div>
      </div>

      {/* Centerpiece Counter & Cinematic Typography Lockup (Spans across the two shutters) */}
      <div
        ref={centerContentRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none px-6"
      >
        {/* Subtitle / System Tag */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#eb1b38] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#eb1b38]" />
          <span>PORTFOLIO INITIALIZATION</span>
        </div>

        {/* Massive Minimalist Odometer Counter */}
        <div className="flex items-baseline font-mono select-none">
          <span
            ref={counterRef}
            className="text-7xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-[#f5ece3] leading-none"
            style={{
              textShadow: "0 0 40px rgba(235, 27, 56, 0.25), 0 4px 16px rgba(0,0,0,0.9)",
            }}
          >
            00
          </span>
          <span className="text-3xl sm:text-5xl md:text-6xl font-black text-[#eb1b38] ml-2 font-mono">
            %
          </span>
        </div>

        {/* Hairline Progress Track */}
        <div className="w-56 sm:w-80 md:w-96 h-[2px] bg-white/10 rounded-full mt-4 sm:mt-6 overflow-hidden relative">
          <div
            ref={progressBarRef}
            className="absolute inset-0 bg-gradient-to-r from-[#eb1b38] via-[#ff4760] to-[#f5ece3] shadow-[0_0_12px_rgba(235,27,56,0.8)]"
          />
        </div>

        {/* Dynamic Status Ticker */}
        <p className="mt-4 text-xs font-mono tracking-wider text-[#a89589] uppercase text-center h-4">
          {statusText}
        </p>
      </div>

      {/* Center Hairline Laser Accent */}
      <div
        ref={hairlineRef}
        className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#eb1b38]/70 to-transparent z-20 pointer-events-none -translate-y-1/2"
      />
    </div>
  );
};

export default CinematicLoader;

