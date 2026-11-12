import type { ServiceId } from "@appflare/schema";
import {
  countOf,
  licenseBadgeCopy,
  listWords,
  PLAN_WORDS,
  pluralOf,
  SERVICE_NAMES,
  SERVICE_NOUNS,
} from "@appflare/schema/catalog-display";
import { DEPLOY_PATH } from "../deploy/paths.ts";
import type { AskedField } from "./install-form.ts";
import type { SiteApp } from "./site-catalog.ts";
import { installPath } from "./urls.ts";

/**
 * The parts of an app's page that answer "how do I deploy <Name>": the
 * steps from no Appflare to a running app, what Appflare does that a deploy
 * by hand does not, and the questions people ask before they start. Every
 * sentence comes from the app's catalog entry, so no app needs copy of its
 * own; a fact the catalog does not give is left out rather than guessed.
 */

/**
 * The deploy page, told which app to open once Appflare is set up. The
 * `app` parameter is the deploy page's contract: it carries the app through
 * the setup and lands on the app's install form.
 */
export function deployAppPath(slug: string): string {
  return `${DEPLOY_PATH}?app=${encodeURIComponent(slug)}`;
}

/** The anchor of the page's "What it needs on your account" section. */
export const NEEDS_ANCHOR = "needs";

/**
 * "A self-hosted alternative to Google Analytics or Plausible", or null
 * when the catalog names nothing. The products join with "or": the app can
 * stand in for any one of them, which "and" would not say.
 */
export function alternativesLine(app: Pick<SiteApp, "alternativeTo">): string | null {
  if (app.alternativeTo.length === 0) return null;
  const products = new Intl.ListFormat("zh-CN", { type: "disjunction" }).format(app.alternativeTo);
  return `${products} 的自托管替代方案。`;
}

/** Step 1: Appflare itself, set up once per account. */
export interface SetupStep {
  title: string;
  text: string;
  /** The deploy page, carrying the app. */
  href: string;
  action: string;
  /** For someone who has Appflare already: the app's install page. */
  installHref: string;
  installQuestion: string;
  installAction: string;
}

/** Step 2: the app's install form. */
export interface InstallStep {
  title: string;
  /** What the person fills in; null when the catalog snapshot does not say. */
  asks: AskedField[] | null;
  /** The sentences after the fields: generated values, optional ones, Access, a build. */
  notes: string[];
}

/** Step 3, when the app has notes for after the install. */
export interface FinishStep {
  title: string;
  text: string;
}

export interface DeployGuide {
  title: string;
  setup: SetupStep;
  install: InstallStep;
  finish: FinishStep | null;
}

function setupText(app: Pick<SiteApp, "name" | "plan">): string {
  const base =
    "Appflare 可通过浏览器安装到你自己的 Cloudflare 账户，" + "并在 Workers 免费套餐上运行";
  return app.plan === "free"
    ? `${base}，${app.name} 也可使用免费套餐。`
    : `${base}。${app.name} 需要该账户使用 ${PLAN_WORDS.paid.name}。`;
}

type Form = NonNullable<SiteApp["installForm"]>;

function accessNote(name: string, form: Form): string | null {
  const paths = form.publicPaths;
  const who =
    paths.length === 0
      ? "只允许你 Appflare 中的用户访问"
      : `只允许你 Appflare 中的用户访问，但 ${paths.join("、")} 保持公开`;
  switch (form.access) {
    case "required":
      return `${name} 安装时必须启用 Cloudflare Access，${who}。`;
    case "recommended":
      return `表单默认使用 Cloudflare Access 保护 ${name}，${who}。你也可以关闭此选项。`;
    case "offered":
      return `可通过表单中的开关为 ${name} 启用 Cloudflare Access，${who}。`;
    case null:
      return null;
  }
}

function buildNote(tier: SiteApp["tier"]): string | null {
  switch (tier) {
    case "sandbox":
      return `此应用没有预构建的发布包，需要你确认在自己账户的 ${PLAN_WORDS.paid.name} 套餐中构建。`;
    case "self-deploying":
      return `确认后，应用通过自带安装程序在你账户的 ${PLAN_WORDS.paid.name} 套餐中部署。`;
    case "artifact":
      return null;
  }
}

/** The token a self-deploying app's installer deploys with, which the form asks for first. */
function appTokenField(app: Pick<SiteApp, "name">): AskedField {
  return { label: `为 ${app.name} 创建的 Cloudflare API 令牌`, link: null, seedOnly: false };
}

