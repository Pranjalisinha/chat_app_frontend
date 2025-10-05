import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const applyDomTheme = (mode) => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");
    const isDark = mode === "dark";
    const method = isDark ? "add" : "remove";
    html.classList[method]("dark");
    if (body) body.classList[method]("dark");
    if (root) root.classList[method]("dark");
  };

  useLayoutEffect(() => {
    try {
      const stored = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
      const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = stored ? stored : prefersDark ? "dark" : "light";
      setTheme(initial);
      applyDomTheme(initial);
    } catch {
      setTheme("light");
      applyDomTheme("light");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyDomTheme(theme);
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);