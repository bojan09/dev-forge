// lib/infographicData.ts
// ─────────────────────────────────────────────────────────
// PRE-BUILT INFOGRAPHIC DATASETS
// Ready-to-use diagram data for all major learning topics
// Import in lesson pages and pass to infographic components
// ─────────────────────────────────────────────────────────

import type {
  FlowDiagramData,
  ArchDiagramData,
  ComparisonData,
} from "@/components/infographics/types";

// ── JAVASCRIPT EXECUTION FLOW ────────────────────────────
export const JS_EXECUTION_FLOW: FlowDiagramData = {
  id: "js-execution",
  title: "How JavaScript Executes Your Code",
  description: "Click each node to understand what happens at each stage",
  direction: "horizontal",
  nodes: [
    {
      id: "source",
      label: "Source Code",
      sublabel: ".js file",
      icon: "📄",
      description: "Your raw JavaScript code — the text file you write. The engine hasn't touched it yet.",
      badge: "Input",
    },
    {
      id: "parse",
      label: "Parser",
      sublabel: "Tokenizer + AST",
      icon: "🔍",
      description: "The parser reads your code character by character, converts it to tokens, then builds an Abstract Syntax Tree (AST) — a tree representation of your code's structure.",
      code: "// AST for: const x = 5\n{\n  type: 'VariableDeclaration',\n  kind: 'const',\n  declarations: [{\n    id: { name: 'x' },\n    init: { value: 5 }\n  }]\n}",
    },
    {
      id: "compile",
      label: "JIT Compiler",
      sublabel: "Bytecode → Machine",
      icon: "⚙️",
      description: "V8's JIT (Just-In-Time) compiler converts the AST to optimised machine code. It watches for 'hot' code paths and re-compiles them with aggressive optimisations.",
    },
    {
      id: "engine",
      label: "Call Stack",
      sublabel: "LIFO execution",
      icon: "📚",
      description: "Functions are pushed onto the Call Stack when called, and popped off when they return. Only one function runs at a time — JavaScript is single-threaded.",
      code: "// Stack trace:\n// greet() → sayHello() → console.log()\n// Each frame holds: function name, local vars, return address",
    },
    {
      id: "output",
      label: "Output",
      sublabel: "DOM / Console",
      icon: "✨",
      description: "The final result — changes to the DOM, values logged to console, network requests fired, or any other side effects your code produces.",
      badge: "Output",
    },
  ],
  edges: [
    { from: "source",  to: "parse",   label: "read" },
    { from: "parse",   to: "compile", label: "AST"  },
    { from: "compile", to: "engine",  label: "run"  },
    { from: "engine",  to: "output",  label: "result"},
  ],
};

// ── REACT RENDER CYCLE ───────────────────────────────────
export const REACT_RENDER_CYCLE: FlowDiagramData = {
  id: "react-render",
  title: "React Render Cycle",
  description: "What happens every time state or props change",
  direction: "horizontal",
  nodes: [
    {
      id: "trigger",
      label: "Trigger",
      sublabel: "State / Props",
      icon: "⚡",
      description: "A render is triggered when: setState is called, a parent re-renders, or context changes. React schedules a re-render — it doesn't happen immediately.",
      badge: "Start",
    },
    {
      id: "render",
      label: "Render",
      sublabel: "Call component fn",
      icon: "🔄",
      description: "React calls your component function. It runs from top to bottom, executing all hooks and returning JSX. This is pure — no side effects yet.",
      code: "function MyComponent() {\n  // React calls this\n  const [count, setCount] = useState(0);\n  return <div>{count}</div>; // returns JSX\n}",
    },
    {
      id: "reconcile",
      label: "Reconcile",
      sublabel: "Diff old vs new",
      icon: "🔀",
      description: "React compares the new Virtual DOM tree with the previous one (diffing). It figures out the minimum set of actual DOM changes needed — this is the key to React's performance.",
    },
    {
      id: "commit",
      label: "Commit",
      sublabel: "Update real DOM",
      icon: "💾",
      description: "React applies the calculated changes to the real DOM in a single batch. After this, useLayoutEffect fires, then the browser paints, then useEffect fires.",
      badge: "DOM updated",
    },
  ],
  edges: [
    { from: "trigger",    to: "render",    label: "schedule" },
    { from: "render",     to: "reconcile", label: "vdom"     },
    { from: "reconcile",  to: "commit",    label: "patches"  },
  ],
};

