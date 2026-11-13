/** Install links go straight to this site's deploy page or Cloudflare's 1-click deploy for this repository. */
export const HOSTED_INSTALL_URL = "https://cf.hejige.com/deploy/";
export const CLOUDFLARE_DEPLOY_URL =
  "https://deploy.workers.cloudflare.com/?url=https://github.com/yys9253462-gif/appflare";

export function installLink(
  placement: string,
  legacy = false,
  attribution = { source: "appflare-docs", medium: "website" },
): string {
  return attributedLink(
    legacy ? CLOUDFLARE_DEPLOY_URL : HOSTED_INSTALL_URL,
    placement,
    attribution,
  );
}

export function attributedLink(
  href: string,
  placement: string,
  attribution = { source: "appflare-docs", medium: "website" },
): string {
  const url = new URL(href);
  url.searchParams.set("utm_source", attribution.source);
  url.searchParams.set("utm_medium", attribution.medium);
  url.searchParams.set("utm_campaign", "appflare");
  url.searchParams.set("utm_content", placement);
  return url.href;
}
