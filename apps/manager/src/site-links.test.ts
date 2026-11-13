import { describe, expect, it } from "vitest";
import { MANAGER_UTM_SOURCE, managerSiteLink } from "./site-links";

describe("managerSiteLink", () => {
  it("tags a page with the manager, the medium and the link's name", () => {
    const url = new URL(managerSiteLink("https://cf.hejige.com/start/overview/", "footer"));
    expect(url.pathname).toBe("/start/overview/");
    expect(Object.fromEntries(url.searchParams)).toEqual({
      utm_source: MANAGER_UTM_SOURCE,
      utm_medium: "app",
      utm_content: "footer",
    });
  });

  it("keeps a fragment at the end", () => {
    expect(
      managerSiteLink(
        "https://cf.hejige.com/security/#locked-out",
        "accessLockedOut",
        "notification",
      ),
    ).toBe(
      "https://cf.hejige.com/security/?utm_source=appflare-manager&utm_medium=notification&utm_content=accessLockedOut#locked-out",
    );
  });

  it("names the Appflare version as the campaign", () => {
    const url = new URL(
      managerSiteLink("https://cf.hejige.com/telemetry/", "usageData", "app", "1.4.0"),
    );
    expect(url.searchParams.get("utm_campaign")).toBe("1.4.0");
  });
});
