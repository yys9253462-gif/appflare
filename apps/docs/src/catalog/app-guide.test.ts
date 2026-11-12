import { describe, expect, it } from "vitest";
import { alternativesLine, appFaq, deployAppPath, deployGuide, withAppflare } from "./app-guide.ts";
import { testApp, testForm } from "./test-app.ts";

describe("alternativesLine", () => {
  it("names the products the app can stand in for, any one of them", () => {
    expect(alternativesLine(testApp())).toBeNull();
    expect(alternativesLine(testApp({ alternativeTo: ["Bitly"] }))).toBe(
      "Bitly 的自托管替代方案。",
    );
    expect(alternativesLine(testApp({ alternativeTo: ["Google Analytics", "Plausible"] }))).toBe(
      "Google Analytics或Plausible 的自托管替代方案。",
    );
    expect(alternativesLine(testApp({ alternativeTo: ["A", "B", "C"] }))).toBe(
      "A、B或C 的自托管替代方案。",
    );
  });
});

describe("deployGuide", () => {
  it("sets up Appflare on the deploy page carrying the app, or installs into an existing one", () => {
    expect(deployAppPath("open-seo")).toBe("/deploy/?app=open-seo");
    const { title, setup } = deployGuide(testApp({ slug: "open-seo", name: "OpenSEO" }));
    expect(title).toBe("在 Cloudflare 部署 OpenSEO");
    expect(setup.href).toBe("/deploy/?app=open-seo");
    expect(setup.installHref).toBe("/install/open-seo/");
    expect(setup.installAction).toBe("安装 OpenSEO");
  });

  it("says which plan the app runs on", () => {
    expect(deployGuide(testApp()).setup.text).toMatch(
      /Workers 免费套餐上运行，Cut 也可使用免费套餐。$/,
    );
    expect(deployGuide(testApp({ plan: "paid" })).setup.text).toMatch(
      /Workers 免费套餐上运行。Cut 需要该账户使用 Workers Paid。$/,
    );
  });

  it("lists what the form asks for, and what it fills in or folds away", () => {
    const link = { label: "Get a key", url: "https://example.com/keys" };
    const { install } = deployGuide(
      testApp({
        installForm: testForm({
          asks: [{ label: "API key", link, seedOnly: false }],
          generated: ["Session secret", "Setup secret"],
          optional: 5,
          access: "required",
        }),
      }),
    );
    expect(install.title).toBe("安装 Cut");
    expect(install.asks).toEqual([{ label: "API key", link, seedOnly: false }]);
    expect(install.notes).toEqual([
      "Appflare 会自动生成 2 个值：Session secret、Setup secret。",
      "另外有 5 项可选设置，可稍后配置。",
      "Cut 安装时必须启用 Cloudflare Access，只允许你 Appflare 中的用户访问。",
    ]);
  });

  it("says when the app needs nothing typed in, and how Access is offered", () => {
    const notes = (form: Parameters<typeof testForm>[0]) =>
      deployGuide(testApp({ installForm: testForm(form) })).install.notes;
    expect(notes({})).toEqual([
      "Cut 不需要你填写密钥或设置。",
      "可通过表单中的开关为 Cut 启用 Cloudflare Access，只允许你 Appflare 中的用户访问。",
    ]);
    expect(notes({ access: "recommended", generated: ["Key"], optional: 1 })).toEqual([
      "Cut 不需要你填写密钥或设置。",
      "Appflare 会自动生成 1 个值：Key。",
      "另外有 1 项可选设置，可稍后配置。",
      "表单默认使用 Cloudflare Access 保护 Cut，只允许你 Appflare 中的用户访问。你也可以关闭此选项。",
    ]);
    expect(notes({ access: "offered", publicPaths: ["/s/*", "/api/hook"] })).toContain(
      "可通过表单中的开关为 Cut 启用 Cloudflare Access，只允许你 Appflare 中的用户访问，但 /s/*、/api/hook 保持公开。",
    );
  });

  it("asks an email app for a domain, and never says it needs nothing", () => {
    const { install } = deployGuide(
      testApp({ installForm: testForm({ emailDomain: true, access: null }) }),
    );
    expect(install.asks?.map((f) => f.label)).toEqual(["你自己可接收邮件的域名"]);
    expect(install.notes).toEqual([]);
  });

  it("asks a self-deploying app for its own Cloudflare token", () => {
    const installer = deployGuide(
      testApp({ tier: "self-deploying", installForm: testForm({ access: null }) }),
    );
    expect(installer.install.asks?.map((f) => f.label)).toEqual([
      "为 Cut 创建的 Cloudflare API 令牌",
    ]);
    expect(installer.install.notes).toEqual([
      "应用安装程序使用此令牌部署，可在应用页点击“创建令牌”。",
      "确认后，应用通过自带安装程序在你账户的 Workers Paid 套餐中部署。",
    ]);
    const unknown = deployGuide(testApp({ tier: "self-deploying" }));
    expect(unknown.install.asks).toBeNull();
    expect(unknown.install.notes[0]).toMatch(/^需要为 Cut 提供 Cloudflare API 令牌/);
  });

  it("names no fields when the catalog does not say, and the build an app needs", () => {
    expect(deployGuide(testApp()).install).toEqual({ title: "安装 Cut", asks: null, notes: [] });
    expect(deployGuide(testApp({ tier: "sandbox" })).install.notes).toEqual([
      "此应用没有预构建的发布包，需要你确认在自己账户的 Workers Paid 套餐中构建。",
    ]);
  });

  it("has a last step only when Appflare shows notes after the install", () => {
    expect(deployGuide(testApp()).finish).toBeNull();
    expect(deployGuide(testApp({ installForm: testForm() })).finish).toBeNull();
    expect(
      deployGuide(testApp({ installForm: testForm({ postInstallSteps: 3 }) })).finish?.text,
    ).toBe("安装后，Appflare 会在 Cut 的页面列出 3 项后续设置。");
    expect(
      deployGuide(testApp({ installForm: testForm({ postInstallSteps: 1 }) })).finish?.text,
    ).toBe("安装后，Appflare 会在 Cut 的页面列出 1 项后续设置。");
  });
});

