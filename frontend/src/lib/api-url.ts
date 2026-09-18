// Shared API base URL with trailing-slash safety.
// A trailing slash in NEXT_PUBLIC_API_URL produces double-slash request URLs
// (e.g. https://api.example.com//v1/tasks). Those get 308-redirected WITHOUT
// CORS headers by the edge, and the browser reports "Failed to fetch".
//
// NOTE: NEXT_PUBLIC_ vars are inlined at BUILD time. If the env var is not set
// when Vercel builds, we fall back to the deployed backend URL - never to this
// frontend's own origin, because the API does not live there (requests would 404).
const FALLBACK_API_URL = 'https://hackathon-phase-4-eight.vercel.app';

export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL || FALLBACK_API_URL;
  return raw.replace(/\/+$/, '');
}
