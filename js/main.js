/**
 * Main Application Script
 * Smooth UI interactions, theme switching, project filtering, modal dialogs, and form validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initSkills();
  initProjects();
  initAchievements();
  initModal();
  initContactForm();
  initClipboard();
  initScrollEffects();
});

/* ===================================================================
   1. THEME SWITCHER (DARK / LIGHT)
   =================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  // Set initial theme: prioritize saved preference, then system preference, default to dark
  if (storedTheme === 'light' || (!storedTheme && prefersLight)) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('portfolio-theme', 'dark');
        showToast('Switched to Dark Mode', 'success');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('portfolio-theme', 'light');
        showToast('Switched to Light Mode', 'success');
      }
    });
  }
}

/* ===================================================================
   2. NAVBAR & NAVIGATION
   =================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

/* ===================================================================
   3. SKILLS SECTION
   =================================================================== */
function initSkills() {
  const skillsContainer = document.getElementById('skills-grid');
  const filterBtns = document.querySelectorAll('.skills-filter-btn');

  if (!skillsContainer || !portfolioData.skills) return;

  function renderSkills(filter = 'all') {
    const filtered = filter === 'all'
      ? portfolioData.skills
      : portfolioData.skills.filter(s => s.category === filter);

    skillsContainer.innerHTML = filtered.map(skill => `
      <div class="skill-card hover-lift reveal active" data-category="${skill.category}">
        <div class="skill-icon-wrapper">
          ${getSkillSvgIcon(skill.icon)}
        </div>
        <div class="skill-info">
          <div class="skill-name-row">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-level-badge">${skill.level}</span>
          </div>
          <div class="skill-progress-track">
            <div class="skill-progress-bar" style="width: ${skill.percent}%;"></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Initial render
  renderSkills('all');

  // Filter click events
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderSkills(filter);
    });
  });
}

/* ===================================================================
   4. PROJECTS SECTION
   =================================================================== */
function initProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('.project-filter-btn');

  if (!projectsGrid || !portfolioData.projects) return;

  function renderProjects(filter = 'all') {
    const filtered = filter === 'all'
      ? portfolioData.projects
      : portfolioData.projects.filter(p => p.category === filter || (filter === 'fullstack' && p.category === 'fullstack'));

    projectsGrid.innerHTML = filtered.map(proj => `
      <article class="project-card reveal active" data-category="${proj.category}">
        <div class="project-banner">
          <span class="project-type-badge">${proj.categoryLabel}</span>
          ${getProjectMockupSvg(proj.id)}
        </div>
        <div class="project-body">
          <div class="project-tags">
            ${proj.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-description">${proj.summary}</p>
          <div class="project-metric-pill">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            <span>${proj.metric}</span>
          </div>
          <div class="project-actions">
            <div class="project-links">
              <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link-item" aria-label="Live Demo for ${proj.title}">
                Live Demo
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
              <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link-item" aria-label="GitHub Repository for ${proj.title}">
                Code
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path></svg>
              </a>
            </div>
            <button class="btn btn-sm btn-outline open-modal-btn" data-project-id="${proj.id}">
              Details
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach modal trigger listeners
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const projId = btn.getAttribute('data-project-id');
        openProjectModal(projId);
      });
    });
  }

  // Initial render
  renderProjects('all');

  // Filter clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });
}

/* ===================================================================
   5. ACHIEVEMENTS SECTION
   =================================================================== */
function initAchievements() {
  const container = document.getElementById('achievements-timeline');
  if (!container || !portfolioData.achievements) return;

  container.innerHTML = portfolioData.achievements.map((item, index) => `
    <div class="timeline-item reveal active">
      <div class="timeline-badge-icon" aria-hidden="true">
        ${getAchievementSvg(item.category)}
      </div>
      <div class="timeline-content-card">
        <div class="timeline-meta">
          <span class="timeline-date">${item.date}</span>
          <span class="timeline-category-tag">${item.category}</span>
        </div>
        <h3 class="timeline-title">${item.title}</h3>
        <div class="timeline-issuer">${item.issuer}</div>
        <p class="timeline-description">${item.description}</p>
      </div>
    </div>
  `).join('');
}

/* ===================================================================
   6. INTERACTIVE PROJECT MODAL
   =================================================================== */
