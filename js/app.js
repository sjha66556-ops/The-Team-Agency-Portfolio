import state from './state.js';
import { applyTheme, renderTeam, renderProjects, updateMemberCard, showApiNotice } from './render.js';
import { enrichTeamWithGithub } from './api.js';
import { initForm } from './form.js';

const themeToggle = document.getElementById('themeToggle');

async function initialize() {
  // 1. Load and apply theme immediately to avoid styling flash
  state.loadTheme();
  applyTheme();

  // 2. Hydrate cache from localStorage
  state.loadGithubCache();

  // 3. Render projects immediately (completely static content, quick rendering)
  renderProjects(state.projects);

  // 4. Render team immediately using cached data or fallback avatars (SWR first phase)
  const initialMembers = state.members.map((member) => {
    const cacheKey = member.github.toLowerCase();
    const cached = state.githubCache[cacheKey];
    const profile = cached ? cached.profile : null;
    return {
      ...member,
      avatar: profile ? profile.avatar_url : member.fallbackAvatar,
      githubUrl: profile ? profile.html_url : `https://github.com/${member.github}`,
      githubLogin: profile ? profile.login : member.github,
      displayName: profile ? profile.name : member.name
    };
  });
  renderTeam(initialMembers);

  // 5. Bind theme toggler controls
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      state.toggleTheme();
      applyTheme();
    });
  }

  // 6. Listen for custom API limit warnings to show warning banner
  window.addEventListener('github-api-rate-limited', (event) => {
    showApiNotice(event.detail?.message || 'GitHub API rate limit exceeded.');
  });

  // 7. Initialize validation hooks on the contact form
  initForm();

  // 8. Run SWR updates asynchronously in the background. Card updates occur individually.
  try {
    await enrichTeamWithGithub(state.members, (username, profile) => {
      // Background callback updates cards directly, avoiding complete section rebuild
      updateMemberCard(username, profile);
    });
  } catch (error) {
    console.warn('Background profile sync finished with errors:', error);
  }
}

// Invoke instantly as ES module scripts execute after DOM is ready
initialize();
