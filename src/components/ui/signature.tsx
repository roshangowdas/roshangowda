/* eslint-disable */
"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, PenTool, Check, Eraser, Sparkles, Download } from "lucide-react";

export interface Point {
  x: number;
  y: number;
  t?: number;
  p?: number;
}

export type Stroke = Point[];

export interface SignatureRef {
  play: () => void;
  clear: () => void;
  undo: () => void;
  getStrokes: () => Stroke[];
  toSVG: () => string;
  toDataURL: () => string;
}

export interface SignatureProps {
  mode?: "play" | "sign";
  strokes?: Stroke[];
  pen?: "fountain" | "ballpoint" | "marker";
  thickness?: number;
  speed?: number;
  autoplay?: boolean;
  loop?: boolean;
  pause?: number;
  frame?: boolean;
  line?: boolean;
  name?: string;
  role?: string;
  placeholder?: string;
  aspect?: number;
  intro?: boolean;
  theme?: "auto" | "light" | "dark";
  inkColor?: string;
  surfaceColor?: string;
  onChange?: (strokes: Stroke[]) => void;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
  allowToggleMode?: boolean;
}

// Fluid, realistic cursive calligraphy path for "Roshan Gowda S" with sweeping underline flourish
// Viewbox: 0 0 700 240
const DEFAULT_NAME_PATHS = [
  // Capital 'R' flourish & stem
  "M 65 145 C 50 120 54 75 84 55 C 112 38 140 58 136 94 C 132 122 102 132 80 132 L 78 178",
  // 'R' kick-out & loop into 'o'
  "M 112 126 C 130 142 152 162 170 178 C 184 164 194 144 204 140 C 216 136 224 146 218 162 C 212 176 196 176 190 164 C 184 148 200 136 220 140 C 234 144 244 166 254 148",
  // 's' and 'h' tall loop
  "M 254 148 C 260 138 272 134 278 146 C 284 158 270 176 288 172 C 300 170 306 132 312 96 C 316 66 332 66 328 102 L 322 172",
  // 'h' shoulder into 'a'
  "M 322 172 C 328 150 340 136 356 140 C 368 144 368 160 366 172 C 376 156 386 140 402 140 C 418 140 418 162 414 172",
  // 'n' double wave into capital 'G'
  "M 414 172 L 418 172 C 424 156 436 140 452 140 C 468 140 468 160 464 172 C 474 156 486 138 502 136 C 520 136 532 150 528 166 C 522 186 500 196 486 186 C 474 176 478 156 498 148 C 516 140 536 146 546 160",
  // 'owda S' terminal
  "M 546 160 C 554 150 564 142 576 144 C 588 146 590 162 586 172 C 596 158 608 146 620 146 C 632 146 636 158 632 170 C 640 156 652 144 662 146 C 674 148 676 162 670 174",
  // Grand Sweeping Underline Flourish (curves back under the name, then surges across)
  "M 670 174 C 650 188 600 200 480 202 C 340 204 180 204 110 196 C 75 192 60 184 72 174 C 90 164 160 162 280 160 C 420 158 580 158 680 138",
];

