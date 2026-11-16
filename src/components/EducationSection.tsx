import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export interface EducationPreviewItem {
  image: string;
  title: string;
  subtitle: string;
  tag: string;
  imageClassName?: string;
}

const EDUCATION_PREVIEWS: Record<string, EducationPreviewItem> = {
  ncet: {
    image: "/images/ncet-campus.jpg",
    title: "Nagarjuna College of Engineering & Technology",
    subtitle: "Premier autonomous engineering campus in Bengaluru, affiliated with VTU.",
    tag: "CAMPUS // 2023–2027",
    imageClassName: "w-[280px] h-[195px] object-cover object-[center_12%] rounded-xl block shadow-md",
  },
  ise: {
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    title: "Information Science & Engineering",
    subtitle: "Specialized in software systems, algorithms, distributed computing and databases.",
    tag: "BACHELOR OF ENGINEERING",
  },
  dsa: {
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    title: "Data Structures & Algorithms",
    subtitle: "Mastery in asymptotic complexity, trees, graphs, sorting & dynamic programming.",
    tag: "CORE FOUNDATION",
  },
  dbms: {
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80",
    title: "Database Management Systems",
    subtitle: "Relational schema normalization, SQL query optimization & MongoDB indexing.",
    tag: "DATA ARCHITECTURE",
  },
  ml: {
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
    title: "Machine Learning & AI Tooling",
    subtitle: "Model architectures, feature engineering and prompt-engineered workflows.",
    tag: "AI & INTELLIGENCE",
  },
  networks: {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    title: "Computer Networks & Protocols",
    subtitle: "TCP/IP socket communication, HTTP/HTTPS client-server models and REST APIs.",
    tag: "SYSTEM NETWORKING",
  },
  cisco: {
    image: "/images/cisco-academy.webp",
    title: "Cisco Networking Academy",
    subtitle: "Verified credentials in HTML/CSS Essentials and JavaScript Essentials 1 & 2.",
    tag: "CISCO CERTIFIED",
    imageClassName: "w-[280px] h-[155px] object-contain bg-white rounded-xl block shadow-md p-4",
  },
  ibm: {
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    title: "IBM Skills Network (Cognitive Class)",
    subtitle: "Prompt Engineering for Everyone — advanced prompt design and AI optimization.",
    tag: "IBM CREDENTIAL",
  },
  scaler: {
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    title: "Scaler Topics Java Specialization",
    subtitle: "In-depth OOP mastery, JVM architecture, thread safety and collections.",
    tag: "SCALER CERTIFIED",
  },
};