let activeModalProject = null;

function initModal() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');

  if (!modalOverlay || !closeBtn) return;

  closeBtn.addEventListener('click', closeModal);

  // Close when clicking backdrop
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

function openProjectModal(projectId) {
  const project = portfolioData.projects.find(p => p.id === projectId);
  if (!project) return;

  activeModalProject = project;
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body-content');
  const modalFooter = document.getElementById('modal-footer-content');

  modalTitle.textContent = project.title;

  modalBody.innerHTML = `
    <div class="modal-problem-box">
      <h4 class="modal-section-title">The Challenge / Problem</h4>
      <p class="modal-text">${project.details.problem}</p>
    </div>

    <div class="modal-solution-box">
      <h4 class="modal-section-title">Engineered Solution</h4>
      <p class="modal-text">${project.details.solution}</p>
    </div>

    <div class="modal-features-box">
      <h4 class="modal-section-title">Key Innovations & Features</h4>
      <ul class="modal-feature-list">
        ${project.details.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>

    <div class="modal-tech-box">
      <h4 class="modal-section-title">Tech Stack & Tools</h4>
      <p class="modal-text" style="font-family: var(--font-mono); font-size: 0.875rem; color: var(--primary);">
        ${project.details.techStack}
      </p>
    </div>
  `;

  modalFooter.innerHTML = `
    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
      View Source
    </a>
    <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
      Live Application ↗
    </a>
  `;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalOverlay = document.getElementById('project-modal');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ===================================================================
   7. CONTACT FORM VALIDATION & INTERACTION
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');

    let isValid = true;

    // Reset previous errors
    form.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('has-error'));

    // Validate Name
    if (!nameInput.value.trim()) {
      showFieldError(nameInput, 'Please enter your full name');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showFieldError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showFieldError(messageInput, 'Please provide a message with at least 10 characters');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending with loading state
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke-width="4" stroke="currentColor" stroke-opacity="0.25"></circle>
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
      form.reset();
      showToast('Thank you! Your message has been sent successfully.', 'success');
    }, 1200);
  });
}

function showFieldError(inputElement, message) {
  const formGroup = inputElement.closest('.form-group');
  if (formGroup) {
    formGroup.classList.add('has-error');
    const errorEl = formGroup.querySelector('.form-error-msg');
    if (errorEl) errorEl.textContent = message;
  }
}

/* ===================================================================
   8. CLIPBOARD & BACK-TO-TOP UTILITY
   =================================================================== */
