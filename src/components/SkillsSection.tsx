import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Orbit,
  LayoutGrid,
  Sparkles,
  Zap,
  BatteryLow,
  ExternalLink,
  Layers,
  Code2,
  Compass,
} from "lucide-react";
import SphereGallery3D, { GalleryItem } from "./ui/sphere-gallery-3d";
import ArcList, { ArcListItem } from "./ui/arc-list";
import { LEDTicker } from "./ui/pixel-led-display";
import { cn } from "@/lib/utils";
import { usePerformanceTier } from "@/utils/performance";

export interface TechSkillItem extends GalleryItem {
  id: string;
  name: string;
  category: "languages" | "frontend" | "backend" | "tools";
  categoryLabel: string;
  icon: string;
  desc: string;
}

export const TECH_SKILLS: TechSkillItem[] = [
  // 1. Core / Programming Languages
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    categoryLabel: "CORE LANGUAGE",
    icon: "/images/tech/javascript.svg",
    image: "/images/tech/javascript.svg",
    desc: "ES6+, Async/Await, Prototypes & DOM",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    id: "java",
    name: "Java",
    category: "languages",
    categoryLabel: "CORE LANGUAGE",
    icon: "/images/tech/java.svg",
    image: "/images/tech/java.svg",
    desc: "OOP, Multithreading & Collections",
    link: "https://www.java.com",
  },
  {
    id: "python",
    name: "Python",
    category: "languages",
    categoryLabel: "CORE LANGUAGE",
    icon: "/images/tech/python.svg",
    image: "/images/tech/python.svg",
    desc: "Scripting, Automation & Algorithms",
    link: "https://www.python.org",
  },
  {
    id: "c",
    name: "C",
    category: "languages",
    categoryLabel: "SYSTEMS",
    icon: "/images/tech/c.svg",
    image: "/images/tech/c.svg",
    desc: "Pointers, Memory Allocation & Foundations",
    link: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  {
    id: "cpp",
    name: "C++",
    category: "languages",
    categoryLabel: "SYSTEMS / DSA",
    icon: "/images/tech/cpp.svg",
    image: "/images/tech/cpp.svg",
    desc: "Object-Oriented & High-Performance Logic",
    link: "https://isocpp.org",
  },
  {
    id: "sql",
    name: "SQL",
    category: "languages",
    categoryLabel: "RELATIONAL DB",
    icon: "/images/tech/sql.svg",
    image: "/images/tech/sql.svg",
    desc: "Queries, Joins, Normalization & Schemas",
    link: "https://en.wikipedia.org/wiki/SQL",
  },

  // 2. Frontend
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    categoryLabel: "FRONTEND",
    icon: "/images/tech/react.svg",
    image: "/images/tech/react.svg",
    desc: "Hooks, Context API & Component Architecture",
    link: "https://react.dev",
  },
  {
    id: "html5",
    name: "HTML5",
    category: "frontend",
    categoryLabel: "SEMANTIC WEB",
    icon: "/images/tech/html5.svg",
    image: "/images/tech/html5.svg",
    desc: "Semantic Structure, Canvas & Modern Standards",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    id: "css3",
    name: "CSS3",
    category: "frontend",
    categoryLabel: "STYLING & LAYOUT",
    icon: "/images/tech/css3.svg",
    image: "/images/tech/css3.svg",
    desc: "Flexbox, CSS Grid, Responsive Design & Animation",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },

  // 3. Backend, Cloud & Database
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    categoryLabel: "RUNTIME",
    icon: "/images/tech/nodejs.svg",
    image: "/images/tech/nodejs.svg",
    desc: "Non-blocking I/O & Microservices",
    link: "https://nodejs.org",
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    categoryLabel: "BACKEND FRAMEWORK",
    icon: "/images/tech/express.svg",
    image: "/images/tech/express.svg",
    desc: "Routing, Middleware Architecture & Controllers",
    link: "https://expressjs.com",
  },
  {
    id: "restapi",
    name: "RESTful APIs",
    category: "backend",
    categoryLabel: "API ARCHITECTURE",
    icon: "/images/tech/restapi.svg",
    image: "/images/tech/restapi.svg",
    desc: "CRUD Endpoints, Payload Validation & Auth",
    link: "https://restfulapi.net",
  },
  {
    id: "firebase",
    name: "Firebase Auth",
    category: "backend",
    categoryLabel: "CLOUD SECURITY",
    icon: "/images/tech/firebase.svg",
    image: "/images/tech/firebase.svg",
    desc: "OAuth, JWT Validation & Role Security",
    link: "https://firebase.google.com",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "backend",
    categoryLabel: "NOSQL DATABASE",
    icon: "/images/tech/mongodb.svg",
    image: "/images/tech/mongodb.svg",
    desc: "Document Modeling, Mongoose & Aggregations",
    link: "https://www.mongodb.com",
  },

  // 4. Extended Development Tools
  {
    id: "typescript",
    name: "TypeScript",
    category: "tools",
    categoryLabel: "STATIC TYPING",
    icon: "/images/tech/typescript.svg",
    image: "/images/tech/typescript.svg",
    desc: "Type Safety, Interfaces & Compiler Tooling",
    link: "https://www.typescriptlang.org",
  },
  {
    id: "git",
    name: "Git",
    category: "tools",
    categoryLabel: "VERSION CONTROL",
    icon: "/images/tech/git.svg",
    image: "/images/tech/git.svg",
    desc: "Branching Models, Stashing & Distributed Repos",
    link: "https://git-scm.com",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "tools",
    categoryLabel: "MODERN CSS",
    icon: "/images/tech/tailwind.svg",
    image: "/images/tech/tailwind.svg",
    desc: "Utility-First Design, JIT Compiler & Ergonomics",
    link: "https://tailwindcss.com",
  },
];

