import React, { useState, useEffect } from "react";
import { ArrowLeft, RefreshCw, ShieldAlert, WifiOff, ServerCrash, AlertTriangle, ExternalLink } from "lucide-react";

export type ErrorType = "404" | "403" | "400" | "500" | "502" | "503" | "OFFLINE";

interface ErrorConfig {
  code: string;
  digits: [string, string, string];
  category: "CLIENT ERROR" | "SERVER ERROR" | "NETWORK ERROR";
  badge: string;
  tagline: string;
  heading: string;
  scriptText: string;
  description: string;
  diagnostic: string;
  accentColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ERROR_REGISTRY: Record<ErrorType, ErrorConfig> = {
  "404": {
    code: "404",
    digits: ["4", "0", "4"],
    category: "CLIENT ERROR",
    badge: "SYS_ERR // 0x404_PAGE_NOT_FOUND",
    tagline: "404 ERROR PAGE",
    heading: "SORRY, WE COULDN'T FIND THIS PAGE",
    scriptText: "Go Back",
    description: "THE PAGE YOU ARE LOOKING FOR DOESN'T EXIST OR ANOTHER ERROR OCCURRED.",
    diagnostic: "TARGET_URI_UNRESOLVED // [HTTP/2 404] Zero virtual node matching routes on edge CDN.",
    accentColor: "#eb1b38",
    icon: AlertTriangle,
  },
  "403": {
    code: "403",
    digits: ["4", "0", "3"],
    category: "CLIENT ERROR",
    badge: "SYS_AUTH // 0x403_ACCESS_FORBIDDEN",
    tagline: "403 FORBIDDEN PAGE",
    heading: "CLEARANCE REQUIRED // ACCESS DENIED",
    scriptText: "Request Access",
    description: "SECURITY PROTOCOLS RESTRICT ACCESS TO THIS ENCRYPTED DIRECTORY ZONE.",
    diagnostic: "SECURITY_TOKEN_REJECTED // [HTTP/2 403] Insufficient RBAC privilege level for client.",
    accentColor: "#f43f5e",
    icon: ShieldAlert,
  },
  "400": {
    code: "400",
    digits: ["4", "0", "0"],
    category: "CLIENT ERROR",
    badge: "SYS_PARSE // 0x400_BAD_REQUEST",
    tagline: "400 CLIENT FAULT",
    heading: "MALFORMED REQUEST // SYNTAX ANOMALY",
    scriptText: "Reset Query",
    description: "THE CLIENT SENT AN UNPARSABLE PAYLOAD OR INVALID PARAMETER SCHEMA.",
    diagnostic: "PAYLOAD_VALIDATION_ERROR // [HTTP/2 400] Edge gateway rejected non-compliant JSON stream.",
    accentColor: "#e11d48",
    icon: AlertTriangle,
  },
  "500": {
    code: "500",
    digits: ["5", "0", "0"],
    category: "SERVER ERROR",
    badge: "SYS_CRIT // 0x500_INTERNAL_SERVER_FAIL",
    tagline: "500 CRITICAL ERROR",
    heading: "INTERNAL SERVER PIPELINE COLLAPSE",
    scriptText: "Reboot Node",
    description: "AN UNCAUGHT EXCEPTION OCCURRED IN THE CORE COMPUTATION WORKER THREADS.",
    diagnostic: "STACK_TRACE_DUMP // [HTTP/2 500] Unhandled panic in application cluster node worker 0x8F.",
    accentColor: "#eb1b38",
    icon: ServerCrash,
  },
  "502": {
    code: "502",
    digits: ["5", "0", "2"],
    category: "SERVER ERROR",
    badge: "SYS_NET // 0x502_BAD_GATEWAY",
    tagline: "502 BAD GATEWAY",
    heading: "UPSTREAM REVERSE PROXY TIMEOUT",
    scriptText: "Retry Hop",
    description: "THE REVERSE PROXY RECEIVED AN INVALID RESPONSE FROM THE UPSTREAM ORIGIN.",
    diagnostic: "GATEWAY_TIMEOUT // [HTTP/2 502] Edge socket terminated before origin TCP handshake complete.",
    accentColor: "#ff2a4b",
    icon: ServerCrash,
  },
  "503": {
    code: "503",
    digits: ["5", "0", "3"],
    category: "SERVER ERROR",
    badge: "SYS_OPS // 0x503_SERVICE_UNAVAILABLE",
    tagline: "503 MAINTENANCE",
    heading: "SYSTEM UNDER SCHEDULED MAINTENANCE",
    scriptText: "Check Back Soon",
    description: "SERVERS ARE TEMPORARILY OFFLINE FOR ARCHITECTURAL RECALIBRATION.",
    diagnostic: "NODE_DRAIN_ACTIVE // [HTTP/2 503] Shard cluster undergoing zero-downtime database migration.",
    accentColor: "#f43f5e",
    icon: RefreshCw,
  },
  "OFFLINE": {
    code: "OFF",
    digits: ["O", "F", "F"],
    category: "NETWORK ERROR",
    badge: "SYS_LINK // 0x000_NETWORK_DISCONNECTED",
    tagline: "TERMINAL OFFLINE",
    heading: "CARRIER SIGNAL LOST // DISCONNECTED",
    scriptText: "Reconnect",
    description: "YOUR LOCAL TERMINAL CANNOT COMMUNICATE WITH THE SATELLITE INTERNET UPLINK.",
    diagnostic: "DNS_PROBE_FINISHED_NO_INTERNET // Zero packets transmitted on physical network interface.",
    accentColor: "#ff3355",
    icon: WifiOff,
  },
};

interface ErrorPageProps {
  initialError?: ErrorType;
  onReturnHome?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  initialError = "404",
  onReturnHome,
}) => {
  const [selectedError, setSelectedError] = useState<ErrorType>(initialError);

  useEffect(() => {
    if (initialError) {
      setSelectedError(initialError);
    }
  }, [initialError]);

  const current = ERROR_REGISTRY[selectedError] || ERROR_REGISTRY["404"];
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlErr = params.get("err")?.toUpperCase() as ErrorType | undefined;
      if (urlErr && ERROR_REGISTRY[urlErr]) {
        setSelectedError(urlErr);
      }
    }
  }, []);

  const handleReturn = () => {
    if (onReturnHome) {
      onReturnHome();
    } else {
      window.location.href = "/";
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-[9990] w-full h-screen bg-[#050204] text-[#f5ece3] overflow-hidden select-none flex flex-col justify-between font-['Inter',sans-serif]">
      {/* 1. Deep Atmospheric Crimson Glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[950px] sm:h-[950px] rounded-full blur-[140px] sm:blur-[220px] pointer-events-none opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(235, 27, 56, 0.75) 0%, rgba(140, 20, 36, 0.35) 45%, rgba(40, 8, 14, 0.15) 70%, transparent 80%)",
        }}
      />

      {/* 2. CAD Precision Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(212, 190, 171, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 190, 171, 0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 3. Vignette Frame */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/80" />

      {/* --- TOP BAR: Editorial Telemetry Monitor --- */}
      <header className="relative z-30 w-full px-6 sm:px-10 py-5 sm:py-6 flex items-center justify-between border-b border-[#2b171c]/60 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#eb1b38] animate-ping" />
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#a89589] tracking-wider uppercase">
            <span className="font-bold text-[#f5ece3]">ROSHAN GOWDA S</span>
            <span className="hidden sm:inline text-zinc-600">//</span>
            <span className="hidden sm:inline text-[#eb1b38] font-bold">SYSTEM_ANOMALY_SENTINEL</span>
          </div>
        </div>

        {/* Live Badge */}
        <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs">
          <span className="px-2.5 py-1 rounded-md bg-red-950/60 border border-red-500/30 text-[#eb1b38] tracking-widest uppercase font-bold">
            {current.category}
          </span>
          <span className="hidden md:inline text-zinc-500 font-mono">
            {current.badge}
          </span>
        </div>
      </header>

      {/* --- CENTERPIECE: Massive Towering Typographic Error Digits (Matching Reference) --- */}
      <main className="relative z-20 flex-1 w-full flex items-center justify-center overflow-hidden">
        {/* Layer A: Giant Red Digits Filling the Viewport Edge-to-Edge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <div className="flex items-center justify-center w-full max-w-[100vw] h-full leading-none font-['Pricedown','Bebas_Neue',Impact,sans-serif] tracking-[-0.05em] text-[#e01633] text-[38vw] sm:text-[34vw] md:text-[32vw] lg:text-[30vw] drop-shadow-[0_0_90px_rgba(235,27,56,0.55)]">
            {/* Digit 1 (Left) with Cinematic Lens Depth-of-Field Blur */}
            <span
              className="inline-block transform scale-95 opacity-85 will-change-transform"
              style={{
                filter: "blur(6px)",
                textShadow: "0 0 50px rgba(235, 27, 56, 0.4)",
              }}
            >
              {current.digits[0]}
            </span>

            {/* Digit 2 (Center) Razor Sharp & Vivid Crimson */}
            <span
              className="inline-block transform scale-100 z-10 text-[#eb1b38] will-change-transform mx-[-0.04em]"
              style={{
                textShadow: "0 0 80px rgba(235, 27, 56, 0.8), 0 10px 40px rgba(0,0,0,0.9)",
              }}
            >
              {current.digits[1]}
            </span>

            {/* Digit 3 (Right) with Cinematic Lens Depth-of-Field Blur */}
            <span
              className="inline-block transform scale-95 opacity-85 will-change-transform"
              style={{
                filter: "blur(6px)",
                textShadow: "0 0 50px rgba(235, 27, 56, 0.4)",
              }}
            >
              {current.digits[2]}
            </span>
          </div>
        </div>

        {/* Layer B: Center Focal Content (Inside the center digit cutout, exactly matching screenshot) */}
        <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto pointer-events-auto">
          {/* Top Mini Header: e.g. "404 ERROR PAGE" */}
          <div className="flex flex-col items-center mb-6 sm:mb-8 font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#d4beab] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <span className="font-bold text-white text-sm sm:text-base tracking-widest">{current.code}</span>
            <span className="text-[#a89589] tracking-[0.3em]">{current.tagline}</span>
          </div>

          {/* Center Main Message: e.g. "SORRY, WE COULDN'T FIND THIS PAGE" */}
          <div className="relative my-2 sm:my-3 flex flex-col items-center">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#f5ece3]/80 uppercase mb-1">
              {current.code}
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#f5ece3] uppercase font-['Pricedown','Bebas_Neue',Impact,sans-serif] drop-shadow-[0_4px_16px_rgba(0,0,0,0.98)] max-w-md">
              {current.heading}
            </h1>

            {/* Overlaid Stylized Handwritten Cursive Action (e.g. "Go Back" with artistic brush flourish) */}
            <div className="relative mt-2 sm:mt-3 cursor-pointer group" onClick={handleReturn}>
              <span
                className="font-['Kaushan_Script','Caveat',cursive] text-4xl sm:text-5xl md:text-6xl text-[#f5ece3] tracking-wide -rotate-[5deg] inline-block transition-transform duration-300 group-hover:scale-105 group-hover:text-white"
                style={{
                  textShadow:
                    "0 0 25px rgba(235, 27, 56, 0.8), 0 4px 14px rgba(0,0,0,0.95)",
                }}
              >
                {current.scriptText}
              </span>

              {/* Artistic Horizontal Brush / Scribble Flourish Underline (from reference) */}
              <svg
                className="w-48 sm:w-64 h-5 mt-[-6px] text-white/40 group-hover:text-[#eb1b38] transition-colors duration-300 pointer-events-none"
                viewBox="0 0 200 20"
                fill="none"
              >
                <path
                  d="M5 12 Q 50 4, 100 11 T 195 9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M15 16 Q 70 8, 140 14 T 185 13"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Bottom Subtitle (from reference) */}
          <p className="text-[11px] sm:text-xs text-[#a89589] font-mono tracking-wider max-w-xs sm:max-w-md uppercase mt-5 sm:mt-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed">
            {current.description}
          </p>

          {/* Micro Diagnostic Terminal Output */}
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-black/75 border border-white/10 text-[10px] font-mono text-zinc-400 max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-[#eb1b38] mr-1.5">●</span>
            {current.diagnostic}
          </div>
        </div>
      </main>

      {/* --- BOTTOM SECTION: Actions Bar --- */}
      <footer className="relative z-30 w-full px-6 sm:px-10 py-5 sm:py-6 border-t border-[#2b171c]/60 bg-black/60 backdrop-blur-md flex items-center justify-between gap-4">
        {/* Left Action Button (Matching reference "Visit site") */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReturn}
            className="group px-5 py-2.5 rounded-full bg-gradient-to-r from-[#eb1b38] to-[#ff2a4b] text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(235,27,56,0.5)] hover:shadow-[0_0_35px_rgba(235,27,56,0.8)] transition-all duration-300 cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Return to Portfolio</span>
          </button>

          <button
            type="button"
            onClick={handleReload}
            className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[#f5ece3] font-mono text-xs font-medium tracking-wider uppercase flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95"
            title="Reload Page"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reload</span>
          </button>
        </div>

        {/* Right Action: Report Anomaly */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:0243roshan@gmail.com?subject=Portfolio%20Error%20Report"
            className="text-xs font-mono text-[#a89589] hover:text-[#eb1b38] flex items-center gap-1.5 transition-colors"
          >
            <span>Report Anomaly</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ErrorPage;