describe("withAppflare", () => {
  const text = (tier: Parameters<typeof withAppflare>[0]) =>
    withAppflare(tier)
      .map((item) => `${item.title}. ${item.text}`)
      .join(" ");

  it("is a short list for every tier", () => {
    for (const tier of ["artifact", "sandbox", "self-deploying"] as const) {
      expect(withAppflare(tier).map((item) => item.id)).toEqual([
        "setup",
        "updates",
        "health",
        "account",
      ]);
    }
  });

  it("promises a one-click update only where no run needs approving", () => {
    expect(text("artifact")).toContain("一键更新");
    expect(text("sandbox")).not.toContain("一键更新");
    expect(text("self-deploying")).not.toContain("一键更新");
  });

  it("claims no token-free setup or Appflare-run removal for a self-deploying app", () => {
    expect(text("artifact")).toContain("无需手动创建 API 令牌");
    expect(text("self-deploying")).not.toContain("API 令牌");
    expect(text("self-deploying")).not.toContain("Appflare 记录创建的资源");
    expect(text("self-deploying")).toContain("卸载时由应用的安装程序删除");
  });
});

describe("appFaq", () => {
  const answer = (app: ReturnType<typeof testApp>, start: string) =>
    appFaq(app).find((item) => item.question.startsWith(start))?.answer;

  it("asks three to five questions, each about the app", () => {
    const items = appFaq(testApp());
    expect(items.length).toBeGreaterThanOrEqual(3);
    expect(items.length).toBeLessThanOrEqual(5);
    for (const item of items) expect(item.question).toContain("Cut");
  });

  it("answers the plan question from the app's plan", () => {
    expect(answer(testApp(), "Cut 可以使用")).toBe(
      "可以。Cut 和 Appflare 均可在 Workers 免费套餐运行。",
    );
    expect(answer(testApp({ plan: "paid" }), "Cut 可以使用")).toMatch(
      /^不可以。Cut 需要 Workers Paid 套餐/,
    );
  });

  it("says what the install creates and what it only uses", () => {
    const app = testApp({ services: ["kv", "d1", "cron", "workers-ai", "zone", "unknown-thing"] });
    expect(answer(app, "Cut 会在我的账户创建")).toBe(
      "Appflare 为 Cut 创建 Worker 和所需资源：KV namespaces, D1 databases and cron triggers。 " +
        "它还会使用 Workers AI and a domain。 " +
        "Appflare 会记录它创建的资源，卸载时删除这些资源，并保留你选择留下的数据。",
    );
    expect(answer(testApp(), "Cut 会在我的账户创建")).toMatch(
      /^Appflare 为 Cut 创建一个 Worker。 /,
    );
    expect(answer(testApp({ tier: "self-deploying" }), "Cut 会在我的账户创建")).toMatch(
      /^Appflare 在你的账户中运行 Cut 自带的安装程序/,
    );
  });

  it("explains updates for the app's tier, with a rollback only where there is one", () => {
    expect(answer(testApp(), "如何更新")).toMatch(/回滚/);
    expect(answer(testApp({ tier: "sandbox" }), "如何更新")).toMatch(/确认在账户中构建新版/);
    expect(answer(testApp({ tier: "self-deploying" }), "如何更新")).toMatch(/不支持回滚。$/);
  });

  it("answers the license question in the catalog's words, and leaves out one it cannot place", () => {
    expect(answer(testApp(), "Cut 是开源软件吗")).toMatch(/^是的，采用 MIT 许可证。/);
    expect(
      answer(testApp({ license: { expression: "BUSL-1.1", note: null } }), "Cut 是开源软件吗"),
    ).toMatch(/^它属于源码可见软件，使用限制见 BUSL-1.1 许可证。/);
    expect(
      answer(testApp({ license: { expression: "NONE", note: null } }), "Cut 是开源软件吗"),
    ).toMatch(/^不属于开源软件，请查看仓库许可说明。/);
    const own = testApp({ license: { expression: "LicenseRef-Cut", note: null } });
    expect(appFaq(own).map((item) => item.question)).not.toContain("Cut 是开源软件吗？");
    expect(answer(testApp(), "Cut 是开源软件吗")).toContain("github.com/acme/cut");
  });
});