export const EducationSection: React.FC = () => {
  const [activePreview, setActivePreview] = useState<EducationPreviewItem | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Preload images
  useEffect(() => {
    Object.values(EDUCATION_PREVIEWS).forEach((item) => {
      const img = new Image();
      if (!item.image.startsWith("/")) {
        img.crossOrigin = "anonymous";
      }
      img.src = item.image;
    });
  }, []);

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardEl = cardRef.current;
    const cardWidth = cardEl?.offsetWidth || 300;
    const cardHeight = cardEl?.offsetHeight || 260;
    const offsetY = 16;

    let x = e.clientX - cardWidth / 2;
    let y = e.clientY - cardHeight - offsetY;

    if (x + cardWidth > window.innerWidth - 16) {
      x = window.innerWidth - cardWidth - 16;
    }
    if (x < 16) {
      x = 16;
    }

    if (y < 16) {
      y = e.clientY + offsetY + 20;
    }

    setPosition({ x, y });
  }, []);

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      const item = EDUCATION_PREVIEWS[key];
      if (item) {
        setActivePreview(item);
        setIsVisible(true);
        updatePosition(e);
      }
    },
    [updatePosition]
  );

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) {
        updatePosition(e);
      }
    },
    [isVisible, updatePosition]
  );

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <section
      id="education"
      className="relative w-full bg-black text-[#f5ece3] pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 sm:px-10 lg:px-20 overflow-hidden flex flex-col select-none"
    >
      {/* Ambient Crimson & Gold Glows */}
      <div
        className="absolute top-1/3 right-1/4 w-[550px] h-[550px] rounded-full blur-[180px] pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(235, 27, 56, 0.4) 0%, rgba(212, 190, 171, 0.15) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(235, 27, 56, 0.35) 0%, transparent 70%)",
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

      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-['Inter',sans-serif] font-black text-[clamp(1.75rem,6.5vw,4.5rem)] tracking-tight text-[#f5ece3] mb-5 sm:mb-8 uppercase"
        >
          EDUCATION <span className="text-[#eb1b38]">&amp; JOURNEY</span>
        </motion.h2>

        {/* 1. Fluid Interactive Hover-Preview Narrative Block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl font-['Inter',sans-serif] text-[clamp(1.05rem,2.8vw,1.875rem)] font-medium leading-[1.65] text-[#9c8e84] tracking-tight"
        >
          <p className="mb-4 sm:mb-5">
            Currently pursuing a{" "}
            <span
              onMouseEnter={(e) => handleHoverStart("ise", e)}
              onMouseMove={handleHoverMove}
              onMouseLeave={handleHoverEnd}
              className="text-[#f5ece3] font-bold cursor-pointer relative inline-block transition-colors hover:text-[#eb1b38] underline decoration-[#eb1b38]/50 decoration-2 underline-offset-8"
            >
              Bachelor of Engineering in Information Science
            </span>{" "}
            at{" "}
            <span
              onMouseEnter={(e) => handleHoverStart("ncet", e)}
              onMouseMove={handleHoverMove}
              onMouseLeave={handleHoverEnd}
              className="text-[#f5ece3] font-bold cursor-pointer relative inline-block transition-colors hover:text-[#eb1b38] underline decoration-[#eb1b38]/50 decoration-2 underline-offset-8"
            >
              Nagarjuna College of Engineering and Technology
            </span>
            , Bengaluru (Graduating 2027).
          </p>

          <p>
            Augmented with industry-recognized certifications from{" "}
            <span
              onMouseEnter={(e) => handleHoverStart("cisco", e)}
              onMouseMove={handleHoverMove}
              onMouseLeave={handleHoverEnd}
              className="text-[#f5ece3] font-semibold cursor-pointer relative inline-block transition-colors hover:text-[#eb1b38] underline decoration-[#eb1b38]/30 underline-offset-4"
            >
              Cisco Networking Academy
            </span>
            .
          </p>
        </motion.div>
      </div>

      {/* Floating Hover Preview Card matching component style */}
      {activePreview && (
        <div
          ref={cardRef}
          className={`fixed pointer-events-none z-[9999] max-w-[calc(100vw-32px)] transition-all duration-200 ease-out will-change-transform ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <div className="bg-[#120d0f]/95 rounded-2xl p-2.5 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95),0_0_0_1px_rgba(235,27,56,0.35),0_0_40px_rgba(235,27,56,0.2)] backdrop-blur-xl border border-[#331c22] max-w-full overflow-hidden">
            <img
              src={activePreview.image}
              alt={activePreview.title}
              className={
                activePreview.imageClassName ||
                "w-[280px] h-[155px] object-cover rounded-xl block shadow-md"
              }
            />
            <div className="mt-2.5 px-1.5 pb-1">
              <span className="inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-[#eb1b38] bg-[#eb1b38]/15 border border-[#eb1b38]/30 rounded">
                {activePreview.tag}
              </span>
              <h5 className="font-['Inter',sans-serif] font-bold text-sm text-white mt-1.5 leading-snug">
                {activePreview.title}
              </h5>
              <p className="font-['Inter',sans-serif] text-xs text-[#a89589] mt-1 leading-normal">
                {activePreview.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EducationSection;