interface MatrixCategory {
  title: string;
  code: string;
  badge: string;
  skills: {
    name: string;
    level: number;
    note: string;
    icon?: string;
  }[];
}

const MATRIX_CATEGORIES: MatrixCategory[] = [
  {
    title: "Programming & Core Languages",
    code: "01 // CORE LANGUAGES",
    badge: "FOUNDATIONS",
    skills: [
      { name: "JavaScript (ES6+)", level: 95, note: "DOM, Async/Await, Prototypes & Event Loop", icon: "/images/tech/javascript.svg" },
      { name: "Java", level: 88, note: "OOP, Collections Framework, Multithreading", icon: "/images/tech/java.svg" },
      { name: "Python", level: 84, note: "Scripting, Automation, AI Integration", icon: "/images/tech/python.svg" },
      { name: "C & C++", level: 80, note: "Pointers, Memory Allocation, DSA Fundamentals", icon: "/images/tech/c.svg" },
      { name: "SQL", level: 88, note: "Relational Queries, Joins, Schema Normalization", icon: "/images/tech/sql.svg" },
    ],
  },
  {
    title: "Frontend Engineering",
    code: "02 // FRONTEND CRAFT",
    badge: "CLIENT-SIDE",
    skills: [
      { name: "React.js", level: 94, note: "Hooks, Context API, Component Lifecycle, Virtual DOM", icon: "/images/tech/react.svg" },
      { name: "HTML5 & Semantic Web", level: 98, note: "Semantic Structure, Canvas & Accessibility", icon: "/images/tech/html5.svg" },
      { name: "CSS3 & Tailwind CSS", level: 95, note: "Flexbox, CSS Grid, Responsive Design & Animations", icon: "/images/tech/tailwind.svg" },
      { name: "Component Libraries (npm)", level: 90, note: "Authoring, Packaging & Publishing to npm", icon: "/images/tech/react.svg" },
    ],
  },
  {
    title: "Backend, Cloud & Databases",
    code: "03 // BACKEND & DATA",
    badge: "SERVER-SIDE",
    skills: [
      { name: "Node.js & Express.js", level: 92, note: "RESTful API Architecture, Middleware & Routing", icon: "/images/tech/nodejs.svg" },
      { name: "MongoDB", level: 90, note: "Document Modeling, Mongoose ODM, Aggregations", icon: "/images/tech/mongodb.svg" },
      { name: "Firebase Authentication", level: 92, note: "OAuth, JWT Validation, Role-Based Security", icon: "/images/tech/firebase.svg" },
      { name: "RESTful APIs", level: 94, note: "Resource Modeling, HTTP Codes, Payloads", icon: "/images/tech/restapi.svg" },
    ],
  },
  {
    title: "Developer Tooling & Systems",
    code: "04 // SYSTEMS & TOOLS",
    badge: "DEVOPS & AI",
    skills: [
      { name: "TypeScript", level: 88, note: "Static Types, Generics, Interfaces & Compiler Tooling", icon: "/images/tech/typescript.svg" },
      { name: "Git, GitHub & npm", level: 95, note: "Version Control, Semantic Versioning, Package Deployment", icon: "/images/tech/git.svg" },
      { name: "Vite, Postman & DevTools", level: 92, note: "Modern Bundling, REST API Testing & Profiling", icon: "/images/tech/git.svg" },
    ],
  },
];

