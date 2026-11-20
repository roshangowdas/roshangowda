"use client";

import {
    motion,
    useTransform,
    useReducedMotion,
    useMotionValue,
    useSpring,
    MotionValue,
    useScroll,
} from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
    X,
    ExternalLink,
    ShieldCheck,
    Check,
    Copy,
    ChevronLeft,
    ChevronRight,
    Award,
    Calendar,
    Sparkles,
} from "lucide-react";

export interface TunnelImageItem {
    src: string;
    title: string;
    subtitle?: string;
    issuer: string;
    issuerBadge?: string;
    year: string;
    credentialId?: string;
    verificationUrl?: string;
    verificationLabel?: string;
    skills?: string[];
}

const DEFAULT_IMAGES: TunnelImageItem[] = [
    {
        src: "/images/certificate/HTML_Essentials_certificate_1nc23is050-ncetmail-com_d185e94b-bd43-47b5-bf24-2d697eef0e6d_page-0001.jpg",
        title: "HTML Essentials",
        subtitle: "Cisco Networking Academy • JS Institute • 2025",
        issuer: "Cisco Networking Academy & JS Institute",
        issuerBadge: "Cisco NetAcad",
        year: "09 Nov 2025",
        credentialId: "d185e94b-bd43-47b5-bf24-2d697eef0e6d",
        verificationUrl: "https://www.netacad.com/",
        verificationLabel: "Verify via Cisco NetAcad Portal",
        skills: ["HTML5 Semantics", "DOM Tree Architecture", "Forms & Validation", "WCAG Accessibility", "Web Standards"],
    },
    {
        src: "/images/certificate/CSS_Essentials_certificate_1nc23is050-ncetmail-com_86bf9af0-d171-4674-ba60-17af2bbae2d4_page-0001.jpg",
        title: "CSS Essentials",
        subtitle: "Cisco Networking Academy • JS Institute • 2026",
        issuer: "Cisco Networking Academy & JS Institute",
        issuerBadge: "Cisco NetAcad",
        year: "23 Feb 2026",
        credentialId: "86bf9af0-d171-4674-ba60-17af2bbae2d4",
        verificationUrl: "https://www.netacad.com/",
        verificationLabel: "Verify via Cisco NetAcad Portal",
        skills: ["CSS3 Styling", "Flexbox & CSS Grid", "Responsive Design", "Transitions & Keyframes", "Visual Hierarchy"],
    },
    {
        src: "/images/certificate/javascript%20essents-1.png",
        title: "JavaScript Essentials 1",
        subtitle: "Cisco Networking Academy • OpenEDG JS Institute • 2026",
        issuer: "Cisco Networking Academy & OpenEDG",
        issuerBadge: "Cisco / OpenEDG",
        year: "22 Mar 2026",
        credentialId: "JSE1-NCET-ROSHAN-2026",
        verificationUrl: "https://edube.org/",
        verificationLabel: "Verify via OpenEDG / Cisco Institute",
        skills: ["JavaScript (ES6+)", "Control Flow & Loops", "Functions & Scope", "Data Types & Operators", "Algorithms"],
    },
    {
        src: "/images/certificate/JavaScript_Essentials_2_certificate.jpg",
        title: "JavaScript Essentials 2",
        subtitle: "Cisco Networking Academy • OpenEDG JS Institute • 2026",
        issuer: "Cisco Networking Academy & OpenEDG",
        issuerBadge: "Cisco / OpenEDG",
        year: "11 May 2026",
        credentialId: "6b363a73-8d02-4bfa-b7ba-7475d2800c3c",
        verificationUrl: "https://edube.org/",
        verificationLabel: "Verify via OpenEDG / Cisco Institute",
        skills: ["OOP in JavaScript", "Asynchronous Promises & async/await", "Prototypes & Inheritance", "Error Handling", "REST API Integration"],
    },
    {
        src: "/images/certificate/python.jpg",
        title: "Python Programming with Red Hat",
        subtitle: "Red Hat (AD141 - RHA Ver. 9.0) • 2026",
        issuer: "Red Hat",
        issuerBadge: "Red Hat Official",
        year: "19 Mar 2026 • 32 Credit Hours",
        credentialId: "a9b152a3-89d1-4aa6-8568-cc7a0e219e5a",
        verificationUrl: "https://www.credly.com/badges/a9b152a3-89d1-4aa6-8568-cc7a0e219e5a",
        verificationLabel: "Verify on Credly Official Registry",
        skills: ["Python 3 Core", "Object-Oriented Programming", "Enterprise Scripting", "Data Handling", "System Automation"],
    },
    {
        src: "/images/certificate/java.png",
        title: "Java Course Specialization",
        subtitle: "Scaler Topics • 2026",
        issuer: "Scaler Topics (Scaler Academy)",
        issuerBadge: "Scaler Topics",
        year: "09 Feb 2026 • 86 Tutorials & 9 Challenges",
        credentialId: "SCALER-JAVA-ROSHAN-2026",
        verificationUrl: "https://www.scaler.com/topics/java/",
        verificationLabel: "Verify on Scaler Topics",
        skills: ["Core Java (JDK)", "Object-Oriented Architecture", "Collections Framework", "JVM Internals", "Data Structures"],
    },
    {
        src: "/images/certificate/generative%20ai_page-0001.jpg",
        title: "Intro to ChatGPT & Generative AI",
        subtitle: "365 Data Science • CPE Accredited (#169986) • 2025",
        issuer: "365 Data Science & National Registry of CPE Sponsors",
        issuerBadge: "365 Data Science",
        year: "18 Nov 2025 • 3 CPE Credits",
        credentialId: "CC-1811D5FF92",
        verificationUrl: "https://learn.365datascience.com/certificates/CC-1811D5FF92/",
        verificationLabel: "Verify on 365 Data Science Official Portal",
        skills: ["Generative AI", "Prompt Engineering", "Large Language Models", "Context Windows", "Applied AI Automation"],
    },
    {
        src: "/images/certificate/Front-End%20Development%20Intern.jpg",
        title: "Frontend Development Internship",
        subtitle: "Cognifyz Technologies • Dec 2025 – Jan 2026",
        issuer: "Cognifyz Technologies (ISO 9001:2015 & MSME Certified)",
        issuerBadge: "Cognifyz Technologies",
        year: "Dec 2025 – Jan 2026",
        credentialId: "CTI/A1/C273334",
        verificationUrl: "https://www.cognifyz.com",
        verificationLabel: "Verify with Cognifyz Technologies",
        skills: ["Production Web Development", "Cross-Browser Compatibility", "Performance Auditing", "Responsive UI", "Agile Collaboration"],
    },
];