/** A domain of the account for an app that receives email. */
const EMAIL_DOMAIN_FIELD: AskedField = {
  label: "你自己可接收邮件的域名",
  link: null,
  seedOnly: false,
};

/** Everything the form asks for, in its order; null when the catalog snapshot does not say. */
function askedFields(app: SiteApp): AskedField[] | null {
  const form = app.installForm;
  if (form === null) return null;
  return [
    ...(app.tier === "self-deploying" ? [appTokenField(app)] : []),
    ...form.asks,
    ...(form.emailDomain ? [EMAIL_DOMAIN_FIELD] : []),
  ];
}

function installNotes(app: SiteApp, asks: readonly AskedField[] | null): string[] {
  const form = app.installForm;
  const notes: Array<string | null> = [];
  if (app.tier === "self-deploying") {
    notes.push(
      asks === null
        ? `需要为 ${app.name} 提供 Cloudflare API 令牌，可在应用页点击“创建令牌”。`
        : `应用安装程序使用此令牌部署，可在应用页点击“创建令牌”。`,
    );
  }
  if (form !== null && asks !== null) {
    if (asks.length === 0) notes.push(`${app.name} 不需要你填写密钥或设置。`);
    if (form.generated.length > 0) {
      const values = `${form.generated.length} 个值`;
      notes.push(`Appflare 会自动生成 ${values}：${form.generated.join("、")}。`);
    }
    if (form.optional > 0) {
      notes.push(`另外有 ${form.optional} 项可选设置，可稍后配置。`);
    }
    notes.push(accessNote(app.name, form));
  }
  notes.push(buildNote(app.tier));
  return notes.filter((note) => note !== null);
}

/** The numbered steps from no Appflare to the app running in the visitor's account. */
export function deployGuide(app: SiteApp): DeployGuide {
  const steps = app.installForm?.postInstallSteps ?? 0;
  const asks = askedFields(app);
  return {
    title: `在 Cloudflare 部署 ${app.name}`,
    setup: {
      title: "在你的 Cloudflare 账户中安装 Appflare",
      text: setupText(app),
      href: deployAppPath(app.slug),
      action: "安装 Appflare",
      installHref: installPath(app.slug),
      installQuestion: "已经安装 Appflare？",
      installAction: `安装 ${app.name}`,
    },
    install: {
      title: `安装 ${app.name}`,
      asks,
      notes: installNotes(app, asks),
    },
    finish:
      steps === 0
        ? null
        : {
            title: "完成后续设置",
            text: `安装后，Appflare 会在 ${app.name} 的页面列出 ${steps} 项后续设置。`,
          },
  };
}

/** One thing Appflare does that a deploy by hand does not. */
export interface WithAppflareItem {
  id: "setup" | "updates" | "health" | "account";
  title: string;
  text: string;
}

/**
 * What Appflare does that a deploy by hand does not, for the app's tier: an
 * app built in the account or deployed by its own installer updates only
 * after an approved run, and a self-deploying app's installer, not Appflare,
 * creates and deletes its resources and needs a token of its own.
 */
export function withAppflare(tier: SiteApp["tier"]): WithAppflareItem[] {
  const selfDeploying = tier === "self-deploying";
  return [
    {
      id: "setup",
      title: "无需在电脑上编译",
      text: selfDeploying
        ? "Appflare 通过浏览器完成安装，再在你的 Cloudflare 账户中运行应用的安装程序。"
        : "Appflare 可通过浏览器完成安装，无需手动创建 API 令牌或安装本地工具。",
    },
    tier === "artifact"
      ? {
          id: "updates",
          title: "一键更新",
          text: "目录有新版本时，Appflare 会提醒你；点击“更新”即可安装。",
        }
      : {
          id: "updates",
          title: "从目录获取更新",
          text: selfDeploying
            ? "目录有新版本时，Appflare 会提醒你，并在获得确认后重新运行安装程序。"
            : "目录有新版本时，Appflare 会提醒你，并在获得确认后在你的账户中构建。",
        },
    {
      id: "health",
      title: "健康检查",
      text: "每次安装和更新后，Appflare 都会检查应用是否正常响应。",
    },
    {
      id: "account",
      title: "应用留在你自己的账户中",
      text: selfDeploying
        ? "所有内容都使用你自己的 Cloudflare 账户和套餐运行。卸载时由应用的安装程序删除它创建的资源。"
        : "所有内容都使用你自己的 Cloudflare 账户和套餐运行；Appflare 记录创建的资源，卸载时会一并处理。",
    },
  ];
}

