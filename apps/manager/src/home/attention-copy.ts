import { RECONNECT_COPY } from "../cloudflare/connection-view";
import { t } from "../i18n";
import {
  accountLimitAttentionCopy,
  type ClockFormat,
  usageAttentionCopy,
} from "../usage/attention";
import type { AttentionItem, FailedJob } from "./attention";

/**
 * The words of each "Needs attention" row: a title that says what happened
 * to what, and one line on why it matters or what to do. Written for people
 * who own the account, not for developers: no Worker names, ids or codes.
 */

/** What a failed job was doing, as the start of a sentence about the app. */
export function failedJobTitle(
  job: Pick<FailedJob, "kind" | "restore" | "deleteRetained" | "version">,
  label: string,
): string {
  if (job.kind === "rollback" && job.restore)
    return t("Restoring the database of {label} did not finish", { label });
  if (job.kind === "uninstall" && job.deleteRetained) {
    return t("Deleting the kept data of {label} did not finish", { label });
  }
  switch (job.kind) {
    case "install":
      return t("Installing {label} did not finish", { label });
    case "update":
      return job.version === null
        ? t("Updating {label} did not finish", { label })
        : t("Updating {label} to {version} did not finish", { label, version: job.version });
    case "uninstall":
      return t("Removing {label} did not finish", { label });
    case "rollback":
      return t("Rolling back {label} did not finish", { label });
    case "reconfigure":
      return t("Saving the settings of {label} did not finish", { label });
    case "pause":
      return t("Pausing {label} did not finish", { label });
    case "resume":
      return t("Resuming {label} did not finish", { label });
    default:
      return t("A change to {label} did not finish", { label });
  }
}

/** What happens next after a failed job, in one line. */
function failedJobLine(job: FailedJob): string {
  switch (job.kind) {
    case "update":
    case "reconfigure":
    case "rollback":
      return t("The app keeps running as it was. The log shows the step that failed and why.");
    case "pause":
      return t(
        "It may still be running and using Cloudflare. The log shows the step that failed and why.",
      );
    case "resume":
      return t(
        "It stays paused; resume it again to carry on. The log shows the step that failed and why.",
      );
    default:
      return t("The log shows the step that failed and why.");
  }
}

const shortTime = new Intl.DateTimeFormat(undefined, { timeStyle: "short" });

/** A clock time in the reader's time zone ("2:05 PM"). */
export function readerClock(epochMs: number): string {
  return shortTime.format(new Date(epochMs));
}

export function attentionCopy(
  item: AttentionItem,
  /** How a spend protection row says a time; the reader's clock by default. */
  clock: ClockFormat = readerClock,
): { title: string; description: string } {
  switch (item.kind) {
    case "usage": {
      const { title, description } = usageAttentionCopy(item.usage, item.label, clock);
      return { title, description };
    }
    case "account-usage": {
      const { title, description } = accountLimitAttentionCopy(item.limit, item.topLabel);
      return { title, description };
    }
    case "connection":
      return { title: RECONNECT_COPY.title, description: RECONNECT_COPY.description };
    case "failed-job":
      return { title: failedJobTitle(item.job, item.label), description: failedJobLine(item.job) };
    case "not-responding":
      return {
        title: t("{label} is not responding", { label: item.label }),
        description:
          item.health === "unhealthy"
            ? t("It answered its last check with an error.")
            : t("It did not answer its last check. It may still have been starting up."),
      };
    case "access-required":
      return {
        title: t("{label} must run behind Cloudflare Access", { label: item.label }),
        description: t(
          "The catalog now says this app must run behind Cloudflare Access. Appflare never protects it on its own, and holds its updates until it is protected.",
        ),
      };
    case "update": {
      const youHave = t("You have {version}.", { version: item.version });
      return {
        title: item.reinstall
          ? t("{label} {version} takes a reinstall", {
              label: item.label,
              version: item.latestVersion,
            })
          : t("{label} {version} is available", {
              label: item.label,
              version: item.latestVersion,
            }),
        description: item.needs === null ? youHave : `${youHave} ${item.needs}`,
      };
    }
    case "account":
      return {
        title: item.row.name,
        description: item.row.found === null ? item.row.why : `${item.row.found}. ${item.row.why}`,
      };
    case "deploy-copy":
      return {
        title: t("Clean up the deploy copy"),
        description: t(
          "The Deploy to Cloudflare button left a copy of Appflare connected to this account. A push to it would put that older Appflare back.",
        ),
      };
    case "downgrade":
      return {
        title: t("This Appflare ({version}) is older than its database", {
          version: item.downgrade.version,
        }),
        description: t(
          "A newer version set up this database, and an older one now runs{after}. Appflare keeps working, but what the newer version added is missing until you update again.",
          {
            after: item.downgrade.deployButton
              ? t(", perhaps after a push to the deploy copy")
              : "",
          },
        ),
      };
  }
}
