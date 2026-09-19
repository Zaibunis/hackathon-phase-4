'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import ChatKitWrapper from './ChatInterface/ChatKitWrapper';
import { Button } from '@/src/styling/ui/button';
import { X } from 'lucide-react';

export function FloatingChat() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const touchStartY = useRef<number | null>(null);

  // Hide the floating chat on the full-page chat route — a dedicated chat UI
  // is already there, and the FAB would overlap its input area.
  // NOTE: early returns live AFTER all hooks (React hooks rules).
  const showOnThisRoute = pathname !== '/chat';

  // Check authentication status when component mounts
  useEffect(() => {
    if (!loading && !isAuthenticated && hasCheckedAuth && isOpen) {
      setIsOpen(false);
      router.push('/signin');
    }
  }, [isAuthenticated, loading, router, hasCheckedAuth, isOpen]);

  const handleToggleChat = () => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push('/signin');
      return;
    }

    setIsOpen(!isOpen);
    setHasCheckedAuth(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Close the chat if user becomes unauthenticated while chat is open
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      // Chat stays open when authenticated
    } else if (!isAuthenticated && isOpen) {
      // Close chat if user becomes unauthenticated
      setIsOpen(false);
    }
  }, [isAuthenticated, isOpen]);

  // Guest: nothing to render (all hooks have run, so this is safe)
  if (!isAuthenticated) return null;

  // Full-page chat route renders its own UI — no FAB/sheet here
  if (!showOnThisRoute) return null;

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={handleToggleChat}
        className={`fixed bottom-5 right-5 w-12 h-12 sm:bottom-6 sm:right-6 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all z-50 flex items-center justify-center text-xl sm:text-2xl ${
          isOpen ? 'hidden' : ''
        }`}
        title="Chat"
        aria-label="Open chat"
      >
        💬
      </button>

      {/* Floating Chat Window — bottom sheet on mobile, anchored card on desktop */}
      {isOpen && isAuthenticated && (
        <>
          {/* Mobile backdrop: tap outside to close */}
          <div
            className="fixed inset-0 z-40 bg-black/50 sm:hidden"
            onClick={handleClose}
            aria-hidden="true"
          />
          <div
          className="fixed z-50 flex flex-col overflow-hidden bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl
            inset-x-0 bottom-0 h-[80vh] supports-[height:100dvh]:h-[80dvh] rounded-t-3xl border-x-0
            sm:inset-x-auto sm:right-6 sm:bottom-24 sm:h-[70vh] sm:max-h-[600px] sm:w-full sm:max-w-md sm:rounded-2xl sm:border-x"
          role="dialog"
          aria-label="AI Chat Agent"
        >
          {/* Mobile drag handle — swipe down to close */}
          <div
            className="sm:hidden flex justify-center pt-2.5 pb-1 bg-gray-900/50"
            onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; }}
            onTouchEnd={(e) => {
              if (touchStartY.current !== null && e.changedTouches[0].clientY - touchStartY.current > 60) {
                handleClose();
              }
              touchStartY.current = null;
            }}
          >
            <span className="w-10 h-1 rounded-full bg-gray-600" />
          </div>

          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 sm:py-4 bg-gray-900/50 border-b border-gray-700/50 shrink-0">
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent truncate">
                AI Chat Agent
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500 truncate">
                Ask me to add, update, or complete tasks
              </p>
            </div>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 shrink-0"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-hidden min-h-0">
            {user && <ChatKitWrapper userId={user.id} />}
          </div>
          </div>
        </>
      )}
    </>
  );
}
