<h1 align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/logo_full_white.svg">
    <img alt="Appflare" src="docs/assets/logo_full.svg" width="240">
  </picture>
</h1>

<p align="center"><strong>运行在你自己 Cloudflare 账户中的应用商店（中文独立维护版）。</strong></p>

<p align="center">
  <a href="https://cf.hejige.com"><img alt="文档" src="https://img.shields.io/badge/docs-cf.hejige.com-f38020"></a>
  <a href="https://github.com/yys9253462-gif/appflare/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/yys9253462-gif/appflare/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://github.com/yys9253462-gif/appflare-catalog"><img alt="应用目录" src="https://img.shields.io/badge/catalog-139%20apps-16a34a"></a>
  <a href="LICENSE"><img alt="License: Apache-2.0" src="https://img.shields.io/badge/license-Apache--2.0-blue"></a>
</p>

在自己的 Cloudflare 账户中一键安装、更新并管理上百个开源应用，包括 [OpenSEO](https://cf.hejige.com/apps/open-seo/)、[2FA](https://cf.hejige.com/apps/2fa/)、[MailFlare](https://cf.hejige.com/apps/mailflare/) 和 [Flaremo](https://cf.hejige.com/apps/flaremo/)。Appflare 会自动创建每个应用所需资源，并提供统一面板管理版本更新、自定义域名与访问控制。

[![安装 Appflare](docs/assets/install-appflare.svg)](https://cf.hejige.com/deploy/)

或使用 [Cloudflare 部署按钮](https://deploy.workers.cloudflare.com/?url=https://github.com/yys9253462-gif/appflare)。

[浏览应用](https://cf.hejige.com/apps/) · [安装指南](https://cf.hejige.com/start/install/) · [在线文档](https://cf.hejige.com) · [自建应用目录](https://github.com/yys9253462-gif/appflare-catalog)

[![Appflare 控制台预览](docs/assets/readme-hero.png)](https://cf.hejige.com/apps/)

## 特性亮点

- **全量简体中文界面**：管理面板（`apps/manager`）与官网部署站（`apps/docs`）已完成全量汉化，并配有 `i18n:check` 覆盖率校验。
- **自持签名与目录体系**：管理面板发布使用独立 Ed25519 密钥（`appflare-yys-2026-10`），配套自建目录 [yys9253462-gif/appflare-catalog](https://github.com/yys9253462-gif/appflare-catalog) 已完成 **139 个应用**的构建、密钥签名（`yys9253462-gif-2026-10`）与 Releases 发布。
- **独立官网与 OAuth 一键登录**：官网托管于 [cf.hejige.com](https://cf.hejige.com/)，内置同源 `/api/oauth/token` 代理解决浏览器换码跨域限制，支持直接通过 Cloudflare OAuth 授权部署。
- **零第三方遥测**：默认清空所有第三方分析 Key，不会向外部统计服务发送页面浏览、报错或使用习惯数据。

## 安装 Appflare

### 方式一：浏览器一键安装（推荐）

打开 [cf.hejige.com/deploy](https://cf.hejige.com/deploy/)，通过 Cloudflare OAuth 登录并选择目标账户与访问地址，安装器会自动将管理面板 Worker、D1 数据库与 KV 命名空间部署到你的账户中，无需手动创建 API 令牌。详细步骤见[浏览器安装指南](https://cf.hejige.com/start/browser-install/)。

### 方式二：Cloudflare 部署按钮或 CLI

也可以使用 [Cloudflare 部署按钮](https://deploy.workers.cloudflare.com/?url=https://github.com/yys9253462-gif/appflare) 将仓库部署到你的账户；或使用 **Node.js 22+** 运行命令行安装器：

```sh
npx create-appflare
```

Appflare 免费且开源，管理面板本身和大多数目录应用都可运行在 Cloudflare Workers 免费套餐上；需要 Workers Paid 的应用会在各自页面注明。

## 接入自建应用目录（139 个已签名应用）

进入已部署的管理面板，打开 **设置 → 应用目录 → 添加目录**，填入自建目录的索引地址与公钥：

- **索引地址**：`https://yys9253462-gif.github.io/appflare-catalog/index.json`
- **公钥**：`{"keyId":"yys9253462-gif-2026-10","publicKeyBase64":"/VioFbEWodpbJifio6zNSyKUzBnLLuwkC7Tetjxlizw="}`
- **密钥指纹核对**：`SHA256:bdzib5njKeZ4hoh+Kief68VK/nGdFjfLhG7/xZNZIsM`

点击**校验并添加**后即可浏览并安装目录内全部已发布的应用。

## 主要功能

- 在浏览器中浏览网站分析、邮件、文件、AI、效率等分类应用并一键安装。
- 检查应用更新并支持回滚，自动更新默认关闭。
- 实时查看安装、更新、卸载的任务日志。
- 为应用配置自定义域名，并可通过 Cloudflare Access 保护访问。
- 修改应用配置，或连同 Cloudflare 资源一起卸载。

Appflare 为应用创建数据库和存储等资源后，已安装的应用独立运行，不依赖管理面板本身。

## 仓库结构

| 路径 | 说明 |
| --- | --- |
| [`apps/manager`](apps/manager) | Cloudflare Workers 上的全中文管理面板 |
| [`apps/docs`](apps/docs) | 官网、在线文档与 OAuth 一键安装前端 |
| [`apps/installer`](apps/installer) | OAuth 自动化部署 Worker（[cf.hejige.com](https://cf.hejige.com/)） |
| [`apps/sandbox`](apps/sandbox) | 源码仓库直接构建部署用的沙盒 Worker |
| [`packages/cli`](packages/cli) | `create-appflare` 命令行安装工具 |
| [`packages/pack`](packages/pack) | 应用打包、清单校验与 Ed25519 签名工具 |
| [`packages/cf-api`](packages/cf-api) | Cloudflare API 与 OAuth 封装 |
| [`packages/schema`](packages/schema) | 共享清单 Schema 与公钥配置 |

## 本地开发

需要 Node.js 22 或更新版本，以及 [`package.json`](package.json) 指定的 pnpm 版本（`10.34.5`）：

```sh
git clone https://github.com/yys9253462-gif/appflare.git
cd appflare
pnpm install --frozen-lockfile
pnpm check
```

单独校验管理面板中文 i18n 覆盖率：

```sh
pnpm --filter @appflare/manager i18n:check
```

## 常用文档

- [Appflare 是什么](https://cf.hejige.com/start/overview/)
- [安装 Appflare](https://cf.hejige.com/deploy/)
- [安装应用](https://cf.hejige.com/guides/install-apps/)
- [更新与回滚](https://cf.hejige.com/guides/updates/)
- [自定义域名](https://cf.hejige.com/guides/custom-domains/)
- [自定义应用目录](https://cf.hejige.com/guides/custom-catalogs/)
- [安全模型](https://cf.hejige.com/security/)
- [隐私说明](https://cf.hejige.com/privacy/)
- [常见问题](https://cf.hejige.com/faq/)

## 许可证

遵循 [Apache-2.0](LICENSE) 开源协议；目录中收录的各个应用保留其各自上游许可证。

Appflare 是独立开源项目，与 Cloudflare, Inc. 没有隶属、背书或赞助关系。
