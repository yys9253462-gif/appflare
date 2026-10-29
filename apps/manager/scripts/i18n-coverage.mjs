#!/usr/bin/env node
/**
 * Reports how much of the manager's user-facing copy is translated.
 *
 * Every translation goes through `t("English")`, so coverage has two halves:
 *
 *   unwrapped  a user-facing literal that no `t()` wraps yet. English on screen.
 *   missing    a `t()` key the dictionary does not have. Falls back to English.
 *
 * Both are what "not translated" means in practice. Exit code 1 while either is
 * non-zero, so it can run as a check.
 *
 *   node scripts/i18n-coverage.mjs [--by-file] [--json]
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SRC = join(ROOT, "src");
const ZH = join(SRC, "i18n", "zh.ts");

/** Props whose value is shown or read aloud by the user. */
const TEXT_PROPS = [
  "title",
  "label",
  "placeholder",
  "aria-label",
  "description",
  "alt",
  "actionLabel",
  "dismissLabel",
  "tooltip",
  "content",
  "help",
  "summary",
  "tagline",
  "error",
  "note",
];

/** Not user-facing: paths, ids, classes, keys, CSS values. */
function looksLikeUiText(text) {
  const value = text.trim();
  if (value.length < 2) return false;
  if (!/[A-Za-z]/.test(value)) return false;
  // A path, a CSS class, an id, a token, a URL, a route.
  if (/^[a-z0-9_./:#-]+$/.test(value)) return false;
  if (/^(https?:|\/|\.\/|\.\.\/)/.test(value)) return false;
  if (/^[A-Za-z0-9_-]+$/.test(value) && !/^[A-Z]/.test(value)) return false;
  // Code-ish: a JSX tag, an expression, an import specifier, an escape.
  if (/[<>{}`$=;()[\]]/.test(value)) return false;
  if (value.includes("\\")) return false;
  // A `>...<` run through a generic type, a union, or a comparison.
  if (/=>|&&|\|\|/.test(value)) return false;
  if (/^[,:;&|=]/.test(value)) return false;
  if (
    /\b(?:Readonly|ReadonlyArray|ReadonlyMap|ReadonlySet|Partial|Omit|Pick|Promise|Awaited|ReturnType)\b/.test(
      value,
    )
  ) {
    return false;
  }
  return true;
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (["test", "screenshots", "node_modules"].includes(name)) continue;
      out.push(...walk(full));
      continue;
    }
    if (!/\.(tsx?|mts)$/.test(name)) continue;
    if (/\.(dom\.)?test\.(ts|tsx)$/.test(name)) continue;
    if (name.endsWith(".d.ts")) continue;
    // The dictionary and its plumbing: English source on the key side.
    if (/(^|[\\/])i18n[\\/]/.test(full)) continue;
    out.push(full);
  }
  return out;
}

/** The keys the dictionary defines. */
function dictionaryKeys() {
  const source = readFileSync(ZH, "utf8");
  const keys = new Set();
  for (const line of source.split("\n")) {
    const quoted = /^\s*(["'])((?:(?!\1)[^\\]|\\.)+)\1\s*:/.exec(line);
    if (quoted) {
      keys.add(quoted[2].replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, "\\"));
      continue;
    }
    const bare = /^\s*([A-Za-z_$][\w$]*)\s*:/.exec(line);
    if (bare) keys.add(bare[1]);
  }
  return keys;
}

/**
 * Every string `t()` is given, with its line: the literal itself, or the arms
 * of a ternary inside it (`t(condition ? "a" : "b")`).
 */
function translatedKeys(text) {
  const found = [];
  const call = /\bt\(/g;
  for (let m = call.exec(text); m !== null; m = call.exec(text)) {
    const end = matchingParen(text, m.index);
    // Only the literals of the call itself: those of a nested call — the
    // arguments of `settingsLink("account", "danger-zone")` in a placeholder —
    // are somebody else's.
    let depth = 0;
    let quote = null;
    let start = -1;
    for (let i = m.index; i <= end; i += 1) {
      const ch = text[i];
      if (quote !== null) {
        if (ch === "\\") {
          i += 1;
          continue;
        }
        if (ch === quote) {
          // A string after `:` is an argument's value (`{ count: "x" }`).
          const isValue = /:\s*$/.test(text.slice(Math.max(0, start - 40), start));
          if (depth === 1 && start !== -1 && !isValue) {
            const key = text
              .slice(start + 1, i)
              .replace(/\\"/g, '"')
              .replace(/\\'/g, "'");
            const line = text.slice(0, start).split("\n").length;
            found.push({ key, line, index: start });
          }
          quote = null;
          start = -1;
        }
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") {
        quote = ch;
        start = i;
      } else if (ch === "(") depth += 1;
      else if (ch === ")") depth -= 1;
    }
    call.lastIndex = end + 1;
  }
  return found;
}

/** The index of the `)` that closes the `(` at `start`, skipping strings. */
function matchingParen(text, start) {
  let depth = 0;
  let quote = null;
  let i = start;
  for (; i < text.length; i += 1) {
    const ch = text[i];
    if (quote !== null) {
      if (ch === "\\") i += 1;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") quote = ch;
    else if (ch === "(") depth += 1;
    else if (ch === ")") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return text.length - 1;
}

/** Literals inside `t()` calls, so they are not also reported as unwrapped. */
function tCallSpans(text) {
  const spans = [];
  for (const call of translatedKeys(text)) {
    // Walk to the matching `)` while skipping string contents: a translation
    // holds HTML, parentheses of its own included.
    let depth = 0;
    let quote = null;
    let i = call.index;
    for (; i < text.length; i += 1) {
      const ch = text[i];
      if (quote !== null) {
        if (ch === "\\") i += 1;
        else if (ch === quote) quote = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") quote = ch;
      else if (ch === "(") depth += 1;
      else if (ch === ")") {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    spans.push([call.index, i]);
  }
  return spans;
}

function inSpan(spans, index) {
  return spans.some(([start, end]) => index >= start && index <= end);
}

/** JSX text nodes: `>Some copy<`, on one line, no braces or tags inside. */
function jsxTextNodes(text, spans) {
  const out = [];
  const re = />([^<>{}]*[A-Za-z][^<>{}]*)</g;
  for (let m = re.exec(text); m !== null; m = re.exec(text)) {
    const value = m[1].replace(/\s+/g, " ").trim();
    if (!looksLikeUiText(value)) continue;
    if (inSpan(spans, m.index)) continue;
    // A JSX tag ends with `>` right after its name, a quote or a brace.
    if (!/["'}>a-zA-Z0-9_/]/.test(text[m.index - 1] ?? "")) continue;
    const line = text.slice(0, m.index).split("\n").length;
    out.push({ value, line });
  }
  return out;
}

/** Whitelisted props given a bare string: `title="Copy"`. */
function textProps(text, spans) {
  const out = [];
  const re = new RegExp(
    `\\b(?:${TEXT_PROPS.join("|")})\\s*=\\s*(["'])((?:(?!\\1)[^\\\\]|\\\\.)*)\\1`,
    "g",
  );
  for (let m = re.exec(text); m !== null; m = re.exec(text)) {
    const value = m[2].replace(/\\"/g, '"').trim();
    if (!looksLikeUiText(value)) continue;
    if (inSpan(spans, m.index)) continue;
    const line = text.slice(0, m.index).split("\n").length;
    out.push({ value, line });
  }
  return out;
}

/** A key worth reporting: not empty, not an identifier, not SQL. */
function isReportableKey(key) {
  if (key.trim() === "") return false;
  // An HTTP method list, not copy.
  if (/^[A-Z]+(, [A-Z]+)+$/.test(key)) return false;
  if (/^[a-z0-9_]+$/.test(key)) return false;
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER)\b/.test(key)) return false;
  return true;
}

/** `text` with comment characters blanked out, offsets and newlines kept. */
function stripComments(text) {
  const blank = (m) => m.replace(/[^\n]/g, " ");
  let out = text.replace(/\/\*[\s\S]*?\*\//g, blank);
  out = out.replace(/(^|[^:])\/\/[^\n]*/g, (m, lead) => lead + blank(m.slice(lead.length)));
  return out;
}

/**
 * Sentence-shaped string literals that no `t()` wraps and the dictionary does
 * not have: labels a module hands to the UI (job step names, section titles),
 * which the JSX scan above cannot see.
 */
function sentenceLiterals(text, spans, keys) {
  const out = [];
  const re = /"([^"]{12,200})"/g;
  for (let m = re.exec(text); m !== null; m = re.exec(text)) {
    const value = m[1];
    if (value.includes("\n")) continue;
    if (value.split(/\s+/).length < 3) continue;
    if (!/^[A-Z]/.test(value)) continue;
    if (/[{}[\]<>=|&$`;]/.test(value)) continue;
    if (inSpan(spans, m.index)) continue;
    if (keys.has(value)) continue;
    // SQL and format strings are not copy.
    if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER)\b/.test(value)) continue;
    if (/\?\d|::|%s/.test(value)) continue;
    const line = text.slice(0, m.index).split("\n").length;
    out.push({ value, line });
  }
  return out;
}

const keys = dictionaryKeys();
const files = walk(SRC).sort();
const report = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  const scannable = stripComments(text);
  const spans = tCallSpans(text);
  const unwrapped = [
    ...jsxTextNodes(scannable, spans),
    ...textProps(scannable, spans),
    ...sentenceLiterals(scannable, spans, keys),
  ];
  const missing = translatedKeys(text).filter((k) => isReportableKey(k.key) && !keys.has(k.key));
  if (unwrapped.length === 0 && missing.length === 0) continue;
  report.push({ file: relative(ROOT, file).split(sep).join("/"), unwrapped, missing });
}

const json = process.argv.includes("--json");
const byFile = process.argv.includes("--by-file");

if (json) {
  console.log(JSON.stringify(report, null, 2));
} else {
  let unwrappedTotal = 0;
  let missingTotal = 0;
  for (const entry of report) {
    unwrappedTotal += entry.unwrapped.length;
    missingTotal += entry.missing.length;
    if (!byFile) continue;
    console.log(
      `${entry.file}: ${entry.unwrapped.length} unwrapped, ${entry.missing.length} missing`,
    );
    for (const u of entry.unwrapped) console.log(`   not wrapped  ${u.line}: ${u.value}`);
    for (const m of entry.missing) console.log(`   no entry     ${m.line}: ${m.key}`);
  }
  console.log("");
  console.log(`files with work: ${report.length} of ${files.length}`);
  console.log(`not wrapped:     ${unwrappedTotal}`);
  console.log(`missing entries: ${missingTotal}`);
  const uniqueMissing = new Set(report.flatMap((r) => r.missing.map((m) => m.key)));
  console.log(`unique keys missing: ${uniqueMissing.size}`);
  process.exit(unwrappedTotal + missingTotal === 0 ? 0 : 1);
}
