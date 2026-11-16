/* eslint-disable */
// Text String — Originkit
"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/* ------------------------------------------------------------------ types */

export interface TextStringFont {
  fontFamily?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  fontStyle?: string;
  lineHeight?: number | string;
  letterSpacing?: number | string;
}

export interface TextStringTransition {
  type?: string;
  stiffness?: number;
  damping?: number;
  mass?: number;
  duration?: number;
  delay?: number;
  ease?: string | number[];
}

export interface TextStringPhysics {
  unravel?: number;
  gravity?: number;
  slack?: number;
  bounce?: number;
}

export interface TextStringInteraction {
  smoothing?: number;
  reverse?: boolean;
  tapToBreak?: boolean;
}

export interface TextStringProps {
  background?: string;
  text?: string;
  font?: TextStringFont;
  textColor?: string;
  highlightWords?: string[];
  highlightColor?: string;
  columnWidth?: number;
  offset?: number;
  physics?: TextStringPhysics;
  transition?: TextStringTransition;
  interaction?: TextStringInteraction;
  align?: "left" | "center";
  style?: CSSProperties;
  className?: string;
}

interface Letter {
  ch: string;
  w: number;
  x: number;
  y: number;
  ox: number;
  oy: number;
  px: number;
  py: number;
  locked: boolean;
  vx: number;
  vy: number;
  ht: number;
  hx: number;
  hy: number;
  tx: number;
  ty: number;
  color: string;
}

interface Sim {
  letters: Letter[];
  rest: number[];
  reading: number[];
  chars: string[];
  severed: Uint8Array;
  lineHeight: number;
  radius: number;
}

/* -------------------------------------------------------------- constants */

const FIXED_DT = 1 / 120;
const MAX_STEPS = 4;
const ITERATIONS = 12;
const DAMPING = 0.97;
const MARGIN = 10;
const TAP_SLOP = 8;
const TAP_TIMEOUT = 700;

const DEFAULTS = {
  background: "transparent",
  text: "Create with intention.\nExplore without limits.\nTurn simple ideas into experiences.\nKeep moving forward.\nLet the work speak for itself.",
  font: {
    variant: "Bold",
    fontSize: "16px",
    textAlign: "left",
    fontFamily: "Inter",
    fontWeight: 700,
    lineHeight: "1.75em",
    letterSpacing: 0,
  } as TextStringFont,
  textColor: "#d6c8bc",
  highlightColor: "#eb1b38",
  columnWidth: 580,
  offset: 4,
  physics: { unravel: 5, gravity: 5, slack: 5, bounce: 5 },
  transition: {
    ease: [0.44, 0, 0.56, 1],
    type: "tween",
    delay: 0,
    duration: 0.4,
  } as TextStringTransition,
  interaction: { smoothing: 6, reverse: true, tapToBreak: true },
};

/* -------------------------------------------------------------- internals */

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function merge<T extends object>(value: T | undefined, fallback: T): T {
  return { ...fallback, ...(value || {}) };
}

