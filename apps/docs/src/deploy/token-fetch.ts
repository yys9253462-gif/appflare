import { CLOUDFLARE_OAUTH_TOKEN_URL } from "@appflare/cf-api/oauth";
import type { FetchLike } from "./installer-api.ts";

/**
 * `window.fetch`, with the token endpoint exchanged through this page's own
 * origin when a build names a proxy for it (`VITE_APPFLARE_OAUTH_TOKEN_PROXY`).
 *
 * A copy of this site served somewhere Cloudflare does not send CORS headers
 * to cannot read the token endpoint's answers, and the browser reports that as
 * Cloudflare not answering. The proxy at `/api/oauth/token` makes the call
 * same-origin instead; everything else still goes straight to its address.
 */
const tokenProxy = import.meta.env.VITE_APPFLARE_OAUTH_TOKEN_PROXY?.trim();

export const deployFetch: FetchLike = (input, init) => {
  const url = input;
  if (tokenProxy !== undefined && tokenProxy !== "" && url === CLOUDFLARE_OAUTH_TOKEN_URL) {
    return window.fetch(tokenProxy, init);
  }
  return window.fetch(input, init);
};
