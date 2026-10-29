#!/usr/bin/env node
/**
 * Wraps user-facing literals in `t()` so the dictionary can translate them.
 *
 *   node scripts/i18n-wrap.mjs [--dry] [files...]
 *
 * Two shapes, the same ones `i18n-coverage.mjs` reports:
 *
 *   >Some copy<        a JSX text node  →  >{t("Some copy")}<
 *   title="Copy"       a whitelisted prop  →  title={t("Copy")}
 *
 * Text that already sits inside a `t()` call is left alone, and so is a text
 * node holding anything but words (a tag, an expression, an entity-free run of
 * code). Multi-line text collapses to one line, as JSX renders it.
 *
 * The dictionary is not touched: every new key falls back to the English until
 * `zh.ts` has it, which is what `i18n-coverage.mjs` then reports.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SRC = join(ROOT, "src");
const dry = process.argv.includes("--dry");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));

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

function looksLikeUiText(text) {
  const value = text.trim();
  if (value.length < 2) return false;
  if (!/[A-Za-z]/.test(value)) return false;
  if (/^[a-z0-9_./:#-]+$/.test(value)) return false;
  if (/^(https?:|\/|\.\/|\.\.\/)/.test(value)) return false;
  if (/^[A-Za-z0-9_-]+$/.test(value) && !/^[A-Z]/.test(value)) return false;
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
    if (!name.endsWith(".tsx")) continue;
    if (/\.(dom\.)?test\.(ts|tsx)$/.test(name)) continue;
    out.push(full);
  }
  return out;
}

/** Spans of `t(...)` calls, so what they hold is never wrapped twice. */
function tSpans(text) {
  const spans = [];
  const re = /\bt\(\s*(["'])((?:(?!\1)[^\\]|\\.)+)\1/g;
  for (let m = re.exec(text); m !== null; m = re.exec(text)) {
    const close = text.indexOf(")", m.index);
    spans.push([m.index, close === -1 ? text.length : close]);
  }
  return spans;
}

const inSpan = (spans, i) => spans.some(([s, e]) => i >= s && i <= e);

/** The import line this file needs, from its depth under `src/`. */
function importFor(file) {
  const depth = relative(SRC, file).split(sep).length - 1;
  return `import { t } from "${"../".repeat(depth)}i18n";`;
}

function wrapFile(file, text) {
  const spans = tSpans(text);
  const edits = [];

  // JSX text nodes. A run with a line break collapses the way JSX renders it;
  // one on a single line keeps the spaces around it outside the braces.
  const nodeRe = />([^<>{}]*[A-Za-z][^<>{}]*)</g;
  for (let m = nodeRe.exec(text); m !== null; m = nodeRe.exec(text)) {
    const raw = m[1];
    if (inSpan(spans, m.index)) continue;
    if (!looksLikeUiText(raw)) continue;
    const multiline = raw.includes("\n");
    const core = raw.replace(/\s+/g, " ").trim();
    if (!looksLikeUiText(core)) continue;
    let replacement;
    if (multiline) {
      replacement = `{t(${JSON.stringify(core)})}`;
    } else {
      const lead = raw.match(/^\s*/)[0];
      const trail = raw.match(/\s*$/)[0];
      replacement = `${lead}{t(${JSON.stringify(core)})}${trail}`;
    }
    edits.push({ start: m.index, end: m.index + m[0].length, replacement: `>${replacement}<` });
  }

  // Whitelisted props given a bare string.
  const propRe = new RegExp(
    `\\b(${TEXT_PROPS.join("|")})\\s*=\\s*(["'])((?:(?!\\2)[^\\\\]|\\\\.)*)\\2`,
    "g",
  );
  for (let m = propRe.exec(text); m !== null; m = propRe.exec(text)) {
    if (inSpan(spans, m.index)) continue;
    const value = m[3].replace(/\\"/g, '"').trim();
    if (!looksLikeUiText(value)) continue;
    edits.push({
      start: m.index,
      end: m.index + m[0].length,
      replacement: `${m[1]}={t(${JSON.stringify(value)})}`,
    });
  }

  if (edits.length === 0) return { text, count: 0 };

  // Back to front, so earlier offsets stay valid.
  edits.sort((a, b) => b.start - a.start);
  let out = text;
  let last = Number.POSITIVE_INFINITY;
  let count = 0;
  for (const edit of edits) {
    if (edit.end > last) continue; // overlapping match; leave it to the next run
    out = out.slice(0, edit.start) + edit.replacement + out.slice(edit.end);
    last = edit.start;
    count += 1;
  }

  // Placed before the first import and left for Biome to sort: finding the end
  // of a multi-line import specifier list by hand gets it wrong.
  if (!/from\s+"[^"]*i18n";/.test(out)) {
    const lines = out.split("\n");
    const at = lines.findIndex((l) => /^import\s/.test(l));
    const insertAt = at === -1 ? 0 : at;
    lines.splice(insertAt, 0, importFor(file));
    out = lines.join("\n");
  }

  return { text: out, count };
}

const files = only.length > 0 ? only.map((f) => join(ROOT, f)) : walk(SRC);
let total = 0;
let changed = 0;
for (const file of files.sort()) {
  const before = readFileSync(file, "utf8");
  const { text, count } = wrapFile(file, before);
  if (count === 0) continue;
  total += count;
  changed += 1;
  if (!dry) writeFileSync(file, text);
  console.log(`${relative(ROOT, file).split(sep).join("/")}: ${count}`);
}
console.log(`\n${dry ? "would wrap" : "wrapped"} ${total} literal(s) in ${changed} file(s)`);
