// Content for the "series" portfolio. Everything visible on the site comes from here
// (plus profile.js). Items marked PLACEHOLDER are stand-ins — swap in your own.
import { profile, certification, experience, education, coreSkills, techSkills, languages } from "./profile";

export const series = {
  firstName: "TIRTHAK",
  fullName: "TIRTHAK BHUSHAN MAJALKAR",
  displayName: "TIRTHAK MAJALKAR",
  shortName: profile.shortName,
  heroPhoto: "/tirthak-cutout.png", // transparent cutout used in hero, intro & about
  photo: profile.photo,
  badge: "IB-OPS",
  meta: ["2023 – Present", "M.Sc Computer Science", "3 Originals", "7 Modules Certified"],
  tagline: "IB OPERATIONS • FINTECH • DEVELOPER",
  intro: profile.intro,
  // Floating chips around the hero portrait
  chips: [
    { title: "CIBOP 2026", sub: "IMARTICUS LEARNING", pos: "left" },
    { title: "Senior Developer", sub: "SUPPORTHIVES", pos: "right" },
    { title: "M.Sc CS", sub: "PATKAR COLLEGE", pos: "bottom" },
  ],
  stats: [
    { value: "7", label: "MODULES" },
    { value: "3", label: "ORIGINALS" },
    { value: "20+", label: "TOOLS" },
  ],
  email: profile.email,
  phone: profile.phone,
  phoneHref: profile.phoneHref,
  linkedin: profile.linkedin,
  github: "", // add your GitHub URL to show GitHub buttons
  resumeUrl: "", // add e.g. "/resume.pdf" to download a file; empty = print the on-page resume
  location: profile.location,
};

// Sections ("episodes"). Order per profile is defined in `profiles` below.
export const episodes = {
  resume: { nav: "Resume", title: "THE FULL STORY", sub: "The resume, as a screenplay", mark: "CV", grad: "from-[#3b1a7a] via-[#5b2bb5] to-[#1d0f3d]" },
  moments: { nav: "Moments", title: "MY ACHIEVEMENTS", sub: "5 Moments • 9 Credentials", mark: "★", grad: "from-[#7a0d16] via-[#c3192b] to-[#3a060b]" },
  skills: { nav: "Skills", title: "MY SKILLS", sub: "7 genres • 40+ skills", mark: "SK", grad: "from-[#0e3b52] via-[#1f6f8f] to-[#0a1d29]" },
  originals: { nav: "Originals", title: "MY PROJECTS", sub: "3 Originals", mark: "OG", grad: "from-[#5e0b1d] via-[#a5163a] to-[#2b0510]" },
  about: { nav: "About", title: "ABOUT ME", sub: "The Pilot • Education & training", mark: "ME", grad: "from-[#2d1466] via-[#6a35c9] to-[#150a33]" },
  journey: { nav: "Journey", title: "MY JOURNEY", sub: "5 Seasons", mark: "S5", grad: "from-[#6b3a06] via-[#c27a12] to-[#2e1903]" },
  picks: { nav: "Top Picks", title: "TOP PICKS", sub: "The Top 5", mark: "05", grad: "from-[#0b4a2a] via-[#1d8a4f] to-[#062214]" },
};

export const profiles = [
  {
    id: "main",
    name: "Tirthak",
    desc: "The full series, in order",
    tile: "bg-gradient-to-br from-[#e50914] to-[#7a0a10]",
    order: ["resume", "moments", "skills", "originals", "about", "journey", "picks"],
    main: true,
  },
  {
    id: "recruiter",
    name: "Recruiter",
    desc: "Resume, achievements & skills first",
    tile: "bg-gradient-to-br from-[#6fb7d6] to-[#2b5f86]",
    glyph: "R",
    order: ["resume", "moments", "skills", "journey", "about", "originals", "picks"],
  },
  {
    id: "developer",
    name: "Developer",
    desc: "Projects, stack & GitHub first",
    tile: "bg-gradient-to-br from-[#4ccf7d] to-[#1d7a45]",
    glyph: "</>",
    order: ["originals", "skills", "resume", "journey", "moments", "about", "picks"],
  },
  {
    id: "creative",
    name: "Creative",
    desc: "The story arc & highlights first",
    tile: "bg-gradient-to-br from-[#f2b33d] to-[#c26a0c]",
    glyph: "✦",
    order: ["journey", "picks", "originals", "moments", "about", "skills", "resume"],
  },
];

// ---------- The Full Story (resume) ----------
export const resume = {
  education: education.slice(0, 3).map((e) => ({ school: e.school, degree: e.degree, year: e.year })),
  experience,
  projects: [
    { name: "Trade Lifecycle Capstone", stack: "Excel, SOP analysis, Reconciliation", year: "2026" },
    { name: "Cross-Platform Flutter App", stack: "Flutter, Dart, REST APIs", year: "2024" },
    { name: "React UI System", stack: "React, Next.js, Tailwind", year: "2024" },
  ],
  skills: [
    { label: "Finance Ops", value: "Trade Lifecycle, Clearing & Settlement, Reconciliation, AML / KYC, Risk" },
    ...techSkills.map((g) => ({ label: g.group, value: g.items.join(", ") })),
    { label: "Spoken", value: languages.join(", ") },
  ],
  achievements: [
    { title: "Certified IB Operations Professional", text: "Imarticus Learning — 7 modules across the trade lifecycle." },
    { title: "Senior Developer", text: "Supporthives — leading UI for web, React and Flutter apps since 2023." },
    { title: "Master's in Computer Science", text: "Patkar College, 2024." },
  ],
  certifications: certification.areas,
};

