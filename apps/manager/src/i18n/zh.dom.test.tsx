import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ManagerStatus } from "../installs/pending-updates";
import type { Viewer } from "../server/session.functions";
import { setLocale } from "./index";

/**
 * The signed-in shell's navigation, in both locales. The dictionary is keyed by
 * the English copy, so this also holds the two in step: a nav label renamed in
 * `app-shell.tsx` loses its translation here rather than showing a stale one.
 */
vi.mock("@tanstack/react-router", () => ({
  useLocation: () => ({ pathname: "/", hash: "" }),
  useMatches: ({ select }: { select: (matches: unknown[]) => unknown }) => select([]),
  useRouter: () => ({ navigate: vi.fn(), subscribe: () => () => {} }),
}));
vi.mock("../home/use-attention", () => ({ useHomeClick: () => () => {} }));
vi.mock("../components/account-menu", () => ({ AccountMenu: () => null }));
vi.mock("../components/appflare-card", () => ({
  AppflareCard: () => null,
  AppflareVersion: () => null,
}));
vi.mock("../components/settings-nav", () => ({ SettingsNavItem: () => null }));

const { AppShell } = await import("../components/app-shell");

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  localStorage.clear();
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  document.body.innerHTML = "";
  setLocale("en");
});

function render() {
  act(() =>
    root.render(
      <AppShell
        viewer={{ role: "admin" } as Viewer}
        manager={{} as ManagerStatus}
        removedApps={0}
        apps={[]}
        badge={{ count: 0, label: "" }}
      >
        <p>Page</p>
      </AppShell>,
    ),
  );
}

describe("the navigation in Chinese", () => {
  it("shows the English copy while the locale is English", () => {
    render();
    expect(container.textContent).toContain("Home");
    expect(container.textContent).toContain("Catalog");
    expect(container.textContent).toContain("Jobs");
  });

  it("shows the Chinese copy once the locale is Chinese", () => {
    setLocale("zh");
    render();
    expect(container.textContent).toContain("首页");
    expect(container.textContent).toContain("应用中心");
    expect(container.textContent).toContain("任务");
  });
});