// ── AUTH FLOW ────────────────────────────────────────────
export const AUTH_FLOW: FlowDiagramData = {
  id: "auth-flow",
  title: "JWT Authentication Flow",
  description: "How login tokens work end-to-end",
  direction: "vertical",
  nodes: [
    {
      id: "login",
      label: "User Login",
      sublabel: "POST /auth/login",
      icon: "🔑",
      description: "User submits email + password. Never store plaintext passwords — hash with bcrypt (cost factor ≥ 12) before comparing to the stored hash.",
      code: "// Server-side\nconst valid = await bcrypt.compare(password, user.passwordHash);",
    },
    {
      id: "jwt",
      label: "JWT Issued",
      sublabel: "Signed token",
      icon: "🎫",
      description: "Server creates a JWT with: header (algorithm), payload (user ID, roles, expiry), and signature (HMAC-SHA256 with secret key). The token is sent back to the client.",
      code: "// JWT structure\nheader.payload.signature\n// eyJhbGciOiJIUzI1NiJ9.\n// eyJ1c2VySWQiOiIxMjMifQ.\n// HMAC_SIGNATURE",
    },
    {
      id: "store",
      label: "Token Stored",
      sublabel: "httpOnly cookie",
      icon: "💾",
      description: "Store JWTs in httpOnly cookies (not localStorage!). httpOnly cookies can't be accessed by JavaScript, protecting against XSS attacks. Use Secure + SameSite=Strict flags.",
    },
    {
      id: "request",
      label: "API Request",
      sublabel: "Bearer token",
      icon: "📡",
      description: "For each authenticated request, the JWT is automatically sent in the Authorization header or cookie. The server verifies the signature and checks expiry.",
      code: "// Request header\nAuthorization: Bearer eyJhbGc...",
    },
    {
      id: "verify",
      label: "Middleware",
      sublabel: "Verify + decode",
      icon: "🛡️",
      description: "Server middleware verifies the JWT signature using the secret key. If valid, it decodes the payload and attaches the user to the request object.",
      badge: "Protected",
    },
  ],
  edges: [
    { from: "login",   to: "jwt",     label: "valid creds" },
    { from: "jwt",     to: "store",   label: "Set-Cookie"  },
    { from: "store",   to: "request", label: "next visit"  },
    { from: "request", to: "verify",  label: "→ server"    },
  ],
};

// ── API REQUEST FLOW ─────────────────────────────────────
export const API_REQUEST_FLOW: FlowDiagramData = {
  id: "api-flow",
  title: "API Request Lifecycle",
  description: "From browser click to JSON response",
  direction: "horizontal",
  nodes: [
    {
      id: "client",
      label: "Client",
      sublabel: "Browser / App",
      icon: "🖥️",
      description: "The browser or mobile app initiates a fetch/XMLHttpRequest. The request includes: method, URL, headers, and optional body.",
      code: "await fetch('/api/courses', {\n  method: 'GET',\n  headers: { Authorization: `Bearer ${token}` }\n});",
    },
    {
      id: "dns",
      label: "DNS",
      sublabel: "Domain → IP",
      icon: "🌐",
      description: "The browser first checks its cache. If not found, it queries DNS to resolve the domain (devforge.dev) to an IP address (e.g. 104.21.12.34).",
    },
    {
      id: "server",
      label: "Server",
      sublabel: "Route handler",
      icon: "⚙️",
      description: "The request arrives at the server. A router matches the URL and method to a handler function. Middleware runs first (auth, logging, rate limiting).",
      code: "// Next.js API route\nexport async function GET(req: Request) {\n  const user = await authenticate(req);\n  const data = await db.courses.findMany();\n  return Response.json(data);\n}",
    },
    {
      id: "db",
      label: "Database",
      sublabel: "Query + return",
      icon: "🗄️",
      description: "The handler queries the database. An ORM like Prisma translates the query to SQL, executes it, and maps the results back to JavaScript objects.",
    },
    {
      id: "response",
      label: "Response",
      sublabel: "JSON → client",
      icon: "📦",
      description: "The server serialises the data to JSON, sets appropriate headers (Content-Type, Cache-Control), and sends the HTTP response back to the client.",
      badge: "200 OK",
    },
  ],
  edges: [
    { from: "client",   to: "dns",      label: "resolve"  },
    { from: "dns",      to: "server",   label: "TCP/HTTPS"},
    { from: "server",   to: "db",       label: "query"    },
    { from: "db",       to: "response", label: "rows"     },
  ],
};

