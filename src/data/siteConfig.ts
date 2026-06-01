import siteConfigJson from "./siteConfig.json";

interface Patent {
  title: string;
  number: string;
  status: "granted" | "pending";
  description: string;
}

export const siteConfig = {
  ...siteConfigJson,
  patents: (siteConfigJson as { patents: Patent[] }).patents ?? ([] as Patent[]),
};

export type SiteConfig = typeof siteConfig;
