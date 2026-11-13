import { HomeLayout } from "@fumadocs/base-ui/layouts/home";
import Link from "fumadocs-core/link";
import type { ReactNode } from "react";
import catalogAppSrcSet from "../../../public/screenshots/catalog-app.png?w=640;960;1280&format=webp&as=srcset";
import catalogPhoneSrcSet from "../../../public/screenshots/catalog-phone.png?w=384;780&format=webp&as=srcset";
import jobsLogSrcSet from "../../../public/screenshots/jobs-install-log.png?w=640;960;1280&format=webp&as=srcset";
import landingHomeSrcSet from "../../../public/screenshots/landing-home.png?w=640;800;1024;1280;1920&format=webp&as=srcset";
import landingSpendSrcSet from "../../../public/screenshots/landing-spend.png?w=640;960;1280&format=webp&as=srcset";
import appflareUpdatesSrcSet from "../../../public/screenshots/settings-appflare-updates.png?w=640;960;1280&format=webp&as=srcset";
import { appPath, appsPath } from "../../catalog/urls.ts";
import { catalogRepositoryUrl, type LandingData, landingLinks } from "../../lib/landing.ts";
import {
  appsLink,
  baseOptions,
  DOCS_HOME,
  docsLink,
  githubLink,
} from "../../lib/layout.shared.tsx";
import { repositoryUrl } from "../../lib/shared.ts";
import { AppIcon } from "../catalog/tiles.tsx";
import { ClickHere } from "./click-here.tsx";
import {
  DeployButtonLine,
  GhostButton,
  InstallButton,
  InstallShareLine,
  Shot,
  Wordmark,
  ZoomableShot,
} from "./parts.tsx";

const notAffiliated = "Appflare 是独立开源项目，与 Cloudflare, Inc. 没有隶属、背书或赞助关系。";

/** Two buttons side by side, or stacked at the same width on a phone. */
const BUTTON_ROW = "flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row";

/** The front page, `/`: the site's top bar over {@link LandingContent}. */
export function LandingPage({ data }: { data: LandingData }) {
  return (
    <HomeLayout {...baseOptions()} links={[docsLink, appsLink, githubLink]}>
      <LandingContent data={data} />
    </HomeLayout>
  );
}

/**
 * The real Home screen as the hero under one line of copy and the Install
 * button, then the catalog's numbers, three steps, the best-known apps, what
 * Appflare does after an install, a closing call to action and a footer.
 */
export function LandingContent({ data }: { data: LandingData }) {
  return (
    <>
      <Hero data={data} />

      <section aria-label="应用目录概览" className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <dl className="m-0 grid grid-cols-2 border-fd-border border-b md:grid-cols-4">
          <Fact value={String(data.apps)} label="个目录应用" />
          <Fact value={String(data.categories)} label="个分类" />
          <Fact value={String(data.freePlan)} label="个支持 Workers Free" />
          <Fact value="1" label="个 Worker 统一管理" />
        </dl>
      </section>

      <HowItWorks data={data} />
      <Apps data={data} />
      <Features />

      <section className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
        <div className="grid justify-items-center gap-6 rounded-3xl border border-fd-border bg-fd-card px-6 py-16 text-center">
          <h2 className="m-0 text-balance font-semibold text-3xl tracking-tight md:text-4xl">
            自己的账户，自己的应用，持续更新。
          </h2>
          <p className="m-0 max-w-xl text-fd-muted-foreground">
            登录 Cloudflare，选择 Appflare 的安装位置，网页便会部署预构建、已签名的 Appflare。
            只需几分钟，无需手动创建 API 令牌。
          </p>
          <div className={BUTTON_ROW}>
            <InstallButton size="lg" placement="home-closing-install" />
            <GhostButton href={DOCS_HOME} size="lg">
              阅读文档
            </GhostButton>
          </div>
          {/* Far below the first screen: by the time it is seen, the line is there. */}
          <InstallShareLine reserve={false} className="-my-3 justify-items-center" />
          <DeployButtonLine placement="home-closing-cloudflare" />
        </div>
      </section>

      <LandingFooter />
    </>
  );
}

