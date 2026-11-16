import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Copy,
  Terminal,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Inbox,
  PauseCircle,
  CheckCircle2,
  Sparkles,
  Code2,
  Eye,
  Package,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

type StatusType = "success" | "loading" | "error" | "empty" | "idle";
type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const NpmLogo = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
  </svg>
);

const STATUS_CONFIGS: Record<
  StatusType,
  {
    label: string;
    badgeColor: string;
    icon: React.ElementType;
    title: string;
    description: string;
    actionText?: string;
  }
> = {
  loading: {
    label: "Loading",
    badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    icon: RefreshCw,
    title: "Syncing Asynchronous Data...",
    description: "Resolving upstream payload streams and hydrating React component tree.",
  },
  success: {
    label: "Success",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    icon: CheckCircle2,
    title: "Operation Completed",
    description: "Database transaction settled and UI state updated in 14ms.",
    actionText: "View Settlement",
  },
  error: {
    label: "Error",
    badgeColor: "text-[#eb1b38] bg-[#eb1b38]/10 border-[#eb1b38]/30",
    icon: AlertCircle,
    title: "Connection Timed Out",
    description: "Failed to establish handshake with endpoint. Circuit breaker engaged.",
    actionText: "Retry Dispatch",
  },
  empty: {
    label: "Empty",
    badgeColor: "text-zinc-400 bg-zinc-400/10 border-zinc-400/30",
    icon: Inbox,
    title: "No Records Found",
    description: "Filter criteria returned zero entries. Try expanding your search queries.",
    actionText: "Create Resource",
  },
  idle: {
    label: "Idle",
    badgeColor: "text-[#d4beab] bg-[#d4beab]/10 border-[#d4beab]/30",
    icon: PauseCircle,
    title: "System Standby",
    description: "Worker thread ready for instructions. Initiate user action to begin.",
    actionText: "Trigger Sync",
  },
};

export interface ReactStatusKitPlaygroundProps {
  embedded?: boolean;
}

