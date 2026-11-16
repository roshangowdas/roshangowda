/* eslint-disable */
// Hover Image Reveal — Originkit

"use client";

import { useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type Transition as MotionTransition,
} from "framer-motion";

export interface HoverRevealItem {
  text?: string;
  subtitle?: string;
  category?: string;
  year?: string;
  tech?: string[];
  image?: { src?: string; srcSet?: string; alt?: string };
  link?: string;
  github?: string;
  npm?: string;
}

export interface ItemsValue {
  itemCount?: number;
  [key: string]: unknown;
}

const MAX_ITEMS = 6;

export interface FontValue {
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: number | string;
  letterSpacing?: number | string;
  lineHeight?: number | string;
  textAlign?: "left" | "center" | "right";
  [key: string]: unknown;
}

export interface HoverImageRevealProps {
  items?: ItemsValue;
  font?: FontValue;
  textColor?: string;
  dimColor?: string;
  align?: "left" | "center" | "right";
  rowGap?: number;
  imageWidth?: number;
  imageHeight?: number;
  rounded?: number;
  offsetX?: number;
  offsetY?: number;
  followStrength?: number;
  transition?: MotionTransition;
  backgroundColor?: string;
  style?: CSSProperties;
  onSelectProject?: (item: HoverRevealItem) => void;
}

// Exactly the 3 projects present in the resume
const DEFAULT_ITEMS_DATA: HoverRevealItem[] = [
  {
    text: "COMMUNITY RESOURCE SHARING PLATFORM",
    subtitle: "MERN Stack • MongoDB • Firebase Auth • 10 Secured REST APIs",
    category: "Full-Stack Web Architecture",
    year: "2026",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase Auth", "REST APIs"],
    image: {
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
      alt: "Community Resource Sharing Platform",
    },
    link: "https://github.com",
    github: "https://github.com",
  },
  {
    text: "REACT-STATUS-KIT",
    subtitle: "Open-Source React Component Library Published on Official npm Registry",
    category: "Open-Source Package",
    year: "2026",
    tech: ["React.js", "TypeScript", "npm Registry", "Rollup/Vite", "Semantic Versioning"],
    image: {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      alt: "react-status-kit npm package",
    },
    link: "https://www.npmjs.com/package/react-status-kit",
    github: "https://github.com",
    npm: "https://www.npmjs.com/package/react-status-kit",
  },
  {
    text: "AI-PETCARE",
    subtitle: "Interactive Pet Health Monitoring & Diagnostic Dashboard",
    category: "Dynamic Web Interface",
    year: "2025",
    tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Dashboard Analytics"],
    image: {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      alt: "AI-PetCare Interactive Health Dashboard",
    },
    link: "https://github.com",
    github: "https://github.com",
  },
];

const DEFAULT_ITEMS: ItemsValue = {
  itemCount: 3,
  item1: DEFAULT_ITEMS_DATA[0],
  item2: DEFAULT_ITEMS_DATA[1],
  item3: DEFAULT_ITEMS_DATA[2],
};

const DEFAULT_FONT: FontValue = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 800,
  fontSize: "clamp(20px, 3.2vw, 34px)",
  lineHeight: "1.25em",
  letterSpacing: "-0.025em",
  textAlign: "left",
};

const DEFAULT_TRANSITION: MotionTransition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 1,
};

const alignToFlex: Record<string, CSSProperties["alignItems"]> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};
const alignToText: Record<string, CSSProperties["textAlign"]> = {
  left: "left",
  center: "center",
  right: "right",
};

