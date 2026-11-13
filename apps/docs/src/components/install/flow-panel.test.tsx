import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { FlowPage, FlowState, FlowView } from "../../install/flow.ts";
import { FlowPanel, keepLine } from "./flow-panel.tsx";

const origin = "https://appflare.example.com";
const apps = [{ slug: "2fa", name: "2FA" }];
const installPage: FlowPage = {
  page: "install",
  request: { kind: "app", slug: "2fa" },
  catalogApp: null,
};

function render(
  view: FlowView,
  context: FlowPage = installPage,
  canRemember = true,
  forwarding = true,
) {
  const state: FlowState = { context, canRemember, view };
  return renderToStaticMarkup(
    <FlowPanel state={state} dispatch={() => {}} apps={apps} forwarding={forwarding} />,
  );
}

/** Visible text, roughly: tags removed. */
function text(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, " ")
    .replace(/ ([,.:])/g, "$1");
}

describe("FlowPanel", () => {
  it("shows where a remembered visitor is going, with the link and Change", () => {
    const html = render({
      step: "opening",
      origin,
      target: `${origin}/install/2fa`,
      remembered: true,
    });
    expect(html).toContain("正在你的 Appflare 中打开，地址：");
    expect(html).toMatch(new RegExp(`<strong[^>]*>${origin.replaceAll(".", "\\.")}</strong>`));
    // The full address of the page is there on demand, not in the sentence.
    const details = html.slice(html.indexOf("<details"), html.indexOf("</details>"));
    expect(details).toContain("<summary");
    expect(details).toContain(`href="${origin}/install/2fa"`);
    expect(html.split("/install/2fa").length - 1).toBe(2);
    expect(html).toContain(">更换<");
  });

  it("waits for a click when the visitor came back", () => {
    const html = render(
      { step: "opening", origin, target: `${origin}/install/2fa`, remembered: true },
      installPage,
      true,
      false,
    );
    expect(html).toContain("你的 Appflare 地址：");
    expect(html).toContain(">在你的 Appflare 中打开<");
  });

  it("asks a first-time visitor, and says when nothing can be remembered", () => {
    const html = render({ step: "ask" });
    expect(html).toContain("你已经安装 Appflare 了吗？");
    expect(html).toContain("输入它的地址");
    expect(html).toContain("安装 Appflare");
    expect(html).toContain("打开 2FA");
    expect(html).not.toContain("不允许网站记住");
    expect(render({ step: "ask" }, installPage, false)).toContain("不允许网站记住你的 Appflare");
  });

  it("sends an app along to the install from the browser, which installs it right after", () => {
    const html = render({ step: "get", intentSaved: true });
    expect(html).toContain('href="/deploy/?app=2fa"');
    expect(html).not.toContain("https://cf.hejige.com/deploy/?");
    expect(text(html)).toContain(
      "在浏览器中安装 Appflare，完成设置后会自动打开 2FA，供你确认安装。",
    );
    expect(text(html)).toContain("通过其他方式安装？准备好后");
  });

  it("keeps the short link for a repository, which a new Appflare cannot build yet", () => {
    const repoPage: FlowPage = {
      page: "install",
      request: { kind: "repo", repo: "o/r" },
      catalogApp: null,
    };
    const html = render({ step: "get", intentSaved: true }, repoPage);
    expect(html).toContain("https://cf.hejige.com/deploy/?");
    expect(html).not.toContain("/deploy/?app=");
    expect(text(html)).toContain("请选择以下方式安装：");
    expect(text(html)).toContain("准备好后");
    expect(text(html)).not.toContain("通过其他方式安装？");
  });

  it("offers the install from the browser first, then Cloudflare 部署按钮, then the way back", () => {
    const html = render({ step: "get", intentSaved: true });
    const browser = html.indexOf('href="/deploy/?app=2fa"');
    const deploy = html.indexOf("https://deploy.workers.cloudflare.com/");
    expect(browser).toBeGreaterThan(-1);
    expect(deploy).toBeGreaterThan(browser);
    expect(html).toContain(">安装 Appflare<");
    // The command line is one of the other ways, on the install page.
    expect(html).not.toContain("npx create-appflare");
    expect(html).toContain('href="/start/install/"');
    expect(html).not.toContain("deploy.workers.cloudflare.com/button");
    expect(html).toContain("install-get-appflare-install");
    expect(html).toContain("install-get-appflare-cloudflare");
    expect(html).toContain("账户 › 在 cf.hejige.com 上使用这个 Appflare");
    expect(html).toContain("保存 2FA 的安装信息 7 天");
  });

  it("promises 7 days only in the browser that keeps the app", () => {
    const x = { kind: "in-app", app: "X", platform: "ios" } as const;
    expect(keepLine(true, "2FA", null)).toBe(
      "此浏览器会保存 2FA 的安装信息 7 天，期间可返回这里继续。在其他设备或浏览器中，请重新打开本页面的链接。",
    );
    expect(keepLine(true, "2FA", x)).toBe(
      "X's in-app browser 只在内置浏览器里保存 2FA 的信息，请在浏览器中打开此链接继续。",
    );
    expect(keepLine(true, "2FA", { ...x, app: null })).toMatch(
      /^This in-app browser 只在内置浏览器里保存 2FA/,
    );
    expect(keepLine(false, "2FA", x)).toBe(
      "此浏览器不允许网站保存 2FA 的安装信息，请在准备好后返回此链接。",
    );
  });

  it("shows an address error next to the field", () => {
    const html = render({
      step: "enter",
      value: "javascript:x",
      error: "That is not a web address.",
    });
    expect(html).toContain('role="alert"');
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('value="javascript:x"');
  });

  it("asks before remembering, naming the address it replaces", () => {
    const html = render({ step: "remember", origin, replaces: "https://old.example.com" });
    expect(html).toMatch(new RegExp(`记住 <strong[^>]*>${origin.replaceAll(".", "\\.")}</strong>`));
    expect(html).toContain("https://old.example.com");
    expect(html).toContain("仅使用这一次");
    const my = render({ step: "remember", origin, replaces: null }, { page: "my" });
    expect(my).toContain(">取消<");
    expect(my).not.toContain("仅使用这一次");
  });

  it("says a link is not valid and points to the apps", () => {
    const html = render({ step: "invalid" });
    expect(html).toContain("链接无效");
    expect(html).toContain('href="/apps/"');
  });

  it("offers the catalog's app before a build from the repository", () => {
    const html = render(
      { step: "in-catalog", app: { slug: "2fa", name: "2FA" } },
      { page: "install", request: { kind: "repo", repo: "wuzf/2fa" }, catalogApp: null },
    );
    expect(html).toContain('href="/install/2fa/"');
    expect(html).toContain("从仓库构建");
    expect(html).toContain("Workers Paid");
  });

  it("on /my/, continues a saved install and can forget the Appflare", () => {
    const html = render(
      {
        step: "saved",
        origin,
        intent: { kind: "app", slug: "2fa", savedAt: "2026-09-28T12:00:00.000Z" },
        justRemembered: true,
      },
      { page: "my" },
    );
    expect(html).toContain("已记住 Appflare");
    expect(html).toContain('href="/install/2fa/"');
    expect(html).toContain("继续安装 2FA");
    expect(html).toContain("忘记这个 Appflare");
    const repo = render(
      {
        step: "saved",
        origin,
        intent: { kind: "repo", repo: "o/r", savedAt: "2026-09-28T12:00:00.000Z" },
        justRemembered: false,
      },
      { page: "my" },
    );
    expect(repo).toContain('href="/install/?repo=o/r"');
  });

  it("on /my/, says an address cannot be remembered", () => {
    const html = render({ step: "cannot-remember", origin }, { page: "my" }, false);
    expect(html).toContain("此浏览器无法记住你的 Appflare");
    expect(html).toContain(origin);
  });
});