interface TunnelCardData {
    item: TunnelImageItem;
    angleCos: number;
    angleSin: number;
    radiusFactorX: number;
    radiusFactorY: number;
    rotationZ: number;
    index: number;
}

const buildTunnelCards = (items: TunnelImageItem[]): TunnelCardData[] => {
    return items.map((item, i) => {
        const goldenAngle = i * 137.5 * (Math.PI / 180);
        const radiusFactorX = 0.28 + (i % 3) * 0.08;
        const radiusFactorY = 0.26 + (i % 2) * 0.09;

        return {
            item,
            angleCos: Math.cos(goldenAngle),
            angleSin: Math.sin(goldenAngle),
            radiusFactorX,
            radiusFactorY,
            rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
            index: i,
        };
    });
};

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
    width: number;
    height: number;
    isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING_CONFIG);
    const y = useSpring(rawY, SPRING_CONFIG);

    useEffect(() => {
        if (!enabled) return;
        const onMove = (e: PointerEvent) => {
            rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, rawX, rawY]);

    return { x, y };
}

interface TunnelCardProps {
    card: TunnelCardData;
    progress: MotionValue<number>;
    pointer: { x: MotionValue<number>; y: MotionValue<number> };
    total: number;
    stage: StageDimensions;
    onSelect: (item: TunnelImageItem) => void;
}

