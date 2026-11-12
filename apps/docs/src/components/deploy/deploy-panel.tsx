import { AppflareLoader } from "@appflare/brand/loader";
import { Badge } from "@cloudflare/kumo/components/badge";
import { Banner } from "@cloudflare/kumo/components/banner";
import { Button, LinkButton } from "@cloudflare/kumo/components/button";
import { Input } from "@cloudflare/kumo/components/input";
import { Meter } from "@cloudflare/kumo/components/meter";
import { Radio } from "@cloudflare/kumo/components/radio";
import { Select } from "@cloudflare/kumo/components/select";
import { Text } from "@cloudflare/kumo/components/text";
import {
  ArrowSquareOutIcon,
  CaretRightIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { type FormEvent, type ReactNode, useEffect, useRef } from "react";
import type {
  AddressChoice,
  DeployView,
  FinishedNote,
  HandoffProblem,
  Notice,
  Plan,
  RemovalTarget,
} from "../../deploy/flow.ts";
import { hostnameFor, workersDevAddress } from "../../deploy/flow.ts";
import type { StepAnswer, Unfinished, Zone } from "../../deploy/installer-api.ts";
import { DEPLOY_PATH } from "../../deploy/paths.ts";
import type { ScopeExamples } from "../../deploy/scope-examples.ts";
import { SITE_URL } from "../../lib/shared.ts";
import { BusyButton } from "./busy-button.tsx";
import {
  DeployCard,
  JourneyContext,
  type JourneyStep,
  More,
  STEP_TITLE_ID,
} from "./deploy-shell.tsx";
import { ScopeList } from "./scope-list.tsx";

/**
 * One step of the deploy page, drawn from the state in `deploy/flow.ts`.
 * Nothing here decides anything: every click is a call on {@link DeployActions}.
 * Each step says one short thing; the rest waits behind a "details" fold.
 */

/** What the page can ask the flow to do. `DeployFlow` is one. */
export interface DeployActions {
  connect(): void;
  reconnect(): void;
  chooseAccount(accountId: string): void;
  startNew(): void;
  continueMine(): void;
  editName(value: string): void;
  submitName(): void;
  chooseAddress(choice: AddressChoice): void;
  submitAddress(): void;
  refreshAddress(): void;
  retryRelease(): void;
  deploy(): void;
  checkNow(): void;
  retry(): void;
  openAtWorkersDev(): void;
  requestRemove(installationId: string): void;
  confirmRemove(): void;
  afterRemoval(): void;
  back(): void;
}

const nothing = () => {};

/** Actions that do nothing: for the prerendered page, before the flow runs. */
export const NO_ACTIONS: DeployActions = {
  connect: nothing,
  reconnect: nothing,
  chooseAccount: nothing,
  startNew: nothing,
  continueMine: nothing,
  editName: nothing,
  submitName: nothing,
  chooseAddress: nothing,
  submitAddress: nothing,
  refreshAddress: nothing,
  retryRelease: nothing,
  deploy: nothing,
  checkNow: nothing,
  retry: nothing,
  openAtWorkersDev: nothing,
  requestRemove: nothing,
  confirmRemove: nothing,
  afterRemoval: nothing,
  back: nothing,
};

/** A primary action spans the card, as on Appflare's own setup screens. */
const WIDE = "w-full justify-center";
/** A secondary action spans the card only on a phone, where actions stack. */
const WIDE_ON_PHONE = "max-sm:w-full max-sm:justify-center";
/** Every button is at least 44 px tall on a phone. */
const TOUCH = "max-sm:h-11";
/** Fields are 44 px tall on a phone, with 16 px text so the browser does not zoom in on them. */
const TOUCH_FIELD = "max-sm:h-11 pointer-coarse:text-[16px]";

/** A value to read whole: an address, a name. */
function Strong({ children }: { children: ReactNode }) {
  return <span className="font-medium text-kumo-default [overflow-wrap:anywhere]">{children}</span>;
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center">{children}</div>;
}

function BackButton({ actions, label = "返回" }: { actions: DeployActions; label?: string }) {
  return (
    <Button variant="ghost" className={`${TOUCH} ${WIDE_ON_PHONE}`} onClick={() => actions.back()}>
      {label}
    </Button>
  );
}

/** A loader and a line saying what is happening, announced politely. */
function Working({ label }: { label: string }) {
  return (
    <div role="status" className="flex items-center gap-3">
      <AppflareLoader size={20} aria-hidden />
      <Text variant="secondary">{label}</Text>
    </div>
  );
}

function ErrorBanner({ title, children }: { title?: string; children?: ReactNode }) {
  return (
    <div role="alert">
      <Banner
        variant="error"
        icon={<WarningCircleIcon weight="fill" />}
        {...(title === undefined ? {} : { title })}
        description={children}
      />
    </div>
  );
}

function AlertBanner({ children }: { children: ReactNode }) {
  return <Banner variant="alert" icon={<WarningIcon weight="fill" />} description={children} />;
}

function hostOf(address: string): string {
  try {
    return new URL(address).host;
  } catch {
    return address;
  }
}

// --- The journey -------------------------------------------------------------

/** The stages a visitor goes through, in order. */
export const STAGES = [
  "Connect",
  "Account",
  "Name",
  "Address",
  "Review",
  "Deploy",
  "Set up",
] as const;
export type Stage = (typeof STAGES)[number];

/** Which stage a step belongs to; null for the steps outside the journey (removing). */
export function stageOf(view: DeployView): Stage | null {
  switch (view.step) {
    case "loading":
    case "unavailable":
    case "welcome":
      return "Connect";
    case "working":
    case "account":
    case "unfinished":
    case "error":
      return "Account";
    case "name":
      return "Name";
    case "address":
      return "Address";
    case "review":
      return "Review";
    case "deploying":
    case "deploy-failed":
    case "handing-off":
    case "handoff-failed":
      return "Deploy";
    case "opening":
    case "set-up":
      return "Set up";
    case "confirm-remove":
    case "removing":
    case "removed":
      return null;
  }
}

/**
 * The journey step a view shows on its meter, or null for a view without
 * one: nothing before Cloudflare is connected (a first screen should not
 * count steps at you), nothing while the page works or asks about an
 * unfinished installation, and nothing from Deploy on, where the deploy's
 * own progress is the bar.
 */
/**
 * Whether the page shows what the installer receives and keeps and the
 * other ways to install: on the first screen (welcome, or welcome to
 * continue) and while the page starts, never once the visitor is back from
 * Cloudflare, having already gone past them.
 */
export function showsIntro(view: DeployView): boolean {
  return view.step === "loading" || view.step === "welcome";
}

export function meterOf(view: DeployView): JourneyStep | null {
  switch (view.step) {
    case "account":
      return "account";
    case "name":
      return "name";
    case "address":
      return "address";
    case "review":
      return "review";
    default:
      return null;
  }
}

/**
 * Whether the person at the page has pressed a key or pointed at something
 * since it loaded. The steps the page takes by itself while it starts
 * (loading, then welcome, or reading the accounts after a sign-in) are not
 * theirs, and moving the focus then would pull it from where they put it.
 */
let acted = false;
let listening = false;

function listenForAction(): void {
  if (listening) return;
  listening = true;
  const mark = () => {
    acted = true;
  };
  document.addEventListener("pointerdown", mark, { capture: true, passive: true });
  document.addEventListener("keydown", mark, { capture: true, passive: true });
}

/** For tests: back to a page nobody has touched. */
export function resetStepFocus(): void {
  acted = false;
}

/**
 * Moves the focus to the step's title when the step changes after the
 * person has acted on the page (not on the steps the page takes by itself
 * while it starts, and not while one step only updates), so keyboard and
 * screen reader users start reading at the new step.
 */
export function useFocusOnStepChange(step: string): void {
  const previous = useRef(step);
  useEffect(() => {
    listenForAction();
  }, []);
  useEffect(() => {
    if (previous.current === step) return;
    previous.current = step;
    if (!acted) return;
    document.getElementById(STEP_TITLE_ID)?.focus({ preventScroll: false });
  }, [step]);
}

// --- Steps -------------------------------------------------------------------

const NOTICES: Record<Notice, string> = {
  reconnect: "Cloudflare 连接已过期。重新连接即可继续，进度不会丢失。",
  "finished-elsewhere": "浏览器记住的安装已完成或已被移除，没有待继续的安装。",
  "account-unreachable":
    "当前 Cloudflare 登录无法访问之前安装的账户。请使用原来的账户登录，或选择其他账户重新安装。",
};

/**
 * What happens after setup when the page was opened from an app's install
 * page (`?app=`). The page does not carry the catalog, so it cannot name
 * the app; the visitor chose it a moment ago.
 */
export const THEN_APP_LINE = "完成 Appflare 设置后，会打开你选择的应用，供你确认安装。";

function ThenApp({ show }: { show: boolean }) {
  return show ? <Text variant="secondary">{THEN_APP_LINE}</Text> : null;
}

function Welcome({
  view,
  actions,
  examples,
  thenApp,
}: {
  view: Extract<DeployView, { step: "welcome" }>;
  actions: DeployActions;
  examples: ScopeExamples;
  thenApp: boolean;
}) {
  return (
    <DeployCard
      meter={meterOf(view)}
      title={view.unfinished ? "继续安装 Appflare" : "安装 Appflare"}
      description={
        view.unfinished
          ? "连接 Cloudflare，继续完成之前的安装。"
          : "通过此页面，几分钟内即可安装到你自己的 Cloudflare 账户。"
      }
    >
      {view.notice !== null && <AlertBanner>{NOTICES[view.notice]}</AlertBanner>}
      {view.error !== null && <ErrorBanner>{view.error}</ErrorBanner>}
      <ThenApp show={thenApp} />
      <BusyButton
        variant="primary"
        size="lg"
        className={`${WIDE} ${TOUCH}`}
        pending={view.busy}
        onClick={() => actions.connect()}
      >
        {view.busy ? "正在打开 Cloudflare…" : "连接 Cloudflare"}
      </BusyButton>
      <More summary="Appflare 需要哪些 Cloudflare 权限">
        <Text variant="secondary">
          一次请求所需的全部权限，之后启用其他功能时无需再次授权。只有你确认并点击“部署”后，才会创建资源。
        </Text>
        <ScopeList examples={examples} />
        <Text variant="secondary">
          其中不包含 Billing 权限，因此 Appflare 会根据账户可用的服务判断 Workers
          套餐，或请你在设置中选择。
        </Text>
      </More>
    </DeployCard>
  );
}

function Unavailable({ view }: { view: Extract<DeployView, { step: "unavailable" }> }) {
  const site = new URL(SITE_URL).host;
  return (
    <DeployCard
      meter={meterOf(view)}
      title="此站点尚未正确配置登录"
      description={
        view.reason === "unregistered-origin"
          ? `Cloudflare 仅允许返回 ${site}。`
          : "此站点配置的登录回调位于另一个地址。"
      }
    >
      <LinkButton
        href={`${SITE_URL}${DEPLOY_PATH}`}
        variant="primary"
        className={`${WIDE} ${TOUCH}`}
      >
        打开 {site}
        {DEPLOY_PATH.replace(/\/$/, "")}
      </LinkButton>
    </DeployCard>
  );
}

function AccountPicker({
  view,
  actions,
}: {
  view: Extract<DeployView, { step: "account" }>;
  actions: DeployActions;
}) {
  return (
    <DeployCard
      meter={meterOf(view)}
      title="选择账户"
      description="当前登录可访问多个 Cloudflare 账户，请选择 Appflare 要安装到的账户。"
    >
      {view.notice !== null && (
        <div className="grid gap-2">
          <AlertBanner>{NOTICES[view.notice]}</AlertBanner>
          {view.notice === "account-unreachable" && (
            <Button
              variant="secondary"
              className={`${WIDE} ${TOUCH}`}
              onClick={() => actions.reconnect()}
            >
              换一个账户登录
            </Button>
          )}
        </div>
      )}
      <ul className="grid gap-2">
        {view.accounts.map((account) => (
          <li key={account.id}>
            <Button
              variant="secondary"
              size="lg"
              className="h-auto min-h-12 w-full justify-between py-2 text-left"
              onClick={() => actions.chooseAccount(account.id)}
            >
              <span className="min-w-0 [overflow-wrap:anywhere]">{account.name}</span>
              <CaretRightIcon aria-hidden className="shrink-0 text-kumo-subtle" />
            </Button>
          </li>
        ))}
      </ul>
    </DeployCard>
  );
}

function progressLine(item: Pick<Unfinished, "done" | "total" | "step" | "status">): string {
  if (item.status === "deployed") return "已部署，尚未连接";
  if (item.status === "removing") return "正在移除";
  return `第 ${Math.min(item.done + 1, item.total)} 步，共 ${item.total} 步：${item.step.label}`;
}

function UnfinishedList({
  view,
  actions,
  canGoBack,
}: {
  view: Extract<DeployView, { step: "unfinished" }>;
  actions: DeployActions;
  canGoBack: boolean;
}) {
  const { mine, others } = view;
  return (
    <DeployCard
      meter={meterOf(view)}
      title={mine !== null ? "继续安装 Appflare？" : "未完成的安装"}
      description={
        mine !== null
          ? "此浏览器之前发起的安装尚未完成。"
          : `账户 ${view.account.name} 有 ${others.length} 个由其他浏览器发起的未完成安装。可在原浏览器继续，或在这里移除。`
      }
    >
      {view.notice !== null && <AlertBanner>{NOTICES[view.notice]}</AlertBanner>}
      {view.error !== undefined && <ErrorBanner>{view.error}</ErrorBanner>}
      {mine !== null && (
        <div className="grid gap-4 rounded-lg p-4 ring ring-kumo-hairline">
          <div className="grid gap-1">
            <Strong>{hostOf(mine.address)}</Strong>
            <Text variant="secondary" size="sm">
              {progressLine(mine)}
            </Text>
          </div>
          <Actions>
            <Button
              variant="primary"
              className={`${TOUCH} ${WIDE_ON_PHONE}`}
              onClick={() => actions.continueMine()}
            >
              继续
            </Button>
            <Button
              variant="secondary-destructive"
              className={`${TOUCH} ${WIDE_ON_PHONE}`}
              onClick={() => actions.requestRemove(mine.id)}
            >
              移除…
            </Button>
          </Actions>
        </div>
      )}
      {others.length > 0 && (
        <div className="grid gap-2">
          {mine !== null && (
            <Text variant="secondary" size="sm">
              其他浏览器发起的未完成安装：
            </Text>
          )}
          <ul className="grid gap-2">
            {others.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-4 py-3 ring ring-kumo-hairline"
              >
                <span className="grid min-w-0 gap-0.5">
                  <Strong>{hostOf(item.address)}</Strong>
                  <Text variant="secondary" size="sm" as="span">
                    {progressLine(item)}
                  </Text>
                </span>
                <Button
                  variant="secondary-destructive"
                  size="sm"
                  className={TOUCH}
                  onClick={() => actions.requestRemove(item.id)}
                >
                  移除…
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {mine === null && (
        <Actions>
          <Button
            variant="primary"
            className={`${WIDE} ${TOUCH} sm:w-auto`}
            onClick={() => actions.startNew()}
          >
            开始新的安装
          </Button>
          {canGoBack && <BackButton actions={actions} />}
        </Actions>
      )}
    </DeployCard>
  );
}

function NameStep({
  view,
  actions,
  canGoBack,
}: {
  view: Extract<DeployView, { step: "name" }>;
  actions: DeployActions;
  canGoBack: boolean;
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    actions.submitName();
  }
  return (
    <DeployCard
      meter={meterOf(view)}
      title="为 Appflare 命名"
      description="如果只安装一份 Appflare，保留建议名称即可。"
    >
      <form className="grid gap-5" onSubmit={submit} noValidate>
        <Input
          label="名称"
          name="worker-name"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          translate="no"
          value={view.value}
          maxLength={58}
          disabled={view.checking}
          onChange={(event) => actions.editName(event.target.value)}
          className={TOUCH_FIELD}
          description={`使用小写字母、数字和连字符。它在 ${view.account.name} 中的数据库和存储也将使用此名称。`}
          {...(view.error === null ? {} : { error: view.error })}
        />
        <Actions>
          <BusyButton
            type="submit"
            variant="primary"
            className={`${WIDE} ${TOUCH} sm:w-auto`}
            pending={view.checking}
          >
            {view.checking ? "正在检查…" : "继续"}
          </BusyButton>
          {canGoBack && <BackButton actions={actions} />}
        </Actions>
      </form>
    </DeployCard>
  );
}

function AddressStep({
  view,
  actions,
  canGoBack,
}: {
  view: Extract<DeployView, { step: "address" }>;
  actions: DeployActions;
  canGoBack: boolean;
}) {
  const { account, workerName, zones, choice } = view;
  const title = "选择 Appflare 的地址";
  const description = "你将通过这个地址访问和登录 Appflare，请选择准备长期使用的地址。";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    actions.submitAddress();
  }
  if (zones === null) {
    return (
      <DeployCard meter={meterOf(view)} title={title} description={description}>
        <Working label={`正在读取 ${account.name} 的域名…`} />
      </DeployCard>
    );
  }
  const sub = account.workersDevSubdomain;
  const devAddress = sub === null ? null : workersDevAddress(workerName, sub);
  if (choice === null) {
    return (
      <DeployCard
        meter={meterOf(view)}
        title={title}
        description={`${account.name} 目前既没有域名，也没有 workers.dev 地址。`}
      >
        <Text variant="secondary">
          请在 Cloudflare 控制台打开一次 Workers &amp; Pages 以启用 workers.dev
          地址，或先为账户添加域名，然后重新检查。
        </Text>
        <Actions>
          <Button
            variant="primary"
            className={`${WIDE} ${TOUCH} sm:w-auto`}
            onClick={() => actions.refreshAddress()}
          >
            重新检查
          </Button>
          {canGoBack && <BackButton actions={actions} />}
        </Actions>
      </DeployCard>
    );
  }
  const domain = choice.kind === "domain" ? choice : null;
  const preview = domain !== null ? hostnameFor(domain) : null;
  const firstZone: Zone | undefined = zones[0];
  const kind = choice.kind === "domain" ? "domain" : "workers-dev";
  return (
    <DeployCard meter={meterOf(view)} title={title} description={description}>
      <form className="grid gap-5" onSubmit={submit} noValidate>
        <Radio.Group
          appearance="card"
          value={kind}
          disabled={view.checking}
          onValueChange={(next) => {
            if (next === "workers-dev") actions.chooseAddress({ kind: "workers-dev" });
            else if (next === "domain" && firstZone !== undefined && domain === null) {
              actions.chooseAddress({
                kind: "domain",
                zone: firstZone.name,
                subdomain: "appflare",
              });
            }
          }}
        >
          <Radio.Legend className="sr-only">地址</Radio.Legend>
          {firstZone !== undefined && (
            <Radio.Item
              value="domain"
              label="使用自己的域名"
              description="Cloudflare 会自动添加 DNS 记录和证书。"
            />
          )}
          <Radio.Item
            value="workers-dev"
            label="Cloudflare 免费地址"
            disabled={devAddress === null}
            description={
              <span className="[overflow-wrap:anywhere]">{devAddress ?? "此账户尚未启用。"}</span>
            }
          />
        </Radio.Group>
        {domain !== null && (
          <div className="grid gap-2">
            <div className="grid items-end gap-3 sm:gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.3fr)]">
              <Input
                label="子域名"
                name="subdomain"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                translate="no"
                value={domain.subdomain}
                disabled={view.checking}
                onChange={(event) =>
                  actions.chooseAddress({ ...domain, subdomain: event.target.value })
                }
                className={TOUCH_FIELD}
              />
              <span aria-hidden="true" className="pb-2 text-kumo-subtle max-sm:hidden">
                .
              </span>
              <div className="min-w-0">
                {zones.length > 1 ? (
                  <Select
                    label="域名"
                    hideLabel={false}
                    value={domain.zone}
                    disabled={view.checking}
                    onValueChange={(zone) => {
                      if (typeof zone === "string") actions.chooseAddress({ ...domain, zone });
                    }}
                    className={`w-full ${TOUCH_FIELD}`}
                    items={Object.fromEntries(zones.map((zone) => [zone.name, zone.name]))}
                  />
                ) : (
                  <div className="grid gap-1.5">
                    <Text size="sm" bold as="span">
                      域名
                    </Text>
                    <span className="flex h-9 items-center font-medium [overflow-wrap:anywhere] max-sm:h-11">
                      {domain.zone}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <Text variant="secondary" size="sm">
              {preview === null ? (
                "域名前缀可使用字母、数字和连字符。"
              ) : (
                <>
                  Appflare 的地址将是 <Strong>https://{preview}</Strong>
                </>
              )}
            </Text>
          </div>
        )}
        {firstZone === undefined && (
          <Text variant="secondary" size="sm">
            {account.name} 在 Cloudflare 上没有域名。之后可以在 Appflare 设置中迁移到自己的域名。
          </Text>
        )}
        {view.error !== null && <ErrorBanner>{view.error}</ErrorBanner>}
        <Actions>
          <BusyButton
            type="submit"
            variant="primary"
            className={`${WIDE} ${TOUCH} sm:w-auto`}
            pending={view.checking}
          >
            {view.checking ? "正在检查地址…" : "继续"}
          </BusyButton>
          {canGoBack && <BackButton actions={actions} />}
        </Actions>
      </form>
    </DeployCard>
  );
}

/** What a deploy of `plan` creates, in words. */
export function createdItems(plan: Pick<Plan, "workerName" | "hostname" | "address">): string[] {
  const name = plan.workerName;
  const jobs = name === "appflare" ? "appflare-jobs" : `${name}-jobs`;
  return [
    `Appflare 主程序：名为 ${name} 的 Worker`,
    `数据库：名为 ${name} 的 D1 数据库`,
    `设置存储：名为 ${name}-kv 的 KV 命名空间`,
    `后台任务：名为 ${jobs} 的 Workflow，以及定期检查计划`,
    plan.hostname === null
      ? `workers.dev 访问地址：${plan.address}`
      : `自定义域名 ${plan.hostname}，以及对应的 DNS 记录和证书`,
  ];
}

function Review({
  view,
  actions,
  thenApp,
}: {
  view: Extract<DeployView, { step: "review" }>;
  actions: DeployActions;
  thenApp: boolean;
}) {
  const { plan } = view;
  const rows: Array<[string, ReactNode]> = [
    ["账户", plan.account.name],
    [
      "名称",
      <span key="name" translate="no">
        {plan.workerName}
      </span>,
    ],
    ["地址", <Strong key="address">{plan.address}</Strong>],
    [
      "发布版本",
      view.release !== null ? (
        <span key="release" className="inline-flex flex-wrap items-center gap-2">
          Appflare {view.release}
          <Badge variant="success" icon={<CheckCircleIcon weight="fill" />}>
            签名已验证
          </Badge>
        </span>
      ) : view.releaseError === null ? (
        <span key="release" className="inline-flex items-center gap-2 text-kumo-subtle">
          <AppflareLoader size={14} aria-hidden />
          正在查询…
        </span>
      ) : (
        <span key="release" className="text-kumo-danger">
          暂不可用
        </span>
      ),
    ],
  ];
  return (
    <DeployCard
      meter={meterOf(view)}
      title="确认并部署"
      description="点击“部署”之前，不会在你的账户中创建任何资源。"
    >
      <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[max-content_1fr]">
        {rows.map(([term, value]) => (
          <div key={term} className="grid gap-0.5 sm:contents">
            <dt className="text-kumo-subtle text-sm">{term}</dt>
            <dd className="[overflow-wrap:anywhere]">{value}</dd>
          </div>
        ))}
      </dl>
      <ThenApp show={thenApp} />
      <More summary={`将在 ${plan.account.name} 创建哪些资源`}>
        <ul className="grid list-disc gap-1 pl-5">
          {createdItems(plan).map((item) => (
            <li key={item} className="[overflow-wrap:anywhere]">
              {item}
            </li>
          ))}
        </ul>
        <Text variant="secondary">
          账户中的原有内容不会改变。如果中途停止，你可以移除本次创建的这些资源。
        </Text>
      </More>
      {view.releaseError !== null && (
        <div className="grid gap-2">
          <ErrorBanner>{view.releaseError}</ErrorBanner>
          <Button
            variant="secondary"
            className={`${TOUCH} ${WIDE_ON_PHONE} sm:justify-self-start`}
            onClick={() => actions.retryRelease()}
          >
            重试
          </Button>
        </div>
      )}
      {view.error !== null && <ErrorBanner>{view.error}</ErrorBanner>}
      <Actions>
        <BusyButton
          variant="primary"
          size="lg"
          className={`${WIDE} ${TOUCH} sm:w-auto`}
          disabled={view.release === null}
          pending={view.starting}
          onClick={() => actions.deploy()}
        >
          {view.starting ? "正在启动…" : "部署 Appflare"}
        </BusyButton>
        {!view.starting && <BackButton actions={actions} />}
      </Actions>
    </DeployCard>
  );
}

/** One short line for each warning a finished step can give; the installer's words on demand. */
const NOTICE_LINES: Record<string, string> = {
  schedules: "Appflare 的定期检查（例如检查更新）不会自动运行。",
};

/**
 * Warnings from finished steps, kept on screen from the step that gave them
 * to owner setup: one line each, the full explanation folded away.
 */
function Notices({ notices }: { notices: FinishedNote[] }) {
  if (notices.length === 0) return null;
  return (
    <div className="grid gap-2">
      {notices.map((notice) => (
        <Banner
          key={notice.id}
          variant="alert"
          icon={<WarningIcon weight="fill" />}
          description={
            <div className="grid gap-1">
              <span>{NOTICE_LINES[notice.id] ?? `${notice.label}：需要你处理。`}</span>
              <More summary="原因">
                <span>{notice.message}</span>
              </More>
            </div>
          }
        />
      ))}
    </div>
  );
}

/** "Step 6 of 11": the step under way. */
function stepPosition(progress: Pick<StepAnswer, "done" | "total">): string {
  return `第 ${Math.min(progress.done + 1, progress.total)} 步，共 ${progress.total} 步`;
}

/** "5 of 11 done": what the bar shows. */
function stepsDone(progress: Pick<StepAnswer, "done" | "total">): string {
  return `已完成 ${Math.min(progress.done, progress.total)} / ${progress.total} 步`;
}

/**
 * The installer's steps as a bar of the steps finished, with the step under
 * way named beside it, so the number next to the bar is the bar's own.
 */
function StepMeter({ progress }: { progress: Pick<StepAnswer, "done" | "total"> }) {
  return (
    <Meter
      label={stepPosition(progress)}
      customValue={stepsDone(progress)}
      value={Math.min(progress.done, progress.total)}
      max={Math.max(progress.total, 1)}
      getAriaValueText={() => stepsDone(progress)}
    />
  );
}

const timeFormat = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });

/** Check now, busy while it checks, and what the last check found. */
function CheckNow({
  view,
  actions,
}: {
  view: Extract<DeployView, { step: "deploying" }>;
  actions: DeployActions;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <BusyButton
        variant="secondary"
        size="sm"
        className={TOUCH}
        pending={view.checking}
        onClick={() => actions.checkNow()}
      >
        {view.checking ? "正在检查…" : "立即检查"}
      </BusyButton>
      <span role="status" className="text-kumo-subtle text-sm">
        {view.checking ? (
          // The button already shows it; this says it to screen readers.
          <span className="sr-only">正在检查…</span>
        ) : view.checkedAt !== null ? (
          `仍在等待（上次检查：${timeFormat.format(view.checkedAt)}）。`
        ) : (
          ""
        )}
      </span>
    </div>
  );
}

/** Why the deploy waits on the address, in one line. */
export function addressWaitLine(view: Extract<DeployView, { step: "deploying" }>): string {
  const { hostname } = view.active;
  return hostname !== null
    ? `Cloudflare 正在配置 ${hostname} 及其证书，通常需要 1 至 5 分钟。`
    : "Cloudflare 正在将 Appflare 上线到 workers.dev 地址，通常不到一分钟。";
}

function Deploying({
  view,
  actions,
  thenApp,
}: {
  view: Extract<DeployView, { step: "deploying" }>;
  actions: DeployActions;
  thenApp: boolean;
}) {
  const { active, progress, reconnecting, wait } = view;
  const label = reconnecting ? "正在重新连接…" : (progress?.step.label ?? "正在启动…");
  const announcement = reconnecting
    ? "正在重新连接 Appflare 安装器。"
    : progress === null
      ? "正在启动。"
      : `${stepPosition(progress)}: ${progress.step.label}. ${stepsDone(progress)}.`;
  // A message about the step itself while it runs ("Uploaded 120 of 180 files").
  const running = progress?.status === "running" && !reconnecting ? progress.message : undefined;
  const details = [
    ...view.notes.map((note) => ({ key: note.id, label: note.label, text: note.message })),
    // What the installer's last look at the address found, for the curious.
    ...(wait === "address" && progress?.message !== undefined
      ? [{ key: "now", label: "上次检查", text: progress.message }]
      : []),
  ];
  return (
    // The deploy's own meter is the one that moves here; the journey's would be a second bar.
    <DeployCard
      meter={null}
      title="正在安装 Appflare"
      description={
        <>
          账户：{active.accountName}，地址：<Strong>{hostOf(active.address)}</Strong>
        </>
      }
    >
      <div className="grid gap-3">
        {/* Busy, and silent: the status line after it announces the progress. */}
        <div aria-busy="true" className="flex items-start gap-3">
          <span className="flex h-lh items-center">
            <AppflareLoader size={22} aria-hidden />
          </span>
          <div className="grid min-w-0 gap-0.5">
            <Text bold>{label}</Text>
            {running !== undefined && (
              <Text variant="secondary" size="sm">
                {running}
              </Text>
            )}
          </div>
        </div>
        {progress !== null && <StepMeter progress={progress} />}
        <p role="status" className="sr-only">
          {announcement}
        </p>
      </div>
      <Notices notices={active.notices} />
      {!reconnecting && wait === "address" && (
        <div className="grid gap-2">
          <Text variant="secondary">{addressWaitLine(view)}</Text>
          <CheckNow view={view} actions={actions} />
        </div>
      )}
      {!reconnecting && wait === "long" && (
        <div className="grid gap-2">
          <Text variant="secondary">
            {progress?.message ?? "安装器要求此页面稍候。"} 页面会持续尝试。
          </Text>
          <CheckNow view={view} actions={actions} />
        </div>
      )}
      {view.offerWorkersDev && active.workersDevAddress !== null && active.hostname !== null && (
        <RatherNotWait
          hostname={active.hostname}
          workersDevAddress={active.workersDevAddress}
          onOpen={() => actions.openAtWorkersDev()}
        />
      )}
      <ThenApp show={thenApp} />
      <Text variant="secondary" size="sm">
        {active.remembered
          ? "可以关闭此标签页。之后用同一浏览器返回此页面即可继续。"
          : "请保持标签页打开直到完成：此浏览器不允许页面保存安装进度。"}
      </Text>
      {details.length > 0 && (
        <More summary="详情">
          <ul className="grid gap-1.5">
            {details.map((item) => (
              <li key={item.key}>
                <span className="text-kumo-default">{item.label}:</span> {item.text}
              </li>
            ))}
          </ul>
        </More>
      )}
    </DeployCard>
  );
}

/**
 * The way around a slow certificate, offered only after a long wait: one
 * line, the button, and the consequence on demand.
 */
function RatherNotWait({
  hostname,
  workersDevAddress,
  onOpen,
}: {
  hostname: string;
  workersDevAddress: string;
  onOpen: () => void;
}) {
  return (
    <div className="grid gap-2 border-kumo-hairline border-t pt-4">
      <Text>
        不想等待？可先在 workers.dev 创建所有者账户，等 {hostname} 就绪后，Appflare 会自动迁移过去。
      </Text>
      <Button
        variant="secondary"
        size="sm"
        className={`${TOUCH} ${WIDE_ON_PHONE} sm:justify-self-start`}
        onClick={onOpen}
      >
        在 workers.dev 打开
      </Button>
      <More summary="有什么不同">
        <Text variant="secondary">
          Appflare 会在 <Strong>{workersDevAddress}</Strong> 打开，无需申请新证书。安装内容和
          Cloudflare 连接均保持不变。
        </Text>
      </More>
    </div>
  );
}

function DeployFailed({
  view,
  actions,
}: {
  view: Extract<DeployView, { step: "deploy-failed" }>;
  actions: DeployActions;
}) {
  return (
    <DeployCard
      meter={meterOf(view)}
      title="安装已中止"
      {...(view.progress === null ? {} : { description: `停止位置：${view.progress.step.label}` })}
    >
      <ErrorBanner>{view.message}</ErrorBanner>
      <Actions>
        <Button
          variant="primary"
          className={`${WIDE} ${TOUCH} sm:w-auto`}
          onClick={() => actions.retry()}
        >
          重试
        </Button>
        <Button
          variant="secondary-destructive"
          className={`${TOUCH} ${WIDE_ON_PHONE}`}
          onClick={() => actions.requestRemove(view.active.local.installationId)}
        >
          移除此安装…
        </Button>
      </Actions>
    </DeployCard>
  );
}

const minutesText = (minutes: number | undefined) =>
  minutes === undefined ? "几分钟" : `${minutes} 分钟`;

// Only the first two happen before anything is sent; the rest describe how
// Appflare answered after this page sent it its Cloudflare connection.
const HANDOFF_PROBLEMS: Record<HandoffProblem, (address: string, minutes?: number) => string> = {
  unreachable: (a) => `${a} 尚未响应，未向它发送任何信息。`,
  unverified: (a) => `${a} 有响应，但不是你新安装的 Appflare，因此未向它发送任何信息。`,
  refused: () =>
    "新安装的 Appflare 未接受此浏览器的安装密钥。如果你在其他浏览器发起了安装，请在那里完成。",
  elsewhere: (_a, m) =>
    `另一个浏览器正在使用 Cloudflare API 令牌完成此 Appflare 的设置。请在那里继续，或 ${minutesText(m)}后在这里重试。`,
  declined: () =>
    "新安装的 Appflare 无法使用当前 Cloudflare 连接。请重新连接，选择 Appflare 所在的账户，并允许其请求的全部权限。",
  "rate-limited": () => "多次尝试后，新安装的 Appflare 要求稍候。请几分钟后重试。",
  busy: () => "新安装的 Appflare 正忙于其他步骤，或暂时无法连接 Cloudflare。请一分钟后重试。",
  failed: () => "新安装的 Appflare 已收到请求，但未能完成与 Cloudflare 的连接。请重试。",
  "no-answer": () => "连接过程中，新安装的 Appflare 停止响应。请重试。",
  invalid: () => "新安装的 Appflare 返回了此页面无法处理的响应。请重试。",
};

function HandingOff({ view }: { view: Extract<DeployView, { step: "handing-off" }> }) {
  return (
    <DeployCard
      meter={meterOf(view)}
      title="正在连接新安装的 Appflare"
      description={
        <>
          地址：<Strong>{hostOf(view.address)}</Strong>
        </>
      }
    >
      <Working label="正在确认这是你新安装的 Appflare…" />
      <Notices notices={view.active.notices} />
      <More summary="此步骤做什么">
        <Text variant="secondary">
          确认地址属于本次安装后，此页面会将 Cloudflare 连接信息从浏览器直接交给新的
          Appflare，不经过安装器。
        </Text>
      </More>
    </DeployCard>
  );
}

function HandoffFailed({
  view,
  actions,
}: {
  view: Extract<DeployView, { step: "handoff-failed" }>;
  actions: DeployActions;
}) {
  return (
    <DeployCard
      meter={meterOf(view)}
      title="Appflare 已安装，尚未连接"
      description={
        <>
          地址：<Strong>{hostOf(view.address)}</Strong>
        </>
      }
    >
      <ErrorBanner>{HANDOFF_PROBLEMS[view.problem](view.address, view.minutes)}</ErrorBanner>
      <Notices notices={view.active.notices} />
      <Actions>
        {view.problem === "declined" ? (
          // The connection itself was refused: sending it again cannot help.
          <Button
            variant="primary"
            className={`${WIDE} ${TOUCH} sm:w-auto`}
            onClick={() => actions.reconnect()}
          >
            重新连接 Cloudflare
          </Button>
        ) : (
          <Button
            variant="primary"
            className={`${WIDE} ${TOUCH} sm:w-auto`}
            onClick={() => actions.retry()}
          >
            重试
          </Button>
        )}
        <Button
          variant="secondary-destructive"
          className={`${TOUCH} ${WIDE_ON_PHONE}`}
          onClick={() => actions.requestRemove(view.active.local.installationId)}
        >
          移除此安装…
        </Button>
      </Actions>
    </DeployCard>
  );
}

function Opening({
  view,
  actions,
}: {
  view: Extract<DeployView, { step: "opening" }>;
  actions: DeployActions;
}) {
  const host = hostOf(view.address);
  return (
    <DeployCard
      meter={meterOf(view)}
      title={
        <span className="inline-flex items-center gap-2">
          <CheckCircleIcon aria-hidden weight="fill" className="shrink-0 text-kumo-success" />
          Appflare 已就绪
        </span>
      }
      description={
        <>
          地址：<Strong>{host}</Strong>。请在此创建所有者账户。
          {view.thenApp && " 随后会打开你选择的应用，供你确认安装。"}
        </>
      }
    >
      {view.answering === "not-yet" ? (
        <>
          <div role="status">
            <Text variant="secondary">
              {host} 尚未在所有地区生效。新地址可能需要一分钟才能全面访问。
            </Text>
          </div>
          <Actions>
            <Button
              variant="primary"
              className={`${WIDE} ${TOUCH} sm:w-auto`}
              onClick={() => actions.retry()}
            >
              重试
            </Button>
            <LinkButton
              href={view.ownerSetupUrl}
              variant="secondary"
              className={`${TOUCH} ${WIDE_ON_PHONE}`}
              rel="noreferrer"
              icon={ArrowSquareOutIcon}
            >
              仍然打开 Appflare
            </LinkButton>
          </Actions>
        </>
      ) : (
        // Opened only once the address answers as this Appflare, so the
        // visitor never lands on Cloudflare's "not found" page meanwhile.
        <Working label="正在打开…" />
      )}
      <Text variant="secondary" size="sm">
        链接有效期为 30 分钟。
      </Text>
      <Notices notices={view.notices} />
    </DeployCard>
  );
}

function SetUp({ view }: { view: Extract<DeployView, { step: "set-up" }> }) {
  return (
    <DeployCard
      meter={meterOf(view)}
      title="此 Appflare 已完成设置"
      description={
        <>
          所有者账户已创建。请在 <Strong>{hostOf(view.address)}</Strong> 登录
          {view.thenApp ? "，随后会打开你选择的应用，供你确认安装。" : "。"}
        </>
      }
    >
      <LinkButton
        href={view.open}
        variant="primary"
        className={`${WIDE} ${TOUCH}`}
        rel="noreferrer"
      >
        {view.thenApp ? "在 Appflare 中打开应用" : "打开 Appflare"}
      </LinkButton>
      <Notices notices={view.notices} />
    </DeployCard>
  );
}

function removalItems(target: RemovalTarget): string[] {
  return createdItems({
    workerName: target.workerName,
    hostname: target.hostname,
    address: target.address,
  }).map((item) => item.replace(/^Its address on workers\.dev, /, "Its workers.dev address, "));
}

function ConfirmRemove({
  view,
  actions,
}: {
  view: Extract<DeployView, { step: "confirm-remove" }>;
  actions: DeployActions;
}) {
  const { target } = view;
  return (
    <DeployCard
      meter={null}
      title="移除此安装？"
      description={
        <>
          将删除 <Strong>{hostOf(target.address)}</Strong>{" "}
          本次安装已创建的全部资源，此操作无法撤销。
        </>
      }
    >
      <More summary={`将从 ${target.account.name} 删除哪些资源`}>
        <ul className="grid list-disc gap-1 pl-5">
          {removalItems(target).map((item) => (
            <li key={item} className="[overflow-wrap:anywhere]">
              {item}
            </li>
          ))}
        </ul>
        <Text variant="secondary">账户原有的内容会保留。Appflare 的数据将随其数据库一起删除。</Text>
      </More>
      <Actions>
        <Button
          variant="destructive"
          className={`${WIDE} ${TOUCH} sm:w-auto`}
          onClick={() => actions.confirmRemove()}
        >
          移除
        </Button>
        <BackButton actions={actions} label="取消" />
      </Actions>
    </DeployCard>
  );
}

function Removing({
  view,
  actions,
}: {
  view: Extract<DeployView, { step: "removing" }>;
  actions: DeployActions;
}) {
  const { progress } = view;
  return (
    <DeployCard
      meter={null}
      title="正在移除安装"
      description={
        <>
          地址：<Strong>{hostOf(view.target.address)}</Strong>
        </>
      }
    >
      {view.error === null && (
        <div className="grid gap-3">
          <Working label={progress === null ? "正在启动…" : progress.step.label} />
          {progress !== null && <StepMeter progress={progress} />}
        </div>
      )}
      {view.error !== null && (
        <div className="grid gap-2">
          <ErrorBanner>{view.error}</ErrorBanner>
          <Button
            variant="primary"
            className={`${WIDE} ${TOUCH} sm:w-auto sm:justify-self-start`}
            onClick={() => actions.retry()}
          >
            重试
          </Button>
        </div>
      )}
    </DeployCard>
  );
}

function Removed({
  view,
  actions,
}: {
  view: Extract<DeployView, { step: "removed" }>;
  actions: DeployActions;
}) {
  return (
    <DeployCard
      meter={null}
      title="已移除"
      description={
        <>
          已移除 <Strong>{hostOf(view.target.address)}</Strong>{" "}
          的安装及其创建的全部资源，安装器不再保留相关记录。
        </>
      }
    >
      <Button
        variant="primary"
        className={`${WIDE} ${TOUCH}`}
        onClick={() => actions.afterRemoval()}
      >
        开始新的安装
      </Button>
    </DeployCard>
  );
}

function ErrorStep({
  view,
  actions,
}: {
  view: Extract<DeployView, { step: "error" }>;
  actions: DeployActions;
}) {
  return (
    <DeployCard meter={meterOf(view)} title="操作未成功">
      <ErrorBanner>{view.message}</ErrorBanner>
      <Actions>
        {view.retry !== null && (
          <Button
            variant="primary"
            className={`${WIDE} ${TOUCH} sm:w-auto`}
            onClick={() => actions.retry()}
          >
            重试
          </Button>
        )}
        <Button
          variant="secondary"
          className={`${TOUCH} ${WIDE_ON_PHONE}`}
          onClick={() => actions.reconnect()}
        >
          重新连接 Cloudflare
        </Button>
      </Actions>
    </DeployCard>
  );
}

function Loading({ view }: { view: Extract<DeployView, { step: "loading" }> }) {
  return (
    <DeployCard
      meter={meterOf(view)}
      title="安装 Appflare"
      description="通过此页面，几分钟内即可安装到你自己的 Cloudflare 账户。"
    >
      <Working label="正在准备…" />
      <noscript>
        <Text variant="secondary">安装 Appflare 需要启用 JavaScript。</Text>
      </noscript>
    </DeployCard>
  );
}

export interface DeployPanelProps {
  view: DeployView;
  actions: DeployActions;
  canGoBack: boolean;
  /**
   * Whether this sign-in reaches several accounts, so choosing one is a step
   * of its own; when it is not, the meter does not count it.
   */
  accountStep?: boolean;
  /** Example apps for the permissions' reasons, from the catalog the site is built with. */
  examples?: ScopeExamples;
  /** The page was opened from an app's install page: setup ends at that app. */
  thenApp?: boolean;
}

/** The current step, in its card. */
export function DeployPanel({
  view,
  actions,
  canGoBack,
  accountStep = false,
  examples = {},
  thenApp = false,
}: DeployPanelProps) {
  useFocusOnStepChange(view.step);
  return (
    <JourneyContext.Provider value={{ accountStep }}>
      <Step
        view={view}
        actions={actions}
        canGoBack={canGoBack}
        examples={examples}
        thenApp={thenApp}
      />
    </JourneyContext.Provider>
  );
}

function Step({ view, actions, canGoBack, examples = {}, thenApp = false }: DeployPanelProps) {
  switch (view.step) {
    case "loading":
      return <Loading view={view} />;
    case "unavailable":
      return <Unavailable view={view} />;
    case "welcome":
      return <Welcome view={view} actions={actions} examples={examples} thenApp={thenApp} />;
    case "working":
      return (
        <DeployCard meter={meterOf(view)} title="已连接 Cloudflare">
          <Working label={view.label} />
        </DeployCard>
      );
    case "account":
      return <AccountPicker view={view} actions={actions} />;
    case "unfinished":
      return <UnfinishedList view={view} actions={actions} canGoBack={canGoBack} />;
    case "name":
      return <NameStep view={view} actions={actions} canGoBack={canGoBack} />;
    case "address":
      return <AddressStep view={view} actions={actions} canGoBack={canGoBack} />;
    case "review":
      return <Review view={view} actions={actions} thenApp={thenApp} />;
    case "deploying":
      return <Deploying view={view} actions={actions} thenApp={thenApp} />;
    case "deploy-failed":
      return <DeployFailed view={view} actions={actions} />;
    case "handing-off":
      return <HandingOff view={view} />;
    case "handoff-failed":
      return <HandoffFailed view={view} actions={actions} />;
    case "opening":
      return <Opening view={view} actions={actions} />;
    case "set-up":
      return <SetUp view={view} />;
    case "confirm-remove":
      return <ConfirmRemove view={view} actions={actions} />;
    case "removing":
      return <Removing view={view} actions={actions} />;
    case "removed":
      return <Removed view={view} actions={actions} />;
    case "error":
      return <ErrorStep view={view} actions={actions} />;
  }
}
