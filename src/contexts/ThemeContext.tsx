import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Theme } from '../types';

const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#e5ecf6', // zumthor
    secondary: '#a8c5da', // casper
    background: '#ffffff', // black-haze
    surface: '#ffffff', // pattens-blue
    text: '#1A1D29',
    textSecondary: '#a8c5da', // casper
    border: '#cfdeea', // botticelli
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    card_background:  '#f7f9fb',
    project_background: '#cfdeea',
    actual_background: '#a8c5da'
  },
};

const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#e5ecf6', // zumthor
    secondary: '#a8c5da', // casper
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    border: '#334155',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    card_background:  '#f7f9fb',
    project_background: '',
    actual_background: ''
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : false;
  });

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
    // Update CSS custom properties for global styling
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [isDark, theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};