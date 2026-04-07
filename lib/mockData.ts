export const MOCK_USER = {
  name: "John Dev",
  initials: "JD",
  email: "john@devforge.io",
  level: 1, // fresh user starts at level 1
  xp: 0, // no XP yet
  xpToNext: 500, // 500 XP to reach level 2
  streak: 0, // no streak yet
  totalTime: 0, // 0 minutes spent
  joinedDays: 1, // just joined
} as const;

export const MOCK_STATS: StatItem[] = [
  {
    label: "Lessons Done",
    value: "0",
    sub: "Start your first lesson",
    trend: "neutral",
  },
  {
    label: "Day Streak",
    value: "0",
    sub: "Complete a lesson today",
    trend: "neutral",
  },
  {
    label: "Hours Learned",
    value: "0h",
    sub: "Your journey begins",
    trend: "neutral",
  },
  {
    label: "Challenges",
    value: "0",
    sub: "Unlock with lessons",
    trend: "neutral",
  },
];

export const MOCK_TOPIC_PROGRESS = [
  {
    id: "javascript",
    slug: "javascript",
    title: "JavaScript",
    icon: "⚡",
    color: "#F7DF1E",
    difficulty: "beginner" as const,
    progress: 0,
    lessonsTotal: 20,
    lessonsDone: 0,
    lastAccessed: "Not started",
  },
  {
    id: "react",
    slug: "react",
    title: "React",
    icon: "⚛️",
    color: "#61DAFB",
    difficulty: "intermediate" as const,
    progress: 0,
    lessonsTotal: 18,
    lessonsDone: 0,
    lastAccessed: "Not started",
  },
  {
    id: "typescript",
    slug: "typescript",
    title: "TypeScript",
    icon: "🔷",
    color: "#3178C6",
    difficulty: "intermediate" as const,
    progress: 0,
    lessonsTotal: 12,
    lessonsDone: 0,
    lastAccessed: "Not started",
  },
  {
    id: "nextjs",
    slug: "nextjs",
    title: "Next.js",
    icon: "▲",
    color: "#FFFFFF",
    difficulty: "intermediate" as const,
    progress: 0,
    lessonsTotal: 15,
    lessonsDone: 0,
    lastAccessed: "Not started",
  },
];

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Category =
  | "frontend"
  | "fullstack"
  | "backend"
  | "language"
  | "security"
  | "architecture"
  | "devops";

export interface TopicItem {
  id: string;
  slug: string;
  title: string;
  icon: string;
  color: string;
  difficulty: Difficulty;
  modules: number;
  duration: string;
  category: Category;
  progress: number;
}

export const MOCK_ALL_TOPICS: TopicItem[] = [
  {
    id: "html-css",
    slug: "html-css",
    title: "HTML & CSS",
    icon: "🌐",
    color: "#E34F26",
    difficulty: "beginner",
    modules: 12,
    duration: "8h",
    category: "frontend",
    progress: 0,
  },
  {
    id: "javascript",
    slug: "javascript",
    title: "JavaScript",
    icon: "⚡",
    color: "#F7DF1E",
    difficulty: "beginner",
    modules: 20,
    duration: "16h",
    category: "frontend",
    progress: 0,
  },
  {
    id: "react",
    slug: "react",
    title: "React",
    icon: "⚛️",
    color: "#61DAFB",
    difficulty: "intermediate",
    modules: 18,
    duration: "14h",
    category: "frontend",
    progress: 0,
  },
  {
    id: "nextjs",
    slug: "nextjs",
    title: "Next.js",
    icon: "▲",
    color: "#FFFFFF",
    difficulty: "intermediate",
    modules: 15,
    duration: "12h",
    category: "fullstack",
    progress: 0,
  },
  {
    id: "typescript",
    slug: "typescript",
    title: "TypeScript",
    icon: "🔷",
    color: "#3178C6",
    difficulty: "intermediate",
    modules: 12,
    duration: "9h",
    category: "language",
    progress: 0,
  },
  {
    id: "nodejs",
    slug: "nodejs",
    title: "Node.js",
    icon: "🟢",
    color: "#339933",
    difficulty: "intermediate",
    modules: 14,
    duration: "10h",
    category: "backend",
    progress: 0,
  },
  {
    id: "databases",
    slug: "databases",
    title: "Databases",
    icon: "🗄️",
    color: "#336791",
    difficulty: "intermediate",
    modules: 10,
    duration: "8h",
    category: "backend",
    progress: 0,
  },
  {
    id: "auth",
    slug: "auth",
    title: "Authentication",
    icon: "🔐",
    color: "#7B61FF",
    difficulty: "advanced",
    modules: 8,
    duration: "6h",
    category: "security",
    progress: 0,
  },
  {
    id: "system-design",
    slug: "system-design",
    title: "System Design",
    icon: "🏗️",
    color: "#00C2FF",
    difficulty: "advanced",
    modules: 10,
    duration: "10h",
    category: "architecture",
    progress: 0,
  },
  {
    id: "devops",
    slug: "devops",
    title: "DevOps & CI/CD",
    icon: "🚀",
    color: "#FF6B6B",
    difficulty: "advanced",
    modules: 9,
    duration: "8h",
    category: "devops",
    progress: 0,
  },
];

export interface DailyPathItem {
  id: number;
  title: string;
  topic: string;
  duration: number;
  type: "lesson" | "challenge" | "quiz";
  done: boolean;
}

// Fresh user sees their first suggested lessons — none done yet
export const MOCK_DAILY_PATH: DailyPathItem[] = [
  {
    id: 1,
    title: "Introduction to HTML",
    topic: "HTML & CSS",
    duration: 10,
    type: "lesson",
    done: false,
  },
  {
    id: 2,
    title: "Your first CSS styles",
    topic: "HTML & CSS",
    duration: 12,
    type: "lesson",
    done: false,
  },
  {
    id: 3,
    title: "Variables & Data Types",
    topic: "JavaScript",
    duration: 15,
    type: "lesson",
    done: false,
  },
  {
    id: 4,
    title: "Hello World challenge",
    topic: "JavaScript",
    duration: 10,
    type: "challenge",
    done: false,
  },
  {
    id: 5,
    title: "What is a variable? (quiz)",
    topic: "JavaScript",
    duration: 5,
    type: "quiz",
    done: false,
  },
];

export interface ActivityItem {
  id: number;
  action: string;
  item: string;
  topic: string;
  time: string;
  xp: number;
}

// Fresh user — no activity yet
export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: 1,
    action: "Joined",
    item: "DevForge platform",
    topic: "",
    time: "Just now",
    xp: 0,
  },
];

export interface Achievement {
  id: number;
  icon: string;
  label: string;
  desc: string;
  earned: boolean;
}

// Fresh user — all achievements locked
export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    icon: "🔥",
    label: "Hot Streak",
    desc: "7-day streak",
    earned: false,
  },
  {
    id: 2,
    icon: "⚡",
    label: "Quick Learner",
    desc: "5 lessons/day",
    earned: false,
  },
  {
    id: 3,
    icon: "🎯",
    label: "On Target",
    desc: "Weekly goal met",
    earned: false,
  },
  {
    id: 4,
    icon: "🏆",
    label: "JS Master",
    desc: "Complete JS path",
    earned: false,
  },
  {
    id: 5,
    icon: "🚀",
    label: "Full Stack",
    desc: "4+ topics started",
    earned: false,
  },
  { id: 6, icon: "💎", label: "Diamond", desc: "30-day streak", earned: false },
];
