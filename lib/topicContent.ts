// lib/topicContent.ts
// ─────────────────────────────────────────────────────────
// TOPIC CONTENT — Full lesson page data
// Each topic has: meta, lessons array, overview content
// Phase 12 will expand all topics; here we build the template
// with JavaScript + React as real content examples.
// ─────────────────────────────────────────────────────────

export type LessonType = "reading" | "interactive" | "challenge" | "video";
export type SectionType = "intro" | "deep-dive" | "use-case" | "mistakes" | "analogy";

export interface LessonSection {
  id: string;
  type: SectionType;
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

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: number; // minutes
  type: LessonType;
  order: number;
  sections: LessonSection[];
  codeExamples: CodeExample[];
  tags: string[];
}

export interface TopicMeta {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  duration: string;
  prerequisites: string[];
  whatYouLearn: string[];
  lessons: Lesson[];
}

// ── JAVASCRIPT ───────────────────────────────────────────
const javascriptLessons: Lesson[] = [
  {
    id: "js-variables",
    slug: "variables-and-data-types",
    title: "Variables & Data Types",
    description: "Master let, const, var and JavaScript's type system.",
    duration: 15,
    type: "reading",
    order: 1,
    tags: ["variables", "types", "fundamentals"],
    sections: [
      {
        id: "intro",
        type: "intro",
        title: "What are variables?",
        content: "Variables are named containers for storing data values. In JavaScript, you declare them using let, const, or var — each with different scoping rules and mutation characteristics.",
      },
      {
        id: "deep-dive",
        type: "deep-dive",
        title: "let vs const vs var — the real difference",
        content: "var is function-scoped and hoisted, making it error-prone. let and const are block-scoped (introduced in ES6). Use const by default; only switch to let when you need to reassign. var should be avoided in modern code entirely.",
      },
      {
        id: "analogy",
        type: "analogy",
        title: "Real-world analogy",
        content: "Think of const like a labelled box you seal shut — you can change what's inside a mutable object, but you can't swap out the box itself. let is an unsealed box — you can replace its contents anytime.",
      },
      {
        id: "mistakes",
        type: "mistakes",
        title: "Common mistakes",
        content: "1. Using var inside loops — leads to closure bugs. 2. Forgetting that const on objects doesn't make them immutable (only the binding is constant). 3. Temporal Dead Zone — accessing let/const before declaration throws ReferenceError.",
      },
    ],
    codeExamples: [
      {
        id: "ex-1",
        title: "Variable declarations",
        language: "javascript",
        code: `// const — can't be reassigned
const name = "DevForge";
const pi = 3.14159;

// let — can be reassigned
let score = 0;
score = 100; // ✓ works

// const with objects — binding is constant, contents are mutable
const user = { name: "Alice", level: 5 };
user.level = 6; // ✓ works — mutating the object
// user = {};   // ✗ TypeError — can't reassign const

// JavaScript types
const str    = "hello";        // string
const num    = 42;             // number
const bool   = true;           // boolean
const nil    = null;           // null
const undef  = undefined;      // undefined
const sym    = Symbol("id");   // symbol
const big    = 9007199254740991n; // BigInt

console.log(typeof str);  // "string"
console.log(typeof num);  // "number"
console.log(typeof nil);  // "object" ← famous JS quirk`,
        notes: "typeof null returns 'object' — this is a historical bug in JavaScript that can't be fixed without breaking existing code.",
      },
    ],
  },
  {
    id: "js-functions",
    slug: "functions",
    title: "Functions",
    description: "Function declarations, expressions, arrow functions, and closures.",
    duration: 20,
    type: "reading",
    order: 2,
    tags: ["functions", "arrows", "closures"],
    sections: [
      {
        id: "intro",
        type: "intro",
        title: "Functions — reusable blocks of logic",
        content: "Functions let you encapsulate logic, name it, and reuse it. JavaScript has three main ways to define them, each with subtle differences in hoisting and this binding.",
      },
      {
        id: "deep-dive",
        type: "deep-dive",
        title: "Arrow functions vs regular functions",
        content: "Arrow functions don't have their own this binding — they inherit it from the surrounding lexical scope. This makes them ideal for callbacks and methods that need to reference the outer context. Regular functions have their own this, which changes based on how they're called.",
      },
      {
        id: "analogy",
        type: "analogy",
        title: "Closures explained simply",
        content: "A closure is like a backpack a function carries. When a function is created inside another function, it 'packs up' the variables from its parent scope and carries them wherever it goes — even after the parent function has finished running.",
      },
      {
        id: "mistakes",
        type: "mistakes",
        title: "Common mistakes",
        content: "1. Using arrow functions as object methods — this won't refer to the object. 2. Forgetting that function declarations are hoisted but function expressions are not. 3. Accidentally creating closures over loop variables with var.",
      },
    ],
    codeExamples: [
      {
        id: "ex-1",
        title: "Three ways to write a function",
        language: "javascript",
        code: `// 1. Function declaration — hoisted
function add(a, b) {
  return a + b;
}

// 2. Function expression — not hoisted
const multiply = function(a, b) {
  return a * b;
};

// 3. Arrow function — concise, no own 'this'
const divide = (a, b) => a / b;

// Closures in action
function makeCounter(start = 0) {
  let count = start; // 'count' is closed over

  return {
    increment: () => ++count,
    decrement: () => --count,
    value:     () => count,
  };
}

const counter = makeCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.decrement(); // 11
console.log(counter.value()); // 11`,
        notes: "The counter's 'count' variable persists between calls because the returned object's methods close over it.",
      },
    ],
  },
  {
    id: "js-async",
    slug: "async-await",
    title: "Async / Await",
    description: "Write asynchronous code that reads like synchronous code.",
    duration: 25,
    type: "interactive",
    order: 3,
    tags: ["async", "promises", "fetch"],
    sections: [
      {
        id: "intro",
        type: "intro",
        title: "The problem with callbacks",
        content: "JavaScript is single-threaded but non-blocking. Early async code used nested callbacks ('callback hell'), then Promises improved readability. async/await is syntactic sugar on top of Promises — it makes async code look and behave like synchronous code.",
      },
      {
        id: "deep-dive",
        type: "deep-dive",
        title: "How async/await works under the hood",
        content: "async functions always return a Promise. The await keyword pauses execution of the async function until the Promise resolves, without blocking the main thread. The JavaScript engine suspends the function, continues running other code, then resumes when the awaited value is ready.",
      },
    ],
    codeExamples: [
      {
        id: "ex-1",
        title: "Fetching data with async/await",
        language: "javascript",
        code: `// The old way — promise chaining
fetch('/api/user')
  .then(res => res.json())
  .then(user => console.log(user))
  .catch(err => console.error(err));

// The modern way — async/await
async function getUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error; // re-throw so caller can handle it
  }
}

// Parallel requests — don't await sequentially!
async function loadDashboard(userId) {
  // ✗ Sequential — each waits for the previous (slow)
  // const user    = await getUser(userId);
  // const courses = await getCourses(userId);

  // ✓ Parallel — all fire at once (fast)
  const [user, courses] = await Promise.all([
    getUser(userId),
    getCourses(userId),
  ]);

  return { user, courses };
}`,
      },
    ],
  },
  {
    id: "js-dom",
    slug: "dom-manipulation",
    title: "DOM Manipulation",
    description: "Interact with HTML elements using JavaScript.",
    duration: 20,
    type: "reading",
    order: 4,
    tags: ["dom", "events", "browser"],
    sections: [],
    codeExamples: [],
  },
  {
    id: "js-arrays",
    slug: "array-methods",
    title: "Array Methods",
    description: "map, filter, reduce, and every modern array method.",
    duration: 20,
    type: "reading",
    order: 5,
    tags: ["arrays", "functional", "map", "filter"],
    sections: [],
    codeExamples: [],
  },
  {
    id: "js-challenge-1",
    slug: "challenge-closure",
    title: "Challenge: Build a Counter",
    description: "Apply closures to build a flexible counter factory.",
    duration: 15,
    type: "challenge",
    order: 6,
    tags: ["challenge", "closures"],
    sections: [],
    codeExamples: [],
  },
];

