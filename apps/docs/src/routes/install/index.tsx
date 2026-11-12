import { createFileRoute } from "@tanstack/react-router";
import { installRepoPath } from "../../catalog/urls.ts";
import { FlowPanel } from "../../components/install/flow-panel.tsx";
import {
  InstallHeader,
  InstallShell,
  RepositoryIcon,
} from "../../components/install/install-shell.tsx";
import { useFlow } from "../../components/install/use-flow.ts";
import { startInstall } from "../../install/flow.ts";
import { catalogAppForRepo, repoRequestFromSearch } from "../../install/request.ts";
import { noindexPageHead } from "../../lib/meta.ts";
import { SITE_URL, siteName, siteOgImagePath } from "../../lib/shared.ts";

/**
 * `/install/?repo=<owner>/<repo>`: an Install button for a GitHub
 * repository, which the visitor's Appflare builds in their own account.
 * The page is prerendered once, without the repository, which is read from
 * the address in the browser and checked there. When the catalog already
 * has an app built from that repository, the page offers it first.
 */
export const Route = createFileRoute("/install/")({
  loader: async () => {
    const { installDirectory } = await import("../../catalog/data.ts");
    return { apps: installDirectory() };
  },
  head: () =>
    noindexPageHead({
      title: `从 GitHub 安装 | ${siteName}`,
      description: "在你自己的 Appflare 中打开 GitHub 仓库，准备构建和安装。",
      url: `${SITE_URL}${installRepoPath}`,
      // No card of its own: the site's card.
      image: `${SITE_URL}${siteOgImagePath}`,
    }),
  component: InstallRepositoryPage,
});

function InstallRepositoryPage() {
  const { apps } = Route.useLoaderData();
  const { state, dispatch, forwarding } = useFlow(
    { page: "install", request: null, catalogApp: null },
    (memory) => {
      const request = repoRequestFromSearch(window.location.search);
      const match = request?.kind === "repo" ? catalogAppForRepo(apps, request.repo) : undefined;
      return startInstall(
        request,
        match === undefined ? null : { slug: match.slug, name: match.name },
        memory,
      );
    },
  );
  const request = state.context.page === "install" ? state.context.request : null;
  const repo = request?.kind === "repo" ? request.repo : null;
  return (
    <InstallShell
      header={
        <InstallHeader
          icon={<RepositoryIcon />}
          title={repo === null ? "从 GitHub 安装" : `安装 ${repo}`}
          lines={
            <p>从 GitHub 仓库构建，运行在你自己的 Cloudflare 账户中，需要 Workers 付费套餐。</p>
          }
        />
      }
    >
      <FlowPanel state={state} dispatch={dispatch} apps={apps} forwarding={forwarding} />
    </InstallShell>
  );
}
