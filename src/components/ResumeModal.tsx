import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Copy,
  Check,
  Printer,
  FileText,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Sparkles,
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NpmLogo = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
  </svg>
);

const RAW_RESUME_TEXT = `============================================================
ROSHAN GOWDA S — FULL-STACK DEVELOPER
Bengaluru, Karnataka, India | 0243roshan@gmail.com
GitHub: https://github.com/roshangowdas | LinkedIn: https://www.linkedin.com/in/roshan-gowda-s-378343283/ | npm: https://www.npmjs.com/~roshan__gowda | Instagram: @roshan__gowda
============================================================

PROFESSIONAL SUMMARY:
Full-Stack Developer and Information Science and Engineering undergraduate (graduating 2027) skilled in JavaScript, React.js, Node.js, Express.js, and MongoDB. Experienced in building MERN stack applications, designing REST APIs, database modeling, Firebase Authentication, and responsive user interfaces. Published an open-source React component library (react-status-kit) on npm and completed a frontend development internship. Seeking a Software Development Graduate Associate (Software Developer) role.

EDUCATION:
• Nagarjuna College of Engineering and Technology, Bengaluru, India
  Bachelor of Engineering (B.E.) in Information Science and Engineering (Expected 2027)
  Relevant Coursework: Data Structures and Algorithms, OOP, DBMS, Computer Networks, ML, UX Design

TECHNICAL SKILLS:
• Programming Languages: JavaScript, Java, Python, C, C++, SQL
• Frontend: React.js, HTML5, CSS3, Tailwind CSS, Responsive Web Design
• Backend & APIs: Node.js, Express.js, RESTful APIs, Firebase Authentication
• Databases: MongoDB, SQL
• Tools & Platforms: Git, GitHub, npm, Firebase, VS Code, Vite, Postman

EXPERIENCE:
• Frontend Development Intern | Cognifyz Technologies (Dec 2025 – Jan 2026)
  - Developed and deployed 5+ responsive production web interfaces using HTML5, CSS3, and JavaScript.
  - Conducted code audits and optimization, reducing cross-browser inconsistencies by 20%.
• Full-Stack Developer Trainee | @ToriiMinds (2026)
  - Built 5 responsive full-stack web applications using React.js, Node.js, Express.js, MongoDB.
  - Structured modular REST APIs and implemented responsive UI components with clean state management.

KEY PROJECTS:
• CollabSpace (2026): Real-Time Team Collaboration SaaS • Supabase RLS • Kanban & Docs
  - Multi-tenant team workspace with 16-table PostgreSQL RLS, realtime sync, sprint boards & document editing.
• Community Resource Sharing Platform (2026): MERN Stack, MongoDB, Firebase Auth, 10 REST APIs
  - Real-time community resource exchange platform with secured Firebase authentication and MongoDB indexing.
• react-status-kit (2026): Open-Source React component library published on npm
  - Published zero-dependency component library for async lifecycle visualization (loading, success, error, empty, idle).
• AI-PetCare (2025): Interactive pet health monitoring web interface
  - Responsive pet diagnostic dashboard with interactive triage flows and analytics.

CERTIFICATIONS:
• Cisco Networking Academy: HTML Essentials, CSS Essentials, JavaScript Essentials 1 & 2
• IBM Skills Network (Cognitive Class): Generative AI & Prompt Engineering
• Scaler Topics: Java Course Specialization (OOP, JVM, Collections)

[Roshan Gowda S — Portfolio Verified Resume]`;

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copiedText, setCopiedText] = useState(false);
  const [downloadingTxt, setDownloadingTxt] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleCopyRawText = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(RAW_RESUME_TEXT);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2400);
    }
  };

  const handleDownloadTxt = () => {
    setDownloadingTxt(true);
    const element = document.createElement("a");
    const file = new Blob([RAW_RESUME_TEXT], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "Roshan-Gowda-S-Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setTimeout(() => setDownloadingTxt(false), 1200);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 select-none overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer no-print"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[94vh] sm:max-h-[90vh] bg-[#0c080a] border border-[#3b1f25] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(235,27,56,0.2)] flex flex-col overflow-hidden text-zinc-100"
        >
          {/* Top Control Bar (Never Printed) */}
          <div className="no-print h-14 sm:h-16 px-4 sm:px-6 border-b border-[#2b171c] flex items-center justify-between bg-[#120d0f]/95 shrink-0 gap-3">
            
            {/* Left: Document Info */}
            <div className="flex items-center gap-2.5 font-mono text-xs text-[#f5ece3] overflow-hidden truncate">
              <span className="w-2 h-2 rounded-full bg-[#eb1b38] animate-pulse shrink-0" />
              <div className="flex flex-col">
                <span className="font-bold tracking-wider text-xs uppercase truncate">
                  Roshan-Gowda-Resume.pdf
                </span>
                <span className="text-[10px] text-[#a89589] tracking-widest hidden sm:inline">
                  ATS OPTIMIZED // 2026 EDITION
                </span>
              </div>
            </div>

            {/* Right: Actions Toolbar */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Copy Plaintext Action */}
              <button
                type="button"
                onClick={handleCopyRawText}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  copiedText
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : "bg-white/5 hover:bg-white/10 text-[#d4beab] hover:text-white border border-white/10"
                }`}
                title="Copy ATS-friendly plaintext resume to clipboard"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#eb1b38]" />
                    <span className="hidden sm:inline">Copy Plaintext</span>
                    <span className="sm:hidden">Copy</span>
                  </>
                )}
              </button>

              {/* Download PDF Action */}
              <button
                type="button"
                onClick={handlePrintPdf}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-[#eb1b38] hover:bg-[#ff263e] border border-[#ff4d64]/40 shadow-[0_0_18px_rgba(235,27,56,0.45)] hover:shadow-[0_0_25px_rgba(235,27,56,0.7)] transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95"
                title="Print or Save as Vector PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>

              {/* Close Modal Trigger */}
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl bg-white/5 hover:bg-[#eb1b38]/20 text-[#a89589] hover:text-white border border-white/10 hover:border-[#eb1b38]/50 transition-colors cursor-pointer ml-1"
                aria-label="Close Resume Preview"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Styled In-Browser Resume Preview Canvas */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 select-text">
            
            {/* The Printable Page Canvas (#printable-resume) */}
            <div
              id="printable-resume"
              className="max-w-3xl mx-auto bg-[#140d0f] border border-[#2b171c] rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black font-['Inter',sans-serif] text-[#f5ece3] space-y-6 sm:space-y-8 print:p-0 print:border-none print:shadow-none print:bg-white print:text-black"
            >
              {/* Header: Name, Title & Contacts */}
              <div className="border-b border-white/10 pb-5 sm:pb-6 print:border-black/20">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white print:text-black uppercase">
                    Roshan Gowda S
                  </h1>
                  <span className="font-mono text-xs text-[#eb1b38] font-bold tracking-widest uppercase print:text-black">
                    FULL-STACK DEVELOPER
                  </span>
                </div>

                <p className="font-mono text-xs text-[#c2b1a3] mt-2 leading-relaxed print:text-black/80 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#eb1b38] print:text-black" />
                    <span>Bengaluru, Karnataka, India</span>
                  </span>
                  <a href="mailto:0243roshan@gmail.com" className="hover:text-white transition-colors inline-flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#eb1b38] print:text-black" />
                    <span>0243roshan@gmail.com</span>
                  </a>
                </p>

                {/* Social & Registry Links */}
                <div className="flex flex-wrap items-center gap-3 mt-3 font-mono text-[11px] text-[#eb1b38] print:text-black">
                  <a
                    href="https://github.com/roshangowdas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    <Github className="w-3 h-3" />
                    <span>github.com/roshangowdas</span>
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.linkedin.com/in/roshan-gowda-s-378343283/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    <Linkedin className="w-3 h-3" />
                    <span>linkedin.com/in/roshan-gowda-s</span>
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.npmjs.com/~roshan__gowda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    <NpmLogo className="w-3 h-3" />
                    <span>npmjs.com/~roshan__gowda</span>
                  </a>
                </div>
              </div>

              {/* Section 1: Professional Summary */}
              <div className="space-y-2">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#eb1b38] print:text-black flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Professional Summary</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#d4beab] print:text-black/90 leading-relaxed font-normal">
                  Full-Stack Developer and Information Science &amp; Engineering undergraduate (graduating 2027) skilled in JavaScript, React.js, Node.js, Express.js, and MongoDB. Experienced in building MERN stack architectures, designing RESTful APIs, relational/document database modeling, Firebase Authentication, and high-performance responsive user interfaces. Author of the open-source React component library <strong className="text-white print:text-black font-semibold">react-status-kit</strong> published on npm and completed a frontend development internship at Cognifyz Technologies. Seeking a Software Development Graduate Associate (Software Developer) role.
                </p>
              </div>

              {/* Section 2: Technical Skills */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#eb1b38] print:text-black flex items-center gap-2">
                  <Code className="w-3.5 h-3.5" />
                  <span>Technical Skills</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-[#d4beab] print:text-black">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 print:bg-transparent print:border-black/10">
                    <span className="text-white font-bold block mb-1 print:text-black">Programming Languages:</span>
                    <span>JavaScript (ES6+), Java, Python, C, C++, SQL</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 print:bg-transparent print:border-black/10">
                    <span className="text-white font-bold block mb-1 print:text-black">Frontend Development:</span>
                    <span>React.js, HTML5, CSS3, Tailwind CSS, Responsive Web Design</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 print:bg-transparent print:border-black/10">
                    <span className="text-white font-bold block mb-1 print:text-black">Backend &amp; APIs:</span>
                    <span>Node.js, Express.js, RESTful APIs, Firebase Auth</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 print:bg-transparent print:border-black/10">
                    <span className="text-white font-bold block mb-1 print:text-black">Databases &amp; Tools:</span>
                    <span>MongoDB, SQL, Git, GitHub, npm, Vite, VS Code, Postman</span>
                  </div>
                </div>
              </div>

              {/* Section 3: Professional Experience */}
              <div className="space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#eb1b38] print:text-black flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Experience</span>
                </h2>

                {/* Role 1 */}
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-sm font-bold text-white print:text-black">
                    <span>Frontend Development Intern</span>
                    <span className="text-xs font-mono font-normal text-[#eb1b38] print:text-black">
                      Dec 2025 – Jan 2026
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#a89589] print:text-black/70">
                    Cognifyz Technologies • Bengaluru, India (Remote)
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-[13px] text-[#c2b1a3] print:text-black/85 space-y-1 pt-1 leading-relaxed">
                    <li>Developed and deployed 5+ responsive production interfaces using HTML5, CSS3, and modern JavaScript.</li>
                    <li>Conducted cross-browser optimization and code refactoring, reducing UI inconsistencies by 20%.</li>
                    <li>Collaborated in agile sprints, validating accessibility standards and mobile viewport responsiveness.</li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="space-y-1 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-sm font-bold text-white print:text-black">
                    <span>Full-Stack Developer Trainee</span>
                    <span className="text-xs font-mono font-normal text-[#eb1b38] print:text-black">
                      2026
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#a89589] print:text-black/70">
                    @ToriiMinds • Bengaluru, India
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-[13px] text-[#c2b1a3] print:text-black/85 space-y-1 pt-1 leading-relaxed">
                    <li>Built 5 responsive full-stack web applications using React.js, Node.js, Express.js, and MongoDB.</li>
                    <li>Structured modular REST APIs with route controllers and implemented reusable React components with clean state management.</li>
                  </ul>
                </div>
              </div>

              {/* Section 4: Key Projects */}
              <div className="space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#eb1b38] print:text-black flex items-center gap-2">
                  <Code className="w-3.5 h-3.5" />
                  <span>Key Projects</span>
                </h2>

                {/* Project 1: CollabSpace */}
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-sm font-bold text-white print:text-black">
                    <span>CollabSpace (Real-Time Team Collaboration SaaS)</span>
                    <span className="text-xs font-mono font-normal text-[#eb1b38] print:text-black">
                      Supabase &amp; React • 2026
                    </span>
                  </div>
                  <p className="text-xs text-[#a89589] print:text-black/70 font-mono">
                    React.js, Vite, Supabase, PostgreSQL, Tailwind CSS, Row Level Security (RLS), WebSockets
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#c2b1a3] print:text-black/85 leading-relaxed">
                    Engineered a multi-tenant collaboration workspace featuring 16 PostgreSQL tables, strict Row Level Security policies, real-time Kanban boards, collaborative document editing, sliding-window rate limiting, and 100% test pass rate across 74 unit tests and 17 security audit domains.
                  </p>
                </div>

                {/* Project 2: Community Resource Sharing Platform */}
                <div className="space-y-1 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-sm font-bold text-white print:text-black">
                    <span>Community Resource Sharing Platform</span>
                    <span className="text-xs font-mono font-normal text-[#a89589] print:text-black">
                      MERN Stack • 2026
                    </span>
                  </div>
                  <p className="text-xs text-[#a89589] print:text-black/70 font-mono">
                    React.js, Node.js, Express.js, MongoDB, Firebase Authentication, REST APIs
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#c2b1a3] print:text-black/85 leading-relaxed">
                    Built a full-stack community resource exchange application featuring Firebase Authentication, 10 secure RESTful endpoints, and MongoDB data modeling for listings, bookings, and user profiles.
                  </p>
                </div>

                {/* Project 2 */}
                <div className="space-y-1 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-sm font-bold text-white print:text-black">
                    <span>react-status-kit (Open-Source npm Package)</span>
                    <span className="text-xs font-mono font-normal text-[#eb1b38] print:text-black">
                      npm Registry • 2026
                    </span>
                  </div>
                  <p className="text-xs text-[#a89589] print:text-black/70 font-mono">
                    React.js, TypeScript, npm Registry, Rollup/Vite, Zero-Dependencies
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#c2b1a3] print:text-black/85 leading-relaxed">
                    Authored and published an open-source React component library to the official npm registry for declarative async lifecycle state handling (loading, success, error, empty, idle) with zero dependencies.
                  </p>
                </div>

                {/* Project 3 */}
                <div className="space-y-1 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-sm font-bold text-white print:text-black">
                    <span>AI-PetCare</span>
                    <span className="text-xs font-mono font-normal text-[#a89589] print:text-black">
                      Frontend Architecture • 2025
                    </span>
                  </div>
                  <p className="text-xs text-[#a89589] print:text-black/70 font-mono">
                    HTML5, CSS3, JavaScript (ES6+), Responsive UI, Diagnostic Analytics
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#c2b1a3] print:text-black/85 leading-relaxed">
                    Engineered an interactive health monitoring web interface featuring diagnostic triage flows, mobile-first responsiveness, and client-side form validation.
                  </p>
                </div>
              </div>

              {/* Section 5: Education */}
              <div className="space-y-2">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#eb1b38] print:text-black flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Education</span>
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-sm font-bold text-white print:text-black">
                  <span>Nagarjuna College of Engineering and Technology</span>
                  <span className="text-xs font-mono font-normal text-[#eb1b38] print:text-black">
                    Expected 2027
                  </span>
                </div>
                <div className="text-xs font-mono text-[#a89589] print:text-black/70">
                  Bachelor of Engineering (B.E.) in Information Science and Engineering • Bengaluru, India
                </div>
                <p className="text-xs text-[#c2b1a3] print:text-black/85 leading-relaxed">
                  Relevant Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems (DBMS), Computer Networks, Machine Learning, User Experience Design.
                </p>
              </div>

              {/* Section 6: Verified Credentials & Certifications */}
              <div className="space-y-2">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#eb1b38] print:text-black flex items-center gap-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Verified Credentials</span>
                </h2>
                <ul className="text-xs font-mono text-[#d4beab] print:text-black/85 space-y-1 list-disc list-inside leading-relaxed">
                  <li><strong className="text-white print:text-black">Cisco Networking Academy:</strong> HTML Essentials, CSS Essentials, JavaScript Essentials 1 &amp; 2 (2025–2026)</li>
                  <li><strong className="text-white print:text-black">IBM Skills Network:</strong> Generative AI &amp; Prompt Engineering Fundamentals (Cognitive Class 2025)</li>
                  <li><strong className="text-white print:text-black">Scaler Topics:</strong> Java Specialization (OOP, JVM Architecture, Collections 2025)</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Modal Bottom Status Colophon */}
          <div className="no-print h-12 px-4 sm:px-6 border-t border-[#2b171c] bg-[#0a0607] flex items-center justify-between text-[11px] font-mono text-[#a89589] shrink-0">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#eb1b38]" />
              <span>Available for Software Developer Roles (Bengaluru / Remote)</span>
            </span>

            <button
              type="button"
              onClick={handleDownloadTxt}
              className="text-[#c2b1a3] hover:text-white transition-colors cursor-pointer flex items-center gap-1 underline underline-offset-2"
              title="Download pure .txt file"
            >
              <Download className="w-3 h-3 text-[#eb1b38]" />
              <span>{downloadingTxt ? "Downloading..." : "Download Raw .txt"}</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
