// Shared API base URL with trailing-slash safety.
// A trailing slash in NEXT_PUBLIC_API_URL produces double-slash request URLs
// (e.g. https://api.example.com//v1/tasks). Those get 308-redirected WITHOUT
// CORS headers by the edge, and the browser reports "Failed to fetch".
export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  return raw.replace(/\/+$/, '');
}
