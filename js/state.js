const TEAM_MEMBERS = [
  {
    name: 'Shivam Kumar Jha',
    title: 'Full Stack Developer',
    github: 'sjha66556-ops',
    skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express'],
    fallbackAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Dhireena Banu',
    title: 'Frontend Developer',
    github: 'dhireenabanu7-wq',
    skills: ['React', 'UI Animation', 'Responsive Design', 'Tailwind'],
    fallbackAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Khushi Munna Kumar Agarwal',
    title: 'Product Designer',
    github: 'Khushi-agarwal1401',
    skills: ['UX Research', 'Design Systems', 'Prototyping', 'Figma'],
    fallbackAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Radheshyam Bhati',
    title: 'Developer & Architect',
    github: 'radheshyam-cod',
    skills: ['API Integration', 'Performance Tuning', 'System Design', 'Vanilla JS'],
    fallbackAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
];

const PROJECTS = [
  {
    title: 'The Team Agency Portfolio',
    subtitle: 'A high-end, responsive agency portfolio displaying team bios, projects, with dark mode persistence and cached API feeds.',
    tags: ['Vanilla JS', 'Theme Sync', 'DOM Performance'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    contributors: [
      { name: 'Shivam Kumar Jha', github: 'sjha66556-ops' }
    ],
    url: '#'
  },
  {
    title: 'Interactive Quiz App',
    subtitle: 'A responsive quiz application featuring timed questions, custom score sheets, and real-time validation reviews.',
    tags: ['Quiz Engine', 'Micro-interactions', 'Dynamic UI'],
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
    contributors: [
      { name: 'Dhireena Banu', github: 'dhireenabanu7-wq' }
    ],
    url: '#'
  },
  {
    title: 'Expense Tracker',
    subtitle: 'Track day-to-day expenditures, sort transactions into categories, and visualize spending statistics.',
    tags: ['Finance', 'Data Tracking', 'Vanilla JS'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    contributors: [
      { name: 'Khushi Munna Kumar Agarwal', github: 'Khushi-agarwal1401' }
    ],
    url: 'https://khushi-agarwal1401.github.io/Expense-Tracker/'
  },
  {
    title: 'Live News Feed',
    subtitle: 'A lightweight news portal offering customized categories, dynamic refresh feeds, and layout options.',
    tags: ['News API', 'Async Loading', 'Reflow Free'],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    contributors: [
      { name: 'Radheshyam Bhati', github: 'radheshyam-cod' }
    ],
    url: 'https://radheshyam-cod.github.io/News-Feed/'
  },
  {
    title: 'GitHub Developer Explorer',
    subtitle: 'Search and inspect developer statistics, active repositories, languages, and profile portfolios.',
    tags: ['GitHub API', 'Search Engine', 'Grid Layout'],
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80',
    contributors: [
      { name: 'Khushi Munna Kumar Agarwal', github: 'Khushi-agarwal1401' },
      { name: 'Radheshyam Bhati', github: 'radheshyam-cod' }
    ],
    url: 'https://radheshyam-cod.github.io/GitHub-Developer-Explorer/'
  },
  {
    title: 'Kanban Task Board',
    subtitle: 'A collaborative, drag-and-drop workflow tracking board with state saving and user assignment tools.',
    tags: ['Drag and Drop', 'Workflows', 'State Sync'],
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    contributors: [
      { name: 'Shivam Kumar Jha', github: 'sjha66556-ops' },
      { name: 'Dhireena Banu', github: 'dhireenabanu7-wq' }
    ],
    url: '#'
  }
];

const STORAGE_KEYS = {
  theme: 'tta-portfolio-theme',
  githubCache: 'tta-github-cache'
};

const DEFAULT_STATE = {
  theme: 'light',
  members: TEAM_MEMBERS,
  projects: PROJECTS,
  githubCache: {}
};

const state = {
  theme: DEFAULT_STATE.theme,
  members: DEFAULT_STATE.members,
  projects: DEFAULT_STATE.projects,
  githubCache: DEFAULT_STATE.githubCache,
  
  loadTheme() {
    const stored = window.localStorage.getItem(STORAGE_KEYS.theme);
    if (stored === 'dark' || stored === 'light') {
      this.theme = stored;
    } else {
      // Fallback to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme = prefersDark ? 'dark' : 'light';
    }
  },
  
  saveTheme() {
    window.localStorage.setItem(STORAGE_KEYS.theme, this.theme);
  },
  
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.saveTheme();
  },
  
  loadGithubCache() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.githubCache);
      this.githubCache = raw ? JSON.parse(raw) : {};
    } catch (error) {
      this.githubCache = {};
    }
  },
  
  saveGithubCache() {
    try {
      window.localStorage.setItem(STORAGE_KEYS.githubCache, JSON.stringify(this.githubCache));
    } catch (error) {
      console.warn('Unable to save GitHub cache', error);
    }
  }
};

export default state;
