import { siteConfig } from "@/data/siteConfig";

const KV_KEY = "site_config";

let kvModule: any = null;

async function getKv() {
  if (kvModule !== null) return kvModule;
  try {
    kvModule = await import("@vercel/kv");
    return kvModule;
  } catch {
    kvModule = null;
    return null;
  }
}

export async function getConfig() {
  const kv = await getKv();
  if (!kv) return siteConfig;
  try {
    const stored = await kv.get(KV_KEY);
    if (stored && typeof stored === "object") {
      return { ...siteConfig, ...(stored as Record<string, unknown>) };
    }
  } catch {}
  return siteConfig;
}

export async function saveConfig(config: Record<string, unknown>) {
  const kv = await getKv();
  if (!kv) throw new Error("KV storage not available");
  await kv.set(KV_KEY, config);
}
