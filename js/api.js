import state from './state.js';

const CACHE_TTL_MS = 1000 * 60 * 60 * 2; // Cache valid for 2 hours

function getCacheKey(username) {
  return username.toLowerCase();
}

function createFallbackProfile(member) {
  return {
    avatar_url: member.fallbackAvatar,
    html_url: `https://github.com/${member.github}`,
    login: member.github,
    name: member.name
  };
}

async function fetchProfileFromNetwork(member) {
  const endpoint = `https://api.github.com/users/${encodeURIComponent(member.github)}`;
  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/vnd.github.v3+json' }
    });

    if (response.status === 403 || response.status === 429) {
      throw new Error('rate-limit');
    }
    if (!response.ok) {
      throw new Error(`http-${response.status}`);
    }

    const profile = await response.json();
    const enriched = {
      avatar_url: profile.avatar_url || member.fallbackAvatar,
      html_url: profile.html_url || `https://github.com/${member.github}`,
      login: profile.login || member.github,
      name: profile.name || member.name
    };

    const cacheKey = getCacheKey(member.github);
    state.githubCache[cacheKey] = { profile: enriched, timestamp: Date.now() };
    state.saveGithubCache();
    return enriched;
  } catch (error) {
    if (error.message === 'rate-limit') {
      throw error;
    }
    console.warn(`GitHub API request failed for ${member.github}:`, error);
    return createFallbackProfile(member);
  }
}

async function updateBackground(member, triggerUpdateCallback) {
  try {
    // Add staggered delay to avoid parallel requests bursting the rate limit
    await new Promise((resolve) => setTimeout(resolve, 300));
    const profile = await fetchProfileFromNetwork(member);
    triggerUpdateCallback(member.github, profile);
  } catch (error) {
    console.warn(`Background profile refresh failed for ${member.github}:`, error);
    if (error.message === 'rate-limit') {
      window.dispatchEvent(new CustomEvent('github-api-rate-limited', {
        detail: { message: 'GitHub API rate limit hit. Using cached and local profiles.' }
      }));
    }
  }
}

export async function fetchGithubProfile(member, triggerUpdateCallback = null) {
  const cacheKey = getCacheKey(member.github);
  const cached = state.githubCache[cacheKey];
  const now = Date.now();

  const isExpired = !cached || (now - cached.timestamp > CACHE_TTL_MS);

  if (cached) {
    if (isExpired && triggerUpdateCallback) {
      // Trigger update in background, do not block main thread
      updateBackground(member, triggerUpdateCallback);
    }
    return cached.profile;
  }

  // First time or no cache: fetch synchronously
  try {
    const profile = await fetchProfileFromNetwork(member);
    if (triggerUpdateCallback) {
      triggerUpdateCallback(member.github, profile);
    }
    return profile;
  } catch (error) {
    if (error.message === 'rate-limit') {
      window.dispatchEvent(new CustomEvent('github-api-rate-limited', {
        detail: { message: 'GitHub API rate limit hit. Loaded default profiles.' }
      }));
    }
    return createFallbackProfile(member);
  }
}

export async function enrichTeamWithGithub(members, onMemberUpdated = null) {
  const promises = members.map(async (member) => {
    const profile = await fetchGithubProfile(member, onMemberUpdated);
    return {
      ...member,
      avatar: profile.avatar_url,
      githubUrl: profile.html_url,
      githubLogin: profile.login,
      displayName: profile.name
    };
  });

  return await Promise.all(promises);
}
