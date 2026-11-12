import { buttonVariants } from "@fumadocs/base-ui/components/ui/button";
import { type FormEvent, type ReactNode, useId } from "react";
import { PRIVATE_CLASS } from "../../analytics/analytics.ts";
import { appsPath, installPath } from "../../catalog/urls.ts";
import { deployPathFor } from "../../deploy/app.ts";
import { inAppBrowserName } from "../../in-app/browser.ts";
import { useBrowser } from "../../in-app/use-browser.ts";
import { EXAMPLE_ADDRESS } from "../../install/address.ts";
import type { FlowAction, FlowState } from "../../install/flow.ts";
import { type InstallApp, installPagePath, requestLabel } from "../../install/request.ts";
import { CLOUDFLARE_DEPLOY_URL, installLink } from "../../lib/install-links.ts";
import type { InAppBrowser } from "../in-app/open-in-browser.tsx";
import { InstallButton, InstallShareLine } from "../install-appflare.tsx";

/**
 * One step of an install page or of `/my/`, drawn from the state in
 * `install/flow.ts`. Nothing here decides anything: every click goes back
 * to the state module as an action.
 */

/** Cloudflare's Deploy to Cloudflare button, through Appflare's short link that counts its clicks. */
export const DEPLOY_BUTTON_URL = CLOUDFLARE_DEPLOY_URL;

const primary = buttonVariants({ variant: "primary", className: "px-4 py-2 text-sm" });
const secondary = buttonVariants({ variant: "secondary", className: "px-4 py-2 text-sm" });
const quiet = buttonVariants({ variant: "ghost", className: "px-3 py-2 text-sm" });
const textLink = "font-medium text-fd-primary underline underline-offset-2";

function Title({ children }: { children: ReactNode }) {
  return <h2 className="font-semibold text-xl tracking-tight">{children}</h2>;
}

function Text({ children }: { children: ReactNode }) {
  return <p className="text-fd-muted-foreground leading-relaxed">{children}</p>;
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2 pt-1">{children}</div>;
}

/**
 * An address as the visitor should read it: whole, never cut. It is the
 * visitor's own, so analytics never record it (see `PRIVATE_CLASS`), as
 * with every link to it and the field it is typed into.
 */
function Origin({ origin }: { origin: string }) {
  return (
    <strong
      className={`${PRIVATE_CLASS} font-semibold text-fd-foreground [overflow-wrap:anywhere]`}
    >
      {origin}
    </strong>
  );
}

function CannotRememberNote() {
  return (
    <p className="rounded-lg border border-fd-border bg-fd-secondary px-3 py-2 text-fd-muted-foreground text-sm">
      此浏览器不允许网站记住你的 Appflare，因此每次都需要输入地址。
    </p>
  );
}

export interface FlowPanelProps {
  state: FlowState;
  dispatch: (action: FlowAction) => void;
  /** The catalog's apps, to name a saved app on `/my/`. */
  apps: ReadonlyArray<Pick<InstallApp, "slug" | "name">>;
  /** False when the visitor came back with the Back button: the opening step waits for a click. */
  forwarding?: boolean;
}

/**
 * What the "get" step says about the app it keeps for the visitor. Only the
 * browser it was kept in has it, so the line says another browser or device
 * needs this page's link (which names the app) again. In an app's own
 * browser (`inApp`), where installing often cannot finish, the 7 days would
 * send them nowhere, so the line sends them to their browser instead.
 */
export function keepLine(intentSaved: boolean, what: string, inApp: InAppBrowser | null): string {
  if (!intentSaved) {
    return `此浏览器不允许网站保存 ${what} 的安装信息，请在准备好后返回此链接。`;
  }
  if (inApp !== null) {
    return `${inAppBrowserName(inApp.app)} 只在内置浏览器里保存 ${what} 的信息，请在浏览器中打开此链接继续。`;
  }
  return `此浏览器会保存 ${what} 的安装信息 7 天，期间可返回这里继续。在其他设备或浏览器中，请重新打开本页面的链接。`;
}

