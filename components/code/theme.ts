// components/code/theme.ts

export const LANGUAGE_META: Record<string, { label: string; color: string }> = {
  javascript: { label: "JavaScript", color: "#F7DF1E" },
  typescript: { label: "TypeScript", color: "#3178C6" },
  tsx:        { label: "TSX",        color: "#61DAFB" },
  jsx:        { label: "JSX",        color: "#61DAFB" },
  python:     { label: "Python",     color: "#3776AB" },
  css:        { label: "CSS",        color: "#264DE4" },
  html:       { label: "HTML",       color: "#E34F26" },
  bash:       { label: "Bash",       color: "#4EAA25" },
  shell:      { label: "Shell",      color: "#4EAA25" },
  json:       { label: "JSON",       color: "#8B949E" },
  sql:        { label: "SQL",        color: "#336791" },
  yaml:       { label: "YAML",       color: "#CB171E" },
  markdown:   { label: "Markdown",   color: "#083FA1" },
  rust:       { label: "Rust",       color: "#CE412B" },
  go:         { label: "Go",         color: "#00ADD8" },
} as const;

export function normaliseLang(lang: string): string {
  const map: Record<string, string> = {
    js:  "javascript",
    ts:  "typescript",
    sh:  "bash",
    zsh: "bash",
    yml: "yaml",
    md:  "markdown",
    tsx: "typescript",
    jsx: "javascript",
  };
  return map[lang.toLowerCase()] ?? lang.toLowerCase();
}
