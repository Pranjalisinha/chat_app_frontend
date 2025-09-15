import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Initialize and sync theme
(function initTheme() {
	try {
		const apply = (mode) => {
			if (mode === "dark") {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		};
		const stored = localStorage.getItem("theme");
		const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
		apply(stored || (prefersDark ? "dark" : "light"));

		// React to system theme changes
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = (e) => {
			const saved = localStorage.getItem("theme");
			if (!saved) apply(e.matches ? "dark" : "light");
		};
		mq.addEventListener?.("change", onChange);

		// React to storage changes from other tabs
		window.addEventListener("storage", (e) => {
			if (e.key === "theme") {
				apply(e.newValue === "dark" ? "dark" : "light");
			}
		});
	} catch {}
})();

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
