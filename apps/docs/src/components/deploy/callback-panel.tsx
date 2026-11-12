import { AppflareLoader } from "@appflare/brand/loader";
import { Banner } from "@cloudflare/kumo/components/banner";
import { Button, LinkButton } from "@cloudflare/kumo/components/button";
import { Text } from "@cloudflare/kumo/components/text";
import { WarningCircleIcon } from "@phosphor-icons/react";
import type { CallbackView } from "../../deploy/callback.ts";
import { DEPLOY_PATH } from "../../deploy/config.ts";
import { DeployCard, More } from "./deploy-shell.tsx";

/** What the OAuth callback page shows while it works, and when it cannot go on. */

const WIDE = "w-full justify-center";
const TOUCH = "max-sm:h-11";

function Working({ label }: { label: string }) {
  return (
    <div role="status" className="flex items-center gap-3">
      <AppflareLoader size={20} aria-hidden />
      <Text variant="secondary">{label}</Text>
    </div>
  );
}

function StartAgain() {
  return (
    <LinkButton href={DEPLOY_PATH} variant="primary" className={`${WIDE} ${TOUCH}`}>
      重新开始
    </LinkButton>
  );
}

function problemText(view: Extract<CallbackView, { step: "problem" }>): string {
  const { problem } = view;
  if (typeof problem === "string") {
    switch (problem) {
      case "invalid-state":
        return "这个页面没有有效的 Appflare 登录请求，或登录信息已损坏。";
      case "unknown-session":
        return "登录是在另一个标签页发起的，或请求已经使用过。请在当前标签页重新开始。";
      case "missing-code":
        return "Cloudflare 返回时没有携带授权信息。";
    }
  }
  switch (problem.kind) {
    case "refused":
      return problem.retryable
        ? "完成登录时未收到 Cloudflare 的响应，请稍后重新开始。"
        : "Cloudflare 未接受此次登录，可能已超时。请重新开始。";
    case "no-refresh-token":
      return "Cloudflare 未授予持续访问权限，新的 Appflare 无法保持连接。请重新开始，并允许 Appflare 请求的全部权限。";
    case "missing-scopes":
      return `Cloudflare 未授予 Appflare 所需的 ${problem.missing.length} 项权限。请重新开始，并允许 Appflare 请求的全部权限。`;
  }
}

export interface CallbackPanelProps {
  view: CallbackView;
  /** Sends the reconnect back to the Appflare the visitor confirmed. */
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function CallbackPanel({ view, onConfirm, onCancel }: CallbackPanelProps) {
  switch (view.step) {
    case "working":
    case "done":
      return (
        <DeployCard meter={null} title="正在连接 Cloudflare">
          <Working label="正在完成 Cloudflare 登录…" />
          <noscript>
            <Text variant="secondary">此页面需要启用 JavaScript。</Text>
          </noscript>
        </DeployCard>
      );
    case "confirm-return":
      return (
        <DeployCard
          meter={null}
          title="返回你的 Appflare？"
          description="请确认这是你自己的 Appflare 地址后再继续。该站点的运营者将获得访问你 Cloudflare 账户的权限。"
        >
          <p className="rounded-lg bg-kumo-recessed px-3 py-2.5 font-mono text-[0.9em] [overflow-wrap:anywhere]">
            {view.origin}
          </p>
          <div className="grid gap-2 sm:flex sm:flex-wrap">
            <Button variant="primary" className={`${WIDE} ${TOUCH} sm:w-auto`} onClick={onConfirm}>
              返回我的 Appflare
            </Button>
            <Button
              variant="ghost"
              className={`${TOUCH} max-sm:w-full max-sm:justify-center`}
              onClick={onCancel}
            >
              取消
            </Button>
          </div>
        </DeployCard>
      );
    case "returning":
      return (
        <DeployCard meter={null} title="正在返回你的 Appflare">
          <Working label={`正在打开 ${view.origin}…`} />
          <Text variant="secondary" size="sm">
            该页面会显示 Cloudflare 是否已连接。
          </Text>
        </DeployCard>
      );
    case "cancelled":
      return (
        <DeployCard
          meter={null}
          title="未发送任何信息"
          description="你可以关闭此页面。若要连接 Cloudflare，请从 Appflare 的设置中重新开始。"
        />
      );
    case "declined":
      return (
        <DeployCard
          meter={null}
          title="Cloudflare 未连接"
          description="你没有允许访问，因此未安装任何内容。Appflare 需要获得其请求的全部权限。"
        >
          <StartAgain />
        </DeployCard>
      );
    case "problem":
      return (
        <DeployCard meter={null} title="登录未完成">
          <div role="alert">
            <Banner
              variant="error"
              icon={<WarningCircleIcon weight="fill" />}
              description={problemText(view)}
            />
          </div>
          {typeof view.problem !== "string" && view.problem.kind === "missing-scopes" && (
            <More summary="缺少哪些权限">
              <ul className="grid list-disc gap-0.5 pl-5 font-mono text-[0.9em]" translate="no">
                {view.problem.missing.map((scope) => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </More>
          )}
          <StartAgain />
        </DeployCard>
      );
  }
}
