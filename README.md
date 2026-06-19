# The Team Agency Portfolio Studio

A high-end, responsive agency portfolio and team studio website built using HTML5, Vanilla JavaScript (ES6 Modules), and custom CSS. The site displays team bios, showcases recent projects, features dark/light mode preference persistence, and incorporates dynamic GitHub API profile enrichment with a client-side cache feed.

---

## 🚀 Key Features

*   **Premium & Rich Aesthetics**: Sleek modern design featuring tailored light and dark themes, rich gradients, dynamic card hover effects, custom scrollbars, and glassmorphism elements (`backdrop-filter`).
*   **Stale-While-Revalidate (SWR) GitHub Integration**: Team cards are dynamically enriched with real-time profile pictures, URLs, and name updates directly from the GitHub API. It utilizes a custom 2-hour TTL cache saved in `localStorage` to bypass API rate limits and speed up subsequent loads.
*   **Performance-Focused rendering**: Initial renders load instantly using local state data. Background network updates modify only the specific target elements on the page (e.g., updating user avatars), avoiding costly complete-section reflows.
*   **Staggered Network Requests & Rate-Limit Handling**: Dispatches requests sequentially with staggered delays to protect against API rate limit spikes, and automatically falls back to Unsplash placeholders with an onscreen warning banner if GitHub rate limits are reached.
*   **Persistent Theme Sync**: Theme toggler syncing with local storage and automatically defaulting to system preferences (`prefers-color-scheme`).
*   **Interactive Contact Form**: Client-side field-by-field and submit-time validation rules with real-time feedback, ARIA accessibility attributes, inline error alerts, and a custom CSS shake animation on validation failure.

---

## 📂 Project Architecture

The project is structured cleanly, decoupling state management, rendering logic, validation rules, and network integration.

```text
The Team Agency Portfolio/
├── index.html          # Core HTML template, layout skeleton, and semantic markup
├── styles.css          # Theme custom properties, styles, layouts, and responsive rules
└── js/
    ├── app.js          # Controller orchestrating initial setup and async triggers
    ├── state.js        # Global static configurations, data definitions, and state handlers
    ├── api.js          # GitHub API interaction layers and SWR storage handlers
    ├── form.js         # Input validation events, rules, and form submission routines
    └── render.js       # DOM builders, dynamic layout updates, and SVG asset storage
```

### File Breakdown

1.  **[index.html](file:///Users/shivamkumarjha/Downloads/The%20Team%20Agency%20Portfolio/index.html)**: Declares the structure of the layout, including the accessibility-optimized topbar, hero panel (with key statistics), and semantic wrappers for the team grid, project grids, and the contact section.
2.  **[styles.css](file:///Users/shivamkumarjha/Downloads/The%20Team%20Agency%20Portfolio/styles.css)**: Implements all custom styling via variables (custom properties) mapped to light/dark themes. Uses CSS Grid (`repeat(auto-fit, minmax(..., 1fr))`) and viewport clamp formulas for fluid responsiveness across phones, tablets, and desktops. Includes custom animations like the `shake` effect and `fadeIn` states.
3.  **[js/app.js](file:///Users/shivamkumarjha/Downloads/The%20Team%20Agency%20Portfolio/js/app.js)**: Runs as an ES module to initialize the page. It applies cached theme choices, sets up initial grid configurations, registers form events, and kicks off asynchronous background processes to fetch updated profiles.
4.  **[js/state.js](file:///Users/shivamkumarjha/Downloads/The%20Team%20Agency%20Portfolio/js/state.js)**: Houses the source of truth for portfolio data, default fallback settings, local storage keys, and simple getters/setters for settings.
5.  **[js/api.js](file:///Users/shivamkumarjha/Downloads/The%20Team%20Agency%20Portfolio/js/api.js)**: Holds fetch functions that query user details from GitHub. Implements the SWR validation caching logic (checks against a 2-hour TTL timestamp).
6.  **[js/form.js](file:///Users/shivamkumarjha/Downloads/The%20Team%20Agency%20Portfolio/js/form.js)**: Governs form events. Performs dynamic text length checks (minimum 2 chars for name, 10 for message) and regex matches (valid email structures) with dynamic state markers (`input-valid` / `input-invalid`).
7.  **[js/render.js](file:///Users/shivamkumarjha/Downloads/The%20Team%20Agency%20Portfolio/js/render.js)**: Handles direct interactions with DOM elements. Compiles card fragments, outputs tags, registers load fallbacks, and displays banner statuses.

---

## 👥 The Team

The site displays members of **The Team Agency**:

*   **Shivam Kumar Jha** (`sjha66556-ops`) - *Full Stack Developer*
    *   Skills: HTML, CSS, JavaScript, Node.js, Express
*   **Dhireena Banu** (`dhireenabanu7-wq`) - *Frontend Developer*
    *   Skills: React, UI Animation, Responsive Design, Tailwind
*   **Khushi Munna Kumar Agarwal** (`Khushi-agarwal1401`) - *Product Designer*
    *   Skills: UX Research, Design Systems, Prototyping, Figma
*   **Radheshyam Bhati** (`radheshyam-cod`) - *Developer & Architect*
    *   Skills: API Integration, Performance Tuning, System Design, Vanilla JS

---

## 💼 Featured Projects

The showcase highlights six responsive applications built by the team:

1.  **The Team Agency Portfolio**: This responsive portfolio studio containing bios, projects, dark mode preferences, and cached API feeds.
2.  **Interactive Quiz App**: A responsive quiz application featuring timed questions, custom score sheets, and real-time validation reviews.
3.  **Expense Tracker**: A day-to-day expenditure tracker with category filters and visual spending stats.
4.  **Live News Feed**: A lightweight news portal providing customized categories and layout options.
5.  **GitHub Developer Explorer**: A tool to inspect developer statistics, active repositories, languages, and profiles.
6.  **Kanban Task Board**: A collaborative, drag-and-drop workflow tracking board with state saving.

---

## 🛠️ Getting Started

Since this is a client-side web application built with Vanilla JS modules and CSS, there is no build step or node package dependencies required to run the client.

### Requirements

To run this application locally and bypass potential local file access browser restrictions (due to CORS rules with ES Modules):
*   A basic local development server is recommended.

### Quick Start

1.  **Using VS Code Live Server**:
    *   Install the **Live Server** extension.
    *   Right-click `index.html` and select **Open with Live Server**.

2.  **Using Node.js**:
    *   Run `npx serve` in the project root directory.
    *   Open `http://localhost:3000` (or the port specified in terminal).

3.  **Using Python**:
    *   For Python 3: `python -m http.server 8000`
    *   Open `http://localhost:8000` in your web browser.
# The-Team-Agency-Portfolio