function TunnelCard({ card, progress, pointer, total, stage, onSelect }: TunnelCardProps) {
    const staggerSpan = 0.55;
    const start = (card.index / total) * (1 - staggerSpan);
    const end = start + staggerSpan;

    const localProgress = useTransform(progress, [start, end], [0, 1]);

    const farZ = stage.isMobile ? -1200 : -1700;
    const nearZ = stage.isMobile ? 350 : 500;
    const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

    const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

    const cardWidth = stage.isMobile
        ? Math.max(160, Math.min(240, stage.width * 0.46))
        : Math.max(260, Math.min(360, stage.width * 0.24));

    const baseX = card.angleCos * (stage.width * card.radiusFactorX);
    const baseY = card.angleSin * (stage.height * card.radiusFactorY);
    const panStrength = stage.isMobile ? 20 : 45;

    const transform = useTransform(
        [z, pointer.x, pointer.y],
        ([currZ, px, py]: number[]) => {
            const offsetX = baseX - px * panStrength;
            const offsetY = baseY - py * panStrength;
            return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
        }
    );

    return (
        <motion.div
            style={{
                width: cardWidth,
                transform,
                opacity,
                zIndex: card.index + 1,
            }}
            onClick={() => onSelect(card.item)}
            className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/3] will-change-transform select-none cursor-pointer"
        >
            <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-[#0c080a] border border-[#2b171c] shadow-[0_20px_50px_rgba(0,0,0,0.95)] hover:border-[#eb1b38]/80 hover:shadow-[0_0_35px_rgba(235,27,56,0.35)] transition-all duration-500">
                <img
                    src={card.item.src}
                    alt={card.item.title}
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent flex flex-col justify-end p-3.5 sm:p-4 pointer-events-none">
                    <span className="text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {card.item.title}
                    </span>
                    {card.item.subtitle && (
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#eb1b38] mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                            {card.item.subtitle}
                        </span>
                    )}
                </div>

                {/* Verified indicator badge on top right */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/85 border border-[#eb1b38]/40 group-hover:border-[#eb1b38] text-[9px] font-mono text-[#f5ece3] uppercase tracking-wider backdrop-blur-sm pointer-events-none shadow-md transition-all">
                    <ShieldCheck className="w-3 h-3 text-[#eb1b38]" />
                    <span>Verify ↗</span>
                </div>

                {/* Issuer badge on card top left */}
                {card.item.issuerBadge && (
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/80 border border-white/10 text-[9px] font-mono text-[#d4beab] uppercase tracking-wider backdrop-blur-sm pointer-events-none">
                        {card.item.issuerBadge}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export interface PerspectiveTunnelHeroProps {
    images?: TunnelImageItem[];
    badgeText?: string;
    titlePrimary?: string;
    titleSecondary?: string;
    description?: string;
}

export function PerspectiveTunnelHero({
    images = DEFAULT_IMAGES,
    badgeText = "VERIFIED CREDENTIALS & RECOGNITION",
    titlePrimary = "CERTIFICATIONS &",
    titleSecondary = "ACHIEVEMENTS",
    description,
}: PerspectiveTunnelHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const [selectedCert, setSelectedCert] = useState<TunnelImageItem | null>(null);
    const [copiedId, setCopiedId] = useState(false);

    const tunnelCards = buildTunnelCards(images);

    const [stage, setStage] = useState<StageDimensions>({
        width: 1440,
        height: 900,
        isMobile: false,
    });

    useEffect(() => {
        const updateDimensions = () => {
            setStage({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth < 768,
            });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const handleNavigateCert = useCallback((direction: -1 | 1) => {
        if (!selectedCert) return;
        const currentIndex = images.findIndex((img) => img.src === selectedCert.src);
        if (currentIndex === -1) return;
        const nextIndex = (currentIndex + direction + images.length) % images.length;
        setSelectedCert(images[nextIndex]);
        setCopiedId(false);
    }, [images, selectedCert]);

    const handleCopyCredentialId = useCallback(() => {
        if (!selectedCert?.credentialId) return;
        navigator.clipboard.writeText(selectedCert.credentialId);
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2200);
    }, [selectedCert]);

    // Keyboard controls: Escape to close, Left/Right arrows to cycle
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedCert(null);
            } else if (e.key === "ArrowLeft") {
                handleNavigateCert(-1);
            } else if (e.key === "ArrowRight") {
                handleNavigateCert(1);
            }
        };
        if (selectedCert) {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [selectedCert, handleNavigateCert]);

    // Progress tied smoothly to viewport scroll without trapping the mouse wheel
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 25,
        restDelta: 0.0001,
    });

    const pointer = useCameraParallax(!reduce);

    const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1, 1.35]);
    const titleOpacity = useTransform(smoothProgress, [0, 0.08, 0.88, 1], [0.85, 1, 1, 0]);
    const promptOpacity = useTransform(smoothProgress, [0, 0.22], [1, 0]);

    return (
        <section
            id="certifications"
            ref={containerRef}
            className="relative h-[85vh] sm:h-[90vh] lg:h-[95vh] w-full overflow-hidden bg-black text-[#f5ece3] select-none flex items-center justify-center"
            style={{
                perspective: stage.isMobile ? "900px" : "1200px",
                transformStyle: "preserve-3d",
            }}
        >
            {/* Immersive Background Grid & Glow matching Black & Crimson Theme */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(235,27,56,0.15)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] opacity-40" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,27,56,0.12)_0%,transparent_70%)]" />

            {/* Depth Ring Guides */}
            <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-[#eb1b38]/15" />
            <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-[#eb1b38]/10" />

            {/* Central Anchor Typography */}
            <motion.div
                style={{ scale: titleScale, opacity: titleOpacity }}
                className="pointer-events-none z-0 flex flex-col items-center text-center px-6 max-w-xl"
            >
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#eb1b38] mb-3 sm:mb-4">
                    {badgeText}
                </p>
                <h2 className="text-[clamp(1.85rem,7.5vw,5.5rem)] font-black tracking-tight leading-[0.9] text-[#f5ece3] uppercase font-['Pricedown','Bebas_Neue',Impact,sans-serif]">
                    {titlePrimary}
                    <br />
                    <span className="text-[#eb1b38]">{titleSecondary}</span>
                </h2>
                {description && (
                    <p className="mt-4 max-w-[36ch] text-xs sm:text-sm font-mono text-[#a39388]">
                        {description}
                    </p>
                )}
            </motion.div>

            {/* Scroll Prompt */}
            <motion.div
                style={{ opacity: promptOpacity }}
                className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#8e7e74]"
            >
                <span>Scroll to Traverse Achievements</span>
                <div className="h-6 w-px bg-gradient-to-b from-[#eb1b38] to-transparent" />
            </motion.div>

            {/* 3D Z-Space Plane */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ transformStyle: "preserve-3d" }}
            >
                {tunnelCards.map((card, i) => (
                    <TunnelCard
                        key={i}
                        card={card}
                        progress={smoothProgress}
                        pointer={pointer}
                        total={tunnelCards.length}
                        stage={stage}
                        onSelect={setSelectedCert}
                    />
                ))}
            </div>

            {/* High-Resolution Certificate Verification & Lightbox Modal */}
            {selectedCert && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in duration-200 select-auto"
                    onClick={() => setSelectedCert(null)}
                >
                    <div
                        className="relative max-w-4xl w-full max-h-[94vh] bg-[#0e090b] border border-[#eb1b38]/40 rounded-2xl p-4 sm:p-6 shadow-[0_0_70px_rgba(235,27,56,0.35)] flex flex-col overflow-hidden text-[#f5ece3]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top Header Row */}
                        <div className="flex items-start justify-between w-full mb-3 pb-3 border-b border-[#2b171c] shrink-0 gap-3">
                            <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#eb1b38]/15 text-[#eb1b38] border border-[#eb1b38]/40">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        Verified Credential
                                    </span>
                                    {selectedCert.issuerBadge && (
                                        <span className="text-[11px] font-mono text-[#a89589] px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                                            {selectedCert.issuerBadge}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-base sm:text-xl font-bold font-['Inter',sans-serif] text-white">
                                    {selectedCert.title}
                                </h3>
                                <p className="text-xs font-mono text-[#c2b1a3]">
                                    Issued by <strong className="text-white">{selectedCert.issuer}</strong> • {selectedCert.year}
                                </p>
                            </div>

                            {/* Modal Actions: Counter, Prev, Next, Close */}
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span className="hidden sm:inline-block text-[11px] font-mono text-[#a89589] px-2">
                                    {images.findIndex((img) => img.src === selectedCert.src) + 1} / {images.length}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleNavigateCert(-1)}
                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-[#a89589] hover:text-white border border-white/10 transition-colors cursor-pointer"
                                    title="Previous Certificate (Left Arrow)"
                                    aria-label="Previous Certificate"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleNavigateCert(1)}
                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-[#a89589] hover:text-white border border-white/10 transition-colors cursor-pointer"
                                    title="Next Certificate (Right Arrow)"
                                    aria-label="Next Certificate"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCert(null)}
                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-[#eb1b38]/20 text-[#a89589] hover:text-white border border-white/10 hover:border-[#eb1b38]/50 transition-colors cursor-pointer ml-1"
                                    aria-label="Close Certificate Preview"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Credential Verification HUD Strip */}
                        <div className="w-full mb-3 p-3 rounded-xl bg-[#140b0e] border border-[#3b1c23] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                            {/* Credential ID with Copy Action */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs font-mono">
                                <span className="text-[#a89589] uppercase tracking-wider text-[11px]">
                                    Credential ID:
                                </span>
                                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/70 border border-white/10 text-white font-mono select-all">
                                    <span className="truncate max-w-[200px] sm:max-w-[280px]">
                                        {selectedCert.credentialId || "AUTHENTICATED-RECORD"}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleCopyCredentialId}
                                        className="text-[#a89589] hover:text-white transition-colors cursor-pointer p-0.5"
                                        title="Copy Credential ID"
                                    >
                                        {copiedId ? (
                                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                    </button>
                                </div>
                                {copiedId && (
                                    <span className="text-[11px] text-emerald-400 font-mono animate-in fade-in">
                                        Copied!
                                    </span>
                                )}
                            </div>

                            {/* Direct 3rd-Party Verification Action Link */}
                            {selectedCert.verificationUrl && (
                                <a
                                    href={selectedCert.verificationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold font-mono tracking-wide bg-gradient-to-r from-[#eb1b38] to-[#c7122b] hover:from-[#ff2d4b] hover:to-[#eb1b38] text-white shadow-[0_0_16px_rgba(235,27,56,0.4)] transition-all cursor-pointer group active:scale-95 shrink-0"
                                >
                                    <span>{selectedCert.verificationLabel || "Verify Authenticity"}</span>
                                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            )}
                        </div>

                        {/* Skills / Covered Competencies */}
                        {selectedCert.skills && selectedCert.skills.length > 0 && (
                            <div className="w-full mb-3 flex flex-wrap items-center gap-1.5 shrink-0">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#a89589] mr-1">
                                    Competencies:
                                </span>
                                {selectedCert.skills.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className="px-2 py-0.5 rounded-md text-[10px] font-mono text-[#d4beab] bg-white/5 border border-white/10"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* High-Resolution Certificate Document Canvas */}
                        <div className="w-full flex-1 overflow-auto rounded-xl bg-black/90 p-2 sm:p-4 flex items-center justify-center border border-[#24171a] min-h-[220px]">
                            <img
                                src={selectedCert.src}
                                alt={selectedCert.title}
                                className="max-h-[58vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default PerspectiveTunnelHero;