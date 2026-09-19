import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Derive user initials from an email address, e.g.:
 *   zainab.khan@gmail.com   -> "ZK"
 *   a_b-c@test.com          -> "AB"
 *   zainabmustaqeem32@x.com -> "ZA"
 */
export function getInitials(email?: string | null): string {
  if (!email) return 'G';
  const local = email.split('@')[0].replace(/\d+/g, '');
  const parts = local.split(/[._\-+]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  const word = parts[0] || email[0];
  return word.slice(0, 2).toUpperCase();
}