export default function HoverImageReveal({
  items = DEFAULT_ITEMS,
  font = DEFAULT_FONT,
  textColor = "#f5ece3",
  dimColor = "#473539",
  align = "left",
  rowGap = 16,
  imageWidth = 340,
  imageHeight = 220,
  rounded = 14,
  offsetX = 200,
  offsetY = -20,
  followStrength = 0,
  transition = DEFAULT_TRANSITION,
  backgroundColor = "transparent",
  style,
  onSelectProject,
}: HoverImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const stiffness = 60 + followStrength * 5;
  const springCfg = { stiffness, damping: 28, mass: 0.5 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  const data = items || DEFAULT_ITEMS;
  const count = Math.max(
    1,
    Math.min(MAX_ITEMS, (data.itemCount as number) || DEFAULT_ITEMS_DATA.length)
  );
  const list: HoverRevealItem[] = [];
  for (let i = 1; i <= count; i++) {
    const it = data[`item${i}`] as HoverRevealItem | undefined;
    const fallback = DEFAULT_ITEMS_DATA[i - 1];
    list.push({
      text: it?.text ?? fallback?.text ?? `Project ${i}`,
      subtitle: it?.subtitle ?? fallback?.subtitle,
      category: it?.category ?? fallback?.category,
      year: it?.year ?? fallback?.year,
      tech: it?.tech ?? fallback?.tech,
      image: it?.image ?? (fallback ? { src: fallback.image?.src } : undefined),
      link: it?.link ?? fallback?.link,
      github: it?.github ?? fallback?.github,
      npm: it?.npm ?? fallback?.npm,
    });
  }
  const anyActive = hovered != null;

  const onMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left + offsetX);
    rawY.set(e.clientY - rect.top + offsetY);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={() => setHovered(null)}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: alignToFlex[align],
        padding: "12px 0",
        boxSizing: "border-box",
        cursor: "default",
        ...(font as CSSProperties),
        ...style,
      }}
    >
      {/* Floating Cursor-Follow Image Card */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: imageWidth,
          height: imageHeight,
          borderRadius: rounded,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 30,
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.95), 0 0 35px rgba(235,27,56,0.35)",
          border: "1px solid rgba(235,27,56,0.5)",
          backgroundColor: "#120b0d",
        }}
        animate={{
          opacity: anyActive ? 1 : 0,
          scale: anyActive ? 1 : 0.85,
        }}
        transition={transition}
      >
        {list.map((item, i) => {
          const src = item.image?.src;
          const yPos =
            hovered == null
              ? "100%"
              : i < hovered
                ? "-100%"
                : i > hovered
                  ? "100%"
                  : "0%";
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ y: yPos }}
              transition={transition}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              {src ? (
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <img
                    src={src}
                    alt={item.image?.alt || item.text || ""}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
                    }}
                  />
                  {item.category && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 12,
                        left: 12,
                        right: 12,
                        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                        fontSize: "11px",
                        color: "#eb1b38",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.category}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(135deg,#241518,#0e080a)",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Project Rows */}
      <div
        onMouseLeave={() => setHovered(null)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: alignToFlex[align],
          width: "100%",
        }}
      >
        {list.map((item, i) => {
          const isHovered = hovered === i;
          const color = anyActive
            ? isHovered
              ? textColor
              : dimColor
            : textColor;

          const copyStyle: CSSProperties = {
            display: "block",
            color,
            transition: "color 0.25s ease",
            textAlign: alignToText[align],
            textTransform: "uppercase",
            lineHeight: 1.25,
            wordBreak: "break-word",
          };

          const inner = (
            <motion.div
              style={{ position: "relative" }}
              animate={{ y: isHovered ? "-100%" : "0%" }}
              transition={transition}
            >
              <span style={copyStyle}>{item.text}</span>
              <span
                aria-hidden
                style={{
                  ...copyStyle,
                  color: "#eb1b38",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                }}
              >
                {item.text}
              </span>
            </motion.div>
          );

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onClick={() => onSelectProject?.(item)}
              style={{
                width: "100%",
                padding: "20px 0",
                borderBottom: "1px solid rgba(212, 190, 171, 0.1)",
                cursor: "pointer",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              {/* Left Column: Number Index + Title + Subtitle */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: isHovered ? "#eb1b38" : "#776368",
                    marginTop: "3px",
                    transition: "color 0.25s ease",
                    flexShrink: 0,
                  }}
                >
                  0{i + 1}
                </span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Title Box with strict overflow: hidden so rolling text NEVER overlaps subtitle or other rows */}
                  <div style={{ overflow: "hidden", position: "relative", width: "100%" }}>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "block",
                        }}
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </div>

                  {/* Subtitle / Tech Tags: Cleanly positioned below title, no overlapping */}
                  {item.subtitle && (
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                        fontSize: "12px",
                        letterSpacing: "0.04em",
                        color: isHovered ? "#eb1b38" : "#a89589",
                        marginTop: "8px",
                        lineHeight: 1.4,
                        transition: "color 0.25s ease",
                      }}
                    >
                      {item.subtitle}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Year + Arrow indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexShrink: 0,
                  marginTop: "4px",
                }}
              >
                {item.year && (
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: "11px",
                      color: isHovered ? "#f5ece3" : "#665459",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      backgroundColor: isHovered ? "rgba(235, 27, 56, 0.15)" : "rgba(255, 255, 255, 0.03)",
                      border: isHovered ? "1px solid rgba(235, 27, 56, 0.4)" : "1px solid rgba(255, 255, 255, 0.06)",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {item.year}
                  </span>
                )}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: "14px",
                    color: isHovered ? "#eb1b38" : "#554347",
                    transition: "all 0.25s ease",
                    transform: isHovered ? "translate(2px, -2px)" : "none",
                  }}
                >
                  ↗
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}