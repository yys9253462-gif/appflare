import { Empty, LinkButton } from "@cloudflare/kumo";
import { HouseIcon, SignpostIcon } from "@phosphor-icons/react";
import { t } from "../i18n";

/**
 * The page for an address no route matches, at any depth (`/nope`,
 * `/apps/<id>/nope`, `/catalog/a/b`). The root route renders it, outside the
 * signed-in layout, so it needs no session and no page data.
 */
export function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <Empty
        icon={<SignpostIcon size={48} className="text-kumo-inactive" />}
        title={t("Page not found")}
        description={t(
          "Nothing lives at this address. The link may be wrong, or what it pointed to was removed.",
        )}
        contents={
          <LinkButton href="/" variant="primary" icon={<HouseIcon />}>
            {t("Go to Home")}
          </LinkButton>
        }
      />
    </div>
  );
}
