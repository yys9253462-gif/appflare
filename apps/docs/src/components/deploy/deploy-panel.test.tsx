import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { DeployView } from "../../deploy/flow.ts";
import { CallbackPanel } from "./callback-panel.tsx";
import {
  createdItems,
  DeployPanel,
  meterOf,
  NO_ACTIONS,
  showsIntro,
  stageOf,
  THEN_APP_LINE,
} from "./deploy-panel.tsx";
import { InstallerTerms, journeyPosition, OtherWays } from "./deploy-shell.tsx";
import { SAMPLE_CALLBACK_VIEWS, SAMPLE_SECRETS, SAMPLE_VIEWS } from "./sample-views.ts";

function render(view: DeployView, canGoBack = true): string {
  return renderToStaticMarkup(
    <DeployPanel view={view} actions={NO_ACTIONS} canGoBack={canGoBack} />,
  );
}

/** Visible text, roughly: tags removed. */
function text(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

function sample(name: string): DeployView {
  const view = SAMPLE_VIEWS[name];
  if (view === undefined) throw new Error(`no sample ${name}`);
  return view;
}

describe("DeployPanel", () => {
  it.each(Object.entries(SAMPLE_VIEWS))("draws %s without showing a secret", (_name, view) => {
    const html = render(view);
    expect(html.length).toBeGreaterThan(50);
    expect(html).not.toContain(SAMPLE_SECRETS.key);
    expect(html).not.toContain(SAMPLE_SECRETS.handoffSecret);
    // The owner claim appears only as the target of the Open link.
    const claims = html.split(SAMPLE_SECRETS.claim).length - 1;
    expect(claims).toBe(view.step === "opening" && view.answering === "not-yet" ? 1 : 0);
    expect(text(html)).not.toContain(SAMPLE_SECRETS.claim);
    // Appflare's own loader, never a generic spinner.
    expect(html).not.toContain("animate-spin");
  });

  it("shows the installer's terms and the other ways to install only before Cloudflare", () => {
    for (const [name, view] of Object.entries(SAMPLE_VIEWS)) {
      const before = ["loading", "welcome", "welcome-resume"].includes(name);
      expect(showsIntro(view), name).toBe(before);
    }
  });

  it("counts no steps before Cloudflare is connected", () => {
    for (const name of ["loading", "welcome", "welcome-resume", "unavailable"]) {
      expect(meterOf(sample(name))).toBeNull();
      expect(render(sample(name))).not.toContain('role="meter"');
    }
  });

  it("shows a slim bar and the step's name after sign-in, the count only for screen readers", () => {
    const steps: Array<[string, string]> = [
      ["account", "选择账户"],
      ["name", "名称"],
      ["address-domain", "地址"],
      ["review", "确认"],
    ];
    for (const [name, label] of steps) {
      const html = renderToStaticMarkup(
        <DeployPanel view={sample(name)} actions={NO_ACTIONS} canGoBack accountStep />,
      );
      expect(html).toContain('role="meter"');
      expect(text(html)).toContain(label);
      expect(text(html)).not.toMatch(/Step \d+ of \d+/);
    }
    // With several accounts: account 1, name 2, address 3, review 4, of 5 (the deploy is the last).
    const review = renderToStaticMarkup(
      <DeployPanel view={sample("review")} actions={NO_ACTIONS} canGoBack accountStep />,
    );
    expect(review).toMatch(/aria-valuenow="4"[^>]*|aria-valuemax="5"/);
    expect(review).toContain('aria-valuetext="第 4 步，共 5 步"');
  });

  it("leaves no gap in the bar when there is no account to choose", () => {
    expect(journeyPosition("name", false)).toEqual({ step: 1, count: 4 });
    expect(journeyPosition("address", false)).toEqual({ step: 2, count: 4 });
    expect(journeyPosition("review", false)).toEqual({ step: 3, count: 4 });
    expect(journeyPosition("account", true)).toEqual({ step: 1, count: 5 });
    expect(journeyPosition("name", true)).toEqual({ step: 2, count: 5 });
    expect(render(sample("name"))).toContain('aria-valuetext="第 1 步，共 4 步"');
  });

  it("hides the journey's bar from the deploy on, and outside the journey", () => {
    for (const name of ["deploying", "deploy-failed", "handing-off", "opening", "set-up"]) {
      expect(meterOf(sample(name))).toBeNull();
    }
    expect(stageOf(sample("confirm-remove"))).toBeNull();
    expect(render(sample("confirm-remove"))).not.toContain('role="meter"');
  });

  it("gives every step a title that can take the focus", () => {
    for (const view of Object.values(SAMPLE_VIEWS)) {
      expect(render(view)).toMatch(/<h1[^>]*><span id="deploy-step-title" tabindex="-1"/);
    }
  });

  it("offers to connect Cloudflare again, not to try again, when Appflare declined the connection", () => {
    const failed = sample("handoff-failed") as Extract<DeployView, { step: "handoff-failed" }>;
    const declined = text(render({ ...failed, problem: "declined" }));
    expect(declined).toContain("重新连接 Cloudflare");
    expect(declined).not.toContain("重试");
    const busy = text(render({ ...failed, problem: "busy" }));
    expect(busy).toContain("重试");
    expect(busy).not.toContain("重新连接 Cloudflare");
  });

  it("starts with 连接 Cloudflare and keeps every permission behind a fold", () => {
    const html = render(sample("welcome"));
    const t = text(html);
    expect(t).toContain("连接 Cloudflare");
    expect(t).toContain("Appflare 需要哪些 Cloudflare 权限");
    // In the page for find-in-page, but folded away: each permission by name only.
    expect(html).toMatch(/<div[^>]*hidden[^>]*>(?:(?!<\/div>).)*Workers Scripts/s);
    expect(t).toContain("Offline access");
    expect(html).toContain('aria-label="Appflare 为什么需要 Workers Scripts"');
    // The raw ids wait inside each 为什么需要？ popover.
    expect(html).not.toContain("workers-scripts.write");
    expect(html).not.toContain("offline_access");
  });

  it("reviews the account, name, complete address and release, with what gets created on demand", () => {
    const t = text(render(sample("review")));
    for (const part of [
      "Acme Studio",
      "appflare",
      "https://appflare.acme.example",
      "Appflare 0.4.2",
      "签名已验证",
      "将在 Acme Studio 创建哪些资源",
      "名为 appflare 的 D1 数据库",
      "名为 appflare-kv 的 KV 命名空间",
      "名为 appflare-jobs 的 Workflow",
      "自定义域名 appflare.acme.example",
      "部署 Appflare",
    ]) {
      expect(t).toContain(part);
    }
  });

  it("names the Workflow after another name, and the workers.dev address without a domain", () => {
    expect(
      createdItems({
        workerName: "team",
        hostname: null,
        address: "https://team.acme.workers.dev",
      }),
    ).toEqual(
      expect.arrayContaining([
        "后台任务：名为 team-jobs 的 Workflow，以及定期检查计划",
        "workers.dev 访问地址：https://team.acme.workers.dev",
      ]),
    );
  });

  it("shows the step that runs, what it says about itself, and the finished steps on demand", () => {
    const html = render(sample("deploying"));
    const t = text(html);
    expect(t).toContain("Upload Appflare's files");
    expect(t).toContain("Uploaded 120 of 180 files.");
    // One bar: the deploy's own. Its number is the bar's (steps done); the step under way is named.
    expect(t).not.toContain("of 7");
    expect(t).toContain("第 4 步，共 11 步");
    expect(t).toContain("已完成 3 / 11 步");
    expect(html).toMatch(/aria-valuenow="3"/);
    expect(html.match(/role="meter"/g)).toHaveLength(1);
    expect(t).toContain("详情");
    expect(t).toContain('Create the database: Created the D1 database "appflare".');
    expect(html).toContain('aria-busy="true"');
    // Progress is announced.
    expect(html).toMatch(
      /role="status"[^>]*>第 4 步，共 11 步: Upload Appflare&#x27;s files\. 已完成 3 \/ 11 步\./,
    );
  });

  it("keeps a step's warning on screen in one line, from the deploy to owner setup", () => {
    for (const name of ["handing-off-notice", "opening-notice"]) {
      const html = render(sample(name));
      const t = text(html);
      expect(t).toContain("Appflare 的定期检查（例如检查更新）不会自动运行。");
      // The installer's full words, folded away.
      expect(t).toContain("原因");
      expect(html).toContain("free a trigger in another Worker");
    }
    expect(text(render(sample("opening")))).not.toContain("regular checks");
  });

  it("turns the progress into 正在重新连接… when the installer does not answer", () => {
    const t = text(render(sample("deploying-reconnecting")));
    expect(t).toContain("正在重新连接…");
    expect(t).not.toMatch(/lost contact|tries again/);
    expect(t).not.toContain("立即检查");
  });

  it("waits quietly while another window holds the installation, then explains it in one line", () => {
    const quiet = text(render(sample("deploying-held")));
    expect(quiet).toContain("Set up background jobs");
    expect(quiet).not.toContain("Another window");
    expect(quiet).not.toContain("立即检查");
    const long = text(render(sample("deploying-held-long")));
    expect(long).toContain("Another window is working on this installation.");
    expect(long).toContain("立即检查");
  });

  it("shows 立即检查 busy while it checks, then what it found", () => {
    const checking = render(sample("deploying-address-checking"));
    expect(checking).toMatch(/<button[^>]*aria-busy="true"[^>]*>(?:(?!<\/button>).)*正在检查…/s);
    // Busy but not disabled, so the focus stays on it; announced as checking.
    const button = /<button[^>]*aria-busy="true"[^>]*>/.exec(checking)?.[0] ?? "";
    expect(button).toContain('aria-disabled="true"');
    expect(button).not.toMatch(/\sdisabled=""/);
    expect(checking).toMatch(/role="status"[^>]*><span class="sr-only">正在检查…<\/span>/);
    const checked = text(render(sample("deploying-address-checked")));
    expect(checked).toContain("立即检查");
    expect(checked).toMatch(/仍在等待（上次检查：.+）。/);
  });

  it("explains the certificate wait in one line, and offers workers.dev only once it is long", () => {
    const early = text(render(sample("deploying-address")));
    expect(early).toContain(
      "Cloudflare 正在配置 appflare.acme.example 及其证书，通常需要 1 至 5 分钟。",
    );
    expect(early).toContain("立即检查");
    expect(early).not.toContain("workers.dev");
    const late = text(render(sample("deploying-waiting")));
    expect(late).toContain(
      "不想等待？可先在 workers.dev 创建所有者账户，等 appflare.acme.example 就绪后，Appflare 会自动迁移过去。",
    );
    expect(late).toContain("在 workers.dev 打开");
    expect(late).toContain("https://appflare.acme.workers.dev");
  });

  it("says what removing deletes, and that nothing else is touched", () => {
    const t = text(render(sample("confirm-remove")));
    expect(t).toContain("Appflare 主程序：名为 appflare 的 Worker");
    expect(t).toContain("账户原有的内容会保留");
    expect(t).toContain("无法撤销");
  });

  it("says the app comes next when the page was opened from an app's install page", () => {
    for (const name of ["welcome", "review", "deploying"]) {
      const withApp = renderToStaticMarkup(
        <DeployPanel view={sample(name)} actions={NO_ACTIONS} canGoBack thenApp />,
      );
      expect(text(withApp), name).toContain(THEN_APP_LINE);
      expect(text(render(sample(name))), name).not.toContain(THEN_APP_LINE);
    }
    const opening = render(sample("opening-then-app"));
    expect(text(opening)).toContain("随后会打开你选择的应用，供你确认安装。");
    expect(opening).toContain(
      `href="https://appflare.acme.example/setup?returnTo=%2Finstall%2Fopen-seo#claim=${SAMPLE_SECRETS.claim}"`,
    );
    expect(text(render(sample("opening")))).not.toContain("你选择的应用");
  });

  it("opens the app's install link in an Appflare that is already set up", () => {
    const html = render(sample("set-up-then-app"));
    expect(html).toContain('href="https://appflare.acme.example/install/open-seo"');
    expect(text(html)).toContain("在 Appflare 中打开应用");
    const plain = render(sample("set-up"));
    expect(plain).toContain('href="https://appflare.acme.example"');
    expect(text(plain)).toContain("打开 Appflare");
    expect(text(plain)).not.toContain("你选择的应用");
  });

  it("opens owner setup on the chosen address, with no referrer", () => {
    // While it checks, the page shows "正在打开…" and no link that could land on a 404.
    expect(text(render(sample("opening")))).toContain("正在打开…");
    expect(render(sample("opening"))).not.toContain("/setup#claim=");
    // When the address did not answer in time: 重试, or open it anyway.
    const html = render(sample("opening-not-yet"));
    expect(text(html)).toContain("重试");
    expect(html).toContain(
      `href="https://appflare.acme.example/setup#claim=${SAMPLE_SECRETS.claim}"`,
    );
    expect(html).toContain('rel="noreferrer"');
  });
});

describe("the deploy page's terms", () => {
  it("say what the installer receives and keeps, and offer the other ways, folded away", () => {
    const html = renderToStaticMarkup(
      <>
        <InstallerTerms />
        <OtherWays />
      </>,
    );
    const t = text(html);
    expect(t).toContain("安装器接收和保存哪些信息");
    expect(t).toContain("短期有效的 Cloudflare 访问令牌");
    expect(t).toContain("刷新令牌不会发送给安装器");
    expect(t).toContain("创建所有者账户或移除安装后就会删除");
    expect(t).toContain("其他安装方式");
    expect(t).toContain("Deploy to Cloudflare 按钮");
    expect(t).toContain("npx create-appflare");
    // Both start folded.
    expect(html.match(/aria-expanded="false"/g)).toHaveLength(2);
  });
});

describe("CallbackPanel", () => {
  it.each(Object.entries(SAMPLE_CALLBACK_VIEWS))("draws %s", (_name, view) => {
    const html = renderToStaticMarkup(<CallbackPanel view={view} />);
    expect(html.length).toBeGreaterThan(50);
    expect(html).not.toContain("animate-spin");
  });

  it("shows a reconnect's destination and asks first, without drawing the code", () => {
    const view = SAMPLE_CALLBACK_VIEWS["callback-confirm-return"] ?? { step: "working" };
    const html = renderToStaticMarkup(<CallbackPanel view={view} />);
    const t = text(html);
    expect(t).toContain("返回你的 Appflare？");
    expect(t).toContain("https://appflare.acme.example");
    expect(t).toContain("请确认这是你自己的 Appflare 地址后再继续");
    expect(t).toContain("返回我的 Appflare");
    expect(t).toContain("取消");
    expect(html).not.toContain(SAMPLE_SECRETS.claim);
    expect(html).not.toContain("<form");
  });

  it("does not claim the reconnect worked: the Appflare says so", () => {
    const view = SAMPLE_CALLBACK_VIEWS["callback-returning"] ?? { step: "working" };
    const t = text(renderToStaticMarkup(<CallbackPanel view={view} />));
    expect(t).toContain("该页面会显示 Cloudflare 是否已连接");
  });

  it("names missing permissions on demand and sends the visitor back to start again", () => {
    const html = renderToStaticMarkup(
      <CallbackPanel
        view={SAMPLE_CALLBACK_VIEWS["callback-missing-scopes"] ?? { step: "working" }}
      />,
    );
    expect(text(html)).toContain("2 项权限");
    expect(html).toContain("dns.write");
    expect(html).toContain("zone.read");
    expect(html).toContain('href="/deploy/"');
  });
});
