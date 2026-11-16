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
    name: "ROSHAN GOWDA S",
    title: "Full-Stack Developer & Software Engineer",
    tagline: "Building scalable MERN applications, robust REST APIs, open-source packages, and responsive digital interfaces.",
    location: "Bengaluru, Karnataka, India",
    phone: "+91 6366309511",
    status: "SEEKING SOFTWARE DEVELOPER GRADUATE ASSOCIATE ROLES",
    email: "0243roshan@gmail.com",
    github: "https://github.com/roshangowdas",
    linkedin: "https://www.linkedin.com/in/roshan-gowda-s-378343283/",
    instagram: "https://www.instagram.com/roshan__gowda",
    twitter: "https://instagram.com/roshan__gowda",
    npm: "https://www.npmjs.com/~roshan__gowda",
    education: {
      institution: "Nagarjuna College of Engineering and Technology",
      degree: "Bachelor of Engineering (B.E.) in Information Science and Engineering",
      graduation: "Expected 2027",
      location: "Bengaluru, India",
      coursework: [
        "Data Structures and Algorithms",
        "Object-Oriented Programming",
        "Database Management Systems",
        "Computer Networks",
        "Machine Learning",
        "UX Design"
      ]
    },
    stats: [
      { label: "Graduation", value: "2027" },
      { label: "Web Apps Shipped", value: "10+" },
      { label: "npm Package", value: "Published" },
      { label: "AI Dev Velocity", value: "+35%" },
    ]
  },

  aboutMe: {
    introduction: "I am a Full-Stack Developer and Information Science & Engineering undergraduate at Nagarjuna College of Engineering and Technology, Bengaluru (graduating 2027). Skilled in the MERN stack, RESTful API engineering, and responsive interface craft.",
    education: "Pursuing Bachelor of Engineering (B.E.) in Information Science and Engineering at Nagarjuna College of Engineering and Technology, Bengaluru (Expected 2027), with coursework in Data Structures, OOP, DBMS, Computer Networks, and Machine Learning.",
    interests: "Passionate about full-stack web engineering, architecting reliable RESTful backends, creating open-source developer libraries, and leveraging AI-assisted engineering workflows for rapid code generation and optimization.",
    technologies: {
      languages: ["JavaScript", "Java", "Python", "C", "C++", "SQL"],
      frontend: ["React.js", "HTML5", "CSS3", "Responsive Web Design", "Tailwind CSS"],
      backend: ["Node.js", "Express.js", "RESTful APIs", "Firebase Authentication"],
      databases: ["MongoDB", "SQL"],
      tools: ["Git", "GitHub", "npm", "Firebase", "VS Code", "Antigravity", "Claude Code"]
    },
    careerGoals: "Seeking a Software Development Graduate Associate (Software Developer) role where I can contribute to mission-critical applications, engineer resilient distributed systems, and grow alongside visionary engineering teams.",
    approach: "Practice-driven and grounded in first-principles algorithmic problem solving. I embrace continuous learning, test-driven iteration, and building in public—leveraging AI-augmented workflows to boost velocity by 35% without compromising architectural rigor."
  },

  projects: [
    {
      id: "community-resource-platform",
      title: "COMMUNITY RESOURCE SHARING PLATFORM",
      subtitle: "Full-Stack Resource Exchange & Distribution Web Application",
      description: "A full-stack collaborative platform built with React.js, Node.js, Express.js, and MongoDB. Enables community members to list, request, and securely exchange local resources.",
      impact: "Designed and implemented 10 RESTful API endpoints secured with Firebase Authentication and modeled relational document schemas for high-speed query indexing.",
      tags: ["MERN Stack", "MongoDB", "Firebase Auth", "REST APIs"],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase Authentication", "REST APIs"],
      stats: [
        { label: "REST Endpoints", value: "10 Secured" },
        { label: "Auth Provider", value: "Firebase" },
        { label: "Database", value: "MongoDB" }
      ],
      year: "2026",
      demoUrl: "https://github.com/roshangowdas",
      githubUrl: "https://github.com/roshangowdas",
      featured: true
    },
    {
      id: "react-status-kit",
      title: "REACT-STATUS-KIT (NPM PACKAGE)",
      subtitle: "Open-Source React Component Library Published on npm",
      description: "An open-source React component library published to the official npm registry, designed for gracefully managing asynchronous UI loading, error boundaries, and success states in modern React applications.",
      impact: "Provides zero-dependency, lightweight, and customizable status badges and indicators for asynchronous React state management.",
      tags: ["React.js", "npm Package", "Open-Source", "JavaScript"],
      tech: ["React.js", "JavaScript", "npm Registry", "Rollup/Vite", "Semantic Versioning"],
      stats: [
        { label: "Platform", value: "npm Registry" },
        { label: "Package", value: "react-status-kit" },
        { label: "License", value: "MIT Open Source" }
      ],
      year: "2026",
      demoUrl: "https://www.npmjs.com/~roshan__gowda",
      githubUrl: "https://github.com/roshangowdas",
      npmUrl: "https://www.npmjs.com/~roshan__gowda",
      featured: true
    },
    {
      id: "ai-petcare",
      title: "AI-PETCARE",
      subtitle: "Interactive Pet Health Monitoring & Diagnostic Dashboard",
      description: "An interactive health monitoring web interface featuring dynamic analytics dashboards, responsive cross-device layouts, and intuitive pet diagnostic tracking.",
      impact: "Developed responsive cross-device views with dynamic health tracking metrics, achieving fluid sub-second interface responses.",
      tags: ["HTML5", "CSS3", "JavaScript", "UI Engineering"],
      tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Dashboard Analytics"],
      stats: [
        { label: "Interface", value: "Responsive Web" },
        { label: "Performance", value: "100% Mobile Ready" },
        { label: "Stack", value: "Modern Web Standards" }
      ],
      year: "2025",
      demoUrl: "https://github.com/roshangowdas",
      githubUrl: "https://github.com/roshangowdas",
      featured: true
    }
  ] as Project[],

  skillCategories: [
    {
      title: "Programming & Core Languages",
      code: "01 // CORE LANGUAGES",
      skills: [
        { name: "JavaScript (ES6+)", level: 95, note: "DOM, Async/Await, Prototypes, Event Loop" },
        { name: "Java", level: 88, note: "OOP, Collections Framework, Multithreading" },
        { name: "Python", level: 84, note: "Scripting, Automation, AI Integrations" },
        { name: "C & C++", level: 80, note: "Pointers, Memory Management, DSA Foundations" },
        { name: "SQL", level: 88, note: "Relational Queries, Joins, Schema Normalization" }
      ]
    },
    {
      title: "Frontend Engineering",
      code: "02 // FRONTEND CRAFT",
      skills: [
        { name: "React.js", level: 94, note: "Hooks, Context API, Component Lifecycle, Virtual DOM" },
        { name: "HTML5 & Semantic Web", level: 98, note: "Accessibility, Canvas, Modern Layout Standards" },
        { name: "CSS3 & Tailwind CSS", level: 95, note: "Flexbox, CSS Grid, Responsive Design, Animations" },
        { name: "Component Libraries (npm)", level: 90, note: "Authoring, Packaging, and Publishing to npm" }
      ]
    },
    {
      title: "Backend, Cloud & Databases",
      code: "03 // BACKEND & DATA",
      skills: [
        { name: "Node.js & Express.js", level: 92, note: "RESTful API Architecture, Middleware, Routing" },
        { name: "MongoDB", level: 90, note: "Document Modeling, Mongoose ODM, Aggregations" },
        { name: "Firebase Authentication", level: 92, note: "OAuth, JWT Validation, Role-Based Security" },
        { name: "Git, GitHub & npm", level: 95, note: "Version Control, CI/CD, Package Deployment" },
        { name: "AI Tooling (Antigravity / Claude)", level: 94, note: "Prompt Engineering, 35% Velocity Boost" }
      ]
    }
  ] as SkillCategory[],

  experiences: [
    {
      period: "DEC 2025 — JAN 2026",
      role: "Frontend Development Intern",
      company: "Cognifyz Technologies",
      location: "Bengaluru, India (Internship)",
      summary: "Developed and deployed 5+ responsive web interfaces with focus on cross-browser usability and responsive performance.",
      achievements: [
        "Developed and deployed 5+ responsive web interfaces using HTML5, CSS3, and JavaScript, improving mobile usability.",
        "Conducted comprehensive code audits and layout optimization, reducing cross-browser layout inconsistencies by 20%."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "Git"]
    },
    {
      period: "2026",
      role: "Full-Stack Developer & AI-Ready Engineering Trainee",
      company: "@ToriiMinds",
      location: "Bengaluru, India",
      summary: "Engineered full-stack applications with MERN stack while integrating state-of-the-art AI-assisted development pipelines.",
      achievements: [
        "Built 5 responsive full-stack web applications using React.js, Node.js, Express.js, and MongoDB.",
        "Improved engineering velocity and delivery speed by 35% using AI-assisted workflows for code generation and test optimization."
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "AI-Assisted Workflows", "Prompt Engineering"]
    }
  ] as ExperienceItem[],

  certifications: [
    { name: "Cisco Networking Academy: HTML and CSS Essentials", year: "2025" },
    { name: "Cisco Networking Academy: JavaScript Essentials 1 and 2", year: "2025" },
    { name: "Scaler Topics: Java Course", year: "2025" },
    { name: "IBM Skills Network (Cognitive Class): Prompt Engineering for Everyone", year: "2025" },
    { name: "Simplilearn: Claude AI", year: "2025" },
    { name: "AI for Beginners and Introduction to AI", year: "2025" }
  ]
};
