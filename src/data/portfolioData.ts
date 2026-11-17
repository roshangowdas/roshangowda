export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  impact: string;
  tags: string[];
  tech: string[];
  stats: { label: string; value: string }[];
  year: string;
  demoUrl?: string;
  githubUrl?: string;
  npmUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  code: string;
  skills: { name: string; level: number; note: string }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Roshan Gowda S",
    title: "Full-Stack Developer",
    tagline: "Building responsive web applications, REST APIs, and open-source UI tools with React, TypeScript, and Node.js.",
    location: "Bengaluru, India",
    status: "Available for software engineering roles",
    email: "0243roshan@gmail.com",
    github: "https://github.com/roshangowdas",
    linkedin: "https://www.linkedin.com/in/roshan-gowda-s-378343283/",
    instagram: "https://www.instagram.com/roshan__gowda",
    npm: "https://www.npmjs.com/~roshan__gowda",
    education: {
      institution: "Nagarjuna College of Engineering and Technology",
      degree: "Information Science and Engineering",
      graduation: "2027",
      location: "Bengaluru, India",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Database Management Systems",
        "Computer Networks",
        "Web Engineering",
        "User Interface Design"
      ]
    },
    stats: [
      { label: "Focus", value: "React & Node" },
      { label: "Shipped", value: "5+ Web Apps" },
      { label: "Open Source", value: "react-status-kit" },
      { label: "Status", value: "Open to Roles" }
    ]
  },

  aboutMe: {
    introduction: "I am a full-stack developer based in Bengaluru focused on building clean, accessible web applications and reliable backends. I work primarily with React, TypeScript, Node.js, and MongoDB, with an emphasis on maintainable component architecture and fast runtime performance.",
    interests: "I care about the details that make software enjoyable to use: predictable state transitions, responsive layouts that hold up across devices, clean API contracts, and light bundle sizes.",
    technologies: {
      languages: ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "SQL", "C++"],
      frontend: ["React.js", "Tailwind CSS", "HTML5 & Semantic Web", "CSS3 / Modern Layouts"],
      backend: ["Node.js", "Express.js", "RESTful API Design", "Firebase Authentication"],
      databases: ["MongoDB (Mongoose)", "SQL"],
      tools: ["Git & GitHub", "npm Packaging", "Vite", "VS Code", "Postman"]
    },
    approach: "I prefer clear, readable code over clever abstractions. Whether implementing a multi-step user flow or publishing an npm library, my focus is on thoughtful ergonomics, thorough testing, and shipping software that works reliably."
  },

  projects: [
    {
      id: "community-resource-platform",
      title: "Community Resource Sharing Platform",
      subtitle: "Full-stack web application for local resource sharing",
      description: "A collaborative web platform where community members can list available tools, borrow shared items, and coordinate pickups. Built with React on the client and Express on the backend.",
      impact: "Implemented 10 RESTful API endpoints with schema validation, role-based access via Firebase Authentication, and MongoDB indexing to keep queries fast as inventory grows.",
      tags: ["React", "Node.js", "Express", "MongoDB", "Firebase Auth"],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase Authentication", "REST APIs"],
      stats: [
        { label: "Backend", value: "10 REST Endpoints" },
        { label: "Auth", value: "Firebase Session" },
        { label: "Database", value: "MongoDB" }
      ],
      year: "2026",
      demoUrl: "https://github.com/roshangowdas",
      githubUrl: "https://github.com/roshangowdas",
      featured: true
    },
    {
      id: "react-status-kit",
      title: "react-status-kit",
      subtitle: "Open-source React component library published to npm",
      description: "A lightweight, zero-dependency component kit for managing asynchronous UI states: loading skeletons, success confirmations, accessible error boundaries, and empty states.",
      impact: "Packaged with TypeScript types, tree-shakeable ESM/CJS exports, and published to the public npm registry for developers building dashboard-heavy interfaces.",
      tags: ["React", "TypeScript", "npm", "Open Source"],
      tech: ["React.js", "TypeScript", "npm Registry", "Vite / Rollup", "Semantic Versioning"],
      stats: [
        { label: "Bundle Size", value: "< 8 KB gzipped" },
        { label: "Dependencies", value: "Zero Runtime" },
        { label: "Package", value: "npm Registry" }
      ],
      year: "2026",
      demoUrl: "https://www.npmjs.com/~roshan__gowda",
      githubUrl: "https://github.com/roshangowdas",
      npmUrl: "https://www.npmjs.com/~roshan__gowda",
      featured: true
    },
    {
      id: "ai-petcare",
      title: "AI-PetCare",
      subtitle: "Interactive pet health tracking dashboard",
      description: "A responsive health dashboard providing daily care logs, symptom tracking, and diagnostic checklists for pet owners.",
      impact: "Engineered responsive, mobile-first layouts with accessible form validation and client-side charts, maintaining sub-15ms interaction response times.",
      tags: ["JavaScript", "HTML5", "CSS3", "UI Design"],
      tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Data Visualization"],
      stats: [
        { label: "Layout", value: "Mobile First" },
        { label: "Validation", value: "Client-side" },
        { label: "Platform", value: "Web Standards" }
      ],
      year: "2025",
      demoUrl: "https://github.com/roshangowdas",
      githubUrl: "https://github.com/roshangowdas",
      featured: true
    }
  ] as Project[],

  skillCategories: [
    {
      title: "Core Languages",
      code: "01 // LANGUAGES",
      skills: [
        { name: "JavaScript (ES6+)", level: 94, note: "Async/await, closures, prototypes, event loop" },
        { name: "TypeScript", level: 88, note: "Static types, interfaces, generics, compiler setup" },
        { name: "Java", level: 86, note: "OOP principles, collections, JVM memory model" },
        { name: "Python", level: 82, note: "Scripting, tooling, automation scripts" },
        { name: "SQL", level: 85, note: "Relational queries, schema design, joins" }
      ]
    },
    {
      title: "Frontend Development",
      code: "02 // FRONTEND",
      skills: [
        { name: "React.js", level: 94, note: "Hooks, component composition, state management" },
        { name: "Tailwind CSS", level: 92, note: "Utility-first layouts, design tokens, responsive breakpoints" },
        { name: "HTML5 & Web Standards", level: 96, note: "Semantic structure, accessible forms, WCAG basics" },
        { name: "Component Libraries", level: 90, note: "Authoring, documentation, and publishing to npm" }
      ]
    },
    {
      title: "Backend & Infrastructure",
      code: "03 // BACKEND & DATA",
      skills: [
        { name: "Node.js & Express", level: 90, note: "REST API routing, middleware, error handling" },
        { name: "MongoDB & Mongoose", level: 88, note: "Schema validation, document relationships, indexing" },
        { name: "Firebase Auth", level: 88, note: "Token verification, OAuth providers, security rules" },
        { name: "Git & Version Control", level: 92, note: "Branching workflows, semantic commits, code reviews" }
      ]
    }
  ] as SkillCategory[],

  experiences: [
    {
      period: "DEC 2025 — JAN 2026",
      role: "Frontend Development Intern",
      company: "Cognifyz Technologies",
      location: "Bengaluru, India",
      summary: "Built responsive client-facing interfaces with an emphasis on layout consistency and mobile usability.",
      achievements: [
        "Delivered production-ready web interfaces across desktop and mobile screen widths.",
        "Audited cross-browser CSS and fixed responsive layout inconsistencies across Chrome, Safari, and Firefox."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git"]
    },
    {
      period: "2026",
      role: "Full-Stack Developer Trainee",
      company: "@ToriiMinds",
      location: "Bengaluru, India",
      summary: "Built full-stack web applications with the MERN stack and modern developer workflows.",
      achievements: [
        "Developed full-stack web applications connecting React frontends with Node/Express REST APIs and MongoDB.",
        "Structured modular component hierarchies and integrated modern development tools for automated linting and testing."
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git"]
    }
  ] as ExperienceItem[],

  certifications: [
    { name: "Cisco Networking Academy: HTML & CSS Essentials", year: "2025" },
    { name: "Cisco Networking Academy: JavaScript Essentials 1 & 2", year: "2026" },
    { name: "Red Hat: Python Programming Specialization", year: "2026" },
    { name: "Scaler Topics: Java Course Specialization", year: "2026" },
    { name: "IBM Skills Network: Generative AI Fundamentals", year: "2025" }
  ]
};
