"use client";

import { useEffect, useState, createContext, useContext } from "react";

interface ThemeContextType {
    themeColor: string;
    setThemeColor: (color: string) => void;
    themeMode: 'dark' | 'light';
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [themeColor, setThemeColorState] = useState("#2563eb");
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  const setThemeColor = (color: string) => {
      setThemeColorState(color);
      document.documentElement.style.setProperty("--accent", color);
      
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      document.documentElement.style.setProperty("--accent-rgb", `${r}, ${g}, ${b}`);
  };

  const toggleTheme = () => {
      const newMode = themeMode === 'dark' ? 'light' : 'dark';
      setThemeMode(newMode);
      document.documentElement.setAttribute('data-theme', newMode);
      if (newMode === 'light') {
         document.documentElement.classList.add('light');
      } else {
         document.documentElement.classList.remove('light');
      }
  };

  useEffect(() => {
    setMounted(true);
    const fetchTheme = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data.success && data.data?.themeColor) {
          setThemeColor(data.data.themeColor);
        }
      } catch (error) {
        console.error("Failed to fetch theme:", error);
      }
    };

    fetchTheme();
  }, []);

  // Removed mounted check to ensure Context is always available
  // The useEffect handling handles the actual theme application

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, themeMode, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
  );
}
