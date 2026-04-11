import { profile, projects, skills, certifications } from './data.js';
import { initBinaryBackground } from './binary-bg.js';

const app = document.querySelector('#app');

// Definition for the Cloud SVG
const cloudIconSVG = `
    <svg class="cloud-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle; width:80px; height:80px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)); margin: 0 4px;">
        <defs>
            <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#fffbf2;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#ffeb99;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="cloudInnerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
            </linearGradient>
            <filter id="cloudGlow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
                <feOffset dx="0" dy="1" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.5"/>
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        <!-- Base Cloud Shape -->
        <path d="M22,12 c-0.613,0-1.196,0.111-1.745,0.301 C19.261,9.255,16.89,7,14,7 c-3.309,0-6,2.691-6,6 c0,0.222,0.016,0.441,0.043,0.655 C5.748,14.195,4,16.396,4,19 c0,3.309,2.691,6,6,6 h12 c3.859,0,7-3.141,7-7 S25.859,12,22,12 z" 
              fill="url(#cloudGradient)" 
              filter="url(#cloudGlow)" />
              
        <!-- Inner Highlight for 3D effect -->
        <path d="M22,12 c-0.613,0-1.196,0.111-1.745,0.301 C19.261,9.255,16.89,7,14,7 c-3.309,0-6,2.691-6,6 c0,0.222,0.016,0.441,0.043,0.655 C5.748,14.195,4,16.396,4,19 c0,3.309,2.691,6,6,6 h12 c3.859,0,7-3.141,7-7 S25.859,12,22,12 z" 
              fill="url(#cloudInnerGlow)" 
              transform="scale(0.95) translate(0.8, 0.5)" />
              
        <!-- Small decorative tech stars / accents -->
        <path d="M7 5 L8 2 L9 5 L12 6 L9 7 L8 10 L7 7 L4 6 Z" fill="#ffb733" opacity="0.8"/>
        <path d="M26 8 L26.5 6 L28.5 5.5 L26.5 5 L26 3 L25.5 5 L23.5 5.5 L25.5 6 Z" fill="#ffb733" opacity="0.6"/>
    </svg>`;

const renderHero = () => {
  return `
    <section class="hero container">
      <div class="hero-content">
        <p class="hero-tagline reveal" style="transition-delay: 100ms">${profile.tagline}</p>
        <h1 class="reveal" style="transition-delay: 200ms">
          Hi, I'm <span style="color: #ffb733;">${profile.name}.</span><br>Cybersecurity enthusiast transitioning into ${cloudIconSVG} security
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
    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
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
    </a>
  `).join('');

  return `
    <section id="projects" class="container">
      <h2 class="reveal">My Projects</h2>
      <div class="grid grid-2">
        ${projectCards}
      </div>
    </section>
  `;
};


