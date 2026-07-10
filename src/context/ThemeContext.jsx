// ThemeContext.jsx
// Administra el tema claro y oscuro de toda la aplicación.

import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = "pokelandia-theme";

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  const prefersDarkTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return prefersDarkTheme ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark-mode", theme === "dark");

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  function setLightTheme() {
    setTheme("light");
  }

  function setDarkTheme() {
    setTheme("dark");
  }

  const contextValue = useMemo(
    () => ({
      theme,
      isDarkMode: theme === "dark",
      toggleTheme,
      setLightTheme,
      setDarkTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}