function initClipboard() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = portfolioData.profile.email;
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`, 'success');
      }).catch(() => {
        showToast('Unable to copy automatically. Email: ' + email, 'info');
      });
    });
  }
}

function initScrollEffects() {
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Reveal elements on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));
}

/* ===================================================================
   9. TOAST NOTIFICATION SYSTEM
   =================================================================== */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ===================================================================
   10. SVG GRAPHIC HELPERS (Self-Contained & Sharp at Any Scale)
   =================================================================== */
function getSkillSvgIcon(iconName) {
  switch (iconName) {
    case 'react':
      return `<svg viewBox="0 0 24 24" fill="#00d8ff"><circle cx="12" cy="12" r="2.2"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="none" stroke="#00d8ff" stroke-width="1.2"/><ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="#00d8ff" stroke-width="1.2" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="#00d8ff" stroke-width="1.2" transform="rotate(-30 12 12)"/></svg>`;
    case 'typescript':
      return `<svg viewBox="0 0 24 24" fill="#3178c6"><rect width="24" height="24" rx="4" fill="#3178c6"/><path d="M11 9H6v2.5h1.8V19h2.4v-7.5H11V9zm3.5 6.2c.6.4 1.3.6 2 .6.8 0 1.3-.4 1.3-.9 0-.6-.5-.8-1.5-1.2-1.4-.5-2.3-1.1-2.3-2.4 0-1.4 1.2-2.5 3-2.5 1 0 1.9.3 2.5.8l-.7 1.9c-.5-.4-1.1-.6-1.8-.6-.7 0-1.1.3-1.1.8 0 .5.5.7 1.5 1.1 1.5.5 2.4 1.2 2.4 2.5 0 1.5-1.2 2.6-3.2 2.6-1.2 0-2.3-.4-3-1l.9-1.8z" fill="#ffffff"/></svg>`;
    case 'tailwind':
      return `<svg viewBox="0 0 24 24" fill="#38bdf8"><path d="M12 6c-3.6 0-5.4 1.8-5.4 5.4 1.2-1.8 2.7-2.4 4.5-1.8 1 0.4 1.8 1.2 2.6 2.1 1.3 1.5 2.9 3.3 6.3 3.3 3.6 0 5.4-1.8 5.4-5.4-1.2 1.8-2.7 2.4-4.5 1.8-1-0.4-1.8-1.2-2.6-2.1-1.3-1.5-2.9-3.3-6.3-3.3zm-6.6 6c-3.6 0-5.4 1.8-5.4 5.4 1.2-1.8 2.7-2.4 4.5-1.8 1 0.4 1.8 1.2 2.6 2.1 1.3 1.5 2.9 3.3 6.3 3.3 3.6 0 5.4-1.8 5.4-5.4-1.2 1.8-2.7 2.4-4.5 1.8-1-0.4-1.8-1.2-2.6-2.1-1.3-1.5-2.9-3.3-6.3-3.3z"/></svg>`;
    case 'node':
      return `<svg viewBox="0 0 24 24" fill="#539e43"><path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4z"/></svg>`;
    case 'python':
      return `<svg viewBox="0 0 24 24"><path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.01 1.4h3v.4H5.8S3 4.8 3 7.9c0 3.1 2.5 3 2.5 3h1.5v-2.1c0-1.2 1-2.1 2.2-2.1h3.7c1 0 1.9-.9 1.9-1.9V4.6c0-1.2-1.1-2.6-2.9-2.6zm-1.8 1.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" fill="#387eb8"/><path d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3l-.01-1.4h-3v-.4h6.2s2.8.3 2.8-2.8c0-3.1-2.5-3-2.5-3h-1.5v2.1c0 1.2-1 2.1-2.2 2.1H11c-1 0-1.9.9-1.9 1.9v2.2c0 1.2 1.1 2.6 3 2.6zm1.8-1.3c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="#ffe052"/></svg>`;
    case 'figma':
      return `<svg viewBox="0 0 24 24"><circle cx="15.5" cy="8.5" r="3.5" fill="#1abcfe"/><path d="M8.5 2h7v7h-7z" fill="#ff7262"/><circle cx="8.5" cy="8.5" r="3.5" fill="#f24e1e"/><circle cx="8.5" cy="15.5" r="3.5" fill="#a259ff"/><path d="M8.5 19a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" fill="#0acf83"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`;
  }
}

