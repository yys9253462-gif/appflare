<h1 align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/logo_full_white.svg">
    <img alt="Appflare" src="docs/assets/logo_full.svg" width="240">
  </picture>
</h1>

<p align="center"><strong>运行在你自己 Cloudflare 账户中的应用商店。</strong></p>

<p align="center">
  <a href="https://cf.hejige.com?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-home-1"><img alt="文档" src="https://img.shields.io/badge/docs-cf.hejige.com-f38020"></a>
  <a href="https://github.com/yys9253462-gif/appflare/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/yys9253462-gif/appflare/actions/workflows/ci.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="License: Apache-2.0" src="https://img.shields.io/badge/license-Apache--2.0-blue"></a>
</p>

在自己的 Cloudflare 账户中一键安装、更新并管理上百个开源应用，包括 [OpenSEO](https://cf.hejige.com/apps/open-seo/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-apps-open-seo-1)、[Sink](https://cf.hejige.com/apps/sink/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-apps-sink-1) 和 [Counterscale](https://cf.hejige.com/apps/counterscale/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-apps-counterscale-1)。Appflare 会自动创建每个应用所需资源，并提供统一面板管理版本更新、自定义域名与访问控制。

[![安装 Appflare](docs/assets/install-appflare.svg)](https://cf.hejige.com/deploy/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-install-1)

或使用 [Cloudflare 部署按钮](https://deploy.workers.cloudflare.com/?url=https://github.com/yys9253462-gif/appflare)。

[浏览应用](https://cf.hejige.com/apps/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-apps-1) · [安装指南](https://cf.hejige.com/start/install/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-start-install-1) · [在线文档](https://cf.hejige.com?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-home-2) · [自建应用目录](https://github.com/yys9253462-gif/appflare-catalog)

[![Appflare 控制台预览](docs/assets/readme-hero.png)](https://cf.hejige.com/apps/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-apps-2)

## 安装 Appflare

点击上方 **安装 Appflare**（或访问 [cf.hejige.com/deploy](https://cf.hejige.com/deploy/)），登录 Cloudflare 并选择账户与访问地址，页面会自动将管理面板部署到你的账户中，无需手动创建 API 令牌或清理 Git 仓库。详细步骤见[浏览器安装指南](https://cf.hejige.com/start/browser-install/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-start-browser-install-1)。

也可以使用 [Cloudflare 部署按钮](https://deploy.workers.cloudflare.com/?url=https://github.com/yys9253462-gif/appflare)，将仓库复制到你的 GitHub/GitLab 账户进行部署；或使用 **Node.js 22+** 运行命令行安装器：

```sh
npx create-appflare
```

Appflare 免费且开源，管理面板本身和大多数目录应用都可运行在 Cloudflare Workers 免费套餐上；需要 Workers Paid 的应用会在各自页面注明。

## 主要功能

- 在浏览器中浏览网站分析、邮件、文件、AI、效率等分类应用并一键安装。
- 检查应用更新并支持回滚，自动更新默认关闭。
- 实时查看安装、更新、卸载的任务日志。
- 为应用配置自定义域名，并可通过 Cloudflare Access 保护访问。
- 修改应用配置，或连同 Cloudflare 资源一起卸载。

Appflare 为应用创建数据库和存储等资源后，已安装的应用独立运行，不依赖管理面板本身。

## 本地开发

需要 Node.js 22 或更新版本，以及 [`package.json`](package.json) 指定的 pnpm 版本：

```sh
git clone https://github.com/yys9253462-gif/appflare.git
cd appflare
pnpm install --frozen-lockfile
pnpm check
```

本仓库包含[管理面板](apps/manager)、[CLI 安装器](packages/cli)、[目录打包工具](packages/pack)以及[中文文档与部署站](apps/docs)。应用目录位于 [yys9253462-gif/appflare-catalog](https://github.com/yys9253462-gif/appflare-catalog)。

## 常用文档

- [Appflare 是什么](https://cf.hejige.com/start/overview/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-start-overview-1)
- [安装 Appflare](https://cf.hejige.com/deploy/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-install-2)
- [安装应用](https://cf.hejige.com/guides/install-apps/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-guides-install-apps-1)
- [更新与回滚](https://cf.hejige.com/guides/updates/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-guides-updates-1)
- [自定义域名](https://cf.hejige.com/guides/custom-domains/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-guides-custom-domains-1)
- [安全模型](https://cf.hejige.com/security/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-security-1)
- [常见问题](https://cf.hejige.com/faq/?utm_source=github&utm_medium=readme&utm_campaign=appflare&utm_content=appflare-readme-faq-1)

## 许可证

遵循 [Apache-2.0](LICENSE) 开源协议；目录中收录的各个应用保留其各自上游许可证。

Appflare 是独立开源项目，与 Cloudflare, Inc. 没有隶属、背书或赞助关系。