export const SkillsSection: React.FC = () => {
  const { sphere, isLowPowerMode, isLowBattery, prefersReducedMotion } = usePerformanceTier();

  // Primary toggle: 3D Orbit Sphere vs Skill Matrix
  const [viewMode, setViewMode] = useState<"orbit" | "matrix">(() =>
    prefersReducedMotion ? "matrix" : "orbit"
  );

  // Skill Matrix presentation sub-mode: Arc List (Default) or Expanded Grid
  const [matrixDisplayMode, setMatrixDisplayMode] = useState<"arc" | "grid">("arc");

  // In Arc List, switch between Categories (4 Domains) or All Individual Skills (16 Items)
  const [arcFilter, setArcFilter] = useState<"categories" | "all">("categories");

  // Format 4 Categories as ArcList items
  const categoryArcItems: ArcListItem[] = React.useMemo(() => {
    return MATRIX_CATEGORIES.map((cat) => {
      const avg = Math.round(
        cat.skills.reduce((acc, s) => acc + s.level, 0) / cat.skills.length
      );
      return {
        title: cat.title,
        code: cat.code,
        badge: cat.badge,
        skills: cat.skills,
        description: `${cat.skills.length} core technologies â€¢ ${avg}% Domain Mastery`,
        avgLevel: avg,
      };
    });
  }, []);

  // Format individual skills as ArcList items
  const individualArcItems: ArcListItem[] = React.useMemo(() => {
    return TECH_SKILLS.map((skill) => {
      let level = 90;
      let note = skill.desc;
      for (const cat of MATRIX_CATEGORIES) {
        const found = cat.skills.find(
          (s) =>
            s.name.toLowerCase().includes(skill.name.toLowerCase()) ||
            skill.name.toLowerCase().includes(s.name.toLowerCase())
        );
        if (found) {
          level = found.level;
          note = found.note;
          break;
        }
      }
      return {
        title: skill.name,
        code: skill.categoryLabel,
        badge: `${level}% PROFICIENCY`,
        image: skill.icon,
        description: note,
        link: skill.link,
        level,
        category: skill.category,
      };
    });
  }, []);

  // Active items for Arc List
  const activeArcItems = arcFilter === "categories" ? categoryArcItems : individualArcItems;

  return (
    <section
      id="skills"
      className="relative w-full bg-black text-[#f5ece3] pt-2 sm:pt-3 pb-8 sm:pb-12 overflow-hidden flex flex-col items-center select-none"
    >
      {/* 1. Ultra-slim edge-to-edge Pixel LED Ticker at Top */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full h-8 sm:h-9 flex items-center justify-center border-b border-[#241a1a]/30 mb-2 sm:mb-4"
      >
        <LEDTicker
          items={["Technical Skills", "MERN Stack", "RESTful APIs", "react-status-kit", "Open-Source npm"]}
          separator="â— "
          speed={prefersReducedMotion ? 0 : 22}
          textSize={34}
          dotSize={5}
          dotQuantity={10}
          onColor="#ff263e"
          offColor="transparent"
          glow={true}
          glowOptions={{ strength: 80, size: 8 }}
          flicker={false}
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>

      {/* Subtle Background Glows matching Black & Crimson Palette */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[550px] rounded-full blur-[190px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, rgba(235, 27, 56, 0.45) 0%, rgba(120, 20, 30, 0.2) 45%, transparent 70%)",
        }}
      />

      {/* 2. Interactive View Switcher Controls (Dual View Mode) with Dynamic Eco Status */}
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#140d0e]/95 border border-[#2b171c] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
          <button
            type="button"
            onClick={() => setViewMode("orbit")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer select-none active:scale-95",
              viewMode === "orbit"
                ? "bg-gradient-to-r from-[#eb1b38] to-[#c7122b] text-white shadow-[0_0_18px_rgba(235,27,56,0.5)] border border-[#ff4a68]/40"
                : "text-[#a89589] hover:text-[#f5ece3] hover:bg-white/5"
            )}
            title="Switch to 3D Orbit View"
          >
            <Orbit
              className={cn(
                "w-3.5 h-3.5",
                viewMode === "orbit" && !prefersReducedMotion ? "animate-spin" : ""
              )}
              style={{ animationDuration: "12s" }}
            />
            <span>3D ORBIT VIEW</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("matrix")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer select-none active:scale-95",
              viewMode === "matrix"
                ? "bg-gradient-to-r from-[#eb1b38] to-[#c7122b] text-white shadow-[0_0_18px_rgba(235,27,56,0.5)] border border-[#ff4a68]/40"
                : "text-[#a89589] hover:text-[#f5ece3] hover:bg-white/5"
            )}
            title="Switch to Skill Matrix View (Arc List)"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>SKILL MATRIX VIEW</span>
          </button>
        </div>

        {/* Dynamic 60FPS Battery / Reduced Motion Indicator */}
        {isLowPowerMode && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161012] border border-[#3b1f25] text-[10px] font-mono text-[#d4beab] backdrop-blur-md animate-in fade-in duration-300">
            {isLowBattery ? (
              <BatteryLow className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : prefersReducedMotion ? (
              <Sparkles className="w-3.5 h-3.5 text-[#eb1b38] shrink-0" />
            ) : (
              <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            )}
            <span>
              {isLowBattery
                ? "BATTERY SAVER (AUTO 60FPS)"
                : prefersReducedMotion
                ? "REDUCED MOTION ACTIVE"
                : "60FPS ECO TUNED"}
            </span>
          </div>
        )}
      </div>

      {/* 3. Sub-controls for Matrix View (Arc List vs Grid Switcher & Filters) */}
      {viewMode === "matrix" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-20 flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-5 sm:mb-7 px-4"
        >
          {/* Display Mode: Arc List vs Full Grid */}
          <div className="flex items-center gap-1 p-0.5 rounded-full bg-[#161012] border border-[#2b171c] text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setMatrixDisplayMode("arc")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200 cursor-pointer",
                matrixDisplayMode === "arc"
                  ? "bg-[#eb1b38] text-white font-bold shadow-[0_0_12px_rgba(235,27,56,0.4)]"
                  : "text-[#a89589] hover:text-white"
              )}
            >
              <Compass className="w-3 h-3" />
              <span>ARC LIST VIEW</span>
            </button>
            <button
              type="button"
              onClick={() => setMatrixDisplayMode("grid")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200 cursor-pointer",
                matrixDisplayMode === "grid"
                  ? "bg-[#eb1b38] text-white font-bold shadow-[0_0_12px_rgba(235,27,56,0.4)]"
                  : "text-[#a89589] hover:text-white"
              )}
            >
              <Layers className="w-3 h-3" />
              <span>FULL GRID VIEW</span>
            </button>
          </div>

          {/* If in Arc List View, allow filtering between 4 Domains or All 16 Skills */}
          {matrixDisplayMode === "arc" && (
            <div className="flex items-center gap-1 p-0.5 rounded-full bg-[#161012] border border-[#2b171c] text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setArcFilter("categories")}
                className={cn(
                  "px-3 py-1 rounded-full transition-all duration-200 cursor-pointer",
                  arcFilter === "categories"
                    ? "bg-white/10 text-white font-bold border border-white/15"
                    : "text-[#8c7b74] hover:text-white"
                )}
              >
                4 DOMAIN CLUSTERS
              </button>
              <button
                type="button"
                onClick={() => setArcFilter("all")}
                className={cn(
                  "px-3 py-1 rounded-full transition-all duration-200 cursor-pointer",
                  arcFilter === "all"
                    ? "bg-white/10 text-white font-bold border border-white/15"
                    : "text-[#8c7b74] hover:text-white"
                )}
              >
                ALL 16 SKILLS
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* 4. Dynamic View Container */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {viewMode === "orbit" ? (
            /* Mode A: 3D Orbit Sphere Gallery with Dynamic Hardware Scaling */
            <motion.div
              key="orbit-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full h-[380px] sm:h-[480px] md:h-[560px] lg:h-[620px] flex items-center justify-center"
            >
              <SphereGallery3D
                images={TECH_SKILLS}
                branches={isLowPowerMode ? TECH_SKILLS.length : TECH_SKILLS.length * 2}
                scale={sphere.scale}
                size={35}
                scatter={4}
                speed={sphere.speed}
                direction="counterclockwise"
                hover={200}
                rounded={20}
                background="transparent"
                core={{
                  coreSize: 20,
                  coreColor: "#eb1b38",
                  lineColor: "#eb1b3840",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "340px",
                  minWidth: "100%",
                }}
              />
            </motion.div>
          ) : matrixDisplayMode === "arc" ? (
            /* Mode B (Default for Skill Matrix): React Bits Pro ARC LIST Component */
            <motion.div
              key="matrix-arc-view"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full rounded-3xl border border-[#2b171c]/80 bg-[#0e090b]/80 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden p-2 sm:p-4"
            >
              <ArcList
                items={activeArcItems}
                orientation="auto"
                imageSide="left"
                curve={0.55}
                spacing={85}
                visible={3}
                fontSize={21}
                renderPreview={(activeItem) => {
                  // Render Category Domain Preview
                  if (activeItem.skills) {
                    return (
                      <div className="w-full rounded-2xl border border-[#2b171c] bg-[#120d0f]/95 backdrop-blur-xl p-5 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden group">
                        {/* Top Category Header */}
                        <div className="flex items-center justify-between border-b border-[#2b171c] pb-3 mb-5">
                          <div>
                            <span className="text-[11px] font-mono font-bold tracking-widest text-[#eb1b38] uppercase">
                              {activeItem.code}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold font-['Inter',sans-serif] text-white mt-0.5">
                              {activeItem.title}
                            </h3>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-[#d4beab] bg-white/5 border border-white/10">
                              {activeItem.badge}
                            </span>
                            {activeItem.avgLevel && (
                              <span className="text-[10px] font-mono font-bold text-[#eb1b38]">
                                {activeItem.avgLevel}% AVG MASTERY
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Skills List with Proficiency Bars */}
                        <div className="space-y-4">
                          {activeItem.skills.map((skill, sIdx) => (
                            <div key={sIdx} className="space-y-1.5 group/skill">
                              <div className="flex items-center justify-between text-xs sm:text-sm">
                                <div className="flex items-center gap-2.5">
                                  {skill.icon ? (
                                    <img
                                      src={skill.icon}
                                      alt={skill.name}
                                      className="w-4 h-4 sm:w-5 sm:h-5 object-contain filter drop-shadow"
                                      onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).style.display = "none";
                                      }}
                                    />
                                  ) : (
                                    <Sparkles className="w-4 h-4 text-[#eb1b38]" />
                                  )}
                                  <span className="font-semibold text-white font-['Inter',sans-serif] group-hover/skill:text-[#eb1b38] transition-colors">
                                    {skill.name}
                                  </span>
                                </div>
                                <span className="font-mono text-xs sm:text-sm font-bold text-[#eb1b38]">
                                  {skill.level}%
                                </span>
                              </div>

                              {/* Glowing Animated Progress Bar */}
                              <div className="h-1.5 w-full bg-[#1c1215] rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 0.9, delay: sIdx * 0.08, ease: "easeOut" }}
                                  className="h-full bg-gradient-to-r from-[#b31429] via-[#eb1b38] to-[#ff4a68] rounded-full shadow-[0_0_10px_rgba(235,27,56,0.7)]"
                                />
                              </div>

                              {/* Practical Engineering Note */}
                              <p className="text-[11px] sm:text-xs font-mono text-[#a89589] leading-tight">
                                {skill.note}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Interactive hint footer */}
                        <div className="mt-6 pt-3 border-t border-[#2b171c]/60 flex items-center justify-between text-[11px] font-mono text-[#8c7b74]">
                          <span>Scroll wheel or click arc titles to rotate</span>
                          <span className="text-[#eb1b38]">â€¢ Verified Skills</span>
                        </div>
                      </div>
                    );
                  }

                  // Render Individual Skill Preview Card
                  return (
                    <div className="w-full rounded-2xl border border-[#2b171c] bg-[#120d0f]/95 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden group">
                      <div className="flex items-center justify-between border-b border-[#2b171c] pb-4 mb-6">
                        <div className="flex items-center gap-3">
                          {activeItem.image && (
                            <div className="p-3 rounded-2xl bg-[#1c1216] border border-[#eb1b38]/30 shadow-[0_0_20px_rgba(235,27,56,0.25)]">
                              <img
                                src={activeItem.image}
                                alt={activeItem.title}
                                className="w-8 h-8 object-contain"
                              />
                            </div>
                          )}
                          <div>
                            <span className="text-[10px] font-mono font-bold tracking-widest text-[#eb1b38] uppercase">
                              {activeItem.code}
                            </span>
                            <h3 className="text-2xl font-bold font-['Inter',sans-serif] text-white">
                              {activeItem.title}
                            </h3>
                          </div>
                        </div>

                        {activeItem.badge && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#eb1b38] bg-[#eb1b38]/10 border border-[#eb1b38]/30 shadow-[0_0_12px_rgba(235,27,56,0.2)]">
                            {activeItem.badge}
                          </span>
                        )}
                      </div>

                      {/* Level Bar */}
                      {activeItem.level && (
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-[#a89589]">MASTERY BENCHMARK</span>
                            <span className="text-[#eb1b38] font-bold">{activeItem.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-[#1c1215] rounded-full overflow-hidden border border-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${activeItem.level}%` }}
                              transition={{ duration: 0.9, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-[#b31429] via-[#eb1b38] to-[#ff4a68] rounded-full shadow-[0_0_12px_rgba(235,27,56,0.7)]"
                            />
                          </div>
                        </div>
                      )}

                      {/* Engineering Context */}
                      <div className="space-y-2 mb-6">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#8c7b74]">
                          PRACTICAL EXPERIENCE & ARCHITECTURE
                        </h4>
                        <p className="text-sm font-mono text-[#d4beab] leading-relaxed">
                          {activeItem.description}
                        </p>
                      </div>

                      {/* Outbound Link & Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#2b171c]/60">
                        {activeItem.link ? (
                          <a
                            href={activeItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#eb1b38] hover:text-[#ff4a68] transition-colors"
                          >
                            <span>EXPLORE DOCUMENTATION</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-xs font-mono text-[#8c7b74]">Production Ready</span>
                        )}
                        <span className="text-[10px] font-mono text-[#8c7b74]">Click arc to rotate</span>
                      </div>
                    </div>
                  );
                }}
              />
            </motion.div>
          ) : (
            /* Mode C: Classic Expanded 2x2 Grid View */
            <motion.div
              key="matrix-grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full"
            >
              {MATRIX_CATEGORIES.map((category, catIdx) => (
                <div
                  key={catIdx}
                  className="rounded-2xl border border-[#2b171c] hover:border-[#eb1b38]/50 bg-[#120d0f]/90 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.85)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(235,27,56,0.18)] group"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-[#2b171c] pb-3 mb-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#eb1b38] uppercase">
                        {category.code}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-['Inter',sans-serif] text-white mt-0.5">
                        {category.title}
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider text-[#d4beab] bg-white/5 border border-white/10">
                      {category.badge}
                    </span>
                  </div>

                  {/* Skills List with Proficiency Bars */}
                  <div className="space-y-3.5">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1.5 group/skill">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            {skill.icon ? (
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-4 h-4 object-contain filter drop-shadow"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 text-[#eb1b38]" />
                            )}
                            <span className="font-semibold text-white font-['Inter',sans-serif] group-hover/skill:text-[#eb1b38] transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] font-bold text-[#eb1b38]">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Animated Progress Track */}
                        <div className="h-1.5 w-full bg-[#1c1215] rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.9, delay: sIdx * 0.08, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[#b31429] via-[#eb1b38] to-[#ff4a68] rounded-full shadow-[0_0_8px_rgba(235,27,56,0.6)]"
                          />
                        </div>

                        {/* Practical Engineering Note */}
                        <p className="text-[11px] font-mono text-[#a89589] leading-tight">
                          {skill.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection;
