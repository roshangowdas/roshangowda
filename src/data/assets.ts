/**
 * Portfolio Image & Asset Registry
 * Central registry mapping all active and verified image assets across the portfolio.
 */

export interface AssetMeta {
  src: string;
  alt: string;
  description: string;
  usedIn: string[];
}

export const PORTFOLIO_IMAGES = {
  // 1. Hero & Branding
  hero: {
    characterPortrait: {
      src: "/images/character-l.png",
      alt: "Roshan Gowda Anime Illustration Portrait",
      description: "Central illustrated hero character portrait with dark crimson background aura",
      usedIn: ["src/App.tsx"],
    },
    creatorPhoto: {
      src: "/images/roshan.png",
      alt: "Roshan Gowda S",
      description: "Professional profile photo used for Open Graph, Twitter previews, and author metadata",
      usedIn: ["index.html"],
    },
  },

  // 2. Academic & Education
  education: {
    ncetCampus: {
      src: "/images/ncet-campus.jpg",
      alt: "Nagarjuna College of Engineering and Technology Campus",
      description: "Autonomous engineering campus photo displayed in interactive education hover preview",
      usedIn: ["src/components/EducationSection.tsx"],
    },
    ciscoBadge: {
      src: "/images/cisco-academy.webp",
      alt: "Cisco Networking Academy Credential Badge",
      description: "Cisco Networking Academy badge preview for certified coursework",
      usedIn: ["src/components/EducationSection.tsx"],
    },
  },

  // 3. Verified Certifications (Perspective Tunnel Reel)
  certificates: [
    {
      title: "HTML Essentials",
      issuer: "Cisco Networking Academy",
      year: "2025",
      src: "/images/certificate/HTML_Essentials_certificate_1nc23is050-ncetmail-com_d185e94b-bd43-47b5-bf24-2d697eef0e6d_page-0001.jpg",
      usedIn: ["src/components/ui/perspective-tunnel-hero.tsx"],
    },
    {
      title: "CSS Essentials",
      issuer: "Cisco Networking Academy",
      year: "2025",
      src: "/images/certificate/CSS_Essentials_certificate_1nc23is050-ncetmail-com_86bf9af0-d171-4674-ba60-17af2bbae2d4_page-0001.jpg",
      usedIn: ["src/components/ui/perspective-tunnel-hero.tsx"],
    },
    {
      title: "JavaScript Essentials 1",
      issuer: "Cisco Networking Academy",
      year: "2025",
      src: "/images/certificate/javascript%20essents-1.png",
      usedIn: ["src/components/ui/perspective-tunnel-hero.tsx"],
    },
    {
      title: "JavaScript Essentials 2",
      issuer: "Cisco Networking Academy",
      year: "2025",
      src: "/images/certificate/JavaScript_Essentials_2_certificate.jpg",
      usedIn: ["src/components/ui/perspective-tunnel-hero.tsx"],
    },
    {
      title: "Java Course Specialization",
      issuer: "Scaler Topics",
      year: "2025",
      src: "/images/certificate/java.png",
      usedIn: ["src/components/ui/perspective-tunnel-hero.tsx"],
    },
    {
      title: "Python Programming",
      issuer: "Technical Specialization",
      year: "2025",
      src: "/images/certificate/python.jpg",
      usedIn: ["src/components/ui/perspective-tunnel-hero.tsx"],
    },
    {
      title: "Generative AI Fundamentals",
      issuer: "IBM Skills Network / Cognitive Class",
      year: "2025",
      src: "/images/certificate/generative%20ai_page-0001.jpg",
      usedIn: ["src/components/ui/perspective-tunnel-hero.tsx"],
    },
    {
      title: "Frontend Development Intern",
      issuer: "Cognifyz Technologies",
      year: "2025–2026",
      src: "/images/certificate/Front-End%20Development%20Intern.jpg",
      usedIn: ["src/components/ui/perspective-tunnel-hero.tsx"],
    },
  ],

  // 4. Tech Stack Vector Icons (3D Sphere Gallery)
  techIcons: [
    { name: "JavaScript", src: "/images/tech/javascript.svg" },
    { name: "Java", src: "/images/tech/java.svg" },
    { name: "Python", src: "/images/tech/python.svg" },
    { name: "C", src: "/images/tech/c.svg" },
    { name: "C++", src: "/images/tech/cpp.svg" },
    { name: "SQL", src: "/images/tech/sql.svg" },
    { name: "React.js", src: "/images/tech/react.svg" },
    { name: "HTML5", src: "/images/tech/html5.svg" },
    { name: "CSS3", src: "/images/tech/css3.svg" },
    { name: "Tailwind CSS", src: "/images/tech/tailwind.svg" },
    { name: "TypeScript", src: "/images/tech/typescript.svg" },
    { name: "Node.js", src: "/images/tech/nodejs.svg" },
    { name: "Express.js", src: "/images/tech/express.svg" },
    { name: "MongoDB", src: "/images/tech/mongodb.svg" },
    { name: "REST APIs", src: "/images/tech/restapi.svg" },
    { name: "Git", src: "/images/tech/git.svg" },
    { name: "Firebase", src: "/images/tech/firebase.svg" },
  ],
} as const;