export const ReactStatusKitPlayground: React.FC<ReactStatusKitPlaygroundProps> = ({
  embedded = false,
}) => {
  const [activeStatus, setActiveStatus] = useState<StatusType>("success");
  const [pkgManager, setPkgManager] = useState<PackageManager>("npm");
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [isSimulating, setIsSimulating] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const installCommands: Record<PackageManager, string> = {
    npm: "npm i react-status-kit",
    pnpm: "pnpm add react-status-kit",
    yarn: "yarn add react-status-kit",
    bun: "bun add react-status-kit",
  };

  const currentCommand = installCommands[pkgManager];

  const handleCopyCommand = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(currentCommand);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2200);
    }
  };

  // Automated Async Simulator: Idle -> Loading -> Success/Error
  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStatus("loading");

    setTimeout(() => {
      setActiveStatus("success");
      setIsSimulating(false);
    }, 1800);
  };

  const handleCardAction = () => {
    if (activeStatus === "error") {
      setRetryCount((prev) => prev + 1);
      setActiveStatus("loading");
      setTimeout(() => {
        setActiveStatus("success");
      }, 1400);
    } else if (activeStatus === "idle") {
      runSimulation();
    } else {
      runSimulation();
    }
  };

  const CurrentIcon = STATUS_CONFIGS[activeStatus].icon;

  const sampleSnippet = `// 1. Install via ${pkgManager}:
// $ ${currentCommand}

import React, { useState } from "react";
import { StatusKit, StatusView } from "react-status-kit";

export function AsyncUserDashboard() {
  const [status, setStatus] = useState<"${activeStatus}">("${activeStatus}");

  return (
    <StatusKit theme="crimson" animated={true}>
      <StatusView
        status={status}
        title="${STATUS_CONFIGS[activeStatus].title}"
        description="${STATUS_CONFIGS[activeStatus].description}"
        ${STATUS_CONFIGS[activeStatus].actionText ? `actionLabel="${STATUS_CONFIGS[activeStatus].actionText}"\n        onAction={() => refetch()}` : ""}
      />
    </StatusKit>
  );
}`;

  return (
    <div
      id={embedded ? undefined : "react-status-kit-lab"}
      className={embedded ? "w-full select-none pt-1" : "w-full mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-[#2b171c]/70 select-none"}
    >
      {/* Top Banner: Open-Source Badge & Package Metadata */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#eb1b38]/15 text-[#eb1b38] border border-[#eb1b38]/40 shadow-[0_0_15px_rgba(235,27,56,0.3)]">
              <Package className="w-3 h-3" />
              <span>OFFICIAL OPEN-SOURCE PACKAGE</span>
            </span>
            <span className="text-[10px] font-mono text-[#a89589] tracking-wider hidden sm:inline">
              // PUBLISHED ON NPM
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-['Inter',sans-serif] text-white tracking-tight flex items-center gap-2.5">
            <span>react-status-kit</span>
            <span className="text-xs font-mono font-normal text-[#a89589] px-2 py-0.5 rounded bg-white/5 border border-white/10">
              v1.0.4
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-[#c2b1a3] font-['Inter',sans-serif] mt-1 max-w-2xl leading-relaxed">
            Zero-dependency, production-ready React component library engineered for declarative asynchronous UI state visualization.
          </p>
        </div>

        {/* External Quick Links */}
        <div className="flex items-center gap-2.5 self-stretch sm:self-auto shrink-0">
          <a
            href="https://www.npmjs.com/~roshan__gowda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-white bg-[#cb3837]/20 hover:bg-[#cb3837] border border-[#cb3837]/50 transition-all duration-200 shadow-sm hover:shadow-[0_0_15px_rgba(203,56,55,0.4)]"
          >
            <NpmLogo className="w-3.5 h-3.5" />
            <span>View on npm ↗</span>
          </a>

          <a
            href="https://github.com/roshangowdas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-[#f5ece3] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
          >
            <span>GitHub Repo ↗</span>
          </a>
        </div>
      </div>

      {/* Terminal Command Bar with 1-Click Copy */}
      <div className="w-full mb-6 p-2 sm:p-2.5 rounded-2xl bg-[#0c080a] border border-[#2b171c] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
        {/* Left: Package Manager Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#140d0e] p-1 rounded-xl border border-white/5 self-start">
          {(["npm", "pnpm", "yarn", "bun"] as PackageManager[]).map((pm) => (
            <button
              key={pm}
              type="button"
              onClick={() => setPkgManager(pm)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                pkgManager === pm
                  ? "bg-[#eb1b38] text-white shadow-[0_0_10px_rgba(235,27,56,0.5)]"
                  : "text-[#a89589] hover:text-white hover:bg-white/5"
              }`}
            >
              {pm}
            </button>
          ))}
        </div>

        {/* Center: Command String */}
        <div className="flex-1 px-3 py-1 font-mono text-xs sm:text-sm text-[#f5ece3] flex items-center gap-2 overflow-x-auto select-all">
          <Terminal className="w-3.5 h-3.5 text-[#eb1b38] shrink-0" />
          <span className="text-zinc-500">$</span>
          <span className="font-semibold text-white whitespace-nowrap">{currentCommand}</span>
        </div>

        {/* Right: Copy Button */}
        <button
          type="button"
          onClick={handleCopyCommand}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
            copiedCmd
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              : "bg-[#eb1b38] hover:bg-[#ff263e] text-white shadow-[0_0_15px_rgba(235,27,56,0.35)] active:scale-95"
          }`}
        >
          {copiedCmd ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Command</span>
            </>
          )}
        </button>
      </div>

      {/* Main Interactive Playground Stage */}
      <div className="rounded-2xl border border-[#2b171c] bg-[#120d0f]/90 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
        
        {/* Stage Toolbar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#2b171c] flex flex-wrap items-center justify-between gap-3 bg-[#0a0607]/80">
          
          {/* Status State Switcher Pills */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
            <span className="text-[11px] font-mono text-[#a89589] uppercase tracking-wider mr-1 hidden md:inline">
              State:
            </span>
            {(["loading", "success", "error", "empty", "idle"] as StatusType[]).map((status) => {
              const isSelected = activeStatus === status;
              const cfg = STATUS_CONFIGS[status];
              const Icon = cfg.icon;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setActiveStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap ${
                    isSelected
                      ? "bg-[#eb1b38] text-white font-bold shadow-[0_0_15px_rgba(235,27,56,0.4)]"
                      : "bg-white/5 hover:bg-white/10 text-[#c2b1a3] hover:text-white border border-white/5"
                  }`}
                >
                  <Icon className={`w-3 h-3 ${isSelected ? "text-white" : "text-[#eb1b38]"}`} />
                  <span className="capitalize">{status}</span>
                </button>
              );
            })}
          </div>

          {/* Right Toolbar Controls: Tab Toggle & Simulator */}
          <div className="flex items-center gap-2.5 ml-auto">
            {/* Run Lifecycle Simulation Trigger */}
            <button
              type="button"
              disabled={isSimulating}
              onClick={runSimulation}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#d4beab] hover:text-white bg-white/5 hover:bg-[#eb1b38]/20 border border-white/10 hover:border-[#eb1b38]/50 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
              title="Simulates: Idle -> Loading -> Success transition"
            >
              <Zap className={`w-3 h-3 text-[#eb1b38] ${isSimulating ? "animate-bounce" : ""}`} />
              <span className="hidden sm:inline">Simulate Lifecycle</span>
              <span className="sm:hidden">Simulate</span>
            </button>

            {/* View Mode Toggle: Preview vs React Code */}
            <div className="flex items-center bg-[#140d0e] p-0.5 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === "preview" ? "bg-white/15 text-white font-bold" : "text-[#a89589] hover:text-white"
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === "code" ? "bg-white/15 text-white font-bold" : "text-[#a89589] hover:text-white"
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>Code</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stage Content Canvas */}
        <div className="p-4 sm:p-8 lg:p-10 flex items-center justify-center min-h-[320px] bg-gradient-to-b from-transparent via-[#080405]/60 to-[#050203]">
          <AnimatePresence mode="wait">
            {activeTab === "preview" ? (
              <motion.div
                key={activeStatus + (isSimulating ? "-sim" : "")}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full max-w-lg p-6 sm:p-8 rounded-2xl border border-[#2b171c] bg-[#0c080a] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95),0_0_30px_rgba(235,27,56,0.1)] flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Ambient glow matching state */}
                <div
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[70px] pointer-events-none opacity-25 ${
                    activeStatus === "success"
                      ? "bg-emerald-500"
                      : activeStatus === "loading"
                      ? "bg-amber-500"
                      : activeStatus === "error"
                      ? "bg-[#eb1b38]"
                      : activeStatus === "empty"
                      ? "bg-zinc-500"
                      : "bg-[#d4beab]"
                  }`}
                />

                {/* State Status Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border mb-4 ${
                    STATUS_CONFIGS[activeStatus].badgeColor
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                  <span>status: &quot;{activeStatus}&quot;</span>
                </span>

                {/* Animated Graphic / Icon Container */}
                <div className="relative my-2">
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                      activeStatus === "success"
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)]"
                        : activeStatus === "loading"
                        ? "bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)]"
                        : activeStatus === "error"
                        ? "bg-[#eb1b38]/10 border-[#eb1b38]/40 text-[#eb1b38] shadow-[0_0_30px_rgba(235,27,56,0.25)]"
                        : activeStatus === "empty"
                        ? "bg-zinc-500/10 border-zinc-500/40 text-zinc-400"
                        : "bg-[#d4beab]/10 border-[#d4beab]/40 text-[#d4beab]"
                    }`}
                  >
                    <CurrentIcon
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${
                        activeStatus === "loading" ? "animate-spin" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Status Title & Message */}
                <h4 className="text-lg sm:text-xl font-bold font-['Inter',sans-serif] text-white mt-3">
                  {STATUS_CONFIGS[activeStatus].title}
                </h4>

                <p className="text-xs sm:text-sm font-mono text-[#a89589] max-w-sm mt-1.5 leading-relaxed">
                  {STATUS_CONFIGS[activeStatus].description}
                </p>

                {/* Contextual Action Button */}
                {STATUS_CONFIGS[activeStatus].actionText && (
                  <button
                    type="button"
                    onClick={handleCardAction}
                    className="mt-5 px-5 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-[#eb1b38] border border-white/15 hover:border-[#eb1b38] transition-all duration-200 cursor-pointer flex items-center gap-2 active:scale-95 shadow-sm hover:shadow-[0_0_20px_rgba(235,27,56,0.5)]"
                  >
                    <span>{STATUS_CONFIGS[activeStatus].actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Extra Metadata Footer inside the card */}
                <div className="mt-6 pt-3 border-t border-white/5 w-full flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>RENDER_TIME: 14ms</span>
                  <span>A11Y_ROLE: status</span>
                </div>
              </motion.div>
            ) : (
              /* Code Snippet Viewer */
              <motion.div
                key="code-viewer"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="w-full max-w-2xl bg-[#070405] border border-[#2b171c] rounded-xl p-4 sm:p-6 overflow-x-auto"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <span className="text-xs font-mono text-[#eb1b38] font-bold">
                    ComponentImplementation.tsx
                  </span>
                  <span className="text-[10px] font-mono text-[#a89589]">
                    TypeScript 5.x Ready
                  </span>
                </div>
                <pre className="font-mono text-xs text-[#f5ece3] leading-relaxed select-text">
                  <code>{sampleSnippet}</code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature Badges Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-[#2b171c] bg-[#0c080a] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#a89589]">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span className="flex items-center gap-1.5 text-[#d4beab]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#eb1b38]" />
              <span>0 Dependencies</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#d4beab]">
              <Zap className="w-3.5 h-3.5 text-[#eb1b38]" />
              <span>&lt; 8 KB Gzipped</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#d4beab]">
              <Layers className="w-3.5 h-3.5 text-[#eb1b38]" />
              <span>Tree-Shakeable</span>
            </span>
          </div>

          <span className="text-[11px] text-[#eb1b38] font-semibold">
            Authored &amp; Maintained by Roshan Gowda S
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReactStatusKitPlayground;
