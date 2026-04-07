"use client";

// components/code/CodeBlock.tsx
// Zero external dependencies — pure CSS syntax highlighting via regex tokenizer.
// No react-syntax-highlighter, no highlight.js, no webpack CJS/ESM issues.

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, FileCode, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/lib/utils";
import { LANGUAGE_META, normaliseLang } from "./theme";

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  filename?: string;
  notes?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  maxCollapsedLines?: number;
  className?: string;
}

// ── Minimal tokenizer — produces spans with color classes ──
// Covers the most common tokens across JS/TS/JSX/CSS/HTML/Python
function tokenize(code: string, lang: string): string {
  // Escape HTML entities first
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const isHTML = lang === "html" || lang === "xml";
  const isCSS = lang === "css";
  const isBash = lang === "bash" || lang === "shell";

  // Color tokens matching our GitHub Dark theme
  const C = {
    keyword: (s: string) => `<span style="color:#ff7b72">${s}</span>`,
    string: (s: string) => `<span style="color:#a5d6ff">${s}</span>`,
    comment: (s: string) =>
      `<span style="color:#6e7681;font-style:italic">${s}</span>`,
    number: (s: string) => `<span style="color:#79c0ff">${s}</span>`,
    fn: (s: string) => `<span style="color:#d2a8ff">${s}</span>`,
    type: (s: string) => `<span style="color:#ffa657">${s}</span>`,
    tag: (s: string) => `<span style="color:#7ee787">${s}</span>`,
    attr: (s: string) => `<span style="color:#79c0ff">${s}</span>`,
    operator: (s: string) => `<span style="color:#8b949e">${s}</span>`,
    punctuation: (s: string) => `<span style="color:#8b949e">${s}</span>`,
  };

  let result = escaped;

  if (isBash) {
    result = result
      .replace(/(#.*)$/gm, (m) => C.comment(m))
      .replace(
        /\b(export|source|\.|cd|ls|cat|echo|npm|npx|git|mkdir|rm|cp|mv|sudo|chmod|grep|find|sed|awk|curl|wget)\b/g,
        (m) => C.keyword(m),
      )
      .replace(/(&quot;[^&]*&quot;|&#39;[^&]*&#39;)/g, (m) => C.string(m))
      .replace(/\$[A-Za-z_]\w*/g, (m) => C.type(m))
      .replace(/(-{1,2}[\w-]+)/g, (m) => C.attr(m));
    return result;
  }

  if (isHTML) {
    result = result
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, (m) => C.comment(m))
      .replace(/(&lt;\/?)([\w-]+)/g, (_, lt, tag) => lt + C.tag(tag))
      .replace(/\s([\w-:]+)=/g, (_, a) => ` ${C.attr(a)}=`)
      .replace(/(&quot;[^&]*&quot;)/g, (m) => C.string(m));
    return result;
  }

  if (isCSS) {
    result = result
      .replace(/(\/\*[\s\S]*?\*\/)/g, (m) => C.comment(m))
      .replace(/([.#]?[\w-]+)\s*\{/g, (m, sel) => C.tag(sel) + " {")
      .replace(/([\w-]+)\s*:/g, (m, prop) => C.attr(prop) + ":")
      .replace(/(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))/g, (m) => C.string(m))
      .replace(/(['"]\S+['"])/g, (m) => C.string(m));
    return result;
  }

  // JS / TS / JSX / TSX / Python / general
  result = result
    // Comments first (don't tokenize inside them)
    .replace(/(\/\/.*$)/gm, (m) => C.comment(m))
    .replace(/(\/\*[\s\S]*?\*\/)/g, (m) => C.comment(m))

    // Strings (template literals, single, double)
    .replace(/(`[^`]*`)/g, (m) => C.string(m))
    .replace(/(&quot;(?:[^&]|&(?!quot;))*&quot;)/g, (m) => C.string(m))
    .replace(/(&#39;(?:[^&]|&(?!#39;))*&#39;)/g, (m) => C.string(m))
    .replace(/(#.*$)/gm, (m: string) => {
      if (lang === "python" || lang === "yaml") {
        return C.comment(m);
      }
      return m;
    })
    // Keywords
    .replace(
      /\b(import|export|from|default|const|let|var|function|class|extends|return|if|else|for|while|do|switch|case|break|continue|new|delete|typeof|instanceof|void|null|undefined|true|false|async|await|try|catch|finally|throw|in|of|this|super|static|get|set|type|interface|enum|implements|as|namespace|declare|abstract|readonly|public|private|protected|override|satisfies|keyof|infer|is|asserts|def|import|from|pass|raise|with|lambda|yield|and|or|not|elif|global|nonlocal)\b/g,
      (m) => C.keyword(m),
    )
    // Type annotations (TypeScript — word after : or < or ,)
    .replace(
      /:\s*(string|number|boolean|void|never|any|unknown|object|symbol|bigint|null|undefined|Promise|Array|Record|Partial|Required|Readonly|Pick|Omit|Exclude|Extract|NonNullable|ReturnType|InstanceType|Parameters|ConstructorParameters)\b/g,
      (m, t) => `: ${C.type(t)}`,
    )
    // Function calls
    .replace(/\b([a-z_$][\w$]*)\s*(?=\()/g, (m, fn) => C.fn(fn) + "(")
    // Class / Type names (PascalCase)
    .replace(/\b([A-Z][A-Za-z0-9_$]*)\b/g, (m) => C.type(m))
    // Numbers
    .replace(/\b(\d+\.?\d*(?:n)?)\b/g, (m) => C.number(m))
    // Operators
    .replace(
      /(===|!==|==|!=|&amp;&amp;|\|\||=&gt;|&lt;&lt;|&gt;&gt;|&gt;&gt;&gt;|\?\.|\?\?)/g,
      (m) => C.operator(m),
    );

  return result;
}

export function CodeBlock({
  code,
  language = "javascript",
  title,
  filename,
  notes,
  showLineNumbers = true,
  highlightLines = [],
  maxCollapsedLines = 25,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const lang = normaliseLang(language);
  const meta = LANGUAGE_META[lang] ?? {
    label: lang.toUpperCase(),
    color: "#8B949E",
  };
  const trimmed = code.trim();
  const lines = trimmed.split("\n");
  const lineCount = lines.length;
  const isLong = lineCount > maxCollapsedLines;

  useEffect(() => {
    if (isLong) setCollapsed(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(trimmed);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [trimmed]);

  const displayLabel = filename ?? title;

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border border-surface-border",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-raised border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              {displayLabel ?? meta.label}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface-card border border-surface-border">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: meta.color }}
            />
            <span className="text-[10px] font-mono font-medium text-[var(--color-text-muted)]">
              {meta.label}
            </span>
          </div>
          <span className="text-[10px] text-[var(--color-text-muted)] hidden md:block tabular-nums">
            {lineCount} lines
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface-card transition-all duration-200"
            aria-label="Copy code"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    Copied!
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium hidden sm:inline">
                    Copy
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Code area */}
      <div
        className="bg-surface overflow-hidden"
        style={collapsed ? { maxHeight: `${maxCollapsedLines * 24}px` } : {}}
      >
        <div className="p-4 overflow-x-auto">
          <pre
            className="font-mono text-[13px] leading-7 text-[#e6edf3]"
            style={{ margin: 0, padding: 0, background: "transparent" }}
          >
            {lines.map((line, i) => {
              const lineNum = i + 1;
              const isHighlit = highlightLines.includes(lineNum);
              const html = tokenize(line, lang);
              return (
                <div
                  key={i}
                  className="flex"
                  style={
                    isHighlit
                      ? {
                          backgroundColor: "rgba(123,97,255,0.12)",
                          borderLeft: "2px solid #7B61FF",
                          marginLeft: "-14px",
                          paddingLeft: "12px",
                          marginRight: "-16px",
                        }
                      : {}
                  }
                >
                  {showLineNumbers && (
                    <span
                      className="select-none text-right shrink-0 pr-4"
                      style={{
                        color: "#30363d",
                        fontSize: "11px",
                        minWidth: "2.5em",
                        lineHeight: "1.75",
                      }}
                    >
                      {lineNum}
                    </span>
                  )}
                  <span
                    className="flex-1 whitespace-pre"
                    dangerouslySetInnerHTML={{ __html: html || " " }}
                  />
                </div>
              );
            })}
          </pre>
        </div>
      </div>

      {/* Collapse toggle */}
      {isLong && (
        <button
          onClick={() => setCollapsed((p) => !p)}
          className="w-full flex items-center justify-center gap-2 py-2 bg-surface-raised border-t border-surface-border text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all duration-200"
        >
          {collapsed ? (
            <>
              <ChevronDown className="w-3.5 h-3.5" /> Show all {lineCount} lines
            </>
          ) : (
            <>
              <ChevronUp className="w-3.5 h-3.5" /> Collapse
            </>
          )}
        </button>
      )}

      {/* Notes */}
      {notes && (
        <div className="px-4 py-3 bg-yellow-400/5 border-t border-yellow-400/20 flex items-start gap-2">
          <span className="text-yellow-400 text-xs font-bold shrink-0 mt-0.5">
            💡
          </span>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            {notes}
          </p>
        </div>
      )}
    </div>
  );
}
