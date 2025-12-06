**MDKVA ThemeKit** is a lightweight, dependency-free theme manager for modern web applications.
It provides simple utilities for:

* Dark/Light mode switching
* System theme detection
* Auto-persisting user preferences
* Smooth CSS-variable–driven theming

Perfect for UI developers, PWAs, dashboards, design systems, and frontend frameworks.

---

## **✨ Features**

* **`ThemeKit.toggleTheme()`** — Automatically switch between `light` ↔ `dark`.
* **`ThemeKit.setTheme(mode)`** — Apply a theme (`light`, `dark`, or any custom mode).
* **`ThemeKit.getTheme()`** — Retrieve the currently active theme.
* **`ThemeKit.systemPrefers()`** — Detect OS-level theme preference.
* **`ThemeKit.watchSystemTheme(callback)`** — Listen for OS theme changes.
* **`ThemeKit.initTheme() `** — — Initializes the theme on page load using saved value or system preference, automatically setting the DOM attribute.
* **Auto-persisted** theme across sessions.
* **Zero dependencies**, fully ES module compatible.

---

## **📦 Installation**

```bash
npm install @mdkva/themekit
```

---

## **🌐 Usage**

```html
<!-- Optional: include default stylesheet -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdkva/themekit/style.css">

<!-- Example button to toggle theme -->
<button id="toggleTheme">Toggle Theme</button>

<!-- Container for debugging / live theme output -->
<div id="mdkva-themekit"></div>

<script type="module">
  // Import ThemeKit
  import { ThemeKit } from "https://cdn.jsdelivr.net/npm/@mdkva/themekit/themekit.js";

  // Toggle theme on button click
  document.getElementById("toggleTheme").addEventListener("click", () => {
    const theme = ThemeKit.toggleTheme();
    document.getElementById("mdkva-themekit").innerText = `Theme switched to: ${theme}`;
  });

  // Set a specific theme manually
  ThemeKit.setTheme("dark");

  // Get current theme
  console.log("Current theme:", ThemeKit.getTheme());

  // Listen to OS-level theme changes
  ThemeKit.watchSystemTheme((newTheme) => {
    console.log("OS theme changed to:", newTheme);
  });
</script>
```

---

## Contributions
This project is open source and contributions are welcome!
* GitHub Repository: [https://github.com/mdkva/themekit](https://github.com/mdkva/themekit)
* Feel free to fork, submit issues, or create pull requests.

---

## Links
* **npm Package:** [https://www.npmjs.com/package/@mdkva/themekit](https://www.npmjs.com/package/@mdkva/themekit)
* **Company Website:** [mdkva.com](https://mdkva.com/)
* **Contact:** [contact@mdkva.com](mailto:contact@mdkva.com)

---

## **📄 License**
MIT License