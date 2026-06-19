import state from './state.js';

const teamGrid = document.getElementById('teamGrid');
const projectGrid = document.getElementById('projectGrid');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const formStatus = document.getElementById('formStatus');

// SVG Icons
const GITHUB_SVG = `<svg class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`;
const LINK_SVG = `<svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;

export function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  themeIcon.textContent = state.theme === 'dark' ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-pressed', String(state.theme === 'dark'));
}

export function renderTeam(members) {
  teamGrid.innerHTML = '';
  const fragment = document.createDocumentFragment();

  members.forEach((member) => {
    const card = document.createElement('article');
    card.className = 'team-card';
    card.setAttribute('data-github', member.github.toLowerCase());
    
    card.innerHTML = `
      <header class="team-card-header">
        <div class="avatar-container">
          <img class="avatar" 
               src="${member.avatar || member.fallbackAvatar}" 
               alt="${member.name} avatar" 
               width="80" 
               height="80"
               loading="lazy" />
        </div>
        <div class="member-info">
          <h3>${member.name}</h3>
          <p class="member-title">${member.title}</p>
        </div>
      </header>
      <ul class="skill-list">
        ${member.skills.map((skill) => `<li>${skill}</li>`).join('')}
      </ul>
      <div class="team-card-footer">
        <a class="github-link" href="${member.githubUrl || `https://github.com/${member.github}`}" target="_blank" rel="noopener noreferrer">
          ${GITHUB_SVG}
          <span>@${member.github}</span>
        </a>
      </div>
    `;

    // Handle image load error gracefully
    const img = card.querySelector('.avatar');
    img.onerror = () => {
      img.src = member.fallbackAvatar;
      img.onerror = null;
    };

    fragment.appendChild(card);
  });

  teamGrid.appendChild(fragment);
}

// Seamlessly update a single team member card when background data loads (no reflow/re-render of siblings)
export function updateMemberCard(githubUsername, profile) {
  const card = teamGrid.querySelector(`[data-github="${githubUsername.toLowerCase()}"]`);
  if (!card) return;

  const img = card.querySelector('.avatar');
  const githubLink = card.querySelector('.github-link');
  const nameHeader = card.querySelector('.member-info h3');

  if (img && profile.avatar_url) {
    img.src = profile.avatar_url;
  }
  if (githubLink && profile.html_url) {
    githubLink.href = profile.html_url;
  }
  if (nameHeader && profile.name) {
    nameHeader.textContent = profile.name;
  }
}

export function renderProjects(projects) {
  projectGrid.innerHTML = '';
  const fragment = document.createDocumentFragment();

  projects.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    
    card.innerHTML = `
      <div class="project-media">
        <img src="${project.image}" alt="Preview of ${project.title}" width="600" height="337" loading="${index < 3 ? 'eager' : 'lazy'}" />
      </div>
      <div class="project-content">
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div class="project-details">
          <h3>${project.title}</h3>
          <p class="project-subtitle">${project.subtitle}</p>
        </div>
        <div class="project-contributors-list">
          <p class="contributors-title">Collaborators</p>
          <div class="contributors-names">
            ${project.contributors.map(c => `<span class="contributor-tag">${c.name}</span>`).join('')}
          </div>
        </div>
        <div class="project-footer">
          ${project.url && project.url !== '#' 
            ? `<a class="button button-secondary project-action-btn" href="${project.url}" target="_blank" rel="noopener noreferrer">
                 <span>Launch App</span>
                 ${LINK_SVG}
               </a>` 
            : `<span class="coming-soon-badge">Ongoing Development</span>`
          }
        </div>
      </div>
    `;
    
    fragment.appendChild(card);
  });

  projectGrid.appendChild(fragment);
}

export function showFormStatus(message, isError = false) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = 'form-status';
  if (message) {
    formStatus.classList.add(isError ? 'status-error' : 'status-success');
    formStatus.classList.add('animate-fade-in');
  }
}

export function showApiNotice(message) {
  const existing = document.getElementById('apiNotice');
  if (existing) {
    existing.textContent = message;
    existing.classList.add('animate-pulse');
    setTimeout(() => existing.classList.remove('animate-pulse'), 1000);
    return;
  }
  
  const notice = document.createElement('div');
  notice.id = 'apiNotice';
  notice.className = 'api-notice-banner';
  notice.innerHTML = `
    <span class="notice-icon">⚠️</span>
    <p class="notice-text">${message}</p>
  `;
  
  // Insert notice banner at the top of the body page shell
  const pageShell = document.querySelector('.page-shell');
  if (pageShell) {
    pageShell.insertBefore(notice, pageShell.querySelector('main'));
  }
}
