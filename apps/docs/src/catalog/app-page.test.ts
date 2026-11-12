import { describe, expect, it } from "vitest";
import {
  appPageDescription,
  appPageTitle,
  DESCRIPTION_LIMIT,
  DESCRIPTION_SENTENCE,
  TITLE_LIMIT,
} from "./app-page.ts";

describe("appPageTitle", () => {
  it("names the search it answers, with the site's name when it fits", () => {
    const title = appPageTitle({ name: "Cut", pitch: "Short links" }, "Appflare");
    expect(title).toBe("在 Cloudflare 部署 Cut：Short links | Appflare");
    expect(title.length).toBeLessThanOrEqual(TITLE_LIMIT);
  });

  it("leaves the site's name off a title that would be too long", () => {
    const prefix = "在 Cloudflare 部署 OpenSEO：";
    const suffix = " | Appflare";
    const pitch = "搜索".repeat(TITLE_LIMIT).slice(0, TITLE_LIMIT - prefix.length - suffix.length);
    const app = { name: "OpenSEO", pitch };
    // Exactly the title limit including the site's name still fits.
    const atLimit = `${prefix}${pitch}${suffix}`;
    expect(atLimit).toHaveLength(TITLE_LIMIT);
    expect(appPageTitle(app, "Appflare")).toBe(atLimit);
    // One extra character must remove only the site suffix, not the app's pitch.
    const longer = { ...app, pitch: `${pitch}词` };
    expect(appPageTitle(longer, "Appflare")).toBe(`${prefix}${longer.pitch}`);
    expect(appPageTitle(longer, "Appflare")).not.toContain(suffix);
  });
});

describe("appPageDescription", () => {
  it("is the summary, then that it deploys to your own account with Appflare", () => {
    expect(appPageDescription({ summary: "Short links on Workers\nand KV." })).toBe(
      `Short links on Workers and KV. ${DESCRIPTION_SENTENCE}`,
    );
  });

  it("cuts a long summary at a word, keeping the sentence about Appflare", () => {
    const summary =
      "A self-hosted image host: upload, tag, and browse images, with WebP and AVIF copies, expiry, and a public random-image API, on R2, D1, KV, Queues, and Cloudflare Images.";
    const description = appPageDescription({ summary });
    expect(description.length).toBeLessThanOrEqual(DESCRIPTION_LIMIT);
    expect(description.endsWith(`… ${DESCRIPTION_SENTENCE}`)).toBe(true);
    const kept = description.slice(0, description.indexOf("…"));
    expect(summary.startsWith(kept)).toBe(true);
    // Cut at a word, with no comma or space left before the ellipsis.
    expect(kept).toMatch(/[A-Za-z0-9]$/);
    expect(summary.charAt(kept.length)).toMatch(/[\s,]/);
  });

  it("keeps a summary it cannot cut at a word whole", () => {
    const summary = "x".repeat(200);
    expect(appPageDescription({ summary })).toBe(`${summary} ${DESCRIPTION_SENTENCE}`);
  });
});