// ---------- Top Moments ----------
export const moments = [
  { label: "CERTIFIED", title: "IB OPS PROFESSIONAL", org: "IMARTICUS LEARNING", text: "Completed the Certified Investment Banking Operations Professional programme in Mumbai.", link: "" },
  { label: "CURRENT ROLE", title: "SENIOR DEVELOPER", org: "SUPPORTHIVES · 2023–NOW", text: "Building interfaces for web, React and Flutter apps wired into backend services." },
  { label: "POST-GRADUATE", title: "MASTER'S IN CS", org: "PATKAR COLLEGE · 2024", text: "Master's degree in Computer Science after a Bachelor's in the same field." },
  { label: "7 MODULES", title: "TRADE TO SETTLEMENT", org: "LIFECYCLE • RECON • CLEARING", text: "End-to-end trade lifecycle, reconciliation, clearing & settlement, AML / KYC and risk." },
  { label: "TOOLKIT", title: "20+ TOOLS", org: "REACT • NEXT • FLUTTER • EXCEL", text: "From MS Excel and SOPs to React, Next.js, Node and Firebase." },
];

export const credentials = [
  ...certification.areas.map((t) => ({ issuer: "IMARTICUS", group: "Finance", title: t })),
  ...education.slice(1, 3).map((e) => ({ issuer: e.school.toUpperCase(), group: "Academic", title: e.degree })),
];

// ---------- Skill Universe ----------
const tech = Object.fromEntries(techSkills.map((g) => [g.group, g.items]));
export const skillGenres = [
  {
    id: "finance",
    name: "FINANCE OPS",
    blurb: "The trade lifecycle",
    heading: "Finance Ops — the trade lifecycle is the primary focus",
    primary: "Trade Lifecycle",
    items: [
      { name: "Trade Lifecycle", level: 90, note: "Trade capture → confirmation → clearing → settlement, covered end to end in the CIBOP programme." },
      { name: "Reconciliation", level: 85, note: "Matching trades, cash and positions across systems and resolving breaks." },
      { name: "Clearing & Settlement", level: 82, note: "How CCPs, custodians and depositories move trades to final settlement." },
      { name: "AML / KYC", level: 80, note: "Client onboarding checks and anti-money-laundering compliance." },
      { name: "Asset Management Ops", level: 72, note: "Fund operations, NAV and corporate action basics." },
      { name: "Risk Management", level: 74, note: "Operational, market and credit risk in the operations context." },
      { name: "Equity Markets", level: 78, note: "Equity and equity-related products and their operations." },
    ],
  },
  {
    id: "core",
    name: "CORE SKILLS",
    blurb: "How I work",
    heading: "Core skills — leadership and problem solving lead the cast",
    primary: "Team Leadership",
    items: coreSkills.map((s, i) => ({ name: s.title, level: 90 - i * 3, note: s.text })),
  },
  {
    id: "languages",
    name: "LANGUAGES",
    blurb: "JavaScript is the primary language",
    heading: "Languages — JavaScript is the primary language",
    primary: "JavaScript",
    items: tech.Languages.map((n, i) => ({ name: n, level: 92 - i * 10, note: `Used across the web, React and Flutter work at Supporthives.` })),
  },
  {
    id: "frameworks",
    name: "FRAMEWORKS",
    blurb: "Interfaces & the web platform",
    heading: "Frameworks — React and Next.js on the web, Flutter on mobile",
    primary: "React",
    items: tech.Frameworks.map((n, i) => ({ name: n, level: 90 - i * 5, note: `Part of the ${n.includes("Native") || n === "Flutter" ? "cross-platform mobile" : "web"} toolkit.` })),
  },
  {
    id: "tools",
    name: "TOOLS",
    blurb: "Spreadsheets to shipping",
    heading: "Tools — MS Excel for operations, Git for everything else",
    primary: "MS Excel",
    items: tech.Tools.map((n, i) => ({ name: n, level: 88 - i * 5, note: "Daily driver for reporting, documentation or delivery." })),
  },
  {
    id: "databases",
    name: "DATABASES",
    blurb: "Storing & syncing data",
    heading: "Databases — document stores and realtime sync",
    primary: "MongoDB",
    items: tech.Databases.map((n, i) => ({ name: n, level: 80 - i * 6, note: "Used to persist and sync app data." })),
  },
  {
    id: "spoken",
    name: "SPOKEN",
    blurb: "Off-screen languages",
    heading: "Spoken — three languages, one voice",
    primary: "English",
    items: languages.map((n, i) => ({ name: n, level: 95 - i * 5, note: "Fluent." })),
  },
];