export function FlowPanel({ state, dispatch, apps, forwarding = true }: FlowPanelProps) {
  const { context, view, canRemember } = state;
  const browser = useBrowser();
  const inApp = browser?.kind === "in-app" ? browser : null;
  const onInstall = context.page === "install";
  const request = context.page === "install" ? context.request : null;
  const what = request === null ? "这个应用" : requestLabel(request, apps);

  switch (view.step) {
    case "loading":
      return (
        <div className="grid gap-3">
          <Text>正在检查链接…</Text>
          <noscript>
            <p className="text-fd-muted-foreground">查找你的 Appflare 需要启用 JavaScript。</p>
          </noscript>
        </div>
      );

    case "invalid":
      return (
        <div className="grid gap-3">
          <Title>链接无效</Title>
          <Text>
            {onInstall
              ? "此链接没有指定 Appflare 能安装的应用或 GitHub 仓库。"
              : "此链接不包含 Appflare 的地址。"}
          </Text>
          <Actions>
            <a href={appsPath} className={primary}>
              浏览应用
            </a>
          </Actions>
        </div>
      );

    case "in-catalog":
      return (
        <div className="grid gap-3">
          <Title>{view.app.name} 已收录于 Appflare 应用目录</Title>
          <Text>
            目录版本已针对 Appflare 完成打包和检查。从仓库直接构建则会在你的 Cloudflare
            账户内进行，需要 Workers Paid 套餐。
          </Text>
          <Actions>
            <a href={installPath(view.app.slug)} className={primary}>
              从目录安装 {view.app.name}
            </a>
            <button
              type="button"
              className={secondary}
              onClick={() => dispatch({ type: "use-repository" })}
            >
              从仓库构建
            </button>
          </Actions>
        </div>
      );

    case "ask":
      return (
        <div className="grid gap-3">
          <Title>你已经安装 Appflare 了吗？</Title>
          <Text>
            Appflare 会将应用安装到你自己的 Cloudflare 账户。此页面会在你的 Appflare 中打开 {what}
            ，由你检查并确认安装。
          </Text>
          {!canRemember && <CannotRememberNote />}
          <Actions>
            <button
              type="button"
              className={primary}
              onClick={() => dispatch({ type: "choose-enter" })}
            >
              输入它的地址
            </button>
            <button
              type="button"
              className={secondary}
              onClick={() => dispatch({ type: "choose-get" })}
            >
              安装 Appflare
            </button>
          </Actions>
        </div>
      );

    case "enter":
      return (
        <AddressForm
          value={view.value}
          error={view.error}
          canRemember={canRemember}
          onEdit={(value) => dispatch({ type: "edit", value })}
          onSubmit={() => dispatch({ type: "submit" })}
          onBack={() => dispatch({ type: "back" })}
          backLabel={onInstall ? "返回" : "取消"}
        />
      );

    case "remember":
      return (
        <div className="grid gap-3">
          <Title>
            记住 <Origin origin={view.origin} />
            ，将其作为你的 Appflare？
          </Title>
          <Text>
            之后点击本站的安装按钮，会在该地址中打开应用。地址仅保存在此浏览器中。
            {view.replaces !== null && (
              <>
                {" "}
                它将替换 <Origin origin={view.replaces} />。
              </>
            )}
          </Text>
          <Actions>
            <button
              type="button"
              className={primary}
              onClick={() => dispatch({ type: "remember" })}
            >
              记住地址
            </button>
            {onInstall && (
              <button
                type="button"
                className={secondary}
                onClick={() => dispatch({ type: "once" })}
              >
                仅使用这一次
              </button>
            )}
            <button type="button" className={quiet} onClick={() => dispatch({ type: "back" })}>
              {onInstall ? "返回" : "取消"}
            </button>
          </Actions>
        </div>
      );

    case "get": {
      // An app goes along to the deploy page, which opens it in the new Appflare.
      // A repository does not: building one needs Workers Paid and sandbox
      // builds turned on, which a brand-new Appflare does not have yet.
      const deployPath = request?.kind === "app" ? deployPathFor(request.slug) : null;
      // Moved to another browser or device, the visitor comes back to this
      // page, which still knows what they came to install.
      const handoffPath = request === null ? undefined : installPagePath(request);
      return (
        <div className="grid gap-4">
          <Title>安装 Appflare</Title>
          <Text>
            Appflare 运行在你自己的 Cloudflare 账户中，支持免费套餐和 Workers Paid。{" "}
            {deployPath === null
              ? "请选择以下方式安装："
              : `在浏览器中安装 Appflare，完成设置后会自动打开 ${what}，供你确认安装。`}
          </Text>
          <ol className="m-0 grid list-none gap-4 p-0">
            <li className="grid gap-2">
              <InstallButton
                placement={`${state.context.page}-get-appflare-install`}
                className="justify-self-start"
                {...(deployPath === null ? {} : { href: deployPath })}
                {...(handoffPath === undefined ? {} : { handoffPath })}
              />
              <span className="text-fd-muted-foreground text-sm">
                登录 Cloudflare 并选择安装位置，无需在电脑上安装软件。
              </span>
              {/* Drawn only after the page runs, so there is nothing to keep room for. */}
              <InstallShareLine
                reserve={false}
                {...(handoffPath === undefined ? {} : { handoffPath })}
              />
            </li>
            <li className="grid gap-2">
              <a
                href={installLink(`${state.context.page}-get-appflare-cloudflare`, true)}
                target="_blank"
                rel="noopener noreferrer"
                className={textLink}
              >
                Cloudflare 部署按钮
              </a>
              <span className="text-fd-muted-foreground text-sm">
                通过你 GitHub 或 GitLab 账户中的仓库副本进行部署。{" "}
                <a href="/start/deploy-button/" className={textLink}>
                  按钮的工作方式
                </a>
              </span>
            </li>
            <li className="text-fd-muted-foreground text-sm">
              <a href="/start/install/" className={textLink}>
                其他安装方式
              </a>
            </li>
          </ol>
          <p className="leading-relaxed">
            {deployPath === null ? "准备好后" : "通过其他方式安装？准备好后"}，请在你的 Appflare
            中打开<strong>账户 › 在 appflare.dev 上使用这个 Appflare</strong>。{" "}
            {keepLine(view.intentSaved, what, inApp)}
          </p>
          <Actions>
            <button
              type="button"
              className={secondary}
              onClick={() => dispatch({ type: "choose-enter" })}
            >
              我已安装 Appflare
            </button>
            <button type="button" className={quiet} onClick={() => dispatch({ type: "back" })}>
              返回
            </button>
          </Actions>
        </div>
      );
    }

    case "opening":
      return (
        <div className="grid gap-3">
          <p role="status" className="text-lg leading-relaxed">
            {forwarding ? "正在你的 Appflare 中打开，地址：" : "你的 Appflare 地址："}
            <Origin origin={view.origin} />
            {forwarding ? "…" : "。"}
          </p>
          <details className="text-fd-muted-foreground text-sm">
            <summary className="cursor-pointer select-none">详情</summary>
            <p className="pt-2">
              即将打开的页面：{" "}
              <a
                href={view.target}
                className={`${PRIVATE_CLASS} font-mono text-fd-primary underline [overflow-wrap:anywhere]`}
              >
                {view.target}
              </a>
            </p>
          </details>
          {!canRemember && <CannotRememberNote />}
          <Actions>
            {!forwarding && (
              <a href={view.target} className={`${PRIVATE_CLASS} ${primary}`}>
                在你的 Appflare 中打开
              </a>
            )}
            <button
              type="button"
              className={secondary}
              onClick={() => dispatch({ type: "change" })}
            >
              更换
            </button>
          </Actions>
        </div>
      );

    case "saved":
      return (
        <div className="grid gap-3">
          <Title>{view.justRemembered ? "已记住 Appflare" : "你的 Appflare"}</Title>
          <Text>
            本站的安装按钮会在以下 Appflare 中打开应用： <Origin origin={view.origin} />.
          </Text>
          <Actions>
            {view.intent !== null && (
              <a href={installPagePath(view.intent)} className={primary}>
                继续安装 {requestLabel(view.intent, apps)}
              </a>
            )}
            <button
              type="button"
              className={secondary}
              onClick={() => dispatch({ type: "change" })}
            >
              使用其他 Appflare
            </button>
            <button type="button" className={quiet} onClick={() => dispatch({ type: "forget" })}>
              忘记这个 Appflare
            </button>
          </Actions>
        </div>
      );

    case "none":
      return (
        <div className="grid gap-3">
          <Title>{view.forgotten ? "已忘记 Appflare" : "尚未记住 Appflare"}</Title>
          <Text>
            {view.forgotten ? "此浏览器已不再记住任何 Appflare。" : ""}
            要从本站在你的 Appflare 中打开应用，请在 Appflare 中打开
            <strong>账户 › 在 appflare.dev 上使用这个 Appflare</strong>，或在这里输入它的地址。
          </Text>
          {!canRemember && <CannotRememberNote />}
          <Actions>
            <button
              type="button"
              className={primary}
              onClick={() => dispatch({ type: "choose-enter" })}
            >
              输入它的地址
            </button>
            <a href="/start/install/" className={secondary}>
              安装 Appflare
            </a>
          </Actions>
        </div>
      );

    case "cannot-remember":
      return (
        <div className="grid gap-3">
          <Title>此浏览器无法记住你的 Appflare</Title>
          <Text>
            此浏览器不允许本站保存 <Origin origin={view.origin} />
            ，因此每次点击安装按钮都需要重新输入 Appflare 地址。
          </Text>
          <Actions>
            <a href={appsPath} className={primary}>
              浏览应用
            </a>
            <button type="button" className={quiet} onClick={() => dispatch({ type: "back" })}>
              返回
            </button>
          </Actions>
        </div>
      );
  }
}

