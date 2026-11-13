---
title: 隐私
description: 了解 cf.hejige.com 记录哪些信息，以及 Appflare 安装器会保存哪些数据。
---

本站默认**不启用**第三方页面分析、会话录制或热力图追踪，也不会向外部统计服务发送你的浏览记录。你的 Appflare 管理面板地址只保存在当前浏览器中，不会发送到服务器。

## 从本站安装 Appflare [#installing-appflare-from-this-site]

当你通过浏览器在 [cf.hejige.com/deploy](https://cf.hejige.com/deploy/?utm_source=appflare-docs&utm_medium=website&utm_campaign=appflare&utm_content=privacy-install-1) 安装 Appflare 时：

- 本站通过 `cf.hejige.com/api/oauth/token` 代理与 Cloudflare 交换或刷新授权令牌，以处理浏览器跨域限制；该代理不会持久化保存你的令牌。
- 部署由背后的安装器 Worker 完成。对于尚未完成的安装，安装器会临时保存以下信息以便你断点续传或移除：
  - 你的 Cloudflare 账户 ID；
  - 你选择的 Worker 名称和访问地址；
  - 本次安装的 Appflare 版本；
  - 已在账户中创建的资源与当前安装进度。

安装器不会保存你的 Cloudflare 令牌、登录密码或任何应用数据。这条记录在所有者账户创建完成，或你在部署页面移除未完成安装时自动删除。你的浏览器仅在本地保存继续该安装所需的密钥，直到安装完成为止。