function getAchievementSvg(category) {
  switch (category) {
    case 'Hackathon':
      return `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`;
    case 'Academic':
      return `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z"/></svg>`;
    case 'Leadership':
      return `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`;
    default:
      return `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }
}

function getProjectMockupSvg(id) {
  // Rich vector artwork representing the project UI/UX
  if (id === 'pulseflow') {
    return `
      <svg class="mockup-art" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#0f172a"/>
        <path d="M0 0H400V24H0V0Z" fill="#1e293b"/>
        <circle cx="16" cy="12" r="4" fill="#ef4444"/>
        <circle cx="28" cy="12" r="4" fill="#f59e0b"/>
        <circle cx="40" cy="12" r="4" fill="#10b981"/>
        <!-- Whiteboard canvas shapes -->
        <rect x="40" y="50" width="110" height="70" rx="8" fill="#6366f1" fill-opacity="0.18" stroke="#6366f1" stroke-width="2"/>
        <text x="52" y="88" fill="#e0e7ff" font-family="sans-serif" font-size="12" font-weight="600">AuthComponent</text>
        <rect x="220" y="70" width="130" height="90" rx="8" fill="#06b6d4" fill-opacity="0.18" stroke="#06b6d4" stroke-width="2"/>
        <text x="235" y="118" fill="#cffafe" font-family="sans-serif" font-size="12" font-weight="600">DashboardView</text>
        <path d="M150 85C185 85 185 115 220 115" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 4"/>
        <!-- Multiplayer cursor -->
        <path d="M210 145L220 170L226 156L240 156L210 145Z" fill="#ec4899"/>
        <rect x="228" y="166" width="64" height="18" rx="4" fill="#ec4899"/>
        <text x="234" y="179" fill="#ffffff" font-family="sans-serif" font-size="9" font-weight="bold">Sarah (Live)</text>
      </svg>
    `;
  } else if (id === 'nexusai') {
    return `
      <svg class="mockup-art" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#090d16"/>
        <path d="M0 0H400V24H0V0Z" fill="#161f30"/>
        <circle cx="16" cy="12" r="4" fill="#ef4444"/>
        <circle cx="28" cy="12" r="4" fill="#f59e0b"/>
        <circle cx="40" cy="12" r="4" fill="#10b981"/>
        <!-- Citation graph nodes -->
        <circle cx="120" cy="110" r="28" fill="#38bdf8" fill-opacity="0.2" stroke="#38bdf8" stroke-width="2"/>
        <circle cx="200" cy="70" r="20" fill="#818cf8" fill-opacity="0.2" stroke="#818cf8" stroke-width="2"/>
        <circle cx="280" cy="130" r="32" fill="#34d399" fill-opacity="0.2" stroke="#34d399" stroke-width="2"/>
        <line x1="148" y1="98" x2="182" y2="78" stroke="#64748b" stroke-width="1.5"/>
        <line x1="218" y1="82" x2="254" y2="114" stroke="#64748b" stroke-width="1.5"/>
        <!-- Search bar -->
        <rect x="60" y="175" width="280" height="28" rx="14" fill="#1e293b" stroke="#334155"/>
        <circle cx="78" cy="189" r="5" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="94" y="193" fill="#64748b" font-family="sans-serif" font-size="10">Ask literature copilot: "Attention mechanisms in ViT..."</text>
      </svg>
    `;
  } else if (id === 'devpulse') {
    return `
      <svg class="mockup-art" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#0f172a"/>
        <path d="M0 0H400V24H0V0Z" fill="#1e293b"/>
        <circle cx="16" cy="12" r="4" fill="#ef4444"/>
        <circle cx="28" cy="12" r="4" fill="#f59e0b"/>
        <circle cx="40" cy="12" r="4" fill="#10b981"/>
        <!-- Bar chart & sparklines -->
        <rect x="40" y="140" width="26" height="50" rx="4" fill="#6366f1"/>
        <rect x="80" y="110" width="26" height="80" rx="4" fill="#6366f1"/>
        <rect x="120" y="80" width="26" height="110" rx="4" fill="#10b981"/>
        <rect x="160" y="125" width="26" height="65" rx="4" fill="#6366f1"/>
        <rect x="200" y="95" width="26" height="95" rx="4" fill="#06b6d4"/>
        <path d="M250 150Q280 100 310 130T370 70" stroke="#f59e0b" stroke-width="3" fill="none"/>
        <rect x="250" y="45" width="115" height="40" rx="6" fill="#1e293b" stroke="#334155"/>
        <text x="260" y="62" fill="#94a3b8" font-family="sans-serif" font-size="9">PR Velocity</text>
        <text x="260" y="78" fill="#10b981" font-family="sans-serif" font-size="13" font-weight="bold">+28.4% faster</text>
      </svg>
    `;
  } else {
    return `
      <svg class="mockup-art" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#090d16"/>
        <path d="M0 0H400V24H0V0Z" fill="#161f30"/>
        <circle cx="16" cy="12" r="4" fill="#ef4444"/>
        <circle cx="28" cy="12" r="4" fill="#f59e0b"/>
        <circle cx="40" cy="12" r="4" fill="#10b981"/>
        <!-- Ambient soundwave ripples -->
        <circle cx="200" cy="120" r="25" stroke="#a855f7" stroke-width="2" stroke-opacity="0.8"/>
        <circle cx="200" cy="120" r="50" stroke="#a855f7" stroke-width="1.5" stroke-opacity="0.5"/>
        <circle cx="200" cy="120" r="75" stroke="#06b6d4" stroke-width="1.2" stroke-opacity="0.3"/>
        <circle cx="200" cy="120" r="9" fill="#c084fc"/>
        <text x="145" y="195" fill="#e2e8f0" font-family="sans-serif" font-size="11" font-weight="600">Generative Theta Waves (432Hz)</text>
      </svg>
    `;
  }
}
