import { Badge, Button, Link, LinkButton, Text } from "@cloudflare/kumo";
import { ArrowCircleUpIcon, ArrowRightIcon, ArrowsClockwiseIcon } from "@phosphor-icons/react";
import { useRouter } from "@tanstack/react-router";
import { type ComponentProps, useState } from "react";
import type { AutoUpdateSettings } from "../auto-update/auto-update";
import { AppflareAutomaticUpdates } from "../auto-update/automatic-updates-card";
import {
  checkManagerUpdates,
  type ManagerUpdateState,
  startSelfUpdate,
} from "../catalog/manager-releases.functions";
import { t } from "../i18n";
import { BusyButton } from "./busy-button";
import { ConfirmDialog } from "./confirm-dialog";
import { DescriptionItem, DescriptionList } from "./description-list";
import { useJobStarted } from "./job-started";
import { MessageBanner } from "./message-text";
import { Section, SectionBody, SectionFormActions, SectionRows } from "./section";
import { settingsLink, settingsSection, settingsSectionTitle } from "./settings-links";
import { Timestamp } from "./timestamp";

/**
 * The Appflare version section of the Updates settings: the running version,
 * the newest release the release feed reported, and "Update Appflare to
 * <version>" at the right of the header when there is one (admins; else
 * "Check now" is there). The update opens a confirmation, then the job's log.
 * Below, whether Appflare updates itself.
 */
export function AppflareUpdatesCard({
  state,
  autoUpdate,
  isAdmin,
}: {
  state: ManagerUpdateState;
  autoUpdate: AutoUpdateSettings;
  isAdmin: boolean;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function onCheck() {
    setChecking(true);
    setError(null);
    setNotice(null);
    try {
      const next = await checkManagerUpdates();
      if (next.latest === null) setNotice(t("The release feed lists no Appflare release yet."));
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("Could not check for updates."));
    }
    setChecking(false);
  }

  const { latest } = state;
  const update =
    isAdmin && state.updateAvailable && latest !== null && state.activeJobId === null
      ? latest
      : null;
  const checkNow = isAdmin ? (
    <BusyButton
      pending={checking}
      variant="secondary"
      icon={<ArrowsClockwiseIcon />}
      onClick={onCheck}
    >
      {t("Check now")}
    </BusyButton>
  ) : null;
  return (
    <Section
      {...settingsSection("updates", "appflare")}
      badge={
        state.activeJobId !== null ? (
          <Badge variant="info">{t("Updating")}</Badge>
        ) : state.updateAvailable ? (
          <Badge variant="warning">{t("Update available")}</Badge>
        ) : latest !== null ? (
          <Badge variant="success">{t("Up to date")}</Badge>
        ) : null
      }
      description={t(
        "The version of Appflare running here, its newest release, and whether it updates itself.",
      )}
      action={
        update !== null ? (
          <SettingsSelfUpdate from={state.current} version={update.version} />
        ) : (
          checkNow
        )
      }
      error={error}
    >
      <SectionRows>
        <SectionBody>
          <DescriptionList>
            <DescriptionItem label={t("Running version")}>
              <Text variant="mono" as="span">
                {state.current}
              </Text>
            </DescriptionItem>
            <DescriptionItem label={t("Latest release")}>
              {latest === null ? (
                t("None found yet")
              ) : (
                <>
                  <Text variant="mono" as="span">
                    {latest.version}
                  </Text>
                  {latest.publishedAt !== null && (
                    <Text variant="secondary" as="span">
                      {" "}
                      {t("published")} <Timestamp iso={latest.publishedAt} />
                    </Text>
                  )}
                </>
              )}
            </DescriptionItem>
            <DescriptionItem label={t("Last checked")}>
              <Timestamp iso={state.checkedAt} />
            </DescriptionItem>
          </DescriptionList>
          {notice !== null && <MessageBanner message={notice} variant="secondary" />}
          {(state.activeJobId !== null || update !== null) && (
            <SectionFormActions>
              {state.activeJobId !== null && (
                <LinkButton
                  href={`/jobs/${state.activeJobId}`}
                  variant="secondary"
                  icon={<ArrowRightIcon />}
                >
                  {t("View update log")}
                </LinkButton>
              )}
              {update !== null && checkNow}
            </SectionFormActions>
          )}
        </SectionBody>
        <SectionBody>
          <AppflareAutomaticUpdates settings={autoUpdate} isAdmin={isAdmin} />
        </SectionBody>
      </SectionRows>
    </Section>
  );
}

/** "Update Appflare to <version>", which opens the update's log once it starts. */
function SettingsSelfUpdate({ from, version }: { from: string; version: string }) {
  const jobStarted = useJobStarted();
  return (
    <SelfUpdateDialog
      from={from}
      version={version}
      trigger={(p) => (
        <Button {...p} variant="primary" icon={<ArrowCircleUpIcon />}>
          {t("Update Appflare to {version}", { version })}
        </Button>
      )}
      onConfirm={async () => {
        const { jobId } = await startSelfUpdate({ data: { version } });
        await jobStarted(jobId, t("Appflare update started"));
      }}
    />
  );
}

/**
 * The confirmation before Appflare updates itself to `version`, the same
 * here and in the sidebar's card: what the update does, step by step.
 * `onConfirm` starts it; when it throws, the dialog shows why and stays open.
 * Without `trigger` it is controlled, as `ConfirmDialog` is.
 */
export function SelfUpdateDialog({
  from,
  version,
  onConfirm,
  ...dialog
}: {
  from: string;
  version: string;
  onConfirm: () => Promise<void>;
} & Pick<
  ComponentProps<typeof ConfirmDialog>,
  "trigger" | "open" | "onOpenChange" | "onOpenChangeComplete"
>) {
  return (
    <ConfirmDialog
      {...dialog}
      size="lg"
      title={t("Update Appflare to {version}", { version })}
      description={t("From {from}. Appflare keeps the current version for a rollback.", {
        from,
      })}
      actionLabel={t("Update")}
      destructive={false}
      onConfirm={onConfirm}
    >
      <ol className="grid list-decimal gap-2 pl-5">
        <li>
          <Text>
            {t(
              "Appflare uploads the new version next to the current one; the current one keeps serving.",
            )}
          </Text>
        </li>
        <li>
          <Text>
            {t(
              "It checks the new version's preview: it must report version {version} and a working database. That first request already migrates Appflare's database to the new version's schema, before the switch; migrations only add to it, so the current version keeps working with it.",
              { version },
            )}
          </Text>
        </li>
        <li>
          <Text>
            {t(
              "Then it switches all traffic to the new version. The page you are on reloads by itself once the new version answers.",
            )}
          </Text>
        </li>
      </ol>
      <Text variant="secondary">
        {t(
          "Nothing else runs during the update: installs, updates, and uninstalls wait until it finishes. If the new version fails its check, the current one keeps serving. To go back later, roll back under",
        )}{" "}
        <Link href={settingsLink("updates", "versions")}>
          {t(settingsSectionTitle("updates", "versions"))}
        </Link>
        {t(".")}
      </Text>
    </ConfirmDialog>
  );
}
