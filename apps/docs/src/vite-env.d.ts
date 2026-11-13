/** Build-time variables the site reads (Vite exposes those that start with `VITE_`). */
interface ImportMetaEnv {
  /** Another Cloudflare OAuth client for the deploy page, for development. */
  readonly VITE_APPFLARE_OAUTH_CLIENT_ID?: string;
  /** That client's callback, on the origin the page is served from. */
  readonly VITE_APPFLARE_OAUTH_CALLBACK_URL?: string;
  /**
   * A same-origin path that exchanges and renews tokens for this page, for a
   * copy served where Cloudflare's token endpoint sends no CORS headers.
   */
  readonly VITE_APPFLARE_OAUTH_TOKEN_PROXY?: string;
  /** Optional PostHog project token for site analytics. Unset disables analytics. */
  readonly VITE_POSTHOG_KEY?: string;
  /** Optional PostHog ingestion host. */
  readonly VITE_POSTHOG_HOST?: string;
}

/** A `srcset` of resized copies of an image, made by vite-imagetools during the build. */
declare module "*&as=srcset" {
  const srcset: string;
  export default srcset;
}

/** One resized WebP copy of an image, made by vite-imagetools during the build. */
declare module "*&format=webp" {
  const src: string;
  export default src;
}
