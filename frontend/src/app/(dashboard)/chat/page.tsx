'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatKitWrapper from '../../../components/ChatInterface/ChatKitWrapper';
import LoadingStates from '../../../components/ChatInterface/LoadingStates';
import { useAuth } from '../../../context/AuthContext';
import { getConversationHistory } from '../../../components/utils/apiClient';
import { Conversation } from '../../../components/types/chatTypes';

export default function ChatPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  // Redirect to sign-in page if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/signin');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Load conversation history if available
      const history = getConversationHistory(user.id);
      if (history) {
        setConversation(history);
      }
    }
  }, [isAuthenticated, user]);

  if (loading) {
    return <LoadingStates isLoading={true} error={null} />;
  }

  // Don't render anything if not authenticated, as redirect will happen
  if (!isAuthenticated) {
    return null;
  }

  if (error) {
    return <LoadingStates isLoading={false} error={error} />;
  }

  return (
    <div className="h-full app-bg flex flex-col overflow-hidden">
      {/* Unified Chat Card */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col surface-card rounded-none sm:rounded-3xl shadow-2xl border-x-0 sm:border border-gray-700/40 m-0 sm:m-4 lg:m-6 overflow-hidden">
        <header className="w-full px-4 py-3 sm:px-6 sm:py-4 flex-shrink-0 border-b border-gray-700/40 bg-gray-900/20">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-base sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent truncate">
                AI Chat Agent
              </h1>
              <p className="hidden sm:block text-gray-500 text-sm mt-0.5 truncate">
                Manage your tasks through natural language
              </p>
            </div>
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-300 shrink-0">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Connected
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col w-full overflow-hidden min-h-0">
          <div className="h-full max-w-4xl mx-auto w-full flex flex-col">
            {user && <ChatKitWrapper userId={user.id} />}
          </div>
        </main>
      </div>
    </div>
  );
}
