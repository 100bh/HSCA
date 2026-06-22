import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return true; // Default to elegant dark theme
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      id="theme-switcher-btn"
      variant="ghost"
      onClick={() => setIsDark(!isDark)}
      className={`relative p-2.5 rounded-full transition-all duration-300 transform active:scale-95 border cursor-pointer ${
        isDark
          ? 'bg-slate-900/60 border-slate-800 text-amber-400 hover:bg-slate-800/80 hover:text-amber-300 hover:shadow-[0_0_15px_rgba(251,191,36,0.15)]'
          : 'bg-white/70 border-white/40 text-slate-700 hover:bg-white/90 hover:text-slate-950 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
      } ${className}`}
      aria-label="Toggle structural dark/light appearance theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 transition-transform duration-500 rotate-180" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-500 rotate-0" />
        )}
      </div>
    </button>
  );
}
