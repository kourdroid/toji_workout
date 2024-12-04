'use client';

import { useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../providers';

export function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const ThemeIcon = () => {
    if (theme === 'dark') return <Moon className="w-5 h-5 text-slate-200" />;
    if (theme === 'light') return <Sun className="w-5 h-5 text-yellow-400" />;
    return <Monitor className="w-5 h-5 text-slate-200" />;
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full glass hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
      >
        <ThemeIcon />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => {
                setTheme('light');
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              <Sun className="w-4 h-4 mr-2 text-yellow-400" />
              Light
            </button>
            <button
              onClick={() => {
                setTheme('dark');
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              <Moon className="w-4 h-4 mr-2 text-slate-200" />
              Dark
            </button>
            <button
              onClick={() => {
                setTheme('system');
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              <Monitor className="w-4 h-4 mr-2 text-slate-200" />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
