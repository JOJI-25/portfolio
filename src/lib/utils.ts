// ============================================================
// Utility Functions
// ============================================================

import { clsx, type ClassValue } from "clsx";

// Simple cn utility (Tailwind class merge helper)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function getRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    Python: "#3572A5",
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Jupyter: "#DA5B0B",
    "Jupyter Notebook": "#DA5B0B",
    SQL: "#e38c00",
    R: "#198CE7",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
  };
  return colors[language] || "#8b949e";
}
