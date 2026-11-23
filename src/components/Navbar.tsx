import React, { useState } from "react";
import { Menu, X, Download, Terminal, Volume2, VolumeX } from "lucide-react";
import { ModalType } from "./NavModals";

interface NavbarProps {
  onOpenModal: (type: ModalType) => void;
  activeModal: ModalType;
  onOpenResume?: () => void;
  onOpenCommandPalette?: () => void;
  isAudioMuted?: boolean;
  onToggleAudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenModal,
  activeModal,
  onOpenResume,
  onOpenCommandPalette,
  isAudioMuted = false,
  onToggleAudio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; key: ModalType }[] = [
    { label: "About", key: "about" },
    { label: "Skills", key: "skills" },
    { label: "Education", key: "education" },
    { label: "Projects", key: "projects" },
    { label: "Experience", key: "experience" },
    { label: "Contact", key: "contact" },
  ];

  const handleDownloadResume = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        `============================================================\n` +
        `ROSHAN GOWDA S — FULL-STACK DEVELOPER\n` +
        `Bengaluru, Karnataka, India | 0243roshan@gmail.com\n` +
        `GitHub: https://github.com/roshangowdas | LinkedIn: https://www.linkedin.com/in/roshan-gowda-s-378343283/ | npm: https://www.npmjs.com/~roshan__gowda | Instagram: @roshan__gowda\n` +
        `============================================================\n\n` +
        `PROFESSIONAL SUMMARY:\n` +
        `Full-Stack Developer and Information Science and Engineering undergraduate\n` +
        `(graduating 2027) skilled in JavaScript, React.js, Node.js, Express.js, and MongoDB.\n` +
        `Experienced in building MERN stack applications, designing REST APIs, database\n` +
        `modeling, Firebase Authentication, and responsive user interfaces. Published an\n` +
        `open-source React component library on npm and completed a frontend development internship.\n` +
        `Seeking a Software Development Graduate Associate (Software Developer) role.\n\n` +
        `EDUCATION:\n` +
        `• Nagarjuna College of Engineering and Technology, Bengaluru, India\n` +
        `  Bachelor of Engineering (B.E.) in Information Science and Engineering (Expected 2027)\n` +
        `  Relevant Coursework: Data Structures and Algorithms, OOP, DBMS, Computer Networks, ML, UX Design\n\n` +
        `TECHNICAL SKILLS:\n` +
        `• Programming Languages: JavaScript, Java, Python, C, C++, SQL\n` +
        `• Frontend: React.js, HTML5, CSS3, Tailwind CSS, Responsive Web Design\n` +
        `• Backend: Node.js, Express.js, RESTful APIs, Firebase Authentication\n` +
        `• Databases: MongoDB, SQL\n` +
        `• Tools: Git, GitHub, npm, Firebase, VS Code, Vite, Postman\n\n` +
        `EXPERIENCE:\n` +
        `• Frontend Development Intern | Cognifyz Technologies (Dec 2025 – Jan 2026)\n` +
        `  - Developed and deployed 5+ responsive web interfaces using HTML5, CSS3, and JavaScript.\n` +
        `  - Conducted code audits and optimization, reducing cross-browser inconsistencies by 20%.\n` +
        `• Full-Stack Developer Trainee | @ToriiMinds (2026)\n` +
        `  - Built 5 responsive full-stack web applications using React.js, Node.js, Express.js, MongoDB.\n` +
        `  - Structured modular REST APIs and implemented responsive UI components with clean state management.\n\n` +
        `KEY PROJECTS:\n` +
        `• CollabSpace (2026): Real-Time Team Collaboration SaaS with Supabase, 16-table RLS, Kanban, Docs & Whiteboards\n` +
        `• Community Resource Sharing Platform (2026): MERN Stack, MongoDB, Firebase Auth, 10 REST APIs\n` +
        `• react-status-kit (2026): Open-Source React component library published on npm\n` +
        `• AI-PetCare (2025): Interactive pet health monitoring web interface\n\n` +
        `[Downloaded from Roshan Gowda S Portfolio]`
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "Roshan-Gowda-S-Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <header id="main-navbar" className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 via-black/40 to-transparent backdrop-blur-[3px] select-none pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div className="h-14 sm:h-16 flex items-center justify-between">
          
          {/* Left Action: Command Palette + Sound Controls */}
          <div className="hidden sm:flex items-center gap-2 pointer-events-auto">
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-b from-[#1c1819] to-black border border-[#3b1f25] hover:border-[#eb1b38]/70 text-[#a89589] hover:text-white transition-all text-[11px] font-mono group shadow-md cursor-pointer select-none active:scale-95"
                title="Open Command Palette (Cmd + K or Ctrl + K)"
              >
                <Terminal className="w-3.5 h-3.5 text-[#eb1b38]" />
                <span className="font-semibold">CMD</span>
                <kbd className="px-1.5 py-0.5 rounded bg-black/70 border border-white/10 text-[9px] text-[#eb1b38] font-bold">⌘K</kbd>
              </button>
            )}

            {onToggleAudio && (
              <button
                type="button"
                onClick={onToggleAudio}
                className="p-1.5 rounded-full bg-gradient-to-b from-[#1c1819] to-black border border-[#3b1f25] hover:border-[#eb1b38]/70 text-[#a89589] hover:text-white transition-all cursor-pointer shadow-md select-none active:scale-95"
                title={isAudioMuted ? "Unmute Audio FX" : "Mute Audio FX"}
                aria-label="Toggle Sound Effects"
              >
                {isAudioMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#eb1b38] animate-pulse" />
                )}
              </button>
            )}
          </div>

          {/* Desktop Navigation Links — Pure sleek tactile pills, zero WebGL/canvas context collisions */}
          <nav className="hidden md:flex items-center space-x-3 lg:space-x-4 pointer-events-auto">
            {navItems.map((item) => {
              const isActive = activeModal === item.key;
              return (
                <button
                  key={item.key}
                  data-nav-item
                  type="button"
                  onClick={() => onOpenModal(item.key)}
                  className={`relative group px-5 py-2 rounded-full font-['Inter',sans-serif] text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer select-none active:scale-95 ${
                    isActive
                      ? "bg-gradient-to-b from-[#2a1418] via-[#1a0a0d] to-black text-[#eb1b38] border border-[#eb1b38]/80 shadow-[0_0_18px_rgba(235,27,56,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)]"
                      : "bg-gradient-to-b from-[#1c1819] via-[#120e10] to-[#0a0708] text-[#f5ece3] hover:text-white border border-[#332225]/70 hover:border-[#eb1b38]/60 shadow-[0_4px_12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.6)] hover:shadow-[0_0_16px_rgba(235,27,56,0.3)]"
                  }`}
                  style={{
                    textShadow: "0 1px 2px rgba(0,0,0,0.9)",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#eb1b38] animate-pulse" />
                    )}
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Resume Pill Button */}
          <div data-nav-resume className="hidden sm:flex items-center justify-end w-[120px] pointer-events-auto">
            <button
              type="button"
              onClick={onOpenResume || handleDownloadResume}
              className="relative group px-4 py-2 rounded-full font-['Inter',sans-serif] text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer select-none active:scale-95 bg-gradient-to-b from-[#241518] via-[#180a0d] to-[#0c0507] text-[#f5ece3] hover:text-white border border-[#44232a] hover:border-[#eb1b38] shadow-[0_4px_14px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_0_18px_rgba(235,27,56,0.45)] flex items-center gap-1.5"
              style={{
                textShadow: "0 1px 2px rgba(0,0,0,0.9)",
              }}
            >
              <Download className="w-3.5 h-3.5 text-[#eb1b38] group-hover:translate-y-0.5 transition-transform" />
              <span>RESUME</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center justify-between w-full pointer-events-auto">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenResume || handleDownloadResume}
                className="px-3.5 py-2 min-h-[40px] rounded-full font-mono text-[11px] font-bold tracking-wider bg-gradient-to-b from-[#201518] to-black text-[#f5ece3] border border-[#3b1f25] hover:border-[#eb1b38] flex items-center gap-1.5 shadow-md active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-[#eb1b38]" />
                <span>RESUME</span>
              </button>

              {onOpenCommandPalette && (
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-black/80 border border-white/10 text-[#eb1b38] hover:text-white cursor-pointer active:scale-95"
                  title="Open Command Palette"
                >
                  <Terminal className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-black/80 border border-white/10 text-zinc-300 hover:text-white cursor-pointer backdrop-blur-md active:scale-95 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#eb1b38]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Backdrop & Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden pointer-events-auto"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 md:hidden mx-3 sm:mx-4 mt-2 p-2 sm:p-3 rounded-2xl border border-[#2b191c] bg-black/95 backdrop-blur-2xl space-y-1 sm:space-y-2 pointer-events-auto shadow-2xl shadow-black animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const isActive = activeModal === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    onOpenModal(item.key);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl font-['Inter',sans-serif] text-xs font-semibold tracking-wider text-left transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-[#eb1b38]/15 text-[#eb1b38] border border-[#eb1b38]/40"
                      : "text-[#d4beab] hover:text-white hover:bg-white/5 active:bg-white/10"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#eb1b38]" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </header>
  );
};
