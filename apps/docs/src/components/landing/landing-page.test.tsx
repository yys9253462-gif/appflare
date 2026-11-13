import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { siteCatalog } from "../../catalog/data.ts";
import { installLink } from "../../lib/install-links.ts";
import { landingData } from "../../lib/landing.ts";
import { LandingContent } from "./landing-page.tsx";

const data = landingData(siteCatalog);
const html = renderToStaticMarkup(<LandingContent data={data} />);

describe("the front page", () => {
  it("renders its navigation and introductory copy in Chinese", () => {
    expect(html).toContain("在自己的 Cloudflare 账户里管理应用");
    expect(html).toContain("浏览应用");
    expect(html).toContain("三个步骤，在浏览器里完成");
    expect(html).toContain("自己的账户，自己的应用，持续更新。");
    expect(html).not.toContain("The app manager for your own Cloudflare account");
  });
  it("leads with Install Appflare, the deploy page, twice", () => {
    const installs = [
      ...html.matchAll(/<a[^>]*href="(https:\/\/cf\.hejige\.com\/deploy\/\?[^"]*)"[^>]*>/g),
    ];
    expect(installs).toHaveLength(2);
    expect(html.indexOf(installLink("home-hero-install").replaceAll("&", "&amp;"))).toBeLessThan(
      html.indexOf('<img src="/screenshots/landing-home.png"'),
    );
    expect(installs[0]?.[1]).not.toBe(installs[1]?.[1]);
  });

  it("keeps Cloudflare's Deploy button as a quiet second way, after each Install button", () => {
    const deploy = installLink("home-hero-cloudflare", true).replaceAll("&", "&amp;");
    expect(html).toContain(deploy);
    expect(html.indexOf(deploy)).toBeGreaterThan(html.indexOf("home-hero-install"));
    expect(html).toContain("Cloudflare 部署按钮");
    expect(html).not.toContain("deploy.workers.cloudflare.com/button");
  });

  it("links to the documentation where it starts", () => {
    expect(html).toMatch(/<a[^>]*href="\/start\/overview\/"[^>]*>阅读文档<\/a>/);
  });

  it("offers no prompt for a coding agent", () => {
    expect(html).not.toContain("Copy prompt");
    expect(html).not.toContain("/agent/");
    expect(html).not.toMatch(/with an agent/i);
  });

  it("points at the button with a drawing that loads nothing and that screen readers skip", () => {
    const svg = /<svg[^>]*viewBox="0 0 250 120"[^>]*>[\s\S]*?<\/svg>/.exec(html)?.[0] ?? "";
    expect(svg).not.toBe("");
    expect(svg).toMatch(/aria-hidden="true"/);
    expect(svg).toContain('stroke="currentColor"');
    expect(svg).toContain("点击这里安装");
    expect(svg).toMatch(/<text[^>]*font-family="system-ui, sans-serif"/);
    expect(svg).not.toMatch(/<image\b|<style\b|https?:\/\//);
  });

  it("shows the whole manager, sidebar included, as the hero", () => {
    expect(html).toMatch(
      /<img[^>]*src="\/screenshots\/landing-home.png"[^>]*width="2880"[^>]*height="1800"/,
    );
  });

  it("serves each screenshot as smaller WebP copies, the hero first of all", () => {
    const shots = [...html.matchAll(/<img[^>]*src="\/screenshots\/[^"]+"[^>]*>/g)].map((m) => m[0]);
    expect(shots.length).toBeGreaterThan(0);
    for (const shot of shots) {
      // Built, the copies are `/assets/<name>-<hash>.webp`; in a test, imagetools' own addresses.
      expect(shot).toMatch(/srcSet="[^" ]+ \d+w, [^"]+"/);
      expect(shot).toMatch(/sizes="[^"]+"/);
    }
    const hero = shots.find((shot) => shot.includes("landing-home.png"));
    expect(hero).toMatch(/loading="eager"/);
    expect(hero).toMatch(/fetchPriority="high"/);
  });

  it("opens the hero larger, in the lightbox, rather than leaving it a dead click", () => {
    const link = /<a[^>]*href="\/screenshots\/landing-home.png"[^>]*>([\s\S]*?)<\/a>/.exec(html);
    expect(link?.[0]).toMatch(/aria-haspopup="dialog"/);
    expect(link?.[1]).toMatch(/<img[^>]*src="\/screenshots\/landing-home.png"[^>]*alt="Appflare/);
    expect(link?.[1]).toContain("点击查看大图。");
  });

  it("links each app icon under How it works to the app's page", () => {
    const step = html.slice(html.indexOf("安装应用"), html.indexOf("保持更新"));
    const icons = [...step.matchAll(/<a[^>]*href="(\/apps\/[^"]+)"[^>]*aria-label="([^"]+)"/g)];
    expect(icons.map((m) => m[1])).toEqual(
      data.showcase.slice(0, 6).map((app) => `/apps/${app.slug}/`),
    );
    expect(icons.map((m) => m[2])).toEqual(data.showcase.slice(0, 6).map((app) => app.name));
  });

  it("names automatic updates, for apps and for Appflare itself", () => {
    expect(html).toContain("自动更新");
    expect(html).toContain('href="/guides/updates/#automatic-updates"');
    expect(html).toContain("Appflare 也可以用同样的方式更新自己");
  });

  it("says what Appflare does when an app runs up the bill, with the guide and a picture", () => {
    const card = /<a[^>]*href="\/guides\/spend-protection\/"[^>]*>([\s\S]*?)<\/a>/.exec(html)?.[1];
    expect(card).toContain("花费保护");
    expect(card).toContain("自动暂停默认关闭");
    expect(card).toContain("美元金额按 Cloudflare 标价估算");
    expect(card).toMatch(
      /<img[^>]*src="\/screenshots\/landing-spend.png"[^>]*width="1672"[^>]*height="1060"/,
    );
  });

  it("quotes the catalog's own numbers and links each app shown", () => {
    expect(html).toContain(`${data.apps} 个应用，随时安装`);
    for (const app of data.showcase) expect(html).toContain(`href="/apps/${app.slug}/"`);
  });

  it("has a footer of its own that links to the privacy page", () => {
    const footer = html.slice(html.lastIndexOf("<footer"));
    expect(footer).toContain('href="/privacy/"');
    expect(footer).toContain("没有隶属、背书或赞助关系");
  });
});

describe("landingData", () => {
  it("counts the catalog and picks apps with an icon, the most stars first", () => {
    expect(data.apps).toBe(siteCatalog.apps.length);
    expect(data.categories).toBe(siteCatalog.categories.length);
    expect(data.freePlan).toBe(siteCatalog.apps.filter((app) => app.plan === "free").length);
    const stars = data.showcase.map(
      (shown) => siteCatalog.apps.find((app) => app.slug === shown.slug)?.popularity?.stars ?? 0,
    );
    expect(stars).toEqual([...stars].sort((a, b) => b - a));
    expect(data.showcase.every((app) => app.icon !== "")).toBe(true);
  });

  it("shows at most the number it is asked for", () => {
    expect(landingData(siteCatalog, 2).showcase.length).toBeLessThanOrEqual(2);
  });

  it("keeps app names and localises the category captions", () => {
    const result = landingData({
      ...siteCatalog,
      apps: siteCatalog.apps.slice(0, 1).map((app) => ({
        ...app,
        categories: ["analytics"],
        icon: app.icon ?? "/test-icon.svg",
      })),
      categories: [{ id: "analytics", label: "Analytics", count: 1 }],
    });
    expect(result.showcase[0]?.name).toBe(siteCatalog.apps[0]?.name);
    expect(result.showcase[0]?.category).toBe("网站分析");
  });
});
