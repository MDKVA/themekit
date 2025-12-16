/**
 * @typedef {'light' | 'dark' | string} Theme - Represents a valid theme string.
 */

// Configuration Defaults
const CONFIG = {
  STORAGE_KEY: 'mdkva-theme',
  DEFAULT_THEME: 'light',
  THEME_TOGGLE_LIST: ['light', 'dark'], // For toggleTheme()
  HTML_ATTRIBUTE: 'data-theme'
};

// Detect if running in browser environment
const isBrowser =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined';

// HTML reference (safe for SSR)
const HTML = isBrowser ? document.documentElement : null;

/* ---------------------------------------------------------
 * Safe localStorage access
 * --------------------------------------------------------- */
/**
 * Safely retrieves a value from localStorage.
 * @param {string} key
 * @returns {string | null}
 */
function safeGet(key) {
  if (!isBrowser) return null;
  try { return localStorage.getItem(key); }
  catch { return null; }
}

/**
 * Safely sets a value in localStorage.
 * @param {string} key
 * @param {string} value
 * @returns {void}
 */
function safeSet(key, value) {
  if (!isBrowser) return;
  try { localStorage.setItem(key, value); }
  catch { }
}

/* ---------------------------------------------------------
 * Core functions
 * --------------------------------------------------------- */

/**
 * Toggles the theme between the configured list (default: light <-> dark).
 * @returns {Theme} The newly set theme.
 */
function toggleTheme() {
  if (!isBrowser) return CONFIG.DEFAULT_THEME;

  const currentTheme = getTheme();
  const currentIndex = CONFIG.THEME_TOGGLE_LIST.indexOf(currentTheme);

  // Determine the next index, cycling back to 0 if at the end
  const nextIndex = (currentIndex + 1) % CONFIG.THEME_TOGGLE_LIST.length;
  const nextTheme = CONFIG.THEME_TOGGLE_LIST[nextIndex];

  setTheme(nextTheme);
  return nextTheme;
}

/**
 * Sets the theme on the HTML element and persists it to storage.
 * @param {Theme} theme - The theme to set ('light', 'dark', etc.).
 * @returns {void}
 */
function setTheme(theme) {
  if (!isBrowser || !theme || typeof theme !== 'string') return;

  // Set the attribute (using configurable HTML_ATTRIBUTE)
  HTML.setAttribute(CONFIG.HTML_ATTRIBUTE, theme);

  // Persist the choice
  safeSet(CONFIG.STORAGE_KEY, theme);
}

/**
 * Retrieves the currently active theme: checks storage, then DOM, then system preference.
 * @returns {Theme} The active theme string.
 */
function getTheme() {
  if (!isBrowser) return CONFIG.DEFAULT_THEME;

  // 1. Check persistent storage
  const saved = safeGet(CONFIG.STORAGE_KEY);
  if (saved) return saved;

  // 2. Check DOM (useful if initTheme was skipped)
  const dom = HTML.getAttribute(CONFIG.HTML_ATTRIBUTE);
  if (dom) return dom;

  // 3. Fallback to system preference
  return systemPrefers();
}

/**
 * Detects the user's system preference using matchMedia.
 * @returns {Theme} 'dark' or 'light'.
 */
function systemPrefers() {
  if (!isBrowser) return CONFIG.DEFAULT_THEME;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Subscribes a callback function to system theme changes.
 * @param {function(Theme): void} callback - Function called when system preference changes.
 * @returns {void}
 */
function watchSystemTheme(callback) {
  if (!isBrowser || typeof callback !== 'function') return;

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e) => callback(e.matches ? 'dark' : 'light');

  // Robustness: Use modern addEventListener with fallback to older addListener
  if (mq.addEventListener) {
    mq.addEventListener('change', handler);
  } else if (mq.addListener) {
    mq.addListener(handler);
  }
}

/**
 * Initializes the theme on the HTML element based on saved preference or system preference.
 * @returns {void}
 */
function initTheme() {
  if (!isBrowser) return;

  const saved = safeGet(CONFIG.STORAGE_KEY);
  const chosen = saved || systemPrefers();

  HTML.setAttribute(CONFIG.HTML_ATTRIBUTE, chosen);

  // Only set storage if we used the system preference (to lock it in)
  if (!saved) safeSet(CONFIG.STORAGE_KEY, chosen);
}

/* ---------------------------------------------------------
 * Export
 * --------------------------------------------------------- */

// No auto-initialization here, giving the developer control over FOUC/timing.
// The developer should manually call ThemeKit.initTheme() or include a <script> tag for it.

export const ThemeKit = {
  /** @type {Object} */
  CONFIG, // Export config for dynamic changes

  toggleTheme,
  setTheme,
  getTheme,
  systemPrefers,
  watchSystemTheme,
  initTheme
};

// camelCase convention... for those that don't prefer PascalCase
export const themeKit = ThemeKit;