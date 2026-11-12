// @vitest-environment happy-dom
import { MANAGER_OAUTH_SCOPES } from "@appflare/cf-api/oauth";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ScopeList } from "./scope-list.tsx";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root.render(<ScopeList examples={{ d1: ["Mailflare", "ResolveHQ"] }} />));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

const flush = () => act(() => new Promise<void>((resolve) => setTimeout(resolve, 50)));

function why(label: string): HTMLButtonElement {
  const button = container.querySelector<HTMLButtonElement>(
    `button[aria-label="Appflare 为什么需要 ${label}"]`,
  );
  if (button === null) throw new Error(`no 为什么需要？ button for ${label}`);
  return button;
}

/** The open popover's text, or null when none is open. */
const openPopover = () => document.querySelector('[role="dialog"]')?.textContent ?? null;

describe("the 为什么需要？ buttons", () => {
  it("are text buttons named after their permission", () => {
    const d1 = why("D1");
    expect(d1.textContent).toBe("为什么需要？");
    // One per scope Appflare asks for, offline_access included.
    expect(container.querySelectorAll("button")).toHaveLength(MANAGER_OAUTH_SCOPES.length);
  });

  it("open the reason on a tap and close on a tap outside", async () => {
    const d1 = why("D1");
    act(() => d1.focus());
    act(() => d1.click());
    await flush();
    expect(openPopover()).toBe(
      "允许 Appflare 创建应用数据库、随应用版本更新数据库，并在你要求时恢复数据。 使用此权限的应用示例：Mailflare、ResolveHQ。Cloudflare 权限： d1.write",
    );
    // The row itself shows only the name and 为什么需要？.
    expect(d1.closest("li")?.textContent).toBe("D1为什么需要？");
    act(() => {
      document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      document.body.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      document.body.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flush();
    expect(openPopover()).toBeNull();
  });

  it("open from the keyboard, close on Escape, and give the focus back to the button", async () => {
    const zone = why("Zone");
    act(() => zone.focus());
    act(() => {
      zone.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      zone.click();
    });
    await flush();
    expect(openPopover()).toContain("列出账户中的域名，让你选择 Appflare 或应用使用的域名");
    act(() => {
      (document.activeElement ?? document.body).dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });
    await flush();
    expect(openPopover()).toBeNull();
    expect(document.activeElement).toBe(zone);
  });
});