// ---------- Originals (projects) — PLACEHOLDER content ----------
export const originals = [
  {
    kicker: "OPERATIONS • CAPSTONE",
    title: "TRADE LIFECYCLE CAPSTONE",
    text: "Walk-through of a trade from booking to settlement — confirmation, clearing, reconciliation breaks and AML / KYC checks along the way.",
    tags: ["Excel", "SOPs", "Recon", "AML/KYC"],
    theme: "red",
  },
  {
    kicker: "MOBILE • CROSS-PLATFORM",
    title: "CROSS-PLATFORM FLUTTER APP",
    text: "Responsive, interactive interface for a Flutter application with consistent performance across Android, iOS and the web.",
    tags: ["Flutter", "Dart", "REST", "Firebase"],
    theme: "gold",
  },
  {
    kicker: "WEB • DESIGN SYSTEM",
    title: "REACT UI SYSTEM",
    text: "Dynamic, adaptive React components with a consistent design language that improved engagement across a product suite.",
    tags: ["React", "Next.js", "Tailwind", "Node"],
    theme: "blue",
  },
];

// ---------- About ----------
export const about = {
  quote: profile.intro,
  facts: [
    { label: "NOW", title: "Senior Developer", sub: "Supporthives · Nov 2023 – Present" },
    { label: "TRAINING", title: "CIBOP, Imarticus Learning", sub: "Mumbai · 2026" },
    { label: "PRIMARY FOCUS", title: "IB Operations", sub: "Trade lifecycle, recon, AML / KYC" },
    { label: "BASED IN", title: profile.location, sub: languages.join(" • ") },
  ],
  interests: ["Investment Banking", "FinTech", "Process Automation", "Financial Analytics"],
};

// ---------- Journey ----------
export const seasons = [
  {
    id: "S01",
    name: "The Beginning",
    years: "2017 – 2019",
    blurb: "School years — and the choice to go into science.",
    episodes: [
      { title: "THE FOUNDATION", year: "2017", label: "St. Francis D'Assisi", text: "Secondary School Certificate." },
      { title: "CHOOSING SCIENCE", year: "2019", label: "Nirmala Memorial", text: "Higher Secondary Certificate (Science)." },
    ],
  },
  {
    id: "S02",
    name: "Into Computing",
    years: "2019 – 2022",
    blurb: "A Bachelor's in Computer Science and the first real lines of code.",
    episodes: [
      { title: "THE BACHELOR'S", year: "2022", label: "Nirmala Memorial", text: "Bachelor's in Computer Science." },
      { title: "FIRST COMMITS", year: "2021", label: "Self-taught", text: "HTML, CSS and JavaScript — building small sites and learning Git." },
    ],
  },
  {
    id: "S03",
    name: "Going Deeper",
    years: "2022 – 2024",
    blurb: "A Master's degree, more depth in computing and data.",
    episodes: [
      { title: "THE MASTER'S", year: "2024", label: "Patkar College", text: "Master's in Computer Science." },
      { title: "DATA & VISION", year: "2023", label: "Coursework", text: "Python basics and OpenCV — working with data and images." },
    ],
  },
  {
    id: "S04",
    name: "Building Real Products",
    years: "2023 – Present",
    blurb: "Senior Developer at Supporthives — interfaces that ship.",
    episodes: experience[0].points.map((p, i) => ({
      title: ["THE INTERFACE BUILDER", "THE CROSS-PLATFORM RUN", "THE DESIGN LANGUAGE"][i],
      year: "2023 – Now",
      label: "Supporthives",
      text: p,
    })),
  },
  {
    id: "S05",
    name: "What's Next",
    years: "2026 →",
    blurb: "Moving into Investment Banking Operations, with technology as the edge.",
    episodes: [
      { title: "THE CERTIFICATION", year: "2026", label: "Imarticus Learning", text: "Certified Investment Banking Operations Professional." },
      { title: "THE PIVOT", year: "2026", label: "Next role", text: "Bringing a developer's eye to trade support, settlements and reconciliation." },
      { title: "TECH × FINANCE", year: "Ongoing", label: "The long game", text: "Automating operations workflows and improving financial analytics." },
    ],
  },
];

// ---------- Top Picks ----------
export const topPicks = [
  { label: "PRIMARY DOMAIN", title: "IB OPERATIONS", text: "Trade lifecycle, settlements and compliance.", color: "from-[#f2a93b] to-[#a1500b]" },
  { label: "THE CERTIFICATION", title: "CIBOP 2026", text: "Imarticus Learning — 7 modules.", color: "from-[#e5283a] to-[#6e0a12]" },
  { label: "PRIMARY STACK", title: "REACT & NEXT.JS", text: "Plus Flutter for mobile.", color: "from-[#2f8fd0] to-[#0d3456]" },
  { label: "CURRENT ROLE", title: "SENIOR DEVELOPER", text: "Supporthives, since 2023.", color: "from-[#7d4ae0] to-[#2c1366]" },
  { label: "SUPERPOWER", title: "TECH × FINANCE", text: "Building where ops meets code.", color: "from-[#2fbf6a] to-[#0d4d28]" },
];
