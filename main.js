import { profile, projects, skills, certifications } from './data.js';
import { initBinaryBackground } from './binary-bg.js';

const app = document.querySelector('#app');

// Definition for the 3D Bug SVG
const bugIconSVG = `
    <svg class="bug-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle; width:64px; height:64px;">
        <defs>
            <radialGradient id="bodyGradient" cx="30%" cy="30%" r="80%" fx="40%" fy="40%">
                <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
                <stop offset="40%" style="stop-color:#ff0000;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#990000;stop-opacity:1" />
            </radialGradient>
            <linearGradient id="headGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" style="stop-color:#4a4a4a;stop-opacity:1" />
                 <stop offset="100%" style="stop-color:#000;stop-opacity:1" />
            </linearGradient>
            <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feComponentTransfer in=SourceAlpha>
                    <feFuncA type="table" tableValues="1 0" />
                </feComponentTransfer>
                <feGaussianBlur stdDeviation="1"/>
                <feOffset dx="0" dy="2" result="offsetblur"/>
                <feFlood flood-color="rgba(0,0,0,0.5)" result="color"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feComposite in2="SourceAlpha" operator="in" />
                <feMerge>
                    <feMergeNode in="SourceGraphic" />
                    <feMergeNode />
                </feMerge>
            </filter>
        </defs>
        
        <!-- Legs (Thicker & Darker) -->
        <path d="M19 7L22 5" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M19 12L23 12" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M19 17L22 19" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M5 7L2 5" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M5 12L1 12" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M5 17L2 19" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
        
        <!-- Antennae -->
        <path d="M10 4L8 1" stroke="#222" stroke-width="2" stroke-linecap="round"/>
        <path d="M14 4L16 1" stroke="#222" stroke-width="2" stroke-linecap="round"/>

        <!-- Body with Radial 3D Fill -->
        <ellipse cx="12" cy="13" rx="8.5" ry="9.5" fill="url(#bodyGradient)" />
        
        <!-- Glossy Highlight (Reflection) -->
        <path d="M12 5.5 C 9 5.5, 6 8.5, 5.5 12 C 5.5 9, 8 6.5, 12 6.5 C 16 6.5, 18.5 9, 18.5 12 C 18 8.5, 15 5.5, 12 5.5 Z" fill="white" opacity="0.35"/>
        <ellipse cx="9" cy="9" rx="2" ry="3" transform="rotate(-45 9 9)" fill="white" opacity="0.2"/>

        <!-- Head -->
        <path d="M8 6.5C8 4 9.5 2.5 12 2.5C14.5 2.5 16 4 16 6.5C16 7.5 15 8.5 12 8.5C9 8.5 8 7.5 8 6.5Z" fill="url(#headGradient)"/>
        
        <!-- Eyes -->
        <circle cx="10.2" cy="4.5" r="0.8" fill="#fff"/>
        <circle cx="13.8" cy="4.5" r="0.8" fill="#fff"/>
        
        <!-- Pattern/Spots -->
        <path d="M12 8.5V22.5" stroke="#220000" stroke-width="1.5" stroke-opacity="0.4"/>
        <circle cx="9" cy="11" r="2" fill="#220000"/>
        <circle cx="15" cy="11" r="2" fill="#220000"/>
        <circle cx="7.5" cy="16" r="2.2" fill="#220000"/>
        <circle cx="16.5" cy="16" r="2.2" fill="#220000"/>
        <circle cx="12" cy="19.5" r="1.8" fill="#220000"/>
    </svg>`;

const renderHero = () => {
  return `
    <section class="hero container">
      <div class="hero-content">
        <p class="hero-tagline reveal" style="transition-delay: 100ms">${profile.tagline}</p>
        <h1 class="reveal" style="transition-delay: 200ms">
          Hi, I'm ${profile.name}.<br>I find ${bugIconSVG} before attackers do
        </h1>
        <p class="hero-desc reveal" style="transition-delay: 300ms">${profile.about}</p>
        <div class="hero-buttons reveal" style="transition-delay: 400ms">
            <a href="#projects" class="hero-btn">View My Work</a>
            <a href="/resume.pdf" download="Adnan_Anik_CV" class="hero-btn secondary">Download CV</a>
        </div>
      </div>
    </section>
  `;
};

