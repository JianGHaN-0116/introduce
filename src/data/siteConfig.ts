import siteConfigJson from "./siteConfig.json";

export const siteConfig = siteConfigJson as typeof siteConfigJson;

export type SiteConfig = typeof siteConfig;
