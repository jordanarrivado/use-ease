'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes'; // MUST be here
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="p-2 w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:ring-2 hover:ring-blue-400 transition-all duration-300 group"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <div className={`absolute inset-0 transition-transform duration-500 ${resolvedTheme === 'dark' ? 'translate-y-0' : '-translate-y-10'}`}>
          <Moon className="w-5 h-5 text-blue-400" />
        </div>
        <div className={`absolute inset-0 transition-transform duration-500 ${resolvedTheme === 'dark' ? 'translate-y-10' : 'translate-y-0'}`}>
          <Sun className="w-5 h-5 text-yellow-500" />
        </div>
      </div>
    </button>
  );
}