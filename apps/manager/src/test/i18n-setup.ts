import { setLocale } from "../i18n";

/**
 * The component tests assert on the English copy (`expect(... "Home")`), which
 * the fork keeps as the source language: the dictionary is keyed by it. So the
 * `dom` project runs with translation off; only the app itself, whose default
 * is Chinese, renders the translation.
 */
setLocale("en");
