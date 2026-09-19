import React, { useState, useEffect } from 'react';
import { ChatMessage } from '../types/chatTypes';
import { addMessageToConversation } from '../utils/apiClient';
import { ChatUI } from './ChatUI/page'; // Your custom ChatUI component
import { getApiBaseUrl } from '../../lib/api-url';

interface ChatKitWrapperProps {
  userId: string;
}

const ChatKitWrapper: React.FC<ChatKitWrapperProps> = ({ userId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Chat initialized (backend MCP agent mode)');
  }, []);

  // Broadcast so the tasks dashboard refetches after chat-driven task changes.
  const notifyTasksChanged = () => {
    window.dispatchEvent(new CustomEvent('todo:tasks-changed'));
  };

  const handleSendMessage = async (input: string) => {
    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
      status: 'sending' as const,
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('Not signed in');

      const apiUrl = getApiBaseUrl();
      const res = await fetch(`${apiUrl}/api/v1/${userId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      if (res.status === 401) throw new Error('Session expired. Please sign in again.');
      if (res.status === 403) throw new Error('User mismatch for this chat session.');
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.detail || `Backend error (HTTP ${res.status})`);
      }

      const data = await res.json();
      const assistantText: string = data.assistant_message ?? data.assistantMessage ?? '';

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        content: assistantText,
        role: 'assistant',
        timestamp: new Date(),
        status: 'confirmed' as const,
      };

      setMessages(prev =>
        prev.map(msg =>
          msg.id === userMessage.id ? { ...msg, status: 'confirmed' as const } : msg
        ).concat(assistantMessage)
      );

      addMessageToConversation(userId, userMessage);
      addMessageToConversation(userId, assistantMessage);

      // The backend agent may have added/updated/completed/deleted tasks via MCP.
      // Heuristic: any assistant confirmation triggers a dashboard refetch.
      notifyTasksChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error sending message to backend chat:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container flex flex-col h-full min-h-0">
      {error && (
        <div className="error-message shrink-0 bg-red-900/50 border border-red-700/50 text-red-200 p-3 m-3 sm:m-4 rounded-lg text-sm">
          Error: {error}
        </div>
      )}

      <div className="flex-1 min-h-0">
        <ChatUI
          messages={messages}
          onSend={handleSendMessage}
          disabled={isLoading || !!error}
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
};

export default ChatKitWrapper;
