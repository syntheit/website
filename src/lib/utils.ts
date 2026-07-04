import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Slugify a free-form string into a URL/filename-safe identifier:
 * lowercase, strip combining marks, collapse non-alphanumeric to hyphens.
 */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Unwritten copy is an empty string in the metadata files (the writing
 * guidance lives in adjacent comments, which never reach the bundle) or a
 * bracketed placeholder like "[Write: ...]". Render neither — a missing
 * paragraph beats placeholder text on the live site. Bracketed text still
 * shows in dev as a reminder.
 */
export function draftCopy(text: string): string | null {
  if (!text.trim()) return null;
  if (process.env.NODE_ENV !== "production") return text;
  return /^\s*\[(Write|Rewrite)\b/.test(text) ? null : text;
}

export function downloadImage(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
