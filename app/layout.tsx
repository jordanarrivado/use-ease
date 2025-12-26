'use client';

import { useState } from 'react';
import { AppProvider } from '@/context/AppContext';
import { ThemeProvider } from '@/components/ThemeProvider'; 
import { ThemeToggle } from '@/components/ThemeToggle'; 
import { Menu, X } from 'lucide-react'; 
import './globals.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Plans', href: '/plans' },
    { name: 'Schedules', href: '/schedules' },
    { name: 'Announcements', href: '/announcements' },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppProvider>
            <div className="min-h-screen transition-colors duration-300
              bg-[#f8fafc] text-slate-900 
              dark:bg-[#0f172a] dark:text-slate-100
              bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
              from-blue-50 via-slate-50 to-slate-50
              dark:from-blue-900/20 dark:via-slate-900 dark:to-slate-900">
              
              <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16">
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-blue-200 dark:shadow-blue-900/40 flex-shrink-0">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                      <h1 className="text-lg font-semibold tracking-tight truncate">
                        Management<span className="text-blue-600">System</span>
                      </h1>
                    </div>

                    <div className="hidden md:flex space-x-4 items-center">
                      <div className="flex space-x-1 mr-4">
                        {navItems.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                                isActive
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                              }`}
                            >
                              {item.name}
                              {isActive && (
                                <span className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                      <ThemeToggle />
                    </div>

                    <div className="flex items-center space-x-2 md:hidden">
                      <ThemeToggle />
                      <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-4 pt-2 pb-6 space-y-1 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                            isActive 
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </nav>

              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                  {children}
                </div>
              </main>
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}