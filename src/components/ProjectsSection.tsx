import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, X, Zap } from "lucide-react";
import HoverImageReveal, { HoverRevealItem, ItemsValue } from "./ui/hover-image-reveal";
import ReactStatusKitPlayground from "./ReactStatusKitPlayground";

const NpmIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
  </svg>
);

// Exactly and only the 3 projects present in the resume
const RESUME_PROJECTS: HoverRevealItem[] = [
  {
    text: "COMMUNITY RESOURCE SHARING PLATFORM",
    subtitle: "MERN Stack • MongoDB • Firebase Auth • 10 REST APIs",
    category: "Full-Stack Web Architecture",
    year: "2026",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase Authentication", "REST APIs"],
    image: {
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
      alt: "Community Resource Sharing Platform",
    },
    link: "https://github.com/roshangowdas",
    github: "https://github.com/roshangowdas",
  },
  {
    text: "REACT-STATUS-KIT",
    subtitle: "Open-Source React Component Library Published on npm",
    category: "Open-Source Package",
    year: "2026",
    tech: ["React.js", "TypeScript", "npm Registry", "Rollup/Vite", "Semantic Versioning"],
    image: {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      alt: "react-status-kit npm package",
    },
    link: "https://www.npmjs.com/~roshan__gowda",
    github: "https://github.com/roshangowdas",
    npm: "https://www.npmjs.com/~roshan__gowda",
  },
  {
    text: "AI-PETCARE",
    subtitle: "Interactive Pet Health Monitoring & Diagnostic Dashboard",
    category: "Diagnostic Interface",
    year: "2025",
    tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Dashboard Analytics"],
    image: {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      alt: "AI-PetCare Interactive Health Dashboard",
    },
    link: "https://github.com/roshangowdas",
    github: "https://github.com/roshangowdas",
  },
];

const HOVER_ITEMS: ItemsValue = {
  itemCount: 3,
  item1: RESUME_PROJECTS[0],
  item2: RESUME_PROJECTS[1],
  item3: RESUME_PROJECTS[2],
};

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<HoverRevealItem | null>(null);
  const [activeProjectTab, setActiveProjectTab] = useState<"overview" | "playground">("overview");

  const handleSelectProject = (proj: HoverRevealItem) => {
    setSelectedProject(proj);
    setActiveProjectTab("overview");
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-black text-[#f5ece3] pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 sm:px-10 lg:px-20 overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Ambient Crimson & Deep Red Glows */}
      <div
        className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, rgba(235, 27, 56, 0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none opacity-15"
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
          className="border-b border-[#2b171c] pb-3 sm:pb-4 mb-4 sm:mb-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[clamp(1.75rem,5.5vw,3rem)] font-black text-[#f5ece3] tracking-tight uppercase font-['Inter',sans-serif]">
              KEY <span className="text-[#eb1b38]">PROJECTS</span>
            </h2>
            <span className="hidden sm:inline-block font-mono text-[11px] text-[#a89589] uppercase tracking-wider">
              CLICK ITEM TO INSPECT &amp; EXPERIENCE
            </span>
          </div>
        </motion.div>

        {/* Hover Image Reveal Component with only the 3 Resume Projects */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full"
        >
          <HoverImageReveal
            items={HOVER_ITEMS}
            font={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(16px, 2.7vw, 32px)",
              lineHeight: "1.25em",
              letterSpacing: "-0.02em",
              textAlign: "left",
            }}
            textColor="#f5ece3"
            dimColor="#473539"
            align="left"
            rowGap={12}
            imageWidth={340}
            imageHeight={220}
            rounded={14}
            offsetX={190}
            offsetY={-30}
            onSelectProject={handleSelectProject}
          />
        </motion.div>
      </div>

      {/* Project Details & In-Situ Experience Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={`relative w-full ${
              activeProjectTab === "playground" ? "max-w-4xl" : "max-w-xl"
            } bg-[#120d0f] border border-[#eb1b38]/50 rounded-2xl p-4 sm:p-6 shadow-[0_0_60px_rgba(235,27,56,0.35)] flex flex-col space-y-3.5 max-h-[88vh] overflow-y-auto transition-all duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-start justify-between border-b border-[#2b171c] pb-3">
              <div className="min-w-0 pr-3">
                <span className="text-[10px] font-mono text-[#eb1b38] uppercase tracking-wider font-bold">
                  {selectedProject.category} • {selectedProject.year}
                </span>
                <h3 className="text-base sm:text-xl font-bold font-['Inter',sans-serif] text-white mt-0.5 truncate">
                  {selectedProject.text}
                </h3>

                {/* Sub-tab Navigation for projects with live component experience */}
                {selectedProject.npm && (
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/70 border border-white/10 mt-2.5 w-fit">
                    <button
                      type="button"
                      onClick={() => setActiveProjectTab("overview")}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        activeProjectTab === "overview"
                          ? "bg-[#eb1b38] text-white shadow-[0_0_10px_rgba(235,27,56,0.5)]"
                          : "text-[#a89589] hover:text-white"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveProjectTab("playground")}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeProjectTab === "playground"
                          ? "bg-[#eb1b38] text-white shadow-[0_0_15px_rgba(235,27,56,0.5)]"
                          : "text-[#eb1b38] hover:text-white bg-[#eb1b38]/10 hover:bg-[#eb1b38]/20"
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Experience Playground</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-white/5 hover:bg-[#eb1b38]/20 text-[#a89589] hover:text-white border border-white/10 hover:border-[#eb1b38]/50 transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Active Tab View */}
            {activeProjectTab === "playground" && selectedProject.npm ? (
              /* IN-SITU EXPERIENCE: Live Interactive Playground right inside the modal */
              <div className="w-full animate-in fade-in duration-200">
                <ReactStatusKitPlayground embedded={true} />
              </div>
            ) : (
              /* STANDARD PROJECT OVERVIEW */
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {selectedProject.image?.src && (
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#2b171c]">
                    <img
                      src={selectedProject.image.src}
                      alt={selectedProject.text || ""}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <p className="text-xs sm:text-sm text-[#c2b1a3] font-mono leading-relaxed">
                  {selectedProject.subtitle}
                </p>

                {selectedProject.tech && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedProject.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1c1215] border border-[#3b1f25] text-[#d4beab]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-[#2b171c]">
                  {selectedProject.npm && (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveProjectTab("playground")}
                        className="px-3.5 py-1.5 rounded-full bg-[#eb1b38]/20 border border-[#eb1b38]/50 text-[#eb1b38] hover:text-white hover:bg-[#eb1b38] font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(235,27,56,0.5)]"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Experience Component ⚡</span>
                      </button>
                      <a
                        href={selectedProject.npm}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full bg-[#cb3837]/20 border border-[#cb3837]/40 text-[#f5ece3] hover:text-white hover:bg-[#cb3837]/40 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <NpmIcon className="w-3.5 h-3.5 text-[#cb3837]" />
                        <span>npm Package ↗</span>
                      </a>
                    </>
                  )}
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-full bg-[#eb1b38] hover:bg-[#ff2a4b] text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(235,27,56,0.4)] flex items-center gap-1.5"
                    >
                      <span>Open Project</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