function Hero({ data }: { data: LandingData }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[22rem] -z-10 mx-auto h-[36rem] max-w-5xl rounded-full bg-[radial-gradient(closest-side,rgba(251,107,0,0.16),transparent)] blur-2xl dark:bg-[radial-gradient(closest-side,rgba(251,107,0,0.22),transparent)]"
      />
      <div className="mx-auto grid max-w-3xl justify-items-center gap-6 px-6 pt-16 text-center md:pt-24">
        <a
          href={repositoryUrl}
          className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-fd-muted-foreground text-sm hover:text-fd-foreground"
        >
          <span className="size-1.5 rounded-full bg-[#fb6b00]" />
          开源，Apache-2.0 许可
        </a>
        <h1 className="m-0 text-balance font-semibold text-4xl tracking-tight md:text-6xl">
          在自己的 Cloudflare 账户里管理应用
        </h1>
        <p className="m-0 max-w-2xl text-balance text-fd-muted-foreground text-lg md:text-xl">
          Appflare 只需在你的账户中运行一个 Worker。浏览 {data.apps} 个适配 Workers 的应用，
          一键安装并持续更新，需要时还能回滚。
        </p>
        <div className={BUTTON_ROW}>
          <span className="relative flex">
            <InstallButton size="lg" className="grow" placement="home-hero-install" />
            {/* The arrow's tip sits just before the button's left edge, level with its middle, and the words rise above it. A phone has no room beside the button. */}
            <ClickHere className="pointer-events-none absolute top-1/2 right-full mr-1 hidden w-60 -translate-y-[18%] text-[#c75400] lg:block dark:text-[#ff8a3d]" />
          </span>
          <GhostButton href={appsPath} size="lg">
            浏览应用
          </GhostButton>
        </div>
        <div className="grid justify-items-center gap-2">
          <InstallShareLine className="justify-items-center" />
          <DeployButtonLine placement="home-hero-cloudflare" />
          <p className="m-0 text-fd-muted-foreground text-sm">
            支持 Workers 免费套餐。{" "}
            <Link
              href={DOCS_HOME}
              className="font-medium text-fd-foreground underline underline-offset-4"
            >
              阅读文档
            </Link>
          </p>
        </div>
      </div>
      <div className="relative mx-auto mt-14 max-w-6xl px-4 md:mt-20 md:px-6 lg:pr-32">
        <ZoomableShot
          title="Appflare 首页"
          src="/screenshots/landing-home.png"
          srcSet={landingHomeSrcSet}
          // The column's width: 1000px once the page is 72rem wide, else the viewport less its padding.
          sizes="(min-width: 1152px) 1000px, (min-width: 1024px) calc(100vw - 152px), (min-width: 768px) calc(100vw - 48px), calc(100vw - 32px)"
          alt="Appflare 首页：侧边栏列出已安装应用，主区域显示两项待处理更新和按应用统计的账户用量"
          width={2880}
          height={1800}
          eager
        />
        <img
          src="/screenshots/catalog-phone.png"
          srcSet={catalogPhoneSrcSet}
          sizes="192px"
          alt="手机上的应用目录"
          width={780}
          height={1540}
          loading="lazy"
          decoding="async"
          className="absolute right-0 bottom-8 hidden w-48 rounded-[1.75rem] border-[6px] border-neutral-900 shadow-2xl lg:block"
        />
      </div>
    </section>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="grid gap-1 px-2 py-8 text-center">
      <dt className="order-2 text-fd-muted-foreground text-sm">{label}</dt>
      <dd className="order-1 m-0 font-semibold text-3xl tabular-nums tracking-tight">{value}</dd>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <div className="grid max-w-2xl gap-3">
      {/* A darker orange than the brand's, so the small label reads at 5:1 on the light backgrounds. */}
      <p className="m-0 font-medium text-[#ad4900] text-sm dark:text-[#ff8a3d]">{eyebrow}</p>
      <h2 className="m-0 text-balance font-semibold text-3xl tracking-tight md:text-4xl">
        {title}
      </h2>
      <p className="m-0 text-fd-muted-foreground text-lg">{lead}</p>
    </div>
  );
}