// ── REACT STACK ARCHITECTURE ─────────────────────────────
export const REACT_STACK_ARCH: ArchDiagramData = {
  id: "react-stack",
  title: "Modern React Stack Architecture",
  layers: [
    {
      id: "ui",
      label: "UI Layer",
      sublabel: "What the user sees",
      icon: "🎨",
      items: ["React Components", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
    },
    {
      id: "state",
      label: "State & Data Layer",
      sublabel: "How data flows",
      icon: "🔄",
      items: ["TanStack Query", "Context API", "useState / useReducer", "Zustand (optional)"],
    },
    {
      id: "routing",
      label: "Routing & Meta",
      sublabel: "URL + SEO",
      icon: "🗺️",
      items: ["Next.js App Router", "Server Components", "Route Groups", "Metadata API"],
    },
    {
      id: "backend",
      label: "Backend Layer",
      sublabel: "API and business logic",
      icon: "⚙️",
      items: ["Next.js API Routes", "Server Actions", "Middleware", "Edge Functions"],
    },
    {
      id: "data",
      label: "Data Layer",
      sublabel: "Persistence",
      icon: "🗄️",
      items: ["Supabase (PostgreSQL)", "Row Level Security", "Supabase Auth", "Storage Buckets"],
    },
  ],
};

// ── VAR vs LET vs CONST COMPARISON ──────────────────────
export const VAR_LET_CONST_COMPARE: ComparisonData = {
  id: "var-let-const",
  title: "var vs let vs const",
  items: [
    {
      id: "var",
      label: "var",
      icon: "⚠️",
      color: "#fb923c",
      badge: "Avoid",
      points: [
        "Function-scoped (not block)",
        "Hoisted and initialised to undefined",
        "Can be re-declared in same scope",
        "Leaks out of if/for blocks",
        "Causes subtle closure bugs in loops",
      ],
    },
    {
      id: "let",
      label: "let",
      icon: "✅",
      color: "#34d399",
      badge: "Use for reassignment",
      points: [
        "Block-scoped",
        "Hoisted but NOT initialised (TDZ)",
        "Cannot be re-declared in same scope",
        "Safe inside loops and conditionals",
        "Use when value needs to change",
      ],
    },
    {
      id: "const",
      label: "const",
      icon: "⭐",
      color: "#7B61FF",
      badge: "Default choice",
      points: [
        "Block-scoped",
        "Hoisted but NOT initialised (TDZ)",
        "Cannot be reassigned or re-declared",
        "Objects/arrays are still mutable",
        "Makes intent clear — prefer always",
      ],
    },
  ],
};

// ── PROMISES vs ASYNC/AWAIT COMPARISON ──────────────────
export const PROMISES_VS_ASYNC: ComparisonData = {
  id: "promises-vs-async",
  title: "Promises vs Async/Await",
  items: [
    {
      id: "promises",
      label: "Promises",
      icon: "🔗",
      color: "#00C2FF",
      points: [
        "Explicit .then() / .catch() chains",
        "Easy to run multiple in parallel",
        "Can be confusing when deeply nested",
        "Good for utility functions",
        "Promise.all() for parallel work",
      ],
    },
    {
      id: "async",
      label: "Async/Await",
      icon: "⚡",
      color: "#7B61FF",
      badge: "Preferred",
      points: [
        "Reads like synchronous code",
        "try/catch for error handling",
        "Easier to debug (stack traces)",
        "Built on top of Promises",
        "Use Promise.all() for parallel still",
      ],
    },
  ],
};
