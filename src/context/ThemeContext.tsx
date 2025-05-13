
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Theme = "quantum" | "prism" | "eclipse";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("quantum");

  useEffect(() => {
    const savedTheme = localStorage.getItem("collab-zone-theme") as Theme | null;
    if (savedTheme && ["quantum", "prism", "eclipse"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("collab-zone-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
