/* eslint-disable */
// Arc List - React Bits Pro
// A list of titles that turns along an arc beside an image preview
// Registry: @reactbits-starter/arc-list-tw

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";

export interface ArcListItem {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  badge?: string;
  code?: string;
  link?: string;
  skills?: Array<{
    name: string;
    level: number;
    note: string;
    icon?: string;
  }>;
  [key: string]: any;
}

export interface ArcListProps {
  items: ArcListItem[];
  orientation?: "vertical" | "horizontal" | "auto";
  imageSide?: "left" | "right" | "none";
  curve?: number; // 0 to 1, default 0.6
  spacing?: number; // default 80
  visible?: number; // default 3 items on each side
  fade?: number; // default 0.35
  shrink?: number; // default 0.12
  blur?: number; // default 0
  fontSize?: number; // default 22
  textColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  className?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  initialIndex?: number;
  onChange?: (item: ArcListItem, index: number) => void;
  renderPreview?: (activeItem: ArcListItem, activeIndex: number) => React.ReactNode;
}

export const ArcList: React.FC<ArcListProps> = ({
  items,
  orientation = "auto",
  imageSide = "left",
  curve = 0.6,
  spacing = 80,
  visible = 3,
  fade = 0.35,
  shrink = 0.12,
  blur = 0,
  fontSize = 22,
  textColor = "#a89589",
  activeColor = "#eb1b38",
  backgroundColor = "transparent",
  className,
  autoplay = false,
  autoplayInterval = 4500,
  initialIndex = 0,
  onChange,
  renderPreview,
}) => {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(0, initialIndex), Math.max(0, items.length - 1))
  );
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isWheelingRef = useRef(false);

  // Synchronize activeIndex when items array changes (e.g. category vs individual skills switch)
  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, Math.max(0, items.length - 1)));
  }, [items.length]);

  useEffect(() => {
    const checkResponsive = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 1024);
      }
    };
    checkResponsive();
    window.addEventListener("resize", checkResponsive);
    return () => window.removeEventListener("resize", checkResponsive);
  }, []);

  const effectiveOrientation = useMemo(() => {
    if (orientation === "auto") {
      return isMobile ? "horizontal" : "vertical";
    }
    return orientation;
  }, [orientation, isMobile]);

  const selectIndex = useCallback(
    (index: number) => {
      const normalized = Math.max(0, Math.min(items.length - 1, index));
      setActiveIndex(normalized);
      if (onChange && items[normalized]) {
        onChange(items[normalized], normalized);
      }
    },
    [items, onChange]
  );

  useEffect(() => {
    if (!autoplay || items.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % items.length;
        if (onChange && items[next]) onChange(items[next], next);
        return next;
      });
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, items, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        selectIndex(activeIndex - 1);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        selectIndex(activeIndex + 1);
      }
    },
    [activeIndex, selectIndex]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (isWheelingRef.current) return;
      if (Math.abs(e.deltaY) > 20) {
        isWheelingRef.current = true;
        if (e.deltaY > 0 && activeIndex < items.length - 1) {
          selectIndex(activeIndex + 1);
        } else if (e.deltaY < 0 && activeIndex > 0) {
          selectIndex(activeIndex - 1);
        }
        setTimeout(() => {
          isWheelingRef.current = false;
        }, 220);
      }
    },
    [activeIndex, items.length, selectIndex]
  );

  const activeItem = items[activeIndex] || items[0];

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      tabIndex={0}
      className={cn(
        "relative w-full rounded-3xl outline-none select-none overflow-hidden p-2 sm:p-4 md:p-6 transition-colors focus:ring-1 focus:ring-[#eb1b38]/30",
        className
      )}
      style={{ backgroundColor }}
      aria-label="Arc List View"
    >
      <div
        className={cn(
          "w-full flex items-center justify-between gap-6 lg:gap-10",
          effectiveOrientation === "horizontal"
            ? "flex-col justify-center"
            : imageSide === "right"
            ? "flex-col lg:flex-row-reverse"
            : "flex-col lg:flex-row"
        )}
      >
        {/* 1. PREVIEW CONTAINER */}
        {imageSide !== "none" && (
          <div className="w-full lg:w-[54%] flex items-center justify-center min-h-[400px] sm:min-h-[460px]">
            <AnimatePresence mode="wait">
              {renderPreview ? (
                <motion.div
                  key={`custom-preview-${activeIndex}-${activeItem?.title || ""}`}
                  initial={{ opacity: 0, scale: 0.96, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full"
                >
                  {renderPreview(activeItem, activeIndex)}
                </motion.div>
              ) : (
                <motion.div
                  key={`image-preview-${activeIndex}-${activeItem?.title || ""}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden border border-[#2b171c] shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-[#120d0f]/90 backdrop-blur-xl p-6 flex flex-col justify-between"
                >
                  {activeItem?.image && (
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                  )}
                  <div className="relative z-10 flex items-center justify-between">
                    {activeItem?.code && (
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#eb1b38] uppercase">
                        {activeItem.code}
                      </span>
                    )}
                    {activeItem?.badge && (
                      <span className="px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider text-[#d4beab] bg-white/5 border border-white/10">
                        {activeItem.badge}
                      </span>
                    )}
                  </div>
                  <div className="relative z-10 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold font-['Inter',sans-serif] text-white">
                      {activeItem?.title}
                    </h3>
                    {activeItem?.description && (
                      <p className="text-xs sm:text-sm text-[#a89589] line-clamp-3">
                        {activeItem.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* 2. ARC LIST (TITLES TURNING ALONG AN ARC) */}
        <div
          className={cn(
            "relative flex items-center justify-center",
            effectiveOrientation === "horizontal"
              ? "w-full h-[180px] overflow-hidden"
              : "w-full lg:w-[46%] h-[460px] sm:h-[500px]"
          )}
        >
          {/* Quick Step Buttons for Vertical Mode */}
          {effectiveOrientation === "vertical" && (
            <div className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
              <button
                type="button"
                onClick={() => selectIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="p-2 rounded-full bg-[#181013] hover:bg-[#2b171c] border border-[#3b1f25] text-white disabled:opacity-20 cursor-pointer transition-all active:scale-90 shadow-md"
                title="Previous Skill"
              >
                <ChevronUp className="w-4 h-4 text-[#eb1b38]" />
              </button>
              <button
                type="button"
                onClick={() => selectIndex(activeIndex + 1)}
                disabled={activeIndex === items.length - 1}
                className="p-2 rounded-full bg-[#181013] hover:bg-[#2b171c] border border-[#3b1f25] text-white disabled:opacity-20 cursor-pointer transition-all active:scale-90 shadow-md"
                title="Next Skill"
              >
                <ChevronDown className="w-4 h-4 text-[#eb1b38]" />
              </button>
            </div>
          )}

          {/* Curved Turning Titles Track */}
          <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            {items.map((item, idx) => {
              const offset = idx - activeIndex;
              if (Math.abs(offset) > visible) return null;

              const isActive = offset === 0;
              const maxDisplacement = 70 * curve;

              // Arc math:
              // Vertical: X shifts along a cosine curve away/towards the preview; titles rotate along the tangent
              const arcX =
                effectiveOrientation === "vertical"
                  ? (imageSide === "left" ? 1 : -1) *
                    (1 - Math.cos((offset / (visible + 0.6)) * Math.PI)) *
                    maxDisplacement
                  : offset * (spacing * 1.6);

              const arcY =
                effectiveOrientation === "vertical"
                  ? offset * spacing
                  : (1 - Math.cos((offset / (visible + 0.6)) * Math.PI)) * (40 * curve);

              // Angular turn along the arc
              const rotateDeg =
                effectiveOrientation === "vertical"
                  ? offset * 5.5 * curve
                  : offset * -4 * curve;

              const itemScale = isActive
                ? 1.05
                : Math.max(0.68, 1 - Math.abs(offset) * shrink);

              const itemOpacity = isActive
                ? 1
                : Math.max(0.18, 1 - Math.abs(offset) * fade);

              const itemBlur = Math.abs(offset) * blur;

              return (
                <motion.div
                  key={`${item.title}-${idx}`}
                  onClick={() => selectIndex(idx)}
                  animate={{
                    x: arcX,
                    y: arcY,
                    rotate: rotateDeg,
                    scale: itemScale,
                    opacity: itemOpacity,
                    filter: itemBlur > 0 ? `blur(${itemBlur}px)` : "blur(0px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 270,
                    damping: 27,
                    mass: 0.75,
                  }}
                  className={cn(
                    "absolute cursor-pointer transition-colors duration-300 flex items-center gap-3.5 px-4 py-2.5 rounded-2xl group select-none",
                    isActive
                      ? "z-10 bg-[#1f1216]/90 border border-[#eb1b38]/60 shadow-[0_0_30px_rgba(235,27,56,0.3)] backdrop-blur-xl"
                      : "hover:bg-white/[0.04] border border-transparent"
                  )}
                  style={{
                    transformOrigin: effectiveOrientation === "vertical" ? "left center" : "center top",
                  }}
                >
                  {/* Glowing Pip indicator */}
                  <div
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300 shrink-0",
                      isActive
                        ? "bg-[#eb1b38] shadow-[0_0_12px_#eb1b38] scale-125 ring-2 ring-[#ff4a68]/40"
                        : "bg-white/20 group-hover:bg-white/40 scale-75"
                    )}
                  />

                  {/* Title & Metadata */}
                  <div className="flex flex-col text-left">
                    {item.code && (
                      <span
                        className={cn(
                          "text-[10px] font-mono font-bold tracking-widest uppercase transition-colors",
                          isActive ? "text-[#eb1b38]" : "text-[#786b68] group-hover:text-[#a89589]"
                        )}
                      >
                        {item.code}
                      </span>
                    )}

                    <span
                      className={cn(
                        "font-bold font-['Inter',sans-serif] tracking-tight transition-all duration-300",
                        isActive
                          ? "text-white drop-shadow-[0_0_16px_rgba(235,27,56,0.35)]"
                          : "text-[#a89589] group-hover:text-white"
                      )}
                      style={{
                        fontSize: `${fontSize}px`,
                        lineHeight: "1.25",
                      }}
                    >
                      {item.title}
                    </span>

                    {item.badge && (
                      <span className="text-[10px] font-mono text-[#8c7b74] mt-0.5">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcList;
