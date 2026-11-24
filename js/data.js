/**
 * Portfolio Content Data
 * Easily customizable data structure for student portfolio
 */

const portfolioData = {
  profile: {
    name: "Alex Rivera",
    role: "Full-Stack Engineer & Product Designer",
    headline: "Crafting digital experiences at the intersection of Design & Engineering",
    subheadline: "Third-year Computer Science & Human-Computer Interaction student at Stanford. Passionate about building resilient distributed systems, intuitive interfaces, and high-impact web tools.",
    status: "Open for Summer 2025/2026 Internships & Co-ops",
    university: "Stanford University",
    degree: "B.S. in Computer Science (Concentration in AI & Systems)",
    gpa: "3.94 / 4.0",
    location: "San Francisco Bay Area, CA",
    email: "alex.rivera.dev@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems & Systems Programming",
      "Design Systems & UI/UX Engineering",
      "Database Systems & Distributed Storage",
      "Human-Computer Interaction (HCI)",
      "Machine Learning & Deep Learning Fundamentals",
      "Computer Networks & Security",
      "Full-Stack Web Architectures"
    ],
    stats: [
      { label: "Completed Projects", value: "24+" },
      { label: "Hackathon Victories", value: "4x" },
      { label: "GitHub Contributions", value: "1,400+" },
      { label: "Academic GPA", value: "3.94" }
    ]
  },

  skills: [
    // Frontend
    { name: "React / Next.js", category: "frontend", level: "Advanced", percent: 95, icon: "react" },
    { name: "TypeScript", category: "frontend", level: "Advanced", percent: 92, icon: "typescript" },
    { name: "Tailwind CSS", category: "frontend", level: "Mastery", percent: 98, icon: "tailwind" },
    { name: "HTML5 / Semantic Web", category: "frontend", level: "Mastery", percent: 100, icon: "html" },
    { name: "Vue.js", category: "frontend", level: "Proficient", percent: 80, icon: "vue" },
    { name: "WebSockets & WebRTC", category: "frontend", level: "Proficient", percent: 82, icon: "network" },

    // Backend & Cloud
    { name: "Node.js / Express", category: "backend", level: "Advanced", percent: 90, icon: "node" },
    { name: "Python / FastAPI", category: "backend", level: "Advanced", percent: 90, icon: "python" },
    { name: "PostgreSQL & Prisma", category: "backend", level: "Proficient", percent: 85, icon: "database" },
    { name: "Docker & Containers", category: "backend", level: "Proficient", percent: 82, icon: "docker" },
    { name: "REST & GraphQL APIs", category: "backend", level: "Advanced", percent: 94, icon: "api" },
    { name: "Redis Caching", category: "backend", level: "Familiar", percent: 78, icon: "redis" },

    // Design & Systems
    { name: "Figma & Design Systems", category: "design", level: "Mastery", percent: 96, icon: "figma" },
    { name: "WCAG Accessibility (a11y)", category: "design", level: "Advanced", percent: 92, icon: "accessibility" },
    { name: "Interactive Prototyping", category: "design", level: "Advanced", percent: 90, icon: "layers" },
    { name: "User Research & Heuristics", category: "design", level: "Proficient", percent: 85, icon: "user" },

    // Tools & DevOps
    { name: "Git & GitHub Actions", category: "tools", level: "Advanced", percent: 94, icon: "git" },
    { name: "Linux / Bash Scripting", category: "tools", level: "Proficient", percent: 84, icon: "terminal" },
    { name: "Jest / Vitest / Playwright", category: "tools", level: "Proficient", percent: 86, icon: "test" },
    { name: "AWS Cloud Infrastructure", category: "tools", level: "Proficient", percent: 79, icon: "cloud" }
  ],

  projects: [
    {
      id: "pulseflow",
      title: "PulseFlow - Realtime Collaborative Design Canvas",
      category: "fullstack",
      categoryLabel: "Full-Stack & Systems",
      summary: "High-performance collaborative whiteboard and vector canvas featuring multi-user cursor sync, zero-latency conflict resolution, and instant SVG/React code export.",
      tags: ["React", "TypeScript", "WebSockets", "Canvas API", "Tailwind"],
      metric: "< 14ms sync latency with 1,200+ GitHub stars",
      demoUrl: "https://example.com/pulseflow",
      githubUrl: "https://github.com/example/pulseflow",
      details: {
        problem: "Existing online whiteboard tools are often bloated, requiring heavy subscription plans and introducing input latency on lower-end devices or slow networks.",
        solution: "Engineered an ultra-lean 60fps canvas renderer using native HTML5 Canvas and an optimized binary WebSocket protocol (CRDT-based) for effortless real-time state synchronization.",
        features: [
          "Sub-15ms collaborative cursor tracking across 50+ simultaneous peers",
          "One-click component export directly into production-ready React JSX & Tailwind CSS",
          "Offline-first state persistence using IndexedDB with seamless cloud reconnection",
          "Infinite grid with hardware-accelerated zoom, pan, and transform matrices"
        ],
        techStack: "React 18, TypeScript, HTML5 Canvas API, Node.js, WebSockets, Tailwind CSS, Vite"
      }
    },
    {
      id: "nexusai",
      title: "NexusAI - Academic Literature Synthesis Copilot",
      category: "ai",
      categoryLabel: "AI & Full-Stack",
      summary: "Intelligent research paper explorer that parses 50,000+ computer science arXiv papers, maps dynamic citation networks, and synthesizes key methodologies with citations.",
      tags: ["Python", "FastAPI", "OpenAI API", "PostgreSQL", "pgvector"],
      metric: "Accelerates literature review time by 75% for 800+ student researchers",
      demoUrl: "https://example.com/nexusai",
      githubUrl: "https://github.com/example/nexusai",
      details: {
        problem: "Graduate and undergraduate researchers waste hundreds of hours manually skimming dense PDF papers and tracking cross-references across disconnected repositories.",
        solution: "Created an automated vector embedding pipeline with hybrid keyword-vector retrieval (RAG) that surfaces relevant literature and generates hallucination-grounded comparative matrices.",
        features: [
          "Interactive interactive 3D graph visualization of citation relationships and topic clusters",
          "Strict hallucination prevention through inline passage citations directly linked to PDF coordinates",
          "Multi-paper comparative summary generator (highlighting dataset, method, and empirical results)",
          "Exportable BibTeX citations and LaTeX bibliography support"
        ],
        techStack: "Python, FastAPI, OpenAI Embeddings, PostgreSQL with pgvector, React, D3.js, Docker"
      }
    },
    {
      id: "devpulse",
      title: "DevPulse - Engineering Velocity & CI Dashboard",
      category: "fullstack",
      categoryLabel: "Full-Stack & DevOps",
      summary: "Lightweight developer analytics CLI and responsive web dashboard that monitors pull request cycle times, build bottlenecks, and flaky tests across team repositories.",
      tags: ["Next.js", "Go", "Docker", "GraphQL", "Tailwind"],
      metric: "Adopted by 16 collegiate hackathon teams and student engineering labs",
      demoUrl: "https://example.com/devpulse",
      githubUrl: "https://github.com/example/devpulse",
      details: {
        problem: "Student engineering teams often suffer from PR bottlenecks, slow review turnarounds, and silently failing CI pipelines without centralized visibility.",
        solution: "Built a lightweight daemon written in Go that gathers GitHub webhook events and aggregates metrics into an intuitive, actionable dashboard with Slack/Discord alerts.",
        features: [
          "Automated PR review velocity alerts when reviews exceed team threshold (e.g., 24 hours)",
          "Flaky test detection algorithm identifying intermittent test suite failures",
          "Single-command terminal CLI for quick local metrics check (`devpulse status`)",
          "Customizable team dashboards with privacy-focused self-hosting capabilities"
        ],
        techStack: "Next.js 14, Go (Golang), PostgreSQL, GitHub REST & GraphQL API, Docker, Tailwind"
      }
    },
    {
      id: "aura",
      title: "Aura - Generative Soundscape & Mindfulness Suite",
      category: "uiux",
      categoryLabel: "UI/UX & Mobile Web",
      summary: "Award-winning experimental web experience combining procedural ambient sound synthesis with interactive fluid shader animations to enhance deep focus.",
      tags: ["Web Audio API", "Three.js / WebGL", "Figma", "Design System"],
      metric: "Top 5 Finalist in Collegiate UI/UX Design Showcase & 15k+ web sessions",
      demoUrl: "https://example.com/aura",
      githubUrl: "https://github.com/example/aura",
      details: {
        problem: "Conventional white-noise and ambient apps use repetitive, low-bitrate looping audio tracks that cause auditory fatigue during extended study sessions.",
        solution: "Designed a generative audio engine using Web Audio API nodes that synthesize endlessly evolving, non-repeating binaural soundscapes alongside soothing GPU shaders.",
        features: [
          "Procedural real-time sound generation (rainfall, ocean breeze, theta waves) without static audio files",
          "Harmonious dynamic lighting and color gradients tuned to circadian focus rhythms",
          "Fully accessible keyboard controls and screen reader descriptions for visually impaired users",
          "Zero track buffering with negligible memory and CPU consumption"
        ],
        techStack: "HTML5 Web Audio API, Three.js GLSL Shaders, JavaScript ES6+, Figma, CSS Variables"
      }
    }
  ],

  achievements: [
    {
      id: "ach-1",
      title: "1st Place Overall Champion - TreeHacks 2024",
      issuer: "Stanford University & Major League Hacking (MLH)",
      date: "February 2024",
      category: "Hackathon",
      description: "Led a team of 4 to design and deploy an accessibility-first multimodal browser copilot in 36 hours. Competed against 1,600+ international collegiate developers.",
      linkText: "View Project & Award",
      linkUrl: "https://devpost.com"
    },
    {
      id: "ach-2",
      title: "Dean's Academic Honors (Consecutive 5 Semesters)",
      issuer: "Stanford University School of Engineering",
      date: "2022 - 2024",
      category: "Academic",
      description: "Maintained a cumulative 3.94 GPA while taking advanced upper-division coursework in Distributed Systems, Algorithms, Machine Learning, and Human-Computer Interaction.",
      linkText: "Verified Transcript Available Upon Request",
      linkUrl: "#"
    },
    {
      id: "ach-3",
      title: "Meta Open Source Contributor & Fellowship Finalist",
      issuer: "Meta & Open Source Initiative",
      date: "Summer 2024",
      category: "Open Source",
      description: "Contributed upstream fixes and automated regression tests to prominent frontend developer toolkits. Authored documentation viewed by over 40,000 developers.",
      linkText: "View GitHub Pull Requests",
      linkUrl: "https://github.com"
    },
    {
      id: "ach-4",
      title: "President & Lead Technical Mentor",
      issuer: "Stanford Web Development & Design Society",
      date: "2023 - Present",
      category: "Leadership",
      description: "Organized 18+ technical workshops, structured curriculum for modern full-stack web engineering, and personally mentored 120+ first-year and sophomore engineering students.",
      linkText: "Society Website",
      linkUrl: "https://example.com"
    },
    {
      id: "ach-5",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "November 2023",
      category: "Certification",
      description: "Validated foundational expertise in cloud architecture, IAM security, VPC networking, serverless compute (Lambda), and scalable multi-tier infrastructure.",
      linkText: "Verify Credential ID",
      linkUrl: "https://aws.amazon.com"
    }
  ]
};

// Export for module or global script execution
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}
