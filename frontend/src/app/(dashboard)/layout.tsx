'use client';

import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { FloatingChat } from '@/src/components/FloatingChat';
import { NavbarProfile } from '@/src/components/NavbarProfile';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-bg flex flex-col h-screen supports-[height:100dvh]:h-[100dvh] overflow-hidden">
      {/* Top navbar */}
      <header className="shrink-0 z-40 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 pb-[max(0.75rem,env(safe-area-inset-top))] border-b border-gray-800/80 bg-gray-950/70 backdrop-blur-xl">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-2.5 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
            <span className="text-white font-bold text-base sm:text-lg">✓</span>
          </div>
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent truncate">
            TaskNest
          </span>
        </Link>

        {/* Right side: Home + Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-gray-700/60 transition-all"
            title="Back to home page"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <NavbarProfile />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto relative min-h-0">
        {children}
        <FloatingChat />
      </main>
    </div>
  );
}
