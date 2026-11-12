import { CLOUD_ORANGE, CLOUD_PATH, INK_PATHS, VIEW_BOX } from "@appflare/brand/logo-paths";
import { Collapsible } from "@cloudflare/kumo/components/collapsible";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Link } from "@cloudflare/kumo/components/link";
import { Meter } from "@cloudflare/kumo/components/meter";
import { Text } from "@cloudflare/kumo/components/text";
import { createContext, type ReactNode, useContext } from "react";
import { repositoryUrl, siteName } from "../../lib/shared.ts";
import { Appearance } from "./appearance.tsx";

/**
 * The frame of the deploy page and its callback, drawn like the screens
 * Appflare itself shows before sign-in: the logo, one card with the step
 * meter, a title and one line under it, then (on the deploy page) what the
 * installer receives and the other ways to install, both folded away, and a
 * footer. Kumo throughout; the colours follow the site's light or dark
 * choice, which the footer can change.
 */

/** Black on light surfaces, white on dark ones; the cloud stays orange. */
const INK = "light-dark(#000, #fff)";

/** The full Appflare logo, leading to the site's front page. */
function LogoLink() {
  const height = 28;
  const width = Math.round((height * VIEW_BOX.width * 100) / VIEW_BOX.height) / 100;
  return (
    <a
      href="/"
      className="inline-flex min-h-11 items-center rounded-md px-1 focus-visible:outline-2 focus-visible:outline-kumo-focus focus-visible:outline-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${VIEW_BOX.width} ${VIEW_BOX.height}`}
        width={width}
        height={height}
        role="img"
        aria-label={`${siteName} 首页`}
      >
        <g style={{ fill: INK }}>
          {INK_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <path fill={CLOUD_ORANGE} d={CLOUD_PATH} />
      </svg>
    </a>
  );
}

export function DeployLayout({
  children,
  aside = true,
}: {
  children: ReactNode;
  /** The installer's terms and the other ways to install (not on the callback). */
  aside?: boolean;
}) {
  return (
    <main className="isolate flex min-h-dvh flex-col bg-kumo-canvas text-kumo-default [padding-inline:max(1rem,env(safe-area-inset-left))]">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center gap-6 pt-6 pb-10 sm:pt-12">
        <LogoLink />
        {children}
        {aside && (
          <div className="grid w-full gap-1 px-1">
            <InstallerTerms />
            <OtherWays />
          </div>
        )}
      </div>
      <footer className="mx-auto flex w-full max-w-xl flex-wrap items-center justify-between gap-x-4 gap-y-2 border-kumo-hairline border-t px-1 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-wrap items-center gap-x-4">
          <FooterLink href="/start/browser-install/">帮助</FooterLink>
          <FooterLink href="/privacy/">隐私</FooterLink>
          <FooterLink href={`${repositoryUrl}/tree/main/apps/installer`}>源码</FooterLink>
        </div>
        <Appearance />
      </footer>
    </main>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Text variant="secondary" as="span">
      <Link
        href={href}
        variant="plain"
        className="inline-flex min-h-11 items-center text-kumo-subtle"
      >
        {children}
      </Link>
    </Text>
  );
}

/** The id of the step's title, which takes the focus when the step changes. */
export const STEP_TITLE_ID = "deploy-step-title";

/** The steps between connecting Cloudflare and deploying that show a meter. */
export type JourneyStep = "account" | "name" | "address" | "review";

const JOURNEY_LABELS: Record<JourneyStep, string> = {
  account: "选择账户",
  name: "名称",
  address: "地址",
  review: "确认",
};

/** What the meter needs from the page: whether choosing an account is a step on this sign-in. */
export const JourneyContext = createContext<{ accountStep: boolean }>({ accountStep: false });

/**
 * Where `step` is on the way to the deploy, counting only the steps this
 * sign-in shows (no account step when it reaches one account), so the bar
 * has no gaps or jumps. The deploy itself is the last step; its own
 * progress takes over there.
 */
export function journeyPosition(
  step: JourneyStep,
  accountStep: boolean,
): { step: number; count: number } {
  const steps: Array<JourneyStep | "deploy"> = [
    ...(accountStep ? (["account"] as const) : []),
    "name",
    "address",
    "review",
    "deploy",
  ];
  return { step: steps.indexOf(step) + 1, count: steps.length };
}

/**
 * The card's meter: a slim bar and the step's name, no count on screen.
 * The count is the bar's value for assistive technology.
 */
function JourneyMeter({ step }: { step: JourneyStep }) {
  const { accountStep } = useContext(JourneyContext);
  const at = journeyPosition(step, accountStep);
  return (
    <Meter
      label={JOURNEY_LABELS[step]}
      showValue={false}
      value={at.step}
      max={at.count}
      getAriaValueText={() => `第 ${at.step} 步，共 ${at.count} 步`}
      trackClassName="h-1"
    />
  );
}

/**
 * The card of one step: the meter (where the step is on the way to the
 * deploy), the title, one line under it, then the step's content. The card
 * is never marked busy as a whole: that would silence the live regions in
 * it, which announce the progress.
 */
export function DeployCard({
  meter,
  title,
  description,
  children,
}: {
  meter: JourneyStep | null;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <LayerCard className="grid w-full gap-6 rounded-xl px-5 py-5 sm:px-8 sm:py-7">
      <div className="grid gap-5">
        {meter !== null && <JourneyMeter step={meter} />}
        <div className="grid gap-1.5">
          <Text variant="heading" size="lg" as="h1">
            <span id={STEP_TITLE_ID} tabIndex={-1} className="outline-none [text-wrap:balance]">
              {title}
            </span>
          </Text>
          {description !== undefined && <Text variant="secondary">{description}</Text>}
        </div>
      </div>
      {children}
    </LayerCard>
  );
}

/**
 * Detail on demand: folded away until asked for, in Kumo's disclosure. The
 * trigger is at least 44 px tall on touch screens.
 */
export function More({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <Collapsible.Root>
      <Collapsible.DefaultTrigger className="min-h-11 text-kumo-subtle sm:min-h-8">
        {summary}
      </Collapsible.DefaultTrigger>
      {/* Kept in the page while folded, so find-in-page and the prerendered HTML have it. */}
      <Collapsible.DefaultPanel keepMounted>
        <div className="grid gap-2 text-kumo-subtle">{children}</div>
      </Collapsible.DefaultPanel>
    </Collapsible.Root>
  );
}

/** What Appflare's hosted installer receives and keeps, folded away. */
export function InstallerTerms() {
  return (
    <More summary="安装器接收和保存哪些信息">
      <Text variant="secondary">
        网页无法自行创建 Worker，因此部署由页面背后的开源服务——Appflare 安装器——完成。
      </Text>
      <Text variant="secondary">
        每次请求都会向安装器发送短期有效的 Cloudflare 访问令牌，授权范围与你授予 Appflare
        的权限相同。因此，你需要信任安装器运行的是
        <Link href={`${repositoryUrl}/tree/main/apps/installer`}>公开的源码</Link>
        。安装器不会保存这个令牌，令牌会在有效期结束后失效。
      </Text>
      <Text variant="secondary">
        用于保持连接的刷新令牌不会发送给安装器，而是由浏览器直接交给新安装的 Appflare。
      </Text>
      <Text variant="secondary">
        在创建所有者账户之前，安装器会保留账户
        ID、名称、地址、发布版本和已创建的资源，以便继续或移除安装。记录不包含令牌或密码；创建所有者账户或移除安装后就会删除。
      </Text>
      <Text variant="secondary">
        此页面仅统计安装进度，不记录你的身份或账户信息。<Link href="/privacy/">隐私说明</Link>
      </Text>
    </More>
  );
}

/** The ways to install without the hosted installer, folded away. */
export function OtherWays() {
  return (
    <More summary="其他安装方式">
      <Text variant="secondary">
        不使用本站安装器，也能安装同一份已签名的 Appflare：通过
        <Link href="/start/deploy-button/">Deploy to Cloudflare 按钮</Link>，在你的 GitHub 或 GitLab
        账户中生成副本；或者在终端运行
        <code className="font-mono text-[0.9em]">npx create-appflare</code>{" "}
        <Link href="/start/install/">查看命令行安装说明</Link>。
      </Text>
    </More>
  );
}
