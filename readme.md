**MDKVA ThemeKit** is a lightweight, dependency-free theme manager for modern web applications.
It provides simple utilities for:

* Dark/Light mode switching
* System theme detection
* Auto-persisting user preferences
* Smooth CSS-variable–driven theming

Perfect for UI developers, PWAs, dashboards, design systems, and frontend frameworks.

---

## **✨ Features**

* **`setTheme(mode)`** — Apply a theme (`light`, `dark`, or any custom mode).
* **`getTheme()`** — Retrieve the currently active theme.
* **`toggleTheme()`** — Automatically switch between `light` ↔ `dark`.
* **`systemPrefers()`** — Detect OS-level theme preference.
* **`watchSystemTheme(callback)`** — Listen for OS theme changes.
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
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdkva/themekit/style.css">
   
  <button id="toggleTheme">Toggle Theme</button>

  <script type="module">
    import { toggleTheme, setTheme } from "https://cdn.jsdelivr.net/npm/@mdkva/themekit/themekit.js";

    document.getElementById("toggleTheme").addEventListener("click", () => {
      const theme = toggleTheme();
      console.log("Theme switched to:", theme);
    });
  </script>
```

## **🛠 Contributing**

Contributions are welcome!

* GitHub: [https://github.com/mdkva/themekit](https://github.com/mdkva/themekit)
* Submit issues, PRs, or improvements anytime.

---

## **🔗 Links**
* **npm Package:** [https://www.npmjs.com/package/@mdkva/themekit](https://www.npmjs.com/package/@mdkva/themekit)
* **Company Website:** [https://mdkva.com](https://mdkva.com)
* **Contact:** [contact@mdkva.com](mailto:contact@mdkva.com)
* **Author:** [github.com/MDKDanyalk](https://github.com/MDKDanyalk)

---

## **📄 License**
MIT License