const renderAbout = () => {
  return `
    <section id="about" class="container" style="margin-bottom: 6rem;">
       <h2 class="reveal">About me</h2>
       <div class="glass-card reveal" style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); padding: 3rem; max-width: 900px; margin: 0 auto; border-radius: 24px; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);">
         
         <div class="about-profile-grid">
            <!-- Profile Column -->
            <div class="profile-col">
                <div class="profile-img-wrapper">
                    <img src="/images/profile.png" alt="${profile.name}">
                </div>
                <div class="profile-meta">
                    <h3 class="profile-name">${profile.name}</h3>
                    <p class="profile-role">${profile.role}</p>
                    <div class="profile-loc">
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        ${profile.location}
                    </div>
                </div>
            </div>

            <!-- Bio Column -->
            <div class="bio-col">
                ${profile.bio.map(p => `<p class="bio-text">${p}</p>`).join('')}
            </div>
         </div>

       </div>
    </section>
  `;
};

const renderProjects = () => {
  const projectCards = projects.map((project, index) => `
    <div class="glass-card project-card reveal" style="transition-delay: ${index * 50}ms">
      <div class="image-wrapper">
        <img src="${project.image}" alt="${project.title}" loading="lazy">

      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section id="projects" class="container">
      <h2 class="reveal">Selected Works</h2>
      <div class="grid grid-2">
        ${projectCards}
      </div>
    </section>
  `;
};


const renderSkills = () => {
  const skillPills = skills.map((skill, index) => `
    <div class="skill-pill" style="transition-delay: ${index * 50}ms">
      <span class="skill-name">${skill.name}</span>
      <span class="skill-level">${skill.level}%</span>
    </div>
  `).join('');

  return `
    <section id="skills" class="container">
      <h2 class="reveal">Expertise</h2>
      <div class="skills-compact-card reveal">
        <h3 class="skills-subtitle">Technical Proficiency</h3>
        <div class="skills-pill-container">
          ${skillPills}
        </div>
      </div>
    </section>
  `;
};

const renderCertificates = () => {
  const certCards = certifications.map((cert, index) => `
    <div class="cert-showcase-card reveal" style="transition-delay: ${index * 50}ms" data-cert-index="${index}">
      <div class="cert-image-wrapper">
        <img src="${cert.image}" alt="${cert.title}" loading="lazy">
        <div class="cert-overlay">
          <svg class="cert-view-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>
      </div>
      <div class="cert-showcase-content">
        <h3>${cert.title}</h3>
        <p class="cert-issuer">${cert.issuer}</p>
      </div>
    </div>
  `).join('');

  return `
    <section id="certificates" class="container">
      <h2 class="reveal">Certifications</h2>
      <div class="cert-showcase-grid">
        ${certCards}
      </div>
    </section>
    
    <!-- Certificate Modal -->
    <div id="cert-modal" class="cert-modal">
      <div class="cert-modal-backdrop"></div>
      <div class="cert-modal-content">
        <button class="cert-modal-close">&times;</button>
        <img id="cert-modal-image" src="" alt="Certificate">
        <div class="cert-modal-info">
          <h3 id="cert-modal-title"></h3>
          <p id="cert-modal-issuer"></p>
        </div>
      </div>
    </div>
  `;
};

const renderFooter = () => {
  return `
    <footer id="contact" class="footer reveal" style="padding-top: 4rem;">
      <div class="container">
        <div class="glass-card" style="text-align: center; padding: 4rem 2rem; border-radius: 24px; position: relative; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);">
            <!-- decorative background glow -->
            <div style="position: absolute; top: -50%; left: 50%; transform: translateX(-50%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%); pointer-events: none;"></div>
            
            <h2 class="footer-title" style="margin-bottom: 1rem; font-size: 2.5rem;">Let's Connect</h2>
            <p style="margin-bottom: 3rem; color: var(--text-muted); font-size: 1.1rem; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;">Open for investigations, collaborations, and secure development.</p>
            
            <div class="social-links-grid" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; max-width: 800px; margin: 0 auto;">
            ${Object.entries(profile.social).map(([platform, url]) => `
                <a href="${url}" class="social-btn" target="_blank">
                    <span class="social-name">${platform}</span>
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="transition: transform 0.3s ease;"><path d="M7 17L17 7M17 7H7M17 7V17"></path></svg>
                </a>
            `).join('')}
            </div>
            
            <div class="footer-status" style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.05);">
                <p class="footer-copy" style="opacity: 0.85; font-size: 0.85rem; font-family: 'Courier New', monospace; letter-spacing: 0.05em; display: flex; align-items: center; justify-content: space-between; max-width: 900px; margin: 0 auto; padding: 0 2rem; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);">
                    <span style="color: #e0e0e0;">© ${new Date().getFullYear()} ${profile.name}</span>
                    <span style="display: flex; align-items: center; gap: 0.5rem; color: #22c55e;">
                        <span class="status-dot"></span>
                        All systems operational
                    </span>
                    <span id="visitor-ip" style="color: #22d3ee; white-space: nowrap;">
                        Your IP: <span class="ip-loading">...</span>
                    </span>
                </p>
            </div>
        </div>
      </div>
    </footer>
  `;
};



const renderScrollTop = () => {
  return `
        <button id="scrollToTop" class="scroll-top-btn" aria-label="Scroll to top">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        </button>
    `;
};

// Global event listeners (initialized once)
let globalListenersInitialized = false;

const initGlobalListeners = () => {
  if (globalListenersInitialized) return;
  globalListenersInitialized = true;

  // Smart Navbar Logic with debouncing
  const nav = document.querySelector('nav');
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 20) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }
    });
  });

  // ESC key listener for modal (global)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('cert-modal');
      if (modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
};