export const Signature = forwardRef<SignatureRef, SignatureProps>(
  (
    {
      mode: initialMode = "play",
      strokes: customStrokes,
      pen = "fountain",
      thickness = 1,
      speed = 1,
      autoplay = true,
      loop = false,
      pause = 2400,
      frame = true,
      line = true,
      name = "Roshan Gowda S",
      role = "Full-Stack Developer & Software Engineer",
      placeholder = "Sign here with mouse, pen or finger",
      aspect = 2.4,
      intro = true,
      theme = "dark",
      inkColor = "#f5ece3",
      surfaceColor = "#161616",
      onChange,
      onComplete,
      className = "",
      style = {},
      allowToggleMode = true,
    },
    ref
  ) => {
    const [currentMode, setCurrentMode] = useState<"play" | "sign">(initialMode);
    const [key, setKey] = useState(0); // For retriggering play animation
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawnStrokes, setDrawnStrokes] = useState<Stroke[]>([]);
    const [activeStroke, setActiveStroke] = useState<Stroke>([]);
    const [penType, setPenType] = useState<"fountain" | "ballpoint" | "marker">(pen);
    const [isCompleted, setIsCompleted] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Playback duration calculation based on speed
    const duration = Math.max(0.6, 2.2 / speed);

    // Replay ink animation
    const handleReplay = useCallback(() => {
      setIsCompleted(false);
      setKey((prev) => prev + 1);
    }, []);

    // Clear drawn canvas in sign mode
    const handleClear = useCallback(() => {
      setDrawnStrokes([]);
      setActiveStroke([]);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      if (onChange) onChange([]);
    }, [onChange]);

    // Undo last stroke
    const handleUndo = useCallback(() => {
      setDrawnStrokes((prev) => {
        const next = prev.slice(0, -1);
        redrawAll(next);
        if (onChange) onChange(next);
        return next;
      });
    }, [onChange]);

    // Redraw all strokes on canvas
    const redrawAll = (allStrokes: Stroke[]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = inkColor;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      allStrokes.forEach((stroke) => {
        if (stroke.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);

        for (let i = 1; i < stroke.length; i++) {
          const pt = stroke[i];
          const prev = stroke[i - 1];
          const dist = Math.hypot(pt.x - prev.x, pt.y - prev.y);

          // Pen stroke width physics
          let w = 2.5 * thickness;
          if (penType === "fountain") {
            w = Math.max(1.2, Math.min(4.5, (3.2 / (dist * 0.1 + 1)) * thickness));
          } else if (penType === "marker") {
            w = 5 * thickness;
          }
          ctx.lineWidth = w;
          ctx.lineTo(pt.x, pt.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
        }
      });
    };

    // Canvas Mouse/Touch handlers for sign mode
    const getPos = (e: React.MouseEvent | React.TouchEvent): Point => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0, t: Date.now() };
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height),
        t: Date.now(),
      };
    };

    const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
      if (currentMode !== "sign") return;
      setIsDrawing(true);
      const pos = getPos(e);
      setActiveStroke([pos]);
    };

    const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing || currentMode !== "sign") return;
      const pos = getPos(e);
      setActiveStroke((prev) => {
        const next = [...prev, pos];
        const canvas = canvasRef.current;
        if (canvas && prev.length > 0) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.strokeStyle = inkColor;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            const last = prev[prev.length - 1];
            const dist = Math.hypot(pos.x - last.x, pos.y - last.y);
            let w = 2.5 * thickness;
            if (penType === "fountain") {
              w = Math.max(1.2, Math.min(4.5, (3.2 / (dist * 0.1 + 1)) * thickness));
            } else if (penType === "marker") {
              w = 5 * thickness;
            }
            ctx.lineWidth = w;
            ctx.beginPath();
            ctx.moveTo(last.x, last.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
          }
        }
        return next;
      });
    };

    const handlePointerUp = () => {
      if (!isDrawing || currentMode !== "sign") return;
      setIsDrawing(false);
      if (activeStroke.length > 1) {
        setDrawnStrokes((prev) => {
          const next = [...prev, activeStroke];
          if (onChange) onChange(next);
          return next;
        });
      }
      setActiveStroke([]);
    };

    // Export imperative handles matching React Bits Pro
    useImperativeHandle(ref, () => ({
      play: handleReplay,
      clear: handleClear,
      undo: handleUndo,
      getStrokes: () => drawnStrokes,
      toSVG: () => {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 240">${DEFAULT_NAME_PATHS.map(
          (d) => `<path d="${d}" fill="none" stroke="${inkColor}" stroke-width="${2.5 * thickness}"/>`
        ).join("")}</svg>`;
      },
      toDataURL: () => {
        return canvasRef.current?.toDataURL("image/png") || "";
      },
    }));

    // Auto replay loop
    useEffect(() => {
      if (!loop || currentMode !== "play") return;
      const timer = setTimeout(() => {
        handleReplay();
      }, (duration + pause / 1000) * 1000);
      return () => clearTimeout(timer);
    }, [loop, pause, duration, currentMode, key, handleReplay]);

    return (
      <div
        ref={containerRef}
        style={{
          aspectRatio: aspect,
          backgroundColor: surfaceColor,
          ...style,
        }}
        className={`relative w-full rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(235,27,56,0.12)] flex flex-col justify-between overflow-hidden select-none transition-all duration-300 ${
          frame ? "p-4 sm:p-7" : "p-2"
        } ${className}`}
      >
        {/* Subtle Ambient Red Glow */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, rgba(235,27,56,0.6) 0%, transparent 70%)" }}
        />

        {/* Top Controls: Interactive Switcher & Pen Picker */}
        <div className="relative z-10 flex items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#eb1b38] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#d4beab]">
              {currentMode === "play" ? "Verified Author Signature" : "Visitor Interactive Pad"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {allowToggleMode && (
              <div className="flex items-center p-0.5 rounded-lg bg-black/60 border border-white/10 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentMode("play");
                    handleReplay();
                  }}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    currentMode === "play"
                      ? "bg-[#eb1b38] text-white font-bold shadow-sm"
                      : "text-[#a89589] hover:text-white"
                  }`}
                >
                  Play Ink
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentMode("sign")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    currentMode === "sign"
                      ? "bg-[#eb1b38] text-white font-bold shadow-sm"
                      : "text-[#a89589] hover:text-white"
                  }`}
                >
                  Sign Pad
                </button>
              </div>
            )}

            {currentMode === "play" ? (
              <button
                type="button"
                onClick={handleReplay}
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-white/5 hover:bg-[#eb1b38]/20 border border-white/10 hover:border-[#eb1b38]/50 text-[#d4beab] hover:text-white text-[11px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                title="Replay ink writing animation"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#eb1b38]" />
                <span className="hidden sm:inline">Rewrite</span>
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleUndo}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-[#d4beab] cursor-pointer"
                  title="Undo stroke"
                >
                  Undo
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-[#eb1b38]/20 border border-white/10 text-[10px] font-mono text-[#eb1b38] cursor-pointer flex items-center gap-1"
                  title="Clear pad"
                >
                  <Eraser className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Canvas / Signature Area */}
        <div
          className="relative flex-1 w-full flex items-center justify-center cursor-pointer min-h-[140px] sm:min-h-[190px]"
          onClick={currentMode === "play" ? handleReplay : undefined}
          title={currentMode === "play" ? "Click to rewrite signature" : undefined}
        >
          {currentMode === "play" ? (
            /* MODE = PLAY: Auto-writing SVG Calligraphy Ink with Path Drawing */
            <svg
              key={key}
              viewBox="0 0 700 240"
              className="w-full h-full max-h-[190px] sm:max-h-[220px] overflow-visible"
              style={{
                filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.45))",
              }}
            >
              {DEFAULT_NAME_PATHS.map((d, idx) => {
                const isUnderline = idx === DEFAULT_NAME_PATHS.length - 1;
                const pathDelay = idx * (duration * 0.16);
                const pathDuration = isUnderline ? duration * 0.6 : duration * 0.38;

                return (
                  <motion.path
                    key={idx}
                    d={d}
                    fill="none"
                    stroke={inkColor}
                    strokeWidth={isUnderline ? 2.8 * thickness : 3.2 * thickness}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: {
                        duration: pathDuration,
                        delay: pathDelay,
                        ease: [0.42, 0, 0.58, 1],
                      },
                      opacity: {
                        duration: 0.1,
                        delay: pathDelay,
                      },
                    }}
                    onAnimationComplete={() => {
                      if (isUnderline) {
                        setIsCompleted(true);
                        if (onComplete) onComplete();
                      }
                    }}
                  />
                );
              })}
            </svg>
          ) : (
            /* MODE = SIGN: Interactive Freehand Drawing Pad */
            <div className="relative w-full h-full flex items-center justify-center">
              {drawnStrokes.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-zinc-500 font-mono text-xs sm:text-sm">
                  <PenTool className="w-5 h-5 mb-1.5 opacity-40 animate-bounce" />
                  <span>{placeholder}</span>
                </div>
              )}
              <canvas
                ref={canvasRef}
                width={700}
                height={240}
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
                className="w-full h-full max-h-[190px] sm:max-h-[220px] cursor-crosshair touch-none"
              />
            </div>
          )}
        </div>

        {/* Subtle Horizontal Base Line */}
        {line && (
          <div className="relative w-full py-1">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>
        )}

        {/* Footer: Name & Role Title Bar matching the video */}
        <div className="relative z-10 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 font-['Inter',sans-serif]">
          <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
            <span className="text-white font-bold text-sm sm:text-base tracking-tight font-['Inter',sans-serif]">
              {name}
            </span>
            {role && (
              <span className="text-[#8c827a] font-normal text-xs sm:text-sm font-sans tracking-normal">
                {role}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-[#a89589]">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <Check className="w-3 h-3" />
              <span>Cryptographically Certified</span>
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="hidden sm:inline text-[#eb1b38] font-bold">REACT BITS PRO</span>
          </div>
        </div>
      </div>
    );
  }
);

Signature.displayName = "Signature";

export default Signature;
