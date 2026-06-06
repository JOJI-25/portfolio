// ============================================================
// Portfolio Website — TypeScript Interfaces
// ============================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  category: "analytics" | "ml" | "ai" | "dashboard";
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  date: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  status: "completed" | "learning" | "upcoming";
  progress?: number;
  description: string;
  relatedProjects: string[];
  parentSkill?: string | null;
  children?: string[] | null;
  notes?: string | null;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  date: string;
  image: string;
  skills: string[];
  verifyUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  status: "earned" | "in-progress" | "locked";
  level: number; // 1-5 stars
  description: string;
  earnedDate?: string;
  progress?: number;
}

export interface JourneyItem {
  id: string;
  skill: string;
  status: "completed" | "learning" | "upcoming";
  description: string;
  progress?: number;
  projectCount?: number;
  date: string;
  icon: string;
  title: string;
  role: string;
  company: string;
  type: "education" | "work" | "project";
  skills: string[];
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface MetricItem {
  label: string;
  value: number;
  icon: string;
  suffix?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  updatedAt: string;
}

export interface DashboardItem {
  id: string;
  title: string;
  tool: "Power BI" | "Excel" | "Analytics";
  image: string;
  description: string;
}
