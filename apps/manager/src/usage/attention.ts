import type { AccountPlan } from "../account/plan";
import { getLocale, t } from "../i18n";
import { accountLimitWords } from "./account-limits";
import { type PauseCause, pauseCauseSentence } from "./attention-cause";
import {
  count,
  fullCount,
  OTHER_USAGE,
  otherShareShown,
  PERIOD_ADJECTIVE,
  percent,
  productLabel,
  times,
  usd,
} from "./attention-format";
import type { Period } from "./math";

/**
 * Spend protection's rows in Home's "Needs attention": an app using far more
 * than usual, a free daily limit an app used up, a paused app, and a free
 * daily limit about to run out. Read by `readUsageAttention` from what the
 * spend watcher and the pause jobs record; worded here. Client-safe.
 */

/** The order the rows appear in, most urgent first. */
export const USAGE_ATTENTION_ORDER = ["unusual", "limit-used-up", "paused", "limit-near"] as const;
export type UsageAttentionKind = (typeof USAGE_ATTENTION_ORDER)[number];

/** Resuming as it is would only last until the next check: the app is still past its cap. */
export interface StillPastCap {
  /** Dollars per period. */
  amount: number;
  period: Period;
  /** What it spent in the period, when the pause recorded it. */
  spent: number | null;
  /** When the cap's period ends and the cap applies afresh (epoch ms). */
  resetsAt: number;
}

export type UsageAttention =
  | {
      kind: "unusual";
      installId: string;
      plan: AccountPlan;
      /** When the episode began (epoch ms). */
      since: number;
      /** The product furthest above its normal, when the watcher recorded it. */
      product: string | null;
      perHour: number | null;
      /** How many times its normal; null without a normal to compare with. */
      times: number | null;
      /**
       * It had no normal yet (new, or rarely used) and passed the Standard
       * loop level's money bar: "new and using a lot", with no multiple.
       */
      newApp?: boolean;
      /** With `newApp`: installed within the last 7 days, so "new". */
      installedRecently?: boolean;
      /** Dollars an hour at list price; null when not known. */
      burnPerHour: number | null;
      spentToday: number | null;
      /** Free: the share of a free daily limit it is on pace to use today. */
      freeShare: number | null;
      /** The labels of the channels the alert goes to (admins only; empty for members). */
      sentTo: string[];
    }
  | {
      kind: "limit-used-up";
      installId: string;
      product: string;
      /** The account's free amount a day. */
      limit: number;
      /** The app's share of the account's use of it today, when recorded. */
      appShare: number | null;
      /** The share of the account's use not from Appflare's apps, when recorded. */
      otherShare?: number | null;
      /** When the app's unusual usage began, when it is in such an episode. */
      loopSince: number | null;
    }
  | {
      kind: "paused";
      installId: string;
      pausedAt: number;
      /** Who paused it, by name; null when Appflare did. */
      pausedBy: string | null;
      /** Why; null when the pause recorded none that reads. */
      cause: PauseCause | null;
      /** When the app's unusual usage began, when it was in such an episode. */
      loopSince: number | null;
      /** Set when Resume must offer to set the cap aside (see `StillPastCap`). */
      stillPastCap: StillPastCap | null;
    }
  | {
      kind: "limit-near";
      installId: string;
      product: string;
      limit: number;
      /** When it runs out at the current pace (epoch ms). */
      runsOutAt: number;
      appShare: number | null;
      /** The share of the account's use not from Appflare's apps, when recorded. */
      otherShare?: number | null;
    };

/**
 * Workers Free: the whole account used 90% or more of a free daily limit
 * today (account-limits.ts), whatever used it. Not tied to one app.
 */
export interface AccountLimitAttention {
  product: string;
  /** The account's free amount a day. */
  limit: number;
  /** What the whole account used of it today. */
  used: number;
  /** `used` over `limit` (1 or more once it ran out). */
  share: number;
  /** The share of `used` not from Appflare's apps. */
  otherShare: number;
  /** The Appflare app that used most of it, and its share of `used`; null when none. */
  top: { installId: string; share: number } | null;
}

