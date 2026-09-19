import React from 'react';
import Link from 'next/link';
import { SignUpForm } from '../../../components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="relative min-h-screen app-bg flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md space-y-6 surface-card rounded-2xl p-8 shadow-2xl shadow-blue-500/5">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-2xl">✓</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Create Account
          </h2>
          <p className="text-gray-400">
            Join TaskNest today and boost your productivity
          </p>
        </div>

        <SignUpForm />

        <div className="text-center text-sm text-gray-500 border-t border-gray-700/50 pt-6 mt-2">
          <span className="text-gray-500">Already have an account? </span>
          <Link
            href="/signin"
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
