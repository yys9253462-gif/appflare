/**
 * The manager's copy, in Chinese.
 *
 * The dictionary (`zh.ts`) is keyed by the English text the components already
 * carry, so a string that has no entry yet falls back to English and a page
 * never shows a raw key. Translations are applied where text is rendered
 * (`t(item.label)`, not `label: t("Home")` in a module constant), which keeps
 * the constants themselves plain and the render the only place that knows the
 * locale.
 *
 * The default is Chinese on the server too, so the first paint is already
 * translated. `setLocale("en")` turns translation off, which is what the
 * component tests do: they assert on the English copy this fork keeps.
 */

import { ZH } from "./zh";

export type Locale = "en" | "zh";

/** Chinese unless something turns it off: this fork serves a Chinese audience. */
let current: Locale = "zh";

export function setLocale(locale: Locale): void {
  current = locale;
}

export function getLocale(): Locale {
  return current;
}

/** The `lang` of the document, for `<html lang>` and for `Intl`. */
export function htmlLang(): string {
  return current === "zh" ? "zh-CN" : "en";
}

function interpolate(text: string, params?: Record<string, string | number>): string {
  if (params === undefined) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = params[name];
    return value === undefined ? match : String(value);
  });
}

/**
 * `source` in the current locale. Placeholders are `{name}` and are filled
 * from `params`; a translated entry keeps them as they are in English.
 */
export function t(source: string, params?: Record<string, string | number>): string {
  const translated = current === "zh" ? ZH[source] : undefined;
  return interpolate(translated ?? source, params);
}
