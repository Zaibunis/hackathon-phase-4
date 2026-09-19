'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/src/styling/ui/button';
import { Avatar, AvatarFallback } from '@/src/styling/ui/avatar';
import { useAuth } from '@/src/context/AuthContext';
import { getInitials } from '@/src/lib/utils';

interface NavbarProfileProps {
  /** Extra link shown inside the dropdown (e.g. go to dashboard from landing page) */
  dashboardHref?: string;
}

/**
 * Navbar right-side account area:
 *  - Guest: Sign In / Get Started buttons
 *  - Authenticated: profile button (initials avatar) with dropdown
 *    showing name, full email, dashboard link and sign-out.
 */
export function NavbarProfile({ dashboardHref }: NavbarProfileProps) {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    setOpen(false);
    try {
      await signOut();
    } finally {
      router.push('/signin');
    }
  };

  // While the auth state is resolving, keep layout stable
  if (loading) {
    return <div className="w-[132px] h-9 sm:h-10 rounded-xl bg-white/5 animate-pulse" aria-hidden="true" />;
  }

  // Guest: auth CTAs
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin">
          <Button variant="outline" size="sm" className="px-3 sm:px-3.5 border-gray-700 hover:bg-gray-800/60 text-gray-200">
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="gradient" size="sm" className="px-3 sm:px-3.5">
            Get Started
          </Button>
        </Link>
      </div>
    );
  }

  // Authenticated: profile button + dropdown
  const initials = getInitials(user.email);
  const displayName = user.email?.split('@')[0] || 'Account';

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-1.5 sm:px-2 py-1.5 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/5 border border-transparent hover:border-gray-700/60 transition-all"
        aria-label="Account menu"
        aria-expanded={open}
      >
        <Avatar className="w-8 h-8 border border-indigo-500/30">
          <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <span className="hidden md:inline max-w-[140px] truncate">{displayName}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <>
          {/* Click-away backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-64 z-50 surface-card rounded-2xl shadow-2xl p-2">
            <div className="flex items-center gap-3 p-3 border-b border-gray-700/50 mb-1">
              <Avatar className="w-10 h-10 border border-indigo-500/30 shrink-0">
                <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-100 truncate">{user.email}</p>
              </div>
            </div>
            {dashboardHref && (
              <Link
                href={dashboardHref}
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to Tasks
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
