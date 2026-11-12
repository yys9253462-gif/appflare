import {
  categoryLabel,
  dateBuildDay,
  declaredServices,
  formatCount,
  licenseBadgeCopy,
  PLAN_STATS,
  serviceName,
  serviceNeedWords,
} from "@appflare/schema/catalog-display";
import { zhLabel } from "../lib/zh.ts";
import type { SiteApp } from "./site-catalog.ts";

/**
 * What an app's page says, worked out from the catalog so the page stays a
 * thin view, in the words Appflare's own catalog page uses. Written for
 * people who are not developers: plain words first, the exact detail only in
 * a tooltip.
 */

/** A day as the pages show it: "Sep 26", with the year only when it is not the year of `now`. */
export function shortDate(iso: string, now: Date): string {
  const date = new Date(iso);
  const sameYear = date.getUTCFullYear() === now.getUTCFullYear();
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
    // The site is built once for everyone, so it reads days in UTC.
    timeZone: "UTC",
  }).format(date);
}

/** A day with its year: "Sep 26, 2026". */
export function longDate(iso: string): string {
  return new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeZone: "UTC" }).format(
    new Date(iso),
  );
}

/** One figure of the stat strip under the app's name. */
export interface AppStat {
  id: "stars" | "installs" | "plan" | "license" | "version" | "tested";
  label: string;
  value: string;
  /** Muted words next to the value ("Source-available"), or null. */
  caption: string | null;
  /** The sentence behind the figure, shown on hover. */
  tooltip: string;
  tone: "default" | "warning";
}

function installsStat(app: SiteApp): AppStat | null {
  const p = app.popularity;
  if (p === null || !p.installsKnown) return null;
  const base = { id: "installs", label: "安装量", caption: null, tone: "default" } as const;
  if (p.activeInstalls !== null) {
    return {
      ...base,
      value: formatCount(p.activeInstalls),
      tooltip: `根据匿名使用数据，有 ${p.activeInstalls.toLocaleString("zh-CN")} 位用户运行此应用。`,
    };
  }
  if (p.installs30d !== null) {
    return {
      ...base,
      value: formatCount(p.installs30d),
      tooltip: `根据匿名使用数据，最近 30 天有 ${p.installs30d.toLocaleString("zh-CN")} 位用户安装此应用。`,
    };
  }
  return {
    ...base,
    value: "少于 10",
    tooltip: "匿名使用数据中，运行此应用的用户少于 10 位；为保护隐私不公布具体数量。",
  };
}

/**
 * The strip, in order: stars, installs, plan, license, version, last tested.
 * Stars and installs show only when the catalog's numbers were fresh when
 * the site was built.
 */
export function appStats(app: SiteApp, now: Date): AppStat[] {
  const stats: AppStat[] = [];
  const stars = app.popularity?.stars ?? null;
  // A count of zero says nothing worth the space.
  if (stars !== null && stars > 0) {
    stats.push({
      id: "stars",
      label: "星标",
      value: formatCount(stars),
      caption: null,
      tooltip: `此应用的 GitHub 仓库有 ${stars.toLocaleString("zh-CN")} 个星标。`,
      tone: "default",
    });
  }
  const installs = installsStat(app);
  if (installs !== null) stats.push(installs);
  stats.push({
    id: "plan",
    label: "套餐",
    caption: null,
    tone: "default",
    ...PLAN_STATS[app.plan],
  });
  const copy = licenseBadgeCopy(app.license);
  stats.push({
    id: "license",
    label: "许可证",
    value: copy.label,
    caption: copy.prefix,
    tooltip: copy.tooltip,
    tone: copy.variant === "warning" ? "warning" : "default",
  });
  const day = dateBuildDay(app.version);
  stats.push({
    id: "version",
    label: "版本",
    // A date build reads as its day; the full string is in the tooltip.
    value: day === null ? app.version : shortDate(`${day}T00:00:00Z`, now),
    caption: null,
    tooltip: `版本 ${app.version}。`,
    tone: "default",
  });
  stats.push(
    app.lastVerified === null
      ? {
          id: "tested",
          label: "最近测试",
          value: "尚未测试",
          caption: null,
          tooltip: "目录尚未在测试账户中安装此版本。",
          tone: "default",
        }
      : {
          id: "tested",
          label: "最近测试",
          value: shortDate(app.lastVerified, now),
          caption: null,
          tooltip: `目录于 ${longDate(app.lastVerified)} 在测试账户安装此版本，并确认其正常响应。`,
          tone: "default",
        },
  );
  return stats;
}

/** One line of "What it needs on your account". */
export interface NeedItem {
  key: string;
  name: string;
  /**
   * "This app needs it", "This app uses it", or for Cloudflare Access an app
   * needs only while protected, "Only if you protect it"; null in the plain list.
   */
  words: string | null;
}

export interface AccountNeeds {
  items: NeedItem[];
  /** A quiet line under the list, when it may be incomplete. */
  note: string | null;
}

/** Why an app that needs Cloudflare Access only while protected lists it. */
export const ACCESS_IF_PROTECTED_WORDS = "仅在开启访问保护时需要";

/** A requirement without a service of its own, spelled out from its id. */
function requirementName(requirement: string): string {
  const name = serviceName(requirement);
  if (name !== null) return name;
  return requirement.charAt(0).toUpperCase() + requirement.slice(1).replaceAll("-", " ");
}

