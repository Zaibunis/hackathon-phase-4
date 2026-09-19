// T105: Landing page with branding and auth CTAs

import Link from 'next/link';
import { Button } from '@/src/styling/ui/button';
import { FloatingChat } from '@/src/components/FloatingChat';

const features = [
  {
    title: 'AI-Powered Chat',
    description:
      'Just type "Add a task for tomorrow" — the AI agent creates, updates, and completes tasks for you.',
    gradient: 'from-blue-500 to-cyan-400',
    ring: 'hover:border-blue-500/30',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8l-3.7 1.2a1 1 0 01-1.3-1.3l1.2-3.7A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    ),
  },
  {
    title: 'Smart Organization',
    description:
      'Filter by active or completed, track progress with live stats, and keep your workflow tidy.',
    gradient: 'from-purple-500 to-pink-500',
    ring: 'hover:border-purple-500/30',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    ),
  },
  {
    title: 'Secure & Synced',
    description:
      'JWT-protected accounts with per-user data isolation. Your tasks are safe and always in sync.',
    gradient: 'from-cyan-500 to-blue-600',
    ring: 'hover:border-cyan-500/30',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    ),
  },
];

const steps = [
  { n: '1', title: 'Create your account', text: 'Sign up in seconds — no credit card, no setup.' },
  { n: '2', title: 'Chat or add manually', text: 'Tell the AI what to do, or use the task dashboard.' },
  { n: '3', title: 'Watch it sync', text: 'Chat actions reflect on your dashboard instantly.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen app-bg relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-lg">✓</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              TaskFlow Pro
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/signin">
              <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800/60 text-gray-200">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="gradient" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-14 pb-20 md:pt-20 md:pb-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-blue-300">
                ⚡ Productivity meets elegance
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Manage tasks by
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                simply asking
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              TaskFlow Pro pairs a beautiful task dashboard with an AI chat agent.
              Create, update, and complete tasks through natural conversation — everything stays in sync.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 flex-wrap">
              <Link href="/signup">
                <Button variant="gradient" size="lg" className="px-8 shadow-lg shadow-blue-500/20">
                  Start Free
                </Button>
              </Link>
              <Link href="/signin">
                <Button variant="outline" size="lg" className="px-8 border-gray-700 hover:bg-gray-800/60 text-gray-200">
                  Sign In
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-xs text-gray-500">Free to use · No credit card required</p>
          </div>

          {/* App preview mockup */}
          <div className="hidden lg:block">
            <div className="surface-card rounded-2xl p-5 shadow-2xl shadow-blue-500/10 rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-1.5 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-gray-500">taskflow.pro/tasks</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="rounded-xl bg-gray-800/60 border border-gray-700/50 p-3">
                  <p className="text-[10px] text-gray-500">Total</p>
                  <p className="text-lg font-bold text-white">12</p>
                </div>
                <div className="rounded-xl bg-gray-800/60 border border-gray-700/50 p-3">
                  <p className="text-[10px] text-gray-500">Active</p>
                  <p className="text-lg font-bold text-blue-400">8</p>
                </div>
                <div className="rounded-xl bg-gray-800/60 border border-gray-700/50 p-3">
                  <p className="text-[10px] text-gray-500">Done</p>
                  <p className="text-lg font-bold text-green-400">4</p>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 rounded-xl bg-gray-800/40 border border-gray-700/40 p-3">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-[10px] text-white">✓</span>
                  <span className="text-sm text-gray-600 line-through">Ship MVP to production</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-gray-800/40 border border-gray-700/40 p-3">
                  <span className="w-5 h-5 rounded-full border-2 border-gray-600" />
                  <span className="text-sm text-gray-200">Prepare demo for judges</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-gray-800/40 border border-gray-700/40 p-3">
                  <span className="w-5 h-5 rounded-full border-2 border-gray-600" />
                  <span className="text-sm text-gray-200">Team standup at 9 AM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Everything you need</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              One platform for tasks, chat, and automation — designed to stay out of your way.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={`group bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-7 border border-gray-700/40 ${f.ring} transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-[52px] h-[52px] bg-gradient-to-r ${f.gradient} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">How it works</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Three steps to a calmer, more organized day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((s) => (
              <div key={s.n} className="surface-card rounded-2xl p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {s.n}
                </div>
                <h3 className="font-semibold text-white mb-1.5">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <FloatingChat />

        {/* CTA */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to boost your productivity?
            </h3>
            <p className="text-gray-400 mb-8">
              Join users who manage their day with a single sentence.
            </p>
            <Link href="/signup">
              <Button variant="gradient" size="lg" className="px-10 shadow-lg shadow-purple-500/20">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-800/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">✓</span>
              </div>
              <span>&copy; 2026 TaskFlow Pro</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/signin" className="hover:text-gray-300 transition-colors">Sign in</Link>
              <Link href="/signup" className="hover:text-gray-300 transition-colors">Create account</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
