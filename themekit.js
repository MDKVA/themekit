// MDKVA ThemeKit
// Lightweight & safe theme manager for modern web apps

const STORAGE_KEY = 'mdkva-theme';

// Detect if running in browser environment
const isBrowser =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined';

// HTML reference (safe for SSR)
const HTML = isBrowser ? document.documentElement : null;

/* ---------------------------------------------------------
 * Safe localStorage access
 * --------------------------------------------------------- */
function safeGet(key) {
  if (!isBrowser) return null;
  try { return localStorage.getItem(key); }
  catch { return null; }
}

function safeSet(key, value) {
  if (!isBrowser) return;
  try { localStorage.setItem(key, value); }
  catch {}
}

/* ---------------------------------------------------------
 * API: setTheme()
 * --------------------------------------------------------- */
export function setTheme(theme) {
  if (!isBrowser || !theme) return;

  HTML.setAttribute('data-theme', theme);
  safeSet(STORAGE_KEY, theme);
}

/* ---------------------------------------------------------
 * API: getTheme()
 * Priority: saved → DOM → system
 * --------------------------------------------------------- */
export function getTheme() {
  if (!isBrowser) return 'light';

  const saved = safeGet(STORAGE_KEY);
  if (saved) return saved;

  const dom = HTML.getAttribute('data-theme');
  if (dom) return dom;

  return systemPrefers();
}

/* ---------------------------------------------------------
 * API: toggleTheme()
 * --------------------------------------------------------- */
export function toggleTheme() {
  if (!isBrowser) return 'light';

  const domTheme = HTML.getAttribute('data-theme');
  const current = domTheme || getTheme();
  const next = current === 'dark' ? 'light' : 'dark';

  setTheme(next);
  return next;
}

/* ---------------------------------------------------------
 * API: systemPrefers()
 * --------------------------------------------------------- */
export function systemPrefers() {
  if (!isBrowser) return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/* ---------------------------------------------------------
 * API: watchSystemTheme()
 * --------------------------------------------------------- */
export function watchSystemTheme(callback) {
  if (!isBrowser || typeof callback !== 'function') return;

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e) => callback(e.matches ? 'dark' : 'light');

  if (mq.addEventListener) {
    mq.addEventListener('change', handler);
  } else if (mq.addListener) {
    mq.addListener(handler); // Safari < 14
  }
}

/* ---------------------------------------------------------
 * API: initTheme()
 * --------------------------------------------------------- */
export function initTheme() {
  if (!isBrowser) return;

  const saved = safeGet(STORAGE_KEY);
  const chosen = saved || systemPrefers();

  HTML.setAttribute('data-theme', chosen);

  if (!saved) safeSet(STORAGE_KEY, chosen);
}

// Auto-initialize when running in browser
if (isBrowser) initTheme();