const reactLessons: Lesson[] = [
  {
    id: "react-components",
    slug: "components",
    title: "Components & JSX",
    description: "The building blocks of every React application.",
    duration: 20,
    type: "reading",
    order: 1,
    tags: ["components", "jsx", "props"],
    sections: [
      {
        id: "intro",
        type: "intro",
        title: "Everything is a component",
        content: "React breaks your UI into small, reusable pieces called components. Each component is a JavaScript function that returns JSX — a syntax that looks like HTML but compiles to JavaScript function calls.",
      },
      {
        id: "deep-dive",
        type: "deep-dive",
        title: "How JSX transforms into JavaScript",
        content: "JSX is syntactic sugar. <Button color='blue'>Click</Button> compiles to React.createElement(Button, {color:'blue'}, 'Click'). The compiler (Babel or the new JSX transform) handles this automatically. Understanding this helps you grasp why you can only return one root element.",
      },
      {
        id: "analogy",
        type: "analogy",
        title: "LEGO brick analogy",
        content: "Think of components like LEGO bricks. You have small, specialized bricks (Button, Input, Avatar) that snap together into larger structures (Form, Card, Modal), which combine into complete layouts (Dashboard, LearningPage). Each brick is reusable and independent.",
      },
      {
        id: "mistakes",
        type: "mistakes",
        title: "Common mistakes",
        content: "1. Mutating props — props are read-only; never modify them. 2. Returning multiple root elements without a Fragment. 3. Using class instead of className in JSX. 4. Forgetting that JSX expressions must be wrapped in curly braces.",
      },
    ],
    codeExamples: [
      {
        id: "ex-1",
        title: "Your first React component",
        language: "tsx",
        code: `// A simple functional component
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export function Button({ label, onClick, variant = "primary", disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant} \${disabled ? "opacity-50" : ""}\`}
    >
      {label}
    </button>
  );
}

// Composing components
export function LessonCard({ title, duration, completed }: {
  title: string;
  duration: number;
  completed: boolean;
}) {
  return (
    <div className="lesson-card">
      <h3>{title}</h3>
      <span>{duration} min</span>
      {completed && <span>✓ Done</span>}
      <Button
        label={completed ? "Review" : "Start"}
        onClick={() => console.log("clicked")}
      />
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "react-hooks",
    slug: "hooks",
    title: "React Hooks",
    description: "useState, useEffect, useCallback, useMemo and custom hooks.",
    duration: 30,
    type: "interactive",
    order: 2,
    tags: ["hooks", "state", "effects"],
    sections: [],
    codeExamples: [],
  },
  {
    id: "react-state",
    slug: "state-management",
    title: "State Management",
    description: "Local state, lifting state, Context API and when to use each.",
    duration: 25,
    type: "reading",
    order: 3,
    tags: ["state", "context", "lifting"],
    sections: [],
    codeExamples: [],
  },
];

// ── Topic registry ────────────────────────────────────────
export const TOPIC_CONTENT: Record<string, TopicMeta> = {
  javascript: {
    id: "javascript",
    slug: "javascript",
    title: "JavaScript",
    tagline: "The language of the web",
    description: "Master JavaScript from the ground up — variables, functions, async programming, the DOM, and modern ES2024+ features. Build real-world projects at every step.",
    icon: "⚡",
    color: "#F7DF1E",
    difficulty: "beginner",
    category: "Frontend",
    duration: "16 hours",
    prerequisites: ["Basic HTML & CSS"],
    whatYouLearn: [
      "Variables, types, and scoping rules",
      "Functions, closures, and the call stack",
      "Async/Await and Promise patterns",
      "DOM manipulation and events",
      "Modern array and object methods",
      "Modules and ES6+ features",
    ],
    lessons: javascriptLessons,
  },
  react: {
    id: "react",
    slug: "react",
    title: "React",
    tagline: "Build UIs that think",
    description: "Learn React from components to advanced patterns. Master hooks, state management, performance optimisation, and build production-grade applications.",
    icon: "⚛️",
    color: "#61DAFB",
    difficulty: "intermediate",
    category: "Frontend",
    duration: "14 hours",
    prerequisites: ["JavaScript", "HTML & CSS"],
    whatYouLearn: [
      "Components, JSX, and props",
      "useState, useEffect, and all core hooks",
      "Context API for global state",
      "Performance with useMemo and useCallback",
      "Custom hooks and reusable patterns",
      "React Router and data fetching",
    ],
    lessons: reactLessons,
  },
};

// ── Helper to get topic or null ───────────────────────────
export function getTopicContent(slug: string): TopicMeta | null {
  return TOPIC_CONTENT[slug] ?? null;
}