/**
 * Everything the app counts on in a Cloudflare account: Workers Paid when it
 * needs it, then each service. A service its `requires` names reads "This app
 * needs it"; one the catalog worked out from the app's bindings reads "This
 * app uses it". An index row that does not list the services gives the plain
 * list of requirements.
 */
export function accountNeeds(app: SiteApp): AccountNeeds {
  const items: NeedItem[] = [];
  if (app.plan === "paid") {
    items.push({ key: "plan", name: "Workers 付费套餐", words: zhLabel(serviceNeedWords(true)) });
  }
  const declared: ReadonlySet<string> = declaredServices(app.requires);
  // A requirement the services leave out still gets its line.
  const ids = [...new Set([...app.services, ...declared])];
  for (const id of ids) {
    const name = serviceName(id);
    if (name === null) continue;
    const words =
      id === "access" && app.accessIfProtected
        ? ACCESS_IF_PROTECTED_WORDS
        : zhLabel(serviceNeedWords(declared.has(id)));
    items.push({ key: id, name, words });
  }
  for (const requirement of app.requires) {
    if (serviceName(requirement) !== null) continue;
    items.push({ key: requirement, name: requirementName(requirement), words: null });
  }
  return { items, note: needsNote(app) };
}

function needsNote(app: SiteApp): string | null {
  if (app.tier === "self-deploying") {
    return "由应用自己的安装程序创建所需资源；此处列出其令牌允许的操作。";
  }
  if (app.tier === "sandbox") return "应用在你的账户中构建，其余要求将在构建后确认。";
  return null;
}

/** One entry of the Links section. */
export interface AppLink {
  kind: "repository" | "website";
  label: string;
  href: string;
  /** Where it goes, shortened ("github.com/acme/cut"). */
  detail: string;
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** The source code, and the website unless it is the repository. */
export function appLinks(app: Pick<SiteApp, "repo" | "homepage">): AppLink[] {
  const repoUrl = `https://github.com/${app.repo}`;
  const links: AppLink[] = [
    { kind: "repository", label: "源代码", href: repoUrl, detail: `github.com/${app.repo}` },
  ];
  if (app.homepage.replace(/\/$/, "") !== repoUrl) {
    links.push({
      kind: "website",
      label: "官方网站",
      href: app.homepage,
      detail: hostOf(app.homepage),
    });
  }
  return links;
}

/** A person's links: website, GitHub, X, where given. */
export function authorLinks(author: SiteApp["authors"][number]): Array<{
  label: string;
  href: string;
}> {
  const links: Array<{ label: string; href: string }> = [];
  if (author.url !== undefined) links.push({ label: hostOf(author.url), href: author.url });
  if (author.github !== undefined) {
    links.push({ label: "GitHub", href: `https://github.com/${author.github}` });
  }
  if (author.x !== undefined) {
    links.push({ label: "X (Twitter)", href: `https://x.com/${author.x}` });
  }
  return links;
}

/** A GitHub login as the catalog's maintainers list it. */
const GITHUB_LOGIN = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;

/** A maintainer's name and, for a GitHub login, their profile. */
export function maintainerProfile(handle: string): { label: string; href: string | null } {
  const login = handle.replace(/^@/, "");
  return GITHUB_LOGIN.test(login)
    ? { label: login, href: `https://github.com/${login}` }
    : { label: handle, href: null };
}

/** Past this many characters search results cut a title, so the site's name is left off. */
export const TITLE_LIMIT = 70;

/**
 * The page title, as people search for it: `"Deploy <Name> on Cloudflare:
 * <tagline> | Appflare"`, without ` | Appflare` when that makes it longer
 * than {@link TITLE_LIMIT} characters.
 */
export function appPageTitle(app: Pick<SiteApp, "name" | "pitch">, siteName: string): string {
  const title = `在 Cloudflare 部署 ${app.name}：${app.pitch}`;
  const full = `${title} | ${siteName}`;
  return full.length > TITLE_LIMIT ? title : full;
}

/** Past this many characters search results cut a description. */
export const DESCRIPTION_LIMIT = 160;

/** What the description adds after the app's summary. */
export const DESCRIPTION_SENTENCE = "使用 Appflare 部署到你自己的 Cloudflare 账户。";

/**
 * The meta description: the app's summary, then {@link DESCRIPTION_SENTENCE}.
 * When both do not fit in {@link DESCRIPTION_LIMIT} characters, the summary
 * is cut at a word and ends in "…", so the sentence about Appflare still
 * shows in search results.
 */
export function appPageDescription(app: Pick<SiteApp, "summary">): string {
  const summary = app.summary.replace(/\s+/g, " ").trim();
  const full = `${summary} ${DESCRIPTION_SENTENCE}`;
  if (full.length <= DESCRIPTION_LIMIT) return full;
  // Room for the summary, the ellipsis, a space and the sentence.
  const room = DESCRIPTION_LIMIT - DESCRIPTION_SENTENCE.length - 2;
  const atWord = summary.slice(0, room + 1).lastIndexOf(" ");
  // A summary with no space to cut at is kept whole.
  if (atWord <= 0) return full;
  const shortened = summary.slice(0, atWord).replace(/[\s,;:.–—-]+$/u, "");
  return `${shortened}… ${DESCRIPTION_SENTENCE}`;
}

/** The categories as the page lists them, with labels. */
export function appCategories(
  app: Pick<SiteApp, "categories">,
): Array<{ id: string; label: string }> {
  return app.categories.map((id) => ({ id, label: zhLabel(categoryLabel(id)) }));
}
