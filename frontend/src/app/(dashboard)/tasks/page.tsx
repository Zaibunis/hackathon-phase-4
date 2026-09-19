'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ListTodo, Circle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../../lib/hooks/useAuth';
import { Task, CreateTaskData, UpdateTaskData } from '../../../lib/types';
import { TaskList } from '../../../components/tasks/task-list';
import { getApiBaseUrl } from '../../../lib/api-url';

const TasksPage = () => {
  const { user} = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Reload tasks when the user changes OR when a chat-driven task change
  // is broadcast (dispatched by the chat UI after a successful MCP operation).
  useEffect(() => {
    if (user?.id) {
      loadTasks();
    }
  }, [user]);

  useEffect(() => {
    const onTasksChanged = () => {
      if (user?.id) loadTasks();
    };
    window.addEventListener('todo:tasks-changed', onTasksChanged);
    return () => window.removeEventListener('todo:tasks-changed', onTasksChanged);
  }, [user]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Not authenticated');
        return;
      }

      const apiUrl = getApiBaseUrl();
      const res = await fetch(`${apiUrl}/v1/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        setError('Session expired. Please sign in again.');
        return;
      }
      if (!res.ok) {
        setError(`Failed to load tasks (HTTP ${res.status})`);
        return;
      }

      const data = await res.json();
      // API returns either a bare array or { tasks: [...] }
      const rawTasks: any[] = Array.isArray(data) ? data : data.tasks || [];

      const mapped: Task[] = rawTasks.map((t) => ({
        id: String(t.id),
        title: t.title,
        description: t.description ?? t.details ?? undefined,
        completed: Boolean(t.is_completed ?? t.completed),
        userId: String(t.user_id ?? user!.id),
        createdAt: t.created_at ?? new Date().toISOString(),
        updatedAt: t.updated_at ?? t.created_at ?? new Date().toISOString(),
      }));

      setTasks(mapped);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData: CreateTaskData) => {
    try {
      const token = localStorage.getItem('access_token');
      const apiUrl = getApiBaseUrl();
      const res = await fetch(`${apiUrl}/v1/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: taskData.title, description: taskData.description }),
      });

      if (!res.ok) {
        setError(`Failed to add task (HTTP ${res.status})`);
        return;
      }

      await loadTasks();
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding task:', err);
    }
  };

  const updateTask = async (id: string, taskData: UpdateTaskData) => {
    try {
      const token = localStorage.getItem('access_token');
      const apiUrl = getApiBaseUrl();
      const res = await fetch(`${apiUrl}/v1/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description,
        }),
      });

      if (!res.ok) {
        setError(`Failed to update task (HTTP ${res.status})`);
        return;
      }

      await loadTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const token = localStorage.getItem('access_token');
      const apiUrl = getApiBaseUrl();
      const res = await fetch(`${apiUrl}/v1/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setError(`Failed to delete task (HTTP ${res.status})`);
        return;
      }

      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      const token = localStorage.getItem('access_token');
      const apiUrl = getApiBaseUrl();
      const res = await fetch(`${apiUrl}/v1/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_completed: completed }),
      });

      if (!res.ok) {
        setError(`Failed to toggle task (HTTP ${res.status})`);
        return;
      }

      setTasks(prev => prev.map(task =>
        task.id === id
          ? { ...task, completed, updatedAt: new Date().toISOString() }
          : task
      ));
    } catch (err) {
      setError('Failed to toggle task');
      console.error('Error toggling task:', err);
    }
  };


  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen app-bg">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-2xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            TaskNest
          </h1>
          <p className="text-lg text-gray-300">Please sign in to view your tasks</p>
        </div>
      </div>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const progressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const firstName = user.email?.split('@')[0] || 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome header */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm text-gray-500 mb-1">{today}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {greeting},{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {firstName}
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {activeTasks > 0
              ? `You have ${activeTasks} task${activeTasks === 1 ? '' : 's'} to work on.`
              : totalTasks > 0
                ? 'Everything is done — great job! 🎉'
                : 'Create your first task to get started.'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="surface-card rounded-2xl p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-400 mb-1">Total</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{totalTasks}</p>
              </div>
              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-indigo-500/15 items-center justify-center shrink-0">
                <ListTodo className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
          </div>
          <div className="surface-card rounded-2xl p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-400 mb-1">Active</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-400">{activeTasks}</p>
              </div>
              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-blue-500/15 items-center justify-center shrink-0">
                <Circle className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="surface-card rounded-2xl p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-400 mb-1">Done</p>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-400">{completedTasks}</p>
              </div>
              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-emerald-500/15 items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {totalTasks > 0 && (
          <div className="surface-card rounded-2xl px-4 sm:px-5 py-3.5 mb-6 sm:mb-8">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>Completion</span>
              <span className="font-semibold text-gray-300">{progressPct}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error ?? undefined}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onToggleTask={toggleTask}
        />
      </div>
    </div>
  );
};

export default TasksPage;