const render = () => {
  app.innerHTML = `
    ${renderHero()}
    ${renderAbout()}
    ${renderProjects()}
    ${renderSkills()}
    ${renderCertificates()}
    ${renderFooter()}
    ${renderScrollTop()}
  `;

  // Init Scroll Reveal with Intersection Observer (Premium Performance)
  setTimeout(() => {
    initBinaryBackground();

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          // Only reset if the element leaves via the BOTTOM of the screen
          // This implies we scrolled UP past it, so we want it to reveal again when we scroll DOWN.
          // If it leaves via the TOP, we keep it active so it doesn't re-animate when we scroll back UP to it.
          if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('active');
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Scroll To Top Logic
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
      });

      scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Certificate Modal Logic
    const modal = document.getElementById('cert-modal');
    const modalImage = document.getElementById('cert-modal-image');
    const modalTitle = document.getElementById('cert-modal-title');
    const modalIssuer = document.getElementById('cert-modal-issuer');
    const closeBtn = document.querySelector('.cert-modal-close');
    const backdrop = document.querySelector('.cert-modal-backdrop');

    document.querySelectorAll('.cert-showcase-card').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.certIndex);
        const cert = certifications[index];

        modalImage.src = cert.image;
        modalTitle.textContent = cert.title;
        modalIssuer.textContent = cert.issuer;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
  }, 100);

  // Fetch and display visitor IP
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ipElement = document.querySelector('#visitor-ip .ip-loading');
      if (ipElement) {
        ipElement.textContent = data.ip;
      }
    })
    .catch(error => {
      console.error('Failed to fetch IP:', error);
      const ipElement = document.querySelector('#visitor-ip .ip-loading');
      if (ipElement) {
        ipElement.textContent = 'Hidden';
      }
    });

  // Initialize global event listeners
  initGlobalListeners();
};

render();
