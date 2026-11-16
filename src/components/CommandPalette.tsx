import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Search,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Download,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Layers,
  Code,
  GraduationCap,
  Briefcase,
  Mail,
  FolderGit2,
  Package,
} from "lucide-react";
import { playCursorClickSound } from "@/utils/audio";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Social" | "Terminal";
  shortcut?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
  isAudioMuted?: boolean;
  onToggleAudio?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  isAudioMuted = false,
  onToggleAudio,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [terminalHistory, setTerminalHistory] = useState<
    { command: string; output: string | React.ReactNode }[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Play tactile sound helper
  const playSound = useCallback(() => {
    if (!isAudioMuted) {
      playCursorClickSound(0.12);
    }
  }, [isAudioMuted]);

  // Scroll to section helper
  const scrollTo = (id: string) => {
    playSound();
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  const copyToClipboard = (text: string, label: string) => {
    playSound();
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Command items definition
  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-hero",
      title: "Jump to Hero / Top",
      category: "Navigation",
      shortcut: "H",
      icon: Layers,
      action: () => scrollTo("hero"),
    },
    {
      id: "nav-about",
      title: "Jump to About Section",
      category: "Navigation",
      shortcut: "A",
      icon: Terminal,
      action: () => scrollTo("about"),
    },
    {
      id: "nav-skills",
      title: "Jump to Technical Skills & 3D Orbit",
      category: "Navigation",
      shortcut: "S",
      icon: Code,
      action: () => scrollTo("skills"),
    },
    {
      id: "nav-projects",
      title: "Jump to Key Projects & Live Playground",
      category: "Navigation",
      shortcut: "P",
      icon: FolderGit2,
      action: () => scrollTo("projects"),
    },
    {
      id: "nav-certs",
      title: "Jump to Certifications & 3D Tunnel",
      category: "Navigation",
      shortcut: "C",
      icon: GraduationCap,
      action: () => scrollTo("certifications"),
    },
    {
      id: "nav-experience",
      title: "Jump to Experience & Impact Metrics",
      category: "Navigation",
      shortcut: "E",
      icon: Briefcase,
      action: () => scrollTo("experience"),
    },
    {
      id: "nav-contact",
      title: "Jump to Direct Dispatch / Contact",
      category: "Navigation",
      shortcut: "D",
      icon: Mail,
      action: () => scrollTo("contact"),
    },

    // Actions
    {
      id: "action-resume",
      title: "Open & Print Interactive Resume",
      category: "Actions",
      shortcut: "R",
      icon: Download,
      action: () => {
        playSound();
        onClose();
        if (onOpenResume) onOpenResume();
      },
    },
    {
      id: "action-copy-email",
      title: "Copy Email (0243roshan@gmail.com)",
      category: "Actions",
      icon: Copy,
      action: () => copyToClipboard("0243roshan@gmail.com", "Email"),
    },
    {
      id: "action-copy-phone",
      title: "Copy Phone (+91 6366309511)",
      category: "Actions",
      icon: Copy,
      action: () => copyToClipboard("+916366309511", "Phone"),
    },
    {
      id: "action-toggle-audio",
      title: isAudioMuted ? "Unmute Audio FX" : "Mute Audio FX",
      category: "Actions",
      icon: isAudioMuted ? VolumeX : Volume2,
      action: () => {
        playSound();
        if (onToggleAudio) onToggleAudio();
      },
    },

    // Social & Repos
    {
      id: "social-npm",
      title: "View react-status-kit on npm",
      category: "Social",
      icon: Package,
      action: () => {
        playSound();
        window.open("https://www.npmjs.com/~roshan__gowda", "_blank");
      },
    },
    {
      id: "social-github",
      title: "View GitHub Profile (@roshangowdas)",
      category: "Social",
      icon: FolderGit2,
      action: () => {
        playSound();
        window.open("https://github.com/roshangowdas", "_blank");
      },
    },
    {
      id: "social-linkedin",
      title: "View LinkedIn Profile (Roshan Gowda S)",
      category: "Social",
      icon: ExternalLink,
      action: () => {
        playSound();
        window.open(
          "https://www.linkedin.com/in/roshan-gowda-s-378343283/",
          "_blank"
        );
      },
    },
  ];

  // Filter commands by query
  const filteredCommands = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Handle Terminal CLI commands
  const handleExecuteCli = (rawCommand: string) => {
    playSound();
    const cmd = rawCommand.trim().toLowerCase();

    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs font-mono text-[#d4beab]">
            <div>Available commands:</div>
            <div>• <span className="text-[#eb1b38] font-bold">bio</span> — Summary & background</div>
            <div>• <span className="text-[#eb1b38] font-bold">skills</span> — Core languages & tech stack</div>
            <div>• <span className="text-[#eb1b38] font-bold">projects</span> — Key production applications</div>
            <div>• <span className="text-[#eb1b38] font-bold">npm</span> — Published open-source package info</div>
            <div>• <span className="text-[#eb1b38] font-bold">contact</span> — Copy email & direct mailto link</div>
            <div>• <span className="text-[#eb1b38] font-bold">audio</span> — Toggle zero-latency sound effects</div>
            <div>• <span className="text-[#eb1b38] font-bold">clear</span> — Reset terminal output history</div>
          </div>
        );
        break;
      case "bio":
        output =
          "Roshan Gowda S // Full-Stack Developer & Information Science undergraduate (graduating 2027) at NCET Bengaluru. Specializes in MERN stack, RESTful APIs, and AI-augmented velocity (+35%). Seeking Graduate Software Developer roles.";
        break;
      case "skills":
        output =
          "Core: JavaScript (ES6+), Java, Python, C, C++, SQL | Frontend: React.js, Tailwind CSS, HTML5, CSS3 | Backend: Node.js, Express.js, REST APIs, Firebase Auth, MongoDB Atlas | Tools: Git, GitHub, npm, VS Code, Antigravity, Claude Code.";
        break;
      case "projects":
        output =
          "1. Community Resource Sharing Platform (MERN, MongoDB, Firebase Auth, 10 REST APIs)\n2. react-status-kit (Published on npm registry, zero dependencies)\n3. AI-PetCare (Responsive diagnostic dashboard)";
        break;
      case "npm":
        output = (
          <div>
            <div>Package: <span className="text-[#eb1b38] font-bold">react-status-kit</span></div>
            <div>Install: <span className="bg-black/60 px-1 py-0.5 rounded text-white font-mono">npm install react-status-kit</span></div>
            <div>Status: Published &amp; Active on official npm Registry</div>
          </div>
        );
        break;
      case "audio":
        if (onToggleAudio) onToggleAudio();
        output = isAudioMuted ? "Audio FX unmuted." : "Audio FX muted.";
        break;
      case "contact":
        navigator.clipboard.writeText("0243roshan@gmail.com");
        output = "Email 0243roshan@gmail.com copied to clipboard!";
        break;
      case "clear":
        setTerminalHistory([]);
        setQuery("");
        return;
      default:
        // Try executing matching first command if any
        if (filteredCommands.length > 0) {
          filteredCommands[0].action();
          return;
        }
        output = `Command not recognized: "${rawCommand}". Type "help" for a list of commands.`;
        break;
    }

    setTerminalHistory((prev) => [...prev, { command: rawCommand, output }]);
    setQuery("");
  };

  // Keyboard navigation & Shortcuts inside palette
  useEffect(() => {
    if (!isOpen) return;

    // Reset state & focus
    setSelectedIndex(0);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playSound();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        playSound();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        playSound();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length)
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (query.startsWith(">") || query.startsWith(":")) {
          handleExecuteCli(query.replace(/^[>:]\s*/, ""));
        } else if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        } else if (query.trim()) {
          handleExecuteCli(query);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, query, onClose, playSound]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-3 sm:px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSound();
            onClose();
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -20 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-2xl rounded-2xl bg-[#0f0b0d]/95 border border-[#eb1b38]/50 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(235,27,56,0.3)] overflow-hidden flex flex-col max-h-[75vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2b171c] bg-[#160d10]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eb1b38] animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-white uppercase">
                ROSHAN // TELEMETRY COMMAND PALETTE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#a89589] hidden sm:inline">
                [ESC to Exit]
              </span>
              <button
                type="button"
                onClick={() => {
                  playSound();
                  onClose();
                }}
                className="w-6 h-6 rounded-md bg-white/5 hover:bg-[#eb1b38]/20 flex items-center justify-center text-[#a89589] hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#2b171c] bg-[#0c0809]">
            <Search className="w-4 h-4 text-[#eb1b38] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search sections, actions, or type 'help' for terminal commands..."
              className="w-full bg-transparent text-sm font-mono text-white placeholder:text-[#6e5d57] focus:outline-hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="text-[10px] font-mono text-[#eb1b38] hover:text-white px-2 py-0.5 rounded bg-white/5"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Quick Command Pills */}
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#241518] bg-[#140b0e] overflow-x-auto text-[10px] font-mono text-[#a89589] select-none scrollbar-none">
            <span className="shrink-0 text-[#eb1b38] font-bold">CLI:</span>
            {["help", "bio", "skills", "projects", "npm", "contact", "audio", "clear"].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => handleExecuteCli(cmd)}
                className="px-2 py-0.5 rounded bg-black/60 border border-white/10 hover:border-[#eb1b38]/60 hover:text-white transition-colors shrink-0 cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal History Log (If CLI used) */}
          {terminalHistory.length > 0 && (
            <div className="p-3 border-b border-[#2b171c] bg-black/80 font-mono text-xs max-h-40 overflow-y-auto space-y-2">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[#eb1b38] flex items-center gap-1.5">
                    <span>&gt;</span>
                    <span className="text-white font-bold">{item.command}</span>
                  </div>
                  <div className="text-[#c2b1a3] pl-3 whitespace-pre-line text-[11px]">
                    {item.output}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action List */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-[#1e1416]/50 scrollbar-thin scrollbar-thumb-[#eb1b38]/30"
          >
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, idx) => {
                const Icon = cmd.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={cmd.id}
                    type="button"
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-[#eb1b38]/20 border border-[#eb1b38]/60 text-white shadow-[0_0_15px_rgba(235,27,56,0.25)]"
                        : "text-[#d4beab] hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-[#eb1b38] text-white"
                            : "bg-black/50 text-[#a89589] border border-white/10"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold font-['Inter',sans-serif] truncate">
                          {cmd.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#8a7a72] uppercase tracking-wider">
                          {cmd.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      {cmd.shortcut && (
                        <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/70 border border-white/15 text-[#a89589]">
                          {cmd.shortcut}
                        </kbd>
                      )}
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isSelected ? "translate-x-0.5 text-[#eb1b38]" : "opacity-0"
                        }`}
                      />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs font-mono text-[#8a7a72]">
                No direct commands matched "{query}". Press <span className="text-white font-bold">Enter</span> to execute as terminal instruction.
              </div>
            )}
          </div>

          {/* Footer Status Bar */}
          <div className="px-4 py-2 border-t border-[#241518] bg-[#0c0809] flex items-center justify-between text-[10px] font-mono text-[#8a7a72]">
            <div className="flex items-center gap-3">
              <span>Navigate: <kbd className="text-white">↑</kbd> <kbd className="text-white">↓</kbd></span>
              <span>Execute: <kbd className="text-white">↵</kbd></span>
              <span>Close: <kbd className="text-white">ESC</kbd></span>
            </div>
            {copiedText && (
              <span className="text-emerald-400 font-bold animate-in fade-in flex items-center gap-1">
                <Check className="w-3 h-3" /> {copiedText} Copied!
              </span>
            )}
            <div className="hidden sm:flex items-center gap-1 text-[#eb1b38]">
              <Sparkles className="w-3 h-3" />
              <span>Full-Stack Ready</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;