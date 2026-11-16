# Roshan — Systems Architect & Full-Stack Creative Engineer Portfolio

A futuristic, high-performance portfolio featuring an interactive WebGL CAD Vector Wordmark hero rig, 3D rotating skills sphere with matrix view toggle, low-latency telemetry readouts, interactive open-source component playground, global command palette, and React Bits physics controls.

---

## 🌟 Key Features

- **Interactive WebGL Vector Wordmark**:
  - Custom GLSL fragment shader simulating CAD vector rigs with dashed lines, vertex handles, and live coordinate readouts (`[gx, gy]`).
  - Interactive mouse reach reveal: reveals sharp dot-matrix rasterized typography while blurring outward with a 6-tap randomized disc blur.
  - Automatic radar sweep animation when cursor is idle.
  - Fully responsive across desktop, tablet, and mobile devices (scales font size dynamically with container width).
- **Live Rig Inspector & Shader Tuner**:
  - Live customization dock to change wordmark text in real-time, toggle color presets (Cyan, Emerald, Violet, Amber, Crimson, Ghost White), adjust reveal reach radius, speed, damping, lattice spread, and coordinate HUD visibility.
- **Dual View Skills Engine**:
  - **3D Orbit View**: Canvas-rendered interactive rotating sphere showcasing core technologies with physics dragging.
  - **Skill Matrix View**: Grouped categorization (Languages, Frontend & UI, Backend & APIs, Databases & Cloud) with live proficiency bars and practical context tags.
- **In-Situ Open-Source Component Playground**:
  - Live interactive sandbox for published npm packages (e.g. `react-status-kit`) directly embedded within project modal views — allowing instant testing of loading, success, error, and idle states without page redirection.
- **Global Command Palette (`Cmd + K` / `Ctrl + K`)**:
  - Cyberpunk terminal HUD modal allowing rapid section navigation, resume downloads, clipboard copies, sound effects toggle, and interactive CLI commands (`help`, `bio`, `skills`, `projects`, `npm`, `contact`, `clear`).
- **React Bits `<SlingButton />` Return to Top**:
  - Physics-driven slingshot launcher with elastic band tension, power arc charging, and crimson particle burst scatter firing upon upward release.
- **60FPS Eco & Performance Engine**:
  - Auto-tunes 3D sphere particle density and GSAP scroll scrubbing based on battery levels, CPU concurrency, and `prefers-reduced-motion` settings.
- **Tactile Audio FX Engine**:
  - Cyberpunk UI click, hover, arm, and launch sound synthesizer with persistent mute/unmute control.
- **Direct Transmission Terminal**:
  - Interactive contact form, one-click clipboard email copy, and social links.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📁 Project Structure

```
d:\portfolio\
├── index.html                   # HTML entry point with OpenGraph & JSON-LD metadata
├── package.json                 # Dependencies & build scripts
├── vite.config.ts               # Vite bundler configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── public\
│   └── images\                  # Static image assets & verified credentials
└── src\
    ├── components\
    │   ├── ui\
    │   │   ├── SlingButton.tsx       # React Bits elastic slingshot launcher
    │   │   ├── SlingButton.css       # Slingshot styles & spring animation curves
    │   │   ├── SphereGallery3D.tsx   # 3D interactive rotating skills sphere
    │   │   ├── glimmer-vale.tsx      # WebGL crimson night meadow shader
    │   │   └── perspective-tunnel-hero.tsx # 3D credential perspective tunnel
    │   ├── VectorWordmark.tsx        # Core WebGL vector wordmark component
    │   ├── Navbar.tsx                # Header with live UTC clock, CMD+K, & audio toggle
    │   ├── Hero.tsx                  # Hero section hosting the wordmark & HUD
    │   ├── WordmarkCustomizer.tsx    # Live shader inspector dock
    │   ├── ProjectsSection.tsx       # Works showcase with in-situ playground modal
    │   ├── ReactStatusKitPlayground.tsx # Embedded interactive component playground
    │   ├── SkillsSection.tsx         # Dual View (3D Orbit vs. Interactive Matrix)
    │   ├── ExperienceSection.tsx     # Quantifiable impact callouts & career milestones
    │   ├── CommandPalette.tsx        # Global Cmd+K cyberpunk terminal palette
    │   ├── ContactSection.tsx        # Direct transmission console
    │   └── Footer.tsx                # Colophon, local IST clock, & SlingButton
    ├── utils\
    │   ├── performance.ts            # Battery, hardware, & reduced motion telemetry
    │   └── soundEffects.ts           # Synthesized UI sound effects
    ├── data\
    │   └── portfolioData.ts          # Content, projects, skills, & credentials
    ├── App.tsx                       # Root layout & global shortcut listeners
    └── main.tsx                      # React root entry point
```

---

## 🛠️ Tech Stack

- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Custom Properties
- **Motion & 3D**: Motion / Framer Motion, GSAP, HTML5 Canvas, WebGL Shaders
- **Icons**: Lucide React, Hugeicons
- **Audio**: Web Audio API Sound Synthesizer
