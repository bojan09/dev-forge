// lib/types.ts
// ─────────────────────────────────────────────────────────
// GLOBAL TYPE DEFINITIONS
// Shared TypeScript interfaces and types across the app
// ─────────────────────────────────────────────────────────

// ── User Types ───────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProfile extends User {
  xp: number;
  level: number;
  streak: number;
  total_time: number; // minutes
  joined_date: string;
}

// ── Topic & Learning Types ───────────────────────────────
export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";
export type Category =
  | "frontend"
  | "backend"
  | "fullstack"
  | "language"
  | "architecture"
  | "security"
  | "devops";

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  difficulty: Difficulty;
  modules: number;
  duration: string;
  category: Category;
}

export interface Lesson {
  id: string;
  topic_id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  duration: number; // minutes
  type: "reading" | "interactive" | "challenge" | "video";
  content: LessonContent;
}

export interface LessonContent {
  hero: HeroContent;
  sections: Section[];
  infographic?: InfographicData;
  code_examples: CodeExample[];
  summary: string[];
}

export interface HeroContent {
  title: string;
  subtitle: string;
  badge: string;
  tags: string[];
}

export interface Section {
  id: string;
  type: "intro" | "deep-dive" | "use-case" | "mistakes" | "analogy";
  title: string;
  content: string;
}

export interface CodeExample {
  id: string;
  title: string;
  language: string;
  code: string;
  notes?: string;
}

// ── Infographic Types ────────────────────────────────────
export interface InfographicData {
  id: string;
  title: string;
  type: "flow" | "hierarchy" | "cycle" | "comparison";
  nodes: InfographicNode[];
  edges: InfographicEdge[];
}

export interface InfographicNode {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  position?: { x: number; y: number };
}

export interface InfographicEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

// ── Progress Types ───────────────────────────────────────
export interface Progress {
  id: string;
  user_id: string;
  topic_id: string;
  lesson_id: string;
  completed: boolean;
  time_spent: number; // seconds
  completed_at: string | null;
  created_at: string;
}

export interface TopicProgress {
  topic_id: string;
  completed_lessons: number;
  total_lessons: number;
  percentage: number;
  last_accessed: string | null;
}

// ── Bookmark Types ───────────────────────────────────────
export interface Bookmark {
  id: string;
  user_id: string;
  lesson_id: string;
  topic_id: string;
  created_at: string;
  lesson?: Lesson;
}

// ── UI State Types ───────────────────────────────────────
export interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
}

export interface SearchResult {
  type: "topic" | "lesson";
  id: string;
  title: string;
  excerpt: string;
  href: string;
}

// ── API Response Types ───────────────────────────────────
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// ── Component Prop Types ─────────────────────────────────
export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

export interface WithChildrenAndClass extends WithChildren, WithClassName {}

export type StatTrend = "neutral" | "up" | "down";

export type StatItem = {
  label: string;
  value: string;
  sub: string;
  trend: StatTrend;
};
