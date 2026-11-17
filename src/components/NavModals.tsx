import React, { useState } from "react";
import { X, ExternalLink, Github, Terminal, Check, Copy, Activity, Calendar, MapPin, ChevronRight, Download, Briefcase, Cpu, Layers } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import LEDTicker from "./ui/pixel-led-display";

export type ModalType = "about" | "skills" | "education" | "projects" | "experience" | "contact" | null;

interface NavModalsProps {
  activeModal: ModalType;
  onClose: () => void;
}

export const NavModals: React.FC<NavModalsProps> = ({ activeModal, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState("ALL");
  const [selectedSkillTab, setSelectedSkillTab] = useState(0);

  if (!activeModal) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-10 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] bg-black/95 border border-[rgba(212,190,171,0.2)] rounded-2xl shadow-2xl shadow-black overflow-hidden flex flex-col cad-bracket text-zinc-100">
        
        {/* Top Header */}
        <div className="h-14 px-4 sm:px-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center space-x-3 font-mono text-xs text-[#d4beab]">
            <span className="w-2 h-2 rounded-full bg-[#d4beab] animate-pulse"></span>
            <span className="uppercase font-bold tracking-wider">
              {activeModal.toUpperCase()} // SYS_VIEW
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-5 sm:space-y-6">

          {/* 1. ABOUT MODAL */}
          {activeModal === "about" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#f5ece3]">
                  Roshan Gowda S — Full-Stack Developer
                </h3>
                <p className="font-mono text-xs text-[#d4beab] mt-1">
                  Information Science & Engineering (B.E. 2027) • Nagarjuna College of Engineering and Technology
                </p>
              </div>

              <div className="glass-panel p-5 rounded-xl border border-white/10 text-sm text-zinc-300 leading-relaxed space-y-3 font-sans">
                <p>
                  I am a Full-Stack Developer and Information Science & Engineering undergraduate (graduating 2027) skilled in JavaScript, React.js, Node.js, Express.js, and MongoDB.
                </p>
                <p>
                  Experienced in building MERN stack applications, designing RESTful APIs, database modeling, Firebase Authentication, and responsive user interfaces. Author of the published open-source React component library <span className="text-[#d4beab] font-bold">react-status-kit</span> on npm and completed a frontend development internship at Cognifyz Technologies.
                </p>
              </div>

              {/* Core Tenets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="glass-panel p-4 rounded-xl border border-white/5">
                  <div className="font-mono text-xs text-[#d4beab] font-bold mb-1">01. FULL-STACK MERN</div>
                  <p className="text-xs text-zinc-400">Complete end-to-end architectures from React frontends to secured Express REST APIs and MongoDB.</p>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-white/5">
                  <div className="font-mono text-xs text-emerald-400 font-bold mb-1">02. OPEN-SOURCE AUTHOR</div>
                  <p className="text-xs text-zinc-400">Published npm component library react-status-kit for asynchronous UI status handling.</p>
                </div>
                <div className="glass-panel p-4 rounded-xl border border-white/5">
                  <div className="font-mono text-xs text-[#eb1b38] font-bold mb-1">03. PERFORMANCE &amp; QUALITY</div>
                  <p className="text-xs text-zinc-400">Focus on responsive design, cross-browser layout audits, and accessible UI controls.</p>
                </div>
              </div>

              {/* Profile Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 font-mono text-xs text-zinc-400">
                <span>LOCATION: {PORTFOLIO_DATA.profile.location}</span>
                <span className="text-emerald-400">● {PORTFOLIO_DATA.profile.status}</span>
              </div>
            </div>
          )}

          {/* 2. SKILLS MODAL */}
          {activeModal === "skills" && (
            <div className="space-y-6">
              {/* Entrying Pixel LED Display Banner without background */}
              <div className="w-full h-8 sm:h-10 flex items-center justify-center">
                <LEDTicker
                  items={["Technical Skills"]}
                  separator="●"
                  speed={20}
                  textSize={36}
                  dotSize={5}
                  dotQuantity={10}
                  onColor="#ff263e"
                  offColor="transparent"
                  glow={true}
                  glowOptions={{ strength: 80, size: 8 }}
                  flicker={false}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
                  <button
                    key={cat.code}
                    onClick={() => setSelectedSkillTab(idx)}
                    className={`font-mono text-xs px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      selectedSkillTab === idx
                        ? "bg-[#b84e5b]/20 border-[#b84e5b] text-[#f5ece3] shadow-[0_0_12px_rgba(184,78,91,0.25)]"
                        : "bg-zinc-900 border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {cat.code}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {PORTFOLIO_DATA.skillCategories[selectedSkillTab].skills.map((s) => (
                  <div key={s.name} className="glass-panel p-4 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                      <span className="text-[#f5ece3] font-bold">{s.name}</span>
                      <span className="text-[#d4beab]">{s.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#b84e5b] to-[#d4beab] rounded-full"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                    <p className="font-mono text-[11px] text-zinc-400 mt-2">{s.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. PROJECTS MODAL */}
          {activeModal === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-mono text-xs text-zinc-400">FILTER PROJECTS:</span>
                <div className="flex gap-1.5 font-mono text-xs">
                  {["ALL", "MERN", "REACT", "NPM"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveProjectFilter(f)}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        activeProjectFilter === f
                          ? "bg-red-500/20 text-red-300 border border-red-400/50"
                          : "bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {PORTFOLIO_DATA.projects
                  .filter((p) => {
                    if (activeProjectFilter === "ALL") return true;
                    return (
                      p.tags.some((t) => t.toUpperCase().includes(activeProjectFilter)) ||
                      p.title.toUpperCase().includes(activeProjectFilter)
                    );
                  })
                  .map((project) => (
                    <div
                      key={project.id}
                      className="glass-panel p-5 rounded-xl border border-white/10 hover:border-red-500/30 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-bold text-white">{project.title}</h4>
                          <p className="font-mono text-xs text-zinc-400">{project.subtitle}</p>
                        </div>
                        <div className="flex space-x-2">
                          {project.npmUrl && (
                            <a
                              href={project.npmUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-1 rounded bg-[#cb3837]/20 text-[#cb3837] hover:text-white border border-[#cb3837]/40 font-mono text-[10px] font-bold"
                              title="View on npm"
                            >
                              npm
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed">{project.description}</p>

                      <div className="p-2.5 rounded bg-black/40 border border-white/5 font-mono text-xs text-emerald-400 flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 shrink-0" />
                        <span>{project.impact}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 4. EXPERIENCE MODAL */}
          {activeModal === "experience" && (
            <div className="space-y-6">
              {PORTFOLIO_DATA.experiences.map((exp) => (
                <div
                  key={exp.company}
                  className="glass-panel p-5 rounded-xl border border-white/10 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-zinc-400">
                    <span className="text-[#d4beab] font-bold">{exp.period}</span>
                    <span>{exp.location}</span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-[#f5ece3]">{exp.role}</h4>
                    <span className="font-mono text-xs text-zinc-300">@ {exp.company}</span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">{exp.summary}</p>

                  <div className="space-y-1.5">
                    {exp.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <ChevronRight className="w-3.5 h-3.5 text-[#b84e5b] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. CONTACT MODAL */}
          {activeModal === "contact" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Direct Communication Channel</h3>
                <p className="font-mono text-xs text-zinc-400 mt-1">
                  Open to software developer roles, full-stack projects, and collaborations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 space-y-3 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">Official Email</span>
                  <div className="flex items-center justify-between mt-1 p-2 rounded bg-black/60 border border-white/10">
                    <span className="text-zinc-200 select-all">{PORTFOLIO_DATA.profile.email}</span>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1 rounded text-[#d4beab] hover:text-white"
                      title="Copy email"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <a
                    href={PORTFOLIO_DATA.profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
                  >
                    <Github className="w-3.5 h-3.5 text-[#d4beab]" />
                    <span>GITHUB</span>
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
                  >
                    <span>LINKEDIN</span>
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.npm}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
                  >
                    <span>NPM</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="h-12 px-4 sm:px-6 border-t border-white/10 flex items-center justify-between bg-black/40 font-mono text-[11px] text-zinc-500">
          <span>PRESS ESC TO CLOSE</span>
          <span className="text-[#d4beab]">SYS_SECURE</span>
        </div>

      </div>
    </div>
  );
};