function AddressForm({
  value,
  error,
  canRemember,
  onEdit,
  onSubmit,
  onBack,
  backLabel,
}: {
  value: string;
  error: string | null;
  canRemember: boolean;
  onEdit: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  backLabel: string;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }
  return (
    <form className="grid gap-3" onSubmit={submit} noValidate>
      <Title>你的 Appflare 地址</Title>
      <div className="grid gap-1.5">
        <label htmlFor={id} className="font-medium text-sm">
          地址
        </label>
        <input
          id={id}
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          // biome-ignore lint/a11y/noAutofocus: the field is the only thing on this step
          autoFocus
          value={value}
          placeholder={EXAMPLE_ADDRESS}
          aria-invalid={error !== null}
          aria-describedby={error === null ? hintId : `${errorId} ${hintId}`}
          onChange={(event) => onEdit(event.target.value)}
          className={`${PRIVATE_CLASS} h-11 w-full rounded-lg border border-fd-border bg-fd-background px-3 text-base outline-none placeholder:text-fd-muted-foreground focus-visible:ring-2 focus-visible:ring-fd-ring aria-invalid:border-red-500`}
        />
        {error !== null && (
          <p id={errorId} role="alert" className="text-red-600 text-sm dark:text-red-400">
            {error}
          </p>
        )}
        <p id={hintId} className="text-fd-muted-foreground text-sm">
          请输入浏览器中访问 Appflare 时显示的完整地址。
        </p>
      </div>
      {!canRemember && <CannotRememberNote />}
      <Actions>
        <button type="submit" className={primary}>
          继续
        </button>
        <button type="button" className={quiet} onClick={onBack}>
          {backLabel}
        </button>
      </Actions>
    </form>
  );
}
