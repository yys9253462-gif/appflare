/** Chinese presentation copy. Source manifests and their signed bytes stay unchanged. */
const APP_COPY: Readonly<Record<string, { pitch: string; summary: string }>> = {
  "2fa": {
    pitch: "集中管理双重验证码，并自动备份",
    summary:
      "管理 TOTP 和 HOTP 双重验证密钥，支持扫描或从 Google Authenticator、Aegis、2FAS 和 Bitwarden 导入。密钥加密保存在 KV 中，可备份到 WebDAV、S3、OneDrive 或 Google Drive。",
  },
  "agentic-inbox": {
    pitch: "自托管邮件收件箱，AI 助手帮你起草回复",
    summary:
      "带 AI 助手的自托管邮件客户端，支持读取、搜索邮件和起草回复，使用邮件路由、Durable Objects、R2 和 Workers AI。",
  },
  cattopic: {
    pitch: "在自己的图床上传和整理图片",
    summary:
      "自托管图床，支持上传、标签管理、图片浏览、WebP 和 AVIF 格式、过期设置及公开随机图片 API。使用 R2、D1、KV、Queues 和 Cloudflare Images。",
  },
  flaremo: {
    pitch: "随时记录笔记，需要时快速找回",
    summary:
      "兼容 Memos 的轻量笔记应用，支持时间线、标签、附件、语义搜索和 MCP 服务，使用 D1、R2 和 Vectorize。",
  },
  mailflare: {
    pitch: "为自己的域名提供邮件和共享收件箱",
    summary:
      "自托管域名邮件服务，提供邮箱、转发规则和网页收件箱，使用邮件路由、D1、R2、Queues 和 Durable Objects。",
  },
  "open-seo": {
    pitch: "寻找搜索关键词，跟踪排名，检查网站健康状况",
    summary:
      "自托管 SEO 研究工具，支持关键词、排名、反向链接和网站审计，运行在你的 Cloudflare 账户中，并由 Cloudflare Access 保护。",
  },
  resolvehq: {
    pitch: "在自己的账户管理客户邮件与支持工单",
    summary:
      "自托管客服系统，提供接入邮件路由的共享收件箱、工单会话、SLA、稍后处理、帮助中心、知识库、客户评分、报表、权限受限 API 和出站 webhook。使用 D1、R2 和 Queues。",
  },
  veet: {
    pitch: "分享会议链接，在浏览器里面对面通话",
    summary:
      "浏览器视频通话工具，通过分享会议链接发起通话，支持聊天、设备设置和小规模点对点音视频。",
  },
};

export function appDisplayCopy(slug: string): { pitch: string; summary: string } | undefined {
  return APP_COPY[slug];
}