const renderSkills = () => {
  const categories = [
    {
      id: 'all',
      label: 'All Skills',
      icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
    },
    {
      id: 'languages',
      label: 'Languages',
      icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
    },
    {
      id: 'security',
      label: 'Security',
      icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
    },
    {
      id: 'infrastructure',
      label: 'Infrastructure',
      icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`
    }
  ];

  // ── SVG Brand Icons ──────────────────────────────────────────
  const icons = {
    python: `<svg viewBox="0 0 256 255" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pyG1" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%">
          <stop stop-color="#387EB8" offset="0%"/>
          <stop stop-color="#366994" offset="100%"/>
        </linearGradient>
        <linearGradient id="pyG2" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%">
          <stop stop-color="#FFE052" offset="0%"/>
          <stop stop-color="#FFC331" offset="100%"/>
        </linearGradient>
      </defs>
      <path fill="url(#pyG1)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"/>
      <path fill="url(#pyG2)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"/>
    </svg>`,

    javascript: `<svg viewBox="0 0 60 60" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="5" fill="#F7DF1E"/>
      <text x="30" y="30"
            dominant-baseline="central"
            text-anchor="middle"
            font-family="'Arial Black', Impact, Arial, sans-serif"
            font-weight="900"
            font-size="28"
            fill="#323330">JS</text>
    </svg>`,

    sql: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="#06b6d4" opacity=".9"/>
      <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#06b6d4" stroke-width="1.5" fill="none"/>
      <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" stroke="#06b6d4" stroke-width="1.5" fill="none"/>
      <path d="M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" stroke="#06b6d4" stroke-width="1.5" fill="none"/>
    </svg>`,

    linux: `<svg viewBox="0 0 128 128" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <path fill="#fff" d="M64 4C32.6 4 4 31.6 4 64s28.6 60 60 60 60-28.6 60-60S95.4 4 64 4z"/>
      <path fill="#1a1a1a" d="M64 8c-30.9 0-56 25.1-56 56s25.1 56 56 56 56-25.1 56-56S94.9 8 64 8z"/>
      <ellipse cx="64" cy="56" rx="26" ry="32" fill="#f5f5f5"/>
      <circle cx="54" cy="48" r="6" fill="#1a1a1a"/>
      <circle cx="74" cy="48" r="6" fill="#1a1a1a"/>
      <circle cx="55" cy="47" r="2.5" fill="#fff"/>
      <circle cx="75" cy="47" r="2.5" fill="#fff"/>
      <ellipse cx="64" cy="62" rx="8" ry="5" fill="#f5b8b8"/>
      <path fill="#1a1a1a" d="M56 67 Q64 75 72 67" stroke="#1a1a1a" stroke-width="1.5" fill="none"/>
      <path fill="#f5f5f5" d="M38 88 Q44 76 52 80 Q64 85 76 80 Q84 76 90 88 Q80 100 64 100 Q48 100 38 88z"/>
      <path fill="#1a1a1a" stroke="#1a1a1a" stroke-width="1" d="M46 36 Q42 16 56 20 Q60 12 64 18 Q68 12 72 20 Q86 16 82 36"/>
    </svg>`,

    networking: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#8b5cf6" stroke-width="1.5"/>
      <path d="M2 12h20" stroke="#8b5cf6" stroke-width="1.5"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" stroke="#8b5cf6" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="2" fill="#8b5cf6"/>
      <circle cx="4"  cy="12" r="1.5" fill="#8b5cf6" opacity=".6"/>
      <circle cx="20" cy="12" r="1.5" fill="#8b5cf6" opacity=".6"/>
    </svg>`,

    packet: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="7" width="20" height="10" rx="2" stroke="#ef4444" stroke-width="1.5"/>
      <path d="M6 11h2m2 0h2m2 0h2" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M2 12h20" stroke="#ef4444" stroke-width="1" opacity=".3" stroke-dasharray="3 2"/>
      <path d="M7 4l2 3M12 4v3M17 4l-2 3" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M7 20l2-3M12 20v-3M17 20l-2-3" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    dvwa: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#ec4899" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="6"  stroke="#ec4899" stroke-width="1.5" opacity=".7"/>
      <circle cx="12" cy="12" r="2.5" fill="#ec4899"/>
      <line x1="12" y1="2"  x2="12" y2="5"  stroke="#ec4899" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="12" y1="19" x2="12" y2="22" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="2"  y1="12" x2="5"  y2="12" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="19" y1="12" x2="22" y2="12" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    osint: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7" stroke="#f97316" stroke-width="1.8"/>
      <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
      <circle cx="10" cy="10" r="3" stroke="#f97316" stroke-width="1.2" opacity=".5"/>
      <line x1="10" y1="3" x2="10" y2="5" stroke="#f97316" stroke-width="1.2" stroke-linecap="round" opacity=".6"/>
      <line x1="10" y1="15" x2="10" y2="17" stroke="#f97316" stroke-width="1.2" stroke-linecap="round" opacity=".6"/>
      <line x1="3" y1="10" x2="5" y2="10" stroke="#f97316" stroke-width="1.2" stroke-linecap="round" opacity=".6"/>
    </svg>`,

    owasp: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="#e11d48" opacity=".15" stroke="#e11d48" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="#e11d48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    cloud: `<svg viewBox="-2 -2 96 64" width="36" height="24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudG" x1="20%" y1="0%" x2="75%" y2="100%">
          <stop offset="0%" stop-color="#5eead4"/>
          <stop offset="100%" stop-color="#0d9488"/>
        </linearGradient>
      </defs>
      <path d="M25,60 C10,60 0,50 0,36 C0,23 10,14 23,13 C23,6 30,0 39,0 C44,0 48,2 51,6 C53,2 58,0 63,0 C74,0 82,8 82,19 C88,21 92,27 92,34 C92,48 82,58 68,58 Z" fill="url(#cloudG)"/>
      <circle cx="34" cy="13" r="7" fill="rgba(255,255,255,0.25)"/>
      <circle cx="22" cy="26" r="4" fill="rgba(255,255,255,0.15)"/>
    </svg>`,

    aws: `<svg viewBox="-10 -5 148 138" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
      <path fill="#F90" d="M40.6 55.4c0 1.7.2 3.1.5 4.1.3 1 .8 2.1 1.5 3.3.3.4.4.9.4 1.3 0 .6-.3 1.1-.9 1.7l-3 2c-.4.3-.9.4-1.3.4-.5 0-1-.2-1.5-.7-.7-.7-1.3-1.5-1.8-2.3-.5-.8-1-1.7-1.6-2.8-4 4.7-9 7.1-15 7.1-4.3 0-7.7-1.2-10.1-3.6-2.4-2.4-3.7-5.7-3.7-9.7 0-4.3 1.5-7.8 4.6-10.4 3.1-2.6 7.2-3.9 12.5-3.9 1.7 0 3.5.1 5.4.4 1.9.3 3.8.7 5.9 1.1V38c0-3.8-.8-6.4-2.4-8-1.6-1.5-4.3-2.3-8.2-2.3-1.8 0-3.6.2-5.4.7-1.8.5-3.6 1.1-5.3 1.9-.8.4-1.4.6-1.7.7-.3.1-.6.2-.8.2-.7 0-1-.5-1-1.5V27c0-.8.1-1.4.4-1.7.3-.3.7-.7 1.4-1 1.8-.9 3.9-1.7 6.4-2.3 2.5-.6 5.1-.9 7.9-.9 6 0 10.4 1.4 13.2 4.1 2.8 2.7 4.2 6.9 4.2 12.4v16.8h.2zm-20.7 7.8c1.6 0 3.3-.3 5.1-.9 1.8-.6 3.4-1.6 4.8-3.1.8-.9 1.4-2 1.7-3.2.3-1.2.5-2.6.5-4.3v-2.1c-1.5-.4-3-.7-4.6-.9-1.6-.2-3.1-.3-4.7-.3-3.3 0-5.8.7-7.4 2-1.6 1.3-2.4 3.2-2.4 5.6 0 2.3.6 4 1.7 5.2 1.1 1.4 2.8 2 5.3 2zm40 5.4c-.9 0-1.5-.2-1.8-.5-.4-.3-.7-1-.9-1.8L48.7 23c-.2-.9-.3-1.5-.3-1.8 0-.7.4-1.1 1.1-1.1H53c.9 0 1.5.2 1.9.5.4.3.6 1 .9 1.8l8.7 34.4 8.1-34.4c.2-.9.5-1.5.9-1.8.4-.3 1.1-.5 2-.5h3.2c.9 0 1.5.2 2 .5.4.3.7 1 .9 1.8l8.2 34.8 9-34.8c.2-.9.5-1.5.9-1.8.4-.3 1-.5 1.9-.5h3.4c.7 0 1.1.4 1.1 1.1 0 .2 0 .5-.1.7 0 .3-.2.7-.4 1.2L95.1 66.3c-.2.9-.5 1.5-.9 1.8-.4.3-1 .5-1.8.5h-3.5c-.9 0-1.5-.2-2-.5-.4-.3-.7-1-.9-1.9l-8-33.3L70.1 66.1c-.2.9-.5 1.5-.9 1.9-.4.4-1.1.5-2 .5l-7.3.1zm53.9 1.1c-2.1 0-4.3-.2-6.3-.7-2-.5-3.6-1.1-4.7-1.7-.7-.4-1.1-.8-1.2-1.2-.1-.4-.2-.8-.2-1.2v-2.2c0-1 .4-1.5 1.1-1.5.3 0 .6.1.9.2.3.1.7.3 1.3.5 1.7.8 3.6 1.4 5.6 1.8 2 .4 4 .6 6 .6 3.2 0 5.7-.6 7.4-1.7 1.7-1.1 2.6-2.7 2.6-4.8 0-1.4-.4-2.6-1.3-3.5-.9-.9-2.6-1.7-5.1-2.5l-7.4-2.3c-3.7-1.2-6.4-2.9-8.1-5.3-1.7-2.4-2.5-4.9-2.5-7.7 0-2.2.5-4.2 1.5-5.9 1-1.7 2.3-3.2 4-4.4 1.6-1.2 3.5-2.1 5.7-2.7 2.2-.6 4.5-.9 6.9-.9 1.2 0 2.4.1 3.6.2 1.2.1 2.3.4 3.4.6 1.1.2 2 .5 2.9.8.9.3 1.6.7 2.1 1 .7.4 1.2.8 1.5 1.2.3.4.4.9.4 1.5v2c0 1-.4 1.5-1.1 1.5-.4 0-1-.2-1.9-.5-2.5-1.1-5.4-1.7-8.5-1.7-2.9 0-5.2.5-6.8 1.5-1.6 1-2.4 2.5-2.4 4.6 0 1.4.5 2.7 1.4 3.6.9.9 2.7 1.8 5.4 2.6l7.2 2.3c3.7 1.2 6.3 2.8 7.9 5 1.6 2.2 2.3 4.7 2.3 7.5 0 2.3-.5 4.3-1.4 6.1-.9 1.8-2.2 3.3-3.9 4.6-1.7 1.3-3.7 2.2-6 2.8-2.3.9-4.8 1.2-7.5 1.2z"/>
      <path fill="#F90" d="M119.7 88.4c-14.1 10.4-34.6 15.9-52.2 15.9-24.7 0-47-9.1-63.8-24.2-1.3-1.2-.1-2.8 1.4-1.8 18.2 10.5 40.6 16.9 63.8 16.9 15.6 0 32.8-3.2 48.7-9.9 2.4-1 4.4 1.5 2.1 3.1z"/>
      <path fill="#F90" d="M125.7 81.6c-1.8-2.3-11.8-1.1-16.3-.6-1.4.2-1.6-1-.3-1.9 8-5.6 21.1-4 22.6-2.1 1.5 1.9-.4 15.1-7.9 21.4-1.1 1-2.3.5-1.8-.8 1.7-4.2 5.5-13.7 3.7-16z"/>
    </svg>`,

    docker: `<svg viewBox="0 0 128 128" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
      <path fill="#0ea5e9" d="M124.8 52.1c-2.8-1.9-9.2-2.6-14.1-1.7-.6-4.9-3.5-9.1-8.4-12.9l-2.9-1.9-1.9 2.9c-2.4 3.7-3.5 8.9-3.1 13.9.2 1.7.8 4.7 2.6 7.3-1.9 1-5.7 2.4-10.7 2.3H2.4l-.2 1c-.7 7.4.5 16 4.9 22.6 4.3 6.5 10.7 9.8 19.3 9.8 18.3 0 31.9-8.4 38.3-23.7 2.5.1 7.9.05 10.7-5.2h.2s2.5-5 2.3-11.8c2.9-.2 9.5-.9 13.6-5.7l1.3-1.7-1-1.9zM80 63H70V53h10v10zm-13 0H57V53h10v10zm-13 0H44V53h10v10zm-13 0H31V53h10v10zm-12-10H19V43h10v10zM41 43H31V33h10v10zm13 0H44V33h10v10zm13 0H57V33h10v10z"/>
    </svg>`,

    nginx: `<svg viewBox="0 0 128 128" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <path fill="#009900" d="M64 4.5L4.5 38.4v51.2L64 123.5l59.5-33.9V38.4L64 4.5z"/>
      <path fill="#fff" d="M76.9 93.4H53.6c-2.3 0-4.2-1.9-4.2-4.2V66.4L34.2 88.6c-1.1 1.9-3.1 2.8-5 2.2-.6-.2-1.2-.5-1.7-.9-1.7-1.4-2.1-3.8-.9-5.9l31.2-54.3c.8-1.4 2.3-2.2 3.8-2.2H75c2.3 0 4.2 1.9 4.2 4.2v22.8l15.2-22.2c1.1-1.9 3.1-2.8 5-2.2.6.2 1.2.5 1.7.9 1.7 1.4 2.1 3.8.9 5.9L70.8 91.2c-.8 1.4-2.3 2.2-3.8 2.2h-.1z"/>
    </svg>`,
  };

  const skillData = [
    { name: 'Python', level: 90, category: 'languages', color: '#3b82f6', icon: icons.python, desc: 'Expert' },
    { name: 'JavaScript', level: 85, category: 'languages', color: '#f59e0b', icon: icons.javascript, desc: 'Advanced' },
    { name: 'SQL', level: 85, category: 'languages', color: '#06b6d4', icon: icons.sql, desc: 'Advanced' },
    { name: 'Linux', level: 80, category: 'infrastructure', color: '#10b981', icon: icons.linux, desc: 'Proficient' },
    { name: 'Networking', level: 75, category: 'security', color: '#8b5cf6', icon: icons.networking, desc: 'Proficient' },
    { name: 'Packet Analysis', level: 70, category: 'security', color: '#ef4444', icon: icons.packet, desc: 'Intermediate' },
    { name: 'DVWA', level: 75, category: 'security', color: '#ec4899', icon: icons.dvwa, desc: 'Proficient' },
    { name: 'OSINT', level: 65, category: 'security', color: '#f97316', icon: icons.osint, desc: 'Intermediate' },
    { name: 'OWASP Top 10', level: 80, category: 'security', color: '#e11d48', icon: icons.owasp, desc: 'Proficient' },
    { name: 'Cloud', level: 75, category: 'infrastructure', color: '#14b8a6', icon: icons.cloud, desc: 'Proficient' },
    { name: 'AWS', level: 70, category: 'infrastructure', color: '#f59e0b', icon: icons.aws, desc: 'Intermediate' },
    { name: 'Docker', level: 75, category: 'infrastructure', color: '#0ea5e9', icon: icons.docker, desc: 'Proficient' },
    { name: 'Nginx', level: 70, category: 'infrastructure', color: '#22c55e', icon: icons.nginx, desc: 'Intermediate' },
  ];

  const circumference = 2 * Math.PI * 36; // radius = 36

  const skillCards = skillData.map((skill, index) => {
    const offset = circumference - (skill.level / 100) * circumference;
    return `
      <div class="skill-orb reveal" 
           data-category="${skill.category}" 
           style="--accent-color: ${skill.color}; --ring-offset: ${circumference}; --ring-target: ${offset}; transition-delay: ${index * 30}ms;"
           data-target-offset="${offset}">
        <div class="skill-orb-inner">
          <div class="skill-orb-ring-wrapper">
            <svg class="skill-ring" viewBox="0 0 88 88" width="110" height="110">
              <circle class="skill-ring-track" cx="44" cy="44" r="36"/>
              <circle class="skill-ring-fill" cx="44" cy="44" r="36"
                stroke="${skill.color}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${circumference}"
                data-target="${offset}"
                style="filter: drop-shadow(0 0 6px ${skill.color}80);"
              />
            </svg>
            <div class="skill-orb-icon">${skill.icon}</div>
          </div>
          <div class="skill-orb-label">${skill.level}%</div>
          <div class="skill-orb-badge" style="background: ${skill.color}20; color: ${skill.color}; border-color: ${skill.color}40;">${skill.name}</div>
        </div>
        <div class="skill-orb-glow" style="background: radial-gradient(circle, ${skill.color}30, transparent 70%);"></div>
        <div class="skill-particles" data-color="${skill.color}"></div>
      </div>
    `;
  }).join('');

  const tabs = categories.map(cat => `
    <button class="skill-tab ${cat.id === 'all' ? 'active' : ''}" data-filter="${cat.id}">
      ${cat.icon}
      <span>${cat.label}</span>
    </button>
  `).join('');

  return `
    <section id="skills" class="container">
      <h2 class="reveal">Expertise</h2>

      <div class="skill-tabs reveal" style="transition-delay: 50ms;">
        ${tabs}
      </div>
      <div class="skill-orb-grid" id="skillGrid">
        ${skillCards}
      </div>
    </section>
  `;
};

const renderCertificates = () => {
  const issuerAccents = {
    'Amazon Web Services':  { color: '#f90', glyph: 'AWS' },
    'EC-Council':           { color: '#e11d48', glyph: 'EC-Council' },
    'Cybrary':              { color: '#06b6d4', glyph: 'Cybrary' },
    'Cybersecurity and Infrastructure Security Agency': { color: '#7c3aed', glyph: 'CISA' },
    'Cisco Networking Academy': { color: '#1d6fa4', glyph: 'CISCO' },
  };

  const certCards = certifications.map((cert, index) => {
    const accent = issuerAccents[cert.issuer] || { color: '#06b6d4', glyph: '??' };
    return `
    <div class="cert-card-modern reveal" style="transition-delay: ${index * 20}ms; --accent: ${accent.color};" data-cert-index="${index}">
      <!-- Number badge -->
      <span class="cert-num">${String(index + 1).padStart(2, '0')}</span>

      <!-- Thumbnail -->
      <div class="cert-thumb">
        <img src="${cert.image}" alt="${cert.title}" loading="lazy">
        <div class="cert-thumb-overlay">
          <svg width="28" height="28" fill="none" stroke="#fff" stroke-width="2" viewBox="0 0 24 24"><path d="M15 3h6v6M10 14L20 4M9 21H3V15"/></svg>
        </div>
      </div>

      <!-- Info -->
      <div class="cert-info">
        <span class="cert-issuer-badge" style="background: ${accent.color}22; color: ${accent.color}; border-color: ${accent.color}44;">${accent.glyph}</span>
        <h3 class="cert-title">${cert.title}</h3>
        <p class="cert-org">${cert.issuer}</p>
      </div>
    </div>
  `;
  }).join('');


  return `
    <section id="certificates" class="container">
      <h2 class="reveal">Certifications</h2>
      <div class="cert-modern-grid">
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
  const scrollBtn = document.getElementById('scrollToTop');
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Nav rules
      if (scrollTop > 20) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }

      // Scroll To Top rules
      if (scrollBtn) {
        if (scrollTop > 500) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
      }
    });
  });

  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

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
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Animate SVG skill rings
          if (entry.target.classList.contains('skill-orb')) {
            const ring = entry.target.querySelector('.skill-ring-fill');
            if (ring) {
              const target = parseFloat(ring.dataset.target);
              setTimeout(() => { ring.style.strokeDashoffset = target; }, 200);
            }
          }
        } else {
          if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('active');
            // Reset rings
            if (entry.target.classList.contains('skill-orb')) {
              const ring = entry.target.querySelector('.skill-ring-fill');
              const circumference = 2 * Math.PI * 36;
              if (ring) ring.style.strokeDashoffset = circumference;
            }
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // --- Skill Tab Filtering ---
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillOrbs = document.querySelectorAll('.skill-orb');
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        skillOrbs.forEach((orb, i) => {
          const match = filter === 'all' || orb.dataset.category === filter;
          orb.style.transition = `opacity 0.35s ease ${i * 30}ms, transform 0.35s ease ${i * 30}ms`;
          if (match) {
            orb.style.opacity = '1';
            orb.style.transform = 'scale(1)';
            orb.style.pointerEvents = 'all';
          } else {
            orb.style.opacity = '0.15';
            orb.style.transform = 'scale(0.92)';
            orb.style.pointerEvents = 'none';
          }
        });
      });
    });

    // --- Skill Orb 3D Tilt & Glow ---
    document.querySelectorAll('.skill-orb').forEach(orb => {
      orb.addEventListener('mousemove', (e) => {
        const rect = orb.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -12;
        const rotY = ((x - cx) / cx) * 12;
        orb.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.08) translateY(-4px)`;
      });

      orb.addEventListener('mouseleave', () => {
        orb.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)';
        // trigger particle burst
        spawnParticles(orb);
      });
    });

    // --- Particle Burst ---
    function spawnParticles(orb) {
      const color = orb.style.getPropertyValue('--accent-color') || '#06b6d4';
      const container = orb.querySelector('.skill-particles');
      if (!container) return;
      for (let i = 0; i < 8; i++) {
        const p = document.createElement('span');
        p.className = 'particle';
        const angle = (i / 8) * 360;
        const dist = 30 + Math.random() * 25;
        p.style.cssText = `
          --px: ${Math.cos(angle * Math.PI / 180) * dist}px;
          --py: ${Math.sin(angle * Math.PI / 180) * dist}px;
          background: ${color};
          box-shadow: 0 0 6px ${color};
        `;
        container.appendChild(p);
        p.addEventListener('animationend', () => p.remove());
      }
    }

    // Scroll event logic merged into initGlobalListeners() for performance

    // Certificate Modal Logic
    const modal = document.getElementById('cert-modal');
    const modalImage = document.getElementById('cert-modal-image');
    const modalTitle = document.getElementById('cert-modal-title');
    const modalIssuer = document.getElementById('cert-modal-issuer');
    const closeBtn = document.querySelector('.cert-modal-close');
    const backdrop = document.querySelector('.cert-modal-backdrop');

    document.querySelectorAll('.cert-card-modern').forEach(card => {
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

  // Defer fetching visitor IP so it does not block initial layout parsing
  setTimeout(() => {
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
  }, 1000);

  // Initialize global event listeners
  initGlobalListeners();
};

render();
