import { categoryLabel } from "@appflare/schema/catalog-display";
import { zhLabel } from "../lib/zh.ts";
import type { SiteCatalog, SiteCategory } from "./site-catalog.ts";
import { appPath, appsPath, categoryPath } from "./urls.ts";

/**
 * The words each catalog page is found by: its title, its description, and
 * the OpenGraph card drawn for it. The routes, the sitemap, `llms.txt` and
 * the search index all read them here, so they never disagree.
 */

export const appsPageTitle = "应用中心";
export const appsPageDescription =
  "通过 Appflare 将应用安装到你自己的 Cloudflare 账户。应用由你掌控，在你的账户中运行。";

export function categoryTitle(category: Pick<SiteCategory, "id">): string {
  return `${zhLabel(categoryLabel(category.id))}应用`;
}

export function categoryDescription(category: Pick<SiteCategory, "id" | "count">): string {
  return `共 ${category.count} 个${zhLabel(categoryLabel(category.id))}应用，可通过 Appflare 安装到你自己的 Cloudflare 账户。`;
}

/** One catalog page, as the site's indexes list it. */
export interface CatalogPageEntry {
  url: string;
  title: string;
  description: string;
}

/** Every catalog page: the apps page, then the apps by name, then the categories. */
export function catalogPageEntries(catalog: Pick<SiteCatalog, "apps" | "categories">): {
  apps: CatalogPageEntry;
  appPages: CatalogPageEntry[];
  categoryPages: CatalogPageEntry[];
} {
  return {
    apps: { url: appsPath, title: appsPageTitle, description: appsPageDescription },
    appPages: [...catalog.apps]
      .sort((a, b) => a.name.localeCompare(b.name, "en"))
      .map((app) => ({ url: appPath(app.slug), title: app.name, description: app.pitch })),
    categoryPages: catalog.categories.map((category) => ({
      url: categoryPath(category.id),
      title: categoryTitle(category),
      description: categoryDescription(category),
    })),
  };
}
