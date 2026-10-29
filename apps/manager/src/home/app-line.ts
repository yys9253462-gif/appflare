import { sinceDay } from "../catalog/storefront";
import { t } from "../i18n";
import type { AppSignal } from "./attention";

/**
 * The one quiet line under an app's name on its Home card: what state it is
 * in, in words ("Running · 0.3.0 · updated 3 days ago", "Update available",
 * "Not responding"). Client-safe.
 */
export function appLine(
  app: { status: string; version: string; updatedAt: string },
  /** The app's most severe "Needs attention" row, if any (`appSignals`). */
  signal: AppSignal | undefined,
  now: Date,
): string {
  switch (app.status) {
    case "installing":
      return t("Installing");
    case "updating":
      return t("Updating");
    case "failed":
      return t("Install did not finish");
    case "uninstalling":
      return t(signal === "failed" ? "Removal did not finish" : "Being removed");
  }
  if (signal === "unusual-usage") return t("Using far more than usual");
  if (signal === "limit-used-up") return t("Used up a free daily limit");
  if (signal === "paused") return t("Paused");
  if (signal === "not-responding") return t("Not responding");
  if (signal === "failed") return t("Last change did not finish");
  if (signal === "update") return t("Update available");
  if (signal === "reinstall") return t("New version takes a reinstall");
  return t("Running · {version} · updated {when}", {
    version: app.version,
    when: sinceDay(app.updatedAt, now),
  });
}
