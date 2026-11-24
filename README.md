# 🌟 Executive Student Portfolio Website

A personal portfolio website tailored for an ambitious student (Computer Science, Engineering, & Product Design). Designed with the visual precision, typography hierarchy, micro-interactions, and accessibility standards of a **20-year veteran Principal UI/UX & Web Designer**.

---

## ✨ Key Features & Highlights

- **Aesthetic Design System**:
  - Deep obsidian dark mode (default) with ambient radial glows and glassmorphism.
  - Crisp light mode with automatic system detection (`prefers-color-scheme`) and persistent `localStorage` toggle.
  - Fluid typography scale powered by modern clamp calculations with `Plus Jakarta Sans` and `JetBrains Mono`.
- **Hero & Persona Window**:
  - Real-time internship availability indicator (`🟢 Available for Summer 2025/2026`).
  - Interactive code terminal showing engineering specialties with floating accolade badges.
  - Quick action buttons and social links (GitHub, LinkedIn, Twitter/X, Email).
- **Interactive Skills Matrix**:
  - Filterable by discipline: Frontend Architecture, Backend & Cloud, UI/UX & Systems, Tools & DevOps.
  - Animated proficiency indicators and crisp vector technology icons.
- **Featured Projects & In-Depth Case Study Modal**:
  - Filter by category (Full Stack, AI/Data, UI/UX).
  - Rich project cards with custom SVG UI mockups, tech badges, and key performance metrics.
  - Detailed modal view displaying **The Problem**, **Engineered Solution**, **Key Innovations**, and **Tech Stack**.
- **Chronological Achievements & Leadership Timeline**:
  - Displays hackathon victories, academic honors (Dean's List), leadership roles, and cloud certifications.
- **Interactive Contact Section**:
  - One-click copy email to clipboard with instant confirmation toast notification.
  - Fully validated contact form with real-time feedback, simulated async submission, and toast alerts.
- **Performance & Zero Dependencies**:
  - Built with pure semantic HTML5, modern CSS3 (Custom Properties & Grid), and ES6+ JavaScript.
  - 100% self-contained—runs immediately in any web browser without Node.js or build steps.

---

## 📁 File Structure

```
NAMASTE/
├── index.html              # Main semantic HTML5 layout with complete SEO & ARIA accessibility
├── css/
│   ├── style.css           # Core styling tokens, responsive grids, glassmorphism, dark/light themes
│   └── animations.css      # Smooth micro-interactions, glow pulses, keyframes, scroll reveals
├── js/
│   ├── data.js             # Centralized portfolio data (profile, projects, skills, achievements)
│   └── main.js             # Theme toggle, filter logic, modal dialog, form validation, toasts
├── assets/
│   └── resume-sample.pdf   # Sample downloadable resume
└── README.md               # Documentation & customization guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
Simply double-click `index.html` in your file explorer, or right-click and choose **Open with > Chrome / Edge / Firefox / Safari**.

### Option 2: Live Server via Python
Run a local web server from this directory:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 🛠️ Easy Personalization Guide

### 1. Update Profile & Content
Open `js/data.js` to modify your details in one convenient place:
- **`profile`**: Name, university, degree, GPA, bio headline, social media URLs.
- **`skills`**: Add or remove technologies, proficiency percentages, and categories.
- **`projects`**: Change project titles, summaries, tags, live URLs, and case study details.
- **`achievements`**: Add your hackathons, scholarships, dean's awards, and dates.

### 2. Customize Color Palette
Open `css/style.css` and customize the CSS custom properties at the top:
```css
:root {
  --primary: #6366f1;   /* Primary accent color (Indigo) */
  --accent: #06b6d4;    /* Secondary highlight (Cyan) */
  --bg-body: #080c14;   /* Deep obsidian background */
}
```

### 3. Replace Resume
Place your actual PDF resume in `assets/resume-sample.pdf` (or update the filename in `index.html`).

---

## 🌐 Free 1-Click Deployment

1. **GitHub Pages**:
   - Create a new GitHub repository and push this folder.
   - Go to **Settings > Pages** and select `main` branch `/ (root)`.
2. **Vercel**:
   - Drag and drop this folder into [vercel.com](https://vercel.com) or run `npx vercel`.
3. **Netlify**:
   - Drag and drop the folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop).
