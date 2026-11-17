import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { NavModals, ModalType } from "./components/NavModals";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { EducationSection } from "./components/EducationSection";
import { ProjectsSection } from "./components/ProjectsSection";
import PerspectiveTunnelHero from "./components/ui/perspective-tunnel-hero";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import VectorWordmark, {
  defaultVectorWordmarkProps,
} from "./components/VectorWordmark";
import MouseEffects from "./components/MouseEffects";
import CinematicLoader from "./components/ui/cinematic-loader";
import ErrorPage, { ErrorType } from "./components/ErrorPage";
import { FadeInSection } from "./components/ui/fade-in-section";
import { ScrollProgress } from "./components/ui/scroll-progress";
import ResumeModal from "./components/ResumeModal";
import FilmGrain from "./components/ui/film-grain";
import CommandPalette from "./components/CommandPalette";
import { usePerformanceTier } from "./utils/performance";

const NpmIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
  </svg>
);

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/roshangowdas", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/roshan-gowda-s-378343283/", icon: Linkedin },
  { name: "Instagram", href: "https://www.instagram.com/roshan__gowda", icon: Instagram },
  { name: "Email", href: "mailto:0243roshan@gmail.com", icon: Mail },
  { name: "npm", href: "https://www.npmjs.com/~roshan__gowda", icon: NpmIcon },
];

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const { parallaxDamping, prefersReducedMotion } = usePerformanceTier();
  const [emailNotification, setEmailNotification] = useState<{
    show: boolean;
    text: string;
  }>({ show: false, text: "" });
  const emailTimerRef = useRef<number | null>(null);

  // Global shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Viewport tier tracking for adaptive mobile geometry & eliminating vertical blank gaps
  const [viewportTier, setViewportTier] = useState<"mobile" | "tablet" | "desktop">(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return "mobile";
      if (window.innerWidth < 1024) return "tablet";
    }
    return "desktop";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setViewportTier("mobile");
      } else if (w < 1024) {
        setViewportTier("tablet");
      } else {
        setViewportTier("desktop");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewportTier === "mobile";
  const isTablet = viewportTier === "tablet";

  // Dynamic Wordmark Parameters optimized per viewport tier
  const wordmarkStretchY = isMobile ? 3.8 : isTablet ? 3.0 : 2.4;
  const wordmarkOffsetY = isMobile ? 0.17 : isTablet ? 0.10 : 0.06;
  const wordmarkReach = isMobile ? 120 : isTablet ? 140 : 160;
  const wordmarkHandleSpread = isMobile ? 18 : isTablet ? 16 : 14;
  const wordmarkHandleSize = isMobile ? 28 : isTablet ? 34 : 38;

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = "0243roshan@gmail.com";

    // 1. Copy to clipboard
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }

    // 2. Trigger notification
    setEmailNotification({ show: true, text: email });
    if (emailTimerRef.current) window.clearTimeout(emailTimerRef.current);
    emailTimerRef.current = window.setTimeout(() => {
      setEmailNotification({ show: false, text: "" });
    }, 4500);

    // 3. Open mailto
    window.location.href = `mailto:${email}`;
  };
  const [errorView, setErrorView] = useState<ErrorType | null>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      if (path !== "/" && path !== "") {
        if (path === "/403" || path === "/error-403") return "403";
        if (path === "/400" || path === "/error-400") return "400";
        if (path === "/500" || path === "/error-500") return "500";
        if (path === "/502" || path === "/error-502") return "502";
        if (path === "/503" || path === "/error-503") return "503";
        if (path === "/offline") return "OFFLINE";
        return "404";
      }
      const params = new URLSearchParams(window.location.search);
      if (params.get("error") || params.get("err")) {
        const val = (params.get("error") || params.get("err"))?.toUpperCase();
        return (val as ErrorType) || "404";
      }
    }
    return null;
  });

  // Automated Error Sentinel: triggers error page when errors occur (broken links, offline, runtime crashes)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Detect Network Drops / Offline
    const handleOffline = () => setErrorView("OFFLINE");
    const handleOnline = () => {
      setErrorView((prev) => (prev === "OFFLINE" ? null : prev));
    };
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // 2. Intercept broken link clicks across the document
    const handleDocumentClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // In-page anchor link check (e.g. #unknown-section)
      if (href.startsWith("#")) {
        const targetId = href.slice(1);
        if (targetId && !document.getElementById(targetId)) {
          e.preventDefault();
          setErrorView("404");
          return;
        }
      }

      // Non-existent route click (e.g. /broken or /missing-page)
      if (href.startsWith("/") && !href.startsWith("//") && href !== "/" && !href.startsWith("/#")) {
        e.preventDefault();
        window.history.pushState(null, "", href);
        setErrorView("404");
      }
    };
    document.addEventListener("click", handleDocumentClick);

    // 3. Catch popstate navigation (e.g. browser Back / Forward to invalid route)
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path !== "/" && path !== "") {
        setErrorView("404");
      } else {
        setErrorView(null);
      }
    };
    window.addEventListener("popstate", handlePopState);

    // 4. Catch uncaught runtime exceptions / unhandled promise rejections
    const handleRuntimeError = () => {
      setErrorView("500");
    };
    window.addEventListener("error", handleRuntimeError);
    window.addEventListener("unhandledrejection", handleRuntimeError);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("error", handleRuntimeError);
      window.removeEventListener("unhandledrejection", handleRuntimeError);
    };
  }, []);
  const lenisRef = useRef<Lenis | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const socialDockRef = useRef<HTMLDivElement>(null);

  // Cinematic Page-Load Entrance Animation with GSAP
  const animateHeroEntrance = () => {
    // Ensure scroll is at the top for clean presentation
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });

    // 1. Sequential Navbar Entrance (slides down and fades in)
    tl.fromTo(
      "#main-navbar",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, clearProps: "all" },
      0
    )
    .fromTo(
      "[data-nav-item]",
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "back.out(1.4)", clearProps: "all" },
      0.15
    )
    .fromTo(
      "[data-nav-resume]",
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, clearProps: "all" },
      0.25
    )

    // 2. Character Portrait Glow & Image Reveal (animates child elements, NOT the parallax wrapper)
    .fromTo(
      "[data-hero-portrait-glow]",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 0.6, duration: 1.0, clearProps: "transform" },
      0.1
    )
    .fromTo(
      "[data-hero-portrait-img]",
      { scale: 1.06, opacity: 0, y: 25 },
      { scale: 1, opacity: 1, y: 0, duration: 1.1, clearProps: "all" },
      0.1
    )

    // 3. Staggered Hero Typography Entrance: "Hello, I'm ROSHAN Gowda" + Tagline
    .fromTo(
      "[data-hero-greeting]",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, clearProps: "all" },
      0.2
    )
    .fromTo(
      "[data-hero-name]",
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, ease: "power4.out", clearProps: "all" },
      0.3
    )
    .fromTo(
      "[data-hero-script]",
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)", clearProps: "opacity,scale" },
      0.4
    )
    .fromTo(
      "[data-hero-tagline]",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, clearProps: "all" },
      0.5
    )

    // 4. Sequential Social Dock Items Entrance (animates inner buttons, NOT the parallax wrapper)
    .fromTo(
      "[data-social-item]",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.05, duration: 0.45, ease: "back.out(1.6)", clearProps: "all" },
      0.4
    );
  };

  // Initialize Lenis smooth momentum scrolling & synchronized GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 0.2 : 0.09,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: prefersReducedMotion ? 1.0 : 1.4,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(500, 33);

    // Parallax Scroll Timeline: Hero Section Exit (Dynamically scaled & damped for 60 FPS)
    let heroTl: gsap.core.Timeline | null = null;
    if (heroRef.current && parallaxDamping > 0) {
      heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.25,
        },
      });

      // Layer 1: Background Wordmark - Deep Parallax
      if (wordmarkRef.current) {
        heroTl.to(
          wordmarkRef.current,
          {
            yPercent: -22 * parallaxDamping,
            opacity: 0.35,
            ease: "none",
          },
          0
        );
      }

      // Layer 2: Hero Character Portrait - Mid-Depth Elevation
      if (portraitRef.current) {
        heroTl.to(
          portraitRef.current,
          {
            yPercent: -35 * parallaxDamping,
            scale: 1 - 0.06 * parallaxDamping,
            opacity: 0.25,
            ease: "none",
          },
          0
        );
      }

      // Layer 3: Foreground Name Lockup & Greetings - Smooth Lift & Dissolve
      if (heroTextRef.current) {
        heroTl.to(
          heroTextRef.current,
          {
            yPercent: -50 * parallaxDamping,
            opacity: 0,
            ease: "none",
          },
          0
        );
      }

      // Layer 4: Social Links Dock
      if (socialDockRef.current) {
        heroTl.to(
          socialDockRef.current,
          {
            yPercent: -40 * parallaxDamping,
            opacity: 0,
            ease: "none",
          },
          0
        );
      }
    }

    return () => {
      gsap.ticker.remove(tickerCb);
      heroTl?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, [parallaxDamping, prefersReducedMotion]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenNav = (type: ModalType) => {
    if (type === "about") {
      setActiveModal(null);
      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        lenisRef.current?.scrollTo(aboutEl, { offset: 0, duration: 1.2 });
      }
    } else if (type === "skills") {
      setActiveModal(null);
      const skillsEl = document.getElementById("skills");
      if (skillsEl) {
        lenisRef.current?.scrollTo(skillsEl, { offset: 0, duration: 1.2 });
      }
    } else if (type === "education") {
      setActiveModal(null);
      const eduEl = document.getElementById("education");
      if (eduEl) {
        lenisRef.current?.scrollTo(eduEl, { offset: 0, duration: 1.2 });
      }
    } else if (type === "projects") {
      setActiveModal(null);
      const projEl = document.getElementById("projects");
      if (projEl) {
        lenisRef.current?.scrollTo(projEl, { offset: 0, duration: 1.2 });
      }
    } else if (type === "experience") {
      setActiveModal(null);
      const expEl = document.getElementById("experience");
      if (expEl) {
        lenisRef.current?.scrollTo(expEl, { offset: 0, duration: 1.2 });
      }
    } else if (type === "contact") {
      setActiveModal(null);
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        lenisRef.current?.scrollTo(contactEl, { offset: 0, duration: 1.2 });
      }
    } else {
      setActiveModal(type);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-[#f5ece3] relative select-none overflow-x-hidden">
      {/* Premium Cinematic Page-Load Animation */}
      <CinematicLoader onStartOpening={animateHeroEntrance} />

      {/* Interactive Tactical Click Effects Overlay with Crimson Red Theme */}
      <MouseEffects
        color="#ff2a4b"
        interactionMode="sniper"
        duration={0.35}
        strokeWidth={2}
        effectSize={85}
        showLabel={false}
        soundEnabled={!isAudioMuted}
      />

      {/* Slim Fixed Progress Bar at top tracking scroll depth */}
      {!errorView && <ScrollProgress />}

      {/* Cinematic Film-Grain & Analog Texture Overlay */}
      <FilmGrain opacity={0.035} />

      {/* Floating Seamless Navigation Bar with sleek tactile pills (Zero WebGL context crashes) */}
      <Navbar
        onOpenModal={handleOpenNav}
        activeModal={activeModal}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={() => setIsAudioMuted((prev) => !prev)}
      />

      {/* Section 1: Hero Landing Section with Layered Parallax Scroll Effect */}
      <section
        id="hero"
        ref={heroRef}
        className="w-full h-screen h-[100dvh] min-h-[580px] relative overflow-hidden flex items-center justify-center"
      >
        {/* Layer 1: Background Vector Wordmark Container with Parallax Response */}
        <div
          ref={wordmarkRef}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <VectorWordmark
            {...defaultVectorWordmarkProps}
            text="PORTFOLIO"
            fitWidth={true}
            fitWidthRatio={1.01}
            textColor="#d4beab"
            shade="#48181e"
            accent="#ff263e"
            reach={wordmarkReach}
            speed={45}
            damping={55}
            stretchY={wordmarkStretchY}
            offsetY={wordmarkOffsetY}
            font={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.01em",
              fontWeight: 900,
            }}
            handles={{
              size: wordmarkHandleSize,
              labels: true,
              spread: wordmarkHandleSpread,
            }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              minWidth: "100%",
              minHeight: "100%",
              pointerEvents: "auto",
            }}
          />
        </div>

        {/* Layer 2: Themed Portrait Container with Layered Elevation */}
        <div
          ref={portraitRef}
          className="absolute inset-0 flex items-end justify-center pointer-events-none z-10 select-none overflow-hidden will-change-transform"
        >
          {/* Portrait Container with responsive scaling, shifted right for optimal composition */}
          <div className="relative flex items-end justify-center h-full max-h-screen translate-x-0 sm:translate-x-8 md:translate-x-16 lg:translate-x-28 xl:translate-x-36">
            {/* Ambient Crimson-Red Rim Glow focused behind head & hair */}
            <div
              data-hero-portrait-glow
              className="absolute top-[18%] sm:top-[12%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[460px] sm:h-[460px] lg:w-[560px] lg:h-[560px] rounded-full blur-[70px] sm:blur-[120px] pointer-events-none opacity-25"
              style={{
                background:
                  "radial-gradient(circle, rgba(210, 24, 48, 0.35) 0%, rgba(130, 25, 35, 0.18) 45%, rgba(60, 20, 25, 0.08) 65%, transparent 75%)",
              }}
            />

            {/* Hero Character Image: Anime Portrait */}
            <img
              data-hero-portrait-img
              src="/images/character-l.png"
              alt="Roshan Gowda"
              draggable={false}
              className="relative z-10 object-contain object-bottom h-[74vh] sm:h-[80vh] md:h-[84vh] lg:h-[88vh] max-h-[90vh] w-auto max-w-[140vw] sm:max-w-[92vw] drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] will-change-transform select-none"
              style={{
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)",
              }}
            />
          </div>
        </div>

        {/* Layer 3: Foreground Left Hero Section: "Hello, I'm ROSHAN GOWDA" + Tagline */}
        <div
          ref={heroTextRef}
          className="absolute left-4 sm:left-12 lg:left-20 bottom-16 sm:bottom-12 lg:bottom-20 z-20 pointer-events-auto select-none max-w-[calc(100vw-32px)] sm:max-w-xl will-change-transform"
        >
          {/* Handwritten Script Greeting */}
          <div
            data-hero-greeting
            className="font-['Caveat',cursive] text-2xl sm:text-3xl lg:text-4xl text-[#f5ece3]/95 font-medium tracking-wide -rotate-2 origin-left drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-1"
          >
            Hello, I'm
          </div>

          {/* Dual-Font Lockup: "ROSHAN Gowda" with Electric Red Accent Script */}
          <div className="relative inline-block my-1 select-none">
            {/* Primary Word: "ROSHAN" in Warm Cream / Sand (#f2e8de) */}
            <h1
              data-hero-name
              className="font-['Anton','Bebas_Neue',Impact,sans-serif] text-[clamp(2.75rem,13vw,9.5rem)] tracking-tight text-[#f2e8de] uppercase leading-[0.82] drop-shadow-[0_10px_35px_rgba(0,0,0,0.98)]"
            >
              ROSHAN
            </h1>

            {/* Overlaid Secondary Word: "Gowda" in Vibrant Red Script (#eb0814) */}
            <span
              data-hero-script
              className="absolute left-[14%] sm:left-[20%] top-[48%] -translate-y-1/2 font-['Kaushan_Script','Mr_Dafoe','Caveat',cursive] text-[clamp(2.2rem,10.5vw,7.6rem)] font-bold text-[#eb0814] -rotate-[8deg] tracking-normal pointer-events-none whitespace-nowrap italic"
              style={{
                textShadow:
                  "0 0 25px rgba(235, 8, 20, 0.6), 0 4px 12px rgba(0,0,0,0.95), -1px -1px 0 rgba(0,0,0,0.4)",
              }}
            >
              Gowda
            </span>
          </div>

          {/* Tagline & Terminal/Code Indicator */}
          <div
            data-hero-tagline
            className="flex items-center gap-2.5 sm:gap-3.5 mt-2 sm:mt-3"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl border border-[#eb1b38]/30 bg-[#140d0e]/90 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(235,27,56,0.15)]">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#eb1b38] leading-none">&gt;_</span>
            </div>

            <p className="text-xs sm:text-sm text-[#c2b1a3] font-normal leading-snug tracking-normal max-w-[240px] sm:max-w-[320px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Full-stack developer building responsive web apps, clean APIs, and open-source UI tools.
            </p>
          </div>
        </div>

        {/* Layer 4: Foreground Right Floating Social Links Dock with Sequential Entrance */}
        <div
          ref={socialDockRef}
          className="absolute right-2 sm:right-5 lg:right-6 bottom-3 sm:bottom-5 lg:bottom-6 z-20 pointer-events-auto select-none will-change-transform max-w-[calc(100vw-16px)]"
        >
          {/* Email Click Notification Banner */}
          {emailNotification.show && (
            <div className="absolute -top-16 right-0 z-30 flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#140d0e]/95 border border-[#eb1b38]/60 shadow-[0_10px_35px_rgba(235,27,56,0.4)] backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200 whitespace-nowrap max-w-[calc(100vw-24px)] overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-[#eb1b38] animate-ping" />
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-white font-bold tracking-tight">
                  0243roshan@gmail.com
                </span>
                <span className="text-[9px] font-mono text-emerald-400">
                  ✓ Copied to clipboard &amp; mail app opened
                </span>
              </div>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=0243roshan@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded bg-[#eb1b38]/20 hover:bg-[#eb1b38] text-[10px] font-mono uppercase text-[#eb1b38] hover:text-white border border-[#eb1b38]/40 transition-colors ml-1"
                title="Compose in Gmail Web"
              >
                Gmail ↗
              </a>
            </div>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2.5 p-1 sm:p-2 rounded-full border border-[rgba(212,190,171,0.15)] bg-[#140d0e]/75 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              const isEmail = item.name === "Email";

              if (isEmail) {
                return (
                  <button
                    key={item.name}
                    type="button"
                    data-social-item
                    onClick={handleEmailClick}
                    className="group relative w-8 h-8 sm:w-11 sm:h-11 min-w-[32px] min-h-[32px] sm:min-w-[44px] sm:min-h-[44px] rounded-full flex items-center justify-center text-[#9e8d82] hover:text-[#f5ece3] border border-white/5 hover:border-red-500/60 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(255,42,75,0.35)] transition-colors duration-300 will-change-transform cursor-pointer"
                    title="0243roshan@gmail.com"
                    aria-label="Email 0243roshan@gmail.com"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:scale-110" />

                    {/* Floating Micro Tooltip */}
                    <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider text-white bg-black/95 border border-white/15 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-xl">
                      0243roshan@gmail.com
                    </span>
                  </button>
                );
              }

              return (
                <a
                  key={item.name}
                  data-social-item
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-8 h-8 sm:w-11 sm:h-11 min-w-[32px] min-h-[32px] sm:min-w-[44px] sm:min-h-[44px] rounded-full flex items-center justify-center text-[#9e8d82] hover:text-[#f5ece3] border border-white/5 hover:border-red-500/60 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(255,42,75,0.35)] transition-colors duration-300 will-change-transform"
                  title={item.name}
                  aria-label={item.name}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:scale-110" />

                  {/* Floating Micro Tooltip */}
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider text-white bg-black/95 border border-white/15 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-xl">
                    {item.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: About Page / Section (Directly following Hero with synchronized Framer Motion reveal) */}
      <FadeInSection>
        <AboutSection />
      </FadeInSection>

      {/* Section 3: Technical Skills Page with Pixel LED Display & Interactive Tech Stack */}
      <FadeInSection>
        <SkillsSection />
      </FadeInSection>

      {/* Section 4: Education & Academic Journey with Interactive Hover-Preview Narrative */}
      <FadeInSection>
        <EducationSection />
      </FadeInSection>

      {/* Section 5: Key Projects with Interactive Hover Image Reveal */}
      <FadeInSection>
        <ProjectsSection />
      </FadeInSection>

      {/* Section 6: 3D Perspective Tunnel Hero */}
      <PerspectiveTunnelHero />

      {/* Section 7: Experience & Internships with ScrollReelTestimonials */}
      <FadeInSection>
        <ExperienceSection />
      </FadeInSection>

      {/* Section 8: Contact with Interactive 3D Wireframe Globe */}
      <FadeInSection>
        <ContactSection />
      </FadeInSection>

      {/* Section 9: Interactive Glimmer Vale Night Meadow Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Interactive HUD Modals for Skills, Projects, Experience, Contact */}
      <NavModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* Interactive Resume Modal with One-Click PDF Print & Plaintext Export */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Futuristic Telemetry Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={() => setIsAudioMuted((prev) => !prev)}
      />

      {/* Telemetry Error Sentinel Pages (404, 403, 400, 500, 502, 503, OFFLINE) matching theme */}
      {errorView && (
        <ErrorPage
          initialError={errorView}
          onReturnHome={() => {
            setErrorView(null);
            if (typeof window !== "undefined" && (window.location.pathname !== "/" || window.location.search)) {
              window.history.pushState(null, "", "/");
            }
          }}
        />
      )}
    </div>
  );
}