function HowItWorks({ data }: { data: LandingData }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6">
      <SectionHeading
        eyebrow="使用方法"
        title="三个步骤，在浏览器里完成"
        lead="应用运行在你自己的账户中，使用你的套餐和额度。"
      />
      <ol className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-3">
        <Step
          n={1}
          title="安装 Appflare"
          text="在本站的部署页面登录 Cloudflare 并选择地址。网页会将管理器安装到你的账户中，之后可由 Appflare 自行更新。"
        >
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {["Worker", "D1", "KV", "Workflow", "Cron"].map((item) => (
              <span
                key={item}
                className="rounded-md border border-fd-border bg-fd-background px-2 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        </Step>
        <Step
          n={2}
          title="安装应用"
          text="从目录中选择应用。Appflare 会创建所需的数据库、存储、队列、密钥和定时触发器，并记录每一项资源。"
        >
          <div className="flex flex-wrap gap-2">
            {data.showcase.slice(0, 6).map((app) => (
              <Link
                key={app.slug}
                href={appPath(app.slug)}
                title={app.name}
                aria-label={app.name}
                className="flex rounded-xl transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-fd-ring focus-visible:outline-offset-2 motion-reduce:transition-none"
              >
                <AppIcon src={app.icon} name={app.name} size={36} />
              </Link>
            ))}
          </div>
        </Step>
        <Step
          n={3}
          title="保持更新"
          text="首页会提示新版本。你可以一键更新或开启自动更新，也可以回滚到旧版本，或卸载并清理应用创建的全部资源。"
        >
          <div className="flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-blue-500" />
            <span>可更新至 0.1.1</span>
          </div>
        </Step>
      </ol>
    </section>
  );
}

function Step({
  n,
  title,
  text,
  children,
}: {
  n: number;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-fd-border bg-fd-card p-6">
      <span className="grid size-8 place-items-center rounded-full border border-fd-border bg-fd-background font-mono text-sm">
        {n}
      </span>
      <h3 className="m-0 font-semibold text-lg">{title}</h3>
      <p className="m-0 text-fd-muted-foreground">{text}</p>
      <div className="mt-auto pt-2">{children}</div>
    </li>
  );
}

function Apps({ data }: { data: LandingData }) {
  return (
    <section className="border-fd-border border-y bg-fd-card/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="应用目录"
            title={`${data.apps} 个应用，随时安装`}
            lead="短链接、网站分析、邮件、密码库、笔记、文件分享等应用，均从固定的上游提交构建并签名。"
          />
          <GhostButton href={appsPath}>查看全部 {data.apps} 个应用</GhostButton>
        </div>
        <ul className="m-0 mt-12 grid list-none grid-cols-3 gap-1 p-0 md:gap-2 lg:grid-cols-6">
          {data.showcase.map((app) => (
            <li key={app.slug}>
              <Link
                href={appPath(app.slug)}
                className="flex h-full flex-col items-center gap-3 rounded-xl px-1 py-4 text-center transition-colors hover:bg-fd-accent md:p-4"
              >
                <AppIcon src={app.icon} name={app.name} size={56} />
                <span className="grid gap-0.5">
                  <span className="font-medium text-sm">{app.name}</span>
                  <span className="text-fd-muted-foreground text-xs">{app.category ?? ""}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6">
      <SectionHeading
        eyebrow="功能一览"
        title="安装之后的管理，也交给 Appflare"
        lead="Appflare 记录每次安装及其资源，让后续更新和维护更方便。"
      />
      <WideFeature
        title="自动更新"
        href={landingLinks.automaticUpdates}
        shot="/screenshots/settings-appflare-updates.png"
        srcSet={appflareUpdatesSrcSet}
        alt="设置中的更新页面：应用自动更新和 Appflare 自身自动更新选项"
        width={2352}
        height={1700}
        className="mt-12"
      >
        <p className="m-0 text-fd-muted-foreground">
          可以为所有应用开启自动更新，也可以逐个设置。Appflare 每 30 分钟检查一次目录；
          如果新版本无需你补充信息，就会自动更新，并执行与手动更新相同的快照和检查。
          如果需要新密钥或确认，则会在应用页面等待你处理。
        </p>
        <p className="m-0 text-fd-muted-foreground">
          没有其他任务运行时，Appflare 也可以用同样的方式更新自己。
        </p>
      </WideFeature>
      <WideFeature
        title="花费保护"
        href={landingLinks.spendProtection}
        shot="/screenshots/landing-spend.png"
        srcSet={landingSpendSrcSet}
        alt="应用用量页面：设置变更后 Durable Objects 请求激增，约每小时 0.65 美元，页面显示暂停应用按钮和最近 24 小时用量图"
        width={1672}
        height={1060}
        shotFirst
        className="mt-4"
      >
        <p className="m-0 text-fd-muted-foreground">
          有缺陷的应用可能陷入循环，产生高额费用。Appflare 每 5 分钟从 Cloudflare 分析读取应用用量；
          当某小时达到平时用量的 5、20 或 100 倍，或命中你设置的用量提醒时， 会通过
          Telegram、Slack、Discord 或 webhook 通知你。
        </p>
        <p className="m-0 text-fd-muted-foreground">
          自动暂停默认关闭。开启后，Appflare 会暂停陷入循环的应用。使用 Workers Paid 时，
          还可在应用超过每日、每周或每月花费上限时暂停它；月度预算则优先暂停花费最高的应用。
          暂停会保留数据、绑定和密钥，恢复时会还原暂停前的版本。
        </p>
        <p className="m-0 text-fd-muted-foreground text-sm">
          使用 Workers Free 时，Appflare 会在每日免费额度耗尽前提醒。 美元金额按 Cloudflare
          标价估算。
        </p>
      </WideFeature>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <BigFeature
          title="每次安装都有任务日志"
          text="安装、更新和回滚均以持久化 Workflow 任务运行。日志会记录每个步骤，并在结束时进行健康检查。"
          href={landingLinks.health}
          shot="/screenshots/jobs-install-log.png"
          srcSet={jobsLogSrcSet}
          alt="安装任务日志：验证签名、创建 KV 命名空间、上传 Worker 并通过健康检查"
          height={1354}
        />
        <BigFeature
          title="每个应用都有专属页面"
          text="安装前即可查看星标、套餐、许可证、体积、截图，以及应用对账户资源的要求。"
          href={landingLinks.installApps}
          shot="/screenshots/catalog-app.png"
          srcSet={catalogAppSrcSet}
          alt="EmDash 应用详情页：星标、套餐、许可证、版本和截图"
          height={1580}
        />
      </div>
      <ul className="m-0 mt-4 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        <SmallFeature title="构建签名" href={landingLinks.catalogHowItWorks}>
          目录 CI 从固定提交构建并签署每个版本。只有签名校验通过，才会安装。
        </SmallFeature>
        <SmallFeature title="更新与回滚" href={landingLinks.updates}>
          操作前先保存 Worker 版本和每个 D1 数据库的快照，方便需要时回退。
        </SmallFeature>
        <SmallFeature title="自定义域名" href={landingLinks.domains}>
          通过你自己区域下的域名访问应用。Cloudflare 会创建 DNS 记录和证书。
        </SmallFeature>
        <SmallFeature title="用户与通行密钥" href={landingLinks.users}>
          支持所有者、可修改配置的管理员和只读成员，并可使用通行密钥登录。
        </SmallFeature>
        <SmallFeature title="通知" href={landingLinks.notifications}>
          更新、任务完成、健康检查失败、用量异常和应用暂停等通知， 可发送到 Telegram、Slack、Discord
          或带签名的 webhook。
        </SmallFeature>
        <SmallFeature title="应用独立运行" href={landingLinks.faq}>
          已安装的应用是普通 Worker。即使管理器故障或被移除，它们仍会继续运行。
        </SmallFeature>
      </ul>
    </section>
  );
}

/**
 * A feature across the whole column: its words beside a screenshot on a wide
 * screen (the screenshot first with `shotFirst`), the words first on a phone.
 */
function WideFeature({
  title,
  href,
  shot,
  srcSet,
  alt,
  width,
  height,
  shotFirst = false,
  className = "",
  children,
}: {
  title: string;
  href: string;
  shot: string;
  srcSet: string;
  alt: string;
  width: number;
  height: number;
  shotFirst?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`grid gap-6 overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-6 transition-colors hover:border-fd-foreground/20 md:items-center md:gap-10 md:p-10 ${shotFirst ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr]"} ${className}`}
    >
      <div className="grid gap-3">
        <h3 className="m-0 font-semibold text-2xl tracking-tight">{title}</h3>
        {children}
      </div>
      <Shot
        src={shot}
        srcSet={srcSet}
        // Three fifths of the 72rem column on a wide screen, less the card's padding.
        sizes="(min-width: 1152px) 590px, (min-width: 768px) 55vw, calc(100vw - 80px)"
        alt={alt}
        width={width}
        height={height}
        chrome={false}
        imgClassName="aspect-[16/10]"
        className={`shadow-none ${shotFirst ? "md:order-first" : ""}`}
      />
    </Link>
  );
}

function BigFeature({
  title,
  text,
  href,
  shot,
  srcSet,
  alt,
  height,
}: {
  title: string;
  text: string;
  href: string;
  shot: string;
  srcSet: string;
  alt: string;
  height: number;
}) {
  return (
    <Link
      href={href}
      className="group grid gap-6 overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-6 pb-0 transition-colors hover:border-fd-foreground/20"
    >
      <div className="grid gap-2">
        <h3 className="m-0 font-semibold text-lg">{title}</h3>
        <p className="m-0 text-fd-muted-foreground">{text}</p>
      </div>
      <Shot
        src={shot}
        srcSet={srcSet}
        // Half the 72rem column on a wide screen, the whole width on a phone, less the card's padding.
        sizes="(min-width: 1152px) 496px, (min-width: 768px) calc(50vw - 80px), calc(100vw - 80px)"
        alt={alt}
        width={2352}
        height={height}
        chrome={false}
        imgClassName="aspect-[16/10]"
        className="-mb-px rounded-b-none shadow-none"
      />
    </Link>
  );
}

function SmallFeature({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="grid h-full gap-2 rounded-2xl border border-fd-border p-6 transition-colors hover:bg-fd-accent/40"
      >
        <h3 className="m-0 font-semibold">{title}</h3>
        <p className="m-0 text-fd-muted-foreground text-sm">{children}</p>
      </Link>
    </li>
  );
}

/** The front page's own footer, in small type. The docs pages have none. */
function LandingFooter() {
  const links: Array<[string, string]> = [
    ["文档", DOCS_HOME],
    ["应用", appsPath],
    ["提交应用", landingLinks.submit],
    ["安全", landingLinks.security],
    ["GitHub", repositoryUrl],
    ["应用目录仓库", catalogRepositoryUrl],
    ["隐私", landingLinks.privacy],
  ];
  return (
    <footer className="border-fd-border border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-4 px-4 py-10 md:px-6">
        <div className="flex items-center gap-3">
          <Wordmark className="h-5" />
          <span className="text-fd-muted-foreground text-xs">
            面向 Cloudflare 的自托管应用管理器。
          </span>
        </div>
        <nav aria-label="站点导航">
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-xs">
            {links.map(([text, href]) => (
              <li key={href}>
                <Link href={href} className="text-fd-muted-foreground hover:text-fd-foreground">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto m-0 w-full max-w-6xl px-4 pb-10 text-fd-muted-foreground text-xs md:px-6">
        Apache-2.0. {notAffiliated}
      </p>
    </footer>
  );
}