/** The words of the account's row; `topLabel` is what Home calls the top app, null when unknown. */
export function accountLimitAttentionCopy(
  item: AccountLimitAttention,
  topLabel: string | null,
): UsageAttentionCopy {
  const words = accountLimitWords({
    ...item,
    top: item.top === null || topLabel === null ? null : { label: topLabel, share: item.top.share },
  });
  return {
    badge:
      item.share >= 1
        ? { label: t("Limit reached"), variant: "error" }
        : { label: t("Near a free limit"), variant: "warning" },
    title: words.title,
    description: words.description,
  };
}

export interface UsageAttentionCopy {
  /** A badge before the title, for the rows that need action now. */
  badge: { label: string; variant: "error" | "warning" } | null;
  title: string;
  description: string;
}

/** Formats an instant as the reader's clock time ("2:05 PM"). */
export type ClockFormat = (epochMs: number) => string;

/** "A", "A and B", "A, B and C". */
export function listWords(items: readonly string[]): string {
  if (items.length <= 1) return items.join("");
  if (getLocale() === "zh") return `${items.slice(0, -1).join("、")} 和 ${items.at(-1)}`;
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

/** What a used-up free daily limit does, by product. */
function limitEffect(product: string): string {
  return t(
    product === "workers_requests" ? "every app stops answering" : "apps that need them fail",
  );
}

/** After a pause by Appflare: what to do before resuming, by its cause. */
function afterPause(cause: PauseCause | null): string {
  switch (cause?.reason) {
    case "cap":
      return t(
        'Visitors see a "paused" page. Resume it when its cap resets, or change the cap on its Usage tab.',
      );
    case "budget":
      return t(
        'Visitors see a "paused" page. Resume it when the budget allows, or exempt it from the budget on its Usage tab.',
      );
    default:
      return t(
        'Visitors see a "paused" page. Resume when the cause is fixed, for example by undoing the settings change that started it.',
      );
  }
}

/** The words of one row; `label` is what Home calls the app. */
export function usageAttentionCopy(
  item: UsageAttention,
  label: string,
  clock: ClockFormat,
): UsageAttentionCopy {
  switch (item.kind) {
    case "unusual": {
      const normal =
        item.times !== null
          ? t("{times} its normal", { times: times(item.times) })
          : t("far above its normal");
      const rate =
        item.product !== null && item.perHour !== null
          ? t("{rate} since {time}", {
              rate: t("{product} at {amount} an hour", {
                product: t(productLabel(item.product)),
                amount: count(item.perHour),
              }),
              time: clock(item.since),
            })
          : null;
      const noNormal =
        item.installedRecently === true
          ? t("with no usual week yet to compare with")
          : t("with no usual usage to compare against yet");
      const first = item.newApp
        ? rate !== null
          ? t("{rate}, {noNormal}.", { rate, noNormal })
          : t("Since {time}, {noNormal}.", { time: clock(item.since), noNormal })
        : rate !== null
          ? t("{rate}, {normal}.", { rate, normal })
          : t("Since {time}, its usage is {normal}.", {
              time: clock(item.since),
              normal,
            });
      const cost =
        item.plan === "paid" && item.burnPerHour !== null
          ? t(" About {burn} an hour at Cloudflare's prices{spent}.", {
              burn: usd(item.burnPerHour),
              spent:
                item.spentToday === null
                  ? ""
                  : t(", {spent} so far today", { spent: usd(item.spentToday) }),
            })
          : item.plan === "free" && item.freeShare !== null && item.product !== null
            ? t(" At this pace it uses {share} of today's free {product}.", {
                share: percent(item.freeShare),
                product: t(productLabel(item.product)),
              })
            : "";
      const sent =
        item.sentTo.length > 0 ? t(" Sent to {to}.", { to: listWords(item.sentTo) }) : "";
      return {
        badge: { label: t("Unusual usage"), variant: "error" },
        title: item.newApp
          ? item.installedRecently === true
            ? t("{label} is new and already using a lot", { label })
            : t("{label} is already using a lot", { label })
          : t("{label} is using far more than usual", { label }),
        description: `${first}${cost}${sent}`,
      };
    }
    case "limit-used-up": {
      const product = t(productLabel(item.product));
      const limit = t("{count} free {product}", {
        count: fullCount(item.limit),
        product,
      });
      const other = otherShareShown(item.otherShare);
      const shares =
        item.appShare === null
          ? other === null
            ? ""
            : t(", {share} of them by {other}", {
                share: percent(other),
                other: t(OTHER_USAGE),
              })
          : t(", {share} of them by {label}{other}", {
              share: percent(item.appShare),
              label,
              other:
                other === null
                  ? ""
                  : t(" and {share} by {other}", {
                      share: percent(other),
                      other: t(OTHER_USAGE),
                    }),
            });
      const how =
        item.loopSince !== null
          ? t("{label} went into a loop at {time} and used this account's {limit} for today.", {
              label,
              time: clock(item.loopSince),
              limit,
            })
          : t("This account used its {limit} for today{shares}.", { limit, shares });
      return {
        badge: { label: t("Limit reached"), variant: "error" },
        title: t("Today's free {product} are used up", { product }),
        description: `${how} ${t(
          "Cloudflare refuses more until 00:00 UTC, so {effect} until then. The Free plan bills nothing; pausing stops it happening again tomorrow.",
          { effect: limitEffect(item.product) },
        )}`,
      };
    }
    case "paused": {
      if (item.pausedBy !== null) {
        const after =
          item.loopSince !== null && item.loopSince <= item.pausedAt
            ? t(" after unusual usage that began at {time}", {
                time: clock(item.loopSince),
              })
            : "";
        return {
          badge: { label: t("Paused"), variant: "warning" },
          title: t("{label} is paused", { label }),
          description: t(
            '{by} paused it at {time}{after}. Visitors see a "paused" page until it is resumed.',
            { by: item.pausedBy, time: clock(item.pausedAt), after },
          ),
        };
      }
      const why = item.cause === null ? null : pauseCauseSentence(item.cause);
      return {
        badge: { label: t("Paused"), variant: "warning" },
        title: t("Appflare paused {label}", { label }),
        description: `${why === null ? "" : `${why} `}${t("Appflare paused it at {time}.", {
          time: clock(item.pausedAt),
        })} ${afterPause(item.cause)}`,
      };
    }
    case "limit-near": {
      const product = t(productLabel(item.product));
      const other = otherShareShown(item.otherShare);
      const shares =
        item.appShare === null
          ? other === null
            ? ""
            : `${t("{share} of today's {product} is {other}.", {
                share: percent(other),
                product,
                other: t(OTHER_USAGE),
              })} `
          : `${t("{label} is getting {share} of today's {product}{other}.", {
              label,
              share: percent(item.appShare),
              product,
              other:
                other === null
                  ? ""
                  : t("; {share} is {other}", {
                      share: percent(other),
                      other: t(OTHER_USAGE),
                    }),
            })} `;
      return {
        badge: null,
        title: t("Free {product} run out around {time}", {
          product,
          time: clock(item.runsOutAt),
        }),
        description: `${shares}${t(
          "When the account's {count} free {product} for the day are used, {effect} until 00:00 UTC.",
          {
            count: fullCount(item.limit),
            product,
            effect: limitEffect(item.product),
          },
        )}`,
      };
    }
  }
}

/**
 * What the Resume dialog says when the app is still past its cap. `when`
 * formats the reset: a clock time for a daily cap, a day and time otherwise.
 */
export function stillPastCapCopy(
  cap: StillPastCap,
  when: { clock: ClockFormat; dayAndTime: ClockFormat },
): { description: string; body: string } {
  const spent = cap.spent === null ? "" : `${usd(cap.spent)} of `;
  const resets = cap.period === "day" ? when.clock(cap.resetsAt) : when.dayAndTime(cap.resetsAt);
  return {
    description: t("It's still past its {period} cap: {spent}{amount}.", {
      period: t(PERIOD_ADJECTIVE[cap.period]),
      spent,
      amount: usd(cap.amount),
    }),
    body: t(
      "Resumed as it is, auto-pause would pause it again within 5 minutes. Resuming sets the cap aside until it resets at {time}; the loop check keeps running.",
      { time: resets },
    ),
  };
}