/** One question of the page's FAQ, answered in plain text. */
export interface FaqItem {
  question: string;
  answer: string;
}

/** Services an install creates resources for; the others it only uses. */
const CREATED: ReadonlySet<ServiceId> = new Set<ServiceId>([
  "kv",
  "d1",
  "r2",
  "durable-objects",
  "hyperdrive",
  "vectorize",
  "queues",
  "pipelines",
  "workflows",
  "cron",
]);

function isService(id: string): id is ServiceId {
  return Object.hasOwn(SERVICE_NAMES, id);
}

/** A created service in a list: its resources in the plural ("KV namespaces"). */
function createdWords(id: ServiceId): string {
  const noun = SERVICE_NOUNS[id];
  return noun.countable ? pluralOf(noun.singular) : noun.name;
}

function planAnswer(app: Pick<SiteApp, "name" | "plan">): string {
  return app.plan === "free"
    ? `可以。${app.name} 和 Appflare 均可在 Workers 免费套餐运行。`
    : `不可以。${app.name} 需要 ${PLAN_WORDS.paid.name} 套餐。Appflare 本身可在免费套餐运行。`;
}

function createsAnswer(app: SiteApp): string {
  if (app.tier === "self-deploying") {
    return `Appflare 在你的账户中运行 ${app.name} 自带的安装程序，由它创建资源。卸载时再次运行安装程序清理。`;
  }
  const services = app.services.filter(isService);
  const created = services.filter((id) => CREATED.has(id)).map(createdWords);
  const used = services.filter((id) => !CREATED.has(id)).map((id) => SERVICE_NOUNS[id]);
  const usedWords = used.map((noun) => (noun.countable ? countOf(noun.singular, 1) : noun.name));
  const parts = [
    created.length === 0
      ? `Appflare 为 ${app.name} 创建一个 Worker。`
      : `Appflare 为 ${app.name} 创建 Worker 和所需资源：${listWords(created)}。`,
  ];
  if (usedWords.length > 0) parts.push(`它还会使用 ${listWords(usedWords)}。`);
  if (app.tier === "sandbox" && services.length === 0) {
    parts.push("应用在你的账户中构建，其余要求将在构建后确认。");
  }
  parts.push("Appflare 会记录它创建的资源，卸载时删除这些资源，并保留你选择留下的数据。");
  return parts.join(" ");
}

function updateAnswer(app: Pick<SiteApp, "name" | "tier">): string {
  const offer = `目录有新版本时，${app.name} 的页面会显示“有可用更新”。`;
  switch (app.tier) {
    case "artifact":
      return `${offer} 点击“更新”即可。Appflare 会先创建快照以便回滚，也可以开启自动更新。`;
    case "sandbox":
      return `${offer} 点击“更新”并确认在账户中构建新版。Appflare 会先创建快照以便回滚。`;
    case "self-deploying":
      return `${offer} 点击“更新”并确认运行新版 ${app.name} 的安装程序。其安装程序就地修改应用，不支持回滚。`;
  }
}

/**
 * Whether the app is open source, in the catalog's license words; null for
 * a license the catalog cannot place, where yes or no would be a guess.
 */
function licenseAnswer(app: Pick<SiteApp, "license" | "repo">): string | null {
  const copy = licenseBadgeCopy(app.license);
  const source = `源码地址：github.com/${app.repo}。`;
  switch (copy.kind) {
    case "open-source":
      return `是的，采用 ${copy.label} 许可证。${source}`;
    case "source-available":
      return `它属于源码可见软件，使用限制见 ${copy.label} 许可证。${source}`;
    case "none":
      return `不属于开源软件，请查看仓库许可说明。${source}`;
    case "unknown":
      return null;
  }
}

/**
 * The page's questions and answers, each answered from the catalog entry:
 * the plan, what the install creates, how updates work for its tier, and
 * its license when the catalog can say what kind it is.
 */
export function appFaq(app: SiteApp): FaqItem[] {
  const items: FaqItem[] = [
    { question: `${app.name} 可以使用 Cloudflare 免费套餐吗？`, answer: planAnswer(app) },
    {
      question: `${app.name} 会在我的账户创建哪些资源？`,
      answer: createsAnswer(app),
    },
    { question: `如何更新 ${app.name}？`, answer: updateAnswer(app) },
  ];
  const license = licenseAnswer(app);
  if (license !== null) items.push({ question: `${app.name} 是开源软件吗？`, answer: license });
  return items;
}