function normalizeText(raw: string): string {
  return raw
    .replace(/\r\n?|\u2028|\u2029/g, "\n")
    .replace(/[\t\v\f\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, " ")
    .replace(/[\u200B\uFEFF\u00AD]/g, "")
    .replace(/ {2,}/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isBreak(ch: string): boolean {
  return ch === " " || ch === "\n";
}

function toPx(value: unknown, base: number, fallback: number): number {
  if (typeof value === "number") return isFinite(value) ? value : fallback;
  if (typeof value === "string") {
    const num = parseFloat(value);
    if (!isFinite(num)) return fallback;
    if (/r?em\s*$/.test(value)) return num * base;
    if (/%\s*$/.test(value)) return (num / 100) * base;
    return num;
  }
  return fallback;
}

function toLineHeight(value: unknown, fontSize: number): number {
  if (value === undefined || value === null || value === "") {
    return fontSize * 1.6;
  }
  if (typeof value === "number") {
    return isFinite(value) ? (value <= 4 ? value * fontSize : value) : fontSize * 1.6;
  }
  const num = parseFloat(String(value));
  if (!isFinite(num)) return fontSize * 1.6;
  if (/px\s*$/.test(String(value))) return num;
  if (/r?em\s*$/.test(String(value))) return num * fontSize;
  if (/%\s*$/.test(String(value))) return (num / 100) * fontSize;
  return num <= 4 ? num * fontSize : num;
}

function toWeight(value: unknown): string {
  if (typeof value === "number" && isFinite(value)) return String(value);
  if (typeof value === "string") {
    const v = value.trim();
    if (/^\d{3}$/.test(v) || v === "normal" || v === "bold") return v;
  }
  return "700";
}

function cubicBezier(x1: number, y1: number, x2: number, y2: number): (x: number) => number {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const dx = sampleX(t) - x;
      if (Math.abs(dx) < 1e-5) break;
      const slope = slopeX(t);
      if (Math.abs(slope) < 1e-6) break;
      t -= dx / slope;
    }
    return sampleY(clamp(t, 0, 1));
  };
}

const NAMED_EASES: Record<string, [number, number, number, number]> = {
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
};

interface HomeMotion {
  spring: boolean;
  stiffness: number;
  damping: number;
  mass: number;
  duration: number;
  delay: number;
  ease: (t: number) => number;
}

const LINEAR = (t: number) => t;

function resolveHome(transition: TextStringTransition): HomeMotion {
  const raw = transition.ease;
  let ease = LINEAR;
  if (Array.isArray(raw) && raw.length === 4) {
    ease = cubicBezier(raw[0], raw[1], raw[2], raw[3]);
  } else if (typeof raw === "string" && NAMED_EASES[raw]) {
    const [a, b, c, d] = NAMED_EASES[raw];
    ease = cubicBezier(a, b, c, d);
  } else if (transition.type === "tween") {
    const [a, b, c, d] = NAMED_EASES.easeInOut;
    ease = cubicBezier(a, b, c, d);
  }
  return {
    spring: transition.type !== "tween",
    stiffness: clamp(transition.stiffness ?? 400, 1, 5000),
    damping: clamp(transition.damping ?? 40, 0, 500),
    mass: clamp(transition.mass ?? 1, 0.1, 20),
    duration: clamp(transition.duration ?? 0.4, 0.01, 20),
    delay: clamp(transition.delay ?? 0, 0, 10),
    ease,
  };
}

type SegmenterCtor = new (
  locales?: string,
  options?: { granularity: "grapheme" }
) => { segment(input: string): Iterable<{ segment: string }> };

function segment(text: string): string[] {
  const Seg = (Intl as unknown as { Segmenter?: SegmenterCtor }).Segmenter;
  if (typeof Seg === "function") {
    const seg = new Seg(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

interface Position {
  x: number;
  y: number;
  w: number;
  line: number;
}

function layoutPositions(
  graphemes: string[],
  widths: number[],
  wrapWidth: number,
  lineHeight: number
): { positions: Position[]; lineCount: number } {
  const positions: Position[] = [];
  let x = 0;
  let line = 0;

  for (let i = 0; i < graphemes.length; i++) {
    const w = widths[i];

    if (graphemes[i] === "\n") {
      positions.push({ x, y: line * lineHeight, w: 0, line });
      x = 0;
      line++;
      continue;
    }

    if (graphemes[i] === " " && x > 0) {
      let wordW = 0;
      for (let j = i + 1; j < graphemes.length && !isBreak(graphemes[j]); j++) {
        wordW += widths[j];
      }
      if (x + w + wordW > wrapWidth) {
        positions.push({ x, y: line * lineHeight, w, line });
        x = 0;
        line++;
        continue;
      }
    } else if (x > 0 && x + w > wrapWidth) {
      x = 0;
      line++;
    }

    positions.push({ x, y: line * lineHeight, w, line });
    x += w;
  }

  return { positions, lineCount: line + 1 };
}

function buildSnake(positions: Position[], lineCount: number): number[] {
  const lines: number[][] = Array.from({ length: lineCount }, () => []);
  for (let i = 0; i < positions.length; i++) lines[positions[i].line].push(i);

  const flipEven = (lineCount - 1) % 2 === 1;
  const order: number[] = [];
  for (let li = 0; li < lineCount; li++) {
    const reversed = flipEven ? li % 2 === 0 : li % 2 === 1;
    const indices = lines[li];
    if (reversed) {
      for (let i = indices.length - 1; i >= 0; i--) order.push(indices[i]);
    } else {
      for (let i = 0; i < indices.length; i++) order.push(indices[i]);
    }
  }
  return order;
}

function columnLeft(rootW: number, columnWidth: number, align: "left" | "center" = "left"): number {
  if (align === "left") return 0;
  const colW = Math.min(columnWidth, Math.max(160, rootW - 32));
  return (rootW - colW) / 2 + MARGIN;
}

function stageSize(root: HTMLElement): { w: number; h: number } {
  const rootW = root.clientWidth || 0;
  const rootH = root.clientHeight || 0;
  return { w: rootW, h: Math.max(rootH, 320) };
}

function wrapWidth(rootW: number, columnWidth: number, align: "left" | "center" = "left"): number {
  if (align === "left") {
    return Math.max(160, Math.min(columnWidth, rootW));
  }
  const colW = Math.min(columnWidth, Math.max(160, rootW - 32));
  return Math.max(40, colW - MARGIN * 2);
}

/* ------------------------------------------------------------- component */

export function TextString(props: TextStringProps) {
  const background = props.background ?? DEFAULTS.background;
  const physics = merge(props.physics, DEFAULTS.physics);
  const transition = merge(props.transition, DEFAULTS.transition);
  const interaction = merge(props.interaction, DEFAULTS.interaction);

  const text = normalizeText(props.text ?? DEFAULTS.text);
  const color = props.textColor || DEFAULTS.textColor;
  const highlightWords = props.highlightWords || [];
  const highlightColor = props.highlightColor || DEFAULTS.highlightColor;
  const columnWidth = props.columnWidth ?? DEFAULTS.columnWidth;
  const offset = props.offset ?? DEFAULTS.offset;
  const align = props.align || "left";

  const font = merge(props.font, DEFAULTS.font);
  const fontFamily = font.fontFamily || "Inter, sans-serif";
  const fontSize = toPx(font.fontSize, 16, 16);
  const fontWeight = toWeight(font.fontWeight);
  const fontStyle = font.fontStyle === "italic" ? "italic" : "normal";
  const requestedLineHeight = toLineHeight(font.lineHeight, fontSize);
  const lineHeight = Math.max(fontSize * 1.1, requestedLineHeight);
  const letterSpacing = toPx(font.letterSpacing, fontSize, 0);
  const cssFont = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const simRef = useRef<Sim | null>(null);
  const relayoutRef = useRef<(() => void) | null>(null);

  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const wheelRef = useRef(0);
  const pageScrollsRef = useRef(true);
  const cutRef = useRef(Number.POSITIVE_INFINITY);

  const [glyphs, setGlyphs] = useState<string[]>([]);

  const tuning = useRef({
    unravel: 0,
    gravity: 0,
    bounce: 0,
    smoothing: 0,
    sweep: 1,
    reverse: true,
    tapToBreak: true,
    home: resolveHome(DEFAULTS.transition),
  });

  tuning.current = {
    unravel: 0.3 + (clamp(physics.unravel ?? 5, 0, 10) / 10) * 1.8,
    gravity: (clamp(physics.gravity ?? 5, 0, 10) / 10) * 0.3,
    bounce: (clamp(physics.bounce ?? 5, 0, 10) / 10) * 0.8,
    smoothing: 1 / (1 + clamp(interaction.smoothing ?? 6, 0, 10) * 1.2),
    sweep: 0.3 + (clamp(interaction.smoothing ?? 6, 0, 10) / 10) * 2.7,
    reverse: interaction.reverse !== false,
    tapToBreak: interaction.tapToBreak !== false,
    home: resolveHome(transition),
  };

  /* ------------------------------------------------ build & measurement */

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.font = cssFont;

    const graphemes = segment(text);
    const measureGlyph = (g: string) => {
      if (g === "\n") return 0;
      const glyphWidth = ctx.measureText(g).width;
      return Math.max(glyphWidth, glyphWidth + letterSpacing);
    };
    const widths = graphemes.map(measureGlyph);
    const slackFactor = 1 + (clamp(physics.slack ?? 5, 0, 10) / 10) * 0.4;

    // Calculate highlighted letter indices
    const highlightIndices = new Set<number>();
    if (highlightWords.length > 0) {
      const upperText = text.toUpperCase();
      highlightWords.forEach((word) => {
        const upperWord = word.toUpperCase();
        let s = 0;
        while ((s = upperText.indexOf(upperWord, s)) !== -1) {
          for (let k = s; k < s + upperWord.length; k++) {
            highlightIndices.add(k);
          }
          s += upperWord.length;
        }
      });
    }

    const measure = (): { positions: Position[]; lineCount: number } => {
      const stage = stageSize(root);
      const rootW = stage.w || columnWidth;
      const rootH = stage.h;
      const { positions, lineCount } = layoutPositions(
        graphemes,
        widths,
        wrapWidth(rootW, columnWidth, align),
        lineHeight
      );
      const left = columnLeft(rootW, columnWidth, align);
      const blockH = lineCount * lineHeight;
      const top = Math.min(
        (rootH * clamp(offset, 0, 100)) / 100,
        Math.max(0, rootH - blockH)
      );
      for (let i = 0; i < positions.length; i++) {
        positions[i].x += left;
        positions[i].y += top;
      }
      return { positions, lineCount };
    };

    const { positions, lineCount } = measure();
    const order = buildSnake(positions, lineCount);

    const letters: Letter[] = order.map((ri) => {
      const p = positions[ri];
      const isHl = highlightIndices.has(ri);
      return {
        ch: graphemes[ri],
        w: p.w,
        x: p.x,
        y: p.y,
        ox: p.x,
        oy: p.y,
        px: p.x,
        py: p.y,
        locked: true,
        vx: 0,
        vy: 0,
        ht: 0,
        hx: p.x,
        hy: p.y,
        tx: NaN,
        ty: NaN,
        color: isHl ? highlightColor : color,
      };
    });

    const maxLink = lineHeight * 2;
    const rest: number[] = [];
    for (let i = 0; i < letters.length - 1; i++) {
      const a = letters[i];
      const b = letters[i + 1];
      const dist = Math.hypot(b.ox + b.w / 2 - (a.ox + a.w / 2), b.oy - a.oy);
      rest.push(Math.min(dist, maxLink) * slackFactor);
    }

    simRef.current = {
      letters,
      rest,
      reading: order,
      chars: graphemes,
      severed: new Uint8Array(Math.max(0, letters.length - 1)),
      lineHeight,
      radius: Math.max(3, fontSize * 0.35),
    };

    relayoutRef.current = () => {
      const sim = simRef.current;
      if (!sim) return;
      const next = measure().positions;
      for (let i = 0; i < sim.letters.length; i++) {
        const p = next[sim.reading[i]];
        const l = sim.letters[i];
        l.ox = p.x;
        l.oy = p.y;
        l.w = p.w;
        if (l.locked) {
          l.x = p.x;
          l.y = p.y;
          l.px = p.x;
          l.py = p.y;
          l.hx = p.x;
          l.hy = p.y;
          l.vx = 0;
          l.vy = 0;
        }
      }
    };

    cutRef.current = Number.POSITIVE_INFINITY;
    spansRef.current = new Array(letters.length).fill(null);
    for (const letter of letters) {
      letter.tx = NaN;
      letter.ty = NaN;
    }
    setGlyphs(letters.map((l) => (l.ch === "\n" ? "" : l.ch)));

    const ro = new ResizeObserver(() => relayoutRef.current?.());
    ro.observe(root);

    return () => {
      ro.disconnect();
      relayoutRef.current = null;
    };
  }, [
    text,
    cssFont,
    letterSpacing,
    lineHeight,
    columnWidth,
    offset,
    align,
    highlightWords,
    highlightColor,
    color,
    physics.slack,
  ]);

  /* -------------------------------------------------------- scroll input */

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measureScrollability = () => {
      const doc = document.documentElement;
      pageScrollsRef.current = doc.scrollHeight - window.innerHeight > 4;
    };
    measureScrollability();

    const fitStage = () => {
      const stage = stageRef.current;
      if (!stage) return;
      stage.style.height = `${stageSize(root).h}px`;
    };
    fitStage();

    const readProgress = () => {
      if (!pageScrollsRef.current) {
        targetRef.current = wheelRef.current;
        return;
      }
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // In-page section: start unravelling only when scrolling down past top third
      const startUnravel = vh * 0.25;
      const endUnravel = -rect.height * 0.7;
      const range = Math.max(100, startUnravel - endUnravel);
      targetRef.current = clamp((startUnravel - rect.top) / range, 0, 1);
    };

    readProgress();
    progressRef.current = targetRef.current;

    const onScroll = () => {
      pageScrollsRef.current = true;
      readProgress();
    };

    const onResize = () => {
      measureScrollability();
      fitStage();
      relayoutRef.current?.();
      readProgress();
    };

    const onWheel = (e: WheelEvent) => {
      if (pageScrollsRef.current) return;
      const height = stageRef.current?.clientHeight || 600;
      wheelRef.current = clamp(wheelRef.current + e.deltaY / (height * 1.5), 0, 1);
      targetRef.current = wheelRef.current;
      e.preventDefault();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    root.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      root.removeEventListener("wheel", onWheel);
    };
  }, []);

  /* ------------------------------------------------------- tap to break */

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let downX = 0;
    let downY = 0;
    let downAt = 0;
    let downId = -1;

    const breakNear = (localX: number, localY: number) => {
      const sim = simRef.current;
      if (!sim) return;
      const { letters, reading, chars, lineHeight: lh } = sim;

      let best = -1;
      let bestDist = Math.max(60, lh * 2.5);
      for (let i = 0; i < letters.length; i++) {
        const l = letters[i];
        if (!l.locked) continue;
        const d = Math.hypot(l.x + l.w / 2 - localX, l.y + lh / 2 - localY);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      if (best < 0) return;

      let start = reading[best];
      while (start > 0 && !isBreak(chars[start - 1])) start--;

      cutRef.current = Math.min(cutRef.current, start);
    };

    const onDown = (e: PointerEvent) => {
      downId = e.pointerId;
      downX = e.clientX;
      downY = e.clientY;
      downAt = e.timeStamp;
    };

    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== downId) return;
      downId = -1;
      if (!tuning.current.tapToBreak) return;
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > TAP_SLOP) {
        return;
      }
      if (e.timeStamp - downAt > TAP_TIMEOUT) return;
      const rect = (stageRef.current ?? root).getBoundingClientRect();
      breakNear(e.clientX - rect.left, e.clientY - rect.top);
    };

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);

    return () => {
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
    };
  }, []);

  /* ------------------------------------------------------ simulation loop */

  useEffect(() => {
    const root = rootRef.current;
    if (!root || glyphs.length === 0) return;

    let frame = 0;
    let last = -1;
    let accumulator = 0;
    let reached = 0;
    let front = Number.POSITIVE_INFINITY;
    let lastCut = -1;

    const buckets = new Map<number, number[]>();

    const simulate = (rootW: number, rootH: number) => {
      const sim = simRef.current;
      if (!sim) return;
      const { letters, rest, reading, severed, lineHeight: lh, radius } = sim;
      const n = letters.length;
      if (n === 0) return;
      const t = tuning.current;

      const freed = progressRef.current * t.unravel * n;
      const targetFront = n - 1 - clamp(freed, 0, n);
      const maxStep = (n / t.sweep) * FIXED_DT;
      if (!Number.isFinite(front)) front = n - 1;
      const prevFront = front;
      if (front > targetFront) {
        front = Math.max(targetFront, front - maxStep);
      } else if (front < targetFront) {
        front = Math.min(targetFront, front + maxStep);
      }

      if (t.reverse && front > prevFront && cutRef.current < n) {
        cutRef.current = Math.min(n, cutRef.current + maxStep);
        if (cutRef.current >= n) cutRef.current = Infinity;
      }

      const frontIdx = Math.round(front);
      const cutIdx = Math.round(Math.min(cutRef.current, n));

      if (cutIdx !== lastCut) {
        lastCut = cutIdx;
        for (let i = 0; i < n - 1; i++) {
          const a = reading[i] >= cutIdx;
          const b = reading[i + 1] >= cutIdx;
          severed[i] = a === b ? 0 : 1;
        }
      }

      for (let i = n - 1; i >= 0; i--) {
        const l = letters[i];
        if (i > frontIdx || reading[i] >= cutIdx) {
          if (l.locked) {
            l.locked = false;
            l.px = l.x;
            l.py = l.y - 0.5;
          }
        } else if (!l.locked) {
          l.locked = true;
          l.ht = 0;
          l.hx = l.x;
          l.hy = l.y;
          l.vx = clamp((l.x - l.px) / FIXED_DT, -1500, 1500);
          l.vy = clamp((l.y - l.py) / FIXED_DT, -1500, 1500);
        }
      }

      for (let i = 0; i < n; i++) {
        const l = letters[i];
        if (l.locked) {
          const home = t.home;
          l.ht += FIXED_DT;
          const elapsed = l.ht - home.delay;
          if (elapsed > 0) {
            if (home.spring) {
              const ax =
                (-home.stiffness * (l.x - l.ox) - home.damping * l.vx) / home.mass;
              const ay =
                (-home.stiffness * (l.y - l.oy) - home.damping * l.vy) / home.mass;
              l.vx += ax * FIXED_DT;
              l.vy += ay * FIXED_DT;
              l.x += l.vx * FIXED_DT;
              l.y += l.vy * FIXED_DT;
              if (
                Math.abs(l.x - l.ox) < 0.05 &&
                Math.abs(l.y - l.oy) < 0.05 &&
                Math.abs(l.vx) < 2 &&
                Math.abs(l.vy) < 2
              ) {
                l.x = l.ox;
                l.y = l.oy;
                l.vx = 0;
                l.vy = 0;
              }
            } else {
              const e = home.ease(clamp(elapsed / home.duration, 0, 1));
              l.x = l.hx + (l.ox - l.hx) * e;
              l.y = l.hy + (l.oy - l.hy) * e;
            }
          }
          l.px = l.x;
          l.py = l.y;
          continue;
        }
        const vx = (l.x - l.px) * DAMPING;
        const vy = (l.y - l.py) * DAMPING;
        l.px = l.x;
        l.py = l.y;
        l.x += vx;
        l.y += vy + t.gravity;
      }

      for (let iter = 0; iter < ITERATIONS; iter++) {
        for (let i = 0; i < n - 1; i++) {
          const a = letters[i];
          const b = letters[i + 1];
          if (a.locked && b.locked) continue;
          if (severed[i] === 1) continue;
          const dx = b.x + b.w / 2 - (a.x + a.w / 2);
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const diff = (dist - rest[i]) / dist;
          if (a.locked) {
            b.x -= dx * diff;
            b.y -= dy * diff;
          } else if (b.locked) {
            a.x += dx * diff;
            a.y += dy * diff;
          } else {
            a.x += dx * diff * 0.5;
            a.y += dy * diff * 0.5;
            b.x -= dx * diff * 0.5;
            b.y -= dy * diff * 0.5;
          }
        }
      }

      const cell = radius * 2;
      for (const bucket of buckets.values()) bucket.length = 0;
      for (let i = 0; i < n; i++) {
        const l = letters[i];
        if (l.locked) continue;
        const gx = Math.floor((l.x + l.w / 2) / cell);
        const gy = Math.floor((l.y + lh / 2) / cell);
        const key = (gx + 4096) * 16384 + (gy + 4096);
        let bucket = buckets.get(key);
        if (!bucket) {
          bucket = [];
          buckets.set(key, bucket);
        }
        bucket.push(i);
      }
      for (let i = 0; i < n; i++) {
        const a = letters[i];
        if (a.locked) continue;
        const acx = a.x + a.w / 2;
        const acy = a.y + lh / 2;
        const gx = Math.floor(acx / cell);
        const gy = Math.floor(acy / cell);
        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const bucket = buckets.get((gx + ox + 4096) * 16384 + (gy + oy + 4096));
            if (!bucket) continue;
            for (let k = 0; k < bucket.length; k++) {
              const j = bucket[k];
              if (j <= i || j - i === 1) continue;
              const b = letters[j];
              const dx = b.x + b.w / 2 - acx;
              const dy = b.y + lh / 2 - acy;
              const dist = Math.hypot(dx, dy) || 0.001;
              if (dist >= cell) continue;
              const push = ((cell - dist) / dist) * 0.5;
              a.x -= dx * push;
              a.y -= dy * push;
              b.x += dx * push;
              b.y += dy * push;
            }
          }
        }
      }

      const bounce = t.bounce;
      for (let i = 0; i < n; i++) {
        const l = letters[i];
        if (l.locked) continue;
        if (l.x < 0) {
          l.x = 0;
          l.px = l.x + (l.x - l.px) * bounce;
        }
        if (l.x + l.w > rootW) {
          l.x = rootW - l.w;
          l.px = l.x + (l.x - l.px) * bounce;
        }
        if (l.y < 0) {
          l.y = 0;
          l.py = l.y + (l.y - l.py) * bounce;
        }
        if (l.y + lh > rootH) {
          l.y = rootH - lh;
          l.py = l.y + (l.y - l.py) * bounce;
        }
      }
    };

    let inView = false;
    const render = (now: number) => {
      if (!inView) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(render);
      if (last < 0) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, MAX_STEPS * FIXED_DT);
      last = now;

      const t = tuning.current;
      let target = targetRef.current;
      if (!t.reverse) {
        reached = Math.max(reached, target);
        target = reached;
      } else {
        reached = target;
      }
      progressRef.current += (target - progressRef.current) * t.smoothing;

      accumulator += dt;
      const { w: rootW, h: rootH } = stageSize(root);
      while (accumulator >= FIXED_DT) {
        simulate(rootW, rootH);
        accumulator -= FIXED_DT;
      }

      const sim = simRef.current;
      if (!sim) return;
      const spans = spansRef.current;
      for (let i = 0; i < sim.letters.length; i++) {
        const l = sim.letters[i];
        if (Math.abs(l.x - l.tx) < 0.01 && Math.abs(l.y - l.ty) < 0.01) {
          continue;
        }
        l.tx = l.x;
        l.ty = l.y;
        const span = spans[i];
        if (span) {
          span.style.transform = `translate(${l.x.toFixed(2)}px, ${l.y.toFixed(2)}px)`;
        }
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !frame) {
          last = -1;
          frame = requestAnimationFrame(render);
        } else if (!inView && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "250px" }
    );
    io.observe(root);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [glyphs]);

  /* ----------------------------------------------------------- rendering */

  return (
    <div
      ref={rootRef}
      className={props.className}
      style={{
        position: "relative",
        width: "100%",
        minHeight: 340,
        background,
        userSelect: "none",
        WebkitUserSelect: "none",
        ...props.style,
      }}
    >
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          margin: -1,
          padding: 0,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {text}
      </span>

      <div
        ref={stageRef}
        aria-hidden="true"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: 340,
          overflow: "hidden",
        }}
      >
        {glyphs.map((ch, i) => {
          const l = simRef.current?.letters[i];
          const glyphColor = l ? l.color : color;
          return (
            <span
              key={i}
              ref={(el) => {
                spansRef.current[i] = el;
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                fontFamily,
                fontSize,
                fontWeight,
                fontStyle,
                lineHeight: `${lineHeight}px`,
                color: glyphColor,
                whiteSpace: "pre",
                pointerEvents: "auto",
                cursor: "pointer",
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default TextString;

