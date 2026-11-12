import { MANAGER_OAUTH_SCOPE_BY_GROUP, OFFLINE_ACCESS_SCOPE } from "@appflare/cf-api/oauth";
import {
  MANAGER_SCOPE_REASONS,
  OFFLINE_ACCESS_REASON,
  type RequestedGroupKey,
  type ScopeReason,
} from "@appflare/cf-api/scope-reasons";
import { Button } from "@cloudflare/kumo/components/button";
import { Popover } from "@cloudflare/kumo/components/popover";
import type { ScopeExamples } from "../../deploy/scope-examples.ts";

/** One permission Appflare asks for, and why. */
export interface ListedScope {
  /** The OAuth scope id, as Cloudflare's consent page lists it. */
  scope: string;
  reason: ScopeReason;
  /** The reason's sentence, with example apps when there are some. */
  why: string;
}

/** Chinese explanations; permission labels and scope ids keep Cloudflare's names. */
const SCOPE_EXPLANATIONS: Record<RequestedGroupKey, string> = {
  workers_scripts:
    "允许 Appflare 安装、更新和移除应用，以及更新自身，包括管理代码、设置、密钥和定时任务。",
  workers_kv_storage: "允许 Appflare 创建和移除应用保存数据所需的 KV 键值存储。",
  d1: "允许 Appflare 创建应用数据库、随应用版本更新数据库，并在你要求时恢复数据。",
  workers_r2: "允许 Appflare 创建和移除应用保存文件所需的 R2 存储。",
  queues: "允许 Appflare 创建和移除应用执行后台任务所需的队列。",
  vectorize: "允许 Appflare 创建和移除应用按语义查找内容所需的搜索索引。",
  access: "根据你的选择，为 Appflare 管理面板或安装的应用添加 Cloudflare 登录保护。",
  access_acct: "读取 Zero Trust 团队信息，以校验 Appflare 或应用前面的 Cloudflare 登录。",
  access_service_token:
    "为受 Cloudflare 登录保护的应用分配服务令牌，确保 Appflare 仍能检查应用是否正常工作。",
  zone: "列出账户中的域名，让你选择 Appflare 或应用使用的域名。",
  dns: "在迁移域名之前检查 DNS 记录，并在你同意后修改记录。",
  workers_routes: "将你的域名连接到 Appflare 或某个应用。",
  ssl_and_certificates:
    "为 DNS 托管在 Cloudflare 之外的域名配置 Cloudflare 证书，让应用可以通过该域名访问。",
  zone_settings: "为域名启用邮件路由，让应用可以接收该域名的邮件。",
  email_routing_rule: "将域名收到的邮件投递给处理邮件的应用。",
  email_routing_address: "读取已验证的目标邮箱地址，供应用选择可以发送邮件的地址。",
  containers: "在你的账户内使用容器从源码构建应用，需要 Workers Paid 套餐。",
  query_cache: "把应用连接到你在 Cloudflare 之外运行的数据库。",
  pipelines: "配置应用将事件保存到文件存储所需的数据流。",
  workers_r2_data_catalog: "移除应用时，清理应用事件流保留在文件存储中的记录。",
  account_settings: "读取 Appflare 所在的 Cloudflare 账户及账户名称。",
  account_analytics:
    "读取各应用的 Worker、存储等服务用量，用于显示用量、发送你设置的提醒，并暂停用量异常的应用。",
};

/**
 * Every scope Appflare asks Cloudflare for, in the order it asks, each with
 * its reason. Billing is never asked for (Cloudflare has no sign-in scope
 * for it), so it is not here.
 */
export function listedScopes(examples: ScopeExamples): ListedScope[] {
  const listed: ListedScope[] = [];
  for (const [group, scope] of Object.entries(MANAGER_OAUTH_SCOPE_BY_GROUP)) {
    if (scope === null) continue;
    const reason = MANAGER_SCOPE_REASONS[group as RequestedGroupKey];
    listed.push({
      scope,
      reason,
      why: `${SCOPE_EXPLANATIONS[group as RequestedGroupKey]}${(examples[group as RequestedGroupKey]?.length ?? 0) > 0 ? ` 使用此权限的应用示例：${examples[group as RequestedGroupKey]?.join("、")}。` : ""}`,
    });
  }
  listed.push({
    scope: OFFLINE_ACCESS_SCOPE,
    reason: OFFLINE_ACCESS_REASON,
    why: "关闭此页面后，Appflare 仍能自行续期对 Cloudflare 的访问，保持连接。",
  });
  return listed;
}

/**
 * The permissions as a list, each with a "Why?" button that opens its
 * reason in a popover. Kumo's popover (Base UI) opens on a tap or on Enter
 * and Space, closes on Escape or a tap outside, and gives the focus back to
 * the button. Its width never passes the screen's, less a margin.
 */
export function ScopeList({ examples }: { examples: ScopeExamples }) {
  return (
    <ul className="grid divide-y divide-kumo-hairline">
      {listedScopes(examples).map(({ scope, reason, why }) => (
        <li key={scope} className="flex items-center justify-between gap-3 py-1.5">
          <span className="min-w-0 text-kumo-default [overflow-wrap:anywhere]">{reason.label}</span>
          <Popover>
            <Popover.Trigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 text-kumo-link max-sm:h-11 max-sm:px-3"
                  aria-label={`Appflare 为什么需要 ${reason.label}`}
                />
              }
            >
              为什么需要？
            </Popover.Trigger>
            <Popover.Content side="top" align="end" className="w-80 max-w-[calc(100vw-2rem)]">
              <Popover.Description className="text-kumo-default">{why}</Popover.Description>
              {/* The id Cloudflare's consent page lists, for anyone matching the two. */}
              <p className="mt-1.5 text-kumo-subtle text-xs">
                Cloudflare 权限：{" "}
                <span className="font-mono [overflow-wrap:anywhere]" translate="no">
                  {scope}
                </span>
              </p>
            </Popover.Content>
          </Popover>
        </li>
      ))}
    </ul>
  );
}
