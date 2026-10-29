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
import { readFileSync, readdirSync, statSync } from "node:fs";
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
  // Code-ish: a JSX tag, an expression, an import specifier.
  if (/[<>{}`$=;()[\]]/.test(value)) return false;
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

/** Every `t("...")` and `t('...')` key in a file, with its line. */
function translatedKeys(text) {
  const found = [];
  const re = /\bt\(\s*(["'])((?:(?!\1)[^\\]|\\.)+)\1\s*[,)]/g;
  for (let m = re.exec(text); m !== null; m = re.exec(text)) {
    const line = text.slice(0, m.index).split("\n").length;
    found.push({ key: m[2].replace(/\\"/g, '"'), line, index: m.index });
  }
  return found;
}

/** Literals inside `t()` calls, so they are not also reported as unwrapped. */
function tCallSpans(text) {
  const spans = [];
  for (const call of translatedKeys(text)) {
    const close = text.indexOf(")", call.index);
    spans.push([call.index, close === -1 ? text.length : close]);
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

const keys = dictionaryKeys();
const files = walk(SRC).sort();
const report = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  const spans = tCallSpans(text);
  const unwrapped = [...jsxTextNodes(text, spans), ...textProps(text, spans)];
  const missing = translatedKeys(text).filter((k) => !keys.has(k.key));
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
    console.log(`${entry.file}: ${entry.unwrapped.length} unwrapped, ${entry.missing.length} missing`);
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
